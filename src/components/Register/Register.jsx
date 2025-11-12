import React, { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

const Register = () => {
  const { createUser, signInWithGoogle } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleRegister = (e) => {
    e.preventDefault();
    createUser(email, password)
      .then(result => {
        console.log('User registered:', result.user);
      
      })
      .catch(error => console.error(error));
  };

  
  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then(result => {
        console.log('Google user:', result.user);
        const newUser = {
          name: result.user.displayName,
          email: result.user.email,
          image: result.user.photoURL,
        };

        fetch('http://localhost:3000/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newUser),
        })
          .then(res => res.json())
          .then(data => {
            console.log('Data after user save:', data);
          })
          .catch(err => console.error(err));
      })
      .catch(error => console.error(error));
  };

  return (
    <div className="card bg-base-100 w-full mx-auto max-w-sm shadow-2xl mt-20">
      <h1 className="text-5xl font-bold text-center mt-4">Register now!</h1>
      <form onSubmit={handleRegister} className="card-body">
        <fieldset className="fieldset">
          <label className="label">Email</label>
          <input
            type="email"
            className="input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label className="label">Password</label>
          <input
            type="password"
            className="input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>
          <button type="submit" className="btn btn-neutral mt-4">
            Register
          </button>
        </fieldset>

        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="btn bg-white text-black border-[#e5e5e5] mt-4 flex items-center justify-center"
        >
          <svg
            aria-label="Google logo"
            width="16"
            height="16"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="mr-2"
          >
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
