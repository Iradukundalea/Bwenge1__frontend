import * as React from "react";
import {
  Icon,
  MinimalButton,
  PageChangeEvent,
  DocumentLoadEvent,
  Position,
  SpecialZoomLevel,
  Tooltip,
  Viewer,
  Worker,
  Plugin,
} from "@react-pdf-viewer/core";
import { pageNavigationPlugin, RenderGoToPageProps } from "@react-pdf-viewer/page-navigation";
import { fullScreenPlugin } from "@react-pdf-viewer/full-screen";
import { ExitFullScreenIcon, FullScreenIcon } from "@react-pdf-viewer/full-screen";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/page-navigation/lib/styles/index.css";
import "@react-pdf-viewer/full-screen/lib/styles/index.css";
import thekomp from "./../thekomp";

import { useParams } from "react-router-dom";
import axios, { AxiosRequestConfig } from "axios";
import { useUserContentData } from "./pages/Bwenge MOOC/hooks/useUserCourses";

interface SlidePresentationExampleProps {
  link: string;
}

const SlidePresentationExample: React.FC<SlidePresentationExampleProps> = ({ link }) => {
  // const disableScrollPluginInstance = disableScrollPlugin();
  const pageNavigationPluginInstance = pageNavigationPlugin();

  const { CurrentPageLabel } = pageNavigationPluginInstance;
  const fullScreenPluginInstance = fullScreenPlugin();
  const { EnterFullScreen } = fullScreenPluginInstance;
  const API = thekomp;

  const { id } = useParams();
  const { data, loading, error } = useUserContentData(localStorage.getItem("userId"), id, link);
  if (loading) {
    return (
      <div className="ui segment">
        <div className="ui active inverted dimmer">
          <div className="ui text loader">Loading</div>
        </div>
        <p></p>
      </div>
    );
  }
  if (error) {
    console.log(error);
    return <h2>"failed"</h2>;
  }
  console.log(data);
  let thepagesn: number;
  const handleDocumentLoad = (e: DocumentLoadEvent) => {
    console.log(`Number of pages: ${e.doc.numPages}`);
    thepagesn = e.doc.numPages;
  };
  // const handlePageChange = (e: PageChangeEvent) => {
  //   localStorage.setItem(`current-page${link}`, `${e.currentPage}`);
  // };

  // const initialPage = localStorage.getItem(`current-page${link}`)
  //   ? parseInt(localStorage.getItem(`current-page${link}`), 10)
  //   : 0;

  const { GoToNextPage, GoToPreviousPage } = pageNavigationPluginInstance;
  console.log(fullScreenPluginInstance);
  const updateUserContentView = (title: string, curpage: number, totpages: string) => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("currentSecond", curpage.toString());
    formData.append("contentDuration", totpages);
    var url = `${API}/enroll/updateusercontentview/${localStorage.getItem("userId")}/${id}`;
    const config: AxiosRequestConfig = {
      method: "post",
      url: url,
      headers: {
        "Content-Type": "application/json",
      },
      data: formData,
    };
    axios(config)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };
  const ak = {
    workerUrl: "https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js",
  };

  return (
    <div
      className="rpv-core__viewer"
      style={{
        border: "1px solid rgba(0, 0, 0, 0.3)",
        height: "100%",
        position: "relative",
      }}
    >
      <div
        style={{
          left: 0,
          position: "absolute",
          top: "50%",
          transform: "translate(24px, -50%)",
          zIndex: 1,
        }}
      >
        <GoToPreviousPage>
          {(props: RenderGoToPageProps) => {
            const clickprops = {
              // make sure all required component's inputs/Props keys&types match
              onClick: props.onClick,
            };
            const sizeo = {
              size: 16,
            };
            return (
              <Tooltip
                position={Position.BottomCenter}
                target={
                  <MinimalButton {...clickprops}>
                    <Icon {...sizeo}>
                      <path d="M18.4.5,5.825,11.626a.5.5,0,0,0,0,.748L18.4,23.5" />
                    </Icon>
                  </MinimalButton>
                }
                content={() => "Previous page"}
                offset={{ left: 0, top: 8 }}
              />
            );
          }}
        </GoToPreviousPage>
      </div>

      <div
        style={{
          position: "absolute",
          right: 0,
          top: "50%",
          transform: "translate(-24px, -50%)",
          zIndex: 1,
        }}
      >
        <GoToNextPage>
          {(props: RenderGoToPageProps) => {
            const clickprops = {
              // make sure all required component's inputs/Props keys&types match
              onClick: props.onClick,
            };
            const sizeo = {
              size: 16,
            };

            return (
              <Tooltip
                position={Position.BottomCenter}
                target={
                  <MinimalButton {...clickprops}>
                    <Icon {...sizeo}>
                      <path d="M5.651,23.5,18.227,12.374a.5.5,0,0,0,0-.748L5.651.5" />
                    </Icon>
                  </MinimalButton>
                }
                content={() => "Next page"}
                offset={{ left: 0, top: 8 }}
              />
            );
          }}
        </GoToNextPage>
      </div>
      <div
        style={{
          border: "1px solid rgba(0, 0, 0, 0.3)",
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <div
          style={{
            alignItems: "center",
            backgroundColor: "#eeeeee",
            borderBottom: "1px solid rgba(0, 0, 0, 0.3)",
            display: "flex",
            justifyContent: "center",
            padding: "8px",
          }}
        >
          <CurrentPageLabel>
            {/* {(props: RenderCurrentPageLabelProps) => <span>{`${props.currentPage + 1} of ${props.numberOfPages}`}</span>} */}

            {(props: any) => <span>{`${props.currentPage + 1} of ${props.numberOfPages}`}</span>}
          </CurrentPageLabel>
          <EnterFullScreen>
            {/* {(props: RenderEnterFullScreenProps) => ( */}

            {(props: any) => (
              <button
                // style={{
                //     ...
                // }}
                onClick={props.onClick}
              >
                <FullScreenIcon />
              </button>
            )}
          </EnterFullScreen>
        </div>

        <div
          style={{
            flex: 1,
            overflow: "hidden",
          }}
        >
          <Worker {...ak}>
            <Viewer
              fileUrl={`${thekomp}/${link}`}
              onDocumentLoad={handleDocumentLoad}
              onPageChange={(e: PageChangeEvent) => {
                updateUserContentView(link, e.currentPage, thepagesn.toString());
                // handlePageChange(e);
              }}
              defaultScale={SpecialZoomLevel.PageFit}
              plugins={[pageNavigationPluginInstance, fullScreenPluginInstance]}
            />
          </Worker>
        </div>
      </div>
    </div>
  );
};

export default SlidePresentationExample;
