import prisma from "@packages/libs/prisma";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const verifyJWT = async (req: Request, res: Response, next: NextFunction) => {
  let token: string | undefined
  const authHeader = req.headers['authorization'] || req.headers['Authorization']

  if (Array.isArray(authHeader)) {
    token = authHeader[0]?.split(' ')[1]
  } else if (typeof authHeader === 'string') {
    token = authHeader.split(' ')[1]
  }

  try {
    // 1️⃣ Try verify access token first
    if (token) {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as { id: string; role: "user" | "vendor" };

      const account = decoded.role === "user"
        ? await prisma.users.findUnique({
            where: { id: decoded.id },
            select: { id: true, email: true, name: true }
          })
        : await prisma.vendor.findUnique({
            where: { id: decoded.id },
            select: { id: true, businessEmail: true, businessName: true, businessPhone: true, type: true, status: true }
          });

      if (!account) return res.sendStatus(401);

      req.user = account;
      return next();
    }
  } catch (error) {
    console.error("Access token invalid or expired:", error);
    // Proceed to try refresh token
  }

  try {
    // 2️⃣ Try verify refresh token if access token failed
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) return res.status(401).json({message:'Uko unauthorized'});

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!) as { id: string; role: "user" | "vendor" };

    // Load user or vendor based on role
    const account = decoded.role === "user"
      ? await prisma.users.findUnique({
          where: { id: decoded.id },
          select: { id: true, email: true, name: true }
        })
      : await prisma.vendor.findUnique({
          where: { id: decoded.id },
          select: { id: true, businessEmail: true, businessName: true, businessPhone: true, type: true, status: true }
        });

    if (!account) return res.sendStatus(401);

    // Issue new access token
    const newAccessToken = jwt.sign(
      { id: decoded.id, role: decoded.role },
      process.env.ACCESS_TOKEN_SECRET!,
      { expiresIn: "15m" }
    );

    // Send new access token in response header
    res.setHeader("x-access-token", newAccessToken);

    req.user = account;
    return next();
  } catch (error) {
    console.error("Refresh token invalid:", error);
    return res.status(401).json({ message: "Unauthorized 22" });
  }
};
