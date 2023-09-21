import React from "react";
import ProductList from "./ProductList";
import styled, { keyframes } from "styled-components";

function ProductPage({
  listName,
  setListName,
  searchName,
  submitBtn,
  setProductInfo,
  setDetailBtn,
  closeCartAlarm,
}) {
  return (
    <ProductPageStyle>
      <ProductList
        listName={listName}
        setListName={setListName}
        searchName={searchName}
        submitBtn={submitBtn}
        setProductInfo={setProductInfo}
        setDetailBtn={setDetailBtn}
        closeCartAlarm={closeCartAlarm}
      />
    </ProductPageStyle>
  );
}

const slideUp = keyframes`
100% {
  opacity: 1;
  transform: translateY(0);
}
`;

const ProductPageStyle = styled.div`
  width: 100%;
  height: calc(100vh - 80px);
  top: 0;
  left: 0;
  z-index: 998;
  display: grid;
  transform: translateY(120%);
  opacity: 0;
  animation: ${slideUp} 0.7s forwards;
  z-index: 99999;
  @media (max-width: 1200px) {
    height: calc(100vh - 70px);
  }
`;

export default ProductPage;
