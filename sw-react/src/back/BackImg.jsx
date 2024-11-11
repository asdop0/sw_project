import React, { useState, useEffect } from "react";
import "/src/App.css";

export const BackImg = ({selectedRegion}) => {
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
      {/* <div className="camping_list">
        {regionData && regionData.map((camping) => (
          <div className="product_card_wrapper" key={camping.id}>
          <CampingCard key={camping.id} camping={camping} />
          </div>
        ))}
      </div> */}
    </div>
  
    
  );
};

export default BackImg;