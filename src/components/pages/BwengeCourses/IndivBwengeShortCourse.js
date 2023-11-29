import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetSinglebwengeshortcourse, useLikeShortCourse, useViewShortCourse, useUserComments } from "./hooks.js/useshortcourses";
import thekomp from "./../../../thekomp";
import VideoPlayer from "../Bwenge MOOC/Display Mooc Courses/Individual Mooc components/Contents components/VideoPlayer";
import { FaUserAstronaut } from "react-icons/fa";
import history from "../../../Redux/actions/history";
import ReactPlayer from "react-player";
import { useMutation } from "@apollo/client";
import { FcDownRight } from "react-icons/fc";
import { CommentList } from "./Components/Comments Components/CommentList";
import { CommentForm } from "./Components/Comments Components/CommentForm";
import DocsViewer from "../../DocsViewer";
import SlidePresentationExample from "../../SlidePresentationExample";
import _ from "lodash";
const IndivBwengeShortCourse = () => {
  const { id } = useParams();
  const [shortCourse, setShortCourse] = useState();
  const { loading, error, data } = useGetSinglebwengeshortcourse(id);
  const [userLikeCourse, {}] = useMutation(useLikeShortCourse);
  const [userViewCourse, {}] = useMutation(useViewShortCourse);
  const [userCommentCourse, {}] = useMutation(useUserComments);

  const setDatatostate = () => {
    setShortCourse(data.getSingleShortCourse);
  };

  const userCommentsHandler = (message, parentId) => {
    userCommentCourse({
      variables: {
        commentCourseId: id,
        message: message,
        creator: {
          creatorId: localStorage.getItem("userId"),
          email: localStorage.getItem("email"),
          firstName: localStorage.getItem("firstName"),
          lastName: localStorage.getItem("lastName"),
        },
        parentId: parentId,
      },
    }).then((res) => {
      // console.log(res.data.commentCourse);
      var oldcomments = shortCourse.comments;
      oldcomments = [...oldcomments, res.data.commentCourse.comments[res.data.commentCourse.comments.length - 1]];

      setShortCourse({ ...shortCourse, comments: oldcomments });
    });
  };
  useEffect(() => {
    if (loading === false && data) {
      console.log(data);
      var theviews = data.getSingleShortCourse.viewers;
      if (!theviews.includes(localStorage.getItem("userId"))) {
        userViewCourse({
          variables: {
            userId: localStorage.getItem("userId"),
            viewShortCourseId: data.getSingleShortCourse.id,
          },
        });
      }
      setDatatostate();
    }
  }, [loading, data]);

  if (loading) {
    return (
      <div class="ui segment">
        <div class="ui active inverted dimmer">
          <div class="ui text loader">Loading</div>
        </div>
        <p></p>
      </div>
    );
  }
  if (error) {
    console.log(error);
    return <h2>{error.Error}</h2>;
  }
  console.log({ loading, error, data });
  console.log(localStorage.getItem("userId"));
  console.log(shortCourse);

  const renderComment = () => {
    console.log(shortCourse.comments);
    var depth1Comments = shortCourse.comments.filter((item) => item.depth == 1);

    return (
      <div>
        <span className="rowTitle">Comment: </span>

        <CommentForm onSubmit={userCommentsHandler} />
        <CommentList comments={depth1Comments} allComments={shortCourse.comments} userCommentsHandler={userCommentsHandler} />
      </div>
    );
  };

  if (shortCourse)
    return (
      <div className="ui raised segment m-2 p-2">
        <div
          style={{
            fontWeight: "bold",
            textDecoration: "underline",
            fontSize: "2.5rem",
            display: "flex",
            justifyContent: "center",
            lineHeight: "2.5rem",
          }}
        >
          {shortCourse.title}
        </div>

        <a style={{ marginTop: "2rem" }} class="ui label" onClick={(e) => history.push(`/userinfo/${shortCourse.creator.creatorId}`)}>
          <FaUserAstronaut class="ui right spaced avatar image" />
          {shortCourse.instructor}
        </a>
        <div className="field rowInfo">
          <p>
            <span className="rowTitle">Field: </span>
            {shortCourse.field}
          </p>
        </div>
        {shortCourse.department && (
          <div className="field rowInfo">
            <p>
              <span className="rowTitle">Department: </span>
              {shortCourse.department}
            </p>
          </div>
        )}
        {shortCourse.type == "Video course" && (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <ReactPlayer url={shortCourse.selectedFile} />
          </div>
        )}
        {shortCourse.selectedFile.substr(shortCourse.selectedFile.length - 3, 3) === "pdf" && (
          <div style={{ height: "70vh", width: "70%" }}>
            <iFrame class="embed-responsive-item" width="100%" height="100%" src={`${thekomp}/${shortCourse.selectedFile}`} />
            {/* <SlidePresentationExample fileUrl={`${thekomp}/${shortCourse.selectedFile}`} /> */}
            {/* <DocsViewer link={`${thekomp}/${shortCourse.selectedFile}`} /> */}
          </div>
        )}
        <div class="extra content">
          <span>
            <i class="eye icon"></i>
            {shortCourse.viewers.length}
          </span>
          <span
            className="ps-2"
            onClick={(e) => {
              console.log(shortCourse);
              console.log(id);
              var thelikes = shortCourse.likes;
              console.log(thelikes);
              if (_.findIndex(shortCourse.likes, ["liker", localStorage.getItem("userId")]) == -1) {
                thelikes = [...thelikes, { liker: localStorage.getItem("userId"), dateliked: new Date() }];
                setShortCourse({ ...shortCourse, likes: thelikes });
              } else {
                thelikes = thelikes.filter((item) => item.liker !== localStorage.getItem("userId"));
                setShortCourse({ ...shortCourse, likes: thelikes });
              }
              userLikeCourse({
                variables: {
                  userId: localStorage.getItem("userId"),
                  likeShortCourseId: shortCourse.id,
                },
              });
            }}
          >
            <i
              class="thumbs up icon"
              style={_.findIndex(shortCourse.likes, ["liker", localStorage.getItem("userId")]) != -1 ? { color: "green" } : {}}
            ></i>
            {shortCourse.likes.length}
          </span>
        </div>
        <div className="ui segment">{renderComment()}</div>
      </div>
    );
};

export default IndivBwengeShortCourse;
