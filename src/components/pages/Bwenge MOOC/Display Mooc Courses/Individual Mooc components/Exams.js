import React, { useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import "./styles/assignment.css";
import { useDispatch } from "react-redux";
import history from "../../../../../Redux/actions/history";
import { selectQuiz, selectQuizResults } from "../../../../../Redux/actions";
import _ from "lodash";
import { useLocation } from "react-router-dom";

const Exams = ({ chapters, courseUserData, courseId }) => {
  const [selectedExams, setSelectedExams] = useState([]);
  const dispatch = useDispatch();
  const location = useLocation();

  console.log(courseUserData);
  const getMarkedCompleted = (assignment) => {
    for (let i = 0; i < assignment.UserProblemsAnswers.length; i++) {
      console.log(assignment.UserProblemsAnswers[i]);
      if (assignment.UserProblemsAnswers[i].score === -1) return false;
    }
    return true;
  };
  const renderExam = (exam) => {
    console.log(exam);
    const userLastAttemps = courseUserData.filter((x) => x.AssignmentTitle === exam.title);
    var cntqz = 0;
    return (
      <div>
        <div>
          <span>Number Of problems: {exam.problems.length}</span>
        </div>

        <div>
          <span>Duration: {exam.estimatedDuration}</span>
        </div>

        <div>
          <span>Maximum Score: {exam.maximumScore}</span>
        </div>
        {userLastAttemps && (
          <div>
            <table className="ui celled table">
              <thead>
                <tr>
                  <th></th>
                  <th>Time Done</th>
                  <th>on MarkingComplete</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {userLastAttemps.map((attempt) => {
                  console.log(attempt);

                  let bg = "black";
                  if (attempt && getMarkedCompleted(attempt) === false) {
                    console.log("here");
                    bg = "red";
                  }
                  cntqz++;
                  return (
                    <tr
                      style={{ cursor: "pointer" }}
                      onClick={(e) => {
                        // dispatch(selectQuizResults(attempt));

                        history.push(`/examresult?courseId=${courseId}&exam=${exam.title}`);
                      }}
                    >
                      <th>{cntqz}</th>
                      <th>
                        {attempt.startTime.substr(0, 10)} {attempt.startTime.substr(12, 4)}
                      </th>
                      {attempt && <th style={{ color: `${bg}` }}>{getMarkedCompleted(attempt) ? "Complete" : "Incomplete"}</th>}

                      <th>
                        {attempt.Userscore}/{exam.maximumScore}
                      </th>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  };
  const renderExams = chapters.map((chap) => {
    return chap.exam.map((exam) => {
      const userLastAttemps = courseUserData.filter((x) => x.AssignmentTitle === exam.title);

      return (
        <div
          className="ui raised segment quizSegment"
          onClick={(e) => {
            if (_.includes(selectedExams, exam.title)) {
              var newList = selectedExams;
              var newList = newList.filter((chap) => {
                if (chap !== exam.title) return chap;
              });
              setSelectedExams(newList);
            } else {
              setSelectedExams([...selectedExams, exam.title]);
            }
          }}
        >
          {selectedExams.includes(exam.title) ? (
            <FaAngleUp className="Quiz_dropicon" size={20} />
          ) : (
            <FaAngleDown className="Quiz_dropicon" size={20} />
          )}

          <span className="quiz_title">{exam.title}</span>

          {
            <button
              onClick={(e) => {
                // dispatch(selectQuiz(exam));
                if (userLastAttemps.length > 0) {
                  history.push(`/examresult?courseId=${courseId}&exam=${exam.title}`);
                } else {
                  if (location.pathname.includes("courselearn")) {
                    history.push(`/bwengeexam?courseId=${courseId}&assignId=${exam.id}`);
                  } else {
                    history.push(`/moocexam?courseId=${courseId}&assignId=${exam.id}`);
                  }
                }
              }}
              className="ui green button Quiz_button"
            >
              Go to Exam
            </button>
          }
          {selectedExams.includes(exam.title) && <div>{renderExam(exam)}</div>}
        </div>
      );
    });
  });
  return <div className="ui raised segment">{renderExams}</div>;
};

export default Exams;
