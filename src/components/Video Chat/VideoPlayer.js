import React, { useContext } from "react";
import { SocketContext } from "../../SocketContext";

const VideoPlayer = () => {
  const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } = useContext(SocketContext);
  console.log(myVideo);
  return (
    <div>
      {/* my own video */}
      {stream && (
        <div>
          <div>{name || "name"}</div>
          <video playsInline muted ref={myVideo} autoPlay style={{ width: "300px" }} />
        </div>
      )}
      {/* other users video */}
      {callAccepted && !callEnded && (
        <div>
          <div>{call.name || "name"}</div>
          <video playsInline ref={userVideo} autoplay />
        </div>
      )}
      VideoPlayer
    </div>
  );
};

export default VideoPlayer;
