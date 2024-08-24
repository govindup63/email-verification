import express from "express";
import nodemailer from "nodemailer";
import bodyparser from "body-parser"
const app = express();
const port = 3000;
let otp = 0;

app.use(bodyparser.json())
function giveOtp() {
  return Math.floor(100000 + Math.random() * 900000);
}


app.post("/registerEmail", (req, res) => {
otp = giveOtp(); 
});


app.listen(port, () => {
  console.log(`listening of port ${port}`);
});
