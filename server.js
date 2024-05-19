import express from 'express';
import mongoose from 'mongoose';
import nodemailer from 'nodemailer';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import Email from './models/email.js';

dotenv.config();

const app = express();
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Email-ის გაგზავნის როუტი
app.post('/send-email', async (req, res) => {
    const { to, subject, text } = req.body;
    
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        text
    };

    try {
        //გაგზავნა
        const info = await transporter.sendMail(mailOptions);
        
        //შენახვა
        const email = new Email({ to, subject, text, sent: true });
        await email.save();

        res.status(200).send({ message: 'Email sent', info });
    } catch (error) {
        res.status(500).send({ message: 'Error sending email', error });
    }
});

// Email-ების წაკითხვის როუტი
app.get('/emails', async (req, res) => {
    try {
        // ყველას მოპოვება
        const emails = await Email.find();
        res.status(200).send(emails);
    } catch (error) {
        res.status(500).send({ message: 'Error retrieving emails', error });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
