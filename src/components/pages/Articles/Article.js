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

const Article = () => {
  const queryParams = new URLSearchParams(window.location.search);

  const quizId = queryParams.get("quiz");

  const { id } = useParams();
  const { data, loading, error } = useSingleArticle(id);
  const [thoArticle, setThoarticle] = useState();
  const [commentsModal, setCommentsModal] = useState(false);
  const [userViewArticle, {}] = useMutation(useViewArticle);
  const [userLikeArticle, {}] = useMutation(useLikeArticle);
  const [quizLoad, setQuizLoad] = useState(false);
  const [userCommentArticle, {}] = useMutation(useCommentArticle);
  const [thopolls, setthopolls] = useState([]);
  console.log(thopolls);
  const [userPoller, {}] = useMutation(userPoll);
  const setDatatostate = () => {
    setThoarticle(data.getSingleArticle);
  };
  const userCommentsHandler = (message, parentId) => {
    userCommentArticle({
      variables: {
        commentArticleId: id,
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
      var oldcomments = thoArticle.comments;
      oldcomments = [...oldcomments, res.data.commentArticle.comments[res.data.commentCourse.comments.length - 1]];

      setThoarticle({ ...thoArticle, comments: oldcomments });
    });
  };
  useEffect(() => {
    if (loading === false && data) {
      console.log(data);
      var theviews = data.getSingleArticle.viewers;
      if (!theviews.includes(localStorage.getItem("userId"))) {
        userViewArticle({
          variables: {
            userId: localStorage.getItem("userId"),
            viewArticleId: data.getSingleArticle.id,
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
    const ArticleCommentsContent = () => {
      var depth1Comments = thoArticle.comments.filter((item) => item.depth == 1);
      return (
        <div>
          <CommentForm onSubmit={userCommentsHandler} width="30vw" />

          <CommentList comments={depth1Comments} allComments={thoArticle.comments} userCommentsHandler={userCommentsHandler} />
        </div>
      );
    };
    return (
      <div className="ui stackable two column grid articleG m-3">
        <div className="four wide column">
          <div className="ui segment">
            <ArticleleftUser creator={article.creator} />
          </div>
        </div>
        {!quizId ? (
          <div className="eleven wide column">
            <div className="ui raised segment mainArto ">{renderHTML(htmlcontent)}</div>
            {article.polls.length > 0 && (
              <div className="ui pilled segment">
                <a class="ui blue right ribbon label">Polls</a>
                {article.polls.map((item) => {
                  return (
                    <div className="ui segment">
                      <div className="mb-2">{item.topic}</div>
                      {item.options.map((itemo) => {
                        if (thopolls.length > 0) {
                          var nbr = thopolls.filter((ito) => ito.option == itemo);
                          var perc = (nbr.length * 100) / thopolls.length;
                        }
                        return (
                          <div
                            onClick={(e) => {
                              const userpoll = {
                                userId: localStorage.getItem("userId"),
                                pollId: item.id,
                                option: itemo,
                              };
                              userPoller({
                                variables: {
                                  userpoll,
                                },
                              }).then((res) => {
                                console.log(res);
                                setthopolls(res.data.userPoll);
                              });
                            }}
                            className="ui raised segment"
                            style={{ cursor: "pointer" }}
                          >
                            {thopolls.length > 0 && <ProgressBar now={perc} label={`${nbr.length} votes`} />}
                            {itemo}
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            )}
            {article.postArticleQuiz.length > 0 && (
              <div className="ui pilled segment">
                <a class="ui blue right ribbon label">Post Article Quizes</a>
                {article.postArticleQuiz.map((item) => {
                  var qstnsNbr = 0;
                  item.problems.map((oki) => {
                    oki.questions.map((ito) => qstnsNbr++);
                  });
                  return (
                    <div className="ui segment">
                      <div className="ui stackable two column grid">
                        <div className="four wide column">
                          <div className="ui segment">{qstnsNbr} Questions</div>
                        </div>
                        <div className="four wide column">
                          <div className="ui segment">{item.estimatedDuration} Minutes</div>
                        </div>
                        <div className="four wide right floated column">
                          <button
                            className="ui primary button"
                            onClick={(e) => {
                              history.push(`/article/${article.id}?quiz=${item.id}`);
                            }}
                          >
                            Attempt Quiz
                          </button>
                        </div>
                      </div>
                      {/* <div className="mb-2">Article Quiz</div> */}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          <div className="eleven wide column">
            <div className="ui segment">
              <QuizPackage thoquiz={article.postArticleQuiz[0]} />
            </div>
          </div>
        )}
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
                  userLikeArticle({
                    variables: {
                      userId: localStorage.getItem("userId"),
                      likeArticleId: article.id,
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
              <div
                className="mt-2"
                onClick={(e) => {
                  document.getElementById("theUpperNav").style.zIndex = "1";
                  setCommentsModal(true);
                }}
              >
                <i class="comments icon"></i>
                {article.comments.length}
              </div>
            </div>
          </div>
        </div>
        {commentsModal && (
          <CommentsModal
            title={`Comments ${article.comments.length}`}
            content={ArticleCommentsContent()}
            onDismiss={(e) => {
              document.getElementById("theUpperNav").style.zIndex = "10";

              setCommentsModal(false);
            }}
          />
        )}
      </div>
    );
  }
};

export default Article;
