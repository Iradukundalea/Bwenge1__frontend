import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../Redux/actions/index';

import "./styles/login.css";
const Login = () => {

    const [user, setUser] = useState({
        email: '', password: ''
    })
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const err = useSelector((state) => state.auth)

    const loginHandler = (e) => {
        e.preventDefault();
        console.log(user);

        dispatch(login(user));

        setError(err);
        console.log(err);
        setTimeout(() => {
            setError("");
        }, 5000);
    }

    return (
        <div className='loginBody'>
            <div className="topTitle">
                <span>Bwenge Account</span>
            </div>
            <div className="loginIntro">
                <span>Sign in to your Bwenge Account or create a new one.</span>
            </div>
            <div className='bwengeAccountForm'>
                <form onSubmit={loginHandler} className="register-screen__form">
                    <div className="loginInfo">
                        <div class="ui form warning">
                            <div class="field">
                                <h3>E-mail</h3>
                                <input
                                    className='theInputo'

                                    type="email"
                                    placeholder=""
                                    value={user.email}
                                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                                />
                            </div>
                            <div class="field">
                                <h3>Password</h3>
                                <input
                                    className='theInputo'

                                    type="password"
                                    placeholder=""
                                    value={user.password}
                                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                                />
                            </div>
                            {error && <span className="error-message">{error}</span>}
                            <div className="addiLogin">
                                <p>No account? <Link to="/register"><a href="#">Create one!</a></Link></p>
                            </div>
                            <div className="addiLogin">
                                <p>Forgot <Link to="/forgotpassword"><a href="#">password!</a></Link></p>
                            </div>
                            <div class="ui warning message">
                            </div>
                            <div class="ui submit button" onClick={(e) => loginHandler(e)}>Submit</div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default Login;