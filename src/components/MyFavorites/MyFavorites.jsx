import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";
import toast from "react-hot-toast";

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
      .get(`http://localhost:3000/favorites?email=${user.email}`)
      .then((res) => setFavorites(res.data))
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load favorites");
      })
      .finally(() => setLoading(false));
  }, [user]);

  const handleRemove = async (id) => {
    const confirmDelete = window.confirm("Remove from favorites?");
    if (!confirmDelete) return;

    try {
      const res = await axios.delete(`http://localhost:3000/favorites/${id}`);
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

  if (loading) return <p className="text-center mt-10">Loading favorites...</p>;

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">My Favorite Foods</h2>

      {favorites.length === 0 ? (
        <p className="text-center text-gray-600">No favorites yet.</p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {favorites.map((fav) => (
            <div
              key={fav._id}
              className="card bg-base-100 shadow-sm hover:shadow-md p-4 rounded-xl relative transition-all duration-200 ease-in-out"
            >
        
              <button
                onClick={() => handleRemove(fav._id)}
                className="absolute top-2 right-2 text-red-500 text-xl hover:scale-110 transition-transform"
                title="Remove from favorites"
              >
                ✕
              </button>

             
              <img
                src={fav.foodImage}
                alt={fav.foodName}
                className="w-full h-48 object-cover rounded-lg"
              />

              <div className="mt-3">
                <h3 className="text-lg font-semibold">{fav.foodName}</h3>
                <p className="text-gray-600 text-sm">{fav.restaurantName}</p>
                <p className="text-gray-500 text-xs">
                  {fav.restaurantLocation}
                </p>
                
                <span className="badge badge-primary mt-2">
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
