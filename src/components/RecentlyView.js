import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import styled from "styled-components";
import Cookies from "js-cookie";

function RecentlyView() {
  const productsCookie = Cookies.get("recentlyProducts");

  const [recentlyList, setRecentlyList] = useState([]);

  useEffect(() => {
    setRecentlyList(productsCookie ? JSON.parse(productsCookie) : []);
  }, [productsCookie]);

  return (
    <RecentlyViewStyle>
      <p className="recently_title">최근 본 상품</p>
      <Swiper className="mySwiper" loop={true} slidesPerView={5} spaceBetween={10}>
        {recentlyList.length !== 0 ? (
          recentlyList.map((product) => (
            <SwiperSlide key={product}>
              <img
                src={`${process.env.PUBLIC_URL}/images/product/${product}/${product}_${product}_primary.jpg`}
                alt="제품 대표 사진"
                className="product_img"
              />
            </SwiperSlide>
          ))
        ) : (
          <p>최근 본 상품 없음.</p>
        )}
      </Swiper>
    </RecentlyViewStyle>
  );
}

const RecentlyViewStyle = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  /* background-color: #E5E4EA; */
  .mySwiper {
    width: 100%;
    height: 100%;

    img {
      border-radius: 50%;
      width: 100%;
      object-fit: cover;
    }
  }
  .recently_title {
    width: 100%;
    text-align: center;
    font-weight: bold;
    font-size: 1vw;
  }
`;

export default RecentlyView;
