import React, {useState} from "react";
import "/src/App.css";
import SignApiClient from "../services/auth/SignApiClient";

const SignUp_Modal = ({ show, onClose }) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');

  if (!show) {
    return null;
  }
  //빈칸 있는지 체크해야 함
  //아이디, 닉네임 중복 체크 기능 만들기
  //중복 체크 기능 했는지

  //회원가입
  let handleSignUp = () => {
    SignApiClient.signUp(id, password, name, nickname, email).then(res => {
      if(res.ok) {
        res.json().then(json => {
          if(json.code === "401") {
            //아이디나 비밀번호가 틀렸음 json.message를 통해 오류가 뭔지 확인 가능
            console.log(json.message);
          } else {
            //회원가입 성공
            const value = localStorage.getItem('refreshToken');
            console.log(value);
            //페이지 이동
            onClose();
          }
        });
      }
    });
  };

  return (
    <div className="SignUp_Modal-backdrop">
      <div className="SignUp_Modal-content">
        <h2>회원가입</h2>
        <p>회원가입을 위해 아래 정보를 입력해주세요.</p>
        <input placeholder="아이디" value={id} onChange={(e) => setId(e.target.value)}/>
        <input placeholder="비밀번호" type="password"  value={password} onChange={(e) => setPassword(e.target.value)}/>
        <input placeholder="이름" value={name} onChange={(e) => setName(e.target.value)}/>
        <input placeholder="닉네임" value={nickname} onChange={(e) => setNickname(e.target.value)}/>
        <input placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)}/>
        <button onClick={handleSignUp}>확인</button>
        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  );
};

export default SignUp_Modal;
