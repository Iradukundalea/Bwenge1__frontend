import React, { useState } from "react";
import CommunityContests from "./Admin panel components/CommunityContests";
import CommunityMembers from "./Admin panel components/CommunityMembers";

const CommunityAdminPanel = () => {
  const [selectedMenu, setSelectedMenu] = useState("members");

  return (
    <div className="ui segment">
      <div class="ui secondary pointing menu">
        <a class={selectedMenu == "members" ? "item active" : "item"} onClick={(e) => setSelectedMenu("members")}>
          Members
        </a>
        <a class={selectedMenu == "articles" ? "item active" : "item"} onClick={(e) => setSelectedMenu("articles")}>
          Ibyanditswe
        </a>
        <a class={selectedMenu == "qas" ? "item active" : "item"} onClick={(e) => setSelectedMenu("qas")}>
          Ibibazo/Ibitekerezo
        </a>
        <a class={selectedMenu == "contests" ? "item active" : "item"} onClick={(e) => setSelectedMenu("contests")}>
          Contests
        </a>
      </div>
      <div className="ui segment">
        {selectedMenu == "members" && <CommunityMembers />}
        {selectedMenu == "contests" && <CommunityContests />}
      </div>
    </div>
  );
};

export default CommunityAdminPanel;
