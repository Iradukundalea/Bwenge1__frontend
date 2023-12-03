import React from "react";
import { useSelector, useDispatch } from "react-redux";
import history from "../../../../Redux/actions/history";
import { deleteCourse } from "../../../../Redux/actions";
import PrivateButton from "../../../routing/PrivateButton";
import "../styles/course.css";
import ReactPlayer from "react-player/lazy";

const Course = () => {
  const course = useSelector((state) => state.selectedCourse);
  const dispatch = useDispatch();

  var setBlank = "";
  const downloadHandler = () => {
    if (!localStorage.getItem("authToken")) {
      setBlank = "";
      return `http://localhost:3000/login`;
    } else {
      setBlank = "_blank";
      return `http://13.59.38.98:5000/${course.courseFile}`;
    }
  };
  return (
    <div className="PaperBox">
      <div className="journal">{course.instructor}</div>
      <div className="title">
        <h2>{course.title}</h2>
      </div>

      <div className="field rowInfo">
        <p>
          <span className="rowTitle">Field: </span>
          {course.field}
        </p>
      </div>

      <div>
        {course.courseFile.substr(course.courseFile.length - 3, 3) ===
          "mp4" && (
          <ReactPlayer
            url={course.courseFile}
            controls={true}
            width="700px"
            height="400px"
          />
        )}
        {course.courseFile.substr(course.courseFile.length - 3, 3) ===
          "pdf" && (
          <div
            style={{
              border: "1px solid rgba(0, 0, 0, 0.3)",
              height: "500px",
              width: "800px",
            }}
          >
            {/* <DocsViewer link={course.courseFile} /> */}
          </div>
        )}
      </div>
      <PrivateButton>
        <button
          onClick={(e) => history.push("/editcourse")}
          class="ui primary button"
          style={{ float: "right", marginRight: "40px" }}
        >
          Edit Course
        </button>
        <button
          onClick={(e) => dispatch(deleteCourse(course._id))}
          class="ui violet button"
          style={{ float: "right", marginRight: "40px" }}
        >
          Delete Course
        </button>
      </PrivateButton>
    </div>
  );
};

export default Course;
