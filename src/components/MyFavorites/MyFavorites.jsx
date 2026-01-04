
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyFavorites = () => {
  useEffect(() => {
    document.title = "MyFavorites";
  }, []);

  const { user } = useContext(AuthContext);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    axios
      .get(`https://food-server-green.vercel.app/favorites?email=${user.email}`)
      .then((res) => setFavorites(res.data))
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load favorites", { autoClose: 1200 });
      })
      .finally(() => setLoading(false));
  }, [user]);

  const handleRemove = async (id) => {
    const confirmDelete = window.confirm("Remove from favorites?");
    if (!confirmDelete) {
      toast.info("Canceled removal 👍", { autoClose: 1200 });
      return;
    }

    try {
      const res = await axios.delete(
        `https://food-server-green.vercel.app/favorites/${id}`
      );

      if (res.status === 200 || res.data?.success) {
        setFavorites((prev) => prev.filter((f) => f._id !== id));
        toast.success("Removed from favorites 💔", { autoClose: 1200 });
      } else {
        toast.error("Failed to delete from database", { autoClose: 1200 });
      }
    } catch (error) {
      console.error(error);
      toast.error("Server error — couldn't delete", { autoClose: 1200 });
    }
  };

  if (loading)
    return (
      <p className="text-center mt-10 text-lg font-medium text-base-content">
        Loading favorites...
      </p>
    );

  return (
    <div className="max-w-6xl mx-auto p-6 bg-base-100 text-base-content">

      <ToastContainer position="top-right" />

      <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-center">
        My Favorite Foods
      </h2>

      {favorites.length === 0 ? (
        <p className="text-center text-base-content/70 text-lg">
          No favorites yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {favorites.map((fav) => (
            <div
              key={fav._id}
              className="bg-base-100 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 relative overflow-hidden border border-base-300"
            >
              {/* Remove Button */}
              <button
                onClick={() => handleRemove(fav._id)}
                className="absolute top-3 right-3 text-black bg-yellow-500 hover:bg-yellow-600 text-lg font-bold w-8 h-8 rounded-full flex items-center justify-center shadow-md transition"
                title="Remove from favorites"
              >
                ✕
              </button>

              {/* Image */}
              <img
                src={fav.foodImage}
                alt={fav.foodName}
                className="w-full h-56 sm:h-64 object-cover rounded-t-2xl"
              />

              {/* Content */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-base-content">
                  {fav.foodName}
                </h3>

                <p className="text-base-content/70 text-sm">
                  {fav.restaurantName}
                </p>

                <p className="text-base-content/50 text-xs mb-3">
                  {fav.restaurantLocation}
                </p>

                <span className="inline-block px-3 py-1 rounded-full bg-yellow-500 text-black text-sm font-semibold">
                  {fav.rating} ★
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyFavorites;
