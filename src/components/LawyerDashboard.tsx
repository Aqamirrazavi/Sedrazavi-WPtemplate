import React, { useState } from 'react';
import { CASES_INITIAL_DATA, SERVICES_DATA } from '../data/mockData';
import { CaseItem } from '../types/theme';
import { FrontendCommentsModeration } from './FrontendCommentsModeration';
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
} from 'lucide-react';

export const LawyerDashboard: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'cases' | 'comments'>('cases');
  const [cases, setCases] = useState<CaseItem[]>(CASES_INITIAL_DATA);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('همه');
  const [showAddModal, setShowAddModal] = useState(false);

  // New Case Form state
  const [newCaseNumber, setNewCaseNumber] = useState(`۱۴۰۳-${(cases.length + 1).toString().padStart(3, '0')}`);
  const [newClientName, setNewClientName] = useState('');
  const [newClientPhone, setNewClientPhone] = useState('');
  const [newCaseType, setNewCaseType] = useState<CaseItem['caseType']>('تجاری');
  const [newNextSession, setNewNextSession] = useState('');
  const [newNotes, setNewNotes] = useState('');

  // Reminders checklist
  const [reminders, setReminders] = useState([
    { id: 1, text: 'ارائه لایحه دفاعیه پرونده ملکی شماره ۱۴۰۳-۰۰۲ تا ساعت ۱۳:۰۰', done: false, time: 'تا ۱ ساعت دیگر' },
    { id: 2, text: 'جلسه داوری اتاق بازرگانی پیرامون قرارداد پارس فن‌آور', done: true, time: 'انجام شد' },
    { id: 3, text: 'تماس تلفنی با موکل خانم کاظمیان جهت پیگیری توقیف اموال', done: false, time: 'ساعت ۱۶:۳۰' },
    { id: 4, text: 'امضای الکترونیک وکالت‌نامه در سامانه ثنا برای موکل جدید', done: false, time: 'ساعت ۱۸:۰۰' },
  ]);

  const toggleReminder = (id: number) => {
    setReminders(
      reminders.map((r) => (r.id === id ? { ...r, done: !r.done } : r))
    );
  };

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

          <div className="flex flex-wrap items-center gap-3">
            {/* Sub-tab Switchers */}
            <div className="flex items-center p-1 rounded-xl bg-gray-100 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setActiveSubTab('cases')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                  activeSubTab === 'cases'
                    ? 'bg-white dark:bg-[#0B132B] text-[#0B132B] dark:text-white shadow-sm border border-[#D4AF37]/40'
                    : 'text-gray-600 dark:text-gray-300 hover:text-[#D4AF37]'
                }`}
              >
                <Briefcase className="w-3.5 h-3.5 text-[#2A9D8F]" />
                <span>پرونده‌ها و تقویم دادگاه</span>
              </button>

              <button
                onClick={() => setActiveSubTab('comments')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                  activeSubTab === 'comments'
                    ? 'bg-white dark:bg-[#0B132B] text-[#0B132B] dark:text-white shadow-sm border border-[#D4AF37]/40'
                    : 'text-gray-600 dark:text-gray-300 hover:text-[#D4AF37]'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>مدیریت دیدگاه‌ها (template-comments)</span>
              </button>
            </div>

            {activeSubTab === 'cases' && (
              <button
                onClick={() => setShowAddModal(true)}
                className="btn-gold text-xs sm:text-sm px-4 py-2 rounded-xl flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>ثبت پرونده جدید</span>
              </button>
            )}
          </div>
        </div>

        {activeSubTab === 'comments' ? (
          <FrontendCommentsModeration />
        ) : (
          <>
            {/* 4 Stat Cards with Golden/Emerald/Crimson Right Borders */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          <div className="bg-white dark:bg-[#0B132B] p-5 rounded-2xl border-r-4 border-r-[#D4AF37] border-y border-l border-gray-200 dark:border-gray-800 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-gray-400">کل پرونده‌های ثبت‌شده</span>
              <p className="text-2xl sm:text-3xl font-bold font-serif text-[#0B132B] dark:text-white mt-1">
                {totalCases} پرونده
              </p>
              <span className="text-[11px] text-emerald-600 flex items-center gap-1 mt-1 font-semibold">
                <TrendingUp className="w-3 h-3" />
                +۱۲٪ افزایش موکلین این فصل
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/15 text-[#D4AF37] flex items-center justify-center">
              <Scale className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white dark:bg-[#0B132B] p-5 rounded-2xl border-r-4 border-r-[#2A9D8F] border-y border-l border-gray-200 dark:border-gray-800 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-gray-400">پرونده‌های در جریان دادگاه</span>
              <p className="text-2xl sm:text-3xl font-bold font-serif text-[#2A9D8F] mt-1">
                {statusCounts.inProgress} پرونده
              </p>
              <span className="text-[11px] text-gray-500 mt-1 block">
                ۳ جلسه دادگاه در این هفته
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-[#2A9D8F]/15 text-[#2A9D8F] flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white dark:bg-[#0B132B] p-5 rounded-2xl border-r-4 border-r-[#8B0000] border-y border-l border-gray-200 dark:border-gray-800 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-gray-400">مهلت‌های اضطراری دادرسی</span>
              <p className="text-2xl sm:text-3xl font-bold font-serif text-[#8B0000] mt-1">
                ۲ مهلت
              </p>
              <span className="text-[11px] text-red-500 font-semibold mt-1 block">
                تجدیدنظرخواهی تا ۴۸ ساعت آینده
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-red-500/15 text-red-600 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white dark:bg-[#0B132B] p-5 rounded-2xl border-r-4 border-r-[#1C2541] border-y border-l border-gray-200 dark:border-gray-800 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-gray-400">نوبت‌های مشاوره امروز</span>
              <p className="text-2xl sm:text-3xl font-bold font-serif text-[#0B132B] dark:text-white mt-1">
                ۴ نوبت
              </p>
              <span className="text-[11px] text-emerald-600 font-semibold mt-1 block">
                ۲ مشاوره حضوری + ۲ تلفنی
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-500/15 text-blue-600 flex items-center justify-center">
              <Calendar className="w-6 h-6" />
            </div>
          </div>

        </div>

        {/* Middle Section: Case Status Visualizer & Reminders Checklist */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Status Breakdown & Chart (5 Cols) */}
          <div className="lg:col-span-5 bg-white dark:bg-[#0B132B] rounded-3xl p-6 sm:p-7 border border-gray-200 dark:border-gray-800 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold font-serif text-[#0B132B] dark:text-white">
                وضعیت آماری پرونده‌های موکلین
              </h3>
              <span className="text-xs text-gray-400">بروزرسانی لحظه‌ای</span>
            </div>

            {/* Visual Progress Bar representation */}
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-[#2A9D8F]"></span>
                    پرونده‌های در جریان دادرسی
                  </span>
                  <span>{statusCounts.inProgress} پرونده ({Math.round((statusCounts.inProgress / totalCases) * 100)}%)</span>
                </div>
                <div className="w-full h-3 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
                  <div
                    className="h-full bg-[#2A9D8F] rounded-full transition-all duration-500"
                    style={{ width: `${(statusCounts.inProgress / totalCases) * 100}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-[#D4AF37]"></span>
                    در حال بررسی و تنظیم دادخواست
                  </span>
                  <span>{statusCounts.underReview} پرونده ({Math.round((statusCounts.underReview / totalCases) * 100)}%)</span>
                </div>
                <div className="w-full h-3 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
                  <div
                    className="h-full bg-[#D4AF37] rounded-full transition-all duration-500"
                    style={{ width: `${(statusCounts.underReview / totalCases) * 100}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-[#1C2541] dark:bg-gray-400"></span>
                    مختومه و به نتیجه رسیده
                  </span>
                  <span>{statusCounts.closed} پرونده ({Math.round((statusCounts.closed / totalCases) * 100)}%)</span>
                </div>
                <div className="w-full h-3 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
                  <div
                    className="h-full bg-[#1C2541] dark:bg-gray-400 rounded-full transition-all duration-500"
                    style={{ width: `${(statusCounts.closed / totalCases) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs">
              <span className="text-gray-500">مجموع اسناد بارگذاری شده در پرونده‌ها:</span>
              <span className="font-bold text-[#0B132B] dark:text-white">۴۴ سند و لایحه</span>
            </div>
          </div>

          {/* Today's Reminders & Urgent Tasks (7 Cols) */}
          <div className="lg:col-span-7 bg-white dark:bg-[#0B132B] rounded-3xl p-6 sm:p-7 border border-gray-200 dark:border-gray-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100 dark:border-gray-800">
              <h3 className="text-base font-bold font-serif text-[#0B132B] dark:text-white flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#D4AF37]" />
                یادآورها و اقدامات فوری امروز وکیل
              </h3>
              <span className="text-xs px-2.5 py-1 rounded-full bg-[#D4AF37]/15 text-[#AA820A] dark:text-[#F3E5AB] font-bold">
                {reminders.filter((r) => !r.done).length} اقدام باقی‌مانده
              </span>
            </div>

            <div className="space-y-2.5">
              {reminders.map((reminder) => (
                <div
                  key={reminder.id}
                  onClick={() => toggleReminder(reminder.id)}
                  className={`p-3.5 rounded-xl border cursor-pointer flex items-center justify-between gap-3 transition-all ${
                    reminder.done
                      ? 'bg-gray-50 dark:bg-gray-800/30 border-gray-200 dark:border-gray-800 opacity-60'
                      : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 hover:border-[#D4AF37]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={reminder.done}
                      onChange={() => {}}
                      className="w-4 h-4 rounded text-[#D4AF37] focus:ring-[#D4AF37]"
                    />
                    <span
                      className={`text-xs sm:text-sm font-medium ${
                        reminder.done ? 'line-through text-gray-400' : 'text-gray-800 dark:text-gray-200'
                      }`}
                    >
                      {reminder.text}
                    </span>
                  </div>

                  <span className="text-[11px] px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-500 font-mono whitespace-nowrap">
                    {reminder.time}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

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

          </>
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
    </div>
  );
};
