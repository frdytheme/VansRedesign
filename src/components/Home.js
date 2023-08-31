import React, { useState } from "react";
import styled from "styled-components";
import Navigation from "./Navigation";
import MainPage from "./MainPage";
import ProductPage from "./pages/ProductPage";
import { Route, Routes } from "react-router-dom";
import Footer from "./Footer";
import ProductDetail from "./pages/ProductDetail";
import LoginPage from "./LoginPage";
import JoinPage from "./JoinPage";

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

  return (
    <HomeSection>
      <Navigation
        setListName={setListName}
        listName={listName}
        setSearchName={setSearchName}
        searchName={searchName}
        setSubmitBtn={setSubmitBtn}
        submitBtn={submitBtn}
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
            />
          }
        />
        <Route
          path="/login"
          element={<LoginPage userData={userData} setUserData={setUserData} />}
        />
        <Route path="/join" element={<JoinPage />} />
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
          />
        </div>
      )}
      <Footer />
    </HomeSection>
  );
}

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
`;

export default Home;
