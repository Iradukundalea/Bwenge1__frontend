import React from "react";
import { AiFillDatabase } from "react-icons/ai";
import { RiCustomerService2Fill } from "react-icons/ri";
import { FaUsers, FaSchool } from "react-icons/fa";
import { FaPeopleCarry } from "react-icons/fa";
import { GiArchiveResearch } from "react-icons/gi";
import { MdCastForEducation } from "react-icons/md";
import communityIcon from "./../../../imgs/communities.png";
import { GrArticle } from "react-icons/gr";
import "./styles/adminpanel.css";
import DatabasesPage from "./components/DatabasesPage";
import ServicesPage from "./components/ServicesPage";
import PartnersPage from "./components/PartnersPage";
import InstitutionPage from "./components/InstitutionPage";
import history from "../../../Redux/actions/history";
import Error404 from "../../Error404";

import NsangizaPage from "./components/NsangizaPage";
import DiasporaProjects from "./components/DiasporaProjects";
import BwengeCourses from "./components/BwengeCourses";
import BwengeArticles from "./components/BwengeArticles";
import BwengeCommunity from "./components/BwengeCommunity";

const AdminPanel = () => {
  //   const [selectedMenu, setSelectedMenu] = useState("");
  const queryParams = new URLSearchParams(window.location.search);
  const selectedMenu = queryParams.get("menu");
  console.log(selectedMenu);
  const renderContent = () => {
    switch (selectedMenu) {
      case "Databases":
        return <DatabasesPage />;
      case "Services":
        return <ServicesPage />;
      case "Partners":
        return <PartnersPage />;
      case "Institutions":
        return <InstitutionPage />;
      case "nsangiza":
        return <NsangizaPage />;
      case "projects":
        return <DiasporaProjects />;
      case "bwengecourses":
        return <BwengeCourses />;
      case "bwengearticles":
        return <BwengeArticles />;
      case "bwengecommunity":
        return <BwengeCommunity />;
    }
  };
  if (localStorage.getItem("role") !== "admin") return <Error404 />;
  return (
    <div className="adminBody">
      <div className="toolbar">
        <div
          className="item"
          onClick={(e) => {
            history.push("?menu=Databases");
            // setSelectedMenu("Databases");
          }}
        >
          <AiFillDatabase className="icon" />
          <span class={selectedMenu === "Databases" ? "nontooltiptext" : "tooltiptext"}>Databases</span>
        </div>
        <div
          className="item"
          onClick={(e) => {
            history.push("?menu=Services");

            // setSelectedMenu("Services");
          }}
        >
          <RiCustomerService2Fill className="icon" />
          <span class={selectedMenu === "Services" ? "nontooltiptext" : "tooltiptext"}>Services</span>
        </div>
        <div
          className="item"
          onClick={(e) => {
            history.push("?menu=Partners");

            // setSelectedMenu("Partners");
          }}
        >
          <FaUsers className="icon" />
          <span class={selectedMenu === "Partners" ? "nontooltiptext" : "tooltiptext"}>Partners</span>
        </div>
        <div
          className="item"
          onClick={(e) => {
            history.push("?menu=Institutions");
            // setSelectedMenu("Institutions");
          }}
        >
          <FaSchool className="icon" />
          <span class={selectedMenu === "Institutions" ? "nontooltiptext" : "tooltiptext"}>Institutions</span>
        </div>
        <div
          className="item"
          onClick={(e) => {
            history.push("?menu=nsangiza");
            // setSelectedMenu("Institutions");
          }}
        >
          <FaPeopleCarry className="icon" />
          <span class={selectedMenu === "nsangiza" ? "nontooltiptext" : "tooltiptext"}>Nsangiza</span>
        </div>
        <div
          className="item"
          onClick={(e) => {
            history.push("?menu=projects&type=diaspora");
            // setSelectedMenu("Institutions");
          }}
        >
          <GiArchiveResearch className="icon" />
          <span class={selectedMenu === "projects" ? "nontooltiptext" : "tooltiptext"}>Projects</span>
        </div>
        <div
          className="item"
          onClick={(e) => {
            history.push("?menu=bwengecourses");
            // setSelectedMenu("Institutions");
          }}
        >
          <MdCastForEducation className="icon" />
          <span class={selectedMenu === "bwengecourses" ? "nontooltiptext" : "tooltiptext"}>Courses</span>
        </div>
        <div
          className="item"
          onClick={(e) => {
            history.push("?menu=bwengearticles");
            // setSelectedMenu("Institutions");
          }}
        >
          <GrArticle className="icon" />
          <span class={selectedMenu === "bwengearticles" ? "nontooltiptext" : "tooltiptext"}>Articles</span>
        </div>
        <div
          className="item"
          onClick={(e) => {
            history.push("?menu=bwengecommunity");
            // setSelectedMenu("Institutions");
          }}
        >
          <img src={communityIcon} className="icon" />
          <span class={selectedMenu === "bwengecommunity" ? "nontooltiptext" : "tooltiptext"}>Community</span>
        </div>
      </div>
      <div>{renderContent()}</div>
    </div>
  );
};

export default AdminPanel;
