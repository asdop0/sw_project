import React, { useState, useEffect } from "react";
import { useParams,Link } from "react-router-dom";
import "./Camping.css";
import "../App.css";
import CampingApiClient from "../services/camping/CampingApiClient";
import ReviewController from "../services/camping/ReviewController";
import BookmarkApiClient from "../services/camping/BookmarkApiClient";
import AdminApiClient from "../services/camping/AdminApiClient";
import SignApiClient from "../services/auth/SignApiClient";

const CampingDetail = () => {
  const { id } = useParams();
  const [camping, setCamping] = useState(null);
  const [newReview, setNewReview] = useState(""); 
  const [pageRefresh, setPageRefresh] = useState(true);
  const [role, setRole] = useState(null);
  const [nickname, setNickname] = useState(null);
  
  //api 호출
  useEffect(() => {
    setRole(localStorage.getItem("role"));
    setNickname(localStorage.getItem("nickname"));
    CampingApiClient.viewCamping(id).then(res => {
      if(res.ok) {
        res.json().then(json => {
          if(json.code === "401") {
            //요청 오류
            console.log(json.message);
          } else {
            //캠핑 데이터 불러오기 성공
            setCamping(json);
          }
        });
      }
    });
  }, [pageRefresh]);


  const handleAddBookmark = () => {
    SignApiClient.loginCheck();
    const accessToken = localStorage.getItem("accessToken");
    BookmarkApiClient.addBookmark(accessToken, id)
      .then((res) => {
        if (res.ok) {
          alert("등록되었습니다.");
        } else if(res.status === 403) {
          const refreshToken = localStorage.getItem('refreshToken');
          SignApiClient.refresh(refreshToken).then(res => {
            if(json.msg === "Success") {
              localStorage.setItem('accessToken');
              AdminApiClient.deleteCamping(token, camping.id).then(res => {
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
          })
        }
      })
      .catch((err) => console.error("Failed to add bookmark:", err));
  };

  //새 리뷰
  const handleAddReview = () => {
    SignApiClient.loginCheck();
    const accessToken = localStorage.getItem("accessToken"); // 토큰 저장 위치 확인 필요
    ReviewController.addReview(accessToken, id, newReview)
      .then((res) => {
        if (res.ok) {
          setNewReview("");
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

  const handleDeleteReview = (id) => {
    SignApiClient.loginCheck();
    const accessToken = localStorage.getItem('accessToken');
    if (role === "ROLE_USER") {
      ReviewController.deleteReview(accessToken, id).then(res => {
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
      AdminApiClient.deleteReview(accessToken, id).then(res => {
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

  const createKakaoMapUrl = () => {
  if (camping && camping.latitude && camping.longitude) {
    const url = `https://map.kakao.com/link/map/${camping.name},${camping.latitude},${camping.longitude}`;
    console.log("Generated URL:", url);
    return url;
  }
  return "#";
};
  return (
    camping ? (
      <div className="camping_detail">
        <img className="campingImg" 
          src="/camping.png" alt="캠핑장 임시 이미지">
        </img>

        <h2 className="camping_name">
          {camping.name}
          <button
              className="camping_bookmark_button"
              onClick={handleAddBookmark}
              aria-label="Add to bookmarks"
            >
              <img
                src="/bookmark.png"
                alt="Bookmark"
                className="bookmark_icon"
              />
          </button>
          <button 
              className="camping_modify_button"
              >
                <img 
                  className="camping_modify"
                  src="/modify.png"
                  alt="수정버튼"
                  />
              </button>
          
        </h2>

        <p className="camping_address">
          <img  className="marker" src="/marker.png"></img>
          {camping.address}
        </p>
        
        <p className="camping_number">
          <img className="call" src="/call.png"></img>
          {camping.phonenumber}
        </p>

        <p className="korea_gocamping">
          <img className="check" src="/check.png"></img>
          관광사업자로 등록된 인증 캠핑장 <a href="https://gocamping.or.kr/">바로가기</a>
        </p>
        
        <p className="camping_icon">
          <a href={camping.homepage} target="_blank">
           <img className="book" src="/book.png" />
          </a>
          <a href={createKakaoMapUrl()} target="_blank" >
            <img className="findway" src="/findway.png"  />
          </a>
        </p>

        <div className="reviews_section">
          <h3>리뷰</h3>
          <ul className="reviews_list">
            {camping.campingReviews.map((review) => (
              <li key={review.id} className="review_item">
                {review.nickname}<span> : </span>
                {review.content}<span> / </span>
                {review.writeDate.split("T")[0]}

                {/* 조건부로 삭제 버튼 활성화 */}
                {(review.nickname === nickname || role === 'ROLE_ADMIN') && (
                  <button onClick={() => handleDeleteReview(review.id)}>
                    삭제
                  </button>
                )}
              </li>
            ))}
          </ul> {/* 로그인을 하면 닉네임을 받아오고 그걸 로컬 스토리지에 저장 -> 리뷰의 닉네임과 로컬 스토리지에서 받아온 닉네임이 같으면 삭제 버튼 생김*/}

          <div className="review_input">
            <textarea
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              placeholder="리뷰를 작성하세요"
            ></textarea>
          </div>
          <button onClick={handleAddReview}>리뷰 추가</button>
        </div>
      </div>
    ) : null
  );
};

export default CampingDetail;
