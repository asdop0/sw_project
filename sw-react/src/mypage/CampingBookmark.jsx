import React, { useState, useEffect } from 'react';
import './ProductBookmark.css'; 
import MyPage from './MyPage';
import SignApiClient from "../services/auth/SignApiClient";
import BookmarkApiClient from "../services/camping/BookmarkApiClient";
import CampingBookmarkCard from "./CampingBookmarkCard";

const CampingBookmark = () => {
    const [campings, setCampings] = useState(false);
    const [pageRefresh, setPageRefresh] = useState(false);
    useEffect(() => {
        SignApiClient.loginCheck();
        const accessToken = localStorage.getItem('accessToken');
        BookmarkApiClient.getBookmarkList(accessToken).then(res => {
        if(res.ok) {
            res.json().then(json => {
            if(json.code === "401") {
                //요청 오류
                console.log(json.message);
            } else {
                //캠핑장 데이터 불러오기 성공
                if (Object.keys(json).length === 0) {
                } else {
                    console.log(json);
                    setCampings(json);
                }
                console.log("성공");
            }
            });
        }
        });
      }, [pageRefresh]);

    return (
        <div className="camping_bookmark_container">
             <MyPage />
            <h3>캠핑장 찜 리스트</h3>

            <div className="camping_empty_state">
                {!campings && (
                    <>
                        <p>찜한 상품이 없습니다.</p>
                        <p>캠핑장 페이지에서 추가해 보세요.</p>
                    </>
                )}
            </div>

            <div>
                {campings && campings.map((camping) => (
                <div className="camping_card_wrapper" key={camping.id}>
                <CampingBookmarkCard key={camping.id} camping={camping} setPageRefresh={setPageRefresh}/>
                </div>
                ))}
            </div>
        </div>
    );
};

export default CampingBookmark;
