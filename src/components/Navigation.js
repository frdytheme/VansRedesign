import React from "react";
import styled, { keyframes } from "styled-components";
import MainBanner from "./pages/MainBanner";
import { useNavigate } from "react-router-dom";

function Navigation({setListName}) {
  let id = 0;
  const gnbList = [
    {
      id: id++,
      name: "NEW",
      lnb: [
        { title: "NEW", menu: ["NEW", "신발 신상품", "의류 신상품", "액세서리 신상품", "키즈 신상품"] },
        {
          title: "COLLECTION",
          menu: [
            "KNU 컬렉션",
            "리컨스트럭트 팩",
            "각 도시를 담은 시티팩 컬렉션",
            "JUN 클래식 캠페인",
            "썸머 티셔츠 컬렉션",
            "썸머 풋웨어 컬렉션",
          ],
        },
        { title: "CUSTOM", menu: ["VANS X HARIBO", "PINK VIBE", "NEW SEASON, NEW SWATCH"] },
      ],
    },
    {
      id: id++,
      name: "MEN",
      lnb: [
        { title: "신발", menu: ["전체보기", "코어클래식", "클래식", "스케이트 슈즈", "클래식플러스", "서프"] },
        { title: "의류", menu: ["전체보기", "탑 & 티셔츠", "플리스", "아우터", "하의"] },
        { title: "악세서리", menu: ["전체보기", "모자", "가방", "양말", "기타"] },
        { title: "WHAT'S HOT", menu: ["기본 실루엣", "온라인 단독", "COMFYCUSH", "애너하임 팩토리", "울트라레인지"] },
      ],
    },
    {
      id: id++,
      name: "WOMEN",
      lnb: [
        { title: "신발", menu: ["전체보기", "코어클래식", "클래식", "스케이트 슈즈", "클래식플러스", "서프"] },
        { title: "의류", menu: ["전체보기", "탑 & 티셔츠", "플리스", "아우터", "원피스 & 하의"] },
        { title: "악세서리", menu: ["전체보기", "모자", "가방", "양말", "기타"] },
        {
          title: "WHAT'S HOT",
          menu: ["기본 실루엣", "온라인 단독", "COMFYCUSH", "애너하임 팩토리", "플랫폼", "뮬 패밀리"],
        },
      ],
    },
    {
      id: id++,
      name: "KIDS",
      lnb: [
        { title: "신발", menu: ["전체보기", "토들러", "키즈", "베스트 셀러"] },
        { title: "의류", menu: ["전체보기", "보이즈", "키즈"] },
        { title: "악세서리", menu: ["전체보기", "모자", "양말"] },
        {
          title: "CUSTOMS",
          menu: ["커스텀 하기", "강아지&고양이 패턴"],
        },
      ],
    },
    {
      id: id++,
      name: "VAULT",
    },
    {
      id: id++,
      name: "CUSTOM",
      lnb: [
        {
          title: "CUSTOMS",
          menu: [
            "나만의 신발 만들기",
            "어센틱 커스텀",
            "슬립온 커스텀",
            "올드스쿨 커스텀",
            "에라 커스텀",
            "스케이트-하이 커스텀",
          ],
        },
        {
          title: "FEATURED",
          menu: ["VANS X HARIBO", "PINK VIBE", "NEW SEASON, NEW SWATCH"],
        },
      ],
    },
    { id: id++, name: "SKATEBOARDING" },
    { id: id++, name: "SALE" },
    {
      id: id++,
      name: "MORE",
      lnb: [
        { title: "MORE FUN", menu: ["SURF", "SUSTAINABILITY", "ABOUT VANS", "VANS NEWS", "THIS IS OFF THE WALL"] },
        { title: "SNOW" },
      ],
    },
  ];
  const navigate = useNavigate();
  const btns = document.querySelectorAll(".gnb_item");

  const handleGnb = (e) => {
    btns.forEach((btn) => {
      btn.classList.remove("checked");
    });
    e.target.classList.add("checked");
  };

  const clickMenu = () => {
    navigate("./product");
    btns.forEach((btn) => {
      btn.classList.remove("checked");
    });
  };
  return (
    <Nav>
      <div className="nav_box">
        <div className="logo" onClick={() => navigate("/home")}>
          <img src={process.env.PUBLIC_URL + "./images/official/vans_logo.svg"} alt="반스 로고" />
        </div>
        <ul className="gnb">
          {gnbList.map((li) => (
            <li
              key={li.id}
              className="gnb_item"
              onMouseEnter={handleGnb}
              onMouseLeave={handleGnb}
              onClick={() => clickMenu()}>
              {li.name}
              {li.lnb && (
                <div className="lnb">
                  {li.name === "NEW" && <MainBanner />}
                  {li.lnb.map((lnb, idx) => {
                    return (
                      <ul key={idx} className="lnb_group">
                        <li className="lnb_title">{lnb.title}</li>
                        {lnb.menu &&
                          lnb.menu.map((menu, idx) => {
                            return (
                              <li key={idx} className="lnb_item">
                                {menu}
                              </li>
                            );
                          })}
                      </ul>
                    );
                  })}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </Nav>
  );
}

const lnbDown = keyframes`
  100% {
    opacity: 1;
  }
`;

const Nav = styled.header`
  width: 100%;
  padding: 10px 10px 0 10px;
  box-sizing: border-box;
  .nav_box {
    background-color: #000;
    width: 100%;
    height: 70px;
    line-height: 70px;
    display: flex;
    justify-content: space-between;
    border-radius: 20px;
    text-align: center;
    position: relative;
    .logo {
      padding: 10px 40px;
      cursor: pointer;
    }
    .gnb {
      color: #fff;
      display: flex;
      margin-right: 50px;
      z-index: 9999;
      .gnb_item {
        width: 100%;
        font-size: 16px;
        padding-right: 30px;
        cursor: pointer;
        &.checked {
          color: var(--color-pink);
          & .lnb {
            display: flex;
            gap: 30px;
            animation-play-state: running;
            cursor: default;
          }
        }
        .lnb {
          width: 100%;
          color: #fff;
          position: absolute;
          left: 0;
          top: 100%;
          background-color: #111;
          z-index: 99;
          line-height: 1;
          padding: 30px 100px;
          box-sizing: border-box;
          border-radius: 20px;
          display: none;
          justify-content: flex-end;
          opacity: 0;
          animation: ${lnbDown} 0.4s forwards;
          .lnb_group {
            width: 200px;
            .lnb_title {
              font-size: 18px;
              color: var(--color-pink);
              font-weight: bold;
            }
            .lnb_item {
              margin: 20px 0;
              font-size: 15px;
              cursor: pointer;
              &:hover {
                color: var(--color-red);
              }
            }
          }
        }
      }
    }
  }
`;

export default Navigation;
