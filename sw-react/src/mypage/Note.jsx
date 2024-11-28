import React, { useState } from 'react';
import './Note.css';

const Note = ({ note, onDelete, onEdit }) => {
    const { id, title, content, date } = note;

    return (
        <div className="note_card">
            <div className="note_header">
                <h2>{title}</h2>
                <span className="note_date">{date}</span>
            </div>
            <p className="note_content">{content}</p>
            <div className="note_buttons">
                <button className="note_edit_btn" onClick={() => onEdit(id)}>수정</button>
                <button className="note_delete_btn" onClick={() => onDelete(id)}>삭제</button>
            </div>
        </div>
    );
};

const NoteBoard = () => {
    const [notes, setNotes] = useState([
        { id: 1, title: '첫 번째 쪽지', content: '쪽지 내용 1', date: '2024-11-28' },
        { id: 2, title: '두 번째 쪽지', content: '쪽지 내용 2', date: '2024-11-27' },
        { id: 3, title: '세 번째 쪽지', content: '쪽지 내용 3', date: '2024-11-26' }
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
        <div className="note_board">
            <h2>쪽지함</h2>
            <div className="note+list">
                {notes.map(note => (
                    <Note
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

export default NoteBoard;
