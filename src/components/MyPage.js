import React, { useState } from "react";
import styled from "styled-components";
import authApi from "../assets/api/authApi";
import { useNavigate } from "react-router-dom";
import LoadingBox from "./LoadingBox";
import PUBLIC from "../assets/module/PUBLIC";

function MyPage({ userData }) {
  const navigate = useNavigate();
  const [inputPw, setInputPw] = useState("");
  const [tokenAuth, setTokenAuth] = useState(false);
  const [loading, setLoading] = useState(false);
  const [myData, setMyData] = useState(null);

  const checkUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    const user = { name: userData.name, password: inputPw };
    try {
      const response = await authApi.post("/user/auth", user, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setTokenAuth(true);
      setMyData(response.data.user);
    } catch (err) {
      const state = err.response.data.state;
      if (state === "expired") {
        alert("로그인 정보 만료");
        navigate("../login");
      } else if (state === "wrong") {
        alert("비밀번호가 틀렸습니다.");
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async () => {
    const confirm = window.confirm("정말 회원 정보를 삭제하시겠습니까?");
    try {
      if (confirm) {
        const user = prompt(`아이디 "${myData.name}"를 입력해주세요.`);
        if (user) {
          alert("탈퇴 처리되었습니다.");
          const response = await authApi.delete(`user/${myData._id}`);
          sessionStorage.setItem("loginState", JSON.stringify(false));
          navigate("/home");
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <MyPageStyle onSubmit={checkUser}>
      {loading && (
        <div className="loading_state">
          <LoadingBox />
        </div>
      )}
      {!tokenAuth ? (
        <fieldset className="check_user_box">
          <legend>비밀번호 확인</legend>
          <input
            type="password"
            name="user_pw"
            id="user_pw"
            placeholder="비밀번호"
            required
            value={inputPw}
            onChange={(e) => setInputPw(e.target.value)}
          />
          <button className="check_btn">확인</button>
        </fieldset>
      ) : (
        <div className="mypage_container">
          <div className="mypage_box">
            <img
              src={`${PUBLIC}/images/official/vans_logo_wht.svg`}
              alt="반스 로고"
            />
            <div className="mydata_box">
              <p>
                <em>아이디</em>
                {myData.name}
              </p>
              <p>
                <em>이메일</em>
                {myData.email}
              </p>
            </div>
            <div className="mydata_edit_box">
              <div className="btn" onClick={() => alert("준비중입니다.")}>
                정보 수정
              </div>
              <div className="btn" onClick={deleteUser}>
                회원 탈퇴
              </div>
            </div>
          </div>
        </div>
      )}
    </MyPageStyle>
  );
}

const MyPageStyle = styled.form`
  width: 100%;
  height: 100%;
  position: relative;
  .loading_state {
    width: 100%;
    height: 83%;
    position: absolute;
  }
  input {
    outline: none;
    padding: 0.5vw;
  }
  .check_user_box {
    position: absolute;
    top: 35%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 1px solid #000;
    padding: 1vw;
    display: flex;
    gap: 0.5vw;
    .check_btn {
      background-color: var(--color-red);
      color: #fff;
      cursor: pointer;
      border: none;
      padding: 0 1vw;
    }
  }
  .mypage_container {
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 5vw 0;
    .mypage_box {
      display: flex;
      flex-direction: column;
      align-items: center;
      background-color: var(--color-red);
      color: #fff;
      padding: 2vw;
      border-radius: 15px;
      .mydata_box {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 1vw;
        p {
          font-size: 0.9vw;
          display: flex;
          align-items: center;
          em {
            display: block;
            margin-right: 1vw;
            font-weight: 700;
            font-size: 0.7vw;
            width: 2vw;
          }
        }
      }
      .mydata_edit_box {
        display: flex;
        justify-content: space-between;
        gap: 1vw;
        margin-top: 2vw;
        .btn {
          padding: 0.5vw;
          cursor: pointer;
          border-radius: 10px;
          background-color: #fff;
          color: #000;
        }
      }
      img {
        align-self: center;
        margin-bottom: 2vw;
      }
    }
  }
`;

export default MyPage;
