import React,{useState} from "react";
import "./Add_Delivery_Modal.css";
import Adress_Modal from "../modal/Adress_Modal";
import SignApiClient from "../services/auth/SignApiClient";
import AddressApiClient from "../services/store/AddressApiClient";

const Add_Delivery_Modal = ({ onClose }) => {
    const [showAdressModal, setShowAdressModal] = useState(false);
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [phonenumber, setPhonenumber] = useState("");
    const [req, setReq] = useState("");
  const handleAddAddress = () => {
    // 배송지 추가 로직
    SignApiClient.loginCheck();
    const accessToken = localStorage.getItem('accessToken');
    AddressApiClient.addAddress(accessToken, name, address, phonenumber, req).then(res => {
      if(res.ok) {
        res.json().then(json => {
          if(json.code === "401") {
            //아이디나 비밀번호가 틀렸음 json.message를 통해 오류가 뭔지 확인 가능 
            console.log(json.message);
          } else {
            alert("배송지가 추가되었습니다.");
            const timer = setTimeout(() => {
              onClose(); // 모달 닫기
            }, 1500);
            // 컴포넌트 언마운트 시 타이머 정리

            return () => clearTimeout(timer);
          }
        });
      }
    });
  };

  const handleOpenAdressModal = () => {
    setShowAdressModal(true); // Adress_Modal 열기
  };

  const handleAddressSelect = (selectedAddress) => {
    setAddress(selectedAddress); // 주소 업데이트
    setShowAdressModal(false); // Adress_Modal 닫기
  };


  return (
    <div className="Add_delivery_modal_overlay">
      <div className="Add_delivery_modal_content">
        <h2>배송지 추가</h2>
        <div>
          <label>받는분 성함:</label>
          <input type="text" placeholder="받는분 성함을 입력하세요" value={name} onChange={(e) => setName(e.target.value)}/>
        </div>
        <div>
            
          <label>주소:</label>
          <input type="text" placeholder="주소를 입력하세요" value={address} readOnly/>
          <button className="search_button"onClick={handleOpenAdressModal}>우편번호 찾기</button>
        </div>
        <div>
          <label>전화번호:</label>
          <input type="text" placeholder="전화번호를 입력하세요" value={phonenumber} onChange={(e) => setPhonenumber(e.target.value)}/>
        </div>
        <div>
          <label>상세주소 및 요청사항:</label>
          <input type="text" placeholder="상세주소 및 요청사항을 입력하세요" value={req} onChange={(e) => setReq(e.target.value)}/>
        </div>
        <button className="save_button"onClick={handleAddAddress}>저장</button>
        <button className="close_button"onClick={onClose}>닫기</button>

        <Adress_Modal show={showAdressModal}  onAddressSelect={handleAddressSelect} />
      </div>
    </div>
  );
};

export default Add_Delivery_Modal;
