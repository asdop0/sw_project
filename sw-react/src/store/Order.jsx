import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import ProductApiClient from "../services/store/ProductApiClient"; // ProductApiClient로 API 호출
import AddressApiClient from "../services/store/AddressApiClient";
import SignApiClient from "../services/auth/SignApiClient";
import OrderApiClient from "../services/store/OrderApiClient";
import "./Order.css";

const Order = () => {
  const { id } = useParams(); // URL에서 product_id 가져오기
  const { quantity } = useParams();
  const navigate = useNavigate(); // useNavigate 사용
  const [productDetail, setProductDetail] = useState(null); // 상품 상세 데이터를 저장하는 상태
  const [address, setAddress] = useState(null);

  const handleConfirmOrder = () => {
    if(address === null) {
      alert("기본 배송지를 설정해주세요.");
    } else {
      SignApiClient.loginCheck();
      const accessToken = localStorage.getItem("accessToken");
      OrderApiClient.addOrder(accessToken, id, quantity)
        .then((res) => {
          if (res.ok) {
            res.json().then((data) => {
              if(data.check === "true") {
                alert("주문되었습니다.");
                navigate("/");
              }
            });
          } else {
            console.error("주문 등록 하는 데 실패했습니다.");
          }
        })
        .catch((err) => console.error("API 호출 실패:", err));
    }
  }

  // 상품 데이터를 가져오는 함수
  useEffect(() => {
    SignApiClient.loginCheck();
    const accessToken = localStorage.getItem("accessToken"); // 토큰 가져오기
    ProductApiClient.viewProduct(id) // 상품 상세 API 호출
      .then((res) => {
        if (res.ok) {
          res.json().then((data) => {
            setProductDetail(data); // 상품 상세 데이터 설정
          });
        } else {
          console.error("상품 상세 정보를 불러오는 데 실패했습니다.");
        }
      })
      .catch((err) => console.error("API 호출 실패:", err));
    AddressApiClient.getAddress(accessToken)
    .then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          if(data.code === '401') {
          } else {
            setAddress(data);
          }
        });
      } else {
        console.error("기본배송지를 불러오는 데 실패했습니다.");
      }
    })
    .catch((err) => console.error("API 호출 실패:", err));
  }, [id]);

  if (!productDetail) return <p>로딩 중...</p>; // 데이터가 로드될 때까지 로딩 메시지 표시

  return (
    <div className="order_product_detail">
      <h2>상품 정보</h2>
      <p><strong>상품명:</strong> {productDetail.name}</p>
      <p><strong>가격:</strong> {productDetail.price * quantity} 원</p>
      <br/>
      
      {address && (<div>
        <h2>배송지 정보</h2>
        <p><strong>받는분 성함:</strong> {address.name}</p>
        <p><strong>주소:</strong> {address.addr}</p>
        <p><strong>받는분 전화번호:</strong> {address.phonenumber}</p>
        <p><strong>요청사항:</strong> {address.req}</p>
      </div>)}
      {!address && (<div>
        <h2>설정된 배송지가 없습니다. 배송지를 추가해주세요.</h2>
        </div>)}
      
      <button className="save_button" onClick={handleConfirmOrder}>결제하기</button>
      <div className="item-link-9">
        <Link to={`/product/${id}`}>
          <span>취소</span>
        </Link>
      </div>
      <Link to="/delivery">
        <button className="delivery_button">배송지 추가</button>
      </Link>
    </div>
  );
};

export default Order;
