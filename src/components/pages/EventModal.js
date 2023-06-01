import React, { useEffect } from "react";
import styled, { keyframes } from "styled-components";

function EventModal({ newsDB, setNewsToggle, newsNum }) {
  const data = newsDB.data[newsNum];
  const closeModal = (e) => {
    if (e.target !== e.currentTarget) return;
    setNewsToggle(false);
  };
  return (
    <ModalStyle>
      <div className="modal_bg" onClick={closeModal}>
        <div className="modal_box" svg={eventFont}>
          <h2>{data.title}</h2>
          {data.des.split("^").map((des, idx) => (
            <p key={idx}>{des}</p>
          ))}
          {data.img.map((img) => (
            <img src={process.env.PUBLIC_URL + `./images/news/${img}`} alt="반스 뉴스 이미지" />
          ))}
        </div>
      </div>
    </ModalStyle>
  );
}
const slideUp = keyframes`
100% {
  transform: translateY(0);
}
`;

const ModalStyle = styled.article`
  .modal_bg {
    position: absolute;
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: 99;
    display: flex;
    justify-content: center;
    align-items: center;
    .modal_box {
      position: absolute;
      width: 90%;
      height: 85vh;
      border-radius: 20px;
      border-top: 50px solid #000;
      border-image-slice: 1;
      border-image-source: linear-gradient(to bottom right, #ff0000, #0000ff);
      background-clip: border-box;
      background-color: white;
      transform: translateY(120%);
      animation: ${slideUp} 0.4s forwards;
      text-align: center;
      overflow: auto;
      padding-bottom: 150px;
      box-sizing: border-box;
      &::-webkit-scrollbar {
        width: 0px;
      }
      h2 {
        font-size: 24px;
        font-weight: bold;
        margin: 20px 0;
      }
      p {
        padding: 10px 150px;
      }
      img {
        object-fit: cover;
        width: 70%;
        margin: 20px 0;
      }
    }
  }
`;

export default EventModal;
