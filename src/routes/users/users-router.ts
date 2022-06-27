import {Request, Response, Router} from 'express'
import {usersService} from '../../composition-root'

export const usersRouter = Router({})

usersRouter.get('/', async (req: Request, res: Response) => {
    const users = await usersService
        .getAllUsers()
    res.send(users)
})
