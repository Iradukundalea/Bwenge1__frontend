import React, { useState, useEffect } from "react";
import { RiCommunityLine } from "react-icons/ri";
import history from "../../../Redux/actions/history";
import { useApprovedCommunities, useGetUserCommunities, JOIN_LEAVE_COMMUNITY } from "../Admin Panel/hooks/useBwengeCommunity";
import BwengeLogo from "./../../../imgs/BWENG.png";
import thekomp from "./../../../thekomp";
import _ from "lodash";
import { useMutation } from "@apollo/client";
import "./styles/communityHome.css";
import { FaLeaf } from "react-icons/fa";

const CommunityHome = () => {
  const { data, loading, error } = useApprovedCommunities();
  const { data1, loading1, error1 } = useGetUserCommunities(localStorage.getItem("userId"));
  const [communitiesS, setCommunitiesS] = useState([]);
  const [loadingBut, setLoadingBut] = useState({
    onLoading: false,
    item_chosen: "",
  });
  const [userCommunitiesS, setUserCommunitiesS] = useState([]);
  const [joinLeaveCommunity, {}] = useMutation(JOIN_LEAVE_COMMUNITY);
  const omitDeep = (obj, key) => {
    const keys = Object.keys(obj);
    const newObj = {};
    keys.forEach((i) => {
      if (i !== key) {
        const val = obj[i];
        if (val instanceof Date) newObj[i] = val;
        else if (Array.isArray(val)) newObj[i] = omitDeepArrayWalk(val, key);
        else if (typeof val === "object" && val !== null) newObj[i] = omitDeep(val, key);
        else newObj[i] = val;
      }
    });
    return newObj;
  };

  const omitDeepArrayWalk = (arr, key) => {
    return arr.map((val) => {
      if (Array.isArray(val)) return omitDeepArrayWalk(val, key);
      else if (typeof val === "object") return omitDeep(val, key);
      return val;
    });
  };
  useEffect(() => {
    if (loading === false && data && loading1 === false && data1) {
      setCommunitiesS(omitDeepArrayWalk(data.getAllApprovedCommunities, "__typename"));
      if (localStorage.getItem("authToken")) setUserCommunitiesS(omitDeepArrayWalk(data1.getUserCommunities.communities, "__typename"));
    }
  }, [loading, data, loading1, data1]);

  if (loading || loading1) {
    return (
      <div class="ui segment">
        <div class="ui active inverted dimmer">
          <div class="ui text loader">Loading</div>
        </div>
        <p></p>
      </div>
    );
  }
  if (error || error1) {
    console.log(error);
    return <h2>{error.Error}</h2>;
  }
  console.log(communitiesS);
  var diasporaCommunities = communitiesS.filter((item) => item.type == "Diaspora community");
  var universitycommunties = communitiesS.filter((item) => item.type == "University community");
  var otherCommunties = communitiesS.filter((item) => item.type != "Diaspora community" && item.type != "University community");
  if (communitiesS)
    return (
      <div>
        <button
          class="ui basic button mx-5 my-4 my-md-2"
          onClick={(e) => {
            if (localStorage.getItem("isEmailVerified") == "false") {
              alert("Please verify your email and join the community");
              return;
            }
            history.push("/createcommunity");
          }}
        >
          <i class="users icon"></i>
          Create Community
        </button>
        <div className="ui stackable three column grid mx-3">
          <div className="five wide column">
            <div className="ui raised segment">
              <h3 class="ui left floated header">University Communities</h3>
              <div class="ui clearing divider"></div>
              <div className="ui unstackable items">
                {universitycommunties.map((item) => {
                  return (
                    <div class="item communityItemo">
                      <a class="ui tiny image" onClick={(e) => history.push(`/community/${item.id}`)}>
                        <img
                          style={{ border: "1px solid blue", borderRadius: "3px" }}
                          src={item.profile_picture ? `${thekomp}/${item.profile_picture}` : BwengeLogo}
                        />
                      </a>
                      <div class="content">
                        <a class="header" onClick={(e) => history.push(`/community/${item.id}`)}>
                          {item.name}
                        </a>
                        <div class="meta" onClick={(e) => history.push(`/community/${item.id}`)}>
                          <span class="price">{item.membersCount} members</span>
                          {/* <span class="stay">1 Month</span> */}
                        </div>
                        {localStorage.getItem("authToken") && (
                          <div className="description">
                            {_.findIndex(userCommunitiesS, ["communityId", item.id]) == -1 ? (
                              loadingBut.onLoading && loadingBut.item_chosen == item.id ? (
                                <button class="ui compact icon button mx-auto">
                                  <i class="loading spinner icon"></i>
                                  Joining
                                </button>
                              ) : (
                                <button
                                  class="compact ui button"
                                  onClick={(e) => {
                                    if (localStorage.getItem("isEmailVerified") == "false") {
                                      alert("Please verify your email and join the community");
                                      history.push("/requestemailverification");
                                      return;
                                    }
                                    setLoadingBut({
                                      onLoading: true,
                                      item_chosen: item.id,
                                    });
                                    joinLeaveCommunity({
                                      variables: {
                                        joinLeaveCommunityId: item.id,
                                        userId: localStorage.getItem("userId"),
                                        userName: localStorage.getItem("lastName") + " " + localStorage.getItem("firstName"),
                                      },
                                    }).then(() => {
                                      var communities = communitiesS;
                                      communities = communities.map((itemo) => {
                                        if (itemo.id == item.id) {
                                          itemo.membersCount = itemo.membersCount + 1;
                                        }
                                        return itemo;
                                      });
                                      setCommunitiesS(communities);
                                      setUserCommunitiesS([...userCommunitiesS, { communityId: item.id }]);
                                      setLoadingBut({
                                        onLoading: false,
                                        item_chosen: "",
                                      });
                                    });
                                  }}
                                >
                                  Join
                                </button>
                              )
                            ) : loadingBut.onLoading && loadingBut.item_chosen == item.id ? (
                              <button class="ui compact icon button mx-auto">
                                <i class="loading spinner icon"></i>
                                Leaving
                              </button>
                            ) : (
                              <button
                                className="compact ui button"
                                onClick={(e) => {
                                  setLoadingBut({
                                    onLoading: true,
                                    item_chosen: item.id,
                                  });
                                  joinLeaveCommunity({
                                    variables: {
                                      joinLeaveCommunityId: item.id,
                                      userId: localStorage.getItem("userId"),
                                      userName: localStorage.getItem("lastName") + " " + localStorage.getItem("firstName"),
                                    },
                                  }).then(() => {
                                    var communities = communitiesS;
                                    communities = communities.map((itemo) => {
                                      if (itemo.id == item.id) {
                                        itemo.membersCount = itemo.membersCount - 1;
                                      }
                                      return itemo;
                                    });
                                    setCommunitiesS(communities);
                                    var usercomm = userCommunitiesS;
                                    usercomm = usercomm.filter((itemo) => itemo.communityId != item.id);
                                    setUserCommunitiesS(usercomm);
                                    setLoadingBut({
                                      onLoading: false,
                                      item_chosen: "",
                                    });
                                  });
                                }}
                              >
                                Joined
                              </button>
                            )}
                          </div>
                        )}
                        {!localStorage.getItem("authToken") && (
                          <div className="description">
                            {
                              <button
                                class="compact ui button"
                                onClick={(e) => {
                                  alert("Login to join The communities");
                                }}
                              >
                                Join
                              </button>
                            }
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="six wide column">
            <div className="ui raised segment">
              <h3 class="ui left floated header">Department Communities</h3>
              <div class="ui clearing divider"></div>
              <div className="ui unstackable items">
                {otherCommunties.map((item) => {
                  return (
                    <div class="item communityItemo">
                      <a class="ui tiny image" onClick={(e) => history.push(`/community/${item.id}`)}>
                        <img
                          style={{ border: "1px solid blue", borderRadius: "3px" }}
                          src={item.profile_picture ? `${thekomp}/${item.profile_picture}` : BwengeLogo}
                        />
                      </a>
                      <div class="content">
                        <a class="header" onClick={(e) => history.push(`/community/${item.id}`)}>
                          {item.name}
                        </a>
                        <div class="meta" onClick={(e) => history.push(`/community/${item.id}`)}>
                          <span class="price">{item.membersCount} members</span>
                          {/* <span class="stay">1 Month</span> */}
                        </div>
                        {localStorage.getItem("authToken") && (
                          <div className="description">
                            {_.findIndex(userCommunitiesS, ["communityId", item.id]) == -1 ? (
                              loadingBut.onLoading && loadingBut.item_chosen == item.id ? (
                                <button class="ui compact icon button mx-auto">
                                  <i class="loading spinner icon"></i>
                                  Joining
                                </button>
                              ) : (
                                <button
                                  class="compact ui button"
                                  onClick={(e) => {
                                    if (localStorage.getItem("isEmailVerified") == "false") {
                                      alert("Please verify your email and join the community");
                                      history.push("/requestemailverification");

                                      return;
                                    }
                                    setLoadingBut({
                                      onLoading: true,
                                      item_chosen: item.id,
                                    });
                                    joinLeaveCommunity({
                                      variables: {
                                        joinLeaveCommunityId: item.id,
                                        userId: localStorage.getItem("userId"),
                                        userName: localStorage.getItem("lastName") + " " + localStorage.getItem("firstName"),
                                      },
                                    }).then(() => {
                                      var communities = communitiesS;
                                      communities = communities.map((itemo) => {
                                        if (itemo.id == item.id) {
                                          itemo.membersCount = itemo.membersCount + 1;
                                        }
                                        return itemo;
                                      });
                                      setCommunitiesS(communities);
                                      setUserCommunitiesS([...userCommunitiesS, { communityId: item.id }]);
                                      setLoadingBut({
                                        onLoading: false,
                                        item_chosen: "",
                                      });
                                    });
                                  }}
                                >
                                  Join
                                </button>
                              )
                            ) : loadingBut.onLoading && loadingBut.item_chosen == item.id ? (
                              <button class="ui compact icon button mx-auto">
                                <i class="loading spinner icon"></i>
                                Leaving
                              </button>
                            ) : (
                              <button
                                className="compact ui button"
                                onClick={(e) => {
                                  setLoadingBut({
                                    onLoading: true,
                                    item_chosen: item.id,
                                  });
                                  joinLeaveCommunity({
                                    variables: {
                                      joinLeaveCommunityId: item.id,
                                      userId: localStorage.getItem("userId"),
                                      userName: localStorage.getItem("lastName") + " " + localStorage.getItem("firstName"),
                                    },
                                  }).then(() => {
                                    var communities = communitiesS;
                                    communities = communities.map((itemo) => {
                                      if (itemo.id == item.id) {
                                        itemo.membersCount = itemo.membersCount - 1;
                                      }
                                      return itemo;
                                    });
                                    setCommunitiesS(communities);
                                    var usercomm = userCommunitiesS;
                                    usercomm = usercomm.filter((itemo) => itemo.communityId != item.id);
                                    setUserCommunitiesS(usercomm);
                                    setLoadingBut({
                                      onLoading: false,
                                      item_chosen: "",
                                    });
                                  });
                                }}
                              >
                                Joined
                              </button>
                            )}
                          </div>
                        )}
                        {!localStorage.getItem("authToken") && (
                          <div className="description">
                            {
                              <button
                                class="compact ui button"
                                onClick={(e) => {
                                  alert("Login to join The communities");
                                }}
                              >
                                Join
                              </button>
                            }
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="five wide column">
            <div className="ui raised segment">
              <h3 class="ui left floated header">Diaspora Communities</h3>
              <div class="ui clearing divider"></div>
              <div className="ui unstackable items">
                {diasporaCommunities.map((item) => {
                  return (
                    <div class="item communityItemo">
                      <a class="ui tiny image" onClick={(e) => history.push(`/community/${item.id}`)}>
                        <img
                          className="img-fluid"
                          style={{ border: "1px solid blue", borderRadius: "3px" }}
                          src={item.profile_picture ? `${thekomp}/${item.profile_picture}` : BwengeLogo}
                        />
                      </a>
                      <div class="content">
                        <a class="header" onClick={(e) => history.push(`/community/${item.id}`)}>
                          {item.name}
                        </a>
                        <div class="meta" onClick={(e) => history.push(`/community/${item.id}`)}>
                          <span class="price">{item.membersCount} members</span>
                          {/* <span class="stay">1 Month</span> */}
                        </div>
                        {localStorage.getItem("authToken") && (
                          <div className="description">
                            {_.findIndex(userCommunitiesS, ["communityId", item.id]) == -1 ? (
                              loadingBut.onLoading && loadingBut.item_chosen == item.id ? (
                                <button class="ui compact icon button mx-auto">
                                  <i class="loading spinner icon"></i>
                                  Joining
                                </button>
                              ) : (
                                <button
                                  class="compact ui button"
                                  onClick={(e) => {
                                    if (localStorage.getItem("isEmailVerified") == "false") {
                                      alert("Please verify your email and join the community");
                                      history.push("/requestemailverification");

                                      return;
                                    }
                                    setLoadingBut({
                                      onLoading: true,
                                      item_chosen: item.id,
                                    });
                                    joinLeaveCommunity({
                                      variables: {
                                        joinLeaveCommunityId: item.id,
                                        userId: localStorage.getItem("userId"),
                                        userName: localStorage.getItem("lastName") + " " + localStorage.getItem("firstName"),
                                      },
                                    }).then(() => {
                                      var communities = communitiesS;
                                      communities = communities.map((itemo) => {
                                        if (itemo.id == item.id) {
                                          itemo.membersCount = itemo.membersCount + 1;
                                        }
                                        return itemo;
                                      });
                                      setCommunitiesS(communities);
                                      setUserCommunitiesS([...userCommunitiesS, { communityId: item.id }]);
                                      setLoadingBut({
                                        onLoading: false,
                                        item_chosen: "",
                                      });
                                    });
                                  }}
                                >
                                  Join
                                </button>
                              )
                            ) : loadingBut.onLoading && loadingBut.item_chosen == item.id ? (
                              <button class="ui compact icon button mx-auto">
                                <i class="loading spinner icon"></i>
                                Leaving
                              </button>
                            ) : (
                              <button
                                className="compact ui button"
                                onClick={(e) => {
                                  setLoadingBut({
                                    onLoading: true,
                                    item_chosen: item.id,
                                  });
                                  joinLeaveCommunity({
                                    variables: {
                                      joinLeaveCommunityId: item.id,
                                      userId: localStorage.getItem("userId"),
                                      userName: localStorage.getItem("lastName") + " " + localStorage.getItem("firstName"),
                                    },
                                  }).then(() => {
                                    var communities = communitiesS;
                                    communities = communities.map((itemo) => {
                                      if (itemo.id == item.id) {
                                        itemo.membersCount = itemo.membersCount - 1;
                                      }
                                      return itemo;
                                    });
                                    setCommunitiesS(communities);
                                    var usercomm = userCommunitiesS;
                                    usercomm = usercomm.filter((itemo) => itemo.communityId != item.id);
                                    setUserCommunitiesS(usercomm);
                                    setLoadingBut({
                                      onLoading: false,
                                      item_chosen: "",
                                    });
                                  });
                                }}
                              >
                                Joined
                              </button>
                            )}
                          </div>
                        )}
                        {!localStorage.getItem("authToken") && (
                          <div className="description">
                            {
                              <button
                                class="compact ui button"
                                onClick={(e) => {
                                  alert("Login to join The communities");
                                }}
                              >
                                Join
                              </button>
                            }
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default CommunityHome;
