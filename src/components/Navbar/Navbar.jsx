
import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { motion } from "framer-motion";

const demoDefaults = {
  "user9@gmail.com": {
    displayName: "User",
    photoURL: "https://i.ibb.co/nMr0J1cp/ohi.jpg",
  },
  "admin9@gmail.com": {
    displayName: "Admin",
    photoURL: "https://i.ibb.co/nMmr1kdJ/87eb01d7c7761237f06cbcdbbdc10d89.jpg",
  },
};

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = (e) => {
    setTheme(e.target.checked ? "dark" : "light");
  };

  const handleProtectedNav = (path) => {
    setMenuOpen(false);
    if (!user) navigate("/login");
    else navigate(path);
  };

  const linkClass = ({ isActive }) =>
    isActive
      ? "text-yellow-400 font-semibold border-b-2 border-yellow-400 pb-1"
      : "text-white hover:text-yellow-300";

  const isAdmin = user && user.email === "admin9@gmail.com";

  const userPhoto =
    user?.photoURL ||
    demoDefaults[user?.email]?.photoURL ||
    "/default-avatar.png";

  return (
    <div className="sticky top-0 z-50 w-full bg-gradient-to-r from-[#020617] via-[#0f172a] to-[#1e293b] shadow-xl">
      <div className="navbar px-3 sm:px-6 md:px-8 lg:px-16 text-white flex justify-between items-center">

        {/* LOGO */}
        <NavLink to="/">
          <motion.div
            className="flex items-center gap-2 p-2 sm:p-3 rounded-xl shadow-lg hover:scale-105"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 130 }}
          >
            <span className="text-yellow-400 text-xl sm:text-2xl md:text-3xl">🍽️</span>
            <span className="font-extrabold text-sm sm:text-lg md:text-2xl">
              Yum<span className="text-yellow-400">Yard</span>
            </span>
          </motion.div>
        </NavLink>

        {/* DESKTOP LINKS */}
        <div className="hidden lg:flex gap-4 items-center text-sm md:text-base ">
          <NavLink to="/" className={linkClass}>Home</NavLink>

          {isAdmin ? (
            <>
              <NavLink to="/dashboard" className={linkClass}>Dashboard</NavLink>
              <NavLink to="/profile" className={linkClass}>Profile</NavLink>
            </>
          ) : (
            <>
              <NavLink to="/about" className={linkClass}>About Us</NavLink>
              <button onClick={() => handleProtectedNav("/allFood")}>All Food</button>
              <NavLink to="/AllReviews" className={linkClass}>All Reviews</NavLink>
              
              <NavLink to="/contact" className={linkClass}>Contact</NavLink>
              <NavLink to="/privacy" className={linkClass}>Privacy</NavLink>
              <NavLink to="/dashboard" className={linkClass}>Dashboard</NavLink>
            </>
          )}
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-2">

          {/* CREATIVE YELLOW THEME SWITCH */}
<label className="swap swap-rotate cursor-pointer">
  {/* Hidden checkbox controlling the theme */}
  <input
    type="checkbox"
    checked={theme === "dark"}
    onChange={toggleTheme}
    className="hidden"
  />

  {/* SUN ICON - Light Mode */}
  <svg
    className="swap-off h-10 w-10 text-yellow-400 transition-transform duration-500 hover:rotate-12 hover:scale-110"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/>
  </svg>

  {/* MOON ICON - Dark Mode */}
  <svg
    className="swap-on h-10 w-10 text-yellow-400 transition-transform duration-500 hover:-rotate-12 hover:scale-110"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"/>
  </svg>
</label>

          {/* USER PROFILE */}
          {user ? (
            <div className="relative">
              <img
                src={userPhoto}
                onClick={() => setIsOpen(!isOpen)}
                className="w-8 sm:w-10 h-8 sm:h-10 rounded-full border-2 border-yellow-400 cursor-pointer"
              />

              {isOpen && (
                <ul className="absolute right-0 mt-3 w-44 bg-[#0f172a] rounded-xl shadow border border-gray-700 text-sm">
                  <li><NavLink to="/dashboard" className="block px-4 py-2 hover:bg-yellow-400 hover:text-black">Dashboard</NavLink></li>
                  <li><NavLink to="/profile" className="block px-4 py-2 hover:bg-yellow-400 hover:text-black">Profile</NavLink></li>
                  <li><button onClick={signOutUser} className="w-full text-left px-4 py-2 hover:bg-red-500">Logout</button></li>
                </ul>
              )}
            </div>
          ) : (
            <>
              <NavLink to="/register" className="px-2 py-1 border border-yellow-400 text-yellow-400 rounded-lg text-xs">Register</NavLink>
              <NavLink to="/login" className="px-2 py-1 bg-yellow-400 text-black rounded-lg text-xs">Login</NavLink>
            </>
          )}

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden text-2xl ml-2"
          >
            ☰
          </button>
        </div>
      </div>

      {/* MOBILE DROPDOWN MENU */}
      {menuOpen && (
        <div className="lg:hidden bg-[#020617] text-white px-6 py-4 flex flex-col  gap-5">
          <NavLink to="/" onClick={() => setMenuOpen(false)}>Home</NavLink>

          {isAdmin ? (
            <>
              <button onClick={() => handleProtectedNav("/allFood")}>All Food</button>
              <NavLink to="/AllReviews" onClick={() => setMenuOpen(false)}>All Reviews</NavLink>
              <NavLink to="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</NavLink>
              <NavLink to="/profile" onClick={() => setMenuOpen(false)}>Profile</NavLink>
            </>
          ) : (
            <>
              <NavLink to="/about" onClick={() => setMenuOpen(false)}>About</NavLink>
              <button onClick={() => handleProtectedNav("/allFood")}>All Food</button>
              <NavLink to="/AllReviews" onClick={() => setMenuOpen(false)}>All Reviews</NavLink>
              <button onClick={() => handleProtectedNav("/AddReview")}>Add Review</button>
              <button onClick={() => handleProtectedNav("/MyReview")}>My Review</button>
              <button onClick={() => handleProtectedNav("/myFavorites")}>My Favorites</button>
              <NavLink to="/contact" onClick={() => setMenuOpen(false)}>Contact</NavLink>
              <NavLink to="/privacy" onClick={() => setMenuOpen(false)}>Privacy</NavLink>
              <NavLink to="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</NavLink>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
