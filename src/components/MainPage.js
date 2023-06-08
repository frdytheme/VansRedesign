import React from "react";
import styled from "styled-components";
import EventSwiper from "./pages/EventSwiper";
import MainBanner from "./pages/MainBanner";

function MainPage() {
  return (
    <MainGrid>
      <div className="grid_test">내비게이션 빈 영역</div>
      <div className="grid_test"></div>
      <EventSwiper />
      <div className="grid_test"></div>
      <MainBanner />
    </MainGrid>
  );
}

const MainGrid = styled.main`
  width: 100%;
  height: calc(100% - 80px);
  display: grid;
  grid-template-columns: 3fr 4fr 3fr;
  grid-template-rows: 6fr 4fr;
  gap: 10px;
  padding: 10px;
  box-sizing: border-box;
  .grid_test {
    background-color: #999;
    border-radius: 20px;
  }
`;

export default MainPage;
