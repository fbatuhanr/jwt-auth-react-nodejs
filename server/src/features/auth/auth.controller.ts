import { Request, Response, NextFunction } from 'express'
import * as authService from './auth.service'
import ms from 'ms'

async function refreshToken(req: Request, res: Response, next: NextFunction) {

    const { refreshToken } = req.cookies // get the refresh token from the cookies
    if (!refreshToken)
        return res.status(403).json({ message: 'Refresh token not provided.' })

    try {
        const newTokens = await authService.refreshToken(refreshToken)
        
        res.cookie("refreshToken", newTokens.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? "none" : "strict",
            maxAge: ms(process.env.REFRESH_TOKEN_EXPIRATION!)
        })
        return res.status(200).json({
            message: 'Token refreshed successfully!',
            accessToken: newTokens.accessToken,
        })

    } catch (error) {
        
        console.log("invalid refresh token")
        next(error)
    }
}

export { refreshToken }