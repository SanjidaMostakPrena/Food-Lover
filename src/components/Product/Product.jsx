
import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';

const Product = ({ product }) => {
  const { _id, photo, foodName, restaurantName, restaurantLocation, reviewerName, rating } = product;
  const { user } = useContext(AuthContext);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

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
      const res = await axios.post("https://food-server-green.vercel.app/favorites", favoriteData);
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

  if (loading) {
    return (
      <div className="flex flex-col gap-4 w-full max-w-sm mx-auto">
        <div className="skeleton h-48 w-full rounded-xl bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
        <div className="skeleton h-4 w-28 rounded bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
        <div className="skeleton h-4 w-full rounded bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
        <div className="skeleton h-4 w-full rounded bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col h-full">
        <figure className="h-48 sm:h-56 md:h-64 overflow-hidden">
          <img
            src={photo}
            alt={foodName}
            className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
          />
        </figure>

        <div className="p-5 flex flex-col flex-1">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-1 truncate">{foodName}</h2>

          <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base mb-3">
            <span className="font-medium">{restaurantName}</span>
            <span className="text-gray-500 dark:text-gray-400"> — {restaurantLocation}</span>
          </p>

          <div className="flex items-center justify-between mt-2">
            <span className="font-semibold text-gray-700 dark:text-gray-200">{reviewerName}</span>
            <span className="px-3 py-1 bg-yellow-500 text-gray-900 rounded-full text-sm sm:text-base font-semibold shadow-sm">
              ★ {rating}
            </span>
          </div>

          <div className="mt-5">
            <Link
              to={`/productDetails/${_id}`}
              className="w-full block text-center bg-yellow-500 text-gray-900 dark:text-gray-900 py-2 sm:py-3 rounded-lg font-medium hover:bg-yellow-600 transition-all duration-200"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
