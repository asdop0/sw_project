// src/mypage/MyPage.jsx
import React from 'react';
import './MyPage.css'; // 스타일을 적용하려면 별도의 CSS 파일 생성
import { Link } from 'react-router-dom';

const MyPage = () => {
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
    </div>
  );
};

export default MyPage;
