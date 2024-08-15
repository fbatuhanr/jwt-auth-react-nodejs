import { generateAccessToken, generateRefreshToken } from "../auth/auth.service";

interface UserProps {
    username: string;
    password: string;
}
async function login(data: UserProps) {

    const { username, password } = data
    if (!username || !password) return false
    if(username !== "admin" || password !== "123") return false

    const accessToken = generateAccessToken({ username })
    const refreshToken = generateRefreshToken({ username })
    return { accessToken, refreshToken }
}

async function logout() {
    return
}

export { login, logout }