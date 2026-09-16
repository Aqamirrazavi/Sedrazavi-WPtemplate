import React, { useState } from 'react';
import { CaseItem } from '../../types/theme';
import {
  Scale,
  Clock,
  AlertTriangle,
  Calendar,
  TrendingUp,
  BarChart3,
  CheckCircle2,
  ExternalLink,
  Plus,
  ArrowUpRight,
  ShieldAlert,
  FileText,
  UserCheck,
  Briefcase,
  Layers,
  ChevronRight,
  Activity,
  Calculator,
  Search,
} from 'lucide-react';

interface AttorneyExecutiveDashboardProps {
  cases: CaseItem[];
  onOpenAddCaseModal: () => void;
  onOpenManualAccountModal: () => void;
}

export const AttorneyExecutiveDashboard: React.FC<AttorneyExecutiveDashboardProps> = ({
  cases,
  onOpenAddCaseModal,
  onOpenManualAccountModal,
}) => {
  // Time filter for Traffic & Client Growth Trend
  const [trafficTimeframe, setTrafficTimeframe] = useState<'weekly' | 'monthly' | 'quarterly' | 'yearly'>('monthly');

  // Reminders interactive checklist (Section 7)
  const [reminders, setReminders] = useState([
    {
      id: 1,
      text: 'ارائه لایحه دفاعیه پرونده تجدیدنظر شماره ۱۴۰۳-۰۰۲ (موعد پایانی تجدیدنظرخواهی)',
      time: 'تا ۲ ساعت دیگر (مهلت ثنا)',
      urgent: true,
      done: false,
    },
    {
      id: 2,
      text: 'حضور در جلسه داوری اتاق بازرگانی تهران - قرارداد شرکت مهندسی پرشیا',
      time: 'ساعت ۱۴:۳۰ امروز',
      urgent: false,
      done: true,
    },
    {
      id: 3,
      text: 'تماس تلفنی با موکل خانم کاظمیان جهت پیگیری دستور تخلیه ملک تجاری',
      time: 'ساعت ۱۶:۴۵ امروز',
      urgent: false,
      done: false,
    },
    {
      id: 4,
      text: 'امضای الکترونیک وکالت‌نامه در سامانه ثنا عدل‌ایران برای پرونده دیوان عدالت',
      time: 'ساعت ۱۸:۰۰ امروز',
      urgent: false,
      done: false,
    },
    {
      id: 5,
      text: 'واریز تمبر مالیاتی پرونده کیفری شعبه ۱۰۲ دادگاه کیفری دو',
      time: 'فردا صبح تا ساعت ۰۹:۰۰',
      urgent: false,
      done: false,
    },
  ]);

  const [newReminderText, setNewReminderText] = useState('');

  const toggleReminder = (id: number) => {
    setReminders((prev) =>
      prev.map((r) => (r.id === id ? { ...r, done: !r.done } : r))
    );
  };

  const handleAddReminder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReminderText.trim()) return;
    setReminders([
      ...reminders,
      {
        id: Date.now(),
        text: newReminderText.trim(),
        time: 'امروز',
        urgent: false,
        done: false,
      },
    ]);
    setNewReminderText('');
  };

  // KPI Calculations
  const totalCases = cases.length;
  const inProgressCases = cases.filter((c) => c.status === 'در جریان').length;
  const underReviewCases = cases.filter((c) => c.status === 'در حال بررسی').length;
  const closedCases = cases.filter(
    (c) => c.status === 'بسته شده' || c.status === 'به رأی نهایی رسیده'
  ).length;

  // Mock Traffic trend data based on timeframe
  const trafficDataMap = {
    weekly: [
      { label: 'شنبه', views: 820, inquiries: 34, bookings: 4 },
      { label: 'یکشنبه', views: 950, inquiries: 42, bookings: 6 },
      { label: 'دوشنبه', views: 1120, inquiries: 51, bookings: 8 },
      { label: 'سه‌شنبه', views: 1040, inquiries: 47, bookings: 5 },
      { label: 'چهارشنبه', views: 1250, inquiries: 59, bookings: 9 },
      { label: 'پنجشنبه', views: 680, inquiries: 25, bookings: 3 },
      { label: 'جمعه', views: 430, inquiries: 18, bookings: 2 },
    ],
    monthly: [
      { label: 'هفته ۱', views: 4200, inquiries: 180, bookings: 24 },
      { label: 'هفته ۲', views: 4900, inquiries: 215, bookings: 31 },
      { label: 'هفته ۳', views: 5600, inquiries: 260, bookings: 38 },
      { label: 'هفته ۴', views: 6100, inquiries: 295, bookings: 42 },
    ],
    quarterly: [
      { label: 'فروردین', views: 14200, inquiries: 620, bookings: 88 },
      { label: 'اردیبهشت', views: 19800, inquiries: 840, bookings: 124 },
      { label: 'خرداد', views: 23500, inquiries: 990, bookings: 146 },
    ],
    yearly: [
      { label: 'بهار', views: 57500, inquiries: 2450, bookings: 358 },
      { label: 'تابستان', views: 68900, inquiries: 2980, bookings: 412 },
      { label: 'پاییز', views: 74200, inquiries: 3310, bookings: 460 },
      { label: 'زمستان', views: 81400, inquiries: 3750, bookings: 515 },
    ],
  };

  const currentTrafficPoints = trafficDataMap[trafficTimeframe];
  const maxViews = Math.max(...currentTrafficPoints.map((p) => p.views));

  // Popular Services Data
  const popularServices = [
    { title: 'دعاوی ملکی، سرقفلی و اراضی', percentage: 42, count: '۲۸ پرونده فعال', color: '#D4AF37' },
    { title: 'داوری تجاری و قراردادهای بین‌المللی', percentage: 28, count: '۱۹ پرونده فعال', color: '#2A9D8F' },
    { title: 'امور حقوقی شرکت‌ها و ورشکستگی', percentage: 18, count: '۱۲ پرونده فعال', color: '#3B82F6' },
    { title: 'دعاوی تخصصی دیوان عدالت اداری', percentage: 8, count: '۶ پرونده فعال', color: '#8B5CF6' },
    { title: 'دعاوی خانواده و انحصار وراثت', percentage: 4, count: '۳ پرونده فعال', color: '#EC4899' },
  ];

  // Recent Office Activities (Section 5)
  const recentActivities = [
    {
      id: 1,
      title: 'ثبت لایحه تجدیدنظرخواهی در سامانه ثنا',
      detail: 'پرونده کلاسه ۱۴۰۳-۰۰۲ (موکل: شرکت پارس فلات) - شعبه ۱۲ تجدیدنظر استان تهران',
      time: '۲۵ دقیقه پیش',
      type: 'lawsuit',
      iconColor: 'text-[#D4AF37]',
      bgColor: 'bg-[#D4AF37]/10',
    },
    {
      id: 2,
      title: 'پرداخت آنلاین نوبت مشاوره تخصصی',
      detail: 'آقای دکتر بهرامی نوبت مشاوره حضوری برای روز دوشنبه ساعت ۱۷:۰۰ رزرو و پرداخت نمودند.',
      time: '۱ ساعت پیش',
      type: 'booking',
      iconColor: 'text-emerald-500',
      bgColor: 'bg-emerald-500/10',
    },
    {
      id: 3,
      title: 'صدور قرار کارشناسی رسمی دادگستری',
      detail: 'ابلاغ قرار ارزیابی ملک تجاری در پرونده ۱۴۰۳-۰۰۴ و تعیین کارشناس ۳ نفره.',
      time: '۳ ساعت پیش',
      type: 'court',
      iconColor: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
    },
    {
      id: 4,
      title: 'ایجاد حساب کاربری امن برای موکل جدید',
      detail: 'حساب کاربری سرکار خانم شمس با رمز اختصاصی در بستر امن ایتا و تلگرام صادر شد.',
      time: '۵ ساعت پیش',
      type: 'client',
      iconColor: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
    },
  ];

  return (
    <div className="space-y-8">
      {/* 1. SECTION 1: 4 KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1 */}
        <div className="bg-white dark:bg-[#0B132B] p-5 rounded-2xl border-r-4 border-r-[#D4AF37] border-y border-l border-gray-200 dark:border-gray-800 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-gray-400">کل پرونده‌های ثبتی</span>
            <p className="text-2xl sm:text-3xl font-bold font-serif text-[#0B132B] dark:text-white mt-1">
              {totalCases} پرونده
            </p>
            <span className="text-[11px] text-emerald-600 flex items-center gap-1 mt-1 font-semibold">
              <TrendingUp className="w-3 h-3" />
              +۱۴.۲٪ رشد موکلین این فصل
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/15 text-[#D4AF37] flex items-center justify-center">
            <Scale className="w-6 h-6" />
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white dark:bg-[#0B132B] p-5 rounded-2xl border-r-4 border-r-[#2A9D8F] border-y border-l border-gray-200 dark:border-gray-800 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-gray-400">پرونده‌های در جریان دادرسی</span>
            <p className="text-2xl sm:text-3xl font-bold font-serif text-[#2A9D8F] mt-1">
              {inProgressCases} پرونده
            </p>
            <span className="text-[11px] text-gray-500 mt-1 block font-medium">
              ۳ جلسه دادگاه و داوری این هفته
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#2A9D8F]/15 text-[#2A9D8F] flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white dark:bg-[#0B132B] p-5 rounded-2xl border-r-4 border-r-[#8B0000] border-y border-l border-gray-200 dark:border-gray-800 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-gray-400">مهلت‌های اضطراری دادرسی</span>
            <p className="text-2xl sm:text-3xl font-bold font-serif text-[#8B0000] mt-1">
              ۲ مهلت فوری
            </p>
            <span className="text-[11px] text-red-500 font-semibold mt-1 block">
              مهلت تجدیدنظر و ابلاغیه ثنا
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-red-500/15 text-red-600 flex items-center justify-center">
            <AlertTriangle className="w-6 h-6" />
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white dark:bg-[#0B132B] p-5 rounded-2xl border-r-4 border-r-[#1C2541] border-y border-l border-gray-200 dark:border-gray-800 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-gray-400">نوبت‌های مشاوره امروز</span>
            <p className="text-2xl sm:text-3xl font-bold font-serif text-[#0B132B] dark:text-white mt-1">
              ۴ نوبت
            </p>
            <span className="text-[11px] text-emerald-600 font-semibold mt-1 block">
              ۲ مشاوره حضوری + ۲ آنلاین
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-500/15 text-blue-600 flex items-center justify-center">
            <Calendar className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* 2 & 3: CASE STATUS BREAKDOWN & POPULAR SERVICES CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* SECTION 2: Case Status Visualizer (5 cols) */}
        <div className="lg:col-span-5 bg-white dark:bg-[#0B132B] rounded-3xl p-6 sm:p-7 border border-gray-200 dark:border-gray-800 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-2 border-b border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#D4AF37]" />
              <h3 className="text-base font-bold font-serif text-[#0B132B] dark:text-white">
                ۲. وضعیت آماری و تفکیک پرونده‌ها
              </h3>
            </div>
            <span className="text-[11px] font-mono text-emerald-600 font-bold">بروزرسانی زنده</span>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-[#2A9D8F]"></span>
                  در جریان دادرسی دادگاه
                </span>
                <span>
                  {inProgressCases} پرونده ({totalCases > 0 ? Math.round((inProgressCases / totalCases) * 100) : 0}%)
                </span>
              </div>
              <div className="w-full h-3 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
                <div
                  className="h-full bg-[#2A9D8F] rounded-full transition-all duration-500"
                  style={{ width: `${totalCases > 0 ? (inProgressCases / totalCases) * 100 : 0}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-[#D4AF37]"></span>
                  در حال تنظیم دادخواست و شکواییه
                </span>
                <span>
                  {underReviewCases} پرونده ({totalCases > 0 ? Math.round((underReviewCases / totalCases) * 100) : 0}%)
                </span>
              </div>
              <div className="w-full h-3 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
                <div
                  className="h-full bg-[#D4AF37] rounded-full transition-all duration-500"
                  style={{ width: `${totalCases > 0 ? (underReviewCases / totalCases) * 100 : 0}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-[#1C2541] dark:bg-gray-400"></span>
                  مختومه و صدور رأی قطعی نهایی
                </span>
                <span>
                  {closedCases} پرونده ({totalCases > 0 ? Math.round((closedCases / totalCases) * 100) : 0}%)
                </span>
              </div>
              <div className="w-full h-3 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
                <div
                  className="h-full bg-[#1C2541] dark:bg-gray-400 rounded-full transition-all duration-500"
                  style={{ width: `${totalCases > 0 ? (closedCases / totalCases) * 100 : 0}%` }}
                />
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs">
            <span className="text-gray-500">نرخ موفقیت آراء قطعی به نفع موکلین:</span>
            <span className="font-bold text-emerald-600 dark:text-emerald-400 font-mono text-sm">
              ۹۴.۸٪ پیروزی در محاکم
            </span>
          </div>
        </div>

        {/* SECTION 3: Popular Legal Services (7 cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-[#0B132B] rounded-3xl p-6 sm:p-7 border border-gray-200 dark:border-gray-800 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-2 border-b border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-[#2A9D8F]" />
              <h3 className="text-base font-bold font-serif text-[#0B132B] dark:text-white">
                ۳. نمودار خدمات پرطرفدار حقوقی دفتر وکالت
              </h3>
            </div>
            <span className="text-xs text-gray-400">تحلیل ماهانه تقاضا</span>
          </div>

          <div className="space-y-3.5">
            {popularServices.map((service, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-bold text-[#0B132B] dark:text-white">{service.title}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500 font-mono text-[11px]">{service.count}</span>
                    <span className="font-bold font-mono text-xs text-gray-700 dark:text-gray-300">
                      {service.percentage}٪
                    </span>
                  </div>
                </div>
                <div className="w-full h-2.5 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${service.percentage}%`,
                      backgroundColor: service.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. SECTION 4: TRAFFIC & CLIENT GROWTH TREND CHART WITH TIMEFRAME FILTER */}
      <div className="bg-white dark:bg-[#0B132B] rounded-3xl p-6 sm:p-7 border border-gray-200 dark:border-gray-800 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-gray-100 dark:border-gray-800">
          <div>
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-[#D4AF37]" />
              <h3 className="text-base font-bold font-serif text-[#0B132B] dark:text-white">
                ۴. نمودار روند بازدید سایت، استعلام پرونده‌ها و مراجعین آنلاین
              </h3>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              بررسی ترافیک ورودی مراجعین به پرتال وکالت با قابلیت فیلتر زمانی.
            </p>
          </div>

          {/* Timeframe Filter Buttons */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 self-start sm:self-center">
            {(['weekly', 'monthly', 'quarterly', 'yearly'] as const).map((tf) => (
              <button
                key={tf}
                onClick={() => setTrafficTimeframe(tf)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  trafficTimeframe === tf
                    ? 'bg-white dark:bg-[#0B132B] text-[#0B132B] dark:text-white shadow-sm border border-[#D4AF37]/50'
                    : 'text-gray-600 dark:text-gray-400 hover:text-[#0B132B]'
                }`}
              >
                {tf === 'weekly' && 'هفتگی'}
                {tf === 'monthly' && 'ماهانه'}
                {tf === 'quarterly' && 'فصلی'}
                {tf === 'yearly' && 'سالانه'}
              </button>
            ))}
          </div>
        </div>

        {/* Visual Bar Chart */}
        <div className="pt-4">
          <div className="grid grid-cols-4 sm:grid-cols-7 gap-3 items-end h-48 border-b border-gray-200 dark:border-gray-700 pb-2">
            {currentTrafficPoints.map((item, idx) => {
              const heightPercent = Math.max(15, Math.round((item.views / maxViews) * 100));
              return (
                <div key={idx} className="flex flex-col items-center gap-2 h-full justify-end group">
                  {/* Tooltip on hover */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] text-center bg-black/80 text-white rounded-lg px-2 py-1 pointer-events-none whitespace-nowrap shadow-lg">
                    <div>{item.views.toLocaleString('fa-IR')} بازدید</div>
                    <div className="text-emerald-400">{item.inquiries} استعلام پرونده</div>
                    <div className="text-[#D4AF37]">{item.bookings} نوبت رزرو</div>
                  </div>

                  {/* Bar */}
                  <div className="w-full max-w-[44px] bg-gradient-to-t from-[#0B132B] to-[#D4AF37] dark:from-[#1C2541] dark:to-[#AA820A] rounded-t-xl group-hover:brightness-110 transition-all cursor-pointer shadow-sm relative overflow-hidden"
                    style={{ height: `${heightPercent}%` }}
                  >
                    <div className="absolute top-0 inset-x-0 h-1 bg-[#D4AF37]" />
                  </div>

                  {/* Label */}
                  <span className="text-[11px] font-bold text-gray-600 dark:text-gray-400 mt-1 whitespace-nowrap">
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 text-xs text-gray-500">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-[#D4AF37]" />
                <span>کل بازدید صفحات</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-emerald-500" />
                <span>استعلام آنلاین پرونده‌ها</span>
              </span>
            </div>
            <div className="text-emerald-600 font-bold">
              میانگین روزانه: ۱,۴۲۰ بازدید یونیک مراجعین
            </div>
          </div>
        </div>
      </div>

      {/* 5, 6 & 7: RECENT ACTIVITIES, QUICK ACTION LINKS, TODAY'S REMINDERS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* SECTION 5: Recent Activities (4 cols) */}
        <div className="lg:col-span-4 bg-white dark:bg-[#0B132B] rounded-3xl p-6 sm:p-7 border border-gray-200 dark:border-gray-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-500" />
              <h3 className="text-base font-bold font-serif text-[#0B132B] dark:text-white">
                ۵. فعالیت‌های اخیر دفتر
              </h3>
            </div>
            <span className="text-[11px] text-gray-400">امروز</span>
          </div>

          <div className="space-y-3">
            {recentActivities.map((act) => (
              <div
                key={act.id}
                className="p-3.5 rounded-2xl bg-gray-50/70 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 space-y-1 hover:border-gray-300 dark:hover:border-gray-700 transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-bold ${act.iconColor}`}>
                    {act.title}
                  </span>
                  <span className="text-[10px] text-gray-400 font-mono">{act.time}</span>
                </div>
                <p className="text-[11px] text-gray-600 dark:text-gray-400 leading-relaxed">
                  {act.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 6: Quick Action Links (4 cols) */}
        <div className="lg:col-span-4 bg-white dark:bg-[#0B132B] rounded-3xl p-6 sm:p-7 border border-gray-200 dark:border-gray-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-2">
              <Plus className="w-5 h-5 text-[#D4AF37]" />
              <h3 className="text-base font-bold font-serif text-[#0B132B] dark:text-white">
                ۶. لینک‌های سریع و عملیات فوری
              </h3>
            </div>
            <span className="text-[11px] text-gray-400">میانبرها</span>
          </div>

          <div className="grid grid-cols-1 gap-2.5">
            <button
              onClick={onOpenAddCaseModal}
              className="p-3 rounded-2xl bg-gradient-to-r from-[#D4AF37]/10 to-amber-500/5 hover:from-[#D4AF37]/20 border border-[#D4AF37]/30 text-right flex items-center justify-between transition-all group"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#D4AF37] text-[#0B132B] flex items-center justify-center font-bold">
                  <Plus className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-[#0B132B] dark:text-white block">
                    ثبت پرونده جدید موکل
                  </span>
                  <span className="text-[10px] text-gray-500">افزودن به دیتابیس استعلام آنلاین</span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-[#D4AF37] group-hover:-translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onOpenManualAccountModal}
              className="p-3 rounded-2xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-right flex items-center justify-between transition-all group"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                  <UserCheck className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-emerald-900 dark:text-emerald-300 block">
                    ساخت اکانت بدون پیامک (SMS)
                  </span>
                  <span className="text-[10px] text-emerald-700/80 dark:text-emerald-400">تحویل رمز در پیام‌رسان</span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-emerald-600 group-hover:-translate-x-1 transition-transform" />
            </button>

            <a
              href="https://adliran.ir"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-2xl bg-gray-50 dark:bg-gray-800/80 hover:bg-gray-100 border border-gray-200 dark:border-gray-700 text-right flex items-center justify-between transition-all group"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#1C2541] text-white flex items-center justify-center font-bold">
                  <Scale className="w-4 h-4 text-[#D4AF37]" />
                </div>
                <div>
                  <span className="text-xs font-bold text-[#0B132B] dark:text-white block">
                    سامانه خودکاربری وکلا (عدل‌ایران)
                  </span>
                  <span className="text-[10px] text-gray-500">ورود مستقیم به درگاه عدلیه</span>
                </div>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#D4AF37]" />
            </a>

            <a
              href="https://dotic.ir"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-2xl bg-gray-50 dark:bg-gray-800/80 hover:bg-gray-100 border border-gray-200 dark:border-gray-700 text-right flex items-center justify-between transition-all group"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold">
                  <Search className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-[#0B132B] dark:text-white block">
                    سامانه قوانین و آراء وحدت رویه
                  </span>
                  <span className="text-[10px] text-gray-500">پایگاه اطلاعات قوانین کشور</span>
                </div>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-gray-400 group-hover:text-purple-500" />
            </a>
          </div>
        </div>

        {/* SECTION 7: Today's Reminders & Deadlines (4 cols) */}
        <div className="lg:col-span-4 bg-white dark:bg-[#0B132B] rounded-3xl p-6 sm:p-7 border border-gray-200 dark:border-gray-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#D4AF37]" />
              <h3 className="text-base font-bold font-serif text-[#0B132B] dark:text-white">
                ۷. یادآوری‌های امروز و مواعد
              </h3>
            </div>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#D4AF37]/15 text-[#AA820A] dark:text-[#F3E5AB] font-bold">
              {reminders.filter((r) => !r.done).length} مانده
            </span>
          </div>

          <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
            {reminders.map((reminder) => (
              <div
                key={reminder.id}
                onClick={() => toggleReminder(reminder.id)}
                className={`p-3 rounded-xl border cursor-pointer flex items-center justify-between gap-2.5 transition-all ${
                  reminder.done
                    ? 'bg-gray-50 dark:bg-gray-800/30 border-gray-200 dark:border-gray-800 opacity-50'
                    : reminder.urgent
                    ? 'bg-red-50/50 dark:bg-red-950/20 border-red-300 dark:border-red-900/40'
                    : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 hover:border-[#D4AF37]'
                }`}
              >
                <div className="flex items-start gap-2.5">
                  <input
                    type="checkbox"
                    checked={reminder.done}
                    onChange={() => {}}
                    className="w-4 h-4 mt-0.5 rounded text-[#D4AF37] focus:ring-[#D4AF37]"
                  />
                  <span
                    className={`text-xs font-medium leading-relaxed ${
                      reminder.done
                        ? 'line-through text-gray-400'
                        : reminder.urgent
                        ? 'text-red-700 dark:text-red-300 font-bold'
                        : 'text-gray-800 dark:text-gray-200'
                    }`}
                  >
                    {reminder.text}
                  </span>
                </div>

                <span
                  className={`text-[10px] px-2 py-0.5 rounded font-mono shrink-0 ${
                    reminder.urgent
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-500'
                  }`}
                >
                  {reminder.time}
                </span>
              </div>
            ))}
          </div>

          {/* Add reminder input */}
          <form onSubmit={handleAddReminder} className="flex gap-2 pt-2 border-t border-gray-100 dark:border-gray-800">
            <input
              type="text"
              placeholder="افزودن یادآور یا موعد دادرسی جدید..."
              value={newReminderText}
              onChange={(e) => setNewReminderText(e.target.value)}
              className="w-full px-3 py-1.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs"
            />
            <button
              type="submit"
              className="btn-gold px-3 py-1.5 rounded-xl text-xs font-bold shrink-0"
            >
              افزودن
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
