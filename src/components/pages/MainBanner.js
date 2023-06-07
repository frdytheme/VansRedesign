import React, { useRef } from "react";
import styled from "styled-components";

function MainBanner() {
  const bannerImg = ["banner_0.jpg", "banner_1.jpg", "banner_2.jpg"];
  const PUBLIC = process.env.PUBLIC_URL;
  return (
    <BannerStyle>
      {bannerImg.map((img, idx) => (
        <img src={PUBLIC + `images/banner/${img}`} alt="배너 이미지" key={idx} className={`bannerImg banner${idx}`} />
      ))}
    </BannerStyle>
  );
}

const BannerStyle = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 20px;
  grid-column: span 3;
  display: flex;
  flex-direction: column;
  img {
    /* position: absolute; */
    object-fit: cover;
    width: 100%;
    transition: 0.4s;
    &.bannerImg {
    }
  }
`;
export default MainBanner;
