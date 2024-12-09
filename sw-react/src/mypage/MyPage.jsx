// src/mypage/MyPage.jsx
import React, { useState, useEffect } from 'react';
import './MyPage.css'; // 스타일을 적용하려면 별도의 CSS 파일 생성
import { Link } from 'react-router-dom';
import Delivery_Modal from '../modal/Delivery_Modal';

const MyPage = () => {
   const [isDeliveryModalOpen, setIsDeliveryModalOpen] = useState(false);
   const [role, setRole] = useState(null);

  // 모달 열기
  const openDeliveryModal = () => {
    setIsDeliveryModalOpen(true);
  };

  // 모달 닫기
  const closeDeliveryModal = () => {
    setIsDeliveryModalOpen(false);
  };

  useEffect(() => {
    // setRole(localStorage.getItem('role'));
    setRole("ROLE_ADMIN");
  })

  return (
    <div className="mypage_container">
      <aside className="mypage_sidebar">
          <ul className="sub_menu">
            <br/><br/><br/>
            <div className='MyShopping'>
              <div className='MyShopping_text'>My 쇼핑</div><br/>
                <Link to="/myorder">
                  <li>주문목록/배송조회</li>
                </Link>
                <Link to="/mycancelorder">
                  <li>취소 내역</li><br/>
                </Link>
            </div>
            <div className='MyActivity'>
              <div className='MyActivity_text'>My 활동</div>
                <li>
                  <Link to="/cart">
                  장바구니
                  </Link>
                </li>
                <li>
                  <Link to="/campingbookmark">
                  나의 캠핑장
                  </Link>
                </li>
                <li>
                  <Link to="/productbookmark">
                  나의 상품<br/>
                  </Link>
                </li><br/>
            </div>
            <div className='MyInformation'>
              <div className='MyInformation_text'>My 정보</div>
                <li>
                <button onClick={openDeliveryModal} className="delivery_manage_button">
                배송지 관리
              </button>
                </li><br/><br/>
            </div>
            {(role === "ROLE_ADMIN") && (<div className='Root'>
              관리자 페이지
              <li>
                  <Link to="/user/orders">
                  주문 내역
                  </Link>
                </li>
                <li>
                  <Link to="/payment">
                  결제 대기 목록<br/>
                  </Link>
                </li><br/>
            </div>)}
          </ul>
      </aside>
      {isDeliveryModalOpen && <Delivery_Modal onClose={closeDeliveryModal} />}
    </div>
  );
};

export default MyPage;
