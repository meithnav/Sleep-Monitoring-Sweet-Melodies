import React from "react";
import rightPic from "../../assets/images/sleep.jpeg";

import "../../styles/banner.css";

export default function Banner() {
  return (
    <>
      <div className="banner">
        <img src={rightPic} className="rightpic" alt="rightpic" />

        <div className="banner_txt">
          <p>Help people in need</p>
          <h1>Lend a helping hand and get involved..</h1>
          <a href="#">Monitor</a>
          <a className="a_last" href="#">
            Explore
          </a>
        </div>
      </div>
    </>
  );
}
