import React, { useState } from "react";
import { useParams } from "react-router-dom";
import SignApiClient from "../services/auth/SignApiClient";
import { useNavigate } from 'react-router-dom';
import OrderApiClient from "../services/store/OrderApiClient";

const CancelOrder = () => {
    const { id } = useParams();
  // 각 입력값을 상태로 관리
  const [reason, setReason] = useState('');
  const navigate = useNavigate(); // useNavigate 사용

  const handleCancelOrder = () => {
    SignApiClient.loginCheck();
    const accessToken = localStorage.getItem('accessToken');
    OrderApiClient.cancelOrder(accessToken, id, reason)
      .then((res) => {
        if (res.ok) {
          alert("주문 취소를 신청하였습니다.");
          navigate('/');
        } else {
          console.error("Failed to cancel order.");
        }
      })
      .catch((err) => console.error(err));
  };


  return (
    <div className="camping_register">
      <h2>주문 취소</h2>
      <input
        className="camping_register_name"
        placeholder="취소 사유"
        type="text"
        value={reason}
        onChange={(e) => setReason(e.target.value)}
      />
      <button onClick={handleCancelOrder}>확인</button>
      <button onClick={() => navigate('/')}>닫기</button>
    </div>
  );
};

export default CancelOrder;
