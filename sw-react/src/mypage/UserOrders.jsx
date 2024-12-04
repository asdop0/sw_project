import React, { useState, useEffect } from 'react';
import SignApiClient from "../services/auth/SignApiClient";
import UserOrderCard from './UserOrderCard';
import MyPage from "./MyPage";
import AdminApiClient from '../services/store/AdminApiClient';

const UserOrders = () => {
    const [orders, setOrders] = useState(null);
    const [pageRefresh, setPageRefresh] = useState(false);
    useEffect(() => {
        SignApiClient.loginCheck();
        const accessToken = localStorage.getItem('accessToken');
        AdminApiClient.getFullOrderList(accessToken).then(res => {
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
      }, [pageRefresh]);

    return (
        <div className="camping_bookmark_container">
            <MyPage />
            <h3>주문내역</h3>

            <div className="camping_empty_state">
                {!orders && (
                    <p>주문 내역이 없습니다.</p>
                )}
            </div>

            <div className='camping_cards_container'>
                {orders && orders.map((order) => (
                <div className="camping_card_wrapper" key={order.id}>
                <UserOrderCard key={order.id} order={order} setPageRefresh={setPageRefresh}/>
                </div>
                ))}
            </div>
        </div>
    );
};

export default UserOrders;
