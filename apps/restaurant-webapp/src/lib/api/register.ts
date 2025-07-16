import { API_ENDPOINTS } from "../endpoints"
import { useAuthStore } from "../store/auth-store"
import { VendorRegistrationPayload, VendorRegistrationResponse } from "../types/vendor"

export const sendEmailOtp = async (email: string) => {
  const response = await fetch(API_ENDPOINTS.REGISTER.SEND_OTP, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ businessEmail: email }),
    credentials: 'include' // If using cookies
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Failed to send OTP')
  }

  return response.json()
}

export const verifyEmailOtp = async (email: string, otp: string) => {
  const response = await fetch(API_ENDPOINTS.REGISTER.VERIFY_EMAIL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ businessEmail: email, otp }),
    credentials: 'include'
  })

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Verification failed');
  }

  return response.json()
}

export const vendorRegistration = async (data: VendorRegistrationPayload): Promise<VendorRegistrationResponse> => {
  try {
    const response = await fetch(API_ENDPOINTS.REGISTER.VENDOR_REGISTRATION, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      credentials: 'include',
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Registration failed')
    }

    const result = await response.json()
    
    //* If registration includes automatic login (uncomment if needed)
    if (result.tokens) {
      useAuthStore.getState().login({
        accessToken: result.tokens.accessToken,
        refreshToken: result.tokens.refreshToken
      })
    }
    
    return {
      success: true,
      vendor: result.vendor,
      tokens: result.tokens,
      message: result.message
    };
  } catch (error) {
    console.error('Registration error:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Registration failed'
    };
  }
}
