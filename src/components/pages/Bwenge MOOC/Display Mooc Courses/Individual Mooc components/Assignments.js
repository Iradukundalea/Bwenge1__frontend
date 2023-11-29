import React, { useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import "./styles/assignment.css";
import { useDispatch } from "react-redux";
import history from "../../../../../Redux/actions/history";
import { selectQuiz, selectQuizResults } from "../../../../../Redux/actions";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

import _ from "lodash";
const Assignments = ({ chapters, courseUserData, courseUserDataQ, courseId }) => {
  const [selectedQuizes, setSelectedQuizes] = useState([]);
  const dispatch = useDispatch();
  const location = useLocation();

  var cntchap = 0;
  var cntLec = 0;
  const getMarkedCompleted = (assignment) => {
    for (let i = 0; i < assignment.UserProblemsAnswers.length; i++) {
      if (assignment.UserProblemsAnswers[i].score === -1) return false;
    }
    return true;
  };
  const renderAssignment = (assign) => {
    const userLastAttemps = courseUserData.filter((x) => x.AssignmentTitle === assign.title);
    var cntqz = 0;
    return (
      <div>
        <div>
          <span>Number Of problems: {assign.problems.length}</span>
        </div>

        <div>
          <span>Duration: {assign.estimatedDuration}</span>
        </div>

        <div>
          <span>Maximum Score: {assign.maximumScore}</span>
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
                  let bg = "black";
                  if (attempt && getMarkedCompleted(attempt) === false) {
                    bg = "red";
                  }
                  cntqz++;
                  return (
                    <tr
                      style={{ cursor: "pointer" }}
                      onClick={(e) => {
                        dispatch(selectQuizResults(attempt));
                        history.push(`/assignmentresult?courseId=${courseId}&assign=${assign.title}`);
                      }}
                    >
                      <th>{cntqz}</th>
                      <th>
                        {attempt.startTime.substr(0, 10)} {attempt.startTime.substr(12, 4)}
                      </th>
                      {attempt && <th style={{ color: `${bg}` }}>{getMarkedCompleted(attempt) ? "Complete" : "Incomplete"}</th>}

                      <th>
                        {attempt.Userscore}/{assign.maximumScore}
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
  const renderQuiz = (assign) => {
    const userLastAttemps = courseUserDataQ.filter((x) => x.AssignmentTitle === assign.title);
    var cntqz = 0;
    return (
      <div>
        <div>
          <span>Number Of problems: {assign.problems.length}</span>
        </div>

        <div>
          <span>Duration: {assign.estimatedDuration}</span>
        </div>

        <div>
          <span>Maximum Score: {assign.maximumScore}</span>
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
                  let bg = "black";
                  if (attempt && getMarkedCompleted(attempt) === false) {
                    bg = "red";
                  }
                  cntqz++;
                  return (
                    <tr
                      style={{ cursor: "pointer" }}
                      onClick={(e) => {
                        dispatch(selectQuizResults(attempt));
                        history.push(`/quizresult?courseId=${courseId}&assign=${assign.title}`);
                      }}
                    >
                      <th>{cntqz}</th>
                      <th>
                        {attempt.startTime.substr(0, 10)} {attempt.startTime.substr(12, 4)}
                      </th>
                      {attempt && <th style={{ color: `${bg}` }}>{getMarkedCompleted(attempt) ? "Complete" : "Incomplete"}</th>}

                      <th>
                        {attempt.Userscore}/{assign.maximumScore}
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
  const renderAssignments = chapters.map((chap) => {
    return chap.lectures.map((lec) => {
      return lec.assignment.map((assign) => {
        return (
          <div className="ui raised segment quizSegment">
            {selectedQuizes.includes(assign.title) ? (
              <FaAngleUp
                onClick={(e) => {
                  if (_.includes(selectedQuizes, assign.title)) {
                    var newList = selectedQuizes;
                    var newList = newList.filter((chap) => {
                      if (chap !== assign.title) return chap;
                    });
                    setSelectedQuizes(newList);
                  } else {
                    setSelectedQuizes([...selectedQuizes, assign.title]);
                  }
                }}
                className="Quiz_dropicon"
                size={20}
              />
            ) : (
              <FaAngleDown
                onClick={(e) => {
                  if (_.includes(selectedQuizes, assign.title)) {
                    var newList = selectedQuizes;
                    var newList = newList.filter((chap) => {
                      if (chap !== assign.title) return chap;
                    });
                    setSelectedQuizes(newList);
                  } else {
                    setSelectedQuizes([...selectedQuizes, assign.title]);
                  }
                }}
                className="Quiz_dropicon"
                size={20}
              />
            )}

            <span
              onClick={(e) => {
                if (_.includes(selectedQuizes, assign.title)) {
                  var newList = selectedQuizes;
                  var newList = newList.filter((chap) => {
                    if (chap !== assign.title) return chap;
                  });
                  setSelectedQuizes(newList);
                } else {
                  setSelectedQuizes([...selectedQuizes, assign.title]);
                }
              }}
              className="quiz_title"
            >
              {assign.title}
            </span>

            {
              <button
                onClick={(e) => {
                  //   dispatch(selectQuiz(assign));
                  const userLastAttemps = courseUserData.filter((x) => x.AssignmentTitle === assign.title);
                  console.log(userLastAttemps.length);
                  if (userLastAttemps.length > 0) {
                    // dispatch(selectQuizResults(userLastAttemps[0]));
                    console.log(location.pathname.includes("courselearn"));
                    // history.push(`/assignmentresult?courseId=${courseId}&assign=${assign.title}`);
                  } else {
                    if (location.pathname.includes("courselearn")) {
                      history.push(`/bwengeassignment?courseId=${courseId}&assignId=${assign.id}`);
                    } else {
                      history.push(`/moocassignment?courseId=${courseId}&assignId=${assign.id}`);
                    }
                  }
                }}
                className="ui green button Quiz_button"
              >
                Go to Assignment
              </button>
            }
            {selectedQuizes.includes(assign.title) && <div>{renderAssignment(assign)}</div>}
          </div>
        );
      });
    });
  });

  const renderQuizes = chapters.map((chap) => {
    return chap.lectures.map((lec) => {
      return lec.quiz.map((quizi) => {
        console.log(quizi);
        return (
          <div className="ui raised segment quizSegment">
            {selectedQuizes.includes(quizi.title) ? (
              <FaAngleUp
                onClick={(e) => {
                  if (_.includes(selectedQuizes, quizi.title)) {
                    var newList = selectedQuizes;
                    var newList = newList.filter((chap) => {
                      if (chap !== quizi.title) return chap;
                    });
                    setSelectedQuizes(newList);
                  } else {
                    setSelectedQuizes([...selectedQuizes, quizi.title]);
                  }
                }}
                className="Quiz_dropicon"
                size={20}
              />
            ) : (
              <FaAngleDown
                onClick={(e) => {
                  if (_.includes(selectedQuizes, quizi.title)) {
                    var newList = selectedQuizes;
                    var newList = newList.filter((chap) => {
                      if (chap !== quizi.title) return chap;
                    });
                    setSelectedQuizes(newList);
                  } else {
                    setSelectedQuizes([...selectedQuizes, quizi.title]);
                  }
                }}
                className="Quiz_dropicon"
                size={20}
              />
            )}

            <span
              onClick={(e) => {
                if (_.includes(selectedQuizes, quizi.title)) {
                  var newList = selectedQuizes;
                  var newList = newList.filter((chap) => {
                    if (chap !== quizi.title) return chap;
                  });
                  setSelectedQuizes(newList);
                } else {
                  setSelectedQuizes([...selectedQuizes, quizi.title]);
                }
              }}
              className="quiz_title"
            >
              {quizi.title}
            </span>

            {
              <button
                onClick={(e) => {
                  //   dispatch(selectQuiz(quizi));
                  const userLastAttemps = courseUserDataQ.filter((x) => x.AssignmentTitle === quizi.title);
                  console.log(userLastAttemps.length);
                  if (userLastAttemps.length > 0) {
                    // dispatch(selectQuizResults(userLastAttemps[0]));
                    history.push(`/quizresult?courseId=${courseId}&assign=${quizi.title}`);
                  } else {
                    console.log(location.pathname.includes("courselearn"));
                    if (location.pathname.includes("courselearn")) {
                      history.push(`/bwengequiz?courseId=${courseId}&assignId=${quizi.id}`);
                    } else {
                      history.push(`/moocquiz?courseId=${courseId}&assignId=${quizi.id}`);
                    }
                  }
                }}
                className="ui green button Quiz_button"
              >
                Go to Quiz
              </button>
            }
            {selectedQuizes.includes(quizi.title) && <div>{renderQuiz(quizi)}</div>}
          </div>
        );
      });
    });
  });

  return (
    <div>
      <div className="ui raised segment">{renderQuizes}</div>
      <div className="ui raised segment">{renderAssignments}</div>
    </div>
  );
};

export default Assignments;
