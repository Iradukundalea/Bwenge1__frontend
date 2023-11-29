import React, { useState, useEffect } from "react";
import history from "../../Redux/actions/history";
import { useParams } from "react-router-dom";
import BwengeLogo from "./../../imgs/BWENG.png";
import { useGetAllFollowees, useGetAllFollowers, useGetUserNames, useUserFollows, useUserUnFollows } from "./Auth hooks/useAuths";
import Modal from "../Modal";
import { useMutation } from "@apollo/client";
import { RiUserUnfollowFill } from "react-icons/ri";
import { ProfilepicUpdater } from "./User Info Components/ProfilepicUpdater.js";
import axios from "axios";
import thekomp from "./../../thekomp.js";
import "./styles/userinfo.css";

const UserInfo = () => {
  const [userFollowers, setUserFollowers] = useState([]);
  const [showFollowees, setShowFollowees] = useState(false);
  const [showFollowers, setShowFollowers] = useState(false);
  const [profileModal, setProfileModal] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const { id } = useParams();
  console.log(id);
  const { data, loading, error } = useGetAllFollowers(id);
  const { data1, loading1, error1 } = useGetAllFollowees(id);
  const { data2, loading2, error2 } = useGetUserNames(id);
  useEffect(() => {
    if (loading == false && data) {
      setUserFollowers(data.getAllFollowers);
    }
  }, [loading, error]);

  const [userBwengeUserFollows, {}] = useMutation(useUserFollows);
  const [userBwengeUserunFollows, {}] = useMutation(useUserUnFollows);
  const [loadingBut, setLoadingBut] = useState(false);
  if (loading || loading1 || loading2) {
    return (
      <div class="ui segment">
        <div class="ui active inverted dimmer">
          <div class="ui text loader">Loading</div>
        </div>
        <p></p>
      </div>
    );
  }
  if (error || error1 || error2) {
    console.log(error);
    return <h2>{error.Error}</h2>;
  }
  console.log({ data, loading, error });
  console.log({ data2, loading2, error2 });
  const followees = data1.getAllFollowees;
  const userNames = data2.getUserInfo;
  const logoutHandler = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("firstName");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
    localStorage.removeItem("lastName");
    localStorage.removeItem("phoneNumber");
    localStorage.removeItem("email");
    localStorage.removeItem("institution");
    localStorage.removeItem("institutionRole");
    localStorage.removeItem("isverified");
    history.push("/");
  };
  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };
  const followHandler = () => {
    const followerFolloweeInput = {
      follower: {
        userId: localStorage.getItem("userId"),
        firstName: localStorage.getItem("firstName"),
        lastName: localStorage.getItem("lastName"),
      },
      followee: {
        userId: id,
        firstName: userNames.firstName,
        lastName: userNames.lastName,
      },
    };
    const formData = new FormData();
    formData.append("followInput", JSON.stringify(followerFolloweeInput));

    const url = `${thekomp}/auth/follow`;

    const config = {
      method: "post",
      url,
      Headers: {
        "Content-type": "multipart/form-data",
      },
      data: formData,
    };
    axios(config)
      .then((res) => {
        console.log(res);
        window.location.reload(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const showFolloweesContent = () => {
    return (
      <div className="ui items">
        {followees.map((item) => {
          return (
            <div
              className="item"
              style={{ cursor: "pointer" }}
              onClick={(e) => {
                setShowFollowees(false);
                history.push(`/userinfo/${item.followee.userId}`);
              }}
            >
              <a class="ui tiny image">
                <img src={BwengeLogo} style={{ backgroundColor: "grey", cursor: "pointer" }} />
              </a>
              <div class="middle aligned content">
                <div class="header">{item.followee.lastName + " " + item.followee.firstName}</div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };
  const showFollowersContent = () => {
    return (
      <div className="ui items">
        {userFollowers.map((item) => {
          return (
            <div
              className="item"
              style={{ cursor: "pointer" }}
              onClick={(e) => {
                setShowFollowers(false);
                history.push(`/userinfo/${item.follower.userId}`);
              }}
            >
              <a class="ui tiny image">
                <img className="img-fluid" src={BwengeLogo} style={{ backgroundColor: "grey" }} />
              </a>
              <div class="middle aligned content">
                <div class="header">{item.follower.lastName + " " + item.follower.firstName}</div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderProfileContent = () => {
    return (
      <div style={{ maxWidth: "90%" }}>
        <ProfilepicUpdater PostProfilePicture />
      </div>
    );
  };

  return (
    <div className="ui segment mx-5">
      <h2 class="ui header">Bwenge Account Details</h2>
      <div className="ui raised segment row" style={{ minHeight: "20rem" }}>
        <div className="col-md-3">
          <div style={{ height: "11rem" }}>
            <img
              onClick={(e) => {
                if (localStorage.getItem("userId") == id) setProfileModal(true);
              }}
              className="img-fluid ui medium circular image"
              id="thoprofile"
              src={userNames.profilePicture ? `${thekomp}/${userNames.profilePicture}` : BwengeLogo}
              style={{
                cursor: "pointer",
                width: isHovering ? "11rem" : "10rem",
                height: isHovering ? "11rem" : "10rem",
                backgroundColor: isHovering ? "grey" : "rgb(201, 201, 201)",
                border: "1px solid black",
              }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            />
          </div>
          <div style={{ fontSize: "1.4rem", fontWeight: "bold" }}>{userNames.lastName + " " + userNames.firstName}</div>
        </div>
        <div className="col-md-6">
          <div class="ui statistics">
            <div class="blue statistic" style={{ cursor: "pointer" }} onClick={(e) => setShowFollowers(true)}>
              <div class="value">{userFollowers.length}</div>
              <div class="label">Fans</div>
            </div>
            <div class="green statistic" style={{ cursor: "pointer" }} onClick={(e) => setShowFollowees(true)}>
              <div class="value">{followees.length}</div>
              <div class="label">Following</div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          {localStorage.getItem("authToken") &&
            id !== localStorage.getItem("userId") &&
            (!userFollowers.some((v) => v.follower.userId == localStorage.getItem("userId")) ? (
              !loadingBut ? (
                <button
                  onClick={(e) => {
                    setLoadingBut(true);

                    userBwengeUserFollows({
                      variables: {
                        followerFolloweeInput: {
                          follower: {
                            userId: localStorage.getItem("userId"),
                            firstName: localStorage.getItem("firstName"),
                            lastName: localStorage.getItem("lastName"),
                          },
                          followee: {
                            userId: id,
                            firstName: userNames.firstName,
                            lastName: userNames.lastName,
                          },
                        },
                      },
                    }).then((res) => {
                      setUserFollowers([
                        ...userFollowers,
                        {
                          follower: {
                            userId: localStorage.getItem("userId"),
                            firstName: localStorage.getItem("firstName"),
                            lastName: localStorage.getItem("lastName"),
                          },
                          followee: {
                            userId: id,
                            firstName: userNames.firstName,
                            lastName: userNames.lastName,
                          },
                        },
                      ]);
                      setLoadingBut(false);
                    });
                  }}
                  class="ui active button"
                  style={{ float: "right" }}
                >
                  <i class="user icon"></i>
                  Follow
                </button>
              ) : (
                <button style={{ float: "right" }} class="ui compact icon button mx-auto">
                  <i class="loading spinner icon"></i>
                  Following
                </button>
              )
            ) : !loadingBut ? (
              <button
                onClick={(e) => {
                  setLoadingBut(true);
                  userBwengeUserunFollows({
                    variables: {
                      followerFolloweeInput: {
                        follower: {
                          userId: localStorage.getItem("userId"),
                          firstName: localStorage.getItem("firstName"),
                          lastName: localStorage.getItem("lastName"),
                        },
                        followee: {
                          userId: id,
                          firstName: userNames.firstName,
                          lastName: userNames.lastName,
                        },
                      },
                    },
                  })
                    .then((res) => {
                      var followers = userFollowers;
                      followers = followers.filter((item) => item.follower.userId != localStorage.getItem("userId"));
                      setUserFollowers(followers);
                      setLoadingBut(false);
                    })
                    .catch((error) => {
                      console.log(error);
                    });
                }}
                class="ui labeled icon red button"
                style={{ float: "right" }}
              >
                <RiUserUnfollowFill className="icon" />
                {/* <i class="user icon"></i> */}
                Unfollow
              </button>
            ) : (
              <button style={{ float: "right" }} class="ui compact icon button mx-auto">
                <i class="loading spinner icon"></i>
                Unfollowing
              </button>
            ))}
        </div>
      </div>

      {localStorage.getItem("authToken") && localStorage.getItem("userId") == id && (
        <div>
          <div class="ui divided selection list">
            <a class="item">
              <div class="ui basic horizontal label">Email:</div>
              {localStorage.getItem("email")}
              {localStorage.getItem("isEmailVerified") == "false" && (
                <div class="ui red horizontal label ms-3" onClick={(e) => history.push("/requestemailverification")}>
                  Verify
                </div>
              )}
              {localStorage.getItem("isEmailVerified") == "true" && <div class="ui disabled horizontal label ms-3">Verified</div>}
            </a>
          </div>
          <div class="extra content">
            <button onClick={(e) => logoutHandler()} class="ui button">
              Logout
            </button>
          </div>
        </div>
      )}
      {showFollowees && <Modal title="Following" content={showFolloweesContent()} onDismiss={(e) => setShowFollowees(false)} />}
      {showFollowers && <Modal title="Followers" content={showFollowersContent()} onDismiss={(e) => setShowFollowers(false)} />}
      {profileModal && <Modal title="Profile picture" onDismiss={(e) => setProfileModal(false)} content={renderProfileContent()} />}
    </div>
  );
};

export default UserInfo;
