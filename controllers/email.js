const nodemailer = require('nodemailer');

const sendReminderEmail = async (event) => {
    try {
        console.log('Attempting to send reminder email...');
        // Fetch the user's email based on their ID

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com', // This is the SMTP server for Gmail
            port: 587, // This is the port for Gmail's SMTP server (secure TLS)
            secure: false, // Use secure connection (TLS)
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER, // Replace with your email address
                pass: process.env.EMAIL_PASSWORD // Replace with your email password or app password
            }
        });

        const mailOptions = {
            from: process.env.USER_EMAIL,
            to: process.env.EMAIL_USER,
            subject: 'SPECIAL DAY REMINDER: THERE IS SOME SPECIAL EVENT TODAY!',
            text: `REMINDER: TODAY IS THE SPECIAL DAY FOR ${event.firstName} ${event.lastName}. OCCASION: ${event.occasion}! SEND YOUR WISHES!`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
            } else {
                console.log('Email sent:', info.response);
            }
        });
    } catch (error) {
        console.error('Error fetching user email:', error);
    }
    console.log(`Sending email reminder for event: ${event.occasion}`);
};

module.exports = sendReminderEmail;