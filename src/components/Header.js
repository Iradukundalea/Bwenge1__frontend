import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetUserNames } from "./Auth/Auth hooks/useAuths";
import { useGetAllFollowers, useGetAllFollowees } from "./Auth/Auth hooks/useAuths";
import $ from "jquery";
import { GiHamburgerMenu } from "react-icons/gi";
import { FiLogOut } from "react-icons/fi";
import { SiCitrix } from "react-icons/si";
import anime from "animejs";
import history from "../Redux/actions/history";
import Modal from "./Modal";
import BwengeLogo from "./../imgs/Logowhite.jpg";
import ProjectPng from "./../imgs/project.png";
import useWindowDimensions from "./useWindowDimensions";
import "./styles/header.css";
import UserLikes from "./UserLikes";
import thekomp from "./../thekomp";
import { useLocation } from "react-router-dom";

//user img
import userIm from "../imgs/user.png";
import { FaRegUserCircle } from "react-icons/fa";
import { BiSearchAlt2 } from "react-icons/bi";
import axios from "axios";
const Header = () => {
  const API = thekomp;
  const location = useLocation();
  const [imgTimer, setImgTimer] = useState(new Date().getSeconds());
  // console.log(imgTimer);
  const [selectedItems, setSelectedItems] = useState({
    fld: "",
    dept: "",
  });
  const [loginUser, setLoginUser] = useState({
    email: "",
    password: "",
    error: "",
  });
  const [isHovering, setIsHovering] = useState(false);
  const [hideModal, setHideModal] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const [currentMouso, setCurrentMouso] = useState("");
  const [RegisterModal, setRegisterModal] = useState(false);
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    gender: "Male",
    confirmPassword: "",
    dateOfBirth: "",
    birthDate: "",
    error: "",
  });
  const { height, width } = useWindowDimensions();
  // console.log({ height, width });
  const [registerError, setRegisterError] = useState("");
  const [toggleMenu, setToggleMenu] = useState(false);
  const [loadingBut, setLoadingBut] = useState(false);
  const courses = useSelector((state) => state.courses);
  var timerId;
  useEffect(() => {
    timerId = setTimeout(() => {
      setImgTimer(new Date().getSeconds());
    }, 1000);
    return () => {
      clearTimeout(timerId);
    };
  }, [imgTimer]);

  const { data2, loading2, error2 } = useGetUserNames(localStorage.getItem("userId"));
  const { data, loading, error } = useGetAllFollowers(localStorage.getItem("userId"));
  const { data1, loading1, error1 } = useGetAllFollowees(localStorage.getItem("userId"));

  if (loading2 || loading || loading1) {
    return (
      <div class="ui segment">
        <div class="ui active inverted dimmer">
          <div class="ui text loader">Loading</div>
        </div>
        <p></p>
      </div>
    );
  }
  if (error2 || error1 || error) {
    return <h2>{error2.Error}</h2>;
  }
  const followees = data1.getAllFollowees;
  const followers = data.getAllFollowers;
  const handleMouseEnter1 = (e) => {
    if (width > 1050) setIsHovering(true);
    setCurrentMouso("profilePico");
  };
  const handleMouseEnter2 = (e) => {
    if (currentMouso == "profilePico" && width > 1050) setIsHovering(true);
  };

  const handleMouseLeave = (e) => {
    setIsHovering(false);
  };
  const handleMouseLeave1 = (e) => {
    setIsHovering(false);
    setCurrentMouso("");
  };
  var userInfo;
  if (data2) userInfo = data2.getUserInfo;

  //Login handler
  const loginHandler = (e) => {
    e.preventDefault();
    var formData = new FormData();
    formData.append("email", loginUser.email);
    formData.append("password", loginUser.password);
    var url = `${API}/auth/login`;
    const config = {
      method: "post",
      url: url,
      Headers: {
        "Content-type": "multipart/form-data",
      },
      data: formData,
    };
    setLoadingBut(true);
    axios(config)
      .then((res) => {
        localStorage.setItem("authToken", res.data.token);
        localStorage.setItem("firstName", res.data.firstName);
        localStorage.setItem("lastName", res.data.lastName);
        localStorage.setItem("email", res.data.email);
        localStorage.setItem("isEmailVerified", res.data.onEmailVerified);

        localStorage.setItem("userId", res.data.id);
        if (res.data.institution) {
          localStorage.setItem("institution", res.data.institution.institutionName);
          localStorage.setItem("institutionRole", res.data.institution.institutionRole);
          localStorage.setItem("isverified", res.data.institution.verified);
          localStorage.setItem("prefix", res.data.prefix);
        }
        localStorage.setItem("phoneNumber", res.data.phoneNumber);
        if (res.data.role == "admin") localStorage.setItem("role", res.data.role);
        setLoginUser({
          email: "",
          password: "",
          error: "",
        });
        setLoginModal(false);
        setLoadingBut(false);

        // window.location.reload(false);
      })
      .catch((error) => {
        // console.log(error.response.data.error);
        setLoginUser({ ...loginUser, error: error.response.data.error });
        setLoadingBut(false);
      });
  };
  const LoginModalContent = () => {
    return (
      <div className="ui raised segment">
        <div className="ui form error">
          <div className="field">
            <label>Email Address:</label>
            <input
              type="text"
              placeholder="Type your Email"
              value={loginUser.email}
              onChange={(e) =>
                setLoginUser({
                  ...loginUser,
                  email: e.target.value,
                  error: "",
                })
              }
            />
          </div>
          <div className="field">
            <label>Password:</label>
            <input
              type="password"
              value={loginUser.password}
              onChange={(e) =>
                setLoginUser({
                  ...loginUser,
                  password: e.target.value,
                  error: "",
                })
              }
            />
          </div>
          {loginUser.error && (
            <div class="ui error message">
              <div class="header">Action Forbidden</div>
              <p>{loginUser.error}</p>
            </div>
          )}
        </div>
      </div>
    );
  };
  const LoginModalActions = () => {
    return (
      <div>
        <div class="modal-footer">
          {!loadingBut && (
            <button type="button" class="ui primary button mx-auto" onClick={(e) => loginHandler(e)}>
              Login
            </button>
          )}
          {loadingBut && (
            <button class="ui compact icon button mx-auto">
              <i class="loading spinner icon"></i>
              Logging In
            </button>
          )}
          {/* {loadingBut &&(

          )} */}
        </div>
        <div class="text-center">
          <h5>
            <a
              style={{ cursor: "pointer" }}
              onClick={(e) => {
                setLoginModal(false);
                history.push("/forgotpassword");
              }}
            >
              Forget Password ?
            </a>
          </h5>
        </div>
        <h6 class="text-center">
          Don't have an account?{" "}
          <a
            onClick={(e) => {
              setLoginModal(false);
              setRegisterModal(true);
            }}
            style={{ cursor: "pointer" }}
          >
            Register
          </a>
        </h6>
      </div>
    );
  };
  const RegisterModalContent = () => {
    return (
      <div className="ui raised segment">
        <div className="ui form error">
          <div class="field">
            <label>First Name: </label>

            <input
              type="text"
              class="form-control"
              id="inputtext"
              value={newUser.firstName}
              onChange={(e) =>
                setNewUser({
                  ...newUser,
                  firstName: e.target.value,
                  error: "",
                })
              }
              placeholder="Type your First name"
            />
          </div>
          <div class="field">
            <label>Last Name: </label>
            <input
              type="text"
              class="form-control"
              id="inputtext"
              value={newUser.lastName}
              onChange={(e) =>
                setNewUser({
                  ...newUser,
                  lastName: e.target.value,
                  error: "",
                })
              }
              placeholder="Type your Last name"
            />
          </div>
          <div class="field">
            <label>Gender:</label>

            <select onChange={(e) => setNewUser({ ...newUser, gender: e.target.value, error: "" })}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div class="field">
            <label>Telephone:</label>

            <div class="ui labeled input">
              <div class="ui label">+250</div>
              <input
                type="text"
                name="Name"
                value={newUser.phoneNumber}
                onChange={(e) =>
                  setNewUser({
                    ...newUser,
                    phoneNumber: e.target.value,
                    error: "",
                  })
                }
              />
            </div>
          </div>
          <div class="field">
            <label>Email Address:</label>

            <input
              type="email"
              class="form-control"
              id="inputemail"
              autoSave="false"
              autoComplete="false"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value, error: "" })}
              placeholder="Type your Email Address"
            />
          </div>
          <div class="field">
            <label>Password:</label>

            <input
              type="password"
              class="form-control"
              value={newUser.password}
              onChange={(e) =>
                setNewUser({
                  ...newUser,
                  password: e.target.value,
                  error: "",
                })
              }
              id="inputPassword"
            />
          </div>
          <div class="field">
            <label>Confirm Password:</label>
            <input
              type="password"
              class="form-control"
              value={newUser.confirmPassword}
              onChange={(e) =>
                setNewUser({
                  ...newUser,
                  confirmPassword: e.target.value,
                  error: "",
                })
              }
              id="inputPassword"
            />
          </div>
          <div class="field">
            <label>Date of Birth:</label>
            <input
              type="date"
              value={newUser.dateOfBirth}
              onChange={(e) =>
                setNewUser({
                  ...newUser,
                  dateOfBirth: e.target.value,
                  error: "",
                })
              }
            />
          </div>
          {newUser.error && (
            <div class="ui error message">
              <div class="header">Action Forbidden</div>
              <p>{newUser.error}</p>
            </div>
          )}
        </div>
      </div>
    );
  };
  const RegisterModalActions = () => {
    return (
      <div>
        {!loadingBut && (
          <button type="button" class="ui primary button mx-auto" onClick={(e) => handleRegisterUser()}>
            Register
          </button>
        )}
        {loadingBut && (
          <button class="ui compact icon button mx-auto">
            <i class="loading spinner icon"></i>
            Signing Up
          </button>
        )}
      </div>
    );
  };
  const handleRegisterUser = () => {
    if (newUser.password !== newUser.confirmPassword) {
      setNewUser({ ...newUser, error: "Passwords dont match" });
    } else {
      const formData = new FormData();
      if (newUser.firstName) {
        formData.append("firstName", newUser.firstName);
      } else {
        setNewUser({ ...newUser, error: "FirstName missing" });
        return;
      }
      if (newUser.lastName) {
        formData.append("lastName", newUser.lastName);
      } else {
        setNewUser({ ...newUser, error: "LastName missing" });
        return;
      }
      if (newUser.email) {
        formData.append("email", newUser.email);
      } else {
        setNewUser({ ...newUser, error: "Email missing" });
        return;
      }
      if (newUser.password.length > 7) {
        formData.append("password", newUser.password);
      } else {
        setNewUser({ ...newUser, error: "Password must be atleast 8 characters" });
        return;
      }
      if (newUser.gender) {
        formData.append("gender", newUser.gender);
      } else {
        setNewUser({ ...newUser, error: "Gender missing" });
        return;
      }
      if (newUser.phoneNumber.length == 9) {
        if (
          (newUser.phoneNumber[0] != "7" && newUser.phoneNumber[1] != "8") ||
          (newUser.phoneNumber[0] != "7" && newUser.phoneNumber[1] != "2") ||
          (newUser.phoneNumber[0] != "7" && newUser.phoneNumber[1] != "3") ||
          (newUser.phoneNumber[0] != "7" && newUser.phoneNumber[1] != "9")
        ) {
          setNewUser({ ...newUser, error: "Invalid Rwandan PhoneNumber" });
          return;
        }
        formData.append("phoneNumber", newUser.phoneNumber);
      } else {
        setNewUser({ ...newUser, error: "PhoneNumber missing or Invalid" });
        return;
      }
      if (newUser.dateOfBirth) {
        formData.append("birthDate", newUser.dateOfBirth);
      } else {
        setNewUser({ ...newUser, error: "Date of birth missing" });
        return;
      }
      setLoadingBut(true);

      const url = `${API}/auth/register`;
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
          localStorage.setItem("authToken", res.data.token);

          localStorage.setItem("firstName", res.data.firstName);
          localStorage.setItem("lastName", res.data.lastName);
          localStorage.setItem("email", res.data.email);
          localStorage.setItem("isEmailVerified", res.data.onEmailVerified);
          localStorage.setItem("userId", res.data.id);
          if (res.data.institution) {
            localStorage.setItem("institution", res.data.institution.institutionName);
            localStorage.setItem("institutionRole", res.data.institution.institutionRole);
            localStorage.setItem("isverified", res.data.institution.verified);
          }
          localStorage.setItem("phoneNumber", res.data.phoneNumber);
          if (res.data.role == "admin") localStorage.setItem("role", res.data.role);
          setNewUser({
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            password: "",
            confirmPassword: "",
            dateOfBirth: "",
            birthDate: "",
            error: "",
          });
          window.location.reload(false);
          setLoadingBut(false);
        })
        .catch((error) => {
          setLoadingBut(false);
          setNewUser({
            ...newUser,
            error: error.response.data.error,
          });
        });
    }
  };
  var depo;
  const registerErrorContent = () => {
    return <div>Please set your {registerError}</div>;
  };
  if (width > 800)
    return (
      <div className="header">
        <nav class="navbar fixed-top navbar-expand-lg bg-body " id="theUpperNav">
          <div class="container-fluid">
            <div className="paragr"> 
            <a class="navbar-brand">
              <img className="img-fluid" src={BwengeLogo} onClick={(e) => history.push("/")}></img>
            </a>
              <p  className="par" > Bwenge <style>
@import url('https://fonts.cdnfonts.com/css/mogra');
</style> </p>
              </div>
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              {/* <i class="fa fa-bars" aria-hidden="true"></i> */}
              <GiHamburgerMenu size={40} />
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent" style={{ height: "7vh" }}>
              <ul class="navbar-nav ms-4 me-auto ulnavsBars itemu">
                <li class="nav-item itemu">
                  <a class="nav-link" onClick={(e) => history.push("/")}>
                    HOME
                  </a>
                </li>
                {/* <li class="nav-item ">
                <a class="nav-link" onClick={(e) => history.push("/papers")}>
                  Projects
                </a>
              </li> */}
                
                <li class="nav-item ">
                  <a class="nav-link" onClick={(e) => history.push("About")}>
                    ABOUT  </a>
                </li>

                <li class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">
                    PROJECTS
                  </a>
                  <ul class="dropdown-menu">
                    <li>
                      <a class="dropdown-item" onClick={(e) => history.push("/diasporaprojects")}>
                        Diaspora
                      </a>
                    </li>
                    <li>
                      <hr class="dropdown-divider" />
                    </li>
                    <li>
                      <a class="dropdown-item" onClick={(e) => history.push("/universityprojects")}>
                        University & College
                      </a>
                    </li>
                  </ul>
                </li>
                 <li className="nav-item">
                  <a className="nav-link" onClick={(e) => history.push("/communities")}>
                    COMMUNITIES
                  </a>
                </li>

                <li class="nav-item">
                  <a class="nav-link" onClick={(e) => history.push("/bwengecourses/longcourses")}>
                    COURSES
                  </a>
                </li>

                <li class="nav-item " onClick={(e) => history.push("/nsangiza")}>
                  <a class="nav-link">NSANGIZA</a>
                </li>

                {localStorage.getItem("institution") && (
                  <li class="nav-item" onClick={(e) => history.push("/institutiondashboard")}>
                    <a class="nav-link">My institution</a>
                  </li>
                )}
                {/* {localStorage.getItem("authToken") && (
                <li class="nav-item" onClick={(e) => history.push("/mycourses")}>
                  <a class="nav-link">My Courses</a>
                </li>
              )} */}
               
                <li>
                  <div class="ui search searchPlace">
                    <div class="ui icon input">
                      {/* <i class="search icon searchOBTN"></i> */}
                      <div className="searchiconi"> <BiSearchAlt2/></div>
                       
                      <input  type="text" className="searchinput"
                     id="mySearchBox"
                        // onClick={(e) => {
                        //   document.getElementById("mySearchBox").style.width = "20vw";
                        //   // console.log(Thowidth);
                        // }}
                        
                        placeholder="Search here"
                      />
                     
                    </div>
                    {/* <div class="results"></div> */}
                  </div>
                </li>
                <li>
                <div className="loginSignupBTN">
                    <button type="button" className=" btni" onClick={(e) => setLoginModal(true)}>
                      Login
                    </button>

                    <button type="button" className=" btnii" onClick={(e) => setLoginModal(true)}>
                      <span className="button-text">SignUp</span>
                    </button>
                  </div>
                  
                </li>
              </ul>

              <form class="d-flex">
                {localStorage.getItem("authToken") ? (
                  <div>
                    <div className="userBtn me-3">
                      <Link className="linksTo" to={`/userinfo/${localStorage.getItem("userId")}`}>
                        <div className="userpicPro">
                          <img
                            src={userInfo.profilePicture ? `${thekomp}/${userInfo.profilePicture}` : BwengeLogo}
                            style={{
                              borderRadius: "50%",
                              cursor: "pointer",
                              width: isHovering ? "6vh" : "5vh",
                              height: isHovering ? "6vh" : "5vh",
                              transform: isHovering ? "translateY(30%)" : "",
                              backgroundColor: isHovering ? "grey" : "rgb(201, 201, 201)",
                              border: "1px solid black",
                              transition: ".5s ease-in-out",
                              boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                            }}
                            onMouseOver={handleMouseEnter1}
                            // onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                          />
                        </div>
                      </Link>
                      {
                        <div
                          className="theUserProfiles"
                          style={{ opacity: isHovering ? 2 : 0, display: isHovering ? "block" : "none" }}
                          onMouseEnter={handleMouseEnter2}
                          onMouseLeave={handleMouseLeave1}
                        >
                          <div className="top-names">
                            {localStorage.getItem("firstName")} {localStorage.getItem("lastName")}
                          </div>
                          <div class="statistics">
                            <div class="blue statistic" style={{ cursor: "pointer", borderRight: "1px solid black" }}>
                              <div class="value">{followers.length}</div>
                              <div class="label">Fans</div>
                            </div>
                            <div class="green statistic" style={{ cursor: "pointer", borderRight: "1px solid black" }}>
                              <div class="value">{followees.length}</div>
                              <div class="label">Following</div>
                            </div>
                            <div class="blue statistic" style={{ cursor: "pointer" }}>
                              <div class="value">
                                <UserLikes userId={localStorage.getItem("userId")} />
                              </div>
                              <div class="label">Likes</div>
                            </div>
                          </div>
                          <br />
                          <div className="bwengeuserContributionsCount">
                            <div
                              style={{ fontSize: "1.2rem", cursor: "pointer" }}
                              className="ps-2 pt-2 pb-2 userOptions"
                              onClick={(e) => {
                                history.push(`/userinfo/${localStorage.getItem("userId")}`);
                                setIsHovering(false);
                              }}
                            >
                              <i class="user icon"></i> Personal Information
                            </div>
                            <div
                              style={{ fontSize: "1.2rem", cursor: "pointer" }}
                              className="ps-2 pt-2 pb-2 userOptions"
                              onClick={(e) => {
                                history.push("/mycourses");
                                setIsHovering(false);
                              }}
                            >
                              <i class="graduation cap icon"></i> My learning
                            </div>

                            <div
                              style={{ fontSize: "1.2rem", cursor: "pointer" }}
                              className="ps-2 pt-2 pb-2 userOptions"
                              onClick={(e) => {
                                localStorage.removeItem("role");
                                localStorage.removeItem("authToken");
                                localStorage.removeItem("firstName");
                                localStorage.removeItem("userId");
                                localStorage.removeItem("lastName");
                                localStorage.removeItem("phoneNumber");
                                localStorage.removeItem("email");
                                localStorage.removeItem("institution");
                                localStorage.removeItem("institutionRole");
                                localStorage.removeItem("isverified");
                                history.push("/");
                                setIsHovering(false);
                              }}
                            >
                              <FiLogOut /> Log Out
                            </div>
                          </div>
                        </div>
                      }
                    </div>
                  </div>
                ) : (
                    <></>
                 
                       
                )}


              </form>
              <form class="d-flex">
                {/* <button
                type="button"
                class="btn bt1 btn-primary ms-5"
                data-bs-toggle="modal"
                data-bs-target="#register"
              >
                <i class="fas fa-user-plus"></i>
                <a>Register</a>
              </button> */}
                <div class="modal fade" id="register" tabindex="-1" aria-labelledby="registerModalLabel" aria-hidden="true">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title text-center" id="registerModalLabel">
                          Register to Bwenge Website
                        </h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div className="modal-body ">
                        <div className="center row ui form">
                          <div class="field">
                            <label>First Name: </label>

                            <input
                              type="text"
                              class="form-control"
                              id="inputtext"
                              value={newUser.firstName}
                              onChange={(e) =>
                                setNewUser({
                                  ...newUser,
                                  firstName: e.target.value,
                                })
                              }
                              placeholder="Type your First name"
                            />
                          </div>
                          <div class="field">
                            <label>Last Name: </label>
                            <input
                              type="text"
                              class="form-control"
                              id="inputtext"
                              value={newUser.lastName}
                              onChange={(e) =>
                                setNewUser({
                                  ...newUser,
                                  lastName: e.target.value,
                                })
                              }
                              placeholder="Type your Last name"
                            />
                          </div>
                          <div class="field">
                            <label>Gender:</label>

                            <select onChange={(e) => setNewUser({ ...newUser, gender: e.target.value })}>
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                            </select>
                          </div>
                          <div class="field">
                            <label>Telephone:</label>

                            <div class="ui labeled input">
                              <div class="ui label">+250</div>
                              <input
                                type="text"
                                name="Name"
                                value={newUser.phoneNumber}
                                onChange={(e) =>
                                  setNewUser({
                                    ...newUser,
                                    phoneNumber: e.target.value,
                                  })
                                }
                              />
                            </div>
                          </div>
                          <div class="field">
                            <label>Email Address:</label>

                            <input
                              type="email"
                              class="form-control"
                              id="inputemail"
                              autoSave="false"
                              autoComplete="false"
                              value={newUser.email}
                              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                              placeholder="Type your Email Address"
                            />
                          </div>
                          <div class="field">
                            <label>Password:</label>

                            <input
                              type="password"
                              class="form-control"
                              value={newUser.password}
                              onChange={(e) =>
                                setNewUser({
                                  ...newUser,
                                  password: e.target.value,
                                })
                              }
                              id="inputPassword"
                            />
                          </div>
                          <div class="field">
                            <label>Confirm Password:</label>
                            <input
                              type="password"
                              class="form-control"
                              value={newUser.confirmPassword}
                              onChange={(e) =>
                                setNewUser({
                                  ...newUser,
                                  confirmPassword: e.target.value,
                                })
                              }
                              id="inputPassword"
                            />
                          </div>
                          <div class="field">
                            <label>Date of Birth:</label>
                            <input
                              type="date"
                              value={newUser.dateOfBirth}
                              onChange={(e) =>
                                setNewUser({
                                  ...newUser,
                                  dateOfBirth: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>
                      </div>
                      {newUser.error && <div style={{ color: "red" }}>{newUser.error}</div>}
                      <div class="modal-footer">
                        <button type="button" onClick={(e) => handleRegisterUser()} class="btn btn-primary">
                          Register
                        </button>
                      </div>

                      <h6 class="text-center">
                        Already have an account?{" "}
                        <a href="" data-bs-toggle="modal" data-bs-target="#login">
                          Login
                        </a>
                      </h6>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </nav>

        {registerError && <Modal title="Encountered Errors" content={registerErrorContent()} />}
        {loginModal && (
          <Modal title="Bwenge Login Form" content={LoginModalContent()} actions={LoginModalActions()} onDismiss={() => setLoginModal(false)} />
        )}
        {RegisterModal && (
          <Modal
            title="Bwenge Register Form"
            content={RegisterModalContent()}
            actions={RegisterModalActions()}
            onDismiss={() => setRegisterModal(false)}
          />
        )}
      </div>
    );
  else {
    return (
      <div className="headerPhones">
        {location.pathname != "/" ? (
          <div className="gridiTeM pt-2">
            <div>
              <i class="home icon" onClick={(e) => history.push("/")}></i>
            </div>
          </div>
        ) : (
          <div className="gridiTeM thoselectedGrid pt-2">
            <div>
              <i class="home icon" onClick={(e) => history.push("/")}></i>
            </div>
            <div>Home</div>
          </div>
        )}

        {!location.pathname.includes("/bwengecourses") ? (
          <div className="gridiTeM pt-2">
            <div>
              <i class="graduation cap icon" onClick={(e) => history.push("/bwengecourses/longcourses")}></i>
            </div>
          </div>
        ) : (
          <div className="gridiTeM thoselectedGrid pt-2">
            <div>
              <i class="graduation cap icon" onClick={(e) => history.push("/bwengecourses/longcourses")}></i>
            </div>
            <div>Courses</div>
          </div>
        )}
        <div className="gridiTeM">
          <div className="userBar fill">
            {localStorage.getItem("authToken") && imgTimer < 30 && (
              <img
                onClick={(e) => {
                  history.push(`/userinfo/${localStorage.getItem("userId")}`);
                }}
                className="UserBarimg"
                style={{ height: "7vh" }}
                src={userInfo.profilePicture ? `${thekomp}/${userInfo.profilePicture}` : BwengeLogo}
              ></img>
            )}
            {localStorage.getItem("authToken") && imgTimer > 30 && (
              <img
                onClick={(e) => {
                  history.push(`/userinfo/${localStorage.getItem("userId")}`);
                }}
                className="UserBarimg"
                style={{ height: "7vh" }}
                src={BwengeLogo}
              ></img>
            )}
            {!localStorage.getItem("authToken") && (
              <img className="UserBarimg" onClick={(e) => setLoginModal(true)} style={{ height: "7vh" }} src={BwengeLogo}></img>
            )}
          </div>
        </div>
        {location.pathname != "/nsangiza" ? (
          <div className="gridiTeM pt-2">
            <div>
              <i class="globe icon" onClick={(e) => history.push("/nsangiza")}></i>
            </div>
          </div>
        ) : (
          <div className="gridiTeM thoselectedGrid pt-2">
            <div>
              <i class="globe icon" onClick={(e) => history.push("/nsangiza")}></i>
            </div>
            <div>Nsangiza</div>
          </div>
        )}
        {location.pathname != "/communities" ? (
          <div className="gridiTeM pt-2">
            <div>
              <i class="users icon" onClick={(e) => history.push("/communities")}></i>
            </div>
          </div>
        ) : (
          <div className="gridiTeM thoselectedGrid pt-2">
            <div>
              <i class="users icon" onClick={(e) => history.push("/communities")}></i>
            </div>
            <div className="py-2">Communities</div>
          </div>
        )}
        {registerError && <Modal title="Encountered Errors" content={registerErrorContent()} />}
        {loginModal && (
          <Modal title="Bwenge Login Form" content={LoginModalContent()} actions={LoginModalActions()} onDismiss={() => setLoginModal(false)} />
        )}
        {RegisterModal && (
          <Modal
            title="Bwenge Register Form"
            content={RegisterModalContent()}
            actions={RegisterModalActions()}
            onDismiss={() => setRegisterModal(false)}
          />
        )}
      </div>
    );
  }
};
export default Header;
