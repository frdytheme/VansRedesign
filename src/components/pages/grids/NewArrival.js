import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { useMediaQuery } from "react-responsive";

import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper";
import Pfunction from "../../../assets/module/Pfunction";
import ProductBox from "../ProductBox";
import authApi from "../../../assets/api/authApi";
import LoadingBox from "../../LoadingBox";

function NewArrival({ setProductInfo, setDetailBtn, closeCartAlarm }) {
  const newProduct = JSON.parse(sessionStorage.getItem("NEW_ARRIVAL")) || [];
  const [loading, setLoading] = useState(true);
  const isTablet = useMediaQuery({ maxWidth: 1200, minWidth: 769 });
  const isMobile = useMediaQuery({ maxWidth: 768 });

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
  }, [newProduct.length]);

  const selectProduct = (item) => {
    setDetailBtn(true);
    setProductInfo(item);
    Pfunction.updateRecently(item);
    closeCartAlarm();
  };

  return (
    <NewArrivalStyle className="new_container">
      <Swiper
        slidesPerView={isTablet ? 6 : isMobile ? 2 : 5}
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
      {loading || <LoadingBox />}
    </NewArrivalStyle>
  );
}

const NewArrivalStyle = styled.div`
  width: 100%;
  grid-column: span 3;
  grid-row: span 1;
  position: relative;
  .swiper,
  .swiper-container {
    height: 100%;
  }
  .swiper-slide {
    display: flex;
    justify-content: start;
    .img_wrapper {
      height: 75%;
      .product_img {
        height: 100%;
      }
    }
    .product_caption {
      margin: 0;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      position: relative;
      height: 25%;
      .product_name {
        overflow: hidden;
        max-width: 100%;
        white-space: nowrap;
        text-overflow: ellipsis;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 15px;
      }
      .product_price {
        margin: 0;
      }
    }
  }
  .swiper-button-next:after,
  .swiper-button-prev:after {
    font-size: 2vw;
    color: var(--color-red);
    color: #000;
    font-weight: bold;
  }
  @media (max-width: 1200px) {
    width: calc(100% - 10px);
    .swiper-slide {
      .product_caption {
        .new_arrival {
          font-size: clamp(10px, 0.7vw, 16px);
        }
        .product_name {
          font-size: clamp(12px, 1.2vw, 16px);
        }

        .product_price {
          font-size: clamp(12px, 1.2vw, 16px);
        }
      }
    }
  }
  @media (max-width: 768px) {
    .product_caption {
      /* gap: 1vw; */
    }
  }
`;

export default NewArrival;
