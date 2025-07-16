import jwt from 'jsonwebtoken'
import { VendorPayload } from '../types/vendor'
import { TokenPair } from '../types/tokens'

if (!process.env.ACCESS_TOKEN_SECRET || !process.env.REFRESH_TOKEN_SECRET) {
  throw new Error('JWT secrets are not configured in environment variables')
}

export const generateTokens = (vendor: VendorPayload): TokenPair => {
  const accessToken = jwt.sign(
    { id: vendor.id, type: vendor.type, status: vendor.status },
    process.env.ACCESS_TOKEN_SECRET!,
    { expiresIn: '1h' }
  )

  const refreshToken = jwt.sign(
    { id: vendor.id },
    process.env.REFRESH_TOKEN_SECRET!,
    { expiresIn: '7d' }
  )

  return { accessToken, refreshToken }
}

export const verifyRefreshToken = (token: string) => {
  try {
    return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET!)
  } catch (error) {
    console.error('Refresh token verification failed:', error)
    return null
  }
}