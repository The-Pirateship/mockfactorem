'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import FileUpload from '@/components/FileUpload'
import ManufacturingCards from '@/components/ManufacturingCards'
import TrustedPartners from '@/components/TrustedPartners'

type UserRole = 'admin' | 'regular' | 'none';

export default function Home() {
  const [selectedService, setSelectedService] = useState<string | null>("CNC Machining");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userRole, setUserRole] = useState<UserRole>('none');

  useEffect(() => {
    const loggedIn = localStorage.getItem('isAuthenticated') === 'true';
    const email = localStorage.getItem('userEmail') || '';
    setIsLoggedIn(loggedIn);
    setUserEmail(email);

    if (loggedIn) {
      if (email === 'admin@email.com') {
        setUserRole('admin');
      } else {
        setUserRole('regular');
      }
    } else {
      setUserRole('none');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    setIsLoggedIn(false);
    setUserEmail('');
    setUserRole('none');
  };

  return (
    <div className="min-h-screen flex flex-col">
      {userRole === 'admin' && (
        <div className="bg-purple-600 text-white text-center py-2 font-semibold">Admin Mode</div>
      )}
      {userRole === 'regular' && (
        <div className="bg-blue-600 text-white text-center py-2 font-semibold">Logged In</div>
      )}
      <div className="flex flex-col lg:flex-row flex-grow">
        {/* Left Panel */}
        <div className="lg:w-1/3 bg-blue-600 text-white p-6 lg:p-8 flex flex-col">
          <div className="mb-8">
            <div className="flex justify-between items-start">
              <a href="https://www.factorem.co/" target="_blank" rel="noopener noreferrer" className="flex items-center mb-4">
                <div className="w-8 h-8 bg-white text-blue-600 rounded mr-3 flex items-center justify-center font-bold">
                  F
                </div>
                <h1 className="text-xl font-semibold">factorem</h1>
              </a>
              {isLoggedIn && (
                <div className="text-right">
                  <div className="text-sm text-blue-100">Logged in as {userEmail}</div>
                  <button 
                    onClick={handleLogout}
                    className="text-sm text-white hover:underline mt-1"
                  >
                    Log out
                  </button>
                </div>
              )}
            </div>
            {isLoggedIn && (
              <Link href="/my-quotes">
                <span className="text-white hover:underline cursor-pointer">My Quotes</span>
              </Link>
            )}
          </div>

          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-2">
              Empowering Customers Worldwide with Quality & On-Time Deliveries
            </h2>
            <p className="text-blue-100 mb-6">
              Experience seamless sourcing powered by <span className="font-semibold">Instant Pricing</span> and{' '}
              <span className="font-semibold">Design Feedback</span> in one dynamic platform.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>10 Manufacturing Verticals</span>
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>200 Materials</span>
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>30 Surface Finish Options</span>
            </div>
          </div>

          <div className="mt-auto">
            {userRole === 'admin' && (
              <div>
                <TrustedPartners />
                <button className="text-white hover:underline mt-2">Edit Partners</button>
              </div>
            )}
            {userRole === 'regular' && <TrustedPartners />}
          </div>
        </div>

        {/* Right Panel */}
        <div className="flex-1 p-6 lg:p-8 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            {userRole === 'admin' && (
              <div className="text-right mb-4">
                <Link href="/user-submissions">
                  <button className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700">
                    View User Submissions
                  </button>
                </Link>
              </div>
            )}
            <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              AI-powered quoting and supplier matching, in one upload
            </h1>

            <ManufacturingCards selectedService={selectedService} setSelectedService={setSelectedService} userRole={userRole} />

            <div className="mt-12">
              <FileUpload selectedService={selectedService} isLoggedIn={isLoggedIn} />
            </div>

            <div className="mt-12 text-center">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Get started quickly and see how Factorem works
              </h2>
              <button 
                className={`bg-gray-800 text-white px-6 py-3 rounded-lg transition-colors flex items-center mx-auto ${isLoggedIn ? 'hover:bg-gray-700' : 'opacity-50 cursor-not-allowed'}`}
                disabled={!isLoggedIn}
                title={!isLoggedIn ? "Please log in to use sample parts" : ""}
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Use sample parts
              </button>
              {!isLoggedIn && (
                <p className="text-gray-600 mt-4">
                  Already have an account?{' '}
                  <Link href="/login">
                    <span className="text-blue-600 hover:underline cursor-pointer">Log in</span>
                  </Link>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}