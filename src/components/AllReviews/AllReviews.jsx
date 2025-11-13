import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";
import toast from "react-hot-toast";

const AllReviewsWithFavorites = () => {
     useEffect(() => {
    document.title = "AllRevies";
  }, []);

  const { user } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all reviews
  useEffect(() => {
    axios
      .get("http://localhost:3000/addreview")
      .then((res) => {
        const sorted = res.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setReviews(sorted);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  // Fetch user's favorites
  useEffect(() => {
    if (!user?.email) return;
    axios
      .get(`http://localhost:3000/favorites?email=${user.email}`)
      .then((res) => setFavorites(res.data.map((fav) => fav.foodId)))
      .catch((err) => console.error(err));
  }, [user]);

  const handleFavorite = async (review) => {
    if (!user?.email) {
      toast.error("Please log in to add favorites!");
      return;
    }

    if (favorites.includes(review._id)) {
      toast("Already in favorites ❤️");
      return;
    }

    const favoriteData = {
      userEmail: user.email,
      foodId: review._id,
      foodName: review.foodName,
      foodImage: review.foodImage,
      restaurantName: review.restaurantName,
      location: review.location,
      rating: review.rating,
    };

    try {
      const res = await axios.post("http://localhost:3000/favorites", favoriteData);
      if (res.data.success) {
        toast.success("Added to favorites ❤️");
        setFavorites([...favorites, review._id]);
      } else {
        toast.error(res.data.message || "Failed to add favorite");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error while adding favorite");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading reviews...</p>;

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">All Reviews</h2>

      {reviews.length === 0 ? (
        <p className="text-center text-gray-600">No reviews found.</p>
      ) : (
        <div className="flex flex-col gap-6">
          {reviews.map((review, index) => (
            <div
              key={review._id}
              className="flex items-start gap-4 border-l-4 border-primary pl-4 py-3 relative"
            >
              {/* Step Number */}
              <div className="absolute -left-5 top-2 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                {index + 1}
              </div>

              {/* Food Image */}
              <img
                src={review.foodImage}
                alt={review.foodName}
                className="w-24 h-24 object-cover rounded-lg"
              />

              {/* Review Info */}
              <div className="flex-1 relative">
                <h3 className="text-lg font-semibold">{review.foodName}</h3>
                <p className="text-gray-600">{review.restaurantName} — {review.location}</p>
                <p className="text-gray-500 text-sm">
                  Posted on {new Date(review.createdAt).toLocaleDateString()}
                </p>
                <span className="badge badge-primary mt-1">{review.rating} ★</span>

                {/* Favorite Button */}
                <button
                  onClick={() => handleFavorite(review)}
                  className={`absolute top-0 right-0 text-2xl transition-transform duration-200 hover:scale-125 ${
                    favorites.includes(review._id) ? "text-red-500" : "text-gray-400"
                  }`}
                >
                  ♥
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllReviewsWithFavorites;
