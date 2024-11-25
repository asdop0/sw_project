import React from "react";
import { Link } from "react-router-dom";
import "../camping/Camping.css"
import BookmarkApiClient from "../services/camping/BookmarkApiClient";
import SignApiClient from "../services/auth/SignApiClient";

const CampingBookmarkCard = ({ camping, setPageRefresh }) => {

  const handleDeleteBookmark = () => {
    SignApiClient.loginCheck();
    const accessToken = localStorage.getItem('accessToken');
    BookmarkApiClient.deleteBookmark(accessToken, camping.id).then(res => {
      if(res.ok) {
          res.json().then(json => {
          if(json.code === "401") {
              //요청 오류
              console.log(json.message);
          } else {
            const timer = setTimeout(() => {
              setPageRefresh((prev) => !prev); // 상태 값을 반전시킴
            }, 1500);
            alert("삭제되었습니다.");
            // 컴포넌트 언마운트 시 타이머 정리

            return () => clearTimeout(timer);
              
          }
          });
      }
      });
  }

  return (
    <div className="camping_card">
      <img src="/camping.png" alt="캠핑장 임시 이미지" className="camping_image"/>
      <h3 className="camping_name">{camping.name}</h3>
      <p className="camping_address">{camping.address}</p>
      <Link to={`/camping/${camping.id}`} className="camping_details_link">
        상세보기
      </Link>
      <button onClick={handleDeleteBookmark}>찜 삭제</button>
    </div>
  );
};

export default CampingBookmarkCard;
