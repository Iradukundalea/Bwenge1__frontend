import React, { useState, useEffect } from "react";
import { useSingleArticle, approve_article } from "../../hooks/useAllArticles";
import createImagePlugin from "@draft-js-plugins/image";
import { Editor, EditorState, convertFromRaw } from "draft-js";
import { convertToHTML, convertFromHTML } from "draft-convert";
import Modal from "../../../../Modal";

import { stateToHTML } from "draft-js-export-html";
import renderHTML from "react-render-html";
import _ from "lodash";
import { useMutation } from "@apollo/client";
import EditArticle from "../../../Articles/EditArticle";
import history from "../../../../../Redux/actions/history";

const imagePlugin = createImagePlugin();
const plugins = [imagePlugin];
const IndivArticle = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const articleID = queryParams.get("id");
  const onedit = queryParams.get("onedit");
  const { data, loading, error } = useSingleArticle(articleID);
  const [thaarticle, setthaArticle] = useState();
  const [approveArticle, {}] = useMutation(approve_article);
  const [editArticle, setEditArticle] = useState(false);
  useEffect(() => {
    if (loading === false && data) {
      setthaArticle(data.getSingleArticle);
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

  const article = thaarticle;
  console.log(article);
  if (article) {
    console.log(JSON.parse(article.article));
    var ArArticle = JSON.parse(article.article);
    var updatedArt = _.mapValues(JSON.parse(article.article).entityMap, function (item) {
      if (item.type == "IMAGE") {
        item.data.height = "100%";
        item.data.width = "81%";
      }
      return item;
    });
    ArArticle.entityMap = updatedArt;
    // var updatedArt = JSON.parse(article.article).entityMap.map((item) => {
    //   if (item.type == "IMAGE") {
    //     item.data.height = "100%";
    //     item.data.width += "%";
    //   }
    //   return item;
    // });
    console.log(ArArticle);
    const contentState = convertFromRaw(ArArticle);
    const editorState = EditorState.createWithContent(contentState);

    const htmlcontent = stateToHTML(convertFromRaw(ArArticle));
    console.log(htmlcontent);
    if (onedit == "true")
      return (
        <div className="ui segment">
          <EditArticle thoarticle={JSON.parse(article.article)} setthaArticle={setthaArticle} thaarticle={thaarticle} />
        </div>
      );
    return (
      <div className="ui segment">
        {/* <Editor editorState={editorState} readOnly={true} /> */}
        {renderHTML(htmlcontent)}
        <div className="ui segment">
          {article.polls.map((item) => {
            return (
              <div>
                {item.topic}
                {item.options.map((itemo) => {
                  return <div className="ui raised segment">{itemo}</div>;
                })}
              </div>
            );
          })}
        </div>
        {!article.onApproved && (
          <button
            onClick={(e) => {
              approveArticle({
                variables: { approveArticleId: article.id },
              }).then((res) => {
                alert("Article approved");
                window.location.reload(false);
              });
            }}
            style={{ position: "fixed", top: "10px", right: "20px" }}
            className="ui primary button"
          >
            Approve Article
          </button>
        )}
        <button
          onClick={(e) => history.push(`?menu=bwengearticles&id=${article.id}&onedit=true`)}
          class="ui success button"
          style={{ position: "fixed", top: "50px", right: "40px" }}
        >
          <i class="icon edit"></i>
          Edit
        </button>
      </div>
    );
  }
};

export default IndivArticle;
