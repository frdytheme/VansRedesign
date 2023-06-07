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
        spaceBetween={30}
        centeredSlides={true}
        loop={true}
        modules={[Autoplay]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        className="mySwiper">
        {newsDB.data.map((news) => (
          <SwiperSlide key={news.no}>
            <div className="event_box" data-num={news.no} onClick={changeNewsModal}>
              <p className="event_title">
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
`;

export default EventBottomSlide;
