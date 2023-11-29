import React from "react";
import renderHTML from "react-render-html";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import thekomp from "./../../../../../thekomp";

const QuizResultProblem = ({ selectedProb }) => {
  const API = thekomp;

  const renderAnswers = (item) => {
    console.log(item);
    switch (item.problem.type) {
      case "True or False":
        return (
          <div>
            <div className="answerItemMC" style={{ display: "grid", gridTemplateColumns: "5% 95%" }}>
              <div>
                <input
                  type="radio"
                  id="html"
                  checked={item.Useranswer.includes("true")}
                  name="truerfalse"
                  value="HTML"
                  style={{ width: "20px", height: "20px" }}
                />
              </div>
              <div
                style={item.Useranswer.includes("true") ? (item.problem.correctAnswer.includes("true") ? { color: "green" } : { color: "red" }) : {}}
                className="ms-3 ms-md-2 ms-lg-1"
              >
                True
              </div>
            </div>
            <div className="answerItemMC" style={{ display: "grid", gridTemplateColumns: "5% 95%" }}>
              <div>
                <input
                  type="radio"
                  checked={item.Useranswer.includes("false")}
                  id="html"
                  name="truerfalse"
                  value="HTML"
                  color="red"
                  style={{ width: "20px", height: "20px" }}
                />
              </div>
              <div
                className="ms-3 ms-md-2 ms-lg-1"
                style={
                  item.Useranswer.includes("false") ? (item.problem.correctAnswer.includes("false") ? { color: "green" } : { color: "red" }) : {}
                }
              >
                False
              </div>
            </div>
          </div>
        );
      case "Short Answer":
        return (
          <div className="ui input">
            <input type="text" disabled="true" value={item.Useranswer} placeholder="Answer..." />
          </div>
        );
      case "Multiple Choice":
        return item.problem.answers.map((answer) => {
          return (
            <div className="answerItemMC" style={{ display: "grid", gridTemplateColumns: "5% 95%" }}>
              <div style={{ paddingTop: "5px" }}>
                <input
                  checked={item.Useranswer.includes(answer)}
                  type="radio"
                  id="html"
                  name="fav_language"
                  value="HTML"
                  style={{ width: "20px", height: "20px" }}
                />
              </div>
              <div
                className="ms-3 ms-md-2 ms-lg-1"
                style={item.Useranswer.includes(answer) ? (item.problem.correctAnswer.includes(answer) ? { color: "green" } : { color: "red" }) : {}}
              >
                {renderHTML(answer)}
              </div>
            </div>
          );
        });

      case "Multiple Answers":
        return item.problem.answers.map((answer) => {
          return (
            <div className="answerItemMC" style={{ display: "grid", gridTemplateColumns: "5% 95%" }}>
              <div style={{ paddingTop: "5px" }}>
                <input
                  checked={item.Useranswer.includes(answer)}
                  type="checkbox"
                  id="html"
                  name="chkbx"
                  value="HTML"
                  style={{ width: "20px", height: "20px" }}
                />
              </div>
              <div
                className="ms-3 ms-md-2 ms-lg-1"
                style={item.Useranswer.includes(answer) ? (item.problem.correctAnswer.includes(answer) ? { color: "green" } : { color: "red" }) : {}}
              >
                {renderHTML(answer)}
              </div>
            </div>
          );
        });

      // case "Long Answer":
      //   return (
      //     <div>
      //       <CKEditor editor={ClassicEditor} data={selectedProb.Useranswer} disabled="true" />
      //     </div>
      //   );
    }
  };
  const renderQuestions = selectedProb.questions.map((item) => {
    var proble = item;
    return (
      <div key={item.problem} className="ui raised segment">
        <div className="problemStatement">{renderHTML(item.problem.questionQ)}</div>
        {/* <div style={{ maxHeight: "400px" }}>{selectedProb.problem.questionFile && renderQuestionFile()}</div> */}
        {item.problem.questionFile && item.problem.questionFile.includes("quizesimage") && (
          <div className="col">
            <div className="row-md-2 float-right"></div>
            <div className="row-md-10">
              <img className="img-fluid w-4 h-2" src={item.problem.questionFile} />
            </div>
          </div>
        )}
        <div className="answersDescription ui raised segment">{renderAnswers(item)}</div>
      </div>
    );
  });
  const renderQuestionFile = () => {
    const extenso = selectedProb.problem.questionFile.substr(selectedProb.problem.questionFile.length - 3, 3);
    if (extenso === "pdf") {
      return (
        <div>
          <button class="ui right labeled icon button my-3">
            <a
              href={`${API}/${selectedProb.problem.questionFile}`}
              target="_blank"
              style={{
                opacity: "0.0",
                position: "absolute",
                " top": " 0",
                left: " 0",
                bottom: " 0",
                right: " 0",
                " width": "100%",
                height: "100%",
                cursor: "pointer",
              }}
            />
            <i class="file alternate icon"></i>
            There is a Question File,Download it
          </button>
        </div>
      );
    } else {
      return <img style={{ maxHeight: "40vh" }} className="img-fluid" src={`${API}/${selectedProb.problem.questionFile}`} />;
    }
  };

  return (
    <div>
      {selectedProb.problemInstruction && <div className="ui segment">{selectedProb.problemInstruction}</div>}
      {selectedProb.problemFile && (
        <div>
          {selectedProb.problemFile.includes("quizesimage") && (
            <div className="col">
              <div className="row-md-2 float-right"></div>
              <div className="row-md-10">
                <img className="img-fluid w-4 h-2" src={selectedProb.problemFile} />
              </div>
            </div>
          )}
        </div>
      )}
      <div className="ui segment">{renderQuestions}</div>
      {/* <div className="problemStatement">{renderHTML(selectedProb.problem.questionQ)}</div> */}

      {/* <div className="answersDescription ui raised segment">{renderAnswers()}</div> */}
    </div>
  );
};

export default QuizResultProblem;
