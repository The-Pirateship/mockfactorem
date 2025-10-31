'use client';

import { useEffect, useMemo, useState, type ChangeEvent, type ReactNode } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const navigation = [
  {
    name: 'Overview',
    href: '/dashboard',
    icon: (
      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path d="M10 2a1 1 0 01.894.553l7 14A1 1 0 0117 18H3a1 1 0 01-.894-1.447l7-14A1 1 0 0110 2zM4.618 16h10.764L10 4.236 4.618 16z" />
      </svg>
    ),
  },
  {
    name: 'All Orders',
    href: '/dashboard/orders',
    icon: (
      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fillRule="evenodd" d="M3 3a1 1 0 011-1h3.586a1 1 0 01.707.293l1.414 1.414A1 1 0 0010.414 4H16a1 1 0 011 1v1h-2V6H5v10h10v-2h2v1a1 1 0 01-1 1H4a1 1 0 01-1-1V3zm14 6a1 1 0 00-1-1H8v2h8a1 1 0 001-1zm-1 3H8v2h8a1 1 0 000-2z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    name: 'Settings',
    href: '/dashboard/settings',
    icon: (
      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fillRule="evenodd" d="M11.3 1.046a1 1 0 00-2.6 0l-.184.735a1 1 0 01-.97.764h-.764a1 1 0 00-.927.629l-.287.717a1 1 0 01-.896.615L3.1 4.58a1 1 0 00-.847.53l-.382.692a1 1 0 000 .996l.382.692a1 1 0 00.847.53l.472.082a1 1 0 01.896.615l.287.717a1 1 0 00.927.63h.764a1 1 0 01.971.764l.183.734a1 1 0 002.602 0l.183-.734a1 1 0 01.971-.764h.764a1 1 0 00.927-.63l.287-.717a1 1 0 01.896-.615l.472-.082a1 1 0 00.847-.53l.382-.692a1 1 0 000-.996l-.382-.692a1 1 0 00-.847-.53l-.472-.082a1 1 0 01-.896-.615l-.287-.717a1 1 0 00-.927-.629h-.764a1 1 0 01-.97-.764l-.184-.735zM10 7a3 3 0 100 6 3 3 0 000-6z" clipRule="evenodd" />
      </svg>
    ),
  },
];

function navItemClass(active: boolean) {
  return [
    'group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition',
    active ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
  ].join(' ');
}

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [userEmail, setUserEmail] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    const email = localStorage.getItem('userEmail') || '';

    if (!isAuthenticated || email !== 'admin@email.com') {
      router.push('/');
      return;
    }

    setUserEmail(email);
    setIsLoading(false);
  }, [router]);

  const sidebarItems = useMemo(
    () =>
      navigation.map((item) => {
        const isActive = pathname === item.href;
        const iconClassName = isActive
          ? 'text-blue-600'
          : 'text-gray-400 group-hover:text-gray-500';
        return (
          <Link key={item.name} href={item.href} className={navItemClass(isActive)}>
            <span className={iconClassName}>{item.icon}</span>
            <span>{item.name}</span>
          </Link>
        );
      }),
    [pathname],
  );

  const handleMobileNavChange = (event: ChangeEvent<HTMLSelectElement>) => {
    router.push(event.target.value);
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    router.push('/');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <aside className="hidden md:flex md:w-64 md:flex-col bg-white border-r border-gray-200">
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <span className="text-lg font-semibold text-gray-900">Admin Panel</span>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-1">{sidebarItems}</nav>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="h-16 bg-white border-b border-gray-200">
          <div className="h-full flex items-center justify-between px-4 sm:px-6 lg:px-8">
            <h1 className="text-xl font-semibold text-gray-900">Admin Dashboard</h1>
            <div className="flex items-center gap-4">
              <div className="md:hidden">
                <label htmlFor="dashboard-mobile-nav" className="sr-only">
                  Navigate to
                </label>
                <select
                  id="dashboard-mobile-nav"
                  className="block w-44 rounded-md border-gray-300 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={pathname}
                  onChange={handleMobileNavChange}
                >
                  {navigation.map((item) => (
                    <option key={item.href} value={item.href}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600">{userEmail}</span>
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Sign out
                </button>
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
