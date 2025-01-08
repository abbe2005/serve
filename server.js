const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/send-message', (req, res) => {
    const { name, email, message } = req.body;

    // Configure nodemailer transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail', // or your email service
        auth: {
            user: 'abdennourbesselma19@gmail.com', // your email
            pass: 'abdennour17' // your email password
        }
    });

    const mailOptions = {
        from: email,
        to: 'abdennourbesselma19@gmail.com', // your email
        subject: `New Message from ${name}`,
        text: message
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.status(200).send('Message sent: ' + info.response);
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});