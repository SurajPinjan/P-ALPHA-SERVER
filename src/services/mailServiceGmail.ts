import nodemailer from 'nodemailer';
import { _transporter } from '..';

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

const sendMail = async (to: string, subject: string, text: string) => {

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        text,
    };

    await _transporter.sendMail(mailOptions);

};

export { sendMail, transportFactory }