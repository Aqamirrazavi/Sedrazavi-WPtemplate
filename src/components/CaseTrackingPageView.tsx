import React, { useState } from 'react';
import {
  FileSearch,
  Shield,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText,
  Calendar,
  ChevronLeft,
  Sparkles,
  Search,
  Download,
  Phone,
} from 'lucide-react';

interface CaseTrackingPageViewProps {
  onBackToHome: () => void;
  onBookConsultation: () => void;
}

interface CaseRecord {
  caseNumber: string;
  nationalCode: string;
  clientName: string;
  caseTitle: string;
  courtBranch: string;
  status: string;
  lastUpdate: string;
  nextHearing: string;
  steps: {
    title: string;
    date: string;
    description: string;
    completed: boolean;
    current?: boolean;
  }[];
}

const DEMO_CASES: CaseRecord[] = [
  {
    caseNumber: 'SR-1402-8821',
    nationalCode: '0012345678',
    clientName: 'محمدرضا سلطانی',
    caseTitle: 'دعوای الزام به تنظیم سند رسمی ملک تجاری و خسارت تاخیر تادیه',
    courtBranch: 'شعبه ۴۲ دادگاه عمومی حقوقی مجتمع قضایی شهید بهشتی تهران',
    status: 'در حال تبادل لوایح دفاعیه و تعیین وقت رسیدگی',
    lastUpdate: '۱۴۰۲/۱۰/۱۸',
    nextHearing: '۱۴۰۲/۱۱/۲۵ - ساعت ۱۰:۳۰',
    steps: [
      {
        title: 'ثبت الکترونیک دادخواست اولیه',
        date: '۱۴۰۲/۰۸/۱۲',
        description: 'دادخواست از طریق دفتر خدمات الکترونیک قضایی شماره ۲۱۲ ثبت و ارجاع شد.',
        completed: true,
      },
      {
        title: 'ارجاع به شعبه و صدور دستور تعیین وقت',
        date: '۱۴۰۲/۰۹/۰۴',
        description: 'پرونده به شعبه ۴۲ ارجاع و دستور استعلام ثبتی ملک از اداره ثبت صادر گردید.',
        completed: true,
      },
      {
        title: 'تنظیم لایحه دفاعیه تخصصی و تقدیم اسناد تکمیلی',
        date: '۱۴۰۲/۱۰/۱۵',
        description: 'لایحه ۵ صفحه‌ای مستند به آرای هیأت عمومی دیوان تقدیم قاضی پرونده شد.',
        completed: true,
        current: true,
      },
      {
        title: 'جلسه رسیدگی ماهوی با حضور وکیل',
        date: '۱۴۰۲/۱۱/۲۵',
        description: 'حضور وکیل در جلسه رسیدگی جهت دفاع شفاهی و ثبت صورت‌جلسه.',
        completed: false,
      },
      {
        title: 'صدور دادنامه بدوی و ابلاغ در سامانه ثنا',
        date: 'نامشخص',
        description: 'صدور دادنامه و بررسی امکان قطعیت یا تجدیدنظرخواهی.',
        completed: false,
      },
    ],
  },
  {
    caseNumber: 'SR-1402-9904',
    nationalCode: '0098765432',
    clientName: 'مهدی کشاورز',
    caseTitle: 'ابطال رای داوری اتاق بازرگانی بین‌المللی در قرارداد پیمانکاری',
    courtBranch: 'شعبه ۳ دادگاه تجدیدنظر استان تهران',
    status: 'صدور دادنامه قطعی به نفع موکل',
    lastUpdate: '۱۴۰۲/۱۰/۱۰',
    nextHearing: 'پرونده مختومه شده است',
    steps: [
      {
        title: 'ثبت دادخواست ابطال رای داور',
        date: '۱۴۰۲/۰۶/۱۵',
        description: 'ثبت ایرادات شکلی و ماهوی داور مرضی‌الطرفین.',
        completed: true,
      },
      {
        title: 'جلسه دفاع تخصصی وکیل',
        date: '۱۴۰۲/۰۸/۲۰',
        description: 'اثبات نقض قواعد آمره در صدور رای داوری توسط وکیل.',
        completed: true,
      },
      {
        title: 'صدور دادنامه قطعی ابطال رای داور',
        date: '۱۴۰۲/۱۰/۱۰',
        description: 'دادگاه تجدیدنظر رای داوری را کلاً باطل و ملغی‌الاثر اعلام نمود.',
        completed: true,
      },
    ],
  },
];

export const CaseTrackingPageView: React.FC<CaseTrackingPageViewProps> = ({
  onBackToHome,
  onBookConsultation,
}) => {
  const [caseNumberInput, setCaseNumberInput] = useState('SR-1402-8821');
  const [nationalCodeInput, setNationalCodeInput] = useState('');
  const [searchedCase, setSearchedCase] = useState<CaseRecord | null>(DEMO_CASES[0]);
  const [hasSearched, setHasSearched] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    const cleanCase = caseNumberInput.trim().toUpperCase();
    const found = DEMO_CASES.find(
      (c) =>
        c.caseNumber.toUpperCase() === cleanCase ||
        (nationalCodeInput && c.nationalCode === nationalCodeInput.trim())
    );

    if (found) {
      setSearchedCase(found);
      setNotFound(false);
    } else {
      setSearchedCase(null);
      setNotFound(true);
    }
  };

  return (
    <div className="py-12 sm:py-16 bg-[#F4F6F9] dark:bg-[#070D1E] min-h-screen text-[#0B132B] dark:text-gray-100 font-persian">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl space-y-12">
        {/* Breadcrumb */}
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-4">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            <button
              onClick={onBackToHome}
              className="hover:text-[#D4AF37] transition-colors"
            >
              صفحه اصلی
            </button>
            <ChevronLeft className="w-4 h-4" />
            <span className="text-[#0B132B] dark:text-[#F3E5AB] font-bold">
              سامانه آنلاین و محرمانه پیگیری پرونده قضایی
            </span>
          </div>

          <button
            onClick={onBackToHome}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-[#D4AF37] hover:text-[#0B132B] transition-all"
          >
            بازگشت به صفحه اصلی &rarr;
          </button>
        </div>

        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/15 text-[#D4AF37] dark:text-[#F3E5AB] text-xs font-bold border border-[#D4AF37]/30">
            <Shield className="w-3.5 h-3.5" />
            <span>سامانه هوشمند موکلین</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-serif font-black text-[#0B132B] dark:text-white">
            پیگیری برخط وضعیت دادرسی و لوایح پرونده
          </h1>

          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
            جهت حفظ کرامت و وقت گرانبهای موکلین گرامی، روند رسیدگی، اوقات دادگاه و نسخه‌های دفاعیه به صورت ۲۴ ساعته در این بخش در دسترس می‌باشد.
          </p>
        </div>

        {/* Search Query Card */}
        <div className="rounded-3xl p-6 sm:p-8 bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-xl text-right">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                  شماره پرونده وکالت (در قرارداد وکالتنامه):
                </label>
                <input
                  type="text"
                  required
                  value={caseNumberInput}
                  onChange={(e) => setCaseNumberInput(e.target.value)}
                  placeholder="مثال: SR-1402-8821"
                  className="w-full px-4 py-2.5 rounded-xl text-xs bg-gray-50 dark:bg-[#070D1E] border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-white font-mono focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                  کد ملی موکل (اختیاری جهت تطبیق امنیتی):
                </label>
                <input
                  type="text"
                  value={nationalCodeInput}
                  onChange={(e) => setNationalCodeInput(e.target.value)}
                  placeholder="کد ملی ۱۰ رقمی"
                  className="w-full px-4 py-2.5 rounded-xl text-xs bg-gray-50 dark:bg-[#070D1E] border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-white font-mono focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <span className="text-[11px] text-gray-500 dark:text-gray-400">
                کدهای آزمایشی آماده تست: <code className="text-[#D4AF37] font-mono">SR-1402-8821</code> یا <code className="text-[#D4AF37] font-mono">SR-1402-9904</code>
              </span>

              <button
                type="submit"
                className="btn-gold px-6 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 shadow-md hover:scale-105 transition-all cursor-pointer"
              >
                <Search className="w-4 h-4" />
                <span>استعلام آنلاین پرونده</span>
              </button>
            </div>
          </form>
        </div>

        {/* Results Display */}
        {notFound && (
          <div className="rounded-2xl p-6 bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-center space-y-2">
            <AlertCircle className="w-8 h-8 mx-auto" />
            <h3 className="font-bold text-sm">پرونده‌ای با این مشخصات یافت نشد</h3>
            <p className="text-xs">
              لطفاً صحت شماره پرونده یا کد ملی را بررسی فرمایید یا با منشی دفتر تماس حاصل فرمایید.
            </p>
          </div>
        )}

        {searchedCase && (
          <div className="rounded-3xl p-6 sm:p-8 bg-white dark:bg-[#0B132B] border border-[#D4AF37]/50 shadow-2xl space-y-8 text-right">
            {/* Header info */}
            <div className="border-b border-gray-200 dark:border-gray-800 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold">
                    {searchedCase.status}
                  </span>
                  <span className="text-xs font-mono font-bold text-gray-500">
                    کد: {searchedCase.caseNumber}
                  </span>
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-[#0B132B] dark:text-white pt-1">
                  {searchedCase.caseTitle}
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  موکل: {searchedCase.clientName} | مرجع رسیدگی: {searchedCase.courtBranch}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-gray-50 dark:bg-[#070D1E] border border-gray-200 dark:border-gray-800 space-y-1 text-center md:text-right shrink-0">
                <span className="text-[11px] text-gray-400 block">
                  موعد جلسه بعدی دادگاه:
                </span>
                <span className="text-xs font-bold text-[#D4AF37] block">
                  {searchedCase.nextHearing}
                </span>
              </div>
            </div>

            {/* Timeline Steps */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-[#0B132B] dark:text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#D4AF37]" />
                <span>تایم‌لاین گام‌های اجرایی و دادرسی پرونده:</span>
              </h3>

              <div className="space-y-6 relative before:absolute before:right-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-gray-200 dark:before:bg-gray-800 pr-2">
                {searchedCase.steps.map((step, idx) => (
                  <div key={idx} className="relative flex items-start gap-4">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 font-bold text-xs ${
                        step.completed
                          ? 'bg-emerald-500 text-white shadow-[0_0_10px_rgba(16,185,129,0.5)]'
                          : step.current
                          ? 'bg-[#D4AF37] text-[#0B132B] ring-4 ring-[#D4AF37]/30'
                          : 'bg-gray-300 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                      }`}
                    >
                      {step.completed ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                    </div>

                    <div className="p-4 rounded-2xl bg-gray-50 dark:bg-[#070D1E] border border-gray-200 dark:border-gray-800 flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-xs text-[#0B132B] dark:text-white">
                          {step.title}
                        </h4>
                        <span className="text-[10px] text-gray-400 font-mono">
                          {step.date}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions for this case */}
            <div className="pt-4 border-t border-gray-200 dark:border-gray-800 flex flex-wrap items-center justify-between gap-4">
              <button
                onClick={() => alert('نسخه الکترونیک آخرین لایحه با موفقیت دریافت شد.')}
                className="px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:text-[#D4AF37] text-xs font-bold flex items-center gap-2 border border-gray-200 dark:border-gray-700 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>دانلود پی‌دی‌اف آخرین لایحه تنظیمی</span>
              </button>

              <button
                onClick={onBookConsultation}
                className="btn-gold px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 shadow-md hover:scale-105 transition-all"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>درخواست وقت ملاقات حضوری برای این پرونده</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
