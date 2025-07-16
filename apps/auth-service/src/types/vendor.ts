import { Prisma } from '@prisma/client';

export interface VendorPayload {
  id: string
  type?: string
  status?: string
  email?: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface VendorAuthPayload {
  id: string
  type: string
  status: string
}

export type SocialLink = Prisma.JsonObject & {
  platform: string
  url: string
}

export type Images = {
  id: string 
  file_id: string
  url: string
  vendorProfileId: string  
}

export interface CreateProfileRequest {
  avatar?: string
  bio?: string
  coverBanner?: string
  openingHours?: any
  website?: string
  socialLinks?: SocialLink[]
  images?: string[]
}

export interface UpdateProfileRequest {
  avatar?: string
  bio?: string
  coverBanner?: string
  openingHours?: any
  website?: string
  socialLinks?: SocialLink[]
  images?: { file_id: string; url: string }[]
}
