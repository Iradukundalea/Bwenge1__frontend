import React from "react";
import thekomp from "./../../../thekomp";
import history from "../../../Redux/actions/history";
import { useBwengeInstructorCourses } from "./hooks.js/uselongcourses";
import { useGetAllInstructorShortCourses } from "./hooks.js/useshortcourses";
import { useWiterArticles } from "./hooks.js/useBwengeArticles";

const InstructorPage = () => {
  const { loading, error, data } = useBwengeInstructorCourses(localStorage.getItem("email"));
  const { loading1, error1, data1 } = useGetAllInstructorShortCourses(localStorage.getItem("email"));
  const { loading2, error2, data2 } = useWiterArticles(localStorage.getItem("email"));
  console.log({ loading1, error1, data1 });
  if (loading || loading1 || loading2) {
    return (
      <div class="ui segment">
        <div class="ui active inverted dimmer">
          <div class="ui text loader">Loading</div>
        </div>
        <p></p>
      </div>
    );
  }
  if (error || error1 || error2) {
    console.log(error);
    return <h2>{error.Error}</h2>;
  }

  const instructorLongCourses = data.getInstructorLongCourses;
  const instructorShortCourses = data1.getInstructorShortCourses;
  const articles = data2.getWriterArticles;
  console.log(instructorShortCourses);
  var counter = 1;
  return (
    <div className="ui segment">
      <div style={{ fontWeight: "bold", textDecoration: "underline", fontSize: "1.5rem" }} className="mb-2">
        My Teaching
      </div>
      <button onClick={(e) => history.push("/createcourse")} className="ui primary button">
        Create Course
      </button>
      <button onClick={(e) => history.push("/createarticle")} className="ui primary button">
        Write Article
      </button>
      <div className="ui raised segment">
        <h2 class="ui header" style={{ display: "flex", justifyContent: "center", textDecoration: "underline" }}>
          Long courses
        </h2>
        <div className="ui link cards m-5">
          {instructorLongCourses.map((item) => {
            return (
              <div class="card">
                <div class="image">
                  <img src={`${thekomp}/${item.courseIcon}`} height="155" width="240" />
                </div>
                <div class="content">
                  <div class="header">{item.title}</div>
                  <div class="meta">
                    <a>{item.field}</a>
                  </div>
                  <div class="description"> onApproved: {item.onApproved.toString()}</div>
                </div>
                <div class="extra content">
                  <div class="ui two buttons">
                    <div
                      class="ui basic green button"
                      // onClick={(e) => history.push(`/indivcourseinstructor/${item.id}/students`)}
                    >
                      My Students
                    </div>
                    <div onClick={(e) => history.push(`/editlongcourse/${item.id}`)} class="ui basic red button">
                      Modify
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="ui raised segment">
        <h2 class="ui header" style={{ display: "flex", justifyContent: "center", textDecoration: "underline" }}>
          Short courses
        </h2>
        <div className="ui link cards m-5">
          {instructorShortCourses.map((item) => {
            return (
              <div class="card">
                <div class="image">
                  <img src={`${thekomp}/${item.courseIcon}`} />
                </div>
                <div class="content">
                  <div class="header">{item.title}</div>
                  <div class="meta">
                    <a>{item.field}</a>
                  </div>
                  <div class="description"> onApproved: {item.onApproved.toString()}</div>
                </div>
                {/* <div class="extra content">
                  <div class="ui two buttons">
                    <div
                      class="ui basic green button"
                      // onClick={(e) => history.push(`/indivcourseinstructor/${item.id}/students`)}
                    >
                      My Students
                    </div>
                    <div onClick={(e) => history.push(`/editlongcourse/${item.id}`)} class="ui basic red button">
                      Modify
                    </div>
                  </div>
                </div> */}
              </div>
            );
          })}
        </div>
      </div>
      <div className="ui raised segment">
        <h2 class="ui header" style={{ display: "flex", justifyContent: "center", textDecoration: "underline" }}>
          Articles
        </h2>
        <div className="ui link cards m-5">
          <table className="ui celled table">
            <thead>
              <tr>
                <th></th>
                <th>Title</th>
                <th>Time posted</th>
                <th>onApproved</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((item) => {
                var bg = "white";
                if (!item.onApproved) {
                  bg = "rgb(255, 109, 109";
                }
                return (
                  <tr
                    // onClick={(e) => history.push(`?menu=bwengearticles&id=${item.id}`)}
                    style={{ cursor: "pointer", backgroundColor: bg }}
                  >
                    <th>{counter++}</th>
                    <th>{item.title}</th>
                    <th>{new Date(item.dateOfSubmission).toString()}</th>
                    <th>{item.onApproved.toString()}</th>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InstructorPage;
