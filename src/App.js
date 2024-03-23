import "./App.css";
import React, { useState } from "react";
import OtpLogin from "./components/OtpLogin.jsx";

export default function App() {
  const [userPhoneNumber, setUserPhoneNumber] = useState("");
  const [showUserOtp, setShowUserOtp] = useState("");

  //! function to store phoneNumber in local state
  const handleSubmitPhoneNumber = (event) => {
    setUserPhoneNumber(event.target.value);
  };

  //! function to store otp in local state
  const handlePhoneSubmit = (event) => {
    event.preventDefault();
    // phone validation
    const regex = /[^0-9]/g;
    if (userPhoneNumber.length < 10 || userPhoneNumber.match(regex)) {
      alert("Please enter valid phone number");
      return;
    }

    // call the backend APi to sent the otp

    // show the otp
    setShowUserOtp(userPhoneNumber);
  };

  const handleSubmitOtp = (otpNumber) => {
    console.log("Login Successful", otpNumber);
  };

  return (
    <div className="App">
      <div>
        <h1> Mobile Opt Verification </h1>
      </div>
      <div>
        {!showUserOtp ? (
          <>
            <form className="form" onSubmit={handlePhoneSubmit}>
              <input
                className="inputNumber"
                placeholder="Enter Mobile Number"
                value={userPhoneNumber}
                type="text"
                onChange={handleSubmitPhoneNumber}
              />
              <button className="button" type="submit">
                Verify
              </button>
            </form>
          </>
        ) : (
          <>
            <OtpLogin
              length={4}
              userPhoneNumber={userPhoneNumber}
              handleSubmitOtp={handleSubmitOtp}
            />
          </>
        )}
      </div>
    </div>
  );
}
