import React from 'react';
import './ProductBookmark.css'; 

const ProductBookmark = () => {

    return (
        <div className="product_bookmark_container">
            <h3>상품 찜 리스트</h3>

            <div className="product_tabs">
                <button className="product_tab_active">상품</button>
            </div>

            <div className="product_empty_state">
                    <p>찜한 상품이 없습니다.</p>
                    <p>스토어 페이지에서 추가해 보세요.</p>
                    {/* 데이터 받아오기 */}
            </div>

            <div className="product_controls">
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

export default ProductBookmark;
