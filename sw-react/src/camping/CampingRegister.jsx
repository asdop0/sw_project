import React from "react";
const CampingRegister = (onClose) => {

  return (
    <div className="camping_register">
        <h2>캠핑장 등록</h2>
        <input className="camping_register_name" placeholder="캠핑장 이름" type="camping_name" /> 
        <input className="camping_register_homepage" placeholder="홈페이지" type="homepage" /><br/>
        <input className="camping_register_Latitude" placeholder="위도" type="Latitude" />
        <input className="camping_register_longitude" placeholder="경도" type="longitude" />
        <input className="camping_register_Coordinates" placeholder="좌표" type="Coordinates" /><br/>
        <input className="camping_register_address" placeholder="주소" type="address" />
        <input className="camping_register_disctrict" placeholder="지역구분" type="disctrict" /><br/>
        <button >확인</button>
        <button onClick={onClose}>닫기</button>
    </div>
  );
};

export default CampingRegister;
