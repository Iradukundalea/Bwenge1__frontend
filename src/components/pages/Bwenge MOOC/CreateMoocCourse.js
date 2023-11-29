import React, { useState } from "react";
import CourseContent from "./createcourseComponents/CourseContent";
import CourseLandingPage from "./createcourseComponents/CourseLandingPage";
import CourseStructure from "./createcourseComponents/CourseStructure";
import CourseAnnouncements from "./createcourseComponents/CourseAnnouncements";
import axios from "axios";
import history from "../../../Redux/actions/history";
import thekomp from "./../../../thekomp";
import * as ReactBootStrap from "react-bootstrap";
import Modal from "../../Modal";
import Error404 from "../../Error404";
const CreateMoocCourse = () => {
  const [selectedMenu, setSelectedMenu] = useState("");
  const [postloader, setPostLoader] = useState(false);
  const [errorModal, setErrorModal] = useState("");
  const [MoocCourse, setMoocCourse] = useState({
    title: "",
    lead_headline: "",
    instructors: [
      {
        InstructorId: localStorage.getItem("userId"),
        prefix: localStorage.getItem("prefix"),
        firstName: localStorage.getItem("firstName"),
        lastName: localStorage.getItem("lastName"),
      },
    ],
    courseIcon: "",
    field: "",
    type: "MOOC",
    department: "",
    university: localStorage.getItem("institution"),
    gradingCriteria: "",
    language: "English",
    objectives: [],
    description: "",
    requirements: [],
    chapters: [],
    chaptersJson: "",
    errors: "",
    announcement: [],
    creator: {
      email: localStorage.getItem("email"),
      firstName: localStorage.getItem("firstName"),
      lastName: localStorage.getItem("lastName"),
    },
  });

  let { instructors } = MoocCourse;
  console.log(instructors);
  // instructors.push(;
  // setMoocCourse({ ...MoocCourse, instructors: instructors });
  console.log(MoocCourse);
  const ErrorContent = () => {
    return <div>Please enter course's {errorModal}</div>;
  };
  const submitCourseHandler = (e) => {
    e.preventDefault();
    var formData = new FormData();
    if (MoocCourse.title) {
      formData.append("title", MoocCourse.title);
    } else {
      setErrorModal("title");
      return;
    }
    formData.append("CourseLength", "Long Course");
    formData.append("lead_headline", MoocCourse.lead_headline);
    formData.append("instructors", JSON.stringify(MoocCourse.instructors));
    if (MoocCourse.courseIcon) {
      formData.append("courseIcon", MoocCourse.courseIcon);
    } else {
      setErrorModal("icon");
      return;
    }
    formData.append("coursePreview", MoocCourse.coursePreview);
    if (MoocCourse.field) {
      formData.append("field", MoocCourse.field);
    } else {
      setErrorModal("field");
      return;
    }
    formData.append("type", "long Course");
    if (MoocCourse.department) {
      formData.append("department", MoocCourse.department);
    } else {
      setErrorModal("department");
      return;
    }
    formData.append("university", MoocCourse.university);
    if (MoocCourse.gradingCriteria) {
      formData.append("gradingCriteria", MoocCourse.gradingCriteria);
    } else {
      setErrorModal("grading criteria");
      return;
    }
    formData.append("language", MoocCourse.language);
    if (MoocCourse.objectives) {
      formData.append("objectives", JSON.stringify(MoocCourse.objectives));
    } else {
      setErrorModal("objectives");
      return;
    }
    if (MoocCourse.description) {
      formData.append("description", MoocCourse.description);
    } else {
      setErrorModal("description");
      return;
    }
    if (MoocCourse.requirements) {
      formData.append("requirements", JSON.stringify(MoocCourse.requirements));
    } else {
      setErrorModal("requirements");
      return;
    }
    if (MoocCourse.chapters.length == 0) {
      setErrorModal("content");
      return;
    }
    formData.append("creator", JSON.stringify(MoocCourse.creator));
    formData.append("announcement", JSON.stringify(MoocCourse.announcement));

    formData.append("chapters", JSON.stringify(MoocCourse.chapters));
    for (var i = 0; i < MoocCourse.chapters.length; i++) {
      for (var j = 0; j < MoocCourse.chapters[i].lectures.length; j++) {
        for (var k = 0; k < MoocCourse.chapters[i].lectures[j].quiz.length; k++) {
          for (var l = 0; MoocCourse.chapters[i].lectures[j].quiz[k] && l < MoocCourse.chapters[i].lectures[j].quiz[k].problems.length; l++) {
            if (MoocCourse.chapters[i].lectures[j].quiz[k].problems[l].questionFile) {
              formData.append("quizFiles", MoocCourse.chapters[i].lectures[j].quiz[k].problems[l].questionFile);
            }
          }
        }
        for (var k = 0; k < MoocCourse.chapters[i].lectures[j].assignment.length; k++) {
          for (
            var l = 0;
            MoocCourse.chapters[i].lectures[j].assignment[k] && l < MoocCourse.chapters[i].lectures[j].assignment[k].problems.length;
            l++
          ) {
            if (MoocCourse.chapters[i].lectures[j].assignment[k].problems[l].questionFile) {
              formData.append("assignmentFiles", MoocCourse.chapters[i].lectures[j].assignment[k].problems[l].questionFile);
            }
          }
        }

        for (var k = 0; k < MoocCourse.chapters[i].lectures[j].lectureFiles.length; k++)
          formData.append(`courseFiles`, MoocCourse.chapters[i].lectures[j].lectureFiles[k].fileLocation);
      }
      for (var j = 0; j < MoocCourse.chapters[i].exam.length; j++) {
        for (var k = 0; MoocCourse.chapters[i].exam[j] && k < MoocCourse.chapters[i].exam[j].problems.length; k++) {
          if (MoocCourse.chapters[i].exam[j].problems[k].questionFile) {
            formData.append(`examFiles`, MoocCourse.chapters[i].exam[j].problems[k].questionFile);
          }
        }
      }
    }
    setPostLoader(true);
    console.log(formData);
    const config = {
      method: "post",
      url: `${thekomp}/mooc/createcourse`,
      headers: {
        "content-type": "multipart/form-data",
      },
      data: formData,
    };
    axios(config)
      .then((res) => {
        console.log(res);
        // setPostLoader(false);
        history.push("/institutiondashboard?menu=instructorCourses");
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };
  const renderContent = () => {
    switch (selectedMenu) {
      case "structure":
        return <CourseStructure MoocCourse={MoocCourse} setMoocCourse={setMoocCourse} />;
      case "content":
        return <CourseContent MoocCourse={MoocCourse} setMoocCourse={setMoocCourse} />;
      case "landingPage":
        return <CourseLandingPage MoocCourse={MoocCourse} setMoocCourse={setMoocCourse} />;
      case "announcements":
        return <CourseAnnouncements MoocCourse={MoocCourse} setMoocCourse={setMoocCourse} />;
    }
  };
  if (!localStorage.getItem("authToken")) {
    return <Error404 />;
  }
  return (
    <div>
      <div className="createCoursePage">
        <div className="createCoursePage_menubar">
          <div class="ui vertical pointing menu" style={{ width: "100%" }}>
            <a className={`item ${selectedMenu === "structure" ? "active" : ""}`} onClick={(e) => setSelectedMenu("structure")}>
              Course Structure
            </a>
            <a className={`item ${selectedMenu === "content" ? "active" : ""}`} onClick={(e) => setSelectedMenu("content")}>
              Course Content
            </a>
            <a className={`item ${selectedMenu === "landingPage" ? "active" : ""}`} onClick={(e) => setSelectedMenu("landingPage")}>
              Landing Page
            </a>
            <a className={`item ${selectedMenu === "announcements" ? "active" : ""}`} onClick={(e) => setSelectedMenu("announcements")}>
              Announcements
            </a>
          </div>
          <div>
            <button class="ui green button submitBut" onClick={(e) => submitCourseHandler(e)}>
              Submit for review
            </button>
          </div>
        </div>
        <div className="createCoursePage_content">{renderContent()}</div>
      </div>
      {postloader && (
        <div className="mt-3" style={{ display: "flex", justifyContent: "center" }}>
          <ReactBootStrap.Spinner animation="grow" variant="primary" />
          <ReactBootStrap.Spinner animation="grow" variant="secondary" />
          <ReactBootStrap.Spinner animation="grow" variant="success" />
          <ReactBootStrap.Spinner animation="grow" variant="danger" />
          <ReactBootStrap.Spinner animation="grow" variant="warning" />
          <ReactBootStrap.Spinner animation="grow" variant="info" />
          <ReactBootStrap.Spinner animation="grow" variant="light" />
          <ReactBootStrap.Spinner animation="grow" variant="dark" />
        </div>
      )}
      {errorModal && <Modal title="Errors encountered" content={ErrorContent()} onDismiss={(e) => setErrorModal("")} />}
    </div>
  );
};

export default CreateMoocCourse;
