import React from "react";
import "/src/App.css";

const SignUp_Modal = ({ show, onClose }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="SignUp_Modal-backdrop">
      <div className="SignUp_Modal-content">
        <h2>회원가입</h2>
        <p>회원가입을 위해 아래 정보를 입력해주세요.</p>
        <input placeholder="아이디" />
        <input placeholder="비밀번호" type="password" />
        <input placeholder="이름" />
        <input placeholder="닉네임" />
        <input placeholder="핸드폰 번호" />
        <button onClick={onClose}>확인</button>
        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  );
};

export default SignUp_Modal;
