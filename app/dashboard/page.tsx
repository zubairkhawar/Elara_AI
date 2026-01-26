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
    <div className="space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
        {/* Stat Cards */}
        {stats.slice(0, 2).map((stat) => {
          const Icon = stat.icon;
          const isPositive = stat.change.startsWith('+');
          return (
            <div
              key={stat.title}
              className="rounded-xl bg-white p-4 sm:p-5 md:p-6 shadow-sm"
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
        <div className="rounded-xl bg-white p-4 sm:p-5 md:p-6 shadow-sm">
          <h3 className="font-semibold mb-2 text-gray-900">Monthly Target</h3>
          <div className="flex items-center justify-center h-40 text-3xl font-bold bg-gradient-to-br from-[#1E1E5F] to-[#7B4FFF] bg-clip-text text-transparent">
            75.55%
          </div>
          <p className="text-center text-sm text-gray-500">You earn $3287 today</p>
        </div>
      </div>

      {/* Monthly Sales Chart */}
      <div className="rounded-xl bg-white p-4 sm:p-5 md:p-6 lg:p-8 shadow-sm mb-4 sm:mb-5 md:mb-6">
        <h3 className="font-semibold mb-3 sm:mb-4 md:mb-5 text-sm sm:text-base md:text-lg text-gray-900">Monthly Sales</h3>
        <div className="h-40 sm:h-44 md:h-48 lg:h-56 xl:h-64 bg-gray-100 rounded-lg flex items-center justify-center">
          <p className="text-gray-400 text-xs sm:text-sm md:text-base">Chart placeholder</p>
        </div>
      </div>

      {/* Statistics Chart */}
      <div className="rounded-xl bg-white p-4 sm:p-5 md:p-6 lg:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0 mb-3 sm:mb-4 md:mb-5">
          <h3 className="font-semibold text-sm sm:text-base md:text-lg text-gray-900">Statistics</h3>
          <div className="flex gap-2 text-xs sm:text-sm">
            <span className="rounded-lg bg-gray-100 px-2 sm:px-3 py-1 text-gray-700 font-medium">Monthly</span>
            <span className="px-2 sm:px-3 py-1 text-gray-500">Quarterly</span>
            <span className="px-2 sm:px-3 py-1 text-gray-500">Annually</span>
          </div>
        </div>
        <div className="h-48 sm:h-52 md:h-56 lg:h-64 xl:h-72 bg-gray-100 rounded-lg flex items-center justify-center">
          <p className="text-gray-400 text-xs sm:text-sm md:text-base">Chart placeholder</p>
        </div>
      </div>
    </div>
  );
}
