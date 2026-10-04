import React, { useState, useEffect, useRef } from 'react';
import {
  Bell,
  X,
  AlertTriangle,
  Clock,
  MessageSquare,
  CheckCircle2,
  Calendar,
  Scale,
  User,
  ArrowRight,
  ExternalLink,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Filter,
  Eye,
  Send,
  Sparkles,
  ChevronDown,
  ShieldCheck,
  Check,
  FileText,
} from 'lucide-react';

export type NotificationType = 'court_deadline' | 'client_message' | 'system_alert';
export type NotificationUrgency = 'critical' | 'warning' | 'normal';

export interface LawyerNotificationItem {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  caseNumber?: string;
  clientName?: string;
  courtBranch?: string;
  deadlineDate?: string;
  daysRemaining?: number;
  urgency: NotificationUrgency;
  isRead: boolean;
  actionUrl?: string;
  replyExcerpt?: string;
}

const INITIAL_NOTIFICATIONS: LawyerNotificationItem[] = [
  {
    id: 'notif-1',
    type: 'court_deadline',
    title: 'موعد بسیار فوری: جلسه دادگاه شعبه ۱۲ بدوی',
    message: 'جلسه رسیدگی به پرونده الزام به تنظیم سند ملک ونک (موکل: مهندس رادمنش).',
    timestamp: '۱۰ دقیقه پیش',
    caseNumber: '۱۴۰۳-۹۸۲۷۳-ونک',
    clientName: 'مهندس علیرضا رادمنش',
    courtBranch: 'شعبه ۱۲ دادگاه عمومی حقوقی شهید بهشتی',
    deadlineDate: 'سه‌شنبه ۱۵ مهر ۱۴۰۳ - ساعت ۰۹:۳۰',
    daysRemaining: 1,
    urgency: 'critical',
    isRead: false,
  },
  {
    id: 'notif-2',
    type: 'client_message',
    title: 'پیام جدید موکل: ارسال فیش واریز کارشناسی',
    message: 'مهندس آرش جهانبخش: «خانم دکتر، رسید فیش واریزی کارشناسی ۳ نفره در سامانه آپلود شد.»',
    timestamp: '۲۵ دقیقه پیش',
    caseNumber: '۱۴۰۳-۳۴۱۱۲-داوری',
    clientName: 'مهندس آرش جهانبخش',
    urgency: 'normal',
    isRead: false,
    replyExcerpt: 'رسید فیش واریزی کارشناسی ۳ نفره در سامانه آپلود شد.',
  },
  {
    id: 'notif-3',
    type: 'court_deadline',
    title: 'موعد تجدیدنظرخواهی: مهلت ماده ۳۶۴ آیین دادرسی',
    message: 'آخرین مهلت تقدیم دادخواست تجدیدنظر پرونده سرقفلی پاساژ ونک (خوانده: هلدینگ میرباقری).',
    timestamp: '۱ ساعت پیش',
    caseNumber: '۱۴۰۳-۵۵۶۱۱-تجدیدنظر',
    clientName: 'هلدینگ میرباقری',
    courtBranch: 'دادگاه تجدیدنظر استان تهران',
    deadlineDate: 'پنج‌شنبه ۱۷ مهر ۱۴۰۳',
    daysRemaining: 3,
    urgency: 'warning',
    isRead: false,
  },
  {
    id: 'notif-4',
    type: 'client_message',
    title: 'پیام جدید موکل: استعلام وضعیت وقت رسیدگی',
    message: 'خانم بهاره کاظمیان: «آیا تاریخ دادگاه خانواده مشخص شد یا نیاز به حضور من در شعبه است؟»',
    timestamp: '۲ ساعت پیش',
    caseNumber: '۱۴۰۳-۸۸۹۹۲-خانواده',
    clientName: 'خانم بهاره کاظمیان',
    urgency: 'normal',
    isRead: true,
    replyExcerpt: 'آیا تاریخ دادگاه خانواده مشخص شد یا نیاز به حضور من در شعبه است؟',
  },
  {
    id: 'notif-5',
    type: 'court_deadline',
    title: 'موعد جلسه داوری مرکز داوری اتاق بازرگانی',
    message: 'استماع فنی دعوای اختلاف ضمانت‌نامه بانکی و اسناد اعتباری تجهیزات نیروگاهی.',
    timestamp: '۴ ساعت پیش',
    caseNumber: '۱۴۰۳-۳۴۱۱۲-داوری',
    clientName: 'شرکت سرمایه‌گذاری کیمیا پارس',
    courtBranch: 'مرکز داوری اتاق بازرگانی ایران',
    deadlineDate: 'یکشنبه ۲۷ مهر ۱۴۰۳ - ساعت ۱۱:۰۰',
    daysRemaining: 13,
    urgency: 'normal',
    isRead: true,
  },
];

// Pool for continuous dynamic notifications
const SIMULATION_POOL: Omit<LawyerNotificationItem, 'id' | 'timestamp' | 'isRead'>[] = [
  {
    type: 'court_deadline',
    title: 'اخطاریه رفع نقص از سامانه ثنا',
    message: 'مهلت ۱۰ روزه تودیع دستمزد کارشناس رسمی ارزیابی املاک در شعبه ۲۷.',
    caseNumber: '۱۴۰۳-۶۶۷۱۸-ثنا',
    clientName: 'دکتر هادی فرهمند',
    courtBranch: 'شعبه ۲۷ مجتمع قضایی شهید صدر',
    deadlineDate: 'شنبه ۱۹ مهر ۱۴۰۳',
    daysRemaining: 5,
    urgency: 'warning',
  },
  {
    type: 'client_message',
    title: 'پیام فوری موکل: تماس با کارشناس رسمی',
    message: 'حاج مصطفی اکبری: «سلام سرکار خانم وکیل، کارشناس رسمی برای بازدید فردا ساعت ۱۰ هماهنگ شد.»',
    caseNumber: '۱۴۰۳-۴۴۳۲۰-ملکی',
    clientName: 'حاج مصطفی اکبری',
    urgency: 'normal',
    replyExcerpt: 'کارشناس رسمی برای بازدید فردا ساعت ۱۰ هماهنگ شد.',
  },
  {
    type: 'court_deadline',
    title: 'موعد انقضای مهلت اعتراض به نظریه کارشناسی',
    message: 'مهلت ۷ روزه اعتراض به نظریه هیئت ۳ نفره نقشه برداری و تحدید حدود.',
    caseNumber: '۱۴۰۳-۱۱۹۰۲-ثبتی',
    clientName: 'شرکت پارس تکنولوژی',
    courtBranch: 'شعبه ۸ دادگاه حقوقی',
    deadlineDate: 'چهارشنبه ۱۶ مهر ۱۴۰۳',
    daysRemaining: 2,
    urgency: 'critical',
  },
  {
    type: 'client_message',
    title: 'موکل جدید: ارسال مستندات قرارداد ارزی',
    message: 'مهندس سهرابی: «نسخه نهایی قرارداد ارزی و ترجمه رسمی مهر دادگستری ارسال شد.»',
    caseNumber: '۱۴۰۳-۹۰۲۳۴-قراردادها',
    clientName: 'شرکت بین‌المللی ارس',
    urgency: 'normal',
    replyExcerpt: 'نسخه نهایی قرارداد ارزی و ترجمه رسمی ارسال شد.',
  },
];

interface LawyerRealtimeToastNotifierProps {
  onSelectCase?: (caseNumber: string) => void;
  onOpenMessageReply?: (clientName: string, message: string) => void;
}

export const LawyerRealtimeToastNotifier: React.FC<LawyerRealtimeToastNotifierProps> = ({
  onSelectCase,
  onOpenMessageReply,
}) => {
  const [notifications, setNotifications] = useState<LawyerNotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [activeToasts, setActiveToasts] = useState<LawyerNotificationItem[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [autoSimulate, setAutoSimulate] = useState(true);
  const [activeFilter, setActiveFilter] = useState<'all' | 'court_deadline' | 'client_message' | 'unread'>('all');
  const [replyModalTarget, setReplyModalTarget] = useState<LawyerNotificationItem | null>(null);
  const [replyText, setReplyText] = useState('');
  const [replySuccessMessage, setReplySuccessMessage] = useState<string | null>(null);

  // Play pleasant subtle chime for notifications
  const playChime = () => {
    if (!soundEnabled || typeof window === 'undefined') return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15); // A5

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.4);
    } catch {
      // Audio autoplay restrictions or unsupported
    }
  };

  // Push a new toast alert
  const triggerToast = (item: LawyerNotificationItem) => {
    setActiveToasts((prev) => {
      // Keep max 3 active toasts at a time
      const filtered = prev.filter((t) => t.id !== item.id);
      return [item, ...filtered].slice(0, 3);
    });
    playChime();
  };

  // Dismiss a toast
  const dismissToast = (id: string) => {
    setActiveToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Auto dismiss toast after 8 seconds
  useEffect(() => {
    if (activeToasts.length === 0) return;
    const timer = setTimeout(() => {
      setActiveToasts((prev) => prev.slice(0, prev.length - 1));
    }, 7500);
    return () => clearTimeout(timer);
  }, [activeToasts]);

  // Push the initial critical deadline toast on mount
  useEffect(() => {
    const initialUrgent = notifications.find((n) => n.urgency === 'critical');
    if (initialUrgent) {
      const timer = setTimeout(() => {
        triggerToast(initialUrgent);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  // Real-time periodic simulator (pushes a simulated notification every 45 seconds if enabled)
  const poolIndexRef = useRef(0);
  useEffect(() => {
    if (!autoSimulate) return;

    const interval = setInterval(() => {
      const template = SIMULATION_POOL[poolIndexRef.current % SIMULATION_POOL.length];
      poolIndexRef.current += 1;

      const newNotif: LawyerNotificationItem = {
        ...template,
        id: `sim-${Date.now()}`,
        timestamp: 'هم‌اکنون',
        isRead: false,
      };

      setNotifications((prev) => [newNotif, ...prev]);
      triggerToast(newNotif);
    }, 45000);

    return () => clearInterval(interval);
  }, [autoSimulate]);

  // Trigger manual simulation
  const handleManualTrigger = (type: NotificationType) => {
    const template =
      type === 'court_deadline'
        ? SIMULATION_POOL[0]
        : SIMULATION_POOL[1];

    const newNotif: LawyerNotificationItem = {
      ...template,
      id: `manual-${Date.now()}`,
      timestamp: 'لحظاتی پیش',
      isRead: false,
    };

    setNotifications((prev) => [newNotif, ...prev]);
    triggerToast(newNotif);
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const filteredNotifications = notifications.filter((n) => {
    if (activeFilter === 'court_deadline') return n.type === 'court_deadline';
    if (activeFilter === 'client_message') return n.type === 'client_message';
    if (activeFilter === 'unread') return !n.isRead;
    return true;
  });

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !replyModalTarget) return;

    setReplySuccessMessage(`پاسخ شما با موفقیت برای موکل (${replyModalTarget.clientName}) ارسال شد.`);
    markAsRead(replyModalTarget.id);

    setTimeout(() => {
      setReplySuccessMessage(null);
      setReplyModalTarget(null);
      setReplyText('');
    }, 2000);
  };

  return (
    <>
      {/* 1. Header Trigger Widget (Positioned in Lawyer Dashboard Toolbar) */}
      <div className="relative inline-flex items-center gap-2">
        <button
          type="button"
          onClick={() => setIsDrawerOpen(true)}
          className="relative px-3.5 py-2 rounded-xl bg-white dark:bg-[#0B132B] hover:bg-[#D4AF37]/10 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-800 hover:border-[#D4AF37]/50 text-xs font-bold flex items-center gap-2 transition-all shadow-sm cursor-pointer"
          title="مرکز هشدارهای زنده مواعد دادگاه و پیام‌های موکلین"
        >
          <div className="relative">
            <Bell className="w-4 h-4 text-[#D4AF37]" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose-500 rounded-full animate-ping" />
            )}
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose-500 rounded-full" />
            )}
          </div>
          <span>اعلان‌های زنده مواعد و پیام‌ها</span>
          {unreadCount > 0 && (
            <span className="px-1.5 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-mono font-black">
              {unreadCount}
            </span>
          )}
        </button>

        {/* Quick Simulation Dropdown / Toggle */}
        <div className="hidden sm:flex items-center gap-1 bg-gray-100 dark:bg-gray-800/80 p-1 rounded-xl border border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-1.5 rounded-lg text-xs transition-colors ${
              soundEnabled ? 'text-[#D4AF37] hover:bg-white dark:hover:bg-gray-700' : 'text-gray-400'
            }`}
            title={soundEnabled ? 'صدا فعال است' : 'صدا غیرفعال است'}
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={() => setAutoSimulate(!autoSimulate)}
            className={`p-1.5 rounded-lg text-xs transition-colors ${
              autoSimulate ? 'text-emerald-500 hover:bg-white dark:hover:bg-gray-700' : 'text-gray-400'
            }`}
            title={autoSimulate ? 'شبیه‌ساز بلادرنگ فعال است' : 'شبیه‌ساز متوقف است'}
          >
            {autoSimulate ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* 2. Floating Toast Stack (RTL: Top Right / Responsive Top Left) */}
      <div
        className="fixed top-20 right-4 sm:right-6 z-[9999] flex flex-col gap-3 pointer-events-none max-w-sm sm:max-w-md w-full"
        dir="rtl"
      >
        {activeToasts.map((toast) => {
          const isDeadline = toast.type === 'court_deadline';
          const isCritical = toast.urgency === 'critical';

          return (
            <div
              key={toast.id}
              className={`pointer-events-auto transform transition-all duration-300 ease-out animate-in slide-in-from-top-4 fade-in rounded-2xl shadow-2xl border p-4 text-right backdrop-blur-xl ${
                isDeadline
                  ? isCritical
                    ? 'bg-rose-950/90 dark:bg-rose-950/95 border-rose-500/60 text-white'
                    : 'bg-[#0B132B]/95 border-[#D4AF37]/50 text-white'
                  : 'bg-[#070D1E]/95 border-blue-500/50 text-white'
              }`}
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold shrink-0 ${
                      isDeadline
                        ? isCritical
                          ? 'bg-rose-500 text-white animate-pulse'
                          : 'bg-[#D4AF37] text-[#0B132B]'
                        : 'bg-blue-500 text-white'
                    }`}
                  >
                    {isDeadline ? <Clock className="w-4 h-4" /> : <MessageSquare className="w-4 h-4" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-black leading-tight">
                        {toast.title}
                      </span>
                      {toast.urgency === 'critical' && (
                        <span className="px-1.5 py-0.2 rounded-full bg-rose-500 text-white text-[9px] font-bold">
                          فوری
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-gray-300 block">
                      {toast.timestamp} {toast.caseNumber && `• بایگانی: ${toast.caseNumber}`}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => dismissToast(toast.id)}
                  className="p-1 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
                  title="بستن اعلان"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Message */}
              <p className="text-xs text-gray-200 mt-2.5 leading-relaxed">
                {toast.message}
              </p>

              {/* Deadline specific alert info */}
              {isDeadline && toast.deadlineDate && (
                <div className="mt-2.5 p-2 rounded-xl bg-black/30 border border-white/10 flex items-center justify-between text-[11px]">
                  <div className="flex items-center gap-1.5 text-amber-300 font-bold">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>موعد رسیدگی: {toast.deadlineDate}</span>
                  </div>
                  {toast.daysRemaining !== undefined && (
                    <span className="font-bold text-rose-300">
                      {toast.daysRemaining === 0
                        ? 'امروز'
                        : `${toast.daysRemaining} روز مانده`}
                    </span>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-2 mt-3 pt-2.5 border-t border-white/10">
                {isDeadline ? (
                  <button
                    onClick={() => {
                      dismissToast(toast.id);
                      markAsRead(toast.id);
                      if (toast.caseNumber && onSelectCase) {
                        onSelectCase(toast.caseNumber);
                      }
                    }}
                    className="px-2.5 py-1 rounded-lg bg-[#D4AF37] hover:bg-[#C4981C] text-[#0B132B] font-bold text-xs flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <span>بررسی پرونده</span>
                    <ArrowRight className="w-3 h-3 rotate-180" />
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      dismissToast(toast.id);
                      markAsRead(toast.id);
                      setReplyModalTarget(toast);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-bold text-xs flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <Send className="w-3 h-3" />
                    <span>پاسخ به موکل</span>
                  </button>
                )}

                <button
                  onClick={() => {
                    dismissToast(toast.id);
                    markAsRead(toast.id);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-gray-200 text-xs transition-colors cursor-pointer"
                >
                  خوانده شد
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. Slide-Over Notification Center Drawer */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-[9999] overflow-hidden" dir="rtl">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsDrawerOpen(false)}
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-white dark:bg-[#0B132B] shadow-2xl border-l border-gray-200 dark:border-gray-800 flex flex-col">
              
              {/* Drawer Header */}
              <div className="p-5 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-[#D4AF37]/20 text-[#D4AF37] flex items-center justify-center font-bold">
                    <Bell className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-gray-900 dark:text-white">
                      مرکز اعلان‌های بلادرنگ وکیل
                    </h2>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      هشدارهای مواعد دادگاه و ارتباطات موکلین
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="p-2 rounded-xl text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Quick Actions & Filters Bar */}
              <div className="p-3 bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1 overflow-x-auto text-xs font-bold">
                  <button
                    onClick={() => setActiveFilter('all')}
                    className={`px-2.5 py-1 rounded-lg transition-colors whitespace-nowrap ${
                      activeFilter === 'all'
                        ? 'bg-[#D4AF37] text-[#0B132B]'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800'
                    }`}
                  >
                    همه ({notifications.length})
                  </button>
                  <button
                    onClick={() => setActiveFilter('court_deadline')}
                    className={`px-2.5 py-1 rounded-lg transition-colors whitespace-nowrap ${
                      activeFilter === 'court_deadline'
                        ? 'bg-[#D4AF37] text-[#0B132B]'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800'
                    }`}
                  >
                    مواعـد ({notifications.filter((n) => n.type === 'court_deadline').length})
                  </button>
                  <button
                    onClick={() => setActiveFilter('client_message')}
                    className={`px-2.5 py-1 rounded-lg transition-colors whitespace-nowrap ${
                      activeFilter === 'client_message'
                        ? 'bg-[#D4AF37] text-[#0B132B]'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800'
                    }`}
                  >
                    پیام‌ها ({notifications.filter((n) => n.type === 'client_message').length})
                  </button>
                  <button
                    onClick={() => setActiveFilter('unread')}
                    className={`px-2.5 py-1 rounded-lg transition-colors whitespace-nowrap ${
                      activeFilter === 'unread'
                        ? 'bg-[#D4AF37] text-[#0B132B]'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800'
                    }`}
                  >
                    خوانده‌نشده ({unreadCount})
                  </button>
                </div>

                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-[11px] font-bold text-[#D4AF37] hover:underline shrink-0"
                  >
                    خواندن همه
                  </button>
                )}
              </div>

              {/* Notification Simulation Controls */}
              <div className="p-3 bg-amber-500/10 dark:bg-amber-500/15 border-b border-amber-500/20 flex items-center justify-between text-xs">
                <span className="text-[#AA820A] dark:text-[#F3E5AB] font-bold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  شبیه‌سازی دریافت اعلان جدید:
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleManualTrigger('court_deadline')}
                    className="px-2 py-1 rounded-lg bg-[#D4AF37] text-[#0B132B] font-bold text-[11px] hover:brightness-110"
                  >
                    + موعد دادگاه
                  </button>
                  <button
                    onClick={() => handleManualTrigger('client_message')}
                    className="px-2 py-1 rounded-lg bg-blue-600 text-white font-bold text-[11px] hover:brightness-110"
                  >
                    + پیام موکل
                  </button>
                </div>
              </div>

              {/* Notifications List */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {filteredNotifications.length === 0 ? (
                  <div className="py-12 text-center text-gray-500 dark:text-gray-400 space-y-2">
                    <CheckCircle2 className="w-10 h-10 mx-auto text-emerald-500 opacity-80" />
                    <p className="text-sm font-bold">هیچ اعلانی در این دسته‌بندی وجود ندارد.</p>
                    <p className="text-xs">تمامی مواعد دادگاه و پیام‌های موکلین رسیدگی شده‌اند.</p>
                  </div>
                ) : (
                  filteredNotifications.map((notif) => {
                    const isDeadline = notif.type === 'court_deadline';

                    return (
                      <div
                        key={notif.id}
                        className={`p-4 rounded-2xl border transition-all text-right ${
                          notif.isRead
                            ? 'bg-gray-50/70 dark:bg-gray-900/40 border-gray-200 dark:border-gray-800 opacity-80'
                            : isDeadline
                            ? 'bg-amber-500/5 dark:bg-[#0B132B] border-[#D4AF37]/50 shadow-sm'
                            : 'bg-blue-500/5 dark:bg-[#0B132B] border-blue-500/30 shadow-sm'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                                isDeadline
                                  ? notif.urgency === 'critical'
                                    ? 'bg-rose-500 text-white'
                                    : 'bg-[#D4AF37] text-[#0B132B]'
                                  : 'bg-blue-500 text-white'
                              }`}
                            >
                              {isDeadline ? <Clock className="w-3.5 h-3.5" /> : <MessageSquare className="w-3.5 h-3.5" />}
                            </div>
                            <div>
                              <h3 className="text-xs font-bold text-gray-900 dark:text-white">
                                {notif.title}
                              </h3>
                              <span className="text-[10px] text-gray-400 block">
                                {notif.timestamp} {notif.caseNumber && `• شماره پرونده: ${notif.caseNumber}`}
                              </span>
                            </div>
                          </div>

                          {!notif.isRead && (
                            <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0 mt-1" />
                          )}
                        </div>

                        <p className="text-xs text-gray-600 dark:text-gray-300 mt-2 leading-relaxed">
                          {notif.message}
                        </p>

                        {/* Extra Deadline Metadata */}
                        {isDeadline && notif.deadlineDate && (
                          <div className="mt-2.5 p-2 rounded-xl bg-gray-100 dark:bg-gray-800/80 flex items-center justify-between text-[11px]">
                            <span className="text-gray-700 dark:text-gray-300 font-medium">
                              موعد: <strong className="text-[#D4AF37]">{notif.deadlineDate}</strong>
                            </span>
                            {notif.courtBranch && (
                              <span className="text-gray-500 dark:text-gray-400 truncate max-w-[150px]">
                                {notif.courtBranch}
                              </span>
                            )}
                          </div>
                        )}

                        {/* Client details */}
                        {notif.clientName && (
                          <div className="mt-2 text-[11px] text-gray-500 dark:text-gray-400 flex items-center gap-1">
                            <User className="w-3 h-3 text-[#D4AF37]" />
                            <span>موکل: <strong className="text-gray-700 dark:text-gray-300">{notif.clientName}</strong></span>
                          </div>
                        )}

                        {/* Action buttons */}
                        <div className="flex items-center justify-end gap-2 mt-3 pt-2 border-t border-gray-100 dark:border-gray-800">
                          {isDeadline ? (
                            <button
                              onClick={() => {
                                markAsRead(notif.id);
                                setIsDrawerOpen(false);
                                if (notif.caseNumber && onSelectCase) {
                                  onSelectCase(notif.caseNumber);
                                }
                              }}
                              className="px-2.5 py-1 rounded-lg bg-[#D4AF37]/20 hover:bg-[#D4AF37] text-[#AA820A] hover:text-[#0B132B] dark:text-[#D4AF37] dark:hover:text-[#0B132B] font-bold text-xs transition-colors"
                            >
                              مشاهده در پرونده‌ها
                            </button>
                          ) : (
                            <button
                              onClick={() => {
                                markAsRead(notif.id);
                                setReplyModalTarget(notif);
                              }}
                              className="px-2.5 py-1 rounded-lg bg-blue-600/15 hover:bg-blue-600 text-blue-700 hover:text-white dark:text-blue-300 font-bold text-xs transition-colors flex items-center gap-1"
                            >
                              <Send className="w-3 h-3" />
                              <span>ارسال پاسخ</span>
                            </button>
                          )}

                          {!notif.isRead && (
                            <button
                              onClick={() => markAsRead(notif.id)}
                              className="text-[11px] text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                            >
                              علامت به عنوان خوانده‌شده
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Drawer Footer */}
              <div className="p-4 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/60 text-center">
                <p className="text-[11px] text-gray-500 dark:text-gray-400">
                  سامانه اعلان‌های هوشمند متصل به سرور و تقویم دادرسی دفتر دکتر سیده مریم رضوی
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. Quick Client Reply Modal */}
      {replyModalTarget && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" dir="rtl">
          <div className="w-full max-w-lg bg-white dark:bg-[#0B132B] rounded-3xl border border-gray-200 dark:border-gray-800 shadow-2xl p-6 space-y-4 text-right">
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
              <div className="flex items-center gap-2">
                <Send className="w-5 h-5 text-blue-500" />
                <h3 className="text-base font-bold text-gray-900 dark:text-white">
                  پاسخ سریع به موکل: {replyModalTarget.clientName}
                </h3>
              </div>
              <button
                onClick={() => setReplyModalTarget(null)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Client's message quote */}
            <div className="p-3.5 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-xs text-gray-700 dark:text-gray-300 space-y-1">
              <span className="font-bold text-blue-600 dark:text-blue-400 block">
                متن پیام ارسالی موکل:
              </span>
              <p className="leading-relaxed">«{replyModalTarget.message}»</p>
            </div>

            {replySuccessMessage ? (
              <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-700 dark:text-emerald-300 text-xs font-bold text-center flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>{replySuccessMessage}</span>
              </div>
            ) : (
              <form onSubmit={handleSendReply} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300">
                    متن پاسخ وکیل یا دبیرخانه دفتر:
                  </label>
                  <textarea
                    rows={4}
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="پاسخ محرمانه خود را تایپ فرمایید (به صورت خودکار در پرتال موکل و پیامک درج می‌شود)..."
                    className="w-full px-4 py-2.5 rounded-2xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-xs focus:ring-2 focus:ring-[#D4AF37] focus:outline-none"
                    required
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setReplyModalTarget(null)}
                    className="px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs font-bold hover:bg-gray-200"
                  >
                    انصراف
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-blue-600/30"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>ارسال پیام به موکل</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};
