import React, { useState } from "react";
import history from "../../../../Redux/actions/history";
import axios from "axios";
import "./styles/QuizTime.css";
import { useSelector } from "react-redux";
import QuizTime from "./QuizTime";
import { useNavigate } from "react-router-dom";
import { userParams } from "react-router-dom";
import { useIndivMoocExam } from "../hooks/useIndivMooc";
import { useUserQuizData } from "./quiz hooks/useUserQuizInfo";
import QuizTime2 from "./QuizTime2";
import thekomp from "./../../../../thekomp";
import { useBwengeCourseExam } from "./quiz hooks/useBwengelongCourses";
import BwengeQuizTime2 from "./BwengeQuizTime2";
import BwengeQuizTime from "./BwengeQuizTime";

const BwengeExamPackage = () => {
  //   const [quizPackage, setQuizPackage] = useState("instructions");
  const API = thekomp;
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
  let quizPackage = "instructions";
  const [lawchecked, setLawChecked] = useState(false);
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(window.location.search);

  const courseId = queryParams.get("courseId");
  const assignmentId = queryParams.get("assignId");

  const { data, loading, error } = useBwengeCourseExam(courseId, assignmentId);
  const { data1, loading1, error1 } = useUserQuizData(localStorage.getItem("userId"), courseId, assignmentId);
  //   console.log({ data, loading, error });
  console.log({ data, loading, error });
  if (loading || loading1) {
    return (
      <div class="ui segment">
        <div class="ui active inverted dimmer">
          <div class="ui text loader">Loading</div>
        </div>
        <p></p>
      </div>
    );
  }
  if (error || error1) {
    console.log(error);
    return <h2>{error.Error}</h2>;
  }
  const quiz = data.getExam;
  let unfinishedQuizData = data1.getUserQuizData;
  if (unfinishedQuizData) unfinishedQuizData = omitDeep(data1.getUserQuizData, "__typename");
  console.log(unfinishedQuizData);
  if (unfinishedQuizData) quizPackage = "QuizTime";

  console.log(quiz);
  var checker = lawchecked ? "positive" : "disabled";

  const onStartquiz = () => {
    var formData = new FormData();

    formData.append("QuizDuration", quiz.estimatedDuration * 60);
    formData.append("StartTime", Math.floor(Date.now() / 1000));
    formData.append("AssignmentId", quiz.id);
    // formData.append("assignment", JSON.stringify(assignment));
    let url = `${API}/quizTime/startquizinfo/${localStorage.getItem("userId")}/${courseId}`;
    const config = {
      method: "post",
      url: url,
      headers: {
        "Content-Type": "application/json",
      },
      data: formData,
    };
    axios(config)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
    quizPackage = "QuizTime";
    window.location.reload(false);
  };

  const renderQuizPackage = () => {
    switch (quizPackage) {
      case "instructions":
        return (
          <div>
            <button
              onClick={(e) => {
                navigate(-1);
              }}
              className="ui negative button"
            >
              Back to course
            </button>

            <div>
              <span>{quiz.title}</span>
            </div>
            <div>
              <input
                type="checkbox"
                id="lawCheck"
                onClick={(e) => {
                  setLawChecked(!lawchecked);
                }}
              />
              <label>Subject to the Terms of Academic Integrity, I pledge that my answers to the quizzes will be my own work.</label>
            </div>
            <button
              onClick={(e) => {
                onStartquiz();
              }}
              className={`ui ${checker} button`}
            >
              Start Quiz
            </button>
          </div>
        );
      case "QuizTime":
        if (unfinishedQuizData) {
          if (unfinishedQuizData.assignment) return <BwengeQuizTime2 unfinishedQuizData={unfinishedQuizData} quiz={quiz} />;
        }
        return <BwengeQuizTime quiz={quiz} />;
    }
  };
  return <div className="quizTimeBody">{renderQuizPackage()}</div>;
};

export default BwengeExamPackage;
