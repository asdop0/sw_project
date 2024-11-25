import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BoardApiClient from "../services/board/BoardApiClient";
import SignApiClient from "../services/auth/SignApiClient";
import CommentApiClient from "../services/board/CommentApiClient";
import AdminApiClient from "../services/board/AdminApiClient";

const UsedDetail = () => {
  const { id } = useParams();
  const [board, setBoard] = useState(null);
  const [newComment, setComment] = useState(""); 
  const [pageRefresh, setPageRefresh] = useState(true);
  const [role, setRole] = useState(null);
  const [nickname, setNickname] = useState(null);

  //api 호출
  useEffect(() => {
    setRole(localStorage.getItem("role"));
    setNickname(localStorage.getItem("nickname"));
    BoardApiClient.viewBoard(id).then(res => {
      if(res.ok) {
        res.json().then(json => {
          if(json.code === "401") {
            //요청 오류
            console.log(json.message);
          } else {
              setBoard(json);
          }
        });
      }
    });
  }, [pageRefresh]);

  const handleAddComment = () => {
    SignApiClient.loginCheck();
    const accessToken = localStorage.getItem("accessToken"); // 토큰 저장 위치 확인 필요
    CommentApiClient.addComment(accessToken, id, newComment)
      .then((res) => {
        if (res.ok) {
          setComment("");
        } else {
          console.error("Failed to add review.");
        }
      })
      .catch((err) => console.error(err));
      const timer = setTimeout(() => {
        setPageRefresh((prev) => !prev); // 상태 값을 반전시킴
      }, 1500);
  
      // 컴포넌트 언마운트 시 타이머 정리
      return () => clearTimeout(timer);
  };

  const handleDeleteComment = (id) => {
    SignApiClient.loginCheck();
    const accessToken = localStorage.getItem('accessToken');
    if (role === "ROLE_USER") {
      CommentApiClient.deleteComment(accessToken, id).then(res => {
        if(res.ok) {
            res.json().then(json => {
            if(json.code === "401") {
                //요청 오류
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
      });
    } else {
      AdminApiClient.deleteComment(accessToken, id).then(res => {
        if(res.ok) {
            res.json().then(json => {
            if(json.code === "401") {
                //요청 오류
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
      });
    }
  }

  return (
    board ? (
      <div className="board_detail">
        <img className="boardImg" 
          src="/board.png" alt="중고거래 임시 이미지">
        </img>

        <h2>
          {board.title}
        </h2>

        <p>
          {board.content}
        </p>
        <p>
          {board.writeDate}
        </p>
        <p>
          {board.userName}
        </p>
        
        

        <div className="reviews_section">
          <h3>댓글</h3>
          <ul className="reviews_list">
            {board.comments.map((comment) => (
              <li key={comment.id} className="review_item">
              {comment.userName}<span> : </span>
              {comment.comment}<span> / </span>
              {comment.writeDate.split("T")[0]}
              {/* 조건부로 삭제 버튼 활성화 */}
              {(comment.nickname === nickname || role === 'ROLE_ADMIN') && (
                  <button onClick={() => handleDeleteComment(comment.id)}>
                    삭제
                  </button>
                )}
              </li>
            ))} 
          </ul> {/* 로그인을 하면 닉네임을 받아오고 그걸 로컬 스토리지에 저장 -> 리뷰의 닉네임과 로컬 스토리지에서 받아온 닉네임이 같으면 삭제 버튼 생김*/}

          <div className="review_input">
            <textarea
              value={newComment}
              onChange={(e) => setNewReview(e.target.value)}
              placeholder="댓글를 작성하세요"
            ></textarea>
          </div>
          <button onClick={handleAddComment}>댓글 작성</button>
        </div>
      </div>
    ) : null
  );
};

export default UsedDetail;
