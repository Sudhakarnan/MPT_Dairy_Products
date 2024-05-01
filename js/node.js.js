const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Endpoint to send email
app.post('/send-email', (req, res) => {
    const { formData, fromEmail, toEmail } = req.body;

    // Create a transporter with your email service provider's credentials
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your-email@gmail.com',
            pass: 'your-email-password'
        }
    });

    // Construct the email message
    const mailOptions = {
        from: fromEmail,
        to: toEmail,
        subject: formData.subject,
        text: `
            Name: ${formData.name}
            Email: ${formData.email}
            Message: ${formData.message}
        `
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            res.status(500).json({ error: 'Failed to send email' });
        } else {
            console.log('Email sent:', info.response);
            res.status(200).json({ message: 'Email sent successfully' });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});