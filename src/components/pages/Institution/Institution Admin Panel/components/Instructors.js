import React, { useState } from "react";
import Modal from "../../../../Modal";
import * as xlsx from "xlsx";
import axios from "axios";
import { useInstitutionInstructors } from "../../hooks/useInstitutionUserHooks";
import thekomp from "./../../../../../thekomp";

const Instructors = () => {
  const API = thekomp;
  const [excelFile, setexcelFile] = useState("");
  const [json, setJson] = useState([]);
  const [addOneInstructorModal, setAddOneInstructorModal] = useState(false);
  const [addManyInstructorsModal, setAddManyInstructorsModal] = useState(false);
  const [InstructorInfo, setInstructorInfo] = useState({
    prefix: "Prof.",
    firstName: "",
    lastName: "",
    gender: "Male",
    email: "",
    birthDate: new Date(),
    phoneNumber: "",
    role: "",
  });
  const { data, loading, error } = useInstitutionInstructors(localStorage.getItem("institution"));
  console.log({ data, loading, error });
  if (loading) {
    return (
      <div class="ui segment">
        <div class="ui active inverted dimmer">
          <div class="ui text loader">Loading</div>
        </div>
        <p></p>
      </div>
    );
  }
  if (error) {
    console.log(error);
    return <h2>{error.Error}</h2>;
  }
  const instructors = data.getInstitutionInstructors;
  const PostInstructorTodb = (rowObject) => {
    const institution = {
      institutionName: localStorage.getItem("institution"),
      institutionRole: rowObject.role,
    };
    const formData = new FormData();
    formData.append("prefix", rowObject.prefix);
    formData.append("firstName", rowObject.firstName);
    formData.append("lastName", rowObject.lastName);
    formData.append("gender", rowObject.gender);
    formData.append("email", rowObject.email);
    formData.append("phoneNumber", rowObject.phoneNumber);
    formData.append("birthDate", rowObject.birthDate);
    formData.append("password", rowObject.phoneNumber);
    formData.append("institution", JSON.stringify(institution));
    var url = `${thekomp}/auth/addinstitutionuser`;
    const config = {
      method: "post",
      url: url,
      Headers: {
        "Content-type": "multipart/form-data",
      },
      data: formData,
    };
    axios(config)
      .then((res) => {
        console.log(res);
        setAddOneInstructorModal(false);
        setAddManyInstructorsModal(false);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };

  const addOneInstructorContent = () => {
    return (
      <React.Fragment>
        <div className="center row ui form" style={{ display: "grid", gridTemplateColumns: "50% 50%" }}>
          <div className="field">
            <label>Prefix:</label>

            <div>
              <select
                onChange={(e) =>
                  setInstructorInfo({
                    ...InstructorInfo,
                    prefix: e.target.value,
                  })
                }
              >
                <option class="item" value="Dr.">
                  Prof.
                </option>
                <option class="item" value="Dr.">
                  Dr.
                </option>
                <option class="item" value="Mr.">
                  Mr.
                </option>
                <option class="item" value="Mrs.">
                  Mrs.
                </option>
                <option class="item" value="Ms.">
                  Ms.
                </option>
              </select>
            </div>
          </div>
          <div className="field">
            <label>First Name:</label>

            <input
              type="text"
              name="Name"
              value={InstructorInfo.firstName}
              onChange={(e) =>
                setInstructorInfo({
                  ...InstructorInfo,
                  firstName: e.target.value,
                })
              }
            />
          </div>
          <div className="field">
            <label>Last Name:</label>

            <input
              type="text"
              name="Name"
              value={InstructorInfo.lastName}
              onChange={(e) =>
                setInstructorInfo({
                  ...InstructorInfo,
                  lastName: e.target.value,
                })
              }
            />
          </div>
          <div class="field">
            <label>Gender:</label>

            <select
              onChange={(e) =>
                setInstructorInfo({
                  ...InstructorInfo,
                  gender: e.target.value,
                })
              }
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className="field">
            <label>Phone Number:</label>

            <input
              type="text"
              name="Name"
              value={InstructorInfo.phoneNumber}
              onChange={(e) =>
                setInstructorInfo({
                  ...InstructorInfo,
                  phoneNumber: e.target.value,
                })
              }
            />
          </div>
          <div className="field">
            <label>Date of Birth:</label>

            <input
              type="date"
              value={InstructorInfo.birthDate}
              onChange={(e) =>
                setInstructorInfo({
                  ...InstructorInfo,
                  birthDate: e.target.value,
                })
              }
            />
          </div>
          <div className="field">
            <label>Email:</label>
            <input
              type="text"
              name="Name"
              value={InstructorInfo.email}
              onChange={(e) => setInstructorInfo({ ...InstructorInfo, email: e.target.value })}
            />
          </div>

          <div className="field">
            <label>Instructor Role:</label>

            <div>
              <select onChange={(e) => setInstructorInfo({ ...InstructorInfo, role: e.target.value })}>
                <option class="item" value="Instructor">
                  Instructor
                </option>
                <option class="item" value="Assistant Instructor">
                  Assistant Instructor
                </option>
                <option class="item" value="Head of Department">
                  Head of Department
                </option>
              </select>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  };
  const addOneInstructorActions = () => {
    return (
      <React.Fragment>
        <button
          onClick={(e) => {
            PostInstructorTodb(InstructorInfo);
            window.location.reload(false);
          }}
          class="ui primary button"
        >
          Save instructor
        </button>
      </React.Fragment>
    );
  };
  const addManyInstructorsContent = () => {
    return (
      <div>
        <input id="excel" type="file" onChange={(e) => setexcelFile(document.getElementById("excel").files[0])} />
        {excelFile && <button onClick={(e) => sendInstructors()}>View data</button>}
        {json && (
          <table className="ui celled table">
            <thead>
              <tr>
                <th></th>
                <th>Prefix</th>
                <th>firstName</th>
                <th>lastName</th>
                <th>gender</th>
                <th>email</th>
                <th>Birth date</th>
                <th>phoneNumber</th>
                <th>role</th>
              </tr>
            </thead>
            <tbody>
              {json.map((item) => (
                <tr>
                  <th></th>
                  <th>{item.prefix}</th>
                  <th>{item.firstName}</th>
                  <th>{item.lastName}</th>
                  <th>{item.gender}</th>
                  <th>{item.email}</th>
                  <th>{item.birthDate.toLocaleDateString("en-US")}</th>
                  <th>{item.phoneNumber}</th>
                  <th>{item.role}</th>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  };
  const addManyInstructorsActions = () => {
    return (
      <React.Fragment>
        <button
          onClick={(e) => {
            const rowObject = json;
            for (var i = 0; i < rowObject.length; i++) {
              PostInstructorTodb(rowObject[i]);
            }
            window.location.reload(false);
          }}
          class="ui primary button"
        >
          Save instructors
        </button>
      </React.Fragment>
    );
  };
  const sendInstructors = () => {
    var fileReader = new FileReader();
    const f = excelFile;
    fileReader.onload = function (event) {
      var data = event.target.result;
      // console.log(data);
      var workbook = xlsx.read(data, {
        type: "binary",
        cellDates: true,
      });
      workbook.SheetNames.forEach((sheet) => {
        let rowObject = xlsx.utils.sheet_to_row_object_array(workbook.Sheets[sheet]);
        let jsonObject = JSON.stringify(rowObject);
        setJson(rowObject);
        console.log(rowObject);
      });
    };
    fileReader.readAsBinaryString(f);
  };
  return (
    <div className="ui segment">
      <div className="ui inverted segment">
        <button onClick={(e) => setAddOneInstructorModal(true)} class="ui inverted green button">
          Add an instructor
        </button>
        <button onClick={(e) => setAddManyInstructorsModal(true)} class="ui inverted green button">
          Add Many instructors
        </button>
      </div>
      <table className="ui celled table">
        <thead>
          <tr>
            <th></th>
            <th>Prefix</th>
            <th>firstName</th>
            <th>lastName</th>
            <th>gender</th>
            <th>email</th>
            <th>Birth date</th>
            <th>phoneNumber</th>
            <th>role</th>
          </tr>
        </thead>
        <tbody>
          {instructors.map((item) => (
            <tr>
              <th></th>
              <th>{item.prefix}</th>
              <th>{item.firstName}</th>
              <th>{item.lastName}</th>
              <th>{item.gender}</th>
              <th>{item.email}</th>
              <th>{item.birthDate.substr(0, 10)}</th>
              <th>{item.phoneNumber}</th>
              <th>{item.institution.institutionRole}</th>
            </tr>
          ))}
        </tbody>
      </table>
      {addOneInstructorModal && (
        <Modal
          title="Add one Instructor"
          onDismiss={(e) => setAddOneInstructorModal(false)}
          content={addOneInstructorContent()}
          actions={addOneInstructorActions()}
        />
      )}
      {addManyInstructorsModal && (
        <Modal
          title="Add many Instructors"
          onDismiss={(e) => setAddManyInstructorsModal(false)}
          content={addManyInstructorsContent()}
          actions={addManyInstructorsActions()}
        />
      )}
    </div>
  );
};

export default Instructors;
