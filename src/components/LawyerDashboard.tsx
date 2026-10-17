import React, { useState, useEffect } from 'react';
import { CASES_INITIAL_DATA, SERVICES_DATA, ATTORNEY_INFO } from '../data/mockData';
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
import { AdminContentTab } from './admin/AdminContentTab';
import { AdminBookingsTab } from './admin/AdminBookingsTab';
import { AdminInvoicesTab } from './admin/AdminInvoicesTab';
import { AdminEmailsTab } from './admin/AdminEmailsTab';
import { ClientAccountManager } from './ClientAccountManager';
import { CourtFeeCalculator } from './legal-finance/CourtFeeCalculator';
import { HtmlCssExportModal } from './HtmlCssExportModal';
import { ReactShortcodeGeneratorModal } from './ReactShortcodeGeneratorModal';
import { AdminReactShortcodesTab } from './admin/AdminReactShortcodesTab';
import { KeyPracticeAreasRadarChart } from './KeyPracticeAreasRadarChart';
import { AdvancedCaseFilterSuite } from './cases/AdvancedCaseFilterSuite';
import { WordPressPackagingAndStudioTab } from './admin/WordPressPackagingAndStudioTab';
import { LawyerPrintBioCard } from './LawyerPrintBioCard';
import { LawyerAdminPlaybookModal } from './admin/LawyerAdminPlaybookModal';
import { LawyerRealtimeToastNotifier } from './notifications/LawyerRealtimeToastNotifier';
import { AdminAssociatesDelegationTab } from './admin/AdminAssociatesDelegationTab';
import { downloadCaseloadCsvFile } from '../utils/caseloadCsvExporter';
import {
  LawyerSiteProfile,
  getStoredLawyerProfile,
} from '../utils/lawyerCustomizationStorage';
import { usePresetConfig } from '../hooks/usePresetConfig';
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
  ChevronLeft,
  ChevronRight,
  Calculator,
  UserCheck,
  Code,
  FileCode,
  Printer,
  X,
  FileSpreadsheet,
  BookOpen,
  Users,
  Settings,
  PanelLeftClose,
  PanelLeftOpen,
  Wrench,
  ExternalLink,
  Package,
  LogOut,
} from 'lucide-react';

export type AdminSubTabKey =
  | 'dashboard'
  | 'associates-delegation'
  | 'content'
  | 'bookings'
  | 'invoices'
  | 'emails'
  | 'clients'
  | 'calculators'
  | 'appearance'
  | 'banner'
  | 'contact-cards'
  | 'instagram'
  | 'system-status'
  | 'backup'
  | 'logs'
  | 'comments'
  | 'customizer'
  | 'react-php-generator'
  | 'wp-packaging-studio';

interface LawyerDashboardProps {
  initialPortalMode?: 'attorney' | 'client';
  userPhoneNumber?: string;
  userName?: string;
  userRole?: 'admin' | 'lawyer' | 'client';
  isAdminActingAsLawyer?: boolean;
  onLogout?: () => void;
  onOpenBooking?: () => void;
  lawyerProfile?: LawyerSiteProfile;
  onUpdateLawyerProfile?: (profile: LawyerSiteProfile) => void;
  onSwitchToAdminPortal?: () => void;
  serverContext?: any;
}

export const LawyerDashboard: React.FC<LawyerDashboardProps> = ({
  initialPortalMode = 'attorney',
  userPhoneNumber,
  userName,
  userRole = 'admin',
  isAdminActingAsLawyer: isAdminActingAsLawyerProp,
  onLogout,
  onOpenBooking,
  lawyerProfile: externalProfile,
  onUpdateLawyerProfile,
  onSwitchToAdminPortal,
  serverContext,
}) => {
  const { preset, modularSettings } = usePresetConfig();
  const [portalMode, setPortalMode] = useState<'attorney' | 'client'>(initialPortalMode);
  const [activeCategory, setActiveCategory] = useState<'docket' | 'comms' | 'finance' | 'branding' | 'system'>('docket');
  const [activeSubTab, setActiveSubTabState] = useState<AdminSubTabKey>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showToolsDropdown, setShowToolsDropdown] = useState(false);

  const setActiveSubTab = (tab: AdminSubTabKey) => {
    setActiveSubTabState(tab);
    if (['dashboard', 'associates-delegation'].includes(tab)) setActiveCategory('docket');
    else if (['clients', 'bookings', 'emails', 'comments'].includes(tab)) setActiveCategory('comms');
    else if (['invoices', 'calculators'].includes(tab)) setActiveCategory('finance');
    else if (['content', 'banner', 'contact-cards', 'instagram'].includes(tab)) setActiveCategory('branding');
    else if (['appearance', 'customizer', 'system-status', 'backup', 'logs', 'react-php-generator', 'wp-packaging-studio'].includes(tab)) setActiveCategory('system');
  };

  const handleSelectCategory = (cat: 'docket' | 'comms' | 'finance' | 'branding' | 'system') => {
    setActiveCategory(cat);
    if (cat === 'docket') setActiveSubTabState('dashboard');
    else if (cat === 'comms') setActiveSubTabState('clients');
    else if (cat === 'finance') setActiveSubTabState('invoices');
    else if (cat === 'branding') setActiveSubTabState('content');
    else if (cat === 'system') setActiveSubTabState('appearance');
  };

  const [isAdminActingAsLawyer, setIsAdminActingAsLawyer] = useState<boolean>(() => {
    if (typeof isAdminActingAsLawyerProp === 'boolean') return isAdminActingAsLawyerProp;
    if (userRole === 'admin') return true;
    if (typeof window !== 'undefined' && Boolean((window as any).SedRazaviReactConfig?.currentUser?.isAdmin)) return true;
    return true; // Default admin capability available
  });
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
  const [showAddModal, setShowAddModal] = useState(false);
  const [showManualAccountModal, setShowManualAccountModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showReactPhpGeneratorModal, setShowReactPhpGeneratorModal] = useState(false);
  const [showPrintProfileModal, setShowPrintProfileModal] = useState(false);
  const [showPlaybookModal, setShowPlaybookModal] = useState(false);
  const [downloadNotification, setDownloadNotification] = useState<string | null>(null);

  const handleDownloadCaseloadCsv = () => {
    const result = downloadCaseloadCsvFile(lawyerProfile, cases);
    setDownloadNotification(
      `گزارش جامع داده‌ها با موفقیت دانلود شد (${result.filename} شامل ${cases.length} پرونده جاری، ۶ حوزه تخصصی و تعاملات موکلین).`
    );
    setTimeout(() => {
      setDownloadNotification(null);
    }, 6000);
  };

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
      registrationDate: '۱۴۰۳/۰۶/۱۷',
      lastActivityDate: '۱۴۰۳/۰۶/۱۷',
      lastActivitySummary: 'ثبت پرونده و مدارک اولیه در داکت اختصاصی',
      priority: 'normal',
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
          <div className="flex flex-col lg:flex-row gap-6 items-start">
            {/* Collapsible GitHub & Peycode Style Sidebar */}
            <aside
              className={`shrink-0 bg-white dark:bg-[#0B132B] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm transition-all duration-200 overflow-hidden ${
                sidebarCollapsed ? 'w-full lg:w-20' : 'w-full lg:w-64'
              }`}
            >
              {/* Sidebar Header */}
              <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                {!sidebarCollapsed ? (
                  <div className="min-w-0 flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-sm shrink-0">
                      ⚖️
                    </div>
                    <div className="min-w-0">
                      <h2 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                        {lawyerProfile?.lawyerName || ATTORNEY_INFO.name}
                      </h2>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                        {preset.terms.expert || 'وکیل و مشاور'}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="mx-auto w-8 h-8 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-sm">
                    ⚖️
                  </div>
                )}

                <button
                  onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  title={sidebarCollapsed ? 'باز کردن سایدبار' : 'جمع کردن سایدبار'}
                >
                  {sidebarCollapsed ? <PanelLeftOpen className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
                </button>
              </div>

              {/* Sidebar Navigation Groups */}
              <div className="p-2.5 space-y-4 max-h-[calc(100vh-220px)] overflow-y-auto">
                {/* 1. Overview & Docket */}
                <div>
                  {!sidebarCollapsed && (
                    <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                      میزکار و امور جاری
                    </div>
                  )}
                  <div className="space-y-1">
                    <button
                      onClick={() => setActiveSubTab('dashboard')}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all text-right ${
                        activeSubTab === 'dashboard'
                          ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm'
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                      }`}
                      title="کارتابل و پرونده‌ها"
                    >
                      <Briefcase className="w-4 h-4 shrink-0 text-[#D4AF37]" />
                      {!sidebarCollapsed && <span>کارتابل و {preset.terms.cases}</span>}
                    </button>

                    <button
                      onClick={() => setActiveSubTab('associates-delegation')}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all text-right ${
                        activeSubTab === 'associates-delegation'
                          ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm'
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                      }`}
                      title="همکاران و ارجاع"
                    >
                      <Users className="w-4 h-4 shrink-0 text-amber-500" />
                      {!sidebarCollapsed && <span>همکاران و ارجاع</span>}
                    </button>
                  </div>
                </div>

                {/* 2. Clients & Comms */}
                <div>
                  {!sidebarCollapsed && (
                    <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                      ارتباط با {preset.terms.clients}
                    </div>
                  )}
                  <div className="space-y-1">
                    <button
                      onClick={() => setActiveSubTab('clients')}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all text-right ${
                        activeSubTab === 'clients'
                          ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm'
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                      }`}
                      title={`مدیریت ${preset.terms.clients}`}
                    >
                      <UserCheck className="w-4 h-4 shrink-0 text-emerald-500" />
                      {!sidebarCollapsed && <span>مدیریت {preset.terms.clients}</span>}
                    </button>

                    <button
                      onClick={() => setActiveSubTab('bookings')}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all text-right ${
                        activeSubTab === 'bookings'
                          ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm'
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                      }`}
                      title="نوبت‌ها و جلسات"
                    >
                      <Calendar className="w-4 h-4 shrink-0 text-sky-500" />
                      {!sidebarCollapsed && <span>نوبت‌ها و جلسات</span>}
                    </button>

                    <button
                      onClick={() => setActiveSubTab('emails')}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all text-right ${
                        activeSubTab === 'emails'
                          ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm'
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                      }`}
                      title="صندوق پیام‌ها"
                    >
                      <MessageSquare className="w-4 h-4 shrink-0 text-indigo-500" />
                      {!sidebarCollapsed && <span>صندوق پیام‌ها</span>}
                    </button>

                    <button
                      onClick={() => setActiveSubTab('comments')}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all text-right ${
                        activeSubTab === 'comments'
                          ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm'
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                      }`}
                      title="دیدگاه‌ها و نظرات"
                    >
                      <CheckCircle2 className="w-4 h-4 shrink-0 text-teal-500" />
                      {!sidebarCollapsed && <span>دیدگاه‌ها و نظرات</span>}
                    </button>
                  </div>
                </div>

                {/* 3. Finance & Calculators */}
                <div>
                  {!sidebarCollapsed && (
                    <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                      امور مالی و ابزارها
                    </div>
                  )}
                  <div className="space-y-1">
                    <button
                      onClick={() => setActiveSubTab('invoices')}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all text-right ${
                        activeSubTab === 'invoices'
                          ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm'
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                      }`}
                      title="صورتحساب‌ها و مالی"
                    >
                      <Scale className="w-4 h-4 shrink-0 text-amber-500" />
                      {!sidebarCollapsed && <span>صورتحساب‌ها و مالی</span>}
                    </button>

                    <button
                      onClick={() => setActiveSubTab('calculators')}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all text-right ${
                        activeSubTab === 'calculators'
                          ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm'
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                      }`}
                      title="میز محاسبات قضایی"
                    >
                      <Calculator className="w-4 h-4 shrink-0 text-[#D4AF37]" />
                      {!sidebarCollapsed && <span>میز محاسبات</span>}
                    </button>
                  </div>
                </div>

                {/* 4. Content & Website */}
                <div>
                  {!sidebarCollapsed && (
                    <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                      محتوا و وب‌سایت
                    </div>
                  )}
                  <div className="space-y-1">
                    <button
                      onClick={() => setActiveSubTab('content')}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all text-right ${
                        activeSubTab === 'content'
                          ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm'
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                      }`}
                      title="مقالات و خدمات"
                    >
                      <FileText className="w-4 h-4 shrink-0 text-blue-500" />
                      {!sidebarCollapsed && <span>مقالات و خدمات</span>}
                    </button>

                    <button
                      onClick={() => setActiveSubTab('banner')}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all text-right ${
                        activeSubTab === 'banner'
                          ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm'
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                      }`}
                      title="بنر اسلایدر"
                    >
                      <Layers className="w-4 h-4 shrink-0 text-amber-500" />
                      {!sidebarCollapsed && <span>بنر و اعلانات</span>}
                    </button>

                    <button
                      onClick={() => setActiveSubTab('contact-cards')}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all text-right ${
                        activeSubTab === 'contact-cards'
                          ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm'
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                      }`}
                      title="تماس و نقشه"
                    >
                      <MapPin className="w-4 h-4 shrink-0 text-emerald-500" />
                      {!sidebarCollapsed && <span>تماس و نقشه</span>}
                    </button>

                    <button
                      onClick={() => setActiveSubTab('instagram')}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all text-right ${
                        activeSubTab === 'instagram'
                          ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm'
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                      }`}
                      title="اینستاگرام و رسانه"
                    >
                      <Instagram className="w-4 h-4 shrink-0 text-pink-500" />
                      {!sidebarCollapsed && <span>گالری و اینستاگرام</span>}
                    </button>
                  </div>
                </div>

                {/* 5. System & Brand */}
                <div>
                  {!sidebarCollapsed && (
                    <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                      تنظیمات و سیستم
                    </div>
                  )}
                  <div className="space-y-1">
                    <button
                      onClick={() => setActiveSubTab('appearance')}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all text-right ${
                        activeSubTab === 'appearance'
                          ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm'
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                      }`}
                      title="تنظیمات ظاهر"
                    >
                      <Palette className="w-4 h-4 shrink-0 text-pink-500" />
                      {!sidebarCollapsed && <span>تنظیمات ظاهر</span>}
                    </button>

                    <button
                      onClick={() => setActiveSubTab('customizer')}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all text-right ${
                        activeSubTab === 'customizer'
                          ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm'
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                      }`}
                      title="هویت برند"
                    >
                      <Sliders className="w-4 h-4 shrink-0 text-[#D4AF37]" />
                      {!sidebarCollapsed && <span>هویت و برند</span>}
                    </button>

                    <button
                      onClick={() => setActiveSubTab('system-status')}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all text-right ${
                        activeSubTab === 'system-status'
                          ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm'
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                      }`}
                      title="وضعیت سیستم"
                    >
                      <Server className="w-4 h-4 shrink-0 text-sky-500" />
                      {!sidebarCollapsed && <span>وضعیت سیستم</span>}
                    </button>

                    <button
                      onClick={() => setActiveSubTab('backup')}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all text-right ${
                        activeSubTab === 'backup'
                          ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm'
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                      }`}
                      title="پشتیبان‌گیری"
                    >
                      <HardDrive className="w-4 h-4 shrink-0 text-indigo-500" />
                      {!sidebarCollapsed && <span>پشتیبان‌گیری</span>}
                    </button>

                    <button
                      onClick={() => setActiveSubTab('logs')}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all text-right ${
                        activeSubTab === 'logs'
                          ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm'
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                      }`}
                      title="لاگ‌ها و دیباگ"
                    >
                      <Activity className="w-4 h-4 shrink-0 text-red-500" />
                      {!sidebarCollapsed && <span>لاگ‌ها و دیباگ</span>}
                    </button>

                    <button
                      onClick={() => setActiveSubTab('react-php-generator')}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all text-right ${
                        activeSubTab === 'react-php-generator'
                          ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm'
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                      }`}
                      title="شورت‌کدهای React"
                    >
                      <FileCode className="w-4 h-4 shrink-0 text-[#D4AF37]" />
                      {!sidebarCollapsed && <span>شورت‌کدهای React</span>}
                    </button>

                    <button
                      onClick={() => setActiveSubTab('wp-packaging-studio')}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all text-right ${
                        activeSubTab === 'wp-packaging-studio'
                          ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm'
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                      }`}
                      title="پکیجینگ زیپ و استودیوی اصناف"
                    >
                      <Package className="w-4 h-4 shrink-0 text-cyan-500" />
                      {!sidebarCollapsed && <span>پکیجینگ زیپ و اصناف</span>}
                    </button>
                  </div>
                </div>
              </div>

              {/* Sidebar Footer */}
              <div className="p-3 border-t border-slate-200 dark:border-slate-800 space-y-1">
                {onSwitchToAdminPortal && (
                  <button
                    onClick={onSwitchToAdminPortal}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/40 rounded-xl transition-colors text-right"
                    title="پنل جامع ادمین"
                  >
                    <Briefcase className="w-4 h-4 shrink-0" />
                    {!sidebarCollapsed && <span>پنل جامع ادمین سایت</span>}
                  </button>
                )}
                {onLogout && (
                  <button
                    onClick={onLogout}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-xl transition-colors text-right"
                    title="خروج"
                  >
                    <LogOut className="w-4 h-4 shrink-0" />
                    {!sidebarCollapsed && <span>خروج از پنل</span>}
                  </button>
                )}
              </div>
            </aside>

            {/* Main Content Workspace */}
            <main className="flex-1 min-w-0 w-full space-y-5">
              {/* GitHub-style Clean Top Bar with Breadcrumbs & Actions */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-[#0B132B] border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <span>داشبورد مدیریت</span>
                    <span>/</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                      {activeCategory === 'docket' && 'میزکار و امور جاری'}
                      {activeCategory === 'comms' && `ارتباط با ${preset.terms.clients}`}
                      {activeCategory === 'finance' && 'امور مالی و ابزارها'}
                      {activeCategory === 'branding' && 'محتوا و وب‌سایت'}
                      {activeCategory === 'system' && 'تنظیمات و سیستم'}
                    </span>
                  </div>
                  <h1 className="text-lg sm:text-xl font-bold font-serif text-[#0B132B] dark:text-white">
                    {activeSubTab === 'dashboard' && `کارتابل و ${preset.terms.cases}`}
                    {activeSubTab === 'associates-delegation' && 'ارجاع پرونده به وکلای همکار'}
                    {activeSubTab === 'clients' && `مدیریت حساب ${preset.terms.clients}`}
                    {activeSubTab === 'bookings' && 'رزروها و تقویم نوبت‌ها'}
                    {activeSubTab === 'emails' && 'صندوق پیام‌ها و فرم تماس'}
                    {activeSubTab === 'comments' && 'نظارت بر دیدگاه‌ها'}
                    {activeSubTab === 'invoices' && 'صورتحساب‌ها و درگاه‌های پرداخت'}
                    {activeSubTab === 'calculators' && 'میز محاسبات قضایی و دیه'}
                    {activeSubTab === 'content' && 'مدیریت محتوا و خدمات'}
                    {activeSubTab === 'banner' && 'بنر اسلایدر متنی'}
                    {activeSubTab === 'contact-cards' && 'اطلاعات تماس، تیم و نقشه'}
                    {activeSubTab === 'instagram' && 'گالری و اینستاگرام'}
                    {activeSubTab === 'appearance' && 'تنظیمات ظاهری و پالت رنگی'}
                    {activeSubTab === 'customizer' && 'شخصی‌سازی هویت سایت'}
                    {activeSubTab === 'system-status' && 'وضعیت سیستم و سرور'}
                    {activeSubTab === 'backup' && 'پشتیبان‌گیری و دیتابیس'}
                    {activeSubTab === 'logs' && 'لاگ‌ها و رویدادهای سیستم'}
                    {activeSubTab === 'react-php-generator' && 'مولد PHP شورت‌کدهای React'}
                    {activeSubTab === 'wp-packaging-studio' && 'پکیجینگ زیپ وردپرس، افزونه هسته و چایلد‌تم‌ها'}
                  </h1>
                </div>

                {/* Top Action Buttons & Tool Dropdown */}
                <div className="flex flex-wrap items-center gap-2">
                  <LawyerRealtimeToastNotifier
                    onSelectCase={(caseNum) => {
                      setSearchTerm(caseNum);
                      setActiveSubTab('dashboard');
                    }}
                  />

                  {/* Compact Tools Dropdown (Replaces messy buttons) */}
                  <div className="relative">
                    <button
                      onClick={() => setShowToolsDropdown(!showToolsDropdown)}
                      className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                    >
                      <Wrench className="w-3.5 h-3.5 text-amber-500" />
                      <span>ابزارهای مدیریتی</span>
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showToolsDropdown ? 'rotate-180' : ''}`} />
                    </button>

                    {showToolsDropdown && (
                      <div className="absolute left-0 mt-2 w-56 p-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl z-50 text-right space-y-1">
                        <button
                          onClick={() => { setShowPrintProfileModal(true); setShowToolsDropdown(false); }}
                          className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
                        >
                          <Printer className="w-3.5 h-3.5 text-amber-500" />
                          <span>چاپ بیوگرافی و پروفایل</span>
                        </button>

                        <button
                          onClick={() => { handleDownloadCaseloadCsv(); setShowToolsDropdown(false); }}
                          className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
                        >
                          <Download className="w-3.5 h-3.5 text-blue-500" />
                          <span>دانلود فایل داده‌ها (CSV)</span>
                        </button>

                        <button
                          onClick={() => { setShowExportModal(true); setShowToolsDropdown(false); }}
                          className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
                        >
                          <Code className="w-3.5 h-3.5 text-emerald-500" />
                          <span>استخراج HTML / CSS المنتور</span>
                        </button>

                        <button
                          onClick={() => { setShowManualAccountModal(true); setShowToolsDropdown(false); }}
                          className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
                        >
                          <UserPlus className="w-3.5 h-3.5 text-indigo-500" />
                          <span>ساخت اکانت بدون پیامک</span>
                        </button>

                        <button
                          onClick={() => { setShowPlaybookModal(true); setShowToolsDropdown(false); }}
                          className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
                        >
                          <BookOpen className="w-3.5 h-3.5 text-purple-500" />
                          <span>دستورالعمل و راهنما (SOP)</span>
                        </button>
                      </div>
                    )}
                  </div>

                  {activeSubTab === 'dashboard' && (
                    <button
                      onClick={() => setShowAddModal(true)}
                      className="btn-gold text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-sm"
                    >
                      <Plus className="w-4 h-4" />
                      <span>ثبت {preset.terms.case} جدید</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Download Feedback Notification */}
              {downloadNotification && (
                <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs flex items-center justify-between gap-2 shadow-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                    <span>{downloadNotification}</span>
                  </div>
                  <button
                    onClick={() => setDownloadNotification(null)}
                    className="text-emerald-600 hover:text-emerald-800 dark:text-emerald-400 p-1 rounded-lg hover:bg-emerald-100 dark:hover:bg-emerald-900/50"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Admin Acting as Managing Attorney Delegation Notice */}
              {isAdminActingAsLawyer && (
                <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-900 dark:text-amber-200 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-lg bg-amber-500 text-white flex items-center justify-center font-bold text-xs shrink-0">
                      🛡️
                    </span>
                    <span className="font-semibold">
                      حالت دسترسی جانشین مدیر سیستم فعال است؛ دسترسی کامل به کلیه ارجاعات و امور اجرایی برقرار می‌باشد.
                    </span>
                  </div>
                  {onSwitchToAdminPortal && (
                    <button
                      type="button"
                      onClick={onSwitchToAdminPortal}
                      className="px-3 py-1.5 rounded-lg bg-amber-500 text-slate-900 font-bold text-[11px] hover:brightness-110 transition-all flex items-center gap-1"
                    >
                      <span>ورود به پنل ادمین</span>
                      <ChevronLeft className="w-3 h-3" />
                    </button>
                  )}
                </div>
              )}

              {/* Secondary Clean Category Subtabs (Only 2-4 items max, GitHub style) */}
              {activeCategory === 'docket' && (
                <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs">
                  <button
                    onClick={() => setActiveSubTab('dashboard')}
                    className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                      activeSubTab === 'dashboard'
                        ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    ۱. کارتابل و خلاصه وضعیت
                  </button>
                  <button
                    onClick={() => setActiveSubTab('associates-delegation')}
                    className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                      activeSubTab === 'associates-delegation'
                        ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    ۲. ارجاع به همکاران
                  </button>
                </div>
              )}

              {activeCategory === 'comms' && (
                <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs overflow-x-auto">
                  <button
                    onClick={() => setActiveSubTab('clients')}
                    className={`px-3 py-1.5 rounded-lg font-semibold transition-all whitespace-nowrap ${
                      activeSubTab === 'clients'
                        ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    مدیریت {preset.terms.clients}
                  </button>
                  <button
                    onClick={() => setActiveSubTab('bookings')}
                    className={`px-3 py-1.5 rounded-lg font-semibold transition-all whitespace-nowrap ${
                      activeSubTab === 'bookings'
                        ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    تقویم نوبت‌ها
                  </button>
                  <button
                    onClick={() => setActiveSubTab('emails')}
                    className={`px-3 py-1.5 rounded-lg font-semibold transition-all whitespace-nowrap ${
                      activeSubTab === 'emails'
                        ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    پیام‌ها و فرم تماس
                  </button>
                  <button
                    onClick={() => setActiveSubTab('comments')}
                    className={`px-3 py-1.5 rounded-lg font-semibold transition-all whitespace-nowrap ${
                      activeSubTab === 'comments'
                        ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    نظرات و دیدگاه‌ها
                  </button>
                </div>
              )}

              {activeCategory === 'finance' && (
                <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs">
                  <button
                    onClick={() => setActiveSubTab('invoices')}
                    className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                      activeSubTab === 'invoices'
                        ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    صورتحساب‌ها و مالی
                  </button>
                  <button
                    onClick={() => setActiveSubTab('calculators')}
                    className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                      activeSubTab === 'calculators'
                        ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    میز محاسبات قضایی
                  </button>
                </div>
              )}

              {activeCategory === 'branding' && (
                <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs overflow-x-auto">
                  <button
                    onClick={() => setActiveSubTab('content')}
                    className={`px-3 py-1.5 rounded-lg font-semibold transition-all whitespace-nowrap ${
                      activeSubTab === 'content'
                        ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    مقالات و خدمات
                  </button>
                  <button
                    onClick={() => setActiveSubTab('banner')}
                    className={`px-3 py-1.5 rounded-lg font-semibold transition-all whitespace-nowrap ${
                      activeSubTab === 'banner'
                        ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    بنر و اعلانات
                  </button>
                  <button
                    onClick={() => setActiveSubTab('contact-cards')}
                    className={`px-3 py-1.5 rounded-lg font-semibold transition-all whitespace-nowrap ${
                      activeSubTab === 'contact-cards'
                        ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    کارت‌های تماس و تیم
                  </button>
                  <button
                    onClick={() => setActiveSubTab('instagram')}
                    className={`px-3 py-1.5 rounded-lg font-semibold transition-all whitespace-nowrap ${
                      activeSubTab === 'instagram'
                        ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    گالری اینستاگرام
                  </button>
                </div>
              )}

              {activeCategory === 'system' && (
                <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs overflow-x-auto">
                  <button
                    onClick={() => setActiveSubTab('appearance')}
                    className={`px-3 py-1.5 rounded-lg font-semibold transition-all whitespace-nowrap ${
                      activeSubTab === 'appearance'
                        ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    تنظیمات ظاهر
                  </button>
                  <button
                    onClick={() => setActiveSubTab('customizer')}
                    className={`px-3 py-1.5 rounded-lg font-semibold transition-all whitespace-nowrap ${
                      activeSubTab === 'customizer'
                        ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    هویت سایت
                  </button>
                  <button
                    onClick={() => setActiveSubTab('system-status')}
                    className={`px-3 py-1.5 rounded-lg font-semibold transition-all whitespace-nowrap ${
                      activeSubTab === 'system-status'
                        ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    وضعیت سیستم
                  </button>
                  <button
                    onClick={() => setActiveSubTab('backup')}
                    className={`px-3 py-1.5 rounded-lg font-semibold transition-all whitespace-nowrap ${
                      activeSubTab === 'backup'
                        ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    پشتیبان‌گیری
                  </button>
                  <button
                    onClick={() => setActiveSubTab('logs')}
                    className={`px-3 py-1.5 rounded-lg font-semibold transition-all whitespace-nowrap ${
                      activeSubTab === 'logs'
                        ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    لاگ‌ها
                  </button>
                  <button
                    onClick={() => setActiveSubTab('react-php-generator')}
                    className={`px-3 py-1.5 rounded-lg font-semibold transition-all whitespace-nowrap ${
                      activeSubTab === 'react-php-generator'
                        ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    شورت‌کدهای React
                  </button>
                </div>
              )}

        {/* Content Views */}
        {activeSubTab === 'associates-delegation' ? (
          <AdminAssociatesDelegationTab cases={cases} />
        ) : activeSubTab === 'content' ? (
          <AdminContentTab />
        ) : activeSubTab === 'bookings' ? (
          <AdminBookingsTab />
        ) : activeSubTab === 'invoices' ? (
          <AdminInvoicesTab />
        ) : activeSubTab === 'emails' ? (
          <AdminEmailsTab />
        ) : activeSubTab === 'clients' ? (
          <ClientAccountManager />
        ) : activeSubTab === 'calculators' ? (
          <CourtFeeCalculator />
        ) : activeSubTab === 'appearance' ? (
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
        ) : activeSubTab === 'react-php-generator' ? (
          <AdminReactShortcodesTab onOpenModal={() => setShowReactPhpGeneratorModal(true)} />
        ) : activeSubTab === 'wp-packaging-studio' ? (
          <WordPressPackagingAndStudioTab />
        ) : (
          <div className="space-y-8">
            {/* Onboarding & Customization Wizard Banner for Purchasing Attorneys */}
            <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-l from-[#0B132B] via-[#1C2541] to-[#0B132B] border-2 border-[#D4AF37]/50 text-white flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl text-right">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
                    <Sliders className="w-4 h-4" />
                  </span>
                  <h3 className="text-base font-bold font-serif text-white">
                    ویزارد تنظیم هویت و راه‌های ارتباطی وکیل (مخصوص خریداران قالب و افزونه)
                  </h3>
                </div>
                <p className="text-xs text-gray-300 max-w-2xl leading-relaxed">
                  با کلیک روی این دکمه، می‌توانید نام، شماره پروانه، آدرس دفتر، تلفن ثابت، موبایل، شبکه‌های اجتماعی (تلگرام، ایتا، واتساپ)، بیوگرافی و عکس‌های خود را بدون کدنویسی و بدون نیاز به المنتور وارد نمایید تا بلافاصله در کل فرانت‌اند، هدر، فوتر و رسیدها جایگزین شود.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setActiveSubTab('customizer')}
                className="btn-gold px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shrink-0 shadow-lg shadow-[#D4AF37]/30 hover:scale-105 transition-all"
              >
                <Sliders className="w-4 h-4" />
                <span>شخصی‌سازی مشخصات و لینک‌های من</span>
              </button>
            </div>

            {/* 7 Sections of the Attorney Executive Dashboard */}
            <AttorneyExecutiveDashboard
              cases={cases}
              onOpenAddCaseModal={() => setShowAddModal(true)}
              onOpenManualAccountModal={() => setShowManualAccountModal(true)}
            />

            {/* Key Practice Areas Radar Chart */}
            <KeyPracticeAreasRadarChart />

            {/* Advanced Case Filtering, Search & Categorization Suite */}
            <AdvancedCaseFilterSuite
              cases={cases}
              onCasesChange={(updated) => setCases(updated)}
              onOpenAddCaseModal={() => setShowAddModal(true)}
              onDeleteCase={handleDeleteCase}
              externalSearchTerm={searchTerm}
              onSearchTermChange={setSearchTerm}
            />

          </div>
        )}
            </main>
          </div>
        )}

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

      {/* HTML & CSS Snippets Export & WordPress Integration Guide Modal */}
      <HtmlCssExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
      />

      {/* React UI Components PHP Shortcode Template Generator Modal */}
      <ReactShortcodeGeneratorModal
        isOpen={showReactPhpGeneratorModal}
        onClose={() => setShowReactPhpGeneratorModal(false)}
      />

      {/* Lawyer Printable Profile & Bio Card Modal */}
      <LawyerPrintBioCard
        isOpen={showPrintProfileModal}
        onClose={() => setShowPrintProfileModal(false)}
        profile={lawyerProfile}
      />

      {/* Lawyer & Admin Operational Playbook (SOP) Modal */}
      <LawyerAdminPlaybookModal
        isOpen={showPlaybookModal}
        onClose={() => setShowPlaybookModal(false)}
        onNavigateToTab={(tabKey) => {
          setActiveSubTab(tabKey as any);
          setShowPlaybookModal(false);
        }}
        onOpenAccountCreator={() => {
          setShowPlaybookModal(false);
          setShowManualAccountModal(true);
        }}
      />
      </div>
    </div>
  );
};
