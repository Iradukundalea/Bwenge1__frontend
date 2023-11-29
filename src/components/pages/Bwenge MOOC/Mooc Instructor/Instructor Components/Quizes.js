import React from "react";
import { useParams } from "react-router-dom";
import { useIndivMoocAllQuizes } from "../../hooks/useIndivMooc";
import history from "../../../../../Redux/actions/history";
import SingleQuiz from "./components/SingleQuiz";
import { useIndivSpocallquizes } from "../../hooks/useIndivSpoc";

const Assignments = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const assignm = queryParams.get("quiz");
  console.log(assignm);
  const { id } = useParams();
  const { error, loading, data } = useIndivSpocallquizes(id);
  console.log({ error, loading, data });
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
  const results = data.getSpoc;
  var cntAssgn = 0;
  if (assignm) {
    return <SingleQuiz />;
  }
  return (
    <div>
      <table className="ui celled table">
        <thead>
          <tr>
            <th></th>
            <th>Quizes</th>
            <th>Done Users</th>
          </tr>
        </thead>
        <tbody>
          {results.chapters.map((chap) => {
            return chap.lectures.map((lec) => {
              return lec.quiz.map((quiz) => {
                cntAssgn++;
                return (
                  <tr style={{ cursor: "pointer" }} onClick={(e) => history.push(`?quiz=${quiz.title}`)}>
                    <th>{cntAssgn}</th>
                    <th>{quiz.title}</th>
                    <th></th>
                  </tr>
                );
              });
            });
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Assignments;
