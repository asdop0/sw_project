// src/store/Store.jsx
import React, { useState,useEffect } from "react";
import ProductCard from "./ProductCard";
import "./Store.css";
import ImageSlider from "./ImageSlider";
import ProductApiClient from "../services/store/ProductApiClient";
import { Link } from "react-router-dom";

const Store = () => {

  const [selectedCategory, setSelectedCategory] = useState(0);
  const [products, setProducts] = useState(null);
  const [pageRefresh, setPageRefresh] = useState(true);
  const [role, setRole] = useState(null);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  useEffect(() => {
    setRole(localStorage.getItem('role'));
    if(selectedCategory === 0) {
      ProductApiClient.getProductList().then(res => {
        if(res.ok) {
          res.json().then(json => {
            if(json.code === "401") {
              //요청 오류
              console.log(json.message);
            } else {
              //상품 데이터 불러오기 성공
              setProducts(json);
            }
          });
        }
      });
    } else {
      ProductApiClient.getCategoryList(selectedCategory).then(res => {
        if(res.ok) {
          res.json().then(json => {
            if(json.code === "401") {
              //요청 오류
              console.log(json.message);
            } else {
              //상품 데이터 불러오기 성공
              setProducts(json);
            }
          });
        }
      });
    }
  }, [selectedCategory, pageRefresh]);

  return (
    <div className="store_container">
      {/* <h3 className="store-title">스토어</h3> */}
      {/* 이미지 슬라이더 추가 */}
      <ImageSlider />

      <div className="category_filter">
        <button onClick={() => handleCategoryChange(0)}>전체</button>
        <button onClick={() => handleCategoryChange(1)}>캠핑가구</button>
        <button onClick={() => handleCategoryChange(2)}>텐트</button>
        <button onClick={() => handleCategoryChange(3)}>푸드</button>
        <button onClick={() => handleCategoryChange(4)}>DIY</button>
        <Link to={'/storesearch'}>
        <button>검색</button>
        </Link>
        {(role === 'ROLE_ADMIN') && (<Link to={`/product/register`}>
         <button className='camping_plus'>
          <img 
            className='plus'
            src="/plus.png" 
            alt="등록 버튼"
          />
          </button>
          </Link>)}

      </div>

      {/* 각 카테고리에서 조회, 찜, 구매(취소 시 -count) 순으로 dropdown 만들고 정렬 */}

      <div className="product_list">
        {products && products.map((product) => (
          <div className="product_card_wrapper" key={product.id}>
          <ProductCard key={product.id} product={product} setPageRefresh={setPageRefresh}/>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Store;
