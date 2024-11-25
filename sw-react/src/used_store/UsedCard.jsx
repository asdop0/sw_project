import React from "react";
import "./Used_store.css";

const UsedCard = ({ board }) => {
  return (
    <div className="used_card">
      <img src="/board.png" alt="게시물 임시 이미지" className="board_image" />
      <div className="board_name">{board.title}</div>
      <div className="board_price">{board.writeDate}</div>
      <div className="board_price">{board.userName}</div>
      <a href={`/board/${board.id}`} className="board_details-link">
        자세히 보기
      </a>
    </div>
  );
};

export default UsedCard;
