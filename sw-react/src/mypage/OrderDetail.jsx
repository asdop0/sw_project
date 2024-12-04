import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import SignApiClient from "../services/auth/SignApiClient";
import OrderApiClient from "../services/store/OrderApiClient";
import "./OrderDetail.css";

const OrderDetail = () => {
  const { id, cancel } = useParams();
  const [order, setOrder] = useState(null);

  // API 호출
  useEffect(() => {
    SignApiClient.loginCheck();
    const accessToken = localStorage.getItem("accessToken");
    OrderApiClient.viewOrderDetail(accessToken, id).then((res) => {
      if (res.ok) {
        res.json().then((json) => {
          if (json.code === "401") {
            // 요청 오류
            console.log(json.message);
          } else {
            setOrder(json);
          }
        });
      }
    });
  }, [id]);

  return order ? (
    <div className="order_detail_container">
      <h1 className="order_detail_title">주문 상세</h1>

      <div className="order_section">
        <div className="product_info">
          <p>상품명: {order.productName}</p>
          <p>수량: {order.cnt}개</p>
          <p>가격: {order.price.toLocaleString()}원</p>
        
        </div>
      </div>
      <hr className="divider" />

      <div className="order_section">
        <h3 className="order_section_reciver">받는 사람 정보</h3>
        <div className="recipient_info">
          <p>이름: {order.name}</p>
          <p>전화번호: {order.phonenumber}</p>
          <p>주소: {order.addr}</p>
          <p>요청사항: {order.req || "없음"}</p>
        </div>
      </div>
      <hr className="divider" />

      <div className="order_section">
        <h3 className="order_section_payment">결제 정보</h3>
        <div className="payment_info">
          <p>총 결제 금액: {order.price.toLocaleString()}원</p>
        </div>
      </div>
      <hr className="divider" />

      {cancel === "1" && (
        <div className="order_section">
          <Link to={`/cancelorder/${order.id}`} className="cancel_link">
            <button className="cancel_button">주문 취소</button>
          </Link>
        </div>
      )}
    </div>
  ) : (
    <p>주문 정보를 불러오는 중입니다...</p>
  );
};

export default OrderDetail;
