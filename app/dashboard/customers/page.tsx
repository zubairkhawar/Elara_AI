import { User, Mail, Phone, Calendar, Search, Filter, Plus } from 'lucide-react';

export default function CustomersPage() {
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
  ];

  return (
    <div className="p-8 space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Customers</h1>
        <p className="text-lg text-[var(--text-secondary)]">
          Manage your customer database and relationships
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="p-8 rounded-xl bg-[var(--card-color)] border border-[var(--border)] text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <User className="w-6 h-6 text-[var(--purple)]" />
            <h3 className="text-lg font-semibold">Total Customers</h3>
          </div>
          <p className="text-4xl font-bold">{customers.length}</p>
        </div>
        <div className="p-8 rounded-xl bg-[var(--card-color)] border border-[var(--border)] text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <User className="w-6 h-6 text-green-400" />
            <h3 className="text-lg font-semibold">Active</h3>
          </div>
          <p className="text-4xl font-bold">
            {customers.filter((c) => c.status === 'Active').length}
          </p>
        </div>
        <div className="p-8 rounded-xl bg-[var(--card-color)] border border-[var(--border)] text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Calendar className="w-6 h-6 text-blue-400" />
            <h3 className="text-lg font-semibold">Total Bookings</h3>
          </div>
          <p className="text-4xl font-bold">
            {customers.reduce((sum, c) => sum + c.bookings, 0)}
          </p>
        </div>
        <div className="p-8 rounded-xl bg-[var(--card-color)] border border-[var(--border)] text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <User className="w-6 h-6 text-yellow-400" />
            <h3 className="text-lg font-semibold">New This Month</h3>
          </div>
          <p className="text-4xl font-bold">12</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 max-w-4xl mx-auto">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
          <input
            type="text"
            placeholder="Search customers..."
            className="w-full pl-10 pr-4 py-3 rounded-lg bg-[var(--card-color)] border border-[var(--border)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--border-hover)] transition-colors"
          />
        </div>
        <button className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[var(--card-color)] border border-[var(--border)] text-[var(--text-secondary)] hover:bg-[var(--hover-background)] transition-colors">
          <Filter className="w-4 h-4" />
          <span>Filter</span>
        </button>
        <button className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg gradient-primary text-white font-semibold hover:opacity-90 transition-opacity">
          <Plus className="w-4 h-4" />
          <span>Add Customer</span>
        </button>
      </div>

      {/* Customers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {customers.map((customer) => (
          <div
            key={customer.id}
            className="p-8 rounded-xl bg-[var(--card-color)] border border-[var(--border)] hover:border-[var(--border-hover)] transition-colors text-center"
          >
            <div className="flex flex-col items-center mb-6">
              <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center mb-4">
                <span className="text-white font-semibold text-lg">{customer.avatar}</span>
              </div>
              <h3 className="font-semibold text-[var(--text-primary)] text-lg mb-2">
                {customer.name}
              </h3>
              <span
                className={`text-xs px-3 py-1 rounded-full ${
                  customer.status === 'Active'
                    ? 'bg-green-500/20 text-green-400'
                    : 'bg-gray-500/20 text-gray-400'
                }`}
              >
                {customer.status}
              </span>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-center gap-2 text-sm text-[var(--text-secondary)]">
                <Mail className="w-4 h-4" />
                <span>{customer.email}</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-sm text-[var(--text-secondary)]">
                <Phone className="w-4 h-4" />
                <span>{customer.phone}</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-sm text-[var(--text-secondary)]">
                <Calendar className="w-4 h-4" />
                <span>{customer.bookings} bookings</span>
              </div>
            </div>

            <div className="pt-6 border-t border-[var(--border)] mb-6">
              <p className="text-xs text-[var(--text-muted)] mb-2">Last booking</p>
              <p className="text-sm text-[var(--text-secondary)]">{customer.lastBooking}</p>
            </div>

            <div className="flex gap-3">
              <button className="flex-1 px-4 py-3 rounded-lg bg-[var(--hover-background)] text-[var(--text-primary)] hover:bg-[var(--border)] transition-colors text-sm font-medium">
                View Details
              </button>
              <button className="px-4 py-3 rounded-lg border border-[var(--border)] text-[var(--text-secondary)] hover:bg-[var(--hover-background)] transition-colors">
                <Phone className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
