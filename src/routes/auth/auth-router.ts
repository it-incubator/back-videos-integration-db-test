import {Request, Response, Router} from 'express'
import {} from '../../infrastructure/jwt-service'
import {authService, jwtService} from '../../composition-root'

export const authRouter = Router({})

authRouter.post('/registration',
    async (req: Request, res: Response) => {
        const user = await authService.createUser(req.body.login, req.body.email, req.body.password)
        res.status(201).send()
    })

authRouter.post('/login',
    async (req: Request, res: Response) => {
        const user = await authService.checkCredentials(req.body.loginOrEmail, req.body.password)
        if (user) {
            const token = await jwtService.createJWT(user)
            res.status(201).send(token)
        } else {
            res.sendStatus(401)
        }
    })

authRouter.post('/confirm-email',
    async (req: Request, res: Response) => {
        const result = await authService.confirmEmail(req.body.code, req.body.email)
        if (result) {
            res.status(201).send()
        } else {
            res.sendStatus(400)
        }
    })
authRouter.post('/resend-registration-code',
    async (req: Request, res: Response) => {
        const result = await authService.confirmEmail(req.body.code, req.body.email)
        if (result) {
            res.status(201).send()
        } else {
            res.sendStatus(400)
        }
        res.sendStatus(429)
    })
