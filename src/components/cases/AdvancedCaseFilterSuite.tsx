import React, { useState, useMemo } from 'react';
import { CaseItem } from '../../types/theme';
import {
  Search,
  Filter,
  Calendar,
  Clock,
  User,
  Scale,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Download,
  FileSpreadsheet,
  Layers,
  ArrowUpDown,
  ChevronDown,
  Building,
  Shield,
  FileText,
  Trash2,
  Eye,
  SlidersHorizontal,
  Sparkles,
  Kanban,
  Table as TableIcon,
  Phone,
  Briefcase
} from 'lucide-react';

export type CaseSortField = 'lastActivity' | 'nextSession' | 'clientName' | 'caseNumber' | 'documentsCount';
export type CaseSortDirection = 'asc' | 'desc';
export type CaseViewLayout = 'table' | 'kanban' | 'categorized';

interface AdvancedCaseFilterSuiteProps {
  cases: CaseItem[];
  onCasesChange?: (updatedCases: CaseItem[]) => void;
  onOpenAddCaseModal: () => void;
  onDeleteCase: (id: string) => void;
  externalSearchTerm?: string;
  onSearchTermChange?: (term: string) => void;
}

export const AdvancedCaseFilterSuite: React.FC<AdvancedCaseFilterSuiteProps> = ({
  cases,
  onCasesChange,
  onOpenAddCaseModal,
  onDeleteCase,
  externalSearchTerm,
  onSearchTermChange,
}) => {
  // Filter States
  const [searchTerm, setSearchTermState] = useState(externalSearchTerm || '');

  React.useEffect(() => {
    if (externalSearchTerm !== undefined) {
      setSearchTermState(externalSearchTerm);
    }
  }, [externalSearchTerm]);

  const setSearchTerm = (term: string) => {
    setSearchTermState(term);
    if (onSearchTermChange) onSearchTermChange(term);
  };

  const [selectedStatus, setSelectedStatus] = useState<string>('همه');
  const [selectedCaseType, setSelectedCaseType] = useState<string>('همه');
  const [selectedActivityTimeframe, setSelectedActivityTimeframe] = useState<string>('همه');
  const [selectedPriority, setSelectedPriority] = useState<string>('همه');
  
  // View & Sort States
  const [viewLayout, setViewLayout] = useState<CaseViewLayout>('table');
  const [sortField, setSortField] = useState<CaseSortField>('lastActivity');
  const [sortDirection, setSortDirection] = useState<CaseSortDirection>('desc');
  const [activeCaseNoteModal, setActiveCaseNoteModal] = useState<CaseItem | null>(null);

  // Status Counts
  const statusCounts = useMemo(() => {
    return {
      all: cases.length,
      underReview: cases.filter((c) => c.status === 'در حال بررسی').length,
      inProgress: cases.filter((c) => c.status === 'در جریان').length,
      verdictReached: cases.filter((c) => c.status === 'به رأی نهایی رسیده').length,
      closed: cases.filter((c) => c.status === 'بسته شده').length,
    };
  }, [cases]);

  // Filtering Logic
  const filteredCases = useMemo(() => {
    return cases.filter((c) => {
      // 1. Search Query (Client Name, Case Number, Phone, Notes, Branch, Associate)
      const term = searchTerm.trim().toLowerCase();
      if (term) {
        const matchesName = c.clientName?.toLowerCase().includes(term);
        const matchesNum = c.caseNumber?.toLowerCase().includes(term);
        const matchesPhone = c.clientPhone?.toLowerCase().includes(term);
        const matchesNotes = c.notes?.toLowerCase().includes(term);
        const matchesBranch = c.branchName?.toLowerCase().includes(term);
        const matchesAssociate = c.assignedAssociate?.toLowerCase().includes(term);
        const matchesSummary = c.lastActivitySummary?.toLowerCase().includes(term);

        if (!matchesName && !matchesNum && !matchesPhone && !matchesNotes && !matchesBranch && !matchesAssociate && !matchesSummary) {
          return false;
        }
      }

      // 2. Status Filter
      if (selectedStatus !== 'همه' && c.status !== selectedStatus) {
        return false;
      }

      // 3. Case Type Filter
      if (selectedCaseType !== 'همه' && c.caseType !== selectedCaseType) {
        return false;
      }

      // 4. Priority Filter
      if (selectedPriority !== 'همه') {
        const priority = c.priority || 'normal';
        if (priority !== selectedPriority) return false;
      }

      // 5. Date of Last Activity Filter
      if (selectedActivityTimeframe !== 'همه') {
        const activityDate = c.lastActivityDate || c.registrationDate || '';
        // Date strings in format '۱۴۰۳/۰۶/۱۵'
        // Normalize Persian digits to English for numerical comparison
        const enDateStr = activityDate.replace(/[۰-۹]/g, (d) => '0123456789'['۰۱۲۳۴۵۶۷۸۹'.indexOf(d)]);
        const parts = enDateStr.split('/');
        const month = parts.length > 1 ? parseInt(parts[1], 10) : 0;
        const day = parts.length > 2 ? parseInt(parts[2], 10) : 0;

        if (selectedActivityTimeframe === 'last_7_days') {
          // Last 7 days in late Shahrivar (06/08 to 06/15)
          if (!(month === 6 && day >= 8)) return false;
        } else if (selectedActivityTimeframe === 'last_30_days') {
          // Month 5 day 15 to month 6
          if (!((month === 6) || (month === 5 && day >= 15))) return false;
        } else if (selectedActivityTimeframe === 'last_3_months') {
          // Months 4, 5, 6
          if (!(month >= 4 && month <= 6)) return false;
        } else if (selectedActivityTimeframe === 'current_year') {
          if (!enDateStr.startsWith('1403')) return false;
        }
      }

      return true;
    });
  }, [cases, searchTerm, selectedStatus, selectedCaseType, selectedActivityTimeframe, selectedPriority]);

  // Sorting Logic
  const sortedCases = useMemo(() => {
    return [...filteredCases].sort((a, b) => {
      let comparison = 0;
      if (sortField === 'lastActivity') {
        const dateA = a.lastActivityDate || a.registrationDate || '';
        const dateB = b.lastActivityDate || b.registrationDate || '';
        comparison = dateA.localeCompare(dateB, 'fa');
      } else if (sortField === 'nextSession') {
        comparison = a.nextCourtSession.localeCompare(b.nextCourtSession, 'fa');
      } else if (sortField === 'clientName') {
        comparison = a.clientName.localeCompare(b.clientName, 'fa');
      } else if (sortField === 'caseNumber') {
        comparison = a.caseNumber.localeCompare(b.caseNumber, 'fa');
      } else if (sortField === 'documentsCount') {
        comparison = a.documentsCount - b.documentsCount;
      }
      return sortDirection === 'asc' ? comparison : -comparison;
    });
  }, [filteredCases, sortField, sortDirection]);

  // Grouped cases by category or status
  const casesByPracticeArea = useMemo(() => {
    const map: Record<string, CaseItem[]> = {};
    sortedCases.forEach((c) => {
      if (!map[c.caseType]) map[c.caseType] = [];
      map[c.caseType].push(c);
    });
    return map;
  }, [sortedCases]);

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedStatus('همه');
    setSelectedCaseType('همه');
    setSelectedActivityTimeframe('همه');
    setSelectedPriority('همه');
    setSortField('lastActivity');
    setSortDirection('desc');
  };

  const handleExportFilteredCsv = () => {
    const headers = ['شماره پرونده', 'نام موکل', 'تلفن', 'موضوع', 'وضعیت', 'تاریخ ثبت', 'آخرین فعالیت', 'خلاصه آخرین اقدام', 'شعبه دادگاه'];
    const rows = sortedCases.map((c) => [
      c.caseNumber,
      c.clientName,
      c.clientPhone,
      c.caseType,
      c.status,
      c.registrationDate,
      c.lastActivityDate || '-',
      c.lastActivitySummary || '-',
      c.branchName || '-'
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.map(cell => `"${(cell || '').replace(/"/g, '""')}"`).join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `sedrazavi-filtered-cases-${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleUpdateStatus = (caseId: string, newStatus: CaseItem['status']) => {
    if (!onCasesChange) return;
    const updated = cases.map((c) => {
      if (c.id === caseId) {
        return {
          ...c,
          status: newStatus,
          lastActivityDate: '۱۴۰۳/۰۶/۱۷',
          lastActivitySummary: `تغییر وضعیت دادرسی به «${newStatus}» توسط مدیر`
        };
      }
      return c;
    });
    onCasesChange(updated);
  };

  const activeFiltersCount = [
    searchTerm ? 1 : 0,
    selectedStatus !== 'همه' ? 1 : 0,
    selectedCaseType !== 'همه' ? 1 : 0,
    selectedActivityTimeframe !== 'همه' ? 1 : 0,
    selectedPriority !== 'همه' ? 1 : 0,
  ].reduce((a, b) => a + b, 0);

  return (
    <div className="bg-white dark:bg-[#0B132B] rounded-3xl p-6 sm:p-8 border border-gray-200 dark:border-gray-800 shadow-sm space-y-6 text-right">
      
      {/* 1. Header & Title Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-gray-100 dark:border-gray-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] animate-pulse" />
            <span className="text-xs font-bold text-[#D4AF37] tracking-wider uppercase">
              سیستم فیلتر و جستجوی پیشرفته پرونده‌ها
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-serif text-[#0B132B] dark:text-white">
            داکت پرونده‌های حقوقی و مدیریت دادرسی
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            فیلتر هوشمند بر اساس وضعیت پرونده، نام موکل، تاریخ آخرین فعالیت، درجه فوریت و شعب دادگاه.
          </p>
        </div>

        {/* Action Controls & Layout Switcher */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* View Layout Switcher */}
          <div className="flex items-center bg-gray-100 dark:bg-gray-800/80 p-1 rounded-2xl border border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={() => setViewLayout('table')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                viewLayout === 'table'
                  ? 'bg-white dark:bg-gray-900 text-[#0B132B] dark:text-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
              title="نمایش جدولی تفصیلی"
            >
              <TableIcon className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>جدول</span>
            </button>

            <button
              type="button"
              onClick={() => setViewLayout('kanban')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                viewLayout === 'kanban'
                  ? 'bg-white dark:bg-gray-900 text-[#0B132B] dark:text-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
              title="نمایش کانبان وضعیت‌ها"
            >
              <Kanban className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>کانبان</span>
            </button>

            <button
              type="button"
              onClick={() => setViewLayout('categorized')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                viewLayout === 'categorized'
                  ? 'bg-white dark:bg-gray-900 text-[#0B132B] dark:text-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
              title="دسته‌بندی بر اساس حوزه دعوا"
            >
              <Layers className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>حوزه‌ها</span>
            </button>
          </div>

          {/* Export Filtered CSV */}
          <button
            type="button"
            onClick={handleExportFilteredCsv}
            className="px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 text-xs font-bold text-gray-700 dark:text-gray-200 transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
            title="دانلود گزارش CSV پرونده‌های فیلترشده"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-500" />
            <span className="hidden sm:inline">اکسپورت CSV</span>
          </button>

          {/* Add New Case */}
          <button
            type="button"
            onClick={onOpenAddCaseModal}
            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#AA820A] text-[#0B132B] hover:opacity-95 font-bold text-xs shadow-md shadow-[#D4AF37]/20 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>ثبت پرونده جدید</span>
          </button>
        </div>
      </div>

      {/* 2. Status Quick-Pill Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setSelectedStatus('همه')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer border ${
            selectedStatus === 'همه'
              ? 'bg-[#0B132B] dark:bg-[#D4AF37] text-white dark:text-[#0B132B] border-transparent shadow-sm'
              : 'bg-gray-50 dark:bg-gray-800/60 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-100'
          }`}
        >
          <span>همه پرونده‌ها</span>
          <span className={`px-2 py-0.5 rounded-full text-[11px] font-mono font-bold ${
            selectedStatus === 'همه'
              ? 'bg-white/20 dark:bg-black/20 text-white dark:text-[#0B132B]'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
          }`}>
            {statusCounts.all}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setSelectedStatus('در جریان')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer border ${
            selectedStatus === 'در جریان'
              ? 'bg-blue-600 text-white border-transparent shadow-sm'
              : 'bg-blue-50/50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-900/30 text-blue-700 dark:text-blue-300 hover:bg-blue-50'
          }`}
        >
          <Clock className="w-3.5 h-3.5 text-blue-500" />
          <span>در جریان رسیدگی</span>
          <span className="px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 text-[11px] font-mono font-bold">
            {statusCounts.inProgress}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setSelectedStatus('در حال بررسی')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer border ${
            selectedStatus === 'در حال بررسی'
              ? 'bg-amber-600 text-white border-transparent shadow-sm'
              : 'bg-amber-50/50 dark:bg-amber-900/10 border-amber-200 dark:border-amber-900/30 text-amber-700 dark:text-amber-300 hover:bg-amber-50'
          }`}
        >
          <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
          <span>در حال بررسی مقدماتی</span>
          <span className="px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 text-[11px] font-mono font-bold">
            {statusCounts.underReview}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setSelectedStatus('به رأی نهایی رسیده')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer border ${
            selectedStatus === 'به رأی نهایی رسیده'
              ? 'bg-emerald-600 text-white border-transparent shadow-sm'
              : 'bg-emerald-50/50 dark:bg-emerald-900/10 border-emerald-200 dark:border-emerald-900/30 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-50'
          }`}
        >
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
          <span>به رأی نهایی رسیده (مختومه موفق)</span>
          <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300 text-[11px] font-mono font-bold">
            {statusCounts.verdictReached}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setSelectedStatus('بسته شده')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer border ${
            selectedStatus === 'بسته شده'
              ? 'bg-gray-700 text-white border-transparent shadow-sm'
              : 'bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
          }`}
        >
          <span>بسته شده و سازش</span>
          <span className="px-2 py-0.5 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 text-[11px] font-mono font-bold">
            {statusCounts.closed}
          </span>
        </button>
      </div>

      {/* 3. Multi-Field Filter Bar (Client, Activity Date, Case Type, Priority, Sorting) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 p-4 rounded-2xl bg-gray-50/80 dark:bg-gray-900/40 border border-gray-200/80 dark:border-gray-800">
        
        {/* Field 1: Live Search by Client Name, Phone, Case Number */}
        <div className="space-y-1 sm:col-span-2 lg:col-span-2">
          <label className="text-[11px] font-bold text-gray-600 dark:text-gray-400 flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>جستجوی موکل، شماره پرونده یا تلفن</span>
          </label>
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="مثال: کیمیا پارس، ۰۹۱۲، ۱۴۰۳-۰۰۲، نیاوران..."
              className="w-full pl-8 pr-9 py-2.5 rounded-xl bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-xs focus:outline-none focus:border-[#D4AF37] dark:text-white shadow-sm"
            />
            <Search className="w-4 h-4 text-gray-400 absolute right-3 top-3 pointer-events-none" />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="absolute left-2.5 top-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Field 2: Date of Last Activity Filter */}
        <div className="space-y-1">
          <label className="text-[11px] font-bold text-gray-600 dark:text-gray-400 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>تاریخ آخرین فعالیت</span>
          </label>
          <select
            value={selectedActivityTimeframe}
            onChange={(e) => setSelectedActivityTimeframe(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-xs focus:outline-none focus:border-[#D4AF37] dark:text-white shadow-sm cursor-pointer"
          >
            <option value="همه">همه بازه‌ها</option>
            <option value="last_7_days">⚡ ۷ روز گذشته (فعالیت اخیر)</option>
            <option value="last_30_days">📅 ۳۰ روز گذشته</option>
            <option value="last_3_months">📊 ۳ ماه گذشته (فصل جاری)</option>
            <option value="current_year">🏛️ سال جاری (۱۴۰۳)</option>
          </select>
        </div>

        {/* Field 3: Case Type / Practice Area */}
        <div className="space-y-1">
          <label className="text-[11px] font-bold text-gray-600 dark:text-gray-400 flex items-center gap-1.5">
            <Scale className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>موضوع و حوزه دعوا</span>
          </label>
          <select
            value={selectedCaseType}
            onChange={(e) => setSelectedCaseType(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-xs focus:outline-none focus:border-[#D4AF37] dark:text-white shadow-sm cursor-pointer"
          >
            <option value="همه">همه حوزه‌ها</option>
            <option value="تجاری">تجاری و ارزی</option>
            <option value="ملکی">ملکی و ثبتی</option>
            <option value="خانواده">خانواده و مهریه</option>
            <option value="کیفری">کیفری و اقتصادی</option>
            <option value="ارث">ارث و انحصار وراثت</option>
            <option value="کار و بیمه">کار و بیمه تأمین اجتماعی</option>
          </select>
        </div>

        {/* Field 4: Sort Field & Direction */}
        <div className="space-y-1">
          <label className="text-[11px] font-bold text-gray-600 dark:text-gray-400 flex items-center gap-1.5">
            <ArrowUpDown className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>مرتب‌سازی نتایج</span>
          </label>
          <div className="flex items-center gap-1.5">
            <select
              value={sortField}
              onChange={(e) => setSortField(e.target.value as CaseSortField)}
              className="flex-1 px-2.5 py-2.5 rounded-xl bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-xs focus:outline-none focus:border-[#D4AF37] dark:text-white shadow-sm cursor-pointer"
            >
              <option value="lastActivity">تاریخ آخرین اقدام</option>
              <option value="nextSession">جلسه دادگاه</option>
              <option value="clientName">نام موکل</option>
              <option value="caseNumber">شماره پرونده</option>
              <option value="documentsCount">تعداد اسناد</option>
            </select>
            <button
              type="button"
              onClick={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}
              className="px-2.5 py-2.5 rounded-xl bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-xs font-bold text-gray-700 dark:text-gray-300 hover:border-[#D4AF37] cursor-pointer shadow-sm"
              title={sortDirection === 'desc' ? 'ترتیب نزولی (جدیدترین به قدیمی‌ترین)' : 'ترتیب صعودی'}
            >
              {sortDirection === 'desc' ? '↓' : '↑'}
            </button>
          </div>
        </div>

      </div>

      {/* 4. Filter Summary & Active Filter Tags Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs bg-gray-50/50 dark:bg-gray-900/20 px-4 py-2.5 rounded-xl border border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-3">
          <span className="text-gray-500 dark:text-gray-400">
            نمایش <strong className="text-[#0B132B] dark:text-white font-mono">{sortedCases.length}</strong> از <span className="font-mono">{cases.length}</span> پرونده داکت
          </span>

          {activeFiltersCount > 0 && (
            <span className="px-2.5 py-0.5 rounded-full bg-[#D4AF37]/20 text-[#AA820A] dark:text-[#F3E5AB] font-bold text-[11px]">
              {activeFiltersCount} فیلتر فعال
            </span>
          )}
        </div>

        {activeFiltersCount > 0 && (
          <button
            type="button"
            onClick={handleResetFilters}
            className="text-red-500 hover:text-red-600 dark:text-red-400 font-bold flex items-center gap-1.5 transition-colors cursor-pointer text-xs"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>پاک کردن همه فیلترها</span>
          </button>
        )}
      </div>

      {/* 5. View Content: Table or Kanban or Categorized */}
      {sortedCases.length === 0 ? (
        <div className="p-12 text-center rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-800 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center mx-auto text-gray-400">
            <Search className="w-6 h-6" />
          </div>
          <h4 className="text-base font-bold text-gray-800 dark:text-white">
            هیچ پرونده‌ای با شرایط انتخابی یافت نشد
          </h4>
          <p className="text-xs text-gray-500 max-w-sm mx-auto">
            عبارت جستجو را تغییر دهید یا دکمه «پاک کردن فیلترها» را بزنید تا تمام پرونده‌ها بازیابی شوند.
          </p>
          <button
            type="button"
            onClick={handleResetFilters}
            className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-xs font-bold text-gray-700 dark:text-gray-200 transition-colors cursor-pointer"
          >
            بازنشانی فیلترها
          </button>
        </div>
      ) : viewLayout === 'table' ? (
        /* Detailed Table Layout with Last Activity Column */
        <div className="overflow-x-auto rounded-2xl border border-gray-200 dark:border-gray-800">
          <table className="w-full text-right text-xs sm:text-sm">
            <thead className="bg-gray-50 dark:bg-gray-800/80 text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-800">
              <tr>
                <th className="py-3.5 px-4 font-bold">شماره پرونده</th>
                <th className="py-3.5 px-4 font-bold">موکل و اطلاعات تماس</th>
                <th className="py-3.5 px-4 font-bold">حوزه دعوا</th>
                <th className="py-3.5 px-4 font-bold">تاریخ آخرین فعالیت</th>
                <th className="py-3.5 px-4 font-bold">وضعیت دادرسی</th>
                <th className="py-3.5 px-4 font-bold">جلسه بعدی دادگاه</th>
                <th className="py-3.5 px-4 font-bold">اسناد</th>
                <th className="py-3.5 px-4 font-bold text-center">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {sortedCases.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50/60 dark:hover:bg-gray-800/40 transition-colors">
                  {/* Case Number & Branch */}
                  <td className="py-4 px-4">
                    <div className="font-mono font-bold text-[#D4AF37] text-sm">{c.caseNumber}</div>
                    <div className="text-[11px] text-gray-400 mt-0.5 line-clamp-1">{c.branchName || 'شعبه حقوقی تهران'}</div>
                  </td>

                  {/* Client Info */}
                  <td className="py-4 px-4 font-bold text-gray-900 dark:text-white">
                    <div className="flex items-center gap-1.5">
                      <span>{c.clientName}</span>
                      {c.priority === 'urgent' && (
                        <span className="px-1.5 py-0.5 rounded bg-red-500/10 text-red-500 text-[10px] font-bold">
                          فوری
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-gray-400 font-mono font-normal flex items-center gap-1 mt-0.5" dir="ltr">
                      <span>{c.clientPhone}</span>
                      <Phone className="w-3 h-3 text-gray-400" />
                    </div>
                  </td>

                  {/* Case Type */}
                  <td className="py-4 px-4">
                    <span className="px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-semibold">
                      {c.caseType}
                    </span>
                  </td>

                  {/* Last Activity Date & Summary */}
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-1.5 font-mono text-xs text-[#0B132B] dark:text-gray-200 font-bold">
                      <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>{c.lastActivityDate || c.registrationDate}</span>
                    </div>
                    <div className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-1 max-w-[220px]" title={c.lastActivitySummary || c.notes}>
                      {c.lastActivitySummary || c.notes}
                    </div>
                  </td>

                  {/* Status with Quick Inline Changer */}
                  <td className="py-4 px-4">
                    <select
                      value={c.status}
                      onChange={(e) => handleUpdateStatus(c.id, e.target.value as CaseItem['status'])}
                      className={`text-xs font-bold px-2.5 py-1 rounded-full border cursor-pointer focus:outline-none ${
                        c.status === 'به رأی نهایی رسیده'
                          ? 'bg-emerald-500/15 text-emerald-600 border-emerald-500/30 dark:bg-emerald-950/40'
                          : c.status === 'در جریان'
                          ? 'bg-blue-500/15 text-blue-600 border-blue-500/30 dark:bg-blue-950/40'
                          : c.status === 'بسته شده'
                          ? 'bg-gray-500/15 text-gray-600 border-gray-500/30 dark:bg-gray-800'
                          : 'bg-amber-500/15 text-amber-600 border-amber-500/30 dark:bg-amber-950/40'
                      }`}
                    >
                      <option value="در حال بررسی">در حال بررسی</option>
                      <option value="در جریان">در جریان</option>
                      <option value="به رأی نهایی رسیده">به رأی نهایی رسیده</option>
                      <option value="بسته شده">بسته شده</option>
                    </select>
                  </td>

                  {/* Next Court Session */}
                  <td className="py-4 px-4 text-xs text-gray-600 dark:text-gray-300">
                    <span className="line-clamp-2 max-w-[180px]">{c.nextCourtSession}</span>
                  </td>

                  {/* Documents Count */}
                  <td className="py-4 px-4">
                    <span className="flex items-center gap-1 text-gray-500 text-xs">
                      <FileText className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>{c.documentsCount} سند</span>
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-4 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => setActiveCaseNoteModal(c)}
                        className="p-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-colors cursor-pointer"
                        title="مشاهده جزئیات کامل و یادداشت‌ها"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onDeleteCase(c.id)}
                        className="p-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:text-red-500 hover:border-red-500 transition-colors cursor-pointer"
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
      ) : viewLayout === 'kanban' ? (
        /* Kanban Board View Categorized by Status */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {(['در حال بررسی', 'در جریان', 'به رأی نهایی رسیده', 'بسته شده'] as const).map((statusGroup) => {
            const groupCases = sortedCases.filter((c) => c.status === statusGroup);
            return (
              <div key={statusGroup} className="bg-gray-50/70 dark:bg-gray-900/50 rounded-2xl p-4 border border-gray-200/80 dark:border-gray-800 flex flex-col space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-gray-200 dark:border-gray-800">
                  <div className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${
                      statusGroup === 'به رأی نهایی رسیده' ? 'bg-emerald-500' :
                      statusGroup === 'در جریان' ? 'bg-blue-500' :
                      statusGroup === 'بسته شده' ? 'bg-gray-500' : 'bg-amber-500'
                    }`} />
                    <span className="text-xs font-bold text-gray-800 dark:text-white">
                      {statusGroup}
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-white dark:bg-gray-800 text-[11px] font-mono font-bold text-gray-600 dark:text-gray-400">
                    {groupCases.length}
                  </span>
                </div>

                <div className="space-y-2.5 flex-1 overflow-y-auto max-h-[500px]">
                  {groupCases.length === 0 ? (
                    <div className="py-8 text-center text-xs text-gray-400">
                      موردی در این ستون نیست
                    </div>
                  ) : (
                    groupCases.map((c) => (
                      <div
                        key={c.id}
                        className="bg-white dark:bg-gray-800 p-3.5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm space-y-2 hover:border-[#D4AF37]/60 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-xs font-bold text-[#D4AF37]">{c.caseNumber}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                            {c.caseType}
                          </span>
                        </div>
                        <h5 className="text-xs font-bold text-gray-900 dark:text-white">{c.clientName}</h5>
                        <div className="flex items-center gap-1.5 text-[11px] text-gray-500 font-mono">
                          <Clock className="w-3 h-3 text-[#D4AF37]" />
                          <span>آخرین اقدام: {c.lastActivityDate || c.registrationDate}</span>
                        </div>
                        <p className="text-[11px] text-gray-500 dark:text-gray-400 line-clamp-2">
                          {c.lastActivitySummary || c.notes}
                        </p>
                        <div className="pt-2 border-t border-gray-100 dark:border-gray-700/60 flex items-center justify-between text-[11px]">
                          <span className="text-gray-400">{c.documentsCount} سند</span>
                          <button
                            type="button"
                            onClick={() => setActiveCaseNoteModal(c)}
                            className="text-[#D4AF37] hover:underline font-bold"
                          >
                            مشاهده ↗
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Categorized by Practice Area Layout */
        <div className="space-y-6">
          {(Object.entries(casesByPracticeArea) as [string, CaseItem[]][]).map(([category, catCases]) => (
            <div key={category} className="rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
              <div className="bg-gray-100/80 dark:bg-gray-800/80 px-4 py-3 flex items-center justify-between border-b border-gray-200 dark:border-gray-800">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-[#D4AF37]" />
                  <span className="text-sm font-bold text-gray-900 dark:text-white">
                    حوزه دعاوی {category}
                  </span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-white dark:bg-gray-900 text-xs font-mono font-bold text-gray-700 dark:text-gray-300">
                  {catCases.length} پرونده
                </span>
              </div>

              <div className="divide-y divide-gray-100 dark:divide-gray-800 bg-white dark:bg-gray-900">
                {catCases.map((c) => (
                  <div key={c.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-gray-50/50 dark:hover:bg-gray-800/30">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-[#D4AF37]">{c.caseNumber}</span>
                        <span className="text-xs font-bold text-gray-900 dark:text-white">{c.clientName}</span>
                        <span className="text-[11px] text-gray-400 font-mono">({c.clientPhone})</span>
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        آخرین فعالیت: <span className="font-mono text-gray-700 dark:text-gray-300">{c.lastActivityDate || c.registrationDate}</span> - {c.lastActivitySummary || c.notes}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                        c.status === 'به رأی نهایی رسیده' ? 'bg-emerald-500/15 text-emerald-600' :
                        c.status === 'در جریان' ? 'bg-blue-500/15 text-blue-600' :
                        c.status === 'بسته شده' ? 'bg-gray-500/15 text-gray-600' : 'bg-amber-500/15 text-amber-600'
                      }`}>
                        {c.status}
                      </span>
                      <button
                        type="button"
                        onClick={() => setActiveCaseNoteModal(c)}
                        className="px-3 py-1.5 rounded-xl border border-gray-200 dark:border-gray-700 text-xs font-bold text-gray-700 dark:text-gray-200 hover:text-[#D4AF37] transition-colors cursor-pointer"
                      >
                        جزئیات
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Case Details Modal */}
      {activeCaseNoteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-lg bg-white dark:bg-[#0B132B] rounded-3xl shadow-2xl border border-[#D4AF37]/30 overflow-hidden text-right space-y-4 p-6">
            <div className="flex items-center justify-between pb-3 border-b border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-[#D4AF37] text-base">{activeCaseNoteModal.caseNumber}</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                  {activeCaseNoteModal.caseType}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setActiveCaseNoteModal(null)}
                className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 hover:text-gray-900 dark:hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex justify-between py-1 border-b border-gray-100 dark:border-gray-800/60">
                <span className="text-gray-500">نام موکل:</span>
                <span className="font-bold text-gray-900 dark:text-white">{activeCaseNoteModal.clientName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-100 dark:border-gray-800/60">
                <span className="text-gray-500">شماره تماس:</span>
                <span className="font-mono font-bold text-gray-900 dark:text-white" dir="ltr">{activeCaseNoteModal.clientPhone}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-100 dark:border-gray-800/60">
                <span className="text-gray-500">تاریخ آخرین فعالیت:</span>
                <span className="font-mono font-bold text-[#D4AF37]">{activeCaseNoteModal.lastActivityDate || activeCaseNoteModal.registrationDate}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-100 dark:border-gray-800/60">
                <span className="text-gray-500">وضعیت دادرسی:</span>
                <span className="font-bold text-emerald-600">{activeCaseNoteModal.status}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-100 dark:border-gray-800/60">
                <span className="text-gray-500">شعبه رسیدگی‌کننده:</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{activeCaseNoteModal.branchName || 'شعبه عمومی حقوقی تهران'}</span>
              </div>
              {activeCaseNoteModal.financialValue && (
                <div className="flex justify-between py-1 border-b border-gray-100 dark:border-gray-800/60">
                  <span className="text-gray-500">بهای خواسته / ارزش مالی:</span>
                  <span className="font-bold text-[#D4AF37]">{activeCaseNoteModal.financialValue}</span>
                </div>
              )}
              <div className="py-1">
                <span className="text-gray-500 block mb-1">جلسه بعدی دادگاه / گزارش کار:</span>
                <p className="p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 text-xs">
                  {activeCaseNoteModal.nextCourtSession}
                </p>
              </div>
              <div className="py-1">
                <span className="text-gray-500 block mb-1">یادداشت‌ها و خلاصه آخرین اقدام:</span>
                <p className="p-3 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-900/30 text-amber-900 dark:text-amber-200 text-xs leading-relaxed">
                  {activeCaseNoteModal.lastActivitySummary || activeCaseNoteModal.notes}
                </p>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => setActiveCaseNoteModal(null)}
                className="w-full py-2.5 rounded-xl bg-[#0B132B] dark:bg-[#D4AF37] text-white dark:text-[#0B132B] font-bold text-xs cursor-pointer"
              >
                بستن پنجره
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
