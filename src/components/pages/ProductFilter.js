import React, { useEffect, useState } from "react";
import styled from "styled-components";

function ProductFilter({ product, setFilterList, filterToggle }) {
  const [loadedColor, setLoadedColor] = useState([]);
  const [loadedSize, setLoadedSize] = useState([]);
  const [loadedPrice, setLoadedPrice] = useState([]);
  const [loadedCategory, setLoadedCategory] = useState([]);
  const [colorFilter, setColorFilter] = useState([]);
  const [sizeFilter, setSizeFilter] = useState([]);
  const [priceFilter, setPriceFilter] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState([]);

  const colorList = [
    { no: 0, name: "블루", code: "#2F58CD" },
    { no: 1, name: "화이트", code: "#fff" },
    { no: 2, name: "블랙", code: "#000" },
    { no: 3, name: "옐로우", code: "#FFE569" },
    { no: 4, name: "차콜", code: "#454545" },
    { no: 5, name: "그레이", code: "#B2B2B2" },
    { no: 6, name: "샌드", code: "#D8C4B6" },
    { no: 7, name: "그린", code: "#54B435" },
    { no: 8, name: "네이비", code: "#0E2954" },
    { no: 9, name: "브라운", code: "#884A39" },
    { no: 10, name: "크림화이트", code: "#F9FBE7" },
    { no: 11, name: "레드", code: "#B31312" },
    { no: 12, name: "올리브", code: "#898121" },
    { no: 13, name: "핑크", code: "#FFAAC9" },
    { no: 14, name: "퍼플", code: "#8B1874" },
    { no: 15, name: "카키", code: "#83764F" },
    { no: 16, name: "오렌지", code: "#FF8551" },
    { no: 17, name: "스카이블루", code: "#9AC5F4" },
  ];

  const sizeList = {
    shoes: [210, 215, 220, 225, 230, 235, 240, 245, 250, 255, 260, 265, 270, 275, 280, 285, 290, 295, 300, 310],
    clothes: ["XXS", "XS", "S", "M", "L", "XL", "XXL"],
    kids: [4, 5, 6, 7],
    inches: [29, 30, 31, 32, 33, 34, 36],
    free: "FREE",
  };

  const priceList = [
    { min: 0, max: 50000 },
    { min: 50000, max: 80000 },
    { min: 80000, max: 100000 },
    { min: 100000, max: 150000 },
    { min: 150000, max: 300000 },
  ];

  const getColor = () => {
    const color = [];
    product.forEach((item) => {
      if (color.includes(item.color)) return;
      color.push(item.color);
    });
    const currentColor = colorList.filter((item) => {
      if (color.includes(item.name)) {
        return item;
      }
    });
    setLoadedColor(currentColor);
  };

  const getSize = () => {
    setLoadedSize(Object.values(sizeList).flat());
  };

  const getPrice = () => {
    const priceInfo = priceList.map(
      (item) =>
        (item = {
          ...item,
          txt: item.min.toLocaleString("kr-KR") + "원" + "~" + item.max.toLocaleString("kr-KR") + "원",
          checked: false,
        })
    );
    setLoadedPrice(priceInfo);
  };

  const getCategory = () => {
    const categoryList = [];
    product.forEach((item) => {
      if (categoryList.includes(item.category)) return;
      categoryList.push(item.category);
    });
    const addCheck = categoryList.map((item) => {
      return { name: item, checked: false };
    });
    setLoadedCategory(addCheck);
  };

  useEffect(() => {
    getColor();
    getSize();
    getPrice();
    getCategory();
  }, [product]);

  const selectColor = (color) => {
    const newData = [...colorFilter, color];
    const remainingColor = loadedColor.filter((item) => item !== color);
    setColorFilter(newData);
    setLoadedColor(remainingColor);
    setFilterList((prev) => ({ ...prev, color: [...prev.color, color.name] }));
  };
  const removeColor = (color) => {
    const remainingColor = colorFilter.filter((item) => item !== color);
    const returnColor = [...loadedColor, color].sort((a, b) => a.no - b.no);
    setLoadedColor(returnColor);
    setColorFilter(remainingColor);
    setFilterList((prev) => ({ ...prev, color: prev.color.filter((item) => item !== color.name) }));
  };
  const selectSize = (e) => {
    e.target.classList.add("disabled");
    const size = e.target.textContent;
    if (sizeFilter.includes(size)) return;
    const newSize = [...sizeFilter, size];
    setSizeFilter(newSize);
    setFilterList((prev) => ({ ...prev, size: [...prev.size, size] }));
  };
  const removeSize = (e) => {
    const size = e.target.textContent;
    const remainingSize = sizeFilter.filter((item) => item !== size);
    setSizeFilter(remainingSize);
    setFilterList((prev) => ({ ...prev, size: prev.size.filter((item) => item !== size) }));
    const sizeList = document.querySelectorAll(".filter_list.size .filter_snb li");
    sizeList.forEach((item) => (item.textContent === size ? item.classList.remove("disabled") : false));
  };

  const handlePrice = (e, price) => {
    price.checked = !price.checked;
    if (e.target.checked) {
      setPriceFilter((prev) => [...prev, price]);
      setFilterList((prev) => ({ ...prev, price: [...prev.price, price] }));
    } else {
      setPriceFilter((prev) => prev.filter((item) => item !== price));
      setFilterList((prev) => ({ ...prev, price: prev.price.filter((item) => item !== price) }));
    }
  };
  const removePrice = (price) => {
    loadedPrice.forEach((item) => (item.txt === price.txt ? (item.checked = false) : false));
    setPriceFilter((prev) => prev.filter((item) => item !== price));
    setFilterList((prev) => ({ ...prev, price: prev.price.filter((item) => item !== price) }));
  };
  const handleCategory = (e, category) => {
    category.checked = !category.checked;
    if (e.target.checked) {
      setCategoryFilter((prev) => [...prev, category]);
      setFilterList((prev) => ({ ...prev, category: [...prev.category, category.name] }));
    } else {
      setCategoryFilter((prev) => prev.filter((item) => item !== category));
      setFilterList((prev) => ({ ...prev, category: prev.category.filter((item) => item !== category.name) }));
    }
  };
  const removeCategory = (category) => {
    loadedCategory.forEach((item) => (category.name === item.name ? (item.checked = false) : false));
    setCategoryFilter((prev) => prev.filter((item) => item !== category));
    setFilterList((prev) => ({ ...prev, category: prev.category.filter((item) => item !== category.name) }));
  };
  const removeFilter = () => {
    const returnColor = [...loadedColor, ...colorFilter].sort((a, b) => a.no - b.no);
    setLoadedColor(returnColor);
    const sizeList = document.querySelectorAll(".filter_list.size .filter_snb li");
    sizeList.forEach((item) => item.classList.remove("disabled"));
    loadedPrice.forEach((item) => (item.checked = false));
    loadedCategory.forEach((item) => (item.checked = false));
    setColorFilter([]);
    setSizeFilter([]);
    setPriceFilter([]);
    setCategoryFilter([]);
    setFilterList({
      color: [],
      colorFilter: false,
      size: [],
      sizeFilter: false,
      price: [],
      priceFilter: false,
      category: [],
      categoryFilter: false,
    });
  };

  return (
    <ProductFilterStyle>
      <ul className="filter_container">
        <li className="filter_title">FILTER</li>
        <li className="filter_list color">
          <p className="list_name">COLOR</p>
          <ul className="filter_item filter_selected">
            {colorFilter.map((color, idx) => (
              <li key={`selectedColor${idx}`} onClick={() => removeColor(color)}>
                <div className="color_circle" style={{ backgroundColor: `${color.code}` }}></div>
                <p className="color_name">{color.name}</p>
              </li>
            ))}
          </ul>
          <ul className="filter_item filter_snb">
            {loadedColor.map((color, idx) => (
              <li key={idx} onClick={() => selectColor(color)}>
                <div className="color_circle" style={{ backgroundColor: `${color.code}` }}></div>
                <p className="color_name">{color.name}</p>
              </li>
            ))}
          </ul>
        </li>
        <li className="filter_list size">
          <p className="list_name">SIZE</p>
          <ul className="filter_item filter_selected">
            {sizeFilter.map((size, idx) => (
              <li key={idx} onClick={removeSize}>
                {size}
              </li>
            ))}
          </ul>
          <ul className="filter_item filter_snb">
            {loadedSize.map((size, idx) => (
              <li key={idx} onClick={selectSize}>
                {size}
              </li>
            ))}
          </ul>
        </li>
        <li className="filter_list price">
          <p className="list_name">PRICE</p>
          <ul className="filter_item filter_selected">
            {priceFilter.map((price, idx) => (
              <li key={`selected_price_li${idx}`} onClick={() => removePrice(price)}>
                {price.txt}
              </li>
            ))}
          </ul>
          <ul className="filter_item filter_snb">
            {loadedPrice.map((price, idx) => (
              <li key={`price_li${idx}`}>
                <label htmlFor={`price${idx}`}>
                  <input
                    type="checkbox"
                    name={`price_checkbox`}
                    id={`price${idx}`}
                    onChange={(e) => handlePrice(e, price)}
                    checked={price.checked}
                  />
                  {price.txt}
                </label>
              </li>
            ))}
          </ul>
        </li>
        <li className="filter_list category">
          <p className="list_name">CATEGORY</p>
          <ul className="filter_item filter_selected">
            {categoryFilter.map((category, idx) => (
              <li key={`category${idx}`} onClick={() => removeCategory(category)}>
                {category.name}
              </li>
            ))}
          </ul>
          <ul className="filter_item filter_snb">
            {loadedCategory.map((category, idx) => (
              <li key={`category${idx}`}>
                <label>
                  <input
                    type="checkbox"
                    name="category_checkbox"
                    id={`category${idx}`}
                    onChange={(e) => handleCategory(e, category)}
                    checked={category.checked}
                  />
                  {category.name}
                </label>
              </li>
            ))}
          </ul>
        </li>
        {filterToggle && (
          <li className="filter_reset" onClick={removeFilter}>
            필터 초기화
          </li>
        )}
      </ul>
    </ProductFilterStyle>
  );
}

const ProductFilterStyle = styled.div`
  position: absolute;
  top: left;
  left: 1vw;
  width: 15vw;
  height: 90vh;
  background-color: #fff;
  margin-top: 1vw;
  z-index: 9999;
  .filter_container {
    margin-top: 20px;
    height: 100%;
    font-weight: 700;
    text-align: center;
    .filter_title {
      font-size: 2vw;
      margin-bottom: 40px;
    }
    .filter_list {
      width: 100%;
      font-size: 1vw;
      border-bottom: 1px solid #000;
      position: relative;
      cursor: pointer;
      .list_name {
        position: relative;
        padding: 1vw 1vw;
        display: flex;
        justify-content: space-between;
        align-items: center;
        transition: 0.3s;
        &:hover {
          color: var(--color-red);
        }
      }
      .filter_item {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        grid-auto-rows: 1fr;
        place-content: center;
        background-color: #fff;
        font-weight: 500;
        font-size: 0.7vw;
        &.filter_selected {
          li {
            position: relative;
            padding: 0.7vw 0;
            &:hover {
              opacity: 0.5;
            }
          }
        }
        &.filter_snb {
          position: absolute;
          top: 0;
          left: 100%;
          border: 1px solid #000;
          border-radius: 10px;
          padding: 1vw 0.7vw;
          visibility: hidden;
        }
      }
      &:hover {
        .filter_item {
          visibility: visible;
        }
      }
      &.color {
        .filter_item {
          li {
            margin: 0.3vw;
            position: relative;
          }
        }
        .color_circle {
          width: 2vw;
          height: 2vw;
          border: 1px solid #ddd;
          border-radius: 50%;
          margin: 0.2vw;
        }
        &:hover .color_name {
          display: block;
        }
        .color_name {
          color: #000;
          font-weight: 400;
        }
      }
      &.size {
        .filter_selected {
          grid-template-columns: repeat(5, 1fr);
        }
        .filter_snb {
          li {
            overflow: hidden;
            font-family: "Pretendard", sans-serif;
            width: 3vw;
            height: 2vw;
            border-radius: 7px;
            line-height: 2vw;
            border: 1px solid #d6d6d6;
            margin: 0.2vw;
            &:hover {
              background-color: var(--color-red);
              color: #fff;
              border: 1px solid #000;
            }
            &.disabled {
              opacity: 0.5;
              background-color: #d6d6d6;
              user-select: none;
              cursor: default;
            }
          }
        }
      }
      &.price {
        .filter_item {
          display: flex;
          flex-direction: column;
          text-align: left;
          li {
            width: 10vw;
            padding: 0.7vw;
            label {
              display: flex;
              align-items: center;
            }
          }
        }
        .filter_snb {
          li {
            cursor: default;
          }
        }
      }
      &.category {
        .filter_item {
          grid-template-columns: repeat(3, 1fr);
        }
        .filter_snb {
          li {
            width: 6vw;
            text-align: left;
            padding: 0.3vw 0;
            cursor: default;
            label {
              display: flex;
              align-items: center;
            }
          }
        }
      }
    }
    .filter_reset {
      border: 1px solid #000;
      padding: 1vw 0.5vw;
      margin-top: 1vw;
      cursor: pointer;
      &:hover {
        background-color: var(--color-red);
        color: #fff;
      }
    }
  }
`;

export default ProductFilter;
