import React from "react";
import "./Hero.css";
import hand_icon from "../Assets/hand_icon.png";
import arrow_icon from "../Assets/arrow.png";
import hero_image from "../Assets/hero_image.png";
import { useNavigate } from "react-router-dom";
export const Hero = () => {
  const navigate = useNavigate();
  return (
    <div className="hero">
      <div className="hero-left">
        <h2>NEW ARRIVALS ONLY</h2>
        <div>
          <div className="hero-hand-icon">
            <p>new</p>
            <img src={hand_icon} />
          </div>
          <p>collections</p>
          <p>for everyone</p>
        </div>

        <div onClick={()=>navigate("/mens")} className="hero-latest-btn">
          <div>Latest collection</div>
          <img src={arrow_icon} />
        </div>
      </div>

      <div className="hero-right">
        <img src={hero_image} />
      </div>
    </div>
  );
};
