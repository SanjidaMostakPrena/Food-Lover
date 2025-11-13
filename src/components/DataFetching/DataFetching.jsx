import React, { useEffect, useState } from "react";
import axios from "axios";

// Spinner Component
const Spinner = () => (
  <div className="flex justify-center items-center h-32">
    <div className="border-8 border-gray-200 border-t-8 border-t-blue-500 rounded-full w-16 h-16 animate-spin"></div>
  </div>
);

// Skeleton Component
const Skeleton = () => (
  <div className="p-4 border mb-2 rounded shadow animate-pulse">
    <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
    <div className="h-4 bg-gray-300 rounded w-full"></div>
  </div>
);

// Main Component
const  DataFetching = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    // Show spinner if loading takes longer than 1s
    const timer = setTimeout(() => setShowSpinner(true), 1000);

    axios
      .get("http://localhost:3000/reviews") // Replace with your backend endpoint
      .then((res) => setReviews(res.data))
      .catch((err) => console.error(err))
      .finally(() => {
        setLoading(false);
        setShowSpinner(false);
        clearTimeout(timer);
      });

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="max-w-xl mx-auto mt-6">
      {loading ? (
        showSpinner ? (
          <Spinner />
        ) : (
          Array(5)
            .fill(0)
            .map((_, idx) => <Skeleton key={idx} />)
        )
      ) : (
        reviews.map((review) => (
          <div
            key={review._id}
            className="p-4 border mb-2 rounded shadow hover:bg-gray-50 transition"
          >
            <h3 className="font-semibold mb-1">{review.foodName}</h3>
            <p className="text-gray-700">{review.comment}</p>
            <p className="text-sm text-gray-500 mt-1">
              Rating: {review.rating} ⭐
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default DataFetching;
