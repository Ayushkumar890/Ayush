const express = require("express");
const mongoose = require("mongoose");
const port = "http://localhost:3000/";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));
// app.set('views', __dirname+'/views/');

mongoose
  .connect("mongodb://localhost:27017", { dbName: "Portfolio" })
  .then(() => {
    console.log("connected successfully");
  })
  .catch((err) => {
    console.log(err);
  });

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  message: {
    type: String,
  },
  subject: {
    type: String,
  },
  email: {
    type: String,
  },
});

const User = mongoose.model("user", UserSchema);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/html/index.html");
});

app.get("/contact", (req, res) => {
  res.sendFile(__dirname + "/public/html/contact.html");
});

app.post("/contact", async (req, res) => {
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
  res.send("your form is submitted");
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server ready at ${port}`);
});
