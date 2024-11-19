import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Store.css";
import "../App.css";
import ProductApiClient from "../services/store/ProductApiClient";
import BookmarkApiClient from "../services/camping/BookmarkApiClient";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [bookmarkCount, setBookmarkCount] = useState(0);  
  const [quantity, setQuantity] = useState(1);
  
  //api 호출
  useEffect(() => {
    ProductApiClient.viewProduct(id).then(res => {
      if(res.ok) {
        res.json().then(json => {
          if(json.code === "401") {
            //요청 오류
            console.log(json.message);
          } else {
            //상품 데이터 불러오기 성공
            setProduct(json);
            fetchBookmarkCount();
          }
        });
      }
    });
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

   // 수량 증가
   const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  // 수량 감소
  const decreaseQuantity = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1)); // 최소 1
  };


  return (
    product ? (
      <div className="product_detail">
        <img className="productImg"
          src="/store1.png">
        </img>
        <h2 className="product_name">{product.name}
          <button className="product_bookmark_button">
            <img
              src="/bookmark.png"
              alt="Bookmark"
              className="product_bookmark_icon"></img>
          </button>
          <span className="bookmark_count">({bookmarkCount})</span>
        </h2>
        <p className="product_price">판매가 : {product.price} 원</p>
        <p className="delivery_price">배송비 : 총 결제금액이 50,000원 미만시 배송비 3,000원이 청구됩니다.</p>
        <div className="quantity_selector">
          <button onClick={decreaseQuantity} className="quantity_button_decrease">-</button>
          <span className="quantity_display">{quantity}</span>
          <button onClick={increaseQuantity} className="quantity_button_increase">+</button>
        </div>
        <p className="total_price">총 가격: {product.price * quantity} 원</p>
        <button className="product_buy_button">구매하기</button>
        <button className="product_cart">장바구니</button>
        <button className="product_bookmark">찜</button>
        
        <p className="product_description">{product.description}</p>
        
      </div>
      
    ) : null
  );
};

export default ProductDetail;
