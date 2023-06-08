import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import newsDB from "../../assets/DB/NewsData.json";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import { Autoplay, Pagination } from "swiper";
import styled from "styled-components";

function EventBottomSlide({ setNewsNum }) {
  const changeNewsModal = (e) => {
    const modalBox = document.querySelector(".modal_box");
    setNewsNum(e.currentTarget.dataset.num);
    modalBox.scrollTo(0, 0);
  };
  return (
    <BottomSlide>
      <p className="news_list">- VANS NEWS -</p>
      <Swiper
        slidesPerView={4}
        spaceBetween={5}
        centeredSlides={true}
        loop={true}
        modules={[Autoplay]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        className="mySwiper">
        {newsDB.data.map((news) => (
          <SwiperSlide key={news.no}>
            <div className="news_bottom_slide_box" data-num={news.no} onClick={changeNewsModal}>
              <p className="news_bottom_slide_title">
                {news.title}
                <em>{news.sub}</em>
              </p>
              <img src={process.env.PUBLIC_URL + `./images/news/${news.cover}`} alt="반스 뉴스 이미지" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </BottomSlide>
  );
}

const BottomSlide = styled.div`
  margin: 50px 0;
  .news_list {
    font-family: "Kampung", serif;
    font-size: 50px;
    margin: 30px 0;
    color: #d51920;
  }
  .news_bottom_slide_box {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    position: relative;
    .news_bottom_slide_title {
      position: absolute;
      font-size: 15px;
      font-weight: bold;
      color: white;
      bottom: 0;
      left: 0;
      width: 100%;
      background-color: rgba(0, 0, 0, 0.7);
      padding: 30px 10px 40px;
      text-align: center;
      box-sizing: border-box;
      em {
        display: block;
        font-size: 14px;
        font-weight: normal;
        margin-top: 10px;
        color: #d6d6d6;
      }
    }
    img {
      object-fit: cover;
      width: 100%;
      height:260px;
    }
  }
`;

export default EventBottomSlide;
