import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import authApi from "../../../assets/api/authApi";

function UserStatus() {
  const [userName, setUserName] = useState("");

  const userLogout = () => {
    sessionStorage.setItem("loginState", false);
    window.location.reload();
  };

  const tokenCheck = async () => {
    try {
      const response = await authApi.get("/auth");
      setUserName(response.data.user.name);
    } catch (err) {
      console.log(err.response.data);
    }
  };

  useEffect(() => {
    tokenCheck();
  }, []);

  return (
    <UserStatusStyle>
      <div className="user_info">{userName}</div>
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
  .user_info {
    color: #fff;
    font-weight: 500;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .logout_btn {
    background-color: #000;
    color: #fff;
    cursor: pointer;
    /* height: 50px; */
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
  }
`;

export default UserStatus;
