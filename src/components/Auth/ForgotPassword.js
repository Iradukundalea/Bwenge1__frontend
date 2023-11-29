import React, { useState } from "react";
import { Link } from "react-router-dom";
import thekomp from "./../../thekomp";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const forgotPasswordHandler = () => {
    const formData = new FormData();
    formData.append("email", email);
    const url = `${thekomp}/auth/forgotpassword`;
    const config = {
      method: "post",
      url: url,
      Headers: {
        "Content-type": "multipart/form-data",
      },
      data: formData,
    };
    axios(config)
      .then((res) => {
        alert("check your email");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="ui raised segment">
      <h3>Forgot password:</h3>

      <form onSubmit={forgotPasswordHandler} className="register-screen__form">
        <div>
          <div class="ui form warning">
            <div class="field">
              <label>Email:</label>
              <input style={{ width: "350px" }} type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div className="addiLogin">
              <p>
                No account?{" "}
                <Link to="/register">
                  <a href="#">Create one!</a>
                </Link>
              </p>
            </div>
            <div class="ui warning message"></div>
            <div class="ui submit button" onClick={(e) => forgotPasswordHandler(e)}>
              Send Email
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
