import React, { useEffect, useState } from "react";
import styled from "styled-components";
import authApi from "../assets/api/authApi";

function CartPage() {
  const cart = JSON.parse(sessionStorage.getItem("CART"));
  const { data, total } = cart ? cart : {};
  const [cartList, setCartList] = useState([]);

  const parsingCart = () => {
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
  };

  const countUp = async (product, size) => {
    const { model } = product;
    try {
      const response = await authApi.get(`/product?model=${model}`);
      const productDB = response.data.products[0];
      const value = productDB.size[size];
      const qty = product.sizes[size];
      if (value > qty) {
        data[model].sizes[size]++;
        cart.data = data;
        sessionStorage.setItem("CART", JSON.stringify(cart));
        parsingCart();
      } else {
        alert("현재 주문 가능한 최대 수량입니다.");
      }
    } catch (err) {
      console.error(err);
    }
  };
  const countDown = (product, size) => {
    const { model } = product;
    data[model].sizes[size]--;
    cart.data = data;
    sessionStorage.setItem("CART", JSON.stringify(cart));
    parsingCart();
  };

  useEffect(() => {
    parsingCart();
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
          {cart ? (
            <ul className="cart_list">
              {cartList.map((product, idx) => {
                const { model, price, sizes, name } = product;
                return Object.keys(sizes).map((size) => {
                  return (
                    <li key={model + size + idx} className="cart_item">
                      <input
                        type="checkbox"
                        name="product_check"
                        id="product_check"
                      />
                      <img
                        src={`${process.env.PUBLIC_URL}/images/product/${model}/${model}_${model}_primary.jpg`}
                        alt={`${model}이미지`}
                        className="product_img"
                      />
                      <div className="product_info">
                        <div className="infomation_box">
                          <p className="product_name">{name}</p>
                          <p className="product_size">Size : {size}</p>
                          <div className="qty_box">
                            <p className="qty">수량</p>
                            {sizes[size] === 1 ? (
                              <span className="qty_btn down disabled">-</span>
                            ) : (
                              <span
                                className="qty_btn down"
                                onClick={() => countDown(product, size)}
                              >
                                -
                              </span>
                            )}
                            <input
                              type="text"
                              value={sizes[size]}
                              onChange={() => console.log("값 변경")}
                            />
                            <span
                              className="qty_btn up"
                              onClick={() => countUp(product, size)}
                            >
                              +
                            </span>
                          </div>
                        </div>
                        <div className="option_box">
                          <span className="material-symbols-outlined delete_btn">
                            close
                          </span>
                          <p className="option_change">옵션변경</p>
                          <p className="product_price">
                            {price.toLocaleString("ko-KR")}원
                          </p>
                        </div>
                      </div>
                    </li>
                  );
                });
              })}
            </ul>
          ) : (
            <ul className="cart_list">
              <li>상품이 없습니다.</li>
            </ul>
          )}
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
          width: 100%;
          display: flex;
          gap: 1vw;
          padding: 1vw 0;
          border-bottom: 1px dotted #000;
          .product_img {
            width: 10%;
            border-radius: 15px;
          }
          .product_info {
            width: 100%;
            display: flex;
            justify-content: space-between;
            .infomation_box {
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              .product_name {
                font-size: 1vw;
              }
              .product_size {
                display: flex;
                align-items: center;
                gap: 0.4vw;
                font-size: 0.7vw;
              }
              .qty_box {
                display: flex;
                align-items: center;
                gap: 0.5vw;
                input {
                  width: 1vw;
                  font-size: 0.8vw;
                  text-align: center;
                }
                .qty_btn {
                  font-size: 1.3vw;
                  cursor: pointer;
                  user-select: none;
                  &:hover {
                    color: var(--color-red);
                  }
                  &.disabled {
                    color: #a1a1a1;
                    cursor: default;
                  }
                }
              }
            }
            .option_box {
              display: flex;
              flex-direction: column;
              align-items: flex-end;
              justify-content: space-between;
              .product_price {
                font-size: 1vw;
                font-weight: 500;
              }
              .option_change {
                color: #a9a9a9;
                font-size: 0.8vw;
                cursor: pointer;
                &:hover {
                  color: #000;
                }
              }
              .delete_btn {
                top: 5px;
                right: 0;
                font-size: 1.6vw;
                font-weight: bold;
                cursor: pointer;
                &:hover {
                  color: var(--color-red);
                }
              }
            }
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
