import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Store.css";
import "../App.css";
import ProductApiClient from "../services/store/ProductApiClient";
import BookmarkApiClient from "../services/store/BookmarkApiClient";
import CartApiClient from "../services/store/CartApiClient";
import SignApiClient from "../services/auth/SignApiClient";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);  
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState(0);
  
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
  }, []);

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


  return (
    product ? (
      <div className="product_detail">
        <img className="productImg"
          src={"/category_" + category + ".jpg"} alt="상품 임시 이미지">
        </img>
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
        <button className="product_buy_button">구매하기</button>
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

        
      </div>
      
    ) : null
  );
};

export default ProductDetail;
