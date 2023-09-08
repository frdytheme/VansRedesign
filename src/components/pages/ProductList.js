import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import ProductFilter from "./ProductFilter";
import ProductBox from "./ProductBox";
import authApi from "../../assets/api/authApi";
import Pfunction from "../../assets/module/Pfunction";

function ProductList({
  listName,
  setListName,
  searchName,
  submitBtn,
  setProductInfo,
  setDetailBtn,
  closeCartAlarm,
}) {
  const encodeListName = encodeURIComponent(listName);
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

  const getProduct = async () => {
    try {
      const response = await authApi.get(
        `/product?page=1&mainCategory=${encodeListName}&name=${searchName}`
      );
      const { products, totalPages } = response.data;
      setLastPage(totalPages);
      setProduct(products);
    } catch (error) {
      console.error(error);
    }
  };
  const resetScroll = () => {
    const container = document.querySelector("#product_container");
    container.scroll(0, 0);
  };

  useEffect(() => {
    getProduct();
    nowPage.current = 1;
    resetScroll();
  }, [listName, submitBtn]);

  useEffect(() => {
    search.current = [];
    nowPage.current = 1;

    filterList.colorFilter = filterList.color.length > 0 ? true : false;
    filterList.sizeFilter = filterList.size.length > 0 ? true : false;
    filterList.priceFilter = filterList.price.length > 0 ? true : false;
    filterList.categoryFilter = filterList.category.length > 0 ? true : false;

    const isChange =
      filterList.colorFilter ||
      filterList.sizeFilter ||
      filterList.priceFilter ||
      filterList.categoryFilter;

    setFilterToggle(isChange);

    const {
      color,
      price,
      size,
      category,
      colorFilter,
      sizeFilter,
      priceFilter,
      categoryFilter,
    } = filterList;

    if (colorFilter) {
      search.current.push(`color=${color.join(",")}`);
    }

    if (sizeFilter) search.current.push(`size=${size.join(",")}`);

    if (priceFilter) {
      let min = Math.min(...price.map((item) => item.min));
      let max = Math.max(...price.map((item) => item.max));
      search.current.push(`price=${min + "," + max}`);
    }

    if (categoryFilter) {
      const replaceCategory = category
        .map((category) => category.split("&"))
        .flat();
      search.current.push(`category=${replaceCategory.join(",")}`);
    }

    filteredUrl.current = `/product?${search.current.join(
      "&"
    )}&mainCategory=${encodeListName}&name=${searchName}`;
    const fetchFilteredProduct = async () => {
      try {
        const response = await authApi.get(filteredUrl.current);
        const { products, totalPages } = response.data;
        setFilteredProduct(products);
        setLastPage(totalPages);
      } catch (err) {
        console.error(err);
      }
    };

    fetchFilteredProduct();

    if (!filterToggle) {
      nowPage.current =
        product.length === 0
          ? 1
          : product.length / 25 < 1
          ? 1
          : product.length / 25;
    }
  }, [filterList, filterToggle]);

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    const boxHeight = scrollHeight - clientHeight;
    const truncScrollTop = Math.trunc(scrollTop);
    const addProduct = async () => {
      try {
        const response = await authApi.get(
          `/product?page=${nowPage.current}&mainCategory=${encodeListName}&name=${searchName}`
        );
        const { products } = await response.data;
        const updateProduct = [...product, ...products];
        setProduct(updateProduct);
      } catch (error) {
        console.error(error);
      }
    };
    const addFilteredProduct = async () => {
      try {
        const response = await authApi.get(
          `/product?${search.current.join("&")}&page=${
            nowPage.current
          }&mainCategory=${encodeListName}&name=${searchName}`
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
      nowPage.current < lastPage &&
      (product.length === nowPage.current * 25 ||
        filteredProduct.length === nowPage.current * 25)
    ) {
      nowPage.current = nowPage.current + 1;
      filterToggle ? addFilteredProduct() : addProduct();
    }
  };

  const selectProduct = (item) => {
    setProductInfo(item);
    setDetailBtn(true);
    Pfunction.updateRecently(item);
    closeCartAlarm();
  };

  return (
    <ProductListStyle onScroll={handleScroll} id="product_container">
      <ProductFilter
        product={product}
        filterList={filterList}
        setFilterList={setFilterList}
        filterToggle={filterToggle}
        setFilterToggle={setFilterToggle}
        listName={listName}
        submitBtn={submitBtn}
      />
      <div className="flex_container">
        {product.length === 0 || filteredProduct.length === 0 ? (
          <div className="empty_alert">
            <p>찾으시는 상품 정보가 존재하지 않습니다.</p>
            <div className="viewAll" onClick={() => setListName("")}>
              전체 상품 보기
            </div>
          </div>
        ) : filterToggle ? (
          filteredProduct.map((item) => (
            <ProductBox
              item={item}
              key={item.model}
              onClick={() => selectProduct(item)}
            />
          ))
        ) : (
          product.map((item) => (
            <ProductBox
              item={item}
              key={item.model}
              onClick={() => selectProduct(item)}
            />
          ))
        )}
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
    .empty_alert {
      width: 100%;
      padding-top: 5vw;
      font-size: 1vw;
      color: #444;
      display: flex;
      flex-flow: column;
      align-items: center;
      .viewAll {
        margin: 2vw;
        text-align: center;
        font-size: 1.3vw;
        border-radius: 0.5vw;
        font-weight: bold;
        color: #fff;
        width: 10vw;
        padding: 2vw 0;
        background-color: var(--color-red);
        &:hover {
          background-color: black;
          cursor: pointer;
        }
      }
    }
  }
`;

export default ProductList;
