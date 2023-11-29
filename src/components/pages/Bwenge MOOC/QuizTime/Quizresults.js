import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useAssignmentResults } from "../hooks/useUserCourses";
import QuizResultProblem from "./QuizResult components/QuizResultProblem";

const Quizresults = ({ lastAttempt }) => {
  const [selectedProb, setSelectedProb] = useState(lastAttempt.UserProblemsAnswers[0]);

  const renderQuizNumbers = () => {
    var cntqsts = 0;

    return lastAttempt.UserProblemsAnswers.map((item) => {
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

      if (item.problem.type === "True or False" || item.problem.type === "Multiple Choice") {
        if (item.Useranswer === item.problem.correctAnswer) {
          color = {
            backgroundColor: "green",
          };
        } else {
          color = {
            backgroundColor: "red",
          };
        }
      } else if (item.problem.type === "Short Answer") {
        if (item.problem.answers.includes(item.Useranswer)) {
          color = {
            backgroundColor: "green",
          };
        } else {
          color = {
            backgroundColor: "red",
          };
        }
      }
      if (selectedProb === item) {
        color.border = "2px solid black";
      }
      return (
        <div
          onClick={(e) => {
            setSelectedProb(item);
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
    <div className="quizTimeBody">
      <div>
        {/* <div>{quizTime}</div> */}
        <div class="ui raised segment problemsnumbered">{renderQuizNumbers()}</div>
        <div>
          <QuizResultProblem selectedProb={selectedProb} />
        </div>
        <div class="ui raised segment">
          <div class="ui right labeled input">
            <label for="amount" class="ui label">
              Score
            </label>
            <input value={selectedProb.score} type="number" placeholder="Amount" id="amount" />
            <div class="ui basic label">/{selectedProb.problem.score}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quizresults;
