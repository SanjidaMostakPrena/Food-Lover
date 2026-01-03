import React, { useEffect, useState, useContext } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";


const DashboardLayout = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  // 🔐 Fetch role from backend
  useEffect(() => {
    if (user?.email) {
      fetch(`https://courierapp-three.vercel.app/users/${user.email}`)
        .then(res => res.json())
        .then(data => setRole(data?.role || "user"))
        .catch(() => setRole("user"));
    }
  }, [user]);

  // 🔒 User cannot access admin routes
  useEffect(() => {
    if (role === "user") {
      const adminRoutes = [
        "/dashboard/all-reviews",
        "/dashboard/all-food",
      ];
      if (adminRoutes.includes(window.location.pathname)) {
        navigate("/dashboard");
      }
    }
  }, [role, navigate]);

  if (!role) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  const activeClass =
    "bg-yellow-400 text-black font-semibold rounded-lg px-3 py-2";
  const normalClass =
    "text-black hover:bg-yellow-100 rounded-lg px-3 py-2";

  return (
    <div className="drawer lg:drawer-open">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      {/* ================= MAIN CONTENT ================= */}
      <div className="drawer-content bg-gray-50 min-h-screen p-4">
        <nav className="navbar bg-white shadow rounded-xl mb-6 px-4 flex justify-between">
          <label htmlFor="dashboard-drawer" className="btn btn-ghost lg:hidden">
            ☰
          </label>

          <h2 className="text-xl font-bold">
            {role === "admin" ? "Admin Dashboard" : "User Dashboard"}
          </h2>

          <div className="flex items-center gap-3">
            <img
              src={user?.photoURL || "/default-avatar.png"}
              className="w-10 h-10 rounded-full border"
              alt="profile"
            />
            <button
              onClick={signOutUser}
              className="btn btn-sm bg-red-500 text-white"
            >
              Logout
            </button>
          </div>
        </nav>

        <div className="bg-white rounded-xl shadow p-5 min-h-[70vh]">
          <Outlet />
        </div>
      </div>

      {/* ================= SIDEBAR ================= */}
      <div className="drawer-side">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>

        <ul className="menu p-6 w-64 min-h-full bg-white shadow-lg border-r">
          <li className="mb-4 text-lg font-bold">
            {role === "admin" ? "Admin Panel" : "User Panel"}
          </li>

          {/* ===== ADMIN MENU ===== */}
          {role === "admin" && (
            <>
              <li>
                <NavLink
                  to="/dashboard"
                  end
                  className={({ isActive }) =>
                    isActive ? activeClass : normalClass
                  }
                >
                  Dashboard Overview
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/all-reviews"
                  className={({ isActive }) =>
                    isActive ? activeClass : normalClass
                  }
                >
                  All Reviews
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/all-food"
                  className={({ isActive }) =>
                    isActive ? activeClass : normalClass
                  }
                >
                  All Food
                </NavLink>
              </li>
            </>
          )}

          {/* ===== USER MENU ===== */}
          {role === "user" && (
            <>
              <li>
                <NavLink
                  to="/dashboard"
                  end
                  className={({ isActive }) =>
                    isActive ? activeClass : normalClass
                  }
                >
                  User Dashboard
                </NavLink>
              </li>

              <li><Link to="/allfood" className={normalClass}>All Food</Link></li>
              <li><Link to="/addreview" className={normalClass}>Add Review</Link></li>
              <li><Link to="/myreview" className={normalClass}>My Reviews</Link></li>
              <li><Link to="/myfavorites" className={normalClass}>My Favorites</Link></li>
            </>
          )}

          <div className="divider"></div>

          <li>
            <Link to="/" className="text-black">⬅ Back to Home</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
