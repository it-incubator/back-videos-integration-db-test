import {UserAccountDBType} from '../infrastructure/repositories/types'
import {ObjectId} from 'mongodb'
import {UsersRepository} from '../infrastructure/repositories/users-repository'


export class UsersService {
    constructor(protected usersRepository: UsersRepository) {

    }
    async getAllUsers(): Promise<UserAccountDBType[]> {
        return this.usersRepository.getAllUsers()
    }
    async findUserById(id: ObjectId): Promise<UserAccountDBType | null> {
        return this.usersRepository.findUserById(id)
    }
}
