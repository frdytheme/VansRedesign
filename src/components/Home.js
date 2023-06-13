import React from "react";
import styled from "styled-components";
import Navigation from "./Navigation";
import MainPage from "./MainPage";
import ProductPage from "./pages/ProductPage";

function Home() {
  return (
    <HomeSection>
      <Navigation />
      <MainPage />
      <ProductPage />
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
