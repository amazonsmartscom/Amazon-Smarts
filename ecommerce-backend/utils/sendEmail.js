// // utils/sendEmail.js
// const nodemailer = require('nodemailer');

// const sendEmail = async (options) => {
//   try {
//     const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     const mailOptions = {
//       from: `"GadgetStore Security" <${process.env.EMAIL_USER}>`,
//       to: options.email,
//       subject: options.subject,
//       html: options.message, // We use HTML for beautiful emails
//     };

//     const info = await transporter.sendMail(mailOptions);
//     console.log(`✉️ Email securely sent to ${options.email} (Message ID: ${info.messageId})`);
//   } catch (error) {
//     console.error('❌ Error sending email:', error);
//     throw new Error('Email could not be sent');
//   }
// };

// module.exports = sendEmail;

// utils/sendEmail.js
const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      // 🚀 CRITICAL FIX: Force Node to give up after 3 seconds instead of 60 seconds!
      connectionTimeout: 3000,
      greetingTimeout: 3000,
      socketTimeout: 3000,
    });

    const mailOptions = {
      from: `"Amazon Smarts" <${process.env.EMAIL_USER}>`,
      to: options.email,
      subject: options.subject,
      html: options.message,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`✉️ Email securely sent to ${options.email} (Message ID: ${info.messageId})`);
  } catch (error) {
    // It will hit this catch block in 3 seconds now!
    console.error('❌ Error sending email (Timeout/Blocked):', error.message);
    throw new Error('Email could not be sent');
  }
};

module.exports = sendEmail;