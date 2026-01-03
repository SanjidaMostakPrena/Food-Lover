// // import React, { useEffect, useState, useContext } from "react";
// // import { AuthContext } from "../../contexts/AuthContext";
// // import { Bar } from "react-chartjs-2";
// // import {
// //   Chart as ChartJS,
// //   CategoryScale,
// //   LinearScale,
// //   BarElement,
// //   Title,
// //   Tooltip,
// //   Legend,
// // } from "chart.js";
// // import toast from "react-hot-toast";
// // import axios from "axios";

// // ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// // const Dashboard = () => {
// //   const { user } = useContext(AuthContext);
// //   const [products, setProducts] = useState([]);
// //   const [reviews, setReviews] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         const [productsRes, reviewsRes] = await Promise.all([
// //           axios.get("https://food-server-green.vercel.app/products"),
// //           axios.get("https://food-server-green.vercel.app/addreview"),
// //         ]);
// //         setProducts(productsRes.data);
// //         setReviews(reviewsRes.data);
// //         setLoading(false);
// //       } catch (err) {
// //         console.error(err);
// //         toast.error("Failed to load dashboard data");
// //       }
// //     };
// //     fetchData();
// //   }, []);

// //   // Chart for top 5 rated foods
// //   const chartData = {
// //     labels: products.slice(0, 5).map((p) => p.foodName),
// //     datasets: [
// //       {
// //         label: "Rating",
// //         data: products.slice(0, 5).map((p) => p.rating || 0),
// //         backgroundColor: "rgba(250, 204, 21, 0.8)",
// //       },
// //     ],
// //   };

// //   const chartOptions = {
// //     responsive: true,
// //     plugins: {
// //       legend: { position: "top" },
// //       title: { display: true, text: "Top 5 Rated Foods" },
// //     },
// //   };

// //   if (loading)
// //     return (
// //       <div className="flex justify-center items-center h-screen">
// //         <div className="loader border-yellow-400 border-4 border-t-4 border-t-transparent rounded-full w-12 h-12 animate-spin"></div>
// //       </div>
// //     );

// //   return (
// //     <div className="flex flex-col min-h-screen bg-gray-100">
// //       {/* Header */}
// //       <header className="bg-gradient-to-r from-[#020617] via-[#0f172a] to-[#1e293b] text-white p-6 rounded-b-3xl shadow-md">
// //         <h1 className="text-3xl font-bold mb-2">
// //           Welcome, {user?.displayName || "Food Lover"}!
// //         </h1>
// //         <p className="text-gray-300">
// //           Here’s your food adventure dashboard 🍔🍕🍣
// //         </p>
// //       </header>

// //       <main className="flex-1 p-6">
// //         {/* Stats */}
// //         <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
// //           <div className="bg-white rounded-2xl shadow-lg p-5 text-center hover:shadow-2xl transition">
// //             <h2 className="text-2xl font-bold text-yellow-400">{reviews.length}</h2>
// //             <p className="text-gray-500 mt-1">Total Reviews</p>
// //           </div>
// //           <div className="bg-white rounded-2xl shadow-lg p-5 text-center hover:shadow-2xl transition">
// //             <h2 className="text-2xl font-bold text-green-400">{products.length}</h2>
// //             <p className="text-gray-500 mt-1">All Foods</p>
// //           </div>
// //           <div className="bg-white rounded-2xl shadow-lg p-5 text-center hover:shadow-2xl transition">
// //             <h2 className="text-2xl font-bold text-red-400">
// //               {products.filter((p) => p.rating >= 4.5).length}
// //             </h2>
// //             <p className="text-gray-500 mt-1">Top Rated Foods</p>
// //           </div>
// //           <div className="bg-white rounded-2xl shadow-lg p-5 text-center hover:shadow-2xl transition">
// //             <h2 className="text-2xl font-bold text-blue-400">
// //               {products.filter((p) => p.reviewerName).length}
// //             </h2>
// //             <p className="text-gray-500 mt-1">Reviewed Foods</p>
// //           </div>
// //         </section>

// //         {/* Chart */}
// //         <section className="bg-white rounded-2xl shadow-lg p-6 mb-8">
// //           <Bar data={chartData} options={chartOptions} />
// //         </section>

// //         {/* All Foods Table */}
// //         <section className="bg-white rounded-2xl shadow-lg p-6 mb-8 overflow-x-auto">
// //           <h2 className="text-2xl font-semibold text-gray-700 mb-4">All Foods List</h2>
// //           <table className="w-full text-left border-collapse">
// //             <thead className="bg-yellow-400 text-black">
// //               <tr>
// //                 <th className="py-3 px-4 rounded-tl-2xl">#</th>
// //                 <th className="py-3 px-4">Food Name</th>
// //                 <th className="py-3 px-4">Restaurant</th>
// //                 <th className="py-3 px-4">Location</th>
// //                 <th className="py-3 px-4 rounded-tr-2xl">Rating</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {products.map((product, index) => (
// //                 <tr
// //                   key={product._id}
// //                   className={`${
// //                     index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"
// //                   } hover:bg-yellow-50 transition`}
// //                 >
// //                   <td className="py-2 px-4">{index + 1}</td>
// //                   <td className="py-2 px-4 font-medium">{product.foodName}</td>
// //                   <td className="py-2 px-4">{product.restaurantName}</td>
// //                   <td className="py-2 px-4">{product.restaurantLocation}</td>
// //                   <td className="py-2 px-4 font-semibold text-yellow-600">
// //                     {product.rating || "N/A"}
// //                   </td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         </section>

// //         {/* Extra Creative Section */}
// //         <section className="mt-12 bg-gradient-to-r from-yellow-100 via-orange-100 to-yellow-200 rounded-3xl p-8 text-center shadow-lg">
// //           <h2 className="text-3xl font-bold mb-4">Share Your Food Adventures!</h2>
// //           <p className="text-gray-700 mb-6">
// //             Post your reviews, rate your favorite dishes, and connect with other food lovers in your area.
// //           </p>
// //           <a
// //             href="/addreview"
// //             className="inline-block bg-yellow-400 text-black font-semibold px-6 py-3 rounded-lg shadow hover:bg-yellow-500 transition"
// //           >
// //             Add Review
// //           </a>
// //         </section>
// //       </main>
// //     </div>
// //   );
// // };

// // export default Dashboard;
// import React, { useEffect, useState, useContext } from "react";
// import { AuthContext } from "../../contexts/AuthContext";
// import axios from "axios";
// import toast from "react-hot-toast";

// // Chart.js imports
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   ArcElement,
//   LineElement,
//   PointElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { Bar, Pie, Line } from "react-chartjs-2";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   ArcElement,
//   LineElement,
//   PointElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const Dashboard = () => {
//   const { user } = useContext(AuthContext);
//   const [products, setProducts] = useState([]);
//   const [reviews, setReviews] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [productsRes, reviewsRes] = await Promise.all([
//           axios.get("https://food-server-green.vercel.app/products"),
//           axios.get("https://food-server-green.vercel.app/addreview"),
//         ]);
//         setProducts(productsRes.data);
//         setReviews(reviewsRes.data);
//         setLoading(false);
//       } catch (err) {
//         console.error(err);
//         toast.error("Failed to load dashboard data");
//       }
//     };
//     fetchData();
//   }, []);

//   if (loading)
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="loader border-yellow-400 border-4 border-t-4 border-t-transparent rounded-full w-12 h-12 animate-spin"></div>
//       </div>
//     );

//   // ---- Bar Chart: Top 5 Rated Foods ----
//   const topFoods = products
//     .sort((a, b) => (b.rating || 0) - (a.rating || 0))
//     .slice(0, 5);
//   const barData = {
//     labels: topFoods.map((p) => p.foodName),
//     datasets: [
//       {
//         label: "Rating",
//         data: topFoods.map((p) => p.rating || 0),
//         backgroundColor: [
//           "rgba(255, 206, 86, 0.8)",
//           "rgba(255, 99, 132, 0.8)",
//           "rgba(54, 162, 235, 0.8)",
//           "rgba(255, 159, 64, 0.8)",
//           "rgba(75, 192, 192, 0.8)",
//         ],
//         borderRadius: 12,
//         barThickness: 40,
//       },
//     ],
//   };
//   const barOptions = {
//     responsive: true,
//     plugins: {
//       legend: { display: false },
//       title: {
//         display: true,
//         text: "Top 5 Rated Foods 🍔🍕🍣",
//         font: { size: 22, weight: "bold" },
//       },
//       tooltip: {
//         backgroundColor: "#333",
//         titleColor: "#fff",
//         bodyColor: "#fff",
//         padding: 10,
//         cornerRadius: 10,
//       },
//     },
//     scales: {
//       y: { beginAtZero: true, ticks: { stepSize: 1 } },
//     },
//     animation: { duration: 1000, easing: "easeOutBounce" },
//   };

//   // ---- Pie Chart: Food Categories Distribution ----
//   const categoryCounts = products.reduce((acc, p) => {
//     const category = p.category || "Other";
//     acc[category] = (acc[category] || 0) + 1;
//     return acc;
//   }, {});
//   const pieData = {
//     labels: Object.keys(categoryCounts),
//     datasets: [
//       {
//         label: "Food Category",
//         data: Object.values(categoryCounts),
//         backgroundColor: [
//           "rgba(255, 206, 86, 0.8)",
//           "rgba(255, 99, 132, 0.8)",
//           "rgba(54, 162, 235, 0.8)",
//           "rgba(255, 159, 64, 0.8)",
//           "rgba(75, 192, 192, 0.8)",
//         ],
//       },
//     ],
//   };
//   const pieOptions = { responsive: true, plugins: { legend: { position: "bottom" } } };

//   // ---- Sparkline: Reviews Trend for Top Foods ----
//   const sparklineData = {
//     labels: reviews.map((r) => new Date(r.createdAt).toLocaleDateString()),
//     datasets: topFoods.map((food, idx) => ({
//       label: food.foodName,
//       data: reviews
//         .filter((r) => r.foodName === food.foodName)
//         .map((r) => r.rating || 0),
//       borderColor: `hsl(${idx * 60}, 70%, 50%)`,
//       backgroundColor: "transparent",
//       tension: 0.4,
//       pointRadius: 3,
//     })),
//   };
//   const sparklineOptions = {
//     responsive: true,
//     plugins: { legend: { position: "bottom" } },
//     scales: {
//       y: { beginAtZero: true, max: 5, ticks: { stepSize: 1 } },
//     },
//   };

//   return (
//     <div className="flex flex-col min-h-screen bg-gray-900 p-6">
//       {/* Header */}
//       <header className="bg-gradient-to-r from-[#020617] via-[#0f172a] to-[#1e293b] text-white p-6 rounded-b-3xl shadow-md mb-8">
//         <h1 className="text-3xl font-bold mb-2">
//           Welcome, {user?.displayName || "Food Lover"}!
//         </h1>
//         <p className="text-gray-300">Your interactive food dashboard 🍔🍕🍣</p>
//       </header>

//       {/* Stats */}
//       <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
//         <div className="bg-gray-800 rounded-2xl shadow-lg p-5 text-center hover:shadow-2xl transition">
//           <h2 className="text-2xl font-bold text-yellow-400">{reviews.length}</h2>
//           <p className="text-gray-300 mt-1">Total Reviews</p>
//         </div>
//         <div className="bg-gray-800 rounded-2xl shadow-lg p-5 text-center hover:shadow-2xl transition">
//           <h2 className="text-2xl font-bold text-yellow-400">{products.length}</h2>
//           <p className="text-gray-300 mt-1">All Foods</p>
//         </div>
//         <div className="bg-gray-800 rounded-2xl shadow-lg p-5 text-center hover:shadow-2xl transition">
//           <h2 className="text-2xl font-bold text-yellow-400">
//             {products.filter((p) => p.rating >= 4.5).length}
//           </h2>
//           <p className="text-gray-300 mt-1">Top Rated Foods</p>
//         </div>
//         <div className="bg-gray-800 rounded-2xl shadow-lg p-5 text-center hover:shadow-2xl transition">
//           <h2 className="text-2xl font-bold text-yellow-400">
//             {products.filter((p) => p.reviewerName).length}
//           </h2>
//           <p className="text-gray-300 mt-1">Reviewed Foods</p>
//         </div>
//       </section>

//       {/* Charts */}
//       <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//         <div className="bg-gray-800 rounded-3xl shadow-xl p-6">
//           <Bar data={barData} options={barOptions} />
//         </div>
//         <div className="bg-gray-800 rounded-3xl shadow-xl p-6">
//           <Pie data={pieData} options={pieOptions} />
//         </div>
//       </section>

//       {/* Sparkline Trends */}
//       <section className="bg-gray-800 rounded-3xl shadow-xl p-6 mb-8">
//         <h2 className="text-2xl font-semibold text-yellow-400 mb-4">
//           Review Trends for Top Foods
//         </h2>
//         <Line data={sparklineData} options={sparklineOptions} />
//       </section>

//       {/* All Foods Table */}
//       <section className="bg-gray-700 rounded-3xl shadow-xl p-6 mb-8 overflow-x-auto">
//         <h2 className="text-2xl font-semibold text-yellow-400 mb-4">All Foods</h2>
//         <table className="w-full text-left border-collapse">
//           <thead>
//             <tr className="bg-gray-800">
//               <th className="p-3 border-b border-gray-600 text-yellow-400">Food Name</th>
//               <th className="p-3 border-b border-gray-600 text-yellow-400">Restaurant</th>
//               <th className="p-3 border-b border-gray-600 text-yellow-400">Location</th>
//               <th className="p-3 border-b border-gray-600 text-yellow-400">Rating</th>
//               <th className="p-3 border-b border-gray-600 text-yellow-400">Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {products.map((p) => (
//               <tr key={p._id} className="hover:bg-gray-600 transition">
//                 <td className="p-3 border-b border-gray-600 text-yellow-400">{p.foodName}</td>
//                 <td className="p-3 border-b border-gray-600 text-yellow-400">{p.restaurantName}</td>
//                 <td className="p-3 border-b border-gray-600 text-yellow-400">{p.restaurantLocation}</td>
//                 <td className="p-3 border-b border-gray-600 text-yellow-400">{p.rating || "N/A"}</td>
//                 <td className="p-3 border-b border-gray-600 text-yellow-400">{p.status || "Unknown"}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </section>

//       {/* Extra Section */}
//       <section className="mt-12 bg-gradient-to-r from-yellow-100 via-orange-100 to-yellow-200 rounded-3xl p-8 text-center shadow-lg">
//         <h2 className="text-3xl font-bold mb-4">Share Your Food Adventures!</h2>
//         <p className="text-gray-700 mb-6">
//           Post reviews, rate dishes, and connect with other food lovers in your area.
//         </p>
//         <a
//           href="/addreview"
//           className="inline-block bg-yellow-400 text-black font-semibold px-6 py-3 rounded-lg shadow hover:bg-yellow-500 transition"
//         >
//           Add Review
//         </a>
//       </section>
//     </div>
//   );
// };

// export default Dashboard;
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
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
  const isAdmin = user?.email === "admindemo@example.com";

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
      <div className="flex justify-center items-center h-screen">
        <div className="border-4 border-yellow-400 border-t-transparent w-12 h-12 rounded-full animate-spin"></div>
      </div>
    );
  }

  /* ---------- USER DATA ---------- */
  const topFoods = [...products]
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 5);

  const userBarData = {
    labels: topFoods.map((p) => p.foodName),
    datasets: [
      {
        label: "Rating",
        data: topFoods.map((p) => p.rating || 0),
        backgroundColor: "rgba(250, 204, 21, 0.8)",
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
        backgroundColor: [
          "#facc15",
          "#fb7185",
          "#60a5fa",
          "#34d399",
        ],
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
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <header className=" bg-white text-black p-6 rounded-3xl shadow mb-8">
        <h1 className="text-3xl font-bold">
          {isAdmin
            ? "Admin Dashboard "
            : `Welcome, ${user?.displayName || "Food Lover"}!`}
        </h1>
        <p className="opacity-80 mt-1">
          {isAdmin ? "System overview" : "Your food activity overview"}
        </p>
      </header>

      {/* Buttons */}
      <section className="flex flex-wrap gap-4 mb-10">
        {isAdmin ? (
          <>
            <a href="/allreviews" className="btn  bg-primary text-white">
              All Reviews
            </a>
            <a href="/allfood" className="btn  bg-primary text-white">
              All Foods
            </a>
            <a href="/profile" className="btn  bg-primary text-white">
              Admin Profile
            </a>
          </>
        ) : (
          <>
            <a href="/allreviews" className="btn  bg-primary text-white">
              All Reviews
            </a>
            <a href="/addreview" className="btn bg-primary text-white">
              Add Review
            </a>
            <a href="/myreview" className="btn  bg-primary text-white">
              My Reviews
            </a>
            <a href="/myfavorites" className="btn  bg-primary text-white">
              My Favorites
            </a>
          </>
        )}
      </section>

      {/* Stats Cards */}
      <section className={`grid ${isAdmin ? "md:grid-cols-2" : "md:grid-cols-4"} gap-6 mb-10`}>
        <div className="bg-white rounded-2xl p-6 text-center shadow">
          <h2 className="text-4xl font-bold text-indigo-600">{products.length}</h2>
          <p className="text-gray-500">Total Foods</p>
        </div>

        <div className="bg-white rounded-2xl p-6 text-center shadow">
          <h2 className="text-4xl font-bold text-green-500">{reviews.length}</h2>
          <p className="text-gray-500">Total Reviews</p>
        </div>

        {!isAdmin && (
          <>
            <div className="bg-white rounded-2xl p-6 text-center shadow">
              <h2 className="text-4xl font-bold text-yellow-500">
                {products.filter((p) => p.rating >= 4.5).length}
              </h2>
              <p className="text-gray-500">Top Rated</p>
            </div>

            <div className="bg-white rounded-2xl p-6 text-center shadow">
              <h2 className="text-4xl font-bold text-blue-500">
                {products.filter((p) => p.reviewerName).length}
              </h2>
              <p className="text-gray-500">Reviewed Foods</p>
            </div>
          </>
        )}
      </section>

      {/* Charts – SAME DESIGN */}
      <section className="grid md:grid-cols-2 gap-6 mb-8">
        {!isAdmin && (
          <div className="bg-white p-6 rounded-2xl shadow">
            <Bar data={userBarData} />
          </div>
        )}

        <div className="bg-white p-6 rounded-2xl shadow">
          <Pie data={isAdmin ? adminPieData : userPieData} />
        </div>
      </section>

      {!isAdmin && (
        <section className="bg-white p-6 rounded-2xl shadow">
          <Line data={sparklineData} />
        </section>
      )}
    </div>
  );
};

export default Dashboard;
