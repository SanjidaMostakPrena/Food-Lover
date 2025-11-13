import React, { useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Banner = () => {
   

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: true,
  };

  const slides = [
    {
      image: "https://i.ibb.co/prQ3xHJS/cook.jpg",
      heading: "Discover Local Delights",
      subHeading: "Taste the best street food!",
    },
    {
      image: "https://i.ibb.co/B5BzrpPx/mmm.jpg",
      heading: "Food Lovers Unite",
      subHeading: "Share your experiences!",
    },
    {
      image: "https://i.ibb.co.com/gbWsh4Q3/v.jpg", 
      heading: "Explore Local Recipes",
      subHeading: "Try authentic flavors near you!",
    },
    {
      image: "https://i.ibb.co.com/Pz1W7bhj/l.webp", 
      heading: "Hidden Gems Await",
      subHeading: "Discover restaurants off the beaten path!",
    },
  ];

  return (
    <div className="relative ">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="relative">
            <img
              src={slide.image}
              alt={slide.heading}
              className="w-full h-[500px] object-cover"
            />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
              <h2 className="text-4xl font-bold mb-2">{slide.heading}</h2>
              <p className="text-xl mb-4">{slide.subHeading}</p>
              <button className="bg-primary px-6 py-2 rounded hover:white transition">
                Explore Now
              </button>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Banner;
