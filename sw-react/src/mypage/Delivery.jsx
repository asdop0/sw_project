import React,{useState} from 'react';
import './Delivery.css'; // 같은 폴더 내 CSS 파일을 가져옴
import {Link} from "react-router-dom";
import Adress_Modal from '../modal/Adress_Modal';

const Delivery = () => {
    const [showAdressModal, setShowAdressModal] = useState(false);
   
    /* 배송지 저장 test */
    const [selectedAddress, setSelectedAddress] = useState(''); 
    /* 배송지 저장 test */

    const handleOpenAdressModal = () =>{
        setShowAdressModal(true)
      }


    /* 배송지 저장 test */
    const handleAddressSelect = (address) => {
        setSelectedAddress(address); // 선택된 주소를 상태에 저장
      };
    /* 배송지 저장 test */
    
  return (
    <div className="mypage_container">
      <aside className="mypage_sidebar">
          <ul className="sub_menu">
            <br/><br/><br/>
            <div className='MyShopping'>
              <div className='MyShopping_text'>My 쇼핑</div><br/>
                <li>주문목록/배송조회</li>
                <li>취소/반품/교환 내역</li><br/>
            </div>
            <div className='MyActivity'>
              <div className='MyActivity_text'>My 활동</div><br/>
                <li>찜 리스트</li><br/><br/>
            </div>
            <div className='MyInformation'>
              <div className='MyInformation_text'>My 정보</div><br/>
                <li>
                  <Link to="/delivery">
                  배송지 관리
                  </Link>
                </li>
                <li>개인정보 확인/수정 </li>
            </div>
          </ul>
      </aside>
      <main className="mypage_content">
        <div className="delivery_button_container">
          <button className="add_delivery_button"  onClick={handleOpenAdressModal}>배송지 추가</button>
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
        
    </div>
  );
};

export default Delivery;
