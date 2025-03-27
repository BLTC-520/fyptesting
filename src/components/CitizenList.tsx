import React, { useState } from 'react';
import { Search } from 'lucide-react';
import type { Citizen } from '../types';

interface CitizenListProps {
  citizens: Citizen[];
  onViewDetails: (citizen: Citizen) => void;
}

export function CitizenList({ citizens, onViewDetails }: CitizenListProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCitizens = citizens.filter(citizen => 
    citizen.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    citizen.mykad_number.includes(searchTerm)
  );

  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search by name or MyKad number..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Full Name</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">MyKad Number</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone Number</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monthly Income</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Wallet Address</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredCitizens.map((citizen) => (
              <tr key={citizen.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{citizen.full_name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{citizen.mykad_number}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{citizen.phone_number}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">RM {citizen.monthly_income.toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{citizen.wallet_address}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => onViewDetails(citizen)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}