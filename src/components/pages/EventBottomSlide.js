import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import newsDB from "../../assets/DB/NewsData.json";

import "swiper/css";
import "swiper/css/autoplay";

import { Autoplay } from "swiper";
import styled from "styled-components";
import PUBLIC from "../../assets/module/PUBLIC";
import { useMediaQuery } from "react-responsive";

function EventBottomSlide({ setNewsNum }) {
  const changeNewsModal = (e) => {
    const modalBox = document.querySelector(".modal_box");
    setNewsNum(e.currentTarget.dataset.num);
    modalBox.scrollTo(0, 0);
  };
  const isMobile = useMediaQuery({ maxWidth: 768 });

  return (
    <BottomSlide>
      <Swiper
        slidesPerView={isMobile ? 2 : 4}
        spaceBetween={5}
        centeredSlides={true}
        loop={true}
        modules={[Autoplay]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        className="mySwiper"
      >
        {newsDB.data.map((news) => (
          <SwiperSlide key={news.no}>
            <div
              className="news_bottom_slide_box"
              data-num={news.no}
              onClick={changeNewsModal}
            >
              <p className="news_bottom_slide_title">
                {news.title}
                <em>{news.sub}</em>
              </p>
              <img
                src={`${PUBLIC}/images/news/${news.cover}`}
                alt="반스 뉴스 이미지"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </BottomSlide>
  );
}

const BottomSlide = styled.div`
  margin: 100px 5px 50px;
  .news_bottom_slide_box {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    position: relative;
    .news_bottom_slide_title {
      position: absolute;
      font-size: clamp(12px, 0.7vw, 15px);
      font-weight: bold;
      color: white;
      bottom: 0;
      left: 0;
      width: 100%;
      background-color: rgba(0, 0, 0, 0.7);
      padding: 30px 10px 40px;
      text-align: center;
      box-sizing: border-box;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      em {
        display: block;
        font-size: clamp(10px, 0.6vw, 14px);
        font-weight: normal;
        margin-top: 10px;
        color: #d6d6d6;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
    img {
      object-fit: cover;
      width: 100%;
      height: 260px;
    }
  }
`;

export default EventBottomSlide;
