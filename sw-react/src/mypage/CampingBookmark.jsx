import React from 'react';
import './CampingBookmark.css'; // CSS 파일 경로를 추가하세요.
import MyPage from "./MyPage";

const CampingBookmark = () => {

    return (
        <div className="camping_bookmark_container">
             <MyPage />
            <h3>캠핑 찜 리스트</h3>
            <div className="camping_empty_state">
                    <p>찜한 상품이 없습니다.</p>
                    <p>스토어 페이지에서 추가해 보세요.</p>
                    {/* 데이터 받아오기 */}
            </div>

            <div className="camping_controls">
                {/* 삭제 기능 추가 */}
                <label>
                    <input type="checkbox" /> 
                    전체선택
                </label>
                <button >선택삭제</button>
            </div>
        </div>
    );
};

export default CampingBookmark;
