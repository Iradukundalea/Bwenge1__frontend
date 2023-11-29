import React, { useState, useEffect } from "react";
import userCourses from "../../../../Redux/reducers/userCourses";
import QuizProblem from "./QuizTime components/QuizProblem";
import { useSelector } from "react-redux";
import QuizTimer2 from "./QuizTime components/QuizTimer2";
import axios from "axios";
import thekomp from "../../../../thekomp";
import { useParams } from "react-router-dom";
import _ from "lodash";
import QuizResult from "./QuizResult";
const QuizTime = ({ quiz, unfinishedQuizData }) => {
  console.log(unfinishedQuizData);
  const API = thekomp;
  const { id } = useParams();
  const queryParams = new URLSearchParams(window.location.search);
  const [selectedProb, setSelectedProb] = useState(unfinishedQuizData.assignment[0]);
  const [userQuizSet, setUserQuizSet] = useState(unfinishedQuizData.assignment);
  const thotime = quiz.estimatedDuration * 60;
  const [renderRes, setRenderRes] = useState(false);
  console.log(selectedProb);
  console.log(userQuizSet);

  const startTime = new Date();
  const [quizResult, setQuizResult] = useState({
    score: 0,
    correctedqstns: 0,
  });
  useEffect(() => {
    var userReponses = [...userQuizSet];

    for (var i = 0; i < userReponses.length; i++) {
      if (userReponses[i].questions === selectedProb.questions) {
        userReponses[i] = selectedProb;
      }
    }
    setUserQuizSet([...userReponses]);
    console.log(userReponses);
    // let assignment = {
    //   AssignmentId: quiz.id,
    //   AssignmentTitle: quiz.title,
    //   userProblemsAnswers: userReponses,
    // };

    unfinishedQuizData.assignment = userReponses;
    localStorage.setItem("userTask", JSON.stringify(unfinishedQuizData));

    // var formData = new FormData();

    // formData.append("AssignmentId", quiz.id);
    // formData.append("assignment", JSON.stringify(assignment));

    // let url = `${API}/articlequizTime/updateuserquizinfo/${localStorage.getItem("userId")}/${id}`;
    // const config = {
    //   method: "patch",
    //   url: url,
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   data: formData,
    // };
    // axios(config)
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((error) => {
    //     console.log(error.response.data.message);
    //   });
  }, [selectedProb]);
  const postUserResults = (score) => {
    // var formData = new FormData();
    // formData.append("AssignmentId", quiz.id);
    // formData.append("startTime", startTime);
    // formData.append("Userscore", score);
    // console.log(userQuizSet);
    // var userReponses = userQuizSet;
    // formData.append("userProblemsAnswers", JSON.stringify(userReponses));
    // var url;
    // if (quiz.title.substr(quiz.title.length - 6, 4) === "Exam") {
    //   url = `${API}/enroll/postexamresult/${localStorage.getItem("userId")}/${id}`;
    // } else if (quiz.title.substr(quiz.title.length - 6, 4) === "Quiz") {
    //   url = `${API}/enroll/postquizresult/${localStorage.getItem("userId")}/${id}`;
    // } else {
    //   url = `${API}/enroll/postassignmentresult/${localStorage.getItem("userId")}/${id}`;
    // }
    // const config = {
    //   method: "patch",
    //   url: url,
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   data: formData,
    // };
    // axios(config)
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((error) => {
    //     console.log(error.response.data.message);
    //   });
    // const formData2 = new FormData();
    // formData2.append("AssignmentId", quiz.id);
    // url = `${thekomp}/quizTime/endquiztime/${localStorage.getItem("userId")}/${id}`;
    // const config2 = {
    //   method: "delete",
    //   url: url,
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   data: formData2,
    // };
    // axios(config2)
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((error) => {
    //     console.log(error.response.data.message);
    //   });
  };
  const setUserAnswerHandler = (answer, probleo) => {
    var thosel = selectedProb;

    for (var i = 0; i < thosel.questions.length; i++) {
      if (thosel.questions[i].problem == probleo.problem) {
        if (thosel.questions[i].Useranswer.includes(answer)) {
          thosel.questions[i].Useranswer = thosel.questions[i].Useranswer.filter((ith) => ith != answer);
        } else thosel.questions[i].Useranswer = [...thosel.questions[i].Useranswer, answer];
        break;
      }
    }
    setSelectedProb({ ...thosel });
  };
  const updateUserAnswerFiles = () => {
    var userReponses = [...userQuizSet];

    for (var i = 0; i < userReponses.length; i++) {
      if (userReponses[i].problem.questionQ === selectedProb.problem.questionQ) {
        userReponses[i].studentTeacherFiles = selectedProb.studentTeacherFiles;
        if (!userReponses[i].studentTeacherFiles) {
          userReponses[i].studentTeacherFiles = [];
        }
      }
    }
    setUserQuizSet(userReponses);
    console.log(userQuizSet);
  };

  const finishQuizHandler = () => {
    var xscore = 0,
      correctedq = 0;
    var usertask = userQuizSet;
    for (var i = 0; i < userQuizSet.length; i++) {
      for (var j = 0; j < userQuizSet[i].questions.length; j++) {
        if (userQuizSet[i].questions[j].problem.type !== "Long Answer") {
          for (let l = 0; l < userQuizSet[i].questions[j].problem.questionInstruction.length; l++) {
            var thoans = "";

            for (let m = 0; m < userQuizSet[i].questions[j].problem.questionInstruction[l].length; m++) {
              let code = userQuizSet[i].questions[j].problem.questionInstruction[l].charCodeAt(m) - 5;
              thoans += String.fromCharCode(code);
            }
            if (userQuizSet[i].questions[j].Useranswer.includes(thoans)) {
              console.log(`thoans=${thoans}`);
              xscore += userQuizSet[i].questions[j].problem.score;
              usertask[i].questions[j].score = userQuizSet[i].questions[j].problem.score;
              correctedq++;
            } else {
              usertask[i].questions[j].score = 0;
              correctedq++;
            }

            // thoans = [...thoans, (thoans[l] = String.fromCharCode(code))];
          }
        }
      }
    }
    setUserQuizSet(usertask);
    setQuizResult({ score: xscore, correctedqstns: correctedq });
    console.log(usertask);
    localStorage.removeItem("userTask");
    // postUserResults(xscore);
  };

  const renderQuizNumbers = () => {
    var cntqsts = 0;

    return userQuizSet.map((item) => {
      cntqsts++;
      var color = {
        backgroundColor: "white",
      };
      if (selectedProb === item) {
        color = {
          backgroundColor: "rgb(114, 114, 114)",
          border: "2px solid black",
        };
      }
      // var insideAnswers = userQuizSet.find((x) => x.problem === item);
      // if (insideAnswers && insideAnswers.Useranswer) {
      //   color = {
      //     backgroundColor: "green",
      //   };
      // } else if (selectedProb.problem === item) {
      //   color = {
      //     backgroundColor: "rgb(114, 114, 114)",
      //     border: "2px solid black",
      //   };
      // }
      return (
        <div
          onClick={(e) => {
            var userReponses = userQuizSet;
            for (var i = 0; i < userReponses.length; i++) {
              if (userReponses[i] === item) {
                setSelectedProb(item);
                break;
              }
            }
          }}
          class="numberProb"
          style={color}
        >
          {cntqsts}
        </div>
      );
    });
  };
  return (
    <div>
      {renderRes === false ? (
        <div>
          <div>
            {/* {quizTime} */}
            <QuizTimer2 StartTime={unfinishedQuizData.startTime} thotime={thotime} renderRes={renderRes} setRenderRes={setRenderRes} />
          </div>
          <div class="ui raised segment problemsnumbered">{renderQuizNumbers()}</div>
          <div>
            <QuizProblem
              selectedProb={selectedProb}
              setSelectedProb={setSelectedProb}
              setUserAnswerHandler={setUserAnswerHandler}
              updateUserAnswerFiles={updateUserAnswerFiles}
            />
          </div>
          <div className="ui segment">
            <button
              onClick={(e) => {
                finishQuizHandler();
                // clearTimeout(timerId);
                setRenderRes(true);
              }}
              className="ui positive button"
            >
              Submit
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="ui segment">
            Score: {quizResult.score}/{quiz.maximumScore}
          </div>
          {/* <div>Corrected Questions: {quizResult.correctedqstns}</div>
          <div>Uncorrected Questions: {quiz.problems.length - quizResult.correctedqstns}</div> */}
          <div>
            <QuizResult lastAttempt={userQuizSet} />
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizTime;
