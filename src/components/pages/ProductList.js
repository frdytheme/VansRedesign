import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import ProductFilter from "./ProductFilter";
import ProductBox from "./ProductBox";
import authApi from "../../assets/api/authApi";
import Pfunction from "../../assets/module/Pfunction";
import LoadingBox from "../LoadingBox";
import { useMediaQuery } from "react-responsive";
import filterData from "../../assets/DB/filterData";

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
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [product, setProduct] = useState([]);
  const [filteredProduct, setFilteredProduct] = useState([]);
  const filteredUrl = useRef("");
  const [lastPage, setLastPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const nowPage = useRef(1);
  const search = useRef([]);
  const [loadedColor, setLoadedColor] = useState([]);
  const [loadedSize, setLoadedSize] = useState([]);
  const [loadedPrice, setLoadedPrice] = useState([]);
  const [loadedCategory, setLoadedCategory] = useState([]);
  const [colorFilter, setColorFilter] = useState([]);
  const [sizeFilter, setSizeFilter] = useState([]);
  const [priceFilter, setPriceFilter] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState([]);
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
  const [filterOpen, setFilterOpen] = useState(false);

  const getColor = () => {
    setLoadedColor(filterData.colorList);
  };

  const getSize = () => {
    setLoadedSize(Object.values(filterData.sizeList).flat());
  };

  const getPrice = () => {
    const priceInfo = filterData.priceList.map(
      (item) =>
        (item = {
          ...item,
          txt:
            item.min.toLocaleString("kr-KR") +
            "원~" +
            item.max.toLocaleString("kr-KR") +
            "원",
          checked: false,
        })
    );
    setLoadedPrice(priceInfo);
  };

  const getCategory = () => {
    const categoryList = [
      "클래식플러스",
      "클래식",
      "스케이트 슈즈",
      "키즈",
      "토들러",
      "탑&티셔츠",
      "플리스",
      "하의",
      "가방",
      "모자",
      "양말",
      "서프",
      "아우터",
      "기타",
      "원피스&하의",
      "보이즈",
    ];
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

  const getProduct = useCallback(async () => {
    setLoading(true);
    try {
      const response = await authApi.get(
        `/product?page=1&mainCategory=${encodeListName}&name=${searchName}`
      );
      const { products, totalPages } = response.data;
      setLastPage(totalPages);
      setProduct(products);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [encodeListName, searchName, setLastPage, setProduct, setLoading]);

  const resetScroll = () => {
    const container = document.querySelector("#product_container");
    container.scroll(0, 0);
  };

  useEffect(() => {
    getProduct();
    nowPage.current = 1;
    resetScroll();
  }, [listName, submitBtn, getProduct]);

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
      setLoading(true);
      try {
        const response = await authApi.get(filteredUrl.current);
        const { products, totalPages } = response.data;
        setFilteredProduct(products);
        setLastPage(totalPages);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
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
    resetScroll();
    // eslint-disable-next-line
  }, [filterList, filterToggle]);

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    const boxHeight = scrollHeight - clientHeight;
    const truncScrollTop = Math.trunc(scrollTop);

    // 제품 추가 로드 함수
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
      } finally {
        setLoading(false);
      }
    };

    // 필터된 제품 추가 로드 함수
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
      } finally {
        setLoading(false);
      }
    };
    if (
      truncScrollTop >= boxHeight - 1 &&
      nowPage.current < lastPage &&
      (product.length === nowPage.current * 25 ||
        filteredProduct.length === nowPage.current * 25)
    ) {
      setLoading(true);
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

  const removeColor = (color) => {
    const remainingColor = colorFilter.filter((item) => item !== color);
    const returnColor = [...loadedColor, color].sort((a, b) => a.no - b.no);
    setLoadedColor(returnColor);
    setColorFilter(remainingColor);
    setFilterList((prev) => ({
      ...prev,
      color: prev.color.filter((item) => item !== color.name),
    }));
  };

  const removePrice = () => {
    loadedPrice.forEach((item) => (item.checked = false));
    setPriceFilter([]);
    setFilterList((prev) => ({
      ...prev,
      price: [],
    }));
  };

  const removeCategory = (category) => {
    loadedCategory.forEach(
      (item) => category.name === item.name && (item.checked = false)
    );

    setCategoryFilter((prev) => prev.filter((item) => item !== category));
    setFilterList((prev) => ({
      ...prev,
      category: prev.category.filter((item) => item !== category.name),
    }));
  };

  const removeSize = (e) => {
    const sizeSnb = document.querySelectorAll(
      ".filter_list.size .filter_snb li"
    );
    const size = e.target.textContent;
    const remainingSize = sizeFilter.filter((item) => item !== size);
    setSizeFilter(remainingSize);
    setFilterList((prev) => ({
      ...prev,
      size: prev.size.filter((item) => item !== size),
    }));
    sizeSnb.forEach((item) =>
      item.textContent === size ? item.classList.remove("disabled") : false
    );
  };

  // -----------------Mobile------------------------

  const openFilter = () => {
    if (filterOpen) return setFilterOpen(false);

    setFilterOpen(true);
  };

  const closeFilter = () => {
    setFilterOpen(false);
  };

  const removeFilterItem = (e, list, item) => {
    const key = Object.keys(filterList)
      .filter((key) => filterList[key] === list)
      .join("");
    if (item) {
      const removeFilter = filterList[key].filter((value) => value !== item);
      setFilterList((prev) => ({ ...prev, [key]: removeFilter }));
      switch (key) {
        case "color":
          const color = colorFilter.filter((val) => val.name === item)[0];
          removeColor(color);
          break;
        case "size":
          removeSize(e);
          break;
        case "category":
          const category = categoryFilter.filter((val) => val.name === item)[0];
          removeCategory(category);
          break;
        default:
          return;
      }
    } else {
      const box = document.querySelector(".product_filter");
      openFilter();
      box.scrollTop = box.scrollHeight;
    }
  };

  return (
    <ProductListStyle onScroll={handleScroll} id="product_container">
      <ProductFilter
        filterList={filterList}
        setFilterList={setFilterList}
        filterToggle={filterToggle}
        setFilterToggle={setFilterToggle}
        listName={listName}
        submitBtn={submitBtn}
        loadedColor={loadedColor}
        loadedSize={loadedSize}
        loadedPrice={loadedPrice}
        loadedCategory={loadedCategory}
        setLoadedColor={setLoadedColor}
        colorFilter={colorFilter}
        setColorFilter={setColorFilter}
        sizeFilter={sizeFilter}
        setSizeFilter={setSizeFilter}
        priceFilter={priceFilter}
        setPriceFilter={setPriceFilter}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        removeColor={removeColor}
        removeSize={removeSize}
        removePrice={removePrice}
        removeCategory={removeCategory}
        filterOpen={filterOpen}
      />
      {filterOpen && <div className="filter_bg" onClick={closeFilter}></div>}
      {isMobile && (
        <ul className="filter_bar">
          <li>
            <div className="filtered_list_slide">
              {Object.values(filterList)
                .filter((filter) => filter.length)
                .map((list, idx) => {
                  return list[0].max ? (
                    <ul key={`filterPrice`} className="filtered_list">
                      <li
                        className="filtered_item"
                        onClick={(e) => removeFilterItem(e, list)}
                      >
                        {Math.min(
                          ...list.map((price) => price.min)
                        ).toLocaleString("ko-KR") +
                          "~" +
                          Math.max(
                            ...list.map((price) => price.max)
                          ).toLocaleString("ko-KR") +
                          "원"}
                      </li>
                    </ul>
                  ) : (
                    <ul key={`filter${idx}`} className="filtered_list">
                      {list.map((item, index) => (
                        <li
                          className="filtered_item"
                          onClick={(e) => removeFilterItem(e, list, item)}
                          key={`filteredItem${index}`}
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  );
                })}
            </div>
          </li>
          <li
            className={`filter_icon filter_btn ${filterOpen ? " active" : ""}`}
            onClick={openFilter}
          >
            <span className="material-symbols-outlined">tune</span>
          </li>
        </ul>
      )}
      <div className="flex_container">
        {loading && (
          <div className="loading_state">
            <LoadingBox />
          </div>
        )}
        {product.length === 0 || filteredProduct.length === 0 ? (
          <div className="empty_alert">
            <p>찾으시는 상품 정보가 존재하지 않습니다.</p>
            <div className="view_all" onClick={() => setListName("")}>
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
  .loading_state {
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(255, 255, 255, 0.5);
    position: fixed;
    z-index: 999;
  }
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
    margin-left: 17.5vw;
    padding-bottom: 4vw;
    display: grid;
    grid-template-columns: repeat(5, 15vw);
    grid-auto-rows: 1fr;
    gap: 1vw;
    margin-top: 2vw;
    position: relative;
    .empty_alert {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      padding-top: 5vw;
      font-size: clamp(16px, 1vw, 24px);
      color: #444;
      display: flex;
      flex-flow: column;
      align-items: center;
      .view_all {
        margin: 20px;
        text-align: center;
        font-size: clamp(16px, 1.3vw, 24px);
        border-radius: 0.5vw;
        font-weight: bold;
        color: #fff;
        padding: 1.6vw 1.2vw;
        background-color: var(--color-red);
        display: flex;
        justify-content: center;
        align-items: center;
        &:hover {
          background-color: black;
          cursor: pointer;
        }
      }
    }
  }
  @media (max-width: 1200px) {
    .flex_container {
      grid-template-columns: repeat(4, 19.3vw);
      .img_wrapper {
        height: 19vw;
      }
    }
  }
  @media (max-width: 768px) {
    .filter_bg {
      background-color: rgba(0, 0, 0, 0.5);
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 999;
    }
    .filter_bar {
      border-bottom: 1px solid #777;
      background-color: #fff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 50px;
      position: sticky;
      top: 0;
      left: 0;
      width: 100%;
      z-index: 99;
      padding: 0 10px;
      box-sizing: border-box;
      overflow-x: auto;
      .filtered_list_slide {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: 10px;
        .filtered_list {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 10px;
          .filtered_item {
            border-radius: 7px;
            padding: 7px;
            font-size: 14px;
            font-weight: 600;
            background-color: #f0f0f0;
            position: relative;
            border: 1px solid #d0d0d0;
            &:after {
              content: "\\2013";
              position: absolute;
              top: -4px;
              right: -6px;
              width: 12px;
              height: 12px;
              line-height: 10px;
              text-align: center;
              font-size: 6px;
              border-radius: 50%;
              background-color: #000;
              background-color: #c70039;
              color: #fff;
            }
          }
        }
      }
      .filter_icon {
        border: 1px solid #000;
        border-radius: 7px;
        display: flex;
        justify-content: center;
        align-items: center;
        span {
          font-size: 30px;
          font-weight: bold;
        }
        &.active {
          color: #fff;
          background-color: #000;
        }
      }
    }
    .product_filter {
      width: 300px;
      height: calc(100vh - 70px);
      left: -100%;
      overflow: auto;
      padding: 0 5px;
      border-right: 1px solid #000;
      transition: 0.5s;
      &.active {
        left: 0;
      }
      .filter_container {
        height: auto;
        margin: 0;
        z-index: 999;
        padding: 10px 0;
        .filter_title {
          display: none;
        }
        .filter_list {
          width: 100%;
          overflow: hidden;
          padding-bottom: 10px;
          .list_name {
            height: 40px;
          }
          .filter_item {
            width: 100%;
            box-sizing: border-box;
            &.filter_selected {
              display: none;
            }
            &.filter_snb {
              width: 100%;
              position: relative;
              top: 0;
              left: 0;
              visibility: visible;
              display: flex;
              border: none;
              flex-direction: row;
              flex-wrap: wrap;
              justify-content: start;
              align-items: center;
              gap: 1.5vw;
              li {
                width: auto;
                height: auto;
                font-size: 12px;
              }
            }
          }
          &.color {
            li {
              .color_circle {
                width: 6vw;
                height: 6vw;
              }
              .color_name {
                display: none;
              }
            }
          }
          &.size {
            .filter_snb {
              li {
                min-width: 6vw;
                max-width: auto;
                height: 6vw;
                line-height: 6vw;
                padding: 0.5vw 1vw;
              }
            }
          }
        }
      }
    }
    .flex_container {
      width: 100%;
      grid-template-columns: repeat(3, 30vw);
      margin: 0;
      padding-top: 3vw;
      place-content: center;
      .img_wrapper {
        height: 31vw;
      }
      .product_caption {
        font-size: 13px;
        gap: 7px;
        .new_arrival {
          font-size: 11px;
        }
      }
      .empty_alert {
        .view_all {
          padding: 15px 7px;
        }
      }
    }
  }
`;

export default ProductList;
