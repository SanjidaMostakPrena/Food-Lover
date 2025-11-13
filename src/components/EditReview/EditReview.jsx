import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditReview = () => {
     useEffect(() => {
    document.title = "EditReview";
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
    axios.get(`http://localhost:3000/products/${id}`)
      .then(res => setReview(res.data))
      .catch(err => console.error(err));
  }, [id]);

 
  const handleSubmit = (e) => {
    e.preventDefault();

    axios.put(`http://localhost:3000/addreview/${id}`, review)
      .then(res => {
        if (res.data.success) {
          alert("✅ Review updated successfully!");
          navigate("/myReview"); 
        }
      })
      .catch(err => {
        console.error(err);
        alert("❌ Failed to update review");
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReview(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 border rounded-2xl shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">Edit Review</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="foodName"
          value={review.foodName}
          onChange={handleChange}
          placeholder="Food Name"
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="foodImage"
          value={review.foodImage}
          onChange={handleChange}
          placeholder="Food Image URL"
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="restaurantName"
          value={review.restaurantName}
          onChange={handleChange}
          placeholder="Restaurant Name"
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="location"
          value={review.location}
          onChange={handleChange}
          placeholder="Location"
          required
          className="w-full border p-2 rounded"
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
          className="w-full border p-2 rounded"
        />
        <textarea
          name="reviewText"
          value={review.reviewText}
          onChange={handleChange}
          placeholder="Write your review..."
          required
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Update Review
        </button>
      </form>
    </div>
  );
};

export default EditReview;
