// src/components/Login.jsx
import React from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider, facebookProvider } from "/firebaseConfig";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async (provider) => {
    try {
      await signInWithPopup(auth, provider);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  return (
    <main className="bg-gradient-to-br from-primary via-teal-50 to-secondary flex items-center justify-center min-h-screen font-parkisans">
      <div className="bg-white grid space-y-8 shadow rounded border p-8 w-full max-w-md mx-4">
        <h2 className="text-2xl font-semibold text-darkBlue text-center mb-4">
          Login
        </h2>
        <button
          onClick={() => handleLogin(facebookProvider)}
          className="flex items-center justify-center gap-4 w-full p-4 bg-blue-500 text-white rounded-md shadow-md hover:bg-lightBlue hover:text-darkBlue transition"
        >
          <img src="/facebook.png" alt="Facebook icon" className="w-6" />
          Continue with Facebook
        </button>
        <button
          onClick={() => handleLogin(googleProvider)}
          className="flex items-center justify-center gap-4 w-full p-4 bg-white text-darkBlue border rounded-md shadow-md hover:bg-gray-100 transition"
        >
          <img src="/google.png" alt="Google icon" className="w-6" />
          Continue with Google
        </button>
      </div>
    </main>
  );
};

export default Login;
