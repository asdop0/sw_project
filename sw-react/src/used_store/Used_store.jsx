import React, { useEffect, useState } from "react";
import "./Used_store.css";
import UsedCard from "./UsedCard"; // UsedCard 컴포넌트를 가져옵니다.
import BoardApiClient from "../services/board/BoardApiClient";

const Used_store = () => {
  const [boards, setBoards] = useState([]);
  const [sortBy, setSortBy] = useState("최신");
  const [pageRefresh, setPageRefresh] = useState(true);

  const handleSortByChange = (event) => {
    setSortBy(event.target.value);
  };

  useEffect(() => {
    if(sortBy === "최신") {
      BoardApiClient.getBoardList().then(res => {
        if(res.ok) {
          res.json().then(json => {
            if(json.code === "401") {
              //게시판 오류
              console.log(json.message);
            } else {
              //상품 데이터 불러오기 성공
              setBoards(json);
            }
          });
        }
      });
    } else if (sortBy === "조회순"){
      BoardApiClient.getSortList("view").then(res => {
        if(res.ok) {
          res.json().then(json => {
            if(json.code === "401") {
              //요청 오류
              console.log(json.message);
            } else {
              //게시판 데이터 불러오기 성공
              setBoards(json);
            }
          });
        }
      });
    } else if (sortBy === "댓글순"){
      BoardApiClient.getSortList("comment").then(res => {
        if(res.ok) {
          res.json().then(json => {
            if(json.code === "401") {
              //요청 오류
              console.log(json.message);
            } else {
              //게시판 데이터 불러오기 성공
              setBoards(json);
            }
          });
        }
      });
    }
  }, [sortBy, pageRefresh]);

  return (
    <div className="Used_store">
      <h3 className="recommand" style={{ textAlign: 'left', paddingLeft: '10px', marginBottom: '20px' }}>추천상품</h3>
      <br />
      <select 
      className="category_Latest" 
      value={sortBy} 
      onChange={handleSortByChange}
    >
      <option value="최신">최신</option>
      <option value="조회순">조회순</option>
      <option value="댓글순">댓글순</option>
    </select>
    <button className="board_register_button">등록</button>
      <div className="board_list">
        {boards.length > 0 ? (
          boards.map((board) => (
            <div key={board.id} className="board_card_wrapper">
              <UsedCard board={board} /> {/* 각 제품에 대한 UsedCard 컴포넌트를 사용 */}
            </div>
          ))
        ) : (
          <div>
          <p>등록된 중고 상품이 없습니다.</p>
         
          </div>
          )}
      </div>
    </div>
  );
};

export default Used_store;
