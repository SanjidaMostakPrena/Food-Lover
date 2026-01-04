
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase/firebase.init';

const Login = () => {
  useEffect(() => {
    document.title = "Login";
  }, []);

  const { signInUser, signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // ✅ Demo credentials with role
  const demoCredentials = {
    user: { email: "user9@gmail.com", password: "user1234", role: "user" },
    admin: { email: "admin9@gmail.com", password: "admin1234", role: "admin" }
  };

  // ✅ Default fallback for demo users
 const demoDefaults = {
  "user9@gmail.com": {
    displayName: "User",
    photoURL: "https://i.ibb.co/nMr0J1cp/ohi.jpg"
  },
  "admin9@gmail.com": {
    displayName: "Admin",
    photoURL: "https://i.ibb.co/nMmr1kdJ/87eb01d7c7761237f06cbcdbbdc10d89.jpg"
  }
};


  // ❌ Unchanged regular login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signInUser(email, password);
      toast.success("Login successful!", { autoClose: 1500 });
      setTimeout(() => navigate('/'), 1500);
    } catch (err) {
      setError(err.message || 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  // ✅ Google login → role added (default user)
  const handleGoogleSignIn = async () => {
    setError('');
    setLoading(true);

    try {
      const result = await signInWithGoogle();
      const user = result.user;

      await fetch('https://food-server-green.vercel.app/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: user.displayName,
          email: user.email,
          image: user.photoURL,
          role: "user" 
        }),
      });

      toast.success("Google Sign-In successful!", { autoClose: 1500 });
      setTimeout(() => navigate('/'), 1500);

    } catch (err) {
      setError(err.message || 'Google Sign-In failed.');
    } finally {
      setLoading(false);
    }
  };

  // ✅ Demo login → role stored in MongoDB + profile fallback
  const handleDemoLogin = async (type) => {
    const { email, password, role } = demoCredentials[type];

    try {
      setLoading(true);
      setError('');

      await createUserWithEmailAndPassword(auth, email, password).catch(err => {
        if (err.code !== "auth/email-already-in-use") throw err;
      });

      // ✅ save role in MongoDB
      await fetch('https://food-server-green.vercel.app/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          role,
          name: type.toUpperCase()
        }),
      });

      setEmail(email);
      setPassword(password);

      await signInWithEmailAndPassword(auth, email, password);

      // ✅ Set default profile for demo users
      const defaultProfile = demoDefaults[email];
      if (defaultProfile) {
        signInUser({
          email,
          displayName: defaultProfile.displayName,
          photoURL: defaultProfile.photoURL,
          role
        });
      }

      toast.success(`${type.toUpperCase()} auto-login successful!`, { autoClose: 1500 });
      setTimeout(() => navigate('/'), 1500);

    } catch (err) {
      setError(err.message || "Demo login failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 px-4 py-10 text-black dark:text-white">
      <ToastContainer />

      <div className="max-w-lg w-full bg-white dark:bg-gray-800 shadow-2xl rounded-3xl border dark:border-gray-700">
        <div className="p-10">

          <h1 className="text-4xl font-bold text-center mb-6">Welcome Back</h1>

          {/* Demo buttons */}
          <div className="flex gap-4 justify-center mb-6 flex-wrap">
            <button onClick={() => handleDemoLogin("user")} disabled={loading}
              className="px-4 py-2 rounded bg-green-500 text-black hover:bg-green-600 transition">
               User
            </button>

            <button onClick={() => handleDemoLogin("admin")} disabled={loading}
              className="px-4 py-2 rounded bg-red-500 text-black hover:bg-red-600 transition">
               Admin
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <input type="email" value={email} onChange={e => setEmail(e.target.value)}
              placeholder="Email" required
              className="w-full p-3 border round text-black dark:text-white border-gray-300 dark:border-gray-400 focus:outline-none" />

            <input type="password" value={password} onChange={e => setPassword(e.target.value)}
              placeholder="Password" required
              className="w-full p-3 border rounde text-black dark:text-white border-gray-300 dark:border-gray-400 focus:outline-none" />

            {error && <p className="text-black-500">{error}</p>}

            <button type="submit" disabled={loading}
              className="w-full p-3 bg-yellow-500 text-black rounded hover:bg-yellow-400 transition">
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="my-6 text-center text-gray-500 dark:text-gray-400">OR</div>

           <button onClick={handleGoogleSignIn} disabled={loading}
            className="w-full flex items-center justify-center py-3 rounded-xl bg-yellow-500 text-black dark:text-black hover:bg-yellow-400 transition font-semibold border border-yellow-500 gap-2">
            <img src="https://img.icons8.com/color/24/google-logo.png" alt="Google" className="mr-2" />
            {loading ? "Signing in..." : "Register with Google"}
          </button>

        </div>
      </div>
    </div>
  );
};

export default Login;
