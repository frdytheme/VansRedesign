import React, { useEffect, useState } from "react";
import styled from "styled-components";

function CartPage() {
  const cart = JSON.parse(sessionStorage.getItem("CART"));
  const { data, total } = cart;
  const [cartList, setCartList] = useState([]);

  useEffect(() => {
    const products = [];
    for (const model in data) {
      products.push({ model });
    }
    const list = products.map((product) => {
      const { model } = product;
      const { sizes, price, name } = data[model];
      return { model, sizes, price, name };
    });

    setCartList(list);
  }, []);

  return (
    <CartPageStyle>
      <div className="cart_wrapper">
        <ul className="cart_process">
          <li className="process_li first active">1. CART</li>
          <li className="process_li gt">&gt;&gt;&gt;</li>
          <li className="process_li second">2. ORDER</li>
          <li className="process_li gt">&gt;&gt;&gt;</li>
          <li className="process_li third">3. COMPLETE</li>
        </ul>
        <div className="cart_container">
          <ul className="cart_list">
            {cartList.map((product, idx) => {
              const { model, price, sizes, name } = product;
              return (
                <li key={idx} className="cart_item">
                  <img
                    src={`${process.env.PUBLIC_URL}/images/product/${model}/${model}_${model}_primary.jpg`}
                    alt={`${model}이미지`}
                    className="product_img"
                  />
                  <div className="product_info">
                    <p className="product_name">{name}</p>
                    <ul className="product_sizes">
                      {Object.keys(sizes).map((size, idx) => (
                        <li key={idx}>{size}</li>
                      ))}
                    </ul>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="order_box">
          <div className="order_title">
            <div className="title">결제 상세</div>
          </div>
          <ul className="price_box">
            <li className="price_list">
              <p className="price_info">상품 금액</p>
              <p className="is_price">{0}원</p>
            </li>
            <li className="price_list">
              <p className="price_info">배송비</p>
              <p className="is_price">{0}원</p>
            </li>
            <li className="price_list">
              <p className="price_info">주문 금액</p>
              <p className="is_price">{0}원</p>
            </li>
          </ul>
          <div className="btn_container">
            <div className="return btn">돌아가기</div>
            <div className="order btn">결제하기</div>
          </div>
        </div>
      </div>
    </CartPageStyle>
  );
}

const CartPageStyle = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  padding-top: 50px;
  .cart_wrapper {
    width: 80%;
    height: 70%;
    display: grid;
    grid-template-columns: 7fr 3fr;
    grid-auto-rows: 1fr 9fr;
    gap: 1vw;
    .cart_process {
      display: flex;
      align-items: center;
      gap: 1.2vw;
      font-size: 1vw;
      color: #999;
      font-weight: 500;
      grid-column: span 2;
      .process_li {
        &.active {
          color: #000;
        }
        &.gt {
          font-size: 0.7vw;
        }
      }
    }
    .cart_container {
      margin-right: 2vw;
      .cart_list {
        width: 100%;
        height: 100%;
        border-top: 1px solid #000;
        border-bottom: 1px solid #000;
        box-sizing: border-box;
        .cart_item {
          display: flex;
          .product_img {
            width: 10%;
          }
        }
      }
    }
    .order_box {
      display: grid;
      grid-auto-columns: 1fr;
      grid-template-rows: 1fr 8fr 1fr;
      border: 1px solid #000;
      gap: 1vw;
      .order_title {
        height: 60px;
        line-height: 60px;
        padding: 1vw;
        box-sizing: border-box;
        .title {
          font-size: 1.2vw;
          font-weight: bold;
          border-bottom: 2px solid #000;
        }
      }
      .price_box {
        font-size: 0.8vw;
        padding: 1vw 2vw;
        .price_list {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 0.7vw 0;
          color: #777;
          &:last-child {
            color: #000;
            font-size: 1vw;
            font-weight: 500;
            border-top: 1px solid #000;
            padding: 1.5vw 0 1vw;
          }
        }
      }
      .btn_container {
        display: grid;
        grid-template-columns: 4fr 6fr;
        grid-auto-rows: 1fr;
        text-align: center;
        color: #fff;
        .btn {
          height: 60px;
          line-height: 60px;
          &.order {
            background-color: #000;
          }
          &.return {
            color: #000;
            border-top: 1px solid #000;
            box-sizing: border-box;
          }
        }
      }
    }
  }
`;

export default CartPage;
