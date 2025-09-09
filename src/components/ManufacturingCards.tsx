'use client'

import { useState } from 'react'

// Type definition for a single manufacturing service.
// The `isOthers` flag is used to identify the special "Others" card slot.
type Service = {
  title: string;
  description: string;
  website: string;
  isOthers?: boolean;
};

// Type definition for the component's props.
// It receives the selected service and a function to update it from the parent component.
type ManufacturingCardsProps = {
  selectedService: string | null;
  setSelectedService: (service: string | null) => void;
};

// Initial list of main manufacturing services.
const initialServices: Service[] = [
  {
    title: "CNC Machining",
    description: "Ideal for precision machining and high-volume production.",
    website: "https://www.factorem.co/capabilities/cnc-machining",
  },
  {
    title: "Sheet Metal Fabrication",
    description: "Durable, cost-effective parts for enclosures and brackets.",
    website: "https://www.factorem.co/capabilities/sheet-metal-fabrication",
  },
  {
    title: "3D Printing",
    description: "For complex and customized parts, suited for rapid prototyping.",
    website: "https://www.factorem.co/capabilities/3d-printing",
  },
  {
    title: "Others",
    description: "Customized services for specialized or unconventional manufacturing needs.",
    website: "https://www.factorem.co/how-it-works",
    isOthers: true, // This marks the special "Others" card.
  },
];

// List of services available in the "Others" dropdown.
const otherServices: Service[] = [
  {
    title: "Design Service",
    description: "For design assistance in creating or refining part designs.",
    website: "https://www.factorem.co/solution",
  },
  {
    title: "Swiss Turning",
    description: "", // No description in the image provided
    website: "https://www.factorem.co/solution",
  },
  {
    title: "Extrusion",
    description: "Ideal for producing strong, lightweight parts with complex or continuous cross-sections—perfect for designs that demand precision, scalability, and structural integrity",
    website: "https://www.factorem.co/solution",
  },
  {
    title: "Engraving",
    description: "To add a personalized touch to your parts for branding and customization.",
    website: "https://www.factorem.co/solution",
  },
];

export default function ManufacturingCards({ selectedService, setSelectedService }: ManufacturingCardsProps) {
  // State to manage the list of services displayed on the cards.
  // This can change when a service from the "Others" dropdown is selected.
  const [services, setServices] = useState<Service[]>(initialServices);
  // State to manage the visibility of the "Others" dropdown.
  const [isOthersDropdownVisible, setOthersDropdownVisible] = useState(false);

  /**
   * Handles the click event for an item in the "Others" dropdown.
   * It replaces the "Others" card with the selected service.
   * @param otherService The service object that was clicked from the dropdown.
   */
  const handleOtherServiceClick = (otherService: Service) => {
    const newServices = [...services];
    const othersIndex = newServices.findIndex((s) => s.isOthers);
    if (othersIndex !== -1) {
      // Replace the "Others" card with the new service, preserving the `isOthers` flag.
      newServices[othersIndex] = { ...otherService, isOthers: true };
      setServices(newServices);
      // Set the newly selected service as active.
      setSelectedService(otherService.title);
      setOthersDropdownVisible(false);
    }
  };

  /**
   * Handles the click event for a manufacturing card.
   * @param service The service object of the card that was clicked.
   */
  const handleCardClick = (service: Service) => {
    const originalOthersCard = initialServices.find((s) => s.isOthers);
    // Prevent the original "Others" card from being clickable.
    if (service.isOthers && service.title === originalOthersCard?.title) {
      return;
    }

    // Set the clicked service as the selected one.
    setSelectedService(service.title);

    // If a main service card (not the "Others" slot) is clicked, reset the "Others" card to its original state.
    if (!service.isOthers) {
      const currentOthersCard = services.find((s) => s.isOthers);
      if (originalOthersCard && currentOthersCard && currentOthersCard.title !== originalOthersCard.title) {
        const newServices = services.map((s) => (s.isOthers ? originalOthersCard : s));
        setServices(newServices);
      }
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {services.map((service, index) => (
        // Container for each card and its potential dropdown.
        // Handles hover events to show/hide the dropdown for the "Others" card.
        <div
          key={index}
          className="relative"
          onMouseEnter={() => service.isOthers && setOthersDropdownVisible(true)}
          onMouseLeave={() => service.isOthers && setOthersDropdownVisible(false)}
        >
          {/* The main card element */}
          <div
            className={`p-4 rounded-lg border-2 transition-all duration-200 ease-in-out h-full ${
              selectedService === service.title
                ? "border-blue-500 bg-blue-50 shadow-lg" // Style for selected card
                : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-md" // Style for non-selected cards
            } ${service.isOthers && service.title === initialServices.find(s => s.isOthers)?.title ? "cursor-default" : "cursor-pointer"}`}
            onClick={() => handleCardClick(service)}
          >
            <h3 className="font-semibold text-gray-900 mb-2">{service.title}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{service.description}</p>
            <div className="mt-3">
              <a
                href={service.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 text-sm hover:underline"
                onClick={(e) => e.stopPropagation()} // Prevent card click when link is clicked
              >
                More →
              </a>
            </div>
          </div>

          {/* Dropdown menu for the "Others" card */}
          {service.isOthers && (
            <div
              className={`absolute right-0 top-full mt-1 w-[290px] bg-white border border-gray-200 rounded-lg shadow-xl z-20 p-2 transition-all duration-300 ease-in-out ${
                isOthersDropdownVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
              }`}>
              <ul className="space-y-2">
                {otherServices.map((other, idx) => (
                  <li
                    key={idx}
                    className="p-2 rounded hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleOtherServiceClick(other)}
                  >
                    <h4 className="font-semibold text-gray-800 text-sm">{other.title}</h4>
                    {other.description && <p className="text-xs text-gray-500 mt-1">{other.description}</p>}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
