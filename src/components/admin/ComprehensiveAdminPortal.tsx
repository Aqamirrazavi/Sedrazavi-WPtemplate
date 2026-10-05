import React, { useState } from 'react';
import {
  Briefcase,
  Users,
  Calendar,
  Settings,
  BookOpen,
  Search,
  Filter,
  Plus,
  Download,
  Printer,
  CheckCircle2,
  Clock,
  AlertTriangle,
  UserCheck,
  Phone,
  Mail,
  MapPin,
  Scale,
  LogOut,
  ChevronDown,
  Trash2,
  Edit3,
  Sliders,
  Sparkles,
  ExternalLink,
  Shield,
  FileText,
  DollarSign,
  ArrowRight,
  Eye,
  X,
} from 'lucide-react';
import { CaseItem } from '../../types/theme';
import { CASES_INITIAL_DATA, SERVICES_DATA, ATTORNEY_INFO } from '../../data/mockData';
import {
  LawyerSiteProfile,
  getStoredLawyerProfile,
  saveStoredLawyerProfile,
} from '../../utils/lawyerCustomizationStorage';
import { downloadCaseloadCsvFile } from '../../utils/caseloadCsvExporter';
import { AdminHelpAndDocsSystem } from './AdminHelpAndDocsSystem';
import { ManualAccountCreatorModal } from '../ManualAccountCreatorModal';
import { LawyerPrintBioCard } from '../LawyerPrintBioCard';
import { LawyerRealtimeToastNotifier } from '../notifications/LawyerRealtimeToastNotifier';

export interface ComprehensiveAdminPortalProps {
  userPhoneNumber?: string;
  userName?: string;
  onLogout?: () => void;
  onBackToHome?: () => void;
  lawyerProfile?: LawyerSiteProfile;
  onUpdateLawyerProfile?: (profile: LawyerSiteProfile) => void;
  onSwitchToLawyerDashboard?: () => void;
}

interface ClientEntry {
  id: string;
  name: string;
  phone: string;
  email: string;
  company?: string;
  activeCasesCount: number;
  totalPaid: number;
  status: 'active' | 'pending' | 'archived';
  registrationDate: string;
}

const INITIAL_CLIENTS: ClientEntry[] = [
  {
    id: 'c-1',
    name: 'مهندس آرش جهانبخش',
    phone: '۰۹۱۲۱۱۱۱۱۱۱',
    email: 'arash.j@example.com',
    company: 'شرکت سرمایه‌گذاری کیمیا پارس',
    activeCasesCount: 2,
    totalPaid: 45000000,
    status: 'active',
    registrationDate: '۱۴۰۳/۰۱/۱۵',
  },
  {
    id: 'c-2',
    name: 'مهندس سعید میرباقری',
    phone: '۰۹۱۲۲۲۲۲۲۲۲',
    email: 'mirbagheri@alborzsteel.ir',
    company: 'هلدینگ ساختمانی میرباقری',
    activeCasesCount: 1,
    totalPaid: 25000000,
    status: 'active',
    registrationDate: '۱۴۰۳/۰۲/۱۰',
  },
  {
    id: 'c-3',
    name: 'خانم بهاره کاظمیان',
    phone: '۰۹۱۲۳۳۳۳۳۳۳',
    email: 'kazemian.b@gmail.com',
    activeCasesCount: 1,
    totalPaid: 15000000,
    status: 'active',
    registrationDate: '۱۴۰۳/۰۳/۰۲',
  },
  {
    id: 'c-4',
    name: 'دکتر هادی فرهمند',
    phone: '۰۹۱۲۴۴۴۴۴۴۴',
    email: 'dr.farahmand@med.org',
    activeCasesCount: 1,
    totalPaid: 30000000,
    status: 'active',
    registrationDate: '۱۴۰۳/۰۴/۱۸',
  },
  {
    id: 'c-5',
    name: 'حاج مصطفی اکبری',
    phone: '۰۹۱۲۷۷۷۸۸۹۹',
    email: 'akbari.tejarat@chmail.ir',
    activeCasesCount: 1,
    totalPaid: 18000000,
    status: 'pending',
    registrationDate: '۱۴۰۳/۰۵/۰۱',
  },
];

interface BookingEntry {
  id: string;
  trackingCode: string;
  clientName: string;
  phone: string;
  consultationType: 'حضوری' | 'آنلاین تصویری' | 'تلفنی تخصصی';
  date: string;
  timeSlot: string;
  topic: string;
  status: 'تایید شده' | 'در انتظار تماس' | 'انجام شده' | 'لغو شده';
  fee: number;
}

const INITIAL_BOOKINGS: BookingEntry[] = [
  {
    id: 'bk-1',
    trackingCode: 'SR-B1403-881',
    clientName: 'مهندس آرش جهانبخش',
    phone: '۰۹۱۲۱۱۱۱۱۱۱',
    consultationType: 'حضوری',
    date: '۱۴۰۳/۰۷/۱۰',
    timeSlot: '۱۱:۰۰ الی ۱۱:۴۵',
    topic: 'مشاوره قرارداد مشارکت در ساخت و پیش‌فروش واحدها',
    status: 'تایید شده',
    fee: 2500000,
  },
  {
    id: 'bk-2',
    trackingCode: 'SR-B1403-882',
    clientName: 'دکتر مریم سلیمانی',
    phone: '۰۹۱۲۴۴۴۵۵۶۶',
    consultationType: 'آنلاین تصویری',
    date: '۱۴۰۳/۰۷/۱۲',
    timeSlot: '۱۶:۳۰ الی ۱۷:۱۵',
    topic: 'بررسی لایحه دفاعیه پرونده نظام پزشکی و جرایم صنفی',
    status: 'در انتظار تماس',
    fee: 2000000,
  },
  {
    id: 'bk-3',
    trackingCode: 'SR-B1403-883',
    clientName: 'حاج مصطفی اکبری',
    phone: '۰۹۱۲۷۷۷۸۸۹۹',
    consultationType: 'حضوری',
    date: '۱۴۰۳/۰۷/۱۵',
    timeSlot: '۱۰:۰۰ الی ۱۰:۴۵',
    topic: 'تحدید حدود اراضی موروثی و تقاضای افراز ثبتی',
    status: 'تایید شده',
    fee: 2500000,
  },
];

export const ComprehensiveAdminPortal: React.FC<ComprehensiveAdminPortalProps> = ({
  userPhoneNumber,
  userName = 'دکتر سیده مریم رضوی',
  onLogout,
  onBackToHome,
  lawyerProfile: externalProfile,
  onUpdateLawyerProfile,
  onSwitchToLawyerDashboard,
}) => {
  const [activeTab, setActiveTab] = useState<'cases' | 'clients' | 'bookings' | 'settings' | 'help'>('cases');

  // State
  const [cases, setCases] = useState<CaseItem[]>(CASES_INITIAL_DATA);
  const [clients, setClients] = useState<ClientEntry[]>(INITIAL_CLIENTS);
  const [bookings, setBookings] = useState<BookingEntry[]>(INITIAL_BOOKINGS);
  const [profile, setProfile] = useState<LawyerSiteProfile>(externalProfile || getStoredLawyerProfile());

  // Search & Filter
  const [caseSearch, setCaseSearch] = useState('');
  const [caseStatusFilter, setCaseStatusFilter] = useState('همه');
  const [clientSearch, setClientSearch] = useState('');
  const [bookingFilter, setBookingFilter] = useState('همه');

  // Modals
  const [showAddCaseModal, setShowAddCaseModal] = useState(false);
  const [showManualAccountModal, setShowManualAccountModal] = useState(false);
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState<string | null>(null);

  // New Case Form
  const [newCaseNumber, setNewCaseNumber] = useState(`۱۴۰۳-${(cases.length + 1).toString().padStart(3, '0')}`);
  const [newClientName, setNewClientName] = useState('');
  const [newClientPhone, setNewClientPhone] = useState('');
  const [newCaseType, setNewCaseType] = useState<CaseItem['caseType']>('تجاری');
  const [newNextSession, setNewNextSession] = useState('');
  const [newNotes, setNewNotes] = useState('');

  // Settings Form State
  const [settingsForm, setSettingsForm] = useState({
    lawyerName: profile.lawyerName || ATTORNEY_INFO.name,
    lawyerTitle: profile.lawyerTitle || ATTORNEY_INFO.title,
    licenseNumber: profile.licenseNumber || ATTORNEY_INFO.licenseNumber,
    phone: profile.phone || ATTORNEY_INFO.phone,
    mobile: profile.mobile || ATTORNEY_INFO.mobile,
    officeAddress: profile.officeAddress || ATTORNEY_INFO.officeAddress,
    workingHours: profile.workingHours || ATTORNEY_INFO.workingHours,
    portraitImage: profile.portraitImage || ATTORNEY_INFO.portraitImage,
    slogan: profile.slogan || ATTORNEY_INFO.slogan,
  });

  const notify = (msg: string) => {
    setNotificationMsg(msg);
    setTimeout(() => setNotificationMsg(null), 5000);
  };

  const handleDownloadCsv = () => {
    const res = downloadCaseloadCsvFile(profile, cases);
    notify(`گزارش داده‌ها با موفقیت دانلود شد (${res.filename}).`);
  };

  const handleAddCase = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClientName.trim()) return;

    const newCase: CaseItem = {
      id: `case-${Date.now()}`,
      caseNumber: newCaseNumber,
      clientName: newClientName,
      clientPhone: newClientPhone || '۰۹۱۲۰۰۰۰۰۰۰',
      caseType: newCaseType,
      status: 'در حال بررسی',
      registrationDate: new Date().toLocaleDateString('fa-IR'),
      nextCourtSession: newNextSession || 'در انتظار تعیین وقت شعبه',
      documentsCount: 1,
      notes: newNotes || 'تشکیل پرونده اولیه',
    };

    setCases([newCase, ...cases]);
    setShowAddCaseModal(false);
    setNewClientName('');
    setNewClientPhone('');
    setNewNotes('');
    notify(`پرونده جدید با شماره ${newCase.caseNumber} با موفقیت ثبت شد.`);
  };

  const handleUpdateBookingStatus = (id: string, newStatus: BookingEntry['status']) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
    );
    notify(`وضعیت نوبت به «${newStatus}» تغییر یافت.`);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = {
      ...profile,
      ...settingsForm,
    };
    setProfile(updated);
    saveStoredLawyerProfile(updated);
    if (onUpdateLawyerProfile) onUpdateLawyerProfile(updated);
    notify('تنظیمات هویت و مشخصات وکیل با موفقیت ذخیره و در کل سایت اعمال شد.');
  };

  // Filtered lists
  const filteredCases = cases.filter((c) => {
    const matchesStatus = caseStatusFilter === 'همه' || c.status === caseStatusFilter;
    const matchesSearch =
      c.caseNumber.includes(caseSearch) ||
      c.clientName.includes(caseSearch) ||
      c.caseType.includes(caseSearch);
    return matchesStatus && matchesSearch;
  });

  const filteredClients = clients.filter((cl) => {
    return (
      cl.name.includes(clientSearch) ||
      cl.phone.includes(clientSearch) ||
      (cl.company && cl.company.includes(clientSearch))
    );
  });

  const filteredBookings = bookings.filter((b) => {
    return bookingFilter === 'همه' || b.consultationType === bookingFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50/70 dark:bg-gray-950 py-8 text-right font-sans" dir="rtl">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-6 max-w-7xl">
        
        {/* Top Navbar */}
        <div className="bg-white dark:bg-[#0B132B] rounded-3xl p-5 sm:p-6 border border-gray-200 dark:border-gray-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#0B132B] dark:bg-[#D4AF37] text-[#D4AF37] dark:text-[#0B132B] flex items-center justify-center font-bold shadow-md">
              <Scale className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold font-serif text-[#0B132B] dark:text-white">
                  پنل جامع مدیریت وکیل و امور دفتر
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 text-xs font-bold">
                  ادمین فعال
                </span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                مدیریت لحظه‌ای پرونده‌ها، مراجعین، نوبت‌ها، تنظیمات قالب و مستندات گام‌به‌گام.
              </p>
            </div>
          </div>

          {/* Quick Actions Toolbar */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Real-time Toast Notifier for Court Deadlines & Client Messages */}
            <LawyerRealtimeToastNotifier
              onSelectCase={(caseNum) => {
                setCaseSearch(caseNum);
                setActiveTab('cases');
              }}
            />

            <button
              onClick={() => setShowPrintModal(true)}
              className="px-3.5 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-[#AA820A] dark:text-[#D4AF37] border border-[#D4AF37]/50 text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
              title="چاپ کارت بیوگرافی رسمی و شناسنامه حرفه‌ای وکیل"
            >
              <Printer className="w-4 h-4" />
              <span>چاپ بیوگرافی وکیل</span>
            </button>

            <button
              onClick={handleDownloadCsv}
              className="px-3.5 py-2 rounded-xl bg-blue-600/10 hover:bg-blue-600/20 text-blue-700 dark:text-blue-300 border border-blue-500/30 text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
              title="خروجی فایل اکسل و CSV از پرونده‌ها و اطلاعات"
            >
              <Download className="w-4 h-4" />
              <span>خروجی اکسل (CSV)</span>
            </button>

            <button
              onClick={() => setShowManualAccountModal(true)}
              className="px-3.5 py-2 rounded-xl bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
              title="ساخت اکانت برای موکل بدون نیاز به پیامک"
            >
              <UserCheck className="w-4 h-4" />
              <span>اکانت بدون پیامک</span>
            </button>

            {onSwitchToLawyerDashboard && (
              <button
                onClick={onSwitchToLawyerDashboard}
                className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#AA820A] text-[#0B132B] hover:brightness-110 text-xs font-black flex items-center gap-1.5 transition-all shadow-md shadow-[#D4AF37]/20 cursor-pointer"
                title="ورود به میز کار و پیشخوان اختصاصی وکیل جهت جانشینی وکیل غایب، ارجاع پرونده به وکلای شریک و ثبت مستقیم پرونده‌ها"
              >
                <Scale className="w-4 h-4" />
                <span>⚖️ میز کار و داشبورد وکیل (جانشینی)</span>
              </button>
            )}

            {onBackToHome && (
              <button
                onClick={onBackToHome}
                className="px-3.5 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 text-xs font-bold transition-all"
              >
                مشاهده فرانت سایت
              </button>
            )}

            {onLogout && (
              <button
                onClick={onLogout}
                className="px-3.5 py-2 rounded-xl bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800 text-xs font-bold flex items-center gap-1.5 transition-all"
              >
                <LogOut className="w-4 h-4" />
                <span>خروج</span>
              </button>
            )}
          </div>
        </div>

        {/* Notification Toast */}
        {notificationMsg && (
          <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs flex items-center justify-between gap-2 shadow-sm animate-fade-in">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
              <span>{notificationMsg}</span>
            </div>
            <button
              onClick={() => setNotificationMsg(null)}
              className="text-emerald-600 hover:text-emerald-800 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* 4 Quick Stat KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-3xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-sm space-y-1">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>پرونده‌های جاری</span>
              <Briefcase className="w-4 h-4 text-[#D4AF37]" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-[#0B132B] dark:text-white">
              {cases.length}
            </div>
            <div className="text-[11px] text-emerald-600 flex items-center gap-1">
              <span>۹۶.۴٪ نرخ موفقیت قطعی</span>
            </div>
          </div>

          <div className="p-5 rounded-3xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-sm space-y-1">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>موکلین ثبت‌شده</span>
              <Users className="w-4 h-4 text-blue-500" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-[#0B132B] dark:text-white">
              {clients.length}
            </div>
            <div className="text-[11px] text-gray-400">
              دسترسی فعال به پرتال آنلاین
            </div>
          </div>

          <div className="p-5 rounded-3xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-sm space-y-1">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>نوبت‌های مشاوره</span>
              <Calendar className="w-4 h-4 text-purple-500" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-[#0B132B] dark:text-white">
              {bookings.length}
            </div>
            <div className="text-[11px] text-purple-600 dark:text-purple-400">
              {bookings.filter((b) => b.status === 'تایید شده').length} نوبت تایید شده
            </div>
          </div>

          <div className="p-5 rounded-3xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-sm space-y-1">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>ورود با رمز یکبار مصرف</span>
              <Mail className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-600 dark:text-emerald-400">
              فعال
            </div>
            <div className="text-[11px] text-gray-400">
              اتصال هوشمند Email OTP
            </div>
          </div>
        </div>

        {/* Primary Segmented Navigation Tabs */}
        <div className="p-1.5 rounded-2xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-sm flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('cases')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'cases'
                ? 'bg-[#0B132B] dark:bg-[#D4AF37] text-[#D4AF37] dark:text-[#0B132B] shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>۱. پرونده‌های دادرسی ({cases.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('clients')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'clients'
                ? 'bg-[#0B132B] dark:bg-[#D4AF37] text-[#D4AF37] dark:text-[#0B132B] shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>۲. لیست موکلین ({clients.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('bookings')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'bookings'
                ? 'bg-[#0B132B] dark:bg-[#D4AF37] text-[#D4AF37] dark:text-[#0B132B] shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>۳. مدیریت رزروها و تقویم ({bookings.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'settings'
                ? 'bg-[#0B132B] dark:bg-[#D4AF37] text-[#D4AF37] dark:text-[#0B132B] shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>۴. تنظیمات سایت و هویت وکیل</span>
          </button>

          <button
            onClick={() => setActiveTab('help')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'help'
                ? 'bg-[#0B132B] dark:bg-[#D4AF37] text-[#D4AF37] dark:text-[#0B132B] shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>۵. مستندات و راهنمای اداری (Help & Docs)</span>
          </button>
        </div>

        {/* ======================================================== */}
        {/* TAB 1: CASELOAD MANAGEMENT                               */}
        {/* ======================================================== */}
        {activeTab === 'cases' && (
          <div className="bg-white dark:bg-[#0B132B] rounded-3xl p-6 sm:p-8 border border-gray-200 dark:border-gray-800 shadow-sm space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100 dark:border-gray-800">
              <div>
                <h3 className="text-lg font-bold font-serif text-[#0B132B] dark:text-white">
                  مدیریت پرونده‌های حقوقی و قضایی
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  پیگیری وضعیت دادرسی، موعد جلسات محاکم و لوایح دفاعیه.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="relative">
                  <input
                    type="text"
                    value={caseSearch}
                    onChange={(e) => setCaseSearch(e.target.value)}
                    placeholder="جستجو در پرونده‌ها..."
                    className="pl-4 pr-9 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-xs focus:outline-none focus:border-[#D4AF37] dark:text-white w-48 sm:w-64"
                  />
                  <Search className="w-4 h-4 text-gray-400 absolute right-3 top-2.5" />
                </div>

                <select
                  value={caseStatusFilter}
                  onChange={(e) => setCaseStatusFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-xs focus:outline-none focus:border-[#D4AF37] dark:text-white"
                >
                  <option value="همه">همه وضعیت‌ها</option>
                  <option value="در حال بررسی">در حال بررسی</option>
                  <option value="در جریان">در جریان</option>
                  <option value="به رأی نهایی رسیده">به رأی نهایی رسیده</option>
                </select>

                <button
                  type="button"
                  onClick={() => setShowAddCaseModal(true)}
                  className="btn-gold px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>ثبت پرونده جدید</span>
                </button>
              </div>
            </div>

            {/* Cases Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs sm:text-sm">
                <thead className="bg-gray-50 dark:bg-gray-800/60 text-gray-500 border-y border-gray-100 dark:border-gray-800">
                  <tr>
                    <th className="py-3 px-4 font-bold">شماره پرونده</th>
                    <th className="py-3 px-4 font-bold">نام موکل</th>
                    <th className="py-3 px-4 font-bold">موضوع دعوا</th>
                    <th className="py-3 px-4 font-bold">وضعیت فعلی</th>
                    <th className="py-3 px-4 font-bold">جلسه بعدی دادگاه</th>
                    <th className="py-3 px-4 font-bold">اسناد</th>
                    <th className="py-3 px-4 font-bold text-center">عملیات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {filteredCases.map((c) => (
                    <tr key={c.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-[#0B132B] dark:text-white">{c.caseNumber}</td>
                      <td className="py-3.5 px-4 font-semibold">{c.clientName}</td>
                      <td className="py-3.5 px-4 text-gray-600 dark:text-gray-400">{c.caseType}</td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                            c.status === 'به رأی نهایی رسیده'
                              ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400'
                              : c.status === 'در جریان'
                              ? 'bg-amber-500/15 text-[#AA820A] dark:text-[#F3E5AB]'
                              : 'bg-blue-500/15 text-blue-700 dark:text-blue-400'
                          }`}
                        >
                          {c.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-xs font-mono text-gray-600 dark:text-gray-400">{c.nextCourtSession}</td>
                      <td className="py-3.5 px-4 text-xs font-mono">{c.documentsCount} سند</td>
                      <td className="py-3.5 px-4 text-center">
                        <button
                          type="button"
                          onClick={() => notify(`جزئیات پرونده ${c.caseNumber} نمایش داده شد.`)}
                          className="px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-[#D4AF37]/20 text-xs font-bold transition-colors"
                        >
                          مشاهده
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: CLIENT DIRECTORY                                  */}
        {/* ======================================================== */}
        {activeTab === 'clients' && (
          <div className="bg-white dark:bg-[#0B132B] rounded-3xl p-6 sm:p-8 border border-gray-200 dark:border-gray-800 shadow-sm space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100 dark:border-gray-800">
              <div>
                <h3 className="text-lg font-bold font-serif text-[#0B132B] dark:text-white">
                  فهرست موکلین و اشخاص طرف قرارداد
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  مشاهده اطلاعات تماس، تعداد پرونده‌ها و تنظیم دسترسی به پرتال الکترونیک.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative">
                  <input
                    type="text"
                    value={clientSearch}
                    onChange={(e) => setClientSearch(e.target.value)}
                    placeholder="جستجو بر اساس نام یا شماره..."
                    className="pl-4 pr-9 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-xs focus:outline-none focus:border-[#D4AF37] dark:text-white w-48 sm:w-64"
                  />
                  <Search className="w-4 h-4 text-gray-400 absolute right-3 top-2.5" />
                </div>

                <button
                  type="button"
                  onClick={() => setShowManualAccountModal(true)}
                  className="btn-gold px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>افزودن موکل جدید</span>
                </button>
              </div>
            </div>

            {/* Clients Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredClients.map((client) => (
                <div
                  key={client.id}
                  className="p-5 rounded-2xl bg-gray-50 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-700 space-y-3 hover:border-[#D4AF37]/50 transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D4AF37]/20 to-[#AA820A]/10 text-[#D4AF37] flex items-center justify-center font-bold">
                        {client.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-gray-900 dark:text-white">
                          {client.name}
                        </h4>
                        {client.company && (
                          <div className="text-[11px] text-gray-500 font-medium">
                            {client.company}
                          </div>
                        )}
                      </div>
                    </div>

                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold">
                      {client.status === 'active' ? 'پرتال فعال' : 'در انتظار تایید'}
                    </span>
                  </div>

                  <div className="text-xs space-y-1.5 pt-2 border-t border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 font-mono">
                    <div className="flex items-center justify-between">
                      <span className="font-sans text-[11px]">شماره تماس:</span>
                      <span>{client.phone}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-sans text-[11px]">ایمیل:</span>
                      <span className="truncate max-w-[160px]">{client.email}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-sans text-[11px]">پرونده‌های فعال:</span>
                      <span className="font-bold text-[#0B132B] dark:text-white">{client.activeCasesCount} پرونده</span>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => notify(`لینک ورود به پرتال برای موکل ${client.name} پیامک شد.`)}
                      className="px-3 py-1.5 rounded-xl bg-white dark:bg-gray-700 hover:bg-[#D4AF37]/20 text-xs font-bold transition-colors border border-gray-200 dark:border-gray-600"
                    >
                      ارسال لینک پرتال
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowManualAccountModal(true)}
                      className="text-xs text-[#AA820A] dark:text-[#D4AF37] font-bold hover:underline"
                    >
                      تغییر رمز موکل
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 3: BOOKINGS & CALENDAR                               */}
        {/* ======================================================== */}
        {activeTab === 'bookings' && (
          <div className="bg-white dark:bg-[#0B132B] rounded-3xl p-6 sm:p-8 border border-gray-200 dark:border-gray-800 shadow-sm space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100 dark:border-gray-800">
              <div>
                <h3 className="text-lg font-bold font-serif text-[#0B132B] dark:text-white">
                  مدیریت نوبت‌ها و مشاوره‌های حقوقی
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  تایید، هماهنگی و تغییر زمان نوبت‌های حضوری، آنلاین و تلفنی موکلین.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={bookingFilter}
                  onChange={(e) => setBookingFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-xs focus:outline-none focus:border-[#D4AF37] dark:text-white"
                >
                  <option value="همه">همه نوع مشاوره‌ها</option>
                  <option value="حضوری">مشاوره حضوری</option>
                  <option value="آنلاین تصویری">آنلاین تصویری</option>
                  <option value="تلفنی تخصصی">تلفنی تخصصی</option>
                </select>
              </div>
            </div>

            <div className="space-y-3">
              {filteredBookings.map((bk) => (
                <div
                  key={bk.id}
                  className="p-4 sm:p-5 rounded-2xl bg-gray-50 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-700 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-[#D4AF37]/50 transition-all"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-gray-900 dark:text-white">
                        {bk.clientName}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-purple-500/15 text-purple-700 dark:text-purple-400 text-[10px] font-bold">
                        {bk.consultationType}
                      </span>
                      <span className="text-xs text-gray-400 font-mono">
                        کد پیگیری: {bk.trackingCode}
                      </span>
                    </div>

                    <p className="text-xs text-gray-600 dark:text-gray-300">
                      موضوع: {bk.topic}
                    </p>

                    <div className="flex items-center gap-4 text-xs text-gray-500 font-mono">
                      <span>تاریخ: {bk.date}</span>
                      <span>ساعت: {bk.timeSlot}</span>
                      <span>تلفن: {bk.phone}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end md:self-center">
                    {bk.status !== 'تایید شده' && (
                      <button
                        type="button"
                        onClick={() => handleUpdateBookingStatus(bk.id, 'تایید شده')}
                        className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors"
                      >
                        تأیید نوبت
                      </button>
                    )}
                    {bk.status !== 'انجام شده' && (
                      <button
                        type="button"
                        onClick={() => handleUpdateBookingStatus(bk.id, 'انجام شده')}
                        className="px-3 py-1.5 rounded-xl bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 text-xs font-bold transition-colors"
                      >
                        ثبت پایان جلسه
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 4: SITE SETTINGS & LAWYER CUSTOMIZATION              */}
        {/* ======================================================== */}
        {activeTab === 'settings' && (
          <div className="bg-white dark:bg-[#0B132B] rounded-3xl p-6 sm:p-8 border border-gray-200 dark:border-gray-800 shadow-sm space-y-6">
            
            <div className="pb-4 border-b border-gray-100 dark:border-gray-800">
              <h3 className="text-lg font-bold font-serif text-[#0B132B] dark:text-white">
                تنظیمات اختصاصی هویت و مشخصات وکیل در سراسر سایت
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                ویرایش نام، کد پروانه وکالت، تلفن، آدرس، شعار و عکس پرتره (بدون نیاز به کدنویسی).
              </p>
            </div>

            <form onSubmit={handleSaveSettings} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700 dark:text-gray-300">نام وکیل یا موسسه:</label>
                  <input
                    type="text"
                    value={settingsForm.lawyerName}
                    onChange={(e) => setSettingsForm({ ...settingsForm, lawyerName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-xs focus:outline-none focus:border-[#D4AF37] dark:text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700 dark:text-gray-300">عنوان و سوابق حقوقی:</label>
                  <input
                    type="text"
                    value={settingsForm.lawyerTitle}
                    onChange={(e) => setSettingsForm({ ...settingsForm, lawyerTitle: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-xs focus:outline-none focus:border-[#D4AF37] dark:text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700 dark:text-gray-300">شماره پروانه وکالت:</label>
                  <input
                    type="text"
                    value={settingsForm.licenseNumber}
                    onChange={(e) => setSettingsForm({ ...settingsForm, licenseNumber: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-xs focus:outline-none focus:border-[#D4AF37] dark:text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700 dark:text-gray-300">تلفن ثابت دفتر:</label>
                  <input
                    type="text"
                    value={settingsForm.phone}
                    onChange={(e) => setSettingsForm({ ...settingsForm, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-xs focus:outline-none focus:border-[#D4AF37] dark:text-white font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700 dark:text-gray-300">شماره همراه و پیام‌رسان:</label>
                  <input
                    type="text"
                    value={settingsForm.mobile}
                    onChange={(e) => setSettingsForm({ ...settingsForm, mobile: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-xs focus:outline-none focus:border-[#D4AF37] dark:text-white font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700 dark:text-gray-300">ساعات کاری و پاسخگویی:</label>
                  <input
                    type="text"
                    value={settingsForm.workingHours}
                    onChange={(e) => setSettingsForm({ ...settingsForm, workingHours: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-xs focus:outline-none focus:border-[#D4AF37] dark:text-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700 dark:text-gray-300">نشانی دقیق دفتر وکالت:</label>
                <input
                  type="text"
                  value={settingsForm.officeAddress}
                  onChange={(e) => setSettingsForm({ ...settingsForm, officeAddress: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-xs focus:outline-none focus:border-[#D4AF37] dark:text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700 dark:text-gray-300">آدرس تصویر پرتره رسمی وکیل (URL):</label>
                <input
                  type="text"
                  value={settingsForm.portraitImage}
                  onChange={(e) => setSettingsForm({ ...settingsForm, portraitImage: e.target.value })}
                  dir="ltr"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-xs focus:outline-none focus:border-[#D4AF37] dark:text-white font-mono"
                />
              </div>

              <button
                type="submit"
                className="btn-gold px-6 py-3 rounded-2xl text-xs sm:text-sm font-bold shadow-md hover:scale-[1.01] transition-all"
              >
                ذخیره و اعمال در کل وب‌سایت
              </button>
            </form>

          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 5: HELP & DOCS EMBEDDED SYSTEM                       */}
        {/* ======================================================== */}
        {activeTab === 'help' && (
          <div className="bg-white dark:bg-[#0B132B] rounded-3xl p-6 sm:p-8 border border-gray-200 dark:border-gray-800 shadow-sm">
            <AdminHelpAndDocsSystem
              onNavigateSection={(sec) => {
                if (sec === 'cases') setActiveTab('cases');
                else if (sec === 'clients') setActiveTab('clients');
                else if (sec === 'bookings') setActiveTab('bookings');
                else if (sec === 'technical') setActiveTab('settings');
              }}
            />
          </div>
        )}

      </div>

      {/* Add Case Modal */}
      {showAddCaseModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#0B132B] rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-gray-200 dark:border-gray-800 shadow-2xl space-y-4 text-right">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
              <h3 className="font-bold text-base text-gray-900 dark:text-white">تشکیل پرونده حقوقی جدید</h3>
              <button onClick={() => setShowAddCaseModal(false)} className="text-gray-400 hover:text-gray-600 p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddCase} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold mb-1">شماره پرونده:</label>
                <input
                  type="text"
                  value={newCaseNumber}
                  onChange={(e) => setNewCaseNumber(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 font-mono"
                />
              </div>

              <div>
                <label className="block font-bold mb-1">نام کامل موکل:</label>
                <input
                  type="text"
                  value={newClientName}
                  onChange={(e) => setNewClientName(e.target.value)}
                  placeholder="مثال: شرکت بازرگانی کیمیا"
                  required
                  className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700"
                />
              </div>

              <div>
                <label className="block font-bold mb-1">شماره همراه موکل:</label>
                <input
                  type="text"
                  value={newClientPhone}
                  onChange={(e) => setNewClientPhone(e.target.value)}
                  placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                  className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 font-mono"
                />
              </div>

              <div>
                <label className="block font-bold mb-1">موضوع دعوا:</label>
                <select
                  value={newCaseType}
                  onChange={(e) => setNewCaseType(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 font-bold"
                >
                  <option value="تجاری">دعاوی تجاری و قراردادها</option>
                  <option value="ملکی">دعاوی ملکی و ثبتی</option>
                  <option value="کیفری">جرایم اقتصادی و کیفری</option>
                  <option value="خانواده">حقوق خانواده</option>
                  <option value="ارث">انحصار وراثت و تقسیم ترکه</option>
                  <option value="کار و بیمه">دعاوی کار و تأمین اجتماعی</option>
                </select>
              </div>

              <div>
                <label className="block font-bold mb-1">موعد جلسه بعدی دادگاه:</label>
                <input
                  type="text"
                  value={newNextSession}
                  onChange={(e) => setNewNextSession(e.target.value)}
                  placeholder="۱۴۰۳/۰۸/۱۵ - شعبه ۴ دادگاه عمومی"
                  className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700"
                />
              </div>

              <div>
                <label className="block font-bold mb-1">یادداشت اولیه پرونده:</label>
                <textarea
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddCaseModal(false)}
                  className="px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-700 text-xs font-bold"
                >
                  انصراف
                </button>
                <button type="submit" className="btn-gold px-5 py-2 rounded-xl text-xs font-bold">
                  ثبت پرونده
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Manual Account Creator Modal */}
      <ManualAccountCreatorModal
        isOpen={showManualAccountModal}
        onClose={() => setShowManualAccountModal(false)}
        lawyerName={profile.lawyerName}
        lawyerPhone={profile.phone}
        onAccountCreated={() => notify('حساب کاربری جدید برای موکل با موفقیت ایجاد گردید.')}
      />

      {/* Print Profile Bio Card Modal */}
      <LawyerPrintBioCard
        isOpen={showPrintModal}
        onClose={() => setShowPrintModal(false)}
        profile={profile}
      />

    </div>
  );
};
