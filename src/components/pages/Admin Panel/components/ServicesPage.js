import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getServices, setServiceChecked, setServiceDone } from "../../../../Redux/actions";
import Modal from "../../../Modal";

const ServicesPage = () => {
  const [onModal, setModal] = useState({
    onOpen: false,
    selectedService: "",
  });
  const dispatch = useDispatch();
  const services = useSelector((state) => state.services);
  useEffect(() => {
    dispatch(getServices());
  }, []);

  console.log(services);
  const content = () => {
    return (
      <div>
        <div className="field rowInfo">
          <p>
            <span className="rowTitle">First Name: </span>
            {onModal.selectedService.firstName}
          </p>
        </div>
        <div className="field rowInfo">
          <p>
            <span className="rowTitle">Last Name: </span>
            {onModal.selectedService.lastName}
          </p>
        </div>
        <div className="field rowInfo">
          <p>
            <span className="rowTitle">Phone Number: </span>
            {onModal.selectedService.phoneNumber}
          </p>
        </div>
        <div className="field rowInfo">
          <p>
            <span className="rowTitle">Email: </span>
            {onModal.selectedService.email}
          </p>
        </div>
        <div className="field rowInfo">
          <p>
            <span className="rowTitle">Job Title: </span>
            {onModal.selectedService.jobTitle}
          </p>
        </div>
        <div className="field rowInfo">
          <p>
            <span className="rowTitle">Service Type: </span>
            {onModal.selectedService.serviceType}
          </p>
        </div>
        <div className="field rowInfo">
          <p>
            <span className="rowTitle">On Checked: </span>
            {onModal.selectedService.onChecked === true ? "Checked" : "Not Checked"}
          </p>
        </div>
        <div className="field rowInfo">
          <p>
            <span className="rowTitle">On Done: </span>
            {onModal.selectedService.onChecked === true ? "Finished" : "Not Done"}
          </p>
        </div>
      </div>
    );
  };
  const actions = () => {
    return (
      <div>
        {!onModal.selectedService.onChecked && (
          <button
            onClick={(e) => {
              dispatch(setServiceChecked(onModal.selectedService._id));
              setModal({
                onOpen: false,
                selectedService: {},
              });
            }}
            class="ui inverted primary button"
          >
            Check
          </button>
        )}
        {!onModal.selectedService.onDone && (
          <button
            onClick={(e) => {
              dispatch(setServiceDone(onModal.selectedService._id));
              setModal({
                onOpen: false,
                selectedService: {},
              });
            }}
            class="ui inverted green button"
          >
            Done
          </button>
        )}
      </div>
    );
  };
  const renderServices = services.map((service) => {
    var bg;
    if (service.onChecked === false) {
      console.log("here");
      bg = "red";
    } else {
      if (service.onDone === false) {
        bg = "lightblue";
      } else {
        bg = "rgb(148, 247, 189)";
      }
    }
    return (
      <tr
        style={{ backgroundColor: `${bg}` }}
        onClick={(e) => {
          setModal({
            onOpen: true,
            selectedService: service,
          });
        }}
      >
        <td data-label="First name">{service.firstName}</td>
        <td data-label="Last name">{service.lastName}</td>
        <td data-label="Email">{service.email}</td>
        <td data-label="Phone number">{service.phoneNumber}</td>
        <td data-label="Job Title">{service.jobTitle}</td>
        <td data-label="Service Type">{service.serviceType}</td>
      </tr>
    );
  });
  return (
    <div className="ui container">
      ServicesPage
      <table className="ui celled table">
        <thead>
          <tr>
            <th>First name</th>
            <th>Last name</th>
            <th>Email</th>
            <th>Phone number</th>
            <th>Job Title</th>
            <th>Service Type</th>
          </tr>
        </thead>
        <tbody>{renderServices}</tbody>
      </table>
      {onModal.onOpen && <Modal content={content()} actions={actions()} onDismiss={() => setModal({ onOpen: false, service: "" })} />}
    </div>
  );
};

export default ServicesPage;
