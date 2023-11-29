import React, { useState } from "react";
import { useGetAdminDiasporaProjects } from "../../papers/Hooks/usePaper";
import Modal from "../../../Modal";
import history from "../../../../Redux/actions/history";
import DiasporaStudProjects from "./Diaspora Projects Components/DiasporaStudProjects";
import UniversityProjects from "./Diaspora Projects Components/UniversityProjects";

const DiasporaProjects = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const activeChoice = queryParams.get("type");
  console.log(activeChoice);

  return (
    <div className="ui segment">
      <div class="ui tabular menu">
        <a class={activeChoice == "diaspora" ? "item active" : "item"} onClick={(e) => history.push("?menu=projects&type=diaspora")}>
          Diaspora Projects
        </a>
        <a class={activeChoice == "university" ? "item active" : "item"} onClick={(e) => history.push("?menu=projects&type=university")}>
          University Projects
        </a>
      </div>
      {activeChoice == "diaspora" && <DiasporaStudProjects />}
      {activeChoice == "university" && <UniversityProjects />}
    </div>
  );
};

export default DiasporaProjects;
