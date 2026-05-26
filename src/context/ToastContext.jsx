import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { FiCheckCircle, FiAlertTriangle, FiInfo, FiX } from 'react-icons/fi';
import { TOAST_DURATION } from '../utils/constants';

const ToastContext = createContext(null);

const toastIcons = {
  success: FiCheckCircle,
  error: FiAlertTriangle,
  info: FiInfo,
};

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const timers = useRef(new Map());

  const removeToast = useCallback((id) => {
    setToasts((currentToasts) => currentToasts.filter((toast) => toast.id !== id));
    const timer = timers.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timers.current.delete(id);
    }
  }, []);

  const addToast = useCallback((message, type = 'success') => {
    const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    setToasts((currentToasts) => [...currentToasts, { id, message, type }]);

    const timer = setTimeout(() => removeToast(id), TOAST_DURATION);
    timers.current.set(id, timer);
  }, [removeToast]);

  useEffect(() => () => {
    timers.current.forEach((timer) => clearTimeout(timer));
    timers.current.clear();
  }, []);

  const value = useMemo(
    () => ({
      addToast,
      removeToast,
    }),
    [addToast, removeToast],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastViewport toasts={toasts} onDismiss={removeToast} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

function ToastViewport({ toasts, onDismiss }) {
  if (!toasts.length) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex w-[min(92vw,22rem)] flex-col gap-3">
      {toasts.map((toast) => {
        const Icon = toastIcons[toast.type] || FiInfo;
        const toneClasses =
          toast.type === 'error'
            ? 'border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-900/50 dark:bg-rose-950/80 dark:text-rose-200'
            : toast.type === 'info'
              ? 'border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-900/50 dark:bg-sky-950/80 dark:text-sky-200'
              : 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-950/80 dark:text-emerald-200';

        return (
          <div
            key={toast.id}
            className={`flex items-start gap-3 rounded-2xl border p-4 shadow-soft backdrop-blur ${toneClasses}`}
          >
            <Icon className="mt-0.5 text-lg" />
            <p className="flex-1 text-sm font-medium leading-6">{toast.message}</p>
            <button
              type="button"
              onClick={() => onDismiss(toast.id)}
              className="rounded-full p-1 transition hover:bg-black/5 dark:hover:bg-white/10"
              aria-label="Dismiss notification"
            >
              <FiX />
            </button>
          </div>
        );
      })}
    </div>
  );
}
