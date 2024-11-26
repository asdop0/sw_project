import React, { useEffect, useState } from "react";
import SignApiClient from "../services/auth/SignApiClient";
import AdminApiClient from "../services/store/AdminApiClient";
import { useNavigate } from 'react-router-dom';
import CategoryApiClient from '../services/store/CategoryApiClient';

const ProductRegister = () => {
  // 각 입력값을 상태로 관리
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [categoryList, setCategoryList] = useState(null);
  const navigate = useNavigate(); // useNavigate 사용

  useEffect(() => {
    SignApiClient.loginCheck();
    const accessToken = localStorage.getItem("accessToken");
    CategoryApiClient.getCategoryList(accessToken)
    .then((res) => {
      if(res.ok) {
        res.json().then(json => {
          if(json.code === "401") {
            //요청 오류
            console.log(json.message);
          } else {
            //상품 데이터 불러오기 성공
            setCategoryList(json);
          }
        });
      } else {
        console.error("Failed to getCategoryList.");
      }
    })
    .catch((err) => console.error(err));
  }, []);

  const handleAddProduct = () => {
    SignApiClient.loginCheck();
    const accessToken = localStorage.getItem("accessToken"); // 토큰 저장 위치 확인 필요
    AdminApiClient.addProduct(accessToken, name, description, price, category)
      .then((res) => {
        if (res.ok) {
          alert("등록되었습니다.");
          navigate('/store');
        } else {
          console.error("Failed to add product.");
        }
      })
      .catch((err) => console.error(err));
  };


  return (
    <div className="board_register">
      <h2>상품 등록</h2>
      <input
        className="board_register_name"
        placeholder="상품명"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      /><br/>
      <input
        className="board_register_homepage"
        placeholder="상품 설명"
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      /><br/>
      <input
        className="board_register_homepage"
        placeholder="상품 가격"
        type="text"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      /><br/>
      <input
        className="board_register_homepage"
        placeholder="카테고리 번호"
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      /><br/>
      <div>
      <h1>카테고리 목록</h1>
      {categoryList && (<ul>
        {categoryList.map((cate) => (
          <li key={cate.id}>
            {cate.id} {cate.name}
          </li>
        ))}
      </ul>)}
    </div>

      <button onClick={handleAddProduct}>확인</button>
      <button onClick={() => navigate('/store')}>닫기</button>
    </div>
  );
};

export default ProductRegister;
