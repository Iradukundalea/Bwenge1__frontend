import React, { useState } from "react";
import history from "../../../../Redux/actions/history";
import "../styles/createcourse.css";
import { useSelector } from "react-redux";
import axios from "axios";

const EditCourse = () => {
  const selectedCourse = useSelector((state) => state.selectedCourse);
  const [course, setCourse] = useState({
    title: selectedCourse.title,
    instructor: selectedCourse.instructor,
    field: selectedCourse.field,
    department: selectedCourse.department,
    type: selectedCourse.type,
    file: "",
    errors: "",
  });

  const submitPaperHandler = async (e) => {
    console.log(course);
    e.preventDefault();
    //     dispatch(createPaper({ title: course.title, authors, journal: course.journal, field: course.field, keywords, abstract: course.abstract, PublicationDate: course.DateOfPublication, selectedFile: course.file }))
    var formData = new FormData();
    formData.append("title", course.title);
    formData.append("instructor", course.instructor);
    formData.append("field", course.field);
    formData.append("department", course.department);
    formData.append("type", course.type);
    formData.append("courseFile", document.getElementById("whyLong").files[0]);
    const config = {
      method: "patch",
      url: `http://13.59.38.98:5000/course/editcourse/${selectedCourse._id}`,
      headers: {
        "Content-type": "multipart/form-data",
      },
      data: formData,
    };
    axios(config)
      .then((res) => {
        console.log(res);
        history.push("/courses");
      })
      .catch((error) => {
        console.log(error.response.data.message);
        setCourse({ ...course, errors: error.response.data.message });
        setTimeout(() => {
          setCourse({ ...course, errors: "" });
        }, 5000);
      });
  };

  return (
    <div className="createpaperPage">
      <div className="center">
        <h1> Insert new Course</h1>
        <form
          onSubmit={submitPaperHandler}
          method="post"
          encType="multipart/formdata"
        >
          <div className="inputbox">
            <input
              type="text"
              name="title"
              value={course.title}
              onChange={(e) => {
                setCourse({ ...course, title: e.target.value });
              }}
            />
            <span>Title</span>
          </div>
          <div className="inputbox">
            <input
              type="text"
              name="journal"
              value={course.instructor}
              onChange={(e) => {
                setCourse({ ...course, instructor: e.target.value });
              }}
            />
            <span>Instructor</span>
          </div>

          <div className="inputbox">
            <input
              type="text"
              name="field"
              value={course.field}
              onChange={(e) => {
                setCourse({ ...course, field: e.target.value });
              }}
            />
            <span>Field</span>
          </div>
          <div className="inputbox">
            <input
              type="text"
              name="field"
              value={course.department}
              onChange={(e) => {
                setCourse({ ...course, department: e.target.value });
              }}
            />
            <span>department</span>
          </div>
          <div className="inputbox">
            <span className="indep">Type</span>
            <select
              value={course.type}
              className="cal"
              onChange={(e) => setCourse({ ...course, type: e.target.value })}
            >
              <option value="PPT course">PPT</option>
              <option value="Video course">Video</option>
            </select>
          </div>

          <div className="inputbox">
            <input
              type="file"
              name="selectedFile"
              id="whyLong"
              value={course.file}
              onChange={(e) => {
                setCourse({ ...course, file: e.target.value });
              }}
            />
            <span>Course File</span>
          </div>
          <div class="inputbox">
            <input
              onClick={(e) => submitPaperHandler(e)}
              type="button"
              value="submit"
            />
          </div>
          {course.errors && (
            <span className="error-message">{course.errors}</span>
          )}
        </form>
      </div>
    </div>
  );
};

export default EditCourse;
