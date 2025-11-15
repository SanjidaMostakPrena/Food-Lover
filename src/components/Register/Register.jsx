import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const Register = () => {
  const { createUser, signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setPasswordError("");
    setLoading(true);

    const name = e.target.name.value.trim();
    const email = e.target.email.value.trim();
    const password = e.target.password.value.trim();
    const confirmPassword = e.target.confirmPassword.value.trim();
    const photoURL = e.target.photoURL.value.trim();

    // Password validation
    if (!/[A-Z]/.test(password)) {
      setPasswordError("Password must include at least one uppercase letter.");
      setLoading(false);
      return;
    }
    if (!/[a-z]/.test(password)) {
      setPasswordError("Password must include at least one lowercase letter.");
      setLoading(false);
      return;
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      setPasswordError("Password must include at least one special character.");
      setLoading(false);
      return;
    }
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      setLoading(false);
      return;
    }

    try {
      // 1️⃣ Create user with email/password in Firebase
      const result = await createUser(email, password);

      // 2️⃣ Save user to backend
      const userData = {
        name: name || email.split("@")[0],
        email,
        photoURL: photoURL || "",
      };

      const response = await fetch("https://food-server-green.vercel.app/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to save user");

      toast.success("Registration successful!");
      e.target.reset();
      navigate("/");
    } catch (err) {
      console.error(err);
      setError(err.message || "Registration failed. Try again.");
      toast.error(err.message || "Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    setLoading(true);
    try {
      const result = await signInWithGoogle();

      // Save Google user to backend
      const userData = {
        name: result.user.displayName,
        email: result.user.email,
        photoURL: result.user.photoURL,
      };

      const response = await fetch("https://food-server-green.vercel.app/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to save Google user");

      toast.success("Google Sign-In successful!");
      navigate("/");
    } catch (err) {
      console.error(err);
      setError(err.message || "Google Sign-In failed.");
      toast.error(err.message || "Google Sign-In failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-yellow-50 via-orange-50 to-pink-50 px-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="p-8 sm:p-10 md:p-12">
          <Toaster />
          <h1 className="text-4xl md:text-5xl font-extrabold text-center text-gray-800 mb-6">
            Create Account
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Register now to discover the best local foods!
          </p>

          <form onSubmit={handleRegister} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              required
              className="input input-bordered w-full rounded-xl border-gray-300 focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              className="input input-bordered w-full rounded-xl border-gray-300 focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              className="input input-bordered w-full rounded-xl border-gray-300 focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition"
            />
            {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              required
              className="input input-bordered w-full rounded-xl border-gray-300 focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition"
            />
            <input
              type="text"
              name="photoURL"
              placeholder="Photo URL (optional)"
              className="input input-bordered w-full rounded-xl border-gray-300 focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition"
            />

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              className="btn btn-primary w-full mt-4 py-3 rounded-xl text-white bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 transition"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>

          <div className="flex items-center my-6">
            <hr className="flex-grow border-gray-300" />
            <span className="px-4 text-gray-400">OR</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          <button
            onClick={handleGoogleSignIn}
            className="btn w-full flex items-center justify-center py-3 rounded-xl border border-gray-300 hover:bg-gray-50 transition"
            disabled={loading}
          >
            <img src="https://img.icons8.com/color/24/google-logo.png" alt="Google" className="mr-2" />
            {loading ? "Signing in..." : "Register with Google"}
          </button>

          <p className="text-center text-gray-600 text-sm mt-6">
            Already have an account?{" "}
            <a href="/login" className="text-yellow-600 font-semibold hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
