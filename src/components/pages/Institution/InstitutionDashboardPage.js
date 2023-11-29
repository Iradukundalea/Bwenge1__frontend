import React, { useState } from "react";
import history from "../../../Redux/actions/history";
import UnivInstructorCourses from "./institution instructor pages/UnivInstructorCourses";
import UnivStudentCourses from "./institution student pages/UnivStudentCourses";
import InstitutionVerificationPage from "./InstitutionVerificationPage";

const InstitutionDashboardPage = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const selectedMenu = queryParams.get("menu");
  if (localStorage.getItem("isverified") == "false") {
    return <InstitutionVerificationPage />;
  }
  console.log(localStorage.getItem("isverified"));
  const renderrightMenuItems = () => {
    switch (localStorage.getItem("institutionRole")) {
      case "admin":
        return (
          <a class="item" onClick={(e) => history.push("/institutionadminpanel")}>
            Institution Admin Panel
          </a>
        );
      case "Instructor":
        return (
          <>
            <a class="item" onClick={(e) => history.push("/createmooccourse")}>
              Create a Course
            </a>
            <a class="item" onClick={(e) => history.push("?menu=instructorCourses")}>
              My Teaching
            </a>
          </>
        );
      case "Assistant Instructor":
        return (
          <>
            <a class="item" onClick={(e) => history.push("/createmooccourse")}>
              Create a Course
            </a>
            <a class="item" onClick={(e) => history.push("?menu=instructorCourses")}>
              My Teaching
            </a>
          </>
        );
      case "Student":
        return (
          <a class="item" onClick={(e) => history.push("?menu=mycourses")}>
            My Courses
          </a>
        );
      default:
        break;
    }
  };
  const renderContent = () => {
    switch (selectedMenu) {
      case "instructorCourses":
        return <UnivInstructorCourses />;
      case "mycourses":
        return <UnivStudentCourses />;
      default:
        break;
    }
  };
  if (localStorage.getItem("isverified") == "false") {
    return <InstitutionVerificationPage />;
  } else {
    return (
      <div className="">
        <div className="ui inverted segment">
          <div class="ui inverted menu">
            <a class="item"> {localStorage.getItem("institution")}</a>
            <div class="right menu">{renderrightMenuItems()}</div>
          </div>
        </div>
        <div className="ui segment">{renderContent()}</div>
      </div>
    );
  }
};

export default InstitutionDashboardPage;
