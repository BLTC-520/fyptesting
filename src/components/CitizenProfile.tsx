import React from 'react';
import { ArrowLeft } from 'lucide-react';
import type { Citizen } from '../types';

interface CitizenProfileProps {
  citizen: Citizen;
  onBack: () => void;
}

export function CitizenProfile({ citizen, onBack }: CitizenProfileProps) {
  if (!citizen) return <p>No citizen selected</p>;

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Citizen Profile</h3>
          <button
            onClick={onBack}
            className="flex items-center text-sm text-blue-600 hover:text-blue-900"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to List
          </button>
        </div>
      </div>
      <div className="border-t border-gray-200">
        <dl>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3">
            <dt className="text-sm font-medium text-gray-500">Full Name</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">{citizen.full_name}</dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3">
            <dt className="text-sm font-medium text-gray-500">MyKad Number</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">{citizen.mykad_number}</dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3">
            <dt className="text-sm font-medium text-gray-500">Phone</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">{citizen.phone_number}</dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3">
            <dt className="text-sm font-medium text-gray-500">Wallet</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">{citizen.wallet_address}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
