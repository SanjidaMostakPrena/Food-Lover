// import { NavLink } from "react-router-dom";
// import { useContext, useState } from "react";
// import { AuthContext } from "../../contexts/AuthContext";
// import { motion } from "framer-motion";

// const Navbar = () => {
//   const { user, signOutUser } = useContext(AuthContext);
//   const [isOpen, setIsOpen] = useState(false);

//   const links = (
//     <>
//       <li>
//         <NavLink
//           to="/"
//           className={({ isActive }) =>
//             isActive
//               ? "text-yellow-400 font-semibold border-b-2 border-yellow-400 pb-1"
//               : "hover:text-yellow-300 transition"
//           }
//         >
//           Home
//         </NavLink>
//       </li>

//       <li>
//         <NavLink
//           to="/AllReviews"
//           className={({ isActive }) =>
//             isActive
//               ? "text-yellow-400 font-semibold border-b-2 border-yellow-400 pb-1"
//               : "hover:text-yellow-300 transition"
//           }
//         >
//           AllReviews
//         </NavLink>
//       </li>

//       {user && (
//         <>
//           <li>
//             <NavLink
//               to="/allFood"
//               className={({ isActive }) =>
//                 isActive
//                   ? "text-yellow-400 font-semibold border-b-2 border-yellow-400 pb-1"
//                   : "hover:text-yellow-300 transition"
//               }
//             >
//               All Food
//             </NavLink>
//           </li>

//           <li>
//             <NavLink
//               to="/AddReview"
//               className={({ isActive }) =>
//                 isActive
//                   ? "text-yellow-400 font-semibold border-b-2 border-yellow-400 pb-1"
//                   : "hover:text-yellow-300 transition"
//               }
//             >
//               Add Review
//             </NavLink>
//           </li>

//           <li>
//             <NavLink
//               to="/MyReview"
//               className={({ isActive }) =>
//                 isActive
//                   ? "text-yellow-400 font-semibold border-b-2 border-yellow-400 pb-1"
//                   : "hover:text-yellow-300 transition"
//               }
//             >
//               My Review
//             </NavLink>
//           </li>

//           <li>
//             <NavLink
//               to="/myFavorites"
//               className={({ isActive }) =>
//                 isActive
//                   ? "text-yellow-400 font-semibold border-b-2 border-yellow-400 pb-1"
//                   : "hover:text-yellow-300 transition"
//               }
//             >
//               My Favorites
//             </NavLink>
//           </li>
//         </>
//       )}
//     </>
//   );

//   return (
//     <div
//       className="
//         navbar sticky top-0 z-50 px-3 md:px-6 lg:px-16
//         bg-gradient-to-r from-[#020617]/90 via-[#0f172a]/80 to-[#1e293b]/90
//         backdrop-blur-lg shadow-xl border-b border-gray-700/40
//       "
//     >
//       {/* Navbar Start */}
//       <div className="navbar-start">
        
//         {/* Mobile Dropdown */}
//         <div className="dropdown lg:hidden">
//           <label tabIndex={0} className="btn btn-ghost btn-circle hover:bg-gray-700/40">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-6 w-6 text-gray-200"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
//             </svg>
//           </label>

//           <ul
//             tabIndex={0}
//             className="
//               menu menu-sm dropdown-content mt-3 p-3 
//               shadow-xl bg-[#0f172a] text-white rounded-xl w-52
//               border border-gray-700 space-y-1
//             "
//           >
//             {links}
//           </ul>
//         </div>

//         {/* Logo */}
//         <NavLink to="/" className="flex items-center">
//           <motion.img
//             initial={{ opacity: 0, scale: 0.7 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.6, ease: 'easeOut' }}
//             src="https://i.ibb.co.com/ch3r5JTs/Untitled-design-1.png"
//             alt="Local Food Lover Logo"
//             className="w-20 h-14 md:w-36 md:h-18 rounded-full object-cover drop-shadow-2xl"
//           />
//         </NavLink>
//       </div>

      
//       <div className="navbar-center hidden lg:flex">
//         <ul className="menu menu-horizontal px-1 gap-6 text-lg font-medium text-gray-200">
//           {links}
//         </ul>
//       </div>

//       <div className="navbar-end flex items-center gap-2 md:gap-3">
//         {user ? (
//           <div className="relative">
//             <div
//               className="cursor-pointer flex items-center"
//               onClick={() => setIsOpen(!isOpen)}
//             >
//               <img
//                 src={user.photoURL || "/default-avatar.png"}
//                 alt="User"
//                 className="w-9 h-9 md:w-11 md:h-11 rounded-full border-2 border-yellow-400 object-cover shadow-lg hover:scale-105 transition"
//               />
//             </div>

//             {isOpen && (
//               <ul
//                 className="
//                   absolute right-0 mt-3 w-36 md:w-40 
//                   bg-[#0f172a] text-white rounded-xl 
//                   shadow-xl border border-gray-700
//                 "
//               >
//                 <li className="border-b border-gray-600">
//                   <button
//                     onClick={() => {
//                       signOutUser();
//                       setIsOpen(false);
//                     }}
//                     className="block w-full text-left px-4 py-2 text-sm hover:bg-yellow-500 hover:text-black transition"
//                   >
//                     Logout
//                   </button>
//                 </li>

//                 <li className="border-b border-gray-600">
//                   <NavLink
//                     to="AddReview"
//                     onClick={() => setIsOpen(false)}
//                     className="block w-full text-left px-4 py-2 text-sm hover:bg-yellow-500 hover:text-black transition"
//                   >
//                     Add Review
//                   </NavLink>

//                   <NavLink
//                     to="AllReviews"
//                     onClick={() => setIsOpen(false)}
//                     className="block w-full text-left px-4 py-2 text-sm hover:bg-yellow-500 hover:text-black transition"
//                   >
//                     All Reviews
//                   </NavLink>
//                 </li>
//               </ul>
//             )}
//           </div>
//         ) : (
//           <>
//             <NavLink
//               to="/register"
//               className="btn btn-outline border-yellow-400 text-yellow-300 rounded-full px-4 md:px-6 font-semibold hover:bg-yellow-400 hover:text-black transition"
//             >
//               Register
//             </NavLink>

//             <NavLink
//               to="/login"
//               className="btn bg-yellow-400 text-black rounded-full px-4 md:px-6 font-semibold shadow-lg hover:bg-yellow-300 transition"
//             >
//               Login
//             </NavLink>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Navbar;
// import { NavLink, useNavigate } from "react-router-dom";
// import { useContext, useState } from "react";
// import { AuthContext } from "../../contexts/AuthContext";
// import { motion } from "framer-motion";

// const Navbar = () => {
//   const { user, signOutUser } = useContext(AuthContext);
//   const [isOpen, setIsOpen] = useState(false);
//   const navigate = useNavigate();

//   // 🔐 Route Guard Handler
//   const handleProtectedNav = (path) => {
//     if (!user) {
//       navigate("/login");
//     } else {
//       navigate(path);
//     }
//   };

//   const linkClass = ({ isActive }) =>
//     isActive
//       ? "text-yellow-400 font-semibold border-b-2 border-yellow-400 pb-1"
//       : "hover:text-yellow-300 transition";

//   return (
//     <div className="sticky top-0 z-50 w-full bg-gradient-to-r from-[#020617] via-[#0f172a] to-[#1e293b] shadow-xl">
//       <div className="navbar px-4 md:px-8 lg:px-16 text-white">

//         {/* LEFT */}
//         <div className="navbar-start">
//           {/* Mobile Menu */}
//           <div className="dropdown lg:hidden">
//             <label tabIndex={0} className="btn btn-ghost">☰</label>
//             <ul className="menu menu-sm dropdown-content mt-3 p-3 bg-[#0f172a] rounded-xl w-56 shadow border border-gray-700 space-y-1">
//               {/* Public */}
//               <li><NavLink to="/" className={linkClass}>Home</NavLink></li>
//               <li><NavLink to="/AllReviews" className={linkClass}>All Reviews</NavLink></li>
//               <li><NavLink to="/about" className={linkClass}>About Us</NavLink></li>
//               <li><NavLink to="/contact" className={linkClass}>Contact Us</NavLink></li>
//               <li><NavLink to="/privacy" className={linkClass}>Privacy Policy</NavLink></li>

//               {/* Protected */}
//               <li onClick={() => handleProtectedNav("/allFood")} className="cursor-pointer hover:text-yellow-300">
//                 All Food
//               </li>
//               <li onClick={() => handleProtectedNav("/AddReview")} className="cursor-pointer hover:text-yellow-300">
//                 Add Review
//               </li>
//               <li onClick={() => handleProtectedNav("/MyReview")} className="cursor-pointer hover:text-yellow-300">
//                 My Review
//               </li>
//               <li onClick={() => handleProtectedNav("/myFavorites")} className="cursor-pointer hover:text-yellow-300">
//                 My Favorites
//               </li>
//             </ul>
//           </div>

//           {/* Logo */}
//           <NavLink to="/">
//   <motion.div
//     className="flex items-center gap-2  p-3 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
//     initial={{ scale: 0.8, opacity: 0 }}
//     animate={{ scale: 1, opacity: 1 }}
//     transition={{ duration: 0.6, type: "spring", stiffness: 130 }}
//   >
   
//     {/* Food Emoji */}
//     <span className="text-yellow-400 text-2xl md:text-3xl animate-bounce">🍽️ </span>

//     {/* Logo Text */}
//     <span className="text-white font-extrabold text-lg md:text-2xl tracking-wider">
//       Yum
//       <span className="text-yellow-400">Yard</span>
//     </span>
//   </motion.div>
// </NavLink>

//         </div>

//         {/* CENTER */}
//         <div className="navbar-center hidden lg:flex">
//           <ul className="menu menu-horizontal gap-6 font-medium">
//             {/* Public */}
//             <NavLink to="/" className={linkClass}>Home</NavLink>
//             <NavLink to="/AllReviews" className={linkClass}>All Reviews</NavLink>
//             <NavLink to="/about" className={linkClass}>About Us</NavLink>
//             <NavLink to="/contact" className={linkClass}>Contact Us</NavLink>
//             <NavLink to="/privacy" className={linkClass}>Privacy Policy</NavLink>

//             {/* Protected */}
//             <button onClick={() => handleProtectedNav("/allFood")} className="hover:text-yellow-300">
//               All Food
//             </button>
//             <button onClick={() => handleProtectedNav("/AddReview")} className="hover:text-yellow-300">
//               Add Review
//             </button>
//             <button onClick={() => handleProtectedNav("/MyReview")} className="hover:text-yellow-300">
//               My Review
//             </button>
//             <button onClick={() => handleProtectedNav("/myFavorites")} className="hover:text-yellow-300">
//               My Favorites
//             </button>
//           </ul>
//         </div>

//         {/* RIGHT */}
//         <div className="navbar-end gap-3">
//           {user ? (
//             <div className="relative">
//               <img
//                 src={user.photoURL || "/default-avatar.png"}
//                 onClick={() => setIsOpen(!isOpen)}
//                 className="w-10 h-10 rounded-full border-2 border-yellow-400 cursor-pointer"
//               />

//               {isOpen && (
//                 <ul className="absolute right-0 mt-3 w-44 bg-[#0f172a] rounded-xl shadow border border-gray-700">
//                   <li>
//                     <NavLink to="/dashboard" className="block px-4 py-2 hover:bg-yellow-400 hover:text-black">
//                       Dashboard
//                     </NavLink>
//                   </li>
//                   <li>
//                     <button
//                       onClick={signOutUser}
//                       className="w-full text-left px-4 py-2 hover:bg-red-500"
//                     >
//                       Logout
//                     </button>
//                   </li>
//                 </ul>
//               )}
//             </div>
//           ) : (
//             <>
//               <NavLink to="/register" className="btn btn-outline border-yellow-400 text-yellow-400">
//                 Register
//               </NavLink>
//               <NavLink to="/login" className="btn bg-yellow-400 text-black">
//                 Login
//               </NavLink>
//             </>
//           )}
//         </div>

//       </div>
//     </div>
//   );
// };

// export default Navbar;
// import { NavLink, useNavigate } from "react-router-dom";
// import { useContext, useState } from "react";
// import { AuthContext } from "../../contexts/AuthContext";
// import { motion } from "framer-motion";

// const Navbar = () => {
//   const { user, signOutUser } = useContext(AuthContext);
//   const [isOpen, setIsOpen] = useState(false);
//   const navigate = useNavigate();

//   // 🔐 Route Guard Handler
//   const handleProtectedNav = (path) => {
//     if (!user) {
//       navigate("/login");
//     } else {
//       navigate(path);
//     }
//   };

//   const linkClass = ({ isActive }) =>
//     isActive
//       ? "text-yellow-400 font-semibold border-b-2 border-yellow-400 pb-1 transition-all"
//       : "text-white hover:text-yellow-300 transition-all";

//   return (
//     <div className="sticky top-0 z-50 w-full bg-gradient-to-r from-[#020617] via-[#0f172a] to-[#1e293b] shadow-xl">
//       <div className="navbar px-4 md:px-8 lg:px-16 text-white flex justify-between items-center">

//         {/* LOGO */}
//         <NavLink to="/">
//           <motion.div
//             className="flex items-center gap-2 p-3 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
//             initial={{ scale: 0.8, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             transition={{ duration: 0.6, type: "spring", stiffness: 130 }}
//           >
//             <span className="text-yellow-400 text-2xl md:text-3xl animate-bounce">🍽️</span>
//             <span className="text-white font-extrabold text-lg md:text-2xl tracking-wider">
//               Yum<span className="text-yellow-400">Yard</span>
//             </span>
//           </motion.div>
//         </NavLink>

//         {/* DESKTOP LINKS */}
//         <div className="hidden lg:flex gap-6 font-medium items-center">
//           <NavLink to="/" className={linkClass}>Home</NavLink>
//           <NavLink to="/about" className={linkClass}>About Us</NavLink>
//           <button onClick={() => handleProtectedNav("/allFood")} className="text-white hover:text-yellow-300 transition">All Food</button>
//           <NavLink to="/AllReviews" className={linkClass}>All Reviews</NavLink>
//           <button onClick={() => handleProtectedNav("/AddReview")} className="text-white hover:text-yellow-300 transition">Add Review</button>
//           <button onClick={() => handleProtectedNav("/MyReview")} className="text-white hover:text-yellow-300 transition">My Review</button>
//           <button onClick={() => handleProtectedNav("/myFavorites")} className="text-white hover:text-yellow-300 transition">My Favorites</button>
//           <NavLink to="/contact" className={linkClass}>Contact Us</NavLink>
//           <NavLink to="/privacy" className={linkClass}>Privacy Policy</NavLink>
//           <NavLink to="/profile" className={linkClass}>Profile</NavLink>
//         </div>

//         {/* USER / AUTH */}
//         <div className="flex items-center gap-3">
//           {user ? (
//             <div className="relative">
//               <img
//                 src={user.photoURL || "/default-avatar.png"}
//                 onClick={() => setIsOpen(!isOpen)}
//                 className="w-10 h-10 rounded-full border-2 border-yellow-400 cursor-pointer"
//               />
//               {isOpen && (
//                 <ul className="absolute right-0 mt-3 w-44 bg-[#0f172a] rounded-xl shadow border border-gray-700">
//                   <li>
//                     <NavLink to="/dashboard" className="block px-4 py-2 hover:bg-yellow-400 hover:text-black">Dashboard</NavLink>
//                   </li>
//                   <li>
//                     <button
//                       onClick={signOutUser}
//                       className="w-full text-left px-4 py-2 hover:bg-red-500"
//                     >
//                       Logout
//                     </button>
//                   </li>
//                 </ul>
//               )}
//             </div>
//           ) : (
//             <>
//               <NavLink to="/register" className="px-4 py-2 border border-yellow-400 text-yellow-400 rounded-lg hover:bg-yellow-400 hover:text-black transition">
//                 Register
//               </NavLink>
//               <NavLink to="/login" className="px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 transition">
//                 Login
//               </NavLink>
//             </>
//           )}
//         </div>

//         {/* MOBILE MENU */}
//         <div className="lg:hidden dropdown">
//           <label tabIndex={0} className="btn btn-ghost text-white text-2xl">☰</label>
//           <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-3 bg-[#0f172a] rounded-xl w-56 shadow border border-gray-700 space-y-1">
//             <li><NavLink to="/" className={linkClass}>Home</NavLink></li>
//             <li><NavLink to="/about" className={linkClass}>About Us</NavLink></li>
//             <li onClick={() => handleProtectedNav("/allFood")} className="cursor-pointer hover:text-yellow-300">All Food</li>
//             <li><NavLink to="/AllReviews" className={linkClass}>All Reviews</NavLink></li>
//             <li onClick={() => handleProtectedNav("/AddReview")} className="cursor-pointer hover:text-yellow-300">Add Review</li>
//             <li onClick={() => handleProtectedNav("/MyReview")} className="cursor-pointer hover:text-yellow-300">My Review</li>
//             <li onClick={() => handleProtectedNav("/myFavorites")} className="cursor-pointer hover:text-yellow-300">My Favorites</li>
//             <li><NavLink to="/contact" className={linkClass}>Contact Us</NavLink></li>
//             <li><NavLink to="/privacy" className={linkClass}>Privacy Policy</NavLink></li>
//              <li><NavLink to="/profile" className={linkClass}>Profile</NavLink></li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;
import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { motion } from "framer-motion";

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // 🔐 Route Guard Handler
  const handleProtectedNav = (path) => {
    if (!user) {
      navigate("/login");
    } else {
      navigate(path);
    }
  };

  const linkClass = ({ isActive }) =>
    isActive
      ? "text-yellow-400 font-semibold border-b-2 border-yellow-400 pb-1 transition-all"
      : "text-white hover:text-yellow-300 transition-all";

  return (
    <div className="sticky top-0 z-50 w-full bg-gradient-to-r from-[#020617] via-[#0f172a] to-[#1e293b] shadow-xl">
      <div className="navbar px-4 md:px-8 lg:px-16 text-white flex justify-between items-center">

        {/* LOGO */}
        <NavLink to="/">
          <motion.div
            className="flex items-center gap-2 p-3 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 130 }}
          >
            <span className="text-yellow-400 text-2xl md:text-3xl animate-bounce">🍽️</span>
            <span className="text-white font-extrabold text-lg md:text-2xl tracking-wider">
              Yum<span className="text-yellow-400">Yard</span>
            </span>
          </motion.div>
        </NavLink>

        {/* DESKTOP LINKS */}
        <div className="hidden lg:flex gap-5 font-small items-center">
          <NavLink to="/" className={linkClass}>Home</NavLink>
          <NavLink to="/about" className={linkClass}>About Us</NavLink>
          <button onClick={() => handleProtectedNav("/allFood")} className="text-white hover:text-yellow-300 transition">All Food</button>
          <NavLink to="/AllReviews" className={linkClass}>All Reviews</NavLink>
          <button onClick={() => handleProtectedNav("/AddReview")} className="text-white hover:text-yellow-300 transition">Add Review</button>
          <button onClick={() => handleProtectedNav("/MyReview")} className="text-white hover:text-yellow-300 transition">My Review</button>
          <button onClick={() => handleProtectedNav("/myFavorites")} className="text-white hover:text-yellow-300 transition">My Favorites</button>
          <NavLink to="/contact" className={linkClass}>Contact Us</NavLink>
          <NavLink to="/privacy" className={linkClass}>Privacy Policy</NavLink>
          <NavLink to="/profile" className={linkClass}>Profile</NavLink>
          <NavLink to="/dashboard" className={linkClass}>Dashboard</NavLink>
        </div>

        {/* USER / AUTH */}
        <div className="flex items-center gap-1">
          {user ? (
            <div className="relative">
              <img
                src={user.photoURL || "/default-avatar.png"}
                onClick={() => setIsOpen(!isOpen)}
                className="w-10 h-10 rounded-full border-2 border-yellow-400 cursor-pointer"
              />
              {isOpen && (
                <ul className="absolute right-0 mt-3 w-44 bg-[#0f172a] rounded-xl shadow border border-gray-700">
                  <li>
                    <NavLink to="/dashboard" className="block px-4 py-2 hover:bg-yellow-400 hover:text-black">Dashboard</NavLink>
                  </li>
                  <li>
                    <button
                      onClick={signOutUser}
                      className="w-full text-left px-4 py-2 hover:bg-red-500"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              )}
              
            </div>
          ) : (
            <>
              <NavLink to="/register" className="px-1 py-1 border border-yellow-400 text-yellow-400 rounded-lg hover:bg-yellow-400 hover:text-black transition">
                Register
              </NavLink>
              <NavLink to="/login" className="px-1 py-1 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 transition">
                Login
              </NavLink>
            </>
          )}
        </div>

        {/* MOBILE MENU */}
        <div className="lg:hidden relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white text-3xl focus:outline-none"
          >
            ☰
          </button>

          {isOpen && (
            <div className="absolute right-0 top-full mt-2 w-56 bg-[#0f172a] rounded-xl shadow-lg border border-gray-700 z-50">
              <ul className="flex flex-col p-4 space-y-2">
                <li><NavLink to="/" className={linkClass} onClick={() => setIsOpen(false)}>Home</NavLink></li>
                <li><NavLink to="/about" className={linkClass} onClick={() => setIsOpen(false)}>About Us</NavLink></li>
                <li onClick={() => { handleProtectedNav("/allFood"); setIsOpen(false); }} className="cursor-pointer text-white hover:text-yellow-300">All Food</li>
                <li><NavLink to="/AllReviews" className={linkClass} onClick={() => setIsOpen(false)}>All Reviews</NavLink></li>
                <li onClick={() => { handleProtectedNav("/AddReview"); setIsOpen(false); }} className="cursor-pointer text-white hover:text-yellow-300">Add Review</li>
                <li onClick={() => { handleProtectedNav("/MyReview"); setIsOpen(false); }} className="cursor-pointer text-white hover:text-yellow-300">My Review</li>
                <li onClick={() => { handleProtectedNav("/myFavorites"); setIsOpen(false); }} className="cursor-pointer text-white hover:text-yellow-300">My Favorites</li>
                <li><NavLink to="/contact" className={linkClass} onClick={() => setIsOpen(false)}>Contact Us</NavLink></li>
                <li><NavLink to="/privacy" className={linkClass} onClick={() => setIsOpen(false)}>Privacy Policy</NavLink></li>
                <li><NavLink to="/profile" className={linkClass} onClick={() => setIsOpen(false)}>Profile</NavLink></li>
                 <li><NavLink to="/dashboard" className={linkClass} onClick={() => setIsOpen(false)}>Dashboard</NavLink></li>
                
                {user && (
                  <li>
                    <button
                      onClick={() => { signOutUser(); setIsOpen(false); }}
                      className="w-full text-left px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                    >
                      Logout
                    </button>
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
