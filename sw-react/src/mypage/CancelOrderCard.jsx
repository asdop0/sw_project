import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./MyPage.css";

const CancelOrderCard = ({ order }) => {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    switch (order.status) {
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
        <p className="cancle_product_name">{order.productName}</p>
        <p className="product_price">{order.totalPrice}원</p>
        <p className="product_price">{status}</p>
        <p className="product_price">{order.writeDate.split('T')[0]}</p>
        <Link to={`/cancelorder/detail/${order.id}`} className="camping_details_link">
            <button className="product_cancle_detail">상세보기</button>
        </Link>
    </div>
  );
};

export default CancelOrderCard;
