import React, { useRef } from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";

import { Autoplay, Scrollbar } from "swiper";

function MainBanner() {
  const bannerImg = ["banner_0.jpg", "banner_1.jpg", "banner_2.jpg"];
  const PUBLIC = process.env.PUBLIC_URL;
  return (
    <BannerStyle>
      <Swiper
        scrollbar={{
          hide: true,
        }}
        modules={[Scrollbar, Autoplay]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        className="mySwiper"
        loop={true}>
        {bannerImg.map((img, idx) => (
          <SwiperSlide key={idx}>
            <img src={PUBLIC + `images/banner/${img}`} alt="배너 이미지" className={`bannerImg banner${idx}`} />
          </SwiperSlide>
        ))}
      </Swiper>
    </BannerStyle>
  );
}

const BannerStyle = styled.div`
  grid-column: span 2;
  overflow: hidden;
  border-radius: 20px;
  .bannerImg {
    width: 100%;
    object-fit: cover;
  }
`;
export default MainBanner;
