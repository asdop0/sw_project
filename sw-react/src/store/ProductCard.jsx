import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Store.css";

const ProductCard = ({ product }) => {
  const [category, setCategory] = useState(0);
  useEffect(() => {
    switch (product.categoryName) {
      case "캠핑가구":
        setCategory(1);
        break;
      case "텐트":
        setCategory(2);
        break;
      case "푸드":
        setCategory(3);
        break;
      case "보조장비":
        setCategory(4);
        break;
    }
  }, []);
  return (
    <div className="product_card">
      <img src={"/category_" + category + ".jpg"} alt="상품 임시 이미지" className="product_image"/>
      <h3 className="product_name">{product.name}</h3>
      <p className="product_price">{product.price} 원</p>
      <Link to={`/product/${product.id}`} className="product_details_link">
        상세보기
      </Link>
    </div>
  );
};

export default ProductCard;
