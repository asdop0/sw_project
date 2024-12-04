import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SignApiClient from "../services/auth/SignApiClient";
import OrderApiClient from "../services/store/OrderApiClient";

const OrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState(null);

  //api 호출
  useEffect(() => {
    SignApiClient.loginCheck();
    const accessToken = localStorage.getItem('accessToken');
    OrderApiClient.viewCencelDetail(accessToken, id).then(res => {
      if(res.ok) {
        res.json().then(json => {
          if(json.code === "401") {
            //요청 오류
            console.log(json.message);
          } else {
            setOrder(json);
            switch (json.status) {
              case 'REQUESTED':
                setStatus("취소 대기 중");
                break;
              case 'APPROVED':
                setStatus("취소 승인");
                break;
              case 'REJECTED':
                setStatus("취소 거부");
                break;
              case 'COMPLETED':
                setStatus("취소 완료");
                break;
              default:
                setStatus('Unknown');
            }
          }
        });
      }
    });
  });

  return (
    order ? (
      <div className="board_detail">
        <p className="product_price">상품명: {order.productName}</p>
        <p className="product_price">사유: {order.reason}</p>
        <p className="product_price">{status}</p>
        <p className="product_price">신청 날짜: {order.writeDate.split('T')[0]}</p>
        {order.approvalDate && (<p className="product_price">승인 날짜: {order.approvalDate.split('T')[0]}</p>)}
        {!order.approvalDate && (<p>승인 날짜: 취소 대기 중</p>)}
        <p className="product_price">취소 금액: {order.totalPrice}원</p>
      </div>
    ) : null
  );
};

export default OrderDetail;
