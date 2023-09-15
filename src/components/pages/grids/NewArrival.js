import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper";
import Pfunction from "../../../assets/module/Pfunction";
import ProductBox from "../ProductBox";
import authApi from "../../../assets/api/authApi";

function NewArrival({ setProductInfo, setDetailBtn, closeCartAlarm }) {
  const newProduct = JSON.parse(sessionStorage.getItem("NEW_ARRIVAL")) || [];
  const [newItems, setNewItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const getNewArrival = async () => {
    setLoading(false);
    try {
      const response = await authApi.get("/product?all=1&mainCategory=NEW");
      const data = response.data.products;
      sessionStorage.setItem("NEW_ARRIVAL", JSON.stringify(data));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(true);
    }
  };

  useEffect(() => {
    if (newProduct.length === 0) getNewArrival();
  }, []);

  const selectProduct = (item) => {
    setDetailBtn(true);
    setProductInfo(item);
    Pfunction.updateRecently(item);
    closeCartAlarm();
  };

  return (
    <NewArrivalStyle>
      <Swiper
        slidesPerView={5}
        slidesPerGroup={5}
        spaceBetween={10}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
      >
        {newProduct.map((item, idx) => {
          return (
            <SwiperSlide key={idx}>
              <ProductBox item={item} onClick={() => selectProduct(item)} />
            </SwiperSlide>
          );
        })}
      </Swiper>
      {loading || (
        <div className="loading_state">
          <div className="lds-ellipsis">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      )}
    </NewArrivalStyle>
  );
}

const NewArrivalStyle = styled.div`
  grid-column: span 3;
  grid-row: span 1;
  position: relative;
  .swiper,
  .swiper-container {
    height: 100%;
  }
  .swiper-slide {
    display: flex;
    justify-content: center;
    .product_caption {
      margin-top: 0;
    }
  }
  .swiper-button-next:after,
  .swiper-button-prev:after {
    font-size: 2vw;
    color: var(--color-red);
    color: #000;
    font-weight: bold;
  }
  .loading_state {
    font-size: 2vw;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 99;
    width: 100%;
    height: 100%;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .lds-ellipsis {
      display: inline-block;
      position: relative;
      width: 80px;
      height: 80px;
      & div {
        position: absolute;
        top: 33px;
        width: 13px;
        height: 13px;
        border-radius: 50%;
        background: var(--color-red);
        animation-timing-function: cubic-bezier(0, 1, 1, 0);
        &:nth-child(1) {
          left: 8px;
          animation: lds-ellipsis1 0.6s infinite;
        }
        &:nth-child(2) {
          left: 8px;
          animation: lds-ellipsis2 0.6s infinite;
        }
        &:nth-child(3) {
          left: 32px;
          animation: lds-ellipsis2 0.6s infinite;
        }
        &:nth-child(4) {
          left: 56px;
          animation: lds-ellipsis3 0.6s infinite;
        }
      }
    }
    @keyframes lds-ellipsis1 {
      0% {
        transform: scale(0);
      }
      100% {
        transform: scale(1);
      }
    }
    @keyframes lds-ellipsis3 {
      0% {
        transform: scale(1);
      }
      100% {
        transform: scale(0);
      }
    }
    @keyframes lds-ellipsis2 {
      0% {
        transform: translate(0, 0);
      }
      100% {
        transform: translate(24px, 0);
      }
    }
  }
`;

export default NewArrival;
