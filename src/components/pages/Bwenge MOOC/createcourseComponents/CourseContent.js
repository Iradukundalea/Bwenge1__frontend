import React, { useState, useEffect } from "react";
import Modal from "./../../../Modal";
import VideoImage from "./../../../../imgs/video.svg";
import fileImage from "./../../../../imgs/file.svg";
import editImage from "./../../../../imgs/edit.svg";
import trashImage from "./../../../../imgs/trash.svg";
import { FaAngleDown, FaTrash } from "react-icons/fa";
import { MdQuiz } from "react-icons/md";
import renderHTML from "react-render-html";
import ReactPlayer from "react-player/lazy";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import _ from "lodash";
import DocsViewer from "../../../DocsViewer";
import DateTimeRangePicker from "@wojtekmaj/react-datetimerange-picker";
import "./styles/courseContent.css";
import { Checkbox } from "semantic-ui-react";
import { IoTrashBin } from "react-icons/io5";
import { AiFillCloseCircle } from "react-icons/ai";
import thekomp from "./../../../../thekomp";

import "./styles/courseContent.css";

const CourseContent = (props) => {
  const API = thekomp;
  const [chapter, setChapter] = useState({
    id: null,
    title: "",
    lectures: [],
    exam: [],
  });
  const [assignment, setAssignment] = useState({
    title: "",
    type: "",
    problems: [],
    maximumScore: 0,
    estimatedDuration: 10000,
    openTime: false,
    openTimeRange: [new Date(), new Date()],
    instructions: "",
  });

  const [lecture, setLecture] = useState({
    title: "",
    lectureFiles: [],
    assignment: [],
    quiz: [],
  });
  const [lectFile, setLectFile] = useState({
    title: "",
    fileLocation: "",
  });

  const [question, setQuestion] = useState({
    type: "Multiple Choice",
    questionQ: "",
    answers: [],
    questionFile: "",
    correctAnswer: "",
    score: 10,
    fileRequired: false,
  });
  const [addChapModal, setAddChapModal] = useState({
    onOpen: false,
    method: "",
    selectedChap: {},
  });
  const [addLectureModal, setAddLectureModal] = useState({
    onOpen: false,
    method: "",
    selectedLec: {},
  });
  const [addFileModal, setAddFileModal] = useState({
    onOpen: false,
    lecture: "",
  });
  const [addQuizModal, setAddQuizModal] = useState({
    onOpen: false,
    method: "",
  });
  const [onContentShow, setOnContentShow] = useState({});
  const [onContentShowChap, setOnContentShowChap] = useState({});
  const [addQuestionModal, setAddQuestionModal] = useState({
    onOpen: false,
    method: "",
  });
  const [answer, setAnswer] = useState("");
  const [addInstructionModal, setAddInstructionModal] = useState({
    onOpen: false,
  });
  const [pickRange, setPickRange] = useState([new Date(), new Date()]);

  const [tobeEditedQst, setTobeEdited] = useState({});
  const [tobeEditedQuiz, setTobeEditedQuiz] = useState({});

  useEffect(() => {
    setAssignment({ ...assignment, openTimeRange: pickRange });
  }, [pickRange]);

  const renderActions = () => {
    return (
      <React.Fragment>
        <button
          className="ui primary button"
          onClick={(e) => {
            if (addChapModal.method === "Add") {
              var { chapters } = props.MoocCourse;
              chapters.push(chapter);
              props.setMoocCourse({ ...props.MoocCourse, chapters: chapters });
              setAddChapModal({
                onOpen: false,
                method: "",
              });
              setChapter({
                id: null,
                title: "",
                lectures: [],
                exam: [],
              });
            } else if (addChapModal.method === "Edit") {
              var { chapters } = props.MoocCourse;
              for (var i = 0; i < chapters.length; i++) {
                if (chapters[i] === addChapModal.selectedChap) chapters[i] = chapter;
              }
              props.setMoocCourse({ ...props.MoocCourse, chapters: chapters });
              setAddChapModal({
                onOpen: false,
                method: "",
                selectedChap: {},
              });
              setChapter({
                id: null,
                title: "",
                lectures: [],
                exam: [],
              });
            } else if (addChapModal.method === "Delete") {
              var { chapters } = props.MoocCourse;
              const index = chapters.indexOf(chapter);
              if (index > -1) {
                chapters.splice(index, 1); // 2nd parameter means remove one item only
              }
              props.setMoocCourse({ ...props.MoocCourse, chapters: chapters });
              setAddChapModal({
                onOpen: false,
                method: "",
                selectedChap: {},
              });
              setChapter({
                id: null,
                title: "",
                lectures: [],
                exam: [],
              });
            }
          }}
        >
          {addChapModal.method}
        </button>
        <button onClick={() => setAddChapModal(false)} className="ui negative button">
          Cancel
        </button>
      </React.Fragment>
    );
  };

  const renderContent = () => {
    return (
      <React.Fragment>
        <div className="center">
          <div className="inputbox">
            <input
              type="text"
              name="title"
              value={chapter.title}
              onChange={(e) =>
                setChapter({
                  ...chapter,
                  title: e.target.value,
                  id: props.MoocCourse.chapters.length + 1,
                })
              }
            />
            <span>Chapter Title</span>
          </div>
        </div>
      </React.Fragment>
    );
  };
  const renderLectureActions = () => {
    return (
      <React.Fragment>
        <button
          className="ui primary button"
          onClick={(e) => {
            if (addLectureModal.method === "Add") {
              var { lectures } = chapter;
              lectures.push(lecture);
              setChapter({ ...chapter, lectures: lectures });
              var { chapters } = props.MoocCourse;
              chapters.map((chaptu) => {
                if (chaptu.title === chapter.title) {
                  chaptu = chapter;
                }
              });
              props.setMoocCourse({ ...props.MoocCourse, chapters: chapters });
              setAddLectureModal({
                onOpen: false,
              });
              setLecture({
                title: "",
                lectureFiles: [],
                assignment: [],
                quiz: [],
              });
              setChapter({
                id: null,
                title: "",
                lectures: [],
                exam: [],
              });
            } else if (addLectureModal.method === "Edit") {
              var { lectures } = chapter;
              for (var i = 0; i < lectures.length; i++) {
                if (lectures[i] === addLectureModal.selectedLec) lectures[i] = lecture;
              }
              setChapter({ ...chapter, lectures: lectures });
              var { chapters } = props.MoocCourse;
              chapters.map((chaptu) => {
                if (chaptu.title === chapter.title) {
                  chaptu = chapter;
                }
              });
              props.setMoocCourse({ ...props.MoocCourse, chapters: chapters });
              setAddLectureModal({
                onOpen: false,
              });
              setLecture({
                title: "",
                lectureFiles: [],
                assignment: [],
                quiz: [],
              });
              setChapter({
                id: null,
                title: "",
                lectures: [],
                exam: [],
              });
            } else if (addLectureModal.method === "Delete") {
              var { lectures } = chapter;
              var index = lectures.indexOf(lecture);
              if (index > -1) lectures.splice(index, 1);
              setChapter({ ...chapter, lectures: lectures });
              var { chapters } = props.MoocCourse;
              chapters.map((chaptu) => {
                if (chaptu.title === chapter.title) {
                  chaptu = chapter;
                }
              });
              props.setMoocCourse({ ...props.MoocCourse, chapters: chapters });
              setAddLectureModal({
                onOpen: false,
              });
              setLecture({
                title: "",
                lectureFiles: [],
                assignment: [],
                quiz: [],
              });
              setChapter({
                id: null,
                title: "",
                lectures: [],
                exam: [],
              });
            }
          }}
        >
          {addLectureModal.method}
        </button>
        <button onClick={() => setAddLectureModal({ onOpen: false })} className="ui negative button">
          Cancel
        </button>
      </React.Fragment>
    );
  };
  const renderLectureContent = () => {
    return (
      <React.Fragment>
        <div className="center">
          <div className="inputbox">
            <input type="text" name="title" value={lecture.title} onChange={(e) => setLecture({ ...lecture, title: e.target.value })} />
            <span>Lecture Title</span>
          </div>
        </div>
      </React.Fragment>
    );
  };
  const renderFileActions = () => {
    return (
      <React.Fragment>
        <button
          onClick={(e) => {
            var lecfiles = lecture.lectureFiles;
            lecfiles.push(lectFile);
            setLecture({ ...lecture, lectureFiles: lecfiles });
            var { lectures } = chapter;
            lectures = lectures.map((lec) => {
              if (lec.title === lecture.title) {
                lec.lectureFiles = lecture.lectureFiles;
              }
            });
            setChapter({ ...chapter, lectures: lectures });
            var { chapters } = props.MoocCourse;
            chapters.map((chaptu) => {
              if (chaptu.title === chapter.title) {
                chaptu = chapter;
              }
            });
            props.setMoocCourse({ ...props.MoocCourse, chapters: chapters });
            setLectFile({
              title: "",
              fileLocation: "",
            });
            // setLecture({
            //   title: "",
            //   lectureFiles: [],
            // });
            // setChapter({
            //   title: "",
            //   lectures: [],
            // });

            setAddFileModal({ onOpen: false, lecture: "" });
          }}
          className="ui primary button"
        >
          Add File
        </button>
        <button onClick={(e) => setAddFileModal({ onOpen: false, lecture: "" })} className="ui negative button">
          Cancel
        </button>
      </React.Fragment>
    );
  };
  const renderFileContent = () => {
    return (
      <div className="addContent" style={{ display: "flex" }}>
        <div className="AddFileItem" style={{ position: "relative", border: "1px black solid" }}>
          <input
            type="file"
            id="file1"
            onChange={(e) => {
              var fileInput = document.getElementById("file1");
              var filePath = fileInput.value;
              // Allowing file type
              var allowedExtensions = /(\.mp4|\.webm)$/i;

              if (!allowedExtensions.exec(filePath)) {
                alert("File type not video");
                return false;
              } else {
                // var lecfiles = lecture.lectureFiles;
                // lecfiles.push(document.getElementById("file1").files[0]);
                // setLecture({ ...lecture, lectureFiles: lecfiles });
                setLectFile({
                  title: document.getElementById("file1").files[0].name,
                  fileLocation: document.getElementById("file1").files[0],
                });
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

          <div style={{ padding: "5px" }}>
            <img src={VideoImage} alt="videpImg" width={35} height={35}></img>
          </div>
          <div className="txtItem">
            <span>Video</span>
          </div>
        </div>
        <div className="AddFileItem" style={{ position: "relative", border: "1px black solid" }}>
          <input
            type="file"
            id="file2"
            onChange={(e) => {
              var fileInput = document.getElementById("file2");

              var filePath = fileInput.value;

              // Allowing file type
              var allowedExtensions = /(\.doc|\.docx|\.odt|\.pdf|\.tex|\.txt|\.rtf|\.wps|\.wks|\.wpd|\.ppt|\.pptx)$/i;

              if (!allowedExtensions.exec(filePath)) {
                alert("Invalid File type");
                return false;
              } else {
                // var lecfiles = lecture.lectureFiles;
                // lecfiles.push(document.getElementById("file2").files[0]);
                // setLecture({ ...lecture, lectureFiles: lecfiles });
                setLectFile({
                  title: document.getElementById("file2").files[0].name,
                  fileLocation: document.getElementById("file2").files[0],
                });
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

          <div style={{ padding: "5px" }}>
            <img src={fileImage} alt="fileImg" width={35} height={35}></img>
          </div>
          <div className="txtItem">
            <span>File</span>
          </div>
        </div>
        <div className="ui form">
          <div class="field">
            <label>File Title: </label>
            <input type="text" value={lectFile.title} onChange={(e) => setLectFile({ ...lectFile, title: e.target.value })} />
          </div>
        </div>
      </div>
    );
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
          Add Question
        </button>
        <button
          onClick={(e) => {
            if (assignment.type === "Exam") {
              if (addQuizModal.method === "Add") {
                const examo = chapter.exam;
                examo.push(assignment);
                setChapter({ ...chapter, exam: examo });
                var chapterso = props.MoocCourse.chapters;
                chapterso.map((chaptu) => {
                  if (chaptu.title === chapter.title) {
                    chaptu = chapter;
                  }
                });
                props.setMoocCourse({
                  ...props.MoocCourse,
                  chapters: chapterso,
                });
                setChapter({
                  id: null,
                  title: "",
                  lectures: [],
                  exam: [],
                });
                setLecture({
                  title: "",
                  lectureFiles: [],
                  assignment: [],
                  quiz: [],
                });
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
                const examo = chapter.exam;
                for (var i = 0; i < examo.length; i++) {
                  if (examo[i] === tobeEditedQuiz) examo[i] = assignment;
                }
                setChapter({ ...chapter, exam: examo });
                var chapterso = props.MoocCourse.chapters;
                chapterso.map((chaptu) => {
                  if (chaptu.title === chapter.title) {
                    chaptu = chapter;
                  }
                });
                props.setMoocCourse({
                  ...props.MoocCourse,
                  chapters: chapterso,
                });
                setChapter({
                  id: null,
                  title: "",
                  lectures: [],
                  exam: [],
                });
                setLecture({
                  title: "",
                  lectureFiles: [],
                  assignment: [],
                  quiz: [],
                });
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
              } else if (addQuizModal.method === "Delete") {
                var examo = chapter.exam;
                examo = examo.filter((test) => {
                  if (test.title !== assignment.title) return test;
                });
                console.log(assignment);
                console.log(examo);
                var chaptero = chapter;
                chaptero.exam = examo;
                var chapterso = props.MoocCourse.chapters;
                chapterso.map((chaptu) => {
                  if (chaptu.title === chapter.title) {
                    chaptu = chaptero;
                  }
                });
                props.setMoocCourse({
                  ...props.MoocCourse,
                  chapters: chapterso,
                });
                setChapter({
                  id: null,
                  title: "",
                  lectures: [],
                  exam: [],
                });
                setLecture({
                  title: "",
                  lectureFiles: [],
                  assignment: [],
                  quiz: [],
                });
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
              }
            } else if (assignment.type === "Assignment") {
              if (addQuizModal.method === "Add") {
                var { lectures } = chapter;
                var assignom = lecture.assignment;
                assignom.push(assignment);
                setLecture({ ...lecture, assignment: assignom });
                lectures = lectures.map((lec) => {
                  if (lec.title === lecture.title) {
                    lec = lecture;
                  }
                });
                setChapter({ ...chapter, lectures: lectures });
                var { chapters } = props.MoocCourse;
                chapters.map((chaptu) => {
                  if (chaptu.title === chapter.title) {
                    chaptu = chapter;
                  }
                });
                props.setMoocCourse({
                  ...props.MoocCourse,
                  chapters: chapters,
                });
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
                setChapter({
                  id: null,
                  title: "",
                  lectures: [],
                  exam: [],
                });
                setLecture({
                  title: "",
                  lectureFiles: [],
                  assignment: [],
                  quiz: [],
                });
                setAddQuizModal({
                  onOpen: false,
                });
              } else if (addQuizModal.method === "Edit") {
                var { lectures } = chapter;
                var assignom = lecture.assignment;
                for (var i = 0; i < assignom.length; i++) {
                  if (assignom[i] === tobeEditedQuiz) assignom[i] = assignment;
                }
                setLecture({ ...lecture, assignment: assignom });
                lectures = lectures.map((lec) => {
                  if (lec.title === lecture.title) {
                    lec = lecture;
                  }
                });
                setChapter({ ...chapter, lectures: lectures });
                var { chapters } = props.MoocCourse;
                chapters.map((chaptu) => {
                  if (chaptu.title === chapter.title) {
                    chaptu = chapter;
                  }
                });
                props.setMoocCourse({
                  ...props.MoocCourse,
                  chapters: chapters,
                });
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
                setChapter({
                  id: null,
                  title: "",
                  lectures: [],
                  exam: [],
                });
                setLecture({
                  title: "",
                  lectureFiles: [],
                  assignment: [],
                  quiz: [],
                });
                setAddQuizModal({
                  onOpen: false,
                });
                setTobeEditedQuiz({});
              } else if (addQuizModal.method === "Delete") {
                var assignments = lecture.assignment;
                assignments = assignments.filter((test) => {
                  if (test.title !== assignment.title) return test;
                });
                var lecturero = chapter.lectures;

                for (var i = 0; i < lecturero.length; i++) {
                  if (lecturero[i].title == lecture.title) lecturero[i].assignment = assignments;
                }
                var chaptero = props.MoocCourse.chapters;

                for (var i = 0; i < chaptero.length; i++) {
                  if (chaptero[i].title == chapter.title) chaptero[i].lectures = lecturero;
                }
                props.setMoocCourse({
                  ...props.MoocCourse,
                  chapters: chaptero,
                });
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
                setChapter({
                  id: null,
                  title: "",
                  lectures: [],
                  exam: [],
                });
                setLecture({
                  title: "",
                  lectureFiles: [],
                  assignment: [],
                  quiz: [],
                });
                setAddQuizModal({
                  onOpen: false,
                });
                setTobeEditedQuiz({});
              }
            } else if (assignment.type === "Quiz") {
              if (addQuizModal.method === "Add") {
                var { lectures } = chapter;
                var assignom = lecture.quiz;
                assignom.push(assignment);
                setLecture({ ...lecture, quiz: assignom });
                lectures = lectures.map((lec) => {
                  if (lec.title === lecture.title) {
                    lec = lecture;
                  }
                });
                setChapter({ ...chapter, lectures: lectures });
                var { chapters } = props.MoocCourse;
                chapters.map((chaptu) => {
                  if (chaptu.title === chapter.title) {
                    chaptu = chapter;
                  }
                });
                props.setMoocCourse({
                  ...props.MoocCourse,
                  chapters: chapters,
                });
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
                setChapter({
                  id: null,
                  title: "",
                  lectures: [],
                  exam: [],
                });
                setLecture({
                  title: "",
                  lectureFiles: [],
                  assignment: [],
                  quiz: [],
                });
                setAddQuizModal({
                  onOpen: false,
                });
              } else if (addQuizModal.method === "Edit") {
                var { lectures } = chapter;
                var assignom = lecture.quiz;
                for (var i = 0; i < assignom.length; i++) {
                  if (assignom[i] === tobeEditedQuiz) assignom[i] = assignment;
                }
                setLecture({ ...lecture, assignment: assignom });
                lectures = lectures.map((lec) => {
                  if (lec.title === lecture.title) {
                    lec = lecture;
                  }
                });
                setChapter({ ...chapter, lectures: lectures });
                var { chapters } = props.MoocCourse;
                chapters.map((chaptu) => {
                  if (chaptu.title === chapter.title) {
                    chaptu = chapter;
                  }
                });
                props.setMoocCourse({
                  ...props.MoocCourse,
                  chapters: chapters,
                });
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
                setChapter({
                  id: null,
                  title: "",
                  lectures: [],
                  exam: [],
                });
                setLecture({
                  title: "",
                  lectureFiles: [],
                  assignment: [],
                  quiz: [],
                });
                setAddQuizModal({
                  onOpen: false,
                });
                setTobeEditedQuiz({});
              } else if (addQuizModal.method === "Delete") {
                var assignments = lecture.quiz;
                assignments = assignments.filter((test) => {
                  if (test.title !== assignment.title) return test;
                });
                var lecturero = chapter.lectures;

                for (var i = 0; i < lecturero.length; i++) {
                  if (lecturero[i].title == lecture.title) lecturero[i].quiz = assignments;
                }
                var chaptero = props.MoocCourse.chapters;

                for (var i = 0; i < chaptero.length; i++) {
                  if (chaptero[i].title == chapter.title) chaptero[i].lectures = lecturero;
                }
                props.setMoocCourse({
                  ...props.MoocCourse,
                  chapters: chaptero,
                });

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
                setChapter({
                  id: null,
                  title: "",
                  lectures: [],
                  exam: [],
                });
                setLecture({
                  title: "",
                  lectureFiles: [],
                  assignment: [],
                  quiz: [],
                });
                setAddQuizModal({
                  onOpen: false,
                });
                setTobeEditedQuiz({});
              }
            }
          }}
          class="ui compact icon button"
          style={{ marginTop: "5px", backgroundColor: "rgb(185, 211, 134)" }}
        >
          <i class="plus icon"></i>
          {addQuizModal.method} {assignment.type}
        </button>
      </div>
    );
  };
  var cntQst = 0;
  const renderAllQuestions = assignment.problems.map((prob) => {
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
  });

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
  const renderAddQuizContent = () => {
    return (
      <div style={{ display: "flex", flexDirection: "column", minHeight: "50vh" }}>
        <div className="ui raised segment" style={{ display: "grid", gridTemplateColumns: "50% 50%" }}>
          <div>Number Of Questions: {assignment.problems.length}</div>
          <div>Maximum Score: {_.sum(assignment.problems.map((prob) => prob.score))}</div>
        </div>
        <div style={{ overflowY: "scroll" }}>{renderAllQuestions}</div>
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
          <div style={{ display: "flex", marginTop: "5px" }}>
            <div>
              <Checkbox
                toggle
                checked={assignment.openTime}
                onChange={(e) => {
                  setAssignment({
                    ...assignment,
                    openTime: !assignment.openTime,
                  });
                }}
              />
            </div>

            <div style={{ marginLeft: "5px" }}>
              <label>Set Open Time</label>
            </div>
          </div>
        </div>
        <div style={{ margin: "5px" }}>
          {assignment.openTime && (
            <div className="ui field">
              <label style={{ marginRight: "5px", fontSize: "1.2rem" }}>Open Time Range:</label>
              <DateTimeRangePicker onChange={setPickRange} value={pickRange} />
            </div>
          )}
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

      case "Long Answer":
        return <div>This Question will be corrected by the instructor</div>;
    }
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
                <option class="item" value="Long Answer">
                  Long Answer Question/ Teacher manually correct
                </option>
              </select>
            </div>
          </div>
        </div>
        <div className="ui form">
          <div className="field">
            <label>Question: </label>
            {
              <button class="ui compact icon button">
                <input
                  type="file"
                  id="qfile1"
                  onChange={(e) => {
                    var fileInput = document.getElementById("qfile1");
                    var filePath = fileInput.value;
                    // Allowing file type
                    var allowedExtensions = /(\.jpg|\.pdf|\.png)$/i;

                    if (!allowedExtensions.exec(filePath)) {
                      alert("File type not allowed");
                      return false;
                    } else {
                      setQuestion({
                        ...question,
                        questionFile: document.getElementById("qfile1").files[0],
                      });
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
            {question.questionFile && question.questionFile.type === "application/pdf" && (
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
                  <iFrame class="embed-responsive-item" width="100%" height="100%" src={URL.createObjectURL(question.questionFile)} />

                  {/* <DocsViewer link={URL.createObjectURL(question.questionFile)} /> */}
                </div>
              </div>
            )}
            {question.questionFile && !question.questionFile.type && question.questionFile.substr(question.questionFile.length - 3, 3) == "pdf" && (
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
                  <iFrame class="embed-responsive-item" width="100%" height="100%" src={`${API}/${question.questionFile}`} />
                </div>
              </div>
            )}
            {question.questionFile && (question.questionFile.type === "image/jpeg" || question.questionFile.type === "image/png") && (
              <div className="col">
                <div className="row-md-2 float-right"></div>
                <div className="row-md-10">
                  <img className="img-fluid w-4 h-2" src={URL.createObjectURL(question.questionFile)} />
                </div>
              </div>
            )}
            {question.questionFile &&
              !question.questionFile.type &&
              (question.questionFile.substr(question.questionFile.length - 3, 3) == "jpg" ||
                question.questionFile.substr(question.questionFile.length - 3, 3) == "png") && (
                <div className="col">
                  <div className="row-md-2 float-right"></div>
                  <div className="row-md-10">
                    <img className="img-fluid w-4 h-2" src={`${API}/${question.questionFile}`} />
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
        <div style={{ display: "flex", marginTop: "5px" }}>
          <div>
            <Checkbox
              toggle
              checked={question.fileRequired}
              onChange={(e) => {
                setQuestion({ ...question, fileRequired: !question.fileRequired });
              }}
            />

            {/* <input
              onChecke={question.fileRequired}
              onChange={(e) => {
                setQuestion({ ...question, fileRequired: !question.fileRequired });
              }}
              type="checkbox"
            /> */}
          </div>

          <div style={{ marginLeft: "5px" }}>
            <label>Allow Add answer file</label>
          </div>
        </div>
        <div>
          <button
            onClick={(e) => {
              if (addQuestionModal.method === "Add") {
                var probs = assignment.problems;
                probs.push(question);
                setAssignment({
                  ...assignment,
                  problems: probs,
                  maximumScore: assignment.maximumScore + question.score,
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
              } else if (addQuestionModal.method === "Delete") {
                var probs = assignment.problems;
                probs = probs.filter((prob) => prob !== question);
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
                  fileRequired: false,
                });
                setAddQuestionModal({ onOpen: false, method: "" });
              } else if (addQuestionModal.method === "Edit") {
                var probs = assignment.problems;

                for (var i = 0; i < probs.length; i++) {
                  if (probs[i] === tobeEditedQst) {
                    probs[i] = question;
                  }
                }
                setAssignment({
                  ...assignment,
                  problems: probs,
                  maximumScore: assignment.maximumScore - tobeEditedQst.score + question.score,
                });
                setQuestion({
                  type: "Multiple Choice",
                  questionQ: "",
                  answers: [],
                  correctAnswer: "",
                  score: 10,
                  instructions: "",
                  fileRequired: false,
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
  const renderLectureFiles = (chapter, lectur, files) => {
    return files.map((file) => {
      if (file.fileLocation.type) {
        return (
          <div>
            {file.fileLocation.type === "video/mp4" && (
              <ReactPlayer url={URL.createObjectURL(file.fileLocation)} controls={true} width="70%" height="400px" />
            )}
            {file.fileLocation.type === "application/pdf" && (
              <div style={{ height: "60vh", width: "70%" }}>
                <iFrame class="embed-responsive-item" width="100%" height="100%" src={`${URL.createObjectURL(file.fileLocation)}`} />
                {/* <DocsViewer link={URL.createObjectURL(file.fileLocation)} /> */}
              </div>
            )}
            <div className="fileName">
              <div className="ui black label">{file.title}</div>
              <button
                onClick={() => {
                  var lecfiles = onContentShow.lectureFiles;

                  lecfiles = lecfiles.filter((filo) => filo !== file);
                  setOnContentShow({
                    ...onContentShow,
                    lectureFiles: lecfiles,
                  });
                  var lcts = onContentShowChap.lectures;

                  for (var i = 0; i < lcts.length; i++) {
                    if (lcts[i].title === onContentShow.title) {
                      lcts[i].lectureFiles = lecfiles;
                    }
                  }

                  setOnContentShowChap({
                    ...onContentShowChap,
                    lectures: lcts,
                  });

                  var { chapters } = props.MoocCourse;
                  chapters.map((chaptu) => {
                    if (chaptu.title === chapter.title) {
                      chaptu = onContentShowChap;
                    }
                  });
                  props.setMoocCourse({
                    ...props.MoocCourse,
                    chapters: chapters,
                  });
                }}
                className="negative ui button"
              >
                Remove file
              </button>
            </div>
          </div>
        );
      } else {
        return (
          <div>
            {(file.fileLocation.substr(file.fileLocation.length - 3, 3) === "mp4" ||
              file.fileLocation.substr(file.fileLocation.length - 4, 4) === "webm") && (
              // <ReactPlayer url={`${API}/${file.fileLocation}`} controls={true} width="70%" height="400px" />
              <video width="70%" height="400px" autoPlay="autoPlay" controls>
                <source type="video/mp4" src={`${API}/${file.fileLocation}`} />
              </video>
            )}
            {file.fileLocation.substr(file.fileLocation.length - 3, 3) === "pdf" && (
              <div style={{ height: "60vh", width: "70%" }}>
                {/* <DocsViewer link={`${API}/${file.fileLocation}`} /> */}
                <iFrame class="embed-responsive-item" width="100%" height="100%" src={`${API}/${file.fileLocation}`} />
              </div>
            )}
            <div className="fileName">
              <div className="ui black label">{file.title}</div>

              <button
                onClick={() => {
                  var lecfiles = onContentShow.lectureFiles;
                  lecfiles = lecfiles.filter((filo) => filo.id !== file.id);

                  setOnContentShow({
                    ...onContentShow,
                    lectureFiles: lecfiles,
                  });
                  var lcts = onContentShowChap.lectures;

                  for (var i = 0; i < lcts.length; i++) {
                    if (lcts[i].id === onContentShow.id) {
                      lcts[i].lectureFiles = lecfiles;
                    }
                  }

                  setOnContentShowChap({
                    ...onContentShowChap,
                    lectures: lcts,
                  });

                  var { chapters } = props.MoocCourse;
                  chapters.map((chaptu) => {
                    if (chaptu.title === onContentShowChap.title) {
                      chaptu = chapter;
                    }
                  });
                  props.setMoocCourse({
                    ...props.MoocCourse,
                    chapters: chapters,
                  });
                }}
                className="negative ui button"
              >
                Remove file
              </button>
            </div>
          </div>
        );
      }
    });
  };

  const renderChapters = () => {
    var count = 0;
    var countLec = 0;
    return props.MoocCourse.chapters.map((chapter) => {
      count++;
      return (
        <div class="ui raised segment chapterT item-container">
          <p>
            Chapter {count}: <span>{chapter.title}</span>
            <img
              onClick={(e) => {
                setAddChapModal({
                  onOpen: true,
                  method: "Edit",
                  selectedChap: chapter,
                });
                setChapter(chapter);
              }}
              className="editImage"
              src={editImage}
              alt="editImg"
              width={20}
              height={20}
            ></img>
            <img
              className="trashImage"
              onClick={(e) => {
                setAddChapModal({
                  onOpen: true,
                  method: "Delete",
                  selectedChap: chapter,
                });
                setChapter(chapter);
              }}
              src={trashImage}
              alt="trashImg"
              width={15}
              height={15}
            ></img>
          </p>
          <div>
            {chapter.lectures.length > 0 &&
              chapter.lectures.map((lectur) => {
                countLec++;
                return (
                  <div class="ui raised segment lectureT" style={{ backgroundColor: "lavender" }}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <div style={{ paddingTop: "5px" }}>
                        <p>
                          Lecture {countLec}: <span>{lectur.title}</span>
                          <img
                            onClick={(e) => {
                              setAddLectureModal({
                                onOpen: true,
                                method: "Edit",
                                selectedLec: lectur,
                              });
                              setLecture(lectur);
                              setChapter(chapter);
                            }}
                            className="editImage"
                            src={editImage}
                            alt="editImg"
                            width={20}
                            height={20}
                          ></img>
                          <img
                            onClick={(e) => {
                              setAddLectureModal({
                                onOpen: true,
                                method: "Delete",
                                selectedLec: lectur,
                              });
                              setLecture(lectur);
                              setChapter(chapter);
                            }}
                            className="trashImage"
                            src={trashImage}
                            alt="trashImg"
                            width={15}
                            height={15}
                          ></img>
                        </p>
                      </div>
                      {lectur.lectureFiles.length === 0 ? (
                        <div style={{ justifySelf: "flex-end" }}>
                          <button
                            onClick={(e) => {
                              setAddFileModal({
                                onOpen: true,
                                chapter: chapter.title,
                                lecture: lectur.title,
                              });
                              setLecture(lectur);
                              setChapter(chapter);
                            }}
                            class="ui compact icon button"
                            style={{
                              marginTop: "5px",
                              backgroundColor: "lightblue",
                            }}
                          >
                            <i class="plus icon"></i>
                            Content
                          </button>
                        </div>
                      ) : (
                        <div>
                          <FaAngleDown
                            className="dropicon"
                            onClick={(e) => {
                              setOnContentShow(lectur);
                              setOnContentShowChap(chapter);
                              //   setLecture(lectur);
                              //   setChapter(chapter);
                            }}
                          />
                        </div>
                      )}
                    </div>
                    {onContentShow.title === lectur.title && (
                      <div className="contentshow">
                        <div>{renderLectureFiles(chapter, lectur, lectur.lectureFiles)}</div>
                        <div>
                          {lectur.quiz !== undefined &&
                            lectur.quiz.map((quizi) => {
                              return (
                                <div>
                                  <button
                                    onClick={(e) => {
                                      setLecture(lectur);
                                      setChapter(chapter);
                                      setAssignment({
                                        ...quizi,
                                        type: "Quiz",
                                      });
                                      setTobeEditedQuiz(quizi);
                                      setAddQuizModal({
                                        onOpen: true,
                                        method: "Edit",
                                      });
                                    }}
                                    class="ui compact icon button"
                                    style={{
                                      marginTop: "5px",
                                      backgroundColor: "rgb(31, 206, 206)",
                                      marginLeft: "5px",
                                    }}
                                  >
                                    <MdQuiz className="icon" />
                                    {quizi.title}
                                  </button>
                                  <img
                                    onClick={(e) => {
                                      setLecture(lectur);
                                      setChapter(chapter);
                                      setAssignment({
                                        ...quizi,
                                        type: "Quiz",
                                      });
                                      setAddQuizModal({
                                        onOpen: true,
                                        method: "Delete",
                                      });
                                    }}
                                    className="trashImage"
                                    src={trashImage}
                                    alt="trashImg"
                                    width={15}
                                    height={15}
                                  ></img>
                                </div>
                              );
                            })}
                          {lectur.assignment !== undefined &&
                            lectur.assignment.map((quiz) => {
                              return (
                                <div>
                                  <button
                                    onClick={(e) => {
                                      setLecture(lectur);
                                      setChapter(chapter);
                                      setAssignment({
                                        ...quiz,
                                        type: "Assignment",
                                      });
                                      setTobeEditedQuiz(quiz);
                                      setAddQuizModal({
                                        onOpen: true,
                                        method: "Edit",
                                      });
                                    }}
                                    class="ui compact icon button"
                                    style={{
                                      marginTop: "5px",
                                      backgroundColor: "rgb(31, 206, 206)",
                                      marginLeft: "5px",
                                    }}
                                  >
                                    <MdQuiz className="icon" />
                                    {quiz.title}
                                  </button>
                                  <img
                                    onClick={(e) => {
                                      setLecture(lectur);
                                      setChapter(chapter);
                                      setAssignment({
                                        ...quiz,
                                        type: "Assignment",
                                      });
                                      setAddQuizModal({
                                        onOpen: true,
                                        method: "Delete",
                                      });
                                    }}
                                    className="trashImage"
                                    src={trashImage}
                                    alt="trashImg"
                                    width={15}
                                    height={15}
                                  ></img>
                                </div>
                              );
                            })}
                        </div>

                        <button
                          onClick={(e) => {
                            setAddQuizModal({ onOpen: true, method: "Add" });
                            setLecture(lectur);
                            setChapter(chapter);
                            setAssignment({
                              ...assignment,
                              title: `Chapter ${chapter.title} Lecture ${lectur.title} Quiz ${lectur.quiz.length + 1}`,
                              type: "Quiz",
                            });
                          }}
                          class="ui compact icon button"
                          style={{
                            marginTop: "5px",
                            backgroundColor: "rgb(250, 135, 115)",
                            marginLeft: "5px",
                          }}
                        >
                          <i class="plus icon"></i>
                          Add Quiz
                        </button>
                        <button
                          onClick={(e) => {
                            setAddQuizModal({ onOpen: true, method: "Add" });
                            setLecture(lectur);
                            setChapter(chapter);
                            setAssignment({
                              ...assignment,
                              title: `Chapter ${chapter.title} Lecture ${lectur.title} Assignment ${lectur.assignment.length + 1}`,
                              type: "Assignment",
                            });
                          }}
                          class="ui compact icon button"
                          style={{
                            marginTop: "5px",
                            backgroundColor: "rgb(250, 135, 115)",
                            marginLeft: "5px",
                          }}
                        >
                          <i class="plus icon"></i>
                          Add Assignment
                        </button>
                        <button
                          onClick={(e) => {
                            setAddFileModal({
                              onOpen: true,
                              chapter: chapter.title,
                              lecture: lectur.title,
                            });
                            setLecture(lectur);
                            setChapter(chapter);
                          }}
                          class="ui compact icon button"
                          style={{
                            marginTop: "5px",
                            backgroundColor: "lightblue",
                          }}
                        >
                          <i class="plus icon"></i>
                          Content
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            <button
              onClick={(e) => {
                setChapter(chapter);
                setLecture({
                  title: "",
                  lectureFiles: [],
                  assignment: [],
                  quiz: [],
                });
                setAddLectureModal({
                  onOpen: true,
                  method: "Add",
                });
              }}
              class="ui compact icon button"
              style={{
                marginTop: "5px",
                backgroundColor: "rgb(185, 211, 134)",
              }}
            >
              <i class="plus icon"></i>
              Add Lecture
            </button>
            {chapter.lectures.length > 0 && (
              <button
                onClick={(e) => {
                  setAddQuizModal({ onOpen: true, method: "Add" });
                  setAssignment({
                    ...assignment,
                    title: `Chapter ${chapter.title} Exam ${chapter.exam.length + 1}`,
                    type: "Exam",
                  });
                  setChapter(chapter);
                }}
                class="ui compact icon button"
                style={{
                  marginTop: "5px",
                  backgroundColor: "rgb(255, 238, 85)",
                  marginLeft: "5px",
                }}
              >
                <i class="plus icon"></i>
                Add Exam
              </button>
            )}
          </div>
          <div>
            {chapter.exam !== undefined &&
              chapter.exam.map((test) => {
                return (
                  <div>
                    <button
                      onClick={(e) => {
                        setChapter(chapter);
                        setAssignment({ ...test, type: "Exam" });
                        setTobeEditedQuiz(test);
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
                      {test.title}
                    </button>
                    <img
                      onClick={(e) => {
                        setChapter(chapter);
                        setAssignment({ ...test, type: "Exam" });
                        setAddQuizModal({ onOpen: true, method: "Delete" });
                      }}
                      className="trashImage"
                      src={trashImage}
                      alt="trashImg"
                      width={15}
                      height={15}
                    ></img>
                  </div>
                );
              })}
          </div>
        </div>
      );
    });
  };
  return (
    <div className="ui segment">
      <div className="list-container">{renderChapters()}</div>
      <button
        onClick={(e) => {
          setLecture({
            title: "",
            lectureFiles: [],
            assignment: [],
            quiz: [],
          });
          setChapter({
            id: null,
            title: "",
            lectures: [],
            exam: [],
          });
          setAddChapModal({
            onOpen: true,
            method: "Add",
          });
        }}
        class="ui compact icon button"
        style={{ marginTop: "5px" }}
      >
        <i class="plus icon"></i>
        Add Chapter
      </button>
      {addChapModal.onOpen && (
        <Modal
          title={`${addChapModal.method} Chapter`}
          content={renderContent()}
          onDismiss={() => setAddChapModal(false)}
          actions={renderActions()}
        />
      )}
      {addLectureModal.onOpen && (
        <Modal
          title={`${addLectureModal.method} Lecture`}
          content={renderLectureContent()}
          onDismiss={() => setAddLectureModal(false)}
          actions={renderLectureActions()}
        />
      )}
      {addFileModal.onOpen && (
        <Modal
          title={`Lecture: ${addFileModal.lecture}`}
          onDismiss={() => setAddFileModal({ onOpen: false, lecture: "" })}
          actions={renderFileActions()}
          content={renderFileContent()}
        />
      )}
      {addQuizModal.onOpen && (
        <Modal
          title={assignment.title}
          actions={renderAddQuizActions()}
          content={renderAddQuizContent()}
          onDismiss={() => {
            setAddQuizModal({ onOpen: false });
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
          }}
        />
      )}
      {addQuestionModal.onOpen && (
        <Modal
          title={`Question`}
          actions={renderAddQuestionAction()}
          onDismiss={() => {
            setQuestion({
              type: "Multiple Choice",
              questionQ: "",
              answers: [],
              correctAnswer: "",
              score: 10,
              instructions: "",
              fileRequired: false,
            });
            setAddQuestionModal({ onOpen: false });
          }}
          content={renderAddQuestionContent()}
        />
      )}
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

export default CourseContent;
