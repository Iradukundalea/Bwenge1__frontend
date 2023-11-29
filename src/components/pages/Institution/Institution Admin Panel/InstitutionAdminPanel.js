import React from "react";
import history from "../../../../Redux/actions/history";
import { AiFillDatabase } from "react-icons/ai";
import { RiCustomerService2Fill } from "react-icons/ri";
import { FaUsers, FaSchool } from "react-icons/fa";
import { GiTeacher } from "react-icons/gi";
import Databases from "./components/Databases";
import Students from "./components/Students";
import Instructors from "./components/Instructors";
import Error404 from "../../../Error404";

const InstitutionAdminPanel = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const selectedMenu = queryParams.get("menu");
  console.log(localStorage.getItem("institutionRole"));
  if (localStorage.getItem("institutionRole") !== "admin") {
    return <Error404 />;
  }
  const renderContent = () => {
    switch (selectedMenu) {
      case "databases":
        return <Databases />;
      case "students":
        return <Students />;
      case "instructors":
        return <Instructors />;
      default:
        break;
    }
  };
  return (
    <div className="adminBody">
      <div className="toolbar">
        <div
          className="item"
          onClick={(e) => {
            history.push("?menu=databases");
            // setSelectedMenu("Databases");
          }}
        >
          <AiFillDatabase className="icon" />
          <span class={selectedMenu === "databases" ? "nontooltiptext" : "tooltiptext"}>Databases</span>
        </div>

        <div
          className="item"
          onClick={(e) => {
            history.push("?menu=students");

            // setSelectedMenu("Partners");
          }}
        >
          <FaUsers className="icon" />
          <span class={selectedMenu === "students" ? "nontooltiptext" : "tooltiptext"}>Students</span>
        </div>
        <div
          className="item"
          onClick={(e) => {
            history.push("?menu=instructors");
            // setSelectedMenu("Institutions");
          }}
        >
          <GiTeacher className="icon" />
          <span class={selectedMenu === "instructors" ? "nontooltiptext" : "tooltiptext"}>Instructors</span>
        </div>
      </div>
      <div>{renderContent()}</div>
    </div>
  );
};

export default InstitutionAdminPanel;
