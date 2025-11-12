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
  const [deleteId, setDeleteId] = useState(null);
  useEffect(() => {
    if (!user?.email) return;
    axios
      .get(`http://localhost:3000/addreview?email=${user.email}`)
      .then((res) => setReviews(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [user]);

  // Delete review
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

  // Edit review
  const handleEdit = (id) => {
    navigate(`/editreview/${id}`);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-4 justify-center text-center">
      <h2 className="text-2xl font-bold mb-4">My Reviews</h2>
      {reviews.length === 0 ? (
        <p>No reviews found.</p>
      ) : (
        <table className="min-w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Food Image</th>
              <th className="p-2 border">Food Name</th>
              <th className="p-2 border">Restaurant Name</th>
              <th className="p-2 border">Posted Date</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review) => (
              <tr key={review._id} className="text-center border-b">
                <td className="p-2 border">
                  <img src={review.foodImage} alt={review.foodName} className="h-16 mx-auto"/>
                </td>
                <td className="p-2 border">{review.foodName}</td>
                <td className="p-2 border">{review.restaurantName}</td>
                <td className="p-2 border">
                  {new Date(review.createdAt).toLocaleDateString()}
                </td>
                <td className="p-2 border space-x-2">
                  <button
                    onClick={() => handleEdit(review._id)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(review._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyReview;
