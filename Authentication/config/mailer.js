const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "krmehta1452@gmail.com",
    pass: "kplz eyyx mlqj oyou",
  },
});
async function sendmailer(to, subject, html) {
  const option = {
    from: "krmehta1452@gmail.com",
    to: to,
    subject: subject,
    html: html,
  };
  await transporter.sendMail(option, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log("sendMail");
    }
  });
}
module.exports = sendmailer;
