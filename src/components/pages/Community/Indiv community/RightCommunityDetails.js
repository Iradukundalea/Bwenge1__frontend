import React, { useState, useEffect } from "react";
import { useSingleCommunity, useGetUserCommunities, JOIN_LEAVE_COMMUNITY } from "../../Admin Panel/hooks/useBwengeCommunity";
import { useParams } from "react-router-dom";
import CommunityMembers from "./Indiv Community Components/CommunityMembers";
import BwengeLogo from "./../../../../imgs/BWENG.png";
import thekomp from "./../../../../thekomp";
import _ from "lodash";
import Modal from "../../../Modal";
import { useMutation } from "@apollo/client";
import history from "../../../../Redux/actions/history";
import { CommunityProfilePicUpdater } from "../../../Auth/User Info Components/CommunityProfilePicUpdater";

const RightCommunityDetails = ({ posts, likes }) => {
  console.log(posts);
  const { id } = useParams();
  const { data, loading, error } = useSingleCommunity(id);
  const { data1, loading1, error1 } = useGetUserCommunities(localStorage.getItem("userId"));
  const [userCommunitiesS, setUserCommunitiesS] = useState([]);
  const [joinLeaveCommunity, {}] = useMutation(JOIN_LEAVE_COMMUNITY);
  const [communityUsersModal, setCommunityUsersModal] = useState(false);

  const [updateProfile, setUpdateProfile] = useState(false);
  const [loadingBut, setLoadingBut] = useState(false);
  const [community, setSelectedCommunity] = useState();
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
      setSelectedCommunity(omitDeep(data.getSingleCommunity, "__typename"));
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
  const communityMembersContent = () => {
    return (
      <div className="ui segment">
        <CommunityMembers />
      </div>
    );
  };
  const profilePicUpdaterContent = () => {
    return (
      <div>
        <CommunityProfilePicUpdater />
      </div>
    );
  };
  if (community)
    return (
      <div>
        <div className="ui raised segment">
          <div className="theUserProfiles">
            <div className="userpicPro">
              <img
                src={community.profile_picture ? `${thekomp}/${community.profile_picture}` : BwengeLogo}
                onClick={(e) => {
                  if (community.creator.creatorId == localStorage.getItem("userId")) setUpdateProfile(true);
                }}
                style={{
                  borderRadius: "4px",
                  cursor: "pointer",
                  width: "4rem",
                  height: "4rem",
                  backgroundColor: "rgb(201, 201, 201)",
                  border: "1px solid black",
                  display: "flex",
                  margin: "auto",
                }}
              />
            </div>
            <div className="top-names">{community.name}</div>
            <div class="statistics">
              <div class="blue statistic" onClick={(e) => setCommunityUsersModal(true)} style={{ cursor: "pointer", borderRight: "1px solid black" }}>
                <div class="value">{community.membersCount}</div>
                <div class="label">Members</div>
              </div>
              <div class="green statistic" style={{ cursor: "pointer", borderRight: "1px solid black" }}>
                <div class="value">{posts}</div>
                <div class="label">Posts</div>
              </div>
              <div class="blue statistic" style={{ cursor: "pointer" }}>
                <div class="value">{likes}</div>
                <div class="label">Likes</div>
              </div>
            </div>
            <br />
            {localStorage.getItem("authToken") && (
              <div style={{ display: "flex", margin: "auto", alignContent: "center", justifyContent: "center" }}>
                {_.findIndex(userCommunitiesS, ["communityId", community.id]) == -1 ? (
                  !loadingBut ? (
                    <button
                      class="compact ui button"
                      onClick={(e) => {
                        if (localStorage.getItem("isEmailVerified") == "false") {
                          alert("Please verify your email and join the community");
                          return;
                        }
                        setLoadingBut(true);
                        joinLeaveCommunity({
                          variables: {
                            joinLeaveCommunityId: community.id,
                            userId: localStorage.getItem("userId"),
                            userName: localStorage.getItem("lastName") + " " + localStorage.getItem("firstName"),
                          },
                        }).then(() => {
                          setSelectedCommunity({ ...community, membersCount: community.membersCount + 1 });
                          setUserCommunitiesS([...userCommunitiesS, { communityId: community.id }]);
                          setLoadingBut(false);
                        });
                      }}
                    >
                      Join
                    </button>
                  ) : (
                    <button class="ui compact icon button mx-auto">
                      <i class="loading spinner icon"></i>
                      Joining
                    </button>
                  )
                ) : !loadingBut ? (
                  <button
                    className="compact ui button"
                    onClick={(e) => {
                      setLoadingBut(true);
                      joinLeaveCommunity({
                        variables: {
                          joinLeaveCommunityId: community.id,
                          userId: localStorage.getItem("userId"),
                          userName: localStorage.getItem("lastName") + " " + localStorage.getItem("firstName"),
                        },
                      }).then(() => {
                        setSelectedCommunity({ ...community, membersCount: community.membersCount - 1 });
                        var usercomm = userCommunitiesS;
                        usercomm = usercomm.filter((itemo) => itemo.communityId != community.id);
                        setUserCommunitiesS(usercomm);
                        setLoadingBut(false);
                      });
                    }}
                  >
                    Joined
                  </button>
                ) : (
                  <button class="ui compact icon button mx-auto">
                    <i class="loading spinner icon"></i>
                    Leaving
                  </button>
                )}
              </div>
            )}
            {!localStorage.getItem("authToken") && (
              <div className="description" style={{ display: "flex", margin: "auto" }}>
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
            <br />
            <div style={{ display: "flex", margin: "auto", alignContent: "center", justifyContent: "center" }}>
              <button
                class="ui basic button"
                onClick={(e) => {
                  if (_.findIndex(userCommunitiesS, ["communityId", community.id]) == -1) {
                    alert("Join the community to write");
                  } else {
                    localStorage.setItem("cField", community.field);
                    localStorage.setItem("cDepart", community.department);
                    history.push(`/createcommunityarticle?cid=${community.id}`);
                  }
                }}
              >
                <i class="edit outline icon" style={{ color: "green" }}></i>
                Write
              </button>
            </div>
            {community.creator.creatorId == localStorage.getItem("userId") && (
              <div style={{ display: "flex", margin: "auto", alignContent: "center", justifyContent: "center" }}>
                <button
                  class="ui basic button mt-3"
                  onClick={(e) => {
                    history.push(`/community/${id}/admin`);
                  }}
                >
                  <i class="wrench icon" style={{ color: "green" }}></i>
                  Admin Panel
                </button>
              </div>
            )}
          </div>
        </div>
        {updateProfile && <Modal title="Community Profile Update" content={profilePicUpdaterContent()} onDismiss={(e) => setUpdateProfile(false)} />}
        {communityUsersModal && (
          <Modal title={`Members ${community.membersCount}`} content={communityMembersContent()} onDismiss={(e) => setCommunityUsersModal(false)} />
        )}
      </div>
    );
};

export default RightCommunityDetails;
