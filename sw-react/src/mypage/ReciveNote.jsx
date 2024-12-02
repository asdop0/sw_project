import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ReciveNote.css';
import MessageApiClient from "../services/board/MessageApiClient";
import SignApiClient from '../services/auth/SignApiClient';

const ReciveNote = ({ note, setPageRefresh }) => {
    const handleDeleteNote = (id) => {
        SignApiClient.loginCheck();
        const accessToken = localStorage.getItem('accessToken');
        MessageApiClient.deleteReceivedMessage(accessToken, id).then(res => {
            if(res.ok) {
              res.json().then(json => {
                if(json.code === "401") {
                  console.log(json.message);
                } else {
                    const timer = setTimeout(() => {
                        setPageRefresh((prev) => !prev); // 상태 값을 반전시킴
                      }, 1500);
                      alert("삭제되었습니다.");
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
        <div className="Recive_note_card">
            <div className="Recive_note_header">
                <h2>{note.title}</h2>
                {/* <h3>{note.senderName}</h3> */}
                <span className="Recive_note_date">{note.writeDate.split("T")[0]}</span>
            </div>
            <p className="Recive_note_content">{note.content}</p>
            <div className="Recive_note_buttons">
                <button className="Recive_note_delete_btn" onClick={() => handleDeleteNote(note.id)}>삭제</button>
            </div>
        </div>
    );
};

const ReciveNoteBoard = () => {
    const [notes, setNotes] = useState(null);
    const [pageRefresh, setPageRefresh] = useState(true);

    useEffect(() => {
        SignApiClient.loginCheck();
        const accessToken = localStorage.getItem('accessToken');
        MessageApiClient.getReceivedMessage(accessToken).then(res => {
            if(res.ok) {
              res.json().then(json => {
                if(json.code === "401") {
                  console.log(json.message);
                } else {
                    if(json.length > 0) {
                        setNotes(json);
                    } else {
                        setNotes(null);
                    }
                }
              });
            }
          }).catch(error => {
              console.error("Error checking ID:", error);
            });

    }, [pageRefresh]);
    
    return (
        <div className="Recivenote_board">
            <h2>받은 쪽지함</h2>
            <Link to="/sendmessage">
                <a className="sendmessage">쪽지 보내기 </a>
            </Link>
            <Link to="/recivenote">
                <a className="recive_note">받은 쪽지함 </a>
            </Link>
            <Link to="/sendnote">
                <a className="send_note">보낸 쪽지함</a>
            </Link>
            <div className="Recive_note_list">
            {notes && (notes.map(note => (
                    <ReciveNote
                        key={note.id}
                        note={note}
                        setPageRefresh={setPageRefresh}
                    />
                )))}
                {!notes && (
                    <p>받은 쪽지가 없습니다.</p>
                )}
            </div>
        </div>
    );
};

export default ReciveNoteBoard;
