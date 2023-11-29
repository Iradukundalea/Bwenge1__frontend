import React from "react";
import { useGetallApprovedShortCourses } from "../hooks.js/useshortcourses";
import thekomp from "./../../../../thekomp";
import history from "../../../../Redux/actions/history";
import { GrFormView } from "react-icons/gr";
const ShortCourses = () => {
  const { data, loading, error } = useGetallApprovedShortCourses();
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
  const shortcourses = data.getAllApprovedShortCourses;
  const renderAllShortCourses = shortcourses.map((course) => {
    console.log(course);
    return (
      <div
        class="card me-4"
        onClick={(e) => {
          if (!localStorage.getItem("authToken")) {
            alert("Please Login to view Content");
          } else {
            history.push(`/shortcourselearn/${course.id}`);
          }
        }}
      >
        <a class="ui blue ribbon label">Short Course</a>
        <div class="image">
          <img src={`${thekomp}/${course.courseIcon}`} height="155" width="240" />
        </div>
        <div class="content">
          <div class="header" style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "clip", width: "100%" }}>
            {course.title}
          </div>
          <div class="meta">
            <a>{course.field}</a>
          </div>
          <div class="description">{course.instructor}</div>
        </div>
        <div class="extra content">
          <span>
            <i class="eye icon"></i>
            {course.viewers.length}
          </span>
          <span className="ps-2">
            <i class="thumbs up icon"></i>
            {course.likes.length}
          </span>
          <span className="ps-2">
            <i class="comments icon"></i>
            {course.comments.length}
          </span>
        </div>
      </div>
    );
  });
  return <div className="ui link cards p-3">{renderAllShortCourses}</div>;
};

export default ShortCourses;
