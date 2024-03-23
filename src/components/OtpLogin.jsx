import React, { useState, useRef, useEffect } from "react";

const OtpLogin = ({ length, userPhoneNumber, handleSubmitOtp }) => {
  const [otp, setOpt] = useState(new Array(length).fill(""));

  const inputRefs = useRef([]);

  // function to handle otp values
  const handleChangeOtp = (index, e) => {
    const value = e.target.value;
    console.log(value);
    if (isNaN(value)) {
      return;
    }
    const newOtp = [...otp];

    // handle that user can enter one number in one field
    newOtp[index] = value.substring(value.length - 1);
    setOpt(newOtp);

    // submit trigger function
    const combineOtp = newOtp.join("");
    console.log(combineOtp);
    if (combineOtp.length === length) handleSubmitOtp(combineOtp);

    // Move to next focus after submit value
    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleClick = (index) => {
    inputRefs.current[index].setSelectionRange(1, 1);

    // optional
    if (index > 0 && !otp[index - 1]) {
      inputRefs.current[otp.indexOf("")].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0 &&
      inputRefs.current[index - 1]
    ) {
      // Move focus to previous block input field on backspace
      inputRefs.current[index - 1].focus();
    }
  };

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  return (
    <div>
      <h3>Otp sent to {userPhoneNumber}</h3>

      {otp.map((value, index) => {
        return (
          <input
            key={index}
            ref={(input) => (inputRefs.current[index] = input)}
            type="text"
            value={value}
            onChange={(e) => handleChangeOtp(index, e)}
            onClick={() => handleClick(index)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className="otpInput"
          />
        );
      })}
    </div>
  );
};

export default OtpLogin;
