import React from "react";
import "/src/App.css";

const Password_Modal = ({ show, onClose }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="Password_Modal-backdrop">
      <div className="Password_Modal-content">
        <h2>비밀번호 찾기</h2>
        <p>비밀번호를 찾기 위한 정보를 입력하세요.</p>
        <input placeholder="아이디" />
        <input placeholder="이메일 또는 전화번호" />
        <button onClick={onClose}>확인</button>
        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  );
};

export default Password_Modal;
