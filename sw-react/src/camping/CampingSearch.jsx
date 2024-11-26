import React, { useState, useEffect } from "react";
import "./CampingSearch.css"; 
import CampingApiClient from "../services/camping/CampingApiClient";
import CampingCard from "./CampingCard";

const CampingSearch = () => {
  const [searchString, setSearchString] = useState("");
  const [campings, setCampings] = useState(false);
  const [pageRefresh, setPageRefresh] = useState(true);

  useEffect(() => {
    // if (searchString) {
    //   CampingApiClient.getSearchCampingList(searchString).then(res => {
    //     if(res.ok) {
    //       res.json().then(json => {
    //         if(json.code === "401") {
    //           //요청 오류
    //           console.log(json.message);
    //         } else {
    //           //캠핑장 데이터 불러오기 성공
    //           if(json.length < 1) {
    //             setCampings(false);
    //             setSearchString("");
    //           } else {
    //             setCampings(json);
    //             setSearchString("");
    //           }
    //         }
    //       });
    //     }
    //   });
    // }
    CampingApiClient.getCampingList().then(res => {
      if(res.ok) {
        res.json().then(json => {
          if(json.code === "401") {
            //요청 오류
            console.log(json.message);
          } else {
            //캠핑장 데이터 불러오기 성공
            setCampings(json);
          }
        });
      }
    });
  }, [pageRefresh]);

  return (
    <div className="camping_search_container">
      <div className="camping_search_box">
        <input
          type="text"
          value={searchString}
          onChange={(e) => setSearchString(e.target.value)}
          className="camping_search_input"
          placeholder="캠핑장을 입력하세요."
        />
        <button className="camping_search_button" onClick={() => setPageRefresh((prev) => !prev)}>
            <img
                src="search.png"
                className="searchimg"
            ></img>
        </button>
      </div>
      <div className="camping_cards_search_container">
        {campings && campings.map((camping) => (
          <div className="search_camping_card_wrapper" key={camping.id}>
          <CampingCard key={camping.id} camping={camping} setPageRefresh={setPageRefresh}/>
          </div>
        ))}
        {!campings && (
          <p>검색 결과가 없습니다.</p>
        )}
      </div>
    </div>
    
  );
};

export default CampingSearch;
