import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import authApi from "../assets/api/authApi";
import LoadingBox from "./LoadingBox";
import CountDown from "./CountDown";
import CountDown2 from "./CountDown2";

function FindUserPw() {
  const navigate = useNavigate();
  const [inputMail, setInputMail] = useState("");
  const [inputId, setInputId] = useState("");
  const [authSend, setAuthSend] = useState(false);
  const [authNum, setAuthNum] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetTimer, setResetTimer] = useState(false);
  const [findResult, setFindResult] = useState(false);
  const [inputPw, setInputPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [pwConfirm, setPwConfirm] = useState(false);

  const sendEmail = async () => {
    if (!inputId) return alert("아이디를 입력해주세요.");
    if (!inputMail) return alert("이메일을 입력해주세요.");
    if (!inputMail.includes("@")) return alert("이메일 형식이 잘못되었습니다.");
    setLoading(true);
    const data = {
      name: inputId,
      email: inputMail,
    };
    try {
      await authApi.post("/user/findPw", data, {
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
      setFindResult(response.data.auth);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const changePw = async (e) => {
    e.preventDefault();
    if (!pwConfirm) return;
    setLoading(true);
    try {
      const data = {
        name: inputId,
        email: inputMail,
        pw: inputPw,
      };
      const response = await authApi.patch("/user/findPw/changePw", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      alert(response.data.message);
      if (response.data.isOk) navigate("../login");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!findResult) return;
    const pwOption = /^[a-zA-Z0-9!@#$%^&*()_+{}[\]:;<>,.?~\\/\\-]+$/;
    const pwRedTxt = document.querySelector(".pw_red_txt");
    if (pwOption.test(inputPw) && inputPw.length >= 8) {
      pwRedTxt.classList.add("submit");
    } else if (!pwOption.test(inputPw) && inputPw.length > 0) {
      alert(`${inputPw[inputPw.length - 1]}은 사용 불가합니다.`);
      setInputPw((prev) => prev.slice(0, prev.length - 1));
    } else {
      pwRedTxt.classList.remove("submit");
    }
    if (inputPw === confirmPw && inputPw && confirmPw) {
      setPwConfirm(true);
    } else {
      setPwConfirm(false);
    }
  }, [inputPw, confirmPw]);

  return (
    <FindUserPwStyle>
      {loading && (
        <div className="loading_box">
          <LoadingBox />
        </div>
      )}
      {!findResult ? (
        <div className="find_box">
          <input
            type="text"
            placeholder="아이디"
            value={inputId}
            onChange={(e) => setInputId(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") sendEmail();
            }}
            disabled={authSend}
          />
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
              인증
            </div>
          ) : (
            <div className="auth_btn btn done">완료</div>
          )}
          {authSend && (
            <div className="verify_box">
              <input
                type="text"
                placeholder="인증번호"
                value={authNum}
                onChange={(e) => setAuthNum(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") authEmail();
                }}
              />
              <div className="verify_btn btn" onClick={authEmail}>
                확인
              </div>
              <div className="timer_box">
                {resetTimer ? <CountDown /> : <CountDown2 />}
                <div className="resend_btn" onClick={sendEmail}>
                  인증번호 재발송
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <form className="find_result" onSubmit={changePw}>
          <legend>새 비밀번호로 변경</legend>
          <input
            type="password"
            placeholder="새 비밀번호"
            value={inputPw}
            minLength={8}
            maxLength={20}
            required
            onChange={(e) => setInputPw(e.target.value)}
          />
          <input
            type="password"
            placeholder="새 비밀번호 확인"
            value={confirmPw}
            minLength={8}
            maxLength={20}
            required
            onChange={(e) => setConfirmPw(e.target.value)}
          />
          <p className="red_txt pw_red_txt">
            영문 대소문자 / 숫자 / 특수문자 사용 가능, 8~20글자
          </p>
          {confirmPw.length > 0 &&
            (pwConfirm ? (
              <p className="red_txt submit">비밀번호가 일치합니다.</p>
            ) : (
              <p className="red_txt">비밀번호가 일치하지 않습니다.</p>
            ))}
          <button className={`change_pw_btn${pwConfirm ? " active" : ""}`}>
            비밀번호 변경
          </button>
        </form>
      )}
    </FindUserPwStyle>
  );
}

const FindUserPwStyle = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  font-size: 0.8vw;
  .loading_box {
    width: 100%;
    height: 83%;
    position: relative;
  }
  .find_box {
    background-color: #fff;
    border: 1px solid #000;
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.5vw;
    padding: 1vw;
    .input_box {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5vw;
    }
    .btn {
      padding: 0.5vw;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: var(--color-red);
      cursor: pointer;
      color: #fff;
      &.done {
        background-color: #aaa;
        cursor: default;
      }
    }
    .verify_box {
      .verify_btn {
        margin-top: 0.5vw;
      }
      .timer_box {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 0.5vw;
        .resend_btn {
          color: var(--color-red);
          cursor: pointer;
        }
      }
    }
    input {
      width: 12vw;
      height: 2vw;
      text-indent: 0.3vw;
      outline: none;
    }
    .btn_wrapper {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 1vw;
      .btn {
        padding: 0.5vw 1vw;
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
    padding: 2vw;
    gap: 0.5vw;
    input {
      text-indent: 0.5vw;
      height: 2vw;
      outline: none;
    }
    .red_txt {
      color: var(--color-red);
      font-size: 0.7vw;
      margin-left: 0.3vw;
      margin-top: 0.3vw;
      &.submit {
        color: green;
      }
    }
    .change_pw_btn {
      margin-top: 1vw;
      background-color: #aaa;
      color: #fff;
      padding: 0.7vw;
      border-radius: 7px;
      border: none;
      &.active {
        background-color: var(--color-red);
        cursor: pointer;
      }
    }
  }
`;

export default FindUserPw;
