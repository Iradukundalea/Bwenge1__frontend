import React from "react";
import history from "../../../../../../Redux/actions/history";
import { useParams } from "react-router-dom";
import { useInstructorSingleExamData } from "../../../hooks/useMoocInstructor";
import SingleExamSingleUser from "./SingleExamSingleUser";

const SingleExam = () => {
  const { id } = useParams();
  const queryParams = new URLSearchParams(window.location.search);
  const assignm = queryParams.get("exam");
  const { error, loading, data } = useInstructorSingleExamData(id, assignm);
  console.log({ error, loading, data });
  const omitDeep = (obj, key) => {
    const keys = Object.keys(obj);
    const newObj = {};
    keys.forEach((i) => {
      if (i !== key) {
        const val = obj[i];
        if (val instanceof Date) newObj[i] = val;
        else if (Array.isArray(val)) newObj[i] = omitDeepArrayWalk(val, key);
        else if (typeof val === "object" && val !== null) newObj[i] = omitDeep(val, key);
        else newObj[i] = val;
      }
    });
    return newObj;
  };

  const omitDeepArrayWalk = (arr, key) => {
    return arr.map((val) => {
      if (Array.isArray(val)) return omitDeepArrayWalk(val, key);
      else if (typeof val === "object") return omitDeep(val, key);
      return val;
    });
  };

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
  const assignmentsData = data.getInstructorExamData;
  for (let i = 0; i < assignmentsData.length; i++) {
    assignmentsData[i] = omitDeep(assignmentsData[i], "__typename");
  }
  console.log(assignmentsData);

  const userId = queryParams.get("user");
  let singleUserAssignmentData;

  if (userId) {
    singleUserAssignmentData = assignmentsData.filter((item) => item.userId === userId);
    console.log(singleUserAssignmentData);
    return <SingleExamSingleUser singleUserAssignmentData={singleUserAssignmentData} />;
  }

  const getMarkedCompleted = (assignment) => {
    for (let i = 0; i < assignment.UserProblemsAnswers.length; i++) {
      if (assignment.UserProblemsAnswers[i].score === -1) return false;
    }
    return true;
  };
  return (
    <div>
      <div>
        <table className="ui celled table">
          <thead>
            <tr>
              <th></th>
              <th>Names</th>
              <th>Student Number</th>
              <th>Email</th>
              <th>OnDone</th>
              <th>on MarkingComplete</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {assignmentsData.map((assignmt) => {
              let bg = "black";
              if (assignmt.exams[0] && getMarkedCompleted(assignmt.exams[0]) === false) {
                console.log("here");
                bg = "red";
              }
              return (
                <tr
                  onClick={(e) => {
                    if (assignmt.exams[0]) history.push(`?exam=${assignm}&user=${assignmt.userId}`);
                  }}
                >
                  <th></th>
                  <th>{assignmt.lastName + " " + assignmt.firstName}</th>
                  <th>{assignmt.studentNumber}</th>
                  <th>{assignmt.email}</th>
                  <th>{assignmt.exams[0] ? "Done" : "Not Done"}</th>
                  {assignmt.exams[0] && <th style={{ color: `${bg}` }}>{getMarkedCompleted(assignmt.exams[0]) ? "Complete" : "Incomplete"}</th>}
                  {assignmt.exams[0] && <th>{assignmt.exams[0].Userscore}</th>}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SingleExam;
