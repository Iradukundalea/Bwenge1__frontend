import React, { useState } from "react";
import CourseStructure from "./Long Courses/Create Course components/CourseStructure";
import CourseContent from "./Long Courses/Create Course components/CourseContent";
import CourseLandingPage from "./Long Courses/Create Course components/CourseLandingPage";
import CoursePrice from "./Long Courses/Create Course components/CoursePrice";
import Modal from "../../Modal";
import "./styles/createcourse.css";
import * as tus from "tus-js-client";
import ProgressBar from "react-bootstrap/ProgressBar";

import ReactPlayer from "react-player";
import axios from "axios";
import history from "../../../Redux/actions/history";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "./Long Courses/Create Course components/styles/coursecontent.css";
import thekomp from "./../../../thekomp";
import CourseAnnouncements from "../Bwenge MOOC/createcourseComponents/CourseAnnouncements";
import * as ReactBootStrap from "react-bootstrap";
import Error404 from "../../Error404";
import "./Long Courses/Create Course components/styles/coursecontent.css";
import BWENGELOGO from "./../../../imgs/BWENG.svg";

const CreateCourse = () => {
  const fields = {
    "": [],
    Engineering: [
      "Mechanical Engineering",
      "Chemical Engineering",
      "Material Science and Engineering",
      "Environmental Science",
      "Civil Engineering",
      "Telecommunication Engineering",
      "Computer Science",
      "Energy Science",
      "Biotechnology",
      "Nanoscience and Technology",
      "Food Science and Technology",
      "Automation and Control",
      "Mining and Mineral Engineering",
      "Water Resources",
      "Electronic and Electrical Engineering",
      "Remote sensing",
      "BiomedicL Engineering",
      "Metallurgical Engineering",
      "Others",
    ],
    "Natural Sciences": ["Mathematics", "Earth Sciences", "Physics", "Geography", "Atmospheric Science", "Chemistry", "Ecology", "Others"],
    "Life Sciences": ["Biological Sciences", "Veterinary Sciences", "Human Biological Sciences", "Agricultural Sciences", "Others"],
    "Medical Sciences": [
      "Clinical Medicine",
      "Nursing",
      "Public Health",
      "Medical Technology",
      "Dentistry",
      "Pharmacy",
      "Biomedical Laboratory",
      "Clinical Psychology",
      "Opthalmology",
      "Anesthesia",
      "Others",
    ],
    "Social Sciences": [
      "Economics",
      "Finance",
      "Hospitality and Tourism Management",
      "Political Science",
      "Statistics",
      "Communication",
      "Sociology",
      "Psychology",
      "Education",
      "Law",
      "Business Administration",
      "Public Administration",
      "Management",
      "Library and Information Science",
      "Others",
    ],
    "Professional Courses": [],
    "High School Coaching": [],
    "Culture Courses": [],
    "Language Courses": [],
    "National Courses": [],
  };
  const [courseTypeModal, setCourseTypeModal] = useState(true);
  const [courseType, setCourseType] = useState("");
  const [selectedMenu, setSelectedMenu] = useState("");
  const [postloader, setPostLoader] = useState(false);
  const [selectedField, setSelectedField] = useState([]);
  const [videoPerc, setVideoPerc] = useState();
  const [longCourse, setLongCourse] = useState({
    title: "",
    lead_headline: "",
    instructors: [localStorage.getItem("lastName") + " " + localStorage.getItem("firstName")],
    courseIcon: "",
    coursePreview: "",
    field: "",
    type: "Long Course",
    department: "",
    gradingCriteria: "",
    language: "English",
    objectives: [],
    description: "",
    requirements: [],
    chapters: [],
    price: null,
    chaptersJson: "",
    announcement: [],
    creator: {
      creatorId: localStorage.getItem("userId"),
      email: localStorage.getItem("email"),
      firstName: localStorage.getItem("firstName"),
      lastName: localStorage.getItem("lastName"),
    },
  });

  const [course, setCourse] = useState({
    title: "",
    instructor: localStorage.getItem("lastName") + " " + localStorage.getItem("firstName"),
    field: "",
    type: "File course",
    description: "",
    department: "",
    courseIcon: "",
    file: "",
    creator: {
      creatorId: localStorage.getItem("userId"),
      email: localStorage.getItem("email"),
      firstName: localStorage.getItem("firstName"),
      lastName: localStorage.getItem("lastName"),
    },
  });
  const [error, setError] = useState("");
  console.log(course);
  console.log(videoPerc);
  const submitCourseHandler = (e) => {
    e.preventDefault();
    var formData = new FormData();
    if (longCourse.title) {
      formData.append("title", longCourse.title);
    } else {
      setError("title");
      return;
    }
    formData.append("courseLength", "Long Course");

    if (longCourse.instructors.length > 0) {
      formData.append("instructors", JSON.stringify(longCourse.instructors));
    } else {
      setError("instructor");
      return;
    }
    if (longCourse.courseIcon) {
      formData.append("courseIcon", longCourse.courseIcon);
    } else {
      setError("course Icon");
      return;
    }

    formData.append("coursePreview", longCourse.coursePreview);
    if (longCourse.field) {
      formData.append("field", longCourse.field);
    } else {
      setError("field");
      return;
    }
    formData.append("type", "long Course");

    if (longCourse.gradingCriteria) {
      formData.append("gradingCriteria", longCourse.gradingCriteria);
    } else {
      setError("grading criteria");
      return;
    }
    formData.append("language", longCourse.language);
    if (longCourse.objectives.length > 0) {
      formData.append("objectives", JSON.stringify(longCourse.objectives));
    } else {
      setError("objectives");
      return;
    }
    if (longCourse.description) {
      formData.append("description", longCourse.description);
    } else {
      setError("description");
      return;
    }
    if (longCourse.requirements.length > 0) {
      formData.append("requirements", JSON.stringify(longCourse.requirements));
    } else {
      setError("requirements");
      return;
    }
    formData.append("creator", JSON.stringify(longCourse.creator));
    formData.append("announcement", JSON.stringify(longCourse.announcement));
    if (longCourse.price) {
      formData.append("price", longCourse.price);
    } else {
      setError("price");
      return;
    }

    if (longCourse.chapters.length == 0) {
      setError("content");
      return;
    }
    formData.append("chapters", JSON.stringify(longCourse.chapters));
    for (var i = 0; i < longCourse.chapters.length; i++) {
      for (var j = 0; j < longCourse.chapters[i].lectures.length; j++) {
        for (var k = 0; k < longCourse.chapters[i].lectures[j].quiz.length; k++) {
          for (var l = 0; longCourse.chapters[i].lectures[j].quiz[k] && l < longCourse.chapters[i].lectures[j].quiz[k].problems.length; l++) {
            if (longCourse.chapters[i].lectures[j].quiz[k].problems[l].questionFile) {
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
            if (longCourse.chapters[i].lectures[j].assignment[k].problems[l].questionFile) {
              formData.append("assignmentFiles", longCourse.chapters[i].lectures[j].assignment[k].problems[l].questionFile);
            }
          }
        }

        for (var k = 0; k < longCourse.chapters[i].lectures[j].lectureFiles.length; k++)
          formData.append(`courseFiles`, longCourse.chapters[i].lectures[j].lectureFiles[k].fileLocation);
      }
      for (var j = 0; j < longCourse.chapters[i].exam.length; j++) {
        for (var k = 0; longCourse.chapters[i].exam[j] && k < longCourse.chapters[i].exam[j].problems.length; k++) {
          if (longCourse.chapters[i].exam[j].problems[k].questionFile) {
            formData.append(`examFiles`, longCourse.chapters[i].exam[j].problems[k].questionFile);
          }
        }
      }
    }
    setPostLoader(true);
    console.log(formData);
    const config = {
      method: "post",
      url: `${thekomp}/course/createcourse`,
      headers: {
        "content-type": "multipart/form-data",
      },
      data: formData,
    };
    axios(config)
      .then((res) => {
        setPostLoader(false);
        console.log(res);
        alert("Your long course has been inserted successfully, After being approved it will be available publicly! Thx.");
        history.push("/bwengecourses/longcourses");
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };
  const ErrorContent = () => {
    return <div>Please enter course's{error}</div>;
  };

  const PostContent = () => {
    if (postloader)
      return (
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
      );
    else {
      return <h1>Course Inserted</h1>;
    }
  };
  const headerPost = {
    Accept: "application/vnd.vimeo.*+json;version=3.4",
    Authorization: `bearer 5659dc7042802ecfbf4b65997b2650ce`,
    "Content-Type": "application/json",
  };
  const clientUploadVideoHandler = async (file) => {
    console.log(file.size);
    const response = await axios({
      method: "post",
      url: `https://api.vimeo.com/me/videos`,
      headers: headerPost,
      data: {
        upload: {
          approach: "tus",
          size: file.size,
        },
      },
    });
    console.log(response);
    const upload = new tus.Upload(file, {
      endPoint: "https://api.vimeo.com/me/videos",
      uploadUrl: response.data.upload.upload_link,
      retryDelays: [0, 3000, 5000, 10000, 20000],
      metadata: {
        filename: file.name,
        filetype: file.type,
      },
      headers: {},
      onError: function (error) {
        console.log("Failed because: " + error);
      },
      onProgress: function (bytesUploaded, bytesTotal) {
        let percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2);
        setVideoPerc(Math.floor(percentage));
        // console.log(bytesUploaded, bytesTotal, percentage + "%");
      },
      onSuccess: function () {
        console.log("Download %s from %s", upload.file.name, upload.url);
        setCourse({ ...course, file: response.data.link });
      },
    });
    upload.start();
  };
  const submitShortCourseHandler = async (e) => {
    console.log(course);
    e.preventDefault();
    //     dispatch(createPaper({ title: course.title, authors, journal: course.journal, field: course.field, keywords, abstract: course.abstract, PublicationDate: course.DateOfPublication, selectedFile: course.file }))
    var formData = new FormData();
    formData.append("courseLength", "Short Course");
    if (course.title) {
      formData.append("title", course.title);
    } else {
      setError("title");
      return;
    }
    if (course.instructor) {
      formData.append("instructor", course.instructor);
    } else {
      setError("instructor");
      return;
    }
    if (course.field) {
      formData.append("field", course.field);
    } else {
      setError("field");
      return;
    }
    formData.append("type", course.type);
    if (course.courseIcon) {
      formData.append("courseIcon", course.courseIcon);
    } else {
      setError("course icon");
      return;
    }
    if (course.description) {
      formData.append("description", course.description);
    } else {
      setError("description");
      return;
    }
    formData.append("department", course.department);

    if (course.file) {
      formData.append("courseFile", course.file);
    } else {
      setError("course file");
      return;
    }
    formData.append("creator", JSON.stringify(course.creator));
    setPostLoader(true);
    var url;
    if (course.type == "Video course") {
      url = `${thekomp}/shortcourse/createshortvideocourse`;
    } else {
      url = `${thekomp}/shortcourse/createshortcourse`;
    }
    const config = {
      method: "post",
      url: url,
      headers: {
        "Content-type": "multipart/form-data",
      },
      data: formData,
    };
    axios(config)
      .then((res) => {
        setPostLoader(false);
        alert("Your short course has been inserted successfully, After being approved it will be available publicly! Thx.");
        history.push("/instructorcourses");
      })
      .catch((error) => {
        setCourse({ ...course, errors: error.response.data.message });
        setTimeout(() => {
          setCourse({ ...course, errors: "" });
        }, 5000);
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
  const TypeContent = () => {
    return (
      <div class="ui form">
        <div class="field">
          <select
            onChange={(e) => {
              setCourseType(e.target.value);
              setCourseTypeModal(false);
            }}
          >
            <option className="item" value="">
              Course Type
            </option>
            <option className="item" value="Short Course">
              Short Course(PPts, tutorials)
            </option>
            <option className="item" value="Long Course">
              Long Course
            </option>
          </select>
        </div>
      </div>
    );
  };
  if (!localStorage.getItem("authToken")) {
    return <Error404 />;
  }
  return (
    <div>
      {courseType === "Long Course" && (
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
      )}
      {courseType === "Short Course" && (
        <div className="createpaperPage1">
          <div className="center">
            <h1> Insert new short course (ppts, short video)</h1>
            {course.courseIcon && course.courseIcon.type && (
              <img src={URL.createObjectURL(course.courseIcon)} width={400} height={280} style={{ marginBottom: "15px" }} />
            )}
            {course.courseIcon && !course.courseIcon.type && (
              <img src={`${thekomp}/${course.courseIcon}`} width={400} height={280} style={{ marginBottom: "15px" }} />
            )}

            <div className="center row ui form shortcourseform">
              <div className="field">
                <label>Title</label>
                <input
                  type="text"
                  name="title"
                  value={course.title}
                  onChange={(e) => {
                    setCourse({ ...course, title: e.target.value });
                  }}
                />
              </div>
              <div className="field">
                <label>Instructor</label>
                <input type="text" name="journal" value={course.instructor} />
              </div>

              <div className="field">
                <label>Field</label>
                <select
                  onChange={(e) => {
                    var self = e.target.value;
                    console.log(self);
                    setSelectedField(fields[self]);
                    setCourse({ ...course, field: e.target.value, department: fields[self][0] ? fields[self][0] : "" });
                  }}
                >
                  {Object.keys(fields).map(function (key, index) {
                    return <option className="item">{key}</option>;
                  })}
                </select>
              </div>
              <div className="field">
                <label>Description </label>
                <CKEditor
                  editor={ClassicEditor}
                  data={course.description}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setCourse({ ...course, description: data });
                  }}
                />
              </div>
              {selectedField[0] && (
                <div class="field">
                  <label>Course Department</label>
                  <div>
                    <select onChange={(e) => setCourse({ ...course, department: e.target.value })}>
                      {selectedField.map((item) => {
                        return <option className="item">{item}</option>;
                      })}
                    </select>
                  </div>
                </div>
              )}
              <div className="field">
                <label>Course Icon:</label>

                <input
                  type="file"
                  id="shortcourseIcon"
                  accept="image/*"
                  onChange={(e) => {
                    setCourse({ ...course, courseIcon: document.getElementById("shortcourseIcon").files[0] });
                  }}
                />
              </div>
              <div className="field">
                <label>Type</label>

                <select onChange={(e) => setCourse({ ...course, type: e.target.value })}>
                  <option className="item" value="File course">
                    File
                  </option>
                  <option className="item" value="Video course">
                    Video
                  </option>
                </select>
              </div>

              <div className="field">
                <label>Course File</label>
                {course.type == "File course" && (
                  <input
                    type="file"
                    name="selectedFile"
                    id="whyLong"
                    onChange={(e) => {
                      console.log("heree");
                      var fileInput = document.getElementById("whyLong");
                      var filePath = fileInput.value;
                      // Allowing file type
                      var allowedExtensions = /(\.pdf)$/i;

                      if (!allowedExtensions.exec(filePath)) {
                        alert("File type not allowed,Upload a pdf");
                        return false;
                      } else {
                        setCourse({ ...course, file: document.getElementById("whyLong").files[0] });
                      }
                    }}
                  />
                )}
                {course.type == "Video course" && (
                  <input
                    type="file"
                    name="selectedFile"
                    id="whyLong"
                    onChange={(e) => {
                      console.log("heree");
                      var fileInput = document.getElementById("whyLong");
                      var filePath = fileInput.value;
                      // Allowing file type
                      var allowedExtensions = /(\.mp4|\.mkv|\.avi)$/i;

                      if (!allowedExtensions.exec(filePath)) {
                        alert("File type not allowed,Upload a pdf");
                        return false;
                      } else {
                        clientUploadVideoHandler(document.getElementById("whyLong").files[0]);
                      }
                    }}
                  />
                )}
              </div>
            </div>
            {videoPerc && <ProgressBar now={videoPerc} label={`${videoPerc}%`} />}
            {course.file.type === "video/mp4" && <ReactPlayer url={URL.createObjectURL(course.file)} controls={true} width="70%" height="400px" />}
            {course.file.type === "application/pdf" && (
              <div style={{ height: "60vh", width: "70%" }}>
                <iFrame class="embed-responsive-item" width="100%" height="100%" src={`${URL.createObjectURL(course.file)}`} />
                {/* <DocsViewer link={URL.createObjectURL(course)} /> */}
              </div>
            )}
            {
              <button onClick={(e) => submitShortCourseHandler(e)} className="ui primary button mt-3">
                Submit Course
              </button>
            }
          </div>
        </div>
      )}
      {courseTypeModal && <Modal title="Set Course Type" content={TypeContent()} />}
      {/* {postloader && (
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
      )} */}
      {error && <Modal title="Errors encountered" content={ErrorContent()} onDismiss={(e) => setError("")} />}
      {postloader && <Modal title="Course creating..." content={PostContent()} />}
    </div>
  );
};

export default CreateCourse;
