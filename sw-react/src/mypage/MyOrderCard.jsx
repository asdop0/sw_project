import React, { useState, useEffect } from "react";
import SignApiClient from "../services/auth/SignApiClient";
import OrderApiClient from "../services/store/OrderApiClient";
import { Link } from "react-router-dom";

const CartCard = ({ order, setPageRefresh }) => {
  const [status, setStatus] = useState(null);
  const handleDeleteOrder = () => {
      SignApiClient.loginCheck();
      const accessToken = localStorage.getItem('accessToken');
      OrderApiClient.deleteOrder(accessToken, order.id).then(res => {
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
        <p className="product_price">{order.productName}</p>
        <p className="product_price">{order.totalPrice}원</p>
        <p className="product_price">{status}</p>
        <p className="product_price">{order.writeDate.split('T')[0]}</p>
        <Link to={`/order/detail/${order.id}`} className="camping_details_link">
            <button>상세보기</button>
        </Link>
        <button onClick={handleDeleteOrder}>삭제</button>
    </div>
  );
};

export default CartCard;
