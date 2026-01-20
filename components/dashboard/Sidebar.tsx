'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Calendar,
  Bell,
  Users,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useSidebar } from '@/contexts/SidebarContext';

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Bookings', href: '/dashboard/bookings', icon: Calendar },
  { name: 'Alerts', href: '/dashboard/alerts', icon: Bell },
  { name: 'Customers', href: '/dashboard/customers', icon: Users },
];

export default function Sidebar() {
  const { isCollapsed, setIsCollapsed } = useSidebar();
  const pathname = usePathname();

  return (
    <aside
      className={`fixed left-0 top-0 h-full bg-[var(--bar-background-color)] border-r border-[var(--border)] transition-all duration-300 z-40 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div className="h-full flex flex-col">
        {/* Header with collapse button */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-[var(--border)]">
          {!isCollapsed && (
            <h1 className="text-xl font-bold bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
              Elara AI
            </h1>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="ml-auto p-2 rounded-lg hover:bg-[var(--hover-background)] transition-colors"
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? (
              <ChevronRight className="w-5 h-5 text-[var(--text-secondary)]" />
            ) : (
              <ChevronLeft className="w-5 h-5 text-[var(--text-secondary)]" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? 'gradient-primary text-white'
                        : 'text-[var(--text-secondary)] hover:bg-[var(--hover-background)] hover:text-[var(--text-primary)]'
                    }`}
                    title={isCollapsed ? item.name : undefined}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    {!isCollapsed && (
                      <span className="font-medium">{item.name}</span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        {!isCollapsed && (
          <div className="p-4 border-t border-[var(--border)]">
            <div className="p-3 rounded-lg bg-[var(--card-color)] border border-[var(--border)]">
              <p className="text-xs text-[var(--text-muted)] mb-1">Status</p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-sm text-[var(--text-secondary)]">All systems operational</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
