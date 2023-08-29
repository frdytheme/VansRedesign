import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import authApi from "../../../assets/api/authApi";

function UserStatus({ userData }) {
  const [user, setUser] = useState({ name: userData.name });

  const userLogout = async () => {
    try {
      const response = await authApi.post("/user/logout");
      console.log(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      sessionStorage.setItem("loginState", false);
      window.location.reload();
    }
  };
  const tokenCheck = async () => {
    try {
      const response = await authApi.post("/user/auth", user, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response.data);
    } catch (err) {
      console.log(err.response.data);
    }
  };

  return (
    <UserStatusStyle>
      <div className="user_interface">
        <p className="user_name">{user.name}님</p>
        <ul className="user_menu">
          <li className="user_menu_li user_info_edit" onClick={tokenCheck}>
            <span className="material-symbols-outlined">person</span>
            회원 정보 수정
          </li>
          <li className="user_menu_li user_cart">
            <span className="material-symbols-outlined">shopping_bag</span>
            장바구니
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
  background-color: var(--color-red);
  overflow: hidden;
  display: grid;
  grid-auto-columns: 1fr;
  grid-template-rows: 8fr 2fr;
  color: #fff;

  .user_interface {
    .user_name {
      color: #fff;
      font-weight: 500;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .user_menu {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 1.5vw;
      .user_menu_li {
        display: flex;
        align-items: center;
        cursor: pointer;
        font-size: 0.8vw;
      }
    }
  }

  .logout_btn {
    background-color: #000;
    cursor: pointer;
    /* height: 50px; */
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
  }
`;

export default UserStatus;
