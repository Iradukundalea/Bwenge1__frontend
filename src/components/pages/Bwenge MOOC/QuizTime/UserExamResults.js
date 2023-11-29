import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useExamResults } from "../hooks/useUserCourses";
import QuizResultProblem from "./QuizResult components/QuizResultProblem";
import Quizresults from "./Quizresults";

const UserExamResults = (props) => {
  const queryParams = new URLSearchParams(window.location.search);

  const courseId = queryParams.get("courseId");
  const assignmentTitle = queryParams.get("exam");
  const { data, loading, error } = useExamResults(
    localStorage.getItem("userId"),
    courseId,
    assignmentTitle
  );

  console.log({ data, loading, error });
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

  const lastAttempt = data.getUserCourseExamResults.exams[0];
  if (lastAttempt) {
    return <Quizresults lastAttempt={lastAttempt} />;
  }
};

export default UserExamResults;
