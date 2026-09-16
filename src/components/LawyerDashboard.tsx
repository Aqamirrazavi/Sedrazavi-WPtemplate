import React, { useState, useEffect } from 'react';
import { CASES_INITIAL_DATA, SERVICES_DATA } from '../data/mockData';
import { CaseItem } from '../types/theme';
import { FrontendCommentsModeration } from './FrontendCommentsModeration';
import { ClientPortalView } from './ClientPortalView';
import { LawyerCustomizerTab } from './LawyerCustomizerTab';
import { ManualAccountCreatorModal } from './ManualAccountCreatorModal';
import { AdminAppearanceTab } from './admin/AdminAppearanceTab';
import { AdminBannerTab } from './admin/AdminBannerTab';
import { AdminContactCardsTab } from './admin/AdminContactCardsTab';
import { AdminInstagramTab } from './admin/AdminInstagramTab';
import { AdminSystemStatusTab } from './admin/AdminSystemStatusTab';
import { AdminBackupTab } from './admin/AdminBackupTab';
import { AdminLogsTab } from './admin/AdminLogsTab';
import { AttorneyExecutiveDashboard } from './admin/AttorneyExecutiveDashboard';
import {
  LawyerSiteProfile,
  getStoredLawyerProfile,
} from '../utils/lawyerCustomizationStorage';
import {
  Scale,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  AlertTriangle,
  FileText,
  Calendar,
  Phone,
  User,
  ArrowRight,
  TrendingUp,
  Download,
  Trash2,
  Edit3,
  MessageSquare,
  Briefcase,
  Sliders,
  Sparkles,
  UserPlus,
  KeyRound,
  Palette,
  Layers,
  MapPin,
  Instagram,
  Server,
  HardDrive,
  Activity,
  ChevronDown,
} from 'lucide-react';

export type AdminSubTabKey =
  | 'dashboard'
  | 'appearance'
  | 'banner'
  | 'contact-cards'
  | 'instagram'
  | 'system-status'
  | 'backup'
  | 'logs'
  | 'comments'
  | 'customizer';

interface LawyerDashboardProps {
  initialPortalMode?: 'attorney' | 'client';
  userPhoneNumber?: string;
  userName?: string;
  onLogout?: () => void;
  onOpenBooking?: () => void;
  lawyerProfile?: LawyerSiteProfile;
  onUpdateLawyerProfile?: (profile: LawyerSiteProfile) => void;
}

export const LawyerDashboard: React.FC<LawyerDashboardProps> = ({
  initialPortalMode = 'attorney',
  userPhoneNumber,
  userName,
  onLogout,
  onOpenBooking,
  lawyerProfile: externalProfile,
  onUpdateLawyerProfile,
}) => {
  const [portalMode, setPortalMode] = useState<'attorney' | 'client'>(initialPortalMode);
  const [activeSubTab, setActiveSubTab] = useState<AdminSubTabKey>('dashboard');
  const [lawyerProfile, setLawyerProfile] = useState<LawyerSiteProfile>(
    externalProfile || getStoredLawyerProfile()
  );

  useEffect(() => {
    if (externalProfile) {
      setLawyerProfile(externalProfile);
    }
  }, [externalProfile]);

  const handleProfileUpdated = (updated: LawyerSiteProfile) => {
    setLawyerProfile(updated);
    if (onUpdateLawyerProfile) {
      onUpdateLawyerProfile(updated);
    }
  };

  const [cases, setCases] = useState<CaseItem[]>(CASES_INITIAL_DATA);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('همه');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showManualAccountModal, setShowManualAccountModal] = useState(false);

  // New Case Form state
  const [newCaseNumber, setNewCaseNumber] = useState(`۱۴۰۳-${(cases.length + 1).toString().padStart(3, '0')}`);
  const [newClientName, setNewClientName] = useState('');
  const [newClientPhone, setNewClientPhone] = useState('');
  const [newCaseType, setNewCaseType] = useState<CaseItem['caseType']>('تجاری');
  const [newNextSession, setNewNextSession] = useState('');
  const [newNotes, setNewNotes] = useState('');

  const handleAddCase = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClientName || !newClientPhone) return;

    const newCase: CaseItem = {
      id: `case-${Date.now()}`,
      caseNumber: newCaseNumber,
      clientName: newClientName,
      clientPhone: newClientPhone,
      caseType: newCaseType,
      registrationDate: '۱۴۰۳/۰۶/۰۱',
      status: 'در حال بررسی',
      nextCourtSession: newNextSession || 'در انتظار تعیین وقت شعبه',
      documentsCount: 4,
      notes: newNotes || 'پرونده جدید ثبت شد.',
    };

    setCases([newCase, ...cases]);
    setShowAddModal(false);
    setNewClientName('');
    setNewClientPhone('');
    setNewNotes('');
  };

  const handleDeleteCase = (id: string) => {
    if (confirm('آیا از حذف این پرونده از سامانه اطمینان دارید؟')) {
      setCases(cases.filter((c) => c.id !== id));
    }
  };

  const filteredCases = cases.filter((c) => {
    const matchesSearch =
      c.clientName.includes(searchTerm) ||
      c.caseNumber.includes(searchTerm) ||
      c.clientPhone.includes(searchTerm) ||
      c.caseType.includes(searchTerm);

    const matchesStatus =
      selectedStatusFilter === 'همه' || c.status === selectedStatusFilter;

    return matchesSearch && matchesStatus;
  });

  // Calculate status counts for donut chart
  const statusCounts = {
    underReview: cases.filter((c) => c.status === 'در حال بررسی').length,
    inProgress: cases.filter((c) => c.status === 'در جریان').length,
    closed: cases.filter((c) => c.status === 'بسته شده' || c.status === 'به رأی نهایی رسیده').length,
  };

  const totalCases = cases.length;

  return (
    <div className="py-8 bg-[#F4F6F9] dark:bg-[#070D1E] min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Main Portal Role Switcher: Attorney Console vs Client Portal */}
        <div className="p-2 rounded-2xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 pr-2">
            <Scale className="w-5 h-5 text-[#D4AF37]" />
            <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
              انتخاب بخش کاربری سامانه:
            </span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => setPortalMode('attorney')}
              className={`flex-1 sm:flex-initial px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                portalMode === 'attorney'
                  ? 'bg-gradient-to-r from-[#0B132B] to-[#1C2541] text-white border border-[#D4AF37]/50 shadow-md'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-[#0B132B] dark:hover:text-white'
              }`}
            >
              <Briefcase className="w-4 h-4 text-[#D4AF37]" />
              <span>🛡️ پنل مدیریت وکیل و دفتر</span>
            </button>

            <button
              onClick={() => setPortalMode('client')}
              className={`flex-1 sm:flex-initial px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                portalMode === 'client'
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#AA820A] text-[#0B132B] shadow-md shadow-[#D4AF37]/30'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-[#D4AF37]'
              }`}
            >
              <User className="w-4 h-4" />
              <span>👤 پرتال کاربری موکلین و مراجعین</span>
            </button>
          </div>
        </div>

        {portalMode === 'client' ? (
          <ClientPortalView
            userPhoneNumber={userPhoneNumber}
            userName={userName}
            onLogout={onLogout}
            onOpenBooking={onOpenBooking}
            onBackToMainDashboard={() => setPortalMode('attorney')}
          />
        ) : (
          <div className="space-y-8">
        {/* Dashboard Title & Top Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200 dark:border-gray-800">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-bold font-serif text-[#0B132B] dark:text-white">
                میز کار و داشبورد مدیریت وکالت
              </h1>
              <span className="px-3 py-1 rounded-full bg-[#2A9D8F]/15 text-[#2A9D8F] text-xs font-bold">
                پنل مدیریت وکیل
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
              مدیریت لحظه‌ای پرونده‌های قضایی، جلسات محاکم، نوبت‌های رزرو شده و دیدگاه‌های موکلین.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setShowManualAccountModal(true)}
              className="px-3.5 py-2 rounded-xl bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm"
              title="ساخت اکانت برای موکل بدون نیاز به پیامک (با تولید پسورد تصادفی و تحویل در پیام‌رسان)"
            >
              <UserPlus className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>ساخت اکانت بدون SMS</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-600 text-white font-mono">پیام‌رسان</span>
            </button>

            {activeSubTab === 'dashboard' && (
              <button
                onClick={() => setShowAddModal(true)}
                className="btn-gold text-xs sm:text-sm px-4 py-2 rounded-xl flex items-center gap-2 shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>ثبت پرونده جدید</span>
              </button>
            )}
          </div>
        </div>

        {/* Phase 3 Admin Subtabs Navigation Bar */}
        <div className="p-1.5 rounded-2xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-sm flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveSubTab('dashboard')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeSubTab === 'dashboard'
                ? 'bg-gradient-to-r from-[#0B132B] to-[#1C2541] text-white border border-[#D4AF37]/50 shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-[#0B132B] dark:hover:text-white'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>۱. داشبورد و پرونده‌ها (۷ بخش)</span>
          </button>

          <button
            onClick={() => setActiveSubTab('appearance')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeSubTab === 'appearance'
                ? 'bg-gradient-to-r from-[#0B132B] to-[#1C2541] text-white border border-[#D4AF37]/50 shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-[#0B132B] dark:hover:text-white'
            }`}
          >
            <Palette className="w-3.5 h-3.5 text-pink-500" />
            <span>۲. تنظیمات ظاهری (۶ تب)</span>
          </button>

          <button
            onClick={() => setActiveSubTab('banner')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeSubTab === 'banner'
                ? 'bg-gradient-to-r from-[#0B132B] to-[#1C2541] text-white border border-[#D4AF37]/50 shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-[#0B132B] dark:hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-amber-500" />
            <span>۳. بنر اسلایدر متنی (۴ تب)</span>
          </button>

          <button
            onClick={() => setActiveSubTab('contact-cards')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeSubTab === 'contact-cards'
                ? 'bg-gradient-to-r from-[#0B132B] to-[#1C2541] text-white border border-[#D4AF37]/50 shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-[#0B132B] dark:hover:text-white'
            }`}
          >
            <MapPin className="w-3.5 h-3.5 text-emerald-500" />
            <span>۴. تماس، تیم و نقشه (۵ تب)</span>
          </button>

          <button
            onClick={() => setActiveSubTab('instagram')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeSubTab === 'instagram'
                ? 'bg-gradient-to-r from-[#0B132B] to-[#1C2541] text-white border border-[#D4AF37]/50 shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-[#0B132B] dark:hover:text-white'
            }`}
          >
            <Instagram className="w-3.5 h-3.5 text-pink-600" />
            <span>۵. اینستاگرام (۳ تب)</span>
          </button>

          <button
            onClick={() => setActiveSubTab('system-status')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeSubTab === 'system-status'
                ? 'bg-gradient-to-r from-[#0B132B] to-[#1C2541] text-white border border-[#D4AF37]/50 shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-[#0B132B] dark:hover:text-white'
            }`}
          >
            <Server className="w-3.5 h-3.5 text-sky-500" />
            <span>۶. وضعیت سیستم (۶ بخش)</span>
          </button>

          <button
            onClick={() => setActiveSubTab('backup')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeSubTab === 'backup'
                ? 'bg-gradient-to-r from-[#0B132B] to-[#1C2541] text-white border border-[#D4AF37]/50 shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-[#0B132B] dark:hover:text-white'
            }`}
          >
            <HardDrive className="w-3.5 h-3.5 text-indigo-500" />
            <span>۷. پشتیبان‌گیری (۳ تب)</span>
          </button>

          <button
            onClick={() => setActiveSubTab('logs')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeSubTab === 'logs'
                ? 'bg-gradient-to-r from-[#0B132B] to-[#1C2541] text-white border border-[#D4AF37]/50 shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-[#0B132B] dark:hover:text-white'
            }`}
          >
            <Activity className="w-3.5 h-3.5 text-red-500" />
            <span>۸. لاگ‌ها و دیباگ (۳ تب)</span>
          </button>

          <button
            onClick={() => setActiveSubTab('comments')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeSubTab === 'comments'
                ? 'bg-gradient-to-r from-[#0B132B] to-[#1C2541] text-white border border-[#D4AF37]/50 shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-[#0B132B] dark:hover:text-white'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5 text-teal-500" />
            <span>۹. نظارت بر دیدگاه‌ها</span>
          </button>

          <button
            onClick={() => setActiveSubTab('customizer')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeSubTab === 'customizer'
                ? 'bg-[#D4AF37] text-[#0B132B] font-black shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-[#0B132B] dark:hover:text-white'
            }`}
          >
            <Sliders className="w-3.5 h-3.5 text-[#AA820A] dark:text-[#0B132B]" />
            <span>۱۰. هویت کامل وکیل</span>
          </button>
        </div>

        {/* Content Views */}
        {activeSubTab === 'appearance' ? (
          <AdminAppearanceTab
            profile={lawyerProfile}
            onUpdateProfile={handleProfileUpdated}
          />
        ) : activeSubTab === 'banner' ? (
          <AdminBannerTab
            profile={lawyerProfile}
            onUpdateProfile={handleProfileUpdated}
          />
        ) : activeSubTab === 'contact-cards' ? (
          <AdminContactCardsTab
            profile={lawyerProfile}
            onUpdateProfile={handleProfileUpdated}
          />
        ) : activeSubTab === 'instagram' ? (
          <AdminInstagramTab
            profile={lawyerProfile}
            onUpdateProfile={handleProfileUpdated}
          />
        ) : activeSubTab === 'system-status' ? (
          <AdminSystemStatusTab />
        ) : activeSubTab === 'backup' ? (
          <AdminBackupTab
            profile={lawyerProfile}
            onUpdateProfile={handleProfileUpdated}
          />
        ) : activeSubTab === 'logs' ? (
          <AdminLogsTab />
        ) : activeSubTab === 'comments' ? (
          <FrontendCommentsModeration />
        ) : activeSubTab === 'customizer' ? (
          <LawyerCustomizerTab
            profile={lawyerProfile}
            onUpdateProfile={handleProfileUpdated}
          />
        ) : (
          <div className="space-y-8">
            {/* 7 Sections of the Attorney Executive Dashboard */}
            <AttorneyExecutiveDashboard
              cases={cases}
              onOpenAddCaseModal={() => setShowAddModal(true)}
              onOpenManualAccountModal={() => setShowManualAccountModal(true)}
            />

        {/* Case Management Table */}
        <div className="bg-white dark:bg-[#0B132B] rounded-3xl p-6 sm:p-8 border border-gray-200 dark:border-gray-800 shadow-sm space-y-6">
          
          {/* Table Header Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold font-serif text-[#0B132B] dark:text-white">
                لیست پرونده‌های حقوقی و کیفری
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                مشاهده، ویرایش وضعیت دادرسی و جستجوی لحظه‌ای بر اساس نام موکل یا شماره پرونده.
              </p>
            </div>

            {/* Search & Filter Bar */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="جستجو در پرونده‌ها..."
                  className="pl-4 pr-9 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-xs focus:outline-none focus:border-[#D4AF37] dark:text-white w-48 sm:w-64"
                />
                <Search className="w-4 h-4 text-gray-400 absolute right-3 top-2.5" />
              </div>

              <select
                value={selectedStatusFilter}
                onChange={(e) => setSelectedStatusFilter(e.target.value)}
                className="px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-xs focus:outline-none focus:border-[#D4AF37] dark:text-white font-medium"
              >
                <option value="همه">همه وضعیت‌ها</option>
                <option value="در حال بررسی">در حال بررسی</option>
                <option value="در جریان">در جریان</option>
                <option value="به رأی نهایی رسیده">به رأی نهایی رسیده</option>
                <option value="بسته شده">بسته شده</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs sm:text-sm">
              <thead className="bg-gray-50 dark:bg-gray-800/80 text-gray-500 dark:text-gray-400 border-y border-gray-200 dark:border-gray-800">
                <tr>
                  <th className="py-3.5 px-4 font-bold">شماره پرونده</th>
                  <th className="py-3.5 px-4 font-bold">نام موکل</th>
                  <th className="py-3.5 px-4 font-bold">موضوع دعوا</th>
                  <th className="py-3.5 px-4 font-bold">وضعیت فعلی</th>
                  <th className="py-3.5 px-4 font-bold">جلسه بعدی دادگاه</th>
                  <th className="py-3.5 px-4 font-bold">اسناد</th>
                  <th className="py-3.5 px-4 font-bold text-center">عملیات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {filteredCases.map((c) => (
                  <tr key={c.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors">
                    <td className="py-4 px-4 font-mono font-bold text-[#D4AF37]">
                      {c.caseNumber}
                    </td>
                    <td className="py-4 px-4 font-bold text-gray-900 dark:text-white">
                      <div>{c.clientName}</div>
                      <div className="text-[11px] text-gray-400 font-mono font-normal">{c.clientPhone}</div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-semibold">
                        {c.caseType}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold ${
                          c.status === 'به رأی نهایی رسیده' || c.status === 'بسته شده'
                            ? 'bg-emerald-500/15 text-emerald-600'
                            : c.status === 'در جریان'
                            ? 'bg-blue-500/15 text-blue-600'
                            : 'bg-amber-500/15 text-amber-600'
                        }`}
                      >
                        {c.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-xs text-gray-600 dark:text-gray-300">
                      {c.nextCourtSession}
                    </td>
                    <td className="py-4 px-4">
                      <span className="flex items-center gap-1 text-gray-500 text-xs">
                        <FileText className="w-3.5 h-3.5 text-[#D4AF37]" />
                        {c.documentsCount} سند
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => alert(`یادداشت پرونده ${c.caseNumber}:\n\n${c.notes}`)}
                          className="p-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:text-[#D4AF37] hover:border-[#D4AF37]"
                          title="مشاهده یادداشت‌ها"
                        >
                          <FileText className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteCase(c.id)}
                          className="p-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:text-red-500 hover:border-red-500"
                          title="حذف پرونده"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>

          </div>
        )}
          </div>
        )}

      </div>

      {/* Add New Case Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-white dark:bg-[#0B132B] rounded-2xl shadow-2xl border border-[#D4AF37]/40 p-6 space-y-5 text-right">
            <h3 className="text-lg font-bold font-serif text-[#0B132B] dark:text-white flex items-center gap-2">
              <Plus className="w-5 h-5 text-[#D4AF37]" />
              ثبت پرونده جدید در سامانه دادمان
            </h3>

            <form onSubmit={handleAddCase} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                    شماره پرونده
                  </label>
                  <input
                    type="text"
                    required
                    value={newCaseNumber}
                    onChange={(e) => setNewCaseNumber(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-xs dark:text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                    موضوع پرونده
                  </label>
                  <select
                    value={newCaseType}
                    onChange={(e) => setNewCaseType(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-xs dark:text-white"
                  >
                    <option value="تجاری">تجاری و شرکت‌ها</option>
                    <option value="ملکی">ملکی و ثبتی</option>
                    <option value="کیفری">کیفری و اقتصادی</option>
                    <option value="خانواده">خانواده و مهریه</option>
                    <option value="ارث">انحصار وراثت</option>
                    <option value="کار و بیمه">کار و تأمین اجتماعی</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                  نام موکل / شرکت طرف قرارداد
                </label>
                <input
                  type="text"
                  required
                  value={newClientName}
                  onChange={(e) => setNewClientName(e.target.value)}
                  placeholder="مثال: مهندس رامین صدری"
                  className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-xs dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                  شماره تماس همراه موکل
                </label>
                <input
                  type="tel"
                  required
                  value={newClientPhone}
                  onChange={(e) => setNewClientPhone(e.target.value)}
                  placeholder="۰۹۱۲..."
                  dir="ltr"
                  className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-xs dark:text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                  تاریخ و ساعت جلسه بعدی دادگاه (یا شعبه رسیدگی‌کننده)
                </label>
                <input
                  type="text"
                  value={newNextSession}
                  onChange={(e) => setNewNextSession(e.target.value)}
                  placeholder="مثال: ۱۴۰۳/۰۶/۲۵ - ساعت ۱۰:۰۰ شعبه ۴ دادگاه حقوقی"
                  className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-xs dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                  یادداشت و دستورات کاری وکیل
                </label>
                <textarea
                  rows={2}
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  placeholder="خلاصه خواسته یا اقدامات لازم..."
                  className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-xs dark:text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-200 dark:border-gray-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700 text-xs font-semibold text-gray-700 dark:text-gray-300"
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  className="btn-gold px-5 py-2 text-xs font-bold rounded-xl"
                >
                  افزودن پرونده
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Manual Client Account Creator Modal (Without SMS) */}
      <ManualAccountCreatorModal
        isOpen={showManualAccountModal}
        onClose={() => setShowManualAccountModal(false)}
        lawyerName={lawyerProfile?.lawyerName}
        lawyerPhone={lawyerProfile?.phone}
        onAccountCreated={(acc) => {
          // Add notification or handle state if needed
        }}
      />
    </div>
  );
};
