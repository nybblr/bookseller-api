const generateURL = require('./generate-url');
const sendEmail = require('./send-email');

const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');
var template = Handlebars.compile(
  fs.readFileSync(path.join(__dirname, 'emails/download.hbs'), 'utf8')
);

let sendDownloadEmail = async ({ customer, book }) => {
  let url = generateURL(book.path);
  book = { ...book, url };

  let email = await sendEmail({
    to: customer.email,
    subject: "Here’s your eBook download link! ✨📖✨",
    html: template({ customer, book }),
  });

  console.log("Message sent: %s", email.messageId);
};

module.exports = sendDownloadEmail;