import React from "react";
import { useGetAllShortCourses } from "../../BwengeCourses/hooks.js/useshortcourses";
import ShortCourseCheck from "./Bwenge Courses Components/ShortCourseCheck";
import history from "../../../../Redux/actions/history";
import { useAllBwengeLongCourses } from "../../BwengeCourses/hooks.js/uselongcourses";
import LongCourseCheck from "./Bwenge Courses Components/LongCourseCheck";

const BwengeCourses = () => {
  const { loading1, data1, error1 } = useGetAllShortCourses();
  const { loading, data, error } = useAllBwengeLongCourses();
  const queryParams = new URLSearchParams(window.location.search);
  const courseType = queryParams.get("type");
  if (courseType == "shortcourse") {
    return <ShortCourseCheck />;
  }
  if (courseType == "longcourse") {
    return <LongCourseCheck />;
  }
  if (loading1 || loading) {
    return (
      <div class="ui segment">
        <div class="ui active inverted dimmer">
          <div class="ui text loader">Loading1</div>
        </div>
        <p></p>
      </div>
    );
  }
  if (error1 || error) {
    console.log(error1);
    return <h2>{error1.Error1}</h2>;
  }
  const shortcourses = data1.getAllShortCourses;
  const longCourses = data.getAllLongCourses;
  const renderLongCourses = () => {
    return (
      <div>
        <div style={{ fontWeight: "bold", textDecoration: "underline", fontSize: "1.5rem" }}>Long Courses</div>
        <table className="ui celled table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Instructor</th>
              <th>Field</th>
              <th>Submission Date</th>
              <th>onApproved</th>
            </tr>
          </thead>
          <tbody>
            {longCourses.map((item) => {
              var bg = "white";
              if (!item.onApproved) {
                bg = "rgb(255, 109, 109";
              }
              return (
                <tr
                  onClick={(e) => history.push(`?menu=bwengecourses&type=longcourse&id=${item.id}`)}
                  style={{ cursor: "pointer", backgroundColor: bg }}
                >
                  <td>{item.title}</td>
                  <td>
                    {item.instructors.map((author) => (
                      <p>{author}; </p>
                    ))}
                  </td>
                  <td>{item.field}</td>
                  <td>{item.lastUpdated.substr(0, 10)}</td>
                  <td>{item.onApproved.toString()}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };
  const renderShortCourses = () => {
    return (
      <div>
        <div style={{ fontWeight: "bold", textDecoration: "underline", fontSize: "1.5rem" }}>Short Courses</div>
        <table className="ui celled table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Instructor</th>
              <th>Field</th>
              <th>Submission Date</th>
              <th>onApproved</th>
            </tr>
          </thead>
          <tbody>
            {shortcourses.map((item) => {
              var bg = "white";
              if (!item.onApproved) {
                bg = "rgb(255, 109, 109";
              }
              return (
                <tr
                  onClick={(e) => history.push(`?menu=bwengecourses&type=shortcourse&id=${item.id}`)}
                  style={{ cursor: "pointer", backgroundColor: bg }}
                >
                  <td>{item.title}</td>
                  <td>{item.instructor} </td>
                  <td>{item.field}</td>
                  <td>{item.submissionDate.substr(0, 10)}</td>
                  <td>{item.onApproved.toString()}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };
  return (
    <div className="ui segment">
      <div className="ui raised segment">{renderLongCourses()}</div>
      <div className="ui raised segment">{renderShortCourses()}</div>
    </div>
  );
};

export default BwengeCourses;
