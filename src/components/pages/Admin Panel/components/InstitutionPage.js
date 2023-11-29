import React, { useState } from "react";
import { useAllInstitutions } from "../hooks/useAllInstitution";
import Modal from "../../../Modal";
import axios from "axios";
import history from "../../../../Redux/actions/history";
import SingleInstitution from "./Institutions Components/SingleInstitution.js";
import thekomp from "./../../../../thekomp";

const InstitutionPage = () => {
  const { loading, error, data } = useAllInstitutions();
  const [showAddInstitutionModal, setShowAddInstitution] = useState(false);
  const [institution, setInstitution] = useState({
    InstitutionName: "",
    email: "",
  });
  const queryParams = new URLSearchParams(window.location.search);
  const selectedUniv = queryParams.get("name");
  console.log(selectedUniv);
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
  const universityEnrolled = data.getAllInstitutionsData;
  console.log(institution);

  if (selectedUniv) return <SingleInstitution />;

  const addInstitutionHandler = () => {
    const formData = new FormData();

    formData.append("name", institution.InstitutionName);
    formData.append("email", institution.email);
    var url = `${thekomp}/institution/enrollinstitution`;

    const config = {
      method: "post",
      url: url,
      headers: {
        "Content-type": "multipart/form-data",
      },
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

  const addInstitutionContent = () => {
    return (
      <React.Fragment>
        <div className="center">
          <div className="inputbox">
            <input
              type="text"
              name="Name"
              value={institution.InstitutionName}
              onChange={(e) =>
                setInstitution({
                  ...institution,
                  InstitutionName: e.target.value,
                })
              }
            />
            <span>Institution Name</span>
          </div>
          <div className="inputbox">
            <input
              type="text"
              name="Name"
              value={institution.email}
              onChange={(e) =>
                setInstitution({
                  ...institution,
                  email: e.target.value,
                })
              }
            />
            <span>Institution Email</span>
          </div>
        </div>
      </React.Fragment>
    );
  };
  const addInstitutionAction = () => {
    return (
      <React.Fragment>
        <button
          className="ui primary button"
          onClick={(e) => {
            addInstitutionHandler();
          }}
        >
          Add Institution
        </button>
        <button onClick={() => setShowAddInstitution(false)} className="ui negative button">
          Cancel
        </button>
      </React.Fragment>
    );
  };

  return (
    <div className="ui segment">
      <h1 class="ui header">Institutions Enrolled</h1>
      <table className="ui celled table">
        <thead>
          <tr>
            <th></th>
            <th>InstitutionName</th>
            <th>InstitutionEmail</th>
            <th>Enrolled Date</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {universityEnrolled.map((item) => {
            return (
              <tr>
                <th></th>
                <th>{item.InstitutionName}</th>
                <th>{item.InstitutionEmail}</th>
                <th>{item.enrolledDate}</th>
                <th>
                  <button onClick={(e) => history.push(`?menu=Institutions&name=${item.InstitutionName}`)} class="ui button">
                    Check Data
                  </button>
                </th>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button onClick={(e) => setShowAddInstitution(true)} class="ui primary button">
        Add Institution
      </button>
      {showAddInstitutionModal && (
        <Modal
          title="Add Institution"
          onDismiss={() => setShowAddInstitution(false)}
          content={addInstitutionContent()}
          actions={addInstitutionAction()}
        />
      )}
    </div>
  );
};

export default InstitutionPage;
