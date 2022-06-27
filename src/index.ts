import 'dotenv/config'
import express from 'express'
import bodyParser from 'body-parser'
import {runDb} from './infrastructure/repositories/db'
import {authRouter} from './routes/auth/auth-router'
import {usersRouter} from './routes/users/users-router'
import session from 'express-session'
import cookieParser from 'cookie-parser'

const app = express()

let usersOnline = 0

const daysToMS = (daysCunt: number) => {
    return daysCunt * 24 * 60 * 60 * 1000
}

const oneDay = daysToMS(1)
app.use(session({
    secret: process.env.SESSION_SECRET!,
    saveUninitialized: true,
    cookie: {maxAge: oneDay},
    resave: false
}))

const jsonBodyMiddleware = bodyParser.json()
app.use(jsonBodyMiddleware)
app.use(cookieParser())

const port = process.env.PORT || 5000

app.use('/users', usersRouter)
app.use('/auth', authRouter)
app.use('/login', (req, res) => {
    if (true) { // login true
        const refreshToken = 'refreshTokenValue.blsbsl.hash'
        res.cookie('refreshToken', refreshToken, {
            maxAge: daysToMS(1),
            httpOnly: true
        })
    }

    res.send('hello')
})

const startApp = async () => {
    await runDb()
    app.listen(port, () => {
        console.log(`App started: ${port}`)
    })
}

startApp()
