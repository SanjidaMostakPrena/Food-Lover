import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Profile = () => {
  const { user, updateUserProfile } = useContext(AuthContext); 
  const [editable, setEditable] = useState(false);
  const [formData, setFormData] = useState({
    displayName: "",
    email: "",
    photoURL: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        displayName: user.displayName || "",
        email: user.email || "",
        photoURL: user.photoURL || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await updateUserProfile(formData); 
      setEditable(false);
      toast.success("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile.");
    }
  };

  return (
    <div className="min-h-scre text-gray-900 dark:text-gray-100 px-4 md:px-16 py-12">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8"
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
          <img
            src={formData.photoURL || "/default-avatar.png"}
            alt="Profile"
            className="w-32 h-32 rounded-full border-2 border-yellow-400 object-cover"
          />
          <div className="flex-1">
            {editable ? (
              <input
                type="text"
                name="displayName"
                value={formData.displayName}
                onChange={handleChange}
                className="w-full p-2 rounded-lg border border-gray-400 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
            ) : (
              <h1 className="text-3xl font-bold">{formData.displayName || "No Name"}</h1>
            )}
            <p className="text-gray-500 dark:text-gray-400">{formData.email}</p>
          </div>
          <button
            onClick={() => {
              if (editable) handleSave();
              else setEditable(true);
            }}
            className={`ml-auto md:ml-0 px-4 py-2 rounded-lg font-semibold ${
              editable
                ? "bg-primary  text-white"
                : "bg-primary text-white"
            } transition`}
          >
            {editable ? "Save" : "Edit"}
          </button>
        </div>

        {/* Profile Form */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 font-semibold">Full Name</label>
            <input
              type="text"
              name="displayName"
              value={formData.displayName}
              onChange={handleChange}
              disabled={!editable}
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              disabled
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block mb-2 font-semibold">Profile Picture URL</label>
            <input
              type="text"
              name="photoURL"
              value={formData.photoURL}
              onChange={handleChange}
              disabled={!editable}
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none"
            />
          </div>
        </div>
      </motion.div>

      {/* Toastify Container */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </div>
  );
};

export default Profile;
