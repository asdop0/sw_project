import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Camping.css";
import "../App.css";
import CampingApiClient from "../services/camping/CampingApiClient";

const CampingDetail = () => {
  const { id } = useParams();
  const [camping, setCamping] = useState(null);
  
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
          }
        });
      }
    });
  }, []);

  const createGoogleMapUrl = () => {
  if (camping && camping.latitude && camping.longitude) {
    const url = `https://www.google.com/maps?q=${camping.latitude},${camping.longitude}`;
    console.log("Generated URL:", url);
    return url;
  }
  return "#";
};
  return (
    camping ? (
      <div className="camping_detail">
        {/* <img src={camping.image} alt={camping.name} className="camping_image" /> */}
        
        <img className="campingImg" 
          src="/트리앤캠프스토리.png">
        </img>

        <h2 className="camping_name">
          {camping.name}
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
          <a href={createGoogleMapUrl()} target="_blank" >
            <img className="findway" src="/findway.png"  />
          </a>
        </p>
      </div>
    ) : null
  );
};

export default CampingDetail;
