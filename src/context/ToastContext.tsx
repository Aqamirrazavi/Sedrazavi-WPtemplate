import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'warning' | 'error' | 'info';

export interface ToastItem {
  id: string;
  title?: string;
  message: string;
  type?: ToastType;
  duration?: number;
}

interface ToastContextType {
  showToast: (toast: Omit<ToastItem, 'id'>) => void;
  success: (message: string, title?: string) => void;
  error: (message: string, title?: string) => void;
  warning: (message: string, title?: string) => void;
  info: (message: string, title?: string) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback((toast: Omit<ToastItem, 'id'>) => {
    const id = 'toast_' + Math.random().toString(36).substring(2, 9);
    const duration = toast.duration ?? 5000;
    const newToast: ToastItem = { ...toast, id };

    setToasts((prev) => [newToast, ...prev].slice(0, 5)); // Keep max 5 visible

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  }, [removeToast]);

  const success = useCallback((message: string, title?: string) => {
    showToast({ message, title: title || 'عملیات موفق', type: 'success' });
  }, [showToast]);

  const error = useCallback((message: string, title?: string) => {
    showToast({ message, title: title || 'خطا در عملیات', type: 'error' });
  }, [showToast]);

  const warning = useCallback((message: string, title?: string) => {
    showToast({ message, title: title || 'هشدار', type: 'warning' });
  }, [showToast]);

  const info = useCallback((message: string, title?: string) => {
    showToast({ message, title: title || 'اطلاعیه', type: 'info' });
  }, [showToast]);

  // Global window listener for custom event
  React.useEffect(() => {
    const handleCustomToast = (event: Event) => {
      const customEvent = event as CustomEvent<{ message: string; title?: string; type?: ToastType; duration?: number }>;
      if (customEvent.detail && customEvent.detail.message) {
        showToast(customEvent.detail);
      }
    };

    window.addEventListener('sedrazavi-show-toast', handleCustomToast);
    return () => {
      window.removeEventListener('sedrazavi-show-toast', handleCustomToast);
    };
  }, [showToast]);

  return (
    <ToastContext.Provider value={{ showToast, success, error, warning, info, removeToast }}>
      {children}
      {/* Toast Render Container */}
      <div 
        className="fixed bottom-6 left-6 z-[9999] flex flex-col gap-3 max-w-sm w-full pointer-events-none"
        dir="rtl"
        aria-live="polite"
      >
        {toasts.map((t) => {
          const type = t.type || 'info';
          let borderClass = 'border-[#D4AF37]/50';
          let bgClass = 'bg-[#0B132B]/95 text-white';
          let icon = <Info className="w-5 h-5 text-blue-400 shrink-0" />;

          if (type === 'success') {
            borderClass = 'border-emerald-500/50';
            icon = <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />;
          } else if (type === 'warning') {
            borderClass = 'border-amber-500/50';
            icon = <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />;
          } else if (type === 'error') {
            borderClass = 'border-rose-500/50';
            icon = <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />;
          }

          return (
            <div
              key={t.id}
              className={`pointer-events-auto p-4 rounded-2xl border ${borderClass} ${bgClass} shadow-2xl backdrop-blur-md flex items-start gap-3 transition-all duration-300 animate-in fade-in slide-in-from-bottom-4`}
            >
              {icon}
              <div className="flex-1 space-y-1 text-right">
                {t.title && <h5 className="font-bold text-xs text-[#D4AF37]">{t.title}</h5>}
                <p className="text-xs text-slate-200 leading-relaxed">{t.message}</p>
              </div>
              <button
                onClick={() => removeToast(t.id)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors shrink-0"
                aria-label="بستن اعلان"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    // Graceful fallback if called outside provider
    return {
      showToast: (t) => {
        window.dispatchEvent(new CustomEvent('sedrazavi-show-toast', { detail: t }));
      },
      success: (msg, title) => {
        window.dispatchEvent(new CustomEvent('sedrazavi-show-toast', { detail: { message: msg, title: title || 'موفقیت', type: 'success' } }));
      },
      error: (msg, title) => {
        window.dispatchEvent(new CustomEvent('sedrazavi-show-toast', { detail: { message: msg, title: title || 'خطا', type: 'error' } }));
      },
      warning: (msg, title) => {
        window.dispatchEvent(new CustomEvent('sedrazavi-show-toast', { detail: { message: msg, title: title || 'هشدار', type: 'warning' } }));
      },
      info: (msg, title) => {
        window.dispatchEvent(new CustomEvent('sedrazavi-show-toast', { detail: { message: msg, title: title || 'اطلاعیه', type: 'info' } }));
      },
      removeToast: () => {},
    };
  }
  return context;
};
