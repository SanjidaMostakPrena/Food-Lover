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
            isActive ? "text-primary font-semibold" : "hover:text-primary"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/allFood"
          className={({ isActive }) =>
            isActive ? "text-primary font-semibold" : "hover:text-primary"
          }
        >
          All Food
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/AddReview"
          className={({ isActive }) =>
            isActive ? "text-primary font-semibold" : "hover:text-primary"
          }
        >
          AddReview
        </NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink
              to="/AllReviews"
              className={({ isActive }) =>
                isActive ? "text-primary font-semibold" : "hover:text-primary"
              }
            >
              All Reviews
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/MyReview"
              className={({ isActive }) =>
                isActive ? "text-primary font-semibold" : "hover:text-primary"
              }
            >
              My Review
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/myFavorites"
              className={({ isActive }) =>
                isActive ? "text-primary font-semibold" : "hover:text-primary"
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
    <div className="navbar bg-white shadow-md sticky top-0 z-50 px-4 lg:px-16">
      {/* Navbar Start */}
      <div className="navbar-start">
        <div className="dropdown lg:hidden">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-white rounded-box w-52"
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
            src="https://i.ibb.co.com/qFLB3rSh/Local-Food-lover-2.jpg"
            alt="Local Food Lover Logo"
            className="w-50 h-24 rounded-full object-cover"
          />
        </NavLink>
      </div>

      {/* Navbar Center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-4">{links}</ul>
      </div>

      {/* Navbar End */}
      <div className="navbar-end flex items-center gap-2">
        {user ? (
          <div className="relative">
            <div
              className="cursor-pointer flex items-center space-x-2"
              onClick={() => setIsOpen(!isOpen)}
            >
              <img
                src={user.photoURL || "/default-avatar.png"}
                alt="User"
                className="w-10 h-10 rounded-full border-2 border-primary object-cover"
              />
            </div>

            {isOpen && (
              <ul className="absolute right-0 mt-3 w-44 bg-white rounded-lg shadow-lg border border-gray-200">
                <li>
                  <NavLink
                    to="/allReviews"
                    className="block px-4 py-2 text-sm hover:bg-primary"
                    onClick={() => setIsOpen(false)}
                  >
                    All Reviews
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/addReview"
                    className="block px-4 py-2 text-sm hover:bg-primary"
                    onClick={() => setIsOpen(false)}
                  >
                    Add Review
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/myReview"
                    className="block px-4 py-2 text-sm hover:bg-primary"
                    onClick={() => setIsOpen(false)}
                  >
                    My Reviews
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/myFavorites"
                    className="block px-4 py-2 text-sm hover:bg-primary"
                    onClick={() => setIsOpen(false)}
                  >
                    My Favorites
                  </NavLink>
                </li>
                <li>
                  <button
                    onClick={() => {
                      signOutUser();
                      setIsOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-primary"
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
              className="btn btn-outline btn-primary text-primary"
            >
              Register
            </NavLink>
            <NavLink to="/login" className="btn btn-primary text-white">
              Login
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
