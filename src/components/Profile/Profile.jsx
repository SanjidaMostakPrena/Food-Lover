
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const { user, updateUserProfile } = useContext(AuthContext);
  const [editable, setEditable] = useState(false);
  const [formData, setFormData] = useState({
    displayName: "",
    email: "",
    photoURL: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;

      // Default fallback for demo users
      const demoDefaults = {
        "user9@gmail.com": {
          displayName: "User",
          photoURL: "https://i.ibb.co.com/nMr0J1cp/ohi.jpg"
        },
        "admin9@gmail.com": {
          displayName: "Admin",
          photoURL: "https://i.ibb.co.com/nMmr1kdJ/87eb01d7c7761237f06cbcdbbdc10d89.jpg"
        }
      };

      
      let name = user.displayName;
      let photo = user.photoURL;

      if (!name || !photo) {
        const defaultProfile = demoDefaults[user.email];
        if (defaultProfile) {
          name = defaultProfile.displayName;
          photo = defaultProfile.photoURL;
        }
      }

      setFormData({
        displayName: name || "",
        email: user.email || "",
        photoURL: photo || "",
      });
    };

    fetchProfile();
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
    <div className="min-h-screen bg-base-100 text-base-content px-4 md:px-16 py-12">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto bg-base-100 border border-base-300 rounded-2xl shadow-xl p-8"
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
          <img
            src={formData.photoURL || "/default-avatar.png"}
            alt="Profile"
            className="w-32 h-32 rounded-full border-2 border-yellow-500 object-cover"
          />

          <div className="flex-1">
            {editable ? (
              <input
                type="text"
                name="displayName"
                value={formData.displayName}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border border-base-300 bg-base-200 text-base-content focus:outline-none"
              />
            ) : (
              <h1 className="text-3xl font-bold text-base-content">
                {formData.displayName || "No Name"}
              </h1>
            )}
            <p className="text-base-content/70">{formData.email}</p>
          </div>

          <button
            onClick={() => {
              if (editable) handleSave();
              else setEditable(true);
            }}
            className="px-5 py-2 rounded-lg font-semibold bg-yellow-500 hover:bg-yellow-600 text-black transition"
          >
            {editable ? "Save" : "Edit"}
          </button>
        </div>

        {/* Profile Form */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 font-semibold text-base-content">
              Full Name
            </label>
            <input
              type="text"
              name="displayName"
              value={formData.displayName}
              onChange={handleChange}
              disabled={!editable}
              className="w-full p-3 rounded-lg border border-base-300 bg-base-200 text-base-content disabled:opacity-70 focus:outline-none"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold text-base-content">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              disabled
              className="w-full p-3 rounded-lg border border-base-300 bg-base-200 text-base-content/60 cursor-not-allowed"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block mb-2 font-semibold text-base-content">
              Profile Picture URL
            </label>
            <input
              type="text"
              name="photoURL"
              value={formData.photoURL}
              onChange={handleChange}
              disabled={!editable}
              className="w-full p-3 rounded-lg border border-base-300 bg-base-200 text-base-content disabled:opacity-70 focus:outline-none"
            />
          </div>
        </div>
      </motion.div>

      {/* Toastify */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Profile;
