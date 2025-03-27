import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Navbar } from './components/Navbar';
import { CitizenForm } from './components/CitizenForm';
import { CitizenList } from './components/CitizenList';
import { CitizenProfile } from './components/CitizenProfile';
import type { Citizen } from './types';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

function App() {
  const [view, setView] = useState<'form' | 'list'>('form');
  const [selectedCitizen, setSelectedCitizen] = useState<Citizen | null>(null);
  const [citizens, setCitizens] = useState<Citizen[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchCitizens();
  }, []);

  const fetchCitizens = async () => {
    try {
      const { data, error } = await supabase
        .from('citizens')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setCitizens(data || []);
    } catch (error) {
      console.error('Error fetching citizens:', error);
      alert('Failed to fetch citizens. Please try again.');
    }
  };

  const handleSubmit = async (formData: any) => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('citizens')
        .insert([formData]);

      if (error) {
        throw error;
      }

      await fetchCitizens();
      alert('Registration successful!');
      setView('list'); // Switch to list view after successful submission
    } catch (error: any) {
      console.error('Error submitting form:', error);
      alert(`Failed to submit form: ${error.message || 'Please try again.'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleViewDetails = (citizen: Citizen) => {
    setSelectedCitizen(citizen);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {!selectedCitizen ? (
          <>
            <div className="px-4 sm:px-0">
              <div className="sm:flex sm:items-center sm:justify-between">
                <h1 className="text-3xl font-bold text-gray-900">
                  {view === 'form' ? 'Citizen Registration' : 'Registered Citizens'}
                </h1>
                <div className="mt-4 sm:mt-0">
                  <button
                    onClick={() => setView(view === 'form' ? 'list' : 'form')}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    {view === 'form' ? 'View Citizens' : 'Register New Citizen'}
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-8">
              {view === 'form' ? (
                <CitizenForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
              ) : (
                <CitizenList
                  citizens={citizens}
                  onViewDetails={handleViewDetails}
                />
              )}
            </div>
          </>
        ) : (
          <CitizenProfile
            citizen={selectedCitizen}
            onBack={() => setSelectedCitizen(null)}
          />
        )}
      </main>
    </div>
  );
}

export default App;