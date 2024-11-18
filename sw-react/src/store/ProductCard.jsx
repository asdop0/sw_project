import React from "react";
import { Link } from "react-router-dom";
import "./Store.css";

const ProductCard = ({ product }) => {
  return (
    <div className="product_card">
      <img src={product.image} alt={product.name} className="product_image"/>
      <h3 className="product_name">{product.name}</h3>
      <p className="product_price">{product.price} 원</p>
      <Link to={`/product/${product.id}`} className="product_details_link">
        상세보기
      </Link>
    </div>
  );
};

export default ProductCard;
