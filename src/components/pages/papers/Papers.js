import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPapers, selectPaper } from "./../../../Redux/actions/index";
import Search from "../Home components/Search";
import "./styles/papers.css";
import history from "../../../Redux/actions/history";
import PrivateButton from "../../routing/PrivateButton";
import { useNavigate } from "react-router-dom";
import FilterField from "./components/FilterField";
import DisplayFilters from "./components/DisplayFilters";
import { useGetDiasporaProjects } from "./Hooks/usePaper";
const Papers = () => {
  //Filter Selected
  const [selectedFld, setSelectedFld] = useState([]);
  const [selectedDep, setSelectedDep] = useState([]);
  const [selectedYear, setSelectedYear] = useState([]);

  const dispatch = useDispatch();
  // const papers = useSelector((state) => state.papers);
  // const navigate = useNavigate();
  // useEffect(() => {
  //   dispatch(getAllPapers());
  // }, []);
  // console.log(papers);
  const getPaper = (paper) => {
    // console.log(paper);
    // dispatch(selectPaper(paper));
    if (!localStorage.getItem("authToken")) {
      alert("Please Login to view projects");
    } else {
      console.log("ok ok");
      history.push(`/project/${paper.id}`);
    }
  };
  const { loading, error, data } = useGetDiasporaProjects();
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
  const papers = data.getAllApprovedprojects;
  const renderPapers = papers.map((item) => {
    if (selectedFld.length !== 0) {
      if (selectedFld.includes(item.field)) {
        if (selectedDep.length !== 0) {
          if (selectedDep.includes(item.country))
            if (selectedYear.length !== 0) {
              if (selectedYear.includes(item.submissionDate.substr(0, 4)))
                return (
                  <tr onClick={(e) => getPaper(item)} style={{ cursor: "pointer" }}>
                    <td data-label="Title">{item.title}</td>
                    <td data-label="Authors">
                      {item.authors.map((author) => (
                        <p>{author}; </p>
                      ))}
                    </td>
                    <td data-label="Country">{item.country}</td>
                    <td data-label="Publication Date">{item.submissionDate.substr(0, 10)}</td>
                  </tr>
                );
            } else {
              return (
                <tr onClick={(e) => getPaper(item)} style={{ cursor: "pointer" }}>
                  <td data-label="Title">{item.title}</td>
                  <td data-label="Authors">
                    {item.authors.map((author) => (
                      <p>{author}; </p>
                    ))}
                  </td>
                  <td data-label="Country">{item.country}</td>
                  <td data-label="Publication Date">{item.submissionDate.substr(0, 10)}</td>
                </tr>
              );
            }
        } else {
          if (selectedYear.length !== 0) {
            if (selectedYear.includes(item.submissionDate.substr(0, 4)))
              return (
                <tr onClick={(e) => getPaper(item)} style={{ cursor: "pointer" }}>
                  <td data-label="Title">{item.title}</td>
                  <td data-label="Authors">
                    {item.authors.map((author) => (
                      <p>{author}; </p>
                    ))}
                  </td>
                  <td data-label="Country">{item.country}</td>
                  <td data-label="Publication Date">{item.submissionDate.substr(0, 10)}</td>
                </tr>
              );
          } else {
            return (
              <tr onClick={(e) => getPaper(item)} style={{ cursor: "pointer" }}>
                <td data-label="Title">{item.title}</td>
                <td data-label="Authors">
                  {item.authors.map((author) => (
                    <p>{author}; </p>
                  ))}
                </td>
                <td data-label="Country">{item.country}</td>
                <td data-label="Publication Date">{item.submissionDate.substr(0, 10)}</td>
              </tr>
            );
          }
        }
      }
    } else {
      if (selectedDep.length !== 0) {
        if (selectedDep.includes(item.country))
          if (selectedYear.length !== 0) {
            if (selectedYear.includes(item.submissionDate.substr(0, 4)))
              return (
                <tr onClick={(e) => getPaper(item)} style={{ cursor: "pointer" }}>
                  <td data-label="Title">{item.title}</td>
                  <td data-label="Authors">
                    {item.authors.map((author) => (
                      <p>{author}; </p>
                    ))}
                  </td>
                  <td data-label="Country">{item.country}</td>
                  <td data-label="Publication Date">{item.submissionDate.substr(0, 10)}</td>
                </tr>
              );
          } else {
            return (
              <tr onClick={(e) => getPaper(item)} style={{ cursor: "pointer" }}>
                <td data-label="Title">{item.title}</td>
                <td data-label="Authors">
                  {item.authors.map((author) => (
                    <p>{author}; </p>
                  ))}
                </td>
                <td data-label="Country">{item.country}</td>
                <td data-label="Publication Date">{item.submissionDate.substr(0, 10)}</td>
              </tr>
            );
          }
      } else {
        if (selectedYear.length !== 0) {
          if (selectedYear.includes(item.submissionDate.substr(0, 4)))
            return (
              <tr onClick={(e) => getPaper(item)} style={{ cursor: "pointer" }}>
                <td data-label="Title">{item.title}</td>
                <td data-label="Authors">
                  {item.authors.map((author) => (
                    <p>{author}; </p>
                  ))}
                </td>
                <td data-label="Country">{item.country}</td>
                <td data-label="Publication Date">{item.submissionDate.substr(0, 10)}</td>
              </tr>
            );
        } else {
          return (
            <tr onClick={(e) => getPaper(item)} style={{ cursor: "pointer" }}>
              <td data-label="Title">{item.title}</td>
              <td data-label="Authors">
                {item.authors.map((author) => (
                  <p>{author}; </p>
                ))}
              </td>
              <td data-label="Country">{item.country}</td>
              <td data-label="Publication Date">{item.submissionDate.substr(0, 10)}</td>
            </tr>
          );
        }
      }
    }
  });
  return (
    <div className="ui container">
      <Search />
      <FilterField
        papers={papers}
        selectedFld={selectedFld}
        setSelectedFld={setSelectedFld}
        selectedDep={selectedDep}
        setSelectedDep={setSelectedDep}
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
      />
      <DisplayFilters
        selectedFld={selectedFld}
        setSelectedFld={setSelectedFld}
        selectedDep={selectedDep}
        setSelectedDep={setSelectedDep}
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
      />

      <button
        onClick={(e) => {
          if (!localStorage.getItem("authToken")) {
            alert("Please Login first and Insert Your Project");
            return;
          }
          history.push("/insertproject");
        }}
        class="ui primary button"
        style={{ float: "right", marginRight: "40px" }}
      >
        Insert Project
      </button>

      <table className="ui celled table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Authors</th>
            <th>Country</th>
            <th>Submission Date</th>
          </tr>
        </thead>
        <tbody>{renderPapers}</tbody>
      </table>
    </div>
  );
};

export default Papers;
