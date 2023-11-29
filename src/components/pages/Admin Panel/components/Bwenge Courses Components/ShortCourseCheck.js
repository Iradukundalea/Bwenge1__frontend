import React from "react";
import thekomp from "./../../../../../thekomp";
import ReactPlayer from "react-player";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { useGetSinglebwengeshortcourse } from "../../../BwengeCourses/hooks.js/useshortcourses";
import history from "../../../../../Redux/actions/history";
import { UseapproveShortCourse } from "../../../BwengeCourses/hooks.js/useshortcourses";
import { useMutation } from "@apollo/client";
const ShortCourseCheck = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const courseId = queryParams.get("id");
  const { data, loading, error } = useGetSinglebwengeshortcourse(courseId);

  const [approvethisShorty, {}] = useMutation(UseapproveShortCourse);

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
  const course = data.getSingleShortCourse;
  return (
    <div className="ui segment" style={{ minHeight: "100vh", overflow: "scroll" }}>
      <div>
        {course.courseIcon && !course.courseIcon.type && (
          <img src={`${thekomp}/${course.courseIcon}`} width={400} height={280} style={{ marginBottom: "15px" }} />
        )}
        {course.type == "Video course" && (
          <div style={{ height: "50vh", width: "60%", float: "right" }}>
            <ReactPlayer url={course.selectedFile} />
          </div>
        )}
        {course.selectedFile.substr(course.selectedFile.length - 3, 3) === "pdf" && (
          <div style={{ height: "50vh", width: "60%", float: "right" }}>
            {/* <DocsViewer link={`${API}/${course.file}`} /> */}
            <iFrame class="embed-responsive-item" width="100%" height="100%" src={`${thekomp}/${course.selectedFile}`} />
          </div>
        )}
        <div className="center row ui form">
          <div className="field">
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={course.title}
              // onChange={(e) => {
              //   setCourse({ ...course, title: e.target.value });
              // }}
            />
          </div>
          <div className="field">
            <label>Instructor</label>
            <input
              type="text"
              name="journal"
              value={course.instructor}
              // onChange={(e) => {
              //   setCourse({ ...course, instructor: e.target.value });
              // }}
            />
          </div>

          <div className="field">
            <label>Field</label>
            {course.field}
          </div>
          <div className="field">
            <label>Description </label>
            <CKEditor
              editor={ClassicEditor}
              data={course.description}

              //   onChange={(event, editor) => {
              //     const data = editor.getData();
              //     setCourse({ ...course, description: data });
              //   }}
            />
          </div>

          <div class="field">
            <label>Course Department</label>
            {course.department}
          </div>
          <div className="field">
            <label>Type</label>
            {course.type}
          </div>
        </div>
      </div>
      {!course.onApproved && (
        <button
          onClick={(e) => {
            if (
              approvethisShorty({
                variables: { approveShortCourseId: course.id },
              })
            ) {
              window.location.reload(false);
            }
          }}
          style={{ position: "fixed", bottom: "200px", right: "20px" }}
          className="ui primary button"
        >
          Approve Course
        </button>
      )}
    </div>
  );
};

export default ShortCourseCheck;
