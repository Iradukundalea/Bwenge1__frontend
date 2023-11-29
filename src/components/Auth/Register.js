import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../Redux/actions";

import "./styles/register.css";
const Register = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const err = useSelector((state) => state.auth);
  const registerHandler = (e) => {
    e.preventDefault();
    //console.log(user);

    if (user.password !== user.confirmPassword) {
      setUser({ ...user, password: "", confirmPassword: "" });
      setTimeout(() => {
        setError("");
      }, 5000);
      return setError("Passwords do not match");
    }

    dispatch(register(user));
    setError(err);
    setTimeout(() => {
      setError("");
    }, 5000);
  };

  return (
    <div className="registerBody">
      <div className="topTitle">
        <span>Bwenge Account</span>
      </div>
      <div className="loginIntro">
        <span>Register to Bwenge.</span>
      </div>
      <form onSubmit={registerHandler} className="register-screen__form">
        <div className="loginInfo">
          <div class="ui form warning">
            <div class="field">
              <h3>Username</h3>
              <input type="text" placeholder="" value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })} />
            </div>
            <div class="field">
              <h3>Gender:</h3>
              <select class="ui compact selection dropdown">
                <option value="all">Male</option>
                <option selected="" value="articles">
                  Female
                </option>
                <option value="products">Products</option>
              </select>{" "}
            </div>
            <div class="field">
              <h3>Email</h3>
              <input type="email" placeholder="" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
            </div>
            <div class="field">
              <h3>Password</h3>
              <input type="password" placeholder="" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} />
            </div>
            <div class="field">
              <h3>Confirm password</h3>
              <input
                type="password"
                placeholder=""
                value={user.confirmPassword}
                onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
              />
            </div>
            {error && <span className="error-message">{error}</span>}
            <div className="addiLogin">
              <p>
                Already have an account?{" "}
                <Link to="/login">
                  <a>Login!</a>
                </Link>
              </p>
            </div>
            <div class="ui warning message"></div>
            <div class="ui submit button" onClick={(e) => registerHandler(e)}>
              Register
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
export default Register;
