import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';

const Product = ({ product }) => {
  const { _id, photo, foodName, restaurantName, restaurantLocation, reviewerName, rating } = product;
  const { user } = useContext(AuthContext);
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();

  const toggleFavorite = async () => {
    if (!user?.email) {
      toast.error("Please log in to add favorites");
      navigate("/login");
      return;
    }

    if (isFavorite) {
      toast("Already added to favorites!");
      return;
    }

    const favoriteData = {
      userEmail: user.email,
      foodId: _id,
      foodName,
      foodImage: photo,
      restaurantName,
      restaurantLocation,
      rating
    };

    try {
      const res = await axios.post("http://localhost:3000/favorites", favoriteData);
      if (res.data.success) {
        setIsFavorite(true);
        toast.success("Added to favorites ❤️");
      } else {
        toast.error(res.data.message || "Already in favorites");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to add favorite");
    }
  };

  return (
    <div className="card bg-base-100 w-full sm:w-80 md:w-96 shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300 mx-auto relative">
      
      {/* Favorite Button */}
      <button
        onClick={toggleFavorite}
        className={`absolute top-2 right-2 text-2xl transition-transform duration-200 hover:scale-125 ${
          isFavorite ? 'text-red-500' : 'text-gray-400'
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
        <h2 className="card-title text-lg sm:text-xl font-semibold">{foodName}</h2>
        <p className="text-gray-600 text-sm sm:text-base">{restaurantName} — {restaurantLocation}</p>

        <div className="flex items-center justify-between mt-2">
          <span className="font-medium text-sm sm:text-base">{reviewerName}</span>
          <span className="badge badge-primary text-sm sm:text-base">{rating} ★</span>
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
};

export default Product;
