import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import Navigation from "./Navigation";
import MainPage from "./MainPage";
import ProductPage from "./pages/ProductPage";
import { Route, Routes, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import ProductDetail from "./pages/ProductDetail";
import LoginPage from "./LoginPage";
import JoinPage from "./JoinPage";
import CartPage from "./CartPage";
import Cookies from "js-cookie";

function Home() {
  const [listName, setListName] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [submitBtn, setSubmitBtn] = useState(false);
  const [detailBtn, setDetailBtn] = useState(false);
  const [productInfo, setProductInfo] = useState({});
  const userId = localStorage.getItem("userId");
  const [userData, setUserData] = useState({
    name: userId ? JSON.parse(userId) : "",
    password: "",
  });
  const cart = JSON.parse(sessionStorage.getItem("CART"));
  const [cartCount, setCartCount] = useState(cart ? cart.total : 0);
  const [navCart, setNavCart] = useState(false);
  const [timerId, setTimerId] = useState("");
  const navigate = useNavigate();
  const showAlarm = Cookies.get("show_cart_alarm")
    ? JSON.parse(Cookies.get("show_cart_alarm"))
    : false;

  useEffect(() => {
    if (cart) setCartCount(cart.total);
  }, [cart]);

  useEffect(() => {
    const closeBox = (e) => {
      if (e.key === "Escape") {
        setDetailBtn(false);
        window.removeEventListener("keydown", closeBox);
      }
    };
    if (detailBtn) window.addEventListener("keydown", closeBox);
  }, [detailBtn]);

  const closeCartAlarm = () => {
    setNavCart(false);
    clearTimeout(timerId);
  };

  const noShowAlarm = (e) => {
    const confirm = window.confirm("하루 동안 알림창을 끄시겠습니까?");
    if (confirm) {
      Cookies.set("show_cart_alarm", true, { expires: 1 });
    }
    closeCartAlarm();
  };

  return (
    <HomeSection>
      <Navigation
        setListName={setListName}
        listName={listName}
        setSearchName={setSearchName}
        searchName={searchName}
        setSubmitBtn={setSubmitBtn}
        submitBtn={submitBtn}
        cartCount={cartCount}
      />
      <Routes>
        <Route
          path="/"
          element={
            <MainPage
              setListName={setListName}
              setProductInfo={setProductInfo}
              setDetailBtn={setDetailBtn}
              userData={userData}
              cartCount={cartCount}
              closeCartAlarm={closeCartAlarm}
            />
          }
        />
        <Route
          path="/product"
          element={
            <ProductPage
              listName={listName}
              setListName={setListName}
              searchName={searchName}
              submitBtn={submitBtn}
              setProductInfo={setProductInfo}
              setDetailBtn={setDetailBtn}
              closeCartAlarm={closeCartAlarm}
            />
          }
        />
        <Route
          path="/login"
          element={<LoginPage userData={userData} setUserData={setUserData} />}
        />
        <Route path="/join" element={<JoinPage />} />
        <Route
          path="/cart"
          element={<CartPage setCartCount={setCartCount} />}
        />
      </Routes>
      {detailBtn && (
        <div
          className="detail_box_bg"
          onClick={(e) => {
            if (e.target === e.currentTarget) return setDetailBtn(false);
          }}
        >
          <ProductDetail
            productInfo={productInfo}
            setProductInfo={setProductInfo}
            setDetailBtn={setDetailBtn}
            setNavCart={setNavCart}
            setTimerId={setTimerId}
          />
        </div>
      )}
      {showAlarm || (
        <div className={`cart_modal_box${navCart ? " active" : ""}`}>
          <p className="txt_box">방금 담으신 상품을 확인하러 가시겠습니까?</p>
          {navCart && (
            <div className="btn_box">
              <div
                className={`move_btn${navCart ? " active" : ""}`}
                onClick={() => {
                  navigate("/home/cart");
                  closeCartAlarm();
                }}
              >
                <span className="material-symbols-outlined icon">
                  shopping_cart
                </span>
              </div>
            </div>
          )}
          <div className="no_show">
            <div className="off_option" onClick={() => closeCartAlarm()}>
              <span className="material-symbols-outlined close_btn">close</span>
              창 닫기
            </div>
            <div className="off_option" onClick={noShowAlarm}>
              오늘 알림
              <span className="material-symbols-outlined close_btn">
                notifications_off
              </span>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </HomeSection>
  );
}

const timer = keyframes`
100% {
  right: 0%;
}
`;

const wiggle = keyframes`
30% {
  transform: translate(-10%, -55%) rotate(-15deg);
}
  60% {
    transform: translate(-55%, -45%) rotate(15deg);
  }
`;

const HomeSection = styled.div`
  width: 100%;
  height: 100vh;
  max-height: 100vh;
  position: relative;
  overflow: hidden;
  .detail_box_bg {
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    position: absolute;
    top: 0;
    left: 0;
    z-index: 9998;
  }
  .cart_modal_box {
    background-color: rgba(255, 255, 255, 0.95);
    box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
      rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
    width: 20vw;
    border-radius: 0 0 15px 15px;
    position: absolute;
    top: -100%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 9999;
    text-align: center;
    padding: 1vw 0 0.3vw;
    display: flex;
    flex-direction: column;
    gap: 0.7vw;
    justify-content: center;
    align-items: center;
    transition: 1s;
    &.active {
      top: 0;
    }
    .txt_box {
      font-size: 0.8vw;
    }
    .btn_box {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 0.8vw;
      .move_btn {
        width: 50%;
        height: 20px;
        background-color: #4d3c77;
        color: #fff;
        padding: 0.8vw 1.7vw;
        border-radius: 15px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        &:after {
          content: "";
          position: absolute;
          top: 0;
          right: 100%;
          width: 100%;
          background-color: #000;
          height: 100%;
          animation: ${timer} 10s linear;
          animation-play-state: paused;
        }
        &.active {
          &:after {
            animation-play-state: running;
          }
        }
        .icon {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(0);
          z-index: 99;
          animation: ${wiggle} 1s alternate infinite;
        }
      }
    }
    .no_show {
      width: 90%;
      display: flex;
      justify-content: space-between;
      font-size: 0.7vw;
      color: #777;
      font-weight: 500;
      .off_option {
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        &:hover {
          color: var(--color-red);
        }
      }
    }
  }
`;

export default Home;
