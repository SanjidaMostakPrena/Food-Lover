import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../contexts/AuthContext';
import { toast } from 'react-hot-toast';

const AddReview = () => {
  const { user } = useContext(AuthContext); 
  const [formData, setFormData] = useState({
    foodName: '',
    foodImage: '',
    restaurantName: '',
    location: '',
    rating: 0,
    reviewText: ''
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user?.email) {
      toast.error('You must be logged in to add a review');
      return;
    }

    const reviewData = {
      ...formData,
      email: user.email,
      createdAt: new Date()
    };

    try {
      await axios.post('http://localhost:3000/products', reviewData);
      toast.success('Review added successfully!');
      setFormData({
        foodName: '',
        foodImage: '',
        restaurantName: '',
        location: '',
        rating: 0,
        reviewText: ''
      });
    } catch (error) {
      console.error(error);
      toast.error('Failed to add review');
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Add a New Review</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 py-6">
        <div className="mb-4">
          <label className="block text-gray-700">Food Name</label>
          <input
            type="text"
            name="foodName"
            value={formData.foodName}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Food Image URL</label>
          <input
            type="text"
            name="foodImage"
            value={formData.foodImage}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Restaurant Name</label>
          <input
            type="text"
            name="restaurantName"
            value={formData.restaurantName}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Rating (1-5)</label>
          <input
            type="number"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            min="1"
            max="5"
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Review Text</label>
          <textarea
            name="reviewText"
            value={formData.reviewText}
            onChange={handleChange}
            rows="4"
            className="w-full border rounded px-3 py-2"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Add Review
        </button>
      </form>
    </div>
  );
};

export default AddReview;
