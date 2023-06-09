import React, { useState } from "react";
import styled from "styled-components";
import Navigation from "./Navigation";
import MainPage from "./MainPage";
import ProductPage from "./pages/ProductPage";
import { Route, Routes } from "react-router-dom";

function Home() {
  const [productToggle, setProductToggle] = useState(false);
  const [listName, setListName] = useState("");
  return (
    <HomeSection>
      <Navigation setListName={setListName} listName={listName}/>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/product" element={<ProductPage listName={listName} />} />
      </Routes>
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
