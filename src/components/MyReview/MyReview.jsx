import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const MyReview = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "MyReview";
  }, []);

  useEffect(() => {
    if (!user?.email) return;
    axios
      .get(`http://localhost:3000/addreview?email=${user.email}`)
      .then((res) => setReviews(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [user]);

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;
    axios
      .delete(`http://localhost:3000/addreview/${id}`)
      .then(() => {
        toast.success("Review deleted successfully");
        setReviews(reviews.filter((rev) => rev._id !== id));
      })
      .catch(() => toast.error("Failed to delete review"));
  };

  const handleEdit = (id) => {
    navigate(`/editreview/${id}`);
  };

  if (loading)
    return <p className="text-center mt-10 text-gray-600">Loading reviews...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        My Reviews
      </h2>

      {reviews.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          You have not posted any reviews yet.
        </p>
      ) : (
        <ul className="space-y-6">
          {reviews.map((review) => (
            <li
              key={review._id}
              className="bg-white border rounded-lg shadow p-6 hover:shadow-lg transition"
            >
              {/* Food Image */}
              <div className="w-full h-60 mb-4">
                <img
                  src={review.foodImage}
                  alt={review.foodName}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>

              {/* Review Details */}
              <div className="space-y-1 text-gray-700">
                <p>
                  <span className="font-semibold">Food Name:</span> {review.foodName}
                </p>
                <p>
                  <span className="font-semibold">Restaurant:</span> {review.restaurantName}
                </p>
                <p>
                  <span className="font-semibold">Location:</span> {review.location}
                </p>
                <p>
                  <span className="font-semibold">Posted Date:</span>{" "}
                  {new Date(review.createdAt).toLocaleDateString()}
                </p>
                <p className="flex items-center">
                  <span className="font-semibold mr-2">Rating:</span>
                  {Array.from({ length: 5 }, (_, i) => (
                    <span
                      key={i}
                      className={`text-lg ${
                        i < review.rating ? "text-yellow-500" : "text-gray-300"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                  <span className="ml-2 text-gray-600 text-sm">{review.rating} / 5</span>
                </p>
                <p>
                  <span className="font-semibold">Review:</span> {review.reviewText}
                </p>
              </div>

              {/* Buttons */}
              <div className="flex space-x-4 mt-4">
                <button
                  onClick={() => handleEdit(review._id)}
                  className="flex-1 px-4 py-2 bg-primary text-white rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(review._id)}
                  className="flex-1 px-4 py-2 bg-primary text-white rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyReview;
