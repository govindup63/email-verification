import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import nodemailer from "nodemailer"

const app = express();
const port = process.env.PORT || 3000;

app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json()); // Parse JSON bodies

// Function to generate a 6-digit OTP
function giveOtp() {
  return Math.floor(100000 + Math.random() * 900000);
}

// To store OTPs temporarily for each email
const otpStore = {};

// Endpoint to send an OTP to the user's email
app.post("/registerEmail", (req, res) => {
  const email = req.body.email;
  const otp = giveOtp();

  // Store OTP for this email
  otpStore[email] = otp;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use true for port 465, false for other ports
    auth: {
      user: "projectreminder6323@gmail.com",
      pass: "tdsu lcfh fekn umje", // Use environment variables in production
    },
  });

  const mailOptions = {
    from: "projectreminder6323@gmail.com",
    to: email,
    subject: "OTP for your request",
    text: `Your OTP is ${otp}`,
  };

  // Send the OTP email
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.error("Error in sending Otp", error);
      return res.status(500).json({ message: "Error in sending Otp" });
    }
    console.log("Email reminder sent:", info.response);
    return res.status(200).json({ message: "Otp sent successfully" });
  });
});

// Endpoint to verify the OTP
app.post("/checkOtp", (req, res) => {
  const { email, getotp } = req.body;

  if (otpStore[email] && otpStore[email] == getotp) {
    res.send("You are verified");
    // Optionally remove OTP from store after successful verification
    delete otpStore[email];
  } else {
    res.send("Access denied");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

