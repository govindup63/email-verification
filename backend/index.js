import express from "express";
import nodemailer from "nodemailer";
import bodyparser from "body-parser";
const app = express();
const port = 3000;
let otp = 0;

app.use(bodyparser.json());
function giveOtp() {
  return Math.floor(100000 + Math.random() * 900000);
}

app.post("/registerEmail", (req, res) => {

  otp = giveOtp();

  const email = req.body.email;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: true, 
    auth: {
      user: "projectreminder6323@gmail.com", 
      pass: "tdsu lcfh fekn umje", 
    },
  });

  const mailOptions = {
    from: 'projectreminder6323@gmail.com',
    to: email,
    subject: 'Otp for your request',
    text: `your otp is otp`
};
  res.send("your email is " + email + "\n and your otp is " + otp);
});

app.listen(port, () => {
  console.log(`listening of port ${port}`);
});
