import crypto from "crypto"
import { ValidationError } from "@packages/error-handler"
import { NextFunction } from "express"
import {redis} from "@packages/libs/redis"
import { sendEmail } from "./sendMail"
import prisma from "@packages/libs/prisma"
import { Request, Response} from "express"
 

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/

export const validateRegistrationData = (data: any, userType: "user" |"vendor") =>{
    const { name, email, password, phone_number, country } = data

    if( 
        !name || 
        !email || 
        !password || 
        ((userType === "vendor") && (!phone_number || !country))
    ){
        return new ValidationError(`Missing required fields`)
    }

    if(!emailRegex.test(email)){
        return new ValidationError("Invalid email format")
    }
}

export const checkOtpRestrictions = async (email: string, next: NextFunction) => {
  try {
    if (!redis) {
      throw new Error("Redis client is not initialized");
    }
    
    const otpLock = await redis.get(`otp_lock:${email}`);
    if (otpLock) {
      throw new ValidationError("Your account is locked due to multiple failed attempts! Try again after 30 minutes");
    }
    
    const otpSpamLock = await redis.get(`otp_spam_lock:${email}`);
    if (otpSpamLock) {
      throw new ValidationError("Too many OTP requests! Please wait for 1 hour before requesting again");
    }
    
    const otpCooldown = await redis.get(`otp_cooldown:${email}`);
    if (otpCooldown) {
      throw new ValidationError("Please wait for 1 minute before requesting a new OTP");
    }
  } catch (error) {
    console.error("Redis operation failed:", error);
    throw error; // Re-throw to be caught by the calling function
  }
}


//* track the number of times a user has sent an OTP request
export const trackOtpRequests = async (email: string, next:NextFunction) => {
  const otpRequestKey = `otp_request_count:${email}`;
  let otpRequests = parseInt((await redis.get(otpRequestKey)) || "0")

  if (otpRequests >= 4) {
    await redis.set(`otp_spam_lock:${email}`, "locked", "EX", 3600)
    throw new ValidationError("Too many OTP requests. Please wait 1 hour before requesting again")
  }

  await redis.set(otpRequestKey, otpRequests + 1, "EX", 3600)
}


export const sendOtp = async (name: string, email: string, template: string) => {
    const otp = crypto.randomInt(100000,999999).toString()
    await sendEmail(email, "Verify Your Email", template, {name, otp})
    await redis.set(`otp:${email}`, otp, "EX", 300)
    await redis.set(`otp_cooldown:${email}`, "true","EX", 60 )

} 

export const verifyOtp = async (
  email: string,
  otp: string
) => {
  const storedOtp = await redis.get(`otp:${email}`);
  if (!storedOtp) {
    throw new ValidationError("Invalid or expired OTP!")
  }

  const failedAttemptsKey = `otp_attempts:${email}`
  const failedAttempts = parseInt((await redis.get(failedAttemptsKey)) || "0")

  if (storedOtp !== otp) {
    if (failedAttempts >= 2) {
      await redis.set(`otp_lock:${email}`, "locked", "EX", 1800)
      await redis.del(`otp:${email}`, failedAttemptsKey)
      throw new ValidationError("Too many failed attempts. Try again after 30 minutes")
    }

    await redis.set(failedAttemptsKey, failedAttempts + 1, "EX", 300)
    throw new ValidationError(`Incorrect OTP. ${2 - failedAttempts} attempts left`)
  }

  // ✅ Correct OTP: clean up
  await redis.del(`otp:${email}`, failedAttemptsKey)
}


export const handleForgotPassword = async(
    req: Request,
    res: Response,
    next: NextFunction,
    userType: "user" | "restaurant"
)=>{

    try{
        const {email} = req.body

        if(!email) throw new ValidationError("Email is required")
        
        //* find user/restaurant/kitchen in DB
        const user = userType === "user" ? (await prisma.users.findUnique({ where:{ email }})) : await prisma.vendor.findUnique({ where:{ businessEmail: email }})

        if(!user) throw new ValidationError(`${userType} not found!`)

        //* Check otp restrictions
        await checkOtpRestrictions(email, next)
        await trackOtpRequests(email,next)

        //*Generate OTP and send Email
        await sendOtp(user.name,email, userType === "user" ? "forgot-password-user-mail":"forgot-password-vendor-mail")

        res.status(200).json({ message: "OTP is sent to your email.Please verify your account"})

    }catch(error){
       next(error) 
    }
}

export const verifyForgotPasswordOtp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, otp } = req.body

    if (!email || !otp) {
      throw new ValidationError("Email and OTP are required!")
    }

    await verifyOtp(email, otp)
    res.status(200).json({ message: "OTP verified. You can now reset your password" })

  } catch (error) {
    next(error)
  }
}




