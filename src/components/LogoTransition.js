import React, { useEffect, useState } from "react";
import styled from "styled-components";
import offthewall from "../assets/images/offthewall.png";
import { ReactComponent as Logo } from "../assets/images/board_logo.svg";
import "../assets/fonts/font.css";
import oldSkool from "../assets/images/oldskool.png";
import authentic from "../assets/images/authentic.png";
import slipOn from "../assets/images/slip_on.png";
import era from "../assets/images/era.png";
import skHi from "../assets/images/sk8_hi.png";
import LogoFont from "./LogoFont";
import { useNavigate } from "react-router-dom";
import PUBLIC from "../assets/module/PUBLIC";

function LogoTransition() {
  const shoesArr = [oldSkool, authentic, slipOn, era, skHi];
  const [shoesIdx, setShoesIdx] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setShoesIdx((prevIndex) => (prevIndex + 1) % shoesArr.length);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      window.location.replace("/home");
    }
  }, []);

  return (
    <LogoMain>
      <div className="video_wrapper">
        <div className="video_blk"></div>
        <video
          src={`${PUBLIC}/videos/vans_official_movie.mp4`}
          muted
          autoPlay
          loop
          className="main_video"
        ></video>
      </div>
      <div className="logo_wrapper">
        <BoardLogo />
        <div className="logo_box" onClick={() => navigate("home")}>
          <LogoFont />
          <img
            src={shoesArr[shoesIdx]}
            alt="반스 기본 신발"
            className="shoesImg"
          />
        </div>
        <img src={offthewall} alt="OFF THE WALL" className="offthewall" />
      </div>
    </LogoMain>
  );
}

const BoardLogo = styled(Logo)`
  path {
    fill: #d51920;
  }
`;

const LogoMain = styled.div`
  width: 100%;
  height: 100vh;
  .logo_wrapper {
    width: 100%;
    height: 100%;
    text-align: center;
    display: flex;
    flex-flow: column;
    align-items: center;
    padding: 30px 0 100px 0;
    box-sizing: border-box;
    z-index: 99;
    overflow: hidden;
    .logo_box {
      position: relative;
      margin: auto;
      width: auto;
      height: 200px;
      cursor: pointer;
      .shoesImg {
        position: absolute;
        width: 80%;
        max-width: 330px;
        bottom: -20%;
        left: 50%;
        transform: translateX(-50%);
      }
    }
    .offthewall {
      margin: 30px 0;
      width: 80%;
      max-width: 368px;
    }
  }
  .video_wrapper {
    width: 100%;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    z-index: -1;
    .video_blk {
      width: 100%;
      height: 100vh;
      background-color: #000;
      opacity: 0.7;
      position: absolute;
      top: 0;
      left: 0;
    }
    .main_video {
      object-fit: cover;
      height: 100vh;
    }
  }
`;

export default LogoTransition;
