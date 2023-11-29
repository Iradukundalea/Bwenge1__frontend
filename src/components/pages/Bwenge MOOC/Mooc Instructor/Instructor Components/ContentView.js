import React, { useState } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

import { Bar, getElementAtEvent } from "react-chartjs-2";
import "./styles/contentView.css";
import { useIndivMoocContent } from "../../hooks/useIndivMooc";
import _ from "lodash";
import { useRef } from "react";
import { useInstructorCheckStudentContent } from "../../hooks/useMoocInstructor";
import { useIndivSpocContent } from "../../hooks/useIndivSpoc";

const ContentView = ({ courseId }) => {
  const [selectedFile, setSelectedFile] = useState("");
  const [studentCat, setStudentCat] = useState("");
  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
  const chartRef = useRef();
  const { loading, data, error } = useIndivSpocContent(courseId);
  const { loading1, data1, error1 } = useInstructorCheckStudentContent(courseId);
  console.log({ loading1, data1, error1 });
  if (loading || loading1) {
    return (
      <div class="ui segment">
        <div class="ui active inverted dimmer">
          <div class="ui text loader">Loading</div>
        </div>
        <p></p>
      </div>
    );
  }
  if (error || error1) {
    console.log(error);
    return <h2>{error.Error}</h2>;
  }

  const chaps = data.getSpoc.chapters;
  const userContents = data1.getAllInstructorData;
  console.log(userContents);

  const learnedStut = [];
  const notLearnedStut = [];
  if (selectedFile) {
    userContents.map((item) => {
      const watchedDtails = item.content.filter((cont) => {
        if (cont.Filetitle === selectedFile) {
          learnedStut.push({
            firstName: item.firstName,
            lastName: item.lastName,
            studentNumber: item.studentNumber,
            email: item.email,
            maxWatched: cont.maxWatched,
            contentDuration: cont.contentDuration,
            DateViewed: cont.DateViewed,
          });
          return cont;
        }
      });
      if (watchedDtails.length === 0) {
        notLearnedStut.push({
          firstName: item.firstName,
          lastName: item.lastName,
          studentNumber: item.studentNumber,
          email: item.email,
        });
      }
    });
  }
  console.log(learnedStut);
  console.log(notLearnedStut);
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Chart.js Bar Chart",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: userContents.length,
      },
    },
    // onClick: function (e) {
    //   var element = getElementAtEvent(chartRef.current, e);
    //   console.log(element);
    //   // changes only the color of the active object
    //   this.active[0]._chart.config.data.datasets[0].backgroundColor = "black";
    // },
  };

  const lecnames = chaps.map((chap) => chap.lectures.map((lec) => lec.lectureFiles.map((file) => file.title)));
  let unionLec = lecnames[0];
  lecnames.map((arr) => {
    unionLec = _.union(unionLec, arr);
  });
  let unionFile = unionLec[0];
  unionLec.map((arr) => {
    unionFile = _.union(unionFile, arr);
  });
  console.log(unionFile);
  let fileLocs = [];
  const lecnames1 = chaps.map((chap) => chap.lectures.map((lec) => lec.lectureFiles.map((file) => fileLocs.push(file.fileLocation))));
  console.log(fileLocs);
  let viewedSut = [];
  for (let i = 0; i < fileLocs.length; i++) {
    let k = 0;
    userContents.map((item) => {
      item.content.filter((cont) => {
        if (cont.Filetitle === fileLocs[i]) {
          k++;
          return cont;
        }
      });
    });
    viewedSut.push(k);
  }

  const labels = unionFile;
  const backgColor = Array(unionFile.length).fill("rgba(255, 99, 132, 0.5)");
  if (selectedFile)
    for (let i = 0; i < fileLocs.length; i++) {
      if (fileLocs[i] === selectedFile) backgColor[i] = "black";
    }
  console.log(
    JSON.stringify(selectedFile)
      .replace(/((^")|("$))/g, "")
      .trim()
  );
  console.log(fileLocs[1] === selectedFile);
  console.log(selectedFile);
  const datas = {
    labels,
    datasets: [
      {
        label: "Course Content",
        data: viewedSut,
        // barThickness: 6,
        minBarLength: 2,
        backgroundColor: backgColor,
      },
      // {
      //   label: "Dataset 2",
      //   data: [7, 6, 5, 4, 3, 2, 1],
      //   backgroundColor: "rgba(53, 162, 235, 0.5)",
      // },
    ],
  };
  const onBarClick = (event) => {
    if (getElementAtEvent(chartRef.current, event)[0]) {
      const datasetIndex = getElementAtEvent(chartRef.current, event)[0].index;

      let fileLoc;
      chaps.filter((chap) =>
        chap.lectures.filter((lec) =>
          lec.lectureFiles.filter((file) => {
            if (file.title === labels[datasetIndex]) fileLoc = file.fileLocation;
          })
        )
      );
      console.log(fileLoc);
      setSelectedFile(fileLoc);
      setStudentCat("watched");
    }
  };
  const renderStudentsContentData = () => {
    return (
      <div>
        <div class="ui pointing menu">
          <a class={`item ${studentCat === "watched" ? "active" : ""}`} onClick={(e) => setStudentCat("watched")}>
            Watched({learnedStut.length})
          </a>
          <a className={`item ${studentCat === "not watched" ? "active" : ""}`} onClick={(e) => setStudentCat("not watched")}>
            Not Watched({notLearnedStut.length})
          </a>
        </div>
        {studentCat === "watched" && (
          <div>
            <table className="ui celled table">
              <thead>
                <tr>
                  <th></th>
                  <th>Names</th>
                  <th>Student Number</th>
                  <th>Email</th>
                  <th>Date watched</th>
                  <th>Watched Duration</th>
                </tr>
              </thead>
              <tbody>
                {learnedStut.map((item) => {
                  return (
                    <tr>
                      <th></th>
                      <th>{item.lastName + " " + item.firstName}</th>
                      <th>{item.studentNumber}</th>
                      <th>{item.email}</th>
                      <th>
                        {item.DateViewed.substr(0, 10)} {item.DateViewed.substr(12, 4)}
                      </th>
                      <th>
                        {item.maxWatched}({Math.floor((item.maxWatched * 100) / item.contentDuration)}
                        %)
                      </th>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
        {studentCat === "not watched" && (
          <div>
            <table className="ui celled table">
              <thead>
                <tr>
                  <th></th>
                  <th>Names</th>
                  <th>Student Number</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {notLearnedStut.map((item) => {
                  return (
                    <tr>
                      <th></th>
                      <th>{item.lastName + " " + item.firstName}</th>
                      <th>{item.studentNumber}</th>
                      <th>{item.email}</th>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="instructContentView">
      <div>
        <Bar ref={chartRef} options={options} data={datas} onClick={onBarClick} />
      </div>
      <div>{selectedFile && renderStudentsContentData()}</div>
    </div>
  );
};

export default ContentView;
