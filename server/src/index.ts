import express, { Express } from 'express'

import dotenv from 'dotenv'
import cors from 'cors'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'

import { user } from './features/user'
import { auth } from './features/auth'
import errorHandlerMiddleware from './middlewares/errorHandlerMiddleware'

dotenv.config()
const app: Express = express()
const port = process.env.PORT || 3001

const corsOptions = {
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true
}
app.use(cors(corsOptions))
app.use(bodyParser.json({ limit: "100mb" }))
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }))
app.use(cookieParser())

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})

app.use('/user', user)
app.use('/auth', auth)
app.use(errorHandlerMiddleware)