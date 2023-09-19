import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import authApi from "../../../assets/api/authApi";
import PUBLIC from "../../../assets/module/PUBLIC";

function LoginGrid() {
  const navigate = useNavigate();
  const autoLogin = JSON.parse(localStorage.getItem("userAutoLogin"));
  const name = JSON.parse(localStorage.getItem("userId"));

  const autoLoginFunc = async () => {
    const user = {
      name: name,
    };
    try {
      const response = await authApi.post("/user/auth", user, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = response.data;
      if (data.state === "expired") {
        alert("로그인 정보가 만료되었습니다.");
        navigate("./login");
      }
      sessionStorage.setItem("loginState", JSON.stringify(true));
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogin = () => {
    if (autoLogin) {
      return autoLoginFunc();
    }
    navigate("./login");
  };

  return (
    <LoginGridStyle className="login_grid">
      <div className="user_box">
        <div className="login_btn" onClick={handleLogin}>
          <p>
            <img
              src={`${PUBLIC}/images/official/vans_logo_wht.svg`}
              alt="반스 로고"
            />
            로그인
          </p>
        </div>
        <p className="option_style join_box" onClick={() => navigate("./join")}>
          회원가입
        </p>
      </div>
    </LoginGridStyle>
  );
}

const LoginGridStyle = styled.div`
  color: #fff;
  overflow: hidden;
  /* font-size: 0.9vw; */
  .user_box {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    text-align: center;
  }
  .login_btn {
    background-color: var(--color-red);
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5vw;
    img {
      width: 5vw;
      margin-right: 0.2vw;
    }
  }
  .join_box {
    display: flex;
    cursor: pointer;
    justify-content: center;
    align-items: center;
    background-color: #000;
  }
`;

export default LoginGrid;
