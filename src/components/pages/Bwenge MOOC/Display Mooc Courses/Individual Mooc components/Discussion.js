import React, { useState } from "react";
import Modal from "../../../../Modal";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import thekomp from "./../../../../../thekomp";
import axios from "axios";
import { useParams } from "react-router-dom";

const Discussion = ({ discussions }) => {
  const [addDiscussionModal, setAddDiscussionModal] = useState(false);
  const [discusion, setDiscussion] = useState({
    title: "",
    topic: "",
    content: "",
    anonymous: false,
  });
  const { id } = useParams();
  const onPostDiscussion = () => {
    const formData = new FormData();
    formData.append("title", discusion.title);
    formData.append("topic", discusion.topic);
    formData.append("content", discusion.content);
    formData.append("courseId", id);
    if (discusion.anonymous) {
      formData.append("sender", "anonymous");
    } else {
      formData.append("sender", localStorage.getItem("userfirstName") + " " + localStorage.getItem("userlastName"));
    }
    var url = `${thekomp}/mooc/postdiscussion`;
    const config = {
      method: "patch",
      url: url,
      headers: {
        "content-type": "multipart/form-data",
      },
      data: formData,
    };
    axios(config)
      .then((res) => {
        console.log(res);
        window.location.reload(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const addDiscussionContent = () => {
    return (
      <div className="ui container ui segment">
        <div className="ui large form">
          <div className="field">
            <label>Title</label>
            <input type="text" value={discusion.title} onChange={(e) => setDiscussion({ ...discusion, title: e.target.value })} />
          </div>
          <div className="field">
            <label>Topic:</label>
            <input type="text" value={discusion.topic} onChange={(e) => setDiscussion({ ...discusion, topic: e.target.value })} />
          </div>
          <div className="field">
            <label>Content:</label>
            <CKEditor
              editor={ClassicEditor}
              data={discusion.content}
              onChange={(event, editor) => {
                const data = editor.getData();
                setDiscussion({ ...discusion, content: data });
              }}
            />
          </div>
          <div className="field">
            <div class="ui checkbox">
              <input
                type="checkbox"
                checked={discusion.anonymous}
                onChange={(e) => setDiscussion({ ...discusion, anonymous: !discusion.anonymous })}
              />
              <label>Anonymous Sender</label>
            </div>
          </div>
        </div>
      </div>
    );
  };
  const addDiscussionActions = () => {
    return (
      <button onClick={(e) => onPostDiscussion()} className="ui positive button">
        Add Discussion
      </button>
    );
  };
  const renderDiscussions = () => {
    return (
      <div>
        {discussions &&
          discussions.courseDiscussion.map((item) => {
            return (
              <div className="ui raised segment" style={{ backgroundColor: "aliceblue" }}>
                {item.title}
              </div>
            );
          })}
      </div>
    );
  };
  return (
    <div>
      <div className="ui raised segment">
        <button
          onClick={(e) => {
            setAddDiscussionModal(true);
          }}
          class="ui compact icon button my-3"
        >
          <i class="users icon me-2"></i>
          <span className="ms-2"> Add Discussion Forum</span>
        </button>
        {addDiscussionModal && (
          <Modal
            title="Add Discussion Forum"
            content={addDiscussionContent()}
            actions={addDiscussionActions()}
            onDismiss={(e) => setAddDiscussionModal(false)}
          />
        )}
      </div>
      <div className="ui raised segment">{renderDiscussions()}</div>
    </div>
  );
};

export default Discussion;
