const Contact = require('../../Models/contactModel');
const validator = require('validator');
const nodemailer = require('nodemailer');
const catchAsync = require('../../Utils/catchAsync');
require('dotenv').config();

const adminEmail = process.env.ADMIN_EMAIL;
const adminPassword = process.env.ADMIN_PASSWORD;

const addMessage = catchAsync(async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({
            message: 'All fields are required'
        });
    }

    if (!validator.isEmail(email)) {
        return res.status(400).json({
            message: "Invalid email"
        });
    }

    const createMessage = await Contact.create({ name, email, message });

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: adminEmail,
            pass: adminPassword
        }
    });

    
    await transporter.sendMail({
        from: `"Contact Form" <${adminEmail}>`,
        to: adminEmail,
        subject: 'New Contact Message',
        text: `From: ${name} <${email}>\n\n${message}`
    });

   
    await transporter.sendMail({
        from: `"Floral" <${adminEmail}>`,
        to: email,
        subject: 'We Received Your Message',
        text: `Hi ${name},\n\nThanks for reaching out! We'll get back to you soon.\n\nBest,\n Floral`
    });

    res.status(201).json({
        message: 'Message received successfully',
        data: createMessage
    });
});

module.exports = { addMessage };
