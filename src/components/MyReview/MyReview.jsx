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
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        My Reviews
      </h2>

      {reviews.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          You have not posted any reviews yet.
        </p>
      ) : (
        <ul className="space-y-4">
          {reviews.map((review) => (
            <li
              key={review._id}
              className="flex flex-col sm:flex-row items-start sm:items-center bg-white border rounded-lg shadow-sm p-4 hover:shadow-md transition"
            >
              {/* Food Image */}
              <img
                src={review.foodImage}
                alt={review.foodName}
                className="w-full sm:w-32 h-24 object-cover rounded-lg mr-4 mb-2 sm:mb-0"
              />

              {/* Review Details */}
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-800">
                  {review.foodName}
                </h3>
                <p className="text-gray-600">{review.restaurantName}</p>
                <p className="text-gray-500 text-sm">{review.location}</p>

                {/* Star Rating */}
                <div className="flex items-center mt-1">
                  {Array.from({ length: 5 }, (_, i) => (
                    <span
                      key={i}
                      className={`text-yellow-500 text-lg ${
                        i < review.rating ? "filled" : "text-gray-300"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                  <span className="text-gray-600 ml-2 text-sm">
                    {review.rating} / 5
                  </span>
                </div>

                {/* Review Text */}
                <p className="text-gray-700 text-sm mt-1">{review.reviewText}</p>
              </div>

              {/* button */}
              <div className="flex flex-col sm:ml-4 mt-2 sm:mt-0 space-y-2">
                <button
                  onClick={() => handleEdit(review._id)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(review._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
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
