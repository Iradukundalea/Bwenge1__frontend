import React, { useState } from "react";
import history from "../../../Redux/actions/history";
import "react-datepicker/dist/react-datepicker.css";
import "./styles/createpaper.css";
import axios from "axios";
import thekomp from "./../../../thekomp";
import Modal from "../../Modal";
import Error404 from "../../Error404";

const CreatePaper = () => {
  const [paper, setPaper] = useState({
    authors: [localStorage.getItem("lastName") + " " + localStorage.getItem("firstName")],
    title: "",
    abstract: "",
    country: "",
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
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("loading");
  const [author, setAuthor] = useState("");
  const [keyword, setKeyword] = useState("");

  console.log(paper.creator);

  var country_list = [
    "Afghanistan",
    "Albania",
    "Algeria",
    "Andorra",
    "Angola",
    "Anguilla",
    "Antigua &amp; Barbuda",
    "Argentina",
    "Armenia",
    "Aruba",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bermuda",
    "Bhutan",
    "Bolivia",
    "Bosnia &amp; Herzegovina",
    "Botswana",
    "Brazil",
    "British Virgin Islands",
    "Brunei",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cambodia",
    "Cameroon",
    "Cape Verde",
    "Cayman Islands",
    "Chad",
    "Chile",
    "China",
    "Colombia",
    "Congo",
    "Cook Islands",
    "Costa Rica",
    "Cote D Ivoire",
    "Croatia",
    "Cruise Ship",
    "Cuba",
    "Cyprus",
    "Czech Republic",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Estonia",
    "Ethiopia",
    "Falkland Islands",
    "Faroe Islands",
    "Fiji",
    "Finland",
    "France",
    "French Polynesia",
    "French West Indies",
    "Gabon",
    "Gambia",
    "Georgia",
    "Germany",
    "Ghana",
    "Gibraltar",
    "Greece",
    "Greenland",
    "Grenada",
    "Guam",
    "Guatemala",
    "Guernsey",
    "Guinea",
    "Guinea Bissau",
    "Guyana",
    "Haiti",
    "Honduras",
    "Hong Kong",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran",
    "Iraq",
    "Ireland",
    "Isle of Man",
    "Israel",
    "Italy",
    "Jamaica",
    "Japan",
    "Jersey",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kuwait",
    "Kyrgyz Republic",
    "Laos",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Macau",
    "Macedonia",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Mauritania",
    "Mauritius",
    "Mexico",
    "Moldova",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Montserrat",
    "Morocco",
    "Mozambique",
    "Namibia",
    "Nepal",
    "Netherlands",
    "Netherlands Antilles",
    "New Caledonia",
    "New Zealand",
    "Nicaragua",
    "Niger",
    "Nigeria",
    "Norway",
    "Oman",
    "Pakistan",
    "Palestine",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines",
    "Poland",
    "Portugal",
    "Puerto Rico",
    "Qatar",
    "Reunion",
    "Romania",
    "Russia",
    "Rwanda",
    "Saint Pierre &amp; Miquelon",
    "Samoa",
    "San Marino",
    "Satellite",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Slovakia",
    "Slovenia",
    "South Africa",
    "South Korea",
    "Spain",
    "Sri Lanka",
    "St Kitts &amp; Nevis",
    "St Lucia",
    "St Vincent",
    "St. Lucia",
    "Sudan",
    "Suriname",
    "Swaziland",
    "Sweden",
    "Switzerland",
    "Syria",
    "Taiwan",
    "Tajikistan",
    "Tanzania",
    "Thailand",
    "Timor L'Este",
    "Togo",
    "Tonga",
    "Trinidad &amp; Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Turks &amp; Caicos",
    "Uganda",
    "Ukraine",
    "United Arab Emirates",
    "United Kingdom",
    "Uruguay",
    "Uzbekistan",
    "Venezuela",
    "Vietnam",
    "Virgin Islands (US)",
    "Yemen",
    "Zambia",
    "Zimbabwe",
  ];

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
    if (paper.country) {
      formData.append("country", paper.country);
    } else {
      setError("country");
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
      url: `${thekomp}/paper/createpaper`,
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
          <label>Country</label>
          <select onChange={(e) => setPaper({ ...paper, country: e.target.value })}>
            {country_list.map((item) => {
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

          <input
            type="text"
            name="field"
            value={paper.field}
            onChange={(e) => {
              setPaper({ ...paper, field: e.target.value });
            }}
          />
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

export default CreatePaper;
