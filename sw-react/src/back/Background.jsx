import React, { useState }  from "react";
import "/src/App.css";
import {Link, useNavigate} from 'react-router-dom';

export const Background = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate(); // useNavigate 사용

  const toggleDropdown = () => {
    setShowDropdown((prevShow) => !prevShow);
  };
  
  // 회원가입 버튼 클릭 시 Login 페이지로 이동하고, signup 상태를 전달
  const handleSignUpClick = () => {
    navigate("/login", { state: { showSignUp: true } });
  };
  
  // 클릭 시 메인 페이지로 이동하는 함수
  const navigateToHome = () => {
    window.location.href = "http://localhost:5173/";
  };

  return (
    <div className="background">
      <div className="div-5">
        <div className="list-3">
  
          
          <div className="item-9">
            <div className="link-45">
              <div className="camp"
              onClick={navigateToHome} // 클릭 시 메인 페이지로 이동
              style={{ cursor: "pointer" }}>캠핑장
              </div>
            </div>
          </div>

          <div className="item-11">
            <div className="link-45">
              <div className="used_store">중고 장터</div>
            </div>
          </div>

          <div className="item-13">
            <div className="link-45">
              <Link to="/store" className="store">스토어</Link>
            </div>
            
          </div>

        </div>

        <div className="list-4">
        <div className="skon">
          <img 
                className="top-new-svg-2"
                alt="Top new svg"
                // src="skon.png"
                src="skon_blue.png"
                onClick={navigateToHome} // 클릭 시 메인 페이지로 이동
                style={{ cursor: "pointer" }} // 클릭 가능하도록 커서 스타일 추가
              />
          </div>

          <div className="item-link-7">
            <span className="mypage-text" onClick={toggleDropdown}>
              마이페이지
            </span>
            {showDropdown && (
              <div className="dropdown-menu">
                <Link to="/mypage">
                  <div className="dropdown-item">나의 정보</div>
                </Link>
                  <div className="dropdown-item">쪽지함</div>
                <Link to="/login" >
                  <div className="dropdown-item">로그인</div>
                </Link>
              </div>
            )}
          </div>

          <div className="item-link-8">
            {/* <Link to="/sign_up">
              <span className="sign_up_text">회원가입</span>
            </Link> */}
             {/* 회원가입 클릭 시 Login 페이지로 이동하며 상태 전달 */}
            <span className="sign_up_text" onClick={handleSignUpClick}>회원가입</span>
          </div>
          
          <div className="item-link-9">
          <Link to="/login">
             <span className="login_text">로그인</span>
        </Link>
          </div>
        </div>
      </div>
    </div>
  
    
  );
};

export default Background;