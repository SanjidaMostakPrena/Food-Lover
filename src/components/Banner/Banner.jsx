// import React from "react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// const Banner = () => {
//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 800,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 4000,
//     arrows: true,
//     adaptiveHeight: true,
//   };

//   const slides = [
//     {
//       image: "https://i.ibb.co/prQ3xHJS/cook.jpg",
//       heading: "Discover Local Delights",
//       subHeading: "Taste the best street food!",
//     },
//     {
//       image: "https://i.ibb.co/B5BzrpPx/mmm.jpg",
//       heading: "Food Lovers Unite",
//       subHeading: "Share your experiences!",
//     },
//     {
//       image: "https://i.ibb.co.com/gbWsh4Q3/v.jpg",
//       heading: "Explore Local Recipes",
//       subHeading: "Try authentic flavors near you!",
//     },
//     {
//       image: "https://i.ibb.co.com/Pz1W7bhj/l.webp",
//       heading: "Hidden Gems Await",
//       subHeading: "Discover restaurants off the beaten path!",
//     },
//   ];

//   return (
//     <div className="relative w-full max-w-full overflow-hidden">
//       <Slider {...settings}>
//         {slides.map((slide, index) => (
//           <div key={index} className="relative">

//             {/* Background Image */}
//             <img
//               src={slide.image}
//               alt={slide.heading}
//               className="
//                 w-full 
//                 h-[260px]        /* Mobile height (375px) */
//                 sm:h-[400px] 
//                 md:h-[550px] 
//                 lg:h-[650px] 
//                 object-cover 
//                 rounded-lg 
//                 shadow-lg
//               "
//             />

//             <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50 rounded-lg"></div>

//             <div
//               className="
//                 absolute top-1/2 left-1/2 transform 
//                 -translate-x-1/2 -translate-y-1/2 
//                 text-center 
//                 px-3 sm:px-6
//               "
//             >
//               <h2
//                 className="
//                   text-2xl         /* Perfect for 375px */
//                   sm:text-3xl 
//                   md:text-5xl 
//                   font-bold 
//                   text-white 
//                   mb-2 sm:mb-3 
//                   drop-shadow-lg
//                 "
//               >
//                 {slide.heading}
//               </h2>

//               <p
//                 className="
//                   text-sm sm:text-lg md:text-2xl 
//                   text-gray-200 
//                   mb-4 sm:mb-5 
//                   drop-shadow-md
//                 "
//               >
//                 {slide.subHeading}
//               </p>

//               <button
//                 className="
//                   bg-yellow-400 text-black font-semibold 
//                   px-4 py-2 sm:px-6 sm:py-2 
//                   rounded-lg 
//                   shadow-md 
//                   hover:bg-yellow-500 hover:shadow-lg 
//                   transition duration-300
//                   text-sm sm:text-base
//                 "
//               >
//                 Explore Now
//               </button>
//             </div>

//           </div>
//         ))}
//       </Slider>
//     </div>
//   );
// };

// export default Banner;
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
    appendDots: dots => (
      <div>
        <ul className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex gap-2">
          {dots}
        </ul>
      </div>
    ),
    customPaging: i => (
      <div className="w-3 h-3 rounded-full bg-yellow-400/70 hover:bg-yellow-400 transition"></div>
    ),
  };

  const slides = [
    {
      image: "https://i.ibb.co/prQ3xHJS/cook.jpg",
      heading: "Discover Local Delights",
      subHeading: "Taste the best street food near you!",
      cta: "Explore Now",
    },
    {
      image: "https://i.ibb.co/B5BzrpPx/mmm.jpg",
      heading: "Food Lovers Unite",
      subHeading: "Share your favorite dishes and recipes!",
      cta: "Join Community",
    },
    {
      image: "https://i.ibb.co.com/gbWsh4Q3/v.jpg",
      heading: "Explore Local Recipes",
      subHeading: "Try authentic flavors from your city!",
      cta: "Browse Recipes",
    },
    {
      image: "https://i.ibb.co.com/Pz1W7bhj/l.webp",
      heading: "Hidden Gems Await",
      subHeading: "Discover restaurants off the beaten path!",
      cta: "Find Hidden Gems",
    },
  ];

  return (
    <div className="relative w-full h-[70vh] lg:h-[75vh] xl:h-[80vh] overflow-hidden">
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
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: index * 0.3 }}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center px-4 md:px-6"
            >
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-yellow-400 drop-shadow-lg mb-2 animate-fadeIn">
                {slide.heading}
              </h2>
              <p className="text-sm sm:text-lg md:text-2xl text-white drop-shadow-md mb-4">
                {slide.subHeading}
              </p>
              <button className="bg-yellow-400 text-black font-semibold px-6 py-3 rounded-full shadow-xl hover:bg-yellow-500 hover:scale-105 transition duration-300">
                {slide.cta}
              </button>
            </motion.div>
          </div>
        ))}
      </Slider>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 animate-bounce text-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
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
