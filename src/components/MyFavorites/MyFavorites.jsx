import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";
import toast, { Toaster } from "react-hot-toast";

const MyFavorites = () => {
  useEffect(() => {
    document.title = "MyFavorites";
  }, []);

  const { user } = useContext(AuthContext);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch favorites
  useEffect(() => {
    if (!user?.email) return;

    axios
      .get(`https://food-server-green.vercel.app/favorites?email=${user.email}`)
      .then((res) => setFavorites(res.data))
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load favorites");
      })
      .finally(() => setLoading(false));
  }, [user]);

  // Remove favorite
  const handleRemove = async (id) => {
    const confirmDelete = window.confirm("Remove from favorites?");
    if (!confirmDelete) {
      toast("Canceled removal 👍"); // Added toast for cancel
      return;
    }

    try {
      const res = await axios.delete(`https://food-server-green.vercel.app/favorites/${id}`);
      if (res.status === 200 || res.data?.success) {
        setFavorites((prev) => prev.filter((f) => f._id !== id));
        toast.success("Removed from favorites 💔");
      } else {
        toast.error("Failed to delete from database");
      }
    } catch (error) {
      console.error(error);
      toast.error("Server error — couldn't delete");
    }
  };

  if (loading)
    return <p className="text-center mt-10 text-lg font-medium">Loading favorites...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Toast container */}
      <Toaster position="top-right" reverseOrder={false} />

      <h2 className="text-3xl font-bold mb-6 text-center">My Favorite Foods</h2>

      {favorites.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">No favorites yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {favorites.map((fav) => (
            <div
              key={fav._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 relative overflow-hidden"
            >
              {/* Remove Button */}
              <button
                onClick={() => handleRemove(fav._id)}
                className="absolute top-3 right-3 text-red-500 text-2xl hover:scale-110 transition-transform shadow-md p-1 rounded-full bg-white"
                title="Remove from favorites"
              >
                ✕
              </button>

              {/* Food Image */}
              <img
                src={fav.foodImage}
                alt={fav.foodName}
                className="w-full h-56 sm:h-64 object-cover rounded-t-2xl"
              />

              {/* Content */}
              <div className="p-4">
                <h3 className="text-lg font-semibold">{fav.foodName}</h3>
                <p className="text-gray-600 text-sm">{fav.restaurantName}</p>
                <p className="text-gray-500 text-xs mb-2">{fav.restaurantLocation}</p>
                <span className="badge badge-primary text-sm">{fav.rating} ★</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyFavorites;
