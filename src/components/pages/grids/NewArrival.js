import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";

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
      {loading || <LoadingBox />}
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
`;

export default NewArrival;
