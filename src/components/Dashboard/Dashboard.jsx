
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Pie, Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const isAdmin = user?.email === "admin9@gmail.com";
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, reviewsRes] = await Promise.all([
          axios.get("https://food-server-green.vercel.app/products"),
          axios.get("https://food-server-green.vercel.app/addreview"),
        ]);
        setProducts(productsRes.data);
        setReviews(reviewsRes.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load dashboard data");
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-base-100">
        <div className="border-4 border-yellow-500 border-t-transparent w-12 h-12 rounded-full animate-spin"></div>
      </div>
    );
  }

  
  const topFoods = [...products]
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 5);

  const userBarData = {
    labels: topFoods.map((p) => p.foodName),
    datasets: [
      {
        label: "Rating",
        data: topFoods.map((p) => p.rating || 0),
        backgroundColor: "rgba(234, 179, 8, 0.8)",
        borderRadius: 10,
      },
    ],
  };

  const userCategoryCounts = products.reduce((acc, p) => {
    acc[p.category || "Other"] = (acc[p.category || "Other"] || 0) + 1;
    return acc;
  }, {});

  const userPieData = {
    labels: Object.keys(userCategoryCounts),
    datasets: [
      {
        data: Object.values(userCategoryCounts),
        backgroundColor: ["#eab308", "#fb7185", "#60a5fa", "#34d399"],
      },
    ],
  };

  const sparklineData = {
    labels: reviews.map((r) =>
      new Date(r.createdAt).toLocaleDateString()
    ),
    datasets: topFoods.map((food, idx) => ({
      label: food.foodName,
      data: reviews
        .filter((r) => r.foodName === food.foodName)
        .map((r) => r.rating || 0),
      borderColor: `hsl(${idx * 60}, 70%, 50%)`,
      tension: 0.4,
    })),
  };

  /* ---------- ADMIN DATA ---------- */
  const adminPieData = {
    labels: ["All Foods", "All Reviews"],
    datasets: [
      {
        data: [products.length, reviews.length],
        backgroundColor: ["#60a5fa", "#4ade80"],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-base-200 text-base-content p-6">
      {/* Back Button */}
      <div className="mb-4">
        <button
          onClick={() => navigate("/")}
          className="btn btn-sm bg-yellow-500 text-black hover:bg-yellow-600"
        >
          ← Back to Home
        </button>
      </div>

      {/* Header */}
      <header className="bg-base-100 p-6 rounded-3xl shadow mb-8">
        <h1 className="text-3xl font-bold text-base-content">
          {isAdmin
            ? "Admin Dashboard"
            : `Welcome, ${user?.displayName || "Food Lover"}!`}
        </h1>
        <p className="opacity-70 mt-1">
          {isAdmin ? "System overview" : "Your food activity overview"}
        </p>
      </header>

      {/* Buttons */}
      <section className="flex flex-wrap gap-4 mb-10">
        {isAdmin ? (
          <>
            <a href="/allreviews" className="btn bg-yellow-500 text-black hover:bg-yellow-600">
              All Reviews
            </a>
            <a href="/allfood" className="btn bg-yellow-500 text-black hover:bg-yellow-600">
              All Foods
            </a>
            <a href="/profile" className="btn bg-yellow-500 text-black hover:bg-yellow-600">
              Admin Profile
            </a>
          </>
        ) : (
          <>
            <a href="/allreviews" className="btn bg-yellow-500 text-black hover:bg-yellow-600">
              All Reviews
            </a>
            <a href="/addreview" className="btn bg-yellow-500 text-black hover:bg-yellow-600">
              Add Review
            </a>
            <a href="/myreview" className="btn bg-yellow-500 text-black hover:bg-yellow-600">
              My Reviews
            </a>
            <a href="/myfavorites" className="btn bg-yellow-500 text-black hover:bg-yellow-600">
              My Favorites
            </a>
          </>
        )}
      </section>

      {/* Stats Cards */}
      <section
        className={`grid ${isAdmin ? "md:grid-cols-2" : "md:grid-cols-4"} gap-6 mb-10`}
      >
        <div className="bg-base-100 rounded-2xl p-6 text-center shadow">
          <h2 className="text-4xl font-bold text-yellow-500">
            {products.length}
          </h2>
          <p className="opacity-70">Total Foods</p>
        </div>

        <div className="bg-base-100 rounded-2xl p-6 text-center shadow">
          <h2 className="text-4xl font-bold text-green-500">
            {reviews.length}
          </h2>
          <p className="opacity-70">Total Reviews</p>
        </div>

        {!isAdmin && (
          <>
            <div className="bg-base-100 rounded-2xl p-6 text-center shadow">
              <h2 className="text-4xl font-bold text-yellow-500">
                {products.filter((p) => p.rating >= 4.5).length}
              </h2>
              <p className="opacity-70">Top Rated</p>
            </div>

            <div className="bg-base-100 rounded-2xl p-6 text-center shadow">
              <h2 className="text-4xl font-bold text-blue-500">
                {products.filter((p) => p.reviewerName).length}
              </h2>
              <p className="opacity-70">Reviewed Foods</p>
            </div>
          </>
        )}
      </section>

      {/* Charts */}
      <section className="grid md:grid-cols-2 gap-6 mb-8">
        {!isAdmin && (
          <div className="bg-base-100 p-6 rounded-2xl shadow">
            <Bar data={userBarData} />
          </div>
        )}

        <div className="bg-base-100 p-6 rounded-2xl shadow">
          <Pie data={isAdmin ? adminPieData : userPieData} />
        </div>
      </section>

      {!isAdmin && (
        <section className="bg-base-100 p-6 rounded-2xl shadow">
          <Line data={sparklineData} />
        </section>
      )}
    </div>
  );
};

export default Dashboard;
