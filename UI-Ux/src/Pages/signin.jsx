import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../Api/userApi';
import ErrorMessage from '../Components/ErrorMessage';

const SignIn = () => {
  const [emailOrUsername, setEmailOrUsername] = useState(''); // Changed from email
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    setIsLoading(true); // Start loading

    try {
      const response = await loginUser(emailOrUsername, password); // Changed from email
      localStorage.setItem('token', response.data.accessToken);
      navigate('/');
    } catch (err) {
      // Display the error message from the backend
      const backendMessage =
        err.response?.data?.message || // original axios response
        err.data?.message ||           // interceptor attached data
        err.message ||
        'Something went wrong. Please try again.';
      setError(backendMessage);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-black text-white px-4">
      <div className="bg-zinc-900 bg-opacity-80 p-12 md:p-16 rounded-md w-full max-w-[450px] shadow-xl">
        
        {/* Centered Heading */}
        <h1 className="text-3xl font-bold mb-8 text-center text-white">Sign In</h1>
        
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Show error message if exists */}
          <ErrorMessage message={error} />
          
          <input
            type="text" // Changed from email to text
            placeholder="Email or username"
            value={emailOrUsername} // Changed from email
            onChange={(e) => setEmailOrUsername(e.target.value)} // Changed from setEmail
            className="w-full p-4 bg-zinc-800 border border-zinc-700 rounded text-white placeholder-gray-400 focus:outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-4 bg-zinc-800 border border-zinc-700 rounded text-white placeholder-gray-400 focus:outline-none"
          />
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-red-600 hover:bg-red-700 transition-colors py-3 rounded font-semibold ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="flex justify-between items-center text-sm text-gray-400 mt-4">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            Remember me
          </label>
          <a href="#" className="hover:underline">Need help?</a>
        </div>

        {/* Centered "Sign up now" Text */}
        <p className="mt-8 text-sm text-center text-gray-400">
          New to Japanee?{' '}
          <Link to="/signup" className="text-white hover:underline">
            Sign up now
          </Link>
        </p>

        {/* Centered reCAPTCHA Text */}
        <p className="text-xs text-center text-gray-500 mt-4 leading-5">
          This page is protected by Google reCAPTCHA to ensure you're not a bot.
        </p>
      </div>
    </div>
  );
};

export default SignIn;
