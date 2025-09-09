'use client'

import { useState } from 'react'
import FileUpload from '@/components/FileUpload'
import ManufacturingCards from '@/components/ManufacturingCards'
import TrustedPartners from '@/components/TrustedPartners'

export default function Home() {
  // State to hold the currently selected manufacturing service.
  // This state is lifted up to the page level to allow communication
  // between ManufacturingCards and FileUpload components.
  const [selectedService, setSelectedService] = useState<string | null>("CNC Machining");

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Panel: Company branding and key features */}
      <div className="lg:w-1/3 bg-blue-600 text-white p-6 lg:p-8 flex flex-col">
        <div className="mb-8">
          <a href="https://www.factorem.co/" target="_blank" rel="noopener noreferrer" className="flex items-center mb-4">
            <div className="w-8 h-8 bg-white text-blue-600 rounded mr-3 flex items-center justify-center font-bold">
              F
            </div>
            <h1 className="text-xl font-semibold">factorem</h1>
          </a>
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
          <TrustedPartners />
        </div>
      </div>

      {/* Right Panel: Main application area for file upload and service selection */}
      <div className="flex-1 p-6 lg:p-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            AI-powered quoting and supplier matching, in one upload
          </h1>

          {/* Manufacturing service selection cards.
              Passes down the selected service state and its setter. */}
          <ManufacturingCards selectedService={selectedService} setSelectedService={setSelectedService} />

          <div className="mt-12">
            {/* File upload component.
                Receives the currently selected service to tailor its functionality. */}
            <FileUpload selectedService={selectedService} />
          </div>

          <div className="mt-12 text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Get started quickly and see how Factorem works
            </h2>
            <a href="https://app.factorem.co/summary" target="_blank" rel="noopener noreferrer">
              <button 
                className="bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors flex items-center mx-auto"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Use sample parts
              </button>
            </a>
            <p className="text-gray-600 mt-4">
              Already have an account?{' '}
              <a href="https://app.factorem.co/login" target="_blank" rel="noopener noreferrer">
                <button
                  className="text-blue-600 hover:underline"
                >
                  Log in
                </button>
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}