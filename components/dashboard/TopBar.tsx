'use client';

import { useState, useRef, useEffect } from 'react';
import { Bell, User, Settings, LogOut, Search } from 'lucide-react';

export default function TopBar() {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target as Node)
      ) {
        setNotificationsOpen(false);
      }
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setUserMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const notifications = [
    {
      id: 1,
      title: 'New booking received',
      message: 'John Doe booked an appointment for tomorrow at 2 PM',
      time: '5 minutes ago',
      unread: true,
    },
    {
      id: 2,
      title: 'Call completed',
      message: 'Successfully handled a customer inquiry',
      time: '1 hour ago',
      unread: true,
    },
    {
      id: 3,
      title: 'Weekly report ready',
      message: 'Your weekly analytics report is available',
      time: '3 hours ago',
      unread: false,
    },
  ];

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <header className="h-16 bg-[var(--bar-background-color)] border-b border-[var(--border)] flex items-center justify-between px-6 sticky top-0 z-30">
      {/* Search */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-[var(--card-color)] border border-[var(--border)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--border-hover)] transition-colors"
          />
        </div>
      </div>

      {/* Right side actions */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <div className="relative" ref={notificationsRef}>
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="relative p-2 rounded-lg hover:bg-[var(--hover-background)] transition-colors"
          >
            <Bell className="w-5 h-5 text-[var(--text-secondary)]" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            )}
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-[var(--card-color)] border border-[var(--border)] rounded-lg shadow-xl overflow-hidden">
              <div className="p-4 border-b border-[var(--border)]">
                <h3 className="font-semibold text-[var(--text-primary)]">Notifications</h3>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 border-b border-[var(--border)] hover:bg-[var(--hover-background)] transition-colors cursor-pointer ${
                      notification.unread ? 'bg-[var(--hover-background)]' : ''
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {notification.unread && (
                        <div className="w-2 h-2 rounded-full bg-[var(--purple)] mt-2 flex-shrink-0"></div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-[var(--text-primary)] text-sm">
                          {notification.title}
                        </p>
                        <p className="text-[var(--text-secondary)] text-sm mt-1">
                          {notification.message}
                        </p>
                        <p className="text-[var(--text-muted)] text-xs mt-2">
                          {notification.time}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-3 border-t border-[var(--border)] text-center">
                <button className="text-sm text-[var(--purple)] hover:underline">
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User Menu */}
        <div className="relative" ref={userMenuRef}>
          <button
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-[var(--hover-background)] transition-colors"
          >
            <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center">
              <span className="text-white font-semibold text-sm">JD</span>
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-medium text-[var(--text-primary)]">John Doe</p>
              <p className="text-xs text-[var(--text-muted)]">john@example.com</p>
            </div>
          </button>

          {userMenuOpen && (
            <div className="absolute right-0 top-full mt-2 w-56 bg-[var(--card-color)] border border-[var(--border)] rounded-lg shadow-xl overflow-hidden">
              <div className="p-4 border-b border-[var(--border)]">
                <p className="font-semibold text-[var(--text-primary)]">John Doe</p>
                <p className="text-sm text-[var(--text-muted)]">john@example.com</p>
              </div>
              <div className="py-2">
                <button className="w-full flex items-center gap-3 px-4 py-2 text-left text-[var(--text-secondary)] hover:bg-[var(--hover-background)] transition-colors">
                  <User className="w-4 h-4" />
                  <span>Profile</span>
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-2 text-left text-[var(--text-secondary)] hover:bg-[var(--hover-background)] transition-colors">
                  <Settings className="w-4 h-4" />
                  <span>Settings</span>
                </button>
                <div className="border-t border-[var(--border)] my-2"></div>
                <button className="w-full flex items-center gap-3 px-4 py-2 text-left text-[var(--text-secondary)] hover:bg-[var(--hover-background)] transition-colors">
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
