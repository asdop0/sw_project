import React, { useEffect } from 'react';
import './DaumPost.module.css'; 
const Adress_Modal = ({ show, onClose, 
  //{/* /배송지 저장 test  */}
  onAddressSelect
  //{/* /배송지 저장 test  */}
}) => {
  useEffect(() => {
    if (show) {
      new window.daum.Postcode({
        oncomplete: function (data) {
          // 우편번호 API에서 선택된 주소를 사용할 수 있습니다.
          console.log("선택된 주소:", data.address); // 원하는 동작으로 변경 가능
        
          {/* /배송지 저장 test  */}
          if (onAddressSelect) {
            onAddressSelect(data.roadAddress); // 도로명 주소 전달
          }
          {/* /배송지 저장 test  */}

          if (onClose) {
            onClose();
          }
        },
      }).open();
    }
  }, [show, onClose, 
    //{/* /배송지 저장 test  */}
    onAddressSelect
    //{/* /배송지 저장 test  */}
  ]);

  return (
    <div className={`adress-modal ${show ? 'show' : ''}`}>
      <div className="modal-content">
        {/* 모달 내부에 추가적인 컨텐츠를 여기에 추가할 수 있습니다 */}
        {/* <button onClick={onClose}>닫기</button> */}
      </div>
    </div>
  );
};

export default Adress_Modal;
