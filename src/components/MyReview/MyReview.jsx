
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
    return (
      <p className="text-center mt-10 text-base-content">
        Loading reviews...
      </p>
    );

  return (
    <div className="max-w-6xl mx-auto p-2 sm:p-6 bg-base-100 text-base-content">

      {/* Header */}
      <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-center">
        My Reviews:{" "}
        <span className="text-yellow-500">{reviews.length}</span>
      </h2>

      {reviews.length === 0 ? (
        <p className="text-center opacity-70 text-lg">
          You have not posted any reviews yet.
        </p>
      ) : (
        <div className="overflow-x-auto shadow-lg rounded-xl border border-base-300 bg-base-100">
          <table className="min-w-full text-left text-[9px] sm:text-sm">
            <thead>
              <tr className="bg-base-200">
                <th className="py-2 px-2 font-semibold">No</th>
                <th className="py-2 px-2 font-semibold">Img</th>
                <th className="py-2 px-2 font-semibold">Food</th>
                <th className="py-2 px-2 font-semibold">Rest.</th>
                <th className="py-2 px-2 font-semibold">Date</th>
                <th className="py-2 px-2 font-semibold text-center">Act</th>
              </tr>
            </thead>

            <tbody>
              {reviews.map((review, index) => (
                <tr
                  key={review._id}
                  className="hover:bg-base-200 transition border-b border-base-300"
                >
                  <td className="py-2 px-2">{index + 1}</td>

                  <td className="py-2 px-2">
                    {review.foodImage ? (
                      <img
                        src={review.foodImage}
                        alt={review.foodName}
                        className="w-10 h-10 object-cover rounded-md border border-base-300"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-base-200 rounded-md" />
                    )}
                  </td>

                  <td className="py-2 px-2 font-medium">
                    {review.foodName}
                  </td>
                  <td className="py-2 px-2 opacity-80">
                    {review.restaurantName}
                  </td>
                  <td className="py-2 px-2">
                    {review.createdAt
                      ? new Date(review.createdAt).toLocaleDateString()
                      : "N/A"}
                  </td>

                  <td className="py-2 px-2 text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handleEdit(review._id)}
                        className="px-3 py-1 rounded-md bg-yellow-500 hover:bg-yellow-600 text-black text-xs sm:text-sm font-semibold"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => openModal(review._id)}
                        className="px-3 py-1 rounded-md bg-red-500 hover:bg-red-600 text-white text-xs sm:text-sm font-semibold"
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

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-base-100 text-base-content p-6 rounded-xl shadow-xl w-80">
            <h3 className="text-lg font-semibold mb-3">
              Confirm Delete
            </h3>
            <p className="opacity-80 mb-6 text-sm">
              Are you sure you want to delete this review?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={closeModal}
                className="px-4 py-2 rounded bg-base-300 hover:bg-base-400 text-sm"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(selectedReviewId)}
                className="px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white text-sm"
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
