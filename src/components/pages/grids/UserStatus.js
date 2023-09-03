import React from "react";
import styled from "styled-components";
import authApi from "../../../assets/api/authApi";

function UserStatus({ userData }) {
  const userLogout = async () => {
    try {
      const response = await authApi.post("/user/logout");
      console.log(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      sessionStorage.setItem("loginState", JSON.stringify(false));
      localStorage.setItem("userAutoLogin", JSON.stringify(false));
      window.location.reload();
    }
  };
  const tokenCheck = async () => {
    const user = { name: userData.name };
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
        <p className="user_name">
          <em>{userData.name}</em>
          <img
            src={`${process.env.PUBLIC_URL}/images/official/vans_logo_wht.svg`}
            alt="반스 로고"
          />
        </p>
        <ul className="user_menu">
          <li className="user_menu_li user_info_edit" onClick={tokenCheck}>
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
        font-size: 15px;
        &:hover {
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
    &:hover {
      color: var(--color-pink);
    }
  }
`;

export default UserStatus;
