// lib/api.ts

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${process.env.NEXT_PUBLIC_SERVER_URI}/vendor/login`,
    REFRESH_TOKEN: `${process.env.NEXT_PUBLIC_SERVER_URI}/auth/refresh-token`,
    LOGOUT: `${process.env.NEXT_PUBLIC_SERVER_URI}/auth/logout`,
    VERIFY_TOKEN: `${process.env.NEXT_PUBLIC_SERVER_URI}/auth/verify-access-token`,
    FETCH_USER:`${process.env.NEXT_PUBLIC_SERVER_URI}/auth/fetch-user`,
  },
  PROFILE:{
    CREATE_PROFILE: `${process.env.NEXT_PUBLIC_SERVER_URI}/vendor/create-profile`
  },
  REGISTER:{
    VENDOR_REGISTRATION:`${process.env.NEXT_PUBLIC_SERVER_URI}/vendor/registration`,
    SEND_OTP: `${process.env.NEXT_PUBLIC_SERVER_URI}/vendor/send-otp`,
    VERIFY_EMAIL: `${process.env.NEXT_PUBLIC_SERVER_URI}/vendor/verify-email`,
  },
  BANKS: {
    FLUTTERWAVE_BANKS: `https://api.flutterwave.com/v3/banks/KE`,
    LINK_BANK_ACCOUNT: `${process.env.NEXT_PUBLIC_SERVER_URI}/vendor/bank-account`,
    UPDATE_BANK_ACCOUNT: `${process.env.NEXT_PUBLIC_SERVER_URI}/vendor/bank-account`
    
  }
}