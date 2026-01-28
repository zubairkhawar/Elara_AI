'use client';

import { useEffect, useState } from 'react';
import { Search, Filter, PhoneCall, Clock, User, ChevronLeft, ChevronRight } from 'lucide-react';

// In a real app this will come from the backend (e.g. Vapi webhooks -> Django).
// For now we use static sample data with a structure that will scale.
const MOCK_CALLS = Array.from({ length: 32 }).map((_, idx) => ({
  id: idx + 1,
  callerName: idx % 3 === 0 ? 'John Doe' : idx % 3 === 1 ? 'Jane Smith' : 'Walk-in Caller',
  callerNumber: '+1 (555) 123-45' + String(idx).padStart(2, '0'),
  service: idx % 2 === 0 ? 'Haircut' : 'Cleansing',
  price: idx % 2 === 0 ? 20 : 30,
  currency: 'USD',
  createdAt: `2025-02-${(idx % 28) + 1} 14:${String((idx * 7) % 60).padStart(2, '0')}`,
  durationMinutes: 3 + (idx % 10),
  outcome: idx % 4 === 0 ? 'Booking created' : idx % 4 === 1 ? 'Rescheduled' : 'Lead captured',
  summary:
    idx % 2 === 0
      ? 'Caller asked for a haircut slot next week. Elara confirmed availability and booked a 30-minute haircut on Tuesday at 3:00 PM.'
      : 'Caller requested facial cleansing and pricing. Elara explained available cleansing packages and sent a follow-up confirmation SMS.',
}));

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

export default function CallSummariesPage() {
  const [search, setSearch] = useState('');
  const [selectedService, setSelectedService] = useState<string | 'all'>('all');
  const [serviceOptions, setServiceOptions] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const pageSize = 10;

  // Load services defined by the business so we can filter by them
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const token = localStorage.getItem('elara_access_token');
    if (!token) return;

    const loadServices = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/v1/bookings/services/`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) return;
        const data = await res.json();
        const names = (data as any[])
          .map((s) => s.name as string)
          .filter(Boolean);
        setServiceOptions(Array.from(new Set(names)));
      } catch {
        // Fail silently; filters will just not show dynamic options
      }
    };

    loadServices();
  }, []);

  const filtered = MOCK_CALLS.filter((call) => {
    const matchesSearch =
      !search ||
      call.callerName.toLowerCase().includes(search.toLowerCase()) ||
      call.callerNumber.toLowerCase().includes(search.toLowerCase()) ||
      call.summary.toLowerCase().includes(search.toLowerCase());

    const matchesService =
      selectedService === 'all' ? true : call.service === selectedService;

    return matchesSearch && matchesService;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * pageSize;
  const current = filtered.slice(startIndex, startIndex + pageSize);

  const goToPage = (p: number) => {
    setPage(Math.max(1, Math.min(p, totalPages)));
  };

  return (
    <div className="space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-8">
      {/* Header */}
      <div className="mb-4 sm:mb-5 md:mb-6">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-3">
          Call Summaries
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl">
          Review AI call outcomes, bookings, and customer intents. Summaries are
          retained for the last 2 months to keep things fast and focused.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-3 sm:gap-4 my-2 sm:my-3 md:my-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search by caller, number, or summary..."
            className="w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 rounded-lg bg-white border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 text-sm sm:text-base"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          <button
            type="button"
            onClick={() => {
              setSelectedService('all');
              setSearch('');
              setPage(1);
            }}
            className={`flex-1 inline-flex items-center justify-center gap-2 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border text-xs sm:text-sm font-medium transition-colors ${
              selectedService === 'all'
                ? 'bg-purple-600 text-white border-purple-600'
                : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
            }`}
          >
            <Filter className="w-4 h-4" />
            All services
          </button>
          {serviceOptions.map((name) => (
            <button
              key={name}
              type="button"
              onClick={() => {
                setSelectedService(name);
                setPage(1);
              }}
              className={`hidden sm:inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg border text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                selectedService === name
                  ? 'bg-purple-600 text-white border-purple-600'
                  : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
              }`}
            >
              {name}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile list */}
      <div className="space-y-3 md:hidden my-2 sm:my-3 md:my-4">
        {current.map((call) => (
          <div
            key={call.id}
            className="rounded-xl bg-white border border-gray-200 shadow-sm p-4 flex flex-col gap-3"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-semibold text-gray-900 text-sm">
                  {call.callerName}
                </p>
                <p className="text-xs text-gray-500">{call.callerNumber}</p>
              </div>
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-purple-50 text-purple-700 text-[11px] font-medium">
                <PhoneCall className="w-3 h-3" />
                {call.service}
              </span>
            </div>
            <p className="text-xs text-gray-500 flex items-center gap-1.5">
              <Clock className="w-3 h-3" />
              <span>{call.createdAt}</span>
              <span className="text-gray-400">•</span>
              <span>{call.durationMinutes} min</span>
            </p>
            <p className="text-xs text-gray-500 flex items-center gap-1.5">
              <User className="w-3 h-3" />
              <span>
                {call.service} — {call.price}
                {call.currency === 'USD' && '$'}
              </span>
            </p>
            <p className="text-sm text-gray-700 mt-1">{call.summary}</p>
            <p className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-lg px-2 py-1 mt-1 inline-flex max-w-fit">
              {call.outcome}
            </p>
          </div>
        ))}
      </div>

      {/* Desktop / tablet table */}
      <div className="hidden md:block rounded-xl bg-white border border-gray-200 shadow-sm overflow-hidden my-2 sm:my-3 md:my-4">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 sm:px-6 md:px-8 py-3 text-left font-semibold text-gray-600">
                  Caller
                </th>
                <th className="px-4 sm:px-6 md:px-8 py-3 text-left font-semibold text-gray-600">
                  Service
                </th>
                <th className="px-4 sm:px-6 md:px-8 py-3 text-left font-semibold text-gray-600">
                  When
                </th>
                <th className="px-4 sm:px-6 md:px-8 py-3 text-left font-semibold text-gray-600">
                  Outcome
                </th>
                <th className="px-4 sm:px-6 md:px-8 py-3 text-left font-semibold text-gray-600 w-2/5">
                  Summary
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {current.map((call) => (
                <tr key={call.id} className="align-top hover:bg-gray-50/60">
                  <td className="px-4 sm:px-6 md:px-8 py-4">
                    <div className="space-y-0.5">
                      <p className="font-medium text-gray-900">
                        {call.callerName}
                      </p>
                      <p className="text-xs text-gray-500">
                        {call.callerNumber}
                      </p>
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 md:px-8 py-4">
                    <div className="space-y-0.5">
                      <p className="inline-flex items-center gap-1.5 text-gray-800">
                        <PhoneCall className="w-4 h-4 text-purple-500" />
                        {call.service}
                      </p>
                      <p className="text-xs text-gray-500">
                        {call.price}
                        {call.currency === 'USD' && '$'}
                      </p>
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 md:px-8 py-4">
                    <div className="space-y-0.5 text-xs text-gray-600">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-gray-400" />
                        <span>{call.createdAt}</span>
                      </div>
                      <p className="text-gray-500">
                        Duration: {call.durationMinutes} min
                      </p>
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 md:px-8 py-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium">
                      {call.outcome}
                    </span>
                  </td>
                  <td className="px-4 sm:px-6 md:px-8 py-4">
                    <p className="text-xs sm:text-sm text-gray-700 leading-snug line-clamp-3">
                      {call.summary}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-4 sm:px-6 md:px-8 py-3 border-t border-gray-200 flex items-center justify-between gap-3">
          <p className="text-xs sm:text-sm text-gray-600">
            Showing{' '}
            <span className="font-medium">
              {filtered.length === 0 ? 0 : startIndex + 1}
            </span>{' '}
            to{' '}
            <span className="font-medium">
              {Math.min(startIndex + pageSize, filtered.length)}
            </span>{' '}
            of <span className="font-medium">{filtered.length}</span> calls
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
              if (
                p === 1 ||
                p === totalPages ||
                (p >= currentPage - 1 && p <= currentPage + 1)
              ) {
                return (
                  <button
                    key={p}
                    onClick={() => goToPage(p)}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-medium ${
                      currentPage === p
                        ? 'bg-purple-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {p}
                  </button>
                );
              }
              if (p === currentPage - 2 || p === currentPage + 2) {
                return (
                  <span key={p} className="px-1.5 text-xs text-gray-400">
                    …
                  </span>
                );
              }
              return null;
            })}
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
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

