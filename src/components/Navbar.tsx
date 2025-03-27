import React from 'react';
import { Building2 } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="bg-blue-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Building2 className="h-8 w-8" />
            <span className="ml-2 text-xl font-semibold">PADU Portal</span>
          </div>
          <div className="flex space-x-4">
            <a href="/" className="hover:bg-blue-800 px-3 py-2 rounded-md">Home</a>
            <a href="/citizens" className="hover:bg-blue-800 px-3 py-2 rounded-md">View Citizens</a>
          </div>
        </div>
      </div>
    </nav>
  );
}