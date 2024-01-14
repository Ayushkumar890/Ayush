const nodemailer = require("nodemailer");
const express = require('express');
const app = express();

app.use(express.static("/public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());



const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ayushkumar2004.hp@gmail.com",
    pass: "akac xmtk joki qqlu",
  },
});

const mailOptions = {
  from: "ayushkumar2004.hp@gmail.com",
  to: mail,
  subject: req.body.subject,
  text: req.body.message,
};
console.log(to);
console.log(subject);
console.log(message);

transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    console.log(error);
  } else {
    console.log("Email sent: " + info.response);
  }
});

module.exports = transporter;
