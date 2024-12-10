import React, {useState, useEffect} from "react";
import "/src/App.css";
import UserApiClient from "../services/auth/UserApiClient";

const Id_Modal = ({ show, onClose }) => {
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [id, setId] = useState(null);

  if (!show) {
    return null;
  }

  //아이디 찾기
  let handleFindUserId = () => {
    UserApiClient.findById(name, nickname).then(res => {
      if(res.ok) {
        res.json().then(json => {
          if(json.code === "401") {
            //아이디나 비밀번호가 틀렸음 json.message를 통해 오류가 뭔지 확인 가능 
            setId(json.message);
          } else {
            //아이디 찾기 성공
            setId(json.id);
          }
        });
      }
    });
  };

  return (
    <div className="Id_Modal_backdrop">
      <div className="Id_Modal-content">
        {!id && (
        <div>
        <h2>아이디 찾기</h2>
        <p>아이디를 찾기 위한 정보를 입력하세요.</p>
        <input placeholder="이름" value={name} onChange={(e) => setName(e.target.value)}/>
        <input placeholder="닉네임" value={nickname} onChange={(e) => setNickname(e.target.value)}/>
        <button onClick={handleFindUserId}>확인</button>
        <button onClick={onClose}>닫기</button>
        </div>)}
        {id && (
          <div>
            <p>{id}</p>
            <button onClick={() => {setId(null); setName(''); setNickname(''); onClose()}}>닫기</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Id_Modal;
