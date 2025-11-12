import React, { useState } from 'react';

const LocalFoodTips = () => {
  const [expandedId, setExpandedId] = useState(null); /

  const tips = [
    {
      id: 1,
      title: "Discover Traditional Bangladeshi Snacks",
      image: "https://i.ibb.co.com/8nD9gsXL/top-view-tasty-cone-shape-fried-corn-snacks-bucket-sack-cloth-with-pine-nuts-wooden-bowl-with-shelle.jpg",
      description: "From fuchka to chotpoti, explore popular local snacks that everyone loves!",
      details: "Fuchka, chotpoti, jhalmuri and more. These snacks are popular in local markets and street food corners. Try them with friends and enjoy authentic flavors!"
    },
    {
      id: 2,
      title: "Must-Try Regional Dishes",
      image: "https://i.ibb.co.com/1JTd4jvW/top-view-indian-food-condiments.jpg",
      description: "Every region has its own unique flavors. Learn about traditional dishes across Bangladesh.",
      details: "Regional dishes like Bhuna Khichuri, Panta Ilish, and Shutki Bhuna are rich in flavor and culture. Exploring these dishes gives you a taste of Bangladesh’s diverse culinary heritage."
    },
  ];

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id); 
  };

  return (
    <section className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6 text-center">Local Food Tips & Culture</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {tips.map((tip) => (
            <div key={tip.id} className="border rounded-xl overflow-hidden hover:shadow-md transition">
              <img src={tip.image} alt={tip.title} className="w-full h-48 object-cover"/>
              <div className="p-4">
                <h3 className="text-xl font-semibold">{tip.title}</h3>
                <p className="text-gray-600 mt-2">{tip.description}</p>

                {expandedId === tip.id && (
                  <p className="text-gray-700 mt-2">{tip.details}</p>
                )}

                <button
                  onClick={() => toggleExpand(tip.id)}
                  className="mt-3 inline-block btn btn-outline btn-primary btn-sm"
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
