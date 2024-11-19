import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Camping.css";
import "../App.css";
import CampingApiClient from "../services/camping/CampingApiClient";
import ReviewController from "../services/camping/ReviewController";
import BookmarkApiClient from "../services/camping/BookmarkApiClient";

const CampingDetail = () => {
  const { id } = useParams();
  const [camping, setCamping] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [bookmarkCount, setBookmarkCount] = useState(0);  
  
  //api 호출
  useEffect(() => {
    CampingApiClient.viewCamping(id).then(res => {
      if(res.ok) {
        res.json().then(json => {
          if(json.code === "401") {
            //요청 오류
            console.log(json.message);
          } else {
            //캠핑 데이터 불러오기 성공
            setCamping(json);
            fetchBookmarkCount();
          }
        });
      }
    });
    // 리뷰 데이터 호출
    fetchReviews();
  }, []);

  const fetchBookmarkCount = () => {
    BookmarkApiClient.getBookmarkCount(id)
      .then((res) => res.json())
      .then((data) => {
        setBookmarkCount(data.count);
      })
      .catch((err) => console.error("Failed to fetch bookmark count:", err));
  };

  const handleAddBookmark = () => {
    const accessToken = localStorage.getItem("accessToken");
    BookmarkApiClient.addBookmark(accessToken, id)
      .then((res) => {
        if (res.ok) {
          setBookmarkCount((prevCount) => prevCount + 1); // 카운트 증가
        }
      })
      .catch((err) => console.error("Failed to add bookmark:", err));
  };

  //서버에서 리뷰 가져오기
  const fetchReviews = () => {
    fetch(`${ReviewController.SERVER_URL}${ReviewController.API}?camping_id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setReviews(data); //가져온 데이터 저장하여 출력력
      })
      .catch((err) => console.error("Failed to fetch reviews:", err));
  };

  //새 리뷰
  const handleAddReview = () => {
    const accessToken = localStorage.getItem("accessToken"); // 토큰 저장 위치 확인 필요
    ReviewController.addReview(accessToken, id, newReview)
      .then((res) => {
        if (res.ok) {
          setNewReview("");
          fetchReviews(); // 리뷰 새로고침
        } else {
          console.error("Failed to add review.");
        }
      })
      .catch((err) => console.error(err));
  };

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
          src="/트리앤캠프스토리.png">
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
            <span className="bookmark_count">({bookmarkCount})</span>
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
            {reviews.map((review) => (
              <li key={review.id} className="review_item">
              {review.content}
              </li>
            ))}
          </ul>

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
