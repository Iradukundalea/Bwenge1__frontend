import React, { useState } from "react";
import { FaEdit, FaHeart, FaRegHeart, FaReply, FaTrash } from "react-icons/fa";
import { CommentList } from "./CommentList";
import { FcDownRight } from "react-icons/fc";
import { CommentForm } from "./CommentForm";
import history from "../../../../../Redux/actions/history";

export function Comment({ id, message, creator, createdAt, parentId, likes, depth, comments, userCommentsHandler }) {
  const [areChildrenHidden, setAreChildrenHidden] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  console.log(comments);
  console.log(id);
  const childComments = comments.filter((item) => item.parentId === id);
  console.log(childComments);
  function onCommentReply(message) {
    userCommentsHandler(message, id);
    setIsReplying(false);
    // return createCommentFn
    //   .execute({ postId: post.id, message, parentId: id })
    //   .then(comment => {
    //     setIsReplying(false)
    //     createLocalComment(comment)
    //   })
  }

  var width = 94 - depth * 1;

  width = width + "vw";

  return (
    <>
      <div className="comment">
        <div className="header">
          <span className="name" style={{ cursor: "pointer" }} onClick={(e) => history.push(`/userinfo/${creator.creatorId}`)}>
            {creator.lastName + " " + creator.firstName}
          </span>
          <span className="date" style={{ position: "absolute", right: "5vw" }}>
            {new Date(createdAt).toLocaleString()}
          </span>
        </div>
        <div className="message">{message}</div>
        <div className="footer">
          {childComments.length > 0 && areChildrenHidden && (
            <a style={{ cursor: "pointer" }} onClick={() => setAreChildrenHidden(false)}>
              <FcDownRight />
              Replies
            </a>
          )}
          <a style={{ cursor: "pointer" }} onClick={() => setIsReplying((prev) => !prev)}>
            <FaReply />
            Reply
          </a>
        </div>
      </div>
      {isReplying && (
        <div className="mt-1 ml-3">
          <CommentForm autoFocus onSubmit={onCommentReply} />
        </div>
      )}
      {childComments?.length > 0 && (
        <>
          <div className={`nested-comments-stack ${areChildrenHidden ? "hide" : ""}`}>
            <button className="collapse-line" aria-label="Hide Replies" onClick={() => setAreChildrenHidden(true)} />
            <div className="nested-comments">
              {<CommentList comments={childComments} allComments={comments} userCommentsHandler={userCommentsHandler} />}
            </div>
          </div>
          {/* <button className={`btn mt-1 ${!areChildrenHidden ? "hide" : ""}`} onClick={() => setAreChildrenHidden(false)}>
            Show Replies
          </button> */}
        </>
      )}
    </>
  );
}
