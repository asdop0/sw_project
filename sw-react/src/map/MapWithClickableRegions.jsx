import React, { useState } from 'react';
//import axios from 'axios'; // axios 추가

const MapWithClickableRegions = () => {
  const [hoveredCity, setHoveredCity] = useState(null);
  const [regionData, setRegionData] = useState([]); // 출력할 데이터 상태 추가
  const [selectedRegion, setSelectedRegion] = useState(null); // 선택된 지역 상태 추가

  const handleMouseEnter = (cityName) => {
    setHoveredCity(cityName); // 마우스를 올리면 해당 도시 이름 저장
  };

  const handleMouseLeave = () => {
    setHoveredCity(null); // 마우스를 떼면 초기화
  };

   // 클릭 시 API 호출 함수 추가
   const handleRegionClick = (regionName) => {
    setSelectedRegion(regionName);
    console.log(`Fetching data for: ${regionName}`);
    axios.get(`http://localhost:8080/camping/district?district=${regionName}`) // 백엔드 API 경로에 맞게 수정
      .then(response => {
        console.log('Response data:', response.data); // API 응답 확인용 콘솔 로그 추가
        if (Array.isArray(response.data)) {
          setRegionData(response.data); // 데이터가 배열이면 설정
        } else {
          console.warn('Response data is not an array:', response.data);
          setRegionData([]); // 데이터가 배열이 아니면 빈 배열로 설정
        }
      })
      .catch(error => {
        console.error('Error fetching region data:', error); // 에러 핸들링 추가
        setRegionData([]); // 에러 발생 시 빈 배열로 설정
      });
  };


  const getFillColor = (cityName) => {
    // 도시 위에 마우스를 올렸을 때 색상을 변경
    return hoveredCity === cityName ? 'rgba(120, 130, 140, 0.5)' : 'transparent';
  };

  return (
    <div className="map" style={{ position: 'relative' }}>
      <h3 className="cm1">Map </h3> 

      {/* 지도 이미지 */}
      <img 
        src="/강원도약도.png" // 이미지 경로에 맞게 설정
        alt="강원도 지도"
        useMap="#gangwon-map"
        style={{ width: '480px', height: '357px' }}  // 이미지 크기 설정
      />

      {/* SVG 오버레이 */}
      <svg
        width="480px" height="357px"  // 이미지와 동일한 크기로 설정
        style={{ position: 'absolute', top: '47', left: '0', pointerEvents: 'none' }}
      >
        {/* 양구군 */}
        <polygon
          points="179,43,167,47,169,55,163,57,162,68,168,92,174,103,174,117,180,111,188,113,193,118,199,114,207,112,209,100,205,86,209,77,209,70,216,63,218,46,208,42,193,44"
          fill={getFillColor('양구군')}
          // onMouseEnter={() => handleMouseEnter('양구군')}
          // onMouseLeave={handleMouseLeave}
          onClick={() => {
            console.log('양구군 클릭됨'); // 클릭 확인용 콘솔 로그
            handleRegionClick('양구군'); // 클릭 시 데이터 로드
          }}
        />
        {/* 철원군 */}
        <polygon
          points="167,47,169,56,162,56,154,57,138,60,134,67,127,63,114,63,107,78,98,80,96,93,88,97,82,94,74,96,67,99,58,93,58,81,51,89,40,77,39,70,32,69,28,63,47,63,75,64,79,45,93,46,105,44,112,39,127,42,134,44,143,44,151,42,158,42"
          fill={getFillColor('철원군')}
          onMouseEnter={() => handleMouseEnter('철원군')}
          onMouseLeave={handleMouseLeave}
        />
        {/* 화천군 */}
        <polygon
          points="164,57,155,58,148,55,141,59,135,66,125,63,115,64,108,77,101,82,90,98,92,106,90,110,94,117,102,119,112,117,111,105,117,103,121,107,132,116,145,114,150,119,162,119,164,109,172,110,173,103,166,94,167,77,162,72,161,65,162,61"
          fill={getFillColor('화천군')}
          onMouseEnter={() => handleMouseEnter('화천군')}
          onMouseLeave={handleMouseLeave}
        />


        {/* 춘천 */}
        <polygon
          points="118,102,112,104,113,114,107,119,111,129,118,130,119,142,116,147,112,151,105,156,105,161,102,169,105,178,100,183,109,186,116,184,119,189,131,188,135,183,145,183,149,175,157,171,158,160,173,155,178,158,185,149,188,135,187,126,192,118,189,112,181,112,174,115,171,109,164,109,166,114,159,118,150,119,146,113,138,114,132,115,129,110,122,108"
          fill={getFillColor('춘천')}
          onMouseEnter={() => handleMouseEnter('춘천')}
          onMouseLeave={handleMouseLeave}
        />

       {/* 인제 */}
       <polygon
          points="212,42,217,46,218,51,218,57,216,63,209,68,210,76,205,86,207,95,209,100,209,105,205,113,194,116,187,125,188,133,194,135,201,142,214,143,222,150,221,156,224,162,233,163,239,153,249,157,256,155,259,148,266,147,272,150,274,144,273,135,270,129,278,127,280,115,274,109,267,107,261,102,259,95,270,90,269,83,259,77,266,73,265,63,256,63,248,60,249,52,242,46,234,44,231,33"
          fill={getFillColor('인제')}
          onMouseEnter={() => handleMouseEnter('인제')}
          onMouseLeave={handleMouseLeave}
        />
      
      {/* 고성 */}
      <polygon
          points=" 231,34,235,15,245,4,254,4,262,8,268,15,273,25,278,33,283,38,287,49,290,60,293,67,284,70,278,74,268,74,266,64,256,64,249,61,250,52,243,46,235,45"
          fill={getFillColor('고성')}
          onMouseEnter={() => handleMouseEnter('고성')}
          onMouseLeave={handleMouseLeave}
        />

        {/* 속초 */}
      <polygon
          points=" 292,67,283,70,279,74,274,77,267,74,262,78,269,84,270,91,285,89,290,86,300,86,302,76"
          fill={getFillColor('속초')}
          onMouseEnter={() => handleMouseEnter('속초')}
          onMouseLeave={handleMouseLeave}
        />

        {/* 양양 */}
      <polygon
          points="300,86,289,85,286,90,279,90,272,91,260,94,263,105,270,109,280,112,282,119,279,124,271,129,275,144,284,144,292,151,299,150,302,144,310,143,317,143,323,141,332,136,327,123,325,115,313,107,303,95 "
          fill={getFillColor('양양')}
          onMouseEnter={() => handleMouseEnter('양양')}
          onMouseLeave={handleMouseLeave}
        />

         {/* 홍천 */}
      <polygon
          points="190,134,186,144,187,151,178,158,172,155,165,158,158,159,158,169,154,174,149,174,148,180,140,183,134,184,120,189,115,184,109,186,105,198,108,203,115,199,124,202,130,203,135,215,143,212,149,217,154,214,157,219,162,220,186,204,191,208,196,202,207,199,211,194,219,198,226,201,236,201,242,189,249,189,256,188,267,189,273,180,279,182,286,178,285,165,293,163,291,157,292,150,284,144,275,145,271,150,265,146,259,148,257,153,251,156,239,151,233,163,225,161,220,156,222,152,218,146,212,142,206,142,197,139"
          fill={getFillColor('홍천')}
          onMouseEnter={() => handleMouseEnter('홍천')}
          onMouseLeave={handleMouseLeave}
        />

         {/* 강릉 */}
      <polygon
          points="293,151,294,162,301,165,308,171,314,174,322,174,325,181,328,188,323,192,322,206,319,211,313,211,311,219,316,223,324,222,330,222,335,226,339,229,344,224,345,214,352,213,355,219,365,223,372,221,378,219,378,211,386,208,380,203,378,192,368,179,358,169,350,162,334,135,325,142,316,142,304,142,300,149"
          fill={getFillColor('강릉')}
          onMouseEnter={() => handleMouseEnter('강릉')}
          onMouseLeave={handleMouseLeave}
        />

         {/* 횡성 */}
      <polygon
          points="224,270,217,271,210,275,201,277,196,271,197,265,203,261,203,255,207,250,202,244,193,245,185,243,180,238,180,232,173,235,169,242,168,251,168,258,161,249,155,248,153,242,146,238,145,232,162,222,185,205,191,208,196,202,206,200,211,195,216,198,223,201,229,204,235,203,242,208,239,216,244,229,238,235,235,241,236,250,240,255,234,256,224,258"
          fill={getFillColor('횡성')}
          onMouseEnter={() => handleMouseEnter('횡성')}
          onMouseLeave={handleMouseLeave}
        />

        {/* 평창 */}
      <polygon
          points="238,201,242,208,240,216,245,228,237,235,235,248,240,254,248,261,248,276,257,279,264,277,264,268,274,271,275,278,285,276,294,282,297,276,291,258,283,254,282,247,286,240,293,241,295,231,298,224,299,214,305,213,306,220,312,217,310,210,317,210,321,202,320,194,325,188,325,181,320,174,313,172,304,168,299,164,292,163,285,165,287,171,288,177,284,181,275,180,269,183,268,189,261,188,252,188,245,187,242,193"
          fill={getFillColor('평창')}
          onMouseEnter={() => handleMouseEnter('평창')}
          onMouseLeave={handleMouseLeave}
        />

         {/* 원주 */}
      <polygon
          points="179,231,173,233,168,243,170,256,165,260,162,253,154,247,155,257,148,262,150,270,145,276,150,281,144,286,142,300,147,314,153,316,159,311,172,314,175,306,182,302,179,294,194,287,197,292,198,299,194,304,212,296,211,301,219,297,221,291,227,290,232,284,226,279,220,282,213,282,205,278,198,275,197,265,204,261,202,255,207,250,202,244,195,245,188,244,181,241"
          fill={getFillColor('원주')}
          onMouseEnter={() => handleMouseEnter('원주')}
          onMouseLeave={handleMouseLeave}
        />

        {/* 영월 */}
      <polygon
          points="224,258,226,267,222,271,216,271,213,275,211,281,218,283,227,279,232,280,231,286,227,290,234,301,238,296,244,296,246,301,242,305,238,308,245,311,253,309,260,310,256,315,262,316,267,315,267,321,278,317,286,321,290,325,301,324,307,331,322,338,329,338,326,329,336,324,340,331,351,331,352,323,356,315,355,307,347,304,338,306,334,299,326,295,320,299,312,301,303,297,295,294,292,288,294,282,287,278,275,277,271,270,264,268,265,275,261,279,254,278,247,276,248,267,247,260,241,254,234,258"
          fill={getFillColor('영월')}
          onMouseEnter={() => handleMouseEnter('영월')}
          onMouseLeave={handleMouseLeave}
        />

         {/* 정선 */}
      <polygon
          points="300,214,299,222,296,227,295,236,294,242,285,239,283,249,288,257,292,260,294,266,297,273,301,278,297,282,293,289,292,294,298,294,305,298,309,302,315,300,320,301,325,296,334,298,338,302,346,304,353,306,356,302,354,295,350,289,350,283,346,278,349,271,343,269,339,263,344,259,345,253,351,247,352,240,358,241,364,237,364,228,366,222,360,222,352,219,352,212,345,214,345,220,341,226,335,228,333,225,329,220,323,221,316,222,311,217,307,221"
          fill={getFillColor('정선')}
          onMouseEnter={() => handleMouseEnter('정선')}
          onMouseLeave={handleMouseLeave}
        />

          {/* 동해 */}
      <polygon
          points="367,224,365,232,365,238,361,242,368,245,376,246,379,240,389,240,400,235,391,223,392,214,384,207,379,212,380,219"
          fill={getFillColor('동해')}
          onMouseEnter={() => handleMouseEnter('동해')}
          onMouseLeave={handleMouseLeave}
        />

         {/* 삼척 */}
      <polygon
          points="350,243,360,242,373,246,378,240,388,240,394,241,398,236,406,245,409,251,418,256,422,262,423,268,435,289,436,297,434,303,436,310,427,313,418,317,412,324,418,334,410,336,403,335,394,323,388,322,389,311,385,304,377,302,373,294,375,281,373,271,366,266,357,280,360,290,355,294,350,288,348,281,346,279,349,270,343,268,339,266,345,260,345,254,353,247"
          fill={getFillColor('삼척')}
          onMouseEnter={() => handleMouseEnter('삼척')}
          onMouseLeave={handleMouseLeave}
        />

         {/* 삼척 */}
      <polygon
          points="350,243,360,242,373,246,378,240,388,240,394,241,398,236,406,245,409,251,418,256,422,262,423,268,435,289,436,297,434,303,436,310,427,313,418,317,412,324,418,334,410,336,403,335,394,323,388,322,389,311,385,304,377,302,373,294,375,281,373,271,366,266,357,280,360,290,355,294,350,288,348,281,346,279,349,270,343,268,339,266,345,260,345,254,353,247"
          fill={getFillColor('삼척')}
          onMouseEnter={() => handleMouseEnter('삼척')}
          onMouseLeave={handleMouseLeave}
        />

         {/* 태백 */}
      <polygon
          points="370,266,363,271,358,280,359,287,360,293,357,302,356,315,353,322,360,328,365,323,374,328,381,331,381,322,387,321,387,313,390,307,384,304,376,302,373,293,371,286,375,281,372,275,375,272"
          fill={getFillColor('태백')}
          onMouseEnter={() => handleMouseEnter('태백')}
          onMouseLeave={handleMouseLeave}
        />

      </svg>

      <map name="gangwon-map">
        {/* 양구군 */}
        <area
          shape="poly"
          coords="179,43,167,47,169,55,163,57,162,68,168,92,174,103,174,117,180,111,188,113,193,118,199,114,207,112,209,100,205,86,209,77,209,70,216,63,218,46,208,42,193,44"
          alt="양구군"
          // href="https://naver.com"
          // onMouseEnter={() => handleMouseEnter('양구군')}
          // onMouseLeave={handleMouseLeave}
          onClick={() => {
            console.log('양구군 클릭됨');
            handleRegionClick('양구군');
          }}
        />
        {/* 철원군 */}
        <area
          shape="poly"
          coords="167,47,169,56,162,56,154,57,138,60,134,67,127,63,114,63,107,78,98,80,96,93,88,97,82,94,74,96,67,99,58,93,58,81,51,89,40,77,39,70,32,69,28,63,47,63,75,64,79,45,93,46,105,44,112,39,127,42,134,44,143,44,151,42,158,42"
          alt="철원군"
          href="https://www.cwg.go.kr/"
          onMouseEnter={() => handleMouseEnter('철원군')}
          onMouseLeave={handleMouseLeave}
        />
        
        {/* 화천군 */}
        <area
          shape="poly"
          coords="118,102,112,104,113,114,107,119,111,129,118,130,119,142,116,147,112,151,105,156,105,161,102,169,105,178,100,183,109,186,116,184,119,189,131,188,135,183,145,183,149,175,157,171,158,160,173,155,178,158,185,149,188,135,187,126,192,118,189,112,181,112,174,115,171,109,164,109,166,114,159,118,150,119,146,113,138,114,132,115,129,110,122,108"
          alt="춘천"
          href="https://naver.com"
          onMouseEnter={() => handleMouseEnter('춘천')}
          onMouseLeave={handleMouseLeave}
        />


 
        {/* 춘천 */}
        <area
          shape="poly"
          coords="164,57,155,58,148,55,141,59,135,66,125,63,115,64,108,77,101,82,90,98,92,106,90,110,94,117,102,119,112,117,111,105,117,103,121,107,132,116,145,114,150,119,162,119,164,109,172,110,173,103,166,94,167,77,162,72,161,65,162,61"
          alt="화천군"
          href="https://naver.com"
          onMouseEnter={() => handleMouseEnter('화천군')}
          onMouseLeave={handleMouseLeave}
        />

        {/* 인제 */}
        <area
          shape="poly"
          coords="212,42,217,46,218,51,218,57,216,63,209,68,210,76,205,86,207,95,209,100,209,105,205,113,194,116,187,125,188,133,194,135,201,142,214,143,222,150,221,156,224,162,233,163,239,153,249,157,256,155,259,148,266,147,272,150,274,144,273,135,270,129,278,127,280,115,274,109,267,107,261,102,259,95,270,90,269,83,259,77,266,73,265,63,256,63,248,60,249,52,242,46,234,44,231,33"
          alt="인제"
          href="https://naver.com"
          onMouseEnter={() => handleMouseEnter('인제')}
          onMouseLeave={handleMouseLeave}
        />

         {/* 고성 */}
         <area
          shape="poly"
          coords="231,34,235,15,245,4,254,4,262,8,268,15,273,25,278,33,283,38,287,49,290,60,293,67,284,70,278,74,268,74,266,64,256,64,249,61,250,52,243,46,235,45"
          alt="고성"
          href="https://naver.com"
          onMouseEnter={() => handleMouseEnter('고성')}
          onMouseLeave={handleMouseLeave}
        />

        {/* 속초 */}
        <area
          shape="poly"
          coords="292,67,283,70,279,74,274,77,267,74,262,78,269,84,270,91,285,89,290,86,300,86,302,76"
          alt="속초"
          href="https://naver.com"
          onMouseEnter={() => handleMouseEnter('속초')}
          onMouseLeave={handleMouseLeave}
        />

        {/* 양양 */}
        <area
          shape="poly"
          coords="300,86,289,85,286,90,279,90,272,91,260,94,263,105,270,109,280,112,282,119,279,124,271,129,275,144,284,144,292,151,299,150,302,144,310,143,317,143,323,141,332,136,327,123,325,115,313,107,303,95"
          alt="양양"
          href="https://naver.com"
          onMouseEnter={() => handleMouseEnter('양양')}
          onMouseLeave={handleMouseLeave}
        />

        {/* 홍천 */}
        <area
          shape="poly"
          coords="190,134,186,144,187,151,178,158,172,155,165,158,158,159,158,169,154,174,149,174,148,180,140,183,134,184,120,189,115,184,109,186,105,198,108,203,115,199,124,202,130,203,135,215,143,212,149,217,154,214,157,219,162,220,186,204,191,208,196,202,207,199,211,194,219,198,226,201,236,201,242,189,249,189,256,188,267,189,273,180,279,182,286,178,285,165,293,163,291,157,292,150,284,144,275,145,271,150,265,146,259,148,257,153,251,156,239,151,233,163,225,161,220,156,222,152,218,146,212,142,206,142,197,139"
          alt="홍천"
          href="https://naver.com"
          onMouseEnter={() => handleMouseEnter('홍천')}
          onMouseLeave={handleMouseLeave}
        />

        {/* 강릉 */}
        <area
          shape="poly"
          coords="293,151,294,162,301,165,308,171,314,174,322,174,325,181,328,188,323,192,322,206,319,211,313,211,311,219,316,223,324,222,330,222,335,226,339,229,344,224,345,214,352,213,355,219,365,223,372,221,378,219,378,211,386,208,380,203,378,192,368,179,358,169,350,162,334,135,325,142,316,142,304,142,300,149"
          alt="강릉"
          href="https://naver.com"
          onMouseEnter={() => handleMouseEnter('강릉')}
          onMouseLeave={handleMouseLeave}
        />

        {/* 횡성 */}
        <area
          shape="poly"
          coords="224,270,217,271,210,275,201,277,196,271,197,265,203,261,203,255,207,250,202,244,193,245,185,243,180,238,180,232,173,235,169,242,168,251,168,258,161,249,155,248,153,242,146,238,145,232,162,222,185,205,191,208,196,202,206,200,211,195,216,198,223,201,229,204,235,203,242,208,239,216,244,229,238,235,235,241,236,250,240,255,234,256,224,258\"
          alt="횡성"
          href="https://naver.com"
          onMouseEnter={() => handleMouseEnter('횡성')}
          onMouseLeave={handleMouseLeave}
        />

        {/* 평창 */}
        <area
          shape="poly"
          coords="238,201,242,208,240,216,245,228,237,235,235,248,240,254,248,261,248,276,257,279,264,277,264,268,274,271,275,278,285,276,294,282,297,276,291,258,283,254,282,247,286,240,293,241,295,231,298,224,299,214,305,213,306,220,312,217,310,210,317,210,321,202,320,194,325,188,325,181,320,174,313,172,304,168,299,164,292,163,285,165,287,171,288,177,284,181,275,180,269,183,268,189,261,188,252,188,245,187,242,193"
          alt="평창"
          href="https://naver.com"
          onMouseEnter={() => handleMouseEnter('평창')}
          onMouseLeave={handleMouseLeave}
        />

         {/* 원주 */}
         <area
          shape="poly"
          coords="179,231,173,233,168,243,170,256,165,260,162,253,154,247,155,257,148,262,150,270,145,276,150,281,144,286,142,300,147,314,153,316,159,311,172,314,175,306,182,302,179,294,194,287,197,292,198,299,194,304,212,296,211,301,219,297,221,291,227,290,232,284,226,279,220,282,213,282,205,278,198,275,197,265,204,261,202,255,207,250,202,244,195,245,188,244,181,241"
          alt="원주"
          href="https://naver.com"
          onMouseEnter={() => handleMouseEnter('원주')}
          onMouseLeave={handleMouseLeave}
        />

         {/* 영월 */}
         <area
          shape="poly"
          coords="224,258,226,267,222,271,216,271,213,275,211,281,218,283,227,279,232,280,231,286,227,290,234,301,238,296,244,296,246,301,242,305,238,308,245,311,253,309,260,310,256,315,262,316,267,315,267,321,278,317,286,321,290,325,301,324,307,331,322,338,329,338,326,329,336,324,340,331,351,331,352,323,356,315,355,307,347,304,338,306,334,299,326,295,320,299,312,301,303,297,295,294,292,288,294,282,287,278,275,277,271,270,264,268,265,275,261,279,254,278,247,276,248,267,247,260,241,254,234,258"
          alt="영월"
          href="https://naver.com"
          onMouseEnter={() => handleMouseEnter('영월')}
          onMouseLeave={handleMouseLeave}
        />

         {/* 정선 */}
         <area
          shape="poly"
          coords="300,214,299,222,296,227,295,236,294,242,285,239,283,249,288,257,292,260,294,266,297,273,301,278,297,282,293,289,292,294,298,294,305,298,309,302,315,300,320,301,325,296,334,298,338,302,346,304,353,306,356,302,354,295,350,289,350,283,346,278,349,271,343,269,339,263,344,259,345,253,351,247,352,240,358,241,364,237,364,228,366,222,360,222,352,219,352,212,345,214,345,220,341,226,335,228,333,225,329,220,323,221,316,222,311,217,307,221"
          alt="정선"
          href="https://naver.com"
          onMouseEnter={() => handleMouseEnter('정선')}
          onMouseLeave={handleMouseLeave}
        />
        
         {/* 동해 */}
         <area
          shape="poly"
          coords="367,224,365,232,365,238,361,242,368,245,376,246,379,240,389,240,400,235,391,223,392,214,384,207,379,212,380,219   "
          alt="동해"
          href="https://naver.com"
          onMouseEnter={() => handleMouseEnter('동해')}
          onMouseLeave={handleMouseLeave}
        />

          {/* 삼척 */}
          <area
          shape="poly"
          coords="350,243,360,242,373,246,378,240,388,240,394,241,398,236,406,245,409,251,418,256,422,262,423,268,435,289,436,297,434,303,436,310,427,313,418,317,412,324,418,334,410,336,403,335,394,323,388,322,389,311,385,304,377,302,373,294,375,281,373,271,366,266,357,280,360,290,355,294,350,288,348,281,346,279,349,270,343,268,339,266,345,260,345,254,353,247 "
          alt="삼척"
          href="https://naver.com"
          onMouseEnter={() => handleMouseEnter('삼척')}
          onMouseLeave={handleMouseLeave}
        />

        {/* 태백 */}
        <area
          shape="poly"
          coords="370,266,363,271,358,280,359,287,360,293,357,302,356,315,353,322,360,328,365,323,374,328,381,331,381,322,387,321,387,313,390,307,384,304,376,302,373,293,371,286,375,281,372,275,375,272"
          alt="태백"
          href="https://naver.com"
          onMouseEnter={() => handleMouseEnter('태백')}
          onMouseLeave={handleMouseLeave}
        />

        {/* 다른 지역들도 동일하게 추가 */}
      </map>

{/* 선택된 지역의 캠핑 데이터 출력 */}
{selectedRegion && (
        <div>
          <h3>{selectedRegion}의 캠핑장 리스트</h3>
          {Array.isArray(regionData) && regionData.length > 0 ? (
            <ul>
              {regionData.map((camp, index) => (
                <li key={index}>{camp.name} - {camp.address}</li>
              ))}
            </ul>
          ) : (
            <p>해당 지역에 캠핑장 데이터가 없습니다.</p>
          )}
        </div>
      )}
    </div>
    
  );
};

export default MapWithClickableRegions;
