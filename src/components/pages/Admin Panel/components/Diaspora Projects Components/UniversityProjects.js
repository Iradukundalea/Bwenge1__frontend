import React from "react";
import { useGetAdminUnivProjects } from "../../../papers/Hooks/useUnivProjects";
import SingleUnivProject from "./SingleUnivProject";
import history from "../../../../../Redux/actions/history";

const UniversityProjects = () => {
  const { data, loading, error } = useGetAdminUnivProjects();
  const queryParams = new URLSearchParams(window.location.search);
  const selectedproject = queryParams.get("projectid");
  if (selectedproject) {
    return <SingleUnivProject />;
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
  const papers = data.getAllUnivProjects;
  const renderPapers = papers.map((item) => {
    var bg = "white";
    if (!item.onApproved) {
      bg = "rgb(255, 109, 109";
    }
    return (
      <tr onClick={(e) => history.push(`?menu=projects&type=university&projectid=${item.id}`)} style={{ cursor: "pointer", backgroundColor: bg }}>
        <td>{item.title}</td>
        <td>
          {item.authors.map((author) => (
            <p>{author}; </p>
          ))}
        </td>
        <td>{item.university}</td>
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
            <th>University</th>
            <th>Submission Date</th>
            <th>onApproved</th>
          </tr>
        </thead>
        <tbody>{renderPapers}</tbody>
      </table>
    </div>
  );
};

export default UniversityProjects;
