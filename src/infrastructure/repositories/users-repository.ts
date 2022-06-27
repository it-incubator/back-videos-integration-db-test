import {UserModel} from './db'
import {UserAccountDBType} from './types'
import {ObjectId} from 'mongodb'

export class UsersRepository {
    async getAllUsers(): Promise<UserAccountDBType[]> {
        return UserModel
            .find()
            .sort({'createdAt': -1})
            .lean()
    }
    async createUser(user: UserAccountDBType): Promise<UserAccountDBType> {
        const result = await UserModel.create(user)
        return user
    }
    async findUserById(id: ObjectId): Promise<UserAccountDBType | null> {
        let product = await UserModel.findOne({_id: id})
        if (product) {
            return product
        } else {
            return null
        }
    }
    async findByLoginOrEmail(loginOrEmail: string) {
        const user = await UserModel.findOne({$or: [{"accountData.email": loginOrEmail}, {"accountData.userName": loginOrEmail}]})
        return user
    }
    async updateConfirmation(_id: ObjectId) {

        const user = await UserModel.findOne({_id})
        const user2 = await UserModel.findOne({_id})
        user!.emailConfirmation.isConfirmed = true;

        await user!.save()

        user2!.emailConfirmation.isConfirmed = false;
        await user2!.save();

       return true;
    }
}
