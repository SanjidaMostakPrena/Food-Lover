import React from "react";
import Slider from "react-slick";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Banner = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
    pauseOnHover: true,
    adaptiveHeight: false,
    appendDots: (dots) => (
      <div>
        <ul className="absolute bottom-4 sm:bottom-6 md:bottom-10 left-1/2 transform -translate-x-1/2 flex gap-2">
          {dots}
        </ul>
      </div>
    ),
    customPaging: (i) => (
      <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-400/70 hover:bg-yellow-400 transition"></div>
    ),
  };

  const slides = [
    {
      image: "https://i.ibb.co/prQ3xHJS/cook.jpg",
      heading: "Local Delights",
      subHeading: "Taste the best street food near you!",
      cta: "Explore Now",
    },
    {
      image: "https://i.ibb.co/B5BzrpPx/mmm.jpg",
      heading: "Food Lovers",
      subHeading: "Share your favorite dishes and recipes!",
      cta: "Join Community",
    },
    {
      image: "https://i.ibb.co/gbWsh4Q3/v.jpg",
      heading: "Explore Recipes",
      subHeading: "Try authentic flavors from your city!",
      cta: "Browse Recipes",
    },
    {
      image: "https://i.ibb.co/Pz1W7bhj/l.webp",
      heading: "Hidden Gems Await",
      subHeading: "Discover restaurants off the beaten path!",
      cta: "Find Hidden Gems",
    },
  ];

  return (
    <div className="relative w-full min-h-[55vh] sm:min-h-[65vh] lg:min-h-[75vh] xl:min-h-[80vh] overflow-hidden">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="relative h-full w-full">
            {/* Background Image */}
            <img
              src={slide.image}
              alt={slide.heading}
              className="w-full h-full object-cover brightness-90"
            />

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50"></div>

            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: index * 0.3 }}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center px-3 sm:px-6 max-w-[90%] sm:max-w-[70%] lg:max-w-[50%]"
            >
              <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-yellow-400 drop-shadow-lg mb-2 animate-fadeIn">
                {slide.heading}
              </h2>
              <p className="text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-white drop-shadow-md mb-4">
                {slide.subHeading}
              </p>
              <button className="bg-yellow-400 text-black font-semibold px-3 xs:px-4 sm:px-6 py-2 xs:py-2.5 sm:py-3 rounded-full shadow-xl hover:bg-yellow-500 hover:scale-105 transition duration-300 text-xs xs:text-sm sm:text-base">
                {slide.cta}
              </button>
            </motion.div>
          </div>
        ))}
      </Slider>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-3 sm:bottom-5 left-1/2 transform -translate-x-1/2 animate-bounce text-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
};

export default Banner;
