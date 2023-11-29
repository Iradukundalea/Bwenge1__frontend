import React, { Component } from "react";
import ReactPlayer from "react-player/lazy";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useUserContentData } from "../../../hooks/useUserCourses";
import { Progress, Segment } from "semantic-ui-react";
import thekomp from "./../../../../../../thekomp";

class VideoPlayer extends Component {
  state = {
    url: null,
    pip: false,
    playing: true,
    controls: false,
    light: false,
    volume: 0.8,
    muted: false,
    played: 0,
    loaded: 0,
    duration: 0,
    playbackRate: 1.0,
    loop: false,
  };

  updateUserContentView = (courseId, title, playedsecs, duration) => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("currentSecond", playedsecs);
    formData.append("contentDuration", duration);
    var url = `${thekomp}/enroll/updateusercontentview/${localStorage.getItem("userId")}/${courseId}`;
    const config = {
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
  handleSeekMouseDown = (e) => {
    this.setState({ seeking: true });
  };

  handleSeekChange = (e) => {
    this.setState({ played: parseFloat(e.target.value) });
  };
  handleSeekMouseUp = (e) => {
    this.setState({ seeking: false });

    this.player.seekTo(parseFloat("0.5"));
  };
  ref = (player) => {
    this.player = player;
  };
  render() {
    const { url, playing, controls, light, volume, muted, loop, played, loaded, duration, playbackRate, pip } = this.state;

    const { id } = this.props.params;
    // const API = "http://localhost:3000";
    const API = thekomp;
    return (
      <div>
        <Segment>
          {this.props.userContentData && (
            <Progress
              percent={Math.floor((this.props.userContentData.content[0].maxWatched * 100) / this.state.duration)}
              attached="top"
              color={this.state.duration - this.props.userContentData.content[0].maxWatched < 5 ? "green" : "red"}
            />
          )}
          <ReactPlayer
            ref={this.ref}
            url={`${API}/${this.props.loc}`}
            controls={true}
            playing={true}
            loop={true}
            // onProgress={(progress) => {
            //   if (Math.floor(progress.playedSeconds) % 5 === 0 && Math.floor(progress.playedSeconds) !== 0) {
            //     this.updateUserContentView(id, this.props.loc, progress.playedSeconds, this.player.getDuration());
            //   }
            // }}
            height="60vh"
            width="fit-content"
            // onStart={() => {
            //   let frac;
            //   if (this.props.userContentData) {
            //     frac = this.props.userContentData.content[0].lastCheckPoint / this.player.getDuration();
            //   }
            //   this.player.seekTo(parseFloat(frac));
            //   this.setState({
            //     ...this.state,
            //     duration: this.player.getDuration(),
            //   });
            // }}
          />
          {this.props.userContentData && (
            <Progress
              percent={Math.floor((this.props.userContentData.content[0].maxWatched * 100) / this.state.duration)}
              attached="bottom"
              color={this.state.duration - this.props.userContentData.content[0].maxWatched < 5 ? "green" : "red"}
            />
          )}
        </Segment>

        {/* <p>
          {Math.floor(
            (this.props.userContentData.content[0].maxWatched * 100) /
              this.state.duration
          )}
          %
        </p>
        <Progress
          percent={Math.floor(
            (this.props.userContentData.content[0].maxWatched * 100) /
              this.state.duration
          )}
          color={
            this.state.duration -
              this.props.userContentData.content[0].maxWatched <
            5
              ? "green"
              : "red"
          }
        /> */}

        {/* <div
          class="ui green inverted progress"
          data-percent={Math.floor(
            (this.props.userContentData.content[0].maxWatched * 100) /
              this.state.duration
          )}
        >
          <div class="bar">
            <div class="progress"></div>
          </div>
        </div> */}
      </div>
    );
  }
}
export default (props) => {
  const { id } = useParams();
  const res = useUserContentData(localStorage.getItem("userId"), id, props.loc);

  if (res.loading) {
    return (
      <div class="ui segment">
        <div class="ui active inverted dimmer">
          <div class="ui text loader">Loading</div>
        </div>
        <p></p>
      </div>
    );
  }
  if (res.error) {
    console.log(res.error);
    return <h2>{res.error.Error}</h2>;
  }
  return <VideoPlayer {...props} params={useParams()} userContentData={res.data.getContentData} />;
};

// const withHook = (Component) => {
//   return (WrappedComponent = (props) => {
//     const { id } = useParams();
//     const res = useUserContentData(
//       localStorage.getItem("userId"),
//       courseId,
//       id
//     );
//     return <Component {...props} someHookValue={res} params={useParams()} />;
//   });
// };
// export default withHook(VideoPlayer);

// export default VideoPlayer;
