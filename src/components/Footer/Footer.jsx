import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="relative mt-14">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f2d] via-[#05092d] to-[#0a0f2d]"></div>
      <div className="absolute -top-20 left-10 w-72 h-72 bg-orange-400 opacity-20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-red-500 opacity-20 blur-3xl rounded-full"></div>

      <div className="relative text-gray-300 py-16">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">

          {/* Logo & About */}
          
            <div className="flex flex-col gap-4">
  <div className="flex items-center justify-center md:justify-start gap-3">
    <span className="text-xl font-bold text-white">FOOD LOVER</span>

  </div>


            <p className="text-sm text-gray-300 leading-relaxed max-w-xs mx-auto md:mx-0">
              Discover, share, and enjoy authentic local food experiences with food lovers near you!
            </p>
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
                <Link to="/AllFood" className="hover:text-yellow-400 transition duration-200">
                  All Food
                </Link>
              </li>
              <li>
                <Link to="/AllReviews" className="hover:text-yellow-400 transition duration-200">
                  All Reviews
                </Link>
              </li>
              <li>
                <Link to="/Myfavorites" className="hover:text-yellow-400 transition duration-200">
                  My Favorites
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
                <FaYoutube size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-10 pt-5 text-center text-sm text-gray-400">
          © {new Date().getFullYear()}{" "}
          <span className="text-white font-medium">Local Food Lovers</span> — All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
