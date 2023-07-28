import React from "react";
import styled from "styled-components";
import EventSwiper from "./pages/grids/EventSwiper";
import MainBanner from "./pages/grids/MainBanner";
import NewArrival from "./pages/grids/NewArrival";

function MainPage({ setListName, setProductInfo, setDetailBtn }) {
  return (
    <MainGrid>
      <MainBanner setListName={setListName} />
      <EventSwiper />
      <NewArrival setProductInfo={setProductInfo} setDetailBtn={setDetailBtn} />
      <div className="grid_test"></div>
    </MainGrid>
  );
}

const MainGrid = styled.main`
  width: 100%;
  height: calc(100% - 80px);
  display: grid;
  grid-template-columns: 2fr 3fr 2fr 3fr;
  grid-template-rows: 4fr 2fr 3fr 1fr;
  gap: 10px;
  padding: 10px;
  padding-bottom: 0;
  box-sizing: border-box;
  .grid_test {
    width: 100%;
    height: 100%;
    background-color: #999;
    border-radius: 20px;
  }
`;

export default MainPage;
