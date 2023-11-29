import React from "react";
import ReactPlayer from "react-player/lazy";
import thekomp from "./../../../../thekomp";
const CourseLandingPage = (props) => {
  const API = thekomp;
  return (
    <div className="courseLandingPage ui segment">
      <div className="ui form">
        <div class="field">
          <label>Course Title</label>
          <input
            type="text"
            value={props.MoocCourse.title}
            onChange={(e) =>
              props.setMoocCourse({
                ...props.MoocCourse,
                title: e.target.value,
              })
            }
          />
        </div>
        <div class="field">
          <label>Course Lead headline</label>
          <input
            type="text"
            value={props.MoocCourse.lead_headline}
            onChange={(e) =>
              props.setMoocCourse({
                ...props.MoocCourse,
                lead_headline: e.target.value,
              })
            }
          />
        </div>
        <div class="field">
          <label>Course Image</label>
          {props.MoocCourse.courseIcon && props.MoocCourse.courseIcon.type && (
            <img src={URL.createObjectURL(props.MoocCourse.courseIcon)} width={400} height={280} style={{ marginBottom: "15px" }} />
          )}
          {props.MoocCourse.courseIcon && !props.MoocCourse.courseIcon.type && (
            <img src={`${API}/${props.MoocCourse.courseIcon}`} width={400} height={280} style={{ marginBottom: "15px" }} />
          )}

          <input
            type="file"
            id="CourseIcon"
            onChange={(e) => {
              var fileInput = document.getElementById("CourseIcon");

              var filePath = fileInput.value;

              // Allowing file type
              var allowedExtensions = /(\.jpg|\.png|\.svg)$/i;

              if (!allowedExtensions.exec(filePath)) {
                console.log("olala");
                alert("File type not image");
                return false;
              } else {
                props.setMoocCourse({
                  ...props.MoocCourse,
                  courseIcon: document.getElementById("CourseIcon").files[0],
                });
              }
            }}
          />
        </div>
        <div class="field">
          <label>Course Preview</label>
          {props.MoocCourse.coursePreview && props.MoocCourse.coursePreview.type && (
            <ReactPlayer url={URL.createObjectURL(props.MoocCourse.coursePreview)} controls={true} width="400px" height="200px" />
          )}
          {props.MoocCourse.coursePreview && !props.MoocCourse.coursePreview.type && (
            <ReactPlayer url={`${API}/${props.MoocCourse.coursePreview}`} controls={true} width="400px" height="200px" />
          )}
          <input
            type="file"
            id="CoursePreview"
            onChange={(e) => {
              var fileInput = document.getElementById("CoursePreview");

              var filePath = fileInput.value;

              // Allowing file type
              var allowedExtensions = /(\.mp4|\.avi|\.mkv)$/i;

              if (!allowedExtensions.exec(filePath)) {
                console.log("olala");
                alert("File type not video");
                return false;
              } else {
                props.setMoocCourse({
                  ...props.MoocCourse,
                  coursePreview: document.getElementById("CoursePreview").files[0],
                });
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CourseLandingPage;
