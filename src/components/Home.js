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
  position: relative;
`;

export default Home;
