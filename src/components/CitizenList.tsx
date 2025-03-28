import React from 'react';
import type { Citizen } from '../types';

interface CitizenListProps {
  citizens: Citizen[];
  onViewDetails: (citizen: Citizen) => void;
}

export function CitizenList({ citizens, onViewDetails }: CitizenListProps) {
  return (
    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Full Name
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              MyKad Number
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Wallet Address
            </th>
            <th scope="col" className="relative px-6 py-3">
              <span className="sr-only">View</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {citizens.map((citizen) => (
            <tr key={citizen.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{citizen.full_name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{citizen.mykad_number}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{citizen.wallet_address}</td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button onClick={() => onViewDetails(citizen)} className="text-blue-600 hover:text-blue-900">View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
