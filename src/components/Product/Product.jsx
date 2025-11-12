import React from 'react';
import { Link } from 'react-router';

const Product = ({ product }) => {
  const {_id, photo, foodName, restaurantName, restaurantLocation, reviewerName, rating } = product;

  return (
    <div className="card bg-base-100 w-full sm:w-80 md:w-96 shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300 mx-auto">
      <figure className="h-48 sm:h-56 md:h-64 overflow-hidden">
        <img
          src={photo}
          alt={foodName}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </figure>
      <div className="card-body p-4">
        <h2 className="card-title text-lg sm:text-xl font-semibold">{foodName}</h2>
        <p className="text-gray-600 text-sm sm:text-base">{restaurantName} — {restaurantLocation}</p>

        <div className="flex items-center justify-between mt-2">
          <span className="font-medium text-sm sm:text-base">{reviewerName}</span>
          <span className="badge badge-primary text-sm sm:text-base">{rating} ★</span>
        </div>

        <div className="card-actions justify-between mt-4">
          <Link to ={`/ProductDetails/${_id}`}className="btn btn-sm btn-outline btn-primary w-1/2 sm:w-5/12">
            Food Details
          </Link>
          <button className="btn btn-sm btn-primary w-1/2 sm:w-5/12">
            Show All
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
