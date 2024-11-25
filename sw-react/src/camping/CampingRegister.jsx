import React, { useState } from "react";
import SignApiClient from "../services/auth/SignApiClient";
import AdminApiClient from "../services/camping/AdminApiClient";
import { useNavigate } from 'react-router-dom';

const CampingRegister = ( onClose ) => {
  // 각 입력값을 상태로 관리
  const [name, setName] = useState('');
  const [homepage, setHomepage] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [address, setAddress] = useState('');
  const [district, setDistrict] = useState('');
  const navigate = useNavigate(); // useNavigate 사용

  const handleAddCamping = () => {
    SignApiClient.loginCheck();
    const accessToken = localStorage.getItem("accessToken"); // 토큰 저장 위치 확인 필요
    AdminApiClient.addCamping(accessToken, name, address, district, homepage, latitude, longitude, phonenumber)
      .then((res) => {
        if (res.ok) {
          alert("등록되었습니다.");
          navigate('/');
        } else {
          console.error("Failed to add camping.");
        }
      })
      .catch((err) => console.error(err));
  };


  return (
    <div className="camping_register">
      <h2>캠핑장 등록</h2>
      <input
        className="camping_register_name"
        placeholder="캠핑장 이름"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="camping_register_homepage"
        placeholder="홈페이지"
        type="text"
        value={homepage}
        onChange={(e) => setHomepage(e.target.value)}
      /><br/>
      <input
        className="camping_register_Latitude"
        placeholder="위도"
        type="text"
        value={latitude}
        onChange={(e) => setLatitude(e.target.value)}
      />
      <input
        className="camping_register_longitude"
        placeholder="경도"
        type="text"
        value={longitude}
        onChange={(e) => setLongitude(e.target.value)}
      />
      <input
        className="camping_register_Phonenumber"
        placeholder="전화번호"
        type="text"
        value={phonenumber}
        onChange={(e) => setPhonenumber(e.target.value)}
      /><br/>
      <input
        className="camping_register_address"
        placeholder="주소"
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <input
        className="camping_register_disctrict"
        placeholder="지역구분"
        type="text"
        value={district}
        onChange={(e) => setDistrict(e.target.value)}
      /><br/>
      <button onClick={handleAddCamping}>확인</button>
      <button onClick={onClose}>닫기</button>
    </div>
  );
};

export default CampingRegister;
