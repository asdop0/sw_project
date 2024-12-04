import React, { useState }  from "react";
import "./Delivery_Modal.css";
import Add_Delivery_Modal from "./Add_Delivery_Modal";

const Delivery_Modal = ({ onClose }) => {
  const [isAddDeliveryModalOpen, setIsAddDeliveryModalOpen] = useState(false);

  const openAddDeliveryModal = () => {
    setIsAddDeliveryModalOpen(true);
  };

  const closeAddDeliveryModal = () => {
    setIsAddDeliveryModalOpen(false);
  };


  const add_Address = {
    name: "김승겸",
    addr: "경기도 포천시 소흘읍 송우리 725-6 송천마을뜨란채, 214-701",
    phoneNumber: "010-8746-0789",
    req: "직접 받고 부재 시 문 앞",
  };

  return (
    <div className="delivery_modal_overlay">
      <div className="delivery_modal_content">
        <h2>배송지 선택</h2>
        <div className="address_card">
          <p>
            <strong>{add_Address.name}</strong>{" "}
          </p>
          <p>{add_Address.addr}</p>
          <p>{add_Address.phoneNumber}</p>
          <p>{add_Address.req}</p>
          <div className="modal_button_group">
            <button className="delete_button">삭제</button>
          </div>
        </div>
        <button className="add_address_button" onClick={openAddDeliveryModal}>+ 배송지 추가</button>
        <button className="close_button" onClick={onClose}>닫기</button>
      </div>
      {isAddDeliveryModalOpen && (
        <Add_Delivery_Modal onClose={closeAddDeliveryModal} />
      )}
    </div>
  );
};

export default Delivery_Modal;
