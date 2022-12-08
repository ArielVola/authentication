import nodemailer from 'nodemailer';

const MAILER_AUTH_EMAIL = process.env.MAILER_AUTH_EMAIL; 
const MAILER_AUTH_PASS = process.env.MAILER_AUTH_PASS;

export const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: MAILER_AUTH_EMAIL,
        pass: MAILER_AUTH_PASS
    }
});

transporter.verify().then(() => {
    console.log('📧 Mailer up');
});