// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const AllReviews = () => {
//   const [reviews, setReviews] = useState([]);
//   const [query, setQuery] = useState("");
//   const [filteredReviews, setFilteredReviews] = useState([]);
//   const [favorites, setFavorites] = useState([]);

//   // Load all reviews
//   useEffect(() => {
//     axios
//       .get("http://localhost:3000/products/addreview")
//       .then((res) => {
//         setReviews(res.data);
//         setFilteredReviews(res.data); // Initially show all
//       })
//       .catch((err) => console.error(err));
//   }, []);

//   // Search handler
//   const handleSearch = () => {
//     const filtered = reviews.filter((review) =>
//       review.foodName.toLowerCase().includes(query.toLowerCase())
//     );
//     setFilteredReviews(filtered);
//   };

//   // Toggle favorite
//   const toggleFavorite = (id) => {
//     if (favorites.includes(id)) {
//       setFavorites(favorites.filter((favId) => favId !== id));
//     } else {
//       setFavorites([...favorites, id]);
//     }
//   };

//   return (
//     <div className="p-4 max-w-5xl mx-auto flex flex-col gap-4">
//       {/* Search Bar */}
//       <div className="flex gap-2 mb-4">
//         <input
//           type="text"
//           placeholder="Search food..."
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           className="input input-bordered w-full"
//         />
//         <button onClick={handleSearch} className="btn btn-primary">
//           Search
//         </button>
//       </div>

//       {/* Reviews List */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {filteredReviews.map((review) => (
//           <div
//             key={review._id}
//             className="card bg-base-100 shadow-md rounded-xl overflow-hidden relative hover:shadow-lg transition-shadow duration-300"
//           >
//             {/* Favorite Button */}
//             <button
//               onClick={() => toggleFavorite(review._id)}
//               className={`absolute top-2 right-2 text-2xl ${
//                 favorites.includes(review._id) ? "text-red-500" : "text-gray-400"
//               }`}
//             >
//               ♥
//             </button>

//             {/* Food Image */}
//             <figure className="h-48 overflow-hidden">
//               <img
//                 src={review.foodImage}
//                 alt={review.foodName}
//                 className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
//               />
//             </figure>

//             {/* Card Body */}
//             <div className="card-body p-4">
//               <h2 className="card-title text-lg font-semibold">{review.foodName}</h2>
//               <p className="text-gray-600 text-sm">
//                 {review.restaurantName} — {review.location}
//               </p>
//               <p className="text-sm mt-2">{review.reviewText}</p>

//               <div className="flex items-center justify-between mt-4">
//                 <span className="text-sm">{review.email}</span>
//                 <span className="badge badge-primary text-sm">{review.rating} ★</span>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AllReviews;
