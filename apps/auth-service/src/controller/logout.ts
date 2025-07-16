
import { NextFunction, Request, Response } from "express"
import prisma from "@packages/libs/prisma"
import jwt from "jsonwebtoken"

export const handleLogout = async(model:string,req:Request, res:Response) => {
    try{

        //* On client also delete the access token
        const cookies = req.cookies
        if(!cookies.jwt) return res.sendStatus(204) //* No cookie available

        const refreshToken = cookies.jwt

        //* is refresh token in db
        const foundUser = await prisma.vendor.findFirst({ where:{refreshToken}})

        if(!foundUser){
            res.clearCookie('jwt',{ httpOnly:true })
            return res.sendStatus(204)
        }

        //* Delete refreshToken in db
        await prisma.vendor.update({
            where: {
                id:foundUser.id,
            },
            data: {
                refreshToken: ''
            },
        })

        //* clear cookie
        res.clearCookie('jwt',{ 
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production'
        
        })

        res.sendStatus(204)
    }catch(error){
        console.log(`Logout error - ${error}`)
        res.status(500).json({ error: 'Server error during logout' });
    }

}


// interface AuthModel {
//   findUnique: (args: any) => Promise<{ id: string; refreshToken: string | null } | null>;
//   update: (args: any) => Promise<any>;
// }

// export const Logout = (model: AuthModel) => async (req: Request, res: Response) => {
//   const { refreshToken } = req.cookies
//   if (!refreshToken) return res.sendStatus(204); // No content

//   try {

//     const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!) as { id: string }

//     if(!decoded){
//         return res.status(403).json({error:"Invalid token"})
//     }

//     const foundUser = await model.findUnique({
//       where: { refreshToken }
//     })

//     if (!foundUser) {
//       res.clearCookie('refreshToken', { 
//         httpOnly: true,
//         secure: process.env.NODE_ENV === 'production',
//         sameSite: 'strict'
//       })
//       return res.sendStatus(204);
//     }

//     // Delete from Redis
//     // await redis.del(`refresh_token:${foundUser.id}`);

//     await model.update({
//       where: { id: foundUser.id },
//       data: { refreshToken: null }
//     })

//     res.clearCookie('refreshToken', {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === 'production',
//       sameSite: 'strict'
//     })
    
//     res.sendStatus(204)
//   } catch (error) {
//     //* If token verification fails, just clear the cookie
//     res.clearCookie('refreshToken', {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === 'production',
//       sameSite: 'strict'
//     })
//     res.sendStatus(204)
//   }
// };