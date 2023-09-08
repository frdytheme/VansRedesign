import React, { useEffect, useState } from "react";
import styled from "styled-components";
import EventSwiper from "./pages/grids/EventSwiper";
import MainBanner from "./pages/grids/MainBanner";
import NewArrival from "./pages/grids/NewArrival";
import LoginGrid from "./pages/grids/LoginGrid";
import UserStatus from "./pages/grids/UserStatus";
import { useNavigate } from "react-router-dom";

function MainPage({
  setListName,
  setProductInfo,
  setDetailBtn,
  userData,
  cartCount,
  closeCartAlarm,
}) {
  const loginState = sessionStorage.getItem("loginState");
  const navigate = useNavigate();

  return (
    <MainGrid>
      <MainBanner setListName={setListName} />
      {JSON.parse(loginState) ? (
        <UserStatus userData={userData} />
      ) : (
        <LoginGrid />
      )}

      <div className="cart_grid" onClick={() => navigate("./cart")}>
        <span className="material-symbols-outlined">shopping_bag</span>CART
        <em>( {cartCount} )</em>
      </div>
      <EventSwiper />
      <NewArrival
        setProductInfo={setProductInfo}
        setDetailBtn={setDetailBtn}
        closeCartAlarm={closeCartAlarm}
      />
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
  .cart_grid {
    width: 100%;
    height: 100%;
    background-color: #000;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.2vw;
    cursor: pointer;
    background: url("./images/event/cart_bg.jpg") no-repeat center / cover;
    background-size: 100%;
    transition: 0.6s;
    &:hover {
      background: url("./images/event/cart_bg.jpg") no-repeat 50% 20% / cover;
      background-size: 130%;
    }
    span {
      font-size: 2vw;
    }
    em {
      font-size: 1vw;
      margin-left: 0.7vw;
    }
  }
`;

export default MainPage;
