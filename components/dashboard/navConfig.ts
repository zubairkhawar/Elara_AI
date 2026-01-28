import {
  LayoutDashboard,
  Calendar,
  Bell,
  Users,
  User,
  Headphones,
} from 'lucide-react';

export interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const mainNavItems: NavItem[] = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Bookings', href: '/dashboard/bookings', icon: Calendar },
  { name: 'Alerts', href: '/dashboard/alerts', icon: Bell },
  { name: 'Customers', href: '/dashboard/customers', icon: Users },
  { name: 'Call Summaries', href: '/dashboard/call-summaries', icon: Bell },
  { name: 'Services', href: '/dashboard/services', icon: LayoutDashboard },
  { name: 'Profile', href: '/dashboard/profile', icon: User },
];

export const supportNavItems: NavItem[] = [
  { name: 'Support', href: '/dashboard/support', icon: Headphones },
];

