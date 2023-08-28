import React, { useEffect, useState } from "react";
import styled from "styled-components";
import authApi from "../assets/api/authApi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Countdown from "react-countdown";
import CountDown from "./CountDown";

function JoinPage() {
  const navigate = useNavigate();
  const [joinUser, setJoinUser] = useState({
    name: "",
    pw: "",
    pwCheck: "",
    email: "",
  });
  const [emailAuthNum, setEmailAuthNum] = useState("");
  const [authBoxShow, setAuthBoxShow] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [emailChange, setEmailChange] = useState(false);

  const [userOnly, setUserOnly] = useState(false);
  const [pwConfirm, setPwConfirm] = useState(false);

  const checkIsOnly = async () => {
    if (joinUser.name.length <= 4) return;
    try {
      const response = await authApi.post("/register/idCheck", joinUser, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const isOnly = response.data.isOnly;
      if (isOnly) {
        const res = window.confirm(
          `사용 가능한 아이디입니다. \n "${joinUser.name}"로 사용하시겠습니까?`
        );
        if (res) {
          setUserOnly(isOnly);
        }
      } else {
        alert("이미 존재하는 아이디입니다.");
        setUserOnly(isOnly);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const { name } = joinUser;
    const idCheck = /^[a-zA-Z0-9]+$/;
    const idRedTxt = document.querySelector(".id_red_txt");
    const idCheckBtn = document.querySelector(".id_check");
    if (idCheck.test(name) && name.length >= 4 && name.length <= 16) {
      idRedTxt.classList.add("submit");
      idCheckBtn.classList.add("active");
    } else if (!idCheck.test(name) && name.length > 0) {
      alert("영문 혹은 숫자만 입력 가능합니다.");
      setJoinUser((prev) => ({
        ...prev,
        name: name.slice(0, name.length - 1),
      }));
    } else {
      idRedTxt.classList.remove("submit");
      idCheckBtn.classList.remove("active");
    }
  }, [joinUser.name]);

  useEffect(() => {
    const { pw, pwCheck } = joinUser;
    const pwOption = /^[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]+$/;
    const pwRedTxt = document.querySelector(".pw_red_txt");
    if (pwOption.test(pw) && pw.length >= 8) {
      pwRedTxt.classList.add("submit");
    } else if (!pwOption.test(pw) && pw.length > 0) {
      alert(`${pw[pw.length - 1]}은 사용 불가합니다.`);
      setJoinUser((prev) => ({ ...prev, pw: pw.slice(0, pw.length - 1) }));
    } else {
      pwRedTxt.classList.remove("submit");
    }
    if (pw === pwCheck) {
      setPwConfirm(true);
    } else {
      setPwConfirm(false);
    }
  }, [joinUser.pw, joinUser.pwCheck]);

  const submitJoin = async (e) => {
    e.preventDefault();
    if (!userOnly) return alert("아이디 중복확인을 해주세요.");
    if (!pwConfirm) return alert("비밀번호가 일치하지 않습니다.");
    if (!isAuth) return alert("이메일 인증을 해주세요.");

    const { name, email, pw } = joinUser;
    const user = { name, email, password: pw };
    try {
      await authApi.post("/register", user, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      alert("회원가입이 완료되었습니다.");
      navigate("/home/login");
    } catch (err) {
      console.error(err);
    }
  };

  const changeEmail = () => {
    setJoinUser((prev) => ({ ...prev, email: "" }));
    setAuthBoxShow(false);
    setEmailChange(false);
  };

  const emailAuth = async () => {
    if (authBoxShow) return;
    if (!joinUser.email) return alert("이메일을 입력해주세요.");
    if (!joinUser.email.includes("@"))
      return alert("이메일 형식이 잘못되었습니다.");
    const emailObj = {
      email: joinUser.email,
    };
    setAuthBoxShow(true);
    setEmailChange(true);
    try {
      await axios.post("http://localhost:5000/api/emailAuth", emailObj, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setTimeout(() => {
        setEmailChange(false);
        setAuthBoxShow(false);
        setEmailAuthNum("");
      }, 120000);
    } catch (err) {
      console.error(err);
    }
  };

  const authEmailNum = async () => {
    const auth = {
      authNum: Number(emailAuthNum),
    };
    try {
      const response = await axios.post(
        "http://localhost:5000/api/emailAuth/check",
        auth,

        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.auth) {
        alert("인증되었습니다.");
        setIsAuth(true);
        setAuthBoxShow(false);
      } else {
        alert("인증번호가 틀렸습니다.");
        setIsAuth(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const { email } = joinUser;
    const btn = document.getElementById("join_btn");
    if (userOnly && pwConfirm && email) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  }, [joinUser, userOnly, pwConfirm]);

  return (
    <JoinPageStyle onSubmit={submitJoin}>
      <fieldset className="input_field id_field">
        <legend>아이디</legend>
        <input
          type="text"
          id="new_id"
          name="new_id"
          placeholder="아이디"
          value={joinUser.name}
          minLength={4}
          maxLength={16}
          disabled={userOnly}
          required
          onChange={(e) => {
            setJoinUser((prev) => ({ ...prev, name: e.target.value }));
            setUserOnly(false);
          }}
        />
        {userOnly ? (
          <div className="id_check user_only">사용가능</div>
        ) : (
          <div className="id_check" onClick={checkIsOnly}>
            중복확인
          </div>
        )}
        {userOnly ? (
          <p className="red_txt id_red_txt">사용 가능한 아이디입니다.</p>
        ) : (
          <p className="red_txt id_red_txt">
            4자~16자의 영문 / 영문 + 숫자를 입력해주세요.
          </p>
        )}
      </fieldset>
      <fieldset className="input_field pw_field">
        <legend>비밀번호</legend>
        <input
          type="password"
          id="new_pw"
          name="new_pw"
          placeholder="비밀번호"
          value={joinUser.pw}
          minLength={8}
          maxLength={20}
          required
          onChange={(e) =>
            setJoinUser((prev) => ({ ...prev, pw: e.target.value }))
          }
        />
        <input
          type="password"
          id="new_pw_check"
          name="new_pw_check"
          placeholder="비밀번호 확인"
          value={joinUser.pwCheck}
          minLength={8}
          maxLength={20}
          required
          onChange={(e) =>
            setJoinUser((prev) => ({ ...prev, pwCheck: e.target.value }))
          }
        />
        <p className="red_txt pw_red_txt">
          영문 대소문자 / 숫자 / 특수문자 사용 가능, 8~20글자
        </p>
        {joinUser.pwCheck.length > 0 &&
          (pwConfirm ? (
            <p className="red_txt submit">비밀번호가 일치합니다.</p>
          ) : (
            <p className="red_txt">비밀번호가 일치하지 않습니다.</p>
          ))}
      </fieldset>
      <fieldset className="input_field email_field">
        <legend>이메일</legend>
        <input
          type="email"
          id="new_email"
          name="new_email"
          placeholder="이메일"
          value={joinUser.email}
          disabled={isAuth}
          required
          onChange={(e) =>
            setJoinUser((prev) => ({ ...prev, email: e.target.value }))
          }
        />
        {isAuth ? (
          <div className="email_auth_btn success">인증 완료</div>
        ) : emailChange ? (
          <div className="email_auth_btn pending" onClick={changeEmail}>
            이메일 변경
          </div>
        ) : (
          <div className="email_auth_btn" onClick={emailAuth}>
            이메일 인증
          </div>
        )}
        {authBoxShow && (
          <div className="email_auth_box">
            <div className="auth_input_box">
              <input
                type="text"
                placeholder="인증번호"
                className="auth_input"
                value={emailAuthNum}
                onChange={(e) => setEmailAuthNum(e.target.value)}
              />
              <div className="auth_num_btn" onClick={authEmailNum}>
                인증
              </div>
            </div>
            <CountDown />
          </div>
        )}
      </fieldset>
      <button type="submit" id="join_btn">
        가입하기
      </button>
    </JoinPageStyle>
  );
}

const JoinPageStyle = styled.form`
  width: 100%;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  text-align: left;
  padding-top: 100px;
  .input_field {
    width: 18%;
    margin: 0.5vw 0;
    legend {
      margin: 0.5vw 0;
    }
  }
  .id_field {
    position: relative;
  }
  .pw_field {
    display: flex;
    flex-direction: column;
    gap: 0.5vw;
  }
  .id_check {
    width: 80px;
    height: 42px;
    line-height: 40px;
    text-align: center;
    background-color: #999;
    border-radius: 0 10px 10px 0;
    color: #fff;
    position: absolute;
    top: 0;
    right: -4px;
    user-select: none;
    &.active {
      background-color: var(--color-red);
      cursor: pointer;
    }
    &.user_only {
      background-color: #96c291;
    }
  }
  input {
    width: 100%;
    height: 40px;
    text-indent: 15px;
    border: none;
    background-color: #f4f4f4;
    border-radius: 10px;
    outline: none;
  }
  #join_btn {
    border: none;
    width: 18%;
    height: 50px;
    border-radius: 10px;
    margin-top: 1vw;
    &.active {
      background-color: var(--color-red);
      color: #fff;
      font-weight: 700;
      cursor: pointer;
    }
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
  .email_auth_btn {
    border: 1px solid #000;
    cursor: pointer;
    padding: 1vw;
    text-align: center;
    border-radius: 10px;
    margin: 0.5vw 0;
    &.pending {
      background-color: #f9f9f9;
      color: var(--color-red);
      border: 1px solid var(--color-red);
    }
    &.success {
      cursor: default;
      border: 1px solid green;
      color: green;
    }
  }
  .email_auth_box {
    .auth_input_box {
      position: relative;
      .auth_input {
        margin-bottom: 0.3vw;
      }
      .auth_num_btn {
        position: absolute;
        top: 0;
        right: -4px;
        background-color: var(--color-red);
        color: #fff;
        width: 5vw;
        height: 42px;
        line-height: 42px;
        text-align: center;
        border-radius: 0 10px 10px 0;
        cursor: pointer;
      }
    }

    .auth_timer {
      margin-left: 0.2vw;
      color: #777;
      font-size: 0.8vw;
    }
  }
`;

export default JoinPage;
