import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const bannerImages = [
  "/images/banner1.jpg",
  "/images/banner2.jpg"
];

export default function BannerSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    pauseOnHover: true
  };

  return (
    <div className="relative">
      <Slider {...settings} className="w-full">
        {bannerImages.map((src, index) => (
          <div key={index}>
            <img
              src={src}
              alt={`Banner ${index + 1}`}
              className="w-full h-[400px] object-cover rounded"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
