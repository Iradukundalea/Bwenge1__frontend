import React, { useState, useRef } from "react";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import Editor, { composeDecorators } from "@draft-js-plugins/editor";
import createToolbarPlugin from "@draft-js-plugins/static-toolbar";
import createTextAlignmentPlugin from "@draft-js-plugins/text-alignment";
import createImagePlugin from "@draft-js-plugins/image";
import history from "../../../Redux/actions/history";
import { EDIT_ARTICLE } from "../Admin Panel/hooks/useAllArticles";
import { useMutation } from "@apollo/client";

import createAlignmentPlugin from "@draft-js-plugins/alignment";
import createInlineToolbarPlugin from "@draft-js-plugins/inline-toolbar";
import createFocusPlugin from "@draft-js-plugins/focus";

import createResizeablePlugin from "@draft-js-plugins/resizeable";
import createSideToolbarPlugin from "@draft-js-plugins/side-toolbar";
import createBlockDndPlugin from "@draft-js-plugins/drag-n-drop";
import createHashtagPlugin from "@draft-js-plugins/hashtag";
import createVideoPlugin from "@draft-js-plugins/video";

import createDragNDropUploadPlugin from "@draft-js-plugins/drag-n-drop-upload";
import "./Styles/editorStyles.css";
import "@draft-js-plugins/side-toolbar/lib/plugin.css";
import "@draft-js-plugins/static-toolbar/lib/plugin.css";
import "@draft-js-plugins/inline-toolbar/lib/plugin.css";
import "@draft-js-plugins/emoji/lib/plugin.css";
import buttonStyles from "./Styles/buttonStyles.css";
import toolbarStyles from "./Styles/toolbarStyles.css";
import mockUpload from "./Create Article Components/mockUpload.js";
import thekomp from "./../../../thekomp.js";

import {
  BoldButton,
  ItalicButton,
  UnorderedListButton,
  OrderedListButton,
  BlockquoteButton,
  UnderlineButton,
  CodeBlockButton,
  HeadlineOneButton,
  HeadlineTwoButton,
  HeadlineThreeButton,
} from "@draft-js-plugins/buttons";
import createEmojiPlugin from "@draft-js-plugins/emoji";
import axios from "axios";
const emojiPlugin = createEmojiPlugin({
  useNativeArt: true,
});
const { EmojiSuggestions, EmojiSelect } = emojiPlugin;
const textAlignmentPlugin = createTextAlignmentPlugin();
const staticToolbarPlugin = createToolbarPlugin();
const hashtagPlugin = createHashtagPlugin();
const { Toolbar } = staticToolbarPlugin;
const focusPlugin = createFocusPlugin();
const resizeablePlugin = createResizeablePlugin();
const videoPlugin = createVideoPlugin();
const blockDndPlugin = createBlockDndPlugin();
const inlineToolbarPlugin = createInlineToolbarPlugin({
  theme: { buttonStyles, toolbarStyles },
});
const { InlineToolbar } = inlineToolbarPlugin;
const sideToolbarPlugin = createSideToolbarPlugin();
const { SideToolbar } = sideToolbarPlugin;

const alignmentPlugin = createAlignmentPlugin();
const { AlignmentTool } = alignmentPlugin;

const decorator = composeDecorators(resizeablePlugin.decorator, alignmentPlugin.decorator, focusPlugin.decorator, blockDndPlugin.decorator);
const imagePlugin = createImagePlugin({ decorator });

const dragNDropFileUploadPlugin = createDragNDropUploadPlugin({
  handleUpload: mockUpload,
  addImage: imagePlugin.addImage,
});
const plugins = [
  staticToolbarPlugin,
  textAlignmentPlugin,
  dragNDropFileUploadPlugin,
  blockDndPlugin,
  focusPlugin,
  alignmentPlugin,
  resizeablePlugin,
  imagePlugin,
  emojiPlugin,
  hashtagPlugin,
  inlineToolbarPlugin,
  videoPlugin,
  sideToolbarPlugin,
];

const EditArticle = ({ thoarticle, setthaArticle, thaarticle }) => {
  const queryParams = new URLSearchParams(window.location.search);
  const articleID = queryParams.get("id");

  const [editarticle, {}] = useMutation(EDIT_ARTICLE);
  const fields = {
    "": [],
    Engineering: [
      "Mechanical Engineering",
      "Chemical Engineering",
      "Material Science and Engineering",
      "Environmental Science",
      "Civil Engineering",
      "Telecommunication Engineering",
      "Computer Science",
      "Energy Science",
      "Biotechnology",
      "Nanoscience and Technology",
      "Food Science and Technology",
      "Automation and Control",
      "Mining and Mineral Engineering",
      "Water Resources",
      "Electronic and Electrical Engineering",
      "Remote sensing",
      "BiomedicL Engineering",
      "Software Engineering",
      "Metallurgical Engineering",
      "Others",
    ],
    "Natural Sciences": ["Mathematics", "Earth Sciences", "Physics", "Geography", "Atmospheric Science", "Chemistry", "Ecology", "Others"],
    "Life Sciences": ["Biological Sciences", "Veterinary Sciences", "Human Biological Sciences", "Agricultural Sciences", "Others"],
    "Medical Sciences": [
      "Clinical Medicine",
      "Nursing",
      "Public Health",
      "Medical Technology",
      "Dentistry",
      "Pharmacy",
      "Biomedical Laboratory",
      "Clinical Psychology",
      "Opthalmology",
      "Anesthesia",
      "Others",
    ],
    "Social Sciences": [
      "Economics",
      "Finance",
      "Hospitality and Tourism Management",
      "Political Science",
      "Statistics",
      "Communication",
      "Sociology",
      "Psychology",
      "Education",
      "Law",
      "Business Administration",
      "Public Administration",
      "Management",
      "Library and Information Science",
      "Others",
    ],
    "Professional Courses": [],
    "High School Coaching": [],
    "Culture Courses": [],
    "Language Courses": [],
    "National Courses": [],
  };
  const editor = useRef(null);
  const [selectedField, setSelectedField] = useState([]);
  const [objective, setObjective] = useState("");
  const [editorState, setEditorState] = useState(EditorState.createWithContent(convertFromRaw(thoarticle)));
  const [article, setArticle] = useState({
    title: "",
    field: "",
    department: "",
    tags: [],
  });

  const onChange = (editorState) => {
    setEditorState(editorState);
  };
  const alignmentStyles = ["left", "right", "center"];

  function myBlockStyleFn(contentBlock) {
    const type = contentBlock.getType();
    if (type === "blockquote") {
      return "superFancyBlockquote";
    }
  }
  const focus = () => editor.focus();
  const onsubmitArticleHnadler = async (e) => {
    e.preventDefault();
    const creator = {
      creatorId: localStorage.getItem("userId"),
      email: localStorage.getItem("email"),
      firstName: localStorage.getItem("firstName"),
      lastName: localStorage.getItem("lastName"),
    };
    const formData = new FormData();
    formData.append("title", article.title);
    formData.append("field", article.field);
    formData.append("department", article.department);
    formData.append("tags", JSON.stringify(article.tags));
    formData.append("article", JSON.stringify(convertToRaw(editorState.getCurrentContent())));
    formData.append("creator", JSON.stringify(creator));
    const config = {
      method: "post",
      url: `${thekomp}/article/createarticle`,
      headers: {
        "content-type": "multipart/form-data",
      },
      data: formData,
    };
    axios(config)
      .then((res) => {
        console.log(res);
        alert("Your article has been inserted successfully, After being approved it will be available publicly! Thx.");
        history.push("/bwengecourses/longcourses");
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };
  return (
    <div className="ui segment">
      <div className="ui form">
        <div className="field">
          <label>Article:</label>
          <div style={{ width: "80vw" }}>
            <div className="editor" onClick={focus} style={{ padding: "20px" }}>
              <Toolbar>
                {(externalProps) => (
                  <div className="icons-toolbar">
                    <HeadlineOneButton {...externalProps} />
                    <HeadlineTwoButton {...externalProps} />
                    <HeadlineThreeButton {...externalProps} />
                    <BoldButton {...externalProps} />
                    <ItalicButton {...externalProps} />
                    <UnderlineButton {...externalProps} />
                    <UnorderedListButton {...externalProps} />
                    <OrderedListButton {...externalProps} />
                    <BlockquoteButton {...externalProps} />
                    <CodeBlockButton {...externalProps} />
                    <textAlignmentPlugin.TextAlignment {...externalProps} />

                    {/* <AlignLeftOutlined onMouseDown={() => applyAlignment("left")} />
              <AlignCenterOutlined onMouseDown={() => applyAlignment("center")} />
              <AlignRightOutlined onMouseDown={() => applyAlignment("right")} /> */}
                  </div>
                )}
              </Toolbar>
              <Editor
                style={{ paddingTop: "20px" }}
                editorState={editorState}
                onChange={onChange}
                blockStyleFn={myBlockStyleFn}
                plugins={plugins}
                ref={editor}
              />
              <SideToolbar />
              <InlineToolbar />
            </div>
            {/* <VideoAdd editorState={editorState} onChange={onChange} modifier={videoPlugin.addVideo} /> */}
            <div className="options">
              <EmojiSelect closeOnEmojiSelect />
            </div>
          </div>
        </div>
      </div>
      <button
        className="ui primary button mt-4"
        onClick={(e) => {
          editarticle({
            variables: {
              editArticleId: articleID,
              articleStuff: JSON.stringify(convertToRaw(editorState.getCurrentContent())),
            },
          }).then(() => {
            setthaArticle({ ...thaarticle, article: JSON.stringify(convertToRaw(editorState.getCurrentContent())) });
            history.push(`?menu=bwengearticles&id=${articleID}`);
          });
        }}
      >
        Edit Article
      </button>
    </div>
  );
};

export default EditArticle;
