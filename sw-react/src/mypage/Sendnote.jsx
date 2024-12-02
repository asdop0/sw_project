import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SendNote.css';

const SendNote = ({ note, onDelete}) => {
    const { id, title, content, date } = note;

    return (
        <div className="Send_note_card">
            <div className="Send_note_header">
                <h2>{title}</h2>
                {/* <h3>{id}</h3> */}
                <span className="Send_note_date">{date}</span>
            </div>
            <p className="Send_note_content">{content}</p>
            <div className="Send_note_buttons">
                <button className="Send_note_delete_btn" onClick={() => onDelete(id)}>삭제</button>
            </div>
        </div>
    );
};

const SendNoteBoard = () => {
    const [notes, setNotes] = useState([
        { id: 1, title: '제목 1', content: '쪽지 내용 1', date: '2024-11-28' },
        { id: 2, title: '제목 2', content: '쪽지 내용 2', date: '2024-11-27' },
        { id: 3, title: '제목 3', content: '쪽지 내용 3', date: '2024-11-26' }
    ]);

    const handleDelete = (id) => {
        setNotes(notes.filter(note => note.id !== id));
    };

    const handleEdit = (id) => {
        const newTitle = prompt('새 제목을 입력하세요');
        const newContent = prompt('새 내용을 입력하세요');
        if (newTitle && newContent) {
            setNotes(notes.map(note =>
                note.id === id ? { ...note, title: newTitle, content: newContent } : note
            ));
        }
    };

    return (
        <div className="Send_note_board">
            <h3>보낸 쪽지함</h3>
            <Link to="/sendmessage">
                <a className="sendmessage">쪽지 보내기 </a>
            </Link>
            <Link to="/recivenote">
                <a className="recive_note">받은 쪽지함 </a>
            </Link>
            <Link to="/sendnote">
                <a className="send_note">보낸 쪽지함</a>
            </Link>
            <div className="Send_note_list">
                {notes.map(note => (
                    <SendNote
                        key={note.id}
                        note={note}
                        onDelete={handleDelete}
                        onEdit={handleEdit}
                    />
                ))}
            </div>
        </div>
    );
};

export default SendNoteBoard;
// title, content, date, nickname, sender, reciver
