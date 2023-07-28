import React from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";

function ImageSlide({ imgArr, model, setMainImg }) {
  const imgs = document.querySelectorAll(".detail_imgs img");

  const viewImg = (e, url) => {
    imgs.forEach((img) => img.classList.remove("selected"));
    e.target.classList.add("selected");
    setMainImg(url);
  };

  return (
    <ImgSlideStyle>
      <Swiper
        slidesPerView={4}
        slidesPerGroup={4}
        spaceBetween={3}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper">
        {imgArr.map((url, idx) => (
          <SwiperSlide key={idx} className="detail_imgs" onClick={(e) => viewImg(e, url)}>
            <img
              src={process.env.PUBLIC_URL + `./images/product/${model}/${url}`}
              alt="제품 상세 이미지"
              className={idx === 0 ? "selected" : undefined}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </ImgSlideStyle>
  );
}

const ImgSlideStyle = styled.div`
  width: 100%;
  .swiper-button-next:after,
  .swiper-button-prev:after {
    font-size: 1.5vw;
    color: #000;
    font-weight: bold;
  }
  .detail_imgs {
    cursor: pointer;
    img {
      width: 100%;
      &.selected {
        opacity: 0.5;
      }
    }
  }
`;

export default ImageSlide;
