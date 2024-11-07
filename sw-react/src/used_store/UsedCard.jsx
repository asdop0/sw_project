import React from "react";
import "./Used_store.css";

const UsedCard = ({ product }) => {
  return (
    <div className="used_card">
      <img src={product.image} alt={product.name} className="product_image" />
      <div className="product_name">{product.name}</div>
      <div className="product_price">{product.price}원</div>
      <a href={`/product/${product.id}`} className="product_details-link">
        자세히 보기
      </a>
    </div>
  );
};

export default UsedCard;
