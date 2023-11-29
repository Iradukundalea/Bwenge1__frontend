import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCourseStudents } from "../../../../../Redux/actions";
import axios from "axios";
import * as xlsx from "xlsx";
import Modal from "../../../../Modal";
import { useParams } from "react-router-dom";
import { useMyStudentsData } from "../../hooks/useMoocInstructor";
import thekomp from "./../../../../../thekomp";

const Students = ({ courseId }) => {
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getCourseStudents(courseId));
  // }, []);
  // const students = useSelector((state) => state.courseStudents);
  // console.log(students);
  const [excelFile, setexcelFile] = useState("");
  const [json, setJson] = useState([]);
  const { id } = useParams();

  const [enrollStudentModal, setEnrollStudentModal] = useState(false);

  const { data, loading, error } = useMyStudentsData(id);

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
  console.log({ data, loading, error });
  const students = data.getAllInstructorData;

  const EnrollStudentTodb = (rowObject) => {
    console.log(id);
    console.log(rowObject);
    const formData = new FormData();
    formData.append("studentNumber", rowObject.studentNumber);
    formData.append("firstName", rowObject.firstName);
    formData.append("lastName", rowObject.lastName);
    formData.append("institutionName", localStorage.getItem("institution"));
    var url = `${thekomp}/enroll/enrollstudent/${id}`;
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
        window.location.reload(false);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
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
  const enrollStudentsContent = () => {
    return (
      <div>
        <input id="excel" type="file" onChange={(e) => setexcelFile(document.getElementById("excel").files[0])} />
        {excelFile && <button onClick={(e) => sendStudents()}>View Data</button>}
        {json && (
          <table className="ui celled table">
            <thead>
              <tr>
                <th></th>
                <th>Student Number</th>
                <th>firstName</th>
                <th>lastName</th>
              </tr>
            </thead>
            <tbody>
              {json.map((item) => (
                <tr>
                  <th></th>
                  <th>{item.studentNumber}</th>
                  <th>{item.firstName}</th>
                  <th>{item.lastName}</th>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  };
  const enrollStudentsActions = () => {
    return (
      <React.Fragment>
        <button
          onClick={(e) => {
            const rowObject = json;
            for (var i = 0; i < rowObject.length; i++) {
              EnrollStudentTodb(rowObject[i]);
            }
          }}
          class="ui primary button"
        >
          Save students
        </button>
      </React.Fragment>
    );
  };
  var stutn = 0;
  return (
    <div>
      <button onClick={(e) => setEnrollStudentModal(true)} class="ui inverted primary button">
        Enroll Students
      </button>
      <table className="ui celled table">
        <thead>
          <tr>
            <th></th>
            <th>Names</th>
            <th>Student Number</th>
            <th>Email</th>
            <th>Enrolled Date</th>
          </tr>
        </thead>
        <tbody>
          {students.map((stut) => {
            stutn++;
            return (
              <tr>
                <th>{stutn}</th>
                <th>{stut.lastName + " " + stut.firstName}</th>
                <th>{stut.studentNumber}</th>
                <th>{stut.email}</th>
                <th>{stut.enrolledDate.substr(0, 10)}</th>
              </tr>
            );
          })}
        </tbody>
      </table>
      {enrollStudentModal && (
        <Modal
          title="Enroll Students"
          onDismiss={(e) => setEnrollStudentModal(false)}
          content={enrollStudentsContent()}
          actions={enrollStudentsActions()}
        />
      )}
    </div>
  );
};

export default Students;
