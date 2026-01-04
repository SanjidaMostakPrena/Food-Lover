
import React from 'react';
import { useLoaderData } from 'react-router';

const ProductDetails = () => {
  const product = useLoaderData();
  console.log(product);

  const popularRestaurants = [
    { name: "The Spice Hub", location: "Dhaka" },
    { name: "Foodie Heaven", location: "Chittagong" },
    { name: "Tasty Treats", location: "Khulna" },
  ];

  const relatedDishes = [
    { name: "Chowmein", photo: "https://i.ibb.co.com/602S8BLN/i.jpg" },
    { name: "Lobster Curry", photo: "https://i.ibb.co/N6LKc5yW/lobster-curry.jpg" },
    { name: "Beef Ball", photo: "https://i.ibb.co/RpNcmM0Z/beef-ball.jpg" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">

      <div className="max-w-5xl mx-auto mb-12">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row transform transition-transform hover:scale-105 duration-300">
          
          <div className="md:w-1/2 relative">
            <img
              src={product.photo}
              alt={product.foodName}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 bg-yellow-400 text-white font-bold px-4 py-2 rounded-full shadow-lg">
              ⭐ {product.rating}
            </div>
          </div>

          <div className="md:w-1/2 p-8 flex flex-col justify-between">
            <div>
              <h1 className="text-4xl font-extrabold text-gray-800 mb-4">{product.foodName}</h1>

              <p className="text-gray-600 mb-2">
                <span className="font-semibold">Restaurant:</span> {product.restaurantName}
              </p>
              <p className="text-gray-600 mb-2">
                <span className="font-semibold">Location:</span> {product.restaurantLocation}
              </p>
              <p className="text-gray-600 mb-2">
                <span className="font-semibold">Reviewed by:</span> {product.reviewerName}
              </p>

              {/* NEW: Show Description */}
              <p className="text-gray-700 mb-2">
                <span className="font-semibold">Description:</span> {product.description}
              </p>

              {/* NEW: Show Price */}
              <p className="text-gray-800 font-bold text-xl mt-4">
                Price: ৳ {product.price}
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Popular Restaurants */}
      <div className="max-w-5xl mx-auto mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Popular Restaurants</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {popularRestaurants.map((restaurant, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-gray-800">{restaurant.name}</h3>
              <p className="text-gray-600 mt-2">{restaurant.location}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Related Dishes */}
      <div className="max-w-5xl mx-auto mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">You May Also Like</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {relatedDishes.map((dish, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <img src={dish.photo} alt={dish.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{dish.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default ProductDetails;
