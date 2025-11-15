import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AllFood = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    document.title = "All Food";
  }, []);

  useEffect(() => {
    axios
      .get("https://food-server-green.vercel.app/products")
      .then((res) => {
        const sorted = res.data.sort(
          (a, b) =>
            b.rating - a.rating || new Date(b.createdAt) - new Date(a.createdAt)
        );
        setReviews(sorted);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
  };

  if (loading)
    return (
      <p className="text-center mt-10 text-lg font-medium text-gray-700">
        Loading food...
      </p>
    );

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl font-bold mb-3 text-gray-800">
          Welcome Food Lovers!
        </h1>
        <p className="text-gray-600 text-lg sm:text-xl max-w-2xl mx-auto">
          Discover delicious dishes from your favorite local restaurants and enjoy
          the best culinary experiences.
        </p>
      </div>

      {/* Food Cards */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
        {reviews.map((review) => {
          const {
            _id,
            foodName,
            restaurantName,
            restaurantLocation,
            reviewerName,
            rating,
            photo,
          } = review;

          const isFavorite = favorites.includes(_id);

          return (
            <div
              key={_id}
              className="relative bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >
              {/* Favorite Heart Button */}
              <button
                onClick={() => toggleFavorite(_id)}
                className={`absolute -top-3 right-3 z-20 text-3xl p-2 rounded-full shadow-lg bg-white hover:scale-125 transition-all duration-300 ${
                  isFavorite ? "text-red-500" : "text-gray-400"
                }`}
              >
                ♥
              </button>

              {/* Food Image */}
              <figure className="h-56 sm:h-64 overflow-hidden">
                <img
                  src={photo}
                  alt={foodName}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </figure>

              {/* Card Body */}
              <div className="p-5">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
                  {foodName}
                </h2>
                <p className="text-gray-600 mt-1 text-sm sm:text-base">
                  {restaurantName} — {restaurantLocation}
                </p>

                <div className="flex items-center justify-between mt-3">
                  <span className="font-medium text-sm sm:text-base">
                    {reviewerName}
                  </span>
                  <span className="px-3 py-1 bg-yellow-400 text-gray-900 rounded-full text-sm font-semibold shadow-sm">
                    ★ {rating}
                  </span>
                </div>

                <div className="mt-4 text-center">
                  <Link
                    to={`/ProductDetails/${_id}`}
                    className="btn btn-outline btn-primary w-1/2 sm:w-5/12 mx-auto"
                  >
                    Food Details
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllFood;
