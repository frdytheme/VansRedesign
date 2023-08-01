import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function LoginGrid() {
  const navigate = useNavigate();

  return (
    <LoginGridStyle>
      <div className="user_box login_btn" onClick={() => navigate("./login")}>
        <img src={`${process.env.PUBLIC_URL}/images/official/vans_logo_wht.svg`} alt="반스 로고" />
        <p>로그인</p>
      </div>
      <div className="user_box option_box">
        <p className="option_style visitor_box">비회원 로그인</p>
        <p className="option_style join_box">회원가입</p>
      </div>
    </LoginGridStyle>
  );
}

const LoginGridStyle = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 6fr 4fr;
  .user_box {
    margin: 0.2vw 0;
    width: 100%;
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    &:hover {
      cursor: pointer;
    }
  }
  .login_btn {
    background-color: var(--color-red);
    gap: 0.5vw;
    img {
      width: 4vw;
    }
  }
  .option_box {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-auto-rows: 1fr;
    .option_style {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .visitor_box {
      background-color: #999;
      border-radius: 15px 0 0 15px;
    }
    .join_box {
      background-color: #000;
      border-radius: 0 15px 15px 0;
    }
  }
`;

export default LoginGrid;
