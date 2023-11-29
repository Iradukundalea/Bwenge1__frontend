import React, { useState } from "react";
//import { setErrors } from "./../common/setErrors";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Modal from "./../../../../Modal";
import _ from "lodash";
import "./styles/coursestructure.css";

const CourseStructure = (props) => {
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

  const [instructor, setInstructor] = useState("");
  const [objective, setObjective] = useState("");
  const [requirement, setRequirement] = useState("");
  const [selectedField, setSelectedField] = useState(fields[props.longCourse.field]);

  return (
    <div className="courseStructure ui segment">
      <div class="ui form">
        <div class="field">
          <label>Course Instructors</label>
          <input type="text" value={instructor} onChange={(e) => setInstructor(e.target.value)} />
          <div className="postInfo instructors">
            {props.longCourse.instructors.map((instructor) => {
              return (
                <div className="mapItems">
                  <span>
                    <i className="user circle icon"></i>
                    {instructor}
                  </span>
                  {instructor !== localStorage.getItem("userlastName") + " " + localStorage.getItem("userfirstName") && (
                    <i
                      className="close icon"
                      onClick={(e) => {
                        var { instructors } = props.longCourse;
                        instructors = instructors.filter((item) => item !== instructor);
                        props.setLongCourse({ ...props.longCourse, instructors: instructors });
                      }}
                    ></i>
                  )}
                </div>
              );
            })}
          </div>
          <button
            onClick={(e) => {
              if (instructor) {
                const { instructors } = props.longCourse;
                instructors.push(instructor);
                props.setLongCourse({ ...props.longCourse, instructors: instructors });
                setInstructor("");
              }
            }}
            class="ui compact icon button"
            style={{ marginTop: "5px" }}
          >
            <i class="plus icon"></i>
            Add Instructors
          </button>
        </div>

        <div class="field">
          <label>Course Objectives</label>
          <input
            type="text"
            value={objective}
            onChange={(e) => {
              setObjective(e.target.value);
            }}
          />
          <div className="postInfo instructors">
            {props.longCourse.objectives.map((objective) => {
              return (
                <div className="mapItemsObj">
                  <span>{objective}</span>
                  <i
                    className="close icon"
                    onClick={(e) => {
                      var { objectives } = props.longCourse;
                      objectives = objectives.filter((item) => item !== objective);
                      props.setLongCourse({
                        ...props.longCourse,
                        objectives: objectives,
                      });
                    }}
                  ></i>
                </div>
              );
            })}
          </div>
          <button
            onClick={(e) => {
              if (objective !== "") {
                const { objectives } = props.longCourse;
                objectives.push(objective);
                props.setLongCourse({
                  ...props.longCourse,
                  objectives: objectives,
                });
                setObjective("");
              }
            }}
            class="ui compact icon button"
            style={{ marginTop: "5px" }}
          >
            <i class="plus icon"></i>
            Add Objective
          </button>
        </div>
        <div class="field">
          <label>Course Requirements</label>
          <input type="text" value={requirement} onChange={(e) => setRequirement(e.target.value)} />
          <div className="postInfo instructors">
            {props.longCourse.requirements.map((requirement) => {
              return (
                <div className="mapItemsObj">
                  <span>{requirement}</span>
                  <i
                    className="close icon"
                    onClick={(e) => {
                      var { requirements } = props.longCourse;
                      requirements = requirements.filter((item) => item !== requirement);
                      props.setLongCourse({
                        ...props.longCourse,
                        requirements: requirements,
                      });
                    }}
                  ></i>
                </div>
              );
            })}
          </div>
          <button
            onClick={(e) => {
              if (requirement !== "") {
                const { requirements } = props.longCourse;
                requirements.push(requirement);
                props.setLongCourse({
                  ...props.longCourse,
                  requirements: requirements,
                });
                setRequirement("");
              }
            }}
            class="ui compact icon button"
            style={{ marginTop: "5px" }}
          >
            <i class="plus icon"></i>
            Add Requirement
          </button>
        </div>
        <div class="field form-group">
          <label>Course Description</label>
          <CKEditor
            editor={ClassicEditor}
            data={props.longCourse.description}
            onChange={(event, editor) => {
              const data = editor.getData();
              props.setLongCourse({ ...props.longCourse, description: data });
            }}
          />
        </div>
        <div class="field form-group">
          <label>Grading criteria</label>
          <CKEditor
            editor={ClassicEditor}
            data={props.longCourse.gradingCriteria}
            onChange={(event, editor) => {
              const data = editor.getData();
              props.setLongCourse({
                ...props.longCourse,
                gradingCriteria: data,
              });
            }}
          />
        </div>
        <div class="field">
          <label>Course Field</label>
          <div>
            <select
              value={props.longCourse.field}
              onChange={(e) => {
                var self = e.target.value;
                console.log(self);
                setSelectedField(fields[self]);
                props.setLongCourse({ ...props.longCourse, field: e.target.value, department: fields[self][0] ? fields[self][0] : "" });
              }}
            >
              {Object.keys(fields).map(function (key, index) {
                return <option className="item">{key}</option>;
              })}
            </select>
          </div>
        </div>
        {selectedField[0] && (
          <div class="field">
            <label>Course Department</label>
            <div>
              <select value={props.longCourse.department} onChange={(e) => props.setLongCourse({ ...props.longCourse, department: e.target.value })}>
                {selectedField.map((item) => {
                  return <option className="item">{item}</option>;
                })}
              </select>
            </div>
          </div>
        )}
        {/* <div class="field">
          <label>Course Level</label>
          <div>
            <select onChange={(e) => setPaper({ ...paper, level: e.target.value })}>
              <option class="item" value="High school">
                High School
              </option>
              <option class="item" value="Undergraduate">
                Undergraduate
              </option>
              <option class="item" value="Postgraduate">
                Postgraduate
              </option>
              <option class="item" value="Postgraduate">
                All Levels
              </option>
            </select>
          </div>
        </div> */}

        <div className="field">
          <label>Language:</label>
          <div>
            <select
              value={props.longCourse.language}
              onChange={(e) =>
                props.setLongCourse({
                  ...props.longCourse,
                  language: e.target.value,
                })
              }
            >
              <option class="item" value="English">
                English
              </option>
              <option class="item" value="Kinyarwanda">
                Kinyarwanda
              </option>
              <option class="item" value="French">
                French
              </option>
              <option class="item" value="Chinese">
                Mandarin Chinese
              </option>
              <option class="item" value="Swahili">
                Swahili
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseStructure;
