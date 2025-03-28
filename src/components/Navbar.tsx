import React from 'react';
import { supabase } from '../supabaseClient';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link
} from 'react-router-dom';

export const Navbar = () => {
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    // Optionally redirect to the auth page
  };

  return (
    <nav className="bg-blue-800 p-4 text-white">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-lg font-semibold">Citizen Management</Link>
        <button onClick={handleSignOut} className="bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded">
          Sign Out
        </button>
      </div>
    </nav>
  );
};
