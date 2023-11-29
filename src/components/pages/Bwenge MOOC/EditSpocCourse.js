import React, { useState, useEffect } from "react";
import { useGetSpoc } from "../Institution/hooks/useInstitutionSpocs";
import CourseContent from "./createcourseComponents/CourseContent";
import CourseLandingPage from "./createcourseComponents/CourseLandingPage";
import CourseStructure from "./createcourseComponents/CourseStructure";
import CourseAnnouncements from "./createcourseComponents/CourseAnnouncements";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useAllMoocData } from "../Institution/hooks/useInstitutionMooc";
import thekomp from "./../../../thekomp";
import history from "../../../Redux/actions/history";
import SpocLandingPage from "./createcourseComponents/SpocLandingPage";

const EditSpocCourse = () => {
  const { id } = useParams();
  console.log(id);
  const { data, loading, error } = useGetSpoc(id);
  const [SpocCourse, setSpocCourse] = useState({});
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
      const selectedCourse = data.getSpoc;
      const cleanedObject = omitDeep(selectedCourse, "__typename");
      setSpocCourse(cleanedObject);
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

  console.log(SpocCourse);
  const submitCourseHandler = (e) => {
    e.preventDefault();
    var formData = new FormData();
    formData.append("id", SpocCourse.id);
    formData.append("spocTitle", SpocCourse.spocTitle);
    formData.append("CourseLength", "Long Course");
    formData.append("lead_headline", SpocCourse.lead_headline);
    formData.append("instructors", JSON.stringify(SpocCourse.instructors));
    formData.append("courseIcon", SpocCourse.courseIcon);
    formData.append("coursePreview", SpocCourse.coursePreview);
    formData.append("field", SpocCourse.field);
    formData.append("type", "long Course");
    formData.append("department", SpocCourse.department);
    formData.append("startingDate", SpocCourse.startingDate);
    formData.append("endingDate", SpocCourse.endingDate);
    formData.append("university", SpocCourse.university);
    formData.append("gradingCriteria", SpocCourse.gradingCriteria);
    formData.append("language", SpocCourse.language);
    formData.append("objectives", JSON.stringify(SpocCourse.objectives));
    formData.append("description", SpocCourse.description);
    formData.append("requirements", JSON.stringify(SpocCourse.requirements));
    formData.append("creator", JSON.stringify(SpocCourse.creator));
    formData.append("announcement", JSON.stringify(SpocCourse.announcement));

    formData.append("chapters", JSON.stringify(SpocCourse.chapters));
    for (var i = 0; i < SpocCourse.chapters.length; i++) {
      for (var j = 0; j < SpocCourse.chapters[i].lectures.length; j++) {
        for (var k = 0; k < SpocCourse.chapters[i].lectures[j].quiz.length; k++) {
          for (var l = 0; SpocCourse.chapters[i].lectures[j].quiz[k] && l < SpocCourse.chapters[i].lectures[j].quiz[k].problems.length; l++) {
            if (
              SpocCourse.chapters[i].lectures[j].quiz[k].problems[l].questionFile &&
              SpocCourse.chapters[i].lectures[j].quiz[k].problems[l].questionFile.type
            ) {
              formData.append("quizFiles", SpocCourse.chapters[i].lectures[j].quiz[k].problems[l].questionFile);
            }
          }
        }
        for (var k = 0; k < SpocCourse.chapters[i].lectures[j].assignment.length; k++) {
          for (
            var l = 0;
            SpocCourse.chapters[i].lectures[j].assignment[k] && l < SpocCourse.chapters[i].lectures[j].assignment[k].problems.length;
            l++
          ) {
            if (
              SpocCourse.chapters[i].lectures[j].assignment[k].problems[l].questionFile &&
              SpocCourse.chapters[i].lectures[j].assignment[k].problems[l].questionFile.type
            ) {
              formData.append("assignmentFiles", SpocCourse.chapters[i].lectures[j].assignment[k].problems[l].questionFile);
            }
          }
        }
        for (var k = 0; k < SpocCourse.chapters[i].lectures[j].lectureFiles.length; k++)
          if (SpocCourse.chapters[i].lectures[j].lectureFiles[k].fileLocation.type) {
            console.log(SpocCourse.chapters[i].lectures[j].lectureFiles[k]);
            formData.append(`courseFiles`, SpocCourse.chapters[i].lectures[j].lectureFiles[k].fileLocation);
          }
      }
      for (var j = 0; j < SpocCourse.chapters[i].exam.length; j++) {
        for (var k = 0; SpocCourse.chapters[i].exam[j] && k < SpocCourse.chapters[i].exam[j].problems.length; k++) {
          console.log("hehehhehe");

          if (SpocCourse.chapters[i].exam[j].problems[k].questionFile && SpocCourse.chapters[i].exam[j].problems[k].questionFile.type) {
            formData.append(`examFiles`, SpocCourse.chapters[i].exam[j].problems[k].questionFile);
          }
        }
      }
    }
    console.log(formData);
    const config = {
      method: "patch",
      url: `${thekomp}/spoc/editspoc`,
      headers: {
        "content-type": "multipart/form-data",
      },
      data: formData,
    };
    axios(config)
      .then((res) => {
        console.log(res);
        history.push(`/spocs/${SpocCourse.courseId}`);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };
  const renderContent = () => {
    switch (selectedMenu) {
      case "structure":
        return <CourseStructure MoocCourse={SpocCourse} setMoocCourse={setSpocCourse} />;
      case "content":
        return <CourseContent MoocCourse={SpocCourse} setMoocCourse={setSpocCourse} />;
      case "landingPage":
        return <SpocLandingPage MoocCourse={SpocCourse} setMoocCourse={setSpocCourse} />;
      case "announcements":
        return <CourseAnnouncements MoocCourse={SpocCourse} setMoocCourse={setSpocCourse} />;
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

export default EditSpocCourse;
