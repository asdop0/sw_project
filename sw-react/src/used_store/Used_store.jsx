import React from "react";
import "./Used_store.css";

export const Used_store = () => {
    return (
        <div className="Used_store">
          <h1>중고 장터</h1>
          <div className="Used_store_header">
            <span>제목</span>
            <span>가격</span>
            <span>등록일</span>
          </div>
        </div>
      );
}

export default Used_store;