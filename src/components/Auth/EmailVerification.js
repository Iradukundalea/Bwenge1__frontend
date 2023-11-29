import React, { useState } from "react";
import axios from "axios";
import thekomp from "./../../thekomp";

const EmailVerification = () => {
  const [onSendingEmail, setSendingEmail] = useState(false);
  const requestEmailVerification = () => {
    const formData = new FormData();
    formData.append("email", localStorage.getItem("email"));
    const url = `${thekomp}/auth/requestemailverification`;
    const config = {
      method: "post",
      url: url,
      Headers: {
        "Content-type": "multipart/form-data",
      },
      data: formData,
    };
    setSendingEmail(true);
    axios(config)
      .then((res) => {
        alert("check your email");
        setSendingEmail(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="ui segment">
      <h2>Verify Email address:</h2>
      <label>{localStorage.getItem("email")}</label>
      {!onSendingEmail && (
        <button className="ui primary button ms-2" onClick={(e) => requestEmailVerification()}>
          Verify Email
        </button>
      )}
      {onSendingEmail && (
        <button class="ui compact icon button mx-auto ms-2">
          <i class="loading spinner icon"></i>
          Sending Verification Email
        </button>
      )}
    </div>
  );
};

export default EmailVerification;
