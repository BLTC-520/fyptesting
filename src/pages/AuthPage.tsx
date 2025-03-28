import React, { useState } from 'react';
import { Signup } from '../components/Auth/Signup';
import { Login } from '../components/Auth/Login';

const AuthPage = () => {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          {showLogin ? 'Login' : 'Sign Up'}
        </h2>
        {showLogin ? <Login /> : <Signup />}
        <div className="mt-4 text-center">
          <button
            className="text-blue-500 hover:text-blue-700"
            onClick={() => setShowLogin(!showLogin)}
          >
            {showLogin ? 'Need an account? Sign up' : 'Already have an account? Login'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
