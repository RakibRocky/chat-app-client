import React from "react";
import "./TopBar.css";
import wifi from "../assests/wifi.png";
// import { BsArrowLeft } from "react-icons/bs";
import nature from "../assests/nature.jpg";
import { BiArrowBack } from "react-icons/bi";

const TopBar = ({ name }) => {
  let date = new Date();
  let hour = date.getHours();
  let minits = date.getMinutes();
  let ampm = "AM";
  if (minits < 10) {
    minits = "0" + minits;
  }
  if (hour > 12) {
    hour -= 12;
    ampm = "PM";
  }
  let time = hour + ":" + minits + " " + ampm;
  return (
    <div className="Bar">
      <div className="topBar">
        <div>
          <span className="time">{time}</span>
        </div>
        <div>
          <img className="wifi-icon" src={wifi} alt="" />
        </div>
      </div>
      <div className="contactBar">
        <div className="backIcon">
          <span>
            <BiArrowBack></BiArrowBack>

            {/* <BsArrowLeft size={25}></BsArrowLeft> */}
          </span>
        </div>
        <div className="name">
          <h4>{name}</h4>
          <span>online</span>
        </div>
        <div className="profileImg">
          <img className="img" src={nature} alt="" />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
