// import React, { useState, useContext } from 'react';
// import axios from 'axios';
// import { AuthContext } from '../../contexts/AuthContext';
// import { toast } from 'react-hot-toast';
// import { useLoaderData } from 'react-router';

// const AddReview = () => {
//   const { user } = useContext(AuthContext); 
//   const [formData, setFormData] = useState({
//     foodName: '',
//     foodImage: '',
//     restaurantName: '',
//     location: '',
//     rating: 0,
//     reviewText: ''
//   });

//   const handleChange = (e) => {
//     setFormData({...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!user?.email) {
//       toast.error('You must be logged in to add a review');
//       return;
//     }

//     const reviewData = {
//       ...formData,
//       email: user.email,
//       createdAt: new Date()
//     };

//     try {
//       await axios.post('http://localhost:3000/products', reviewData);
//       toast.success('Review added successfully!');
//       setFormData({
//         foodName: '',
//         foodImage: '',
//         restaurantName: '',
//         location: '',
//         rating: 0,
//         reviewText: ''
//       });
//     } catch (error) {
//       console.error(error);
//       toast.error('Failed to add review');
//     }
//   };



//   return (
//     <div className="max-w-3xl mx-auto py-10">
//       <h1 className="text-3xl font-bold mb-6">Add a New Review</h1>
//       <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 py-6">
//         <div className="mb-4">
//           <label className="block text-gray-700">Food Name</label>
//           <input
//             type="text"
//             name="foodName"
//             value={formData.foodName}
//             onChange={handleChange}
//             className="w-full border rounded px-3 py-2"
//             required
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700">Food Image URL</label>
//           <input
//             type="text"
//             name="foodImage"
//             value={formData.foodImage}
//             onChange={handleChange}
//             className="w-full border rounded px-3 py-2"
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700">Restaurant Name</label>
//           <input
//             type="text"
//             name="restaurantName"
//             value={formData.restaurantName}
//             onChange={handleChange}
//             className="w-full border rounded px-3 py-2"
//             required
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700">Location</label>
//           <input
//             type="text"
//             name="location"
//             value={formData.location}
//             onChange={handleChange}
//             className="w-full border rounded px-3 py-2"
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700">Rating (1-5)</label>
//           <input
//             type="number"
//             name="rating"
//             value={formData.rating}
//             onChange={handleChange}
//             min="1"
//             max="5"
//             className="w-full border rounded px-3 py-2"
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700">Review Text</label>
//           <textarea
//             name="reviewText"
//             value={formData.reviewText}
//             onChange={handleChange}
//             rows="4"
//             className="w-full border rounded px-3 py-2"
//             required
//           ></textarea>
//         </div>

//         <button
//           type="submit"
//           className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
//         >
//           Add Review
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddReview;



import { useContext, useEffect } from "react";
import { AuthContext } from '../../contexts/AuthContext';

const AddReview = () => {
     useEffect(() => {
    document.title = "AddReview";
  }, []);

  const { user } = useContext(AuthContext);
  

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
      })
      .catch((err) => console.error("❌ Error adding review:", err));
  };
  

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 border rounded-2xl shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">Add a Review</h2>

      <form onSubmit={handleAddReviewSubmit} className="space-y-4">
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
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default AddReview;
