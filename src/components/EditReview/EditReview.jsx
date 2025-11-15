import React, { useState, useEffect } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";

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
        alert("Review updated successfully!");
        navigate("/myreview"); 
      })
      .catch((err) => console.error("Update error:", err));
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded mt-8">
     
    
      {review.photo && (
        <div className="flex justify-center mb-6">
          <img
            src={"https://i.ibb.co.com/XxPbCDMp/medium-shot-woman-with-tasty-food.jpg"}
            alt="Food Preview"
            className="w-full max-w-sm h-64 object-cover rounded-xl shadow-md"
          />
        </div>
      )}

      <h2 className="text-2xl font-bold mb-4 text-center">Edit Review</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="font-semibold">Your Name</label>
          <input
            type="text"
            name="name"
            value={review.name}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div>
          <label className="font-semibold">Email</label>
          <input
            type="email"
            name="email"
            value={review.email}
            className="input input-bordered w-full"
            readOnly
          />
        </div>

        <div>
          <label className="font-semibold">Restaurant Name</label>
          <input
            type="text"
            name="restaurantName"
            value={review.restaurantName}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div>
          <label className="font-semibold">Review Date</label>
          <input
            type="date"
            name="date"
            value={review.date}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div>
          <label className="font-semibold">Rating (1–5)</label>
          <input
            type="number"
            name="rating"
            value={review.rating}
            onChange={handleChange}
            min="1"
            max="5"
            className="input input-bordered w-full"
            required
          />
        </div>

        <div>
          <label className="font-semibold">Your Message</label>
          <textarea
            name="message"
            value={review.message}
            onChange={handleChange}
            className="textarea textarea-bordered w-full"
            required
          />
        </div>

        <div>
          <label className="font-semibold">Photo URL</label>
          <input
            type="text"
            name="photo"
            value={review.photo}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </div>

        <button className="btn btn-primary w-full">Update Review</button>
      </form>
    </div>
  );
};

export default EditReview;
