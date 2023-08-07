import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import authApi from "../assets/api/authApi";

function LoginPage() {
  const [userData, setUserData] = useState({
    name: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleUserData = (e) => {
    const { name, value } = e.target;

    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const checkUserInfo = async (e) => {
    e.preventDefault();
    try {
      const response = await authApi.post("/login", userData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      // localStorage.setItem("accessToken", response.data.accessToken);
      // localStorage.setItem("refreshToken", response.data.refreshToken);
      // localStorage.setItem("isLoggedIn", true);
      alert(`환영합니다 ${userData.name}님!`);
      // navigate("/home");
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <LoginPageStyle onSubmit={(e) => checkUserInfo(e)}>
      <div className="login_box">
        <div className="logo_box">
          <img
            src={`${process.env.PUBLIC_URL}/images/official/vans_logo.svg`}
            alt="반스 로고"
          />
        </div>
        <div className="input_box">
          <input
            type="text"
            name="name"
            id="user_id"
            placeholder="아이디"
            value={userData.name}
            onChange={handleUserData}
          />
          <input
            type="password"
            name="password"
            id="user_pw"
            placeholder="비밀번호"
            value={userData.password}
            onChange={handleUserData}
          />
        </div>
        <button type="submit" className="login_btn">
          로그인
        </button>
        <div className="find_box">
          <p className="find_id">아이디 찾기</p>
          <p className="find_pw">비밀번호 찾기</p>
          <p className="join_user">회원가입</p>
        </div>
      </div>
    </LoginPageStyle>
  );
}

const LoginPageStyle = styled.form`
  width: 100%;
  height: 100%;
  position: relative;
  .login_box {
    width: 300px;
    height: 50%;
    position: absolute;
    top: 15%;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 15px;
    padding: 2vw;
    .logo_box {
      text-align: center;
      margin-bottom: 2vw;
    }
    .input_box {
      width: 100%;
      input {
        width: 100%;
        box-sizing: border-box;
        height: 45px;
        text-indent: 10px;
        outline: none;
        margin-bottom: 1vw;
        border: 1px solid #999;
        border-radius: 8px;
      }
    }
    .login_btn {
      background-color: var(--color-red);
      color: #fff;
      width: 100%;
      height: 50px;
      border: none;
      cursor: pointer;
    }
    .find_box {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 2vw;
      margin-top: 2vw;
      font-size: 0.7vw;
      color: #888;
      .find_id,
      .find_pw,
      .join_user {
        cursor: pointer;
      }
      .join_user {
        color: var(--color-red);
        font-weight: bold;
      }
    }
  }
`;

export default LoginPage;
