import React, { useState } from "react";
import { useInstitutionAdmin } from "../../hooks/useAllInstitution";
import Modal from "../../../../Modal";
import thekomp from "./../../../../../thekomp";
import axios from "axios";

const SingleInstitution = () => {
  const [showAddInstitutionAdminModal, setShowAddInstitutionAdmin] = useState(false);
  const [institutionAdmin, setInstitutionAdmin] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    gender: "Male",
    email: "",
    password: "",
    birthDate: "",
  });
  const queryParams = new URLSearchParams(window.location.search);
  const selectedUniv = queryParams.get("name");
  const { data, loading, error } = useInstitutionAdmin(selectedUniv);

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
  const admins = data.getInstitutionAdmins;

  const addInstitutionAdminHandler = () => {
    const institution = {
      institutionName: selectedUniv,
      institutionRole: "admin",
    };
    const formData = new FormData();
    formData.append("InstitutionName", selectedUniv);
    formData.append("firstName", institutionAdmin.firstName);
    formData.append("lastName", institutionAdmin.lastName);
    formData.append("email", institutionAdmin.email);
    formData.append("birthDate", institutionAdmin.birthDate);
    formData.append("gender", institutionAdmin.gender);
    formData.append("phoneNumber", institutionAdmin.phoneNumber);
    formData.append("password", institutionAdmin.phoneNumber);
    formData.append("institution", JSON.stringify(institution));
    var url = `${thekomp}/auth/addinstitutionuser`;
    const config = {
      method: "post",
      url: url,
      Headers: {
        "Content-type": "multipart/form-data",
      },
      data: formData,
    };
    axios(config)
      .then((res) => {
        window.location.reload(false);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };
  const addInstitutionAdminContent = () => {
    return (
      <React.Fragment>
        <div className="center row ui form" style={{ display: "grid", gridTemplateColumns: "50% 50%" }}>
          <div className="field">
            <label>First Name:</label>

            <input
              type="text"
              name="Name"
              value={institutionAdmin.firstName}
              onChange={(e) =>
                setInstitutionAdmin({
                  ...institutionAdmin,
                  firstName: e.target.value,
                })
              }
            />
          </div>
          <div className="field">
            <label>Last Name:</label>

            <input
              type="text"
              name="Name"
              value={institutionAdmin.lastName}
              onChange={(e) =>
                setInstitutionAdmin({
                  ...institutionAdmin,
                  lastName: e.target.value,
                })
              }
            />
          </div>
          <div className="field">
            <label>Phone Number:</label>

            <div class="ui labeled input">
              <div class="ui label">+250</div>
              <input
                type="text"
                name="Name"
                value={institutionAdmin.phoneNumber}
                onChange={(e) =>
                  setInstitutionAdmin({
                    ...institutionAdmin,
                    phoneNumber: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className="field">
            <label>Date of Birth:</label>

            <input
              type="date"
              value={institutionAdmin.birthDate}
              onChange={(e) =>
                setInstitutionAdmin({
                  ...institutionAdmin,
                  birthDate: e.target.value,
                })
              }
            />
          </div>
          <div class="field">
            <label>Gender:</label>

            <select
              onChange={(e) =>
                setInstitutionAdmin({
                  ...institutionAdmin,
                  gender: e.target.value,
                })
              }
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className="field">
            <label>Email:</label>
            <input
              type="text"
              name="Name"
              value={institutionAdmin.email}
              onChange={(e) =>
                setInstitutionAdmin({
                  ...institutionAdmin,
                  email: e.target.value,
                })
              }
            />
          </div>
        </div>
      </React.Fragment>
    );
  };
  const addInstitutionAdminAction = () => {
    return (
      <React.Fragment>
        <button
          className="ui primary button"
          onClick={(e) => {
            addInstitutionAdminHandler();
          }}
        >
          Add Institution Admin
        </button>
        <button onClick={() => setShowAddInstitutionAdmin(false)} className="ui negative button">
          Cancel
        </button>
      </React.Fragment>
    );
  };
  return (
    <div>
      <div className="ui inverted segment">
        <p>{selectedUniv}</p>
      </div>
      <div className="ui segment">
        <table className="ui celled table">
          <thead>
            <tr>
              <th></th>
              <th>firstName</th>
              <th>lastName</th>
              <th>gender</th>
              <th>Birth Date</th>
              <th>Phone number</th>
              <th>Email</th>
              <th>On Verified</th>
            </tr>
          </thead>
          <tbody>
            {admins &&
              admins.map((item) => {
                return (
                  <tr>
                    <th></th>
                    <th>{item.firstName}</th>
                    <th>{item.lastName}</th>
                    <th>{item.gender}</th>
                    <th>{item.birthDate.substr(0, 10)}</th>
                    <th>{item.phoneNumber}</th>
                    <th>{item.email}</th>
                    <th style={!item.institution.verified ? { color: "red" } : { color: "black" }}>{item.institution.verified.toString()}</th>
                    {/* <th>
                  <button
                    onClick={(e) =>
                      history.push(
                        `?menu=Institutions&name=${item.InstitutionName}`
                      )
                    }
                    class="ui button"
                  >
                    Check Data
                  </button>
                </th> */}
                  </tr>
                );
              })}
          </tbody>
        </table>
        <button onClick={(e) => setShowAddInstitutionAdmin(true)} class="ui primary button">
          Add Institution Admin
        </button>
      </div>
      {showAddInstitutionAdminModal && (
        <Modal
          title="Add Institution Admin"
          onDismiss={() => setShowAddInstitutionAdmin(false)}
          content={addInstitutionAdminContent()}
          actions={addInstitutionAdminAction()}
        />
      )}
    </div>
  );
};

export default SingleInstitution;
