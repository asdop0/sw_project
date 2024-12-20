import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../store/Store.css";
import BookmarkApiClient from "../services/store/BookmarkApiClient";
import SignApiClient from "../services/auth/SignApiClient";

const ProductBookMarkCard = ({ product, setPageRefresh }) => {
  const [category, setCategory] = useState(0);
  const handleDeleteBookmark = () => {
    SignApiClient.loginCheck();
    const accessToken = localStorage.getItem('accessToken');
    BookmarkApiClient.deleteBookmark(accessToken, product.id).then(res => {
      if(res.ok) {
          res.json().then(json => {
          if(json.code === "401") {
              //요청 오류
              console.log(json.message);
          } else {
            const timer = setTimeout(() => {
              setPageRefresh((prev) => !prev); // 상태 값을 반전시킴
            }, 1500);
            alert("삭제되었습니다.");
            // 컴포넌트 언마운트 시 타이머 정리

            return () => clearTimeout(timer);
              
          }
          });
      }
      });
  }

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
      <button onClick={handleDeleteBookmark}>찜 삭제</button>
    </div>
  );
};

export default ProductBookMarkCard;
