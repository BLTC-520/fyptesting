import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { EMPLOYMENT_STATUS, type EmploymentStatus } from '../types';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

interface CitizenFormProps {
  onSubmit: (data: FormData) => Promise<void>;
  isSubmitting: boolean;
}

interface FormData {
  full_name: string;
  mykad_number: string;
  postcode: string;
  phone_number: string;
  email: string;
  address: string;
  employment_status: EmploymentStatus;
  monthly_income: number;
  government_assistance: boolean;
  wallet_address: string;
}

interface ValidationErrors {
  mykad?: string;
  wallet?: string;
}

const initialFormData: FormData = {
  full_name: '',
  mykad_number: '',
  postcode: '',
  phone_number: '',
  email: '',
  address: '',
  employment_status: 'Employed',
  monthly_income: 0,
  government_assistance: false,
  wallet_address: '',
};

export function CitizenForm({ onSubmit, isSubmitting }: CitizenFormProps) {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const [isValidating, setIsValidating] = useState(false);

  const validateField = async (name: string, value: string) => {
    if (!value) return;

    setIsValidating(true);
    try {
      const { data, error } = await supabase
        .from('citizens')
        .select(name)
        .eq(name, value)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 means no rows found
        console.error(`Error checking ${name}:`, error);
        return;
      }

      setValidationErrors(prev => ({
        ...prev,
        [name === 'mykad_number' ? 'mykad' : 'wallet']: data 
          ? `This ${name === 'mykad_number' ? 'MyKad number' : 'wallet address'} is already registered` 
          : undefined
      }));
    } catch (error) {
      console.error(`Error checking ${name}:`, error);
    } finally {
      setIsValidating(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (Object.values(validationErrors).some(error => error)) {
      alert('Please fix the errors in the form before submitting.');
      return;
    }

    await onSubmit(formData);
    setFormData(initialFormData);
    setValidationErrors({});
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));

    // Validate MyKad number and wallet address for duplicates
    if (name === 'mykad_number' && value.length === 12) {
      await validateField('mykad_number', value);
    } else if (name === 'wallet_address' && /^0x[a-fA-F0-9]{40}$/.test(value)) {
      await validateField('wallet_address', value);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold text-gray-900">Citizen Registration</h2>
      
      <div>
        <label htmlFor="full_name" className="block text-sm font-medium text-gray-700">Full Name</label>
        <input
          type="text"
          id="full_name"
          name="full_name"
          required
          value={formData.full_name}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="mykad_number" className="block text-sm font-medium text-gray-700">MyKad Number</label>
        <input
          type="text"
          id="mykad_number"
          name="mykad_number"
          required
          pattern="\d{12}"
          value={formData.mykad_number}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 ${
            validationErrors.mykad 
              ? 'border-red-300 focus:border-red-500' 
              : 'border-gray-300 focus:border-blue-500'
          }`}
        />
        {isValidating && formData.mykad_number.length === 12 && (
          <p className="mt-1 text-sm text-gray-500">Checking MyKad number...</p>
        )}
        {validationErrors.mykad && (
          <p className="mt-1 text-sm text-red-600">{validationErrors.mykad}</p>
        )}
      </div>

      <div>
        <label htmlFor="postcode" className="block text-sm font-medium text-gray-700">Postcode</label>
        <input
          type="text"
          id="postcode"
          name="postcode"
          required
          pattern="\d{5}"
          value={formData.postcode}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700">Phone Number</label>
        <input
          type="tel"
          id="phone_number"
          name="phone_number"
          required
          pattern="^(\+?6?01)[0-46-9]-*[0-9]{7,8}$"
          value={formData.phone_number}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
        <textarea
          id="address"
          name="address"
          required
          value={formData.address}
          onChange={handleChange}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="employment_status" className="block text-sm font-medium text-gray-700">Employment Status</label>
        <select
          id="employment_status"
          name="employment_status"
          required
          value={formData.employment_status}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          {EMPLOYMENT_STATUS.map(status => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="monthly_income" className="block text-sm font-medium text-gray-700">Monthly Income (MYR)</label>
        <input
          type="number"
          id="monthly_income"
          name="monthly_income"
          required
          min="0"
          value={formData.monthly_income}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="flex items-center">
          <input
            type="checkbox"
            name="government_assistance"
            checked={formData.government_assistance}
            onChange={handleChange}
            className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          <span className="ml-2 text-sm text-gray-700">Receiving Government Assistance</span>
        </label>
      </div>

      <div>
        <label htmlFor="wallet_address" className="block text-sm font-medium text-gray-700">ERC-20 Wallet Address</label>
        <input
          type="text"
          id="wallet_address"
          name="wallet_address"
          required
          pattern="^0x[a-fA-F0-9]{40}$"
          value={formData.wallet_address}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 ${
            validationErrors.wallet 
              ? 'border-red-300 focus:border-red-500' 
              : 'border-gray-300 focus:border-blue-500'
          }`}
        />
        {isValidating && /^0x[a-fA-F0-9]{40}$/.test(formData.wallet_address) && (
          <p className="mt-1 text-sm text-gray-500">Checking wallet address...</p>
        )}
        {validationErrors.wallet && (
          <p className="mt-1 text-sm text-red-600">{validationErrors.wallet}</p>
        )}
      </div>

      <div>
        <button
          type="submit"
          disabled={isSubmitting || isValidating || Object.values(validationErrors).some(error => error)}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Registration'}
        </button>
      </div>
    </form>
  );
}