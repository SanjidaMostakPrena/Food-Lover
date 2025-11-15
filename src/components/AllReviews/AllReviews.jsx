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
      toast("Already in favorites ❤️");
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
      <p className="text-center mt-10 text-lg font-medium">Loading data...</p>
    );

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">All User Review & Products</h1>
        <p className="text-gray-700 text-lg">
          Explore all reviews and products with ratings, images, and comments.
        </p>
      </div>

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

      {/* ⭐ Reviews Table */}
      {filteredReviews.length > 0 && (
        <div className="overflow-x-auto mb-12 shadow-lg rounded-xl border border-gray-200 bg-white">
          <table className="min-w-full text-left text-[8px] sm:text-sm">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="py-1 px-1 sm:py-3 sm:px-4 border-b font-semibold">Img</th>
                <th className="py-1 px-1 sm:py-3 sm:px-4 border-b font-semibold">Food</th>
                <th className="py-1 px-1 sm:py-3 sm:px-4 border-b font-semibold">Restaurant</th>
                <th className="py-1 px-1 sm:py-3 sm:px-4 border-b font-semibold">Reviewer</th>
                <th className="py-1 px-1 sm:py-3 sm:px-4 border-b font-semibold">Rating</th>
                <th className="py-1 px-1 sm:py-3 sm:px-4 border-b font-semibold">Review</th>
                <th className="py-1 px-1 sm:py-3 sm:px-4 border-b font-semibold text-center">Fav</th>
              </tr>
            </thead>

            <tbody>
              {filteredReviews.map((item) => {
                const {
                  _id,
                  foodName,
                  restaurantName,
                  location,
                  foodImage,
                  reviewText,
                  rating,
                  userName,
                } = item;

                const isFavorite = favorites.includes(_id);

                return (
                  <tr
                    key={_id}
                    className="hover:bg-gray-50 transition border-b text-[8px] sm:text-sm"
                  >
                    <td className="py-1 px-1 sm:py-3 sm:px-4">
                      <img
                        src={foodImage}
                        alt={foodName}
                        className="w-8 h-8 sm:w-16 sm:h-16 object-cover rounded-md border"
                      />
                    </td>

                    <td className="py-1 px-1 sm:py-3 sm:px-4 font-medium text-gray-800">
                      {foodName}
                    </td>

                    <td className="py-1 px-1 sm:py-3 sm:px-4 text-gray-700 truncate max-w-[70px] sm:max-w-xs">
                      {restaurantName} — {location}
                    </td>

                    <td className="py-1 px-1 sm:py-3 sm:px-4 text-gray-700 truncate max-w-[50px] sm:max-w-xs">
                      {userName}
                    </td>

                    <td className="py-1 px-1 sm:py-3 sm:px-4">
                      <span className="badge badge-primary text-[8px] sm:text-sm">{rating} ★</span>
                    </td>

                    <td className="py-1 px-1 sm:py-3 sm:px-4 text-gray-600 truncate max-w-[80px] sm:max-w-xs">
                      {reviewText ? reviewText : "—"}
                    </td>

                    <td className="py-1 px-1 sm:py-3 sm:px-4 text-center">
                      <button
                        onClick={() => handleFavorite(item)}
                        className={`text-xl sm:text-2xl transition-transform hover:scale-125 ${
                          isFavorite ? "text-red-500" : "text-gray-400"
                        }`}
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

      {/* Products */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">All User Review & Products</h1>
        <p className="text-gray-700 text-lg">
          Explore all reviews and products with ratings, images, and comments.
        </p>
      </div>

      {filteredProducts.length > 0 && (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredProducts.map((item) => {
            const {
              _id,
              photo,
              foodName,
              restaurantName,
              restaurantLocation,
              reviewerName,
              rating,
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
                    isFavorite ? "text-red-500" : "text-white"
                  }`}
                >
                  ♥
                </button>

                <figure className="h-48 sm:h-56 md:h-64 overflow-hidden">
                  <img
                    src={photo}
                    alt={foodName}
                    className="w-full h-full object-cover"
                  />
                </figure>

                <div className="card-body p-4">
                  <h2 className="card-title text-lg sm:text-xl font-semibold">
                    {foodName}
                  </h2>
                  <p className="text-gray-600 text-sm sm:text-base">
                    {restaurantName} — {restaurantLocation}
                  </p>

                  <div className="flex items-center justify-between mt-2">
                    <span className="font-medium text-sm sm:text-base">
                      {reviewerName}
                    </span>
                    <span className="badge badge-primary text-sm sm:text-base">
                      {rating} ★
                    </span>
                  </div>

                  <div className="card-actions justify-center mt-4 text-center">
                    <Link
                      to={`/productdetails/${_id}`}
                      className="btn btn-sm btn-outline btn-primary w-1/2 sm:w-5/12"
                    >
                      Food Details
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
