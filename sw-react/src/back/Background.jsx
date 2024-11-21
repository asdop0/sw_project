import React, { useState, useEffect }  from "react";
import "/src/App.css";
import {Link, useNavigate} from 'react-router-dom';
import SignApiClient from "../services/auth/SignApiClient";

const Background = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate(); // useNavigate 사용
  const login = localStorage.getItem('login') === "true" ? true : false;

  const toggleDropdown = () => {
    setShowDropdown((prevShow) => !prevShow);
  };
  
  // 회원가입 버튼 클릭 시 Login 페이지로 이동하고, signup 상태를 전달
  const handleSignUpClick = () => {
    setShowDropdown(false); // 드롭다운 닫기
    navigate("/login", { state: { showSignUp: true } });
  };
  
  // 클릭 시 메인 페이지로 이동하는 함수
  const navigateToHome = () => {
    window.location.href = "http://localhost:5173/";
  };
  
  const handleLinkClick = () => {
    setShowDropdown(false); // 드롭다운 닫기
  };

  const handleSignOut= () => {
    const refreshToken = localStorage.getItem('refreshToken');
    SignApiClient.signOut(refreshToken).then(res => {
      if(res.ok) {
        res.json().then(json => {
          if(json.code === "401") {
            //아이디나 비밀번호가 틀렸음
          } else {
            localStorage.setItem('login', false);
            localStorage.setItem('accessToken', null);
            localStorage.setItem('refreshToken', null);
            localStorage.setItem('role', null);
            localStorage.setItem('nickname', null);
            console.log("out: " + localStorage.getItem('login'));
            navigate('/');
            
          }
        });
      }
    });
  };

  useEffect(() => {
    console.log(login);
    console.log(localStorage.getItem('accessToken'));
  }, [login]);

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
              {/* <div className="used_store">중고 장터</div> */}
              <Link to="/used_store" className="used_store">중고장터</Link>
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

          <div>
            {login && (
              <>
                <div className="item-link-7">
                  <span className="mypage-text" onClick={toggleDropdown}>
                    마이페이지
                  </span>
                  {showDropdown && (
                    <div className="dropdown-menu">
                      <Link to="/mypage">
                        <div className="dropdown-item" onClick={handleLinkClick}>나의 정보</div>
                      </Link>

                      <Link to="/note">
                        <div className="dropdown-item" onClick={handleLinkClick}>쪽지함</div>
                      </Link>
            
                      <Link to="/login" >
                        <div className="dropdown-item" onClick={handleLinkClick}>로그아웃</div>
                      </Link>
                    </div>
                  )}
                </div>
                <div className="item-link-9">
                <button className="logout_button" onClick={handleSignOut}>로그아웃</button>
                </div>
              </>
            )}
          </div>

          <div>
            {!login && (
              <>
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
                
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  
    
  );
};

export default Background;