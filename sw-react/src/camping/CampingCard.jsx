import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Camping.css"
import AdminApiClient from "../services/camping/AdminApiClient";
import SignApiClient from "../services/auth/SignApiClient";

const CampingCard = ({ camping, setPageRefresh }) => {
  const [role, setRole] = useState(null);

  useEffect(() => {
    setRole(localStorage.getItem('role'));
  }, []);

  const handleDeleteCamping = () => {
    SignApiClient.loginCheck();
    const accessToken = localStorage.getItem('accessToken');
    //const token = "eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJ1c2VyMiIsInJvbGVzIjpbIlJPTEVfVVNFUiJdLCJpYXQiOjE3MzI0OTU3MDcsImV4cCI6MTczMjQ5OTMwN30.J0-8OEXHZNf8yC0OG6sXHm5S45N6IFLDJTCeG8T7_WKj60S3fG7uqzVjKms-1oss";
    AdminApiClient.deleteCamping(accessToken, camping.id).then(res => {  
      if(res.ok) {
        res.json().then(json => {
        if(json.code === "401") {
            //요청 오류
            console.log(json.message);
        } else {
          const timer = setTimeout(() => {
            setPageRefresh((prev) => !prev); // 상태 값을 반전시킴
          }, 1500);
          alert("삭제되었습니다.");
          // 컴포넌트 언마운트 시 타이머 정리

          return () => clearTimeout(timer);
            
          }
        });
      } else if(res.status === 403) {
        const refreshToken = localStorage.getItem('refreshToken');
        SignApiClient.refresh(refreshToken).then(res => {
          res.json().then(json => {
            if(json.msg === "Success") {
              localStorage.setItem('accessToken', json.accessToken);
              AdminApiClient.deleteCamping(json.accessToken, camping.id).then(res => {
                if(res.ok) {
                  res.json().then(json => {
                    if(json.code === "401") {
                        //요청 오류
                        console.log(json.message);
                    } else {
                      const timer = setTimeout(() => {
                        setPageRefresh((prev) => !prev); // 상태 값을 반전시킴
                      }, 1500);
                      alert("삭제되었습니다.");
                      // 컴포넌트 언마운트 시 타이머 정리
            
                      return () => clearTimeout(timer);    
                    }
                  });
                }
              });
            }
          })
        })
      }
      });
  }

  return (
    <div className="camping_card">
      <img src="/camping.png" alt="캠핑장 임시 이미지" className="camping_image"/>
      <h3 className="camping_name">{camping.name}</h3>
      {camping.address && (<p className="camping_address">{camping.address}</p>)}
      {!camping.address && <p className="camping_address">등록된 주소가 없습니다.</p>}
      <Link to={`/camping/${camping.id}`} className="camping_details_link">
        상세보기
      </Link>
      {/* 조건부로 삭제 버튼 활성화 */}
      {(role === 'ROLE_ADMIN') && (
        <button onClick={handleDeleteCamping}>
          삭제
        </button>
      )}
    </div>
  );
};

export default CampingCard;
