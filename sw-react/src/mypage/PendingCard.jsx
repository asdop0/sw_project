import React, { useState, useEffect } from "react";
import SignApiClient from "../services/auth/SignApiClient";
import OrderApiClient from "../services/store/OrderApiClient";
import AdminApiClient from "../services/store/AdminApiClient";

const CartCard = ({ order, setPageRefresh }) => {
  const [name, setName] = useState('');

  const handleApprovalOrder = () => {
    SignApiClient.loginCheck();
    const accessToken = localStorage.getItem("accessToken");
    AdminApiClient.approvalOrder(accessToken, order.id).then(res => {
        if(res.ok) {
          res.json().then(json => {
            if(json.code === "401") {
              //요청 오류
              console.log(json.message);
            } else {
                const timer = setTimeout(() => {
                    setPageRefresh((prev) => !prev); // 상태 값을 반전시킴
                  }, 1500);
                  alert("승인되었습니다.");
                  // 컴포넌트 언마운트 시 타이머 정리
      
                  return () => clearTimeout(timer); 
            }
          });
        }
    });
  }

  useEffect(() => {
    SignApiClient.loginCheck();
    const accessToken = localStorage.getItem("accessToken");
    OrderApiClient.viewOrderDetail(accessToken, order.id).then(res => {
        if(res.ok) {
          res.json().then(json => {
            if(json.code === "401") {
              //요청 오류
              console.log(json.message);
            } else {
                setName(json.name);
            }
          });
        }
    });
  })

  return (
    
    <div className="Send_note_card">
        <p className="product_price">{order.productName}</p>
        <p className="product_price">{order.totalPrice}원</p>
        <p className="product_price">결제 대기 중</p>
        <p className="product_price">{order.writeDate.split('T')[0]}</p>
        <p className="product_price">{name}</p>
        <button onClick={handleApprovalOrder}>결제 승인</button>
    </div>
  );
};

export default CartCard;
