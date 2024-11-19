import React, { useState, useEffect } from "react";
import "/src/App.css";
import CampingApiClient from "../services/camping/CampingApiClient";
import CampingCard from "../camping/CampingCard";

export const BackImg = ({selectedRegion}) => {
  const [selectedOption, setSelectedOption] = useState('최신');
  const [regionData, setRegionData] = useState(null); // 출력할 데이터 상태 추가

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  //api 호출
  useEffect(() => {
    if(selectedRegion === '강원도') {
      CampingApiClient.getCampingList().then(res => {
        if(res.ok) {
          res.json().then(json => {
            if(json.code === "401") {
              //요청 오류
              console.log(json.message);
            } else {
              //캠핑장 데이터 불러오기 성공
              setRegionData(json);
            }
          });
        }
      });
    } else {
      CampingApiClient.getDistrictList(selectedRegion).then(res => {
        if(res.ok) {
          res.json().then(json => {
            if(json.code === "401") {
              //요청 오류
              console.log(json.message);
            } else {
              //캠핑장 데이터 불러오기 성공
              setRegionData(json);
            }
          });
        }
      });
    }
  }, [selectedRegion]);

  return (
    <div className="BackImg">
      <select 
      className="category_Latest" 
      value={selectedOption} 
      onChange={handleSelectChange}
    >
      <option value="최신">최신</option>
      <option value="후기순">후기순</option>
      <option value="댓글순">댓글순</option>
    </select>
      <div className="camping_list">
        {regionData && regionData.map((camping) => (
          <div className="product_card_wrapper" key={camping.id}>
          <CampingCard key={camping.id} camping={camping} />
          </div>
        ))}
      </div>
    </div>
  
    
  );
};

export default BackImg;