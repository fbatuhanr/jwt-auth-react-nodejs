import { Request, Response, NextFunction } from "express"
import * as userService from './user.service'
import ms from "ms"

async function login(req: Request, res: Response, next: NextFunction) {
    try {
      const result: any = await userService.login(req.body);
      if (!result)
        return res.status(404).json({ message: 'Invalid username or password!' })
      if (!result.refreshToken || !result.accessToken)
        return res.status(500).json({ message: 'Unexpected error occurred.' })
  
      res.cookie("refreshToken", result.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // its true when production and its false development mode
        sameSite: process.env.NODE_ENV === 'production' ? "none" : "strict", // its none when we made production because its based on different domains, but in development its strict because localhost wants that
        maxAge: ms(process.env.REFRESH_TOKEN_EXPIRATION!)
      });
      return res.status(200).json({
        message: 'Login successful!',
        accessToken: result.accessToken
      })
  
    } catch (error) {
      next(error)
    }
  }
  async function logout(req: Request, res: Response, next: NextFunction) {
    try {
      await userService.logout()
      res.clearCookie('refreshToken')
      return res.status(200).json({ message: 'Logged out successfully' });

    } catch (error) {
      next(error);
    }
  }

  export { login, logout }