import React from "react";
import ProductList from "./ProductList";
import styled from "styled-components";
import ProductFilter from "./ProductFilter";

function ProductPage() {
  return (
    <ProductPageStyle>
      <ProductList />
    </ProductPageStyle>
  );
}

const ProductPageStyle = styled.div`
  position: absolute;
  width: 100%;
  height: 100vh;
  margin-top: 80px;
  top: 0;
  left: 0;
  z-index: 999;
  display: grid;
`;

export default ProductPage;
