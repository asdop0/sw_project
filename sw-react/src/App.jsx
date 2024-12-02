import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Background from "./back/Background";
import Login from "./Login";
import MapWithClickableRegions from "./map/MapWithClickableRegions";
// import { Sign_up } from "./Sign_up";
// import BackImg from "./back/BackImg";
import BottomBar from "./bottombar/BottomBar";
import Store from "./store/Store";
import MyPage from "./mypage/MyPage";
import ProductDetail from "./store/ProductDetail";
import Used_store from "./used_store/Used_store";
import Delivery from "./mypage/Delivery";
import CampingDetail from "./camping/CampingDetail";
import ProductBookmark from "./mypage/ProductBookmark";
import CampingBookmark from "./mypage/CampingBookmark";
import UsedDetail from "./used_store/UsedDetail";
import Order from "./store/Order";
import CampingRegister from "./camping/CampingRegister";
import CampingModify from "./camping/CampingModify";
import ProductRegister from "./store/ProductRegister";
import ProductModify from "./store/ProductModify";
import BoardRegister from "./used_store/BoardRegister";
import CampingSearch from "./camping/CampingSearch";
import UsedStoreSearch from "./used_store/UsedStoreSearch";
import StoreSearch from "./store/StoreSearch";
import ReciveNote from "./mypage/ReciveNote";
import SendNote from "./mypage/Sendnote";
import SendMessage from "./mypage/SendMeassage";

function App() {
  // const [selectedRegion, setSelectedRegion] = useState('강원도');
  
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
        {/* <BackImg selectedRegion={selectedRegion}/> 제거 */}
        <Route path="/" element={<> <Background /> <MapWithClickableRegions /> <BottomBar /> </>} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/store" element={<Store/>} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/used_store" element={<Used_store />} />
        <Route path="/board/:id" element={<UsedDetail />} />
        <Route path="/delivery" element={<Delivery />} />
        <Route path="/camping/:id" element={<CampingDetail />} />
        <Route path="/productbookmark" element={<ProductBookmark />} />
        <Route path="/campingbookmark" element={<CampingBookmark />} />
        <Route path="/product/:id/order/:quantity" element={<Order />} />
        <Route path="/camping/register" element={<CampingRegister />} />
        <Route path="/camping/modify/:id" element={<CampingModify />} />
        <Route path="/board/register" element={<BoardRegister />} />
        <Route path="/product/register" element={<ProductRegister />} />
        <Route path="/product/modify/:id" element={<ProductModify />} />
        <Route path="/campingsearch" element={<CampingSearch />} />
        <Route path="/usedstoresearch" element={<UsedStoreSearch />} />
        <Route path="/storesearch" element={<StoreSearch />} />
        <Route path="/recivenote" element={<ReciveNote />} />
        <Route path="/sendnote" element={<SendNote />} />
        <Route path="/sendmessage" element={<SendMessage />} />

      </Routes>
      <Background /> 
    </Router>
  );
}

export default App;