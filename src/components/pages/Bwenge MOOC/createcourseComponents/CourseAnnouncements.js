import React, { useState } from "react";
import Modal from "../../../Modal";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import renderHTML from "react-render-html";

const CourseAnnouncements = ({ MoocCourse, setMoocCourse }) => {
  const [announcement, setAnnouncement] = useState({
    title: "",
    content: "",
    date: new Date(),
  });
  const [addNoticeModal, setaddNoticeModal] = useState({
    onOpen: false,
    method: "",
    selectedAnnouncement: {},
  });
  const renderContent = () => {
    return (
      <div className="ui form">
        <div className="field">
          <label>Title</label>
          <input name="title" value={announcement.title} onChange={(e) => setAnnouncement({ ...announcement, title: e.target.value })} />
        </div>
        <div className="field">
          <label>Announcement: </label>
          <CKEditor
            editor={ClassicEditor}
            data={announcement.content}
            onChange={(event, editor) => {
              const data = editor.getData();
              setAnnouncement({ ...announcement, content: data, date: new Date() });
            }}
          />
        </div>
      </div>
    );
  };
  const renderAction = () => {
    return (
      <div>
        <button
          onClick={(e) => {
            if (addNoticeModal.method === "Add") {
              var notices = MoocCourse.announcement;
              notices.push(announcement);
              setMoocCourse({ ...MoocCourse, announcement: notices });
              setAnnouncement({
                title: "",
                content: "",
                date: new Date(),
              });
              setaddNoticeModal({
                onOpen: false,
                method: "",
                selectedAnnouncement: {},
              });
            } else if (addNoticeModal.method === "Edit") {
              var announcemento = MoocCourse.announcement;
              for (var i = 0; i < announcemento.length; i++) {
                if (announcemento[i] === addNoticeModal.selectedAnnouncement) announcemento[i] = announcement;
              }
              setMoocCourse({ ...MoocCourse, announcement: announcemento });
              setAnnouncement({
                title: "",
                content: "",
                date: new Date(),
              });
              setaddNoticeModal({
                onOpen: false,
                method: "",
                selectedAnnouncement: {},
              });
            } else if (addNoticeModal.method === "Delete") {
              var announcemento = MoocCourse.announcement;
              announcemento = announcemento.filter((item) => item !== addNoticeModal.selectedAnnouncement);
              setMoocCourse({ ...MoocCourse, announcement: announcemento });
              setAnnouncement({
                title: "",
                content: "",
                date: new Date(),
              });
              setaddNoticeModal({
                onOpen: false,
                method: "",
                selectedAnnouncement: {},
              });
            }
          }}
          className="ui positive button"
        >
          {addNoticeModal.method} Announcement
        </button>
      </div>
    );
  };
  const renderAnnouncements = MoocCourse.announcement.map((item) => {
    return (
      <div className="ui raised segment">
        <div className="AnnTitle" style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
          {item.title}
        </div>
        <div className="notice" style={{ fontSize: "1rem" }}>
          {renderHTML(item.content)}
        </div>
        <button
          style={{ float: "right" }}
          onClick={() => {
            setAnnouncement(item);
            setaddNoticeModal({ onOpen: true, method: "Edit", selectedAnnouncement: item });
          }}
          className="ui yellow button"
        >
          Edit
        </button>
        <button
          style={{ float: "right" }}
          onClick={() => {
            setAnnouncement(item);
            setaddNoticeModal({ onOpen: true, method: "Delete", selectedAnnouncement: item });
          }}
          className="ui negative button"
        >
          Delete
        </button>
      </div>
    );
  });
  return (
    <div className="ui segment">
      {MoocCourse.announcement.length > 0 && renderAnnouncements}
      <button
        onClick={(e) => {
          setaddNoticeModal({ onOpen: true, method: "Add" });
        }}
        class="ui compact icon button"
        style={{ marginTop: "5px", backgroundColor: "rgb(255, 238, 85)", marginLeft: "5px" }}
      >
        <i class="plus icon"></i>
        Add Announcement
      </button>
      {addNoticeModal.onOpen && (
        <Modal title="Add Announcement" onDismiss={() => setaddNoticeModal({ onOpen: false })} content={renderContent()} actions={renderAction()} />
      )}
    </div>
  );
};

export default CourseAnnouncements;
