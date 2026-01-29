'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { CheckCircle2, XCircle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info';

export interface ToastItem {
  id: string;
  message: string;
  type: ToastType;
  createdAt: number;
}

interface ToastContextValue {
  toasts: ToastItem[];
  addToast: (message: string, type?: ToastType) => void;
  removeToast: (id: string) => void;
  success: (message: string) => void;
  error: (message: string) => void;
  info: (message: string) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

const TOAST_DURATION_MS = 4500;

function ToastList({
  toasts,
  removeToast,
}: {
  toasts: ToastItem[];
  removeToast: (id: string) => void;
}) {
  const Icon = (type: ToastType) => {
    switch (type) {
      case 'success':
        return CheckCircle2;
      case 'error':
        return XCircle;
      default:
        return Info;
    }
  };

  const typeStyles: Record<ToastType, string> = {
    success: 'bg-emerald-50 border-emerald-200 text-emerald-800 shadow-emerald-100',
    error: 'bg-red-50 border-red-200 text-red-800 shadow-red-100',
    info: 'bg-blue-50 border-blue-200 text-blue-800 shadow-blue-100',
  };

  const iconStyles: Record<ToastType, string> = {
    success: 'text-emerald-600',
    error: 'text-red-600',
    info: 'text-blue-600',
  };

  return (
    <div
      className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 max-w-md w-full pointer-events-none sm:bottom-6 sm:right-6"
      aria-live="polite"
      aria-label="Notifications"
    >
      {toasts.map((toast) => {
        const IconComponent = Icon(toast.type);
        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 rounded-xl border px-4 py-3 shadow-lg transition-all duration-300 ${typeStyles[toast.type]}`}
            role="alert"
          >
            <IconComponent
              className={`h-5 w-5 flex-shrink-0 mt-0.5 ${iconStyles[toast.type]}`}
            />
            <p className="flex-1 text-sm font-medium leading-snug">
              {toast.message}
            </p>
            <button
              type="button"
              onClick={() => removeToast(toast.id)}
              className="flex-shrink-0 p-1 rounded-lg hover:bg-black/5 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-black/20"
              aria-label="Dismiss"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const timeoutsRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  const removeToast = useCallback((id: string) => {
    const t = timeoutsRef.current.get(id);
    if (t) {
      clearTimeout(t);
      timeoutsRef.current.delete(id);
    }
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const addToast = useCallback(
    (message: string, type: ToastType = 'info') => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
      const item: ToastItem = {
        id,
        message,
        type,
        createdAt: Date.now(),
      };
      setToasts((prev) => [...prev, item]);

      const timeoutId = setTimeout(() => {
        removeToast(id);
        timeoutsRef.current.delete(id);
      }, TOAST_DURATION_MS);
      timeoutsRef.current.set(id, timeoutId);
    },
    [removeToast]
  );

  const success = useCallback((message: string) => addToast(message, 'success'), [addToast]);
  const error = useCallback((message: string) => addToast(message, 'error'), [addToast]);
  const info = useCallback((message: string) => addToast(message, 'info'), [addToast]);

  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach((t) => clearTimeout(t));
      timeoutsRef.current.clear();
    };
  }, []);

  const value: ToastContextValue = {
    toasts,
    addToast,
    removeToast,
    success,
    error,
    info,
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastList toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
