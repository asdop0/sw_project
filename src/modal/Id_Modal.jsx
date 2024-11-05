import React from "react";
import "/src/App.css";

const Id_Modal = ({ show, onClose }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="Id_Modal_backdrop">
      <div className="Id_Modal-content">
        <h2>아이디 찾기</h2>
        <p>아이디를 찾기 위한 정보를 입력하세요.</p>
        <input placeholder="이메일 또는 전화번호" />
        <button onClick={onClose}>확인</button>
        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  );
};

export default Id_Modal;
