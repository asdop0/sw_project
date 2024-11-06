import React, {useState} from "react";
import "/src/App.css";
import SignApiClient from "../services/auth/SignApiClient";

const SignUp_Modal = ({ show, onClose }) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');

  const [idError, setIdError] = useState(''); // 오류 메시지 상태 추가
  const [idOK, setIdOk] = useState('');

  const [nicknameError, setNicknameError] = useState(''); 
  const [nicknameOK, setNicknameOk] = useState('');

  if (!show) {
    return null;
  }
  // 1. 아이디, 닉네임 중복 체크 기능 만들기
  //  -- 중복체크 누르면 중복 체크 완료(초록색)
  
  //빈칸 있는지 체크해야 함
  
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
  // 아이디 중복 확인 함수
  const checkIdDuplication = () => {
    SignApiClient.uidCheck(id)
      .then(response => response.json())
      .then(data => {
        if (data.exists) {
          setIdError("중복된 아이디입니다.");
          setIdOk(''); // 오류 메시지가 있으면 성공 메시지 초기화
        } else {
          setIdOk("사용 가능한 아이디입니다."); 
          setIdError(''); // 성공 메시지가 있으면 오류 메시지 초기화
        }
      })
      .catch(error => {
        console.error("Error checking ID:", error);
        setIdError("아이디 확인 중 오류가 발생했습니다."); 
      });
  };

  // 닉네임 중복 확인 함수
  const checkNicknameDuplication = () => {
    SignApiClient.nicknameCheck(nickname)
      .then(response => response.json())
      .then(data => {
        if (data.exists) {
          setNicknameError("중복된 닉네임입니다.");
          setNicknameOk(''); // 오류 메시지가 있으면 성공 메시지 초기화
        } else {
          setNicknameOk("사용 가능한 닉네임입니다."); 
          setNicknameError(''); // 성공 메시지가 있으면 오류 메시지 초기화
        }
      })
      .catch(error => {
        console.error("Error checking ID:", error);
        setNicknameError("닉네임 확인 중 오류가 발생했습니다."); 
      });
  };

  return (
    <div className="SignUp_Modal-backdrop">
      <div className="SignUp_Modal-content">
        <h2>회원가입</h2>
        <p>회원가입을 위해 아래 정보를 입력해주세요.</p>
        <input placeholder="아이디" value={id} onChange={(e) => setId(e.target.value)}
        
        />
        <button className="id_check_button" onClick={checkIdDuplication}>확인</button>
        {idOK && (
            <p style={{ color: 'green', fontSize: '13px' }}>
              {idOK}
            </p>
          )}
        {idError && (
            <p style={{ color: 'red', fontSize: '13px' }}>
              {idError}
            </p>
          )}
        <input placeholder="비밀번호" type="password"  value={password} onChange={(e) => setPassword(e.target.value)}/>
        <input placeholder="이름" value={name} onChange={(e) => setName(e.target.value)}/>
        <input placeholder="닉네임" value={nickname} onChange={(e) => setNickname(e.target.value)}/>
        <button className="nickname_check_button" onClick={checkNicknameDuplication} >확인</button>
        {nicknameOK && (
            <p style={{ color: 'green', fontSize: '13px' }}>
              {nicknameOK}
            </p>
          )}
        {nicknameError && (
            <p style={{ color: 'red', fontSize: '13px' }}>
              {nicknameError}
            </p>
          )}

        <input placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)}/>
        <button onClick={handleSignUp}>확인</button>
        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  );
};

export default SignUp_Modal;
