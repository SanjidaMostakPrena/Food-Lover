import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const AllReviews = () => {
  const { user } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
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
        const reviewRes = await axios.get(
          "https://food-server-green.vercel.app/addreview"
        );
        const sortedReviews = reviewRes.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setReviews(sortedReviews);
        setFilteredReviews(sortedReviews);

        const productRes = await axios.get(
          "https://food-server-green.vercel.app/products"
        );
        setProducts(productRes.data);
        setFilteredProducts(productRes.data);
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
      .get(`https://food-server-green.vercel.app/favorites?email=${user.email}`)
      .then((res) => setFavorites(res.data.map((fav) => fav.foodId)))
      .catch((err) => console.error(err));
  }, [user]);

  const handleFavorite = async (item) => {
    if (!user?.email) {
      toast.error("Please log in to add favorites!");
      return;
    }

    if (favorites.includes(item._id)) {
      toast("Already in favorites ❤");
      return;
    }

    const favoriteData = {
      userEmail: user.email,
      foodId: item._id,
      foodName: item.foodName || item.foodName,
      foodImage: item.foodImage || item.photo,
      restaurantName: item.restaurantName,
      location: item.location || item.restaurantLocation,
      rating: item.rating,
    };

    try {
      const res = await axios.post(
        "https://food-server-green.vercel.app/favorites",
        favoriteData
      );
      if (res.data.success) {
        toast.success("Added to favorites ❤");
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
    const filteredR = reviews.filter((item) =>
      item.foodName.toLowerCase().includes(query.toLowerCase())
    );
    const filteredP = products.filter((item) =>
      item.foodName.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredReviews(filteredR);
    setFilteredProducts(filteredP);
  };

  if (loading)
    return (
      <p className="text-center mt-4 text-sm font-medium">Loading data...</p>
    );

  return (
    <div className="max-w-7xl mx-auto p-1 sm:p-4">
      <div className="text-center mb-2 sm:mb-6">
        <h1 className="text-xl sm:text-4xl font-bold mb-1 sm:mb-2">All User Reviews & Products</h1>
        <p className="text-gray-700 text-xs sm:text-lg">
          Explore all reviews and products with ratings, images, and comments.
        </p>
      </div>

      <div className="flex mb-2 sm:mb-4 justify-center flex-wrap gap-1 sm:gap-2">
        <input
          type="text"
          placeholder="Search food..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="input input-bordered w-full sm:w-1/3 text-xs sm:text-base py-1 sm:py-2"
        />
        <button onClick={handleSearch} className="btn btn-primary text-xs sm:text-base py-1 sm:py-2">
          Search
        </button>
      </div>

      {/* Reviews Table */}
      {filteredReviews.length > 0 && (
        <div className="shadow-lg rounded-xl border border-gray-200 bg-white overflow-hidden">
          <table className="min-w-full table-auto text-left divide-y divide-gray-200 text-xs sm:text-sm">
            <thead className="bg-yellow-50">
              <tr>
                <th className="px-1 sm:px-2 py-1 sm:py-2">Image</th>
                <th className="px-1 sm:px-2 py-1 sm:py-2">Food</th>
                <th className="px-1 sm:px-2 py-1 sm:py-2">Restaurant</th>
                <th className="px-1 sm:px-2 py-1 sm:py-2">Reviewer</th>
                <th className="px-1 sm:px-2 py-1 sm:py-2 text-center">Rating</th>
                <th className="px-1 sm:px-2 py-1 sm:py-2">Review</th>
                <th className="px-1 sm:px-2 py-1 sm:py-2 text-center">Favorite</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredReviews.map((item) => {
                const { _id, foodName, restaurantName, location, foodImage, reviewText, rating, userName } = item;
                const isFavorite = favorites.includes(_id);

                return (
                  <tr key={_id} className="hover:bg-yellow-50 transition">
                    <td className="px-1 sm:px-2 py-1 sm:py-2">
                      <img
                        src={foodImage}
                        alt={foodName}
                        className="w-6 h-6 sm:w-12 sm:h-12 object-cover rounded-md border"
                      />
                    </td>
                    <td className="px-1 sm:px-2 py-1 sm:py-2 font-semibold break-words">{foodName}</td>
                    <td className="px-1 sm:px-2 py-1 sm:py-2 break-words">{restaurantName} — {location}</td>
                    <td className="px-1 sm:px-2 py-1 sm:py-2 break-words">{userName}</td>
                    <td className="px-1 sm:px-2 py-1 sm:py-2 text-center">
                      <span className="badge badge-primary text-xs sm:text-sm">{rating} ★</span>
                    </td>
                    <td className="px-1 sm:px-2 py-1 sm:py-2 break-words">{reviewText || "—"}</td>
                    <td className="px-1 sm:px-2 py-1 sm:py-2 text-center">
                      <button
                        onClick={() => handleFavorite(item)}
                        className={`text-lg sm:text-xl transition-transform hover:scale-125 ${isFavorite ? "text-red-500" : "text-gray-400"}`}
                      >
                        ♥
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Products Table */}
      {filteredProducts.length > 0 && (
        <div className="mt-2 sm:mt-4 shadow-lg rounded-xl border border-gray-200 bg-white overflow-hidden">
          <table className="min-w-full table-auto text-left divide-y divide-gray-200 text-xs sm:text-sm">
            <thead className="bg-yellow-50">
              <tr>
                <th className="px-1 sm:px-2 py-1 sm:py-2">Img</th>
                <th className="px-1 sm:px-2 py-1 sm:py-2">Food</th>
                <th className="px-1 sm:px-2 py-1 sm:py-2">Restaurant</th>
                <th className="px-1 sm:px-2 py-1 sm:py-2">Reviewer</th>
                <th className="px-1 sm:px-2 py-1 sm:py-2 text-center">Rating</th>
                <th className="px-1 sm:px-2 py-1 sm:py-2 text-center">Details</th>
                <th className="px-1 sm:px-2 py-1 sm:py-2 text-center">Fav</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredProducts.map((item) => {
                const { _id, photo, foodName, restaurantName, restaurantLocation, reviewerName, rating } = item;
                const isFavorite = favorites.includes(_id);

                return (
                  <tr key={_id} className="hover:bg-yellow-50 transition">
                    <td className="px-1 sm:px-2 py-1 sm:py-2">
                      <img
                        src={photo}
                        alt={foodName}
                        className="w-6 h-6 sm:w-12 sm:h-12 object-cover rounded-md border"
                      />
                    </td>
                    <td className="px-1 sm:px-2 py-1 sm:py-2 font-semibold break-words">{foodName}</td>
                    <td className="px-1 sm:px-2 py-1 sm:py-2 break-words">{restaurantName} — {restaurantLocation}</td>
                    <td className="px-1 sm:px-2 py-1 sm:py-2 break-words">{reviewerName}</td>
                    <td className="px-1 sm:px-2 py-1 sm:py-2 text-center">
                      <span className="badge badge-primary text-xs sm:text-sm">{rating} ★</span>
                    </td>
                    <td className="px-1 sm:px-2 py-1 sm:py-2 text-center">
                      <Link
                        to={`/productdetails/${_id}`}
                        className="btn btn-xs sm:btn-sm btn-outline btn-primary"
                      >
                        Details
                      </Link>
                    </td>
                    <td className="px-1 sm:px-2 py-1 sm:py-2 text-center">
                      <button
                        onClick={() => handleFavorite(item)}
                        className={`text-lg sm:text-xl transition-transform hover:scale-125 ${isFavorite ? "text-red-500" : "text-gray-400"}`}
                      >
                        ♥
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllReviews;