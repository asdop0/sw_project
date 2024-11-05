import React, {useState,useEffect} from "react";
import "/src/App.css";
import { useLocation } from 'react-router-dom'; // useLocation 사용
import {Link} from 'react-router-dom';
import Id_Modal from './modal/Id_Modal'; 
import Password_Modal from "./modal/Password_Modal";
import SignUp_Modal from './modal/SignUp_Modal'; 
// import Adress_Modal from './modal/Adress_Modal';

export const Login = () => {
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false); // 비밀번호 모달 상태 추가
  const [showSignUpModal, setShowSignUpModal] = useState(false); // 회원가입 모달 상태 추가
  // const [showAdressModal, setShowAdressModal] = useState(false);
  useEffect(() => {
    // location.state에서 showSignUp이 true인 경우 회원가입 모달을 자동으로 염
    if (location.state && location.state.showSignUp) {
      setShowSignUpModal(true);
    }
  }, [location]);
  
  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleOpenPasswordModal = () => {
    setShowPasswordModal(true);
  };

  const handleClosePasswordModal = () => {
    setShowPasswordModal(false);
  };
  
  const handleOpenSignUpModal = () => {
    setShowSignUpModal(true);
  };

  const handleCloseSignUpModal = () => {
    setShowSignUpModal(false);
  };

  //test
  const handleOpenAdressModal = () =>{
    setShowAdressModal(true)
  }
  //test


  return (
    <div className="login">
      <div className="div">
        {/* 로그인 박스 */}
        <input className="login_id_box" placeholder="아이디"/> 
        {/* 비밀번호 박스 */}
        <input className="login_password_box" placeholder="비밀번호"/>

        <div className="overlap-group">
          <button className="login_button">로그인</button> 
        </div>

        <div className="login_id">아이디</div>
        <img className="loginicon" src="loginicon.png" />

        <div className="login_password">비밀번호</div>
        <img className="passwordicon" src="passwordicon.png" />
        <div className="login_signup" onClick={handleOpenSignUpModal} >회원가입</div>

        <div className="find_id" onClick={handleOpenModal}>아이디 찾기</div>

        <div className="find_password" onClick={handleOpenPasswordModal}>비밀번호 찾기</div>

        {/* //test
        <div className="text-wrapper-7" onClick={handleOpenAdressModal}>우편번호 테스트</div>
        //test */}


        <div className="rectangle-4" />

        <img
          className="line"
          alt="Line"
          src="https://cdn.animaapp.com/projects/67076c11d0f0ae73b3d7d93c/releases/67188008e1c7a2ddf5e2b0f2/img/line-1.svg"
        />

        <img
          className="img"
          alt="Line"
          src="https://cdn.animaapp.com/projects/67076c11d0f0ae73b3d7d93c/releases/67188008e1c7a2ddf5e2b0f2/img/line-1.svg"
        />
      </div>
      {/* Id모달 컴포넌트 삽입 */}
      <Id_Modal show={showModal} onClose={handleCloseModal} />
      {/* Id모달 컴포넌트 삽입 */}
      <Password_Modal show={showPasswordModal} onClose={handleClosePasswordModal} />
      {/* SignUp_Modal 컴포넌트 삽입 */}
      <SignUp_Modal show={showSignUpModal} onClose={handleCloseSignUpModal} />
      {/* test */}
      {/* <Adress_Modal show={showAdressModal} /> */}
      {/* test */}
    </div>
  );
};

export default Login;