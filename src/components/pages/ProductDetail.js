import axios from "axios";
import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import ImageSlide from "./ImageSlide";
import api from "../../assets/api/api";
import Pfunction from "../../assets/module/Pfunction";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

function ProductDetail({ setProductInfo, productInfo, setDetailBtn, setNavCart, setTimerId }) {
  const PUBLIC = process.env.PUBLIC_URL;
  const { name, color, model, price, size, mainCategory } = productInfo;
  const sizeArr = Object.keys(size);
  const [selectedSize, setSelectedSize] = useState("");
  const [imgArr, setImgArr] = useState([]);
  const [mainImg, setMainImg] = useState("");
  const [sameProduct, setSameProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [qty, setQty] = useState(1);
  const [maxQty, setMaxQty] = useState(0);

  const fetchSameProduct = async () => {
    try {
      const response = await api.get(`/product?all=1&name=${name}`);
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

  useEffect(() => {
    const maximum = productInfo.size[selectedSize];
    setMaxQty(maximum);
  }, [selectedSize]);

  const handleCart = () => {
    if (!selectedSize) return;
    Pfunction.addCart(productInfo, selectedSize, qty, setNavCart, setTimerId);
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

  return (
    <ProductDetailStyle className="product_info_container">
      <div className="console_box">
        <span
          className="material-symbols-outlined close_btn"
          onClick={() => setDetailBtn(false)}
        >
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
                  className="size_item"
                  onClick={(e) => {
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
            <div className="txt_box">
              <Swiper
                className="mySwiper same_product_list"
                slidesPerView={6}
                spaceBetween={50}
              >
                {sameProduct.map((item) => (
                  <SwiperSlide key={item.id}>
                    <img
                      src={`${PUBLIC}/images/product/${item.model}/${item.model}_${item.model}_primary.jpg`}
                      alt={`${item.name} 제품 이미지`}
                      className="same_product"
                      onClick={() => {
                        setLoading(false);
                        setProductInfo(item);
                      }}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className="product_info_li product_DC">
                상품 설명란입니다. <br /> 상품에 맞는 설명을 작성해주세요.
              </div>
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
    grid-auto-rows: 1fr;
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
      .product_size {
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
      .option_box {
        display: grid;
        grid-template-columns: 6fr 4fr;
        grid-auto-rows: 1fr;
        font-size: 2vw;
        font-weight: 500;
        .txt_box {
          width: 100%;
          .same_product_list {
            width: 36vw;
            .same_product {
              width: 6vw;
              cursor: pointer;
              &:hover {
                filter: brightness(0.7);
              }
            }
          }
          .product_DC {
            margin-top: 15px;
            font-size: 0.9vw;
            line-height: 1.4;
          }
        }

        .option_wrapper {
          display: flex;
          flex-direction: column;
          gap: 1vw;
          align-items: end;
          margin-top: 5vw;
          .product_qty {
            .select_qty {
              display: flex;
              flex-direction: column;
              align-items: center;
              .btn_box {
                display: flex;
                align-items: center;
                gap: 1vw;
                font-size: 1.5vw;
                p {
                  width: 3vw;
                  height: 3vw;
                  text-align: center;
                  line-height: 3vw;
                  border: 1px solid #000;
                }
                span {
                  font-weight: bold;
                  font-size: 2vw;
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
    }
  }
  .another_product {
    background-color: grey;
  }
`;

export default ProductDetail;
