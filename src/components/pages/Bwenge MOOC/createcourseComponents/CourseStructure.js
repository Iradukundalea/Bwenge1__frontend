import React, { useState } from "react";
//import { setErrors } from "./../common/setErrors";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useInstitutionInstructors } from "../../Institution/hooks/useInstitutionUserHooks";
import Modal from "../../../Modal";
import _ from "lodash";
import BwengeLoading from "../../../BwengeLoading";

const CourseStructure = (props) => {
  const [instructor, setInstructor] = useState("");
  const [objective, setObjective] = useState("");
  const [requirement, setRequirement] = useState("");
  const [addInstructorModal, setAddInstructorModal] = useState(false);

  const { data, loading, error } = useInstitutionInstructors(localStorage.getItem("institution"));
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
  const Institutioninstructors = data.getInstitutionInstructors;
  const AssistantInstructors = [];
  for (let i = 1; i < props.MoocCourse.instructors.length; i++) {
    AssistantInstructors.push(props.MoocCourse.instructors[i]);
  }
  const addInstructorContent = () => {
    return (
      <React.Fragment>
        <h3>Assistant Instructors</h3>
        {AssistantInstructors.length === 0 ? (
          <h4>No Assistant Instructor</h4>
        ) : (
          <table className="ui celled table">
            <thead>
              <tr>
                <th></th>

                <th>firstName</th>
                <th>lastName</th>
              </tr>
            </thead>
            <tbody>
              {AssistantInstructors.map((item) => (
                <tr>
                  <th></th>

                  <th>{item.firstName}</th>
                  <th>{item.lastName}</th>
                  <th>{item.email}</th>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <div class="ui horizontal divider">All Instructors</div>
        <table className="ui celled table">
          <thead>
            <tr>
              <th></th>
              <th>Prefix</th>
              <th>firstName</th>
              <th>lastName</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {Institutioninstructors.map((item) => {
              const thisInstct = {
                prefix: item.prefix,
                firstName: item.firstName,
                lastName: item.lastName,
              };

              const onItemisInstructor = _.findIndex(props.MoocCourse.instructors, function (o) {
                return o.firstName === item.firstName && o.lastName === item.lastName;
              });

              if (onItemisInstructor === -1)
                return (
                  <tr>
                    <th></th>
                    <th>{item.prefix}</th>
                    <th>{item.firstName}</th>
                    <th>{item.lastName}</th>
                    <th>
                      <button
                        onClick={(e) => {
                          let theinstcts = props.MoocCourse.instructors;
                          theinstcts.push({
                            InstructorId: item.id,
                            prefix: item.prefix,
                            firstName: item.firstName,
                            lastName: item.lastName,
                          });
                          props.setMoocCourse({
                            ...props.MoocCourse,
                            instructors: theinstcts,
                          });
                        }}
                        class="ui secondary button"
                      >
                        Add
                      </button>
                    </th>
                  </tr>
                );
            })}
          </tbody>
        </table>
      </React.Fragment>
    );
  };
  return (
    <div className="courseStructure ui segment">
      <div class="ui form">
        <div class="field">
          <label>Course Instructors</label>

          <div className="postInfo instructors">
            {props.MoocCourse.instructors.map((instructor) => {
              return (
                <div className="mapItems">
                  <span>
                    <i className="user circle icon"></i>
                    {instructor.firstName + " " + instructor.lastName}
                  </span>
                  {instructor.firstName !== localStorage.getItem("userfirstName") && instructor.lastName !== localStorage.getItem("userlastName") && (
                    <i
                      className="close icon"
                      onClick={(e) => {
                        var { instructors } = props.MoocCourse;
                        instructors = instructors.filter((item) => item !== instructor);
                        props.setMoocCourse({
                          ...props.MoocCourse,
                          instructors: instructors,
                        });
                      }}
                    ></i>
                  )}
                </div>
              );
            })}
          </div>
          <button
            onClick={(e) => {
              setAddInstructorModal(true);
              //   if (instructor!==="") {
              //     const { instructors } = props.MoocCourse;
              //     instructors.push(instructor);
              //     props.setMoocCourse({
              //       ...props.MoocCourse,
              //       instructors: instructors,
              //     });
              //     setInstructor("");
              //   }
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
          <input type="text" value={objective} onChange={(e) => setObjective(e.target.value)} />
          <div className="postInfo instructors">
            {props.MoocCourse.objectives.map((objective) => {
              return (
                <div className="mapItemsObj">
                  <span>{objective}</span>
                  <i
                    className="close icon"
                    onClick={(e) => {
                      var { objectives } = props.MoocCourse;
                      objectives = objectives.filter((item) => item !== objective);
                      props.setMoocCourse({
                        ...props.MoocCourse,
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
                const { objectives } = props.MoocCourse;
                objectives.push(objective);
                props.setMoocCourse({
                  ...props.MoocCourse,
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
            {props.MoocCourse.requirements.map((requirement) => {
              return (
                <div className="mapItemsObj">
                  <span>{requirement}</span>
                  <i
                    className="close icon"
                    onClick={(e) => {
                      var { requirements } = props.MoocCourse;
                      requirements = requirements.filter((item) => item !== requirement);
                      props.setMoocCourse({
                        ...props.MoocCourse,
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
                const { requirements } = props.MoocCourse;
                requirements.push(requirement);
                props.setMoocCourse({
                  ...props.MoocCourse,
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
            data={props.MoocCourse.description}
            onChange={(event, editor) => {
              const data = editor.getData();
              props.setMoocCourse({ ...props.MoocCourse, description: data });
            }}
          />
        </div>
        <div class="field form-group">
          <label>Grading criteria</label>
          <CKEditor
            editor={ClassicEditor}
            data={props.MoocCourse.gradingCriteria}
            onChange={(event, editor) => {
              const data = editor.getData();
              props.setMoocCourse({
                ...props.MoocCourse,
                gradingCriteria: data,
              });
            }}
          />
        </div>
        <div class="field">
          <label>Course Field</label>
          <input
            type="text"
            value={props.MoocCourse.field}
            onChange={(e) =>
              props.setMoocCourse({
                ...props.MoocCourse,
                field: e.target.value,
              })
            }
          />
        </div>
        <div class="field">
          <label>Course Department</label>
          <input
            type="text"
            value={props.MoocCourse.department}
            onChange={(e) =>
              props.setMoocCourse({
                ...props.MoocCourse,
                department: e.target.value,
              })
            }
          />
        </div>
        <div class="field">
          <label>University</label>
          <input
            type="text"
            value={props.MoocCourse.university}
            // onChange={(e) =>
            //   props.setMoocCourse({
            //     ...props.MoocCourse,
            //     university: e.target.value,
            //   })
            // }
          />
        </div>

        <div className="field">
          <label>Language:</label>
          <div>
            <select
              value={props.MoocCourse.language}
              onChange={(e) =>
                props.setMoocCourse({
                  ...props.MoocCourse,
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
      {addInstructorModal && (
        <Modal title="Add Assistant Instructors" onDismiss={(e) => setAddInstructorModal(false)} content={addInstructorContent()} />
      )}
    </div>
  );
};

export default CourseStructure;
