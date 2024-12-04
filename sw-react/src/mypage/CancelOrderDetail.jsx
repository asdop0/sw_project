import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SignApiClient from "../services/auth/SignApiClient";
import OrderApiClient from "../services/store/OrderApiClient";
import "./CancleOrderDetail.css";

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
  }, [id]);

  return order ? (
    <div className="order_detail_container">
      <h1 className="cancle_order_detail_title">취소 주문 상세</h1>
      <div className="order_section">
      <h3 className="order_item_info_title" >상품 정보</h3>
        <div className="order_item_info">
          <p>상품명: {order.productName}</p>
          <p>사유: {order.reason}</p>
        </div>
        <hr className="divider" />
        <h3 className="order_item_status_title">상태 정보</h3>
        <div className="order_item_status">
          <p>취소 상태: {status}</p>
          <p>신청 날짜: {order.writeDate.split("T")[0]}</p>
          {order.approvalDate ? (
            <p>승인 날짜: {order.approvalDate.split("T")[0]}</p>
          ) : (
            <p>승인 날짜: 취소 대기 중</p>
          )}
        </div>
        <hr className="divider" />
        <h3 className="order_item_payment_title" >결제 정보</h3>
        <div className="order_item_payment">
          
          <p>취소 금액: {order.totalPrice.toLocaleString()}원</p>
        </div>
      </div>
    </div>
  ) : (
    <p>주문 정보를 불러오는 중입니다...</p>
  );
};

export default OrderDetail;
