import React, { useContext, useEffect, useState } from "react";
import Webcam from "react-webcam";
import "../styles/monitor.css";
import { UserContext } from "../utils/UserContext";
import axios from "axios";

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user",
};

const WebcamScreen = () => {
  // let socketPath;
  // let chatSocket;
  const { user, userDetails } = useContext(UserContext);
  const webcamRef = React.useRef(null);

  // useEffect(() => {
  //   socketPath = `wss://485e-2409-4040-e10-c1ba-ddf7-3950-a2ea-4010.ngrok.io/receiver/`;
  //   chatSocket = new WebSocket(socketPath);

  //   chatSocket.onopen = (e) => {
  //     console.log("Opening a connection...");
  //     window.identified = false;
  //   };

  //   return () => {
  //     chatSocket.close();
  //   };
  // }, []);

  const [imageSrc, setImageSrc] = useState({
    frame: "",
    len: 0,
  });

  const capture = React.useCallback(() => {
    const ss = webcamRef.current.getScreenshot();
    setImageSrc(() => ({
      frame: ss,
      len: ss.length,
    }));

    // if (imageSrc.frame !== "") {
    // console.log("INSIDE IF", imageSrc);
    // chatSocket.send(JSON.stringify(imageSrc));
    // }
  }, [webcamRef]);

  useEffect(() => {
    console.log(imageSrc);
    if (imageSrc.frame !== "") {
      axios
        .post("/frame-capture/receive-data/", imageSrc, {
          headers: {
            Authorization: `Token ${user}`,
          },
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [imageSrc, user]);

  return (
    <>
      <Webcam
        className="webCam"
        audio={false}
        height={600}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={1280}
        videoConstraints={videoConstraints}
      />
      <button className="click" onClick={capture}>
        Capture photo
      </button>
    </>
  );
};

export default WebcamScreen;
