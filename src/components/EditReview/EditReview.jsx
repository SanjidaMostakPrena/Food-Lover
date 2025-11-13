import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditReview = () => {
  useEffect(() => {
    document.title = "Edit Review";
  }, []);

  const { id } = useParams();
  const navigate = useNavigate();
  const [review, setReview] = useState({
    foodName: "",
    foodImage: "",
    restaurantName: "",
    location: "",
    rating: 1,
    reviewText: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:3000/products/${id}`)
      .then((res) => setReview(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:3000/addreview/${id}`, review)
      .then((res) => {
        if (res.data.success) {
          alert("✅ Review updated successfully!");
          navigate("/myReview");
        }
      })
      .catch((err) => {
        console.error(err);
        alert("❌ Failed to update review");
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReview((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 border rounded-2xl shadow-lg bg-white overflow-hidden">

      <div className="h-[600px] overflow-y-auto">


        <div className="text-center mt-4 mb-6 px-6">
          <h1 className="text-3xl font-extrabold text-gray-800">Edit Your Review</h1>
          <p className="text-gray-500 mt-1">Update your thoughts about this delicious food</p>
        </div>
        {review.foodImage && (
          <div className="flex justify-center mb-6 px-6">
            <img
              src={review.foodImage}
              alt={review.foodName}
              className="w-48 h-48 object-cover rounded-xl shadow-md"
            />
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 px-6 pb-6">
          <input
            type="text"
            name="foodName"
            value={review.foodName}
            onChange={handleChange}
            placeholder="Food Name"
            required
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            name="foodImage"
            value={review.foodImage}
            onChange={handleChange}
            placeholder="Food Image URL"
            required
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            name="restaurantName"
            value={review.restaurantName}
            onChange={handleChange}
            placeholder="Restaurant Name"
            required
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            name="location"
            value={review.location}
            onChange={handleChange}
            placeholder="Location"
            required
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="number"
            name="rating"
            value={review.rating}
            onChange={handleChange}
            min="1"
            max="5"
            placeholder="Star Rating (1–5)"
            required
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <textarea
            name="reviewText"
            value={review.reviewText}
            onChange={handleChange}
            placeholder="Write your review..."
            required
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="w-full bg-primary text-white py-3 rounded-lg"
          >
            Update Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditReview;
