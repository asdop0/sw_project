import React, { useState, useEffect } from "react";
import "./ImageSlider.css"; 

const images = [
  { id: 1, src: "slide1.png", alt: "Slide 1" },
  { id: 2, src: "slide2.png", alt: "Slide 2" },
  { id: 3, src: "slide3.png", alt: "Slide 3" },
  { id: 4, src: "slide4.png", alt: "Slide 4" },
  // 더 많은 이미지를 추가 가능
];

const ImageSlider = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // 3초마다 슬라이드 전환

    return () => clearInterval(interval); // 컴포넌트가 언마운트되면 interval 제거
  }, []);

  return (
    <div className="slider_container">
      <img
        src={images[currentImageIndex].src}
        alt={images[currentImageIndex].alt}
        className="slider_image"
      />
    </div>
  );
};

export default ImageSlider;
