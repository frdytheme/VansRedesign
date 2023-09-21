import React from "react";
import styled from "styled-components";
import authApi from "../../../assets/api/authApi";
import PUBLIC from "../../../assets/module/PUBLIC";
import { useNavigate } from "react-router-dom";

function UserStatus({ userData }) {
  const navigate = useNavigate();
  const userLogout = async () => {
    try {
      await authApi.post("/user/logout");
    } catch (err) {
      console.error(err);
    } finally {
      sessionStorage.setItem("loginState", JSON.stringify(false));
      localStorage.setItem("userAutoLogin", JSON.stringify(false));
      sessionStorage.removeItem("CART");
      window.location.reload();
    }
  };

  return (
    <UserStatusStyle className="user_status">
      <div className="user_interface">
        <p className="user_name">
          <em>{userData.name}</em>
          <img
            src={`${PUBLIC}/images/official/vans_logo_wht.svg`}
            alt="반스 로고"
          />
        </p>
        <ul className="user_menu">
          <li
            className="user_menu_li user_info_edit"
            onClick={() => navigate("../mypage")}
          >
            <span className="material-symbols-outlined">person</span>
            마이페이지
          </li>
          <li className="user_menu_li order_list">
            <span className="material-symbols-outlined">list_alt</span>주문 내역
          </li>
        </ul>
      </div>
      <div className="logout_btn" onClick={userLogout}>
        로그아웃
        <span className="material-symbols-outlined">logout</span>
      </div>
    </UserStatusStyle>
  );
}

const UserStatusStyle = styled.div`
  background-image: linear-gradient(140deg, #ff6464, #db3056, #851d41, #141e46);
  overflow: hidden;
  color: #fff;
  display: grid;
  grid-template-columns: 8fr 2fr;
  .user_interface {
    display: flex;
    gap: 7px;
    flex-direction: column;
    justify-content: center;
    padding: 0 30px;
    .user_name {
      color: #fff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 7px;
      border-bottom: 1px solid #fff;
      gap: 0.7vw;
      em {
        cursor: pointer;
      }
      img {
        height: 20px;
      }
    }
    .user_menu {
      display: flex;
      gap: 0.7vw;
      align-self: flex-end;
      .user_menu_li {
        display: flex;
        align-items: center;
        cursor: pointer;
        font-size: 0.9vw;
        span {
          font-size: 1.3vw;
        }
        &.order_list {
          user-select: none;
          cursor: default;
          opacity: 0.5;
        }
      }
    }
  }
  .logout_btn {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    transition: 0.5s;
    font-size: 0.9vw;
    span {
      font-size: 1.3vw;
    }
    &:hover {
      color: var(--color-pink);
    }
  }
`;

export default UserStatus;
