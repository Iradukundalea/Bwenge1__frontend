import { useMutation } from "@apollo/client";
import React from "react";
import { useGetSinglePaperForAdmin } from "../../../papers/Hooks/usePaper";
import { approve_Project } from "../../hooks/useDiasporaProjects";
import thekomp from "./../../../../../thekomp";

const SingleProject = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const selectedproject = queryParams.get("projectid");
  const { loading1, error1, data1 } = useGetSinglePaperForAdmin(selectedproject);

  const [approve_Diasporaproject, { loading, data, error }] = useMutation(approve_Project);
  if (loading1) {
    return (
      <div class="ui segment">
        <div class="ui active inverted dimmer">
          <div class="ui text loader">Loading1</div>
        </div>
        <p></p>
      </div>
    );
  }
  if (error1) {
    console.log(error1);
    return <h2>{error1.Error}</h2>;
  }
  const project = data1.getProject;

  return (
    <div className="ui raised segment" style={{ minHeight: "100vh", overflow: "scroll" }}>
      <div className="field rowInfo">
        <p>
          <span className="rowTitle">Title: </span>
          {project.title}
        </p>
      </div>
      <div className="field rowInfo">
        <p>
          <span className="rowTitle">Authors: </span>
          {project.authors.map((author) => (
            <p>{author}; </p>
          ))}
        </p>
      </div>
      <div className="field rowInfo">
        <p>
          <span className="rowTitle">Abstract: </span>
          {project.abstract}
        </p>
      </div>
      <div className="field rowInfo">
        <p>
          <span className="rowTitle">Field: </span>
          {project.field}
        </p>
      </div>
      <div className="field rowInfo">
        <p>
          <span className="rowTitle">Level: </span>
          {project.level}
        </p>
      </div>
      <div className="field rowInfo">
        <p>
          <span className="rowTitle">Country: </span>
          {project.country}
        </p>
      </div>
      <div className="field rowInfo">
        <p>
          <span className="rowTitle">Contacts: </span>
          {project.contacts}
        </p>
      </div>
      <div className="field rowInfo">
        <p>
          <span className="rowTitle">Email: </span>
          {project.creator.email}
        </p>
      </div>
      <div className="field rowInfo">
        <p>
          <span className="rowTitle">Submission Date: </span>
          {project.submissionDate}
        </p>
      </div>
      <div className="field rowInfo">
        <p>
          <span className="rowTitle">onApproved: </span>
          {project.onApproved.toString()}
        </p>
      </div>
      <div className="field rowInfo">
        <p>
          <span className="rowTitle">Project File: </span>
        </p>
      </div>
      <iFrame style={{ height: "80vh", width: "80vw" }} src={`${thekomp}/${project.selectedFile}`} />
      {!project.onApproved && (
        <button
          onClick={(e) => {
            if (
              approve_Diasporaproject({
                variables: { approveProjectId: project.id },
              })
            ) {
              console.log("ok");
              window.location.reload(false);
            }
          }}
          style={{ position: "fixed", top: "20px", right: "20px" }}
          className="ui primary button"
        >
          Approve Project
        </button>
      )}
    </div>
  );
};

export default SingleProject;
