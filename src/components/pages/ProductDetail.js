import axios from "axios";
import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import ImageSlide from "./ImageSlide";
import api from "../../assets/api/api";

function ProductDetail({ setProductInfo, productInfo, setDetailBtn }) {
  const PUBLIC = process.env.PUBLIC_URL;
  const { name, color, model, price, size, mainCategory } = productInfo;
  const sizeArr = Object.keys(size);
  const [selectedSize, setSelectedSize] = useState("");
  const [imgArr, setImgArr] = useState([]);
  const [mainImg, setMainImg] = useState("");
  const [sameProduct, setSameProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productName, setProductName] = useState(name);

  const fetchSameProduct = async () => {
    try {
      const response = await api.get(`/product?all=1&name=${productName}`);
      const data = response.data;
      if (data.total === 1) return;
      const products = data.products.filter((item) => item.model !== model);
      setSameProduct(products);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchImg = async () => {
    try {
      const response = await axios.get(`${PUBLIC}/images/product/${model}`);
      const data = response.data;
      const mainImg = data.pop();
      data.unshift(mainImg);
      setImgArr(data);
      setMainImg(data[0]);
      setLoading(true);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchImg();
    fetchSameProduct();
  }, [productInfo]);

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

  return (
    <ProductDetailStyle className="product_info_container">
      <div className="console_box">
        <span className="material-symbols-outlined close_btn" onClick={() => setDetailBtn(false)}>
          close
        </span>
      </div>
      <div className="info_box">
        {loading ? (
          <div className="img_wrapper">
            <img
              src={PUBLIC + `./images/product/${model}/${mainImg}`}
              alt={name + `제품 이미지`}
              className="product_img"
            />
            <ImageSlide imgArr={imgArr} model={model} setMainImg={setMainImg} />
          </div>
        ) : (
          <div className="img_wrapper loading_status"></div>
        )}
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
          <li>
            <ul className="same_product_list">
              {sameProduct.map((item) => (
                <li key={item.id}>
                  <img
                    src={`${PUBLIC}/images/product/${item.model}/${item.model}_${item.model}_primary.jpg`}
                    alt={`${item.name} 제품 이미지`}
                    className="same_product"
                    onClick={() => {
                      setLoading(false);
                      setProductInfo(item);
                    }}
                  />
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
  width: 90%;
  background-color: #fff;
  z-index: 9999;
  border: 1px solid #000;
  border-top: none;
  transition: 0.4s;
  animation: ${slideDown} 0.6s forwards;
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
    display: grid;
    grid-template-columns: 2fr 8fr;
    grid-auto-rows: 35vw;
    padding: 3vw;
    .img_wrapper {
      width: 25vw;
      margin-right: 2vw;
      .product_img {
        width: 100%;
      }
    }
    .product_info {
      width: 100%;
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
        left: 67.3vw;
        bottom: 6vw;
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
            font-size: 1.2vw;
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
      .same_product_list {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        gap: 0.5vw;
        li {
          width: 6vw;
          .same_product {
            width: 100%;
            cursor: pointer;
            &:hover {
              filter: brightness(0.7);
            }
          }
        }
      }
      .product_btns {
        position: absolute;
        bottom: 3vw;
        right: 4vw;
        margin: 0;
        button {
          background-color: #d9d9d9;
          color: #999;
          width: 9vw;
          height: 3vw;
          border: none;
          margin-left: 0.5vw;
          user-select: none;
          font-size: 1.2vw;
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
