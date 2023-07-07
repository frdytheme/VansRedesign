import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import ProductFilter from "./ProductFilter";
import axios from "axios";

function ProductList({ listName }) {
  const [product, setProduct] = useState([]);
  const [filteredProduct, setFilteredProduct] = useState([]);
  const [lastPage, setLastPage] = useState(0);
  const nowPage = useRef(1);
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
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  // useEffect(() => {
  //   filterList.colorFilter = filterList.color.length > 0 ? true : false;
  //   filterList.sizeFilter = filterList.size.length > 0 ? true : false;
  //   filterList.priceFilter = filterList.price.length > 0 ? true : false;
  //   filterList.categoryFilter = filterList.category.length > 0 ? true : false;

  //   const isChange =
  //     filterList.colorFilter || filterList.sizeFilter || filterList.priceFilter || filterList.categoryFilter;
  //   setFilterToggle(isChange);

  //   const filterSingle = Object.values(filterList).filter((item) => item === true).length === 1;

  //   let min = Math.min(...filterList.price.map((item) => item.min));
  //   let max = Math.max(...filterList.price.map((item) => item.max));

  //   if (filterSingle) {
  //     setFilteredProduct(
  //       product.filter(
  //         (item) =>
  //           filterList.color.includes(item.color) ||
  //           filterList.category.includes(item.category) ||
  //           filterList.size.includes(item.size) ||
  //           (item.price * 1 >= min && item.price * 1 <= max)
  //       )
  //     );
  //   } else {
  //     let filtered = [...product];
  //     if (filterList.colorFilter) {
  //       filtered = filtered.filter((item) => filterList.color.includes(item.color));
  //     }
  //     if (filterList.sizeFilter) {
  //       filtered = filtered.filter((item) => filterList.size.includes(item.size));
  //     }
  //     if (filterList.priceFilter) {
  //       filtered = filtered.filter((item) => min <= item.price * 1 && item.price * 1 <= max);
  //     }
  //     if (filterList.categoryFilter) {
  //       filtered = filtered.filter((item) => filterList.category.includes(item.category));
  //     }
  //     setFilteredProduct(filtered);
  //   }
  //   console.log(product);
  // }, [filterList, filterToggle]);

  useEffect(() => {
    filterList.colorFilter = filterList.color.length > 0 ? true : false;
    filterList.sizeFilter = filterList.size.length > 0 ? true : false;
    filterList.priceFilter = filterList.price.length > 0 ? true : false;
    filterList.categoryFilter = filterList.category.length > 0 ? true : false;

    const isChange =
      filterList.colorFilter || filterList.sizeFilter || filterList.priceFilter || filterList.categoryFilter;
    setFilterToggle(isChange);
    const { color, price, size, category, colorFilter, sizeFilter, priceFilter, categoryFilter } = filterList;
    const search = [];
    if (colorFilter) search.push(`color=${color.join(",")}`);
    if (sizeFilter) search.push(`size=${size.join(",")}`);
    if (priceFilter) {
      let min = Math.min(...price.map((item) => item.min));
      let max = Math.max(...price.map((item) => item.max));
      search.push(`price=${min + "," + max}`);
    }
    if (categoryFilter) search.push(`category=${category.join(",")}`);
    const url = `http://localhost:5000/api/product?${search.join("&")}`;
    console.log(url);

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
    if (truncScrollTop >= boxHeight - 1 && nowPage.current <= lastPage && product.length === nowPage.current * 25) {
      nowPage.current = nowPage.current + 1;
      addProduct();
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
