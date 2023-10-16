import React, { useEffect } from "react";
import styled from "styled-components";

function ProductFilter({
  setFilterList,
  filterToggle,
  listName,
  submitBtn,
  loadedColor,
  loadedSize,
  loadedPrice,
  loadedCategory,
  setLoadedColor,
  colorFilter,
  setColorFilter,
  sizeFilter,
  setSizeFilter,
  priceFilter,
  setPriceFilter,
  categoryFilter,
  setCategoryFilter,
  removeColor,
  removeSize,
  removePrice,
  removeCategory,
  filterOpen,
}) {
  const selectColor = (color) => {
    const newData = [...colorFilter, color];
    const remainingColor = loadedColor.filter((item) => item !== color);
    setColorFilter(newData);
    setLoadedColor(remainingColor);
    setFilterList((prev) => ({ ...prev, color: [...prev.color, color.name] }));
  };

  const selectSize = (e) => {
    e.target.classList.add("disabled");
    const size = e.target.textContent;
    if (sizeFilter.includes(size)) {
      removeSize(e);
    } else {
      const newSize = [...sizeFilter, size];
      setSizeFilter(newSize);
      setFilterList((prev) => ({ ...prev, size: [...prev.size, size] }));
    }
  };

  const handlePrice = (e, price) => {
    price.checked = !price.checked;
    if (e.target.checked) {
      setPriceFilter((prev) => [...prev, price]);
      setFilterList((prev) => ({ ...prev, price: [...prev.price, price] }));
    } else {
      setPriceFilter((prev) => prev.filter((item) => item !== price));
      setFilterList((prev) => ({
        ...prev,
        price: prev.price.filter((item) => item !== price),
      }));
    }
  };

  const handleCategory = (e, category) => {
    category.checked = !category.checked;
    if (e.target.checked) {
      setCategoryFilter((prev) => [...prev, category]);
      setFilterList((prev) => ({
        ...prev,
        category: [...prev.category, category.name],
      }));
    } else {
      removeCategory(category);
    }
  };

  const removeFilter = () => {
    const returnColor = [...loadedColor, ...colorFilter].sort(
      (a, b) => a.no - b.no
    );
    setLoadedColor(returnColor);
    const sizeList = document.querySelectorAll(
      ".filter_list.size .filter_snb li"
    );
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

  useEffect(() => {
    removeFilter();
  }, [listName, submitBtn]);

  return (
    <ProductFilterStyle
      className={`product_filter ${filterOpen ? " active" : ""}`}
    >
      <ul className="filter_container">
        <li className="filter_title">FILTER</li>
        <li className="filter_list color">
          <p className="list_name">COLOR</p>
          <ul className="filter_item filter_selected">
            {colorFilter.map((color, idx) => (
              <li
                key={`selectedColor${idx}`}
                onClick={() => removeColor(color)}
              >
                <div
                  className="color_circle"
                  style={{ backgroundColor: `${color.code}` }}
                ></div>
                <p className="color_name">{color.name}</p>
              </li>
            ))}
          </ul>
          {loadedColor.length === 0 || (
            <ul className="filter_item filter_snb">
              {loadedColor.map((color, idx) => (
                <li key={idx} onClick={() => selectColor(color)}>
                  <div
                    className="color_circle"
                    style={{ backgroundColor: `${color.code}` }}
                  ></div>
                  <p className="color_name">{color.name}</p>
                </li>
              ))}
            </ul>
          )}
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
          {priceFilter.length === 0 || (
            <ul className="filter_item filter_selected">
              <li onClick={removePrice}>
                {Math.min(
                  ...priceFilter.map((price) => price.min)
                ).toLocaleString("ko-KR") +
                  "~" +
                  Math.max(
                    ...priceFilter.map((price) => price.max)
                  ).toLocaleString("ko-KR") +
                  "원"}
              </li>
            </ul>
          )}
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
              <li
                key={`category${idx}`}
                onClick={() => removeCategory(category)}
              >
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
      <div className="mobile_bg"></div>
    </ProductFilterStyle>
  );
}

const ProductFilterStyle = styled.div`
  position: fixed;
  top: left;
  left: 1vw;
  width: 15vw;
  height: 90vh;
  background-color: #fff;
  z-index: 9999;
  .filter_container {
    margin-top: 20px;
    height: 100%;
    font-weight: 700;
    text-align: center;
    .filter_title {
      user-select: none;
      font-size: 2vw;
      margin-bottom: 1vw;
    }
    .filter_list {
      width: 100%;
      font-size: clamp(12px, 1vw, 20px);
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
        font-size: clamp(12px, 0.7vw, 16px);
        gap: 5px;
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
            padding: 0;
            width: 3vw;
            min-width: 40px;
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
        }
        .color_circle {
          width: 1.5vw;
          min-width: 30px;
          height: 1vw;
          min-height: 20px;
          border: 1px solid #ddd;
          margin: 5px;
        }
        &:hover .color_name {
          display: block;
        }
        .color_name {
          width: 120%;
          color: #000;
          font-weight: 400;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
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
            min-width: 40px;
            height: 2vw;
            min-height: 25px;
            display: flex;
            justify-content: center;
            align-items: center;
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
              cursor: pointer;
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
            min-width: 150px;
            padding: 0.4vw;
            label {
              display: flex;
              align-items: center;
            }
          }
          &.filter_selected {
            li {
              margin-left: 0.6vw;
              font-size: 0.8vw;
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
          grid-auto-rows: 1fr;
          &.filter_selected {
            li {
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
          }
        }
        .filter_snb {
          li {
            text-align: left;
            padding: 0.3vw;
            cursor: default;
            label {
              display: flex;
              align-items: center;
              white-space: nowrap;
              text-overflow: ellipsis;
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
      box-sizing: border-box;
      &:hover {
        background-color: var(--color-red);
        color: #fff;
      }
    }
  }
  @media (max-width: 768px) {
    .filter_container {
      .filter_reset {
        background-color: var(--color-red);
        color: #fff;
        padding: 20px 10px;
        border: none;
      }
    }
  }
`;

export default ProductFilter;
