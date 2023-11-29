import React from "react";
import { useParams } from "react-router-dom";
import { useIndivMoocAllExams } from "../../hooks/useIndivMooc";
import SingleExam from "./components/SingleExam";
import history from "../../../../../Redux/actions/history";
import { useIndivSpocallExams } from "../../hooks/useIndivSpoc";

const Exams = () => {
  const { id } = useParams();
  const { loading, error, data } = useIndivSpocallExams(id);
  const queryParams = new URLSearchParams(window.location.search);
  const assignm = queryParams.get("exam");
  console.log({ loading, error, data });
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
  if (assignm) {
    return <SingleExam />;
  }
  const results = data.getSpoc;
  var cntexam = 0;
  return (
    <div>
      <table className="ui celled table">
        <thead>
          <tr>
            <th></th>
            <th>Exam</th>
            <th>Done Users</th>
          </tr>
        </thead>
        <tbody>
          {results.chapters.map((chap) => {
            return chap.exam.map((exam) => {
              cntexam++;
              return (
                <tr style={{ cursor: "pointer" }} onClick={(e) => history.push(`?exam=${exam.title}`)}>
                  <th>{cntexam}</th>
                  <th>{exam.title}</th>
                  <th></th>
                </tr>
              );
            });
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Exams;
