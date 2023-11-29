import React from "react";
import { useGetUserNames, useGetAllFollowees, useGetAllFollowers } from "../../../Auth/Auth hooks/useAuths";
import thekomp from "./../../../../thekomp";
import BwengeLogo from "./../../../../imgs/BWENG.png";
import { useGetAllWritersArticles } from "../../Admin Panel/hooks/useAllArticles";
import UserLikes from "../../../UserLikes";

const ArticleleftUser = ({ creator }) => {
  const { data2, loading2, error2 } = useGetUserNames(creator.creatorId);
  const { data, loading, error } = useGetAllFollowers(creator.creatorId);
  const { data1, loading1, error1 } = useGetAllFollowees(creator.creatorId);
  const { data3, loading3, error3 } = useGetAllWritersArticles(creator.email);
  if (loading2 || loading || loading1 || loading3) {
    return (
      <div class="ui segment">
        <div class="ui active inverted dimmer">
          <div class="ui text loader">Loading</div>
        </div>
        <p></p>
      </div>
    );
  }
  if (error2 || error1 || error || error3) {
    console.log(error2);
    return <h2>{error2.Error}</h2>;
  }
  const followees = data1.getAllFollowees;
  const followers = data.getAllFollowers;
  var userInfo;
  if (data2) userInfo = data2.getUserInfo;
  const articlesWritten = data3.getWriterArticles;

  return (
    <div>
      <div className="theUserProfiles">
        <div className="userpicPro">
          <img
            src={userInfo.profilePicture ? `${thekomp}/${userInfo.profilePicture}` : BwengeLogo}
            style={{
              borderRadius: "50%",
              cursor: "pointer",
              width: "4rem",
              height: "4rem",
              backgroundColor: "rgb(201, 201, 201)",
              border: "1px solid black",
            }}
          />
        </div>
        <div className="top-names">{creator.lastName + " " + creator.firstName}</div>
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
              <UserLikes userId={creator.creatorId} />
            </div>
            <div class="label">Likes</div>
          </div>
        </div>
        <div class="statistics">
          <div class="blue statistic" style={{ cursor: "pointer", borderRight: "1px solid black" }}>
            <div class="value">{articlesWritten.length}</div>
            <div class="label">Articles</div>
          </div>
        </div>
        <br />
      </div>
    </div>
  );
};

export default ArticleleftUser;
