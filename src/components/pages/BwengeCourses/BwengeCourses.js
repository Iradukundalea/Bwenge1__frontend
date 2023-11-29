import React from "react";
import history from "../../../Redux/actions/history";
import userCourses from "../../../Redux/reducers/userCourses";
import { useAllBwengeApprovedLongCourses, useAllBwengeLongCourses } from "./hooks.js/uselongcourses";
import { useBwengeUserCourses } from "./hooks.js/useUserBwengeCourse";
import { useParams } from "react-router-dom";
import thekomp from "./../../../thekomp";
import LongCourses from "./Components/LongCourses";
import ShortCourses from "./Components/ShortCourses";
const BwengeCourses = () => {
  const { selectedtype } = useParams();
  const renderCourses = () => {
    switch (selectedtype) {
      case "longcourses":
        return <LongCourses />;
      case "shortcourses":
        return <ShortCourses />;
    }
  };
  return (
    <div className="mx-3 mt-4 mt-md-2">
      <div class="ui tabular menu">
        <a
          class={`item ${selectedtype === "longcourses" ? "active" : ""}`}
          onClick={(e) => {
            history.replace({
              pathname: `/bwengecourses/longcourses`,
            });
          }}
        >
          Long Courses
        </a>
        <a
          class={`item ${selectedtype === "shortcourses" ? "active" : ""}`}
          onClick={(e) => {
            history.replace({
              pathname: `/bwengecourses/shortcourses`,
            });
          }}
        >
          Short Courses        </a>
      </div>

      <div className="ui raised segment">
        <div className="ui link cards">{renderCourses()}</div>
      </div>
    </div>
  );
};

export default BwengeCourses;
