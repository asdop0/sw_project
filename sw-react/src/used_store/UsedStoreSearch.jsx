import React, { useState, useEffect } from "react";
import "./UsedStoreSearch.css"; 
import BoardApiClient from "../services/board/BoardApiClient";
import UsedCard from "./UsedCard";

const UsedStoreSearch = () => {
  const [searchString, setSearchString] = useState("");
  const [boards, setBoards] = useState(false);
  const [pageRefresh, setPageRefresh] = useState(true);

  useEffect(() => {
    if (searchString) {
      BoardApiClient.getSearchBoardList(searchString).then(res => {
        if(res.ok) {
          res.json().then(json => {
            if(json.code === "401") {
              //요청 오류
              console.log(json.message);
            } else {
              //캠핑장 데이터 불러오기 성공
              if(json.length < 1) {
                setBoards(false);
                setSearchString("");
              } else {
                setBoards(json);
                setSearchString("");
              }
            }
          });
        }
      });
    }
  }, [pageRefresh]);

  return (
    <div className="Used_search_container">
      <div className="Used_search_box">
        <input
          type="text"
          value={searchString}
          onChange={(e) => setSearchString(e.target.value)}
          className="Used_search_input"
          placeholder="검색어을 입력하세요."
        />
        <button className="Used_search_button" onClick={() => setPageRefresh((prev) => !prev)}>
            <img
                src="search.png"
                className="searchimg"
            ></img>
        </button>
      </div>
      <div className="Used_cards_search_container">
        {boards && boards.map((board) => (
          <div className="Used_card_wrapper" key={board.id}>
          <UsedCard key={board.id} board={board} setPageRefresh={setPageRefresh}/>
          </div>
        ))}
        {!boards && (
          <p>검색 결과가 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default UsedStoreSearch;
