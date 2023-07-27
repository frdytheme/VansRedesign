import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navigation from "./Navigation";
import MainPage from "./MainPage";
import ProductPage from "./pages/ProductPage";
import { Route, Routes } from "react-router-dom";
import Footer from "./Footer";
import ProductDetail from "./pages/ProductDetail";

function Home() {
  const [listName, setListName] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [submitBtn, setSubmitBtn] = useState(false);
  const [detailBtn, setDetailBtn] = useState(false);
  const [productInfo, setProductInfo] = useState({});

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
        <Route path="/" element={<MainPage setListName={setListName} />} />
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
      </Routes>
      {detailBtn && <ProductDetail productInfo={productInfo} setDetailBtn={setDetailBtn} />}
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
`;

export default Home;
