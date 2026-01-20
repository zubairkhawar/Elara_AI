import { Calendar, Phone, Users, TrendingUp } from 'lucide-react';

export default function DashboardPage() {
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

  return (
    <div className="p-8 space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Dashboard</h1>
        <p className="text-lg text-[var(--text-secondary)]">
          Welcome back! Here's what's happening with your bookings today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.title}
              className="p-8 rounded-xl bg-[var(--card-color)] border border-[var(--border)] hover:border-[var(--border-hover)] transition-colors text-center"
            >
              <div className="flex items-center justify-center mb-6">
                <div className={`p-4 rounded-lg bg-[var(--hover-background)] ${stat.color}`}>
                  <Icon className="w-8 h-8" />
                </div>
              </div>
              <div className="flex items-center justify-center gap-2 mb-2">
                <h3 className="text-3xl font-bold">{stat.value}</h3>
                <span className="text-sm text-green-400 font-medium">{stat.change}</span>
              </div>
              <p className="text-sm text-[var(--text-secondary)]">{stat.title}</p>
            </div>
          );
        })}
      </div>

      {/* Recent Bookings */}
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="p-8 rounded-xl bg-[var(--card-color)] border border-[var(--border)]">
          <h2 className="text-2xl font-semibold mb-8 text-center">Recent Bookings</h2>
          <div className="space-y-6">
            {recentBookings.map((booking) => (
              <div
                key={booking.id}
                className="p-6 rounded-lg bg-[var(--scaffold-color)] border border-[var(--border)] hover:border-[var(--border-hover)] transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-[var(--text-primary)] text-lg">{booking.customer}</h3>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      booking.status === 'Confirmed'
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}
                  >
                    {booking.status}
                  </span>
                </div>
                <p className="text-sm text-[var(--text-secondary)] mb-2">{booking.service}</p>
                <p className="text-xs text-[var(--text-muted)]">
                  {booking.date} at {booking.time}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Feed */}
        <div className="p-8 rounded-xl bg-[var(--card-color)] border border-[var(--border)]">
          <h2 className="text-2xl font-semibold mb-8 text-center">Recent Activity</h2>
          <div className="space-y-6">
            {[
              { action: 'New booking received', time: '5 minutes ago', type: 'booking' },
              { action: 'Call completed successfully', time: '1 hour ago', type: 'call' },
              { action: 'Customer inquiry handled', time: '2 hours ago', type: 'inquiry' },
              { action: 'Appointment confirmed', time: '3 hours ago', type: 'confirmation' },
            ].map((activity, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="w-3 h-3 rounded-full bg-[var(--purple)] mt-2 flex-shrink-0"></div>
                <div className="flex-1">
                  <p className="text-base text-[var(--text-primary)] mb-1">{activity.action}</p>
                  <p className="text-sm text-[var(--text-muted)]">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
