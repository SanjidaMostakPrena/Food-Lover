import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Register = () => {
  useEffect(() => {
    document.title = "Register";
  }, []);

  const { createUser, signInWithGoogle, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [passwordValid, setPasswordValid] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
  });

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    setPasswordValid({
      length: value.length >= 6,
      uppercase: /[A-Z]/.test(value),
      lowercase: /[a-z]/.test(value),
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (!passwordValid.length || !passwordValid.uppercase || !passwordValid.lowercase) {
      Swal.fire({
        icon: 'error',
        title: 'Weak Password',
        text: 'Password must be at least 6 characters long and include both uppercase and lowercase letters.',
      });
      return;
    }

    if (password !== confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Passwords do not match',
        text: 'Please make sure both passwords are identical.',
      });
      return;
    }

    createUser(email, password)
      .then(result => {
        updateUserProfile({ photoURL })
          .then(() => {
            const newUser = {
              name: result.user.displayName || email.split('@')[0],
              email,
              image: photoURL,
            };
            fetch('http://localhost:3000/users', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(newUser),
            }).then(() => navigate('/'));
          });
      })
      .catch(error => {
        Swal.fire({
          icon: 'error',
          title: 'Registration Failed',
          text: error.message,
        });
      });
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then(result => {
        const newUser = {
          name: result.user.displayName,
          email: result.user.email,
          image: result.user.photoURL,
        };
        fetch('http://localhost:3000/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newUser),
        }).then(() => navigate('/'));
      })
      .catch(error => {
        Swal.fire({
          icon: 'error',
          title: 'Google Sign In Failed',
          text: error.message,
        });
      });
  };

  return (
    <div className="card bg-base-100 w-full mx-auto max-w-sm shadow-2xl mt-20">
      <h1 className="text-4xl font-bold text-center mt-4">Register now!</h1>
      <form onSubmit={handleRegister} className="card-body" autoComplete="off">
        <fieldset className="fieldset">
          {/* Email */}
          <label className="label">Email</label>
          <input
            type="email"
            className="input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />

          {/* Photo URL */}
          <label className="label">Photo URL</label>
          <input
            type="text"
            className="input"
            placeholder="Photo URL"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
            autoComplete="off"
            required
          />

          {/* Password */}
          <label className="label">Password</label>
          <input
            type="password"
            className="input"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            autoComplete="new-password"
            required
          />

          {/* Password validation */}
          <ul className="text-sm mt-1 ml-2">
            <li className={passwordValid.length ? 'text-green-600' : 'text-red-600'}>
              {passwordValid.length ? '✔' : '✖'} At least 6 characters
            </li>
            <li className={passwordValid.uppercase ? 'text-green-600' : 'text-red-600'}>
              {passwordValid.uppercase ? '✔' : '✖'} Contains uppercase letter
            </li>
            <li className={passwordValid.lowercase ? 'text-green-600' : 'text-red-600'}>
              {passwordValid.lowercase ? '✔' : '✖'} Contains lowercase letter
            </li>
          </ul>

          {/* Confirm Password */}
          <label className="label">Confirm Password</label>
          <input
            type="password"
            className="input"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            autoComplete="new-password"
            required
          />

          <div className="mt-2">
            <a className="link link-hover text-sm">Forgot password?</a>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="btn btn-neutral mt-4 w-full"
          >
            Register
          </button>
        </fieldset>

        {/* Google Sign-In */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="btn bg-white text-black border-[#e5e5e5] mt-4 flex items-center justify-center w-full"
        >
          <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="mr-2">
            <g>
              <path d="M0 0H512V512H0z" fill="#fff"></path>
              <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path>
              <path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path>
              <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path>
              <path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path>
            </g>
          </svg>
          Register with Google
        </button>
      </form>
    </div>
  );
};

export default Register;
