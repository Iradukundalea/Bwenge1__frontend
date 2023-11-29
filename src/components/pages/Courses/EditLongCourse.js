import React, { useState, useEffect } from "react";
import CourseStructure from "./Long Courses/Create Course components/CourseStructure";
import CourseContent from "./Long Courses/Create Course components/CourseContent";
import CourseLandingPage from "./Long Courses/Create Course components/CourseLandingPage";
import CoursePrice from "./Long Courses/Create Course components/CoursePrice";
import axios from "axios";
import { useSelector } from "react-redux";
import history from "../../../Redux/actions/history";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useAllMoocData } from "../Institution/hooks/useInstitutionMooc";
import thekomp from "./../../../thekomp";
import CourseAnnouncements from "../Bwenge MOOC/createcourseComponents/CourseAnnouncements";
import { useBwengeCourseLearn } from "../BwengeCourses/hooks.js/uselongcourses";

const EditLongCourse = (props) => {
  const { id } = useParams();
  console.log(id);
  const { data, loading, error } = useBwengeCourseLearn(id);
  const [longCourse, setLongCourse] = useState({});
  const [selectedMenu, setSelectedMenu] = useState("");
  console.log({ data, loading, error });

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

  console.log(longCourse);

  const submitCourseHandler = (e) => {
    e.preventDefault();
    var formData = new FormData();
    formData.append("id", id);
    formData.append("title", longCourse.title);
    formData.append("CourseLength", "Long Course");
    formData.append("lead_headline", longCourse.lead_headline);
    formData.append("instructors", JSON.stringify(longCourse.instructors));
    formData.append("courseIcon", longCourse.courseIcon);
    formData.append("coursePreview", longCourse.coursePreview);
    formData.append("field", longCourse.field);
    formData.append("department", longCourse.department);
    formData.append("gradingCriteria", longCourse.gradingCriteria);
    formData.append("language", longCourse.language);
    formData.append("objectives", JSON.stringify(longCourse.objectives));
    formData.append("description", longCourse.description);
    formData.append("requirements", JSON.stringify(longCourse.requirements));
    formData.append("creator", JSON.stringify(longCourse.creator));
    formData.append("announcement", JSON.stringify(longCourse.announcement));

    formData.append("chapters", JSON.stringify(longCourse.chapters));
    for (var i = 0; i < longCourse.chapters.length; i++) {
      for (var j = 0; j < longCourse.chapters[i].lectures.length; j++) {
        for (var k = 0; k < longCourse.chapters[i].lectures[j].quiz.length; k++) {
          for (var l = 0; longCourse.chapters[i].lectures[j].quiz[k] && l < longCourse.chapters[i].lectures[j].quiz[k].problems.length; l++) {
            if (
              longCourse.chapters[i].lectures[j].quiz[k].problems[l].questionFile &&
              longCourse.chapters[i].lectures[j].quiz[k].problems[l].questionFile.type
            ) {
              formData.append("quizFiles", longCourse.chapters[i].lectures[j].quiz[k].problems[l].questionFile);
            }
          }
        }
        for (var k = 0; k < longCourse.chapters[i].lectures[j].assignment.length; k++) {
          for (
            var l = 0;
            longCourse.chapters[i].lectures[j].assignment[k] && l < longCourse.chapters[i].lectures[j].assignment[k].problems.length;
            l++
          ) {
            if (
              longCourse.chapters[i].lectures[j].assignment[k].problems[l].questionFile &&
              longCourse.chapters[i].lectures[j].assignment[k].problems[l].questionFile.type
            ) {
              formData.append("assignmentFiles", longCourse.chapters[i].lectures[j].assignment[k].problems[l].questionFile);
            }
          }
        }
        for (var k = 0; k < longCourse.chapters[i].lectures[j].lectureFiles.length; k++)
          if (longCourse.chapters[i].lectures[j].lectureFiles[k].fileLocation.type) {
            console.log(longCourse.chapters[i].lectures[j].lectureFiles[k]);
            formData.append(`courseFiles`, longCourse.chapters[i].lectures[j].lectureFiles[k].fileLocation);
          }
      }
      for (var j = 0; j < longCourse.chapters[i].exam.length; j++) {
        for (var k = 0; longCourse.chapters[i].exam[j] && k < longCourse.chapters[i].exam[j].problems.length; k++) {
          console.log("hehehhehe");

          if (longCourse.chapters[i].exam[j].problems[k].questionFile && longCourse.chapters[i].exam[j].problems[k].questionFile.type) {
            formData.append(`examFiles`, longCourse.chapters[i].exam[j].problems[k].questionFile);
          }
        }
      }
    }
    console.log(formData);
    const config = {
      method: "patch",
      url: `${thekomp}/course/editcourse`,
      headers: {
        "content-type": "multipart/form-data",
      },
      data: formData,
    };
    axios(config)
      .then((res) => {
        console.log(res);
        history.push("/instructorcourses");
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };
  const renderContent = () => {
    switch (selectedMenu) {
      case "structure":
        return <CourseStructure longCourse={longCourse} setLongCourse={setLongCourse} />;
      case "content":
        return <CourseContent MoocCourse={longCourse} setMoocCourse={setLongCourse} />;
      case "landingPage":
        return <CourseLandingPage LongCourse={longCourse} setLongCourse={setLongCourse} />;
      case "announcements":
        return <CourseAnnouncements MoocCourse={longCourse} setMoocCourse={setLongCourse} />;
      case "coursePrice":
        return <CoursePrice longCourse={longCourse} setLongCourse={setLongCourse} />;
    }
  };
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
            <a className={`item ${selectedMenu === "coursePrice" ? "active" : ""}`} onClick={(e) => setSelectedMenu("coursePrice")}>
              Course Price
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
    </div>
  );
};

export default EditLongCourse;
