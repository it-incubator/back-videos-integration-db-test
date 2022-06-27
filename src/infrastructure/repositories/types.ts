import {WithId} from 'mongodb'

export type UserAccountDBType = WithId<{
    accountData: UserAccountType,
    loginAttempts: LoginAttemptType[],
    emailConfirmation: EmailConfirmationType
    hey: string | null
}>

export type EmailConfirmationType = {
    isConfirmed: boolean
    confirmationCode: string // sdfsfjshf sjfs fjkas
    expirationDate: Date // +1day
    sentEmails: SentConfirmationEmailType[]
}
export type UserAccountType = {
    email: string
    userName: string
    passwordHash: string
    createdAt: Date
}
export type SentConfirmationEmailType = {
    sentDate: Date
}
export type LoginAttemptType = {
    attemptDate: Date
    ip: string
}
