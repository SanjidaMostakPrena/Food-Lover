import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AllFood = () => {
  const [reviews, setReviews] = useState([]);
  const [query, setQuery] = useState("");
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/products")
      .then(res => {
        setReviews(res.data);
        setFilteredReviews(res.data); 
      })
      .catch(err => console.error(err));
  }, []);

  const handleSearch = () => {
    const filtered = reviews.filter(review =>
      review.foodName.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredReviews(filtered);
  };

  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(favId => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  return (
    <div className="p-4">
      {/* Search Bar */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Search food..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="input input-bordered w-full"
        />
        <button onClick={handleSearch} className="btn btn-primary">
          Search
        </button>
      </div>

      {/* Food Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredReviews.map((review) => (
          <div
            key={review._id}
            className="card bg-base-100 w-full shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300 relative"
          >
            {/* Favorite Button */}
            <button
              onClick={() => toggleFavorite(review._id)}
              className={`absolute top-2 right-2 text-2xl ${
                favorites.includes(review._id) ? "text-red-500" : "text-gray-400"
              }`}
            >
              ♥
            </button>

            {/* Food Image */}
            <figure className="h-48 sm:h-56 md:h-64 overflow-hidden">
              <img
                src={review.photo}
                alt={review.foodName}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </figure>

            {/* Card Body */}
            <div className="card-body p-4">
              <h2 className="card-title text-lg sm:text-xl font-semibold">{review.foodName}</h2>
              <p className="text-gray-600 text-sm sm:text-base">
                {review.restaurantName} — {review.restaurantLocation}
              </p>

              {/* Reviewer and Rating */}
              <div className="flex items-center justify-between mt-2">
                <span className="font-medium text-sm sm:text-base">{review.reviewerName}</span>
                <span className="badge badge-primary text-sm sm:text-base">
                  {review.rating} ★
                </span>
              </div>

              {/* Food Details Button */}
              <div className="card-actions justify-start mt-4">
                <Link
                  to={`/ProductDetails/${review._id}`}
                  className="btn btn-sm btn-outline btn-primary w-1/2 sm:w-5/12"
                >
                  Food Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllFood;
