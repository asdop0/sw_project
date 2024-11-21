import React,{useState} from 'react';
import './Delivery.css'; // 같은 폴더 내 CSS 파일을 가져옴
import MyPage from './MyPage';
const Delivery = () => {
    
  return (
    <div className="Note_container">
      <MyPage />
      <main className="Note_content">
        {/* <div className="delivery_button_container">
          <button className="add_delivery_button"  onClick={handleOpenAdressModal}>배송지 추가</button>
        </div> */}

      </main>
    </div>
  );
};

export default Delivery;
