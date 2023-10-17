import React from "react";
import styled from "styled-components";
import PUBLIC from "../assets/module/PUBLIC";

function PayPage() {
  const selectPay = (e) => {
    const btns = document.querySelectorAll(".pay_item");
    btns.forEach((btn) => {
      btn.classList.remove("active");
    });
    e.target.classList.add("active");
  };

  return (
    <PayPageStyle>
      <ul className="pay_list" onClick={selectPay}>
        <li className="pay_block title">결제수단</li>
        <li className="pay_block pay_btn">
          <div className="pay_item kakaopay"></div>
          <div className="pay_item toss"></div>
          <div className="pay_item naverpay"></div>
          <div className="pay_item payco"></div>
        </li>
        <li className="pay_block pay_btn">
          <div className="pay_item">신용카드</div>
          <div className="pay_item">무통장 입금</div>
          <div className="pay_item">실시간 계좌이체</div>
        </li>
      </ul>
    </PayPageStyle>
  );
}

const PayPageStyle = styled.div`
  .pay_list {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2vw;
    padding: 1vw;
    .pay_block {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      gap: 1vw;
      &.title {
        font-size: 1.2vw;
        font-weight: bold;
        &:before {
          content: "";
          background-color: #d9d9d9;
          width: 0.3vw;
          height: 1.5vw;
        }
      }
      .pay_item {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 20%;
        min-width: 150px;
        height: 4vw;
        min-height: 50px;
        padding: 1vw 0;
        box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
          rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
        border-radius: 15px;
        box-sizing: border-box;
        cursor: pointer;
        overflow: hidden;
        font-weight: 500;
        &:hover {
          box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px,
            rgba(0, 0, 0, 0.23) 0px 3px 6px;
        }
        &.active {
          outline: 2px solid #000;
        }
        &.naverpay {
          background: #fff url("${PUBLIC}/images/pay_logos/naver.png") no-repeat
            center / 40%;
        }
        &.kakaopay {
          background: #ffeb00 url("${PUBLIC}/images/pay_logos/kakaopay.png")
            no-repeat center / 50%;
        }
        &.toss {
          background: #0064ff url("${PUBLIC}/images/pay_logos/toss_white.png")
            no-repeat center / contain;
        }
        &.payco {
          background: #e7181e url("${PUBLIC}/images/pay_logos/payco.png")
            no-repeat center / 50%;
        }
        img {
          height: 100%;
          cursor: pointer;
          &.kakaopay {
            height: 120%;
          }
          &.toss {
            height: 200%;
          }
        }
      }
    }
  }
  @media (max-width: 768px) {
    grid-row: span 2;
    overflow: auto;
    .pay_list {
      box-sizing: border-box;
      margin-top: 25px;
      gap: 20px;
      padding-bottom: 50px;
      .pay_block {
        gap: 20px;
        &.title {
          display: block;
          text-align: center;
          font-size: 20px;
          margin-bottom: 20px;
          &:before {
            display: none;
          }
        }
        .pay_item {
          font-size: 16px;
          width: 200px;
          height: 70px;
        }
      }
    }
  }
`;

export default PayPage;
