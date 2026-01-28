'use client';

import { useMemo, useState } from 'react';
import { Calendar, Phone, Users, TrendingUp } from 'lucide-react';

type TimeRange = 'day' | 'month';

export default function DashboardPage() {
  const [bookingsRange, setBookingsRange] = useState<TimeRange>('day');
  const [salesRange, setSalesRange] = useState<'day' | 'week' | 'month'>('day');
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [showDayPicker, setShowDayPicker] = useState(false);
  const stats = [
    {
      title: 'Total Bookings',
      value: '1,247',
      change: '+12%',
      icon: Calendar,
      color: 'text-blue-400',
    },
    {
      title: 'Calls Handled',
      value: '3,891',
      change: '+8%',
      icon: Phone,
      color: 'text-purple-400',
    },
    {
      title: 'Active Customers',
      value: '892',
      change: '+5%',
      icon: Users,
      color: 'text-green-400',
    },
    {
      title: 'Conversion Rate',
      value: '68%',
      change: '+3%',
      icon: TrendingUp,
      color: 'text-yellow-400',
    },
  ];

  const recentBookings = [
    {
      id: 1,
      customer: 'John Doe',
      service: 'Consultation',
      date: '2024-01-15',
      time: '2:00 PM',
      status: 'Confirmed',
    },
    {
      id: 2,
      customer: 'Jane Smith',
      service: 'Follow-up',
      date: '2024-01-15',
      time: '3:30 PM',
      status: 'Pending',
    },
    {
      id: 3,
      customer: 'Mike Johnson',
      service: 'Initial Meeting',
      date: '2024-01-16',
      time: '10:00 AM',
      status: 'Confirmed',
    },
    {
      id: 4,
      customer: 'Sarah Williams',
      service: 'Consultation',
      date: '2024-01-16',
      time: '1:00 PM',
      status: 'Confirmed',
    },
  ];

  // Sales per month (used for monthly sales view)
  const monthlySales = useMemo(
    () => [
      { label: 'Jan', value: 32 },
      { label: 'Feb', value: 45 },
      { label: 'Mar', value: 51 },
      { label: 'Apr', value: 62 },
      { label: 'May', value: 70 },
      { label: 'Jun', value: 78 },
      { label: 'Jul', value: 82 },
      { label: 'Aug', value: 90 },
      { label: 'Sep', value: 88 },
      { label: 'Oct', value: 93 },
      { label: 'Nov', value: 97 },
      { label: 'Dec', value: 100 },
    ],
    [],
  );

  // Bookings: time slots for a specific day (populated after date selection)
  const dayTimeSlots = useMemo(
    () =>
      !selectedDate
        ? []
        : [
            { label: '09:00', value: 3 },
            { label: '10:00', value: 5 },
            { label: '11:00', value: 4 },
            { label: '12:00', value: 6 },
            { label: '13:00', value: 2 },
            { label: '14:00', value: 4 },
            { label: '15:00', value: 5 },
            { label: '16:00', value: 3 },
          ],
    [selectedDate],
  );

  const bookingsData = bookingsRange === 'day' ? dayTimeSlots : [];

  return (
    <div className="space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-8">
      {/* Header */}
      <div className="mb-4 sm:mb-5 md:mb-6">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-3">
          Dashboard
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-gray-600">
          Welcome back! Here's what's happening with your business today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
        {/* Stat Cards */}
        {stats.slice(0, 2).map((stat) => {
          const Icon = stat.icon;
          const isPositive = stat.change.startsWith('+');
          return (
            <div
              key={stat.title}
              className="rounded-xl bg-white p-4 sm:p-5 md:p-6 shadow-sm my-2 sm:my-3 md:my-4"
            >
              <p className="text-sm text-gray-500 mb-2">{stat.title}</p>
              <div className="mt-2 flex items-center justify-between">
                <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                <span className={`text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change}
                </span>
              </div>
            </div>
          );
        })}
        
        {/* Monthly Target Card */}
        <div className="rounded-xl bg-white p-4 sm:p-5 md:p-6 shadow-sm my-2 sm:my-3 md:my-4">
          <h3 className="font-semibold mb-2 text-gray-900">Monthly Target</h3>
          <div className="flex items-center justify-center h-40 text-3xl font-bold bg-gradient-to-br from-[#1E1E5F] to-[#7B4FFF] bg-clip-text text-transparent">
            75.55%
          </div>
          <p className="text-center text-sm text-gray-500">You earn $3287 today</p>
        </div>
      </div>

      {/* Bookings chart – heatmap style */}
      <div className="rounded-2xl bg-white p-4 sm:p-5 md:p-6 lg:p-8 shadow-sm my-2 sm:my-3 md:my-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between md:gap-6 mb-3 sm:mb-4">
          <div>
            <h3 className="font-semibold mb-1 text-sm sm:text-base md:text-lg text-gray-900 leading-tight">
              Bookings activity
            </h3>
            <p className="text-xs sm:text-sm text-gray-500">
              See when your bookings are happening across the day or month.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative inline-flex items-center rounded-full bg-gray-100 p-1 text-xs sm:text-sm">
              <button
                type="button"
                onClick={() => {
                  setBookingsRange('day');
                  setShowDayPicker((prev) => !prev);
                }}
                className={`px-2 sm:px-3 py-1 rounded-full transition ${
                  bookingsRange === 'day'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500'
                }`}
              >
                Day
              </button>
              <button
                type="button"
                onClick={() => {
                  setBookingsRange('month');
                  setShowDayPicker(false);
                }}
                className={`px-2 sm:px-3 py-1 rounded-full transition ${
                  bookingsRange === 'month'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500'
                }`}
              >
                Month
              </button>

              {showDayPicker && (
                <div className="absolute right-0 top-10 z-20 w-60 rounded-xl border border-gray-200 bg-white p-3 shadow-lg">
                  <p className="mb-2 text-xs font-medium text-gray-700">
                    Choose a date
                  </p>
                  <input
                    type="date"
                    className="w-full rounded-lg border border-gray-200 px-2 py-1.5 text-xs sm:text-sm text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    value={selectedDate ?? ''}
                    onChange={(e) => {
                      setSelectedDate(e.target.value || null);
                      setBookingsRange('day');
                      setShowDayPicker(false);
                    }}
                  />
                  <button
                    type="button"
                    className="mt-2 w-full rounded-lg bg-gray-50 px-2 py-1.5 text-xs text-gray-600 hover:bg-gray-100"
                    onClick={() => setShowDayPicker(false)}
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="h-48 sm:h-56 md:h-64 lg:h-72 bg-gray-50 rounded-xl border border-dashed border-gray-200 px-3 sm:px-4 md:px-6 py-3 sm:py-4 flex items-end">
          {bookingsRange === 'day' && !selectedDate ? (
            <div className="flex h-full w-full items-center justify-center text-center">
              <p className="max-w-xs text-xs sm:text-sm text-gray-400">
                Select a date using the Day toggle to see bookings broken down by
                time slots.
              </p>
            </div>
          ) : (
            <>
              {/* Day view: 24h timeline with 30min intervals */}
              {bookingsRange === 'day' ? (
                <div className="flex h-full w-full flex-col">
                  <div className="flex-1 overflow-x-auto">
                    <div className="flex h-full items-center gap-1 sm:gap-1.5 md:gap-2">
                      {bookingsData.map((slot) => {
                        const intensity =
                          slot.value === 0
                            ? 'bg-gray-100'
                            : slot.value <= 2
                            ? 'bg-emerald-100'
                            : slot.value <= 4
                            ? 'bg-emerald-300'
                            : slot.value <= 6
                            ? 'bg-emerald-400'
                            : 'bg-emerald-600';
                        return (
                          <div
                            key={slot.label}
                            className="group relative flex h-6 w-6 items-center justify-center sm:h-7 sm:w-7 md:h-8 md:w-8"
                          >
                            <div
                              className={`h-full w-full rounded-sm sm:rounded-md ${intensity}`}
                            />
                            <div className="pointer-events-none absolute -top-8 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-md bg-gray-900 px-2 py-1 text-[10px] text-white opacity-0 shadow-md transition-opacity group-hover:opacity-100">
                              <span className="font-semibold">{slot.label}</span>{' '}
                              · {slot.value} bookings
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="mt-3 flex justify-between text-[9px] sm:text-[10px] text-gray-500">
                    <span>00:00</span>
                    <span>06:00</span>
                    <span>12:00</span>
                    <span>18:00</span>
                    <span>24:00</span>
                  </div>
                </div>
              ) : (
                // Month view: simple calendar-style heatmap
                <div className="flex h-full w-full flex-col justify-between">
                  <div className="flex items-center justify-between text-[10px] sm:text-xs text-gray-500 mb-2">
                    <span>Mon</span>
                    <span>Wed</span>
                    <span>Fri</span>
                    <span>Sun</span>
                  </div>
                  <div className="flex-1 overflow-x-auto">
                    <div className="grid auto-cols-min grid-flow-col gap-1 sm:gap-1.5">
                      {Array.from({ length: 30 }).map((_, idx) => {
                        const value = (idx * 3 + 5) % 10;
                        const intensity =
                          value === 0
                            ? 'bg-gray-100'
                            : value <= 3
                            ? 'bg-emerald-100'
                            : value <= 6
                            ? 'bg-emerald-300'
                            : 'bg-emerald-500';
                        return (
                          <div
                            // eslint-disable-next-line react/no-array-index-key
                            key={idx}
                            className="group flex flex-col items-center gap-1"
                          >
                            <div className="grid grid-rows-4 gap-0.5">
                              {Array.from({ length: 4 }).map((__, rowIdx) => (
                                <div
                                  // eslint-disable-next-line react/no-array-index-key
                                  key={rowIdx}
                                  className={`h-3 w-3 rounded-[3px] ${intensity}`}
                                />
                              ))}
                            </div>
                            <span className="text-[9px] text-gray-400">
                              {idx + 1}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-end gap-1 text-[9px] sm:text-[10px] text-gray-500">
                    <span>Less</span>
                    <span className="h-3 w-3 rounded-sm bg-gray-100" />
                    <span className="h-3 w-3 rounded-sm bg-emerald-100" />
                    <span className="h-3 w-3 rounded-sm bg-emerald-300" />
                    <span className="h-3 w-3 rounded-sm bg-emerald-500" />
                    <span>More</span>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Sales chart – bar graph */}
      <div className="rounded-2xl bg-white p-4 sm:p-5 md:p-6 lg:p-8 shadow-sm my-2 sm:my-3 md:my-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4 mb-3 sm:mb-4 md:mb-5">
          <h3 className="font-semibold text-sm sm:text-base md:text-lg text-gray-900">
            Revenue overview
          </h3>
          <div className="flex gap-2 text-xs sm:text-sm">
            <div className="inline-flex items-center rounded-full bg-gray-100 p-1">
              <button
                type="button"
                onClick={() => setSalesRange('day')}
                className={`px-2 sm:px-3 py-1 rounded-full transition ${
                  salesRange === 'day'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500'
                }`}
              >
                Day
              </button>
              <button
                type="button"
                onClick={() => setSalesRange('week')}
                className={`px-2 sm:px-3 py-1 rounded-full transition ${
                  salesRange === 'week'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500'
                }`}
              >
                Week
              </button>
              <button
                type="button"
                onClick={() => setSalesRange('month')}
                className={`px-2 sm:px-3 py-1 rounded-full transition ${
                  salesRange === 'month'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500'
                }`}
              >
                Month
              </button>
            </div>
          </div>
        </div>

        {/* Sales bar chart with hover tooltip */}
        <div className="h-48 sm:h-56 md:h-64 lg:h-72 bg-gray-50 rounded-xl border border-dashed border-gray-200 px-3 sm:px-4 md:px-6 py-3 sm:py-4 flex items-end">
          <div className="flex w-full items-end gap-2 sm:gap-3 md:gap-4">
            {(
              salesRange === 'day'
                ? [
                    { label: 'Mon', value: 320 },
                    { label: 'Tue', value: 410 },
                    { label: 'Wed', value: 380 },
                    { label: 'Thu', value: 450 },
                    { label: 'Fri', value: 520 },
                    { label: 'Sat', value: 290 },
                    { label: 'Sun', value: 260 },
                  ]
                : salesRange === 'week'
                ? [
                    { label: 'W1', value: 1100 },
                    { label: 'W2', value: 1380 },
                    { label: 'W3', value: 1520 },
                    { label: 'W4', value: 1675 },
                  ]
                : monthlySales
            ).map((entry) => {
              const dataset =
                salesRange === 'month'
                  ? monthlySales
                  : salesRange === 'day'
                  ? [
                      320, 410, 380, 450, 520, 290, 260,
                    ]
                  : [1100, 1380, 1520, 1675];
              const maxVal = Math.max(...dataset);
              const height = (entry.value / maxVal) * 100;
              return (
                <div
                  key={entry.label}
                  className="group relative flex flex-1 flex-col items-center justify-end gap-1"
                >
                  <div className="relative flex w-full flex-1 items-end">
                    <div
                      className="w-full rounded-md bg-gradient-to-t from-[#1E1E5F] to-[#7B4FFF] shadow-sm"
                      style={{ height: `${Math.max(height, 8)}%` }}
                    />
                    <div className="pointer-events-none absolute -top-8 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-md bg-gray-900 px-2 py-1 text-[10px] text-white opacity-0 shadow-md transition-opacity group-hover:opacity-100">
                      <span className="font-semibold">
                        ${entry.value.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] sm:text-xs text-gray-500">
                    {entry.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
