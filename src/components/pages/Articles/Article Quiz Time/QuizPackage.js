import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUserQuizData } from "./quiz hooks/useUserArticleQuizInfo";
import QuizTime2 from "./QuizTime2";
import thekomp from "./../../../../thekomp";
import QuizTime from "./QuizTime";
import { useParams } from "react-router-dom";
import _ from "lodash";

const QuizPackage = ({ thoquiz }) => {
  //   const [quizPackage, setQuizPackage] = useState("instructions");
  const API = thekomp;
  const { id } = useParams();
  const [lawchecked, setLawChecked] = useState(false);
  const [quizMotion, setQuizMotion] = useState("instructions");
  const [unfinishedQuizData, setUnfinishedData] = useState({});

  useEffect(() => {
    let unfinishedQuizData1;
    if (localStorage.getItem("userTask")) {
      unfinishedQuizData1 = JSON.parse(localStorage.getItem("userTask"));
      if (unfinishedQuizData1.userId == localStorage.getItem("userId") && unfinishedQuizData1.assignmentId == thoquiz.id) {
        setUnfinishedData(unfinishedQuizData1);
        setQuizMotion("QuizTime");
        console.log("hereeeee");
      }
    }
  }, []);

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

  const navigate = useNavigate();

  const queryParams = new URLSearchParams(window.location.search);

  const quizId = queryParams.get("quiz");

  var newProblemsSet = {};

  var thoquiz2 = _.cloneDeep(thoquiz);
  for (var i = 0; i < thoquiz2.problems.length; i++) {
    for (var j = 0; j < thoquiz2.problems[i].questions.length; j++) {
      thoquiz2.problems[i].questions[j] = {};
      thoquiz2.problems[i].questions[j].problem = thoquiz.problems[i].questions[j];
      thoquiz2.problems[i].questions[j].Useranswer = "";
      thoquiz2.problems[i].questions[j].score = 0;
      thoquiz2.problems[i].questions[j] = {
        problem: thoquiz.problems[i].questions[j],
        Useranswer: [],
        score: 0,
      };
    }
  }

  console.log(thoquiz2);
  // const { data1, loading1, error1 } = useUserQuizData(localStorage.getItem("userId"), id, thoquiz.id);
  // if (loading1) {
  //   return (
  //     <div class="ui segment">
  //       <div class="ui active inverted dimmer">
  //         <div class="ui text loader">Loading</div>
  //       </div>
  //       <p></p>
  //     </div>
  //   );
  // }
  // if (error1) {
  //   console.log(error1);
  //   return <h2>{error1.Error}</h2>;
  // }

  var checker = lawchecked ? "positive" : "disabled";

  const onStartquiz = () => {
    var userTask = {
      userId: localStorage.getItem("userId"),
      articleId: id,
      assignmentId: thoquiz.id,
      QuizDurations: thoquiz.estimatedDuration * 60,
      startTime: Math.floor(Date.now() / 1000),
      assignment: thoquiz2.problems,
    };
    localStorage.setItem("userTask", JSON.stringify(userTask));
    setUnfinishedData(userTask);
    setQuizMotion("QuizTime");

    // var formData = new FormData();
    // formData.append("QuizDuration", thoquiz.estimatedDuration * 60);
    // formData.append("StartTime", Math.floor(Date.now() / 1000));
    // formData.append("AssignmentId", thoquiz.id);
    // // formData.append("assignment", JSON.stringify(assignment));
    // let url = `${API}/articlequizTime/startquizinfo/${localStorage.getItem("userId")}/${id}`;
    // const config = {
    //   method: "post",
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
    // quizPackage = "QuizTime";
    // window.location.reload(false);
  };

  const renderQuizPackage = () => {
    switch (quizMotion) {
      case "instructions":
        return (
          <div>
            <button
              onClick={(e) => {
                navigate(-1);
              }}
              className="ui negative button"
            >
              Back to article
            </button>

            <div>
              <span>Post Article Quiz</span>
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
        // if (unfinishedQuizData) {
        //   if (unfinishedQuizData.assignment) return <QuizTime2 unfinishedQuizData={unfinishedQuizData} quiz={thoquiz} />;
        // }
        return <QuizTime quiz={thoquiz2} unfinishedQuizData={unfinishedQuizData} />;
    }
  };
  return <div>{renderQuizPackage()}</div>;
};

export default QuizPackage;
