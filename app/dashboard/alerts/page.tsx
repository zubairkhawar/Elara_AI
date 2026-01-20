import { AlertCircle, CheckCircle, Info, XCircle, Bell } from 'lucide-react';

export default function AlertsPage() {
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
  ];

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
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'warning':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'error':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    }
  };

  return (
    <div className="p-8 space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Alerts</h1>
        <p className="text-lg text-[var(--text-secondary)]">
          Stay informed about important events and updates
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <div className="p-8 rounded-xl bg-[var(--card-color)] border border-[var(--border)] text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Bell className="w-6 h-6 text-[var(--purple)]" />
            <h3 className="text-lg font-semibold">Total Alerts</h3>
          </div>
          <p className="text-4xl font-bold">{alerts.length}</p>
        </div>
        <div className="p-8 rounded-xl bg-[var(--card-color)] border border-[var(--border)] text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <AlertCircle className="w-6 h-6 text-yellow-400" />
            <h3 className="text-lg font-semibold">Unread</h3>
          </div>
          <p className="text-4xl font-bold">
            {alerts.filter((a) => !a.read).length}
          </p>
        </div>
        <div className="p-8 rounded-xl bg-[var(--card-color)] border border-[var(--border)] text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <CheckCircle className="w-6 h-6 text-green-400" />
            <h3 className="text-lg font-semibold">Read</h3>
          </div>
          <p className="text-4xl font-bold">
            {alerts.filter((a) => a.read).length}
          </p>
        </div>
      </div>

      <div className="text-center mb-6">
        <button className="px-6 py-3 rounded-lg bg-[var(--card-color)] border border-[var(--border)] text-[var(--text-secondary)] hover:bg-[var(--hover-background)] transition-colors">
          Mark all as read
        </button>
      </div>

      {/* Alerts List */}
      <div className="space-y-6 max-w-4xl mx-auto">
        {alerts.map((alert) => {
          const Icon = getIcon(alert.type);
          return (
            <div
              key={alert.id}
              className={`p-8 rounded-xl border ${
                alert.read
                  ? 'bg-[var(--card-color)] border-[var(--border)]'
                  : 'bg-[var(--card-color)] border-[var(--purple)]/30'
              } hover:border-[var(--border-hover)] transition-colors`}
            >
              <div className="flex items-start gap-6">
                <div
                  className={`p-4 rounded-lg border flex-shrink-0 ${getColorClasses(alert.type)}`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-[var(--text-primary)] text-lg">
                      {alert.title}
                    </h3>
                    {!alert.read && (
                      <span className="px-3 py-1 rounded-full bg-[var(--purple)]/20 text-[var(--purple)] text-xs font-medium">
                        New
                      </span>
                    )}
                  </div>
                  <p className="text-[var(--text-secondary)] mb-3 leading-relaxed">
                    {alert.message}
                  </p>
                  <p className="text-sm text-[var(--text-muted)]">{alert.time}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
