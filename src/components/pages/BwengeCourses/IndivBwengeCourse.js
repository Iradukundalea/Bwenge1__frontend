import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../Bwenge MOOC/Display Mooc Courses/styles/indivmooc.css";
import Contents from "../Bwenge MOOC/Display Mooc Courses/Individual Mooc components/Contents";
import Announcements from "../Bwenge MOOC/Display Mooc Courses/Individual Mooc components/Announcements";
import Assignments from "../Bwenge MOOC/Display Mooc Courses/Individual Mooc components/Assignments";
import Exams from "../Bwenge MOOC/Display Mooc Courses/Individual Mooc components/Exams";
import Discussion from "../Bwenge MOOC/Display Mooc Courses/Individual Mooc components/Discussion";
import history from "../../../Redux/actions/history";
import renderHTML from "react-render-html";
import { useParams } from "react-router-dom";
import { useUserCourseData } from "../Bwenge MOOC/hooks/useUserCourses";
import { useBwengeCourseLearn } from "./hooks.js/uselongcourses";

const IndivBwengeCourse = (props) => {
  //const [selectedMenu, setSelectedMenu] = useState("");
  //const selectedMooc = useSelector((state) => state.selectedMooc);
  //const courseUserData = useSelector((state) => state.userCourseData);
  //const dispatch = useDispatch();

  const { id } = useParams();
  const { selectedMenu } = useParams();
  console.log(id);
  const { data, loading, error } = useBwengeCourseLearn(id);
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
  const selectedMooc = data.getLongCourse;
  const courseUserData = data1.getUserCourseData;
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
        <div class="ui tabular menu">
          <a class="active item">{selectedMooc.title}</a>
        </div>
        <div class="row">
          <div class="col-sm-3 ui secondary vertical pointing menu">
            <div
              onClick={(e) =>
                history.replace({
                  pathname: `/courselearn/${id}/content`,
                })
              }
              className={selectedMenu === "content" ? "item active" : "item"}
            >
              Content
            </div>
            <div
              onClick={(e) =>
                history.replace({
                  pathname: `/courselearn/${id}/Announcements`,
                })
              }
              className={selectedMenu === "Announcements" ? "item active" : "item"}
            >
              Announcements
            </div>
            <div
              onClick={(e) =>
                history.replace({
                  pathname: `/courselearn/${id}/Grading`,
                })
              }
              className={selectedMenu === "Grading" ? "item active" : "item"}
            >
              Grading criteria
            </div>
            <div
              onClick={(e) =>
                history.replace({
                  pathname: `/courselearn/${id}/Assignments`,
                })
              }
              className={selectedMenu === "Assignments" ? "item active" : "item"}
            >
              Assignments/Quiz
            </div>
            <div
              onClick={(e) =>
                history.replace({
                  pathname: `/courselearn/${id}/Exams`,
                })
              }
              className={selectedMenu === "Exams" ? "item active" : "item"}
            >
              Exams
            </div>
            <div
              onClick={(e) =>
                history.replace({
                  pathname: `/courselearn/${id}/Discussions`,
                })
              }
              className={selectedMenu === "Discussions" ? "item active" : "item"}
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
          <div class="col-sm-8 moocBody">{renderChoosenToolbar()}</div>
        </div>
      </div>
    </div>
  );
};

export default IndivBwengeCourse;
