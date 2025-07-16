import { Response } from "express"

export const setCookie = (res:Response, name:string, value:string) => {
    res.cookie(name, value, {
        httpOnly:true,
        secure:process.env.NODE_ENV === 'production',
        sameSite:"lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
        path: '/',
    })
}