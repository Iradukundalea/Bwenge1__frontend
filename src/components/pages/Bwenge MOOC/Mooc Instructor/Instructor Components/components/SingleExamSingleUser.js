import React, { useState } from "react";
import QuizResultProblem from "../../../QuizTime/QuizResult components/QuizResultProblem";
import axios from "axios";
import { useParams } from "react-router-dom";
import _ from "lodash";
import thekomp from "../../../../../../thekomp";
const SingleExamSingleUser = ({ singleUserAssignmentData }) => {
  const API = thekomp;
  console.log(singleUserAssignmentData);
  const [selectedProb, setSelectedProb] = useState(singleUserAssignmentData[0].exams[0].UserProblemsAnswers[0]);
  console.log(selectedProb);
  const { id } = useParams();
  const onUpdateScore = () => {
    for (let i = 0; i < singleUserAssignmentData[0].exams[0].UserProblemsAnswers.length; i++) {
      if (singleUserAssignmentData[0].exams[0].UserProblemsAnswers[i].id === selectedProb.id)
        singleUserAssignmentData[0].exams[0].UserProblemsAnswers[i] = selectedProb;
    }
    singleUserAssignmentData[0].exams[0].Userscore = _.sum(
      singleUserAssignmentData[0].exams[0].UserProblemsAnswers.map((item) => parseInt(item.score))
    );
    console.log(singleUserAssignmentData);

    var formData = new FormData();
    formData.append("newData", JSON.stringify(singleUserAssignmentData[0].exams[0]));
    var url = `${API}/enroll/updatexamscore/${singleUserAssignmentData[0].userId}/${id}/${singleUserAssignmentData[0].exams[0].AssignmentTitle}`;
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
        window.location.reload(false);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };
  const renderQuizNumbers = () => {
    var cntqsts = 0;
    return singleUserAssignmentData[0].exams[0].UserProblemsAnswers.map((item) => {
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
    <div>
      <div>
        {/* <div>{quizTime}</div> */}
        <div class="ui raised segment problemsnumbered">{renderQuizNumbers()}</div>
        <div>
          <QuizResultProblem selectedProb={selectedProb} />
        </div>
        {selectedProb.problem.type === "Long Answer" && (
          <div class="ui raised segment">
            <div class="ui right labeled input">
              <label for="amount" class="ui label">
                Score
              </label>
              <input
                value={selectedProb.score}
                onChange={(e) => setSelectedProb({ ...selectedProb, score: e.target.value })}
                type="number"
                placeholder="Amount"
                id="amount"
              />
              <div class="ui basic label">/{selectedProb.problem.score}</div>
              <button class="ui primary button" onClick={(e) => onUpdateScore()}>
                Save
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleExamSingleUser;
