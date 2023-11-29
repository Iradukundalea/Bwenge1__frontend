import React, { useEffect } from "react";
import "./styles/filterField.css";
const FilterField = ({ papers, selectedFld, setSelectedFld, selectedDep, setSelectedDep, selectedYear, setSelectedYear }) => {
  const fields = papers.map((paper) => paper.field).filter((value, index, self) => self.indexOf(value) === index);
  console.log(selectedYear);
  useEffect(() => {}, [selectedFld, selectedDep, selectedYear]);

  const departments = papers
    .map((paper) => {
      if (selectedFld.length !== 0) {
        if (selectedFld.includes(paper.field)) return paper.department;
      } else {
        return paper.department;
      }
    })
    .filter((value, index, self) => self.indexOf(value) === index);
  const years = papers
    .map((paper) => {
      if (selectedDep.length !== 0) {
        if (selectedDep.includes(paper.department)) return paper.submissionDate.substr(0, 4);
      } else if (selectedFld.length !== 0) {
        if (selectedFld.includes(paper.field)) return paper.submissionDate.substr(0, 4);
      } else {
        return paper.submissionDate.substr(0, 4);
      }
    })
    .filter((value, index, self) => self.indexOf(value) === index);
  const countFilCrs = (fil) => {
    let count = 0;
    papers.map((paper) => {
      if (paper.field === fil) count++;
      return;
    });
    return count;
  };
  const countDepCrs = (dep) => {
    let count = 0;
    papers.map((paper) => {
      if (paper.department === dep) count++;
      return;
    });
    return count;
  };
  const countYearCrs = (year) => {
    let count = 0;
    papers.map((paper) => {
      if (paper.submissionDate.substr(0, 4) === year) {
        if (selectedDep.length !== 0) {
          if (selectedDep.includes(paper.department)) count++;
        } else if (selectedFld.length !== 0) {
          if (selectedFld.includes(paper.field)) count++;
        } else {
          count++;
        }
      }
      return;
    });
    return count;
  };
  return (
    <div className="filterTab">
      <div className="filterDropdown1">
        <div class="ui simple dropdown item">
          Fields
          <i class="dropdown icon"></i>
          <div class="menu">
            {fields.map((fil) => {
              if (fil)
                return (
                  <div className="item">
                    <div class="ui checkbox">
                      <input
                        type="checkbox"
                        checked={selectedFld.includes(fil)}
                        onClick={(e) => {
                          if (selectedFld.includes(fil)) {
                            setSelectedFld(selectedFld.filter((item) => item !== fil));
                          } else {
                            setSelectedFld([...selectedFld, fil]);
                          }
                        }}
                      />
                      <label>
                        {fil} <span className="countDepCrs">{countFilCrs(fil)}</span>
                      </label>
                    </div>
                  </div>
                );
            })}
          </div>
        </div>
      </div>
      {/* <div className="filterDropdown1">
        <div class="ui simple dropdown item">
          Departments
          <i class="dropdown icon"></i>
          <div class="menu">
            {departments.map((dep) => {
              if (dep)
                return (
                  <div className="item">
                    <div class="ui checkbox">
                      <input
                        type="checkbox"
                        checked={selectedDep.includes(dep)}
                        onClick={(e) => {
                          if (selectedDep.includes(dep)) {
                            setSelectedDep(selectedDep.filter((item) => item !== dep));
                          } else {
                            setSelectedDep([...selectedDep, dep]);
                          }
                        }}
                      />
                      <label>
                        {dep} <span className="countDepCrs">{countDepCrs(dep)}</span>
                      </label>
                    </div>
                  </div>
                );
            })}
          </div>
        </div>
      </div> */}
      <div className="filterDropdown1">
        <div class="ui simple dropdown item">
          Submission Year
          <i class="dropdown icon"></i>
          <div class="menu">
            {years.map((year) => {
              if (year)
                return (
                  <div className="item">
                    <div class="ui checkbox">
                      <input
                        type="checkbox"
                        checked={selectedYear.includes(year)}
                        onClick={(e) => {
                          if (selectedYear.includes(year)) {
                            setSelectedYear(selectedYear.filter((item) => item !== year));
                          } else {
                            setSelectedYear([...selectedYear, year]);
                          }
                        }}
                      />
                      <label>
                        {year} <span className="countDepCrs">{countYearCrs(year)}</span>
                      </label>
                    </div>
                  </div>
                );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterField;
