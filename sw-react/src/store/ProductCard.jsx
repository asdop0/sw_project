import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Store.css";
import AdminApiClient from "../services/store/AdminApiClient";
import SignApiClient from "../services/auth/SignApiClient";

const ProductCard = ({ product, setPageRefresh }) => {
  const [category, setCategory] = useState(0);
  const [role, setRole] = useState(null);

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
    setRole(localStorage.getItem('role'));
  }, []);

  const handleDeleteProduct = () => {
    SignApiClient.loginCheck();
    const accessToken = localStorage.getItem('accessToken');
    AdminApiClient.deleteProduct(accessToken, product.id).then(res => {
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

  return (
    <div className="product_card">
      <img src={"/category_" + category + ".jpg"} alt="상품 임시 이미지" className="product_image"/>
      <h3 className="product_name">{product.name}</h3>
      <p className="product_price">{product.price} 원</p>
      <Link to={`/product/${product.id}`} className="product_details_link">
        상세보기
      </Link>
      {/* 조건부로 삭제 버튼 활성화 */}
      {(role === 'ROLE_ADMIN') && (
        <button onClick={handleDeleteProduct}>
          삭제
        </button>
      )}
    </div>
  );
};

export default ProductCard;
