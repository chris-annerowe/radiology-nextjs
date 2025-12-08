
import nodemailer from 'nodemailer'

const email = process.env.SMTP_USER

// Create a transporter object using the default SMTP transport
export const transporter = nodemailer.createTransport({
    service: 'gmail',
    // host: process.env.SMTP_HOST,
    // port: process.env.SMTP_PORT,
    // secure: false, // true for 465, false for other ports
    auth: {
      user: email,
      pass: process.env.SMTP_PASS,
    },
  });

  export const mailOptions = {
    from: email,
    to: email
  }