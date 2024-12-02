import React from 'react';
import "./SendMessage.css";

const SendMessage = () => {
  return (
    <div className="send_message_board">
      <h2>쪽지 보내기</h2>
      <div className="message_reciver">
        <label>받는 사람 : </label>
        <input
          type="text"
          className="message_reciver_input"
          placeholder="받을 사람 닉네임을 입력하세요"
        />
      </div>
      <div className="message_title">
        <label>제목 : </label>
        <input
          type="text"
          className="message_title_input"
          placeholder="제목을 입력하세요"
        />
      </div>
      <div className="message_content">
        <label>내용 :   </label>
        <input
          type="text"
          className="message_content_input"
          placeholder="내용 입력 하세요."
        />
      </div>
      <button className="message_send_button">보내기</button>
    </div>
  );
};

export default SendMessage;
