import React, { useRef } from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";

import { Autoplay, Scrollbar } from "swiper";
import { useNavigate } from "react-router-dom";

function NavBanner({ setListName, gnbs }) {
  const bannerImg = [
    { img: "banner_0.jpg", name: "KNU 컬렉션" },
    { img: "banner_1.jpg", name: "Authentic" },
    { img: "banner_2.jpg", name: "리컨스트럭트 팩" },
  ];
  const PUBLIC = process.env.PUBLIC_URL;
  const navigate = useNavigate();

  const selectBanner = (e) => {
    const name = e.target.getAttribute("banner-name");
    setListName(["ALL", name]);
    navigate("./product");
    gnbs.forEach(gnb => gnb.classList.remove("active"));
  };

  return (
    <BannerStyle onClick={selectBanner}>
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
            <img
              src={PUBLIC + `images/banner/${img.img}`}
              alt="배너 이미지"
              className={`bannerImg banner${idx}`}
              banner-name={img.name}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </BannerStyle>
  );
}

const BannerStyle = styled.div`
  width: 100%;
  grid-column: span 3;
  overflow: hidden;
  border-radius: 20px;
  display: flex;
  cursor: pointer;
  &:active {
    cursor: grab;
  }
  .bannerImg {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
export default NavBanner;
