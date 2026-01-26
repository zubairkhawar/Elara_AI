'use client';

import { useState } from 'react';
import { User, Mail, Phone, Calendar, Search, Filter, Plus, ChevronLeft, ChevronRight } from 'lucide-react';

export default function CustomersPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12; // 12 items per page for grid (4 columns on large screens)

  const customers = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1 (555) 123-4567',
      bookings: 12,
      lastBooking: '2024-01-10',
      status: 'Active',
      avatar: 'JD',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+1 (555) 234-5678',
      bookings: 8,
      lastBooking: '2024-01-08',
      status: 'Active',
      avatar: 'JS',
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike@example.com',
      phone: '+1 (555) 345-6789',
      bookings: 5,
      lastBooking: '2024-01-05',
      status: 'Active',
      avatar: 'MJ',
    },
    {
      id: 4,
      name: 'Sarah Williams',
      email: 'sarah@example.com',
      phone: '+1 (555) 456-7890',
      bookings: 15,
      lastBooking: '2024-01-12',
      status: 'Active',
      avatar: 'SW',
    },
    {
      id: 5,
      name: 'David Brown',
      email: 'david@example.com',
      phone: '+1 (555) 567-8901',
      bookings: 3,
      lastBooking: '2023-12-20',
      status: 'Inactive',
      avatar: 'DB',
    },
    {
      id: 6,
      name: 'Emily Davis',
      email: 'emily@example.com',
      phone: '+1 (555) 678-9012',
      bookings: 20,
      lastBooking: '2024-01-14',
      status: 'Active',
      avatar: 'ED',
    },
    {
      id: 7,
      name: 'Robert Wilson',
      email: 'robert@example.com',
      phone: '+1 (555) 789-0123',
      bookings: 9,
      lastBooking: '2024-01-11',
      status: 'Active',
      avatar: 'RW',
    },
    {
      id: 8,
      name: 'Lisa Anderson',
      email: 'lisa@example.com',
      phone: '+1 (555) 890-1234',
      bookings: 14,
      lastBooking: '2024-01-09',
      status: 'Active',
      avatar: 'LA',
    },
    {
      id: 9,
      name: 'Michael Taylor',
      email: 'michael@example.com',
      phone: '+1 (555) 901-2345',
      bookings: 7,
      lastBooking: '2024-01-07',
      status: 'Active',
      avatar: 'MT',
    },
    {
      id: 10,
      name: 'Jennifer Martinez',
      email: 'jennifer@example.com',
      phone: '+1 (555) 012-3456',
      bookings: 18,
      lastBooking: '2024-01-13',
      status: 'Active',
      avatar: 'JM',
    },
    {
      id: 11,
      name: 'Christopher Lee',
      email: 'christopher@example.com',
      phone: '+1 (555) 123-4568',
      bookings: 6,
      lastBooking: '2024-01-06',
      status: 'Active',
      avatar: 'CL',
    },
    {
      id: 12,
      name: 'Amanda White',
      email: 'amanda@example.com',
      phone: '+1 (555) 234-5679',
      bookings: 11,
      lastBooking: '2024-01-10',
      status: 'Active',
      avatar: 'AW',
    },
    {
      id: 13,
      name: 'Daniel Harris',
      email: 'daniel@example.com',
      phone: '+1 (555) 345-6780',
      bookings: 4,
      lastBooking: '2023-12-28',
      status: 'Inactive',
      avatar: 'DH',
    },
    {
      id: 14,
      name: 'Jessica Clark',
      email: 'jessica@example.com',
      phone: '+1 (555) 456-7891',
      bookings: 16,
      lastBooking: '2024-01-12',
      status: 'Active',
      avatar: 'JC',
    },
    {
      id: 15,
      name: 'Matthew Lewis',
      email: 'matthew@example.com',
      phone: '+1 (555) 567-8902',
      bookings: 10,
      lastBooking: '2024-01-08',
      status: 'Active',
      avatar: 'ML',
    },
    {
      id: 16,
      name: 'Ashley Walker',
      email: 'ashley@example.com',
      phone: '+1 (555) 678-9013',
      bookings: 13,
      lastBooking: '2024-01-11',
      status: 'Active',
      avatar: 'AW',
    },
    {
      id: 17,
      name: 'James Hall',
      email: 'james@example.com',
      phone: '+1 (555) 789-0124',
      bookings: 8,
      lastBooking: '2024-01-09',
      status: 'Active',
      avatar: 'JH',
    },
    {
      id: 18,
      name: 'Michelle Allen',
      email: 'michelle@example.com',
      phone: '+1 (555) 890-1235',
      bookings: 19,
      lastBooking: '2024-01-14',
      status: 'Active',
      avatar: 'MA',
    },
    {
      id: 19,
      name: 'Andrew Young',
      email: 'andrew@example.com',
      phone: '+1 (555) 901-2346',
      bookings: 5,
      lastBooking: '2023-12-15',
      status: 'Inactive',
      avatar: 'AY',
    },
    {
      id: 20,
      name: 'Stephanie King',
      email: 'stephanie@example.com',
      phone: '+1 (555) 012-3457',
      bookings: 22,
      lastBooking: '2024-01-15',
      status: 'Active',
      avatar: 'SK',
    },
    {
      id: 21,
      name: 'Ryan Wright',
      email: 'ryan@example.com',
      phone: '+1 (555) 123-4569',
      bookings: 7,
      lastBooking: '2024-01-07',
      status: 'Active',
      avatar: 'RW',
    },
    {
      id: 22,
      name: 'Nicole Lopez',
      email: 'nicole@example.com',
      phone: '+1 (555) 234-5680',
      bookings: 12,
      lastBooking: '2024-01-10',
      status: 'Active',
      avatar: 'NL',
    },
    {
      id: 23,
      name: 'Kevin Hill',
      email: 'kevin@example.com',
      phone: '+1 (555) 345-6781',
      bookings: 9,
      lastBooking: '2024-01-08',
      status: 'Active',
      avatar: 'KH',
    },
    {
      id: 24,
      name: 'Rachel Scott',
      email: 'rachel@example.com',
      phone: '+1 (555) 456-7892',
      bookings: 14,
      lastBooking: '2024-01-12',
      status: 'Active',
      avatar: 'RS',
    },
    {
      id: 25,
      name: 'Brandon Green',
      email: 'brandon@example.com',
      phone: '+1 (555) 567-8903',
      bookings: 6,
      lastBooking: '2023-11-20',
      status: 'Inactive',
      avatar: 'BG',
    },
    {
      id: 26,
      name: 'Lauren Adams',
      email: 'lauren@example.com',
      phone: '+1 (555) 678-9014',
      bookings: 17,
      lastBooking: '2024-01-13',
      status: 'Active',
      avatar: 'LA',
    },
    {
      id: 27,
      name: 'Justin Baker',
      email: 'justin@example.com',
      phone: '+1 (555) 789-0125',
      bookings: 11,
      lastBooking: '2024-01-09',
      status: 'Active',
      avatar: 'JB',
    },
    {
      id: 28,
      name: 'Samantha Nelson',
      email: 'samantha@example.com',
      phone: '+1 (555) 890-1236',
      bookings: 15,
      lastBooking: '2024-01-11',
      status: 'Active',
      avatar: 'SN',
    },
    {
      id: 29,
      name: 'Tyler Carter',
      email: 'tyler@example.com',
      phone: '+1 (555) 901-2347',
      bookings: 8,
      lastBooking: '2024-01-06',
      status: 'Active',
      avatar: 'TC',
    },
    {
      id: 30,
      name: 'Megan Mitchell',
      email: 'megan@example.com',
      phone: '+1 (555) 012-3458',
      bookings: 21,
      lastBooking: '2024-01-14',
      status: 'Active',
      avatar: 'MM',
    },
    {
      id: 31,
      name: 'Jordan Perez',
      email: 'jordan@example.com',
      phone: '+1 (555) 123-4570',
      bookings: 4,
      lastBooking: '2023-12-10',
      status: 'Inactive',
      avatar: 'JP',
    },
    {
      id: 32,
      name: 'Brittany Roberts',
      email: 'brittany@example.com',
      phone: '+1 (555) 234-5681',
      bookings: 13,
      lastBooking: '2024-01-10',
      status: 'Active',
      avatar: 'BR',
    },
  ];

  // Pagination calculations
  const totalPages = Math.ceil(customers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCustomers = customers.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const totalBookings = customers.reduce((sum, c) => sum + c.bookings, 0);
  const activeCustomers = customers.filter((c) => c.status === 'Active').length;

  return (
    <div className="space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-8">
      {/* Header */}
      <div className="mb-4 sm:mb-5 md:mb-6">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-3">
          Customers
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-gray-600">
          Manage your customer database and relationships
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 my-2 sm:my-3 md:my-4">
        <div className="p-4 sm:p-6 md:p-8 rounded-xl bg-white border border-gray-200 shadow-sm text-center">
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <User className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
            <h3 className="text-base sm:text-lg font-semibold text-gray-900">Total Customers</h3>
          </div>
          <p className="text-3xl sm:text-4xl font-bold text-gray-900">{customers.length}</p>
        </div>
        <div className="p-4 sm:p-6 md:p-8 rounded-xl bg-white border border-gray-200 shadow-sm text-center">
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <User className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
            <h3 className="text-base sm:text-lg font-semibold text-gray-900">Active</h3>
          </div>
          <p className="text-3xl sm:text-4xl font-bold text-gray-900">{activeCustomers}</p>
        </div>
        <div className="p-4 sm:p-6 md:p-8 rounded-xl bg-white border border-gray-200 shadow-sm text-center">
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
            <h3 className="text-base sm:text-lg font-semibold text-gray-900">Total Bookings</h3>
          </div>
          <p className="text-3xl sm:text-4xl font-bold text-gray-900">{totalBookings}</p>
        </div>
        <div className="p-4 sm:p-6 md:p-8 rounded-xl bg-white border border-gray-200 shadow-sm text-center">
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <User className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600" />
            <h3 className="text-base sm:text-lg font-semibold text-gray-900">New This Month</h3>
          </div>
          <p className="text-3xl sm:text-4xl font-bold text-gray-900">12</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 my-2 sm:my-3 md:my-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search customers..."
            className="w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 rounded-lg bg-white border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all text-sm sm:text-base"
          />
        </div>
        <button className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors text-sm sm:text-base font-medium">
          <Filter className="w-4 h-4" />
          <span>Filter</span>
        </button>
        <button className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg bg-gradient-to-br from-[#1E1E5F] to-[#7B4FFF] text-white font-semibold hover:opacity-90 transition-opacity text-sm sm:text-base">
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Add Customer</span>
          <span className="sm:hidden">Add</span>
        </button>
      </div>

      {/* Customers Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
        {currentCustomers.map((customer) => (
          <div
            key={customer.id}
            className="p-4 sm:p-6 md:p-8 rounded-xl bg-white border border-gray-200 hover:border-purple-300 hover:shadow-md transition-all shadow-sm"
          >
            <div className="flex flex-col items-center mb-4 sm:mb-6">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-[#1E1E5F] to-[#7B4FFF] flex items-center justify-center mb-3 sm:mb-4 shadow-sm">
                <span className="text-white font-semibold text-base sm:text-lg">{customer.avatar}</span>
              </div>
              <h3 className="font-semibold text-gray-900 text-base sm:text-lg mb-2">
                {customer.name}
              </h3>
              <span
                className={`text-xs px-2.5 sm:px-3 py-1 rounded-full font-medium ${
                  customer.status === 'Active'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {customer.status}
              </span>
            </div>

            <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
              <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-gray-600">
                <Mail className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                <span className="truncate">{customer.email}</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-gray-600">
                <Phone className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                <span>{customer.phone}</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-gray-600">
                <Calendar className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                <span>{customer.bookings} bookings</span>
              </div>
            </div>

            <div className="pt-4 sm:pt-6 border-t border-gray-200 mb-4 sm:mb-6">
              <p className="text-xs text-gray-500 mb-1 sm:mb-2">Last booking</p>
              <p className="text-xs sm:text-sm text-gray-700 font-medium">{customer.lastBooking}</p>
            </div>

            <div className="flex gap-2 sm:gap-3">
              <button className="flex-1 px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-gray-50 text-gray-700 hover:bg-gray-100 transition-colors text-xs sm:text-sm font-medium">
                View Details
              </button>
              <button className="px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors">
                <Phone className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="rounded-xl bg-white border border-gray-200 shadow-sm px-4 sm:px-6 md:px-8 py-4 my-2 sm:my-3 md:my-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
              <span className="font-medium">{Math.min(endIndex, customers.length)}</span> of{' '}
              <span className="font-medium">{customers.length}</span> customers
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                // Show first page, last page, current page, and pages around current
                if (
                  page === 1 ||
                  page === totalPages ||
                  (page >= currentPage - 1 && page <= currentPage + 1)
                ) {
                  return (
                    <button
                      key={page}
                      onClick={() => goToPage(page)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                        currentPage === page
                          ? 'bg-purple-600 text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {page}
                    </button>
                  );
                } else if (page === currentPage - 2 || page === currentPage + 2) {
                  return <span key={page} className="px-2 text-gray-500">...</span>;
                }
                return null;
              })}
            </div>
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="Next page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
