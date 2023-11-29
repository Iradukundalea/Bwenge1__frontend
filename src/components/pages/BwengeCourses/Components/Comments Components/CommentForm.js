import { useState } from "react";
import { useLocation } from "react-router-dom";

export function CommentForm({ loading, error, onSubmit, autoFocus = false, initialValue = "" }) {
  const location = useLocation();
  const [message, setMessage] = useState(initialValue);
  var width = "50vw";
  if (location.pathname.includes("article")) width = "30vw";
  function handleSubmit(e) {
    e.preventDefault();
    if (message !== "") {
      onSubmit(message);
      setMessage("");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="comment-form-row" style={{ width: width }}>
        <textarea autoFocus={autoFocus} value={message} onChange={(e) => setMessage(e.target.value)} className="message-input" />
        <button className="ui inverted primary button" type="submit" disabled={!message}>
          {loading ? "Loading" : "Post"}
        </button>
      </div>
      {/* <div className="error-msg">{error}</div> */}
    </form>
  );
}
