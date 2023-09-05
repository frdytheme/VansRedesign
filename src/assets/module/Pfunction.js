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
  addCart: function (item, size) {
    const { model, price, name } = item;
    const cart = JSON.parse(sessionStorage.getItem("CART"));
    const list = cart ? cart : { data: {} };

    const { data } = list;
    if (data[model]) {
      if (data[model].sizes[size]) {
        data[model].sizes[size]++;
      } else {
        data[model].sizes[size] = 1;
      }
    } else {
      data[model] = { sizes: { [size]: 1 }, price, name };
    }

    const modelTotal = Object.keys(data[model].sizes).length;
    data[model].qty = modelTotal;

    const total = Object.values(data)
      .filter((obj) => obj.qty)
      .reduce((acc, cur) => acc + cur.qty, 0);

    list.total = total;

    sessionStorage.setItem("CART", JSON.stringify(list));
  },
  removeCart: function (item) {
    const cart = Cookies.get("CART");
    let removedArr = JSON.parse(cart).filter((model) => model !== item.model);
    Cookies.set("CART", JSON.stringify(removedArr), { expires: 60 });
  },
};
