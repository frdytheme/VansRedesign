import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import Navigation from "./Navigation";
import MainPage from "./MainPage";
import ProductPage from "./pages/ProductPage";
import { Route, Routes, useMatch, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import ProductDetail from "./pages/ProductDetail";
import LoginPage from "./LoginPage";
import JoinPage from "./JoinPage";
import CartPage from "./CartPage";
import Cookies from "js-cookie";
import FindUserId from "./FindUserId";
import FindUserPw from "./FindUserPw";
import MyPage from "./MyPage";
import { useMediaQuery } from "react-responsive";

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
  const navigate = useNavigate();
  const showAlarm = Cookies.get("show_cart_alarm")
    ? JSON.parse(Cookies.get("show_cart_alarm"))
    : false;
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isProductPage = Boolean(useMatch("/home/product"));
  const isCartPage = Boolean(useMatch("/home/cart"));
  const isLoginPage = Boolean(useMatch("/home/login"));

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
  };

  const noShowAlarm = (e) => {
    const confirm = window.confirm("하루 동안 알림창을 끄시겠습니까?");
    if (confirm) {
      Cookies.set("show_cart_alarm", true, { expires: 1 });
    }
    closeCartAlarm();
  };

  useEffect(() => {
    if (Cookies.get("show_cart_alarm")) return;
    const timerBar = document.querySelector(".timer_bar");
    const hideBox = (e) => {
      setNavCart(false);
    };
    timerBar.addEventListener("animationend", hideBox);

    return () => {
      timerBar.removeEventListener("animationend", hideBox);
    };
  }, []);

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
        <Route path="/findId" element={<FindUserId />} />
        <Route path="/findPw" element={<FindUserPw />} />
        <Route path="/join" element={<JoinPage />} />
        <Route path="/mypage" element={<MyPage userData={userData} />} />
        <Route
          path="/cart"
          element={
            <CartPage
              setCartCount={setCartCount}
              setDetailBtn={setDetailBtn}
              setProductInfo={setProductInfo}
            />
          }
        />
      </Routes>
      {detailBtn && (
        <div
          className="detail_box_bg"
          onClick={(e) => {
            if (e.target === e.currentTarget) return setDetailBtn(false);
          }}
        ></div>
      )}
      {detailBtn && (
        <ProductDetail
          productInfo={productInfo}
          setProductInfo={setProductInfo}
          setDetailBtn={setDetailBtn}
          setNavCart={setNavCart}
        />
      )}
      {showAlarm || (
        <div className={`cart_modal_box${navCart ? " active" : ""}`}>
          <p className="txt_box">방금 담으신 상품을 확인하러 가시겠습니까?</p>
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
              <div className="timer_bar">타이머 바</div>
            </div>
          </div>
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
      {isProductPage ||
        (isCartPage && isMobile) ||
        (isLoginPage && isMobile) || <Footer />}
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
  position: relative;
  .detail_box_bg {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9998;
  }
  .cart_modal_box {
    background-color: rgba(255, 255, 255, 0.95);
    box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
      rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
    width: 20vw;
    min-width: 280px;
    border-radius: 0 0 15px 15px;
    position: absolute;
    top: -100%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 9999;
    text-align: center;
    padding: 20px 0 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    justify-content: center;
    align-items: center;
    transition: 0.7s cubic-bezier(0.49, 0.06, 0.08, 1);
    &.active {
      top: 0;
      .btn_box {
        .move_btn {
          background-color: #4d3c77;
          .timer_bar {
            animation: ${timer} 10s linear forwards;
          }
        }
      }
    }
    .txt_box {
      padding: 0 10px;
      font-size: clamp(14px, 0.8vw, 16px);
    }
    .btn_box {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      .move_btn {
        width: 50%;
        height: 20px;
        background-color: #000;
        color: #fff;
        padding: 15px 20px;
        border-radius: 15px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        .timer_bar {
          position: absolute;
          top: 0;
          right: 100%;
          width: 100%;
          background-color: #000;
          height: 100%;
          text-indent: -9999px;
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
      font-size: clamp(13px, 0.7vw, 15px);
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
