import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import history from "../../../Redux/actions/history";
import { deletePaper } from "../../../Redux/actions";
import PrivateButton from "../../routing/PrivateButton";
import { useParams } from "react-router-dom";
import "./styles/paper.css";
import { useGetSingleUnivProject } from "./Hooks/useUnivProjects";
import { FaUserAstronaut } from "react-icons/fa";

import thekomp from "./../../../thekomp";
const UnivProject = () => {
  var setBlank = "";
  const { id } = useParams();
  console.log(id);
  // const paper = useSelector((state) => state.selectedPaper);
  const { loading1, error1, data1 } = useGetSingleUnivProject(id);
  if (loading1) {
    return (
      <div class="ui segment">
        <div class="ui active inverted dimmer">
          <div class="ui text loader">Loading</div>
        </div>
        <p></p>
      </div>
    );
  }
  if (error1) {
    console.log(error1);
    return <h2>{error1.Error}</h2>;
  }
  const paper = data1.getUnivProject;
  console.log(paper);
  const downloadHandler = () => {
    if (!localStorage.getItem("authToken")) {
      setBlank = "";
      return `http://localhost:3000/login`;
    } else {
      setBlank = "_blank";
      return `http://13.59.38.98:5000/${paper.selectedFile}`;
    }
  };
  const renderDownloadOption = () => {
    return <div>sdcf</div>;
  };
  return (
    <div className="ui segment m-3">
      {/* <div className="journal">{paper.journal}</div> */}
      <div
        style={{
          fontWeight: "bold",
          textDecoration: "underline",
          fontSize: "2.5rem",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {paper.title}
      </div>
      <a
        class="ui label"
        onClick={(e) => history.push(`/userinfo/${paper.creator.creatorId}`)}
      >
        <FaUserAstronaut class="ui right spaced avatar image" />
        {paper.creator.lastName + " " + paper.creator.firstName}
      </a>
      <div className="authors">
        <h3>
          {paper.authors.map((author) => {
            return <>{author}; </>;
          })}
        </h3>
      </div>
      <div className="abstract rowInfo">
        <p>
          <span className="rowTitle">Abstract: </span>
          {paper.abstract}
        </p>
      </div>
      <div className="keywords rowInfo">
        <p>
          <span className="rowTitle">Keywords: </span>
          {paper.keywords.map((keyword) => {
            return <>{keyword}, </>;
          })}
        </p>
      </div>
      <div className="field rowInfo">
        <p>
          <span className="rowTitle">Field: </span>
          {paper.field}
        </p>
      </div>
      <div style={{ height: "60vh", width: "70%" }}>
        <iFrame
          class="embed-responsive-item"
          width="100%"
          height="100%"
          src={`${thekomp}/${paper.selectedFile}`}
        />
      </div>
    </div>
  );
};

export default UnivProject;
