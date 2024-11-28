import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductApiClient from "../services/store/ProductApiClient"; // ProductApiClient로 API 호출
import UserApiClient from "../services/auth/UserApiClient";

const Order = () => {
  const { id } = useParams(); // URL에서 product_id 가져오기
  const [productDetail, setProductDetail] = useState(null); // 상품 상세 데이터를 저장하는 상태

  // 상품 데이터를 가져오는 함수
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken"); // 토큰 가져오기
    ProductApiClient.viewProduct(id) // 상품 상세 API 호출
      .then((res) => {
        if (res.ok) {
          res.json().then((data) => {
            setProductDetail(data); // 상품 상세 데이터 설정
          });
        } else {
          console.error("상품 상세 정보를 불러오는 데 실패했습니다.");
        }
      })
      .catch((err) => console.error("API 호출 실패:", err));
  }, [id]);

  if (!productDetail) return <p>로딩 중...</p>; // 데이터가 로드될 때까지 로딩 메시지 표시

  return (
    <div className="product_detail">
      <h2>상품 정보</h2>
      <p><strong>상품 이름:</strong> {productDetail.name}</p>
      <p><strong>가격:</strong> {productDetail.price} 원</p>

      <button>결제하기</button>

    </div>
  );
};

export default Order;
