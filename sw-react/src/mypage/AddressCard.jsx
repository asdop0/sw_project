import React, { useState } from "react";
import SignApiClient from "../services/auth/SignApiClient";
import AddressApiClient from "../services/store/AddressApiClient";

const AddressCard = ({ address, setPageRefresh }) => {
  const handleDeleteAddress = () => {
    SignApiClient.loginCheck();
    const accessToken = localStorage.getItem('accessToken');
    AddressApiClient.deleteAddress(accessToken, address.id).then(res => {
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

  const handleSelectAddress = () => {
    SignApiClient.loginCheck();
    const accessToken = localStorage.getItem('accessToken');
    AddressApiClient.choiceAddress(accessToken, address.id).then(res => {
        if(res.ok) {
            res.json().then(json => {
            if(json.code === "401") {
                //요청 오류
                console.log(json.message);
            } else {
              const timer = setTimeout(() => {
                setPageRefresh((prev) => !prev); // 상태 값을 반전시킴
              }, 1500);
              alert("변경되었습니다.");
              // 컴포넌트 언마운트 시 타이머 정리
  
              return () => clearTimeout(timer);
                
            }
            });
        }
    });
  }

  return (
    
    <div className="Send_note_card">
        {(address.choice === 'O') && (<p>기본 배송지</p>)}
        <p className="product_price">받는분 성함: {address.name}</p>
        <p className="product_price">주소: {address.addr}</p>
        <p className="product_price">전화번호: {address.phonenumber}</p>
        <p className="product_price">상세주소 및 요청사항: {address.req}</p>
      
        <button onClick={handleDeleteAddress}>배송지 삭제</button>

        {(address.choice === 'X') && (<button onClick={handleSelectAddress}>기본 배송지 설정</button>)}
    </div>
  );
};

export default AddressCard;
