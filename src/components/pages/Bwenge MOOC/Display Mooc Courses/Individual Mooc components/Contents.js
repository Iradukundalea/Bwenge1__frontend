import React, { useState, useEffect } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import VideoImage from "./../../../../../imgs/video.svg";
import fileImage from "./../../../../../imgs/file.svg";
import ReactPlayer from "react-player/lazy";
import _ from "lodash";
import "./styles/contents.css";
import DocsViewer from "../../../../DocsViewer";
import history from "../../../../../Redux/actions/history";
import { useParams } from "react-router-dom";
import VideoPlayer from "./Contents components/VideoPlayer";
import { useUserContentData } from "../../hooks/useUserCourses";
// import SlidePresentationExample from "../../../../SlideDocsViewer.tsx";

import SlidePresentationExample from "../../../../SlidePresentationExample";
import thekomp from "./../../../../../thekomp";

const Contents = ({ chapters }) => {
  const [selectedChap, setSelectedChap] = useState([]);
  let selectedLec;
  var chapcnt = 0;

  const API = thekomp;

  console.log(selectedChap);
  let lecCount = 0;

  const queryParams = new URLSearchParams(window.location.search);
  const { id } = useParams();
  const lecfile = queryParams.get("lecfile");
  let selectedFile;
  if (lecfile) {
    for (var i = 0; i < chapters.length; i++) {
      for (var j = 0; j < chapters[i].lectures.length; j++) {
        for (var k = 0; k < chapters[i].lectures[j].lectureFiles.length; k++) {
          if (chapters[i].lectures[j].lectureFiles[k].id === lecfile) {
            selectedLec = chapters[i].lectures[j];
            selectedFile = chapters[i].lectures[j].lectureFiles[k];
            //   setSelectedFile(chapters[i].lectures[j].lectureFiles[0])
            break;
          }
        }
      }
    }
  }

  const renderLectures = (chapter) => {
    return chapter.lectures.map((lec) => {
      lecCount++;
      return (
        <div>
          <div
            style={{ backgroundColor: "beige", cursor: "pointer" }}
            onClick={(e) => {
              // history.replace({
              //   pathname: `/indivmooc/${id}/content?lecId=${lec.id}`,
              // });
              history.push(`?lecfile=${lec.lectureFiles[0].id}`);
              //   setSelectedLec(lec);
              //   setSelectedFile(lec.lectureFiles[0]);
            }}
            className="lectitle ui raised segment mt-2"
          >
            <span className="LecturTitle"> Lecture {lecCount}:</span> {lec.title}
          </div>
          {/* <div>
                        {renderlecFiles(lec.lectureFiles)}
                    </div> */}
        </div>
      );
    });
  };
  const renderChapters = chapters.map((chapter) => {
    chapcnt++;
    return (
      <div
        className="ui raised segment"
        onClick={(e) => {
          if (_.includes(selectedChap, chapter.title)) {
            var newList = selectedChap;
            var newList = newList.filter((chap) => {
              if (chap !== chapter.title) return chap;
            });
            setSelectedChap(newList);
          } else {
            setSelectedChap([...selectedChap, chapter.title]);
          }
        }}
      >
        <span style={{ cursor: "pointer" }}>
          <span className="chapTitle">Chapter {chapcnt}:</span> {chapter.title}
        </span>
        {selectedChap.includes(chapter.title) ? <FaAngleUp className="dropicon" size={20} /> : <FaAngleDown className="dropicon" size={20} />}
        {selectedChap.includes(chapter.title) && <div>{renderLectures(chapter)}</div>}
      </div>
    );
  });
  const renderLectureContentICons = () => {
    return selectedLec.lectureFiles.map((file) => {
      return (
        <div className="">
          {file.fileLocation.substr(file.fileLocation.length - 3, 3) === "mp4" ? (
            <div
              onClick={(e) => history.push(`?lecfile=${file.id}`)}
              style={
                selectedFile === file
                  ? {
                      backgroundColor: "aqua",
                      borderRadius: "5px",
                      padding: "5px",
                    }
                  : { backgroundColor: "white", padding: "5px" }
              }
            >
              <img src={VideoImage} alt="videpImg" width={25} height={25}></img>
              {/* <p>{file.title}</p> */}
            </div>
          ) : (
            <div
              onClick={(e) => history.push(`?lecfile=${file.id}`)}
              style={
                selectedFile === file
                  ? {
                      backgroundColor: "aqua",
                      borderRadius: "5px",
                      padding: "5px",
                    }
                  : { backgroundColor: "white", padding: "5px" }
              }
            >
              <img src={fileImage} alt="fileImg" width={25} height={25}></img>
              {/* <p>{file.title}</p> */}
            </div>
          )}
        </div>
      );
    });
  };
  const renderLectureContent = () => {
    return selectedLec.lectureFiles.map((file) => {
      console.log(file.fileLocation.substr(file.length - 3, 3));

      return (
        <div className="">
          <div>
            {file.fileLocation.substr(file.fileLocation.length - 3, 3) === "mp4" && selectedFile === file && (
              <div>
                <VideoPlayer loc={file.fileLocation} />
              </div>
            )}
            {file.fileLocation.substr(file.fileLocation.length - 3, 3) === "pdf" && selectedFile === file && (
              <div style={{ height: "60vh" }}>
                <iFrame class="embed-responsive-item" width="100%" height="100%" src={`${API}/${file.fileLocation}#toolbar=0&navpanes=0`} />
                {/* <SlidePresentationExample fileUrl={`${file.fileLocation}`} /> */}
                {/* <DocsViewer link={`${API}/${file.fileLocation}`} /> */}
              </div>
            )}
          </div>
        </div>
      );
    });
  };

  return (
    <div>
      {_.isEmpty(selectedLec) ? (
        renderChapters
      ) : (
        <div className="ui raised segment">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            {renderLectureContentICons()}
          </div>
          <div>{renderLectureContent()}</div>
        </div>
      )}
    </div>
  );
};

export default Contents;
