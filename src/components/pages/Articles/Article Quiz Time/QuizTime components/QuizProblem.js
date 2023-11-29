import React, { useState } from "react";
import renderHTML from "react-render-html";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import DocsViewer from "../../../../DocsViewer";
import thekomp from "./../../../../../thekomp";
import { IoTrashBin } from "react-icons/io5";

const QuizProblem = ({ selectedProb, setSelectedProb, setUserAnswerHandler, updateUserAnswerFiles }) => {
  const API = thekomp;
  const [selectedPair, setSelectedPair] = useState([]);
  const renderAnswers = (proble) => {
    console.log(proble);
    switch (proble.problem.type) {
      case "True or False":
        return (
          <div>
            <div className="answerItemMC" style={{ display: "grid", gridTemplateColumns: "5% 95%" }}>
              <div>
                <input
                  onClick={(e) => {
                    console.log("okok");
                    setUserAnswerHandler("true", proble);
                  }}
                  type="radio"
                  id="html"
                  checked={proble.Useranswer.includes("true")}
                  name="fav_language"
                  value="HTML"
                  style={{ width: "20px", height: "20px" }}
                />
              </div>
              <div className="ms-3 ms-md-2 ms-lg-1">True</div>
            </div>
            <div className="answerItemMC" style={{ display: "grid", gridTemplateColumns: "5% 95%" }}>
              <div>
                <input
                  onClick={(e) => {
                    setUserAnswerHandler("false", proble);
                  }}
                  type="radio"
                  checked={proble.Useranswer.includes("false")}
                  id="html"
                  name="fav_language"
                  value="HTML"
                  style={{ width: "20px", height: "20px" }}
                />
              </div>
              <div className="ms-3 ms-md-2 ms-lg-1">False</div>
            </div>
          </div>
        );
      case "Short Answer":
        return (
          <div className="ui input">
            <input
              type="text"
              value={proble.Useranswer}
              onChange={(e) => {
                setUserAnswerHandler(e.target.value, proble);
              }}
              placeholder="Answer..."
            />
          </div>
        );
      case "Multiple Choice":
        return proble.problem.answers.map((answer) => {
          return (
            <div
              onClick={(e) => {
                setUserAnswerHandler(answer, proble);
              }}
              className="answerItemMC"
              style={{ display: "grid", gridTemplateColumns: "5% 95%" }}
            >
              <div style={{ paddingTop: "5px" }}>
                <input
                  checked={proble.Useranswer.includes(answer)}
                  type="radio"
                  id="html"
                  name="fav_language"
                  value="HTML"
                  style={{ width: "20px", height: "20px" }}
                />
              </div>
              <div className="ms-3 ms-md-2 ms-lg-1">{renderHTML(answer)}</div>
            </div>
          );
        });

      case "Multiple Answers":
        return proble.problem.answers.map((answer) => {
          return (
            <div
              onClick={(e) => {
                setUserAnswerHandler(answer, proble);
              }}
              className="answerItemMC"
              style={{ display: "grid", gridTemplateColumns: "5% 95%" }}
            >
              <div style={{ paddingTop: "5px" }}>
                <input
                  checked={proble.Useranswer.includes(answer)}
                  type="checkbox"
                  id="html"
                  name="chek"
                  value="HTML"
                  style={{ width: "20px", height: "20px" }}
                />
              </div>
              <div className="ms-3 ms-md-2 ms-lg-1">{renderHTML(answer)}</div>
            </div>
          );
        });

      case "Matching":
        return <div className="">okok</div>;
      case "Long Answer":
        return (
          <div>
            <CKEditor
              editor={ClassicEditor}
              data={selectedProb.Useranswer}
              onChange={(event, editor) => {
                const data = editor.getData();
                setUserAnswerHandler(data);
              }}
            />
          </div>
        );
    }
  };
  // const renderQuestionFile = () => {
  //   const extenso = selectedProb.problem.questionFile.substr(selectedProb.problem.questionFile.length - 3, 3);
  //   if (extenso === "pdf") {
  //     return (
  //       <div>
  //         <button class="ui right labeled icon button my-3">
  //           <a
  //             href={`${API}/${selectedProb.problem.questionFile}`}
  //             target="_blank"
  //             style={{
  //               opacity: "0.0",
  //               position: "absolute",
  //               " top": " 0",
  //               left: " 0",
  //               bottom: " 0",
  //               right: " 0",
  //               " width": "100%",
  //               height: "100%",
  //               cursor: "pointer",
  //             }}
  //           />
  //           <i class="file alternate icon"></i>
  //           There is a Question File,Download it
  //         </button>
  //       </div>
  //     );
  //   } else {
  //     return <img style={{ maxHeight: "40vh" }} className="img-fluid" src={`${thekomp}/${selectedProb.problem.questionFile}`} />;
  //   }
  // };
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
        <div className="answersDescription ui raised segment">
          {item.problem.type == "True or False" && (
            <div>
              <div className="answerItemMC" style={{ display: "grid", gridTemplateColumns: "5% 95%" }}>
                <div>
                  <input
                    onClick={(e) => {
                      console.log("okok");
                      var thosel = selectedProb;

                      for (var i = 0; i < thosel.questions.length; i++) {
                        if (thosel.questions[i].problem == proble.problem) {
                          thosel.questions[i].Useranswer = ["true"];
                          break;
                        }
                      }
                      setSelectedProb({ ...thosel });
                      // setUserAnswerHandler("true", proble);
                    }}
                    type="radio"
                    id="html"
                    checked={proble.Useranswer.includes("true")}
                    name="truerfalse"
                    value="HTML"
                    style={{ width: "20px", height: "20px" }}
                  />
                </div>
                <div className="ms-3 ms-md-2 ms-lg-1">True</div>
              </div>
              <div className="answerItemMC" style={{ display: "grid", gridTemplateColumns: "5% 95%" }}>
                <div>
                  <input
                    onClick={(e) => {
                      var thosel = selectedProb;

                      for (var i = 0; i < thosel.questions.length; i++) {
                        if (thosel.questions[i].problem == proble.problem) {
                          thosel.questions[i].Useranswer = ["false"];
                          break;
                        }
                      }
                      setSelectedProb({ ...thosel });
                      // setUserAnswerHandler("false", proble);
                    }}
                    type="radio"
                    checked={proble.Useranswer.includes("false")}
                    id="html"
                    name="truerfalse"
                    value="HTML"
                    style={{ width: "20px", height: "20px" }}
                  />
                </div>
                <div className="ms-3 ms-md-2 ms-lg-1">False</div>
              </div>
            </div>
          )}
          {item.problem.type == "Short Answer" && (
            <div className="ui input">
              <input
                type="text"
                value={proble.Useranswer}
                onChange={(e) => {
                  setUserAnswerHandler(e.target.value, proble);
                }}
                placeholder="Answer..."
              />
            </div>
          )}
          {item.problem.type == "Multiple Choice" &&
            proble.problem.answers.map((answer) => {
              return (
                <div
                  onClick={(e) => {
                    var thosel = selectedProb;

                    for (var i = 0; i < thosel.questions.length; i++) {
                      if (thosel.questions[i].problem == proble.problem) {
                        thosel.questions[i].Useranswer = [answer];
                        break;
                      }
                    }
                    setSelectedProb({ ...thosel });
                  }}
                  className="answerItemMC"
                  style={{ display: "grid", gridTemplateColumns: "5% 95%" }}
                >
                  <div style={{ paddingTop: "5px" }}>
                    <input
                      checked={proble.Useranswer.includes(answer)}
                      type="radio"
                      id="html"
                      name="fav_language"
                      value="HTML"
                      style={{ width: "20px", height: "20px" }}
                    />
                  </div>
                  <div className="ms-3 ms-md-2 ms-lg-1">{renderHTML(answer)}</div>
                </div>
              );
            })}
          {item.problem.type == "Multiple Answers" &&
            proble.problem.answers.map((answer) => {
              return (
                <div
                  onClick={(e) => {
                    setUserAnswerHandler(answer, proble);
                  }}
                  className="answerItemMC"
                  style={{ display: "grid", gridTemplateColumns: "5% 95%" }}
                >
                  <div style={{ paddingTop: "5px" }}>
                    <input
                      checked={proble.Useranswer.includes(answer)}
                      type="checkbox"
                      id="html"
                      name="fav_language"
                      value="HTML"
                      style={{ width: "20px", height: "20px" }}
                    />
                  </div>
                  <div className="ms-3 ms-md-2 ms-lg-1">{renderHTML(answer)}</div>
                </div>
              );
            })}
          {item.problem.type == "Matching" && (
            <div>
              <div className="ui stackable two column grid">
                <div className="eight wide column">
                  {proble.problem.answers.map((answer, index) => {
                    if (index % 2 == 0) {
                      return (
                        <div
                          className="ui segment"
                          style={{ cursor: "pointer" }}
                          onClick={(e) => {
                            if (selectedPair.length == 0) {
                              setSelectedPair([answer]);
                            } else {
                              var thosel = selectedProb;
                              for (var i = 0; i < thosel.questions.length; i++) {
                                if (thosel.questions[i].problem == proble.problem) {
                                  thosel.questions[i].Useranswer = [...thosel.questions[i].Useranswer, answer, selectedPair[0]];
                                  var pairsones = thosel.questions[i].problem.answers.filter((po, index) => {
                                    if (index % 2 == 0 && po != answer) return po;
                                  });
                                  var pairstwos = thosel.questions[i].problem.answers.filter((po, index) => {
                                    if (index % 2 == 1 && po != selectedPair[0]) return po;
                                  });
                                  var x = 0,
                                    y = 0;
                                  thosel.questions[i].problem.answers = [];
                                  for (var j = 0; j < pairstwos.length * 2; j++) {
                                    if (j % 2 == 0) {
                                      thosel.questions[i].problem.answers = [...thosel.questions[i].problem.answers, pairsones[x]];
                                      x++;
                                    } else {
                                      thosel.questions[i].problem.answers = [...thosel.questions[i].problem.answers, pairstwos[y]];
                                      y++;
                                    }
                                  }
                                  // thosel.questions[i].problem.answers = thosel.questions[i].problem.answers.filter(
                                  //   (itl) => itl != answer && itl != selectedPair[0]
                                  // );
                                  break;
                                }
                              }
                              setSelectedProb(thosel);
                              setSelectedPair([]);
                            }
                          }}
                        >
                          {answer}
                        </div>
                      );
                    }
                  })}
                </div>
                <div className="eight wide column">
                  {proble.problem.answers.map((answer, index) => {
                    if (index % 2 == 1) {
                      return (
                        <div
                          className="ui segment"
                          style={{ cursor: "pointer" }}
                          onClick={(e) => {
                            if (selectedPair.length == 0) {
                              setSelectedPair([answer]);
                            } else {
                              var thosel = selectedProb;
                              for (var i = 0; i < thosel.questions.length; i++) {
                                if (thosel.questions[i].problem == proble.problem) {
                                  thosel.questions[i].Useranswer = [...thosel.questions[i].Useranswer, selectedPair[0], answer];
                                  var pairsones = thosel.questions[i].problem.answers.filter((po, index) => {
                                    if (index % 2 == 0 && po != selectedPair[0]) return po;
                                  });
                                  var pairstwos = thosel.questions[i].problem.answers.filter((po, index) => {
                                    if (index % 2 == 1 && po != answer) return po;
                                  });
                                  var x = 0,
                                    y = 0;
                                  thosel.questions[i].problem.answers = [];
                                  for (var j = 0; j < pairstwos.length * 2; j++) {
                                    if (j % 2 == 0) {
                                      thosel.questions[i].problem.answers = [...thosel.questions[i].problem.answers, pairsones[x]];
                                      x++;
                                    } else {
                                      thosel.questions[i].problem.answers = [...thosel.questions[i].problem.answers, pairstwos[y]];
                                      y++;
                                    }
                                  }
                                  // thosel.questions[i].problem.answers = thosel.questions[i].problem.answers.filter(
                                  //   (itl) => itl != answer && itl != selectedPair[0]
                                  // );
                                  break;
                                }
                              }
                              setSelectedProb(thosel);
                              setSelectedPair([]);
                            }
                          }}
                        >
                          {answer}
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
              <div>
                {proble.Useranswer.map((itl, index) => {
                  if (index % 2 == 0) {
                    return (
                      <div className="mt-2">
                        <a class="ui teal image large label">
                          <i
                            onClick={(e) => {
                              var thosel = selectedProb;
                              for (var i = 0; i < thosel.questions.length; i++) {
                                if (thosel.questions[i].problem == proble.problem) {
                                  thosel.questions[i].problem.answers = [...thosel.questions[i].problem.answers, itl, proble.Useranswer[index + 1]];
                                  thosel.questions[i].Useranswer = thosel.questions[i].Useranswer.filter(
                                    (itla) => itla != itl && itla != proble.Useranswer[index + 1]
                                  );
                                  break;
                                }
                              }
                              console.log(thosel);
                              setSelectedProb({ ...thosel });
                            }}
                            className="ui close icon me-2"
                          ></i>
                          {itl}
                          <div class="detail">{proble.Useranswer[index + 1]}</div>
                        </a>
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  });
  return (
    <div className="ui segment">
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
      {renderQuestions}
    </div>
  );
};

export default QuizProblem;
