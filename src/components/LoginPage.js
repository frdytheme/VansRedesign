import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import authApi from "../assets/api/authApi";
import PUBLIC from "../assets/module/PUBLIC";
import LoadingBox from "./LoadingBox";

function LoginPage({ userData, setUserData }) {
  const userSaveState = JSON.parse(localStorage.getItem("userSaveState"));
  const userAutoLogin = JSON.parse(localStorage.getItem("userAutoLogin"));
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleUserData = (e) => {
    const { name, value } = e.target;

    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const checkUserInfo = async (e) => {
    e.preventDefault();
    setLoading(true);
    const cart = JSON.parse(sessionStorage.getItem("CART")) || {
      data: {},
      total: 0,
    };
    const data = { ...userData, cart };
    try {
      const response = await authApi.post("user/login", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (userSaveState || userAutoLogin) {
        localStorage.setItem("userId", JSON.stringify(userData.name));
      }
      const userCart = response.data.cart;
      sessionStorage.setItem("CART", JSON.stringify(userCart));
      sessionStorage.setItem("loginState", JSON.stringify(true));
      navigate("/home");
    } catch (err) {
      alert(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUserSave = (e) => {
    const checked = e.target.checked;
    localStorage.setItem("userSaveState", JSON.stringify(checked));
    if (!checked) {
      localStorage.removeItem("userId");
    }
  };

  const handleAutoLogin = (e) => {
    const checked = e.target.checked;
    localStorage.setItem("userAutoLogin", JSON.stringify(checked));
  };

  useEffect(() => {
    const userSaveCheck = document.getElementById("user_id_save");
    const userAutoLoginCheck = document.getElementById("user_auto_login");
    if (userSaveState) {
      userSaveCheck.checked = userSaveState;
    }
    if (userAutoLogin) {
      userAutoLoginCheck.checked = userAutoLogin;
    }
    return () => {
      if (JSON.parse(sessionStorage.getItem("loginState"))) return;
      if (userSaveState) {
        setUserData((prev) => ({ ...prev, password: "" }));
      } else {
        setUserData({ name: "", password: "" });
      }
    };
    // eslint-disable-next-line
  }, []);

  return (
    <LoginPageStyle onSubmit={(e) => checkUserInfo(e)}>
      {loading && (
        <div className="loding_state">
          <LoadingBox />
        </div>
      )}
      <div className="login_box">
        <div className="logo_box">
          <img
            src={`${PUBLIC}/images/official/vans_logo.svg`}
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
        <div className="user_options">
          <label>
            <input
              type="checkbox"
              name="user_id_save"
              id="user_id_save"
              onChange={handleUserSave}
            />
            아이디 저장
          </label>
          <label>
            <input
              type="checkbox"
              name="user_auto_login"
              id="user_auto_login"
              onChange={handleAutoLogin}
            />
            자동 로그인
          </label>
        </div>
        <button type="submit" className="login_btn">
          로그인
        </button>
        <div className="find_box">
          <p className="find_id" onClick={() => navigate("../findId")}>
            아이디 찾기
          </p>
          <p className="find_pw" onClick={() => navigate("../findPw")}>
            비밀번호 찾기
          </p>

          <p className="join_user" onClick={() => navigate("/home/join")}>
            회원가입
          </p>
        </div>
      </div>
    </LoginPageStyle>
  );
}

const LoginPageStyle = styled.form`
  width: 100%;
  height: 100%;
  position: relative;
  .loding_state {
    position: absolute;
    top: -80px;
    left: 0;
    z-index: 999;
    width: 100%;
    height: 100%;
  }
  .login_box {
    width: 300px;
    height: 50%;
    position: absolute;
    top: 15%;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 15px;
    padding: 20px;
    .logo_box {
      text-align: center;
      margin-bottom: 20px;
    }
    .input_box {
      width: 100%;
      input {
        width: 100%;
        box-sizing: border-box;
        height: 45px;
        text-indent: 10px;
        outline: none;
        border: 1px solid #999;
        border-radius: 8px;
        &:first-child {
          margin-bottom: 10px;
        }
      }
    }
    .user_options {
      margin: 15px 0;
      font-size: 15px;
      display: flex;
      label {
        margin-right: 10px;
        display: flex;
        align-items: center;
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
      gap: 15px;
      margin-top: 25px;
      font-size: 15px;
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
  @media (max-width: 768px) {
    height: calc(100vh - 70px);
    height: 100vh;
    .login_box {
      width: 80%;
      max-width: 500px;
      .input_box {
        input {
          height: 50px;
          font-size: 16px;
        }
      }
    }
  }
`;

export default LoginPage;
