import React,{useState} from "react";
import "./Add_Delivery_Modal.css";
import Adress_Modal from "../modal/Adress_Modal";

const Add_Delivery_Modal = ({ onClose }) => {
    const [showAdressModal, setShowAdressModal] = useState(false);
  const handleAddAddress = () => {
    // 배송지 추가 로직
    alert("배송지가 추가되었습니다.");
    onClose(); // 모달 닫기
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
          <input type="text" placeholder="받는분 성함을 입력하세요" />
        </div>
        <div>
            
          <label>주소:</label>
          <input type="text" placeholder="주소를 입력하세요" / >
          <button className="search_button"onClick={handleOpenAdressModal}>우편번호 찾기</button>
        </div>
        <div>
          <label>전화번호:</label>
          <input type="text" placeholder="전화번호를 입력하세요" />
        </div>
        <div>
          <label>요청사항:</label>
          <input type="text" placeholder="요청사항을 입력하세요" />
        </div>
        <button className="save_button"onClick={handleAddAddress}>저장</button>
        <button className="close_button"onClick={onClose}>닫기</button>

        <Adress_Modal show={showAdressModal}  onAddressSelect={handleAddressSelect} />
      </div>
    </div>
  );
};

export default Add_Delivery_Modal;
