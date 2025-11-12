import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditReview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [review, setReview] = useState({
    foodName: "",
    restaurantName: "",
    comment: "",
    rating: 0,
    photo: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:3000/addreview/${id}`)
      .then((res) => setReview(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleChange = (e) => {
    setReview({ ...review, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:3000/addreview/${id}`, review);
      navigate("/my-reviews");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Review</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Food Name</label>
          <input
            type="text"
            name="foodName"
            value={review.foodName}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Restaurant Name</label>
          <input
            type="text"
            name="restaurantName"
            value={review.restaurantName}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Comment</label>
          <textarea
            name="comment"
            value={review.comment}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          ></textarea>
        </div>
        <div>
          <label className="block mb-1">Rating</label>
          <input
            type="number"
            name="rating"
            value={review.rating}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            min={0}
            max={5}
          />
        </div>
        <div>
          <label className="block mb-1">Food Image URL</label>
          <input
            type="text"
            name="photo"
            value={review.photo}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Update Review
        </button>
      </form>
    </div>
  );
};

export default EditReview;
