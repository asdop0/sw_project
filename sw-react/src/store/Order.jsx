import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import OrderApiClient from "../services/store/OrderApiClient"; // OrderApiClient로 API 호출

const Order = () => {
  const { id } = useParams(); // URL에서 order_detail의 ID 가져오기
  const [orderDetail, setOrderDetail] = useState(null); // 주문 상세 데이터를 저장하는 상태

  // order_detail 데이터를 가져오는 함수
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken"); // 토큰 가져오기
    OrderApiClient.viewOrderDetail(accessToken, id)
      .then((res) => {
        if (res.ok) {
          res.json().then((data) => {
            setOrderDetail(data); // 주문 상세 데이터 설정
          });
        } else {
          console.error("주문 상세 정보를 불러오는 데 실패했습니다.");
        }
      })
      .catch((err) => console.error("API 호출 실패:", err));
  }, [id]);

  if (!orderDetail) return <p>로딩 중...</p>; // 데이터가 로드될 때까지 로딩 메시지 표시

  return (
    <div className="order_detail">
      <h2>구매자 정보</h2>
      <p><strong>이름:</strong> {orderDetail.name}</p>
      <p><strong>전화번호:</strong> {orderDetail.phonenumber}</p>
      <p><strong>주소:</strong> {orderDetail.addr}</p>
      <p><strong>배송 요청사항:</strong> {orderDetail.req}</p>

      <h2>상품 정보</h2>
      <p><strong>상품 ID:</strong> {orderDetail.product_id}</p>
      <p><strong>수량:</strong> {orderDetail.cnt}</p>
      <p><strong>가격:</strong> {orderDetail.price} 원</p>

      <h2>결제 정보</h2>
      <p><strong>총 결제 금액:</strong> {orderDetail.price * orderDetail.cnt} 원</p>
    </div>
  );
};

export default Order;
