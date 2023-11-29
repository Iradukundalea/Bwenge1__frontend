import React, { useState, useEffect } from "react";
import userCourses from "../../../../Redux/reducers/userCourses";
import QuizProblem from "./QuizTime components/QuizProblem";
import { useSelector } from "react-redux";
import QuizTimer from "./QuizTime components/QuizTimer";
import "./styles/QuizTime.css";
import axios from "axios";
import thekomp from "../../../../thekomp";
const QuizTime = ({ quiz, unfinishedQuizData }) => {
  const API = thekomp;
  console.log(quiz.problems[0]);
  const [selectedProb, setSelectedProb] = useState({
    problem: quiz.problems[0],
    Useranswer: "",
    studentTeacherFiles: [],
    score: 0,
  });
  const [userQuizSet, setUserQuizSet] = useState([selectedProb]);
  const thotime = quiz.estimatedDuration * 60;
  const [renderRes, setRenderRes] = useState(false);
  // const selectedMooc = useSelector((state) => state.selectedMooc);
  const queryParams = new URLSearchParams(window.location.search);
  const courseId = queryParams.get("courseId");

  const startTime = new Date();
  const [quizResult, setQuizResult] = useState({
    score: 0,
    correctedqstns: 0,
  });
  console.log(selectedProb);
  useEffect(() => {
    var userReponses = [...userQuizSet];

    for (var i = 0; i < userReponses.length; i++) {
      if (userReponses[i].problem.questionQ === selectedProb.problem.questionQ) {
        userReponses[i] = selectedProb;
      }
    }
    setUserQuizSet(userReponses);
    console.log(userReponses);
    let assignment = {
      AssignmentId: quiz.id,
      AssignmentTitle: quiz.title,
      UserProblemsAnswers: userReponses,
    };
    var testtype;

    if (quiz.title.substr(quiz.title.length - 6, 4) === "Exam") {
      testtype = "exams";
    } else if (quiz.title.substr(quiz.title.length - 6, 4) === "Quiz") {
      testtype = "quizes";
    } else {
      testtype = "assignments";
    }
    var formData = new FormData();
    formData.append("testType", testtype);
    formData.append("courseTitle", localStorage.getItem("courseTitle"));
    formData.append("AssignmentTitle", quiz.title);

    formData.append("AssignmentId", quiz.id);
    formData.append("assignment", JSON.stringify(assignment));
    for (var i = 0; i < userReponses.length; i++) {
      for (var j = 0; userReponses[i].studentTeacherFiles && j < userReponses[i].studentTeacherFiles.length; j++) {
        if (userReponses[i].studentTeacherFiles[j].fileloc && userReponses[i].studentTeacherFiles[j].fileloc.type) {
          console.log("here");
          formData.append("Answersfiles", userReponses[i].studentTeacherFiles[j].fileloc);
        }
      }
    }
    let url = `${API}/quizTime/updateuserquizinfo/${localStorage.getItem("userId")}/${courseId}`;
    const config = {
      method: "patch",
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
  }, [selectedProb]);

  const postUserResults = (score) => {
    var formData = new FormData();
    formData.append("AssignmentId", quiz.id);
    formData.append("AssignmentTitle", quiz.title);
    formData.append("courseTitle", localStorage.getItem("courseTitle"));
    formData.append("startTime", startTime);
    formData.append("Userscore", score);
    console.log(userQuizSet);

    var userReponses = userQuizSet;
    for (var i = 0; i < userReponses.length; i++) {
      for (var j = 0; userReponses[i].studentTeacherFiles && j < userReponses[i].studentTeacherFiles.length; j++) {
        if (userReponses[i].studentTeacherFiles[j].fileloc && userReponses[i].studentTeacherFiles[j].fileloc.type) {
          console.log("here");
          // formData.append("Answersfiles", userQuizSet[i].studentTeacherFiles[j].fileloc);
          userReponses[i].studentTeacherFiles[j].fileloc = `Mooccourses\\${localStorage.getItem("courseTitle")}\\Students\\${localStorage.getItem(
            "userId"
          )}\\exams\\${quiz.title}\\${userReponses[i].studentTeacherFiles[j].fileloc.name}`;
        }
      }
    }
    formData.append("UserProblemsAnswers", JSON.stringify(userReponses));
    var url;
    if (quiz.title.substr(quiz.title.length - 6, 4) === "Exam") {
      url = `${API}/enroll/postexamresult/${localStorage.getItem("userId")}/${courseId}`;
    } else if (quiz.title.substr(quiz.title.length - 6, 4) === "Quiz") {
      url = `${API}/enroll/postquizresult/${localStorage.getItem("userId")}/${courseId}`;
    } else {
      url = `${API}/enroll/postassignmentresult/${localStorage.getItem("userId")}/${courseId}`;
    }
    const config = {
      method: "patch",
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
    const formData2 = new FormData();
    formData2.append("AssignmentId", quiz.id);
    url = `${thekomp}/quizTime/endquiztime/${localStorage.getItem("userId")}/${courseId}`;
    const config2 = {
      method: "delete",
      url: url,
      headers: {
        "Content-Type": "application/json",
      },
      data: formData2,
    };
    axios(config2)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };
  const setUserAnswerHandler = (answer) => {
    setSelectedProb({ ...selectedProb, Useranswer: answer });
    // var userReponses = [...userQuizSet];
    // console.log(selectedProb);

    // for (var i = 0; i < userReponses.length; i++) {
    //   if (userReponses[i].problem.questionQ === selectedProb.problem.questionQ) {
    //     userReponses[i].Useranswer = answer;
    //     console.log(answer);
    //   }
    // }
    // console.log(userReponses);
    // setUserQuizSet(userReponses);
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
    for (var i = 0; i < userQuizSet.length; i++) {
      if (userQuizSet[i].problem.type !== "Long Answer") {
        if (userQuizSet[i].problem.correctAnswer === userQuizSet[i].Useranswer) {
          xscore += userQuizSet[i].problem.score;
          userQuizSet[i].score = userQuizSet[i].problem.score;
          correctedq++;
        } else {
          userQuizSet[i].score = 0;
          correctedq++;
        }
      }
      if (userQuizSet[i].problem.type === "Long Answer") {
        userQuizSet[i].score = -1;
      }
    }
    setQuizResult({ score: xscore, correctedqstns: correctedq });
    postUserResults(xscore);
  };

  const renderQuizNumbers = () => {
    var cntqsts = 0;

    return quiz.problems.map((item) => {
      cntqsts++;
      var color = {
        backgroundColor: "white",
      };
      var insideAnswers = userQuizSet.find((x) => x.problem === item);
      if (insideAnswers && insideAnswers.Useranswer) {
        color = {
          backgroundColor: "green",
        };
      } else if (selectedProb.problem === item) {
        color = {
          backgroundColor: "rgb(114, 114, 114)",
          border: "2px solid black",
        };
      }
      return (
        <div
          onClick={(e) => {
            if (!userQuizSet.find((x) => x.problem === item)) {
              setUserQuizSet([...userQuizSet, { problem: item, Useranswer: "", studentTeacherFiles: [], score: 0 }]);
              setSelectedProb({ problem: item, Useranswer: "", score: 0, studentTeacherFiles: [] });
            } else {
              var userReponses = userQuizSet;
              console.log(userReponses);
              for (var i = 0; i < userReponses.length; i++) {
                if (userReponses[i].problem === item) {
                  setSelectedProb({
                    problem: item,
                    Useranswer: userReponses[i].Useranswer,
                    score: 0,
                    studentTeacherFiles: userReponses[i].studentTeacherFiles,
                  });
                  break;
                }
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
            <QuizTimer thotime={thotime} renderRes={renderRes} setRenderRes={setRenderRes} />
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
          <div style={{ position: "absolute", right: "5px", bottom: "5px" }}>
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
          <div>Score: {quizResult.score}</div>
          <div>Corrected Questions: {quizResult.correctedqstns}</div>
          <div>Uncorrected Questions: {quiz.problems.length - quizResult.correctedqstns}</div>
        </div>
      )}
    </div>
  );
};

export default QuizTime;
