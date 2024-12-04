import React, { useState, useEffect } from 'react';
import SignApiClient from "../services/auth/SignApiClient";
import CancelOrderCard from './CancelOrderCard';
import OrderApiClinet from '../services/store/OrderApiClient';

const MyCancelOrder = () => {
    const [orders, setOrders] = useState(null);
    useEffect(() => {
        SignApiClient.loginCheck();
        const accessToken = localStorage.getItem('accessToken');
        OrderApiClinet.getCencelList(accessToken).then(res => {
        if(res.ok) {
            res.json().then(json => {
            if(json.code === "401") {
                //요청 오류
                console.log(json.message);
            } else {
                if (Object.keys(json).length === 0) {
                    setOrders(null);
                } else {
                    setOrders(json);
                }
            }
            });
        }
        });
      });

    return (
        <div className="camping_bookmark_container">
            <h3>취소내역</h3>

            <div className="camping_empty_state">
                {!orders && (
                    <p>취소 내역이 없습니다.</p>
                )}
            </div>

            <div className='camping_cards_container'>
                {orders && orders.map((order) => (
                <div className="camping_card_wrapper" key={order.id}>
                <CancelOrderCard key={order.id} order={order}/>
                </div>
                ))}
            </div>
        </div>
    );
};

export default MyCancelOrder;
