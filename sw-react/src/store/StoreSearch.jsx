import React, { useState, useEffect } from "react";
import "./StoreSearch.css"; 
import ProductApiClient from "../services/store/ProductApiClient";
import ProductCard from "./ProductCard";

const StoreSearch = () => {
  const [searchString, setSearchString] = useState("");
  const [products, setProducts] = useState(false);
  const [pageRefresh, setPageRefresh] = useState(true);

  useEffect(() => {
    if (searchString) {
      ProductApiClient.getSearchProductList(searchString).then(res => {
        if(res.ok) {
          res.json().then(json => {
            if(json.code === "401") {
              //요청 오류
              console.log(json.message);
            } else {
              //캠핑장 데이터 불러오기 성공
              if(json.length < 1) {
                setProducts(false);
                setSearchString("");
              } else {
                setProducts(json);
                setSearchString("");
              }
            }
          });
        }
      });
    }
  }, [pageRefresh]);

  return (
    <div className="store_search_container">
      <div className="store_search_box">
        <input
          type="text"
          value={searchString}
          onChange={(e) => setSearchString(e.target.value)}
          className="store_search_input"
          placeholder="검색어을 입력하세요."
        />
        <button className="store_search_button" onClick={() => setPageRefresh((prev) => !prev)}>
            <img
                src="search.png"
                className="searchimg"
            ></img>
        </button>
      </div>
      <div >
        {products && products.map((product) => (
          <div className="product_card_wrapper" key={product.id}>
          <ProductCard key={product.id} product={product} setPageRefresh={setPageRefresh}/>
          </div>
        ))}
        {!products && (
          <p>검색 결과가 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default StoreSearch;
