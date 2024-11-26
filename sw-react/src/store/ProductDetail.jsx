import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./Store.css";
import "../App.css";
import ProductApiClient from "../services/store/ProductApiClient";
import BookmarkApiClient from "../services/store/BookmarkApiClient";
import CartApiClient from "../services/store/CartApiClient";
import SignApiClient from "../services/auth/SignApiClient";
import AdminApiClient from "../services/store/AdminApiClient";
import ReviewController from "../services/store/ReviewController";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);  
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState(0);
  const [newReview, setNewReview] = useState(""); 
  const [pageRefresh, setPageRefresh] = useState(true);
  const [role, setRole] = useState(null);
  const [nickname, setNickname] = useState(null);
  
  //api 호출
  useEffect(() => {
    setRole(localStorage.getItem("role"));
    setNickname(localStorage.getItem("nickname"));
    ProductApiClient.viewProduct(id).then(res => {
      if(res.ok) {
        res.json().then(json => {
          if(json.code === "401") {
            //요청 오류
            console.log(json.message);
          } else {
            //상품 데이터 불러오기 성공
            setProduct(json);
            switch (json.categoryName) {
              case "캠핑가구":
                setCategory(1);
                break;
              case "텐트":
                setCategory(2);
                break;
              case "푸드":
                setCategory(3);
                break;
              case "보조장비":
                setCategory(4);
                break;
            }
          }
        });
      }
    });
  }, [pageRefresh]);

  const handleAddCart = () => {
    SignApiClient.loginCheck();
    const accessToken = localStorage.getItem("accessToken");
    CartApiClient.addCart(accessToken, id, quantity)
      .then((res) => {
        if (res.ok) {
        }
      })
      .catch((err) => console.error("Failed to add bookmark:", err));
  };

  const handleAddBookmark = () => {
    SignApiClient.loginCheck();
    const accessToken = localStorage.getItem("accessToken");
    BookmarkApiClient.addBookmark(accessToken, id)
      .then((res) => {
        if (res.ok) {
          alert("등록되었습니다.");
        }
      })
      .catch((err) => console.error("Failed to add bookmark:", err));
  };

   // 수량 증가
   const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  // 수량 감소
  const decreaseQuantity = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1)); // 최소 1
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


  return (
    product ? (
      <div className="product_detail">
        <img className="productImg"
          src={"/category_" + category + ".jpg"} alt="상품 임시 이미지">
        </img>
        {(role === "ROLE_ADMIN") && 
          (<Link to={`/product/modify/${id}`} className="camping_details_link">
            <img 
              className="camping_modify_button"
              src="/modify.png"
              alt="수정버튼"
            />
          </Link>)} 
        <h2 className="product_name">{product.name}
          <button className="product_bookmark_button" onClick={handleAddBookmark}>
            <img
              src="/bookmark.png"
              alt="Bookmark"
              className="product_bookmark_icon"></img>
          </button>
        </h2>
        <p className="product_price">판매가 : {product.price} 원</p>
        <p className="delivery_price">배송비 : 총 결제금액이 50,000원 미만시 배송비 3,000원이 청구됩니다.</p>
        <div className="quantity_selector">
          <button onClick={decreaseQuantity} className="quantity_button_decrease">-</button>
          <span className="quantity_display">{quantity}</span>
          <button onClick={increaseQuantity} className="quantity_button_increase">+</button>
        </div>
        <p className="total_price">총 가격: {product.price * quantity} 원</p>
        {/* <button className="product_buy_button">구매하기</button> */}
        <button className="product_buy_button">
        <Link to={`/product/${product.id}/order`}>
          구매하기
        </Link>
        </button>

        <button onClick={handleAddCart} className="product_cart">장바구니 등록</button>
       
{/*         
        <sapn className="product_description">{product.description}</sapn> <br/> */}
        
        <div className="product_info_section">
        <div className="info_block">
          <h3>제품설명</h3>
          <p>{product.description}</p>
        </div>
        <div className="info_block">
          <h3>배송안내</h3>
          <p>제품 수령 후 구성품을 꼭 확인해주세요.</p>
          <p>총 결제금액 50,000원 미만 배송비 3,000원이 청구됩니다.</p>
          <p>제품에 따라 유통/배송일정이 상이할 수 있습니다.</p>
        </div>

        <div className="info_block">
          <h3>교환/반품안내</h3>
          <p>교환/반품이 가능한 경우:</p>
          <ul>
            <li>단순 변심으로 인한 교환/반품은 구매자 부담</li>
            <li>상품 하자 또는 오배송은 판매자가 부담</li>
          </ul>
          <p>교환/반품이 불가능한 경우:</p>
          <ul>
            <li>상품을 사용했거나 구성품이 훼손된 경우</li>
            <li>포장을 개봉하여 상품 가치가 감소한 경우</li>
          </ul>
        </div>

        <div className="info_block">
          <h3>A/S 안내</h3>
          <p>제품 A/S는 반드시 손상된 제품이 있고 영수증이 필요합니다.</p>
          <p>자세한 사항은 고객센터로 문의해주세요.</p>
        </div>
        
      </div>
      <div className="reviews_section">
          <h3>리뷰</h3>
          <ul className="reviews_list">
            {product.productReviews.map((review) => (
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

export default ProductDetail;
