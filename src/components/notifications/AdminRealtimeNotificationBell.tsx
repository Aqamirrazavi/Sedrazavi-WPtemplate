import React, { useState, useRef, useEffect } from 'react';
import {
  Bell, Volume2, VolumeX, CheckCheck, Trash2, Phone,
  ExternalLink, Sparkles, AlertCircle, Clock, ShieldCheck,
  User, Copy, Check
} from 'lucide-react';
import { useAdminNotifications, LeadSubmission } from '../../context/NotificationContext';

interface AdminRealtimeNotificationBellProps {
  onOpenActionDrawer?: () => void;
}

export const AdminRealtimeNotificationBell: React.FC<AdminRealtimeNotificationBellProps> = ({
  onOpenActionDrawer
}) => {
  const {
    submissions,
    unreadCount,
    soundEnabled,
    setSoundEnabled,
    markAsRead,
    markAllAsRead,
    deleteSubmission,
    triggerDemoLead
  } = useAdminNotifications();

  const [isOpen, setIsOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleCopyPhone = (phone: string, id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(phone);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {/* Bell Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2.5 rounded-2xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 hover:border-amber-500/50 text-slate-200 transition-all cursor-pointer shadow-md group"
        title="مرکز اعلانات بلادرنگ فرم‌ها و لیدهای مدیر"
      >
        <Bell className={`w-5 h-5 transition-transform group-hover:rotate-12 ${unreadCount > 0 ? 'text-amber-400' : 'text-slate-400'}`} />
        
        {unreadCount > 0 && (
          <>
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-rose-600 text-[10px] font-black text-white shadow-lg shadow-rose-600/50 ring-2 ring-slate-950">
              {unreadCount > 9 ? '+9' : unreadCount}
            </span>
            <span className="absolute -top-1 -right-1 flex h-5 w-5 animate-ping rounded-full bg-rose-500 opacity-75" />
          </>
        )}
      </button>

      {/* Floating Notification Drawer */}
      {isOpen && (
        <div className="absolute left-0 mt-3 w-80 sm:w-96 rounded-3xl bg-slate-950/95 backdrop-blur-2xl border border-slate-800 shadow-2xl z-50 overflow-hidden text-right animate-in fade-in zoom-in-95 duration-200 font-sans">
          {/* Header */}
          <div className="p-4 border-b border-slate-800/80 bg-slate-900/60 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <Bell className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>هشدار لیدها و فرم‌های جدید</span>
                  {unreadCount > 0 && (
                    <span className="text-[10px] bg-rose-500/20 text-rose-400 border border-rose-500/30 px-1.5 py-0.2 rounded-full font-mono">
                      {unreadCount} جدید
                    </span>
                  )}
                </h4>
                <p className="text-[10px] text-slate-400">اطلاع‌رسانی بلادرنگ همراه با زنگ صوتی مرورگر</p>
              </div>
            </div>

            {/* Quick Controls */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={`p-1.5 rounded-lg text-xs transition-colors ${
                  soundEnabled
                    ? 'text-amber-400 hover:bg-amber-400/10'
                    : 'text-slate-500 hover:bg-slate-800'
                }`}
                title={soundEnabled ? 'صدا روشن است' : 'صدا قطع است'}
              >
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>

              {unreadCount > 0 && (
                <button
                  type="button"
                  onClick={markAllAsRead}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-400 hover:bg-emerald-400/10 text-xs transition-colors"
                  title="خواندن همه"
                >
                  <CheckCheck className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Test Lead Simulator Toolbar for Admin */}
          <div className="px-4 py-2.5 bg-slate-900/40 border-b border-slate-800/60 flex items-center justify-between gap-2">
            <span className="text-[11px] text-slate-400">تست بلادرنگ مدیر:</span>
            <button
              type="button"
              onClick={triggerDemoLead}
              className="px-2.5 py-1 rounded-xl bg-gradient-to-r from-amber-500/20 to-orange-500/20 hover:from-amber-500/30 hover:to-orange-500/30 border border-amber-500/30 text-amber-300 font-bold text-[11px] flex items-center gap-1 transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>ارسال فرم آزمایشی کاربر</span>
            </button>
          </div>

          {/* Submissions List */}
          <div className="max-h-80 overflow-y-auto divide-y divide-slate-800/60">
            {submissions.length === 0 ? (
              <div className="py-8 text-center text-slate-500 space-y-2">
                <ShieldCheck className="w-8 h-8 mx-auto text-slate-600 opacity-60" />
                <p className="text-xs">هیچ اعلان یا پیام جدیدی وجود ندارد</p>
              </div>
            ) : (
              submissions.map((sub: LeadSubmission) => (
                <div
                  key={sub.id}
                  onClick={() => markAsRead(sub.id)}
                  className={`p-3.5 transition-colors cursor-pointer text-right group ${
                    !sub.read
                      ? 'bg-amber-500/5 hover:bg-amber-500/10 border-r-2 border-amber-400'
                      : 'hover:bg-slate-900/50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      <span className="text-xs font-bold text-white">{sub.clientName}</span>
                      {!sub.read && (
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                      )}
                    </div>
                    <span className="text-[10px] text-slate-500 flex items-center gap-1 font-mono">
                      <Clock className="w-3 h-3" />
                      {sub.timestamp}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 line-clamp-1 mb-1.5 font-medium">
                    {sub.subject}
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-800/40">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-lg border border-slate-700/60">
                        {sub.service}
                      </span>
                      {sub.amount && (
                        <span className="text-[10px] text-emerald-400 font-mono font-bold">
                          {sub.amount}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={(e) => handleCopyPhone(sub.phone, sub.id, e)}
                        className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] transition-colors flex items-center gap-1"
                        title="کپی شماره تماس"
                      >
                        {copiedId === sub.id ? (
                          <Check className="w-3 h-3 text-emerald-400" />
                        ) : (
                          <Copy className="w-3 h-3 text-slate-400" />
                        )}
                        <span className="font-mono text-[9px]">{sub.phone}</span>
                      </button>

                      <a
                        href={`tel:${sub.phone}`}
                        onClick={(e) => e.stopPropagation()}
                        className="p-1 rounded bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 text-[10px] transition-colors"
                        title="تماس فوری"
                      >
                        <Phone className="w-3 h-3" />
                      </a>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteSubmission(sub.id);
                        }}
                        className="p-1 rounded hover:bg-rose-500/20 text-slate-500 hover:text-rose-400 text-[10px] transition-colors"
                        title="حذف اعلان"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="p-3 bg-slate-900/80 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
            <span className="text-slate-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>سیستم اعلان آنلاین فعال است</span>
            </span>

            {onOpenActionDrawer && (
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  onOpenActionDrawer();
                }}
                className="text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1 transition-colors"
              >
                <span>کشوی اقدام فوری</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
