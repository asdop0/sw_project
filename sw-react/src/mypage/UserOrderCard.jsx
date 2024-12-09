import React, { useState, useEffect } from "react";
import SignApiClient from "../services/auth/SignApiClient";
import { Link } from "react-router-dom";

const UserOrderCard = ({ order }) => {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    SignApiClient.loginCheck();
    switch (order.orderDto.status) {
      case 'PENDING':
        setStatus("결제 대기 중");
        break;
      case 'PAID':
        setStatus("결제 완료");
        break;
      case 'SHIPPED':
        setStatus("배송 중");
        break;
      case 'DELIVERED':
        setStatus("배송 완료");
        break;
      case 'CANCELLED':
        setStatus("주문 취소");
        break;
      default:
        console.log('Unknown');
    }
  })

  return (
    
    <div className="Send_note_card">
        <p className="product_price">{order.orderDto.productName}</p>
        <p className="product_price">{order.orderDto.totalPrice}원</p>
        <p className="product_price">{status}</p>
        <p className="product_price">{order.orderDto.writeDate.split('T')[0]}</p>
        <p className="product_price">{order.userId}</p>
        <Link to={`/order/detail/${order.id}/0`} className="camping_details_link">
            <button>상세보기</button>
        </Link>
    </div>
  );
};

export default UserOrderCard;
