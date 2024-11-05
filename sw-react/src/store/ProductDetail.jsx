// src/components/ProductDetail.jsx
import React from "react";
import { useParams } from "react-router-dom";
import "./Store.css";

const ProductDetail = () => {
  const { id } = useParams();
  // 실제 프로젝트에서는 상품 데이터를 API로부터 가져옵니다.
  const product = { id: id, name: `상품 ${id}`, price: id * 10000, image: `product${id}.jpg`, description: `상품 ${id}의 설명` };

  return (
    <div className="product_detail">
      <img src={product.image} alt={product.name} className="product_image" />
      <h2 className="product_name">{product.name}</h2>
      <p className="product_price">{product.price} 원</p>
    </div>
  );
};

export default ProductDetail;
