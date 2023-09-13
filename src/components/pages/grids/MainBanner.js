import React from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";

import { Scrollbar } from "swiper";
import { useNavigate } from "react-router-dom";

function MainBanner({ setListName}) {
  const bannerImg = [
    { img: "banner_0.jpg", name: "KNU 컬렉션" },
    { img: "banner_1.jpg", name: "Authentic" },
    { img: "banner_2.jpg", name: "리컨스트럭트 팩" },
  ];
  const navigate = useNavigate();

  const selectBanner = (e) => {
    const name = e.target.getAttribute("banner-name");
    setListName(["ALL", name]);
    navigate("./product");
  };

  return (
    <BannerStyle onClick={selectBanner}>
      <Swiper
        scrollbar={{
          hide: true,
        }}
        modules={[Scrollbar]}
        className="mySwiper"
        loop={true}>
        {bannerImg.map((img, idx) => (
          <SwiperSlide key={idx}>
            <img
              src={`images/banner/${img.img}`}
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
  grid-row: span 3;
  overflow: hidden;
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
export default MainBanner;
