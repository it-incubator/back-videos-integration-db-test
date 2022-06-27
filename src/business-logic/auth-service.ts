import {UserAccountDBType} from '../infrastructure/repositories/types'
import {ObjectId} from 'mongodb'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {settings} from '../settings'
import {v4 as uuidv4} from 'uuid'
import {addMinutes} from 'date-fns'
import {EmailTemplatesManager} from '../infrastructure/email-templates-manager'
import {EmailAdapter} from '../infrastructure/email-adapter'
import {UsersService} from './users-service'
import {UsersRepository} from '../infrastructure/repositories/users-repository'

export class AuthService {
    constructor(protected emailTemplatesManager: EmailTemplatesManager,
                protected emailAdapter: EmailAdapter,
                protected usersRepository: UsersRepository,
                protected usersService: UsersService) {
    }

    async createUser(login: string, email: string, password: string): Promise<UserAccountDBType> {
        const passwordHash = await this._generateHash(password)
        // @ts-ignore
        const user: UserAccountDBType = {
            _id: new ObjectId(),
            accountData: {
                userName: login,
                email,
                passwordHash,
                createdAt: new Date()
            },
            loginAttempts: [],
            emailConfirmation: {
                sentEmails: [],
                confirmationCode: uuidv4(),
                expirationDate: addMinutes(new Date(), 3000), //todo: get now + 1 day,
                isConfirmed: false
            }
        }
        const createResult = await this.usersRepository.createUser(user)

        const messageBody = this.emailTemplatesManager.getEmailConfirmationMessage(user)
        this.emailAdapter.sendEmail(user.accountData.email, 'sales! important!', messageBody)

        return createResult
    }
    async checkCredentials(loginOrEmail: string, password: string) {
        const user = await this.usersRepository.findByLoginOrEmail(loginOrEmail)
        if (!user) return null

        if (!user.emailConfirmation.isConfirmed) {
            return null
        }

        const isHashesEquals = await this._isPasswordCorrect(password, user.accountData.passwordHash)
        if (isHashesEquals) {
            return user
        } else {
            return null
        }
    }
    async _generateHash(password: string) {
        const hash = await bcrypt.hash(password, 10)
        return hash
    }
    async _isPasswordCorrect(password: string, hash: string) {
        const isEqual = await bcrypt.compare(password, hash)
        return isEqual
    }
    async checkAndFindUserByToken(token: string) {
        try {
            const result: any = jwt.verify(token, settings.JWT_SECRET)
            const user = await this.usersService.findUserById(new ObjectId(result.userId))
            return user
        } catch (error) {
            return null
        }
    }
    async confirmEmail(code: string, email: string): Promise<boolean> {
        let user = await this.usersRepository.findByLoginOrEmail(email)
        if (!user) return false
        if (user.emailConfirmation.confirmationCode === code && user.emailConfirmation.expirationDate > new Date()) {
            let result = await this.usersRepository.updateConfirmation(user._id)
            return result
        }
        return false
    }


}
