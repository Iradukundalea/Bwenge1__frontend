import React from "react";
import { useParams } from "react-router-dom";
import { useGetCommunityMembers } from "../../../Admin Panel/hooks/useBwengeCommunity";
import thekomp from "./../../../../../thekomp.js";
import BwengeLogo from "./../../../../../imgs/BWENG.png";

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
  let countm = 0;
  return (
    <div class="ui unstackable items">
      <table class="ui celled table">
        <thead>
          <tr>
            <th></th>
            <th>Member</th>
            <th>Names</th>
          </tr>
        </thead>
        <tbody>
          {members.map((item) => {
            countm++;
            return (
              <tr>
                <td> {countm}</td>
                <td>
                  <img class="ui mini rounded image" src={item.profilePicture ? `${thekomp}/${item.profilePicture}` : BwengeLogo} />
                </td>
                <td>{item.lastName + " " + item.firstName}</td>
              </tr>
              //   <div class="item communityItemo">
              //     <a class="ui tiny image communityMemberPic">
              //       <img src={item.profilePicture ? `${thekomp}/${item.profilePicture}` : BwengeLogo} />
              //     </a>
              //     <div class="middle aligned content">
              //       <div class="header ">
              //         {item.gender == "Female" && <i class="female icon"></i>}
              //         {item.gender == "Male" && <i class="male icon"></i>}
              //         {item.lastName + " " + item.firstName}
              //       </div>
              //     </div>
              //   </div>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CommunityMembers;
