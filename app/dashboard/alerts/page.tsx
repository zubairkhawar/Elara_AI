'use client';

import { useState } from 'react';
import { AlertCircle, CheckCircle, Info, XCircle, ChevronLeft, ChevronRight } from 'lucide-react';

export default function AlertsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const alerts = [
    {
      id: 1,
      type: 'success',
      title: 'Booking Confirmed',
      message: 'John Doe has confirmed their appointment for tomorrow at 2:00 PM',
      time: '5 minutes ago',
      read: false,
    },
    {
      id: 2,
      type: 'warning',
      title: 'Upcoming Appointment',
      message: 'You have an appointment with Jane Smith in 30 minutes',
      time: '15 minutes ago',
      read: false,
    },
    {
      id: 3,
      type: 'info',
      title: 'New Booking Request',
      message: 'Mike Johnson requested an appointment for next week',
      time: '1 hour ago',
      read: true,
    },
    {
      id: 4,
      type: 'error',
      title: 'Call Failed',
      message: 'Failed to connect call to customer. Please retry.',
      time: '2 hours ago',
      read: true,
    },
    {
      id: 5,
      type: 'success',
      title: 'Payment Received',
      message: 'Payment of $150 received for booking #1234',
      time: '3 hours ago',
      read: true,
    },
    {
      id: 6,
      type: 'info',
      title: 'System Update',
      message: 'Elara AI has been updated with new features',
      time: '1 day ago',
      read: true,
    },
    {
      id: 7,
      type: 'success',
      title: 'Booking Completed',
      message: 'Sarah Williams completed her consultation session successfully',
      time: '2 hours ago',
      read: false,
    },
    {
      id: 8,
      type: 'warning',
      title: 'Payment Pending',
      message: 'Payment for booking #1235 is still pending. Follow up required.',
      time: '4 hours ago',
      read: false,
    },
    {
      id: 9,
      type: 'info',
      title: 'New Customer Registered',
      message: 'David Brown has registered as a new customer',
      time: '5 hours ago',
      read: true,
    },
    {
      id: 10,
      type: 'success',
      title: 'Review Submitted',
      message: 'Emily Davis submitted a 5-star review for your service',
      time: '6 hours ago',
      read: true,
    },
    {
      id: 11,
      type: 'error',
      title: 'System Error',
      message: 'Failed to send confirmation email to Robert Wilson. Please check email settings.',
      time: '7 hours ago',
      read: true,
    },
    {
      id: 12,
      type: 'warning',
      title: 'Appointment Reminder',
      message: 'Reminder: You have an appointment with Lisa Anderson tomorrow at 4:00 PM',
      time: '8 hours ago',
      read: false,
    },
    {
      id: 13,
      type: 'info',
      title: 'Schedule Updated',
      message: 'Michael Taylor rescheduled his appointment to next Monday',
      time: '9 hours ago',
      read: true,
    },
    {
      id: 14,
      type: 'success',
      title: 'Payment Processed',
      message: 'Payment of $200 processed successfully for booking #1236',
      time: '10 hours ago',
      read: true,
    },
    {
      id: 15,
      type: 'warning',
      title: 'Low Availability',
      message: 'Only 2 time slots available for this week. Consider adding more availability.',
      time: '12 hours ago',
      read: true,
    },
    {
      id: 16,
      type: 'info',
      title: 'Customer Inquiry',
      message: 'Jennifer Martinez sent a new inquiry about your services',
      time: '1 day ago',
      read: true,
    },
    {
      id: 17,
      type: 'success',
      title: 'Booking Cancelled',
      message: 'Christopher Lee cancelled his appointment. Time slot is now available.',
      time: '1 day ago',
      read: true,
    },
    {
      id: 18,
      type: 'error',
      title: 'API Connection Issue',
      message: 'Temporary connection issue with payment gateway. Service restored.',
      time: '1 day ago',
      read: true,
    },
    {
      id: 19,
      type: 'warning',
      title: 'Follow-up Required',
      message: 'Follow-up call needed for Amanda White regarding her last appointment',
      time: '2 days ago',
      read: true,
    },
    {
      id: 20,
      type: 'info',
      title: 'Monthly Report Ready',
      message: 'Your monthly performance report for January is now available',
      time: '2 days ago',
      read: true,
    },
    {
      id: 21,
      type: 'success',
      title: 'New Subscription',
      message: 'Daniel Harris subscribed to your premium service plan',
      time: '2 days ago',
      read: true,
    },
    {
      id: 22,
      type: 'warning',
      title: 'Appointment Conflict',
      message: 'Potential scheduling conflict detected. Please review your calendar.',
      time: '3 days ago',
      read: true,
    },
    {
      id: 23,
      type: 'info',
      title: 'Feature Update',
      message: 'New booking management features are now available in your dashboard',
      time: '3 days ago',
      read: true,
    },
    {
      id: 24,
      type: 'success',
      title: 'Customer Referral',
      message: 'Jessica Clark referred a new customer. Referral bonus applied.',
      time: '3 days ago',
      read: true,
    },
    {
      id: 25,
      type: 'error',
      title: 'Backup Failed',
      message: 'Scheduled backup failed. Please check backup configuration.',
      time: '4 days ago',
      read: true,
    },
    {
      id: 26,
      type: 'warning',
      title: 'High Demand Period',
      message: 'Increased booking requests detected. Consider expanding availability.',
      time: '4 days ago',
      read: true,
    },
    {
      id: 27,
      type: 'info',
      title: 'Maintenance Scheduled',
      message: 'System maintenance scheduled for next Sunday from 2:00 AM to 4:00 AM',
      time: '5 days ago',
      read: true,
    },
    {
      id: 28,
      type: 'success',
      title: 'Goal Achieved',
      message: 'Congratulations! You have achieved your monthly booking target',
      time: '5 days ago',
      read: true,
    },
    {
      id: 29,
      type: 'warning',
      title: 'Payment Overdue',
      message: 'Payment for booking #1237 is overdue. Contact customer required.',
      time: '6 days ago',
      read: true,
    },
    {
      id: 30,
      type: 'info',
      title: 'Customer Feedback',
      message: 'Matthew Lewis provided feedback on your service. Review available.',
      time: '6 days ago',
      read: true,
    },
    {
      id: 31,
      type: 'success',
      title: 'Integration Complete',
      message: 'Calendar integration with Google Calendar has been successfully completed',
      time: '1 week ago',
      read: true,
    },
    {
      id: 32,
      type: 'warning',
      title: 'Capacity Warning',
      message: 'You are at 90% capacity for this month. Consider adding more slots.',
      time: '1 week ago',
      read: true,
    },
  ];

  // Pagination calculations
  const totalPages = Math.ceil(alerts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentAlerts = alerts.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return CheckCircle;
      case 'warning':
        return AlertCircle;
      case 'error':
        return XCircle;
      default:
        return Info;
    }
  };

  const getColorClasses = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 text-green-600 border-green-200';
      case 'warning':
        return 'bg-yellow-50 text-yellow-600 border-yellow-200';
      case 'error':
        return 'bg-red-50 text-red-600 border-red-200';
      default:
        return 'bg-blue-50 text-blue-600 border-blue-200';
    }
  };

  const unreadAlerts = alerts.filter((a) => !a.read);

  return (
    <div className="space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-8">
      {/* Header */}
      <div className="mb-4 sm:mb-5 md:mb-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-3">
              Alerts
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-gray-600">
              Stay informed about important events and updates
            </p>
          </div>
          {unreadAlerts.length > 0 && (
            <button className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg bg-gradient-to-br from-[#1E1E5F] to-[#7B4FFF] text-white font-semibold hover:opacity-90 transition-opacity text-sm sm:text-base shadow-sm">
              Mark all as read
            </button>
          )}
        </div>
      </div>

      {/* Alerts List */}
      <div className="space-y-3 sm:space-y-4">
        {currentAlerts.map((alert) => {
          const Icon = getIcon(alert.type);
          return (
            <div
              key={alert.id}
              className={`group rounded-xl border transition-all duration-200 ${
                alert.read
                  ? 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-sm'
                  : 'bg-gradient-to-r from-purple-50/50 to-white border-purple-200 shadow-sm hover:shadow-md hover:border-purple-300'
              }`}
            >
              <div className="p-4 sm:p-5 md:p-6">
                <div className="flex items-start gap-4 sm:gap-5">
                  <div
                    className={`p-2.5 sm:p-3 rounded-xl border flex-shrink-0 transition-transform group-hover:scale-105 ${getColorClasses(alert.type)}`}
                  >
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 sm:gap-3 mb-1.5">
                          <h3 className="font-semibold text-gray-900 text-base sm:text-lg">
                            {alert.title}
                          </h3>
                          {!alert.read && (
                            <span className="px-2 py-0.5 rounded-full bg-purple-600 text-white text-xs font-medium whitespace-nowrap">
                              New
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600 mb-2 leading-relaxed text-sm sm:text-base">
                          {alert.message}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                      <p className="text-xs sm:text-sm text-gray-500 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                        {alert.time}
                      </p>
                      {alert.read && (
                        <span className="text-xs text-gray-400 font-medium">Read</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      <div className="rounded-xl bg-white border border-gray-200 shadow-sm px-4 sm:px-6 md:px-8 py-4 my-2 sm:my-3 md:my-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
              <span className="font-medium">{Math.min(endIndex, alerts.length)}</span> of{' '}
              <span className="font-medium">{alerts.length}</span> alerts
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
