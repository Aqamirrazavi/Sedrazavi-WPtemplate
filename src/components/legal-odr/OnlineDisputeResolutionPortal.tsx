import React, { useState } from 'react';
import {
  Gavel,
  FileText,
  ShieldCheck,
  Send,
  Download,
  Printer,
  Copy,
  Check,
  Clock,
  AlertCircle,
  Search,
  PlusCircle,
  FileCheck,
  Scale,
  Building,
  UserCheck,
  ExternalLink,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { ARBITRATION_CASES_DATA } from '../../data/mockData';
import { ArbitrationCase, ArbitrationPleading } from '../../types/theme';

export const OnlineDisputeResolutionPortal: React.FC = () => {
  const [cases, setCases] = useState<ArbitrationCase[]>(ARBITRATION_CASES_DATA);
  const [selectedCase, setSelectedCase] = useState<ArbitrationCase>(cases[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [newPleadingTitle, setNewPleadingTitle] = useState('');
  const [newPleadingContent, setNewPleadingContent] = useState('');
  const [senderRole, setSenderRole] = useState<'claimant' | 'respondent'>('claimant');
  const [showNewPleadingForm, setShowNewPleadingForm] = useState(false);
  const [copiedAward, setCopiedAward] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  const filteredCases = cases.filter(
    (c) =>
      c.disputeTitle.includes(searchQuery) ||
      c.caseNumber.includes(searchQuery) ||
      c.arbitrationCode.includes(searchQuery) ||
      c.claimantName.includes(searchQuery) ||
      c.respondentName.includes(searchQuery)
  );

  const handleSendPleading = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPleadingTitle.trim() || !newPleadingContent.trim()) return;

    const newPld: ArbitrationPleading = {
      id: `pld-${Date.now()}`,
      sender: senderRole,
      senderName:
        senderRole === 'claimant'
          ? `خواهان (${selectedCase.claimantName})`
          : `خوانده (${selectedCase.respondentName})`,
      title: newPleadingTitle,
      date: 'امروز - ثبت الکترونیک',
      content: newPleadingContent,
      trackingCode: `PLD-SR-${Math.floor(10000 + Math.random() * 90000)}`,
    };

    const updatedCase = {
      ...selectedCase,
      pleadings: [...selectedCase.pleadings, newPld],
    };

    setSelectedCase(updatedCase);
    setCases((prev) => prev.map((c) => (c.id === updatedCase.id ? updatedCase : c)));
    setNewPleadingTitle('');
    setNewPleadingContent('');
    setShowNewPleadingForm(false);
    setFeedbackMessage('لایحه جدید با موفقیت در سامانه داوری ثبت و به طرف مقابل و داور ابلاغ گردید.');
    setTimeout(() => setFeedbackMessage(null), 4000);
  };

  const handleCopyAward = () => {
    if (selectedCase.awardFullText) {
      navigator.clipboard.writeText(selectedCase.awardFullText);
      setCopiedAward(true);
      setTimeout(() => setCopiedAward(false), 2500);
    }
  };

  const handlePrintAward = () => {
    window.print();
  };

  return (
    <div className="space-y-6 text-slate-800 dark:text-slate-100">
      {/* Header Info Banner */}
      <div className="p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-[#060B18] via-[#0B132B] to-[#060B18] border-2 border-[#D4AF37]/40 shadow-xl text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-bold">
            <Gavel className="w-3.5 h-3.5" />
            <span>مرکز داوری و حل‌وفصل آنلاین اختلافات (ODR)</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-serif text-white flex items-center gap-2">
            داوری تخصصی دعاوی تجاری، ملکی و بین‌المللی
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
            سامانه رسمی داوری منطبق با باب هفتم قانون آیین دادرسی مدنی و قانون داوری تجاری بین‌المللی.
            تبادل امن لوایح، برگزاری جلسات استماع و صدور آرای لازم‌الاجرا جهت ارائه به دایره اجرای احکام مدنی.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-2 shrink-0 w-full md:w-auto">
          <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-center w-full sm:w-auto">
            <span className="block text-[11px] text-slate-400">داور مرضی‌الطرفین کانون:</span>
            <span className="text-sm font-bold text-[#D4AF37]">دکتر سیده مریم رضوی</span>
          </div>
        </div>
      </div>

      {feedbackMessage && (
        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm flex items-center gap-2 animate-fadeIn">
          <ShieldCheck className="w-5 h-5 shrink-0" />
          <span>{feedbackMessage}</span>
        </div>
      )}

      {/* Main Grid: Cases List & Case Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Cases Sidebar (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-4 rounded-2xl bg-white dark:bg-[#0B132B] border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-800 dark:text-white flex items-center gap-2">
                <Scale className="w-4 h-4 text-[#D4AF37]" />
                <span>پرونده‌های داوری فعال</span>
              </h3>
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 font-mono">
                {filteredCases.length}
              </span>
            </div>

            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="جستجوی کلاسه، طرفین، موضوع..."
                className="w-full pr-9 pl-3 py-2 rounded-xl bg-slate-50 dark:bg-[#060B18] border border-slate-200 dark:border-slate-700 text-xs focus:outline-none focus:border-[#D4AF37] transition-all"
              />
              <Search className="w-4 h-4 text-slate-400 absolute right-3 top-2.5" />
            </div>

            {/* Cases List */}
            <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
              {filteredCases.map((c) => {
                const isSelected = selectedCase.id === c.id;
                return (
                  <div
                    key={c.id}
                    onClick={() => setSelectedCase(c)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer text-right ${
                      isSelected
                        ? 'bg-[#D4AF37]/10 dark:bg-[#D4AF37]/15 border-[#D4AF37] shadow-sm'
                        : 'bg-slate-50 dark:bg-[#060B18]/60 border-slate-200 dark:border-slate-800 hover:border-slate-400'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[11px] font-mono font-bold text-[#D4AF37]">
                        {c.arbitrationCode}
                      </span>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                          c.status === 'رأی داوری صادر شد'
                            ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                            : c.status === 'جلسه استماع آنلاین'
                            ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400'
                            : 'bg-blue-500/15 text-blue-600 dark:text-blue-400'
                        }`}
                      >
                        {c.status}
                      </span>
                    </div>

                    <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100 line-clamp-1 mb-1">
                      {c.disputeTitle}
                    </h4>

                    <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
                      <span>خواهان: {c.claimantName.slice(0, 18)}...</span>
                      <span className="font-mono text-[10px] text-slate-400">{c.registrationDate}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Case Details, Pleadings & Award (8 Cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#0B132B] border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
            {/* Top Case Badge & Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2.5 py-1 rounded-md bg-[#060B18] text-[#D4AF37] font-mono text-xs font-bold border border-[#D4AF37]/30">
                    کلاسه داوری: {selectedCase.arbitrationCode}
                  </span>
                  <span className="text-xs text-slate-400">کلاسه دادگاه: {selectedCase.caseNumber}</span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  {selectedCase.disputeTitle}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300">
                  خواسته: {selectedCase.claimAmountToman.toLocaleString('fa-IR')} تومان
                </span>
              </div>
            </div>

            {/* Parties Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs bg-slate-50 dark:bg-[#060B18]/60 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-slate-500">
                  <UserCheck className="w-3.5 h-3.5 text-blue-500" />
                  <span className="font-semibold text-slate-700 dark:text-slate-200">مشخصات خواهان:</span>
                </div>
                <div className="pr-5 space-y-0.5 text-slate-600 dark:text-slate-300">
                  <p>نام / شرکت: {selectedCase.claimantName}</p>
                  <p className="font-mono text-[11px]">شناسه ملی: {selectedCase.claimantNationalId}</p>
                  <p className="text-[#D4AF37]">وکیل: {selectedCase.claimantLawyer}</p>
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-slate-500">
                  <Building className="w-3.5 h-3.5 text-rose-500" />
                  <span className="font-semibold text-slate-700 dark:text-slate-200">مشخصات خوانده:</span>
                </div>
                <div className="pr-5 space-y-0.5 text-slate-600 dark:text-slate-300">
                  <p>نام / شرکت: {selectedCase.respondentName}</p>
                  <p className="font-mono text-[11px]">شناسه ملی: {selectedCase.respondentNationalId}</p>
                  <p className="text-slate-400">وکیل: {selectedCase.respondentLawyer || 'معرفی نشده'}</p>
                </div>
              </div>
            </div>

            {/* Arbitral Award Box (If Award is Issued) */}
            {selectedCase.awardFullText ? (
              <div className="p-4 sm:p-5 rounded-xl bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-transparent border-2 border-emerald-500/40 space-y-3">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-emerald-500/20 pb-2">
                  <div className="flex items-center gap-2">
                    <FileCheck className="w-5 h-5 text-emerald-500" />
                    <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                      رأی قطعی و لازم‌الاجرای داوری (ابلاغ‌شده به طرفین)
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">تاریخ صدور: {selectedCase.awardDate}</span>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed whitespace-pre-line font-serif bg-white/70 dark:bg-[#060B18]/70 p-3.5 rounded-lg border border-emerald-500/20">
                  {selectedCase.awardFullText}
                </p>

                {selectedCase.enforcementBranch && (
                  <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">مرجع صدور اجراییه:</span>
                    <span>{selectedCase.enforcementBranch}</span>
                  </div>
                )}

                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={handleCopyAward}
                    className="px-3 py-1.5 rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    {copiedAward ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedAward ? 'کپی شد' : 'کپی متن رأی داور'}</span>
                  </button>
                  <button
                    onClick={handlePrintAward}
                    className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>چاپ رسمی رأی</span>
                  </button>
                </div>
              </div>
            ) : null}

            {/* Pleadings Exchange Feed */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-white flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#D4AF37]" />
                  <span>لوایح، اظهارنامه‌ها و دستورات داور ({selectedCase.pleadings.length})</span>
                </h4>

                <button
                  onClick={() => setShowNewPleadingForm(!showNewPleadingForm)}
                  className="px-3 py-1.5 rounded-xl bg-[#D4AF37]/20 hover:bg-[#D4AF37] text-[#D4AF37] hover:text-[#060B18] text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>ثبت لایحه دفاعیه جدید</span>
                </button>
              </div>

              {/* New Pleading Submission Form */}
              {showNewPleadingForm && (
                <form
                  onSubmit={handleSendPleading}
                  className="p-4 rounded-xl bg-slate-50 dark:bg-[#060B18] border-2 border-[#D4AF37]/50 space-y-3 animate-fadeIn"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                    <span className="text-xs font-bold text-slate-800 dark:text-white">ارسال الکترونیک لایحه</span>
                    <div className="flex items-center gap-3 text-xs">
                      <label className="flex items-center gap-1 cursor-pointer">
                        <input
                          type="radio"
                          name="senderRole"
                          checked={senderRole === 'claimant'}
                          onChange={() => setSenderRole('claimant')}
                          className="accent-[#D4AF37]"
                        />
                        <span>از طرف خواهان</span>
                      </label>
                      <label className="flex items-center gap-1 cursor-pointer">
                        <input
                          type="radio"
                          name="senderRole"
                          checked={senderRole === 'respondent'}
                          onChange={() => setSenderRole('respondent')}
                          className="accent-[#D4AF37]"
                        />
                        <span>از طرف خوانده</span>
                      </label>
                    </div>
                  </div>

                  <input
                    type="text"
                    required
                    placeholder="عنوان لایحه (مثلاً: لایحه پاسخ به ادعای فورس‌ماژور)"
                    value={newPleadingTitle}
                    onChange={(e) => setNewPleadingTitle(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-white dark:bg-[#0B132B] border border-slate-300 dark:border-slate-700 text-xs focus:outline-none focus:border-[#D4AF37]"
                  />

                  <textarea
                    required
                    rows={4}
                    placeholder="متن مستدل لایحه به همراه استناد به مواد قانونی..."
                    value={newPleadingContent}
                    onChange={(e) => setNewPleadingContent(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-white dark:bg-[#0B132B] border border-slate-300 dark:border-slate-700 text-xs focus:outline-none focus:border-[#D4AF37]"
                  />

                  <div className="flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowNewPleadingForm(false)}
                      className="px-3 py-1.5 rounded-lg text-xs text-slate-500 hover:text-slate-700"
                    >
                      انصراف
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 rounded-lg bg-[#D4AF37] hover:bg-[#c49f2f] text-[#060B18] font-bold text-xs flex items-center gap-1.5 shadow-md cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>ارسال و ثبت در پرونده داوری</span>
                    </button>
                  </div>
                </form>
              )}

              {/* Pleadings List */}
              <div className="space-y-3">
                {selectedCase.pleadings.map((pld) => (
                  <div
                    key={pld.id}
                    className="p-4 rounded-xl bg-slate-50 dark:bg-[#060B18]/70 border border-slate-200 dark:border-slate-800 space-y-2 text-right"
                  >
                    <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            pld.sender === 'arbitrator'
                              ? 'bg-[#D4AF37]'
                              : pld.sender === 'claimant'
                              ? 'bg-blue-500'
                              : 'bg-rose-500'
                          }`}
                        />
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-100">
                          {pld.title}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                          {pld.senderName}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-400">{pld.date}</span>
                    </div>

                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                      {pld.content}
                    </p>

                    <div className="flex items-center justify-between pt-2 text-[10px] text-slate-400 border-t border-slate-200/60 dark:border-slate-800/60">
                      <span className="font-mono">کد رهگیری: {pld.trackingCode}</span>
                      {pld.attachments && (
                        <div className="flex items-center gap-2">
                          {pld.attachments.map((att, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-[#D4AF37] font-mono"
                            >
                              📎 {att}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
