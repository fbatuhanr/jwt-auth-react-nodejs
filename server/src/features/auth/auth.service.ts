import jwt from 'jsonwebtoken'

interface UserTokenPayload {
    username: string
}

function generateAccessToken(user: UserTokenPayload): string {

    const { username } = user
    return jwt.sign({ username }, process.env.ACCESS_TOKEN_SECRET!, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRATION!
    })
}

function generateRefreshToken(user: UserTokenPayload): string {

    const { username } = user
    return jwt.sign({ username }, process.env.REFRESH_TOKEN_SECRET!, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRATION!
    })
}

async function refreshToken(refreshToken: string) {

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!) as UserTokenPayload
    const { username } = decoded

    const newAccessToken = generateAccessToken({ username })
    const newRefreshToken = generateRefreshToken({ username })

    return { accessToken: newAccessToken, refreshToken: newRefreshToken }
}

export { generateAccessToken, generateRefreshToken, refreshToken }