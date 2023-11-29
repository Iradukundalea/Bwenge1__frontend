import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCourses, selectCourse } from "../../../../Redux/actions/index";
import Search from "../../Home components/Search";
import { useSearchParams } from "react-router-dom";
import PrivateButton from "../../../routing/PrivateButton";
import "../styles/courses.css";
import history from "../../../../Redux/actions/history";

//components
import FilterCourse from "./Components/FilterCourse";
const Courses = () => {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.courses);
  const [selectedDep, setSelectedDep] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  searchParams.get("field");

  useEffect(() => {
    dispatch(getCourses());
  }, []);
  const getCourse = (course) => {
    console.log(course);
    dispatch(selectCourse(course));
    history.push("/course");
  };
  const renderCourses = courses.map((item) => {
    if (searchParams.get("field")) {
      if (item.field === searchParams.get("field")) {
        if (selectedDep !== 0) {
          if (selectedDep.includes(item.department))
            return (
              <tr onClick={(e) => getCourse(item)} style={{ cursor: "pointer" }}>
                <td data-label="Title">{item.title}</td>
                <td data-label="Instructor">{item.instructor}</td>
                <td data-label="Department">{item.department}</td>
              </tr>
            );
        } else {
          return (
            <tr onClick={(e) => getCourse(item)} style={{ cursor: "pointer" }}>
              <td data-label="Title">{item.title}</td>
              <td data-label="Instructor">{item.instructor}</td>
              <td data-label="Department">{item.department}</td>
            </tr>
          );
        }
      }
    } else if (selectedDep.length !== 0) {
      if (selectedDep.includes(item.department))
        return (
          <tr onClick={(e) => getCourse(item)} style={{ cursor: "pointer" }}>
            <td data-label="Title">{item.title}</td>
            <td data-label="Instructor">{item.instructor}</td>
            <td data-label="Department">{item.department}</td>
          </tr>
        );
    } else {
      return (
        <tr onClick={(e) => getCourse(item)} style={{ cursor: "pointer" }}>
          <td data-label="Title">{item.title}</td>
          <td data-label="Instructor">{item.instructor}</td>
          <td data-label="Department">{item.department}</td>
        </tr>
      );
    }
  });
  return (
    <div className="ui container">
      <Search />
      <FilterCourse courses={courses} Field={searchParams.get("field")} selectedDep={selectedDep} setSelectedDep={setSelectedDep} />
      <PrivateButton>
        <button onClick={(e) => history.push("/createcourse")} class="ui primary button" style={{ float: "right", marginRight: "40px" }}>
          Create Course
        </button>
      </PrivateButton>
      <table className="ui celled table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Instructor</th>
            <th>Department</th>
          </tr>
        </thead>
        <tbody>{renderCourses}</tbody>
      </table>
    </div>
  );
};

export default Courses;
