import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Background from "./back/Background";
import Login from "./Login";
import MapWithClickableRegions from "./map/MapWithClickableRegions";
// import { Sign_up } from "./Sign_up";
import BackImg from "./back/BackImg";
import BottomBar from "./bottombar/BottomBar";
import Store from "./store/Store";
import MyPage from "./mypage/MyPage";
import ProductDetail from "./store/ProductDetail";
import Used_store from "./used_store/Used_store";


function App() {
  const [selectedRegion, setSelectedRegion] = useState('강원도');
  
  return (
    <Router>
      {/* 네비게이션 바 또는 버튼 */}
      <nav>
        {/* 예시: 링크 추가 */}
        <Link to="/login"></Link>
        {/* <Link to="/sign_up"></Link> */}
        <Link to="/bottombar"></Link>
      </nav>

      {/* Routes 설정 */}
      <Routes>
        <Route path="/" element={<> <Background /> <MapWithClickableRegions /> <BackImg selectedRegion={selectedRegion}/> <BottomBar /> </>} />
        <Route path="/login" element={<Login />} />
        <Route path="/store" element={<Store/>} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/used_store" element={<Used_store />} />
        {/* <Route path="/sign_up" element={<Sign_up />} /> */}
      </Routes>
      <Background /> 
    </Router>
  );
}

export default App;