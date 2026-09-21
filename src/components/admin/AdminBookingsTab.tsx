import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  Clock,
  User,
  Phone,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Send,
  BellRing,
  Plus,
  Search,
  Filter,
  Eye,
  MessageSquare,
  Shield,
  Smartphone,
  Mail,
  Check,
  X,
  FileText,
} from 'lucide-react';

interface BookingRecord {
  id: string;
  trackingCode: string;
  clientName: string;
  clientPhone: string;
  clientEmail?: string;
  bookingDate: string;
  timeSlot: string;
  consultationType: 'حضوری' | 'آنلاین تصویری' | 'تلفنی تخصصی';
  topic: string;
  status: 'تایید شده' | 'در انتظار تماس' | 'انجام شده' | 'لغو شده';
  feePaid: number;
  reminderSent: boolean;
}

const INITIAL_BOOKINGS: BookingRecord[] = [
  {
    id: 'b-101',
    trackingCode: 'SR-B1403-881',
    clientName: 'مهندس آرش جهانبخش',
    clientPhone: '09121112233',
    clientEmail: 'arash.j@example.com',
    bookingDate: '۱۴۰۳/۰۶/۲۵',
    timeSlot: '۱۱:۰۰ الی ۱۱:۴۵',
    consultationType: 'حضوری',
    topic: 'مشاوره قرارداد مشارکت در ساخت و پیش‌فروش واحدها',
    status: 'تایید شده',
    feePaid: 2500000,
    reminderSent: true,
  },
  {
    id: 'b-102',
    trackingCode: 'SR-B1403-882',
    clientName: 'دکتر مریم سلیمانی',
    clientPhone: '09124445566',
    clientEmail: 'm.soleimani@med.ir',
    bookingDate: '۱۴۰۳/۰۶/۲۵',
    timeSlot: '۱۵:۰۰ الی ۱۵:۴۵',
    consultationType: 'آنلاین تصویری',
    topic: 'دعاوی مالیاتی و جرایم سامانه مودیان شرکت بازرگانی',
    status: 'در انتظار تماس',
    feePaid: 2000000,
    reminderSent: false,
  },
  {
    id: 'b-103',
    trackingCode: 'SR-B1403-883',
    clientName: 'آقای بهزاد کریمی',
    clientPhone: '09127778899',
    bookingDate: '۱۴۰۳/۰۶/۲۶',
    timeSlot: '۱۰:۰۰ الی ۱۰:۴۵',
    consultationType: 'تلفنی تخصصی',
    topic: 'مطالبه مهریه و استرداد جهیزیه و توافقات مالی زوجین',
    status: 'تایید شده',
    feePaid: 1500000,
    reminderSent: true,
  },
  {
    id: 'b-104',
    trackingCode: 'SR-B1403-884',
    clientName: 'شرکت فناوران آریا پرداز (نماینده حقوقی)',
    clientPhone: '02188776655',
    bookingDate: '۱۴۰۳/۰۶/۲۷',
    timeSlot: '۱۶:۳۰ الی ۱۷:۳۰',
    consultationType: 'حضوری',
    topic: 'داوری آنلاین قرارداد نرم‌افزاری و نقض محرمانگی NDA',
    status: 'تایید شده',
    feePaid: 3500000,
    reminderSent: false,
  },
  {
    id: 'b-105',
    trackingCode: 'SR-B1403-885',
    clientName: 'خانم سودابه تقوی',
    clientPhone: '09351234567',
    bookingDate: '۱۴۰۳/۰۶/۲۸',
    timeSlot: '۱۲:۰۰ الی ۱۲:۴۵',
    consultationType: 'حضوری',
    topic: 'خلع ید مشاعی و تقسیم ترکه و ارثیه خانوادگی',
    status: 'لغو شده',
    feePaid: 0,
    reminderSent: false,
  },
];

export const AdminBookingsTab: React.FC = () => {
  const [bookings, setBookings] = useState<BookingRecord[]>(INITIAL_BOOKINGS);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('همه');
  const [typeFilter, setTypeFilter] = useState('همه');
  const [selectedBooking, setSelectedBooking] = useState<BookingRecord | null>(null);

  // Reminder settings states
  const [smsReminder24h, setSmsReminder24h] = useState(true);
  const [smsReminder2h, setSmsReminder2h] = useState(true);
  const [emailReminder, setEmailReminder] = useState(true);
  const [smsTemplate, setSmsTemplate] = useState(
    'موکل گرامی {نام}، نوبت مشاوره حقوقی شما با دکتر سیده مریم رضوی در تاریخ {تاریخ} ساعت {ساعت} ثبت گردید. آدرس دفتر: تهران، خیابان ولیعصر، برج ونک. تلفن: ۰۲۱۸۸۸۸۸۸۸۸'
  );
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2500);
  };

  const handleStatusChange = (id: string, newStatus: BookingRecord['status']) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
    );
    showToast(`وضعیت نوبت به «${newStatus}» تغییر یافت.`);
  };

  const handleSendReminder = (id: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, reminderSent: true } : b))
    );
    showToast('پیامک و ایمیل یادآوری وقت مشاوره با موفقیت ارسال شد.');
  };

  // KPI calculations
  const totalBookings = bookings.length;
  const confirmedCount = bookings.filter((b) => b.status === 'تایید شده').length;
  const pendingCount = bookings.filter((b) => b.status === 'در انتظار تماس').length;
  const totalIncome = bookings.reduce((sum, b) => sum + b.feePaid, 0);

  const filteredBookings = bookings.filter((b) => {
    const matchSearch =
      b.clientName.includes(searchTerm) ||
      b.clientPhone.includes(searchTerm) ||
      b.trackingCode.includes(searchTerm) ||
      b.topic.includes(searchTerm);

    const matchStatus = statusFilter === 'همه' || b.status === statusFilter;
    const matchType = typeFilter === 'همه' || b.consultationType === typeFilter;

    return matchSearch && matchStatus && matchType;
  });

  return (
    <div className="space-y-6">
      {/* Toast */}
      {toastMsg && (
        <div className="fixed bottom-6 left-6 z-50 p-4 rounded-xl bg-[#0B132B] text-white border border-[#D4AF37] shadow-xl text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* 1. Header KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-500 dark:text-gray-400 font-bold block">مجموع نوبت‌های رزرو</span>
            <span className="text-2xl font-black text-[#0B132B] dark:text-white font-mono mt-1 block">
              {totalBookings}
            </span>
          </div>
          <div className="w-11 h-11 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
            <CalendarIcon className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-500 dark:text-gray-400 font-bold block">نوبت‌های قطعی و تاییدشده</span>
            <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono mt-1 block">
              {confirmedCount}
            </span>
          </div>
          <div className="w-11 h-11 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-500 dark:text-gray-400 font-bold block">در انتظار تایید منشی</span>
            <span className="text-2xl font-black text-amber-500 font-mono mt-1 block">
              {pendingCount}
            </span>
          </div>
          <div className="w-11 h-11 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
            <AlertCircle className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-500 dark:text-gray-400 font-bold block">درآمد وصولی مشاوره‌ها</span>
            <span className="text-xl font-black text-[#D4AF37] font-mono mt-1 block">
              {totalIncome.toLocaleString('fa-IR')} <span className="text-xs font-normal">تومان</span>
            </span>
          </div>
          <div className="w-11 h-11 rounded-xl bg-[#D4AF37]/10 text-[#D4AF37] flex items-center justify-center">
            <Shield className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* 2. Main Table & Filters */}
      <div className="bg-white dark:bg-[#0B132B] rounded-2xl p-5 border border-gray-200 dark:border-gray-800 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pb-3 border-b border-gray-100 dark:border-gray-800">
          <div>
            <h3 className="text-sm font-bold text-gray-900 dark:text-white font-serif">
              جدول نوبت‌های مشاوره رزرو شده (SPEC Part 5.6 & 6.6)
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              مدیریت جلسات حضوری، تصویری و تلفنی به همراه پیگیری یادآوری‌های پیامکی
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => showToast('نوبت‌دهی تقویم ماهانه بارگذاری شد.')}
              className="px-3 py-2 rounded-xl text-xs font-bold border border-gray-200 dark:border-gray-700 hover:border-[#D4AF37] text-gray-700 dark:text-gray-300 flex items-center gap-1.5"
            >
              <CalendarIcon className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>نمای تقویم ماهانه</span>
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="جستجوی نام، تلفن یا کد رهگیری..."
              className="w-full pr-9 pl-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs text-gray-800 dark:text-gray-200 focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs text-gray-800 dark:text-gray-200 focus:outline-none focus:border-[#D4AF37]"
            >
              <option value="همه">همه وضعیت‌ها</option>
              <option value="تایید شده">تایید شده</option>
              <option value="در انتظار تماس">در انتظار تماس</option>
              <option value="انجام شده">انجام شده</option>
              <option value="لغو شده">لغو شده</option>
            </select>
          </div>

          <div>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs text-gray-800 dark:text-gray-200 focus:outline-none focus:border-[#D4AF37]"
            >
              <option value="همه">همه انواع مشاوره</option>
              <option value="حضوری">حضوری (دفتر وکالت)</option>
              <option value="آنلاین تصویری">آنلاین تصویری</option>
              <option value="تلفنی تخصصی">تلفنی تخصصی</option>
            </select>
          </div>
        </div>

        {/* Bookings Table */}
        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800">
          <table className="w-full text-right text-xs">
            <thead className="bg-gray-50 dark:bg-gray-800/80 text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="py-3 px-4 font-bold">کد و موکل</th>
                <th className="py-3 px-4 font-bold">نوع و موضوع مشاوره</th>
                <th className="py-3 px-4 font-bold">تاریخ و ساعت</th>
                <th className="py-3 px-4 font-bold">وضعیت و یادآوری</th>
                <th className="py-3 px-4 font-bold text-center">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {filteredBookings.map((b) => (
                <tr key={b.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-gray-900 dark:text-gray-100">{b.clientName}</div>
                    <div className="text-[11px] text-gray-500 font-mono mt-0.5 flex items-center gap-2">
                      <span>{b.clientPhone}</span>
                      <span className="text-gray-400">|</span>
                      <span className="text-amber-600 dark:text-amber-400">{b.trackingCode}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold text-[10px] inline-block mb-1">
                      {b.consultationType}
                    </span>
                    <div className="text-[11px] text-gray-600 dark:text-gray-300 line-clamp-1">{b.topic}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-mono text-gray-900 dark:text-gray-100 font-bold">{b.bookingDate}</div>
                    <div className="text-[11px] text-gray-500 font-mono mt-0.5">{b.timeSlot}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1.5 mb-1">
                      {b.status === 'تایید شده' && (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-[11px] flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          تایید شده
                        </span>
                      )}
                      {b.status === 'در انتظار تماس' && (
                        <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold text-[11px] flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          در انتظار تماس
                        </span>
                      )}
                      {b.status === 'لغو شده' && (
                        <span className="px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 font-bold text-[11px] flex items-center gap-1">
                          <XCircle className="w-3 h-3" />
                          لغو شده
                        </span>
                      )}
                    </div>
                    {b.reminderSent ? (
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                        <Check className="w-3 h-3" /> پیامک یادآوری ارسال شد
                      </span>
                    ) : (
                      <span className="text-[10px] text-gray-400">یادآوری ارسال نشده</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <button
                        onClick={() => handleSendReminder(b.id)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-amber-500 hover:bg-amber-500/10"
                        title="ارسال پیامک و ایمیل یادآوری فوری"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleStatusChange(b.id, 'تایید شده')}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-emerald-500 hover:bg-emerald-500/10"
                        title="تایید نوبت"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleStatusChange(b.id, 'لغو شده')}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-rose-500 hover:bg-rose-500/10"
                        title="لغو نوبت"
                      >
                        <XCircle className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. Automatic SMS & Email Notification Rules (Part 5.6) */}
      <div className="bg-white dark:bg-[#0B132B] rounded-2xl p-5 border border-gray-200 dark:border-gray-800 shadow-sm space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-gray-100 dark:border-gray-800">
          <BellRing className="w-5 h-5 text-[#D4AF37]" />
          <div>
            <h4 className="text-xs font-bold text-gray-900 dark:text-white">
              سامانه هوشمند یادآوری خودکار نوبت‌ها (SMS & Email Notification Service)
            </h4>
            <p className="text-[11px] text-gray-500 dark:text-gray-400">
              ارسال خودکار الگوهای پیامکی به موکل ۲۴ ساعت و ۲ ساعت پیش از وقت مشاوره
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-3.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-emerald-500" />
              <div>
                <span className="block text-xs font-bold text-gray-800 dark:text-gray-200">پیامک ۲۴ ساعت قبل</span>
                <span className="text-[10px] text-gray-500">یادآوری تاریخ و آدرس دفتر</span>
              </div>
            </div>
            <input
              type="checkbox"
              checked={smsReminder24h}
              onChange={(e) => setSmsReminder24h(e.target.checked)}
              className="w-4 h-4 accent-[#D4AF37] rounded"
            />
          </div>

          <div className="p-3.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-500" />
              <div>
                <span className="block text-xs font-bold text-gray-800 dark:text-gray-200">پیامک ۲ ساعت قبل</span>
                <span className="text-[10px] text-gray-500">هشدار حرکت به سمت دفتر</span>
              </div>
            </div>
            <input
              type="checkbox"
              checked={smsReminder2h}
              onChange={(e) => setSmsReminder2h(e.target.checked)}
              className="w-4 h-4 accent-[#D4AF37] rounded"
            />
          </div>

          <div className="p-3.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-blue-500" />
              <div>
                <span className="block text-xs font-bold text-gray-800 dark:text-gray-200">ایمیل و تقویم Google/iCal</span>
                <span className="text-[10px] text-gray-500">فایل ضمیمه .ics جهت ثبت تقویم</span>
              </div>
            </div>
            <input
              type="checkbox"
              checked={emailReminder}
              onChange={(e) => setEmailReminder(e.target.checked)}
              className="w-4 h-4 accent-[#D4AF37] rounded"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
            متن قالب پیامک وب‌سرویس خدماتی (الگوی کاوه‌نگار / SMS.ir بدون بلاک بلک‌لیست):
          </label>
          <textarea
            rows={2}
            value={smsTemplate}
            onChange={(e) => setSmsTemplate(e.target.value)}
            className="w-full px-3.5 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs text-gray-900 dark:text-white font-mono focus:outline-none focus:border-[#D4AF37]"
          />
        </div>
      </div>
    </div>
  );
};
