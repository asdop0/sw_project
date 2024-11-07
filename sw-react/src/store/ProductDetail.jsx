// src/components/ProductDetail.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Store.css";
import ProductApiClient from "../services/store/ProductApiClient";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  //api 호출
  useEffect(() => {
    ProductApiClient.viewProduct(id).then(res => {
      if(res.ok) {
        res.json().then(json => {
          if(json.code === "401") {
            //요청 오류
            console.log(json.message);
          } else {
            //상품 데이터 불러오기 성공
            setProduct(json);
          }
        });
      }
    });
  }, []);

  return (
    product ? (
      <div className="product_detail">
        {/* <img src={product.image} alt={product.name} className="product_image" /> */}
        <h2 className="product_name">{product.name}</h2>
        <p className="product_price">{product.price} 원</p>
      </div>
    ) : null
  );
};

export default ProductDetail;
