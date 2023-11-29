import React, { useState, useEffect } from "react";
import QuizResultProblem from "./QuizResult components/QuizResultProblem";

const QuizResult = ({ lastAttempt }) => {
  const [selectedProb, setSelectedProb] = useState(lastAttempt[0]);

  const renderQuizNumbers = () => {
    var cntqsts = 0;

    return lastAttempt.map((item) => {
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
            var userReponses = lastAttempt;
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
    <div className="ui segment">
      <div>
        {/* <div>{quizTime}</div> */}
        {/* <h1>Hello</h1> */}
        <div class="ui raised segment problemsnumbered">{renderQuizNumbers()}</div>
        <div>
          <QuizResultProblem selectedProb={selectedProb} />
        </div>
      </div>
    </div>
  );
};

export default QuizResult;
