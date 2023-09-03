const Cookies = require("js-cookie");

const updateRecently = (item) => {
  const cookie = Cookies.get("recentlyProducts");
  let products = cookie ? JSON.parse(cookie) : false;
  if (!products) products = [];
  if (products.includes(item.id)) return;
  products = [item.model, ...products];
  if (products.length >= 11) products.pop();
  Cookies.set("recentlyProducts", JSON.stringify(products), { expires: 3 });
};

module.exports = updateRecently;
