import { Calendar, Clock, User, Search, Filter } from 'lucide-react';

export default function BookingsPage() {
  const bookings = [
    {
      id: 1,
      customer: 'John Doe',
      email: 'john@example.com',
      service: 'Consultation',
      date: '2024-01-15',
      time: '2:00 PM',
      duration: '60 min',
      status: 'Confirmed',
      phone: '+1 (555) 123-4567',
    },
    {
      id: 2,
      customer: 'Jane Smith',
      email: 'jane@example.com',
      service: 'Follow-up',
      date: '2024-01-15',
      time: '3:30 PM',
      duration: '30 min',
      status: 'Pending',
      phone: '+1 (555) 234-5678',
    },
    {
      id: 3,
      customer: 'Mike Johnson',
      email: 'mike@example.com',
      service: 'Initial Meeting',
      date: '2024-01-16',
      time: '10:00 AM',
      duration: '45 min',
      status: 'Confirmed',
      phone: '+1 (555) 345-6789',
    },
    {
      id: 4,
      customer: 'Sarah Williams',
      email: 'sarah@example.com',
      service: 'Consultation',
      date: '2024-01-16',
      time: '1:00 PM',
      duration: '60 min',
      status: 'Confirmed',
      phone: '+1 (555) 456-7890',
    },
    {
      id: 5,
      customer: 'David Brown',
      email: 'david@example.com',
      service: 'Review',
      date: '2024-01-17',
      time: '11:00 AM',
      duration: '30 min',
      status: 'Pending',
      phone: '+1 (555) 567-8901',
    },
  ];

  return (
    <div className="p-8 space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Bookings</h1>
        <p className="text-lg text-[var(--text-secondary)]">
          Manage and view all your appointments
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 max-w-4xl mx-auto">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
          <input
            type="text"
            placeholder="Search bookings..."
            className="w-full pl-10 pr-4 py-3 rounded-lg bg-[var(--card-color)] border border-[var(--border)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--border-hover)] transition-colors"
          />
        </div>
        <button className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[var(--card-color)] border border-[var(--border)] text-[var(--text-secondary)] hover:bg-[var(--hover-background)] transition-colors">
          <Filter className="w-4 h-4" />
          <span>Filter</span>
        </button>
        <button className="px-6 py-3 rounded-lg gradient-primary text-white font-semibold hover:opacity-90 transition-opacity">
          New Booking
        </button>
      </div>

      {/* Bookings Table */}
      <div className="rounded-xl bg-[var(--card-color)] border border-[var(--border)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[var(--bar-background-color)] border-b border-[var(--border)]">
              <tr>
                <th className="px-8 py-4 text-left text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-8 py-4 text-left text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">
                  Service
                </th>
                <th className="px-8 py-4 text-left text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">
                  Date & Time
                </th>
                <th className="px-8 py-4 text-left text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-8 py-4 text-left text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">
                  Status
                </th>
                <th className="px-8 py-4 text-right text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {bookings.map((booking) => (
                <tr
                  key={booking.id}
                  className="hover:bg-[var(--hover-background)] transition-colors"
                >
                  <td className="px-8 py-5">
                    <div>
                      <p className="font-medium text-[var(--text-primary)]">{booking.customer}</p>
                      <p className="text-sm text-[var(--text-muted)] mt-1">{booking.email}</p>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className="text-[var(--text-secondary)]">{booking.service}</span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2 text-[var(--text-secondary)]">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">{booking.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[var(--text-muted)] mt-2">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{booking.time}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className="text-[var(--text-secondary)]">{booking.duration}</span>
                  </td>
                  <td className="px-8 py-5">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        booking.status === 'Confirmed'
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <button className="text-[var(--purple)] hover:underline text-sm font-medium">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
