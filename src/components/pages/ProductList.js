import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import ProductFilter from "./ProductFilter";
import axios from "axios";

function ProductList() {
  const [product, setProduct] = useState([]);
  const allProduct = useRef([]);
  const [filterList, setFilterList] = useState({ color: [], size: [], price: [], category: [] });
  const [filterToggle, setFilterToggle] = useState(false);
  const PUBLIC = process.env.PUBLIC_URL;
  const newArrivalDate = new Date("2023/06/08").getTime();

  const getProduct = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/product");
      setProduct(response.data);
      allProduct.current = response.data;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  /*

  */
  useEffect(() => {
    if (filterToggle) {
      setProduct(
        allProduct.current.filter(
          (item) => filterList.color.includes(item.color) || filterList.category.includes(item.category)
        )
      );
    } else {
      setProduct(allProduct.current);
    }
    console.log(filterList);
    console.log(product);
    console.log(filterToggle);
  }, [filterList, filterToggle]);
  return (
    <ProductListStyle>
      <ProductFilter
        product={allProduct.current}
        filterList={filterList}
        setFilterList={setFilterList}
        filterToggle={filterToggle}
        setFilterToggle={setFilterToggle}
      />
      <div className="flex_container">
        {product.map((item) => (
          <figure className="product_box" key={item.model}>
            <div className="img_wrapper">
              <img
                src={PUBLIC + `./images/product/${item.model}/${item.model}_${item.model}_primary.jpg`}
                alt="제품 대표 사진"
                className="product_img"
              />
              <img
                src={PUBLIC + `./images/product/${item.model}/${item.model}_${item.model}_02.jpg`}
                alt="제품 대표 사진"
                className="product_img hover"
              />
            </div>
            <figcaption className="product_caption">
              {new Date(item.date).getTime() > newArrivalDate && <p className="new_arrival">NEW ARRIVAL</p>}
              <p className="product_name">{item.name}</p>
              <p className="product_price">{Number(item.price).toLocaleString("ko-KR") + "원"}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </ProductListStyle>
  );
}

const ProductListStyle = styled.div`
  width: 100%;
  position: relative;
  background-color: #fff;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 15px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: var(--color-red);
    background-clip: padding-box;
    border-radius: 10px;
    border: 2px solid transparent;
  }
  .flex_container {
    width: 79vw;
    margin-left: 17.5vw;
    padding-bottom: 80px;
    display: flex;
    flex-wrap: wrap;
    gap: 1vw;
    .product_box {
      width: 15vw;
      text-align: center;
      margin-top: 30px;
      position: relative;
    }
    .img_wrapper {
      height: 15vw;
      position: relative;
      &:hover .product_img.hover {
        opacity: 1;
      }
    }
    .product_img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      object-fit: cover;
      border-radius: 20px;
      cursor: pointer;
      vertical-align: bottom;
      &.hover {
        opacity: 0;
        transition: 0.3s;
      }
    }
    .product_caption {
      margin-top: 20px;
      font-size: 14px;
    }
    .product_name {
      cursor: pointer;
      font-weight: 500;
    }
    .product_price {
      margin-top: 15px;
      color: #555;
    }
    .new_arrival {
      color: var(--color-red);
      font-weight: 800;
      margin-bottom: 15px;
    }
  }
`;

export default ProductList;
