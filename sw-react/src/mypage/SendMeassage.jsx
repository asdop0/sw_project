import React, { useState } from 'react';
import "./SendMessage.css";
import { useNavigate } from "react-router-dom";
import SignApiClient from '../services/auth/SignApiClient';
import MessageApiClient from '../services/board/MessageApiClient';

const SendMessage = () => {
  const [title, setTitle] = useState(null);
  const [content, setContent] = useState(null);
  const [receive, setReceive] = useState(null);
  const navigate = useNavigate();

  const handleWriteMessage = () => {
    SignApiClient.loginCheck();
    const accessToken = localStorage.getItem("accessToken");
    MessageApiClient.writeMessage(accessToken, title, content, receive).then(res => {
      if(res.ok) {
        res.json().then(json => {
          if(json.code === "401") {
            alert(json.message.split("]")[1]);
          } else {
            alert('쪽지를 보냈습니다.');
            const timer = setTimeout(() => {
              navigate("/recivenote");
            }, 1500);
            // 컴포넌트 언마운트 시 타이머 정리

            return () => clearTimeout(timer);
          }
        });
      }
    }).catch(error => {
        console.error("Error checking ID:", error);
      });
  }

  return (
    <div className="send_message_board">
      <h2>쪽지 보내기</h2>
      <div className="message_reciver">
        <label>받는 사람 : </label>
        <input
          type="text"
          className="message_reciver_input"
          placeholder="받을 사람 닉네임을 입력하세요"
          value={receive} 
          onChange={(e) => setReceive(e.target.value)}
        />
      </div>
      <div className="message_title">
        <label>제목 : </label>
        <input
          type="text"
          className="message_title_input"
          placeholder="제목을 입력하세요"
          value={title} 
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="message_content">
        <label>내용 :   </label>
        <input
          type="text"
          className="message_content_input"
          placeholder="내용 입력 하세요."
          value={content} 
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <button className="message_send_button" onClick={handleWriteMessage}>보내기</button>
      <button className="message_send_button" onClick={() => navigate("/recivenote")}>취소</button>
    </div>
  );
};

export default SendMessage;
