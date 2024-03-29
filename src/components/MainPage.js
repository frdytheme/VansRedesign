import React from "react";
import styled from "styled-components";
import EventSwiper from "./pages/grids/EventSwiper";
import MainBanner from "./pages/grids/MainBanner";
import NewArrival from "./pages/grids/NewArrival";
import LoginGrid from "./pages/grids/LoginGrid";
import UserStatus from "./pages/grids/UserStatus";
import { useNavigate } from "react-router-dom";
import PUBLIC from "../assets/module/PUBLIC";

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
  grid-template-rows: 1fr 2fr 1fr 5fr 70px;
  gap: 10px;
  padding: 10px;
  padding-bottom: 0;
  box-sizing: border-box;
  & > * {
    border-radius: 1vw;
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
    grid-template-rows: 30vw 20vw 35vw;
    height: auto;
    padding-right: 0;
    padding-top: 80px;
    .main_banner {
      grid-row: 2 / 3;
      grid-column: 1 / 3;
    }
    .event_swiper {
      grid-column: 1 / 3;
      grid-row: 1 / 2;
    }
    .login_grid {
      display: none;
    }
    .user_status {
      display: none;
    }
    .cart_grid {
      display: none;
    }
    .new_container {
      grid-row: 3 / 4;
    }
  }
  @media (max-width: 768px) {
    grid-template-rows: 75vw 25vw 50vw;
  }
`;

export default MainPage;
