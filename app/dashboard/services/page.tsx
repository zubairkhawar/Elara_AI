'use client';

import { useEffect, useState } from 'react';
import { Plus, Trash2, Edit2, Check, X, DollarSign, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

type Service = {
  id: number;
  name: string;
  price: string;
  currency: string;
  is_active: boolean;
};

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

export default function ServicesPage() {
  const { user } = useAuth();

  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<number | 'new' | null>(null);

  const [newName, setNewName] = useState('');
  const [newPrice, setNewPrice] = useState('');

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState('');
  const [editPrice, setEditPrice] = useState('');

  const [error, setError] = useState('');

  const accessToken =
    typeof window !== 'undefined'
      ? localStorage.getItem('elara_access_token')
      : null;

  const getHeaders = (): HeadersInit => {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`;
    }
    return headers;
  };

  const fetchServices = async () => {
    if (!accessToken) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/bookings/services/`, {
        headers: getHeaders(),
      });
      if (!res.ok) {
        throw new Error('Failed to load services');
      }
      const data = await res.json();
      setServices(
        data.map((s: any) => ({
          id: s.id,
          name: s.name,
          price: String(s.price),
          currency: s.currency,
          is_active: s.is_active,
        })),
      );
    } catch (err: any) {
      setError(err?.message || 'Failed to load services');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newPrice.trim()) return;
    if (!accessToken) return;

    setSavingId('new');
    setError('');
    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/bookings/services/`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({
          name: newName.trim(),
          price: newPrice.trim(),
          currency: 'USD',
          is_active: true,
        }),
      });
      if (!res.ok) {
        throw new Error('Failed to add service');
      }
      setNewName('');
      setNewPrice('');
      await fetchServices();
    } catch (err: any) {
      setError(err?.message || 'Failed to add service');
    } finally {
      setSavingId(null);
    }
  };

  const startEdit = (service: Service) => {
    setEditingId(service.id);
    setEditName(service.name);
    setEditPrice(service.price);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditName('');
    setEditPrice('');
  };

  const handleUpdate = async (id: number) => {
    const service = services.find((s) => s.id === id);
    if (!service || !accessToken) return;

    setSavingId(id);
    setError('');
    try {
      const res = await fetch(
        `${API_BASE_URL}/api/v1/bookings/services/${id}/`,
        {
          method: 'PATCH',
          headers: getHeaders(),
          body: JSON.stringify({
            name: editName.trim(),
            price: editPrice.trim(),
          }),
        },
      );
      if (!res.ok) {
        throw new Error('Failed to update service');
      }
      cancelEdit();
      await fetchServices();
    } catch (err: any) {
      setError(err?.message || 'Failed to update service');
    } finally {
      setSavingId(null);
    }
  };

  const handleDelete = async (id: number) => {
    if (!accessToken) return;
    setSavingId(id);
    setError('');
    try {
      const res = await fetch(
        `${API_BASE_URL}/api/v1/bookings/services/${id}/`,
        {
          method: 'DELETE',
          headers: accessToken
            ? { Authorization: `Bearer ${accessToken}` }
            : {},
        },
      );
      if (!res.ok && res.status !== 204) {
        throw new Error('Failed to delete service');
      }
      await fetchServices();
    } catch (err: any) {
      setError(err?.message || 'Failed to delete service');
    } finally {
      setSavingId(null);
    }
  };

  return (
    <div className="space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-8">
      {/* Header */}
      <div className="mb-4 sm:mb-5 md:mb-6">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-3">
          Services
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl">
          Define the services your Vapi agent can offer callers, including
          pricing. Currency configuration will be handled later in account
          settings.
        </p>
      </div>

      {/* New service form */}
      <form
        onSubmit={handleCreate}
        className="rounded-xl bg-white border border-gray-200 shadow-sm p-4 sm:p-5 md:p-6 space-y-3 sm:space-y-4"
      >
        <div className="flex items-center justify-between gap-2 sm:gap-4 mb-1">
          <p className="font-semibold text-gray-900 text-sm sm:text-base">
            Add service
          </p>
          {user && (
            <p className="text-xs text-gray-400">
              For: <span className="font-medium">{user.business_name || user.email}</span>
            </p>
          )}
        </div>
        <div className="flex flex-col md:flex-row gap-3 sm:gap-4">
          <div className="flex-1">
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
              Service name
            </label>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="e.g. Haircut"
              className="w-full px-3 sm:px-4 py-2.5 rounded-lg bg-white border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 text-sm"
            />
          </div>
          <div className="w-full md:w-48">
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
              Price
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <DollarSign className="w-4 h-4" />
              </span>
              <input
                type="number"
                min="0"
                step="0.01"
                value={newPrice}
                onChange={(e) => setNewPrice(e.target.value)}
                placeholder="20"
                className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-white border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 text-sm"
              />
            </div>
          </div>
          <div className="md:self-end">
            <button
              type="submit"
              disabled={!newName.trim() || !newPrice.trim() || savingId === 'new'}
              className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-lg bg-gradient-to-br from-[#1E1E5F] to-[#7B4FFF] text-white text-sm font-semibold hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {savingId === 'new' ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  Add
                </>
              )}
            </button>
          </div>
        </div>
      </form>

      {/* Error */}
      {error && (
        <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          {error}
        </div>
      )}

      {/* List */}
      <div className="rounded-xl bg-white border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-4 sm:px-5 md:px-6 py-3 border-b border-gray-200 flex items-center justify-between">
          <p className="text-sm font-medium text-gray-800">
            Active services ({services.length})
          </p>
        </div>

        {loading ? (
          <div className="px-4 sm:px-5 md:px-6 py-6 flex items-center justify-center text-gray-500 text-sm">
            <Loader2 className="w-5 h-5 animate-spin mr-2" />
            Loading services…
          </div>
        ) : services.length === 0 ? (
          <div className="px-4 sm:px-5 md:px-6 py-6 text-center text-sm text-gray-500">
            No services yet. Add your first service above to let the agent offer
            it on calls.
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {services.map((service) => {
              const isEditing = editingId === service.id;
              const isSaving = savingId === service.id;
              return (
                <div
                  key={service.id}
                  className="px-4 sm:px-5 md:px-6 py-3 sm:py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="flex-1 min-w-0">
                    {isEditing ? (
                      <div className="flex flex-col md:flex-row gap-3 md:gap-4">
                        <div className="flex-1">
                          <input
                            type="text"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg bg-white border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                          />
                        </div>
                        <div className="w-full md:w-40">
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                              <DollarSign className="w-4 h-4" />
                            </span>
                            <input
                              type="number"
                              min="0"
                              step="0.01"
                              value={editPrice}
                              onChange={(e) => setEditPrice(e.target.value)}
                              className="w-full pl-9 pr-3 py-2 rounded-lg bg-white border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                            />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <p className="font-medium text-gray-900 text-sm sm:text-base">
                          {service.name}
                        </p>
                        <p className="text-xs sm:text-sm text-gray-500 flex items-center gap-1 mt-0.5">
                          <DollarSign className="w-3 h-3" />
                          {service.price} {service.currency}
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    {isEditing ? (
                      <>
                        <button
                          type="button"
                          onClick={() => handleUpdate(service.id)}
                          disabled={isSaving}
                          className="inline-flex items-center justify-center rounded-lg border border-emerald-500 text-emerald-600 hover:bg-emerald-50 px-2.5 py-1.5 text-xs font-medium disabled:opacity-60"
                        >
                          {isSaving ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Check className="w-4 h-4" />
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={cancelEdit}
                          disabled={isSaving}
                          className="inline-flex items-center justify-center rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 px-2.5 py-1.5 text-xs font-medium disabled:opacity-60"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          type="button"
                          onClick={() => startEdit(service)}
                          className="inline-flex items-center justify-center rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 px-2.5 py-1.5 text-xs font-medium"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(service.id)}
                          disabled={isSaving}
                          className="inline-flex items-center justify-center rounded-lg border border-red-200 text-red-600 hover:bg-red-50 px-2.5 py-1.5 text-xs font-medium disabled:opacity-60"
                        >
                          {isSaving ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Trash2 className="w-4 h-4" />
                          )}
                        </button>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

