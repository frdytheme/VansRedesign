import React from "react";
import styled from "styled-components";
import PUBLIC from "../assets/module/PUBLIC";
import { useMatch } from "react-router-dom";

function Footer() {
  const footerTxt = [
    ["유한책임회사", "브이에프코리아"],
    ["대표", "TZE CHOI THEODORE PANG"],
    ["등록번호", "220-88-43561"],
    ["통신판매업신고번호", "2013-서울강남-02918호"],
    ["사업자정보확인", "서울특별시 강남구 테헤란로 317 동훈타워 18층"],
    ["개인정보 책임자", "남미리내"],
    ["고객센터", "(평일 09:00 ~ 18:00) 1522-1882"],
    ["이메일", "Vanskr_online@vfc.com"],
  ];
  return (
    <FooterStyle>
      <div className="footer_wrapper">
        <ul className="footer_txt">
          {footerTxt.map((txt, idx) => (
            <li key={idx}>
              <p>{txt[0]}</p>
              <em>{txt[1]}</em>
            </li>
          ))}
        </ul>
        <img
          src={`${PUBLIC}/images/official/vans_footer.svg`}
          alt="반스 로고"
          className="footer_logo"
        />
      </div>
    </FooterStyle>
  );
}

const FooterStyle = styled.footer`
  width: 100%;
  padding: 0 10px;
  box-sizing: border-box;
  position: absolute;
  bottom: 0;
  left: 0;
  .footer_wrapper {
    width: 100%;
    height: 70px;
    background-color: black;
    border-radius: 15px 15px 0 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #888;
    .footer_logo {
      transform: scale(70%);
    }
    .footer_txt {
      padding-left: 20px;
      display: flex;
      align-items: center;
      font-size: clamp(10px, 0.6vw, 17px);
      gap: 2vw;
      margin-left: 30px;
      li {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        p {
          color: #999;
          font-weight: bold;
          margin-bottom: 0.3vw;
        }
      }
    }
  }
  @media (max-width: 1200px) {
    position: relative;
    .footer_wrapper {
      height: auto;
      padding: 15px;
      justify-content: flex-start;
      box-sizing: border-box;
      margin-top: 10px;
      bottom: 0;
      .footer_txt {
        margin: 0;
        flex-wrap: wrap;
      }
    }
  }
  @media (max-width: 768px) {
  }
`;

export default Footer;
