import React from "react";
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
    adaptiveHeight: true,
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
    <div className="relative">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="relative">
            {/* Background Image */}
            <img
              src={slide.image}
              alt={slide.heading}
              className="w-full h-[500px] sm:h-[600px] md:h-[700px] lg:h-[650px] object-cover rounded-lg shadow-lg"
            />

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50 rounded-lg"></div>

            {/* Text Content */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center px-4">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 drop-shadow-lg">
                {slide.heading}
              </h2>
              <p className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-5 drop-shadow-md">
                {slide.subHeading}
              </p>
              <button className="bg-yellow-400 text-black font-semibold px-6 py-2 rounded-lg shadow-md hover:bg-yellow-500 hover:shadow-lg transition duration-300">
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
