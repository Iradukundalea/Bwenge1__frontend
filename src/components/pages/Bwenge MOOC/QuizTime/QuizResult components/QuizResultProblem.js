import React from "react";
import renderHTML from "react-render-html";
import "./../styles/QuizTime.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import thekomp from "./../../../../../thekomp";

const QuizResultProblem = ({ selectedProb }) => {
  const API = thekomp;

  const renderAnswers = () => {
    var color;

    switch (selectedProb.problem.type) {
      case "True or False":
        return (
          <div>
            <div className="answerItemMC" style={{ display: "grid", gridTemplateColumns: "5% 95%" }}>
              <div>
                <input
                  type="radio"
                  id="html"
                  checked={selectedProb.Useranswer === "true"}
                  name="fav_language"
                  value="HTML"
                  style={{ width: "20px", height: "20px" }}
                />
              </div>
              <div>True</div>
            </div>
            <div className="answerItemMC" style={{ display: "grid", gridTemplateColumns: "5% 95%" }}>
              <div>
                <input
                  type="radio"
                  checked={selectedProb.Useranswer === "false"}
                  id="html"
                  name="fav_language"
                  value="HTML"
                  style={{ width: "20px", height: "20px" }}
                />
              </div>
              <div>False</div>
            </div>
          </div>
        );
      case "Short Answer":
        return (
          <div className="ui input">
            <input type="text" disabled="true" value={selectedProb.Useranswer} placeholder="Answer..." />
          </div>
        );
      case "Multiple Choice":
        return selectedProb.problem.answers.map((answer) => {
          return (
            <div className="answerItemMC" style={{ display: "grid", gridTemplateColumns: "5% 95%" }}>
              <div style={{ paddingTop: "5px" }}>
                <input
                  checked={answer === selectedProb.Useranswer}
                  type="radio"
                  id="html"
                  name="fav_language"
                  value="HTML"
                  style={{ width: "20px", height: "20px" }}
                />
              </div>
              <div>{renderHTML(answer)}</div>
            </div>
          );
        });
      case "Long Answer":
        return (
          <div>
            <CKEditor editor={ClassicEditor} data={selectedProb.Useranswer} disabled="true" />
          </div>
        );
    }
  };
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
  const renderAnswersFile = () => {
    return selectedProb.studentTeacherFiles.map((item) => {
      if (item.fileloc.substr(item.fileloc.length - 3, 3) == "jpg" || item.fileloc.substr(item.fileloc.length - 3, 3) == "png") {
        return (
          <div style={{ width: "40vw" }}>
            <img className="img-fluid w-4 h-2" src={`${API}/${item.fileloc}`} />
          </div>
        );
      } else if (item.fileloc.substr(item.fileloc.length - 3, 3) == "pdf") {
        return (
          <div style={{ width: "40vw", height: "100%" }}>
            <iFrame class="embed-responsive-item" width="100%" height="100%" src={`${API}/${item.fileloc}`} />
          </div>
        );
      }
    });
  };
  return (
    <div>
      <div className="problemStatement">{renderHTML(selectedProb.problem.questionQ)}</div>
      {selectedProb.problem.questionFile && renderQuestionFile()}

      <div className="answersDescription ui raised segment">{renderAnswers()}</div>
      <div>{selectedProb.studentTeacherFiles && renderAnswersFile()}</div>
    </div>
  );
};

export default QuizResultProblem;
