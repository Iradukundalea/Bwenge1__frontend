import React, { useState } from "react";
import axios from "axios";
import thekomp from "./../../../thekomp";
import history from "../../../Redux/actions/history";
import moment from "moment";
import Modal from "../../Modal";

const RequestNsangiza = () => {
  const [nsangizeRequest, setNsangizaRequest] = useState({
    title: "",
    briefIntroduction: "",
    meetingTime: "",
    hostName: "",
    iconUrl: "",
    hostIntroduction: "",
    hostContacts: "",
  });
  const [error, setError] = useState("");

  const submitNsangizaRequest = async () => {
    const formData = new FormData();
    if (nsangizeRequest.title) {
      formData.append("title", nsangizeRequest.title);
    } else {
      setError("Title");
      return;
    }
    if (nsangizeRequest.briefIntroduction) {
      formData.append("briefIntroduction", nsangizeRequest.briefIntroduction);
    } else {
      setError("Brief Introduction");
      return;
    }
    if (nsangizeRequest.meetingTime) {
      formData.append("meetingTime", nsangizeRequest.meetingTime);
    } else {
      setError("Meeting Time");
      return;
    }
    if (nsangizeRequest.hostName) {
      formData.append("hostNames", nsangizeRequest.hostName);
    } else {
      setError("host name");
      return;
    }
    if (nsangizeRequest.hostIntroduction) {
      formData.append("hostIntroduction", nsangizeRequest.hostIntroduction);
    } else {
      setError("host Introduction");
      return;
    }
    if (nsangizeRequest.hostContacts) {
      formData.append("hostContacts", nsangizeRequest.hostContacts);
    } else {
      setError("host Contacts");
      return;
    }
    formData.append("email", localStorage.getItem("email"));
    if (nsangizeRequest.iconUrl) {
      formData.append("meetingIcon", nsangizeRequest.iconUrl);
    } else {
      setError("Meeting Icon");
      return;
    }
    const config = {
      method: "post",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      url: `${thekomp}/nsangiza/requestnsangiza`,
      data: formData,
    };
    axios(config)
      .then((res) => {
        alert("Your Nsangiza Request was sent successful,It will appear on Nsangiza's page after Approval.Thx");
        history.push("/nsangiza");
      })
      .catch((error) => {
        console.log(error.response.data.message);
        setError(error.response.data.message);
      });
  };
  const NsangizaErrorContent = () => {
    return <div>Please set Nsangiza's {error}</div>;
  };
  return (
    <div className="ui container ui segment">
      <h2 className="mb-4">
        <u>
          <b>Nsangiza Request form</b>
        </u>
      </h2>
      <div className="ui large form">
        <div className="field">
          <label>Nsangiza Title :</label>
          <input type="text" value={nsangizeRequest.title} onChange={(e) => setNsangizaRequest({ ...nsangizeRequest, title: e.target.value })} />
        </div>
        <div className="field">
          <label>Brief Introduction :</label>
          <textarea
            rows="2"
            value={nsangizeRequest.briefIntroduction}
            onChange={(e) => setNsangizaRequest({ ...nsangizeRequest, briefIntroduction: e.target.value })}
          />
        </div>
        <div class="field">
          <label>Nsangiza Icon</label>
          {nsangizeRequest.iconUrl && nsangizeRequest.iconUrl.type && (
            <img src={URL.createObjectURL(nsangizeRequest.iconUrl)} width={400} height={280} style={{ marginBottom: "15px" }} />
          )}
          {/* {props.MoocCourse.courseIcon && !props.MoocCourse.courseIcon.type && (
            <img src={`${API}/${props.MoocCourse.courseIcon}`} width={400} height={280} style={{ marginBottom: "15px" }} />
          )} */}

          <input
            type="file"
            id="nsangizaicon"
            onChange={(e) => {
              var fileInput = document.getElementById("nsangizaicon");

              var filePath = fileInput.value;

              // Allowing file type
              var allowedExtensions = /(\.jpg|\.png|\.svg)$/i;

              if (!allowedExtensions.exec(filePath)) {
                alert("File type not image");
                return false;
              } else {
                setNsangizaRequest({ ...nsangizeRequest, iconUrl: document.getElementById("nsangizaicon").files[0] });
              }
            }}
          />
        </div>
        <div className="field">
          <label>Nsangiza Time :</label>
          <input
            type="datetime-local"
            // value={nsangizeRequest.meetingTime.toISOString()}
            onChange={(e) => {
              var d = new Date(e.target.value);

              setNsangizaRequest({ ...nsangizeRequest, meetingTime: d });
            }}
          />
        </div>
        <div className="field">
          <label>Host Names : </label>
          <input
            type="text"
            value={nsangizeRequest.hostName}
            onChange={(e) => setNsangizaRequest({ ...nsangizeRequest, hostName: e.target.value })}
          />
        </div>
        <div className="field">
          <label>Host Introduction :</label>
          <textarea
            rows="2"
            value={nsangizeRequest.hostIntroduction}
            onChange={(e) => setNsangizaRequest({ ...nsangizeRequest, hostIntroduction: e.target.value })}
          />
        </div>
        <div className="field">
          <label>Host Contacts :</label>
          <input
            type="text"
            value={nsangizeRequest.hostContacts}
            onChange={(e) => setNsangizaRequest({ ...nsangizeRequest, hostContacts: e.target.value })}
          />
        </div>
        <div className="field">
          <button onClick={(e) => submitNsangizaRequest()} class="positive ui button">
            Submit Request
          </button>
        </div>
      </div>
      {error && <Modal title="Nsangiza Errors" content={NsangizaErrorContent()} onDismiss={(e) => setError("")} />}
    </div>
  );
};

export default RequestNsangiza;
