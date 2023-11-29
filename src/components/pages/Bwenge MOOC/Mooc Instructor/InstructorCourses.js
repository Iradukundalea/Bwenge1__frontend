import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getInstructorCourses,
  selectMoocCourse,
  getCourseUserData,
} from "../../../../Redux/actions";
import history from "../../../../Redux/actions/history";

const InstructorCourses = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getInstructorCourses(localStorage.getItem("email")));
  }, []);
  const InstructorCourses = useSelector((state) => state.InstructorCourses);
  console.log(InstructorCourses);
  const renderLongCourses = InstructorCourses.map((course) => {
    return (
      <div>
        <div
          class="card"
          onClick={(e) => {
            dispatch(selectMoocCourse(course));
            history.push("/indivcourseinstructor");
          }}
        >
          <div class="image">
            <img
              src={course.courseIcon}
              style={{ height: "290px", width: "290px" }}
            />
          </div>
          <div class="content">
            <div class="header">{course.title}</div>
            <div class="meta">
              <a>{course.department}</a>
            </div>
            <div class="description">
              Matthew is an interior designer living in New York.
            </div>
          </div>
          <div class="extra content">
            <span class="right floated"></span>
            <span>
              <i class="user icon"></i>
              75 Views
            </span>
          </div>
        </div>
        <div></div>
      </div>
    );
  });
  return (
    <div>
      <div className="ui segment">
        <div className="ui link cards">{renderLongCourses}</div>
      </div>
    </div>
  );
};

export default InstructorCourses;
