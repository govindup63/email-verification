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
    text: `your otp is ${otp}`
};
transporter.sendMail(mailOptions, function(error, info){
  if (error) {
      console.error('Error sending email reminder:', error);
      return res.status(500).json({ message: 'Error sending email reminder' });
  }
  console.log('Email reminder sent:', info.response);
  return res.status(200).json({ message: 'Email reminder sent successfully' });
});
  res.send("your email is " + email + "\n and your otp is " + otp);
});
app.post("/checkOtp",(req,res)=>{
  const {email, getotp}= req.body;
  if(getotp==otp){
    res.send("you are verified")
  }
  else{
    res.send("access denied")
  }
})
app.listen(port, () => {
  console.log(`listening of port ${port}`);
});
