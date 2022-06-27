import nodemailer from 'nodemailer'

export class EmailAdapter {

    async sendEmail(email: string, subject: string, messageBody: string) {
        console.log(process.env.EMAIL_FROM)
        let transporter = nodemailer.createTransport({
            service: 'gmail',                              // the service used
            auth: {
                user: process.env.EMAIL_FROM,              // authentication details of sender, here the details are coming from .env file
                pass: process.env.EMAIL_FROM_PASSWORD,
            },
        })
        transporter.sendMail({
            from: 'dimych service',
            to: email,
            html: messageBody,
            subject: subject
        }, (err) => {
            console.log(err)
            debugger;
        })

    }
}
