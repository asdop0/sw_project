import React,{useState} from "react";
import "/src/App.css";

export const BackImg = () => {
  const [selectedOption, setSelectedOption] = useState('최신');

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

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
      <img className="map1"
        src="" // 이미지 경로에 맞게 설정
        style={{ width: '161px', height: '150px' }}  // 이미지 크기 설정
        
      />
      <img className="map2"
        src="" // 이미지 경로에 맞게 설정
        style={{ width: '161px', height: '150px' }}  // 이미지 크기 설정
      />
      <img className="map3"
        src="" // 이미지 경로에 맞게 설정
        style={{ width: '161px', height: '150px' }}  // 이미지 크기 설정
      />
      {/* <img className="map4"
        src="/map1.png  " // 이미지 경로에 맞게 설정
        style={{ width: '161px', height: '120px' }}  // 이미지 크기 설정
      />
      <img className="map5"
        src="map2.png" // 이미지 경로에 맞게 설정
        style={{ width: '161px', height: '120px' }}  // 이미지 크기 설정
      />
      <img className="map6"
        src="map3.png" // 이미지 경로에 맞게 설정
        style={{ width: '161px', height: '120px' }}  // 이미지 크기 설정
      /> */}
      {/* <div className="category">
        <button>최신</button>
      </div> */}
    </div>
  
    
  );
};

export default BackImg;