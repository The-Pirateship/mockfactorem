'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function UserSubmissionsPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    const email = localStorage.getItem('userEmail') || '';
    
    if (!isAuthenticated || email !== 'admin@email.com') {
      router.push('/');
      return;
    }
    
    setIsLoading(false);
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link href="/">
            <span className="text-blue-600 hover:underline cursor-pointer">← Back to Home</span>
          </Link>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-8">User Submissions</h1>
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="p-6">
            <p className="text-gray-700">This is a simulated page to show where user submissions would be displayed.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
