import React, { useEffect, useState } from "react";
import "./Used_store.css";
import UsedCard from "./UsedCard"; // UsedCard 컴포넌트를 가져옵니다.

const Used_store = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = [
        { id: 1, name: "중고 캠핑 의자", category: "캠핑가구", price: "30,000", image: "" },
        { id: 2, name: "중고 캠핑 텐트", category: "텐트", price: "80,000", image: "" },
        { id: 3, name: "중고 랜턴", category: "DIY", price: "15,000", image: "" },
        { id: 4, name: "중고 랜턴", category: "DIY", price: "15,000", image: "" },
        { id: 5, name: "중고 랜턴", category: "DIY", price: "15,000", image: "" }
      ];
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <div className="Used_store">
      <h3 className="recommand" style={{ textAlign: 'left', paddingLeft: '10px', marginBottom: '20px' }}>추천상품</h3>
      <br />
      <div className="product_list">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="product_card_wrapper">
              <UsedCard product={product} /> {/* 각 제품에 대한 UsedCard 컴포넌트를 사용 */}
            </div>
          ))
        ) : (
          <p>등록된 중고 상품이 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default Used_store;
