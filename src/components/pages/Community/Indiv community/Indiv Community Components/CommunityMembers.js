import React from "react";
import { useGetCommunityMembers } from "../../../Admin Panel/hooks/useBwengeCommunity";
import { useParams } from "react-router-dom";
import thekomp from "./../../../../../thekomp";
import BwengeLogo from "./../../../../../imgs/BWENG.png";
import "./communityMembers.css";

const CommunityMembers = () => {
  const { id } = useParams();
  const { data, loading, error } = useGetCommunityMembers(id);
  if (loading) {
    return (
      <div class="ui segment">
        <div class="ui active inverted dimmer">
          <div class="ui text loader">Loading</div>
        </div>
        <p></p>
      </div>
    );
  }
  if (error) {
    console.log(error);
    return <h2>{error.Error}</h2>;
  }
  const members = data.getCommunityMembers;
  console.log(members);
  return (
    <div>
      <div class="ui unstackable items">
        {members.map((item) => {
          return (
            <div class="item communityItemo">
              <a class="ui tiny image communityMemberPic">
                <img src={item.profilePicture ? `${thekomp}/${item.profilePicture}` : BwengeLogo} />
              </a>
              <div class="middle aligned content">
                <div class="header ">
                  {item.gender == "Female" && <i class="female icon"></i>}
                  {item.gender == "Male" && <i class="male icon"></i>}
                  {item.lastName + " " + item.firstName}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CommunityMembers;
