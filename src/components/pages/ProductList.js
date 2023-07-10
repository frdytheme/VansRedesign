import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import ProductFilter from "./ProductFilter";
import axios from "axios";

function ProductList({ listName }) {
  const [product, setProduct] = useState([]);
  const [filteredProduct, setFilteredProduct] = useState([]);
  const filteredUrl = useRef("");
  const [lastPage, setLastPage] = useState(0);
  const nowPage = useRef(1);
  const search = useRef([]);
  const [filterList, setFilterList] = useState({
    color: [],
    colorFilter: false,
    size: [],
    sizeFilter: false,
    price: [],
    priceFilter: false,
    category: [],
    categoryFilter: false,
  });
  const [filterToggle, setFilterToggle] = useState(false);
  const PUBLIC = process.env.PUBLIC_URL;
  const newArrivalDate = new Date("2023/06/08").getTime();

  const getProduct = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/product`);
      const { products, totalPages } = response.data;
      setLastPage(totalPages);
      setProduct(products);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  useEffect(() => {
    search.current = [];
    nowPage.current = 1;

    filterList.colorFilter = filterList.color.length > 0 ? true : false;
    filterList.sizeFilter = filterList.size.length > 0 ? true : false;
    filterList.priceFilter = filterList.price.length > 0 ? true : false;
    filterList.categoryFilter = filterList.category.length > 0 ? true : false;

    const isChange =
      filterList.colorFilter || filterList.sizeFilter || filterList.priceFilter || filterList.categoryFilter;

    setFilterToggle(isChange);

    const { color, price, size, category, colorFilter, sizeFilter, priceFilter, categoryFilter } = filterList;

    if (colorFilter) {
      search.current.push(`color=${color.join(",")}`);
    }
    if (sizeFilter) search.current.push(`size=${size.join(",")}`);
    if (priceFilter) {
      let min = Math.min(...price.map((item) => item.min));
      let max = Math.max(...price.map((item) => item.max));
      search.current.push(`price=${min + "," + max}`);
    }
    if (categoryFilter) search.current.current.push(`category=${category.join(",")}`);
    filteredUrl.current = `http://localhost:5000/api/product?${search.current.join("&")}`;
    const fetchFilteredProduct = async () => {
      try {
        const response = await axios.get(filteredUrl.current);
        const { products, totalPages } = response.data;
        setFilteredProduct(products);
        setLastPage(totalPages);
      } catch (err) {
        console.error(err);
      }
    };

    fetchFilteredProduct();

    if (!filterToggle) {
      nowPage.current = product.length / 25;
    }
  }, [filterList, filterToggle]);

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    const boxHeight = scrollHeight - clientHeight;
    const truncScrollTop = Math.trunc(scrollTop);
    const addProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/product?page=${nowPage.current}`);
        const { products } = await response.data;
        const updateProduct = [...product, ...products];
        setProduct(updateProduct);
      } catch (error) {
        console.error(error);
      }
    };
    const addFilteredProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/product?${search.current.join("&")}&page=${nowPage.current}`
        );
        const { products } = await response.data;
        const updateProduct = [...filteredProduct, ...products];
        setFilteredProduct(updateProduct);
      } catch (err) {
        console.error(err);
      }
    };
    if (
      truncScrollTop >= boxHeight - 1 &&
      nowPage.current <= lastPage &&
      (product.length === nowPage.current * 25 || filteredProduct.length === nowPage.current * 25)
    ) {
      nowPage.current = nowPage.current + 1;
      filterToggle ? addFilteredProduct() : addProduct();
    }
  };

  return (
    <ProductListStyle onScroll={handleScroll}>
      <ProductFilter
        product={product}
        filterList={filterList}
        setFilterList={setFilterList}
        filterToggle={filterToggle}
        setFilterToggle={setFilterToggle}
      />
      <div className="flex_container">
        {filterToggle
          ? filteredProduct.map((item) => (
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
            ))
          : product.map((item) => (
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
