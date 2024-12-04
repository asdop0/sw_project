import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import SignApiClient from "../services/auth/SignApiClient";
import CartCard from './CartCard';
import CartApiClient from '../services/store/CartApiClient';
import "./Cart.css";
import AddressApiClient from '../services/store/AddressApiClient';
import MyPage from "./MyPage";
import Delivery_Modal from "../modal/Delivery_Modal";

const Cart = () => {
    const [carts, setCarts] = useState(null);
    const [pageRefresh, setPageRefresh] = useState(false);
    const [total, setTotal] = useState(0);

    const [address, setAddress] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림 상태
    const navigate = useNavigate();

    const openModal = () => setIsModalOpen(true); // 모달 열기
    const closeModal = () => {
        setPageRefresh((prev) => !prev);
        setIsModalOpen(false);} // 모달 닫기


    const handleConfirmOrder = () => {
        if(address === null) {
          alert("기본 배송지를 설정해주세요.");
        } else if(carts === null){
            alert("장바구니에 상품이 없습니다.");
        } else {
          SignApiClient.loginCheck();
          const accessToken = localStorage.getItem("accessToken");
          CartApiClient.paymentCart(accessToken)
            .then((res) => {
              if (res.ok) {
                res.json().then((data) => {
                  if(data.check === "true") {
                    alert("주문되었습니다.");
                    navigate("/store");
                  }
                });
              } else {
                console.error("주문 등록 하는 데 실패했습니다.");
              }
            })
            .catch((err) => console.error("API 호출 실패:", err));
        }
      }

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
        AddressApiClient.getAddress(accessToken)
            .then((res) => {
            if (res.ok) {
                res.json().then((data) => {
                if(data.code === '401') {
                    setAddress(null);
                } else {
                    setAddress(data);
                }
                });
            } else {
                console.error("기본배송지를 불러오는 데 실패했습니다.");
            }
            })
            .catch((err) => console.error("API 호출 실패:", err));
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
            <MyPage />
            <h3 className="cart_text">장바구니</h3>
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

            <div className='camping_cards_container2'>
                <h3 className='Cart_total_price'>총 가격: {total}</h3>
                <button className="cart_buy_button" onClick={handleConfirmOrder}>구매하기</button>
                {address && (<div>
            <h2>배송지 정보</h2>
            <p><strong>받는분 성함:</strong> {address.name}</p>
            <p><strong>주소:</strong> {address.addr}</p>
            <p><strong>받는분 전화번호:</strong> {address.phonenumber}</p>
            <p><strong>요청사항:</strong> {address.req}</p>
            </div>)}
            {!address && (<div>
                <h3>설정된 배송지가 없습니다. 배송지를 설정해주세요.</h3>
            </div>)}
            <div>
            <button className="cart_delivery_button" onClick={openModal}>
                + 배송지 추가
            </button>
            {isModalOpen && <Delivery_Modal onClose={closeModal} />}
            </div>
        </div>   
    </div>
    );
};

export default Cart;
