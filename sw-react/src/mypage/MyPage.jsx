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
                <li>취소 내역</li><br/>
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
                  나의 상품
                  </Link>
                </li>
            </div>
            <div className='MyInformation'>
              <div className='MyInformation_text'>My 정보</div><br/>
                <li>
                  <Link to="/delivery">
                  배송지 관리
                  </Link>
                </li>
            </div>
          </ul>
      </aside>
    </div>
  );
};

export default MyPage;
