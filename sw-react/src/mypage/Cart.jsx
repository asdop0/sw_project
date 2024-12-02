import React, { useState, useEffect } from 'react';
import SignApiClient from "../services/auth/SignApiClient";
import CartCard from './CartCard';
import CartApiClient from '../services/store/CartApiClient';
import { Link } from "react-router-dom";

const Cart = () => {
    const [carts, setCarts] = useState(null);
    const [pageRefresh, setPageRefresh] = useState(false);
    const [total, setTotal] = useState(0);
    useEffect(() => {
        SignApiClient.loginCheck();
        const accessToken = localStorage.getItem('accessToken');
        CartApiClient.getCartList(accessToken).then(res => {
        if(res.ok) {
            res.json().then(json => {
            if(json.code === "401") {
                //요청 오류
                console.log(json.message);
            } else {
                //캠핑장 데이터 불러오기 성공
                if (Object.keys(json).length === 0) {
                    setCarts(null);
                    setTotal(0);
                } else {
                    setCarts(json);
                }
            }
            });
        }
        });
      }, [pageRefresh]);

    useEffect(() => {
        if (carts && carts.length > 0) {
            const totalPrice = carts.reduce((acc, cart) => acc + cart.price, 0); // 가격 합산
            setTotal(totalPrice);
        } else {
            setTotal(0); // 장바구니가 비어 있을 때는 total을 0으로 설정
        }
    }, [carts]);

    return (
        <div className="camping_bookmark_container">
            <h3>장바구니</h3>
            <h3>총 가격: {total}</h3>
            <Link to={`/`} className="camping_details_link">
                <button>구매하기</button>
            </Link>

            <div className="camping_empty_state">
                {!carts && (
                    <p>등록된 상품이 없습니다.</p>
                )}
            </div>

            <div className='camping_cards_container'>
                {carts && carts.map((cart) => (
                <div className="camping_card_wrapper" key={cart.id}>
                <CartCard key={cart.id} cart={cart} setPageRefresh={setPageRefresh}/>
                </div>
                ))}
            </div>
        </div>
    );
};

export default Cart;
