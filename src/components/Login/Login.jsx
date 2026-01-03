// // import React, { useContext, useEffect, useState } from 'react';
// // import { AuthContext } from '../../contexts/AuthContext';
// // import { useNavigate } from 'react-router-dom';

// // import { ToastContainer, toast } from "react-toastify";
// // import "react-toastify/dist/ReactToastify.css";

// // const Login = () => {
// //   useEffect(() => {
// //     document.title = "Login";
// //   }, []);

// //   const { signInUser, signInWithGoogle } = useContext(AuthContext);
// //   const navigate = useNavigate();

// //   const [email, setEmail] = useState('');
// //   const [password, setPassword] = useState('');
// //   const [error, setError] = useState('');
// //   const [loading, setLoading] = useState(false);

// //   const handleLogin = async (e) => {
// //     e.preventDefault();
// //     setError('');
// //     setLoading(true);

// //     try {
// //       const result = await signInUser(email, password);
// //       console.log('User logged in:', result.user);

// //       toast.success("Login successful!", { autoClose: 1500 }); 

// //       setTimeout(() => {
// //         navigate('/');
// //       }, 1500);

// //     } catch (err) {
// //       console.error('Login error:', err);
// //       setError(err.message || 'Login failed. Try again.');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleGoogleSignIn = async () => {
// //     setError('');
// //     setLoading(true);

// //     try {
// //       const result = await signInWithGoogle();
// //       const user = result.user;

// //       const response = await fetch('https://food-server-green.vercel.app/users', {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify({
// //           name: user.displayName,
// //           email: user.email,
// //           image: user.photoURL,
// //         }),
// //       });
// //       await response.json();

// //       toast.success("Google Sign-In successful!", { autoClose: 1500 }); // 🔥 Toastify Added

// //       setTimeout(() => {
// //         navigate('/');
// //       }, 1500);

// //     } catch (err) {
// //       console.error(err);
// //       setError(err.message || 'Google Sign-In failed.');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-yellow-50 via-orange-50 to-pink-50 px-4">

// //       <ToastContainer /> {/* 🔥 REQUIRED */}

// //       <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl overflow-hidden">
// //         <div className="p-8 sm:p-10 md:p-12">
// //           <h1 className="text-4xl md:text-5xl font-extrabold text-center text-gray-800 mb-6">
// //             Welcome Back
// //           </h1>
// //           <p className="text-center text-gray-600 mb-8">
// //             Login to explore the best local foods around you!
// //           </p>

// //           <form onSubmit={handleLogin} className="space-y-4">
// //             <div>
// //               <label className="block text-gray-700 font-semibold mb-2">Email</label>
// //               <input
// //                 type="email"
// //                 className="input input-bordered w-full rounded-xl border-gray-300 focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition"
// //                 placeholder="Enter your email"
// //                 value={email}
// //                 onChange={(e) => setEmail(e.target.value)}
// //                 required
// //               />
// //             </div>

// //             <div>
// //               <label className="block text-gray-700 font-semibold mb-2">Password</label>
// //               <input
// //                 type="password"
// //                 className="input input-bordered w-full rounded-xl border-gray-300 focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition"
// //                 placeholder="Enter your password"
// //                 value={password}
// //                 onChange={(e) => setPassword(e.target.value)}
// //                 required
// //               />
// //             </div>

// //             {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

// //             <button
// //               type="submit"
// //               className="btn btn-primary w-full mt-4 py-3 rounded-xl text-white bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 transition"
// //               disabled={loading}
// //             >
// //               {loading ? 'Logging in...' : 'Login'}
// //             </button>
// //           </form>

// //           <div className="flex items-center my-6">
// //             <hr className="flex-grow border-gray-300" />
// //             <span className="px-4 text-gray-400">OR</span>
// //             <hr className="flex-grow border-gray-300" />
// //           </div>

// //           <button
// //             type="button"
// //             onClick={handleGoogleSignIn}
// //             className="btn w-full flex items-center justify-center py-3 rounded-xl border border-gray-300 hover:bg-gray-50 transition"
// //             disabled={loading}
// //           >
// //             <img src="https://img.icons8.com/color/24/google-logo.png" alt="Google" className="mr-2" />
// //             {loading ? 'Signing in...' : 'Login with Google'}
// //           </button>

// //           <p className="text-center text-gray-600 text-sm mt-6">
// //             Don’t have an account? <a href="/register" className="text-yellow-600 font-semibold hover:underline">Sign Up</a>
// //           </p>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Login;
// import React, { useContext, useEffect, useState } from 'react';
// import { AuthContext } from '../../contexts/AuthContext';
// import { useNavigate } from 'react-router-dom';
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from '../../firebase/firebase.init';

// const Login = () => {
//   useEffect(() => {
//     document.title = "Login";
//   }, []);

//   const { signInUser, signInWithGoogle } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   const demoCredentials = {
//     user: { email: "userdemo@example.com", password: "user1234" },
//     admin: { email: "admindemo@example.com", password: "admin1234" }
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);

//     try {
//       const result = await signInUser(email, password);
//       toast.success("Login successful!", { autoClose: 1500 });
//       setTimeout(() => navigate('/'), 1500);
//     } catch (err) {
//       console.error('Login error:', err);
//       setError(err.message || 'Login failed. Try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleGoogleSignIn = async () => {
//     setError('');
//     setLoading(true);

//     try {
//       const result = await signInWithGoogle();
//       const user = result.user;

//       await fetch('https://food-server-green.vercel.app/users', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           name: user.displayName,
//           email: user.email,
//           image: user.photoURL,
//         }),
//       });

//       toast.success("Google Sign-In successful!", { autoClose: 1500 });
//       setTimeout(() => navigate('/'), 1500);

//     } catch (err) {
//       console.error(err);
//       setError(err.message || 'Google Sign-In failed.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDemoLogin = async (type) => {
//     const { email, password } = demoCredentials[type];

//     try {
//       setLoading(true);
//       setError('');

//       await createUserWithEmailAndPassword(auth, email, password).catch(err => {
//         if(err.code !== "auth/email-already-in-use") throw err;
//       });

//       setEmail(email);
//       setPassword(password);

//       const result = await signInWithEmailAndPassword(auth, email, password);
//       toast.success(`${type.toUpperCase()} auto-login successful!`, { autoClose: 1500 });
//       setTimeout(() => navigate('/'), 1500);

//     } catch (err) {
//       console.error(err);
//       setError(err.message || "Demo login failed!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-white px-4 py-10">
//       <ToastContainer />

//       <div className="max-w-lg w-full bg-white shadow-2xl rounded-3xl overflow-hidden border border-gray-200">
//         <div className="p-8 sm:p-10 md:p-12">

//           <h1 className="text-4xl md:text-5xl font-extrabold text-center text-gray-900 mb-4 animate-fadeIn">Welcome Back</h1>
//           <p className="text-center text-gray-500 mb-6 animate-fadeIn delay-100">Login to explore the best local foods around you!</p>

//           {/* Demo Buttons */}
//           <div className="flex justify-center gap-4 mb-6">
//             <button
//               onClick={() => handleDemoLogin("user")}
//               className="px-5 py-2 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold hover:scale-105 transform transition disabled:opacity-50"
//               disabled={loading}
//             >User</button>
//             <button
//               onClick={() => handleDemoLogin("admin")}
//               className="px-5 py-2 rounded-full bg-gradient-to-r from-pink-500 to-red-500 text-white font-semibold hover:scale-105 transform transition disabled:opacity-50"
//               disabled={loading}
//             >Admin</button>
//           </div>

//           {/* Login Form */}
//           <form onSubmit={handleLogin} className="space-y-4">
//             <div>
//               <label className="block text-gray-700 font-semibold mb-2">Email</label>
//               <input
//                 type="email"
//                 className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition bg-gray-50"
//                 placeholder="Enter your email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-gray-700 font-semibold mb-2">Password</label>
//               <input
//                 type="password"
//                 className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition bg-gray-50"
//                 placeholder="Enter your password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//             </div>

//             {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

//             <button
//               type="submit"
//               className="w-full py-3 rounded-xl bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-bold transition disabled:opacity-50"
//               disabled={loading}
//             >{loading ? 'Logging in...' : 'Login'}</button>
//           </form>

//           {/* OR Separator */}
//           <div className="flex items-center my-6">
//             <hr className="flex-grow border-gray-300" />
//             <span className="px-4 text-gray-400">OR</span>
//             <hr className="flex-grow border-gray-300" />
//           </div>

//           {/* Google Login */}
//           <button
//             type="button"
//             onClick={handleGoogleSignIn}
//             className="w-full flex items-center justify-center py-3 rounded-xl border border-gray-300 hover:bg-gray-50 transition disabled:opacity-50"
//             disabled={loading}
//           >
//             <img src="https://img.icons8.com/color/24/google-logo.png" alt="Google" className="mr-2" />
//             {loading ? 'Signing in...' : 'Login with Google'}
//           </button>

//           <p className="text-center text-gray-500 text-sm mt-6">
//             Don’t have an account? <a href="/register" className="text-yellow-600 font-semibold hover:underline">Sign Up</a>
//           </p>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
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

  // ✅ demo credentials with role
  const demoCredentials = {
    user: { email: "userdemo@example.com", password: "user1234", role: "user" },
    admin: { email: "admindemo@example.com", password: "admin1234", role: "admin" }
  };

  // ❌ unchanged
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
          role: "user" // ✅ ROLE ADDED
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

  // ✅ Demo login → role stored in MongoDB
  const handleDemoLogin = async (type) => {
    const { email, password, role } = demoCredentials[type];

    try {
      setLoading(true);
      setError('');

      await createUserWithEmailAndPassword(auth, email, password).catch(err => {
        if (err.code !== "auth/email-already-in-use") throw err;
      });

      // ✅ save role in mongodb
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

      toast.success(`${type.toUpperCase()} auto-login successful!`, { autoClose: 1500 });
      setTimeout(() => navigate('/'), 1500);

    } catch (err) {
      setError(err.message || "Demo login failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 py-10">
      <ToastContainer />

      <div className="max-w-lg w-full bg-white shadow-2xl rounded-3xl border">
        <div className="p-10">

          <h1 className="text-4xl font-bold text-center mb-6">Welcome Back</h1>

          {/* Demo buttons */}
          <div className="flex gap-4 justify-center mb-6">
            <button onClick={() => handleDemoLogin("user")} disabled={loading}
              className="px-4 py-2 rounded bg-yellow-500 text-white">Demo User</button>

            <button onClick={() => handleDemoLogin("admin")} disabled={loading}
              className="px-4 py-2 rounded bg-red-500 text-white">Demo Admin</button>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <input type="email" value={email} onChange={e => setEmail(e.target.value)}
              placeholder="Email" required className="w-full p-3 border rounded" />

            <input type="password" value={password} onChange={e => setPassword(e.target.value)}
              placeholder="Password" required className="w-full p-3 border rounded" />

            {error && <p className="text-red-500">{error}</p>}

            <button type="submit" disabled={loading}
              className="w-full p-3 bg-yellow-500 text-white rounded">
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="my-6 text-center text-gray-400">OR</div>

          <button onClick={handleGoogleSignIn} disabled={loading}
            className="w-full p-3 border rounded flex justify-center gap-2">
            Login with Google
          </button>

        </div>
      </div>
    </div>
  );
};

export default Login;
