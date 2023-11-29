import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Students from "./Instructor Components/Students";
import Assignments from "./Instructor Components/Assignments";
import Exams from "./Instructor Components/Exams";
import Marking from "./Instructor Components/Marking";
import { useParams } from "react-router-dom";
import history from "../../../../Redux/actions/history";
import "./styles/indivcourseinstructor.css";
import ContentView from "./Instructor Components/ContentView.js";
import Quizes from "./Instructor Components/Quizes";

const IndivCourseInstructor = () => {
  const { id } = useParams();
  const { selectedMenu } = useParams();
  const selectedMooc = useSelector((state) => state.selectedMooc);
  //   const [selectedMenu, setSelectedMenu] = useState("students");

  const renderContent = () => {
    switch (selectedMenu) {
      case "students":
        return <Students courseId={id} />;
      case "assignments":
        return <Assignments />;
      case "quizes":
        return <Quizes />;
      case "exams":
        return <Exams />;
      case "content":
        return <ContentView courseId={id} />;
      case "marking":
        return <Marking courseId={id} />;
    }
  };
  return (
    <div>
      <div className="instructorPage">
        <div className="instructorPage_menubar">
          <div class="ui tabular menu">
            <a
              className={`item ${selectedMenu === "students" ? "active" : ""}`}
              onClick={(e) =>
                history.replace({
                  pathname: `/indivcourseinstructor/${id}/students`,
                })
              }
            >
              Students
            </a>
            <a
              className={`item ${selectedMenu === "content" ? "active" : ""}`}
              onClick={(e) =>
                history.replace({
                  pathname: `/indivcourseinstructor/${id}/content`,
                })
              }
            >
              Content
            </a>
            <a
              className={`item ${selectedMenu === "quizes" ? "active" : ""}`}
              onClick={(e) =>
                history.replace({
                  pathname: `/indivcourseinstructor/${id}/quizes`,
                })
              }
            >
              Quizes
            </a>
            <a
              className={`item ${selectedMenu === "assignments" ? "active" : ""}`}
              onClick={(e) =>
                history.replace({
                  pathname: `/indivcourseinstructor/${id}/assignments`,
                })
              }
            >
              Assignments
            </a>
            <a
              className={`item ${selectedMenu === "exams" ? "active" : ""}`}
              onClick={(e) =>
                history.replace({
                  pathname: `/indivcourseinstructor/${id}/exams`,
                })
              }
            >
              Exams
            </a>
            <a
              className={`item ${selectedMenu === "marking" ? "active" : ""}`}
              onClick={(e) =>
                history.replace({
                  pathname: `/indivcourseinstructor/${id}/marking`,
                })
              }
            >
              Marking
            </a>
          </div>
          {/* <div>
                        <button class="ui green button submitBut" onClick={(e) => submitCourseHandler(e)}>Submit for review</button>
                    </div> */}
        </div>
        <div className="createCoursePage_assignments">{renderContent()}</div>
      </div>
    </div>
  );
};

export default IndivCourseInstructor;
