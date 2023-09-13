import authApi from "../api/authApi";

const Cookies = require("js-cookie");

export default {
  // 최근 본 상품 추가
  updateRecently: function (item) {
    const cookie = Cookies.get("recentlyProducts");
    let products = cookie ? JSON.parse(cookie) : [];
    if (products.includes(item.model)) return;
    products = [item.model, ...products];
    if (products.length >= 11) products.pop();
    Cookies.set("recentlyProducts", JSON.stringify(products), { expires: 3 });
  },
  // 장바구니 추가
  addCart: async function (item, size, qty, setNavCart) {
    const { model, price, name } = item;
    const cart = JSON.parse(sessionStorage.getItem("CART"));
    const loggedIn = JSON.parse(sessionStorage.getItem("loginState"));
    const list = cart ? cart : { data: {} };

    const { data } = list;
    if (data[model]) {
      if (data[model].sizes[size]) {
        const confirm = window.confirm(
          "이미 장바구니에 담겨있는 상품입니다. \n다시 담으시겠습니까?"
        );
        if (confirm) {
          data[model].sizes[size] = { qty, chk: true };
        } else {
          return;
        }
      } else {
        data[model].sizes[size] = { qty, chk: true };
      }
    } else {
      data[model] = { sizes: { [size]: { qty, chk: true } }, price, name };
    }

    const modelTotal = Object.keys(data[model].sizes).length;
    data[model].qty = modelTotal;

    const total = Object.values(data)
      .filter((obj) => obj.qty)
      .reduce((acc, cur) => acc + cur.qty, 0);

    list.total = total;

    try {
      if (loggedIn) {
        await authApi.patch(
          "/user/cartUpdate",
          { list },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      }
    } catch (err) {
      console.error(err);
    } finally {
      sessionStorage.setItem("CART", JSON.stringify(list));
      setNavCart(true);
    }
  },
};
