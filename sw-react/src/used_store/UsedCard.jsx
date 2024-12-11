import React, { useState, useEffect } from "react";
import "./Used_store.css";
import AdminApiClient from "../services/board/AdminApiClient";
import BoardApiClient from "../services/board/BoardApiClient";
import SignApiClient from "../services/auth/SignApiClient";

const UsedCard = ({ board, setPageRefresh }) => {
  const [role, setRole] = useState(null);
  const [nickname, setNickname] = useState(null);

  useEffect(() => {
    setRole(localStorage.getItem('role'));
    setNickname(localStorage.getItem('nickname'));
  }, []);

  const handleDeleteBoard = () => {
    SignApiClient.loginCheck();
    const accessToken = localStorage.getItem('accessToken');
    if (role === "ROLE_USER") {
      BoardApiClient.deleteBoard(accessToken, board.id).then(res => {
        if(res.ok) {
            res.json().then(json => {
            if(json.code === "401") {
                //요청 오류
                console.log(json.message);
            } else {
              const timer = setTimeout(() => {
                setPageRefresh((prev) => !prev); // 상태 값을 반전시킴
              }, 1500);
              alert("삭제되었습니다.");
              // 컴포넌트 언마운트 시 타이머 정리
  
              return () => clearTimeout(timer);
                
            }
            });
        }
      });
    } else {
      AdminApiClient.deleteBoard(accessToken, board.id).then(res => {
        if(res.ok) {
            res.json().then(json => {
            if(json.code === "401") {
                //요청 오류
                console.log(json.message);
            } else {
              const timer = setTimeout(() => {
                setPageRefresh((prev) => !prev); // 상태 값을 반전시킴
              }, 1500);
              alert("삭제되었습니다.");
              // 컴포넌트 언마운트 시 타이머 정리
  
              return () => clearTimeout(timer);
                
            }
            });
        }
      });
    }
    
  }

  return (
    <div className="used_card">
      <img src="/board.png" alt="게시물 임시 이미지" className="board_image" />
      <div className="board_name">{board.title}</div>
      <div className="board_price">{board.nickName}</div>
      <div className="board_price">{board.writeDate.split("T")[0]}</div>
      <a href={`/board/${board.id}`} className="board_details-link">
        자세히 보기
      </a>
      {/* 조건부로 삭제 버튼 활성화 */}
      {(board.nickName === nickname || role === 'ROLE_ADMIN') && (
        <button onClick={handleDeleteBoard}>
          삭제
        </button>
      )}
    </div>
  );
};

export default UsedCard;
