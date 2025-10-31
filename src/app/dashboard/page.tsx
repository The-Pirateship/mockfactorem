'use client';

import { useState } from 'react';

const stats = [
  {
    id: 'total-users',
    label: 'Total Users',
    value: '1,234',
    iconBg: 'bg-blue-500',
    icon: (
      <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
  {
    id: 'total-orders',
    label: 'Total Orders',
    value: '89',
    iconBg: 'bg-green-500',
    icon: (
      <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
  },
  {
    id: 'pending-requests',
    label: 'Pending Requests',
    value: '12',
    iconBg: 'bg-yellow-500',
    icon: (
      <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    id: 'active-projects',
    label: 'Active Projects',
    value: '24',
    iconBg: 'bg-purple-500',
    icon: (
      <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
  },
];

const recentActivity = [
  { id: 1, user: 'John Doe', action: 'created a new order', time: '2 minutes ago' },
  { id: 2, user: 'Jane Smith', action: 'uploaded a new file', time: '15 minutes ago' },
  { id: 3, user: 'Robert Johnson', action: 'updated profile information', time: '1 hour ago' },
  { id: 4, user: 'Emily Davis', action: 'submitted a quote request', time: '3 hours ago' },
  { id: 5, user: 'Michael Wilson', action: 'completed payment', time: '5 hours ago' },
];

const quickActions = [
  {
    id: 'add-user',
    label: 'Add User',
    message: 'Add User feature - Coming Soon!',
    buttonClass: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500',
    icon: (
      <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    id: 'view-reports',
    label: 'View Reports',
    message: 'View Reports feature - Coming Soon!',
    buttonClass: 'bg-green-600 hover:bg-green-700 focus:ring-green-500',
    icon: (
      <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    id: 'edit-settings',
    label: 'Edit Settings',
    message: 'Edit Settings feature - Coming Soon!',
    buttonClass: 'bg-purple-600 hover:bg-purple-700 focus:ring-purple-500',
    icon: (
      <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
      </svg>
    ),
  },
  {
    id: 'view-logs',
    label: 'View Logs',
    message: 'View Logs feature - Coming Soon!',
    buttonClass: 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500',
    icon: (
      <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
      </svg>
    ),
  },
];

export default function DashboardOverview() {
  const [notification, setNotification] = useState('');
  const [timeoutId, setTimeoutId] = useState<number | null>(null);

  const showNotification = (message: string) => {
    if (timeoutId) {
      window.clearTimeout(timeoutId);
    }
    setNotification(message);
    const newTimeout = window.setTimeout(() => {
      setNotification('');
      setTimeoutId(null);
    }, 3000);
    setTimeoutId(newTimeout);
  };

  return (
    <div className="space-y-6">
      {notification && (
        <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
          <p className="text-sm text-blue-700">{notification}</p>
        </div>
      )}

      <section className="bg-white border border-dashed border-gray-200 rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Overview</h2>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {stats.map(({ id, label, value, iconBg, icon }) => (
            <div key={id} className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className={`${iconBg} flex-shrink-0 rounded-md p-3`}>{icon}</div>
                  <div className="ml-5 w-0 flex-1">
                    <dt className="text-sm font-medium text-gray-500 truncate">{label}</dt>
                    <dd className="text-2xl font-semibold text-gray-900">{value}</dd>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Activity</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">Latest actions in the system</p>
          </div>
          <ul className="divide-y divide-gray-200">
            {recentActivity.map((activity) => (
              <li key={activity.id} className="px-6 py-4">
                <p className="text-sm font-medium text-gray-900">
                  {activity.user}{' '}
                  <span className="text-gray-500 font-normal">{activity.action}</span>
                </p>
                <p className="text-sm text-gray-500">{activity.time}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Quick Actions</h3>
          </div>
          <div className="p-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {quickActions.map(({ id, label, message, buttonClass, icon }) => (
              <button
                key={id}
                onClick={() => showNotification(message)}
                className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 ${buttonClass}`}
              >
                {icon}
                {label}
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
