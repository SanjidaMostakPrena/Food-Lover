import React, { useState } from 'react';

const LocalFoodTips = () => {
  const [expandedId, setExpandedId] = useState(null);

  const tips = [
    {
      id: 1,
      title: "Discover Traditional Bangladeshi Snacks",
      image: "https://i.ibb.co/8nD9gsXL/top-view-tasty-cone-shape-fried-corn-snacks-bucket-sack-cloth-with-pine-nuts-wooden-bowl-with-shelle.jpg",
      description: "From fuchka to chotpoti, explore popular local snacks that everyone loves!",
      details: "Fuchka, chotpoti, jhalmuri and more. These snacks are popular in local markets and street food corners. Try them with friends and enjoy authentic flavors!"
    },
    {
      id: 2,
      title: "Must-Try Regional Dishes",
      image: "https://i.ibb.co/1JTd4jvW/top-view-indian-food-condiments.jpg",
      description: "Every region has its own unique flavors. Learn about traditional dishes across Bangladesh.",
      details: "Regional dishes like Bhuna Khichuri, Panta Ilish, and Shutki Bhuna are rich in flavor and culture. Exploring these dishes gives you a taste of Bangladesh’s diverse culinary heritage."
    },
  ];

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section className="py-16 bg-[#f8f9fa]">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl font-bold mb-10 text-center text-gray-800">
          Local Food Tips & Culture
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {tips.map((tip) => (
            <div
              key={tip.id}
              className="relative group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300"
            >
              <div className="overflow-hidden">
                <img
                  src={tip.image}
                  alt={tip.title}
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">{tip.title}</h3>
                <p className="text-gray-600 mt-2">{tip.description}</p>

                {expandedId === tip.id && (
                  <p className="text-gray-700 mt-2">{tip.details}</p>
                )}

                <button
                  onClick={() => toggleExpand(tip.id)}
                  className="mt-4 inline-block px-4 py-2 border border-primary text-primary rounded-full text-sm font-medium hover:bg-primary hover:text-white transition-colors duration-300"
                >
                  {expandedId === tip.id ? "Show Less" : "Read More"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LocalFoodTips;
