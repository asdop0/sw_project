import React,{useState} from "react";
import "/src/App.css";
import Adress_Modal from "../modal/Adress_Modal"; // Adress_Modal 불러오기

const Input_information = ({ show, onClose }) => {
 const [showAdressModal, setShowAdressModal] = useState(false);
 const [address, setAddress] = useState(''); // 주소 상태 추가

  if (!show) {
    return null;
  }
 

  const handleOpenAdressModal = () => {
    setShowAdressModal(true); // Adress_Modal 열기
  };

  const handleAddressSelect = (selectedAddress) => {
    setAddress(selectedAddress); // 주소 업데이트
    setShowAdressModal(false); // Adress_Modal 닫기
  };

  return (
    <div className="Input_information-backdrop">
      <div className="Input_information-content">
        <h2>배송지 입력</h2>
        <button className="adressSearch" onClick={handleOpenAdressModal}>우편번호 찾기</button>
        <input placeholder="받는 사람" />
        <input placeholder="우편번호 찾기"
        value={address} // 입력된 주소를 표시
        readOnly 
         />
        <input placeholder="상세주소" />    
        <input placeholder="전화번호" />
        <button onClick={onClose}>확인</button>
        <button onClick={onClose}>닫기</button> 

        <Adress_Modal show={showAdressModal}  onAddressSelect={handleAddressSelect} />
      </div>
    </div>
  );
};

export default Input_information;