import React, { useState } from "react";
import axios from "axios";

const FavoriteButton = ({ reviewId, userEmail, onAdded }) => {
  const handleFavorite = async () => {
    try {
      const res = await axios.post("http://localhost:3000/favorites", { userEmail, reviewId });
      alert(res.data.message || "Added to favorites");
      if (onAdded) onAdded();
    } catch (err) {
      console.error(err);
      alert("Failed to add favorite");
    }
  };

  return <button className="btn btn-sm btn-primary w-1/2 sm:w-5/12" onClick={handleFavorite}>❤️ Favorite</button>;
};

export default FavoriteButton;
