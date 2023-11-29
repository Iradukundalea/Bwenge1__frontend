import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { VIEW_COMMUNITY_QA, LIKE_COMMUNITY_QA, COMMENT_COMMUNITY_QA, useGetSingleCommunityQAs } from "../Admin Panel/hooks/useBwengeCommunity";
import { Editor, EditorState, convertFromRaw } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import renderHTML from "react-render-html";
import { useParams } from "react-router-dom";
import _ from "lodash";
import "./Styles/article.css";
import ArticleleftUser from "./Article Components/ArticleleftUser";
import CommentsModal from "../../CommentsModal";
import { CommentForm } from "../BwengeCourses/Components/Comments Components/CommentForm";
import { CommentList } from "../BwengeCourses/Components/Comments Components/CommentList";

const QAs = () => {
  const { id } = useParams();
  const { data, loading, error } = useGetSingleCommunityQAs(id);
  const [thoArticle, setThoarticle] = useState();
  const [commentsModal, setCommentsModal] = useState(false);
  const [userViewQA, {}] = useMutation(VIEW_COMMUNITY_QA);
  const [userLikeQA, {}] = useMutation(LIKE_COMMUNITY_QA);
  const [userCommentQA, {}] = useMutation(COMMENT_COMMUNITY_QA);
  const setDatatostate = () => {
    setThoarticle(data.getSingleCommunityQAs);
  };
  const userCommentsHandler = (message, parentId) => {
    userCommentQA({
      variables: {
        commentQasId: id,
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
      console.log(res.data);
      var oldcomments = thoArticle.comments;
      oldcomments = [...oldcomments, res.data.commentQas.comments[res.data.commentCourse.comments.length - 1]];

      setThoarticle({ ...thoArticle, comments: oldcomments });
    });
  };
  useEffect(() => {
    if (loading === false && data) {
      console.log(data);
      var theviews = data.getSingleCommunityQAs.viewers;
      if (!theviews.includes(localStorage.getItem("userId"))) {
        userViewQA({
          variables: {
            userId: localStorage.getItem("userId"),
            viewQAsId: data.getSingleCommunityQAs.id,
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
  if (thoArticle) {
    const article = thoArticle;
    console.log(article);
    var ArArticle = JSON.parse(article.questionridea);
    var updatedArt = _.mapValues(JSON.parse(article.questionridea).entityMap, function (item) {
      if (item.type == "IMAGE") {
        item.data.height = "100%";
        item.data.width = "81%";
      }
      return item;
    });
    ArArticle.entityMap = updatedArt;

    const htmlcontent = stateToHTML(convertFromRaw(ArArticle));
    var depth1Comments = thoArticle.comments.filter((item) => item.depth == 1);

    return (
      <div className="ui stackable two column grid articleG m-3">
        <div className="four wide column">
          <div className="ui segment">
            <ArticleleftUser creator={article.creator} />
          </div>
        </div>
        <div className="eleven wide column">
          <div className="ui raised segment mainArto ">{renderHTML(htmlcontent)}</div>
          <div className="ui segment">
            <h3 className="mb-2">{`Comments: ${thoArticle.comments.length}`}</h3>
            <CommentForm onSubmit={userCommentsHandler} width="30vw" />

            <CommentList comments={depth1Comments} allComments={thoArticle.comments} userCommentsHandler={userCommentsHandler} />
          </div>
        </div>
        <div className="one wide column">
          <div className="position-relative">
            <div
              className="ui raised segment"
              style={{
                position: "fixed",
                display: "flex",
                flexDirection: "column",
                alignContent: "center",
                justifyContent: "center",
              }}
            >
              <div>
                <i class="eye icon"></i>
                {article.viewers.length}
              </div>
              <div
                className="mt-2"
                onClick={(e) => {
                  var thelikes = article.likes;
                  console.log(thelikes);
                  if (_.findIndex(article.likes, ["liker", localStorage.getItem("userId")]) == -1) {
                    thelikes = [...thelikes, { liker: localStorage.getItem("userId"), dateliked: new Date() }];
                    setThoarticle({ ...article, likes: thelikes });
                  } else {
                    thelikes = thelikes.filter((item) => item.liker !== localStorage.getItem("userId"));
                    setThoarticle({ ...article, likes: thelikes });
                  }
                  userLikeQA({
                    variables: {
                      userId: localStorage.getItem("userId"),
                      likeQAsId: article.id,
                    },
                  });
                }}
              >
                <i
                  class="thumbs up icon"
                  style={_.findIndex(article.likes, ["liker", localStorage.getItem("userId")]) != -1 ? { color: "green" } : {}}
                ></i>
                {article.likes.length}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default QAs;
