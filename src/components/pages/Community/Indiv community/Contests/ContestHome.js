import React from "react";
import { useParams } from "react-router-dom";
import history from "../../../../../Redux/actions/history";
import CreateContest from "./CreateContest";

const ContestHome = () => {
  const { id } = useParams();

  return (
    <div>
      <button className="ui primary button" onClick={(e) => history.push(`/communitycontestcreate/${id}`)}>
        Create A contest
      </button>
    </div>
  );
};

export default ContestHome;
