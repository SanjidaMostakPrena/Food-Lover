import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AllFood = () => {
  const [reviews, setReviews] = useState([]);
  const [query, setQuery] = useState("");
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    axios
      .get("http://localhost:3000/products")
      .then((res) => {
        const sorted = res.data.sort(
          (a, b) =>
            b.rating - a.rating || new Date(b.createdAt) - new Date(a.createdAt)
        );
        setReviews(sorted);
        setFilteredReviews(sorted);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);


  const handleSearch = () => {
    const filtered = reviews.filter((review) =>
      review.foodName.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredReviews(filtered);
  };

  if (loading) return <p className="text-center mt-10">Loading reviews...</p>;

  return (
    <div className="p-4 max-w-7xl mx-auto">

      <div className="flex gap-2 mb-6">
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


      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredReviews.map((review) => (
          <div
            key={review._id}
            className="card bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300 relative"
          >

            <figure className="h-48 sm:h-56 md:h-64 overflow-hidden">
              <img
                src={review.photo}
                alt={review.foodName}
                className="w-full h-full object-cover"
              />
            </figure>


            <div className="p-4">
              <h2 className="text-lg sm:text-xl font-semibold">
                {review.foodName}
              </h2>
              <p className="text-gray-600 text-sm sm:text-base">
                {review.restaurantName} — {review.restaurantLocation}
              </p>


              <div className="flex items-center justify-between mt-2">
                <span className="badge badge-primary text-sm sm:text-base">
                  {review.rating} ★
                </span>
              </div>
              <div className="mt-4">
                <Link
                  to={`/ProductDetails/${review._id}`}
                  className="btn btn-sm btn-outline btn-primary w-full"
                >
                  View Details
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
