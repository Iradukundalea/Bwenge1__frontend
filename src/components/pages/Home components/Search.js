import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { searchPaper, searchCourse } from "../../../Redux/actions";
import "./styles/search.css";

const Search = () => {
  const [search, setSearch] = useState({
    option: "title",
    term: "",
    value: "Title",
  });
  const [crossDB, setCrossDB] = useState({
    papers: false,
    courses: false,
  });
  console.log(crossDB);
  const dispatch = useDispatch();
  const searchHandler = (e) => {
    e.preventDefault();
    if (crossDB.papers) dispatch(searchPaper(search));
    if (crossDB.courses) dispatch(searchCourse(search));
  };
  return (
    <div className="searchBar">
      <div class="ui labeled input">
        <div class="ui label searchlabel">
          <div class="ui simple dropdown item" value={search.option}>
            {search.value}
            <i class="dropdown icon"></i>
            <div class="menu">
              <div class="item" onClick={() => setSearch({ ...search, option: "title", value: "Title" })}>
                Title
              </div>
              <div class="item" onClick={() => setSearch({ ...search, option: "department", value: "Department" })}>
                Department
              </div>
              <div class="item" onClick={() => setSearch({ ...search, option: "author", value: "Author" })}>
                Author/instructor
              </div>
              <div class="item" onClick={() => setSearch({ ...search, option: "keyword", value: "Keyword" })}>
                Keyword
              </div>
            </div>
          </div>
        </div>
        <div class="ui icon input">
          <input className="theSearcharea" onChange={(e) => setSearch({ ...search, term: e.target.value })} type="text" placeholder="Search..." />
          <i style={{ marginTop: "5px" }} onClick={(e) => searchHandler(e)} class="inverted circular search link icon"></i>
        </div>
        <div className="checkboxes">
          <div class="ui checked checkbox">
            <input type="checkbox" onClick={(e) => setCrossDB({ ...crossDB, papers: !crossDB.papers })} />
            <label>Projects</label>
          </div>
          <div class="ui checked checkbox">
            <input type="checkbox" onClick={(e) => setCrossDB({ ...crossDB, courses: !crossDB.courses })} />
            <label>Courses</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
