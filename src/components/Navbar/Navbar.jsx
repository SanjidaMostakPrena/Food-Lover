import { NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { motion } from "framer-motion";

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-yellow-400 font-semibold border-b-2 border-yellow-400 pb-1"
              : "hover:text-yellow-300 transition"
          }
        >
          Home
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/AllReviews"
          className={({ isActive }) =>
            isActive
              ? "text-yellow-400 font-semibold border-b-2 border-yellow-400 pb-1"
              : "hover:text-yellow-300 transition"
          }
        >
          AllReviews
        </NavLink>
      </li>

      {user && (
        <>
          <li>
            <NavLink
              to="/allFood"
              className={({ isActive }) =>
                isActive
                  ? "text-yellow-400 font-semibold border-b-2 border-yellow-400 pb-1"
                  : "hover:text-yellow-300 transition"
              }
            >
              All Food
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/AddReview"
              className={({ isActive }) =>
                isActive
                  ? "text-yellow-400 font-semibold border-b-2 border-yellow-400 pb-1"
                  : "hover:text-yellow-300 transition"
              }
            >
              Add Review
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/MyReview"
              className={({ isActive }) =>
                isActive
                  ? "text-yellow-400 font-semibold border-b-2 border-yellow-400 pb-1"
                  : "hover:text-yellow-300 transition"
              }
            >
              My Review
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/myFavorites"
              className={({ isActive }) =>
                isActive
                  ? "text-yellow-400 font-semibold border-b-2 border-yellow-400 pb-1"
                  : "hover:text-yellow-300 transition"
              }
            >
              My Favorites
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <div
      className="
        navbar sticky top-0 z-50 px-4 lg:px-16
        bg-gradient-to-r from-[#020617]/90 via-[#0f172a]/80 to-[#1e293b]/90
        backdrop-blur-lg shadow-xl border-b border-gray-700/40
      "
    >
      {/* Navbar Start */}
      <div className="navbar-start">
        {/* Mobile Dropdown */}
        <div className="dropdown lg:hidden">
          <label tabIndex={0} className="btn btn-ghost btn-circle hover:bg-gray-700/40">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7 text-gray-200"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </label>

          <ul
            tabIndex={0}
            className="
              menu menu-sm dropdown-content mt-3 p-3 
              shadow-xl bg-[#0f172a] text-white rounded-xl w-56 
              border border-gray-700
            "
          >
            {links}
          </ul>
        </div>

        {/* Logo */}
        <NavLink to="/" className="flex items-center">
          <motion.img
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            src="https://i.ibb.co.com/ch3r5JTs/Untitled-design-1.png"
            alt="Local Food Lover Logo"
            className="w-40 h-20 rounded-full object-cover drop-shadow-2xl"
          />
        </NavLink>
      </div>

      {/* Desktop Menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-6 text-lg font-medium text-gray-200">
          {links}
        </ul>
      </div>

      {/* Navbar End */}
      <div className="navbar-end flex items-center gap-3">
        {user ? (
          <div className="relative">
            <div
              className="cursor-pointer flex items-center"
              onClick={() => setIsOpen(!isOpen)}
            >
              <img
                src={user.photoURL || "/default-avatar.png"}
                alt="User"
                className="w-11 h-11 rounded-full border-2 border-yellow-400 object-cover shadow-lg hover:scale-105 transition"
              />
            </div>

            {isOpen && (
              <ul
                className="
                  absolute right-0 mt-3 w-40 
                  bg-[#0f172a] text-white rounded-xl 
                  shadow-xl border border-gray-700 animate-fadeIn
                "
              >
                <li className="border-b border-gray-600">
                  <button
                    onClick={() => {
                      signOutUser();
                      setIsOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-yellow-500 hover:text-black transition"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            )}
          </div>
        ) : (
          <>
            <NavLink
              to="/register"
              className="btn btn-outline border-yellow-400 text-yellow-300 rounded-full px-6 font-semibold hover:bg-yellow-400 hover:text-black transition"
            >
              Register
            </NavLink>

            <NavLink
              to="/login"
              className="btn bg-yellow-400 text-black rounded-full px-6 font-semibold shadow-lg hover:bg-yellow-300 transition"
            >
              Login
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
