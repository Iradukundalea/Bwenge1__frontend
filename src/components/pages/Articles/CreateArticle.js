import React, { useState, useRef } from "react";
import { EditorState, convertToRaw } from "draft-js";
import Editor, { composeDecorators } from "@draft-js-plugins/editor";
import createToolbarPlugin from "@draft-js-plugins/static-toolbar";
import createTextAlignmentPlugin from "@draft-js-plugins/text-alignment";
import createImagePlugin from "@draft-js-plugins/image";
import Modal from "../../Modal";
import history from "../../../Redux/actions/history";
import { FaAngleDown, FaTrash } from "react-icons/fa";
import { IoTrashBin } from "react-icons/io5";
import renderHTML from "react-render-html";
import FullscreenModal from "../../FullscreenModal";
import SlidePresentationExample from "../../SlidePresentationExample";

import _ from "lodash";
import { Checkbox } from "semantic-ui-react";
import { AiFillCloseCircle } from "react-icons/ai";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import createAlignmentPlugin from "@draft-js-plugins/alignment";
import createInlineToolbarPlugin from "@draft-js-plugins/inline-toolbar";
import createFocusPlugin from "@draft-js-plugins/focus";

import createResizeablePlugin from "@draft-js-plugins/resizeable";
import createSideToolbarPlugin from "@draft-js-plugins/side-toolbar";
import createBlockDndPlugin from "@draft-js-plugins/drag-n-drop";
import createHashtagPlugin from "@draft-js-plugins/hashtag";
import createVideoPlugin from "@draft-js-plugins/video";
import { MdQuiz } from "react-icons/md";

import trashImage from "./../../../imgs/trash.svg";

import createDragNDropUploadPlugin from "@draft-js-plugins/drag-n-drop-upload";
import "./Styles/editorStyles.css";
import "@draft-js-plugins/side-toolbar/lib/plugin.css";
import "@draft-js-plugins/static-toolbar/lib/plugin.css";
import "@draft-js-plugins/inline-toolbar/lib/plugin.css";
import "@draft-js-plugins/emoji/lib/plugin.css";
import buttonStyles from "./Styles/buttonStyles.css";
import toolbarStyles from "./Styles/toolbarStyles.css";
import mockUpload from "./Create Article Components/mockUpload.js";
import thekomp from "./../../../thekomp.js";

import {
  BoldButton,
  ItalicButton,
  UnorderedListButton,
  OrderedListButton,
  BlockquoteButton,
  UnderlineButton,
  CodeBlockButton,
  HeadlineOneButton,
  HeadlineTwoButton,
  HeadlineThreeButton,
} from "@draft-js-plugins/buttons";
import createEmojiPlugin from "@draft-js-plugins/emoji";
import axios from "axios";
const emojiPlugin = createEmojiPlugin({
  useNativeArt: true,
});
const { EmojiSuggestions, EmojiSelect } = emojiPlugin;
const textAlignmentPlugin = createTextAlignmentPlugin();
const staticToolbarPlugin = createToolbarPlugin();
const hashtagPlugin = createHashtagPlugin();
const { Toolbar } = staticToolbarPlugin;
const focusPlugin = createFocusPlugin();
const resizeablePlugin = createResizeablePlugin();
const videoPlugin = createVideoPlugin();
const blockDndPlugin = createBlockDndPlugin();
const inlineToolbarPlugin = createInlineToolbarPlugin({
  theme: { buttonStyles, toolbarStyles },
});
const { InlineToolbar } = inlineToolbarPlugin;
const sideToolbarPlugin = createSideToolbarPlugin();
const { SideToolbar } = sideToolbarPlugin;

const alignmentPlugin = createAlignmentPlugin();
const { AlignmentTool } = alignmentPlugin;

const decorator = composeDecorators(resizeablePlugin.decorator, alignmentPlugin.decorator, focusPlugin.decorator, blockDndPlugin.decorator);
const imagePlugin = createImagePlugin({ decorator });

const dragNDropFileUploadPlugin = createDragNDropUploadPlugin({
  handleUpload: mockUpload,
  addImage: imagePlugin.addImage,
});
const plugins = [
  staticToolbarPlugin,
  textAlignmentPlugin,
  dragNDropFileUploadPlugin,
  blockDndPlugin,
  focusPlugin,
  alignmentPlugin,
  resizeablePlugin,
  imagePlugin,
  emojiPlugin,
  hashtagPlugin,
  inlineToolbarPlugin,
  videoPlugin,
  sideToolbarPlugin,
];

const CreateArticle = () => {
  const API = thekomp;
  const fields = {
    "": [],
    Engineering: [
      "Mechanical Engineering",
      "Chemical Engineering",
      "Material Science and Engineering",
      "Environmental Science",
      "Civil Engineering",
      "Telecommunication Engineering",
      "Computer Science",
      "Energy Science",
      "Biotechnology",
      "Nanoscience and Technology",
      "Food Science and Technology",
      "Automation and Control",
      "Mining and Mineral Engineering",
      "Water Resources",
      "Electronic and Electrical Engineering",
      "Remote sensing",
      "BiomedicL Engineering",
      "Software Engineering",
      "Metallurgical Engineering",
      "Others",
    ],
    "Natural Sciences": ["Mathematics", "Earth Sciences", "Physics", "Geography", "Atmospheric Science", "Chemistry", "Ecology", "Others"],
    "Life Sciences": ["Biological Sciences", "Veterinary Sciences", "Human Biological Sciences", "Agricultural Sciences", "Others"],
    "Medical Sciences": [
      "Clinical Medicine",
      "Nursing",
      "Public Health",
      "Medical Technology",
      "Dentistry",
      "Pharmacy",
      "Biomedical Laboratory",
      "Clinical Psychology",
      "Opthalmology",
      "Anesthesia",
      "Others",
    ],
    "Social Sciences": [
      "Economics",
      "Finance",
      "Hospitality and Tourism Management",
      "Political Science",
      "Statistics",
      "Communication",
      "Sociology",
      "Psychology",
      "Education",
      "Law",
      "Business Administration",
      "Public Administration",
      "Management",
      "Library and Information Science",
      "Others",
    ],
    "Professional Courses": [],
    "High School Coaching": [],
    "Culture Courses": [],
    "Language Courses": [],
    "National Courses": [],
  };
  const editor = useRef(null);
  const [selectedField, setSelectedField] = useState([]);
  const [tobeEditedQuiz, setTobeEditedQuiz] = useState({});

  const [answer, setAnswer] = useState("");

  const [item, setitem] = useState("");
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [poll, setPoll] = useState({
    topic: "",
    options: [],
  });
  const [pollOption, setPollOption] = useState("");
  const [pollModal, setPollModal] = useState(false);
  const [addInstructionModal, setAddInstructionModal] = useState({
    onOpen: false,
  });
  const [quizModal, setQuizModal] = useState(false);
  const [addQuizModal, setAddQuizModal] = useState({
    onOpen: false,
    method: "",
  });
  const [addQuestionModal, setAddQuestionModal] = useState({
    onOpen: false,
    method: "",
  });
  const [addMultipleQuestionModal, setAddMultipleQuestionModal] = useState({
    onOpen: false,
    method: "",
  });
  const [tobeEditedQst, setTobeEdited] = useState({});
  const [tobeEditedProb, setTobeEditedProb] = useState({});

  const [assignment, setAssignment] = useState({
    title: "post article quiz",
    type: "",
    problems: [],
    maximumScore: 0,
    estimatedDuration: 10000,
    instructions: "",
  });
  const [problem, setProblem] = useState({
    instruction: "",
    problemFile: "",
    questions: [],
  });
  const [question, setQuestion] = useState({
    type: "Multiple Choice",
    questionQ: "",
    answers: [],
    questionFile: "",
    correctAnswer: "",
    score: 10,
  });
  const [article, setArticle] = useState({
    title: "",
    field: "",
    department: "",
    tags: [],
    polls: [],
    postArticleQuiz: {},
  });
  console.log(convertToRaw(editorState.getCurrentContent()));

  const onChange = (editorState) => {
    setEditorState(editorState);
  };
  const alignmentStyles = ["left", "right", "center"];

  function myBlockStyleFn(contentBlock) {
    const type = contentBlock.getType();
    if (type === "blockquote") {
      return "superFancyBlockquote";
    }
  }
  const focus = () => editor.focus();
  const onsubmitArticleHnadler = async (e) => {
    e.preventDefault();
    const creator = {
      creatorId: localStorage.getItem("userId"),
      email: localStorage.getItem("email"),
      firstName: localStorage.getItem("firstName"),
      lastName: localStorage.getItem("lastName"),
    };
    const formData = new FormData();
    formData.append("title", article.title);
    formData.append("field", article.field);
    formData.append("department", article.department);
    formData.append("polls", JSON.stringify(article.polls));
    formData.append("postArticleQuiz", JSON.stringify(article.postArticleQuiz));
    formData.append("tags", JSON.stringify(article.tags));
    formData.append("article", JSON.stringify(convertToRaw(editorState.getCurrentContent())));
    formData.append("creator", JSON.stringify(creator));
    const config = {
      method: "post",
      url: `${thekomp}/article/createarticle`,
      headers: {
        "content-type": "multipart/form-data",
      },
      data: formData,
    };
    axios(config)
      .then((res) => {
        console.log(res);
        alert("Your article has been inserted successfully, After being approved it will be available publicly! Thx.");
        history.push("/bwengecourses/longcourses");
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };

  const quizquestionFileUpload = async (file) => {
    var type;
    if (file.type === "image/jpeg" || file.type === "image/png" || file.type === "image/gif" || file.type === "image/jpg") {
      type = "image";
    } else if (file.type == "application/pdf") {
      type = "pdf";
    }
    var urlo = `${thekomp}/article/uploadquizfileurl/${type}`;

    const { url } = await fetch(urlo).then((res) => res.json());
    await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: file,
    });
    const imageUrl = url.split("?")[0];
    setQuestion({
      ...question,
      questionFile: imageUrl,
    });
    return imageUrl;
  };
  const quizProblemFileUpload = async (file) => {
    var type;
    if (file.type === "image/jpeg" || file.type === "image/png" || file.type === "image/gif" || file.type === "image/jpg") {
      type = "image";
    } else if (file.type == "application/pdf") {
      type = "pdf";
    }
    var urlo = `${thekomp}/article/uploadquizfileurl/${type}`;

    const { url } = await fetch(urlo).then((res) => res.json());
    await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: file,
    });
    const imageUrl = url.split("?")[0];
    setProblem({
      ...problem,
      problemFile: imageUrl,
    });
    return imageUrl;
  };
  const pollcontent = () => {
    return (
      <div className="ui segment">
        <div className="ui form">
          <div className="field">
            <label>Poll Topic:</label>
            <input type="text" value={poll.topic} onChange={(e) => setPoll({ ...poll, topic: e.target.value })} />
          </div>
          <div className="field">
            <label>Options:</label>
            <input type="text" onChange={(e) => setPollOption(e.target.value)} value={pollOption} />
            <div className="postInfo instructors">
              {poll.options.map((item) => {
                return (
                  <div className="mapItemsObj">
                    <span>{item}</span>
                    <i
                      className="close icon"
                      onClick={(e) => {
                        var items = poll.options;
                        items = items.filter((itema) => itema !== item);
                        setPoll({
                          ...poll,
                          options: items,
                        });
                      }}
                    ></i>
                  </div>
                );
              })}
            </div>
            <button
              onClick={(e) => {
                if (pollOption !== "") {
                  const objectives = poll.options;
                  objectives.push(pollOption);
                  setPoll({
                    ...poll,
                    options: objectives,
                  });
                  setPollOption("");
                }
              }}
              style={{ marginTop: "5px" }}
              class="ui compact icon button"
            >
              <i class="plus icon"></i>
              Add Option
            </button>
          </div>
        </div>
      </div>
    );
  };
  const setaddInstructionsModal = () => {
    return (
      <div style={{ minHeight: "18rem" }}>
        <CKEditor
          editor={ClassicEditor}
          data={assignment.instructions}
          placeHolder="Answer"
          onChange={(event, editor) => {
            const data = editor.getData();
            setAssignment({ ...assignment, instructions: data });
          }}
        />
      </div>
    );
  };
  const setAddInstructionsActions = () => {
    return (
      <div>
        <button
          onClick={(e) => {
            setAddInstructionModal({ onOpen: false });
          }}
          className="ui positive button"
        >
          Add Instructions
        </button>
      </div>
    );
  };
  const pollActions = () => {
    return (
      <div>
        <button
          className="ui success button"
          onClick={(e) => {
            var polls = article.polls;
            polls = [...polls, poll];
            setArticle({ ...article, polls });
            setPollModal(false);
          }}
        >
          Create Poll
        </button>
      </div>
    );
  };
  const QuizContent = () => {
    return (
      <div style={{ display: "flex", flexDirection: "column", minHeight: "50vh" }}>
        <div className="ui raised segment" style={{ display: "grid", gridTemplateColumns: "50% 50%" }}>
          <div>Number Of Questions: {assignment.problems.length}</div>
          <div>Maximum Score: {_.sum(assignment.problems.map((prob) => _.sum(prob.questions.map((ito) => ito.score))))}</div>
        </div>
        <div>{renderAllQuestions}</div>
        <div
          className=""
          style={{
            display: "grid",
            gridTemplateColumns: "50% 50%",
            margin: "5px",
          }}
        >
          <div>
            <label style={{ marginRight: "5px", fontSize: "1.2rem" }}>Estimated Duration:</label>
            <input
              type="number"
              value={assignment.estimatedDuration}
              onChange={(e) => {
                if (e.target.value >= 0)
                  setAssignment({
                    ...assignment,
                    estimatedDuration: e.target.value,
                  });
              }}
            />
            <label style={{ fontSize: "1.3rem" }}>minutes</label>
          </div>
        </div>
      </div>
    );
  };
  const renderQuestionType = () => {
    switch (question.type) {
      case "Multiple Choice":
        var qsnbr = -1;
        return (
          <div className="ui raised segment">
            <div className="ui form">
              {/* <div className='answerItemMC' style={{ "display": "grid", "gridTemplateColumns": "5% 95%" }}>
                                <div style={{ "paddingTop": "10px" }}>
                                    <input checked={question.correctAnswer===question.answers[0]} onClick={(e) => setQuestion({ ...question, correctAnswer: question.answers[0] })} type="radio" id="html" name="fav_language" value="HTML" style={{ "width": "20px", "height": "20px" }} />
                                </div>
                                <div>
                                    <CKEditor
                                        editor={ClassicEditor}
                                        data={question.answers[0]}
                                        onChange={(event, editor) => {
                                            const data = editor.getData();
                                            var reponses = question.answers;
                                            reponses[0] = data;
                                            setQuestion({ ...question, answers: reponses });
                                        }} />
                                </div>
                            </div> */}
              {question.answers.map((repons) => {
                qsnbr++;
                return (
                  <div
                    className="answerItemMC"
                    style={{
                      display: "grid",
                      gridTemplateColumns: "5% 90% 5%",
                    }}
                  >
                    <div style={{ paddingTop: "10px" }}>
                      <input
                        checked={question.correctAnswer === repons && question.correctAnswer !== ""}
                        onClick={(e) => setQuestion({ ...question, correctAnswer: repons })}
                        type="radio"
                        id="html"
                        name="fav_language"
                        value="HTML"
                        style={{ width: "20px", height: "20px" }}
                      />
                    </div>
                    <div>
                      <CKEditor
                        editor={ClassicEditor}
                        data={repons}
                        onChange={(event, editor) => {
                          const data = editor.getData();
                          var reponses = question.answers;
                          for (var i = 0; i < reponses.length; i++) {
                            if (reponses[i] === repons) {
                              reponses[i] = data;
                            }
                          }
                          setQuestion({ ...question, answers: reponses });
                        }}
                      />
                    </div>
                    <div>
                      <IoTrashBin
                        onClick={(e) => {
                          var reponses = question.answers;
                          reponses = _.without(reponses, repons);
                          setQuestion({ ...question, answers: reponses });
                        }}
                        style={{
                          width: "30px",
                          height: "30px",
                          cursor: "pointer",
                        }}
                      />
                    </div>
                  </div>
                );
              })}
              <button
                onClick={(e) => {
                  var reponses = question.answers;
                  reponses.push(`Option ${question.answers.length + 1}`);
                  setQuestion({ ...question, answers: reponses });
                }}
                class="ui compact icon button"
                style={{ marginTop: "5px" }}
              >
                <i class="plus icon"></i>
                Add Option
              </button>
            </div>
          </div>
        );

      case "True or False":
        return (
          <div className="ui raised segment">
            <div className="answerItemMC" style={{ display: "grid", gridTemplateColumns: "5% 95%" }}>
              <div>
                <input
                  checked={question.correctAnswer === "true"}
                  onClick={(e) => setQuestion({ ...question, correctAnswer: "true" })}
                  type="radio"
                  id="html"
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
                  checked={question.correctAnswer === "false"}
                  onClick={(e) => setQuestion({ ...question, correctAnswer: "false" })}
                  type="radio"
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
          <div className="ui raised segment">
            <div className="ui form">
              <div class="field">
                <input type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} />
                <div className="postInfo instructors">
                  {question.answers.map((repons) => {
                    return (
                      <div className="mapItemsObj">
                        <span>{repons}</span>
                        <i
                          className="close icon"
                          onClick={(e) => {
                            var reponses = question.answers;
                            reponses = reponses.filter((item) => item !== repons);
                            setQuestion({ ...question, answers: reponses });
                          }}
                        ></i>
                      </div>
                    );
                  })}
                </div>
                <button
                  onClick={(e) => {
                    var reponses = question.answers;
                    reponses.push(answer);
                    setAnswer("");
                    setQuestion({ ...question, answers: reponses });
                  }}
                  class="ui compact icon button"
                  style={{ marginTop: "5px" }}
                >
                  <i class="plus icon"></i>
                  Add Answer
                </button>
              </div>
            </div>
          </div>
        );
    }
  };
  const renderAddQuizActions = () => {
    return (
      <div>
        <button
          onClick={(e) => {
            setAddInstructionModal({ onOpen: true });
          }}
          class="ui teal button"
        >
          Add Instructions
        </button>
        <button
          onClick={(e) => {
            setAddQuestionModal({
              onOpen: true,
              method: "Add",
            });
          }}
          class="ui compact icon button"
          style={{
            marginTop: "5px",
            backgroundColor: "rgb(255, 238, 85)",
            marginLeft: "5px",
          }}
        >
          <i class="plus icon"></i>
          Add A Question
        </button>
        <button
          onClick={(e) => {
            setAddMultipleQuestionModal({
              onOpen: true,
              method: "Add",
            });
          }}
          class="ui compact icon button"
          style={{
            marginTop: "5px",
            backgroundColor: "rgb(255, 238, 85)",
            marginLeft: "5px",
          }}
        >
          <i class="plus icon"></i>
          Add A Set of Questions
        </button>
        <button
          onClick={(e) => {
            if (addQuizModal.method === "Add") {
              setArticle({ ...article, postArticleQuiz: assignment });

              setAssignment({
                title: "",
                type: "",
                problems: [],
                maximumScore: 0,
                estimatedDuration: 0,
                openTime: false,
                openTimeRange: [new Date(), new Date()],
                instructions: "",
              });
              setAddQuizModal({
                onOpen: false,
              });
            } else if (addQuizModal.method === "Edit") {
              const examo = article.postArticleQuiz;
              for (var i = 0; i < examo.length; i++) {
                if (examo[i] === tobeEditedQuiz) examo[i] = assignment;
              }

              setAssignment({
                title: "",
                type: "",
                problems: [],
                maximumScore: 0,
                estimatedDuration: 10000,
                openTime: false,
                openTimeRange: [new Date(), new Date()],
                instructions: "",
              });
              setAddQuizModal({
                onOpen: false,
              });
            } else if (addQuizModal.method === "Delete") {
              setArticle({ ...article, postArticleQuiz: {} });
              setAssignment({
                title: "",
                type: "",
                problems: [],
                maximumScore: 0,
                estimatedDuration: 10000,
                openTime: false,
                openTimeRange: [new Date(), new Date()],
                instructions: "",
              });
              setAddQuizModal({
                onOpen: false,
              });
            }
          }}
          class="ui compact icon button"
          style={{ marginTop: "5px", backgroundColor: "rgb(185, 211, 134)" }}
        >
          <i class="plus icon"></i>
          {addQuizModal.method} quiz
        </button>
      </div>
    );
  };
  const renderAddQuestionContent = () => {
    return (
      <div>
        <div className="ui form">
          <div className="field">
            <label>Question Type</label>
            <div>
              <select value={question.type} onChange={(e) => setQuestion({ ...question, type: e.target.value })}>
                <option class="item" value="Multiple Choice">
                  Multiple Choice
                </option>
                <option class="item" value="True or False">
                  True or False
                </option>
                <option class="item" value="Short Answer">
                  Short Answer Question
                </option>
              </select>
            </div>
          </div>
        </div>
        <div className="ui form">
          <div className="field">
            <label>Question: </label>
            {
              <button class="ui right compact icon button my-3" style={{ position: "relative" }}>
                <input
                  type="file"
                  id="qfile1"
                  onChange={(e) => {
                    var fileInput = document.getElementById("qfile1");
                    var filePath = fileInput.value;
                    // Allowing file type
                    var allowedExtensions = /(\.jpg|\.jpeg|\.gif|\.pdf|\.png)$/i;

                    if (!allowedExtensions.exec(filePath)) {
                      alert("File type not allowed");
                      return false;
                    } else {
                      var oururl = quizquestionFileUpload(document.getElementById("qfile1").files[0]);
                    }
                  }}
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
                Add Question File
              </button>
            }
            .jpg .png .pdf
            {question.questionFile && question.questionFile.includes("quizesimage") && (
              <div className="col">
                <div className="row-md-2 float-right"></div>
                <div className="row-md-10">
                  <img className="img-fluid w-4 h-2" src={question.questionFile} />
                </div>
              </div>
            )}
            {question.questionFile && question.questionFile.includes("quizespdf") && (
              <div className="col">
                <div className="row-md-2 float-right">
                  <AiFillCloseCircle
                    onClick={(e) => {
                      setQuestion({ ...question, questionFile: "" });
                    }}
                    style={{
                      width: "30px",
                      height: "30px",
                      cursor: "pointer",
                    }}
                  />
                </div>
                <div style={{ height: "60vh", width: "100%" }}>
                  {/* <SlidePresentationExample
                    fileUrl={`https://bwengearticles.s3.us-west-1.amazonaws.com/quizespdf/4ea2de6424a80e154cd55b0f17f295dd.pdf`}
                  /> */}
                  <embed
                    type="application/pdf"
                    class="embed-responsive-item"
                    width="100%"
                    height="100%"
                    url={`https://bwengearticles.s3.us-west-1.amazonaws.com/quizespdf/4ea2de6424a80e154cd55b0f17f295dd.pdf`}
                  />
                  {/* <iframe src={`${question.questionFile}#toolbar=0`} height="200" width="300"></iframe> */}
                </div>
              </div>
            )}
            <CKEditor
              editor={ClassicEditor}
              data={question.questionQ}
              onChange={(event, editor) => {
                const data = editor.getData();
                setQuestion({ ...question, questionQ: data });
              }}
            />
          </div>

          <label style={{ fontWeight: "bold" }}>Answers:</label>

          {renderQuestionType()}
          <div className="field">
            <label>Question Maximum score:</label>
            <input
              type="number"
              value={question.score}
              placeholder={10}
              onChange={(e) => setQuestion({ ...question, score: e.target.valueAsNumber })}
            />
          </div>
        </div>
      </div>
    );
  };
  const renderAddQuestionAction = () => {
    return (
      <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
        <div style={{ display: "flex", marginTop: "5px" }}></div>
        <div>
          <button
            onClick={(e) => {
              if (addQuestionModal.method === "Add") {
                if (!addMultipleQuestionModal.onOpen) {
                  var thoprob = problem;
                  thoprob.questions.push(question);
                  var probs = assignment.problems;
                  probs.push(thoprob);
                  setAssignment({
                    ...assignment,
                    problems: probs,
                    maximumScore: assignment.maximumScore + question.score,
                  });
                  setProblem({
                    instruction: "",
                    problemFile: "",
                    questions: [],
                  });
                  setQuestion({
                    type: "Multiple Choice",
                    questionQ: "",
                    answers: [],
                    correctAnswer: "",
                    score: 10,
                    fileRequired: false,
                  });
                  setAddQuestionModal({ onOpen: false, method: "" });
                } else if (addMultipleQuestionModal.onOpen) {
                  var thoqstns = problem.questions;
                  thoqstns.push(question);
                  setProblem({ ...problem, questions: thoqstns });
                  setQuestion({
                    type: "Multiple Choice",
                    questionQ: "",
                    answers: [],
                    correctAnswer: "",
                    score: 10,
                    fileRequired: false,
                  });
                  setAddQuestionModal({ onOpen: false, method: "" });
                }
              } else if (addQuestionModal.method === "Delete") {
                if (!addMultipleQuestionModal.onOpen) {
                  var probs = assignment.problems;
                  probs = probs.filter((prob) => {
                    prob.questions = prob.questions.filter((ito) => ito != question);
                    if (prob.questions.length > 0) {
                      return prob;
                    }
                  });
                  setAssignment({
                    ...assignment,
                    problems: probs,
                    maximumScore: assignment.maximumScore - question.score,
                  });
                  setQuestion({
                    type: "Multiple Choice",
                    questionQ: "",
                    answers: [],
                    correctAnswer: "",
                    score: 10,
                    instructions: "",
                  });
                  setAddQuestionModal({ onOpen: false, method: "" });
                } else {
                  var qsts = problem.questions;
                  qsts = qsts.filter((ito) => ito != question);
                  setProblem({ ...problem, questions: qsts });
                  setQuestion({
                    type: "Multiple Choice",
                    questionQ: "",
                    answers: [],
                    correctAnswer: "",
                    score: 10,
                    instructions: "",
                  });
                  setAddQuestionModal({ onOpen: false, method: "" });
                }
              } else if (addQuestionModal.method === "Edit") {
                var probs = assignment.problems;

                for (var i = 0; i < probs.length; i++) {
                  for (var j = 0; j < probs[i].questions.length; j++) {
                    if (probs[i].questions[j] === tobeEditedQst) {
                      probs[i].questions[j] = question;
                    }
                  }
                }
                setAssignment({
                  ...assignment,
                  problems: probs,
                  maximumScore: assignment.maximumScore - tobeEditedQst.score + question.score,
                });
                setProblem({
                  instruction: "",
                  problemFile: "",
                  questions: [],
                });
                setQuestion({
                  type: "Multiple Choice",
                  questionQ: "",
                  answers: [],
                  correctAnswer: "",
                  score: 10,
                  instructions: "",
                });
                setTobeEdited({});
                setAddQuestionModal({ onOpen: false, method: "" });
              }
            }}
            class="positive ui button"
          >
            {addQuestionModal.method} Question
          </button>
        </div>
      </div>
    );
  };
  const renderAddMultipleQuestionContent = () => {
    return (
      <div>
        <div className="ui form">
          <div className="ui raised segment">
            <div className="field">
              <label>Problem Instruction:</label>
              <CKEditor
                editor={ClassicEditor}
                data={problem.instruction}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setProblem({ ...problem, instruction: data });
                }}
              />
            </div>
            {
              <button class="ui right compact icon button my-3" style={{ position: "relative" }}>
                <input
                  type="file"
                  id="pfile1"
                  onChange={(e) => {
                    var fileInput = document.getElementById("pfile1");
                    var filePath = fileInput.value;
                    // Allowing file type
                    var allowedExtensions = /(\.jpg|\.jpeg|\.gif|\.pdf|\.png)$/i;

                    if (!allowedExtensions.exec(filePath)) {
                      alert("File type not allowed");
                      return false;
                    } else {
                      var oururl = quizProblemFileUpload(document.getElementById("pfile1").files[0]);
                    }
                  }}
                  style={{
                    opacity: "0.0",
                    position: "absolute",
                    top: " 0",
                    left: " 0",
                    bottom: " 0",
                    right: " 0",
                    width: "100%",

                    cursor: "pointer",
                  }}
                />
                <i class="file alternate icon"></i>
                Add Problem File
              </button>
            }
            .jpg .png .pdf
            {problem.problemFile && problem.problemFile.includes("quizesimage") && (
              <div className="col">
                <div className="row-md-2 float-right"></div>
                <div className="row-md-10">
                  <img className="img-fluid w-4 h-2" src={problem.problemFile} />
                </div>
              </div>
            )}
            {problem.problemFile && problem.problemFile.includes("quizespdf") && (
              <div className="col">
                <div className="row-md-2 float-right">
                  <AiFillCloseCircle
                    onClick={(e) => {
                      setProblem({ ...problem, problemFile: "" });
                    }}
                    style={{
                      width: "30px",
                      height: "30px",
                      cursor: "pointer",
                    }}
                  />
                </div>
                <div style={{ height: "60vh", width: "100%" }}>
                  {/* <SlidePresentationExample
                    fileUrl={`https://bwengearticles.s3.us-west-1.amazonaws.com/quizespdf/4ea2de6424a80e154cd55b0f17f295dd.pdf`}
                  /> */}
                  <embed
                    type="application/pdf"
                    class="embed-responsive-item"
                    width="100%"
                    height="100%"
                    url={`https://bwengearticles.s3.us-west-1.amazonaws.com/quizespdf/4ea2de6424a80e154cd55b0f17f295dd.pdf`}
                  />
                  {/* <iframe src={`${question.questionFile}#toolbar=0`} height="200" width="300"></iframe> */}
                </div>
              </div>
            )}
          </div>
          <div className="ui raised segment">
            {renderMultipleProblemQuestions}
            <button
              className="ui yellow button"
              onClick={(e) => {
                setAddQuestionModal({ onOpen: true, method: "Add" });
              }}
            >
              Add Question
            </button>
          </div>
        </div>
      </div>
    );
  };
  const renderAddMultipleQuestionAction = () => {
    return (
      <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
        <div style={{ display: "flex", marginTop: "5px" }}></div>
        <div>
          <button
            onClick={(e) => {
              if (addMultipleQuestionModal.method === "Add") {
                var probs = assignment.problems;
                probs.push(problem);
                var mxu = 0;
                problem.questions.map((itp) => (mxu += itp.score));
                setAssignment({
                  ...assignment,
                  problems: probs,
                  maximumScore: assignment.maximumScore + mxu,
                });
                setProblem({
                  instruction: "",
                  problemFile: "",
                  questions: [],
                });
                setAddMultipleQuestionModal({ onOpen: false, method: "" });
                setQuestion({
                  type: "Multiple Choice",
                  questionQ: "",
                  answers: [],
                  correctAnswer: "",
                  score: 10,
                  fileRequired: false,
                });
                setAddQuestionModal({ onOpen: false, method: "" });
              } else if (addMultipleQuestionModal.method === "Delete") {
                var probs = assignment.problems;
                probs = probs.filter((prob) => prob !== question);
                setAssignment({
                  ...assignment,
                  problems: probs,
                  maximumScore: assignment.maximumScore - question.score,
                });
                setProblem({
                  instruction: "",
                  problemFile: "",
                  questions: [],
                });
                setQuestion({
                  type: "Multiple Choice",
                  questionQ: "",
                  answers: [],
                  correctAnswer: "",
                  score: 10,
                  instructions: "",
                });
                setAddQuestionModal({ onOpen: false, method: "" });
              } else if (addMultipleQuestionModal.method === "Edit") {
                var probs = assignment.problems;

                for (var i = 0; i < probs.length; i++) {
                  if (probs[i] === tobeEditedProb) {
                    probs[i] = problem;
                  }
                }
                setAssignment({
                  ...assignment,
                  problems: probs,
                  maximumScore: assignment.maximumScore - tobeEditedQst.score + question.score,
                });
                setProblem({
                  instruction: "",
                  problemFile: "",
                  questions: [],
                });
                setQuestion({
                  type: "Multiple Choice",
                  questionQ: "",
                  answers: [],
                  correctAnswer: "",
                  score: 10,
                  instructions: "",
                });
                setTobeEditedProb({});
                setAddMultipleQuestionModal({ onOpen: false, method: "" });
              }
            }}
            class="positive ui button"
          >
            {addMultipleQuestionModal.method} Question
          </button>
        </div>
      </div>
    );
  };

  var probnbr = 0;
  const renderAllQuestions = assignment.problems.map((proba) => {
    var cntQst = 0;
    probnbr++;
    return (
      <div className="ui segment">
        <div class="ui top attached label">
          <span>{probnbr}</span>
          <i
            class="trash alternate icon"
            onClick={(e) => {
              var probs = assignment.problems;
              probs = probs.filter((item) => item != proba);
              console.log(probs);
              setAssignment({ ...assignment, problems: probs });
            }}
            style={{ float: "right" }}
          ></i>
          {(proba.instruction || proba.problemFile) && (
            <i
              class="edit outline icon"
              onClick={(e) => {
                setProblem(proba);
                setTobeEditedProb(proba);
                setAddMultipleQuestionModal({ onOpen: true, method: "Edit" });
              }}
              style={{ float: "right" }}
            ></i>
          )}
        </div>

        {proba.questions.map((prob) => {
          cntQst++;
          return (
            <div className="questionDescriber">
              <div>
                <i
                  onClick={(e) => {
                    setQuestion(prob);
                    setAddQuestionModal({ onOpen: true, method: "Edit" });
                    setTobeEdited(prob);
                  }}
                  class="question circle icon"
                ></i>
                {cntQst}
              </div>
              <div
                className="questionlabel"
                onClick={(e) => {
                  setQuestion(prob);
                  setAddQuestionModal({ onOpen: true, method: "Edit" });
                  setTobeEdited(prob);
                }}
              >
                {renderHTML(prob.questionQ)}
              </div>
              <div className="scoreShower">{prob.score}pts</div>
              <div
                onClick={(e) => {
                  setQuestion(prob);

                  setAddQuestionModal({ onOpen: true, method: "Delete" });
                }}
              >
                <FaTrash />
              </div>
            </div>
          );
        })}
      </div>
    );
  });

  var cntQsti = 0;
  const renderMultipleProblemQuestions = problem.questions.map((prob) => {
    cntQsti++;
    return (
      <div className="questionDescriber">
        <div>
          <i
            onClick={(e) => {
              setQuestion(prob);
              setAddQuestionModal({ onOpen: true, method: "Edit" });
              setTobeEdited(prob);
            }}
            class="question circle icon"
          ></i>
          {cntQsti}
        </div>
        <div
          className="questionlabel"
          onClick={(e) => {
            setQuestion(prob);
            setAddQuestionModal({ onOpen: true, method: "Edit" });
            setTobeEdited(prob);
          }}
        >
          {renderHTML(prob.questionQ)}
        </div>
        <div className="scoreShower">{prob.score}pts</div>
        <div
          onClick={(e) => {
            setQuestion(prob);

            setAddQuestionModal({ onOpen: true, method: "Delete" });
          }}
        >
          <FaTrash />
        </div>
      </div>
    );
  });
  return (
    <div className="ui segment">
      <h2 class="ui header" style={{ display: "flex", justifyContent: "center", textDecoration: "underline" }}>
        Post Article
      </h2>
      <div className="ui form">
        <div className="field">
          <label>Title:</label>
          <input type="text" value={article.title} onChange={(e) => setArticle({ ...article, title: e.target.value })} />
        </div>
        <div className="field">
          <label>Field</label>
          <select
            onChange={(e) => {
              var self = e.target.value;
              console.log(self);
              setSelectedField(fields[self]);
              setArticle({ ...article, field: e.target.value, department: fields[self][0] ? fields[self][0] : "" });
            }}
          >
            {Object.keys(fields).map(function (key, index) {
              return <option className="item">{key}</option>;
            })}
          </select>
        </div>
        {selectedField[0] && (
          <div class="field">
            <label>Department</label>
            <div>
              <select onChange={(e) => setArticle({ ...article, department: e.target.value })}>
                {selectedField.map((item) => {
                  return <option className="item">{item}</option>;
                })}
              </select>
            </div>
          </div>
        )}
        <div class="field">
          <label>Article Tags:</label>
          <input
            type="text"
            value={item}
            onChange={(e) => {
              setitem(e.target.value);
            }}
          />
          <div className="postInfo instructors">
            {article.tags.map((item) => {
              return (
                <div className="mapItemsObj">
                  <span>{item}</span>
                  <i
                    className="close icon"
                    onClick={(e) => {
                      var tagos = article.tags;
                      tagos = tagos.filter((item) => item !== item);
                      setArticle({
                        ...article,
                        tags: tagos,
                      });
                    }}
                  ></i>
                </div>
              );
            })}
          </div>
          <button
            onClick={(e) => {
              if (item !== "") {
                var tagos = article.tags;
                tagos.push(item);
                setArticle({
                  ...article,
                  tags: tagos,
                });
                setitem("");
              }
            }}
            class="ui compact icon button"
            style={{ marginTop: "5px" }}
          >
            <i class="plus icon"></i>
            Add Tag
          </button>
        </div>
        <div className="field">
          <label>Article:</label>
          <div style={{ width: "80vw" }}>
            <div className="editor" onClick={focus} style={{ padding: "20px" }}>
              <Toolbar>
                {(externalProps) => (
                  <div className="icons-toolbar">
                    <HeadlineOneButton {...externalProps} />
                    <HeadlineTwoButton {...externalProps} />
                    <HeadlineThreeButton {...externalProps} />
                    <BoldButton {...externalProps} />
                    <ItalicButton {...externalProps} />
                    <UnderlineButton {...externalProps} />
                    <UnorderedListButton {...externalProps} />
                    <OrderedListButton {...externalProps} />
                    <BlockquoteButton {...externalProps} />
                    <CodeBlockButton {...externalProps} />
                    <textAlignmentPlugin.TextAlignment {...externalProps} />

                    {/* <AlignLeftOutlined onMouseDown={() => applyAlignment("left")} />
              <AlignCenterOutlined onMouseDown={() => applyAlignment("center")} />
              <AlignRightOutlined onMouseDown={() => applyAlignment("right")} /> */}
                  </div>
                )}
              </Toolbar>
              <Editor
                style={{ paddingTop: "20px" }}
                editorState={editorState}
                onChange={onChange}
                blockStyleFn={myBlockStyleFn}
                plugins={plugins}
                ref={editor}
              />
              <SideToolbar />
              <InlineToolbar />
            </div>
            {/* <VideoAdd editorState={editorState} onChange={onChange} modifier={videoPlugin.addVideo} /> */}
            <div className="options">
              <EmojiSelect closeOnEmojiSelect />
            </div>
          </div>
        </div>
      </div>
      {article.polls.length > 0 && (
        <div className="ui segment">
          Polls
          {article.polls.map((item) => {
            return (
              <div className="ui raised segment">
                <span
                  onClick={(e) => {
                    setPoll(item);
                    setPollModal(true);
                  }}
                >
                  {item.topic}
                </span>
                <i
                  className="ui close icon"
                  onClick={(e) => {
                    var pola = article.polls;
                    pola = pola.filter((itm) => itm != item);
                    setArticle({ ...article, polls: pola });
                  }}
                  style={{ float: "right" }}
                ></i>
              </div>
            );
          })}
        </div>
      )}
      {article.postArticleQuiz.problems && article.postArticleQuiz.problems.length > 0 && (
        <div className="ui segment">
          <div>
            <button
              onClick={(e) => {
                setAssignment(article.postArticleQuiz);
                setTobeEditedQuiz(article.postArticleQuiz);
                setAddQuizModal({ onOpen: true, method: "Edit" });
              }}
              class="ui compact icon button"
              style={{
                marginTop: "5px",
                backgroundColor: "rgb(31, 206, 206)",
                marginLeft: "5px",
              }}
            >
              <MdQuiz className="icon" />
              {article.postArticleQuiz.title}
            </button>
            <img
              onClick={(e) => {
                setAssignment(article.postArticleQuiz);
                setAddQuizModal({ onOpen: true, method: "Delete" });
              }}
              className="trashImage"
              src={trashImage}
              alt="trashImg"
              width={15}
              height={15}
            ></img>
          </div>
        </div>
      )}
      <button class="ui active button" onClick={(e) => setPollModal(true)}>
        <i class="balance scale icon"></i>
        Add Poll
      </button>
      {/* <button class="ui active button" onClick={(e) => setAddQuizModal({ method: "Add", onOpen: true })}>
        <i class="sitemap icon"></i> Add Post Article Quiz
      </button> */}
      <button className="ui primary button mt-4" onClick={(e) => onsubmitArticleHnadler(e)}>
        Submit Article
      </button>
      {addQuestionModal.onOpen && (
        <Modal
          title="Quiz Question"
          content={renderAddQuestionContent()}
          actions={renderAddQuestionAction()}
          onDismiss={(e) => setAddQuestionModal({ ...addQuestionModal, onOpen: false })}
        />
      )}
      {addMultipleQuestionModal.onOpen && (
        <FullscreenModal
          title="Quiz Set Of Questions"
          content={renderAddMultipleQuestionContent()}
          actions={renderAddMultipleQuestionAction()}
          onDismiss={(e) => setAddMultipleQuestionModal({ ...addQuestionModal, onOpen: false })}
        />
      )}
      {addQuizModal.onOpen && (
        <Modal
          title="Post-article Quiz Setup"
          onDismiss={(e) => setAddQuizModal({ ...quizModal, onOpen: false })}
          content={QuizContent()}
          actions={renderAddQuizActions()}
        />
      )}
      {pollModal && <Modal title="Poll Setup" actions={pollActions()} content={pollcontent()} onDismiss={(e) => setPollModal(false)} />}
      {addInstructionModal.onOpen && (
        <Modal
          title={`${assignment.title} Instructions`}
          content={setaddInstructionsModal()}
          onDismiss={() => setAddInstructionModal({ onOpen: false })}
          actions={setAddInstructionsActions()}
        />
      )}
    </div>
  );
};

export default CreateArticle;
