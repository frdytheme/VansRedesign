import React from "react";
import ProductList from "./ProductList";
import styled, { keyframes } from "styled-components";

function ProductPage({ listName, setListName, searchName, submitBtn }) {
  return (
    <ProductPageStyle>
      <ProductList listName={listName} setListName={setListName} searchName={searchName} submitBtn={submitBtn} />
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
  position: absolute;
  width: 100%;
  height: calc(100vh - 80px);
  margin-top: 80px;
  top: 0;
  left: 0;
  z-index: 999;
  display: grid;
  transform: translateY(120%);
  opacity: 0;
  animation: ${slideUp} 0.7s forwards;
`;

export default ProductPage;
