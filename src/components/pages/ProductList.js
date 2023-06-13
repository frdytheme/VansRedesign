import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ProductFilter from "./ProductFilter";
import axios from "axios";

function ProductList() {
  const [product, setProduct] = useState([]);
  const PUBLIC = process.env.PUBLIC_URL;

  const getProduct = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/product");
      setProduct(response.data);
      console.log(product);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <ProductListStyle>
      <ProductFilter />
      {product.map((item) => (
        <figure className="product_box" key={item.model}>
          <div className="img_wrapper">
            <img
              src={PUBLIC + `./images/product/${item.model}/${item.model}_${item.model}_primary.jpg`}
              alt="제품 대표 사진"
              className="product_img"
            />
          </div>
          <figcaption className="product_caption">
            <p className="product_name">{item.name}</p>
            <p className="product_price">{item.price + "원"}</p>
          </figcaption>
        </figure>
      ))}
    </ProductListStyle>
  );
}

const ProductListStyle = styled.div`
  position: relative;
  background-color: #fff;
  margin-top: 100px;
  padding: 60px 150px;
  overflow: auto;
  display: flex;
  flex-wrap: wrap;
  gap: 2%;
  justify-content: center;
  &::-webkit-scrollbar {
    width: 0px;
  }
  .product_box {
    width: 20%;
    text-align: center;
    margin-top: 30px;
    position: relative;
  }
  .img_wrapper {
    background-color: orange;
    position: relative;
    &:hover {
      background-color: #000;
    }
  }
  .product_img {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    object-fit: cover;
    border-radius: 20px;
    cursor: pointer;
    vertical-align: bottom;
  }
  .product_caption {
    margin-top: 20px;
  }
  .product_name {
    cursor: pointer;
  }
  .product_price {
    margin-top: 15px;
    color: #555;
  }
`;

export default ProductList;
