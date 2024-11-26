import React from "react";
import "./CampingSearch.css"; 

const Search = () => {

  return (
    <div className="camping_search_container">
      <div className="camping_search_box">
        <input
          type="text"
          className="camping_search_input"
          placeholder="캠핑장을 입력하세요."
        />
        <button className="camping_search_button" >
            <img
                src="search.png"
                className="searchimg"
            ></img>
        </button>
      </div>
    </div>
  );
};

export default Search;
