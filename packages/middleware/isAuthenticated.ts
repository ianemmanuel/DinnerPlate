import prisma from "@packages/libs/prisma"
import { NextFunction, Response } from "express" 
import jwt from "jsonwebtoken"


const isAuthenticated = async(req:any, res:Response, next:NextFunction) => {
    try{
        const token =  req.headers.authorization?.split(" ")[1]

        if(!token){
            console.log("Unauthorized 1")
            return res.status(401).json({message:"Unauthorized! Token missing"})
        }

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as { id: string; role:"user" | "vendor"}

        if(!decoded) {
            console.log("Unauthorized 2")
            return res.status(401).json({
                message: "Unauthorized! Invalid token"
            })
        }

        const account = await prisma.users.findUnique({ where: { id:decoded.id }})

        req.user = account
        console.log(account)

        if(!account) {
            console.log("Unauthorized 3")
            return res.status(401).json({ message: "Account not found"})
        }

        return next()
         
    } catch (error){
        console.log("Unauthorized 4")
        return res
            .status(401)
            .json({ message:"Unauthorized! Token expired or invalid" })
    }
}


export default isAuthenticated