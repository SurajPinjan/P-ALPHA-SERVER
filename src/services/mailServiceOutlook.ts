import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    secure: false, // Use TLS
    auth: {
        user: 'xxxxxx@outlook.com',
        pass: 'xxxxxx@123'
    },
    tls: {
        ciphers: 'SSLv3',
        rejectUnauthorized: false
    },
    debug: true,
    logger: true
});


export const sendMail = async (to: string, subject: string, text: string) => {

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        text,
    };

    await transporter.sendMail(mailOptions);

};


sendMail(
    'surajbpinjan92@gmail.com', 'imp mail', 'hello everone'
)
