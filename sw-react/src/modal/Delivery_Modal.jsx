import React, { useState, useEffect }  from "react";
import "./Delivery_Modal.css";
import Add_Delivery_Modal from "./Add_Delivery_Modal";
import SignApiClient from "../services/auth/SignApiClient";
import AddressApiClient from "../services/store/AddressApiClient";

const Delivery_Modal = ({ onClose }) => {
  const [isAddDeliveryModalOpen, setIsAddDeliveryModalOpen] = useState(false);
  const [addressList, setAddressList] = useState(null);
  const [pageRefresh, setPageRefresh] = useState(true);
  const [addrLength, setAddrLength] = useState(0);

  const openAddDeliveryModal = () => {
    setIsAddDeliveryModalOpen(true);
  };

  const closeAddDeliveryModal = () => {
    setIsAddDeliveryModalOpen(false);
    setPageRefresh((prev) => !prev);
  };

  const handleDeleteAddress = (id) => {
    SignApiClient.loginCheck();
    const accessToken = localStorage.getItem("accessToken");
    AddressApiClient.deleteAddress(accessToken, id).then(res => {
      if(res.ok) {
        res.json().then(json => {
          if(json.code === "401") {
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

  const handleChoiceAddress = (id) => {
    SignApiClient.loginCheck();
    const accessToken = localStorage.getItem("accessToken");
    AddressApiClient.choiceAddress(accessToken, id).then(res => {
      if(res.ok) {
        res.json().then(json => {
          if(json.code === "401") {
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

  useEffect(() => {
    SignApiClient.loginCheck();
    const accessToken = localStorage.getItem("accessToken");
    AddressApiClient.getAddressList(accessToken).then(res => {
      if(res.ok) {
        res.json().then(json => {
          if(json.code === "401") {
            console.log(json.message);
          } else {
            if(json.length === 0) {
              setAddressList(null);
            } else {
              setAddressList(json);
            }
            setAddrLength(json.length);
          }
        });
      }
    });
  }, [pageRefresh])

  return (
    <div className="delivery_modal_overlay">
      <div className="delivery_modal_content">
        <h2>배송지 선택</h2>
        <h4>배송지는 최대 3개까지 등록할 수 있습니다.</h4>
        <div className="address_card">
          {addressList && addressList.map((add_Address) => (<>
          {add_Address.choice === 'O' && (<p>기본 배송지</p>)}
          <p>
            <strong>{add_Address.name}</strong>{" "}
          </p>
          <p>{add_Address.addr}</p>
          <p>{add_Address.phoneNumber}</p>
          <p>{add_Address.req}</p>
          <div className="modal_button_group">
            <button className="delete_button" onClick={() => handleDeleteAddress(add_Address.id)}>삭제</button>
          </div>
          {add_Address.choice === 'X' && (
          <div className="modal_button_group">
            <button className="delevery_change" onClick={() => handleChoiceAddress(add_Address.id)}>기본 배송지 변경</button>
          </div>)}
          </>))}
          {!addressList && (
            <p>설정된 배송지가 없습니다. 배송지를 추가해주세요.</p>
          )}
        </div>
        {(addrLength < 3) && (<button className="add_address_button" onClick={openAddDeliveryModal}>+ 배송지 추가</button>)}
        <button className="close_button" onClick={onClose}>닫기</button>
      </div>
      {isAddDeliveryModalOpen && (
        <Add_Delivery_Modal onClose={closeAddDeliveryModal} />
      )}
    </div>
  );
};

export default Delivery_Modal;
