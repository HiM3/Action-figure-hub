const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "meetmehta1050@gmail.com",
    pass: "",
  },
});
async function sendmailer(to, subject, html) {
  const option = {
    from: "meetmehta1050@gmail.com",
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
