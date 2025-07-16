import { Request, Response } from 'express'
import prisma from '@packages/libs/prisma'
import { verifyRefreshToken, generateTokens } from '../utils/tokens/refresh-access-tokens'

// Updated handleRefreshToken in tokens.ts
export const handleRefreshToken = async (req: Request, res: Response) => {
  const oldRefreshToken = req.cookies?.refreshToken;
  console.log(`hapa-${oldRefreshToken}`)
  if (!oldRefreshToken) return res.status(401).json({error:"Error 401"})

  try {
    const decoded = verifyRefreshToken(oldRefreshToken);
    if (!decoded || typeof decoded === 'string') return res.sendStatus(403)

    const vendor = await prisma.vendor.findFirst({
      where: { id: decoded.id, refreshToken: oldRefreshToken }
    });
    if (!vendor) return res.sendStatus(403);

    const { accessToken, refreshToken: newRefreshToken } = generateTokens({
      id: vendor.id,
      type: vendor.type,
      status: vendor.status
    });

    await prisma.vendor.update({
      where: { id: vendor.id },
      data: { refreshToken: newRefreshToken }
    });

    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',  // Fix for local development
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.json({ accessToken });
  } catch (error) {
    console.error('Refresh token error:', error);
    return res.sendStatus(500);
  }
};