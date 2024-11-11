import React from "react";

const AddAddress_Modal = ({ onClose }) => {
  return (
    <div className="add_address_modal">
      <div className="modal_content">
        <h2>배송지 추가</h2>
        <div className="input_group">
          <label>받는 사람</label>
          <input type="text" placeholder="이름을 입력하세요" />
        </div>
        <div className="input_group">
          <label>우편번호</label>
          <div className="input_with_button">
            <input type="text" placeholder="우편번호 입력" />
            <button className="search_button">우편번호 찾기</button>
          </div>
        </div>
        <div className="input_group">
          <label>휴대폰 번호</label>
          <input type="text" placeholder="휴대폰 번호 입력" />
        </div>
        <div className="input_group">
          <label>배송 요청사항</label>
          <input type="text" placeholder="요청사항 입력" />
        </div>
        <div className="input_group checkbox_group">
          <input type="checkbox" id="default_address" />
          <label htmlFor="default_address">기본 배송지로 선택</label>
        </div>
        <button className="save_button">저장</button>
        <button onClick={onClose} className="close_button">닫기</button>
      </div>
    </div>
  );
};

export default AddAddress_Modal;
