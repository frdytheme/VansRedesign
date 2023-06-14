import React, { useEffect, useState } from "react";
import styled from "styled-components";

function ProductFilter({ product }) {
  const [loadedColor, setloadedColor] = useState([]);

  const colorList = [
    { name: "블루", code: "#2F58CD" },
    { name: "화이트", code: "#fff" },
    { name: "블랙", code: "#000" },
    { name: "옐로우", code: "#FFE569" },
    { name: "차콜", code: "#454545" },
    { name: "그레이", code: "#B2B2B2" },
    { name: "샌드", code: "#D8C4B6" },
    { name: "그린", code: "#54B435" },
    { name: "네이비", code: "#0E2954" },
    { name: "브라운", code: "#884A39" },
    { name: "크림화이트", code: "#F9FBE7" },
    { name: "레드", code: "#B31312" },
    { name: "올리브", code: "#898121" },
    { name: "핑크", code: "#FFAAC9" },
    { name: "퍼플", code: "#8B1874" },
    { name: "카키", code: "#83764F" },
    { name: "오렌지", code: "#FF8551" },
    { name: "스카이블루", code: "#9AC5F4" },
  ];

  const sizeList = {
    shoes: [210, 215, 220, 225, 230, 235, 240, 245, 250, 255, 260, 265, 270, 275, 280, 285, 290, 295, 300, 310],
    clothes: ["XXS", "XS", "S", "M", "L", "XL", "XXL"],
    kids: [4, 5, 6, 7],
    inches: [29, 30, 31, 32, 33, 34, 36],
    free: "FREE",
  };

  const allSizeList = Object.values(sizeList).flat();

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
    setloadedColor(currentColor);
  };

  useEffect(() => {
    getColor();
  }, [product]);
  return (
    <ProductFilterStyle>
      <ul className="product_filter">
        <li className="filter_title">FILTER</li>
        <li className="filter_category color">
          <p className="category_title">
            COLOR
            <span className="material-symbols-outlined expand_btn">expand_more</span>
          </p>
          <ul className="filter_item">
            {loadedColor.map((color, idx) => (
              <li key={idx}>
                <div className="color_circle" style={{ backgroundColor: `${color.code}` }} colorName={color.name}></div>
                {/* <p className="color_name">{color.name}</p> */}
              </li>
            ))}
          </ul>
        </li>
        <li className="filter_category size">
          <p className="category_title">
            SIZE
            <span className="material-symbols-outlined expand_btn">expand_more</span>
          </p>
          <ul className="filter_item">
            {allSizeList.map((size, idx) => (
              <li key={idx}>{size}</li>
            ))}
          </ul>
        </li>
        <li className="filter_category">
          <p className="category_title">
            PRICE
            <span className="material-symbols-outlined expand_btn">expand_more</span>
          </p>
        </li>
        <li className="filter_category">
          <p className="category_title">
            CATEGORY
            <span className="material-symbols-outlined expand_btn">expand_more</span>
          </p>
        </li>
        <li className="filter_category">
          <p className="category_title">
            SHOES MODEL
            <span className="material-symbols-outlined expand_btn">expand_more</span>
          </p>
        </li>
      </ul>
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
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
  border-radius: 20px;
  z-index: 9999;
  .product_filter {
    margin-top: 20px;
    height: 100%;
    font-weight: 700;
    text-align: center;
    font-family: "GoAround", serif;
    padding: 1vw;
    .filter_title {
      font-size: 2vw;
      margin-bottom: 40px;
    }
    .filter_category {
      font-size: 1vw;
      border-bottom: 1px solid #000;
      padding: 10px 0;
      overflow: hidden;
      .category_title {
        cursor: pointer;
        position: relative;
        .expand_btn {
          position: absolute;
          top: 0;
          right: 0;
        }
      }
      .more_btn {
        font-size: 13px;
        cursor: pointer;
      }
      &.color .filter_item {
        li {
          margin: 0.3vw;
          cursor: pointer;
          position: relative;
          .color_circle {
            width: 2vw;
            height: 2vw;
            border: 1px solid #ddd;
            border-radius: 50%;
          }
          &:hover .color_name {
            display: block;
          }
          .color_name {
            font-size: 0.7vw;
            padding: 10px 5px;
            position: absolute;
            top: -2vw;
            left: 50%;
            transform: translateX(-50%);
            background-color: #222;
            color: #fff;
            font-weight: 300;
            display: none;
            transition: 0.4s;
            user-select: none;
          }
        }
      }
      &.size {
        .filter_item {
          li {
            overflow: hidden;
            font-family: "Pretendard", sans-serif;
            font-size: 14px;
            width: 3vw;
            height: 2vw;
            border-radius: 7px;
            line-height: 2vw;
            border: 1px solid #d6d6d6;
            margin: 0.2vw;
          }
        }
      }
    }
    .filter_item {
      margin: 1vw;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }
  }
`;

export default ProductFilter;
