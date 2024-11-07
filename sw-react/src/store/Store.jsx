// src/store/Store.jsx
import React, { useState,useEffect } from "react";
import ProductCard from "./ProductCard";
import { products } from "./data";
import "./Store.css";
import ImageSlider from "./ImageSlider";

const Store = () => {
    //background 제거
    
    // useEffect(() => {
    //     // Store 페이지가 마운트될 때 body에 클래스 추가
    //     document.body.classList.add("store-background-hidden");
        
    //     // Store 페이지가 언마운트될 때 클래스 제거
    //     return () => {
    //       document.body.classList.remove("store-background-hidden");
    //     };
    //   }, []);
    
  const [selectedCategory, setSelectedCategory] = useState("전체");

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const filteredProducts = selectedCategory === "전체"? products   : products.filter((product) => product.category === selectedCategory);

  return (
    <div className="store_container">
      {/* <h3 className="store-title">스토어</h3> */}
      {/* 이미지 슬라이더 추가 */}
      <ImageSlider />

      <div className="category_filter">
        <button onClick={() => handleCategoryChange("전체")}>전체</button>
        <button onClick={() => handleCategoryChange("캠핑가구")}>캠핑가구</button>
        <button onClick={() => handleCategoryChange("텐트")}>텐트</button>
        <button onClick={() => handleCategoryChange("푸드")}>푸드</button>
        <button onClick={() => handleCategoryChange("DIY")}>DIY</button>
      </div>

      {/* 각 카테고리에서 조회, 찜, 구매(취소 시 -count) 순으로 dropdown 만들고 정렬 */}

      <div className="product_list">
        {filteredProducts.map((product) => (
          <div className="product_card_wrapper" key={product.id}>
          <ProductCard key={product.id} product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Store;
