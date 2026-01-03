// src/contexts/AuthProvider.jsx
import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { auth } from '../firebase/firebase.init';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
  updateProfile
} from 'firebase/auth';

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const signOutUser = () => {
    setLoading(true);
    return signOut(auth);
  };
  const updateUserProfile = async ({ displayName, photoURL }) => {
  if (!auth.currentUser) throw new Error("No user logged in");
  await updateProfile(auth.currentUser, { displayName, photoURL });
  // Update local state so UI reflects changes
  setUser({ ...auth.currentUser });
};

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("Auth state changed:", currentUser);
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const authInfo = {
  user,
  loading,
  createUser,
  signInUser,
  signInWithGoogle,
  signOutUser,
  updateUserProfile, // ← add this
};

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
