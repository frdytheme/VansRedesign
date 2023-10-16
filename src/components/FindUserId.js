import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import authApi from "../assets/api/authApi";
import LoadingBox from "./LoadingBox";
import CountDown from "./CountDown";
import CountDown2 from "./CountDown2";

function FindUserId() {
  const navigate = useNavigate();
  const [inputMail, setInputMail] = useState("");
  const [authSend, setAuthSend] = useState(false);
  const [authNum, setAuthNum] = useState("");
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resetTimer, setResetTimer] = useState(false);
  const [findResult, setFindResult] = useState(false);
  const [isUser, setIsUser] = useState("");

  const sendEmail = async () => {
    if (!inputMail) return alert("이메일을 입력해주세요.");
    if (!inputMail.includes("@")) return alert("이메일 형식이 잘못되었습니다.");
    setLoading(true);
    const data = {
      email: inputMail,
    };
    try {
      await authApi.post("/user/findId", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (authSend) setResetTimer((prev) => !prev);
      setAuthSend(true);
    } catch (err) {
      console.error(err);
      alert(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const authEmail = async () => {
    setLoading(true);
    const data = {
      authNum,
    };
    try {
      const response = await authApi.post("/user/emailAuth/check", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      alert(response.data.message);
      setIsAuth(response.data.auth);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const findUser = async () => {
    if (!isAuth) return;
    setLoading(true);
    const data = {
      email: inputMail,
    };
    try {
      const response = await authApi.post("/user/findId/confirm", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setFindResult(true);
      setIsUser(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FindUserIdStyle>
      {loading && (
        <div className="loading_box">
          <LoadingBox />
        </div>
      )}
      {!findResult ? (
        <div className="find_box">
          <div className="auth_box input_box">
            <input
              type="text"
              placeholder="이메일"
              value={inputMail}
              onChange={(e) => setInputMail(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") sendEmail();
              }}
              disabled={authSend}
            />
            {!authSend ? (
              <div className="auth_btn btn" onClick={sendEmail}>
                확인
              </div>
            ) : (
              <div className="verify_btn btn done">확인</div>
            )}
          </div>
          {authSend && (
            <div className="verify_box">
              <div className="input_box">
                <input
                  type="text"
                  placeholder="인증번호"
                  value={authNum}
                  onChange={(e) => setAuthNum(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") authEmail();
                  }}
                  disabled={isAuth}
                />
                {!isAuth ? (
                  <div className="verify_btn btn" onClick={authEmail}>
                    확인
                  </div>
                ) : (
                  <div className="verify_btn btn done">완료</div>
                )}
              </div>
              {!isAuth && (
                <div className="timer_box">
                  {resetTimer ? <CountDown /> : <CountDown2 />}
                  <div className="resend_btn" onClick={sendEmail}>
                    인증번호 재발송
                  </div>
                </div>
              )}
            </div>
          )}
          <div className="btn_wrapper">
            <div
              className={`btn submit${!isAuth && " disabled"}`}
              onClick={findUser}
            >
              찾기
            </div>
            <div className="btn cancle" onClick={() => navigate("../login")}>
              뒤로
            </div>
          </div>
        </div>
      ) : (
        <div className="find_result">
          <p>아이디는 "{isUser}"입니다.</p>
          <div className="nav_login" onClick={() => navigate("../login")}>
            로그인 하러 가기
          </div>
        </div>
      )}
    </FindUserIdStyle>
  );
}

const FindUserIdStyle = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  .loading_box {
    width: 100%;
    height: 83%;
    position: relative;
  }
  .find_box {
    width: 80%;
    max-width: 300px;
    background-color: #fff;
    border: 1px solid #000;
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 15px;
    padding: 15px;
    .input_box {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      .btn {
        background-color: var(--color-red);
        cursor: pointer;
        color: #fff;
        padding: 10px 15px;
        border-radius: 7px;
        &.done {
          background-color: #aaa;
          cursor: default;
        }
      }
    }
    .verify_box {
      width:100%;
      .timer_box {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 15px;
        .resend_btn {
          color: var(--color-red);
          cursor: pointer;
        }
      }
    }
    input {
      width: 74%;
      height: 30px;
      text-indent: 0.3vw;
      outline: none;
    }
    .btn_wrapper {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 15px;
      .btn {
        padding: 10px 15px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: var(--color-red);
        color: #fff;
        cursor: pointer;
        &.disabled {
          background-color: #aaa;
          cursor: default;
        }
      }
    }
  }
  .find_result {
    border: 1px solid #000;
    position: absolute;
    top: 35%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1vw;
    gap: 1.5vw;
    p {
      font-size: 1vw;
    }
    .nav_login {
      background-color: var(--color-red);
      color: #fff;
      padding: 0.7vw;
      cursor: pointer;
      border-radius: 7px;
    }
  }
`;

export default FindUserId;
