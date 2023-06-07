import React from "react";
import styled from "styled-components";
import EventSwiper from "./pages/EventSwiper";
import MainBanner from "./pages/MainBanner";

function MainPage() {
  return (
    <MainGrid>
      <div className="grid_test">내비게이션 빈 영역</div>
      <EventSwiper />
      <div className="grid_test">2</div>
      <div className="grid_test">3</div>
      <div className="grid_test">4</div>
      <MainBanner />
      {/* <div className="grid_test">5</div> */}
      {/* <div className="grid_test">6</div> */}
    </MainGrid>
  );
}

const MainGrid = styled.main`
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-columns: 2fr 4fr 2fr 2fr;
  grid-template-rows: 6fr 4fr;
  gap: 15px;
  padding: 15px;
  box-sizing: border-box;
  .grid_test {
    background-color: #999;
    border-radius: 20px;
  }
`;

export default MainPage;
