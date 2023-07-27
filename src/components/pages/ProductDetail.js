import axios from "axios";
import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

function ProductDetail({ productInfo, setDetailBtn }) {
  const PUBLIC = process.env.PUBLIC_URL;
  const { _id, id, name, color, category, model, price, size, mainCategory } = productInfo;
  const imgUrl = PUBLIC + `./images/product/${model}/${model}_${model}_primary.jpg`;
  const sizeArr = Object.keys(size);
  const [selectedSize, setSelectedSize] = useState("");

  const selectSize = (e, item) => {
    const sizes = document.querySelectorAll(".size_item");
    if (selectedSize === item) {
      e.target.classList.remove("selected");
      setSelectedSize("");
      return;
    }
    sizes.forEach((size) => size.classList.remove("selected"));
    e.target.classList.add("selected");
    setSelectedSize(item);
  };

  const transformSize = () => {
    const box = document.querySelector(".product_info_container");
    if (box.classList.contains("fullsize")) return box.classList.remove("fullsize");
    box.classList.add("fullsize");
  };

  return (
    <ProductDetailStyle className="product_info_container">
      <div className="console_box">
        <span className="material-symbols-outlined full_btn" onClick={transformSize}>
          fullscreen
        </span>
        <span className="material-symbols-outlined close_btn" onClick={() => setDetailBtn(false)}>
          close
        </span>
      </div>
      <div className="info_box">
        <div className="img_wrapper">
          <img src={imgUrl} alt={name + `제품 이미지`} className="product_img" />
        </div>
        <ul className="product_info">
          {mainCategory.includes("NEW") && <li className="product_info_li product_new_arrivals">NEW ARRIVALS</li>}
          <li className="product_info_li product_name">{name}</li>
          <li className="product_info_li product_color_model">
            {color} | {model}
          </li>
          <li className="product_info_li product_size">
            <ul className="size_list">
              {sizeArr.map((item) => (
                <li key={item} className="size_item" onClick={(e) => selectSize(e, item)}>
                  {item}
                </li>
              ))}
            </ul>
          </li>
          <li className="product_info_li product_price">{price && price.toLocaleString("ko-KR")}원</li>
          <li className={`product_info_li product_btns ${selectedSize && "active"}`}>
            <button>구매</button>
            <button>장바구니</button>
          </li>
        </ul>
      </div>
    </ProductDetailStyle>
  );
}

const slideDown = keyframes`
100% {
  transform: translate(-50%, 0);
}`;

const ProductDetailStyle = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -100%);
  width: 70%;
  height: auto;
  background-color: #fff;
  z-index: 9999;
  border: 2px solid #000;
  border-top: none;
  transition: 0.4s;
  animation: ${slideDown} 0.6s forwards;
  &.fullsize {
    width: 100%;
    .product_size {
      .size_list {
        width: 75%;
      }
    }
  }
  .console_box {
    width: 100%;
    border-bottom: 1px solid #000;
    height: 50px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .material-symbols-outlined {
      font-size: 2vw;
      font-weight: bold;
      cursor: pointer;
      user-select: none;
      &:hover {
        color: var(--color-red);
      }
    }
    .close_btn {
      margin-right: 1vw;
    }
  }
  .info_box {
    display: flex;
    padding: 2vw;
    .img_wrapper {
      margin-right: 2vw;
      .product_img {
        width: 30vw;
      }
    }
    .product_info {
      width: 100%;
      position: relative;
      .product_info_li {
        margin: 1vw 0;
      }
      .product_new_arrivals {
        color: var(--color-red);
        font-weight: 600;
        margin: 0;
      }
      .product_name {
        font-size: 2vw;
        font-weight: bold;
      }
      .product_color_model {
        color: #888;
        user-select: none;
      }
      .product_price {
        position: absolute;
        right: 0;
        bottom: 4vw;
        font-size: 2vw;
        font-weight: 500;
      }
      .product_size {
        margin-top: 3vw;
        .size_list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5vw;
          .size_item {
            width: 4vw;
            height: 2.5vw;
            line-height: 2.5vw;
            text-align: center;
            border-radius: 5px;
            border: 1px solid #777;
            cursor: pointer;
            &:hover {
              background-color: #444;
              color: #fff;
            }
            &.selected {
              background-color: var(--color-red);
              color: #fff;
            }
          }
        }
      }
      .product_btns {
        position: absolute;
        bottom: 0;
        right: 0;
        margin: 0;
        button {
          background-color: #d9d9d9;
          color: #999;
          width: 9vw;
          height: 3vw;
          border: none;
          margin-left: 0.5vw;
          user-select: none;
        }
        &.active {
          button {
            background-color: var(--color-red);
            color: #fff;
            cursor: pointer;
          }
        }
      }
    }
  }
  .another_product {
    background-color: grey;
  }
`;

export default ProductDetail;
