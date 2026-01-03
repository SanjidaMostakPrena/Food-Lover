// import { Link } from "react-router-dom";
// import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
// import { motion } from "framer-motion";

// const Footer = () => {
//   return (
//     <footer className="relative mt-14">
//       <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f2d] via-[#05092d] to-[#0a0f2d]"></div>
//       <div className="absolute -top-20 left-10 w-72 h-72 bg-orange-400 opacity-20 blur-3xl rounded-full"></div>
//       <div className="absolute bottom-0 right-0 w-72 h-72 bg-red-500 opacity-20 blur-3xl rounded-full"></div>

//       <div className="relative text-gray-300 py-16">
//         <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">

       
          
//             <div className="flex flex-col gap-4">
//   <div className="flex items-center justify-center md:justify-start gap-3">
//     <span className="text-xl font-bold text-white">FOOD LOVER</span>

//   </div>


//             <p className="text-sm text-gray-300 leading-relaxed max-w-xs mx-auto md:mx-0">
//               Discover, share, and enjoy authentic local food experiences with food lovers near you!
//             </p>
//           </div>

        
//           <div>
//             <h3 className="text-xl font-semibold text-white mb-4 tracking-wide">
//               Quick Links
//             </h3>

//             <ul className="space-y-2 text-gray-300">
//               <li>
//                 <Link to="/" className="hover:text-yellow-400 transition duration-200">
//                   Home
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/AllFood" className="hover:text-yellow-400 transition duration-200">
//                   All Food
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/AllReviews" className="hover:text-yellow-400 transition duration-200">
//                   All Reviews
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/Myfavorites" className="hover:text-yellow-400 transition duration-200">
//                   My Favorites
//                 </Link>
//               </li>
//             </ul>
//           </div>

          
//           <div>
//             <h3 className="text-xl font-semibold text-white mb-4 tracking-wide">
//               Follow Us
//             </h3>

//             <div className="flex justify-center md:justify-start gap-5">
//               <a href="#" className="hover:text-yellow-400 transition duration-200">
//                 <FaFacebook size={24} />
//               </a>
//               <a href="#" className="hover:text-yellow-400 transition duration-200">
//                 <FaInstagram size={24} />
//               </a>
//               <a href="#" className="hover:text-yellow-400 transition duration-200">
//                 <FaYoutube size={24} />
//               </a>
//             </div>
//           </div>
//         </div>

//         <div className="border-t border-gray-700 mt-10 pt-5 text-center text-sm text-gray-400">
//           © {new Date().getFullYear()}{" "}
//           <span className="text-white font-medium">Local Food Lovers</span> — All rights reserved.
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative mt-14">
      {/* Background Gradient & Blobs */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f2d] via-[#05092d] to-[#0a0f2d]"></div>
      <div className="absolute -top-20 left-10 w-72 h-72 bg-yellow-400 opacity-20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-red-500 opacity-20 blur-3xl rounded-full"></div>

      {/* Footer Content */}
      <div className="relative text-gray-300 py-16">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">

          {/* Brand & Description */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <span className="text-yellow-400 text-2xl md:text-3xl animate-bounce">🍽️ </span>

    {/* Logo Text */}
    <span className="text-white font-extrabold text-lg md:text-2xl tracking-wider">
      Yum
      <span className="text-yellow-400">Yard</span>
    </span>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed max-w-xs mx-auto md:mx-0">
              Discover, share, and enjoy authentic local food experiences with food lovers near you!
            </p>

            {/* Contact Info */}
            <div className="mt-4 space-y-2 text-gray-300">
              <p className="flex items-center gap-2 hover:text-yellow-400 transition">
                <FaPhoneAlt /> +1 (123) 456-7890
              </p>
              <p className="flex items-center gap-2 hover:text-yellow-400 transition">
                <FaEnvelope /> contact@foodlover.com
              </p>
              <p className="flex items-center gap-2 hover:text-yellow-400 transition">
                <FaMapMarkerAlt /> 123 Foodie Street, Flavor Town
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4 tracking-wide">
              Quick Links
            </h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link to="/" className="hover:text-yellow-400 transition duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/allfood" className="hover:text-yellow-400 transition duration-200">
                  All Food
                </Link>
              </li>
              <li>
                <Link to="/allreviews" className="hover:text-yellow-400 transition duration-200">
                  All Reviews
                </Link>
              </li>
              <li>
                <Link to="/myfavorites" className="hover:text-yellow-400 transition duration-200">
                  My Favorites
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-yellow-400 transition duration-200">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-yellow-400 transition duration-200">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-yellow-400 transition duration-200">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4 tracking-wide">
              Follow Us
            </h3>
            <div className="flex justify-center md:justify-start gap-5">
              <a href="#" className="hover:text-yellow-400 transition duration-200">
                <FaFacebook size={24} />
              </a>
              <a href="#" className="hover:text-yellow-400 transition duration-200">
                <FaInstagram size={24} />
              </a>
              <a href="#" className="hover:text-yellow-400 transition duration-200">
                <FaTwitter size={24} />
              </a>
              <a href="#" className="hover:text-yellow-400 transition duration-200">
                <FaYoutube size={24} />
              </a>
            </div>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-700 mt-10 pt-5 text-center text-sm text-gray-400">
          © {new Date().getFullYear()}{" "}
          <span className="text-white font-medium">Local Food Lovers</span> — All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
