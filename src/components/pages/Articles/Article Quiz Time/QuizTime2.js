import React, { useState, useEffect } from "react";
import userCourses from "../../../../Redux/reducers/userCourses";
import QuizProblem from "./QuizTime components/QuizProblem";
import { useSelector } from "react-redux";
import QuizTimer2 from "./QuizTime components/QuizTimer2";
import axios from "axios";
import thekomp from "../../../../thekomp";

const QuizTime2 = ({ quiz, unfinishedQuizData }) => {
  // if (unfinishedQuizData && unfinishedQuizData.assignment) {
  //   unfinishedQuizData = unfinishedQuizData.assignment.UserProblemsAnswers.map((item) => {
  //     if (!item.studentTeacherFiles) {
  //       item = { ...item, studentTeacherFiles: [] };
  //     }
  //     return item;
  //   });
  // }
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
  quiz = omitDeep(quiz, "__typename");
  const [selectedProb, setSelectedProb] = useState(unfinishedQuizData.assignment.UserProblemsAnswers[0]);
  console.log(unfinishedQuizData.assignment.UserProblemsAnswers);
  const [userQuizSet, setUserQuizSet] = useState(unfinishedQuizData.assignment.UserProblemsAnswers);
  const thotime = quiz.QuizDuration;
  const [renderRes, setRenderRes] = useState(false);
  // const selectedMooc = useSelector((state) => state.selectedMooc);
  const queryParams = new URLSearchParams(window.location.search);
  const courseId = queryParams.get("courseId");
  console.log(selectedProb);

  const [quizResult, setQuizResult] = useState({
    score: 0,
    correctedqstns: 0,
  });
  console.log(quiz);
  useEffect(() => {
    var userReponses = [...userQuizSet];
    for (var i = 0; i < userReponses.length; i++) {
      if (userReponses[i].problem.questionQ === selectedProb.problem.questionQ) {
        userReponses[i] = selectedProb;
      }
    }
    setUserQuizSet(userReponses);

    let assignment = {
      AssignmentId: unfinishedQuizData.AssignmentId,
      UserProblemsAnswers: userReponses,
    };
    console.log(assignment);
    var formData = new FormData();
    var testtype;

    if (quiz.title.substr(quiz.title.length - 6, 4) === "Exam") {
      testtype = "exams";
    } else if (quiz.title.substr(quiz.title.length - 6, 4) === "Quiz") {
      testtype = "quizes";
    } else {
      testtype = "assignments";
    }
    formData.append("testType", testtype);
    formData.append("courseTitle", localStorage.getItem("courseTitle"));
    formData.append("AssignmentTitle", quiz.title);

    formData.append("AssignmentId", unfinishedQuizData.AssignmentId);
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
    formData.append("AssignmentId", unfinishedQuizData.AssignmentId);
    formData.append("AssignmentTitle", quiz.title);
    formData.append("courseTitle", localStorage.getItem("courseTitle"));
    formData.append("startTime", new Date(unfinishedQuizData.StartTime * 1000));
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
    url = `${API}/quizTime/endquiztime/${localStorage.getItem("userId")}/${courseId}`;
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
      }
    }
    console.log(userReponses);
    setUserQuizSet(userReponses);
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
      //   console.log(item);
      //   console.log(userQuizSet);
      var insideAnswers = userQuizSet.filter((x) => x.problem.questionQ === item.questionQ);
      console.log(insideAnswers);
      if (insideAnswers[0] && insideAnswers[0].Useranswer) {
        color = {
          backgroundColor: "green",
        };
      } else if (selectedProb.problem.questionQ === item.questionQ) {
        color = {
          backgroundColor: "rgb(114, 114, 114)",
          border: "2px solid black",
        };
      }
      return (
        <div
          onClick={(e) => {
            if (!userQuizSet.find((x) => x.problem.questionQ === item.questionQ)) {
              setUserQuizSet([...userQuizSet, { problem: item, Useranswer: "", studentTeacherFiles: [] }]);
              setSelectedProb({ problem: item, Useranswer: "", score: 0, studentTeacherFiles: [] });
            } else {
              var userReponses = userQuizSet;
              for (var i = 0; i < userReponses.length; i++) {
                if (userReponses[i].problem.questionQ === item.questionQ) {
                  setSelectedProb({
                    problem: item,
                    Useranswer: userReponses[i].Useranswer,
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

export default QuizTime2;
