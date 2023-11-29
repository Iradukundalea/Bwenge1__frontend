import React, { useState } from "react";
import thekomp from "./../../../thekomp";
import history from "../../../Redux/actions/history";
import axios from "axios";
const InstitutionVerificationPage = () => {
  const [userverify, setUserVerify] = useState({
    newPassword: "",
    confirmNewPassword: "",
    error: "",
  });
  const verifyUserHandler = async () => {
    if (userverify.newPassword != userverify.confirmNewPassword) {
      setUserVerify({ ...userverify, error: "Password Mismatch" });
    }
    var formData = new FormData();
    formData.append("email", localStorage.getItem("email"));
    formData.append("newPassword", userverify.newPassword);
    var url = `${thekomp}/auth/verifyuser`;
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
        console.log(res);
        localStorage.removeItem("authToken");
        localStorage.removeItem("firstName");
        localStorage.removeItem("lastName");
        localStorage.removeItem("phoneNumber");
        localStorage.removeItem("email");
        localStorage.removeItem("institution");
        localStorage.removeItem("institutionRole");
        localStorage.removeItem("isverified");
        history.push("/");
        window.location.reload(false);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };
  return (
    <div className="ui segment">
      <h3>Please For Security reason Change your password</h3>
      <div className="ui form">
        <div className="field">
          <label>New Password:</label>
          <input type="password" value={userverify.newPassword} onChange={(e) => setUserVerify({ ...userverify, newPassword: e.target.value })} />
        </div>
        <div className="field">
          <label>Confirm Password:</label>
          <input
            type="password"
            value={userverify.confirmNewPassword}
            onChange={(e) => setUserVerify({ ...userverify, confirmNewPassword: e.target.value })}
          />
        </div>
        {userverify.error && <div style={{ color: "red" }}>{userverify.error}</div>}
        <button onClick={(e) => verifyUserHandler()} className="ui primary button">
          Verify User
        </button>
      </div>
    </div>
  );
};

export default InstitutionVerificationPage;
