import React from 'react';
import { Link } from 'react-router-dom';

function AuthLayout({ children, type }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-[#e0e7fc] to-[#f3f7fb]">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-800">Welcome to <span className='text-primary'>TaskManager</span></h1>
        <p className="text-gray-600 mt-2">
          {type === 'Login'
            ? "Don't have an account? "
            : "Already have an account? "}
          <Link
            to={type === 'Login' ? "/register" : "/login"}
            className="text-indigo-600 hover:text-indigo-700 font-medium"
          >
            {type === 'Login' ? "Register here" : "Login here"}
          </Link>
        </p>
      </div>
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        {children}
      </div>
    </div>
  );
}

export default AuthLayout;
