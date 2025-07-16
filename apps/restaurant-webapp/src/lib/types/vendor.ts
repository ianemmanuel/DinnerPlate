export interface VendorRegistrationPayload {
  businessType: 'restaurant' | 'commercial_kitchen'
  businessName: string
  businessEmail: string
  ownerFirstName: string
  ownerLastName: string
  legalBusinessName?: string
  businessPhone: string
  country: string
  city: string
  street: string
  postalCode: string
  latitude?: number | null
  longitude?: number | null
  password: string
  agreedToTerms: boolean
  confirmSubmission: boolean
}

export interface VendorRegistrationResponse {
  success: boolean
  message?: string
  vendor?: {
    id: string
    businessEmail: string
    status: string
  }
  tokens?: {
    accessToken: string
    refreshToken: string
  }
}