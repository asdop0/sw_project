import React, { useState } from "react";
import SignApiClient from "../services/auth/SignApiClient";
import BoardApiClient from "../services/board/BoardApiClient";
import { useNavigate } from 'react-router-dom';
import './BoardRegister.css';

const BoardRegister = ( onClose ) => {
  // 각 입력값을 상태로 관리
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate(); // useNavigate 사용

  const handleAddBoard = () => {
    SignApiClient.loginCheck();
    const accessToken = localStorage.getItem("accessToken"); // 토큰 저장 위치 확인 필요
    BoardApiClient.addBoard(accessToken, title, content)
      .then((res) => {
        if (res.ok) {
          alert("등록되었습니다.");
          navigate('/');
        } else {
          console.error("Failed to add camping.");
        }
      })
      .catch((err) => console.error(err));
  };


  return (
    <div className="board_register">
      <h2>게시글 등록</h2>
      <input
        className="board_register_name"
        placeholder="제목"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        className="board_register_homepage"
        placeholder="내용"
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      /><br/>
      <button onClick={handleAddBoard}>확인</button>
      <button onClick={onClose}>닫기</button>
    </div>
  );
};

export default BoardRegister;
