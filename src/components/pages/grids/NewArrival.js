import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper";
import api from "../../../assets/api/api";
import Pfunction from "../../../assets/module/Pfunction";
import ProductBox from "../ProductBox";

function NewArrival({ setProductInfo, setDetailBtn, closeCartAlarm }) {
  const [newItems, setNewItems] = useState([]);

  const getNewArrival = async () => {
    try {
      const response = await api.get("/product?all=1&mainCategory=NEW");
      const data = response.data.products;
      setNewItems(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getNewArrival();
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
        slidesPerView={4}
        slidesPerGroup={4}
        spaceBetween={10}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
      >
        {newItems.map((item, idx) => {
          return (
            <SwiperSlide key={idx}>
              <ProductBox item={item} onClick={() => selectProduct(item)} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </NewArrivalStyle>
  );
}

const NewArrivalStyle = styled.div`
  grid-column: span 3;
  grid-row: span 1;
  .swiper,
  .swiper-container {
    height: 100%;
  }
  .swiper-slide {
    display: flex;
    justify-content: center;
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
