import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import ImageSlide from "./ImageSlide";
import Pfunction from "../../assets/module/Pfunction";
import "swiper/css";
import "swiper/css/pagination";
import authApi from "../../assets/api/authApi";
import PUBLIC from "../../assets/module/PUBLIC";
import LoadingBox from "../LoadingBox";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import { useMediaQuery } from "react-responsive";

function ProductDetail({
  setProductInfo,
  productInfo,
  setDetailBtn,
  setNavCart,
}) {
  const { name, color, model, price, size, mainCategory } = productInfo;
  const sizeArr = Object.keys(size);
  const [selectedSize, setSelectedSize] = useState("");
  const [mainImg, setMainImg] = useState("");
  const [sameProduct, setSameProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [qty, setQty] = useState(1);
  const [maxQty, setMaxQty] = useState(0);

  const fetchSameProduct = async () => {
    setLoading(true);
    try {
      const response = await authApi.get(`/product?all=1&name=${name}`);
      const data = response.data;
      if (data.total === 1) return;
      const products = data.products.filter((item) => item.model !== model);
      setSameProduct(products);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setMainImg(`/images/product/${model}/${model}_${model}_primary.jpg`);
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

  useEffect(() => {
    const maximum = productInfo.size[selectedSize];
    setMaxQty(maximum);
  }, [selectedSize]);

  const handleCart = () => {
    if (!selectedSize) return;
    Pfunction.addCart(productInfo, selectedSize, qty, setNavCart);
    setDetailBtn(false);
  };

  const handleQty = (e) => {
    if (e.target.textContent === "remove") {
      if (qty > 1) {
        return setQty(qty - 1);
      } else {
        return;
      }
    }
    if (qty < maxQty) {
      setQty(qty + 1);
    } else if (!selectedSize) {
      alert("사이즈를 선택해주세요.");
    } else if (maxQty === 0) {
      alert("품절된 상품입니다.");
    } else {
      alert("주문 가능한 최대 수량입니다.");
    }
  };

  const selectSeries = (item) => {
    setProductInfo(item);
    setQty(1);
    const sizes = document.querySelectorAll(".size_item");
    sizes.forEach((size) => size.classList.remove("selected"));
  };

  return (
    <ProductDetailStyle className="product_info_container">
      {loading && (
        <div className="loading_state">
          <LoadingBox />
        </div>
      )}
      <div className="console_box">
        <span
          className="material-symbols-outlined close_btn"
          onClick={() => setDetailBtn(false)}
        >
          close
        </span>
      </div>
      <div className="info_box">
        <div className="img_wrapper">
          <img
            src={`${PUBLIC}${mainImg}`}
            alt={name + `제품 이미지`}
            className="product_img"
          />
          <ImageSlide model={model} setMainImg={setMainImg} />
        </div>
        <ul className="product_info">
          {mainCategory.includes("NEW") && (
            <li className="product_info_li product_new_arrivals">
              NEW ARRIVALS
            </li>
          )}
          <li className="product_info_li product_name">{name}</li>
          <li className="product_info_li product_color_model">
            {color} | {model}
          </li>
          <li className="product_info_li product_size">
            <ul className="size_list">
              {sizeArr.map((item) => (
                <li
                  key={item}
                  className={`size_item${size[item] <= 1 ? " soldout" : ""}`}
                  onClick={(e) => {
                    if (size[item] <= 1) return;
                    selectSize(e, item);
                    setQty(1);
                  }}
                >
                  {item}
                </li>
              ))}
            </ul>
          </li>
          <li className="product_info_li option_box">
            <Swiper
              className="mySwiper same_product_list"
              slidesPerView="auto"
              spaceBetween={7}
            >
              {sameProduct.map((item) => (
                <SwiperSlide key={item.id}>
                  <img
                    src={`${PUBLIC}/images/product/${item.model}/${item.model}_${item.model}_primary.jpg`}
                    alt={`${item.name} 제품 이미지`}
                    className="same_product"
                    onClick={() => selectSeries(item)}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="txt_box">
              <div className="product_info_li product_DC">
                상품 설명란입니다. <br /> 상품에 맞는 설명을 작성해주세요.
                <br />
                <br />
                반스 올드스쿨 / 어센틱 / 볼트 / 스케이트-하이
              </div>
              <div className="option_wrapper">
                <div className="product_info_li product_qty">
                  <div className="select_qty">
                    <div className="btn_box">
                      <span
                        className="material-symbols-outlined"
                        onClick={handleQty}
                      >
                        remove
                      </span>
                      <p>{qty}</p>
                      <span
                        className="material-symbols-outlined"
                        onClick={handleQty}
                      >
                        add
                      </span>
                    </div>
                  </div>
                </div>
                <div className="product_price">
                  {price && price.toLocaleString("ko-KR")}원
                </div>
                <div
                  className={`product_info_li product_btns ${
                    selectedSize && "active"
                  }`}
                >
                  <button>구매</button>
                  <button onClick={handleCart}>장바구니</button>
                </div>
              </div>
            </div>
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
  border-radius: 0 0 20px 20px;
  transition: 0.4s;
  animation: ${slideDown} 0.6s forwards;
  .loading_state {
    background-color: rgba(255, 255, 255, 0.5);
  }
  .console_box {
    border-bottom: 1px solid #000;
    height: 50px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .material-symbols-outlined {
      font-size: clamp(28px, 2vw, 38px);
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
    width: 100%;
    display: grid;
    grid-template-columns: 25vw 8fr;
    grid-auto-rows: 1fr;
    padding: 3vw;
    box-sizing: border-box;
    gap: 2vw;
    .img_wrapper {
      .product_img {
        width: 100%;
      }
    }
    .product_info {
      width: 55vw;
      display: flex;
      flex-direction: column;
      .product_info_li {
        margin: 1vw 0;
      }
      .product_new_arrivals {
        color: var(--color-red);
        font-weight: 600;
        margin: 0;
        font-size: clamp(12px, 0.8vw, 16px);
      }
      .product_name {
        font-size: clamp(20px, 2vw, 38px);
        font-weight: bold;
      }
      .product_color_model {
        color: #888;
        user-select: none;
        font-size: clamp(12px, 0.8vw, 16px);
      }
      .product_size {
        .size_list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5vw;
          .size_item {
            font-size: clamp(15px, 1.2vw, 24px);
            width: 4vw;
            min-width: 50px;
            height: 2.5vw;
            min-height: 32px;
            display: flex;
            justify-content: center;
            align-items: center;
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
            &.soldout {
              background-color: #d6d6d6;
              color: #aaa;
              border: #777;
              cursor: default;
              user-select: none;
            }
          }
        }
      }
      .option_box {
        width: 100%;
        font-size: clamp(20px, 2vw, 38px);
        font-weight: 500;
        .same_product_list {
          .swiper-slide {
            width: 15%;
            min-width: 100px;
          }
          .same_product {
            height: 8vw;
            min-height: 100px;
            object-fit: cover;
            cursor: pointer;
            &:hover {
              filter: brightness(0.7);
            }
          }
        }
        .txt_box {
          width: 100%;
          display: flex;
          .product_DC {
            width: 80%;
            margin-top: 15px;
            font-size: clamp(14px, 0.9vw, 20px);
            line-height: 1.4;
          }
          .option_wrapper {
            display: flex;
            flex-direction: column;
            gap: 1vw;
            justify-content: end;
            align-items: end;
            .product_qty {
              .select_qty {
                display: flex;
                flex-direction: column;
                align-items: center;
                .btn_box {
                  display: flex;
                  align-items: center;
                  gap: 1vw;
                  font-size: clamp(24px, 1.5vw, 30px);
                  p {
                    width: 3vw;
                    min-width: 40px;
                    height: 3vw;
                    min-height: 40px;
                    text-align: center;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border: 1px solid #000;
                  }
                  span {
                    font-weight: bold;
                    font-size: clamp(30px, 2vw, 36px);
                    cursor: pointer;
                    user-select: none;
                    &:hover {
                      color: var(--color-red);
                    }
                  }
                }
                .max_qty {
                  font-size: 0.8vw;
                  color: #999;
                }
              }
            }
            .product_btns {
              display: flex;
              button {
                background-color: #d9d9d9;
                color: #999;
                width: 9vw;
                min-width: 100px;
                height: 3vw;
                min-height: 40px;
                border: none;
                margin-left: 0.5vw;
                user-select: none;
                font-size: clamp(14px, 1.2vw, 23px);
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
      }
    }
  }
  .another_product {
    background-color: grey;
  }
  @media (max-width: 985px) {
    border: none;
    box-sizing: border-box;
    .info_box {
      display: block;
      .img_wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        padding: 0 10%;
        box-sizing: border-box;
        gap: 10px;
      }
      .product_info {
        width: 100%;
        margin-top: 15px;
        .product_new_arrivals {
          font-size: 14px;
        }
        .product_name {
          font-size: 24px;
        }
        .product_color_model {
          font-size: 14px;
        }
        .product_size {
          margin: 20px 0;
        }
        .option_box {
          .txt_box {
            .same_product_wrapper {
              width: 125%;
              .same_product_list {
              }
            }
          }
        }
      }
    }
  }
  @media (max-width: 768px) {
    width: 100%;
    border-radius: 0;
    .info_box {
      .product_info {
        .option_box {
          .txt_box {
            .same_product_wrapper {
              width: 100%;
            }
            .option_wrapper {
              margin-top: 40px;
              .product_btns {
                width: 100%;
                align-self: flex-start;
                button {
                  width: 50%;
                  height: 60px;
                  margin-top: 15px;
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default ProductDetail;
