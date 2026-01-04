
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AllFood = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState("ratingDesc"); 

  const itemsPerPage = 8;

  useEffect(() => {
    document.title = "All Food";
  }, []);

  useEffect(() => {
    axios
      .get("https://food-server-green.vercel.app/products")
      .then((res) => {
        let sorted = [...res.data];
        sorted = sortReviews(sorted, sortOption);
        setReviews(sorted);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

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
    <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8 bg-base-100 text-base-content">
      {/* Header */}
      <div className="text-center mb-6 px-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3">Welcome Food Lovers!</h1>
        <p className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto opacity-80">
          Discover delicious dishes from your favorite local restaurants and enjoy the best culinary experiences.
        </p>
      </div>

      {/* Sorting */}
      <div className="text-center mb-6 px-2 sm:px-0">
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

      {/* Food Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 auto-rows-fr">
        {currentReviews.map((review) => {
          const { _id, foodName, restaurantName, restaurantLocation, reviewerName, rating, photo } = review;
          const isFavorite = favorites.includes(_id);

          return (
            <div
              key={_id}
              className="relative bg-base-100 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-base-300 flex flex-col h-full"
            >
              <figure className="h-56 sm:h-64 md:h-56 lg:h-64 overflow-hidden">
                <img
                  src={photo}
                  alt={foodName}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </figure>

              <div className="p-5 flex flex-col justify-between flex-1">
                <div>
                  <h2 className="text-xl sm:text-2xl font-semibold">{foodName}</h2>
                  <p className="mt-1 text-sm sm:text-base opacity-80">
                    {restaurantName} — {restaurantLocation}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-3">
                  <span className="font-medium text-sm sm:text-base">{reviewerName}</span>
                  <span className="px-3 py-1 bg-yellow-500 text-black rounded-full text-sm font-semibold shadow-sm">
                    ★ {rating}
                  </span>
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
