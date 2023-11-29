import React from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import "./styles/filtercourse.css";

const FilterCourse = ({ courses, Field, selectedDep, setSelectedDep }) => {
  const Departs = courses.map((course) => course.department).filter((value, index, self) => self.indexOf(value) === index);
  console.log(selectedDep);

  const countDepCrs = (dep) => {
    let count = 0;
    courses.map((course) => {
      if (course.department === dep) count++;
      return;
    });
    return count;
  };
  return (
    <div className="filterDropdown">
      <div class="ui simple dropdown item">
        Departments
        <i class="dropdown icon"></i>
        <div class="menu" style={{ display: "grid", gridTemplateColumns: "50% 50%" }}>
          {courses
            .map((course) => {
              if (Field !== null && course.field === Field) return course.department;
              else if (Field === null) return course.department;
            })
            .filter((value, index, self) => self.indexOf(value) === index)
            .map((dep) => {
              if (dep)
                return (
                  <div className="item">
                    <div class="ui checkbox">
                      <input
                        type="checkbox"
                        name="example"
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
    </div>
  );
};

export default FilterCourse;
