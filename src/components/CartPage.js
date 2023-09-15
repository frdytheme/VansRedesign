import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import authApi from "../assets/api/authApi";
import PayPage from "./PayPage";
import PUBLIC from "../assets/module/PUBLIC";

function CartPage({ setCartCount }) {
  const cart = JSON.parse(sessionStorage.getItem("CART"));
  const loggedIn = JSON.parse(sessionStorage.getItem("loginState"));
  const { data, total } = cart ? cart : {};
  const [cartList, setCartList] = useState([]);
  const [orderList, setOrderList] = useState([]);
  const [orderPrice, setOrderPrice] = useState(0);
  const [cartPage, setCartPage] = useState(0);
  const delivery = orderList.length ? 3000 : 0;
  const navigate = useNavigate();

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
    setCartCount(cart ? cart.total : 0);
  };

  const cartUpdateAPI = async (list) => {
    try {
      const response = await authApi.patch(
        "user/cartUpdate",
        { list },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const countUp = async (product, size) => {
    const { model } = product;
    try {
      const response = await authApi.get(`/product?model=${model}`);
      const productDB = response.data.products[0];
      const value = productDB.size[size];
      const qty = product.sizes[size].qty;
      if (value > qty) {
        data[model].sizes[size].qty++;
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
    data[model].sizes[size].qty--;
    cart.data = data;
    sessionStorage.setItem("CART", JSON.stringify(cart));
    parsingCart();
  };

  const removeItem = (product, size) => {
    const { model } = product;
    const newSizeObj = {};
    const nowObj = product.sizes;
    for (const key in nowObj) {
      if (key !== size) {
        newSizeObj[key] = nowObj[key];
      }
    }
    data[model].sizes = newSizeObj;
    const empty = Object.keys(data[model].sizes).length;
    if (!empty) {
      delete data[model];
    }
    const totalCount = Object.values(data)
      .map((obj) => {
        const sizeArr = Object.keys(obj.sizes);
        obj.qty = sizeArr.length;
        return sizeArr.length;
      })
      .reduce((acc, cur) => acc + cur, 0);
    cart.total = totalCount;
    if (totalCount) {
      sessionStorage.setItem("CART", JSON.stringify(cart));
    } else {
      sessionStorage.removeItem("CART");
    }
    if (loggedIn) {
      cartUpdateAPI(cart);
    }
    parsingCart();
  };

  const clearCart = (e, orderList) => {
    const btn = e.target.id;
    if (btn) {
      const confirm = window.confirm(
        "모든 상품을 장바구니에 삭제하시겠습니까?"
      );
      if (confirm) {
        if (loggedIn) {
          const list = { data: {}, total: 0 };
          cartUpdateAPI(list);
        }
        sessionStorage.removeItem("CART");
        window.location.reload();
      }
    } else {
      if (!orderList.length) return alert("선택된 상품이 없습니다.");
      const confirm = window.confirm(
        "선택하신 상품을 장바구니에서 삭제하시겠습니까?"
      );
      if (confirm) {
        orderList.forEach((product) => {
          const { model, size } = product;
          delete data[model].sizes[Number(size)];
          const sizeLength = Object.keys(data[model].sizes).length;
          if (sizeLength) {
            data[model].qty = sizeLength;
          } else {
            delete data[model];
          }
        });
        cart.total = Object.values(data).reduce((acc, cur) => acc + cur.qty, 0);
        sessionStorage.setItem("CART", JSON.stringify(cart));
        if (loggedIn) cartUpdateAPI(cart);
        parsingCart();
      }
    }
  };

  useEffect(() => {
    parsingCart();
  }, []);

  useEffect(() => {
    const order = orderList.length;
    const btn = document.querySelector(".order_box .btn_container .order");
    if (order) {
      btn.classList.remove("disabled");
    } else {
      btn.classList.add("disabled");
    }
  }, [orderList]);

  const handleCheck = (model, size) => {
    data[model].sizes[size].chk = !data[model].sizes[size].chk;
    sessionStorage.setItem("CART", JSON.stringify(cart));
    parsingCart();
  };

  const handleCheckedAll = (e) => {
    const id = e.target.id;
    for (const key in data) {
      const sizeObj = data[key].sizes;
      for (const size in sizeObj) {
        sizeObj[size].chk = id === "on";
      }
    }
    sessionStorage.setItem("CART", JSON.stringify(cart));
    parsingCart();
  };

  useEffect(() => {
    const order = [];
    cartList.map((item) => {
      const keys = Object.keys(item.sizes);
      Object.values(item.sizes).map((size, idx) => {
        const { price, model, name } = item;
        if (size.chk)
          order.push({ model, name, price, size: keys[idx], qty: size.qty });
      });
    });
    const price = order.reduce((acc, cur) => acc + cur.price * cur.qty, 0);
    setOrderList(order);
    setOrderPrice(price);
  }, [cartList]);

  const handleReturn = () => {
    if (!cartPage) {
      navigate("/home");
    } else {
      setCartPage(cartPage - 1);
    }
  };

  const goPayContainer = () => {
    if (!orderList.length) return;
    if (cartPage === 1) {
      alert("결제 기능은 준비중입니다.");
    }
    setCartPage(1);
  };

  useEffect(() => {
    const lis = document.querySelectorAll(".cart_process .process_item");
    lis.forEach((li, idx) => {
      if (idx === cartPage) {
        li.classList.add("active");
      } else {
        li.classList.remove("active");
      }
    });
  }, [cartPage]);

  return (
    <CartPageStyle>
      <div className="cart_wrapper">
        <ul className="cart_process">
          <li className="process_li process_item first">1. CART</li>
          <li className="process_li gt">&gt;&gt;&gt;</li>
          <li className="process_li process_item second">2. ORDER</li>
          <li className="process_li gt">&gt;&gt;&gt;</li>
          <li className="process_li process_item third">3. COMPLETE</li>
        </ul>
        {!cartPage ? (
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
                          checked={sizes[size].chk}
                          onChange={() => handleCheck(model, size)}
                        />
                        <img
                          src={`${PUBLIC}/images/product/${model}/${model}_${model}_primary.jpg`}
                          alt={`${model}이미지`}
                          className="product_img"
                        />
                        <div className="product_info">
                          <div className="infomation_box">
                            <p className="product_name">{name}</p>
                            <p className="product_size">Size : {size}</p>
                            <div className="qty_box">
                              <p className="qty">수량</p>
                              {sizes[size].qty === 1 ? (
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
                                value={sizes[size].qty}
                                onChange={() => console.log("수량 변경중")}
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
                            <span
                              className="material-symbols-outlined delete_btn"
                              onClick={() => removeItem(product, size)}
                            >
                              close
                            </span>
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
              <ul className="cart_list empty_list">
                <li>장바구니에 담긴 상품이 없습니다.</li>
                <li
                  className="show_product_btn"
                  onClick={() => navigate("/home/product")}
                >
                  쇼핑하러가기
                </li>
              </ul>
            )}
          </div>
        ) : (
          <PayPage />
        )}
        <div className="total_count">
          <p>
            총 {total || 0}개 / {orderList.length}개 선택
          </p>
        </div>
        <div className="order_box">
          <div className="order_title">
            <div className="title">결제 상세</div>
          </div>
          <ul className="price_box">
            <li className="price_list">
              <p className="price_info">상품 금액</p>
              <p className="is_price">{orderPrice.toLocaleString("ko-KR")}원</p>
            </li>
            <li className="price_list">
              <p className="price_info">배송비</p>
              <p className="is_price">{delivery.toLocaleString("ko-KR")}원</p>
            </li>
            <li className="price_list">
              <p className="price_info">주문 금액</p>
              <p className="is_price">
                {(orderPrice + delivery).toLocaleString("ko-KR")}원
              </p>
            </li>
          </ul>
          <div className="btn_container">
            <div className="return btn" onClick={handleReturn}>
              {cartPage ? "장바구니로" : "돌아가기"}
            </div>
            <div className="order btn" onClick={goPayContainer}>
              {cartPage ? "결제하기" : "주문하기"}
            </div>
          </div>
        </div>
        {!cartPage && (
          <div className="list_option">
            <div className="checked_option option_list">
              <p onClick={handleCheckedAll} id="on">
                전체선택
              </p>
              <p onClick={handleCheckedAll} id="off">
                전체해제
              </p>
            </div>
            <div className="delete_option option_list">
              <p onClick={(e) => clearCart(e, orderList)}>선택삭제</p>
              <p onClick={(e) => clearCart(e, orderList)} id="all_clear">
                전체삭제
              </p>
            </div>
          </div>
        )}
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
    position: relative;
    .cart_process {
      display: flex;
      align-items: center;
      gap: 1.2vw;
      font-size: 1vw;
      color: #999;
      font-weight: 500;
      user-select: none;
      .process_li {
        &.active {
          color: #000;
          font-weight: 600;
        }
        &.gt {
          font-size: 0.7vw;
        }
      }
    }
    .cart_container {
      margin-right: 1vw;
      overflow: auto;
      border-top: 1px solid #000;
      border-bottom: 1px solid #000;
      grid-row: 2 / 4;
      &::-webkit-scrollbar {
        width: 0;
      }
      .cart_list {
        width: 100%;
        box-sizing: border-box;
        &.empty_list {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5vw;
          font-size: 1vw;
          font-weight: 500;
          padding-top: 5vw;
          .show_product_btn {
            text-align: center;
            width: 10vw;
            height: 3vw;
            line-height: 3vw;
            color: #fff;
            border-radius: 15px;
            background-color: var(--color-red);
            cursor: pointer;
            &:hover {
              outline: 2px solid #000;
            }
          }
        }
        .cart_item {
          width: 100%;
          display: flex;
          gap: 1vw;
          padding: 1vw 0;
          border-bottom: 1px dotted #000;
          box-sizing: border-box;
          &:last-child {
            border: none;
          }
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
    .total_count {
      margin-top: 0.5vw;
      background-color: #222;
      padding: 0 1vw;
      color: #fff;
      font-size: 1vw;
      display: flex;
      align-items: center;
      grid-row: 1 / 2;
      grid-column: 2/ 3;
    }
    .order_box {
      display: grid;
      grid-auto-columns: 1fr;
      grid-template-rows: 1fr 8fr 1fr;
      border: 1px solid #000;
      gap: 1vw;
      grid-column: 2 / 3;
      grid-row: 2 / 4;
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
          cursor: pointer;
          &.order {
            background-color: #000;
            border: 1px solid #000;
            border-right: none;
            border-bottom: none;
          }
          &.return {
            color: #000;
            border-top: 1px solid #000;
            box-sizing: border-box;
          }
          &.disabled {
            background-color: #d9d9d9;
            color: #aaa;
            cursor: default;
          }
        }
      }
    }
  }
  .list_option {
    position: absolute;
    left: 0;
    top: 102%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 69%;
    color: #777;
    .option_list {
      display: flex;
      gap: 1vw;
    }
    p {
      font-size: 0.8vw;
      cursor: pointer;
      &:hover {
        color: #000;
      }
    }
  }
`;

export default CartPage;
