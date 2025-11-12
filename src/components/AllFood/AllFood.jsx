import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AllFood = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/products")
      .then(res => setReviews(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
      {reviews.map((review) => (
        <div
          key={review._id}
          className="card bg-base-100 w-full shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300"
        >
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

            {/* Buttons */}
            <div className="card-actions justify-between mt-4">
              <Link
                to={`/ProductDetails/${review._id}`}
                className="btn btn-sm btn-outline btn-primary w-1/2 sm:w-5/12"
              >
                Food Details
              </Link>
              <button className="btn btn-sm btn-primary w-1/2 sm:w-5/12">
                Show All
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllFood;
