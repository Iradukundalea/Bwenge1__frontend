import React from "react";
import ReactDOM from "react-dom";
import "./styles/Modal.css";

const CommentsModal = (props) => {
  return ReactDOM.createPortal(
    <div className="ui dimmer modals visible active" onClick={props.onDismiss}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="ui standard modal visible active themodal"
        style={{ position: "absolute", right: "0%", width: "40vw", minHeight: "100vh", zIndex: "20" }}
      >
        <div className="header">{props.title}</div>
        <div className="content">{props.content}</div>
        <div className="actions">{props.actions}</div>
      </div>
    </div>,
    document.querySelector("#commentsModal")
  );
};

export default CommentsModal;
