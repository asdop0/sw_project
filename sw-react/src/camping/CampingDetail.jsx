import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Store.css";
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

  return (
    camping ? (
      <div className="camping_detail">
        {/* <img src={camping.image} alt={camping.name} className="camping_image" /> */}
        <h2 className="camping_name">{camping.name}</h2>
        <p className="camping_address">{camping.address}</p>
      </div>
    ) : null
  );
};

export default CampingDetail;
