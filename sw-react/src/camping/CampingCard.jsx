import React from "react";
import { Link } from "react-router-dom";
import "./Camping.css"

const CampingCard = ({ camping }) => {
  return (
    <div className="camping_card">
      <img src={camping.image} alt={camping.name} className="camping_image"/>
      <h3 className="camping_name">{camping.name}</h3>
      <p className="camping_address">{camping.address}</p>
      <Link to={`/camping/${camping.id}`} className="camping_details_link">
        상세보기
      </Link>
    </div>
  );
};

export default CampingCard;
