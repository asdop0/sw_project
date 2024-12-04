import React, { useState } from "react";
import SignApiClient from "../services/auth/SignApiClient";
import CartApiClient from "../services/store/CartApiClient";

const CartCard = ({ cart, setPageRefresh }) => {
    const handleDeleteCart = () => {
        SignApiClient.loginCheck();
        const accessToken = localStorage.getItem('accessToken');
        CartApiClient.deleteCart(accessToken, cart.id).then(res => {
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
    
    <div className="Send_note_card">
        <p className="product_price">받는분 성함: {cart.productName}</p>
        <p className="product_price">갯수 : {cart.cnt}개</p>
        <p className="product_price">가격: {cart.price}원</p>
        <button onClick={handleDeleteCart}>삭제</button>
    </div>
  );
};

export default CartCard;
