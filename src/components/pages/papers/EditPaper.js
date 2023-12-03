import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";

import history from "../../../Redux/actions/history";

import "react-datepicker/dist/react-datepicker.css";
import "./styles/createpaper.css";
import axios from "axios";

const EditPaper = () => {
  const selectedPaper = useSelector((state) => state.selectedPaper);

  const [paper, setPaper] = useState({
    authors: selectedPaper.authors.toString(),
    title: selectedPaper.title,
    abstract: selectedPaper.abstract,
    keywords: selectedPaper.keywords.toString(),
    journal: selectedPaper.journal,
    field: selectedPaper.field,
    department: selectedPaper.department,
    DateOfPublication: Date.parse(selectedPaper.PublicationDate),
    file: "",
    errors: "",
  });

  const dispatch = useDispatch();

  const submitPaperHandler = async (e) => {
    e.preventDefault();
    const authors = paper.authors.split(", ");
    const keywords = paper.keywords.split(", ");
    //     dispatch(createPaper({ title: paper.title, authors, journal: paper.journal, field: paper.field, keywords, abstract: paper.abstract, PublicationDate: paper.DateOfPublication, selectedFile: paper.file }))
    var formData = new FormData();
    formData.append("authors", authors);
    formData.append("title", paper.title);
    formData.append("journal", paper.journal);
    formData.append("abstract", paper.abstract);
    formData.append("keywords", keywords);
    formData.append("field", paper.field);
    formData.append("department", paper.department);
    formData.append("PublicationDate", paper.DateOfPublication);
    formData.append(
      "selectedFile",
      document.getElementById("whyLong").files[0]
    );
    const config = {
      method: "patch",
      url: `http://13.59.38.98:5000/paper/editpaper/${selectedPaper._id}`,
      headers: {
        "Content-type": "multipart/form-data",
      },
      data: formData,
    };
    axios(config)
      .then((res) => {
        console.log(res);
        history.push("/papers");
      })
      .catch((error) => {
        console.log(error.response.data.message);
        setPaper({ ...paper, errors: error.response.data.message });
        setTimeout(() => {
          setPaper({ ...paper, errors: "" });
        }, 5000);
      });
  };

  return (
    <div className="createpaperPage">
      <div className="center">
        <h1> Edit Paper</h1>
        <form
          onSubmit={submitPaperHandler}
          method="post"
          encType="multipart/formdata"
        >
          <div className="inputbox">
            <input
              name="authors"
              type="text"
              value={paper.authors}
              onChange={(e) => {
                setPaper({ ...paper, authors: e.target.value });
              }}
            />
            <span>Authors</span>
          </div>
          <div className="inputbox">
            <input
              type="text"
              name="title"
              value={paper.title}
              onChange={(e) => {
                setPaper({ ...paper, title: e.target.value });
              }}
            />
            <span>Title</span>
          </div>
          <div className="inputbox">
            <input
              type="text"
              name="journal"
              value={paper.journal}
              onChange={(e) => {
                setPaper({ ...paper, journal: e.target.value });
              }}
            />
            <span>Journals</span>
          </div>

          <div className="inputbox">
            <textarea
              name="abstract"
              value={paper.abstract}
              onChange={(e) => {
                setPaper({ ...paper, abstract: e.target.value });
              }}
            />
            <span>Abstract</span>
          </div>

          <div className="inputbox">
            <input
              type="text"
              name="keywords"
              value={paper.keywords}
              onChange={(e) => {
                setPaper({ ...paper, keywords: e.target.value });
              }}
            />
            <span>Keywords</span>
          </div>

          <div className="inputbox">
            <input
              type="text"
              name="field"
              value={paper.field}
              onChange={(e) => {
                setPaper({ ...paper, field: e.target.value });
              }}
            />
            <span>Field</span>
          </div>
          <div className="inputbox">
            <input
              type="text"
              name="department"
              value={paper.department}
              onChange={(e) => {
                setPaper({ ...paper, department: e.target.value });
              }}
            />
            <span>Department</span>
          </div>

          <div>
            <span className="indep">Date Of Publication</span>
            <DatePicker
              className="cal"
              selected={paper.DateOfPublication}
              onChange={(date) =>
                setPaper({ ...paper, DateOfPublication: date })
              }
            />
          </div>
          <div className="inputbox">
            <input
              type="file"
              name="selectedFile"
              id="whyLong"
              value={paper.file}
              onChange={(e) => {
                setPaper({ ...paper, file: e.target.value });
              }}
            />
            <span>Paper File</span>
          </div>
          <div class="inputbox">
            <input
              onClick={(e) => submitPaperHandler(e)}
              type="button"
              value="submit"
            />
          </div>
          {paper.errors && (
            <span className="error-message">{paper.errors}</span>
          )}
        </form>
      </div>
    </div>
  );
};

export default EditPaper;
