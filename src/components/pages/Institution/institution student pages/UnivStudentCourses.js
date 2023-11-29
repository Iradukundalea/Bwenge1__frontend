import React from "react";
import { useStudentsCourses } from "../hooks/useInstitutionSpocs";
import history from "../../../../Redux/actions/history";
import thekomp from "./../../../../thekomp";

const UnivStudentCourses = () => {
  const { data, loading, error } = useStudentsCourses(localStorage.getItem("userId"), localStorage.getItem("institution"));
  console.log({ data, loading, error });
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

  const mycourses = data.getStudentCourses;
  return (
    <div>
      <div className="ui link cards">
        {mycourses.map((item) => {
          return (
            <div
              class="card"
              onClick={(e) => {
                // var flag = false;
                // var theUsercrs;
                // for (var i = 0; i < usercourses.length; i++) {
                //   console.log(usercourses[i].course);
                //   console.log(item);
                //   if (usercourses[i].id===item.id) {
                //     console.log("here");
                //     flag = true;
                //     theUsercrs = usercourses[i];
                //   }
                // }
                // if (flag) {
                //   //  dispatch(selectMoocCourse(item))
                //   // dispatch(getCourseUserData(theUsercrs))
                history.push(`/indivmooc/${item.id}/content`);
                // } else {
                //   // dispatch(selectMoocCourse(item))
                //   history.push(`/coursedesc/${item.id}`);
                // }
              }}
            >
              <div class="image">
                <img src={`${thekomp}/${item.courseIcon}`} style={{ height: "290px", width: "290px" }} />
              </div>
              <div class="content">
                <div class="header">{item.spocTitle}</div>
                <div class="meta">
                  <a>{item.instructors[0].firstName + " " + item.instructors[0].lastName}</a>
                </div>
                <div class="description">{item.university}</div>
              </div>
              <div class="extra content">
                {/* <div class="ui two buttons">
                <div
                  class="ui basic green button"
                  onClick={(e) =>
                    history.push(`/indivcourseinstructor/${item.id}/students`)
                  }
                >
                  My Students
                </div>
                <div class="ui basic red button">Modify</div>
              </div> */}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UnivStudentCourses;
