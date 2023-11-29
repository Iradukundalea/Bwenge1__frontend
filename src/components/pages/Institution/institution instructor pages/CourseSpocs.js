import React, { useState, useEffect } from "react";
import { useIndivmoocTitle } from "../../Bwenge MOOC/hooks/useIndivMooc";
import "./styles/coursespocs.css";
import Modal from "../../../Modal";
import { useParams } from "react-router-dom";
import thekomp from "./../../../../thekomp";
import axios from "axios";
import history from "../../../../Redux/actions/history";
import { useGetAllCourseSpocs } from "../hooks/useInstitutionSpocs";
const CourseSpocs = () => {
  const [addspocModal, setAddSpocModal] = useState(false);
  const [addInstructorModal, setAddInstructorModal] = useState(false);

  const [spocinfo, setSpocInfo] = useState({
    title: "",
    startingDate: "",
    endDate: "",
    instructors: [],
  });
  const { id } = useParams();
  const { loading, data, error } = useIndivmoocTitle(id);
  const { loading1, data1, error1 } = useGetAllCourseSpocs(localStorage.getItem("userId"), id);
  useEffect(() => {
    if (data) {
      setSpocInfo({ ...spocinfo, instructors: data.getMooc.instructors });
    }
  }, [data]);

  if (loading || loading1) {
    return (
      <div class="ui segment">
        <div class="ui active inverted dimmer">
          <div class="ui text loader">Loading</div>
        </div>
        <p></p>
      </div>
    );
  }
  if (error || error1) {
    console.log(error);
    return <h2>{error.Error}</h2>;
  }

  const courseTitle = data.getMooc.title;
  const instructors = data.getMooc.instructors;

  const courseSpocs = data1.getAllSpocs;
  const addspocHandler = () => {
    const formData = new FormData();
    formData.append("spocTitle", spocinfo.title);
    formData.append("startingDate", spocinfo.startingDate);
    formData.append("endingDate", spocinfo.endDate);
    formData.append("instructors", JSON.stringify(spocinfo.instructors));
    const config = {
      method: "post",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      url: `${thekomp}/spoc/createspoc/${id}`,
      data: formData,
    };
    axios(config)
      .then((res) => {
        console.log(res);
        window.location.reload(false);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };
  const AddSpocContent = () => {
    return (
      <div className="center row ui form">
        <div className="field">
          <label>SPOC NAME:</label>

          <input
            type="text"
            name="Name"
            placeholder={`${courseTitle} ${new Date().getFullYear()}`}
            value={spocinfo.title}
            onChange={(e) => {
              setSpocInfo({ ...spocinfo, title: e.target.value });
            }}
          />
        </div>
        <div className="field">
          <label>Starting Date:</label>

          <input
            type="datetime-local"
            name="Name"
            // value={spocinfo.title}
            onChange={(e) => {
              var d = new Date(e.target.value);

              setSpocInfo({ ...spocinfo, startingDate: d });
            }}
          />
        </div>
        <div className="field">
          <label>Ending Date:</label>

          <input
            type="datetime-local"
            name="Name"
            // value={spocinfo.title}
            onChange={(e) => {
              var d = new Date(e.target.value);

              setSpocInfo({ ...spocinfo, endDate: d });
            }}
          />
        </div>
        <div className="field">
          <label>Instructors:</label>
          {spocinfo.instructors.map((instructor) => {
            return (
              <div className="mapItems">
                <span>
                  <i className="user circle icon"></i>
                  {instructor.firstName + " " + instructor.lastName}
                </span>
                {instructor.firstName !== localStorage.getItem("userfirstName") && instructor.lastName !== localStorage.getItem("userlastName") && (
                  <i
                    className="close icon"
                    onClick={(e) => {
                      var { instructors } = spocinfo;
                      instructors = instructors.filter((item) => item !== instructor);
                      setSpocInfo({ ...spocinfo, instructors: instructors });
                    }}
                  ></i>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };
  const AddSpocActions = () => {
    return (
      <div>
        <button onClick={(e) => addspocHandler()} class="ui right floated primary button m-2">
          Add SPOC
        </button>
      </div>
    );
  };
  return (
    <div className="coursespocs">
      <div>
        <button onClick={(e) => setAddSpocModal(true)} class="ui right floated primary button m-2">
          Add SPOC
        </button>
      </div>
      {courseSpocs && (
        <div className="ui link cards m-5">
          {courseSpocs.map((item) => {
            return (
              <div class="card">
                <div class="image">
                  <img src={`${thekomp}/${item.courseIcon}`} style={{ height: "290px", width: "290px" }} />
                </div>
                <div class="content">
                  <div class="header">{item.spocTitle}</div>
                  <div class="meta">
                    <a>{new Date(item.startingDate).toLocaleDateString() + " - " + new Date(item.endingDate).toLocaleDateString()}</a>
                  </div>
                  <div class="description">{item.university}</div>
                </div>
                <div class="extra content">
                  <div class="ui two buttons">
                    <div class="ui basic green button" onClick={(e) => history.push(`/indivcourseinstructor/${item.id}/students`)}>
                      My Students
                    </div>
                    <div onClick={(e) => history.push(`/editspoc/${item.id}`)} class="ui basic red button">
                      Modify
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {addspocModal && (
        <Modal title="Add SPOC Modal" content={AddSpocContent()} actions={AddSpocActions()} onDismiss={(e) => setAddSpocModal(false)} />
      )}
    </div>
  );
};

export default CourseSpocs;
