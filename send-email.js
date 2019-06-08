const mailer = require("nodemailer");

const {
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USERNAME,
  SMTP_PASSWORD,
  SENDER_NAME,
} = process.env;

let transport = mailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: true,
  auth: {
    user: SMTP_USERNAME,
    pass: SMTP_PASSWORD,
  },
});

let sendEmail = (details) =>
  transport.sendMail({
    from: SENDER_NAME,
    ...details,
  });

module.exports = sendEmail;