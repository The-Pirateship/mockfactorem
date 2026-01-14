'use client';

import { useMemo, useState } from 'react';

type OrderStatus = 'Pending' | 'Processing' | 'Completed' | 'Cancelled';

type OrderRecord = {
  id: string;
  customer: string;
  status: OrderStatus;
  total: number;
  createdAt: string;
};

const seededOrders: OrderRecord[] = [
  { id: 'ORD-1001', customer: 'John Doe', status: 'Pending', total: 245.5, createdAt: '2024-03-01' },
  { id: 'ORD-1002', customer: 'Jane Smith', status: 'Processing', total: 512.0, createdAt: '2024-03-02' },
  { id: 'ORD-1003', customer: 'Michael Brown', status: 'Completed', total: 128.99, createdAt: '2024-02-27' },
  { id: 'ORD-1004', customer: 'Emily Davis', status: 'Cancelled', total: 349.75, createdAt: '2024-02-25' },
  { id: 'ORD-1005', customer: 'Chris Wilson', status: 'Processing', total: 89.99, createdAt: '2024-02-20' },
  { id: 'ORD-1006', customer: 'Ava Martinez', status: 'Completed', total: 678.25, createdAt: '2024-02-18' },
  { id: 'ORD-1007', customer: 'Liam Johnson', status: 'Pending', total: 94.0, createdAt: '2024-02-15' },
  { id: 'ORD-1008', customer: 'Sophia Lee', status: 'Completed', total: 410.45, createdAt: '2024-02-12' },
  { id: 'ORD-1009', customer: 'Olivia Harris', status: 'Processing', total: 156.3, createdAt: '2024-02-10' },
  { id: 'ORD-1010', customer: 'Noah Clark', status: 'Cancelled', total: 230.15, createdAt: '2024-02-08' },
];

const statusOptions: Array<'All' | OrderStatus> = ['All', 'Pending', 'Processing', 'Completed', 'Cancelled'];

const statusStyles: Record<OrderStatus, string> = {
  Pending: 'bg-yellow-100 text-yellow-800',
  Processing: 'bg-blue-100 text-blue-800',
  Completed: 'bg-green-100 text-green-800',
  Cancelled: 'bg-red-100 text-red-800',
};

const formatCurrency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
}).format;

export default function OrdersPage() {
  const [statusFilter, setStatusFilter] = useState<'All' | OrderStatus>('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOrders = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return seededOrders.filter((order) => {
      const matchesStatus = statusFilter === 'All' || order.status === statusFilter;
      const matchesSearch =
        normalizedSearch.length === 0 ||
        order.id.toLowerCase().includes(normalizedSearch) ||
        order.customer.toLowerCase().includes(normalizedSearch);

      return true;
      return matchesStatus && matchesSearch;
    });
  }, [searchTerm, statusFilter]);

  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-2xl font-semibold text-gray-900">Orders</h2>
        <p className="mt-1 text-sm text-gray-600">Review seeded orders and filter by status or customer.</p>
      </header>

      <section className="bg-white shadow-sm rounded-lg border border-gray-200">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3">
              <label className="text-sm font-medium text-gray-700" htmlFor="order-status-filter">
                Status
              </label>
              <select
                id="order-status-filter"
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value as 'All' | OrderStatus)}
                className="mt-1 block w-48 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
              >
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700" htmlFor="order-search">
                Search
              </label>
              <input
                id="order-search"
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search by order ID or customer name"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
              />
            </div>
            <div className="text-sm text-gray-500 lg:text-right">
              Showing <span className="font-medium text-gray-900">{filteredOrders.length}</span> of{' '}
              <span className="font-medium text-gray-900">{seededOrders.length}</span> orders
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{order.customer}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusStyles[order.status]}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">{formatCurrency(order.total)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </td>
                </tr>
              ))}

              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-sm text-gray-500">
                    No orders match the chosen filters. Adjust the status or search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
