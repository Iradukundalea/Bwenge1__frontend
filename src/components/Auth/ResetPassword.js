import React, { useState } from "react";
import axios from "axios";
import thekomp from "./../../thekomp";
import { useParams } from "react-router-dom";
import history from "../../Redux/actions/history";
const ResetPassword = () => {
  const { token } = useParams();

  const [password, setPassword] = useState("");
  const [confirmPassword, setComfirmPassword] = useState("");

  const resetPasswordHandler = () => {
    if (password != confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    const formData = new FormData();
    formData.append("password", password);
    const url = `${thekomp}/auth/resetpassword/${token}`;
    const config = {
      method: "put",
      url: url,
      Headers: {
        "Content-type": "multipart/form-data",
      },
      data: formData,
    };
    axios(config)
      .then((res) => {
        alert("password updated");
        history.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="ui raised segment">
      <h2>Password Reset:</h2>
      <div>
        <div class="ui form warning">
          <div class="field">
            <label>New Password</label>
            <input style={{ width: "350px" }} type="password" placeholder="" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div class="field">
            <label>Confirm New Password</label>
            <input
              style={{ width: "350px" }}
              type="password"
              placeholder=""
              value={confirmPassword}
              onChange={(e) => setComfirmPassword(e.target.value)}
            />
          </div>

          <div class="ui warning message"></div>
          <div class="ui submit button" onClick={(e) => resetPasswordHandler()}>
            Reset Password
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
