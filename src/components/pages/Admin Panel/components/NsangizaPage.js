import React, { useState } from "react";
import Modal from "../../../Modal";
import { useNsangizaRequests, useUpdateApproveNsangiza } from "../hooks/useAllNsangizas";
import { Checkbox } from "semantic-ui-react";
import { useMutation, gql } from "@apollo/client";
import { updateApprove_Nsangiza } from "../hooks/useAllNsangizas";
import thekomp from "./../../../../thekomp";

const NsangizaPage = () => {
  const [checkNsagiza, setCheckNsangiza] = useState({
    onOpen: false,
    selectedNsangiza: {},
  });
  const [theSelectedOne, setTheselectedOne] = useState({});
  console.log(theSelectedOne);
  const omitDeep = (obj, key) => {
    const keys = Object.keys(obj);
    const newObj = {};
    keys.forEach((i) => {
      if (i !== key) {
        const val = obj[i];
        if (val instanceof Date) newObj[i] = val;
        else if (Array.isArray(val)) newObj[i] = omitDeepArrayWalk(val, key);
        else if (typeof val === "object" && val !== null) newObj[i] = omitDeep(val, key);
        else newObj[i] = val;
      }
    });
    return newObj;
  };

  const omitDeepArrayWalk = (arr, key) => {
    return arr.map((val) => {
      if (Array.isArray(val)) return omitDeepArrayWalk(val, key);
      else if (typeof val === "object") return omitDeep(val, key);
      return val;
    });
  };
  const { data1, loading1, error1 } = useNsangizaRequests();
  const [updateApproveNsangiza, { data, loading, error }] = useMutation(updateApprove_Nsangiza);

  if (loading1) {
    return (
      <div class="ui segment">
        <div class="ui active inverted dimmer">
          <div class="ui text loader">Loading</div>
        </div>
        <p></p>
      </div>
    );
  }
  if (error1) {
    console.log(error1);
    return <h2>{error1.Error}</h2>;
  }
  let requests = data1.getAllNsangiza;
  requests = omitDeepArrayWalk(requests, "__typename");
  console.log(requests);

  const nsangizaContent = () => {
    return (
      <div>
        <div className="field rowInfo">
          <p>
            <span className="rowTitle">Title: </span>
            {checkNsagiza.selectedNsangiza.title}
          </p>
        </div>
        <div className="field rowInfo">
          <p>
            <span className="rowTitle">Brief Description: </span>
            {checkNsagiza.selectedNsangiza.briefIntroduction}
          </p>
        </div>
        <div className="field rowInfo">
          <p>
            <span className="rowTitle">Nsangiza Time: </span>
            {new Date(checkNsagiza.selectedNsangiza.meetingTime).toString()}
          </p>
        </div>
        <div className="field rowInfo">
          <p>
            <span className="rowTitle">Host names: </span>
            {checkNsagiza.selectedNsangiza.hostNames}
          </p>
        </div>
        <div className="field rowInfo">
          <p>
            <span className="rowTitle">Host Introduction: </span>
            {checkNsagiza.selectedNsangiza.hostIntroduction}
          </p>
        </div>
        <div className="field rowInfo">
          <p>
            <span className="rowTitle">Host Contacts: </span>
            {checkNsagiza.selectedNsangiza.hostContacts}
          </p>
        </div>
        <div className="field rowInfo">
          <p>
            <span className="rowTitle">Host Theme: </span>
            <img className="img-fluid" src={`${thekomp}/${checkNsagiza.selectedNsangiza.meetingTheme}`} />
          </p>
        </div>
        {checkNsagiza.selectedNsangiza.hostLink && checkNsagiza.selectedNsangiza.attendeeLink && (
          <div>
            <div className="field rowInfo">
              <p>
                <span className="rowTitle">Host Link: </span>
                {checkNsagiza.selectedNsangiza.hostLink}
              </p>
            </div>
            <div className="field rowInfo">
              <p>
                <span className="rowTitle">Antendee Link: </span>
                {checkNsagiza.selectedNsangiza.attendeeLink}
              </p>
            </div>
          </div>
        )}
        {!checkNsagiza.selectedNsangiza.hostLink && !checkNsagiza.selectedNsangiza.attendeeLink && (
          <div className="field rowInfo">
            <div style={{ display: "flex", marginTop: "5px" }}>
              <div>
                <Checkbox
                  toggle
                  checked={theSelectedOne.onApproved}
                  onChange={(e) => {
                    // let selensangiza = checkNsagiza.selectedNsangiza;
                    // selensangiza.onApproved = !selensangiza.onApproved;
                    // setCheckNsangiza({ ...checkNsagiza, selectedNsangiza: selensangiza });
                    setTheselectedOne({ ...theSelectedOne, onApproved: !theSelectedOne.onApproved });
                  }}
                />
              </div>

              <div style={{ marginLeft: "5px" }}>
                <label>on Approve Nsangiza</label>
              </div>
            </div>
            {!checkNsagiza.selectedNsangiza.onApproved && theSelectedOne.onApproved && (
              <div className="ui form">
                <div className="field">
                  <a target="_blank" href="https://cb8d34hasgtse90o7ve0-77lhw7m7g-elvito-hub.vercel.app/create">
                    Create Meeting here and copy links below
                  </a>
                </div>
                <div className="field">
                  <label>Attendee Link:</label>

                  <input
                    type="text"
                    name="Name"
                    value={theSelectedOne.attendeeLink}
                    onChange={(e) => {
                      setTheselectedOne({ ...theSelectedOne, attendeeLink: e.target.value });
                    }}
                  />
                </div>
                <div className="field">
                  <label>Host Link:</label>

                  <input
                    type="text"
                    name="Name"
                    value={theSelectedOne.hostLink}
                    onChange={(e) => {
                      setTheselectedOne({ ...theSelectedOne, hostLink: e.target.value });
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };
  const nsangizaActions = () => {
    return (
      <div>
        <button
          className="ui primary button"
          onClick={(e) => {
            delete theSelectedOne.id;
            delete theSelectedOne.bookings;
            delete theSelectedOne.comments;
            delete theSelectedOne.likes;
            if (
              updateApproveNsangiza({
                variables: {
                  updateApproveNsangizaId: checkNsagiza.selectedNsangiza.id,
                  nsangizaRequestInput: theSelectedOne,
                },
              })
            ) {
              // window.location.reload(false);
            }
          }}
        >
          Save
        </button>
      </div>
    );
  };
  var cnt = 0;
  return (
    <div className="ui segment">
      <h1 class="ui header">Nsangiza Requests</h1>
      <div className="ui raised segment">
        <table className="ui celled table">
          <thead>
            <tr>
              <th></th>
              <th>Title</th>
              <th>Host Names</th>
              <th>Host Email</th>
              <th>Nsangiza Time</th>
              <th>On Approved</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((item) => {
              var bg;
              if (item.onApproved === false) {
                bg = "rgb(255, 109, 109)";
              } else {
                bg = "white";
              }
              cnt++;
              return (
                <tr
                  style={{ backgroundColor: bg }}
                  onClick={(e) => {
                    setCheckNsangiza({ onOpen: true, selectedNsangiza: item });
                    setTheselectedOne(item);
                  }}
                >
                  <th>{cnt}</th>
                  <th>{item.title}</th>
                  <th>{item.hostNames}</th>
                  <th>{item.email}</th>
                  <th>{new Date(item.meetingTime).toString()}</th>
                  <th>{item.onApproved.toString()}</th>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {checkNsagiza.onOpen && (
        <Modal
          actions={nsangizaActions()}
          content={nsangizaContent()}
          title="Nsangiza Check"
          onDismiss={() => setCheckNsangiza({ onOpen: false, selectedNsangiza: {} })}
        />
      )}
    </div>
  );
};

export default NsangizaPage;
