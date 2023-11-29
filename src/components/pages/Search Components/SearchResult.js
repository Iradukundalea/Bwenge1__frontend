import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectPaper, selectCourse } from "../../../Redux/actions";
import Search from "../Home components/Search";
import "./styles/SearchResult.css";

const SearchResult = () => {
  const resultsPapers = useSelector((state) => state.searchPaperResults);
  const resultsCourses = useSelector((state) => state.searchCourseResults);

  const dispatch = useDispatch();
  console.log(resultsCourses);
  const getPaper = (paper) => {
    console.log(paper);
    dispatch(selectPaper(paper));
  };
  const [selected, setSelected] = useState("all");
  const renderResult = resultsPapers.map((item) => {
    return (
      <tr onClick={(e) => getPaper(item)} style={{ cursor: "pointer" }}>
        <td data-label="Title">{item.title}</td>
        <td data-label="Authors">
          {item.authors.map((author) => (
            <p>{author}; </p>
          ))}
        </td>
        <td data-label="Field">{item.field}</td>
        <td data-label="Publication Date">{item.PublicationDate.substr(0, 10)}</td>
      </tr>
    );
  });
  const renderResultCourse = resultsCourses.map((item) => {
    return (
      <tr onClick={(e) => dispatch(selectCourse(item))} style={{ cursor: "pointer" }}>
        <td data-label="Title">{item.title}</td>
        <td data-label="Instructor">{item.instructor}</td>
        <td data-label="Department">{item.department}</td>
      </tr>
    );
  });
  const renderSelectedResult = () => {
    if (selected === "paper") {
      return (
        <table className="ui celled table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Authors</th>
              <th>Field</th>
              <th>Publication Date</th>
            </tr>
          </thead>
          <tbody>{renderResult}</tbody>
        </table>
      );
    } else if (selected === "course") {
      return (
        <table className="ui celled table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Instructor</th>
              <th>Department</th>
            </tr>
          </thead>
          <tbody>{renderResultCourse}</tbody>
        </table>
      );
    } else if (selected === "all") {
      return (
        <div>
          <h2>Papers</h2>
          <table className="ui celled table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Authors</th>
                <th>Field</th>
                <th>Publication Date</th>
              </tr>
            </thead>
            <tbody>{renderResult}</tbody>
          </table>
          <h2>Courses</h2>
          <table className="ui celled table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Instructor</th>
                <th>Department</th>
              </tr>
            </thead>
            <tbody>{renderResultCourse}</tbody>
          </table>
        </div>
      );
    }
  };
  return (
    <div className="ui container">
      <Search />
      <div class="ui top attached menu">
        <a onClick={(e) => setSelected("all")} class={selected === "all" ? "item active" : "item"}>
          <p className="header">All</p>
          <p className="resNumb">{resultsPapers.length + resultsCourses.length}</p>
        </a>
        <a onClick={(e) => setSelected("paper")} class={selected === "paper" ? "item active" : "item"}>
          <p className="header">Papers</p>
          <p className="resNumb">{resultsPapers.length}</p>
        </a>
        <a onClick={(e) => setSelected("course")} class={selected === "course" ? "item active" : "item"}>
          <p className="header">Courses</p>
          <p className="resNumb">{resultsCourses.length}</p>
        </a>
      </div>
      {renderSelectedResult()}
    </div>
  );
};

export default SearchResult;
