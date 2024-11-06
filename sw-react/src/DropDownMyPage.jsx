// MyPage.jsx
import React from "react";
import { Link } from "react-router-dom";

const DropDownMyPage = () => {
  return (
    <div className="mypage">
      <h2>마이페이지</h2>
      <ul>
        <li>
          <Link to="/mypage">나의 정보</Link>
        </li>
        <li>
          <Link to="/">찜한 목록</Link>
        </li>
        <li>
          <Link to="/login" >로그인</Link>
        </li>
      </ul>
    </div>
  );
};

export default DropDownMyPage;
