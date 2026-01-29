'use client';

import { useEffect, useState, useMemo } from 'react';
import { Calendar, Clock, User, Search, Plus, ChevronLeft, ChevronRight, Loader2, Edit2, Trash2, X, Check, LayoutGrid, List, MoreVertical } from 'lucide-react';
import { authenticatedFetch } from '@/utils/api';
import { useToast } from '@/contexts/ToastContext';
import { Calendar as BigCalendar, momentLocalizer, View } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';
const localizer = momentLocalizer(moment);

interface Booking {
  id: number;
  client_id: number;
  client_name: string;
  client_email: string;
  client_phone: string;
  service_id?: number;
  service_name: string;
  starts_at: string;
  ends_at: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  notes: string;
  date: string;
  time: string;
  duration: string;
}

interface Client {
  id: number;
  name: string;
  email: string;
  phone_number: string;
}

interface Service {
  id: number;
  name: string;
  price: string;
  currency: string;
}

export default function BookingsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
  const toast = useToast();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedBookings, setSelectedBookings] = useState<number[]>([]);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [saving, setSaving] = useState(false);
  const itemsPerPage = 10;

  // Form state
  const [formClientId, setFormClientId] = useState('');
  const [formServiceId, setFormServiceId] = useState('');
  const [formStartDate, setFormStartDate] = useState('');
  const [formStartTime, setFormStartTime] = useState('');
  const [formDuration, setFormDuration] = useState('30');
  const [formStatus, setFormStatus] = useState<'pending' | 'confirmed' | 'cancelled'>('pending');
  const [formNotes, setFormNotes] = useState('');
  const [newClientName, setNewClientName] = useState('');
  const [newClientEmail, setNewClientEmail] = useState('');
  const [newClientPhone, setNewClientPhone] = useState('');
  const [showNewClientForm, setShowNewClientForm] = useState(false);

  const fetchBookings = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await authenticatedFetch(`${API_BASE_URL}/api/v1/bookings/`);
      if (!res.ok) throw new Error('Failed to load bookings');
      const data = await res.json();
      const formattedBookings: Booking[] = data.map((b: any) => ({
        id: b.id,
        client_id: b.client,
        client_name: b.client_name || 'Unknown',
        client_email: b.client_email || '',
        client_phone: b.client_phone || '',
        service_id: b.service,
        service_name: b.service_name || 'N/A',
        starts_at: b.starts_at,
        ends_at: b.ends_at,
        status: b.status,
        notes: b.notes || '',
        date: formatDate(b.starts_at),
        time: formatTime(b.starts_at),
        duration: formatDuration(b.starts_at, b.ends_at),
      }));
      setBookings(formattedBookings);
    } catch (err: any) {
      setError(err?.message || 'Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  const fetchClients = async () => {
    try {
      const res = await authenticatedFetch(`${API_BASE_URL}/api/v1/clients/`);
      if (res.ok) {
        const data = await res.json();
        setClients(data);
      }
    } catch (err) {
      console.error('Failed to load clients:', err);
    }
  };

  const fetchServices = async () => {
    try {
      const res = await authenticatedFetch(`${API_BASE_URL}/api/v1/bookings/services/`);
      if (res.ok) {
        const data = await res.json();
        setServices(data.map((s: any) => ({
          id: s.id,
          name: s.name,
          price: String(s.price),
          currency: s.currency,
        })));
      }
    } catch (err) {
      console.error('Failed to load services:', err);
    }
  };

  useEffect(() => {
    fetchBookings();
    fetchClients();
    fetchServices();
  }, []);

  const formatDuration = (startsAt: string, endsAt: string): string => {
    const start = new Date(startsAt);
    const end = new Date(endsAt);
    const diffMs = end.getTime() - start.getTime();
    const diffMins = Math.round(diffMs / 60000);
    return `${diffMins} min`;
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  const formatTime = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const handleCreateClient = async () => {
    if (!newClientName.trim()) return;
    setSaving(true);
    try {
      const res = await authenticatedFetch(`${API_BASE_URL}/api/v1/clients/`, {
        method: 'POST',
        body: JSON.stringify({
          name: newClientName,
          email: newClientEmail,
          phone_number: newClientPhone,
        }),
      });
      if (res.ok) {
        const newClient = await res.json();
        setClients([...clients, newClient]);
        setFormClientId(String(newClient.id));
        setNewClientName('');
        setNewClientEmail('');
        setNewClientPhone('');
        setShowNewClientForm(false);
      }
    } catch (err) {
      console.error('Failed to create client:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleSaveBooking = async () => {
    if (!formClientId || !formStartDate || !formStartTime) {
      setError('Please fill in all required fields');
      return;
    }

    setSaving(true);
    setError('');
    try {
      const startDateTime = new Date(`${formStartDate}T${formStartTime}`);
      const durationMinutes = parseInt(formDuration);
      const endDateTime = new Date(startDateTime.getTime() + durationMinutes * 60000);

      const bookingData: any = {
        client: parseInt(formClientId),
        starts_at: startDateTime.toISOString(),
        ends_at: endDateTime.toISOString(),
        status: formStatus,
        notes: formNotes,
      };

      if (formServiceId) {
        bookingData.service = parseInt(formServiceId);
      }

      const url = editingBooking
        ? `${API_BASE_URL}/api/v1/bookings/${editingBooking.id}/`
        : `${API_BASE_URL}/api/v1/bookings/`;
      const method = editingBooking ? 'PATCH' : 'POST';

      const res = await authenticatedFetch(url, {
        method,
        body: JSON.stringify(bookingData),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.detail || 'Failed to save booking');
      }

      await fetchBookings();
      handleCloseModal();
      toast.success(editingBooking ? 'Booking updated' : 'Booking created');
    } catch (err: any) {
      const msg = err?.message || 'Failed to save booking';
      setError(msg);
      toast.error(msg);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteBooking = async (id: number) => {
    setIsDeleting(true);
    try {
      const res = await authenticatedFetch(`${API_BASE_URL}/api/v1/bookings/${id}/`, {
        method: 'DELETE',
      });
      if (res.ok) {
        await fetchBookings();
        setShowDeleteConfirm(false);
        setDeletingId(null);
        toast.success('Booking deleted');
      } else {
        toast.error('Failed to delete booking');
      }
    } catch (err) {
      toast.error('Failed to delete booking');
    } finally {
      setIsDeleting(false);
      setDeletingId(null);
    }
  };

  const handleBulkCancel = async () => {
    setSaving(true);
    try {
      await Promise.all(
        selectedBookings.map(id =>
          authenticatedFetch(`${API_BASE_URL}/api/v1/bookings/${id}/`, {
            method: 'PATCH',
            body: JSON.stringify({ status: 'cancelled' }),
          })
        )
      );
      await fetchBookings();
      setSelectedBookings([]);
      setShowBulkActions(false);
      toast.success(`${selectedBookings.length} booking(s) cancelled`);
    } catch (err) {
      toast.error('Failed to cancel some bookings');
    } finally {
      setSaving(false);
    }
  };

  const handleOpenModal = (booking?: Booking) => {
    if (booking) {
      setEditingBooking(booking);
      setFormClientId(String(booking.client_id));
      setFormServiceId(booking.service_id ? String(booking.service_id) : '');
      const startDate = new Date(booking.starts_at);
      setFormStartDate(startDate.toISOString().split('T')[0]);
      setFormStartTime(startDate.toTimeString().slice(0, 5));
      const duration = Math.round(
        (new Date(booking.ends_at).getTime() - startDate.getTime()) / 60000
      );
      setFormDuration(String(duration));
      setFormStatus(booking.status);
      setFormNotes(booking.notes);
    } else {
      setEditingBooking(null);
      const now = new Date();
      setFormStartDate(now.toISOString().split('T')[0]);
      setFormStartTime('09:00');
      setFormDuration('30');
      setFormStatus('pending');
      setFormNotes('');
      setFormClientId('');
      setFormServiceId('');
    }
    setShowBookingModal(true);
    setError('');
  };

  const handleCloseModal = () => {
    setShowBookingModal(false);
    setEditingBooking(null);
    setShowNewClientForm(false);
    setError('');
  };

  const toggleBookingSelection = (id: number) => {
    setSelectedBookings(prev =>
      prev.includes(id) ? prev.filter(bId => bId !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedBookings.length === filteredBookings.length) {
      setSelectedBookings([]);
    } else {
      setSelectedBookings(filteredBookings.map(b => b.id));
    }
  };

  const normalizedSearch = search.trim().toLowerCase();
  const filteredBookings = bookings.filter((booking) => {
    if (!normalizedSearch) return true;
    return (
      booking.client_name.toLowerCase().includes(normalizedSearch) ||
      booking.client_email.toLowerCase().includes(normalizedSearch) ||
      booking.service_name.toLowerCase().includes(normalizedSearch) ||
      booking.client_phone.toLowerCase().includes(normalizedSearch) ||
      booking.date.toLowerCase().includes(normalizedSearch) ||
      booking.time.toLowerCase().includes(normalizedSearch)
    );
  });

  const totalPages = Math.max(1, Math.ceil(filteredBookings.length / itemsPerPage));
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentBookings = filteredBookings.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  // Calendar events for react-big-calendar
  const calendarEvents = useMemo(() => {
    return filteredBookings.map(booking => ({
      id: booking.id,
      title: `${booking.client_name} - ${booking.service_name}`,
      start: new Date(booking.starts_at),
      end: new Date(booking.ends_at),
      resource: booking,
    }));
  }, [filteredBookings]);

  const handleCalendarSelect = (slotInfo: { start: Date; end: Date }) => {
    const startDate = slotInfo.start;
    setFormStartDate(startDate.toISOString().split('T')[0]);
    setFormStartTime(startDate.toTimeString().slice(0, 5));
    const duration = Math.round((slotInfo.end.getTime() - startDate.getTime()) / 60000);
    setFormDuration(String(duration));
    handleOpenModal();
  };

  const handleCalendarEventClick = (event: any) => {
    handleOpenModal(event.resource);
  };

  return (
    <div className="space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-8">
      {/* Header */}
      <div className="mb-4 sm:mb-5 md:mb-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-3">
              Bookings
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-gray-600">
              Manage and view all your appointments
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode(viewMode === 'list' ? 'calendar' : 'list')}
              className="px-4 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 flex items-center gap-2"
            >
              {viewMode === 'list' ? <LayoutGrid className="w-4 h-4" /> : <List className="w-4 h-4" />}
              <span className="hidden sm:inline">{viewMode === 'list' ? 'Calendar' : 'List'}</span>
            </button>
            <button
              onClick={() => handleOpenModal()}
              className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg bg-gradient-to-br from-[#1E1E5F] to-[#7B4FFF] text-white font-semibold hover:opacity-90 transition-opacity text-sm sm:text-base"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">New Booking</span>
              <span className="sm:hidden">New</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bulk Actions Bar */}
      {selectedBookings.length > 0 && (
        <div className="rounded-xl bg-purple-50 border border-purple-200 p-4 flex items-center justify-between">
          <span className="text-sm font-medium text-purple-900">
            {selectedBookings.length} booking{selectedBookings.length !== 1 ? 's' : ''} selected
          </span>
          <div className="flex gap-2">
            <button
              onClick={handleBulkCancel}
              disabled={saving}
              className="px-4 py-2 text-sm font-medium text-red-700 bg-red-50 hover:bg-red-100 rounded-lg transition-colors disabled:opacity-50"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Cancel Selected'}
            </button>
            <button
              onClick={() => {
                setSelectedBookings([]);
                setShowBulkActions(false);
              }}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 rounded-lg border border-gray-200 transition-colors"
            >
              Clear
            </button>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 my-2 sm:my-3 md:my-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search by customer, email, phone, service, or date..."
            className="w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 rounded-lg bg-white border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all text-sm sm:text-base"
          />
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          {error}
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
          <span className="ml-3 text-gray-600">Loading bookings...</span>
        </div>
      )}

      {/* Calendar View */}
      {!loading && viewMode === 'calendar' && (
        <div className="rounded-xl bg-white border border-gray-200 shadow-sm p-4" style={{ height: '600px' }}>
          <BigCalendar
            localizer={localizer}
            events={calendarEvents}
            startAccessor="start"
            endAccessor="end"
            onSelectSlot={handleCalendarSelect}
            onSelectEvent={handleCalendarEventClick}
            selectable
            style={{ height: '100%' }}
            eventPropGetter={(event) => {
              const booking = event.resource as Booking;
              const colorMap: Record<string, { backgroundColor: string; borderColor: string }> = {
                confirmed: { backgroundColor: '#10b981', borderColor: '#059669' },
                pending: { backgroundColor: '#f59e0b', borderColor: '#d97706' },
                cancelled: { backgroundColor: '#ef4444', borderColor: '#dc2626' },
              };
              const colors = colorMap[booking.status] || { backgroundColor: '#6366f1', borderColor: '#4f46e5' };
              return {
                style: {
                  backgroundColor: colors.backgroundColor,
                  borderColor: colors.borderColor,
                  borderWidth: '2px',
                },
              };
            }}
          />
        </div>
      )}

      {/* List View */}
      {!loading && viewMode === 'list' && (
        <>
          {/* Bookings Table - Desktop / Tablet */}
          <div className="hidden md:block rounded-xl bg-white border border-gray-200 shadow-sm overflow-hidden my-2 sm:my-3 md:my-4">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 sm:px-6 md:px-8 py-3 sm:py-4 text-left">
                      <input
                        type="checkbox"
                        checked={selectedBookings.length === filteredBookings.length && filteredBookings.length > 0}
                        onChange={toggleSelectAll}
                        className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                      />
                    </th>
                    <th className="px-4 sm:px-6 md:px-8 py-3 sm:py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-4 sm:px-6 md:px-8 py-3 sm:py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden sm:table-cell">
                      Service
                    </th>
                    <th className="px-4 sm:px-6 md:px-8 py-3 sm:py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Date & Time
                    </th>
                    <th className="px-4 sm:px-6 md:px-8 py-3 sm:py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden md:table-cell">
                      Duration
                    </th>
                    <th className="px-4 sm:px-6 md:px-8 py-3 sm:py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-4 sm:px-6 md:px-8 py-3 sm:py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {currentBookings.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-4 sm:px-6 md:px-8 py-12 text-center text-gray-500">
                        No bookings found
                      </td>
                    </tr>
                  ) : (
                    currentBookings.map((booking) => (
                      <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 sm:px-6 md:px-8 py-4 sm:py-5">
                          <input
                            type="checkbox"
                            checked={selectedBookings.includes(booking.id)}
                            onChange={() => toggleBookingSelection(booking.id)}
                            className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                          />
                        </td>
                        <td className="px-4 sm:px-6 md:px-8 py-4 sm:py-5">
                          <div>
                            <p className="font-medium text-gray-900 text-sm sm:text-base">{booking.client_name}</p>
                            <p className="text-xs sm:text-sm text-gray-500 mt-1">{booking.client_email}</p>
                          </div>
                        </td>
                        <td className="px-4 sm:px-6 md:px-8 py-4 sm:py-5 hidden sm:table-cell">
                          <span className="text-sm sm:text-base text-gray-700">{booking.service_name}</span>
                        </td>
                        <td className="px-4 sm:px-6 md:px-8 py-4 sm:py-5">
                          <div className="flex items-center gap-2 text-gray-700 text-xs sm:text-sm">
                            <Calendar className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                            <span>{booking.date}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-500 mt-1.5 text-xs sm:text-sm">
                            <Clock className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                            <span>{booking.time}</span>
                          </div>
                        </td>
                        <td className="px-4 sm:px-6 md:px-8 py-4 sm:py-5 hidden md:table-cell">
                          <span className="text-sm sm:text-base text-gray-700">{booking.duration}</span>
                        </td>
                        <td className="px-4 sm:px-6 md:px-8 py-4 sm:py-5">
                          <span
                            className={`inline-flex px-2.5 sm:px-3 py-1 rounded-full text-xs font-medium ${
                              booking.status === 'confirmed'
                                ? 'bg-green-100 text-green-700'
                                : booking.status === 'cancelled'
                                ? 'bg-red-100 text-red-700'
                                : 'bg-yellow-100 text-yellow-700'
                            }`}
                          >
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-4 sm:px-6 md:px-8 py-4 sm:py-5 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleOpenModal(booking)}
                              className="text-purple-600 hover:text-purple-700 p-1.5 hover:bg-purple-50 rounded transition-colors"
                              title="Edit"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                setDeletingId(booking.id);
                                setShowDeleteConfirm(true);
                              }}
                              className="text-red-600 hover:text-red-700 p-1.5 hover:bg-red-50 rounded transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-4 sm:px-6 md:px-8 py-4 border-t border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{filteredBookings.length === 0 ? 0 : startIndex + 1}</span> to{' '}
                  <span className="font-medium">{Math.min(endIndex, filteredBookings.length)}</span> of{' '}
                  <span className="font-medium">{filteredBookings.length}</span> results
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

          {/* Mobile List */}
          <div className="space-y-3 md:hidden my-2 sm:my-3 md:my-4">
            {currentBookings.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <p>No bookings found</p>
              </div>
            ) : (
              currentBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="rounded-xl bg-white border border-gray-200 shadow-sm p-4 flex flex-col gap-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 text-base">{booking.client_name}</p>
                      <p className="text-xs text-gray-500 mt-1">{booking.client_email}</p>
                      <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1.5">
                        <User className="w-3 h-3 text-gray-400" />
                        <span>{booking.client_phone}</span>
                      </p>
                    </div>
                    <span
                      className={`inline-flex px-2 py-1 rounded-full text-[11px] font-medium ${
                        booking.status === 'confirmed'
                          ? 'bg-green-100 text-green-700'
                          : booking.status === 'cancelled'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <div className="flex flex-col gap-1 text-xs text-gray-700">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3 h-3 text-gray-400" />
                        <span>{booking.date}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-gray-500">
                        <Clock className="w-3 h-3 text-gray-400" />
                        <span>{booking.time}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleOpenModal(booking)}
                        className="text-purple-600 hover:text-purple-700 p-1.5"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          setDeletingId(booking.id);
                          setShowDeleteConfirm(true);
                        }}
                        className="text-red-600 hover:text-red-700 p-1.5"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Mobile Pagination */}
          <div className="md:hidden mt-3 flex flex-col gap-3">
            <p className="text-xs text-gray-600 text-center">
              Showing <span className="font-medium">{filteredBookings.length === 0 ? 0 : startIndex + 1}</span> to{' '}
              <span className="font-medium">{Math.min(endIndex, filteredBookings.length)}</span> of{' '}
              <span className="font-medium">{filteredBookings.length}</span> results
            </p>
            <div className="flex items-center justify-center gap-2">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
                        className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                          currentPage === page
                            ? 'bg-purple-600 text-white'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {page}
                      </button>
                    );
                  } else if (page === currentPage - 2 || page === currentPage + 2) {
                    return <span key={page} className="px-1 text-gray-500 text-xs">...</span>;
                  }
                  return null;
                })}
              </div>
              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </>
      )}

      {/* Create/Edit Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full p-6 my-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingBooking ? 'Edit Booking' : 'New Booking'}
              </h2>
              <button
                onClick={handleCloseModal}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {error && (
              <div className="mb-4 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <div className="space-y-4">
              {/* Client Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Customer <span className="text-red-500">*</span>
                </label>
                {!showNewClientForm ? (
                  <div className="space-y-2">
                    <select
                      value={formClientId}
                      onChange={(e) => setFormClientId(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg bg-white border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                    >
                      <option value="">Select a customer</option>
                      {clients.map((client) => (
                        <option key={client.id} value={client.id}>
                          {client.name} {client.email && `(${client.email})`}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={() => setShowNewClientForm(true)}
                      className="text-sm text-purple-600 hover:text-purple-700 font-medium"
                    >
                      + Add new customer
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3 p-4 border border-gray-200 rounded-lg bg-gray-50">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Name *</label>
                      <input
                        type="text"
                        value={newClientName}
                        onChange={(e) => setNewClientName(e.target.value)}
                        placeholder="Customer name"
                        className="w-full px-3 py-2 rounded-lg bg-white border border-gray-200 text-sm"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Email</label>
                        <input
                          type="email"
                          value={newClientEmail}
                          onChange={(e) => setNewClientEmail(e.target.value)}
                          placeholder="email@example.com"
                          className="w-full px-3 py-2 rounded-lg bg-white border border-gray-200 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Phone</label>
                        <input
                          type="tel"
                          value={newClientPhone}
                          onChange={(e) => setNewClientPhone(e.target.value)}
                          placeholder="+1 (555) 123-4567"
                          className="w-full px-3 py-2 rounded-lg bg-white border border-gray-200 text-sm"
                        />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={handleCreateClient}
                        disabled={saving || !newClientName.trim()}
                        className="px-4 py-2 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-lg disabled:opacity-50"
                      >
                        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Create & Select'}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setShowNewClientForm(false);
                          setNewClientName('');
                          setNewClientEmail('');
                          setNewClientPhone('');
                        }}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 rounded-lg"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Service Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Service</label>
                <select
                  value={formServiceId}
                  onChange={(e) => setFormServiceId(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-white border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                >
                  <option value="">No service</option>
                  {services.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.name} ({service.currency} {service.price})
                    </option>
                  ))}
                </select>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={formStartDate}
                    onChange={(e) => setFormStartDate(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg bg-white border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="time"
                    value={formStartTime}
                    onChange={(e) => setFormStartTime(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg bg-white border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                  />
                </div>
              </div>

              {/* Duration & Status */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Duration (minutes)</label>
                  <input
                    type="number"
                    value={formDuration}
                    onChange={(e) => setFormDuration(e.target.value)}
                    min="15"
                    step="15"
                    className="w-full px-4 py-2.5 rounded-lg bg-white border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value as any)}
                    className="w-full px-4 py-2.5 rounded-lg bg-white border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                <textarea
                  value={formNotes}
                  onChange={(e) => setFormNotes(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2.5 rounded-lg bg-white border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                  placeholder="Additional notes about this booking..."
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6 pt-6 border-t border-gray-200">
              <button
                onClick={handleSaveBooking}
                disabled={saving || !formClientId || !formStartDate || !formStartTime}
                className="flex-1 px-6 py-3 rounded-lg bg-gradient-to-br from-[#1E1E5F] to-[#7B4FFF] text-white font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin inline mr-2" />
                    Saving...
                  </>
                ) : (
                  editingBooking ? 'Update Booking' : 'Create Booking'
                )}
              </button>
              <button
                onClick={handleCloseModal}
                className="px-6 py-3 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 font-medium transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && deletingId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Booking</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this booking? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setDeletingId(null);
                }}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => deletingId !== null && handleDeleteBooking(deletingId)}
                disabled={deletingId === null || isDeleting}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium disabled:opacity-50"
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin inline mr-2" />
                    Deleting...
                  </>
                ) : (
                  'Delete'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
