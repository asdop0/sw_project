import React, {useState} from "react";
import "/src/App.css";
import SignApiClient from "../services/auth/SignApiClient";

const SignUp_Modal = ({ show, onClose }) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');

  const [idMessage, setIdMessage] = useState(''); // 출력용
  const [idOK, setIdOk] = useState(''); //사용 가능 여부 판단용

  const [nicknameMessage, setNicknameMessage] = useState(''); 
  const [nicknameOK, setNicknameOk] = useState('');

  const [nicknamePositionChanged, setNicknamePositionChanged] = useState(false);

  if (!show) {
    return null;
  }
  // 1. 아이디, 닉네임 중복 체크 기능 만들기
  //  -- 중복체크 누르면 중복 체크 완료(초록색)
  
  //빈칸 있는지 체크해야 함

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
    SignApiClient.uidCheck(id).then(res => {
      if(res.ok) {
        res.json().then(json => {
          if(json.code === "401") {
            //json.message를 통해 오류가 뭔지 확인 가능
            console.log(json.message);
          } else {
            //중복 요청 성공
            if(json.check === "true") {
              setIdMessage("사용 가능한 아이디입니다."); 
              setIdOk(true);
            } else {
              setIdMessage("중복된 아이디입니다.");
              setIdOk(false); 
            }
          }
        });
      }
    }).catch(error => {
        console.error("Error checking ID:", error);
        setIdError("아이디 확인 중 오류가 발생했습니다."); 
      });
      setNicknamePositionChanged(true);
  };

  // 닉네임 중복 확인 함수
  const checkNicknameDuplication = () => {
    SignApiClient.nicknameCheck(nickname).then(res => {
      if(res.ok) {
        res.json().then(json => {
          if(json.code === "401") {
            //json.message를 통해 오류가 뭔지 확인 가능
            console.log(json.message);
          } else {
            //중복 요청 성공
            if(json.check === "true") {
              setNicknameMessage("사용 가능한 닉네임입니다."); 
              setNicknameOk(true);
            } else {
              setNicknameMessage("중복된 닉네임입니다.");
              setNicknameOk(false); 
            }
          }
        });
      }
    }).catch(error => {
        console.error("Error checking ID:", error);
        setIdError("닉네임 확인 중 오류가 발생했습니다."); 
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
              {idMessage}
            </p>
          )}
        {!idOK && (
            <p style={{ color: 'red', fontSize: '13px' }}>
              {idMessage}
            </p>
          )}
        <input placeholder="비밀번호" type="password"  value={password} onChange={(e) => setPassword(e.target.value)}/>
        <input placeholder="이름" value={name} onChange={(e) => setName(e.target.value)}/>
        <input placeholder="닉네임" value={nickname} onChange={(e) => setNickname(e.target.value)}/>
        <button className={`nickname_check_button ${nicknamePositionChanged ? 'moved' : ''}`} onClick={checkNicknameDuplication} >확인</button>
        {nicknameOK && (
            <p style={{ color: 'green', fontSize: '13px' }}>
              {nicknameMessage}
            </p>
          )}
        {!nicknameOK && (
            <p style={{ color: 'red', fontSize: '13px' }}>
              {nicknameMessage}
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
