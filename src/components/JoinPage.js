import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import authApi from "../assets/api/authApi";
import { useNavigate } from "react-router-dom";
import CountDown from "./CountDown";
import CountDown2 from "./CountDown2";
import LoadingBox from "./LoadingBox";

function JoinPage() {
  const navigate = useNavigate();
  const [joinUser, setJoinUser] = useState({
    name: "",
    email: "",
  });

  const [inputPw, setInputPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [pwConfirm, setPwConfirm] = useState(false);
  const [idActive, setIdActive] = useState(false);
  const [emailAuthNum, setEmailAuthNum] = useState("");
  const [authBoxShow, setAuthBoxShow] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [emailChange, setEmailChange] = useState(false);
  const [userOnly, setUserOnly] = useState(false);
  const [resetTimer, setResetTimer] = useState(false);
  const [loading, setLoading] = useState(false);

  const idCheck = useMemo(() => {
    return /^[a-zA-Z0-9]+$/;
  }, []);

  const handleIdInput = (e) => {
    const { name } = joinUser;

    setJoinUser((prev) => ({ ...prev, name: e.target.value }));

    if (!idCheck.test(name) && name.length > 0) {
      alert("영문 혹은 숫자만 입력 가능합니다.");
      setJoinUser((prev) => ({
        ...prev,
        name: name.slice(0, name.length - 1),
      }));
    }

    setUserOnly(false);
  };

  useEffect(() => {
    const { name } = joinUser;
    const idRedTxt = document.querySelector(".id_red_txt");

    if (idCheck.test(name) && name.length >= 4 && name.length <= 16) {
      idRedTxt.classList.add("submit");
      setIdActive(true);
    } else {
      idRedTxt.classList.remove("submit");
      setIdActive(false);
    }
  }, [joinUser, idCheck]);

  const handlePwInput = (e) => {
    setInputPw(e.target.value);
  };

  const handlePwCheckInput = (e) => {
    setConfirmPw(e.target.value);
  };

  const checkIsOnly = async () => {
    if (!idActive) return;
    setLoading(true);
    if (joinUser.name.length <= 4) return;
    try {
      const response = await authApi.post("/user/idCheck", joinUser, {
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
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

  const submitJoin = async (e) => {
    e.preventDefault();
    if (!userOnly) return alert("아이디 중복확인을 해주세요.");
    if (!pwConfirm) return alert("비밀번호가 일치하지 않습니다.");
    if (!isAuth) return alert("이메일 인증을 해주세요.");

    const { name, email } = joinUser;
    const user = { name, email, password: inputPw };
    try {
      await authApi.post("/user/join", user, {
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
    setEmailAuthNum("");
    setAuthBoxShow(false);
    setEmailChange(false);
  };

  const emailAuth = async () => {
    if (authBoxShow) setResetTimer((prev) => !prev);
    if (!joinUser.email) return alert("이메일을 입력해주세요.");
    if (!joinUser.email.includes("@"))
      return alert("이메일 형식이 잘못되었습니다.");
    setLoading(true);
    try {
      const emailObj = {
        email: joinUser.email,
      };
      await authApi.post("/user/emailAuth", emailObj, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setLoading(false);
      setAuthBoxShow(true);
      setEmailChange(true);
    } catch (err) {
      console.error(err);
      alert(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const authEmailNum = async () => {
    setLoading(true);
    const auth = {
      authNum: emailAuthNum,
    };
    try {
      const response = await authApi.post("/user/emailAuth/check", auth, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.data.auth) {
        setIsAuth(true);
        setAuthBoxShow(false);
      } else {
        setIsAuth(false);
      }
      alert(response.data.message);
    } catch (err) {
      alert(err.data.message);
      console.error(err);
    } finally {
      setLoading(false);
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
      {loading && (
        <div className="loading_state">
          <LoadingBox />
        </div>
      )}
      <fieldset className="input_field id_field">
        <legend>아이디</legend>
        <div className="input_container">
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
            onChange={handleIdInput}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                checkIsOnly();
              }
            }}
          />
          {userOnly ? (
            <div className="id_check user_only">사용가능</div>
          ) : (
            <div
              className={`id_check${idActive ? " active" : ""}`}
              onClick={checkIsOnly}
            >
              중복확인
            </div>
          )}
        </div>
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
          value={inputPw}
          minLength={8}
          maxLength={20}
          required
          onChange={handlePwInput}
        />
        <input
          type="password"
          id="new_pw_check"
          name="new_pw_check"
          placeholder="비밀번호 확인"
          value={confirmPw}
          minLength={8}
          maxLength={20}
          required
          onChange={handlePwCheckInput}
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
      </fieldset>
      <fieldset className="input_field email_field">
        <legend>이메일</legend>
        <input
          type="email"
          id="new_email"
          name="new_email"
          placeholder="이메일"
          value={joinUser.email}
          disabled={isAuth || authBoxShow}
          required
          onChange={(e) =>
            setJoinUser((prev) => ({ ...prev, email: e.target.value }))
          }
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              emailAuth();
            }
          }}
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
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    authEmailNum();
                  }
                }}
              />
              <div className="auth_num_btn" onClick={authEmailNum}>
                인증
              </div>
            </div>
            <div className="count_box">
              {resetTimer ? (
                <CountDown
                  setEmailChange={setEmailChange}
                  setAuthBoxShow={setAuthBoxShow}
                  setEmailAuthNum={setEmailAuthNum}
                />
              ) : (
                <CountDown2
                  setEmailChange={setEmailChange}
                  setAuthBoxShow={setAuthBoxShow}
                  setEmailAuthNum={setEmailAuthNum}
                />
              )}
              <div className="resend_auth" onClick={emailAuth}>
                인증번호 재발송
              </div>
            </div>
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
  padding-top: 50px;
  gap: 20px;
  .input_field {
    width: 80%;
    max-width: 400px;
    legend {
      margin: 15px 0;
    }
  }
  .pw_field {
    display: flex;
    flex-direction: column;
    gap: 7px;
  }
  .input_container {
    display: flex;
    input {
      border-radius: 10px 0 0 10px;
      width: 100%;
    }
    .id_check {
      width: 95px;
      line-height: 42px;
      text-align: center;
      background-color: #999;
      border-radius: 0 10px 10px 0;
      color: #fff;
      user-select: none;
      &.active {
        background-color: var(--color-red);
        cursor: pointer;
      }
      &.user_only {
        background-color: #96c291;
      }
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
    width: 30%;
    max-width: 400px;
    min-width: 300px;
    height: 60px;
    border-radius: 10px;
    margin-top: 15px;
    &.active {
      background-color: var(--color-red);
      color: #fff;
      font-weight: 700;
      cursor: pointer;
    }
  }
  .red_txt {
    color: var(--color-red);
    font-size: 15px;
    margin-left: 0.3vw;
    margin-top: 15px;
    &.submit {
      color: green;
    }
  }
  .email_auth_btn {
    border: 1px solid #000;
    cursor: pointer;
    height: 50px;
    line-height: 50px;
    text-align: center;
    border-radius: 10px;
    margin: 10px 0 20px;
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
      display: flex;
      .auth_input {
        border-radius: 10px 0 0 10px;
      }
      .auth_num_btn {
        background-color: var(--color-red);
        color: #fff;
        width: 95px;
        line-height: 42px;
        text-align: center;
        border-radius: 0 10px 10px 0;
        cursor: pointer;
      }
    }
    .count_box {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 10px;
      .auth_timer {
        margin-left: 0.2vw;
        color: #777;
        font-size: 16px;
      }
      .resend_auth {
        margin-left: 0.2vw;
        color: var(--color-red);
        cursor: pointer;
        font-size: 16px;
      }
    }
  }
  .loading_state {
    background-color: rgba(255, 255, 255, 0.5);
  }
  @media (max-width: 1200px) {
    height: 100vh;
  }
  @media (max-width: 768px) {
    .input_field {
      width: 80%;
    }
  }
`;

export default JoinPage;
