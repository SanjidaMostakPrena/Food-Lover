import React from 'react';
import { Link } from 'react-router-dom';

const TopLocalDishes = () => {
  const categories = [
    { name: "Bengali Breakfasts", image: "https://i.ibb.co.com/gbWsh4Q3/v.jpg" },
    { name: "Sweets & Desserts", image: "https://i.ibb.co.com/1GgD2CwX/top-view-yummy-cakes-with-cookies-candies-light-white-background.jpg" },
    { name: "Chinese Food", image: "https://i.ibb.co.com/602S8BLN/i.jpg" },
    { name: "Street Food", image: "https://i.ibb.co.com/rRPKB2zk/delicious-indian-food-top-view.jpg" },
  ];

  return (
    <section className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6 text-center">Popular Food Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((cat, index) => (
            <div
              key={index}
              className="group block bg-gray-100 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition"
            >
              <img 
                src={cat.image} 
                alt={cat.name} 
                className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold">{cat.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopLocalDishes;
