import React from "react";
import styled from "styled-components";

function ProductFilter() {
  return <ProductFilterStyle></ProductFilterStyle>;
}

const ProductFilterStyle = styled.div`
  position: fixed;
  top:0;
  left:0;
  width: 100%;
  height:100px;
  background-color: #444;
`;

export default ProductFilter;
