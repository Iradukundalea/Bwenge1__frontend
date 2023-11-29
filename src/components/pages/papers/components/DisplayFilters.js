import React from "react";
import "./styles/displayfilter.css";

const DisplayFilters = ({ selectedFld, setSelectedFld, selectedDep, setSelectedDep, selectedYear, setSelectedYear }) => {
  return (
    <div className="displayFilters">
      {selectedFld.map((fld) => {
        return (
          <div className="filterItem">
            <span>{fld}</span>
            <i
              className="close icon"
              onClick={(e) => {
                setSelectedFld(selectedFld.filter((item) => item !== fld));
              }}
            ></i>
          </div>
        );
      })}

      {selectedDep.map((dep) => {
        return (
          <div className="filterItem">
            <span>{dep}</span>
            <i
              className="close icon"
              onClick={(e) => {
                setSelectedDep(selectedDep.filter((item) => item !== dep));
              }}
            ></i>
          </div>
        );
      })}
      {selectedYear.map((year) => {
        return (
          <div className="filterItem">
            <span>{year}</span>
            <i
              className="close icon"
              onClick={(e) => {
                setSelectedYear(selectedYear.filter((item) => item !== year));
              }}
            ></i>
          </div>
        );
      })}
    </div>
  );
};

export default DisplayFilters;
