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
      .get("http://localhost:3000/products")
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
    return <p className="text-center mt-10 text-lg font-medium">Loading food...</p>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Header with Image and Note */}
      <div className="text-center mb-8">
      
        <h1 className="text-4xl font-bold mb-2">Welcome Food Lovers!</h1>
        <p className="text-gray-700 text-lg">
          Discover delicious dishes from your favorite local restaurants and enjoy the best culinary experiences.
        </p>
      </div>

      {/* Food Cards */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
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
              className="card bg-base-100 shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-shadow relative"
            >
              <button
                onClick={() => toggleFavorite(_id)}
                className={`absolute top-2 right-2 text-2xl transition-transform duration-200 hover:scale-125 ${
                  isFavorite ? "text-red-500" : "text-gray-400"
                }`}
              >
                ♥
              </button>

              {/* Food Image */}
              <figure className="h-48 sm:h-56 md:h-64 overflow-hidden">
                <img
                  src={photo}
                  alt={foodName}
                  className="w-full h-full object-cover"
                />
              </figure>

              {/* Card Body */}
              <div className="card-body p-4">
                <h2 className="card-title text-lg sm:text-xl font-semibold">
                  {foodName}
                </h2>
                <p className="text-gray-600 text-sm sm:text-base">
                  {restaurantName} — {restaurantLocation}
                </p>

                <div className="flex items-center justify-between mt-2">
                  <span className="font-medium text-sm sm:text-base">
                    {reviewerName}
                  </span>
                  <span className="badge badge-primary text-sm sm:text-base">
                    {rating} ★
                  </span>
                </div>

                <div className="card-actions justify-center mt-4 text-center">
                  <Link
                    to={`/ProductDetails/${_id}`}
                    className="btn btn-sm btn-outline btn-primary w-1/2 sm:w-5/12"
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
