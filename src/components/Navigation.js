import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import NavBanner from "./pages/NavBanner";
import PUBLIC from "../assets/module/PUBLIC";
import { useMediaQuery } from "react-responsive";

function Navigation({ setListName, setSearchName, setSubmitBtn, cartCount }) {
  const [searchNow, setSearchNow] = useState("");
  const [showMenu, setShowMenu] = useState(false);
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
      lnb: [],
    },
  ];
  const navigate = useNavigate();
  const menu = document.querySelectorAll(".gnb_item");
  const isTablet = useMediaQuery({ maxWidth: 1200 });

  const activeGnb = (e) => {
    e.currentTarget.classList.add("active");
  };
  const disableGnb = (e) => {
    e.currentTarget.classList.remove("active");
  };

  const selectMenu = (e, li, lnb, item) => {
    const clickMenu = () => {
      navigate("./product");
      menu.forEach((gnb) => gnb.classList.remove("active"));
    };
    const mainCategory = li.name;
    const translateName = () => {
      e.stopPropagation();

      let category = item || "ALL";

      if (category === "전체보기") category = lnb.title;
      if (category.includes("의류")) category = "CLOTHES";
      if (category.includes("신발")) category = "SHOES";
      if (category.includes("악세서리")) category = "ACCESSORY";
      if (category.includes("키즈")) category = "KIDS";

      setListName([mainCategory, category]);
    };

    translateName(e);
    clickMenu();
    setSearchName("");
    setShowMenu(false);
  };

  const submitSearch = (e) => {
    e.preventDefault();
    setSearchName(searchNow);
    setSubmitBtn((prev) => !prev);
    navigate("./product");
  };

  const openGnb = (e) => {
    e.stopPropagation();
    const name = e.target.dataset.name;
    if (!name) return;
    let menu;
    if (name === "gnb") {
      menu = document.querySelectorAll(".menu_item");
    }

    if (name === "lnb") {
      menu = document.querySelectorAll(".lnb_li");
    }
    if (e.target.classList.contains("opened")) {
      return e.target.classList.remove("opened");
    }
    menu.forEach((gnb) => gnb.classList.remove("opened"));
    e.target.classList.add("opened");
  };

  return (
    <Nav>
      <div className="nav_box">
        <div className="logo" onClick={() => navigate("/home")}>
          <img
            src={`${PUBLIC}/images/official/vans_logo_wht.svg`}
            alt="반스 로고"
          />
        </div>
        {isTablet ? (
          <ul className="tablet_menu">
            <li className="tablet_li menu" onClick={() => setShowMenu(true)}>
              <span className="material-symbols-outlined">menu</span>
            </li>
            <li className="tablet_li cart" onClick={() => navigate("./cart")}>
              <span className="material-symbols-outlined">shopping_cart</span>
            </li>
            <li
              className="tablet_li person"
              onClick={() => {
                const loggedIn = JSON.parse(
                  sessionStorage.getItem("loginState")
                );
                if (loggedIn) return navigate("./mypage");
                navigate("./login");
              }}
            >
              <span className="material-symbols-outlined">person</span>
            </li>
            <li className="tablet_li search">
              <span className="material-symbols-outlined">search</span>
            </li>
          </ul>
        ) : (
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
                  selectMenu(e, li);
                }}
              >
                {li.name}
                {li.lnb && (
                  <div className="lnb" onClick={(e) => e.stopPropagation()}>
                    {li.name === "NEW" && (
                      <NavBanner setListName={setListName} menu={menu} />
                    )}
                    {li.lnb.map((lnb, idx) => {
                      return (
                        <ul key={`desktop_lnb${idx}`} className="lnb_group">
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
                                  key={`desktop_lnb_item${idx}`}
                                  className="lnb_item"
                                  gnb-name={
                                    menu === "전체보기" ? lnb.title : menu
                                  }
                                  onClick={(e) => selectMenu(e, li, lnb, menu)}
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
        )}
        {isTablet || (
          <form onSubmit={submitSearch}>
            <label className="searchContainer">
              <input
                type="text"
                className="searchBox"
                placeholder="Search"
                value={searchNow}
                onChange={(e) => setSearchNow(e.target.value)}
              />
              <span className="material-symbols-outlined searchIcon">
                search
              </span>
            </label>
          </form>
        )}
        {isTablet || (
          <div className="cart_icon" onClick={() => navigate("/home/cart")}>
            <span className="material-symbols-outlined">shopping_cart</span>
            <p>{cartCount}</p>
          </div>
        )}
        {showMenu && (
          <div
            className="dropdown_bg"
            onClick={(e) => {
              if (e.currentTarget === e.target) setShowMenu(false);
            }}
          >
            <ul className="dropdown_menu">
              <li className="dropdown_li">
                <img
                  src={`${PUBLIC}/images/official/vans_logo.svg`}
                  alt="반스로고레드"
                />
              </li>
              {gnbList.map((gnb, idx) => (
                <li
                  className="dropdown_li menu_item"
                  onClick={openGnb}
                  data-name="gnb"
                  key={`mobile_gnb${idx}`}
                >
                  {gnb.name}
                  <ul className="lnb">
                    {gnb.lnb.map((lnb, idx) => (
                      <li
                        className="lnb_li menu_item"
                        onClick={openGnb}
                        data-name="lnb"
                        key={`mobile_lnb${idx}`}
                      >
                        {lnb.title}
                        <ul className="category">
                          {lnb.menu.map((category, idx) => (
                            <li
                              className="category_li"
                              key={`mobile_category${idx}`}
                              onClick={(e) => selectMenu(e, gnb, lnb, category)}
                            >
                              {category}
                            </li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        )}
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
  color: #fff;
  .nav_box {
    background-color: var(--color-red);
    background-color: #000;
    width: 100%;
    height: 70px;
    line-height: 70px;
    display: flex;
    justify-content: space-around;
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
      min-width: 20%;
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
          opacity: 0.4;
          cursor: default;
        }
        .lnb {
          width: 100%;
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
              color: #fff;
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
      position: relative;
      input {
        width: 7vw;
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
        font-weight: bold;
      }
    }
    .cart_icon {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.5vw;
      background-color: #222;
      border-radius: 10px;
      padding: 0 0.8vw;
      height: 50%;
      border: 1px solid transparent;
      cursor: pointer;
      margin-right: 2vw;
      &:hover {
        border: 1px solid var(--color-pink);
        color: var(--color-pink);
      }
    }
  }
  @media (max-width: 1200px) {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
    padding: 0;
    .nav_box {
      justify-content: space-between;
      border-radius: 0;
      .tablet_menu {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
        margin-right: 1vw;
        .tablet_li {
          width: 6vw;
          min-width: 40px;
          max-width: 50px;
          height: 6vw;
          min-height: 40px;
          max-height: 50px;
          background-color: var(--color-red);
          border-radius: 10px;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          span {
            font-size: clamp(20px, 3vw, 34px);
            font-weight: bold;
          }
        }
      }
    }
  }
  .dropdown_bg {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9998;
    animation: smoothBg 0.5s ease-in-out forwards;
    @keyframes smoothBg {
      100% {
        background-color: rgba(0, 0, 0, 0.5);
      }
    }
    .dropdown_menu {
      position: fixed;
      color: #000;
      background-color: #fff;
      width: 350px;
      height: 100%;
      overflow: auto;
      left: -100%;
      top: 0;
      z-index: 9999;
      animation: slideRight 0.5s ease-in-out forwards;
      @keyframes slideRight {
        100% {
          left: 0;
        }
      }
      .dropdown_li {
        width: 100%;
        border-bottom: 1px solid #d1d1d1;
        font-weight: bold;
        overflow: hidden;
        cursor: pointer;
        user-select: none;
        &:first-child {
          background-color: #f1f1f1;
          height: auto;
        }
        img {
          margin-top: 30px;
        }
        .lnb {
          font-weight: 400;
          font-size: 14px;
          .lnb_li {
            background-color: #666;
            color: #fff;
            border-bottom: 1px solid #fff;
            max-height: 0;
            line-height: 40px;
            transition: 0.5s cubic-bezier(0.61, 0, 0.08, 1);
            overflow: hidden;
            .category {
              .category_li {
                background-color: #222;
                font-size: 12px;
                border-bottom: 1px solid #777;
                height: 0;
                line-height: 30px;
                overflow: hidden;
                transition: 0.5s cubic-bezier(0.61, 0, 0.08, 1);
              }
            }
          }
        }
        &.opened {
          border: none;
          .lnb {
            .lnb_li {
              max-height: 40px;
              &.opened {
                border: none;
                max-height: 500px;
                .category {
                  .category_li {
                    height: 30px;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  @media (max-width: 768px) {
    .nav_box .logo {
      margin-left: 20px;
    }
    .dropdown_bg {
      .dropdown_menu {
        width: 270px;
      }
    }
  }
`;

export default Navigation;
