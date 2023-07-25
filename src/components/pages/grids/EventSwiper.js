import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Autoplay, Pagination } from "swiper";
import styled from "styled-components";
import newsDB from "../../../assets/DB/NewsData.json";
import EventModal from "../EventModal";

function EventSwiper() {
  const [newsToggle, setNewsToggle] = useState(false);
  const [newsNum, setNewsNum] = useState(0);

  const handleNewsModal = (e) => {
    setNewsToggle(!newsToggle);
    setNewsNum(e.currentTarget.dataset.num);
  };
  return (
    <EventStyle>
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination, Autoplay]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        className="mySwiper"
        loop={true}>
        {newsDB.data.map((news) => (
          <SwiperSlide key={news.no}>
            <div className="event_box" onClick={handleNewsModal} data-num={news.no}>
              <p className="event_title">
                {news.title}
                <em>{news.sub}</em>
              </p>
              <img src={process.env.PUBLIC_URL + `./images/news/${news.cover}`} alt="반스 뉴스 이미지" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      {newsToggle && (
        <EventModal setNewsToggle={setNewsToggle} newsDB={newsDB} newsNum={newsNum} setNewsNum={setNewsNum} />
      )}
    </EventStyle>
  );
}

const EventStyle = styled.div`
  .swiper-pagination-bullet {
    background: #d51920;
  }
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 20px;
  display: flex;
  .swiper-slide {
    cursor: pointer;
    .event_box {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      position: relative;
      .event_title {
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
        /* transform: translateY(100%); */
        transition: 0.4s;
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
      }
    }
  }
`;

export default EventSwiper;
