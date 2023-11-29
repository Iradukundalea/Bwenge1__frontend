import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserCourses } from "../../../Redux/actions";
import history from "../../../Redux/actions/history";
import { useBwengeUserCourses } from "./hooks.js/useUserBwengeCourse";
import thekomp from "./../../../thekomp";
const UserCourses = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserCourses(localStorage.getItem("userId")));
  }, []);

  const { data1, loading1, error1 } = useBwengeUserCourses(localStorage.getItem("userId"));
  if (loading1) {
    return (
      <div class="ui segment">
        <div class="ui active inverted dimmer">
          <div class="ui text loader">Loading</div>
        </div>
        <p></p>
      </div>
    );
  }
  if (error1) {
    console.log(error1);
    return <h2>{error1.Error}</h2>;
  }
  const mycourses = data1.getBWENGEUserCourses;
  const renderLongCourses = mycourses.map((item) => {
    return (
      <div
        class="card"
        onClick={(e) => {
          history.push(`/courselearn/${item.id}/content`);
        }}
      >
        <div class="image">
          <img src={`${thekomp}/${item.courseIcon}`} style={{ height: "290px", width: "290px" }} />
        </div>
        <div class="content">
          <div class="header">{item.title}</div>
          <div class="meta">
            <a>{item.field}</a>
          </div>
          <div class="description">{item.instructors[0]}</div>
        </div>
        <div class="extra content">
          <span class="right floated"></span>
          <span>
            <i class="user icon"></i>
            75 Views
          </span>
        </div>
      </div>
    );
  });
  if (mycourses.length == 0) {
    return (
      <div className="ui segment">
        <div style={{ fontSize: "1.5rem" }} className="mb-2">
          You dont have any Enrolled Course
        </div>
        <button onClick={(e) => history.push("/bwengecourses/longcourses")} className="ui positive button">
          Check All Courses
        </button>
        <button onClick={(e) => history.push("/instructorcourses")} className="ui positive button">
          Bwenge Instructor
        </button>
      </div>
    );
  } else
    return (
      <div className="ui segment">
        <button onClick={(e) => history.push("/instructorcourses")} className="ui positive button mb-3">
          Bwenge Instructor
        </button>
        <div className="ui link cards">{mycourses && renderLongCourses}</div>
      </div>
    );
};

export default UserCourses;
