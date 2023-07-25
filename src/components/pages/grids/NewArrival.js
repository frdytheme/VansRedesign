import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import axios from "axios";

import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper";

function NewArrival() {
  const [newItems, setNewItems] = useState([]);
  const PUBLIC = process.env.PUBLIC_URL;

  const getNewArrival = async () => {
    const response = await axios.get("http://localhost:5000/api/product?all=1&mainCategory=NEW,SHOES");
    const data = response.data.products;
    setNewItems(data);
  };

  useEffect(() => {
    getNewArrival();
  }, []);

  return (
    <NewArrivalStyle>
      <Swiper
        slidesPerView={4}
        slidesPerGroup={4}
        spaceBetween={30}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper">
        {newItems.map((item) => {
          return (
            <SwiperSlide>
              <figure key={item.model} className="product_box">
                <div className="img_wrapper">
                  <img
                    src={PUBLIC + `./images/product/${item.model}/${item.model}_${item.model}_primary.jpg`}
                    alt="제품 대표 사진"
                    className="product_img"
                  />
                  <img
                    src={PUBLIC + `./images/product/${item.model}/${item.model}_${item.model}_02.jpg`}
                    alt="제품 대표 사진"
                    className="product_img hover"
                  />
                </div>
                <figcaption className="product_caption">
                  <em className="new_arrival">NEW</em>
                  <p className="product_name">{item.name}</p>
                  {/* <p className="product_price">{Number(item.price).toLocaleString("ko-KR") + "원"}</p> */}
                </figcaption>
              </figure>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </NewArrivalStyle>
  );
}

const NewArrivalStyle = styled.div`
  grid-column: span 2;
  .swiper,
  .swiper-container {
    height: 100%;
  }
  .swiper-button-next:after,
  .swiper-button-prev:after {
    font-size: 1.5vw;
    color: var(--color-red);
    font-weight: bold;
  }
  .product_box {
    width: 100%;
    text-align: center;
    position: relative;
    cursor: pointer;
    user-select: none;
  }
  .img_wrapper {
    height: 11.2vw;
    position: relative;
    &:hover .product_img.hover {
      opacity: 1;
    }
  }
  .product_img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    object-fit: cover;
    border-radius: 20px;
    cursor: pointer;
    vertical-align: bottom;
    &.hover {
      opacity: 0;
      transition: 0.3s;
    }
  }
  .product_caption {
    .new_arrival {
      color: var(--color-red);
      font-weight: 800;
      font-size: 0.7vw;
    }
    .product_name {
      font-size: 0.8vw;
      line-height: 1.2;
      margin: 0.2vw 0 0.5vw;
    }
    .product_price {
      font-size: 0.7vw;
    }
  }
`;

export default NewArrival;
