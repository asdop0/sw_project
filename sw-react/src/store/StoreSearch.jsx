import React from "react";
import "./StoreSearch.css"; 

const StoreSearch = () => {

  return (
    <div className="store_search_container">
      <div className="store_search_box">
        <input
          type="text"
          className="store_search_input"
          placeholder="검색어을 입력하세요."
        />
        <button className="store_search_button" >
            <img
                src="search.png"
                className="searchimg"
            ></img>
        </button>
      </div>
    </div>
  );
};

export default StoreSearch;
