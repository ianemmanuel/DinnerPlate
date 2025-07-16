import { NextFunction, Request, Response } from "express"
import prisma from "@packages/libs/prisma"
import { ValidationError } from "@packages/error-handler"
import bcrypt from "bcryptjs"
import { generateTokens} from '../utils/tokens/refresh-access-tokens'
import { CreateProfileRequest,UpdateProfileRequest } from '../types/vendor'
import { checkOtpRestrictions, sendOtp, trackOtpRequests, verifyOtp } from "../utils/auth.helper"
import { createVendorBankAccount, updateVendorBankAccount } from '../services/bankAccountService'
import { bankAccountSchema } from '../validators/bank-validator'
import { ZodError } from 'zod'

export const registerVendor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    
    const requiredFields = [
      'businessType',
      'businessName',
      'businessEmail',
      'ownerFirstName',
      'ownerLastName',
      'businessPhone',
      'country',
      'city',
      'street',
      'postalCode',
      'password'
    ]
    
    for (const field of requiredFields) {
      if (!req.body[field]) {
        return next(new ValidationError(`${field} is required`));
      }
    }
    const businessEmail = req.body.businessEmail
  
    const existingEmail = await prisma.vendor.findUnique({
      where: { businessEmail }
    })

    if (existingEmail) {
      return next(new ValidationError("Email already in use"))
    }

    
    const existingPhone = await prisma.vendor.findUnique({
      where: { businessPhone: req.body.businessPhone }
    })

    if (existingPhone) {
      return next(new ValidationError("The phone number used for registration is already in use"))
    }


    const businessType = req.body.businessType
    
    //* Validate enum value
    if (!['restaurant', 'commercial_kitchen'].includes(businessType)) {
      return next(new ValidationError('Invalid business type'))
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10)

    //* Create vendor and address in transaction
    const result = await prisma.$transaction(async (prisma) => {
        //* Create address first
        const address = await prisma.vendorAddress.create({
          data: {
            country: req.body.country,
            city: req.body.city,
            street: req.body.street,
            postalCode: req.body.postalCode,
            latitude: req.body.latitude || null,
            longitude: req.body.longitude || null
          }
        })

        //* Then create vendor
        const vendor = await prisma.vendor.create({
          data: {
            type: businessType,
            businessName: req.body.businessName,
            legalBusinessName: req.body.legalBusinessName || null,
            businessEmail: req.body.businessEmail,
            businessPhone: req.body.businessPhone,
            ownerFirstName: req.body.ownerFirstName,
            ownerLastName: req.body.ownerLastName,
            agreedToTerms: req.body.agreedToTerms,
            password: hashedPassword,
            address: {
              connect: { id: address.id }
            }
          },
          include: { address: true }
        })

        return vendor
    })

    res.status(201).json({
        success: true,
        message: "Registration successful.",
        vendor: {
        id: result.id,
        businessName: result.businessName,
        businessEmail: result.businessEmail,
        type: result.type,
        status: result.status
      },
    })

  } catch (error) {
    console.error('Registration error:', error)
    return res.status(500).json({ error: 'Server error during registration'})
  }
}

export const sendVendorOtp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { businessEmail, businessName } = req.body;

    if (!businessEmail) {
      return next(new ValidationError("Business email is required"))
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(businessEmail)) {
      return next(new ValidationError("Invalid email format"))
    }

    //* Check if email already exists
    const existingEmail = await prisma.vendor.findUnique({
      where: { businessEmail }
    })

    if (existingEmail) {
      return next(new ValidationError("This email is already registered"))
    }

    //* Check OTP restrictions
    await checkOtpRestrictions(businessEmail, next)
    await trackOtpRequests(businessEmail, next)
    
    //* Send OTP
    await sendOtp(
      businessName || "Vendor", // Fallback if businessName not provided yet
      businessEmail,
      'vendor-email-activation'
    )

    res.status(200).json({
      success: true,
      message: "OTP sent to email for verification",
      email: businessEmail
    })

  } catch (error) {
    // next(error)
    return res.status(500).json({
      error: `Server Error: Couldn't verify email`
    })
  }
}

export const verifyVendorEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { businessEmail, otp } = req.body

    if (!businessEmail || !otp) {
      return next(new ValidationError("Email and OTP are required"))
    }

    //* Verify the OTP
    await verifyOtp(businessEmail, otp)

    res.status(200).json({
      success: true,
      message: "Email verified successfully",
      email: businessEmail,
      verified: true
    })

  } catch (error) {
    console.log(error)

    next(error)
  }
}

export const loginVendor = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    const vendor = await prisma.vendor.findUnique({
      where: { businessEmail: email },
      select: { id: true, businessEmail: true,businessName: true,businessPhone:true,password: true, type: true, status: true }
    });

    if (!vendor || !(await bcrypt.compare(password, vendor.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    console.log(vendor)
    res.clearCookie('refreshToken')
    const { accessToken, refreshToken } = generateTokens({
      id: vendor.id,
      type: vendor.type,
      status: vendor.status
    })

    await prisma.vendor.update({
      where: { id: vendor.id },
      data: { refreshToken }
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000
    })

    return res.json({
      accessToken,
      vendor: {
        id: vendor.id,
        businessEmail: vendor.businessEmail,
        businessName: vendor.businessName,
        businessPhone: vendor.businessPhone,
        type: vendor.type,
        status: vendor.status
      }
    })
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ error: 'Server error' });
  }
}

export const createProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const requiredFields = ['vendorId']
    for (const field of requiredFields) {
      if (!req.body[field]) {
        return next(new ValidationError(`${field} is required`));
      }
    }

    const [
      vendorId,
      avatar,
      bio,
      coverBanner,
      openingHours,
      website,
      socialLinks,
      images
    ] = req.body

    const vendorExists = await prisma.vendor.findUnique({
      where: { id: vendorId },
    })

    if (!vendorExists) {
      return next(new ValidationError('Vendor not found'));
    }

    const existingProfile = await prisma.vendorProfile.findUnique({
      where: { vendorId },
    })

    if (existingProfile) {
      return next(new ValidationError('Profile already exists for this vendor'));
    }

    const profileData: CreateProfileRequest = {
      avatar,
      bio,
      coverBanner,
      openingHours,
      website,
      images: images || [],
      socialLinks,
    }

    if (website && website.trim() === "") {
      profileData.website = website
    }

    // Create profile
    const newProfile = await prisma.vendorProfile.create({
      data: {
        vendor: { connect: { id: vendorId } },
        ...profileData,
      },
      include: {
        vendor: {
          select: {
            id: true,
            businessName: true,
            businessEmail: true,
          },
        },
      },
    })

    // ✅ Update vendor hasCompletedProfile flag
    await prisma.vendor.update({
      where: { id: vendorId },
      data: {
        hasCompletedProfile: true
      },
    })

    return res.status(201).json({
      success: true,
      message: 'Vendor profile created successfully',
      profile: newProfile,
    })
  } catch (error) {
    console.error('Error creating vendor profile:', error);
    return res.status(500).json({ error: 'Server error during profile creation' })
  }
}

export const updateProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params

    const existingProfile = await prisma.vendorProfile.findUnique({
      where: { id },
    })

    if (!existingProfile) {
      return next(new ValidationError('Profile not found', 404));
    }

    const updateData: UpdateProfileRequest = {
      avatar: req.body.avatar,
      bio: req.body.bio,
      coverBanner: req.body.coverBanner,
      openingHours: req.body.openingHours,
      website: req.body.website,
      socialLinks: req.body.socialLinks,
    }

    // Handle image updates (placeholder URLs for now)
    let imageUpdates: { file_id: string; url: string }[] = []
    if (req.body.images && Array.isArray(req.body.images)) {
      imageUpdates = req.body.images.map((img: any) => ({
        file_id: img.file_id || uuidv4(),
        url: img.url || `https://placeholder.com/vendor-images/${uuidv4()}.jpg`,
      }))
    }

    // Transaction for profile and image updates
    const updatedProfile = await prisma.$transaction(async (prisma) => {
      // Update profile
      const profile = await prisma.vendorProfile.update({
        where: { id },
        data: updateData,
      })

      // Handle images
      if (imageUpdates.length > 0) {
        // Delete existing images
        await prisma.vendorImages.deleteMany({
          where: { vendorProfileId: id },
        })

        // Create new images
        await prisma.vendorImages.createMany({
          data: imageUpdates.map((img) => ({
            ...img,
            vendorProfileId: id,
          })),
        })
      }

      return profile;
    })

    // Get full updated profile
    const completeProfile = await prisma.vendorProfile.findUnique({
      where: { id },
      include: {
        vendor: {
          select: {
            id: true,
            businessName: true,
            businessEmail: true,
          },
        },
        images: true,
      },
    })

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      profile: completeProfile,
    })
  } catch (error) {
    next(error);
  }
}

export const getProfileById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const profile = await prisma.vendorProfile.findUnique({
      where: { id },
      include: {
        vendor: {
          select: {
            id: true,
            businessName: true,
            businessEmail: true,
            type: true,
          },
        },
        images: true,
      },
    });

    if (!profile) {
      return next(new ValidationError('Profile not found', 404));
    }

    res.status(200).json({
      success: true,
      profile,
    });
  } catch (error) {
    next(error);
  }
}

export const deleteProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    // Check if profile exists
    const existingProfile = await prisma.vendorProfile.findUnique({
      where: { id },
    });

    if (!existingProfile) {
      return next(new ValidationError('Profile not found', 404));
    }

    // Transaction to delete profile and related images
    await prisma.$transaction(async (prisma) => {
      // Delete images first
      await prisma.vendorImages.deleteMany({
        where: { vendorProfileId: id },
      });

      // Then delete profile
      await prisma.vendorProfile.delete({
        where: { id },
      });
    });

    res.status(200).json({
      success: true,
      message: 'Profile deleted successfully',
    });
  } catch (error) {
    next(error);
  }
}

export const addProfileImages = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    // Check if profile exists
    const existingProfile = await prisma.vendorProfile.findUnique({
      where: { id },
    });

    if (!existingProfile) {
      return next(new ValidationError('Profile not found', 404));
    }

    // Process image data (using placeholder URLs for now)
    const newImages = req.body.images.map((img: any) => ({
      file_id: img.file_id || uuidv4(),
      url: img.url || `https://placeholder.com/vendor-images/${uuidv4()}.jpg`,
      vendorProfileId: id,
    }));

    // Add new images
    const createdImages = await prisma.vendorImages.createMany({
      data: newImages,
    });

    // Get updated profile with all images
    const updatedProfile = await prisma.vendorProfile.findUnique({
      where: { id },
      include: {
        images: true,
      },
    });

    res.status(201).json({
      success: true,
      message: 'Images added successfully',
      images: createdImages,
      profile: updatedProfile,
    });
  } catch (error) {
    next(error);
  }
}

export const removeProfileImages = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { imageIds } = req.body;

    if (!Array.isArray(imageIds)) {
      return next(new ValidationError('imageIds must be an array'));
    }

    // Check if profile exists
    const existingProfile = await prisma.vendorProfile.findUnique({
      where: { id },
    });

    if (!existingProfile) {
      return next(new ValidationError('Profile not found', 404));
    }

    // Delete specified images
    await prisma.vendorImages.deleteMany({
      where: {
        id: { in: imageIds },
        vendorProfileId: id,
      },
    });

    res.status(200).json({
      success: true,
      message: 'Images removed successfully',
    });
  } catch (error) {
    next(error);
  }
}


export async function createBankAccount(req: Request, res: Response) {
  try {
    const vendorId = req.user?.id
    if (!vendorId) return res.status(401).json({ message: 'Unauthorized' })

    const parsed = bankAccountSchema.parse(req.body)

    const bankAccount = await createVendorBankAccount({ ...parsed, vendorId })
    return res.status(201).json({ message: 'Bank account linked', data: bankAccount })
  } catch (error: any) {
    console.error(error)
    if (error instanceof ZodError) {
      return res.status(400).json({ message: 'Validation failed', details: error.errors })
    }
    return res.status(500).json({ message: error.message || 'Failed to create bank account' })
  }
}

export async function updateBankAccount(req: Request, res: Response) {
  try {
    const vendorId = req.user?.id
    if (!vendorId) return res.status(401).json({ message: 'Unauthorized' })

    const parsed = bankAccountSchema.partial().parse(req.body)

    const updated = await updateVendorBankAccount(vendorId, parsed)
    return res.status(200).json({ message: 'Bank account updated', data: updated })
  } catch (error: any) {
    console.error(error)
    if (error instanceof ZodError) {
      return res.status(400).json({ message: 'Validation failed', details: error.errors })
    }
    return res.status(500).json({ message: error.message || 'Failed to create bank account' })
  }
}



