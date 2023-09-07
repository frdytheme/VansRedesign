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
  addCart: function (item, size, qty) {
    const { model, price, name } = item;
    const cart = JSON.parse(sessionStorage.getItem("CART"));
    const list = cart ? cart : { data: {} };

    const { data } = list;
    if (data[model]) {
      data[model].sizes[size] = { qty, chk: true };
    } else {
      data[model] = { sizes: { [size]: { qty, chk: true } }, price, name };
    }

    const modelTotal = Object.keys(data[model].sizes).length;
    data[model].qty = modelTotal;

    const total = Object.values(data)
      .filter((obj) => obj.qty)
      .reduce((acc, cur) => acc + cur.qty, 0);

    list.total = total;

    sessionStorage.setItem("CART", JSON.stringify(list));
  },
  // addCart: function (item, size, qty) {
  //   const { model, price, name } = item;
  //   const cart = JSON.parse(sessionStorage.getItem("CART"));
  //   const list = cart ? cart : { data: {} };

  //   const { data } = list;
  //   if (data[model]) {
  //     data[model].sizes[size] = qty;
  //   } else {
  //     data[model] = { sizes: { [size]: qty }, price, name };
  //   }

  //   const modelTotal = Object.keys(data[model].sizes).length;
  //   data[model].qty = modelTotal;

  //   const total = Object.values(data)
  //     .filter((obj) => obj.qty)
  //     .reduce((acc, cur) => acc + cur.qty, 0);

  //   list.total = total;

  //   sessionStorage.setItem("CART", JSON.stringify(list));
  // },
};
