import {UserAccountDBType} from './repositories/types'

export class EmailTemplatesManager {
    getEmailConfirmationMessage(user: UserAccountDBType) {
        return `<div>
<h1>Thanks for registration</h1>
<h3>Confirm your email</h3>
<a href='http://supersite.com?code=${user.emailConfirmation.confirmationCode}'>
http://supersite.com?code=${user.emailConfirmation.confirmationCode}
</a>
</div>`
    }
}
