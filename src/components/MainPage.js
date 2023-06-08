import React from "react";
import styled from "styled-components";
import EventSwiper from "./pages/EventSwiper";
import MainBanner from "./pages/MainBanner";

function MainPage() {
  return (
    <MainGrid>
      <MainBanner />
      <EventSwiper />
      <div className="grid_test" style={{ "grid-column": "span 2" }}>
        내비게이션 빈 영역
      </div>
      <div className="grid_test" style={{ "grid-column": "span 2" }}></div>
      <div className="grid_test"></div>
      <div className="grid_test"></div>
      <div className="grid_test"></div>
      <div className="grid_test"></div>
    </MainGrid>
  );
}

const MainGrid = styled.main`
  width: 100%;
  height: calc(100% - 80px);
  display: grid;
  grid-template-columns: 2fr 3fr 2fr 3fr;
  grid-template-rows: 4fr 3fr 3fr;
  gap: 10px;
  padding: 10px;
  box-sizing: border-box;
  .grid_test {
    width: 100%;
    height: 100%;
    background-color: #999;
    border-radius: 20px;
  }
`;

export default MainPage;
