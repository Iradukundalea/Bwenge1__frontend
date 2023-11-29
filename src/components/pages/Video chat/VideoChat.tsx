import React, { useEffect, useState } from "react";
import "./videochat.css";

import {
  AgoraVideoPlayer,
  createClient,
  createMicrophoneAndCameraTracks,
  ClientConfig,
  IAgoraRTCRemoteUser,
  ICameraVideoTrack,
  IMicrophoneAudioTrack,
} from "agora-rtc-react";

// define config for rtc engine
const config: ClientConfig = {
  mode: "rtc",
  codec: "vp8",
};

const appId: string = "929d4c95740146c38842990e1d72428d"; //ENTER APP ID HERE
const token: string | null = "006929d4c95740146c38842990e1d72428dIAA5iChH1thhFT++V48EvTIkcACIJyjh2++dOaW1G9FlwnJFvwUAAAAAEACQKMvtKXrTYgEAAQApetNi";

const VideoChat = () => {
  const [inCall, setInCall] = useState(false);
  const [channelName, setChannelName] = useState("");

  return (
    <div>
      <h1 className="heading">Bwenge Talks</h1>
      {inCall ? <VideoCall setInCall={setInCall} channelName={channelName} /> : <ChannelForm setInCall={setInCall} setChannelName={setChannelName} />}
    </div>
  );
};

const useClient = createClient(config);
const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
//VideoCall component
const VideoCall = (props: { setInCall: React.Dispatch<React.SetStateAction<boolean>>; channelName: string }) => {
  const { setInCall, channelName } = props;
  const [users, setUsers] = useState<IAgoraRTCRemoteUser[]>([]);
  const [start, setStart] = useState<boolean>(false);
  const client = useClient();
  const { ready, tracks } = useMicrophoneAndCameraTracks();
  useEffect(() => {
    // function to initialise the SDK
    let init = async (name: string) => {
      client.on("user-published", async (user, mediaType) => {
        await client.subscribe(user, mediaType);
        console.log("subscribe success");
        if (mediaType === "video") {
          setUsers((prevUsers) => {
            return [...prevUsers, user];
          });
        }
        // if (mediaType === "audio") {
        //   user.audioTrack?.play();
        // }
      });

      client.on("user-unpublished", (user, type) => {
        console.log("unpublished", user, type);
        // if (type === "audio") {
        //   user.audioTrack?.stop();
        // }
        if (type === "video") {
          setUsers((prevUsers) => {
            return prevUsers.filter((User) => User.uid !== user.uid);
          });
        }
      });

      client.on("user-left", (user) => {
        console.log("leaving", user);
        setUsers((prevUsers) => {
          return prevUsers.filter((User) => User.uid !== user.uid);
        });
      });

      await client.join(appId, name, token, null);
      if (tracks) await client.publish([tracks[0], tracks[1]]);
      setStart(true);
    };

    if (ready && tracks) {
      console.log("init ready");
      init(channelName);
    }
  }, [channelName, client, ready, tracks]);
  return (
    <div className="App">
      {ready && tracks && <Controls tracks={tracks} setStart={setStart} setInCall={setInCall} />}
      {start && tracks && <Videos users={users} tracks={tracks} />}
    </div>
  );
};

//Channel component

const ChannelForm = (props: {
  setInCall: React.Dispatch<React.SetStateAction<boolean>>;
  setChannelName: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { setInCall, setChannelName } = props;

  return (
    <form className="join">
      {appId === "" && <p style={{ color: "red" }}>Please enter your Agora App ID in App.tsx and refresh the page</p>}
      <input type="text" placeholder="Enter Channel Name" onChange={(e) => setChannelName(e.target.value)} />
      <button
        onClick={(e) => {
          e.preventDefault();
          setInCall(true);
        }}
      >
        Join
      </button>
    </form>
  );
};

export default VideoChat;

//video component
const Videos = (props: { users: IAgoraRTCRemoteUser[]; tracks: [IMicrophoneAudioTrack, ICameraVideoTrack] }) => {
  const { users, tracks } = props;

  return (
    <div>
      <div id="videos">
        <AgoraVideoPlayer className="vid" videoTrack={tracks[1]} />
        {users.length > 0 &&
          users.map((user) => {
            if (user.videoTrack) {
              return <AgoraVideoPlayer className="vid" videoTrack={user.videoTrack} key={user.uid} />;
            } else return null;
          })}
      </div>
    </div>
  );
};

//controls component

export const Controls = (props: { tracks: any; setStart: any; setInCall: any }) => {
  const client = useClient();
  const { tracks, setStart, setInCall } = props;
  const [trackState, setTrackState] = useState({ video: true, audio: true });

  const mute = async (type: "audio" | "video") => {
    if (type === "audio") {
      await tracks[0].setEnabled(!trackState.audio);
      setTrackState((ps) => {
        return { ...ps, audio: !ps.audio };
      });
    } else if (type === "video") {
      await tracks[1].setEnabled(!trackState.video);
      setTrackState((ps) => {
        return { ...ps, video: !ps.video };
      });
    }
  };

  const leaveChannel = async () => {
    await client.leave();
    client.removeAllListeners();
    tracks[0].close();
    tracks[1].close();
    setStart(false);
    setInCall(false);
  };

  return (
    <div className="controls">
      <p className={trackState.audio ? "on" : ""} onClick={() => mute("audio")}>
        {trackState.audio ? "MuteAudio" : "UnmuteAudio"}
      </p>
      <p className={trackState.video ? "on" : ""} onClick={() => mute("video")}>
        {trackState.video ? "MuteVideo" : "UnmuteVideo"}
      </p>
      {<p onClick={() => leaveChannel()}>Leave</p>}
    </div>
  );
};

// import React from "react";
// import VideoPlayer from "../../Video Chat/VideoPlayer";
// import Options from "../../Video Chat/Options";
// import Notifications from "../../Video Chat/Notifications";
// import { ContextProvider } from "../../../SocketContext";
// const VideoChat = () => {
//   return (
//     <div>

//       <ContextProvider>
//         <VideoPlayer />
//         <Options>
//           <Notifications />
//         </Options>
//       </ContextProvider>

//     </div>
//   );
// };

// export default VideoChat;
