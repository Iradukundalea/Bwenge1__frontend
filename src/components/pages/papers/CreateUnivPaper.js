import React, { useState } from "react";
import history from "../../../Redux/actions/history";
import "react-datepicker/dist/react-datepicker.css";
import "./styles/createpaper.css";
import axios from "axios";
import thekomp from "../../../thekomp";
import Modal from "../../Modal";
import Error404 from "../../Error404";

const CreateUnivPaper = () => {
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
    "High School Project": [],
    "Culture Project": [],
    "Language Project": [],
    "National Project": [],
  };
  const univs = [
    "UR-College of Agriculture and Veterinary Medicine (CAVM)",
    "UR-College of Arts and Social Sciences (CASS)",
    "UR- College of Business and Economics (CBE)",
    "UR -College of Education (CE)",
    "UR-College of Medicine and Health Sciences (CMHS)",
    "UR -College of Science and Technology (CST)",
    "Gishari Integrated Polytechnic (GIP)",
    "Institute of Legal Practice and Development (ILPD)",
    "Integrated Polytechnic Regional College Ngoma(IPRC-Ngoma)",
    "Integrated Polytechnic Regional College Kigali (IPRC-Kigali)",
    "Integrated Polytechnic Regional College Huye (IPRC-Hye)",
    "Integrated Polytechnic Regional College Karongi (IPRC-Karongi)",
    "Musanze Polytechnic College (Musanze Campus)",
    "Rwanda Teachers College (RTC)",
    "Integrated Polytechnic Regional College Tumba (IPRC-Tumba)",
    "Integrated Polytechnic Regional College Rusizi(IPRC-Rusizi)",
    "Byumba School of Nursing And Midwifery",
    "Kibungo School of Nursing And Midwifery",
    "Nyagatare School of Nursing And Midwifery",
    "Rwamagana School of Nursing",
    "Eastern African Christian College (EACC)",
    "Kigali Integrated College (KIC)",
    "University of Kigali (UoK) [4][5][6]",
    "Ruli Higher Institute of Health (RHIH) [7]",
    "University of Lay Adventists of Kigali (UNILAK)",
    "Adventist University of Central and East Africa (AUCA)",
    "African Leadership University (ALU)",
    "Akilah Institute for Women, Kigali (AIWK)",
    "Carnegie Mellon University Rwanda (CMUR)",
    "Catholic Institute of Kabgayi (ICK)",
    "Catholic University of Rwanda (CUR)",
    "Hanika Anglican Integrated Polytechnic (HAIP)",
    "University Of Kibungo (UNIK)",
    "Muhabura Integrated Polytechnic College (MIPC)",
    "Institute of Applied Sciences Ruhengeri (INES)",
    "Institut Superirieur Pedagogiqe de Gitwe (ISPG)",
    "Kibogora Polytechnic (KP)",
    "Kigali Independent University (ULK)",
    "KIM University",
    "Mount Kenya University",
    "Protestant Institute of Arts &amp; Social Sciences (PIASS)",
    "University of Tourism, Technology and Business Studies (UTB) [19]",
    "University of Technology and Arts of Byumba (UTAB)",
  ];
  const [paper, setPaper] = useState({
    authors: [localStorage.getItem("lastName") + " " + localStorage.getItem("firstName")],
    title: "",
    abstract: "",
    university: "",
    keywords: [],
    field: "",
    level: "Undergraduate",
    contacts: "",
    file: {},
    creator: {
      creatorId: localStorage.getItem("userId"),
      email: localStorage.getItem("email"),
      firstName: localStorage.getItem("firstName"),
      lastName: localStorage.getItem("lastName"),
    },
  });
  const [selectedField, setSelectedField] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("loading");
  const [author, setAuthor] = useState("");
  const [keyword, setKeyword] = useState("");

  console.log(paper.creator);

  const submitPaperHandler = async (e) => {
    e.preventDefault();

    var formData = new FormData();
    if (paper.authors.length > 0) {
      formData.append("authors", paper.authors);
    } else {
      setError("Author");
      return;
    }
    if (paper.title) {
      formData.append("title", paper.title);
    } else {
      setError("title");
      return;
    }
    if (paper.abstract) {
      formData.append("abstract", paper.abstract);
    } else {
      setError("Abstract");
      return;
    }
    if (paper.keywords.length > 0) {
      formData.append("keywords", paper.keywords);
    } else {
      setError("Keyword");
      return;
    }
    if (paper.level) {
      formData.append("level", paper.level);
    } else {
      setError("level");
      return;
    }
    if (paper.field) {
      formData.append("field", paper.field);
    } else {
      setError("field");
      return;
    }
    if (paper.university) {
      formData.append("university", paper.university);
    } else {
      setError("university");
      return;
    }
    if (paper.contacts) {
      formData.append("contacts", paper.contacts);
    } else {
      setError("contacts");
      return;
    }
    formData.append("creator", JSON.stringify(paper.creator));
    if (paper.file) {
      formData.append("selectedFile", paper.file);
    } else {
      setError("file");
      return;
    }
    console.log(formData);
    const config = {
      method: "post",
      url: `${thekomp}/paper/createunivproject`,
      headers: {
        "Content-type": "multipart/form-data",
      },
      data: formData,
    };
    axios(config)
      .then((res) => {
        console.log(res);
        alert("Project inserted, After being approved it will be available publicly! Thx.");
        history.push("/diasporaprojects");
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };
  const paperErrorModal = () => {
    return <div>Please set Project's {error}</div>;
  };
  if (!localStorage.getItem("authToken")) {
    return <Error404 />;
  }
  return (
    <div className="ui raised segment">
      <h2 class="ui header" style={{ display: "flex", justifyContent: "center", textDecoration: "underline" }}>
        Insert Project Form
      </h2>
      <div className="center ui form" style={{ display: "grid", gridTemplateColumns: "50% 50%", gridGap: "10px" }}>
        <div className="field">
          <label>Authors</label>
          <input
            name="authors"
            type="text"
            value={author}
            onChange={(e) => {
              setAuthor(e.target.value);
            }}
          />
          {paper.authors.map((item) => {
            return (
              <div className="mapItemsObj">
                <span>{item}</span>
                {item !== localStorage.getItem("userlastName") + " " + localStorage.getItem("userfirstName") && (
                  <i
                    className="close icon"
                    onClick={(e) => {
                      var { authors } = paper;
                      authors = authors.filter((itemt) => itemt !== item);
                      setPaper({ ...paper, authors: authors });
                    }}
                  ></i>
                )}
              </div>
            );
          })}
          <button
            onClick={(e) => {
              if (author !== "") {
                const { authors } = paper;
                authors.push(author);
                setPaper({ ...paper, authors: authors });
                setAuthor("");
              }
            }}
            class="ui labeled icon button"
            style={{ marginTop: "5px" }}
          >
            <i class="plus icon"></i>
            Add Author
          </button>
        </div>
        <div className="field">
          <label>Title</label>

          <input
            type="text"
            name="title"
            value={paper.title}
            onChange={(e) => {
              setPaper({ ...paper, title: e.target.value });
            }}
          />
        </div>
        <div className="field">
          <label>University</label>
          <select onChange={(e) => setPaper({ ...paper, university: e.target.value })}>
            {univs.map((item) => {
              return <option className="item">{item}</option>;
            })}
          </select>
        </div>

        <div className="field">
          <label>Abstract</label>

          <textarea
            name="abstract"
            value={paper.abstract}
            onChange={(e) => {
              setPaper({ ...paper, abstract: e.target.value });
            }}
          ></textarea>
        </div>
        <div className="field">
          <label>Level:</label>
          <div>
            <select onChange={(e) => setPaper({ ...paper, level: e.target.value })}>
              <option class="item" value="Undergraduate">
                Undergraduate
              </option>
              <option class="item" value="Postgraduate">
                Postgraduate
              </option>
            </select>
          </div>
        </div>

        <div className="field">
          <label>Keywords</label>

          <input
            name="authors"
            type="text"
            value={keyword}
            onChange={(e) => {
              setKeyword(e.target.value);
            }}
          />
          {paper.keywords.map((item) => {
            return (
              <div className="mapItemsObj">
                <span>{item}</span>
                <i
                  className="close icon"
                  onClick={(e) => {
                    var { keywords } = paper;
                    keywords = keywords.filter((itemt) => itemt !== item);
                    setPaper({ ...paper, keywords: keywords });
                  }}
                ></i>
              </div>
            );
          })}
          <button
            onClick={(e) => {
              if (keyword !== "") {
                const { keywords } = paper;
                keywords.push(keyword);

                setPaper({ ...paper, keywords });
                setKeyword("");
              }
            }}
            class="ui labeled icon button"
            style={{ marginTop: "5px" }}
          >
            <i class="plus icon"></i>
            Add Keyword
          </button>
        </div>

        <div className="field">
          <label>Field</label>

          <select
            onChange={(e) => {
              var self = e.target.value;
              console.log(self);
              setSelectedField(fields[self]);
              setPaper({ ...paper, field: e.target.value });
            }}
          >
            {Object.keys(fields).map(function (key, index) {
              return <option className="item">{key}</option>;
            })}
          </select>
        </div>
        <div className="field">
          <label>Contacts :</label>

          <textarea
            name="abstract"
            value={paper.contacts}
            onChange={(e) => {
              setPaper({ ...paper, contacts: e.target.value });
            }}
          ></textarea>
        </div>
        <div className="field">
          <label>Project File</label>

          <input
            type="file"
            name="selectedFile"
            id="whyLong"
            // value={paper.file}
            onChange={(e) => {
              // setPaper({...paper,file:e.target.value})
              setPaper({ ...paper, file: document.getElementById("whyLong").files[0] });
            }}
          />
        </div>
      </div>
      <button style={{ display: "flex", justifyContent: "center" }} className="ui primary button" onClick={(e) => submitPaperHandler(e)}>
        Submit Project
      </button>
      {error && <Modal title="Errors" content={paperErrorModal()} onDismiss={(e) => setError("")} />}
    </div>
  );
};

export default CreateUnivPaper;
