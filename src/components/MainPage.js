import React, { useEffect, useState } from "react";
import styled from "styled-components";
import EventSwiper from "./pages/grids/EventSwiper";
import MainBanner from "./pages/grids/MainBanner";
import NewArrival from "./pages/grids/NewArrival";
import LoginGrid from "./pages/grids/LoginGrid";
import UserStatus from "./pages/grids/UserStatus";
import { useNavigate } from "react-router-dom";
import PUBLIC from "../assets/module/PUBLIC";
import { useMediaQuery } from "react-responsive";

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
  const isTablet = useMediaQuery({ maxWidth: 1200, minWidth: 768 });

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
  grid-template-rows: 1fr 2fr 1fr 5fr 70px;
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
    font-size: 22px;
    cursor: pointer;
    background: url("${PUBLIC}/images/event/cart_bg.jpg") no-repeat center /
      cover;
    background-size: 100%;
    transition: 0.6s;
    &:hover {
      background: url("${PUBLIC}/images/event/cart_bg.jpg") no-repeat 50% 20% /
        cover;
      background-size: 130%;
    }
    span {
      font-size: 40px;
    }
    em {
      font-size: 24px;
      margin-left: 0.7vw;
    }
  }
  @media (max-width: 1200px) {
    grid-template-columns: 5fr 5fr;
    grid-template-rows: 1fr;
    height: auto;
    padding-right: 0;
    .main_banner {
      grid-row: 1 / 2;
      grid-column: 1 / 3;
    }
    .event_swiper {
      /* grid-row: 1 / 2; */
      grid-column: 1 / 3;
    }
    .login_grid {
      /* grid-row: 1 / 2;
      grid-column: 2 / 3;
      height: 9vw; */
      display: none;
    }
    .cart_grid {
      /* grid-row: 1 / 2;
      grid-column: 1 / 2; */
      display: none;
    }
    .new_container {
      height: 30vw;
      grid-row: 2 / 3;
    }
  }
`;

export default MainPage;
