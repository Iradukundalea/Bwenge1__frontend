import React, { useState, useEffect } from "react";
import CourseContent from "../../../Courses/Long Courses/Create Course components/CourseContent";
import CourseLandingPage from "../../../Courses/Long Courses/Create Course components/CourseLandingPage";
import CourseStructure from "../../../Courses/Long Courses/Create Course components/CourseStructure";
import { useApproveLongBwengeCourse } from "../../../BwengeCourses/hooks.js/uselongcourses";
// import CourseAnnouncements from "../../../Courses/Long Courses/Create Course components/CourseAnnouncements";
import CoursePrice from "../../../Courses/Long Courses/Create Course components/CoursePrice";
import axios from "axios";
import { useSelector } from "react-redux";
import history from "../../../../../Redux/actions/history";
import { useLocation } from "react-router-dom";

import thekomp from "./../../../../../thekomp";
import { useBwengeCourseLearn } from "../../../BwengeCourses/hooks.js/uselongcourses";
import { useMutation } from "@apollo/client";

const LongCourseCheck = (props) => {
  const queryParams = new URLSearchParams(window.location.search);
  const [approve_long_course, {}] = useMutation(useApproveLongBwengeCourse);
  const id = queryParams.get("id");
  console.log(id);
  const { data, loading, error } = useBwengeCourseLearn(id);
  const [longCourse, setLongCourse] = useState({});
  const [selectedMenu, setSelectedMenu] = useState("");

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

  useEffect(() => {
    if (data) {
      const selectedCourse = data.getLongCourse;
      const cleanedObject = omitDeep(selectedCourse, "__typename");
      setLongCourse(cleanedObject);
    }
  }, [data]);
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

  //   const submitCourseHandler = (e) => {
  //     e.preventDefault();
  //     var formData = new FormData();
  //     formData.append("id", MoocCourse.id);
  //     formData.append("title", MoocCourse.title);
  //     formData.append("CourseLength", "Long Course");
  //     formData.append("lead_headline", MoocCourse.lead_headline);
  //     formData.append("instructors", JSON.stringify(MoocCourse.instructors));
  //     formData.append("courseIcon", MoocCourse.courseIcon);
  //     formData.append("coursePreview", MoocCourse.coursePreview);
  //     formData.append("field", MoocCourse.field);
  //     formData.append("type", "long Course");
  //     formData.append("department", MoocCourse.department);
  //     formData.append("university", MoocCourse.university);
  //     formData.append("gradingCriteria", MoocCourse.gradingCriteria);
  //     formData.append("language", MoocCourse.language);
  //     formData.append("objectives", JSON.stringify(MoocCourse.objectives));
  //     formData.append("description", MoocCourse.description);
  //     formData.append("requirements", JSON.stringify(MoocCourse.requirements));
  //     formData.append("creator", JSON.stringify(MoocCourse.creator));
  //     formData.append("announcement", JSON.stringify(MoocCourse.announcement));

  //     formData.append("chapters", JSON.stringify(MoocCourse.chapters));
  //     for (var i = 0; i < MoocCourse.chapters.length; i++) {
  //       for (var j = 0; j < MoocCourse.chapters[i].lectures.length; j++) {
  //         for (var k = 0; k < MoocCourse.chapters[i].lectures[j].quiz.length; k++) {
  //           for (var l = 0; MoocCourse.chapters[i].lectures[j].quiz[k] && l < MoocCourse.chapters[i].lectures[j].quiz[k].problems.length; l++) {
  //             if (
  //               MoocCourse.chapters[i].lectures[j].quiz[k].problems[l].questionFile &&
  //               MoocCourse.chapters[i].lectures[j].quiz[k].problems[l].questionFile.type
  //             ) {
  //               formData.append("quizFiles", MoocCourse.chapters[i].lectures[j].quiz[k].problems[l].questionFile);
  //             }
  //           }
  //         }
  //         for (var k = 0; k < MoocCourse.chapters[i].lectures[j].assignment.length; k++) {
  //           for (
  //             var l = 0;
  //             MoocCourse.chapters[i].lectures[j].assignment[k] && l < MoocCourse.chapters[i].lectures[j].assignment[k].problems.length;
  //             l++
  //           ) {
  //             if (
  //               MoocCourse.chapters[i].lectures[j].assignment[k].problems[l].questionFile &&
  //               MoocCourse.chapters[i].lectures[j].assignment[k].problems[l].questionFile.type
  //             ) {
  //               formData.append("assignmentFiles", MoocCourse.chapters[i].lectures[j].assignment[k].problems[l].questionFile);
  //             }
  //           }
  //         }
  //         for (var k = 0; k < MoocCourse.chapters[i].lectures[j].lectureFiles.length; k++)
  //           if (MoocCourse.chapters[i].lectures[j].lectureFiles[k].fileLocation.type) {
  //             console.log(MoocCourse.chapters[i].lectures[j].lectureFiles[k]);
  //             formData.append(`courseFiles`, MoocCourse.chapters[i].lectures[j].lectureFiles[k].fileLocation);
  //           }
  //       }
  //       for (var j = 0; j < MoocCourse.chapters[i].exam.length; j++) {
  //         for (var k = 0; MoocCourse.chapters[i].exam[j] && k < MoocCourse.chapters[i].exam[j].problems.length; k++) {
  //           console.log("hehehhehe");

  //           if (MoocCourse.chapters[i].exam[j].problems[k].questionFile && MoocCourse.chapters[i].exam[j].problems[k].questionFile.type) {
  //             formData.append(`examFiles`, MoocCourse.chapters[i].exam[j].problems[k].questionFile);
  //           }
  //         }
  //       }
  //     }
  //     console.log(formData);
  //     const config = {
  //       method: "patch",
  //       url: `${thekomp}/mooc/editmooc`,
  //       headers: {
  //         "content-type": "multipart/form-data",
  //       },
  //       data: formData,
  //     };
  //     axios(config)
  //       .then((res) => {
  //         console.log(res);
  //         history.push("/institutiondashboard?menu=instructorCourses");
  //       })
  //       .catch((error) => {
  //         console.log(error.response.data.message);
  //       });
  //   };
  const renderContent = () => {
    switch (selectedMenu) {
      case "structure":
        return <CourseStructure longCourse={longCourse} setLongCourse={setLongCourse} />;
      case "content":
        return <CourseContent MoocCourse={longCourse} setMoocCourse={setLongCourse} />;
      case "landingPage":
        return <CourseLandingPage LongCourse={longCourse} setLongCourse={setLongCourse} />;
      case "coursePrice":
        return <CoursePrice longCourse={longCourse} setLongCourse={setLongCourse} />;
    }
  };
  return (
    <div>
      <div className="createCoursePage" style={{ marginTop: "10px", marginLeft: "0px" }}>
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
            {!longCourse.onApproved && (
              <button
                class="ui green button submitBut"
                onClick={(e) => {
                  if (
                    approve_long_course({
                      variables: { approveLongCourseId: id },
                    })
                  ) {
                    window.location.reload(false);
                  }
                }}
              >
                Approve Course
              </button>
            )}
          </div>
        </div>
        <div className="createCoursePage_content">{renderContent()}</div>
      </div>
    </div>
  );
};

export default LongCourseCheck;
