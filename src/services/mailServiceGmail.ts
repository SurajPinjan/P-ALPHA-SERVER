import nodemailer from 'nodemailer';
import { _transporter } from '..';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

const transportFactory = (user: string, pass: string) => {
    return nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user,
            pass
        },
        // debug: true,
        // logger: true
    });
}

const sendMail = async (to: string, subject: string, text: string):
    Promise<SMTPTransport.SentMessageInfo> => {

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        text,
    };

    const _status: Promise<SMTPTransport.SentMessageInfo> = _transporter.sendMail(mailOptions);
    return _status;

};

export { sendMail, transportFactory }