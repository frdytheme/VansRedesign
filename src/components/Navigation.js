import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import NavBanner from "./pages/NavBanner";

function Navigation({ setListName, searchName, setSearchName, setSubmitBtn, cartCount }) {
  let id = 0;
  const gnbList = [
    {
      id: id++,
      name: "NEW",
      lnb: [
        {
          title: "NEW",
          menu: [
            "NEW",
            "신발 신상품",
            "의류 신상품",
            "악세서리 신상품",
            "키즈 신상품",
          ],
        },
        {
          title: "COLLECTION",
          menu: [
            "KNU 컬렉션",
            "리컨스트럭트 팩",
            "각 도시를 담은 시티팩 컬렉션",
            "썸머 티셔츠 컬렉션",
            "썸머 풋웨어 컬렉션",
          ],
        },
      ],
    },
    {
      id: id++,
      name: "MEN",
      lnb: [
        {
          title: "신발",
          menu: [
            "전체보기",
            "코어클래식",
            "클래식",
            "스케이트 슈즈",
            "클래식플러스",
            "서프",
          ],
        },
        {
          title: "의류",
          menu: ["전체보기", "탑&티셔츠", "플리스", "아우터", "하의"],
        },
        {
          title: "악세서리",
          menu: ["전체보기", "모자", "가방", "양말", "기타"],
        },
      ],
    },
    {
      id: id++,
      name: "WOMEN",
      lnb: [
        {
          title: "신발",
          menu: [
            "전체보기",
            "코어클래식",
            "클래식",
            "스케이트 슈즈",
            "클래식플러스",
            "서프",
          ],
        },
        {
          title: "의류",
          menu: [
            "전체보기",
            "탑&티셔츠",
            "플리스",
            "아우터",
            "하의",
            "원피스&스커트",
          ],
        },
        {
          title: "악세서리",
          menu: ["전체보기", "모자", "가방", "양말", "기타"],
        },
      ],
    },
    {
      id: id++,
      name: "KIDS",
      lnb: [
        {
          title: "신발",
          menu: ["전체보기", "토들러", "키즈 신발", "베스트 셀러"],
        },
        { title: "의류", menu: ["전체보기", "보이즈", "키즈 의류"] },
        { title: "악세서리", menu: ["전체보기", "모자", "양말"] },
      ],
    },
    {
      id: id++,
      name: "VAULT",
    },
  ];
  const navigate = useNavigate();
  const gnbs = document.querySelectorAll(".gnb_item");

  const activeGnb = (e) => {
    e.currentTarget.classList.add("active");
  };
  const disableGnb = (e) => {
    e.currentTarget.classList.remove("active");
  };

  const selectMenu = (e) => {
    const clickMenu = () => {
      navigate("./product");
      gnbs.forEach((gnb) => gnb.classList.remove("active"));
    };

    const translateName = (e) => {
      e.stopPropagation();

      const mainCategory =
        e.target.parentNode.parentNode.parentNode.getAttribute("gnb-name");
      let name = e.target.getAttribute("gnb-name");
      if (name === "신발" || name === "신발 신상품" || name === "키즈 신발")
        name = "SHOES";
      if (name === "의류" || name === "의류 신상품" || name === "키즈 의류")
        name = "CLOTHES";
      if (name === "악세서리" || name === "악세서리 신상품") name = "ACCESSORY";
      if (name === "키즈 신상품") name = "KIDS";

      setListName([mainCategory || "ALL", name]);
    };

    translateName(e);
    clickMenu();
    setSearchName("");
  };

  const submitSearch = (e) => {
    e.preventDefault();
    setSubmitBtn((prev) => !prev);
    navigate("./product");
  };

  return (
    <Nav>
      <div className="nav_box">
        <div className="logo" onClick={() => navigate("/home")}>
          <img
            src={process.env.PUBLIC_URL + "./images/official/vans_logo_wht.svg"}
            alt="반스 로고"
          />
        </div>
        <ul className="gnb">
          {gnbList.map((li) => (
            <li
              key={li.id}
              className="gnb_item"
              gnb-name={li.name}
              name="mainCategory"
              onMouseEnter={activeGnb}
              onMouseLeave={disableGnb}
              onClick={(e) => {
                selectMenu(e);
              }}
            >
              {li.name}
              {li.lnb && (
                <div className="lnb" onClick={(e) => e.stopPropagation()}>
                  {li.name === "NEW" && (
                    <NavBanner setListName={setListName} gnbs={gnbs} />
                  )}
                  {li.lnb.map((lnb, idx) => {
                    return (
                      <ul key={idx} className="lnb_group">
                        <li
                          className="lnb_title"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {lnb.title}
                        </li>
                        {lnb.menu &&
                          lnb.menu.map((menu, idx) => {
                            return (
                              <li
                                key={idx}
                                className="lnb_item"
                                gnb-name={
                                  menu === "전체보기" ? lnb.title : menu
                                }
                                onClick={(e) => selectMenu(e)}
                              >
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
          <li className="gnb_item disabled">CUSTOM</li>
          <li className="gnb_item disabled">SKATEBOARDING</li>
          <li className="gnb_item disabled">SALE</li>
          <li className="gnb_item disabled">MORE</li>
        </ul>
        <form onSubmit={submitSearch}>
          <label className="searchContainer">
            <input
              type="text"
              className="searchBox"
              placeholder="Search..."
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />
            <span className="material-symbols-outlined searchIcon">search</span>
          </label>
        </form>
        <div className="cart_icon" onClick={() => navigate("/home/cart")}>
          <span className="material-symbols-outlined">shopping_cart</span>
          <p>{cartCount}</p>
        </div>
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
    background-color: var(--color-red);
    background-color: #000;
    width: 100%;
    height: 70px;
    line-height: 70px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 15px;
    text-align: center;
    position: relative;
    gap: 1vw;
    .logo {
      height: 100%;
      display: flex;
      align-items: center;
      margin-left: 40px;
      cursor: pointer;
    }
    .gnb {
      color: #fff;
      display: flex;
      z-index: 999;
      margin-left: auto;
      .gnb_item {
        width: 100%;
        font-size: 16px;
        padding-right: 30px;
        cursor: pointer;
        &:last-child {
          padding: 0;
        }
        &.active {
          color: var(--color-pink);
          & .lnb {
            display: flex;
            gap: 30px;
            animation-play-state: running;
            cursor: default;
          }
        }
        &.disabled {
          color: #fff;
          opacity: 0.4;
          cursor: default;
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
    .searchContainer {
      height: 100%;
      display: flex;
      align-items: center;
      color: #fff;
      position: relative;
      input {
        width: 10vw;
        border: none;
        border-bottom: 1px solid #fff;
        outline: none;
        border-radius: 20px;
        padding: 10px 10px;
        text-indent: 5px;
      }
      .searchIcon {
        position: absolute;
        right: 12px;
        color: var(--color-red);
      }
    }
    .cart_icon {
      color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.5vw;
      margin-right: 2vw;
      background-color: #222;
      border-radius: 10px;
      padding: 0 0.8vw;
      height: 50%;
      border: 1px solid #fff;
      cursor: pointer;
      &:hover {
        border: 1px solid var(--color-pink);
        color: var(--color-pink);
      }
    }
  }
`;

export default Navigation;
