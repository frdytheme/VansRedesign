import React from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import PUBLIC from "../../assets/module/PUBLIC";
import imageInfo from "../../assets/DB/imageInfo.json";

function ImageSlide({ model, setMainImg }) {
  const imgs = document.querySelectorAll(".detail_imgs img");
  const imgArr = imageInfo[model].slice(0, imageInfo[model].length - 1);
  const imgList = [imageInfo[model][imageInfo[model].length - 1], ...imgArr];

  const viewImg = (e, url) => {
    imgs.forEach((img) => img.classList.remove("selected"));
    e.target.classList.add("selected");
    setMainImg(url);
  };

  return (
    <ImgSlideStyle>
      <Swiper
        slidesPerView={4}
        spaceBetween={3}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
      >
        {imgList.map((url, idx) => (
          <SwiperSlide
            key={idx}
            className="detail_imgs"
            onClick={(e) => viewImg(e, url)}
          >
            <img
              src={`${PUBLIC}${url}`}
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
  user-select: none;
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
