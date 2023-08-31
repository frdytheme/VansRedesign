import React from "react";
import styled from "styled-components";
import EventSwiper from "./pages/grids/EventSwiper";
import MainBanner from "./pages/grids/MainBanner";
import NewArrival from "./pages/grids/NewArrival";
import LoginGrid from "./pages/grids/LoginGrid";
import UserStatus from "./pages/grids/UserStatus";

function MainPage({ setListName, setProductInfo, setDetailBtn, userData }) {
  const loginState = sessionStorage.getItem("loginState");

  return (
    <MainGrid>
      <MainBanner setListName={setListName} />
      {JSON.parse(loginState) ? (
        <UserStatus userData={userData} />
      ) : (
        <LoginGrid />
      )}
      <div className="test" style={{ backgroundColor: "#000" }}></div>
      <EventSwiper />
      <NewArrival setProductInfo={setProductInfo} setDetailBtn={setDetailBtn} />
    </MainGrid>
  );
}

const MainGrid = styled.main`
  width: 100%;
  height: calc(100% - 80px);
  display: grid;
  grid-template-columns: 2fr 3fr 2fr 3fr;
  grid-template-rows: 1fr 2fr 1fr 5fr 1fr;
  gap: 10px;
  padding: 10px;
  padding-bottom: 0;
  box-sizing: border-box;
  & > * {
    border-radius: 15px;
  }
`;

export default MainPage;
