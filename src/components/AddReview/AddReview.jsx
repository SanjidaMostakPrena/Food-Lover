// import { useContext, useEffect, useState } from "react";
// import { AuthContext } from '../../contexts/AuthContext';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const AddReview = () => {
//   useEffect(() => {
//     document.title = "Add Review";
//   }, []);

//   const { user } = useContext(AuthContext);
//   const [foodImagePreview, setFoodImagePreview] = useState("https://images.unsplash.com/photo-1627308595229-7830a5c91f9f");

//   const handleAddReviewSubmit = (e) => {
//     e.preventDefault();

//     const form = e.target;
//     const foodName = form.foodName.value;
//     const foodImage = form.foodImage.value;
//     const restaurantName = form.restaurantName.value;
//     const location = form.location.value;
//     const rating = form.rating.value;
//     const reviewText = form.reviewText.value;

//     const newReview = {
//       foodName,
//       foodImage,
//       restaurantName,
//       location,
//       rating,
//       reviewText,
//       email: user?.email,
//       userName: user?.displayName || "Anonymous",
//       createdAt: new Date().toISOString(),
//     };

//     fetch("https://food-server-green.vercel.app/addreview", {
//       method: "POST",
//       headers: {
//         "content-type": "application/json",
//       },
//       body: JSON.stringify(newReview),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         console.log("✅ Review added:", data);
//         toast.success("Your review has been added successfully!");
//         form.reset();
//         setFoodImagePreview("https://images.unsplash.com/photo-1627308595229-7830a5c91f9f");
//       })
//       .catch((err) => {
//         console.error("❌ Error adding review:", err);
//         toast.error("Failed to add your review. Please try again.");
//       });
//   };

//   return (
//     <div className="max-w-3xl mx-auto mt-12 p-6 bg-white  text-black rounded-3xl shadow-xl">

//       <ToastContainer
//         position="top-right"
//         autoClose={3000}
//         hideProgressBar={false}
//         closeOnClick
//         pauseOnHover
//         draggable
//       />

//       <div className="text-center mb-6">
//         <h1 className="text-4xl sm:text-5xl font-bold mb-3 text-black text-center justify-center">Add Your Food Review</h1>
//         <p className="text-black mt-2 sm:text-lg">Share your thoughts and experiences about your favorite dishes!</p>
//       </div>


//       <div className="flex justify-center mb-6">
//         <img
//           src={foodImagePreview}
//           alt="Food Preview"
//           className="w-full max-w-sm h-64 sm:h-72 object-cover rounded-xl shadow-lg border"
//         />
//       </div>


//       <form onSubmit={handleAddReviewSubmit} className="space-y-4">
//         <input
//           type="text"
//           value={user?.displayName || "Anonymous"}
//           readOnly
//           className="w-full border p-3 rounded-xl bg-gray-100 text-blackfocus:outline-none focus:ring-2 focus:ring-primary"
//         />
//         <input
//           type="email"
//           value={user?.email || ""}
//           readOnly
//           className="w-full border p-3 rounded-xl bg-gray-100 text-black focus:outline-none focus:ring-2 focus:ring-primary"
//         />
//         <input
//           type="text"
//           name="foodName"
//           placeholder="Food Name"
//           required
//           className="w-full border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
//         />
//         <input
//           type="text"
//           name="foodImage"
//           placeholder="Food Image URL"
//           required
//           className="w-full border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
//           onChange={(e) => setFoodImagePreview(e.target.value)}
//         />
//         <input
//           type="text"
//           name="restaurantName"
//           placeholder="Restaurant Name"
//           required
//           className="w-full border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
//         />
//         <input
//           type="text"
//           name="location"
//           placeholder="Location"
//           required
//           className="w-full border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
//         />
//         <input
//           type="number"
//           name="rating"
//           placeholder="Star Rating (1–5)"
//           min="1"
//           max="5"
//           required
//           className="w-full border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
//         />
//         <textarea
//           name="reviewText"
//           placeholder="Write your review..."
//           required
//           className="w-full border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
//         ></textarea>

//         <button
//           type="submit"
//           className="w-full bg-primary text-white py-3 rounded-xl font-semibold hover:bg-primary/90 transition-colors duration-300 shadow-md hover:shadow-lg"
//         >
//           Submit Review
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddReview;
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddReview = () => {
  useEffect(() => {
    document.title = "Add Review";
  }, []);

  const { user } = useContext(AuthContext);
  const [foodImagePreview, setFoodImagePreview] = useState(
    "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f"
  );

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

    fetch("https://food-server-green.vercel.app/addreview", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newReview),
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success("Your review has been added successfully!");
        form.reset();
        setFoodImagePreview(
          "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f"
        );
      })
      .catch(() => {
        toast.error("Failed to add your review. Please try again.");
      });
  };

  return (
    <div className="max-w-3xl mx-auto mt-12 p-6 bg-base-100 text-base-content rounded-3xl shadow-xl">

      <ToastContainer position="top-right" autoClose={3000} />

      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-4xl sm:text-5xl font-bold mb-3">
          Add Your Food Review
        </h1>
        <p className="opacity-80 sm:text-lg">
          Share your thoughts and experiences about your favorite dishes!
        </p>
      </div>

      {/* Image Preview */}
      <div className="flex justify-center mb-6">
        <img
          src={foodImagePreview}
          alt="Food Preview"
          className="w-full max-w-sm h-64 sm:h-72 object-cover rounded-xl shadow-lg border border-base-300"
        />
      </div>

      {/* Form */}
      <form onSubmit={handleAddReviewSubmit} className="space-y-4">

        <input
          type="text"
          value={user?.displayName || "Anonymous"}
          readOnly
          className="input input-bordered w-full bg-base-200"
        />

        <input
          type="email"
          value={user?.email || ""}
          readOnly
          className="input input-bordered w-full bg-base-200"
        />

        <input
          type="text"
          name="foodName"
          placeholder="Food Name"
          required
          className="input input-bordered w-full"
        />

        <input
          type="text"
          name="foodImage"
          placeholder="Food Image URL"
          required
          className="input input-bordered w-full"
          onChange={(e) => setFoodImagePreview(e.target.value)}
        />

        <input
          type="text"
          name="restaurantName"
          placeholder="Restaurant Name"
          required
          className="input input-bordered w-full"
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          required
          className="input input-bordered w-full"
        />

        <input
          type="number"
          name="rating"
          placeholder="Star Rating (1–5)"
          min="1"
          max="5"
          required
          className="input input-bordered w-full"
        />

        <textarea
          name="reviewText"
          placeholder="Write your review..."
          required
          className="textarea textarea-bordered w-full"
        ></textarea>

        <button
          type="submit"
          className="btn bg-yellow-500 w-full text-lg font-semibold shadow-md"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default AddReview;
