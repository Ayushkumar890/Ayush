const express = require("express");
const nodemailer = require("nodemailer");
// const mongoose = require("mongoose");

const port = "http://localhost:3000/";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.set("view engine", "ejs");

//connected database
// mongoose
//   .connect("mongodb://localhost:27017", { dbName: "Portfolio" })
//   .then(() => {
//     console.log("connected successfully");
//   })
//   .catch((err) => {
//     console.log(err);
//   });
// const UserSchema = new mongoose.Schema({
//   username: {
//     type: String,
//   },
//   message: {
//     type: String,
//   },
//   subject: {
//     type: String,
//   },
//   email: {
//     type: String,
//   },
// });

// const User = mongoose.model("user", UserSchema);

app.get("/", (req, res) => {
  res.render("index");
});


// sending mail

app.post("/contact", async(req, res) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "ayushkumar2004.hp@gmail.com",
      pass: "bupc tnoz hiic ercv",
    },
  });

  const mailOptions = {
    from: "ayushkumar2004.hp@gmail.com",
    to: req.body.email,
    subject: req.body.subject,
    text: req.body.message,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    }
  });
  const username = req.body.name;
  const message = req.body.message;
  const subject = req.body.subject;
  const email = req.body.email;
  await User.create({
    username,
    message,
    subject,
    email,
  });
  console.log("Form submitted successfully");
  res.render("index");
});


//server listen
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server ready at ${port}`);
});
