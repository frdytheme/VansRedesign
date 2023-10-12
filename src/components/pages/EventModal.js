import React from "react";
import styled, { keyframes } from "styled-components";
import EventBottomSlide from "./EventBottomSlide";
import PUBLIC from "../../assets/module/PUBLIC";

function EventModal({ newsDB, setNewsToggle, newsNum, setNewsNum }) {
  const data = newsDB.data[newsNum];
  const closeModal = (e) => {
    if (e.target !== e.currentTarget) return;
    setNewsToggle(false);
  };
  return (
    <ModalStyle>
      <div className="modal_bg" onClick={closeModal}>
        <div className="modal_box">
          <img
            src={`${PUBLIC}/images/official/vans_logo.png`}
            alt="반스 로고"
            className="vans_logo"
          />
          <div className="title_box">
            <h2>{data.title}</h2>
            <div className="title_line"></div>
            <h3>{data.sub}</h3>
          </div>
          {data.figure.map((fig, idx) => (
            <figure key={idx}>
              <img
                src={`${PUBLIC}/images/news/${fig.img}`}
                alt="반스 뉴스 이미지"
              />
              <figcaption>
                {fig.by && <h4 className="by_txt">{fig.by}</h4>}
                {fig.caption &&
                  fig.caption
                    .split("^")
                    .map((cap, idx) => <p key={idx}>{cap}</p>)}
              </figcaption>
            </figure>
          ))}
          {data.video && (
            <video
              src={`${PUBLIC}/images/news/${data.video}`}
              muted
              autoPlay
              loop
            />
          )}
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
    position: fixed;
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
      position: fixed;
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
      font-size: clamp(10px, 1.2vw, 16px);
      overflow: auto;
      box-sizing: border-box;
      .vans_logo {
        width: 10%;
        min-width: 70px;
        margin: 4vw 0;
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
      .title_box {
        display: grid;
        grid-auto-columns: 1fr;
        grid-template-rows: repeat(3, 1fr);
        place-items: center;
        gap: 2vw;
        margin-bottom: 2vw;
        h2 {
          font-size: clamp(16px, 1.5vw, 24px);
          font-weight: bold;
          position: relative;
        }
        .title_line {
          width: 2.5vw;
          height: 0.2vw;
          background-color: black;
          z-index: 8;
        }
        h3 {
          font-size: clamp(14px, 1.2vw, 20px);
        }
      }
      figure {
        width: 60%;
        margin: 0 auto;
        img {
          object-fit: cover;
          width: 75%;
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
        padding: 0.7vw 15vw;
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
