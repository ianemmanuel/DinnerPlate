import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

interface VendorPayload {
  id: string;
  type?: string;
  status?: string;
}

export const generateTokens = (vendor: VendorPayload) => {
  if (!process.env.ACCESS_TOKEN_SECRET || !process.env.REFRESH_TOKEN_SECRET) {
    throw new Error('JWT secrets missing!');
  }

  const accessToken = jwt.sign(
    { id: vendor.id, type: vendor.type, status: vendor.status },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '15m' }  // Shorter expiry for security
  );

  const refreshToken = jwt.sign(
    { id: vendor.id },  // Keep it minimal
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '7d' }
  );

  return { accessToken, refreshToken };
};

export const verifyRefreshToken = (token: string) => {
  try {
    return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET!);
  } catch (error) {
    console.error('Refresh token invalid:', error);
    return null;
  }
};