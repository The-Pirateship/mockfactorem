'use client'

import { useState } from 'react'

export default function ManufacturingCards() {
  const [selectedService, setSelectedService] = useState("CNC Machining")
  
  const services = [
    {
      title: "CNC Machining",
      description: "Ideal for precision machining and high-volume production.",
    },
    {
      title: "Sheet Metal Fabrication", 
      description: "Durable, cost-effective parts for enclosures and brackets.",
    },
    {
      title: "3D Printing",
      description: "For complex and customized parts, suited for rapid prototyping.",
    },
    {
      title: "Others",
      description: "Customized services for specialized or unconventional manufacturing needs.",
    }
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {services.map((service, index) => (
        <div
          key={index}
          className={`p-4 rounded-lg border-2 transition-colors cursor-pointer ${
            selectedService === service.title
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
          }`}
          onClick={() => setSelectedService(service.title)}
        >
          <h3 className="font-semibold text-gray-900 mb-2">{service.title}</h3>
          <p className="text-sm text-gray-600 leading-relaxed">{service.description}</p>
          <div className="mt-3">
            <button 
              className="text-blue-600 text-sm hover:underline"
              onClick={(e) => {
                e.stopPropagation()
                alert(`Learning more about ${service.title}... (This is a demo)`)
              }}
            >
              More →
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}