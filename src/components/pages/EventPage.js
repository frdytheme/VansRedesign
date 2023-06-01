import React from "react";
import styled from "styled-components";

function EventPage() {
  const PUBLIC = process.env.PUBLIC_URL;
  return (
    <EventStyle>
      <img src={PUBLIC + "./images/event/event3.jpg"} alt="반스 이벤트" />
      <div className="txtBox">
        <h2>반스, 래퍼 이영지와 함께한 ‘THIS IS OFF THE WALL’ 캠페인 공개</h2>
        <p>
          오리지널 액션 스포츠/라이프스타일 브랜드 반스(Vans)가 2023년 글로벌 브랜드 캠페인 ‘THIS IS OFF THE WALL’의
          일환으로 5명의 한국 앰배서더와 함께 두 번째 챕터를 공개한다. 이번 캠페인은 앰배서더 각각의 매혹적이고 독특한
          스타일을 구현한 비주얼과 대담한 컬러를 중심으로, 새로운 세대의 창의적인 사람들이 각자의 고유한 아름다움을
          발견하기 위한 길을 떠날 수 있도록 지원하는 것에 의의를 두고 있다.
        </p>
        <em>MORE</em>
      </div>
      <div className="arrow arrow_right">
        <span class="material-symbols-outlined">arrow_forward_ios</span>
      </div>
      <div className="arrow arrow_left">
        <span class="material-symbols-outlined">arrow_back_ios</span>
      </div>
    </EventStyle>
  );
}

const EventStyle = styled.article`
  overflow: hidden;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  cursor: pointer;
  position: relative;
  .txtBox {
    width: 80%;
    height: 80%;
    border-radius: 20px;
    background-color: rgba(0, 0, 0, 0.8);
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    transition: 0.4s;
    opacity: 0;
    color: #fff;
    padding: 30px;
    box-sizing: border-box;
    text-align: center;
    h2 {
      font-weight: bold;
      font-size: 16px;
    }
    p {
      margin: 20px 0;
      line-height: 1.6;
    }
  }
  &:hover {
    .txtBox {
      opacity: 1;
    }
  }
  .arrow {
    color: #fff;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    span {
      font-size: 48px;
      color: #d51920;
    }
    &.arrow_right {
      right: 20px;
    }
    &.arrow_left {
      left: 20px;
    }
  }
`;

export default EventPage;
