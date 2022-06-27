import {UserAccountDBType} from '../infrastructure/repositories/types'

declare global {
    declare namespace Express {
        export interface Request {
            user: UserAccountDBType | null
        }
    }
}
