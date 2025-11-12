import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { motion } from "framer-motion";
const Footer = () => {
  return (
    <footer className="bg-[#060b37] text-gray-300 py-10 mt-10">
      <div className="container mx-auto px-5 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        <div>
          <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
            <motion.img
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            src="https://i.ibb.co.com/Mxn5n4Kg/Untitled-design.png"
            alt="Local Food Lover Logo"
            className="w-50 h-24 rounded-full object-cover"
          />
          </div>
          <p className="text-sm">
            Discover, share, and enjoy local food experiences with food lovers near you!
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-yellow-400 transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/reviews" className="hover:text-yellow-400 transition">
                Reviews
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-yellow-400 transition">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-yellow-400 transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Follow Us</h3>
          <div className="flex justify-center md:justify-start gap-4">
            <a href="#" className="hover:text-yellow-400 transition">
              <FaFacebook size={22} />
            </a>
            <a href="#" className="hover:text-yellow-400 transition">
              <FaInstagram size={22} />
            </a>
            <a href="#" className="hover:text-yellow-400 transition">
              <FaTwitter size={22} />
            </a>
            <a href="#" className="hover:text-yellow-400 transition">
              <FaYoutube size={22} />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8 pt-5 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Local Food Lovers — All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
