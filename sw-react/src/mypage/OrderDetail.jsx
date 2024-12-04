import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SignApiClient from "../services/auth/SignApiClient";
import OrderApiClient from "../services/store/OrderApiClient";

const OrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  //api 호출
  useEffect(() => {
    SignApiClient.loginCheck();
    const accessToken = localStorage.getItem('accessToken');
    OrderApiClient.viewOrderDetail(accessToken, id).then(res => {
      if(res.ok) {
        res.json().then(json => {
          if(json.code === "401") {
            //요청 오류
            console.log(json.message);
          } else {
            setOrder(json);
          }
        });
      }
    });
  });

  return (
    order ? (
      <div className="board_detail">
        <h2>상품명 : {order.productName}</h2>
        <h2>가격 : {order.price}</h2>
        <h2>개수 : {order.cnt}</h2>
        <h2>받는분 성함 : {order.name}</h2>
        <h2>주소 : {order.addr}</h2>
        <h2>전화번호 : {order.phonenumber}</h2>
        <h2>상세주소 및 요청사항 : {order.req}</h2>
        <Link to={`/cancelorder/${order.id}`} className="camping_details_link">
            <button>주문 취소</button>
        </Link>
      </div>
    ) : null
  );
};

export default OrderDetail;
