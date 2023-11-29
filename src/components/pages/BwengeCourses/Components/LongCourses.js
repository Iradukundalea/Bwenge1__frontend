import React from "react";
import history from "../../../../Redux/actions/history";
import userCourses from "../../../../Redux/reducers/userCourses";
import { useAllBwengeApprovedLongCourses } from "../hooks.js/uselongcourses";
import { useBwengeUserCourses } from "../hooks.js/useUserBwengeCourse";
import { useParams } from "react-router-dom";
import thekomp from "./../../../../thekomp";

const LongCourses = () => {
  const { id } = useParams();
  const { loading, error, data } = useAllBwengeApprovedLongCourses();
  const { data1, loading1, error1 } = useBwengeUserCourses(localStorage.getItem("userId"));

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
  const longcourses = data.getAllApprovedLongCourses;
  const userCourse = data1.getBWENGEUserCourses;
  const renderAllLongCourses = longcourses.map((course) => {
    console.log(course);
    return (
      <div
        class="card me-4"
        onClick={(e) => {
          var flag = 0;
          for (var i = 0; i < userCourse.length; i++) {
            if (userCourse[i] && userCourse[i].id == course.id) {
              history.push(`/courselearn/${course.id}/content`);
              flag = 1;
            }
          }
          if (!flag) history.push(`/coursedesc/${course.id}`);
        }}
      >
        <a class="ui green ribbon label">Long Course</a>

        <div class="image">
          <img src={`${thekomp}/${course.courseIcon}`} height="135" width="240" />
        </div>
        <div class="content">
          <div class="header" style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "clip", width: "100%" }}>
            {course.title}
          </div>
          <div class="meta">
            <a>{course.field}</a>
          </div>
          <div class="description">{course.instructors[0]}</div>
        </div>
        <div class="extra content">
          <span class="right floated"></span>
          <span>
            <i class="user icon"></i>
            {course.studentsCount} Students
          </span>
        </div>
      </div>
    );
  });

  return <div className="ui link cards p-3">{renderAllLongCourses}</div>;
};

export default LongCourses;
