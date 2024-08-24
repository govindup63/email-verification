import React, { useRef, useState } from 'react';

function App() {
  const emailRef = useRef(null);
  const otpRef = useRef(null);
  const [isOtpSent, setIsOtpSent] = useState(false); // State to check if OTP is sent
  const [email, setEmail] = useState(''); // Store the email address

  // Define sendEmail as an async function to use await inside it
  async function sendEmail() {
    if (emailRef.current) {
      const email = emailRef.current.value;
      setEmail(email); // Save the email in state for OTP verification

      try {
        // Use await to wait for the fetch call to complete
        const response = await fetch('http://localhost:3000/registerEmail', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',  // Correct content type for JSON
          },
          body: JSON.stringify({ email }),  // Correct JSON format with email field
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        // Wait for the response to be parsed as JSON
        const data = await response.json();

        console.log('Success:', data);
        alert('Email sent successfully! ' + JSON.stringify(data));
        setIsOtpSent(true); // Set state to true to show OTP input
      } catch (error) {
        console.error('Error:', error);
        alert('Failed to send email.');
      }
    }
  }

  // Define verifyOtp as an async function to use await inside it
  async function verifyOtp() {
    if (otpRef.current) {
      const otp = otpRef.current.value;

      try {
        // Use await to wait for the fetch call to complete
        const response = await fetch('http://localhost:3000/checkOtp', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',  // Correct content type for JSON
          },
          body: JSON.stringify({ email, getotp: otp }),  // Send email and OTP for verification
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        // Wait for the response to be parsed as text
        const data = await response.text();

        console.log('Success:', data);
        alert(data); // Show the verification result
      } catch (error) {
        console.error('Error:', error);
        alert('Failed to verify OTP.');
      }
    }
  }

  return (
    <div>
      {!isOtpSent ? (
        <>
          <input ref={emailRef} placeholder="email" type="text" />
          <button onClick={sendEmail}>Submit</button>
        </>
      ) : (
        <>
          <input ref={otpRef} placeholder="Enter OTP" type="text" />
          <button onClick={verifyOtp}>Verify OTP</button>
        </>
      )}
    </div>
  );
}

export default App;

