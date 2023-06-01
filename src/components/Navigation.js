import React from "react";
import styled from "styled-components";

function Navigation() {
  let id = 0;
  const gnbList = [
    { id: id++, name: "NEW ARRIVAL" },
    { id: id++, name: "MEN" },
    { id: id++, name: "WOMEN" },
    { id: id++, name: "KIDS" },
    { id: id++, name: "CUSTOM" },
    { id: id++, name: "SKATEBOARDING" },
    { id: id++, name: "SALE" },
    { id: id++, name: "MORE" },
  ];

  const handleGnb = (e) => {
    if (e.target === e.currentTarget) return;
    const btns = document.querySelectorAll(".gnb_item");
    btns.forEach((btn) => {
      btn.classList.remove("checked");
    });
    e.target.classList.add("checked");
  };
  return (
    <Nav>
      <div className="logo">
        <img src={process.env.PUBLIC_URL + "./images/official/vans_logo.svg"} alt="반스 로고" />
      </div>
      <ul className="gnb" onClick={handleGnb}>
        {gnbList.map((li) => (
          <li key={li.id} className="gnb_item">
            {li.name}
          </li>
        ))}
      </ul>
    </Nav>
  );
}

const Nav = styled.header`
  width: calc(20% - 15px);
  height: calc(60% - 27px);
  border-radius: 20px;
  background-color: #000;
  text-align: center;
  position: absolute;
  top: 0;
  left: 0;
  margin: 15px;
  .logo {
    padding-top: 30px;
  }
  .gnb {
    color: #fff;
    .gnb_item {
      font-size: 20px;
      margin: 30px 0;
      cursor: pointer;
      &:hover {
        color: #aaa;
      }
      &.checked {
        color: #d51920;
        font-weight: bold;
      }
    }
  }
`;

export default Navigation;
