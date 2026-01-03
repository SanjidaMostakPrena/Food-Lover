import React, { useState } from "react";
import { Link } from "react-router";

// Sample reviews data
const reviews = [
  {
    reviewerName: "Nusrat Jahan",
    reviewerAvatar: "https://i.pravatar.cc/150?img=32",
    rating: 4.8,
    comment: "The Classic Cake was heavenly! Soft, rich, and perfectly sweet. Will order again.",
    date: "2026-01-01",
  },
  {
    reviewerName: "Sadia Rahman",
    reviewerAvatar: "https://i.pravatar.cc/150?img=47",
    rating: 4.7,
    comment: "Mango Dessert was fresh and delightful. Loved the pineapple slices on top!",
    date: "2026-01-02",
  },
  {
    reviewerName: "Tanzim Ahmed",
    reviewerAvatar: "https://i.pravatar.cc/150?img=12",
    rating: 4.6,
    comment: "Orange Cake had a perfect balance of tangy and sweet. Beautifully presented.",
    date: "2026-01-03",
  },
];

// Component for single review card
const ReviewCard = ({ review }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300">
      <div className="flex items-center mb-4">
        <img
          src={review.reviewerAvatar}
          alt={review.reviewerName}
          className="w-12 h-12 rounded-full object-cover mr-4"
        />
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{review.reviewerName}</h3>
          <p className="text-gray-500 text-sm">{review.date}</p>
        </div>
      </div>
      <div className="flex items-center mb-4">
        <span className="text-yellow-400 font-bold mr-2">★ {review.rating}</span>
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={`w-5 h-5 ${
                i < Math.round(review.rating) ? "text-yellow-400" : "text-gray-300"
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.95a1 1 0 00.95.69h4.147c.969 0 1.371 1.24.588 1.81l-3.36 2.442a1 1 0 00-.364 1.118l1.287 3.95c.3.922-.755 1.688-1.54 1.118l-3.36-2.442a1 1 0 00-1.176 0l-3.36 2.442c-.784.57-1.838-.196-1.539-1.118l1.287-3.95a1 1 0 00-.364-1.118L2.042 9.377c-.783-.57-.38-1.81.588-1.81h4.147a1 1 0 00.95-.69l1.286-3.95z" />
            </svg>
          ))}
        </div>
      </div>
      <p className="text-gray-700">{review.comment}</p>
    </div>
  );
};

const orderPage = () => {
  const [sortOption, setSortOption] = useState("newest");

  // Average rating
  const avgRating =
    reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  // Sorted reviews
  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortOption === "highest") return b.rating - a.rating;
    if (sortOption === "lowest") return a.rating - b.rating;
    if (sortOption === "newest") return new Date(b.date) - new Date(a.date);
    return 0;
  });

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      {/* Header */}
      <div className="max-w-5xl mx-auto mb-12 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Customer Reviews</h1>
        <p className="text-gray-600 text-lg">
          See what our food lovers have to say! Fresh, tasty, and made with love 🍰
        </p>
        <div className="mt-6 flex justify-center items-center space-x-4">
          <span className="text-2xl font-bold text-gray-800">{avgRating.toFixed(1)}</span>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-6 h-6 ${
                  i < Math.round(avgRating) ? "text-yellow-400" : "text-gray-300"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.95a1 1 0 00.95.69h4.147c.969 0 1.371 1.24.588 1.81l-3.36 2.442a1 1 0 00-.364 1.118l1.287 3.95c.3.922-.755 1.688-1.54 1.118l-3.36-2.442a1 1 0 00-1.176 0l-3.36 2.442c-.784.57-1.838-.196-1.539-1.118l1.287-3.95a1 1 0 00-.364-1.118L2.042 9.377c-.783-.57-.38-1.81.588-1.81h4.147a1 1 0 00.95-.69l1.286-3.95z" />
              </svg>
            ))}
          </div>
          <span className="text-gray-600 text-sm">({reviews.length} reviews)</span>
        </div>
      </div>

      {/* Sort Options */}
      <div className="max-w-5xl mx-auto mb-8 flex justify-end">
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:border-orange-400"
        >
          <option value="newest">Newest</option>
          <option value="highest">Highest Rating</option>
          <option value="lowest">Lowest Rating</option>
        </select>
      </div>

      {/* Review Cards */}
      <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 mb-12">
        {sortedReviews.map((review, idx) => (
          <ReviewCard key={idx} review={review} />
        ))}
      </div>

      {/* Add Review / CTA Section */}
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl p-8 text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Share Your Experience!</h2>
        <p className="text-gray-600 mb-6">Loved our food? Let others know by adding your review.</p>

<Link to="/AddReview">
  <button className="px-8 py-4 bg-orange-500 text-white font-bold rounded-full shadow-lg hover:bg-orange-600 transition duration-300">
    Add Your Review
  </button>
</Link>

      </div>

      {/* Food Images Carousel (Optional) */}
      <div className="max-w-5xl mx-auto mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Our Popular Dishes</h2>
        <div className="flex gap-4 overflow-x-auto pb-4">
          <img
            src="https://i.ibb.co.com/zHhGTp2k/classic-cake-decorated-with-chocolate-sprinkles-strawberries.jpg"
            alt="Classic Cake"
            className="w-64 h-40 object-cover rounded-xl flex-shrink-0 shadow-md"
          />
          <img
            src="https://i.ibb.co.com/0pgfhfsB/panna-cotta-with-pineapple-slices.jpg"
            alt="Mango Dessert"
            className="w-64 h-40 object-cover rounded-xl flex-shrink-0 shadow-md"
          />
          <img
            src="https://i.ibb.co.com/s4vSvq8/orange-cake-with-dried-apricots-powdered-sugar.jpg"
            alt="Orange Cake"
            className="w-64 h-40 object-cover rounded-xl flex-shrink-0 shadow-md"
          />
          
        </div>
      </div>

      {/* Order Now CTA */}
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Hungry Already?</h2>
        <p className="text-gray-600 mb-6">Order your favorite dishes now and enjoy fresh, hot food at home.</p>
        
      </div>
    </div>
  );
};

export default orderPage;
