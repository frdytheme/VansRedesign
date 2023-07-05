import React, { useEffect } from "react";
import styled, { keyframes } from "styled-components";
import EventBottomSlide from "./EventBottomSlide";

function EventModal({ newsDB, setNewsToggle, newsNum, setNewsNum }) {
  const data = newsDB.data[newsNum];
  const closeModal = (e) => {
    if (e.target !== e.currentTarget) return;
    setNewsToggle(false);
  };
  const scrollUp = (e) => {
    e.target.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <ModalStyle>
      <div className="modal_bg" onClick={closeModal}>
        <div className="modal_box">
          <img src={process.env.PUBLIC_URL + "./images/official/vans_logo.png"} alt="반스 로고" className="vans_logo" />
          <h2>{data.title}</h2>
          <h3>{data.sub}</h3>
          {data.figure.map((fig, idx) => (
            <figure key={idx}>
              <img src={process.env.PUBLIC_URL + `./images/news/${fig.img}`} alt="반스 뉴스 이미지" />
              <figcaption>
                {fig.by && <h4 className="by_txt">{fig.by}</h4>}
                {fig.caption && fig.caption.split("^").map((cap, idx) => <p key={idx}>{cap}</p>)}
              </figcaption>
            </figure>
          ))}
          {data.video && <video src={process.env.PUBLIC_URL + `./images/news/${data.video}`} muted autoPlay loop />}
          {data.des.split("^").map((des, idx) => (
            <p key={idx} className="description">
              {des}
            </p>
          ))}
          {data.info &&
            data.info.map((info, idx) => {
              return (
                <div key={idx} className="info_list">
                  {info.title && <p>{info.title}</p>}
                  <ul>
                    {info.list.map((li, idx) => (
                      <li key={idx}>{li}</li>
                    ))}
                  </ul>
                </div>
              );
            })}
          <EventBottomSlide setNewsNum={setNewsNum} />
        </div>
      </div>
    </ModalStyle>
  );
}
const slideUp = keyframes`
100% {
  opacity: 1;
  transform: translateY(0);
}
`;
const bgOff = keyframes`
100% {
  background-color: rgba(0, 0, 0, 0.5);
}
`;

const ModalStyle = styled.article`
  .modal_bg {
    position: absolute;
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: 9999;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0);
    animation: ${bgOff} 0.7s forwards;
    .modal_box {
      position: absolute;
      width: 100%;
      height: 95vh;
      border-radius: 20px 20px 0 0;
      bottom: 0;
      border-top: 30px solid #d51920;
      background-color: white;
      transform: translateY(120%);
      opacity: 0;
      animation: ${slideUp} 0.7s forwards;
      text-align: center;
      overflow: auto;
      box-sizing: border-box;
      .vans_logo {
        width: 10%;
        margin: 60px 0;
      }
      &::-webkit-scrollbar {
        width: 10px;
      }
      &::-webkit-scrollbar-thumb {
        background-color: var(--color-red);
        background-clip: padding-box;
        border-radius: 10px;
        border: 2px solid transparent;
      }
      h2 {
        font-size: 24px;
        font-weight: bold;
        position: relative;
        &::before {
          content: "";
          position: absolute;
          bottom: -40px;
          left: 50%;
          transform: translateX(-50%);
          width: 50px;
          height: 4px;
          background-color: black;
          z-index: 8;
        }
      }
      h3 {
        margin: 80px 0 40px;
        font-size: 20px;
      }
      figure {
        width: 60%;
        margin: 0 auto;
        img {
          object-fit: cover;
          width: 70%;
          margin: 20px 0;
        }
        figcaption {
          line-height: 1.5;
          .by_txt {
            font-style: italic;
            margin: 20px 0;
            color: #555;
          }
          p {
            margin: 10px 0;
          }
        }
      }
      video {
        width: 40%;
        margin: 20px 0;
      }
      .description {
        padding: 10px 150px;
        font-weight: bold;
      }
      .info_list {
        margin: 30px 0;
        p {
          font-weight: bold;
          margin-bottom: 15px;
        }
        ul {
          li {
            margin: 10px 0;
          }
        }
        margin-bottom: 50px;
      }
    }
  }
`;

export default EventModal;
