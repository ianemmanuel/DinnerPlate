
import { NextFunction, Request, Response } from "express"
import { checkOtpRestrictions, handleForgotPassword, sendOtp, trackOtpRequests, validateRegistrationData, verifyForgotPasswordOtp, verifyOtp } from "../utils/auth.helper"
import prisma from "@packages/libs/prisma"
import { AuthError, ValidationError } from "@packages/error-handler"
import bcrypt from "bcryptjs"
import jwt, { JsonWebTokenError } from "jsonwebtoken"
import { setCookie } from "../utils/cookies/setCookies"

export const userRegistration = async (req:Request, res:Response, next:NextFunction) =>{

    try{
        validateRegistrationData(req.body, "user")
        const {name, email} = req.body
        console.log(name,email)

        const existingUser = await prisma.users.findUnique({ where:{email}})

        if(existingUser){
            return next(new ValidationError("Email already in use"))
        }

        await checkOtpRestrictions(email, next)
        await trackOtpRequests(email)
        await sendOtp(name,email, "user-activation-mail")
        console.log(`tulifika`,name,email)

        res.status(200).json({
            message: "OTP sent to your email. Please verify your account"
        })
    }catch(error){
        return next(error)
    }
}

//*Verify user with otp
export const verifyUser = async(
    req:Request, 
    res:Response, 
    next:NextFunction
) => {
    try{
        const { email, otp, password, name } = req.body

        if(!email || !otp || !password || !name){
            return next(new ValidationError("All fields are required"))
        }

        const existingUser = await prisma.users.findUnique({where: { email }})

        if(existingUser) {
            return next(new ValidationError("Email already in use"))
        }

        await verifyOtp(email, otp)
        const hashedPassword = await bcrypt.hash(password, 10)

        await prisma.users.create({
            data:{
                name,
                email,
                password: hashedPassword
            }
        })

        res.status(201).json({
            success: true,
            message:"Successful signup"
        })        

    } catch(error){
        return next(error)
    }
}

//* Login user
export const loginUser = async(req:Request, res:Response, next:NextFunction) => {

    try{
        const {email,password} = req.body

        if(!email || !password) {
            return next(new ValidationError("Email and password are required"))
        }

        const user = await prisma.users.findUnique({ where: { email }})

        if (!user) return next(new AuthError("Invalid email or password"))
        
        //*Verify password
        const isMatch = await bcrypt.compare(password, user.password!)

        if(!isMatch) {
            return next(new AuthError("Invalid email or password"))
        }
        
        //* Generate access and refresh token
        const accessToken = jwt.sign(
            {id: user.id, role:"user"},
            process.env.ACCESS_TOKEN_SECRET as string,
            {expiresIn: "15m"}
        )
        const refreshToken = jwt.sign(
            {id: user.id, role:"user"},
            process.env.REFRESH_TOKEN_SECRET as string,
            {expiresIn: "7d"}
        )

        //* Store the refresh and access token in an httpOnly secure cookie
        setCookie(res,"refresh_token", refreshToken)
        setCookie(res, "access_token", accessToken)

        res.status(200).json({
            message: "Login successful!",
            user: { id:user.id, email:user.email, name:user.name}
        })
    } catch(error){
        return next(error)
    }
}

//* refresh token
export const refreshToken = async(req:Request, res:Response, next:NextFunction) => {
    try {
        const refreshToken = req.cookies.refresh_token

        if(!refreshToken){
            throw new ValidationError("Unauthorized! No refresh token")
        }

        const decoded = jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET as string
        ) as {id: string; role: string}

        if(!decoded || !decoded.id || !decoded.role){
            throw new JsonWebTokenError("Forbidden! Invalid refresh token")
        }

        const user = await prisma.users.findUnique({ where: {id: decoded.id}})

        if(!user) {
            throw new AuthError("Forbidden! User not found")
        }

        const newAccessToken = jwt.sign(
            {id: decoded.id, role:decoded.role},
            process.env.ACCESS_TOKEN_SECRET as string,
            { expiresIn: "20m"}
        )

        setCookie(res, "access_token", newAccessToken)
        return res.status(201).json({success: true})

    } catch(error){
        return next(error)
    }
}

//* get logged in user
export const getUser = async(req:any, res:Response, next:NextFunction) => {
    try{
        const user = req.user
        console.log(`controller-${user.name}`)
        res.status(201).json({
            success: true,
            user
        })
    } catch (error) {
        next(error)
    }
}

//* handle forgot password
export const userForgotPassword = async(req:Request, res:Response, next: NextFunction)=>{
    await handleForgotPassword(req,res,next, 'user')
}

//* Verify forgot password OTP
export const verifyUserPassword = async(req:Request, res:Response, next: NextFunction) =>{
    await verifyForgotPasswordOtp(req,res,next)
}

//* Reset user password
export const resetUserPassword = async(req:Request, res:Response, next: NextFunction) => {

    try{
        const { email, newPassword } = req.body

        if(!email || !newPassword){
            return next(new ValidationError("Email and new password are required"))
        }

        const user = await prisma.users.findUnique({where: {email}})

        if(!user) return next(new ValidationError("User not found"))

        //* compare new password with the existing one
        const isSamePassword = await bcrypt.compare(newPassword, user.password!)

        if(isSamePassword){
            return next(
                new ValidationError(
                    "New password cannot be same as the old password"
                )
            )
        }
        //* Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10)

        await prisma.users.update({
            where: {email},
            data: { password: hashedPassword }
        })

        res.status(200).json({ message: "Password reset successfully"})
    } catch(error){
        next(error)
    }
} 

export const verifyUserForgotPassword = async(
    req:Request,
    res:Response,
    next: NextFunction
)=>{
    await verifyForgotPasswordOtp(req, res, next)
}
