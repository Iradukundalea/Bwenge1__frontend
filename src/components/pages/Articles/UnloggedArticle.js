import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { useSingleArticle, useViewArticle, useLikeArticle, useCommentArticle, userPoll } from "../Admin Panel/hooks/useAllArticles";
import { Editor, EditorState, convertFromRaw } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import renderHTML from "react-render-html";
import { useParams } from "react-router-dom";
import _ from "lodash";
import "./Styles/article.css";
import ProgressBar from "react-bootstrap/ProgressBar";
import history from "../../../Redux/actions/history";

import ArticleleftUser from "./Article Components/ArticleleftUser";
import CommentsModal from "../../CommentsModal";
import { CommentForm } from "../BwengeCourses/Components/Comments Components/CommentForm";
import { CommentList } from "../BwengeCourses/Components/Comments Components/CommentList";
import QuizPackage from "./Article Quiz Time/QuizPackage";

const UnloggedArticle = () => {
  const queryParams = new URLSearchParams(window.location.search);

  const quizId = queryParams.get("quiz");

  const { id } = useParams();
  const { data, loading, error } = useSingleArticle(id);
  const [thoArticle, setThoarticle] = useState();
  const [commentsModal, setCommentsModal] = useState(false);
  console.log({ data, loading, error });
  const setDatatostate = () => {
    setThoarticle(data.getSingleArticle);
  };

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

  const article = data.getSingleArticle;
  console.log(article);
  var ArArticle = JSON.parse(article.article);
  var updatedArt = _.mapValues(JSON.parse(article.article).entityMap, function (item) {
    if (item.type == "IMAGE") {
      item.data.height = "100%";
      item.data.width = "81%";
    }
    return item;
  });
  ArArticle.entityMap = updatedArt;

  const htmlcontent = stateToHTML(convertFromRaw(ArArticle));

  return (
    <div className="ui stackable two column grid articleG m-3">
      <div className="four wide column">
        <div className="ui segment">
          <ArticleleftUser creator={article.creator} />
        </div>
      </div>

      <div className="eleven wide column">
        <div className="ui raised segment mainArto ">{renderHTML(htmlcontent)}</div>
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
                alert("Login to like article");
              }}
            >
              <i
                class="thumbs up icon"
                style={_.findIndex(article.likes, ["liker", localStorage.getItem("userId")]) != -1 ? { color: "green" } : {}}
              ></i>
              {article.likes.length}
            </div>
            <div
              className="mt-2"
              onClick={(e) => {
                document.getElementById("theUpperNav").style.zIndex = "1";
                alert("Login to comment");
              }}
            >
              <i class="comments icon"></i>
              {article.comments.length}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnloggedArticle;
