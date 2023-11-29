import React from "react";
import ReactDOM from "react-dom";
import "./styles/Modal.css";

const Modal = (props) => {
  return ReactDOM.createPortal(
    <div className="ui dimmer modals visible active">
      <div onClick={(e) => e.stopPropagation()} className="ui modal visible active themodal">
        <i class="close icon" onClick={props.onDismiss}></i>
        <div className="header">{props.title}</div>
        <div className="content">{props.content}</div>
        <div className="actions">{props.actions}</div>
      </div>
    </div>,
    document.querySelector("#modal")
  );
};

export default Modal;
