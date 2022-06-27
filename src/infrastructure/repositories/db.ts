import {EmailConfirmationType, UserAccountDBType, UserAccountType} from './types'
import {settings} from '../../settings'

import mongoose from 'mongoose'

//const client = new MongoClient(settings.MONGO_URI);

//let db = client.db("users-registration")

//export const usersAccountsCollection = db.collection<UserAccountDBType>('accounts')

const SentConfirmationEmailScheme = new mongoose.Schema<SentConfirmationEmailType>({
    sentDate: { type: Date, required: true }
})

const EmailConfirmationScheme = new mongoose.Schema<EmailConfirmationType>({
    isConfirmed: Boolean,
    confirmationCode: {type: String, required: true}, // sdfsfjshf sjfs fjkas
    expirationDate: { type: Date, required: true },
    sentEmails: [SentConfirmationEmailScheme]
})

export type SentConfirmationEmailType = {
    sentDate: Date
}
export type LoginAttemptType = {
    attemptDate: Date
    ip: string
}

const UserSchema = new mongoose.Schema<UserAccountDBType>({
    accountData: { type: Object, required: false  },
    loginAttempts: [{type: Object}],
    emailConfirmation: { type: EmailConfirmationScheme, required: true  },
    hey: { type: String, required: false  },
});

export const UserModel = mongoose.model('Users', UserSchema);


export async function runDb() {
    try {
        // Connect the client to the server
        await mongoose.connect(settings.MONGO_URI);
        // Establish and verify connection
        console.log("Connected successfully to mongo server");
    } catch {
        console.error("Can't connect to DB");
        // Ensures that the client will close when you finish/error
        await mongoose.disconnect();
    }
}
