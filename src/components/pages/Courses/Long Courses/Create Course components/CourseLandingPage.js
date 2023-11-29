import React from "react";
import ReactPlayer from "react-player/lazy";
import thekomp from "./../../../../../thekomp";
const CourseLandingPage = (props) => {
  const API = thekomp;
  return (
    <div className="courseLandingPage ui segment">
      <div className="ui form">
        <div class="field">
          <label>Course Title</label>
          <input
            type="text"
            value={props.LongCourse.title}
            onChange={(e) =>
              props.setLongCourse({
                ...props.LongCourse,
                title: e.target.value,
              })
            }
          />
        </div>
        <div class="field">
          <label>Course Lead headline</label>
          <input
            type="text"
            value={props.LongCourse.lead_headline}
            onChange={(e) =>
              props.setLongCourse({
                ...props.LongCourse,
                lead_headline: e.target.value,
              })
            }
          />
        </div>
        <div class="field">
          <label>Course Image</label>
          {props.LongCourse.courseIcon && props.LongCourse.courseIcon.type && (
            <img src={URL.createObjectURL(props.LongCourse.courseIcon)} width={400} height={280} style={{ marginBottom: "15px" }} />
          )}
          {props.LongCourse.courseIcon && !props.LongCourse.courseIcon.type && (
            <img src={`${API}/${props.LongCourse.courseIcon}`} width={400} height={280} style={{ marginBottom: "15px" }} />
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
                props.setLongCourse({
                  ...props.LongCourse,
                  courseIcon: document.getElementById("CourseIcon").files[0],
                });
              }
            }}
          />
        </div>
        <div class="field">
          <label>Course Preview</label>
          {props.LongCourse.coursePreview && props.LongCourse.coursePreview.type && (
            <ReactPlayer url={URL.createObjectURL(props.LongCourse.coursePreview)} controls={true} width="400px" height="200px" />
          )}
          {props.LongCourse.coursePreview && !props.LongCourse.coursePreview.type && (
            <ReactPlayer url={`${API}/${props.LongCourse.coursePreview}`} controls={true} width="400px" height="200px" />
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
                props.setLongCourse({
                  ...props.LongCourse,
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
