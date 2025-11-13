import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const AllReviews = () => {
  const { user } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [query, setQuery] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "All Reviews";
  }, []);
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const [productsRes, reviewsRes] = await Promise.all([
          axios.get("http://localhost:3000/products"),
          axios.get("http://localhost:3000/addreview")
        ]);

        const combined = [...productsRes.data, ...reviewsRes.data];

  
        const sorted = combined.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        setReviews(sorted);
        setFilteredReviews(sorted);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  
  useEffect(() => {
    if (!user?.email) return;
    axios
      .get(`http://localhost:3000/favorites?email=${user.email}`)
      .then((res) => setFavorites(res.data.map((fav) => fav.foodId)))
      .catch((err) => console.error(err));
  }, [user]);

  const handleFavorite = async (item) => {
    if (!user?.email) {
      toast.error("Please log in to add favorites!");
      return;
    }

    if (favorites.includes(item._id)) {
      toast("Already in favorites ❤️");
      return;
    }

    const favoriteData = {
      userEmail: user.email,
      foodId: item._id,
      foodName: item.foodName,
      foodImage: item.foodImage || item.photo,
      restaurantName: item.restaurantName,
      location: item.location || item.restaurantLocation,
      rating: item.rating,
    };

    try {
      const res = await axios.post("http://localhost:3000/favorites", favoriteData);
      if (res.data.success) {
        toast.success("Added to favorites ❤️");
        setFavorites([...favorites, item._id]);
      } else {
        toast.error(res.data.message || "Failed to add favorite");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error while adding favorite");
    }
  };

  const handleSearch = () => {
    const filtered = reviews.filter((item) =>
      item.foodName.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredReviews(filtered);
  };

  if (loading)
    return <p className="text-center mt-10 text-lg font-medium">Loading reviews...</p>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-center">All Reviews & Products</h2>

    
      <div className="flex mb-6 justify-center">
        <input
          type="text"
          placeholder="Search food..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="input input-bordered w-2/3 sm:w-1/3 mr-2"
        />
        <button onClick={handleSearch} className="btn btn-primary">
          Search
        </button>
      </div>

      
      {filteredReviews.length === 0 ? (
        <p className="text-center text-gray-600">No items found.</p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredReviews.map((item) => {
            const {
              _id,
              foodName,
              restaurantName,
              location,
              restaurantLocation,
              rating,
              foodImage,
              photo,
            } = item;

            const isFavorite = favorites.includes(_id);

            return (
              <div
                key={_id}
                className="card bg-base-100 shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-shadow relative"
              >
              
                <button
                  onClick={() => handleFavorite(item)}
                  className={`absolute top-2 right-2 text-2xl transition-transform duration-200 hover:scale-125 ${
                    isFavorite ? "text-red-500" : "text-gray-400"
                  }`}
                >
                  ♥
                </button>

                <figure className="h-48 sm:h-56 md:h-64 overflow-hidden">
                  <img
                    src={foodImage || photo}
                    alt={foodName}
                    className="w-full h-full object-cover"
                  />
                </figure>

                <div className="card-body p-4">
                  <h2 className="card-title text-lg sm:text-xl font-semibold">
                    {foodName}
                  </h2>
                  <p className="text-gray-600 text-sm sm:text-base">
                    {restaurantName} — {location || restaurantLocation}
                  </p>

                  <div className="flex items-center justify-between mt-2">
                    <span className="badge badge-primary text-sm sm:text-base">
                      {rating} ★
                    </span>
                  </div>

                  <div className="card-actions justify-center mt-4">
                    <Link
                      to={`/ProductDetails/${_id}`}
                      className="btn btn-sm btn-outline btn-primary w-1/2 sm:w-5/12"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AllReviews;
