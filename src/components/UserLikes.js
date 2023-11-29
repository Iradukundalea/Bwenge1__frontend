import React from "react";
import { useGetAllApprovedArticles } from "./pages/Admin Panel/hooks/useAllArticles";
import { useGetallApprovedShortCourses } from "./pages/BwengeCourses/hooks.js/useshortcourses";

const UserLikes = ({ userId }) => {
  const { data1, loading1, error1 } = useGetAllApprovedArticles();
  const { data, loading, error } = useGetallApprovedShortCourses();

  if (loading || loading1) {
    return (
      <div>
        {/* <div class="ui active inverted dimmer">
          <div class="ui text loader">Loading</div>
        </div>
        <p></p> */}
      </div>
    );
  }
  if (error || error1) {
    console.log(error);
    return <h2>{error.Error}</h2>;
  }

  var likes = 0;
  var articles = data1.getAllApprovedArticles;
  var scourses = data.getAllApprovedShortCourses;
  articles.map((item) => {
    if (item.creator.creatorId == userId) {
      likes += item.likes.length;
    }
  });
  scourses.map((item) => {
    if (item.creator.creatorId == userId) {
      likes += item.likes.length;
    }
  });
  console.log(likes);
  return <div>{likes}</div>;
};

export default UserLikes;
