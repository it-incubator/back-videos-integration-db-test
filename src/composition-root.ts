import {UsersService} from './business-logic/users-service'
import {UsersRepository} from './infrastructure/repositories/users-repository'
import {AuthService} from './business-logic/auth-service'
import {EmailTemplatesManager} from './infrastructure/email-templates-manager'
import {EmailAdapter} from './infrastructure/email-adapter'
import {JwtService} from './infrastructure/jwt-service'



const usersRepository = new UsersRepository()
export const usersService = new UsersService(usersRepository)

const emailTemplatesManager = new EmailTemplatesManager()
const emailAdapter = new EmailAdapter()
export const authService = new AuthService(emailTemplatesManager, emailAdapter, usersRepository, usersService)

export const jwtService = new JwtService()
