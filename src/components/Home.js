import React from "react";
import styled from "styled-components";
import Navigation from "./Navigation";
import MainPage from "./MainPage";

function Home() {
  return (
    <HomeSection>
      <Navigation />
      <MainPage />
    </HomeSection>
  );
}

const HomeSection = styled.div`
  width:100%;
  max-height:100vh;
  position: relative;
  overflow: hidden;
`;

export default Home;
