import React from 'react';
import type { Citizen } from '../types';

interface CitizenListProps {
  citizens: Citizen[];
  onViewDetails: (citizen: Citizen) => void;
}


export function CitizenList({ citizens, onViewDetails }: CitizenListProps) {
  const downloadCitizenData = () => {
    const dataToExport = citizens.map(citizen => ({
      mykad_number: citizen.mykad_number,
      household_size: citizen.household_size,
      total_household_income: citizen.total_household_income,
      wallet_address: citizen.wallet_address,
      monthly_income: citizen.monthly_income,
      employment_status: citizen.employment_status,
      government_assistance: citizen.government_assistance,
    }));
    
    const jsonString = JSON.stringify(dataToExport, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'citizens.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg relative">
      <div className="flex justify-end mb-4">
          <button onClick={downloadCitizenData} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded absolute top-0 right-0 mt-4 mr-4">Export All</button>
      </div>
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
