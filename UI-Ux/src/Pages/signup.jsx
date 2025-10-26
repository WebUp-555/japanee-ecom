import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../api/userApi.js";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser({ username, email, password });
      navigate("/signin");
    } catch (err) {
      setError("Failed to create account");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-black text-white px-4">
      <div className="bg-zinc-900 bg-opacity-80 p-12 md:p-16 rounded-md w-full max-w-[450px] shadow-xl">
        <h1 className="text-3xl font-bold mb-8 text-center">Sign Up</h1>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-4 bg-zinc-800 border border-zinc-700 rounded text-white placeholder-gray-400 focus:outline-none"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-4 bg-zinc-800 border border-zinc-700 rounded text-white placeholder-gray-400 focus:outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-4 bg-zinc-800 border border-zinc-700 rounded text-white placeholder-gray-400 focus:outline-none"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 transition-colors py-3 rounded font-semibold"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-8 text-sm text-center text-gray-400">
          Already have an account?{" "}
          <Link to="/signin" className="text-white hover:underline">
            Sign in
          </Link>
        </p>

        <p className="text-xs text-center text-gray-500 mt-4 leading-5">
          This page is protected by Google reCAPTCHA to ensure you're not a bot.
        </p>
      </div>
    </div>
  );
};

export default SignUp;