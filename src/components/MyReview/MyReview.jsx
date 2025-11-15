import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthContext } from "../../contexts/AuthContext";

const MyReview = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal
  const [showModal, setShowModal] = useState(false);
  const [selectedReviewId, setSelectedReviewId] = useState(null);

  const API_URL = "https://food-server-green.vercel.app/addreview";

  useEffect(() => {
    document.title = "My Reviews";
  }, []);

  useEffect(() => {
    if (!user?.email) return;
    axios
      .get(`${API_URL}?email=${user.email}`)
      .then((res) => setReviews(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [user]);

  const handleDelete = (id) => {
    axios
      .delete(`${API_URL}/${id}`)
      .then((res) => {
        if (res.data.success) {
          toast.success("Review deleted successfully");
          setReviews(reviews.filter((rev) => rev._id !== id));
        } else {
          toast.error("Failed to delete review");
        }
      })
      .catch(() => toast.error("Failed to delete review"))
      .finally(() => {
        setShowModal(false);
        setSelectedReviewId(null);
      });
  };

  const handleEdit = (id) => {
    navigate(`/editreview/${id}`);
  };

  const openModal = (id) => {
    setSelectedReviewId(id);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedReviewId(null);
  };

  if (loading)
    return <p className="text-center mt-10 text-gray-600">Loading reviews...</p>;

  return (
    <div className="max-w-6xl mx-auto p-2 sm:p-6">
      {/* Title */}
      <h2 className="text-xl sm:text-3xl font-bold text-center mb-3 sm:mb-6 text-gray-900">
        My Reviews: <span className="text-purple-600">{reviews.length}</span>
      </h2>

      {/* No reviews */}
      {reviews.length === 0 ? (
        <p className="text-center text-gray-500 text-xs sm:text-sm">
          You have not posted any reviews yet.
        </p>
      ) : (
        <div className="overflow-x-auto shadow-lg rounded-xl border border-gray-200 bg-white">
          <table className="min-w-full text-left text-[9px] sm:text-sm">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="py-1 px-1 sm:py-2 sm:px-3 border-b font-semibold">#</th>
                <th className="py-1 px-1 sm:py-2 sm:px-3 border-b font-semibold">Img</th>
                <th className="py-1 px-1 sm:py-2 sm:px-3 border-b font-semibold">Food</th>
                <th className="py-1 px-1 sm:py-2 sm:px-3 border-b font-semibold">Rest.</th>
                <th className="py-1 px-1 sm:py-2 sm:px-3 border-b font-semibold">Date</th>
                <th className="py-1 px-1 sm:py-2 sm:px-3 border-b font-semibold text-center">Act</th>
              </tr>
            </thead>

            <tbody>
              {reviews.map((review, index) => (
                <tr key={review._id} className="hover:bg-gray-50 transition border-b text-[9px] sm:text-sm">
                  <td className="py-1 px-1 sm:py-2 sm:px-3">{index + 1}</td>

                  <td className="py-1 px-1 sm:py-2 sm:px-3">
                    {review.foodImage ? (
                      <img
                        src={review.foodImage}
                        alt={review.foodName}
                        className="w-8 h-8 sm:w-12 sm:h-12 object-cover rounded-md border"
                      />
                    ) : (
                      <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gray-200 rounded-md" />
                    )}
                  </td>

                  <td className="py-1 px-1 sm:py-2 sm:px-3 font-medium text-gray-800">{review.foodName}</td>
                  <td className="py-1 px-1 sm:py-2 sm:px-3 text-gray-700">{review.restaurantName}</td>
                  <td className="py-1 px-1 sm:py-2 sm:px-3">
                    {review.createdAt ? new Date(review.createdAt).toLocaleDateString() : "N/A"}
                  </td>

                  <td className="py-1 px-1 sm:py-2 sm:px-3 text-center">
                    <div className="flex justify-center gap-1">
                      <button
                        onClick={() => handleEdit(review._id)}
                        className="px-1 py-0.5 border bg-orange-800 text-white hover:bg-orange-600 rounded-md text-[8px] sm:text-sm"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => openModal(review._id)}
                        className="px-1 py-0.5 border bg-primary text-white rounded-md text-[8px] sm:text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Delete Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-2 sm:p-6 rounded-lg shadow-xl w-56 sm:w-80">
            <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-4">Confirm Delete</h3>
            <p className="text-gray-700 mb-3 sm:mb-6 text-xs sm:text-sm">
              Are you sure you want to delete this review?
            </p>

            <div className="flex justify-end gap-1 sm:gap-3">
              <button
                onClick={closeModal}
                className="px-2 py-1 sm:px-4 sm:py-2 rounded bg-gray-400 text-white hover:bg-gray-500 text-[9px] sm:text-sm"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(selectedReviewId)}
                className="px-2 py-1 sm:px-4 sm:py-2 rounded bg-primary text-white text-[9px] sm:text-sm"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyReview;
