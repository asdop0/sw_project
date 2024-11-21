import React,{useState} from 'react';
import './Delivery.css'; // 같은 폴더 내 CSS 파일을 가져옴
import Adress_Modal from '../modal/Adress_Modal';
import Input_information from '../modal/Input_information';
import MyPage from "./MyPage";
// import "./MyPage.css";

const Delivery = () => {
    const [showAdressModal, setShowAdressModal] = useState(false);
    const [showInputModal, setShowInputModal] = useState(false);
   
    /* 배송지 저장 test */
    const [selectedAddress, setSelectedAddress] = useState(''); 
    /* 배송지 저장 test */

    const handleOpenAdressModal = () =>{
        setShowAdressModal(true)
      }

    const handleOpenInputModal = () => {
      setShowInputModal(true); 
    };


    /* 배송지 저장 test */
    const handleAddressSelect = (address) => {
        setSelectedAddress(address); // 선택된 주소를 상태에 저장
      };
    /* 배송지 저장 test */
    
  return (
    <div className="delivery_container">
       <MyPage />
      <main className="mypage_content">
        
        {/* <div className="delivery_button_container">
          <button className="add_delivery_button"  onClick={handleOpenAdressModal}>배송지 추가</button>
        </div> */}
        <div className="delivery2_button_container">
          <button className= "add_delivery_button2"onClick={handleOpenInputModal}>배송지 추가</button>
        </div>
        
        {/* /배송지 저장 test  */}
        {selectedAddress && (
          <div className="selected_address_box">
            <p>{selectedAddress}</p>
          </div>
        )}
        {/* /배송지 저장 test  */}
        
      </main>
      <Adress_Modal show={showAdressModal} 
    //{/* /배송지 저장 test  */}
      onAddressSelect={handleAddressSelect}/>
    {/* /배송지 저장 test  */}
    {showInputModal && (
        <Input_information show={showInputModal} />
      )}
      
    </div>
    
  );
};

export default Delivery;
