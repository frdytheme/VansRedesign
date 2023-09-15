import React from "react";
import styled from "styled-components";
import PUBLIC from "../../assets/module/PUBLIC";

function ProductBox({ item, onClick }) {
  return (
    <ProductBoxStyle onClick={onClick}>
      <div className="img_wrapper">
        <img
          src={`${PUBLIC}/images/product/${item.model}/${item.model}_${item.model}_primary.jpg`}
          alt="제품 대표 사진"
          className="product_img"
        />
        <img
          src={`${PUBLIC}/images/product/${item.model}/${item.model}_${item.model}_02.jpg`}
          alt="제품 대표 사진"
          className="product_img hover"
        />
      </div>
      <figcaption className="product_caption">
        {item.mainCategory.includes("HOT") && (
          <p className="new_arrival">HOT</p>
        )}
        {item.mainCategory.includes("NEW") && (
          <p className="new_arrival">NEW ARRIVAL</p>
        )}
        <p className="product_name">{item.name}</p>
        <p className="product_price">
          {Number(item.price).toLocaleString("ko-KR") + "원"}
        </p>
      </figcaption>
    </ProductBoxStyle>
  );
}

const ProductBoxStyle = styled.figure`
  width: 15vw;
  text-align: center;
  position: relative;
  .img_wrapper {
    height: 15vw;
    position: relative;
    &:hover .product_img.hover {
      opacity: 1;
    }
  }
  .product_img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    object-fit: cover;
    border-radius: 20px;
    cursor: pointer;
    vertical-align: bottom;
    &.hover {
      opacity: 0;
      transition: 0.3s;
    }
  }
  .product_caption {
    margin-top: 20px;
    font-size: 14px;
  }
  .product_name {
    cursor: pointer;
    font-weight: 500;
  }
  .product_price {
    margin-top: 15px;
    color: #555;
  }
  .new_arrival {
    color: var(--color-red);
    font-weight: 800;
    margin-bottom: 15px;
  }
`;

export default ProductBox;
