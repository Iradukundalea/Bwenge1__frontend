import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./styles/indivmooc.css";
import Contents from "./Individual Mooc components/Contents";
import Announcements from "./Individual Mooc components/Announcements";
import Assignments from "./Individual Mooc components/Assignments";
import Exams from "./Individual Mooc components/Exams";
import Discussion from "./Individual Mooc components/Discussion";
import history from "../../../../Redux/actions/history";
import renderHTML from "react-render-html";
import { useIndivMooc } from "../hooks/useIndivMooc";
import { useParams } from "react-router-dom";
import { useUserCourseData } from "../hooks/useUserCourses";
import { useGetSpoc } from "../hooks/useIndivSpoc";

const IndMoocCourse = (props) => {
  //const [selectedMenu, setSelectedMenu] = useState("");
  //const selectedMooc = useSelector((state) => state.selectedMooc);
  //const courseUserData = useSelector((state) => state.userCourseData);
  //const dispatch = useDispatch();

  const { id } = useParams();
  const { selectedMenu } = useParams();
  console.log(id);
  const { data, loading, error } = useGetSpoc(id);
  console.log({ error, loading, data });

  const { data1, loading1, error1 } = useUserCourseData(localStorage.getItem("userId"), id);
  console.log({ data1, loading1, error1 });

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
  const selectedMooc = data.getSpoc;
  const courseUserData = data1.getUserCourseData;
  console.log(courseUserData);
  localStorage.setItem("courseTitle", selectedMooc.title);

  const renderChoosenToolbar = () => {
    switch (selectedMenu) {
      case "content":
        return <Contents chapters={selectedMooc.chapters} />;
      case "Announcements":
        return <Announcements creator={selectedMooc.creator} announcements={selectedMooc.announcement} />;
      case "Grading":
        return <div className="ui raised segment">{renderHTML(selectedMooc.gradingCriteria)}</div>;
      case "Assignments":
        return (
          <Assignments
            chapters={selectedMooc.chapters}
            courseUserDataQ={courseUserData[0].quizes}
            courseUserData={courseUserData[0].assignments}
            courseId={id}
          />
        );
      case "Exams":
        return <Exams chapters={selectedMooc.chapters} courseUserData={courseUserData[0].exams} courseId={id} />;
      case "Discussions":
        return <Discussion discussions={selectedMooc.discussionForum} />;
    }
  };
  return (
    <div className="indivMooc_body ui segment">
      <div class="container">
        <div class="row">
          <div class="col-sm-3 moocToolbar">
            <div className="d-flex flex-column">
              <div
                style={
                  selectedMenu === "content"
                    ? {
                        borderTop: "1px solid white",
                        borderRight: "1px solid white",
                        borderLeft: "1px solid white",
                      }
                    : {}
                }
                onClick={(e) =>
                  history.replace({
                    pathname: `/indivmooc/${id}/content`,
                  })
                }
                className="m-2"
              >
                Content
              </div>
              <div
                style={
                  selectedMenu === "Announcements"
                    ? {
                        borderTop: "1px solid white",
                        borderRight: "1px solid white",
                        borderLeft: "1px solid white",
                      }
                    : {}
                }
                onClick={(e) =>
                  history.replace({
                    pathname: `/indivmooc/${id}/Announcements`,
                  })
                }
                className="m-2"
              >
                Announcements
              </div>
              <div
                style={
                  selectedMenu === "Grading"
                    ? {
                        borderTop: "1px solid white",
                        borderRight: "1px solid white",
                        borderLeft: "1px solid white",
                      }
                    : {}
                }
                onClick={(e) =>
                  history.replace({
                    pathname: `/indivmooc/${id}/Grading`,
                  })
                }
                className="m-2"
              >
                Grading criteria
              </div>
              <div
                style={
                  selectedMenu === "Assignments"
                    ? {
                        borderTop: "1px solid white",
                        borderRight: "1px solid white",
                        borderLeft: "1px solid white",
                      }
                    : {}
                }
                onClick={(e) =>
                  history.replace({
                    pathname: `/indivmooc/${id}/Assignments`,
                  })
                }
                className="m-2"
              >
                Assignments/Quiz
              </div>
              <div
                style={
                  selectedMenu === "Exams"
                    ? {
                        borderTop: "1px solid white",
                        borderRight: "1px solid white",
                        borderLeft: "1px solid white",
                      }
                    : {}
                }
                onClick={(e) =>
                  history.replace({
                    pathname: `/indivmooc/${id}/Exams`,
                  })
                }
                className="m-2"
              >
                Exams
              </div>
              <div
                style={
                  selectedMenu === "Discussions"
                    ? {
                        borderTop: "1px solid white",
                        borderRight: "1px solid white",
                        borderLeft: "1px solid white",
                      }
                    : {}
                }
                onClick={(e) =>
                  history.replace({
                    pathname: `/indivmooc/${id}/Discussions`,
                  })
                }
                className="m-2 justify-self-end"
              >
                Discussions
              </div>
              {/* {selectedMooc.creator.email === localStorage.getItem("email") && (
                <div>
                  <div>
                    <button
                      onClick={(e) => {
                        history.push(`/indivcourseinstructor/${id}/students`);
                      }}
                      style={{ float: "right" }}
                      class="primary ui button"
                    >
                      Instructor Mode
                    </button>
                  </div>
                  <div>
                    <button
                      onClick={(e) => {
                        history.push(`/editmooc?id=${id}`);
                      }}
                      style={{ float: "right" }}
                      class="negative ui button"
                    >
                      Modify Course
                    </button>
                  </div>
                </div>
              )} */}
            </div>
          </div>
          <div class="col-sm-8 moocBody">{renderChoosenToolbar()}</div>
        </div>
      </div>
    </div>
  );
};

export default IndMoocCourse;
