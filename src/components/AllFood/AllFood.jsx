// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";

// const AllFood = () => {
//   const [reviews, setReviews] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [favorites, setFavorites] = useState([]);

//   useEffect(() => {
//     document.title = "All Food";
//   }, []);

//   useEffect(() => {
//     axios
//       .get("https://food-server-green.vercel.app/products")
//       .then((res) => {
//         const sorted = res.data.sort(
//           (a, b) =>
//             b.rating - a.rating || new Date(b.createdAt) - new Date(a.createdAt)
//         );
//         setReviews(sorted);
//       })
//       .catch((err) => console.error(err))
//       .finally(() => setLoading(false));
//   }, []);

//   const toggleFavorite = (id) => {
//     setFavorites((prev) =>
//       prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
//     );
//   };

//   if (loading)
//     return (
//       <p className="text-center mt-10 text-lg font-medium text-gray-700">
//         Loading food...
//       </p>
//     );

//   return (
//     <div className="max-w-7xl mx-auto p-4 bg-white ">
//       <div className="text-center mb-10">
//         <h1 className="text-4xl sm:text-5xl font-bold mb-3 text-black">
//           Welcome Food Lovers!
//         </h1>
//         <p className="text-black text-lg sm:text-xl max-w-2xl mx-auto">
//           Discover delicious dishes from your favorite local restaurants and enjoy
//           the best culinary experiences.
//         </p>
//       </div>

//       {/* Food Cards */}
//       <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
//         {reviews.map((review) => {
//           const {
//             _id,
//             foodName,
//             restaurantName,
//             restaurantLocation,
//             reviewerName,
//             rating,
//             photo,
//           } = review;

//           const isFavorite = favorites.includes(_id);

//           return (
//             <div
//               key={_id}
//               className="relative bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden"
//             >
            
//               <figure className="h-56 sm:h-64 overflow-hidden">
//                 <img
//                   src={photo}
//                   alt={foodName}
//                   className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
//                 />
//               </figure>

//               {/* Card Body */}
//               <div className="p-5">
//                 <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
//                   {foodName}
//                 </h2>
//                 <p className="text-gray-600 mt-1 text-sm sm:text-base">
//                   {restaurantName} — {restaurantLocation}
//                 </p>

//                 <div className="flex items-center justify-between mt-3">
//                   <span className="font-medium text-sm sm:text-base">
//                     {reviewerName}
//                   </span>
//                   <span className="px-3 py-1 bg-yellow-400 text-gray-900 rounded-full text-sm font-semibold shadow-sm">
//                     ★ {rating}
//                   </span>
//                 </div>

//                 <div className="mt-4 text-center">
//                   <Link
//                     to={`/ProductDetails/${_id}`}
//                     className="btn btn-outline btn-primary w-1/2 sm:w-5/12 mx-auto"
//                   >
//                     Food Details
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default AllFood;
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";

// const AllFood = () => {
//   const [reviews, setReviews] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [favorites, setFavorites] = useState([]);

//   useEffect(() => {
//     document.title = "All Food";
//   }, []);

//   useEffect(() => {
//     axios
//       .get("https://food-server-green.vercel.app/products")
//       .then((res) => {
//         const sorted = res.data.sort(
//           (a, b) =>
//             b.rating - a.rating || new Date(b.createdAt) - new Date(a.createdAt)
//         );
//         setReviews(sorted);
//       })
//       .catch((err) => console.error(err))
//       .finally(() => setLoading(false));
//   }, []);

//   const toggleFavorite = (id) => {
//     setFavorites((prev) =>
//       prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
//     );
//   };

//   if (loading)
//     return (
//       <p className="text-center mt-10 text-lg font-medium text-base-content">
//         Loading food...
//       </p>
//     );

//   return (
//     <div className="max-w-7xl mx-auto p-4 bg-base-100 text-base-content">

//       {/* Header */}
//       <div className="text-center mb-10">
//         <h1 className="text-4xl sm:text-5xl font-bold mb-3">
//           Welcome Food Lovers!
//         </h1>
//         <p className="text-lg sm:text-xl max-w-2xl mx-auto opacity-80">
//           Discover delicious dishes from your favorite local restaurants and enjoy
//           the best culinary experiences.
//         </p>
//       </div>

//       {/* Food Cards */}
//       <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//         {reviews.map((review) => {
//           const {
//             _id,
//             foodName,
//             restaurantName,
//             restaurantLocation,
//             reviewerName,
//             rating,
//             photo,
//           } = review;

//           const isFavorite = favorites.includes(_id);

//           return (
//             <div
//               key={_id}
//               className="relative bg-base-100 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-base-300"
//             >
//               {/* Image */}
//               <figure className="h-56 sm:h-64 overflow-hidden">
//                 <img
//                   src={photo}
//                   alt={foodName}
//                   className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
//                 />
//               </figure>

//               {/* Card Body */}
//               <div className="p-5 flex flex-col justify-between h-[220px]">
//                 <div>
//                   <h2 className="text-xl sm:text-2xl font-semibold">
//                     {foodName}
//                   </h2>
//                   <p className="mt-1 text-sm sm:text-base opacity-80">
//                     {restaurantName} — {restaurantLocation}
//                   </p>
//                 </div>

//                 <div className="flex items-center justify-between mt-3">
//                   <span className="font-medium text-sm sm:text-base">
//                     {reviewerName}
//                   </span>
//                   <span className="px-3 py-1 bg-yellow-500 text-black rounded-full text-sm font-semibold shadow-sm">
//                     ★ {rating}
//                   </span>
//                 </div>

//                 <div className="mt-4 text-center">
//                   <Link
//                     to={`/ProductDetails/${_id}`}
//                     className="inline-block px-4 py-2 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-black font-semibold transition"
//                   >
//                     Food Details
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default AllFood;
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";

// const AllFood = () => {
//   const [reviews, setReviews] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [favorites, setFavorites] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 8; // number of food cards per page

//   useEffect(() => {
//     document.title = "All Food";
//   }, []);

//   useEffect(() => {
//     axios
//       .get("https://food-server-green.vercel.app/products")
//       .then((res) => {
//         const sorted = res.data.sort(
//           (a, b) =>
//             b.rating - a.rating || new Date(b.createdAt) - new Date(a.createdAt)
//         );
//         setReviews(sorted);
//       })
//       .catch((err) => console.error(err))
//       .finally(() => setLoading(false));
//   }, []);

//   const toggleFavorite = (id) => {
//     setFavorites((prev) =>
//       prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
//     );
//   };

//   // Pagination logic
//   const totalPages = Math.ceil(reviews.length / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const currentReviews = reviews.slice(startIndex, startIndex + itemsPerPage);

//   const goToPrevious = () => {
//     setCurrentPage((prev) => Math.max(prev - 1, 1));
//   };

//   const goToNext = () => {
//     setCurrentPage((prev) => Math.min(prev + 1, totalPages));
//   };

//   if (loading)
//     return (
//       <p className="text-center mt-10 text-lg font-medium text-base-content">
//         Loading food...
//       </p>
//     );

//   return (
//     <div className="max-w-7xl mx-auto p-4 bg-base-100 text-base-content">

//       {/* Header */}
//       <div className="text-center mb-10">
//         <h1 className="text-4xl sm:text-5xl font-bold mb-3">
//           Welcome Food Lovers!
//         </h1>
//         <p className="text-lg sm:text-xl max-w-2xl mx-auto opacity-80">
//           Discover delicious dishes from your favorite local restaurants and enjoy
//           the best culinary experiences.
//         </p>
//       </div>

//       {/* Food Cards */}
//       <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//         {currentReviews.map((review) => {
//           const {
//             _id,
//             foodName,
//             restaurantName,
//             restaurantLocation,
//             reviewerName,
//             rating,
//             photo,
//           } = review;

//           const isFavorite = favorites.includes(_id);

//           return (
//             <div
//               key={_id}
//               className="relative bg-base-100 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-base-300"
//             >
//               {/* Image */}
//               <figure className="h-56 sm:h-64 overflow-hidden">
//                 <img
//                   src={photo}
//                   alt={foodName}
//                   className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
//                 />
//               </figure>

//               {/* Card Body */}
//               <div className="p-5 flex flex-col justify-between h-[220px]">
//                 <div>
//                   <h2 className="text-xl sm:text-2xl font-semibold">
//                     {foodName}
//                   </h2>
//                   <p className="mt-1 text-sm sm:text-base opacity-80">
//                     {restaurantName} — {restaurantLocation}
//                   </p>
//                 </div>

//                 <div className="flex items-center justify-between mt-3">
//                   <span className="font-medium text-sm sm:text-base">
//                     {reviewerName}
//                   </span>
//                   <span className="px-3 py-1 bg-yellow-500 text-black rounded-full text-sm font-semibold shadow-sm">
//                     ★ {rating}
//                   </span>
//                 </div>

//                 <div className="mt-4 text-center">
//                   <Link
//                     to={`/ProductDetails/${_id}`}
//                     className="inline-block px-4 py-2 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-black font-semibold transition"
//                   >
//                     Food Details
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {/* Pagination */}
//       <div className="join grid grid-cols-2 mt-8 max-w-xs mx-auto">
//         <button
//           className="join-item btn btn-outline"
//           onClick={goToPrevious}
//           disabled={currentPage === 1}
//         >
//           Previous page
//         </button>
//         <button
//           className="join-item btn btn-outline"
//           onClick={goToNext}
//           disabled={currentPage === totalPages}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AllFood;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AllFood = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState("ratingDesc"); // New state for sorting

  const itemsPerPage = 8; // number of food cards per page

  useEffect(() => {
    document.title = "All Food";
  }, []);

  useEffect(() => {
    axios
      .get("https://food-server-green.vercel.app/products")
      .then((res) => {
        let sorted = [...res.data];
        sorted = sortReviews(sorted, sortOption); // Apply initial sorting
        setReviews(sorted);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  // Function to handle sorting
  const sortReviews = (data, option) => {
    switch (option) {
      case "ratingDesc":
        return data.sort((a, b) => b.rating - a.rating);
      case "ratingAsc":
        return data.sort((a, b) => a.rating - b.rating);
      case "newest":
        return data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      case "oldest":
        return data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      default:
        return data;
    }
  };

  const handleSortChange = (e) => {
    const option = e.target.value;
    setSortOption(option);
    setReviews((prev) => sortReviews([...prev], option));
  };

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
  };

  // Pagination logic
  const totalPages = Math.ceil(reviews.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentReviews = reviews.slice(startIndex, startIndex + itemsPerPage);

  const goToPrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const goToNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  if (loading)
    return (
      <p className="text-center mt-10 text-lg font-medium text-base-content">
        Loading food...
      </p>
    );

  return (
    <div className="max-w-7xl mx-auto p-4 bg-base-100 text-base-content">

      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-4xl sm:text-5xl font-bold mb-3">Welcome Food Lovers!</h1>
        <p className="text-lg sm:text-xl max-w-2xl mx-auto opacity-80">
          Discover delicious dishes from your favorite local restaurants and enjoy the best culinary experiences.
        </p>
      </div>

      {/* Sorting */}
      <div className="text-center  mb-6">
        <label className="mr-2 font-medium">Sort by:</label>
        <select
          value={sortOption}
          onChange={handleSortChange}
          className="border border-base-300 dark:border-base-700 bg-base-100 dark:bg-base-900 text-base-content dark:text-base-100 rounded-lg px-3 py-1"
        >
          <option value="ratingDesc">Rating: High → Low</option>
          <option value="ratingAsc">Rating: Low → High</option>
          
        </select>
      </div>

      {/* Food Cards */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {currentReviews.map((review) => {
          const { _id, foodName, restaurantName, restaurantLocation, reviewerName, rating, photo } = review;
          const isFavorite = favorites.includes(_id);

          return (
            <div
              key={_id}
              className="relative bg-base-100 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-base-300"
            >
              <figure className="h-56 sm:h-64 overflow-hidden">
                <img src={photo} alt={foodName} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </figure>

              <div className="p-5 flex flex-col justify-between h-[220px]">
                <div>
                  <h2 className="text-xl sm:text-2xl font-semibold">{foodName}</h2>
                  <p className="mt-1 text-sm sm:text-base opacity-80">
                    {restaurantName} — {restaurantLocation}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-3">
                  <span className="font-medium text-sm sm:text-base">{reviewerName}</span>
                  <span className="px-3 py-1 bg-yellow-500 text-black rounded-full text-sm font-semibold shadow-sm">★ {rating}</span>
                </div>

                <div className="mt-4 text-center">
                  <Link
                    to={`/ProductDetails/${_id}`}
                    className="inline-block px-4 py-2 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-black font-semibold transition"
                  >
                    Food Details
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      <div className="join grid grid-cols-2 mt-8 max-w-xs mx-auto">
        <button className="join-item btn btn-outline" onClick={goToPrevious} disabled={currentPage === 1}>
          Previous page
        </button>
        <button className="join-item btn btn-outline" onClick={goToNext} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default AllFood;