import React from "react";
import { useGetAdminDiasporaProjects } from "../../../papers/Hooks/usePaper";
import history from "../../../../../Redux/actions/history";
import SingleProject from "./SingleProject";

const DiasporaStudProjects = () => {
  const { data, loading, error } = useGetAdminDiasporaProjects();
  const queryParams = new URLSearchParams(window.location.search);
  const selectedproject = queryParams.get("projectid");
  if (selectedproject) {
    return <SingleProject />;
  }
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

  const papers = data.getAllProjects;
  const renderPapers = papers.map((item) => {
    var bg = "white";
    if (!item.onApproved) {
      bg = "rgb(255, 109, 109";
    }
    return (
      <tr onClick={(e) => history.push(`?menu=projects&type=diaspora&projectid=${item.id}`)} style={{ cursor: "pointer", backgroundColor: bg }}>
        <td>{item.title}</td>
        <td>
          {item.authors.map((author) => (
            <p>{author}; </p>
          ))}
        </td>
        <td>{item.country}</td>
        <td>{item.submissionDate.substr(0, 10)}</td>
        <td>{item.onApproved.toString()}</td>
      </tr>
    );
  });
  return (
    <div>
      <table className="ui celled table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Authors</th>
            <th>Country</th>
            <th>Submission Date</th>
            <th>onApproved</th>
          </tr>
        </thead>
        <tbody>{renderPapers}</tbody>
      </table>
    </div>
  );
};

export default DiasporaStudProjects;
