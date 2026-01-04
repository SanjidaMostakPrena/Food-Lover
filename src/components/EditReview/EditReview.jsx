
import React, { useState, useEffect } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditReview = () => {
  const loaderData = useLoaderData();
  const navigate = useNavigate();
  const { id } = useParams();

  const [review, setReview] = useState({
    name: "",
    email: "",
    restaurantName: "",
    date: "",
    rating: 1,
    message: "",
    photo: "",
  });

  const API_URL = "https://food-server-green.vercel.app/addreview";

  useEffect(() => {
    if (loaderData) {
      setReview({
        name: loaderData.name || "",
        email: loaderData.email || "",
        restaurantName: loaderData.restaurantName || "",
        date: loaderData.date ? loaderData.date.split("T")[0] : "",
        rating: loaderData.rating || 1,
        message: loaderData.message || "",
        photo: loaderData.photo || "",
      });
    }
  }, [loaderData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReview((prev) => ({
      ...prev,
      [name]: name === "rating" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(review),
    })
      .then((res) => res.json())
      .then(() => {
        toast.success("Review updated successfully!");
        setTimeout(() => {
          navigate("/myreview");
        }, 1200);
      })
      .catch((err) => console.error("Update error:", err));
  };

  return (
    <div className="max-w-xl mx-auto p-6 mt-8 bg-base-100 text-base-content rounded-2xl shadow-xl">

      {/* Preview */}
      {review.photo && (
        <div className="flex justify-center mb-6">
          <img
            src="https://i.ibb.co.com/XxPbCDMp/medium-shot-woman-with-tasty-food.jpg"
            alt="Food Preview"
            className="w-full max-w-sm h-64 object-cover rounded-xl shadow-md border border-base-300"
          />
        </div>
      )}

      <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-center">
        Edit Review
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="font-semibold block mb-1">Your Name</label>
          <input
            type="text"
            name="name"
            value={review.name}
            onChange={handleChange}
            className="input input-bordered w-full bg-base-100 text-base-content"
            required
          />
        </div>

        <div>
          <label className="font-semibold block mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={review.email}
            className="input input-bordered w-full bg-base-200 text-base-content"
            readOnly
          />
        </div>

        <div>
          <label className="font-semibold block mb-1">Restaurant Name</label>
          <input
            type="text"
            name="restaurantName"
            value={review.restaurantName}
            onChange={handleChange}
            className="input input-bordered w-full bg-base-100 text-base-content"
            required
          />
        </div>

        <div>
          <label className="font-semibold block mb-1">Review Date</label>
          <input
            type="date"
            name="date"
            value={review.date}
            onChange={handleChange}
            className="input input-bordered w-full bg-base-100 text-base-content"
            required
          />
        </div>

        <div>
          <label className="font-semibold block mb-1">Rating (1–5)</label>
          <input
            type="number"
            name="rating"
            value={review.rating}
            onChange={handleChange}
            min="1"
            max="5"
            className="input input-bordered w-full bg-base-100 text-base-content"
            required
          />
        </div>

        <div>
          <label className="font-semibold block mb-1">Your Message</label>
          <textarea
            name="message"
            value={review.message}
            onChange={handleChange}
            className="textarea textarea-bordered w-full bg-base-100 text-base-content"
            required
          />
        </div>

        <div>
          <label className="font-semibold block mb-1">Photo URL</label>
          <input
            type="text"
            name="photo"
            value={review.photo}
            onChange={handleChange}
            className="input input-bordered w-full bg-base-100 text-base-content"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-yellow-500 hover:bg-yellow-600 text-black font-semibold transition"
        >
          Update Review
        </button>
      </form>

      <ToastContainer position="top-center" autoClose={1200} />
    </div>
  );
};

export default EditReview;
