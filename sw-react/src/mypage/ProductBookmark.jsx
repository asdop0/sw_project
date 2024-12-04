import React, { useState, useEffect } from 'react';
import './ProductBookmark.css'; 
import MyPage from './MyPage';
import SignApiClient from "../services/auth/SignApiClient";
import BookmarkApiClient from "../services/store/BookmarkApiClient";
import ProductBookMarkCard from "./ProductBookMarkCard";

const ProductBookmark = () => {
    const [products, setProducts] = useState(false);
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
                //상품 데이터 불러오기 성공
                if (Object.keys(json).length === 0) {
                } else {
                    setProducts(json); 
                }
                console.log("성공");
            }
            });
        }
        });
      }, [pageRefresh]);

    return (
        <div className="product_bookmark_container">
             <MyPage />
            <h3 className="product_bookmark_text" >상품 찜 리스트</h3>

            <div className="product_empty_state">
                {!products && (
                    <>
                        <p>찜한 상품이 없습니다.</p>
                        <p>스토어 페이지에서 추가해 보세요.</p>
                    </>
                )}
            </div>

            <div className="product_cards_container">
                {products && products.map((product) => (
                <div className="product_card_wrapper" key={product.id}>
                <ProductBookMarkCard key={product.id} product={product} setPageRefresh={setPageRefresh}/>
                </div>
                ))}
            </div>
        </div>
    );
};

export default ProductBookmark;
