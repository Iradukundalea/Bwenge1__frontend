import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getIndivPartns,
  getOrgPartns,
  setIndivPartChecked,
  setIndivPartApproved,
  setOrgPartChecked,
  setOrgPartApproved,
} from "../../../../Redux/actions";
import Modal from "../../../Modal.js";

const PartnersPage = () => {
  const dispatch = useDispatch();
  const [partnerType, setPartnerType] = useState("individual");
  const [onModal, setModal] = useState({
    onOpen: false,
    selectedPartner: {},
  });
  useEffect(() => {
    dispatch(getIndivPartns());
    dispatch(getOrgPartns());
  }, []);
  const IndivPartners = useSelector((state) => state.IndivPartners);
  const OrgPartners = useSelector((state) => state.OrgPartners);
  console.log(IndivPartners);
  console.log(OrgPartners);

  const content = () => {
    if (partnerType === "individual") {
      return (
        <div>
          <div className="field rowInfo">
            <p>
              <span className="rowTitle">First Name: </span>
              {onModal.selectedPartner.firstName}
            </p>
          </div>
          <div className="field rowInfo">
            <p>
              <span className="rowTitle">Last Name: </span>
              {onModal.selectedPartner.lastName}
            </p>
          </div>
          <div className="field rowInfo">
            <p>
              <span className="rowTitle">Phone Number: </span>
              {onModal.selectedPartner.phoneNumber}
            </p>
          </div>
          <div className="field rowInfo">
            <p>
              <span className="rowTitle">Email: </span>
              {onModal.selectedPartner.email}
            </p>
          </div>
          <div className="field rowInfo">
            <p>
              <span className="rowTitle">Job Title: </span>
              {onModal.selectedPartner.jobTitle}
            </p>
          </div>
          <div className="field rowInfo">
            <p>
              <span className="rowTitle">Company Name: </span>
              {onModal.selectedPartner.companyName}
            </p>
          </div>
          <div className="field rowInfo">
            <p>
              <span className="rowTitle">Field of expertise: </span>
              {onModal.selectedPartner.fieldOfExpertise}
            </p>
          </div>
          <div className="field rowInfo">
            <p>
              <span className="rowTitle">Market of Interest: </span>
              {onModal.selectedPartner.marketOfInterest}
            </p>
          </div>
          <div className="field rowInfo">
            <p>
              <span className="rowTitle">On Checked: </span>
              {onModal.selectedPartner.onChecked === true ? "Checked" : "Not Checked"}
            </p>
          </div>
          <div className="field rowInfo">
            <p>
              <span className="rowTitle">On Approved: </span>
              {onModal.selectedPartner.onApproved === true ? "Approved" : "Not Approved"}
            </p>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div className="field rowInfo">
            <p>
              <span className="rowTitle">Organization Name: </span>
              {onModal.selectedPartner.organizationName}
            </p>
          </div>
          <div className="field rowInfo">
            <p>
              <span className="rowTitle">Phone Number: </span>
              {onModal.selectedPartner.phoneNumber}
            </p>
          </div>
          <div className="field rowInfo">
            <p>
              <span className="rowTitle">Email: </span>
              {onModal.selectedPartner.email}
            </p>
          </div>
          <div className="field rowInfo">
            <p>
              <span className="rowTitle">Partner Type:</span>
              {onModal.selectedPartner.partnerType}
            </p>
          </div>
          <div className="field rowInfo">
            <p>
              <span className="rowTitle">On Checked: </span>
              {onModal.selectedPartner.onChecked === true ? "Checked" : "Not Checked"}
            </p>
          </div>
          <div className="field rowInfo">
            <p>
              <span className="rowTitle">On Approved: </span>
              {onModal.selectedPartner.onApproved === true ? "Approved" : "Not Approved"}
            </p>
          </div>
        </div>
      );
    }
  };
  const actions = () => {
    return (
      <div>
        {!onModal.selectedPartner.onChecked && (
          <button
            onClick={(e) => {
              if (partnerType === "individual") dispatch(setIndivPartChecked(onModal.selectedPartner._id));
              else dispatch(setOrgPartChecked(onModal.selectedPartner._id));

              setModal({
                onOpen: false,
                selectedPartner: {},
              });
            }}
            class="ui inverted primary button"
          >
            Check
          </button>
        )}
        {!onModal.selectedPartner.onApproved && (
          <button
            onClick={(e) => {
              if (partnerType === "individual") dispatch(setIndivPartApproved(onModal.selectedPartner._id));
              else dispatch(setOrgPartApproved(onModal.selectedPartner._id));

              setModal({
                onOpen: false,
                selectedPartner: {},
              });
            }}
            class="ui inverted green button"
          >
            Approve
          </button>
        )}
      </div>
    );
  };
  const renderIndivPartners = IndivPartners.map((partner) => {
    var bg;
    if (partner.onChecked === false) {
      console.log("here");
      bg = "red";
    } else {
      if (partner.onApproved === false) {
        bg = "lightblue";
      } else {
        bg = "rgb(148, 247, 189)";
      }
    }
    return (
      <tr
        style={{ backgroundColor: `${bg}` }}
        onClick={(e) => {
          setModal({ onOpen: true, selectedPartner: partner });
        }}
      >
        <th>{partner.firstName}</th>
        <th>{partner.lastName}</th>
        <th>{partner.email}</th>
        <th>{partner.phoneNumber}</th>
        <th>{partner.jobTitle}</th>
        <th>{partner.partnerType}</th>
      </tr>
    );
  });
  const renderOrgPartners = OrgPartners.map((organ) => {
    var bg;
    if (organ.onChecked === false) {
      console.log("here");
      bg = "red";
    } else {
      if (organ.onApproved === false) {
        bg = "lightblue";
      } else {
        bg = "rgb(148, 247, 189)";
      }
    }

    return (
      <tr
        style={{ backgroundColor: `${bg}` }}
        onClick={(e) => {
          setModal({ onOpen: true, selectedPartner: organ });
        }}
      >
        <th>{organ.organizationName}</th>
        <th>{organ.email}</th>
        <th>{organ.phoneNumber}</th>
        <th>{organ.partnerType}</th>
      </tr>
    );
  });

  const renderPartners = () => {
    if (partnerType === "individual") {
      return (
        <table className="ui celled table">
          <thead>
            <tr>
              <th>First name</th>
              <th>Last name</th>
              <th>Email</th>
              <th>Phone number</th>
              <th>Job Title</th>
              <th>Partner Type</th>
            </tr>
          </thead>
          <tbody>{renderIndivPartners}</tbody>
        </table>
      );
    } else {
      return (
        <table className="ui celled table">
          <thead>
            <tr>
              <th>Organization name</th>
              <th>Email</th>
              <th>Phone number</th>
              <th>Partner Type</th>
            </tr>
          </thead>
          <tbody>{renderOrgPartners}</tbody>
        </table>
      );
    }
  };

  return (
    <div className="ui container">
      <div className="field">
        <select onChange={(e) => setPartnerType(e.target.value)}>
          <option class="item" value="individual">
            Individual Partners
          </option>
          <option class="item" value="organization">
            Organization Partners
          </option>
        </select>
      </div>
      <div>{renderPartners()}</div>
      {onModal.onOpen && <Modal actions={actions()} content={content()} onDismiss={() => setModal({ onOpen: false, selectedPartner: {} })} />}
    </div>
  );
};

export default PartnersPage;
