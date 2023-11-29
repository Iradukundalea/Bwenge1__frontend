import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
import history from "../../../Redux/actions/history";
import thekomp from "./../../../thekomp";
import Modal from "../../Modal";

const CreateCommunity = () => {
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
    "Professional Couching": [],
    "High School Coaching": [],
    Culture: [],
    Language: [],
  };
  const [selectedField, setSelectedField] = useState([]);

  const [community, setCommunity] = useState({
    title: "",
    description: "",
    field: "",
    department: "",
    type: "Learning community",
  });
  const [errorModal, setErrorModal] = useState("");
  const submitCommunityHandler = () => {
    console.log("ok");
    const creator = {
      creatorId: localStorage.getItem("userId"),
      email: localStorage.getItem("email"),
      firstName: localStorage.getItem("firstName"),
      lastName: localStorage.getItem("lastName"),
    };
    const formData = new FormData();
    if (!community.title) {
      setErrorModal("name");
      return;
    } else {
      formData.append("name", community.title);
    }
    if (!community.description) {
      setErrorModal("description");
      return;
    } else {
      formData.append("description", community.description);
    }
    if (!community.field) {
      setErrorModal("field");
      return;
    } else {
      formData.append("field", community.field);
    }
    if (!community.department) {
      setErrorModal("department");
      return;
    } else {
      formData.append("department", community.department);
    }
    if (!community.type) {
      setErrorModal("type");
      return;
    } else {
      formData.append("type", community.type);
    }
    formData.append("creator", JSON.stringify(creator));

    const config = {
      method: "post",
      url: `${thekomp}/community/createcommunity`,
      headers: {
        "content-type": "multipart/form-data",
      },
      data: formData,
    };
    axios(config)
      .then((res) => {
        alert("Your community has been created successfully, After being approved it will be available publicly! Thx.");
        history.push("/communities");
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };
  const errorContent = () => {
    return <h1>Please provide community's {errorModal}</h1>;
  };
  return (
    <div className="ui raised segment">
      <div className="ui form">
        <div className="field">
          <label>Title:</label>
          <input value={community.title} onChange={(e) => setCommunity({ ...community, title: e.target.value })} />
        </div>
        <div className="field">
          <label>Description:</label>
          <CKEditor
            editor={ClassicEditor}
            data={community.description}
            onChange={(event, editor) => {
              const data = editor.getData();
              setCommunity({ ...community, description: data });
            }}
          />
        </div>
        <div className="field">
          <label>Field:</label>
          <select
            onChange={(e) => {
              var self = e.target.value;
              console.log(self);
              setSelectedField(fields[self]);
              setCommunity({ ...community, field: e.target.value, department: fields[self][0] ? fields[self][0] : "" });
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
              <select onChange={(e) => setCommunity({ ...community, department: e.target.value })}>
                {selectedField.map((item) => {
                  return <option className="item">{item}</option>;
                })}
              </select>
            </div>
          </div>
        )}
        <div className="field">
          <label>Type:</label>
          <select onChange={(e) => setCommunity({ ...community, type: e.target.value })}>
            <option className="item" value="Learning community">
              Learning Community
            </option>
            <option className="item" value="Research community">
              Research Community
            </option>
          </select>
        </div>
        <div className="field">
          <button className="ui primary button" onClick={(e) => submitCommunityHandler()}>
            Create Community
          </button>
        </div>
      </div>
      {errorModal && <Modal title="Error encountered ...." content={errorContent()} />}
    </div>
  );
};

export default CreateCommunity;
