import React, { useEffect, useState } from "react";
import styled from "styled-components";
import authApi from "../assets/api/authApi";
import { useNavigate } from "react-router-dom";
import LoadingBox from "./LoadingBox";
import PUBLIC from "../assets/module/PUBLIC";

function MyPage({ userData }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [myData, setMyData] = useState({ name: "", email: "", _id: "" });

  useEffect(() => {
    const userCheck = async () => {
      setLoading(true);
      const user = { name: userData.name };
      try {
        const response = await authApi.post("/user/auth", user, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = response.data.user;
        setMyData((prev) => ({
          ...prev,
          name: data.name,
          email: data.email,
          _id: data._id,
        }));
      } catch (err) {
        const state = err.response.data.state;
        if (state === "expired") {
          sessionStorage.setItem("loginState", JSON.stringify(false));
          alert("로그인 정보 만료");
          navigate("/home/login");
        }
      } finally {
        setLoading(false);
      }
    };

    userCheck();
  }, []);

  const deleteUser = async () => {
    const confirm = window.confirm("정말 회원 정보를 삭제하시겠습니까?");
    try {
      if (confirm) {
        const user = prompt(`비밀번호를 입력해주세요.`);
        if (!user) return;
        const data = { password: user, name: myData.name };
        setLoading(true);
        await authApi.post("/user/deleteUser", data, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        alert("탈퇴 처리되었습니다.");
        sessionStorage.setItem("loginState", JSON.stringify(false));
        navigate("/home");
      }
    } catch (err) {
      alert(err.response.data.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MyPageStyle>
      {loading && (
        <div className="loading_state">
          <LoadingBox />
        </div>
      )}
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
    </MyPageStyle>
  );
}

const MyPageStyle = styled.div`
  width: 100%;
  position: relative;
  height: calc(100vh - 180px);
  .loading_state {
    width: 100%;
    height: 83%;
    position: absolute;
  }
  .mypage_container {
    width: 100%;
    height: 75%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5vw 0;
    .mypage_box {
      display: flex;
      flex-direction: column;
      align-items: center;
      background-image: linear-gradient(
        140deg,
        #ff6464,
        #db3056,
        #851d41,
        #141e46
      );
      color: #fff;
      padding: 30px;
      border-radius: 15px;
      .mydata_box {
        min-width: 300px;
        height: 150px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 15px;
        p {
          display: flex;
          align-items: center;
          em {
            display: block;
            margin-right: 20px;
            font-weight: 700;
          }
        }
      }
      .mydata_edit_box {
        display: flex;
        justify-content: space-between;
        gap: 15px;
        .btn {
          padding: 10px;
          cursor: pointer;
          border: 1px solid #fff;
          color: #fff;
        }
      }
      img {
        align-self: center;
        margin-bottom: 35px;
      }
    }
  }
  @media (max-width: 768px) {
  }
`;

export default MyPage;
