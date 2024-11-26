import React from "react";
import "./UsedStoreSearch.css"; 

const UsedStoreSearch = () => {

  return (
    <div className="Used_search_container">
      <div className="Used_search_box">
        <input
          type="text"
          className="Used_search_input"
          placeholder="검색어을 입력하세요."
        />
        <button className="Used_search_button" >
            <img
                src="search.png"
                className="searchimg"
            ></img>
        </button>
      </div>
    </div>
  );
};

export default UsedStoreSearch;
