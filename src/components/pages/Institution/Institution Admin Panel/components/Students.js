import React, { useState } from "react";
import axios from "axios";
import * as xlsx from "xlsx";
import Modal from "../../../../Modal";
import { useInstitutionStudents } from "../../hooks/useInstitutionUserHooks";
import thekomp from "./../../../../../thekomp";

const Students = () => {
  const [excelFile, setexcelFile] = useState("");
  const [json, setJson] = useState([]);
  const [addOneStudentModal, setAddOneStudentModal] = useState(false);
  const [addManyStudentsModal, setAddManyStudentsModal] = useState(false);
  const [studentInfo, setStudentInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    birthDate: new Date(),
    phoneNumber: "",
    gender: "Male",
    studentNumber: "",
    department: "",
    major: "",
    enrolledYear: 2022,
  });
  const { data, error, loading } = useInstitutionStudents(localStorage.getItem("institution"));
  console.log({ data, error, loading });
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
  const students = data.getInstitutionStudents;

  const PostStudentTodb = (rowObject) => {
    const institution = {
      institutionName: localStorage.getItem("institution"),
      studentNumber: rowObject.studentNumber,
      department: rowObject.department,
      major: rowObject.major,
      institutionRole: "Student",
      enrolledYear: rowObject.enrolledYear,
    };
    const formData = new FormData();
    formData.append("firstName", rowObject.firstName);
    formData.append("lastName", rowObject.lastName);
    formData.append("email", rowObject.email);
    formData.append("gender", rowObject.gender);
    formData.append("phoneNumber", rowObject.phoneNumber);
    formData.append("birthDate", rowObject.birthDate);
    formData.append("password", rowObject.studentNumber);
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
        setAddOneStudentModal(false);
        setAddManyStudentsModal(false);
        window.location.reload(false);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };
  const addOneStudentContent = () => {
    return (
      <React.Fragment>
        <div className="center row ui form" style={{ display: "grid", gridTemplateColumns: "50% 50%" }}>
          <div className="field">
            <label>First Name:</label>

            <input
              type="text"
              name="Name"
              value={studentInfo.firstName}
              onChange={(e) => setStudentInfo({ ...studentInfo, firstName: e.target.value })}
            />
          </div>
          <div className="field">
            <label>Last Name:</label>

            <input
              type="text"
              name="Name"
              value={studentInfo.lastName}
              onChange={(e) => setStudentInfo({ ...studentInfo, lastName: e.target.value })}
            />
          </div>
          <div class="field">
            <label>Gender:</label>

            <select onChange={(e) => setStudentInfo({ ...studentInfo, gender: e.target.value })}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className="field">
            <label>Phone Number:</label>

            <input
              type="text"
              name="Name"
              value={studentInfo.phoneNumber}
              onChange={(e) => setStudentInfo({ ...studentInfo, phoneNumber: e.target.value })}
            />
          </div>
          <div className="field">
            <label>Date of Birth:</label>

            <input type="date" value={studentInfo.birthDate} onChange={(e) => setStudentInfo({ ...studentInfo, birthDate: e.target.value })} />
          </div>
          <div className="field">
            <label>Email:</label>

            <input type="text" name="Name" value={studentInfo.email} onChange={(e) => setStudentInfo({ ...studentInfo, email: e.target.value })} />
          </div>
          <div className="field">
            <label>Student Number:</label>

            <input
              type="text"
              name="Name"
              value={studentInfo.studentNumber}
              onChange={(e) =>
                setStudentInfo({
                  ...studentInfo,
                  studentNumber: e.target.value,
                })
              }
            />
          </div>
          <div className="field">
            <label>Department:</label>

            <input
              type="text"
              name="Name"
              value={studentInfo.department}
              onChange={(e) => setStudentInfo({ ...studentInfo, department: e.target.value })}
            />
          </div>
          <div className="field">
            <label>Major:</label>

            <input type="text" name="Name" value={studentInfo.major} onChange={(e) => setStudentInfo({ ...studentInfo, major: e.target.value })} />
          </div>
          <div className="field">
            <label>Enrolled Year:</label>

            <input
              type="number"
              name="Name"
              value={studentInfo.enrolledYear}
              onChange={(e) => setStudentInfo({ ...studentInfo, enrolledYear: e.target.value })}
            />
          </div>
        </div>
      </React.Fragment>
    );
  };
  const addOneStudentActions = () => {
    return (
      <React.Fragment>
        <button onClick={(e) => PostStudentTodb(studentInfo)} class="ui primary button">
          Save student
        </button>
      </React.Fragment>
    );
  };

  const addManyStudentsContent = () => {
    return (
      <div>
        <input id="excel" type="file" onChange={(e) => setexcelFile(document.getElementById("excel").files[0])} />
        {excelFile && <button onClick={(e) => sendStudents()}>View Data</button>}
        {json && (
          <table className="ui celled table">
            <thead>
              <tr>
                <th></th>
                <th>firstName</th>
                <th>lastName</th>
                <th>gender</th>
                <th>email</th>
                <th>Birth date</th>
                <th>phoneNumber</th>
                <th>Student Number</th>
                <th>department</th>
                <th>major</th>
                <th>enrolledYear</th>
              </tr>
            </thead>
            <tbody>
              {json.map((item) => (
                <tr>
                  <th></th>
                  <th>{item.firstName}</th>
                  <th>{item.lastName}</th>
                  <th>{item.gender}</th>
                  <th>{item.email}</th>
                  <th>{item.birthDate.toLocaleDateString("en-US")}</th>
                  <th>{item.phoneNumber}</th>
                  <th>{item.studentNumber}</th>
                  <th>{item.department}</th>
                  <th>{item.major}</th>
                  <th>{item.enrolledYear}</th>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  };
  const addManyStudentsActions = () => {
    return (
      <React.Fragment>
        <button
          onClick={(e) => {
            const rowObject = json;
            for (var i = 0; i < rowObject.length; i++) {
              PostStudentTodb(rowObject[i]);
            }
          }}
          class="ui primary button"
        >
          Save students
        </button>
      </React.Fragment>
    );
  };
  const sendStudents = () => {
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
        <button onClick={(e) => setAddOneStudentModal(true)} class="ui inverted green button">
          Add a student
        </button>
        <button onClick={(e) => setAddManyStudentsModal(true)} class="ui inverted green button">
          Add Many Students
        </button>
      </div>
      <div>
        <table className="ui celled table">
          <thead>
            <tr>
              <th></th>
              <th>firstName</th>
              <th>lastName</th>
              <th>gender</th>
              <th>email</th>
              <th>Birth date</th>
              <th>phoneNumber</th>
              <th>Student Number</th>
              <th>department</th>
              <th>major</th>
              <th>enrolledYear</th>
            </tr>
          </thead>
          <tbody>
            {students.map((item) => (
              <tr>
                <th></th>
                <th>{item.firstName}</th>
                <th>{item.lastName}</th>
                <th>{item.gender}</th>
                <th>{item.email}</th>
                <th>{item.birthDate.substr(0, 10)}</th>
                <th>{item.phoneNumber}</th>
                <th>{item.institution.studentNumber}</th>
                <th>{item.institution.department}</th>
                <th>{item.institution.major}</th>
                <th>{item.institution.enrolledYear}</th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {addOneStudentModal && (
        <Modal
          title="Add one Student"
          onDismiss={(e) => setAddOneStudentModal(false)}
          content={addOneStudentContent()}
          actions={addOneStudentActions()}
        />
      )}
      {addManyStudentsModal && (
        <div>
          <Modal
            title="Add many Students"
            onDismiss={(e) => setAddManyStudentsModal(false)}
            content={addManyStudentsContent()}
            actions={addManyStudentsActions()}
            width="80vw"
          />
        </div>
      )}
    </div>
  );
};

export default Students;
