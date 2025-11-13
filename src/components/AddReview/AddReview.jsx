import { useContext, useEffect, useState } from "react";
import { AuthContext } from '../../contexts/AuthContext';

const AddReview = () => {
  useEffect(() => {
    document.title = "Add Review";
  }, []);

  const { user } = useContext(AuthContext);


  const [foodImagePreview, setFoodImagePreview] = useState("https://images.unsplash.com/photo-1627308595229-7830a5c91f9f");

  const handleAddReviewSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const foodName = form.foodName.value;
    const foodImage = form.foodImage.value;
    const restaurantName = form.restaurantName.value;
    const location = form.location.value;
    const rating = form.rating.value;
    const reviewText = form.reviewText.value;

    const newReview = {
      foodName,
      foodImage,
      restaurantName,
      location,
      rating,
      reviewText,
      email: user?.email,
      userName: user?.displayName || "Anonymous",
      createdAt: new Date().toISOString(),
    };

    fetch("http://localhost:3000/addreview", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newReview),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("✅ Review added:", data);
        alert("Your review has been added successfully!");
        form.reset();
        setFoodImagePreview("https://images.unsplash.com/photo-1627308595229-7830a5c91f9f");
      })
      .catch((err) => console.error("❌ Error adding review:", err));
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-3xl shadow-lg">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Add Your Food Review</h1>
        <p className="text-gray-500 mt-2">Share your thoughts and experiences about your favorite dishes!</p>
      </div>

  
      <div className="flex justify-center mb-6">
        <img
          src={foodImagePreview}
          alt="Food Preview"
          className="w-full max-w-sm h-64 object-cover rounded-xl shadow-md"
        />
      </div>

      {/* Form */}
      <form onSubmit={handleAddReviewSubmit} className="space-y-4">
        <input
          type="text"
          value={user?.displayName || "Anonymous"}
          readOnly
          className="w-full border p-2 rounded bg-gray-100 text-gray-700"
        />
        <input
          type="email"
          value={user?.email || ""}
          readOnly
          className="w-full border p-2 rounded bg-gray-100 text-gray-700"
        />

        {/* Food Name */}
        <input
          type="text"
          name="foodName"
          placeholder="Food Name"
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="foodImage"
          placeholder="Food Image URL"
          required
          className="w-full border p-2 rounded"
          onChange={(e) => setFoodImagePreview(e.target.value)}
        />

        <input
          type="text"
          name="restaurantName"
          placeholder="Restaurant Name"
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="number"
          name="rating"
          placeholder="Star Rating (1–5)"
          min="1"
          max="5"
          required
          className="w-full border p-2 rounded"
        />
        <textarea
          name="reviewText"
          placeholder="Write your review..."
          required
          className="w-full border p-2 rounded"
        ></textarea>

        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded hover:bg-white transition-colors"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default AddReview;
