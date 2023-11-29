import React, { useState } from "react";
import axios from "axios";
import thekomp from "./../../../thekomp";

const RequestService = () => {
  const [service, setService] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    jobTitle: "",
    country: "",
    city: "",
    street: "",
    serviceType: "Academic Project Consultancy",
  });
  const onSubmitService = (e) => {
    e.preventDefault();
    const config = {
      method: "post",
      url: `${thekomp}/service/insertservice`,
      headers: {
        "Content-type": "application/json",
      },
      data: service,
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
  return (
    <div className="ui field">
      <div className="ui container ui segment" style={{ "margin-top": "30px", height: "700px" }}>
        <div class="ui large form">
          <div class="two fields">
            <div class="field">
              <label>First Name</label>
              <input
                onChange={(e) => {
                  setService({ ...service, firstName: e.target.value });
                }}
                placeholder="First Name"
                type="text"
                value={service.firstName}
              />
            </div>
            <div class="field">
              <label>Last Name</label>
              <input
                onChange={(e) => {
                  setService({ ...service, lastName: e.target.value });
                }}
                placeholder="Last Name"
                type="text"
                value={service.lastName}
              />
            </div>
          </div>
          <div className="three fields">
            <div class="field">
              <label>Email</label>
              <input
                onChange={(e) => {
                  setService({ ...service, email: e.target.value });
                }}
                placeholder="email"
                type="text"
                value={service.email}
              />
            </div>
            <div class="field">
              <label>Phone Number</label>
              <input
                onChange={(e) => {
                  setService({ ...service, phoneNumber: e.target.value });
                }}
                placeholder="Phone number"
                type="tel"
                value={service.phoneNumber}
              />
            </div>
            <div class="field">
              <label>Job Title</label>
              <input
                onChange={(e) => {
                  setService({ ...service, jobTitle: e.target.value });
                }}
                placeholder="jobTitle"
                type="text"
                value={service.jobTitle}
              />
            </div>
          </div>
          <div className="three fields">
            <div class="field">
              <label>Country</label>
              <input
                onChange={(e) => {
                  setService({ ...service, country: e.target.value });
                }}
                placeholder="country"
                type="text"
                value={service.country}
              />
            </div>
            <div class="field">
              <label>City</label>
              <input
                onChange={(e) => {
                  setService({ ...service, city: e.target.value });
                }}
                placeholder="City"
                type="text"
                value={service.city}
              />
            </div>
            <div class="field">
              <label>Street</label>
              <input
                onChange={(e) => {
                  setService({ ...service, street: e.target.value });
                }}
                placeholder="City"
                type="text"
                value={service.street}
              />
            </div>
          </div>
          <div className="field">
            <label>Service Type</label>
            <div>
              <select onChange={(e) => setService({ ...service, serviceType: e.target.value })}>
                <option class="item" value="Academic Project Consultancy">
                  Academic Project Consultancy
                </option>
                <option class="item" value="Website and Application development">
                  Website and Application development
                </option>
                <option class="item" value="Project and Talent Promotion">
                  Project and Talent Promotion
                </option>
                <option class="item" value="Industrial Project planning and Consultance">
                  Industrial Project planning and Consultance
                </option>
              </select>
            </div>
          </div>
          <div onClick={(e) => onSubmitService(e)} style={{ float: "right", marginTop: "60px" }} class="ui positive submit button">
            Submit
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestService;
