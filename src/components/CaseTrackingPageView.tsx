import React, { useState, useEffect } from 'react';
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
  Scale,
  QrCode,
  Bell,
  Eye,
  Check,
  Building,
  UserCheck,
  ExternalLink,
  MessageSquare,
  Lock
} from 'lucide-react';
import { getStoredClientAccounts } from '../utils/clientAccountsStorage';

interface CaseTrackingPageViewProps {
  onBackToHome: () => void;
  onBookConsultation: () => void;
}

interface CaseStep {
  title: string;
  stageName: string;
  date: string;
  description: string;
  completed: boolean;
  current?: boolean;
  courtActionCode?: string;
}

interface CaseDocument {
  title: string;
  date: string;
  fileSize: string;
  securityHash: string;
  type: 'PDF' | 'DOCX';
}

interface CaseRecord {
  caseNumber: string;
  nationalCode: string;
  clientName: string;
  caseTitle: string;
  courtBranch: string;
  judgeName: string;
  status: string;
  statusCode: 'ACTIVE' | 'HEARING_PENDING' | 'DECIDED' | 'ENFORCEMENT';
  lastUpdate: string;
  nextHearingDate: string;
  nextHearingTime: string;
  hearingDaysRemaining: number;
  steps: CaseStep[];
  documents: CaseDocument[];
  attorneySummary: string;
}

const DEMO_CASES: CaseRecord[] = [
  {
    caseNumber: 'SR-1402-8821',
    nationalCode: '0012345678',
    clientName: 'محمدرضا سلطانی',
    caseTitle: 'دعوای الزام به تنظیم سند رسمی انتقال ملک تجاری و مطالبه خسارت وجه التزام تاخیر تادیه',
    courtBranch: 'شعبه ۴۲ دادگاه عمومی حقوقی مجتمع قضایی شهید بهشتی تهران',
    judgeName: 'جناب آقای دکتر موحدی (رئیس شعبه)',
    status: 'در حال تبادل لوایح و تعیین وقت رسیدگی ماهوی',
    statusCode: 'HEARING_PENDING',
    lastUpdate: '۱۴۰۲/۱۰/۱۸ ساعت ۱۰:۱۵',
    nextHearingDate: '۱۴۰۳/۰۸/۲۵',
    nextHearingTime: '۱۰:۳۰ صبح',
    hearingDaysRemaining: 18,
    attorneySummary: 'با استناد به گواهی عدم حضور دفترخانه ۱۸ و استعلام واصله از اداره ثبت املاک ونک، مالکیت رسمی فروشنده محرز بوده و دفاعیات بر اساس آرای وحدت رویه دیوان عالی کشور تنظیم و تقدیم شعبه گردید.',
    documents: [
      {
        title: 'دادخواست بدوی ثبت‌شده در سامانه عدل‌ایران',
        date: '۱۴۰۲/۰۸/۱۲',
        fileSize: '۱.۸ MB',
        securityHash: 'SHA256: 4a8b9f...21c',
        type: 'PDF',
      },
      {
        title: 'لایحه تکمیلی مستند به وحدت رویه شماره ۸۱۱',
        date: '۱۴۰۲/۱۰/۱۵',
        fileSize: '۹۴۰ KB',
        securityHash: 'SHA256: 9e3a1b...88f',
        type: 'PDF',
      },
      {
        title: 'نظریه کارشناس رسمی امور ثبتی دادگستری',
        date: '۱۴۰۲/۱۱/۰۴',
        fileSize: '۳.۱ MB',
        securityHash: 'SHA256: d71b4c...09a',
        type: 'PDF',
      },
    ],
    steps: [
      {
        title: '۱. ثبت دادخواست الکترونیک در عدل‌ایران',
        stageName: 'ثبت بدوی',
        date: '۱۴۰۲/۰۸/۱۲',
        description: 'دادخواست از طریق دفتر خدمات الکترونیک قضایی شماره ۲۱۲ ثبت و با کلاسه ۱۴۰۲۹۸۲۷۳ به مجتمع قضایی بهشتی ارجاع شد.',
        completed: true,
        courtActionCode: 'ADL-1402-0982',
      },
      {
        title: '۲. ارجاع به شعبه و صدور دستور پرداخت هزینه کارشناسی',
        stageName: 'تعیین شعبه',
        date: '۱۴۰۲/۰۹/۰۴',
        description: 'پرونده در شعبه ۴۲ حقوقی مستقر شد و دستور استعلام ثبتی پلاک ۶۴/۱۱۲ صادر گردید.',
        completed: true,
        courtActionCode: 'CRT-BR42-991',
      },
      {
        title: '۳. تنظیم لایحه دفاعیه تخصصی و ضم اسناد تکمیلی',
        stageName: 'تبادل لوایح',
        date: '۱۴۰۲/۱۰/۱۵',
        description: 'لایحه ۶ صفحه‌ای با تحلیل شروط ضمن عقد مبایعه‌نامه توسط دکتر رضوی تقدیم شعبه گردید.',
        completed: true,
        current: true,
        courtActionCode: 'LYH-1402-4412',
      },
      {
        title: '۴. جلسه رسیدگی ماهوی و استماع مدافعات وکیل',
        stageName: 'دادرسی ماهوی',
        date: '۱۴۰۳/۰۸/۲۵',
        description: 'حضور وکیل پایه یک و موکل در شعبه دادگاه جهت دفاع شفاهی و تنظیم صورتجلسه.',
        completed: false,
        courtActionCode: 'HRG-PENDING',
      },
      {
        title: '۵. صدور دادنامه بدوی و ابلاغ در سامانه ثنا',
        stageName: 'انشای رای',
        date: 'موعد آتی',
        description: 'صدور حکم به محکومیت خوانده به انتقال سند رسمی و پرداخت خسارات.',
        completed: false,
      },
      {
        title: '۶. قطعیت رای یا رسیدگی در دادگاه تجدیدنظر',
        stageName: 'تجدیدنظرخواهی',
        date: 'موعد آتی',
        description: 'بررسی در دادگاه تجدیدنظر استان تهران و صدور رای قطعی.',
        completed: false,
      },
      {
        title: '۷. صدور اجرائیه و هدایت به اجرای احکام مدنی',
        stageName: 'اجرای احکام',
        date: 'مرحله نهایی',
        description: 'اخذ دستور امضای سند رسمی از سوی نماینده دادگاه در صورت استنکاف خوانده.',
        completed: false,
      },
    ],
  },
  {
    caseNumber: 'SR-1402-9904',
    nationalCode: '0098765432',
    clientName: 'مهندس مهدی کشاورز',
    caseTitle: 'ابطال رای داوری تجاری در قرارداد احداث نیروگاه خورشیدی و ضمانت‌نامه بانکی',
    courtBranch: 'شعبه ۳ دادگاه تجدیدنظر استان تهران',
    judgeName: 'مستشاران ارشد دادگاه تجدیدنظر',
    status: 'صدور دادنامه قطعی ابطال رای داور به نفع موکل',
    statusCode: 'DECIDED',
    lastUpdate: '۱۴۰۲/۱۰/۱۰ ساعت ۱۴:۰۰',
    nextHearingDate: 'پرونده مختومه است',
    nextHearingTime: 'مختومه',
    hearingDaysRemaining: 0,
    attorneySummary: 'دادگاه تجدیدنظر با پذیرش دفاعیات اینجانب مبنی بر نقض قواعد آمره دادرسی و عدم رعایت مهلت داوری، رای داور مرضی‌الطرفین را به طور کامل ابطال و ملغی‌الاثر اعلام نمود.',
    documents: [
      {
        title: 'دادنامه قطعی ابطال رای داوری شعبه ۳ تجدیدنظر',
        date: '۱۴۰۲/۱۰/۱۰',
        fileSize: '۲.۴ MB',
        securityHash: 'SHA256: 7f12e4...310',
        type: 'PDF',
      },
      {
        title: 'گواهی قطعیت دادنامه صادره و رفع اثر از حساب‌ها',
        date: '۱۴۰۲/۱۰/۱۸',
        fileSize: '۶۵۰ KB',
        securityHash: 'SHA256: 3c99a0...12b',
        type: 'PDF',
      },
    ],
    steps: [
      {
        title: '۱. ثبت دادخواست ابطال رای داور',
        stageName: 'دادخواست',
        date: '۱۴۰۲/۰۶/۱۵',
        description: 'ثبت ایرادات بنیادین به رای داور منطبق بر ماده ۴۸۹ قانون آیین دادرسی مدنی.',
        completed: true,
      },
      {
        title: '۲. جلسه دفاعیه تخصصی و تبیین نقض موازین قانونی',
        stageName: 'دفاع وکیل',
        date: '۱۴۰۲/۰۸/۲۰',
        description: 'ارائه مستندات خروج داور از حدود اختیارات قراردادی و اثبات انقضای مدت.',
        completed: true,
      },
      {
        title: '۳. صدور دادنامه قطعی ابطال و قطعیت رای',
        stageName: 'حکم قطعی پیروزی',
        date: '۱۴۰۲/۱۰/۱۰',
        description: 'پیروزی کامل موکل و آزادی ضمانت‌نامه‌های بانکی به ارزش ۱۲۰ میلیارد ریال.',
        completed: true,
      },
    ],
  },
  {
    caseNumber: 'SR-1403-1102',
    nationalCode: '1010345678',
    clientName: 'شرکت پترو تجارت فرادید',
    caseTitle: 'دعاوی بین‌المللی ارزی، اعتبارات اسنادی (LC) و رفع تعهدات بازرگانی',
    courtBranch: 'شعبه ۵۵ دادگاه عمومی حقوقی تخصصی امور بین‌الملل تهران',
    judgeName: 'قاضی دادگاه ویژه تجارت بین‌الملل',
    status: 'رسیدگی به اسناد تعهدات ارزی و استعلام از بانک مرکزی',
    statusCode: 'ACTIVE',
    lastUpdate: 'امروز ساعت ۰۹:۰۰',
    nextHearingDate: '۱۴۰۳/۰۹/۱۰',
    nextHearingTime: '۱۱:۰۰ صبح',
    hearingDaysRemaining: 32,
    attorneySummary: 'اسناد مربوط به فورس‌ماژور تحریمی مطابق استانداردهای ICC تنظیم و جهت ابطال جرایم رفع تعهدات ارزی تحویل کارشناسان دادگاه گردید.',
    documents: [
      {
        title: 'لایحه استنادی فورس‌ماژور و تحریم‌های بانکی',
        date: '۱۴۰۳/۰۴/۰۲',
        fileSize: '۲.۱ MB',
        securityHash: 'SHA256: fa8821...66c',
        type: 'PDF',
      },
    ],
    steps: [
      {
        title: '۱. ثبت پرونده در شعبه بین‌الملل',
        stageName: 'ثبت پرونده',
        date: '۱۴۰۳/۰۲/۱۵',
        description: 'ارجاع به شعبه ۵۵ امور بین‌الملل و اخذ دستور توقف موقت اقدامات اجرایی بانک.',
        completed: true,
      },
      {
        title: '۲. کارشناسی تخصصی حسابرسی ارزی',
        stageName: 'کارشناسی',
        date: '۱۴۰۳/۰۳/۲۰',
        description: 'بررسی مدارک سوئیفت و اسناد اعتبارات اسنادی توسط هیئت ۳ نفره کارشناسان رسمی.',
        completed: true,
        current: true,
      },
      {
        title: '۳. جلسه استماع نظرات طرفین و نماینده بانک',
        stageName: 'جلسه رسیدگی',
        date: '۱۴۰۳/۰۹/۱۰',
        description: 'برگزاری جلسه ماهوی دادگاه در شعبه ۵۵ امور بین‌الملل.',
        completed: false,
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
  const [simulatedSmsSent, setSimulatedSmsSent] = useState(false);
  const [activeDocPreview, setActiveDocPreview] = useState<CaseDocument | null>(null);

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
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

  const selectPresetCase = (c: CaseRecord) => {
    setCaseNumberInput(c.caseNumber);
    setNationalCodeInput(c.nationalCode);
    setSearchedCase(c);
    setNotFound(false);
    setHasSearched(true);
  };

  const handleSendSmsAlert = () => {
    setSimulatedSmsSent(true);
    setTimeout(() => setSimulatedSmsSent(false), 4000);
  };

  return (
    <div className="py-12 sm:py-16 bg-[#F4F6F9] dark:bg-[#070D1E] min-h-screen text-[#0B132B] dark:text-gray-100 font-persian">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl space-y-10">
        {/* Breadcrumb & Navigation */}
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
              سامانه جامع پیگیری پرونده‌های قضایی و دادرسی موکلین
            </span>
          </div>

          <button
            onClick={onBackToHome}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-[#D4AF37] hover:text-[#0B132B] transition-all cursor-pointer"
          >
            بازگشت به پرتال اصلی &rarr;
          </button>
        </div>

        {/* Page Hero Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/15 text-[#D4AF37] dark:text-[#F3E5AB] text-xs font-bold border border-[#D4AF37]/30">
            <Scale className="w-4 h-4 text-[#D4AF37]" />
            <span>اتصال برخط به دفتر وکالت دکتر سیده مریم رضوی</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-serif font-black text-[#0B132B] dark:text-white">
            پیگیری پرونده دادگستری و گردش دادرسی
          </h1>

          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
            جهت شفافیت حداکثری و تسهیل امور موکلین، آخرین اوقات دادگاه، لوایح تقدیمی، ابلاغیه‌های ثنا و قرارهای صادره در این درگاه ایمن و رمزنگاری‌شده قابل مشاهده و استعلام است.
          </p>
        </div>

        {/* Quick Demo Chips */}
        <div className="bg-white dark:bg-[#0B132B] rounded-2xl p-4 border border-gray-200 dark:border-gray-800 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs font-bold text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              انتخاب سریع نمونه پرونده‌های دفتر وکالت (تست زنده):
            </span>
            <div className="flex flex-wrap items-center gap-2">
              {DEMO_CASES.map((demo) => (
                <button
                  key={demo.caseNumber}
                  onClick={() => selectPresetCase(demo)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                    searchedCase?.caseNumber === demo.caseNumber
                      ? 'bg-[#D4AF37] text-[#060B18] border-[#D4AF37] shadow-sm'
                      : 'bg-gray-50 dark:bg-[#070D1E] text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-800 hover:border-[#D4AF37]/50'
                  }`}
                >
                  {demo.clientName} ({demo.caseNumber})
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Search Query Card */}
        <div className="rounded-3xl p-6 sm:p-8 bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-xl text-right">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                  شماره کلاسه پرونده در دفتر وکالت:
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={caseNumberInput}
                    onChange={(e) => setCaseNumberInput(e.target.value)}
                    placeholder="مثال: SR-1402-8821"
                    className="w-full pr-10 pl-4 py-2.5 rounded-xl text-xs bg-gray-50 dark:bg-[#070D1E] border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-white font-mono focus:outline-none focus:border-[#D4AF37]"
                  />
                  <FileSearch className="w-4 h-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                  کد ملی / شناسه ملی موکل (احراز ثنا):
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={nationalCodeInput}
                    onChange={(e) => setNationalCodeInput(e.target.value)}
                    placeholder="کد ۱۰ رقمی ملی یا شناسه ۱۱ رقمی شرکت"
                    className="w-full pr-10 pl-4 py-2.5 rounded-xl text-xs bg-gray-50 dark:bg-[#070D1E] border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-white font-mono focus:outline-none focus:border-[#D4AF37]"
                  />
                  <Lock className="w-4 h-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <span className="text-[11px] text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-emerald-500" />
                اطلاعات با پروتکل رمزنگاری قضایی عدل‌ایران محافظت می‌شود.
              </span>

              <button
                type="submit"
                className="btn-gold px-6 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 shadow-md hover:scale-105 transition-all cursor-pointer"
              >
                <Search className="w-4 h-4" />
                <span>استعلام لحظه‌ای پرونده</span>
              </button>
            </div>
          </form>
        </div>

        {/* Not Found Banner */}
        {notFound && (
          <div className="rounded-2xl p-6 sm:p-8 bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-center space-y-4 animate-fadeIn">
            <AlertCircle className="w-10 h-10 mx-auto text-rose-500" />
            <div className="space-y-1">
              <h3 className="font-bold text-base">پرونده‌ای با این مشخصات در سامانه یافت نشد</h3>
              <p className="text-xs max-w-lg mx-auto text-gray-600 dark:text-gray-300">
                لطفاً شماره پرونده درج‌شده روی قرارداد وکالت (مانند SR-1402-8821) یا کد ملی را بررسی فرمایید، یا از نمونه‌های تستی بالای صفحه استفاده کنید.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setNotFound(false);
                  setCaseNumberInput('');
                  setNationalCodeInput('');
                }}
                className="px-4 py-2 rounded-xl bg-white dark:bg-gray-800 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-700 text-xs font-bold hover:bg-gray-100 transition-all cursor-pointer"
              >
                پاک کردن فرم و جستجوی مجدد
              </button>
              <button
                type="button"
                onClick={() => selectPresetCase(DEMO_CASES[0])}
                className="px-4 py-2 rounded-xl bg-[#D4AF37] text-[#0B132B] text-xs font-bold hover:bg-[#b8952b] transition-all cursor-pointer"
              >
                بارگذاری پرونده نمونه (سلطانی)
              </button>
            </div>
          </div>
        )}

        {/* Initial Empty State Guide (When no search has been made yet) */}
        {!searchedCase && !notFound && (
          <div className="rounded-3xl p-6 sm:p-10 bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 text-center space-y-6 shadow-sm animate-fadeIn">
            <div className="w-16 h-16 mx-auto rounded-3xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
              <Scale className="w-8 h-8" />
            </div>

            <div className="space-y-2 max-w-xl mx-auto">
              <h3 className="text-lg font-bold font-serif text-[#0B132B] dark:text-white">
                سامانه هوشمند و امن پیگیری الکترونیک پرونده‌ها
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                جهت استعلام آخرین وضعیت لوایح تقدیمی، ابلاغیه‌های ثنا و تاریخ دادگاه، شماره کلاسه پرونده خود را در کادر بالا وارد نموده یا از دکمه‌های «تست زنده» استفاده نمایید.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-right pt-2">
              <div className="p-4 rounded-2xl bg-gray-50 dark:bg-[#070D1E] border border-gray-100 dark:border-gray-800 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-gray-800 dark:text-gray-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>استعلام برخط و لحظه‌ای</span>
                </div>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed">
                  اتصال به گردش دادرسی و تقویم جلسات شعبه بدون نیاز به حضور فیزیکی در دادگاه.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-gray-50 dark:bg-[#070D1E] border border-gray-100 dark:border-gray-800 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-gray-800 dark:text-gray-200">
                  <Lock className="w-4 h-4 text-[#D4AF37]" />
                  <span>محرمانگی تام اطلاعات</span>
                </div>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed">
                  حفظ اسرار پرونده منطبق بر ماده ۴۳ قانون وکالت و رمزنگاری اسناد قضایی.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-gray-50 dark:bg-[#070D1E] border border-gray-100 dark:border-gray-800 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-gray-800 dark:text-gray-200">
                  <FileText className="w-4 h-4 text-blue-500" />
                  <span>دریافت نسخ معتبر لوایح</span>
                </div>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed">
                  دسترسی مستقیم موکل به فایل‌های PDF دادخواست‌ها، آرای دادگاه و مستندات پرونده.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Searched Case Detailed View */}
        {searchedCase && (
          <div className="rounded-3xl p-6 sm:p-8 bg-white dark:bg-[#0B132B] border border-[#D4AF37]/50 shadow-2xl space-y-8 text-right animate-fadeIn">
            
            {/* Header info bar */}
            <div className="border-b border-gray-200 dark:border-gray-800 pb-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                    searchedCase.statusCode === 'DECIDED'
                      ? 'bg-emerald-500/15 text-emerald-500 border-emerald-500/30'
                      : searchedCase.statusCode === 'HEARING_PENDING'
                      ? 'bg-amber-500/15 text-amber-500 border-amber-500/30'
                      : 'bg-blue-500/15 text-blue-500 border-blue-500/30'
                  }`}>
                    {searchedCase.status}
                  </span>
                  <span className="text-xs font-mono font-bold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2.5 py-1 rounded-lg">
                    کلاسه: {searchedCase.caseNumber}
                  </span>
                  <span className="text-[11px] text-gray-400">
                    آخرین به‌روزرسانی: {searchedCase.lastUpdate}
                  </span>
                </div>

                <h2 className="text-lg sm:text-xl font-bold font-serif text-[#0B132B] dark:text-white pt-1">
                  {searchedCase.caseTitle}
                </h2>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500 dark:text-gray-400 pt-1">
                  <span>موکل: <strong className="text-gray-800 dark:text-gray-200">{searchedCase.clientName}</strong></span>
                  <span>|</span>
                  <span>مرجع: <strong className="text-gray-800 dark:text-gray-200">{searchedCase.courtBranch}</strong></span>
                  <span>|</span>
                  <span>قاضی رسیدگی‌کننده: {searchedCase.judgeName}</span>
                </div>
              </div>

              {/* Hearing Countdown Box */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#0B132B] to-[#1C2541] border border-[#D4AF37]/40 text-white space-y-2 text-center shrink-0 min-w-[240px] shadow-lg">
                <div className="flex items-center justify-center gap-1.5 text-xs text-[#D4AF37] font-bold">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>موعد جلسه بعدی دادگاه:</span>
                </div>
                <div className="text-sm font-bold font-mono">
                  {searchedCase.nextHearingDate}
                </div>
                <div className="text-[11px] text-gray-300">
                  ساعت: {searchedCase.nextHearingTime}
                </div>
                {searchedCase.hearingDaysRemaining > 0 ? (
                  <div className="inline-block px-3 py-1 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] text-xs font-bold border border-[#D4AF37]/30">
                    {searchedCase.hearingDaysRemaining} روز مانده تا وقت دادگاه
                  </div>
                ) : (
                  <div className="inline-block px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30">
                    پرونده مختومه یا اجرای احکام
                  </div>
                )}
              </div>
            </div>

            {/* Attorney Summary Box */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#AA820A] dark:text-[#F3E5AB]">
                <UserCheck className="w-4 h-4" />
                <span>گزارش تحلیلی وکیل سرپرست (دکتر سیده مریم رضوی):</span>
              </div>
              <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-200 leading-relaxed">
                {searchedCase.attorneySummary}
              </p>
            </div>

            {/* Visual Judicial Timeline */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-[#0B132B] dark:text-white flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#D4AF37]" />
                  <span>مراحل طی‌شده دادرسی در شعب دادگستری:</span>
                </h3>
                <span className="text-xs text-gray-400">
                  مرحله {searchedCase.steps.filter((s) => s.completed).length} از {searchedCase.steps.length}
                </span>
              </div>

              <div className="space-y-4 relative before:absolute before:right-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-gray-200 dark:before:bg-gray-800 pr-2">
                {searchedCase.steps.map((step, idx) => (
                  <div key={idx} className="relative flex items-start gap-4">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 font-bold text-xs ${
                        step.completed
                          ? 'bg-emerald-500 text-white shadow-[0_0_12px_rgba(16,185,129,0.5)]'
                          : step.current
                          ? 'bg-[#D4AF37] text-[#0B132B] ring-4 ring-[#D4AF37]/30'
                          : 'bg-gray-300 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                      }`}
                    >
                      {step.completed ? <Check className="w-4 h-4 stroke-[3]" /> : idx + 1}
                    </div>

                    <div className={`p-4 rounded-2xl border flex-1 space-y-1.5 transition-all ${
                      step.current
                        ? 'bg-[#D4AF37]/5 border-[#D4AF37]/40 ring-1 ring-[#D4AF37]/30'
                        : 'bg-gray-50 dark:bg-[#070D1E] border-gray-200 dark:border-gray-800'
                    }`}>
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-xs text-[#0B132B] dark:text-white">
                            {step.title}
                          </h4>
                          {step.stageName && (
                            <span className="px-2 py-0.5 rounded-md bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-[10px] font-bold">
                              {step.stageName}
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-gray-400 font-mono">
                          {step.date}
                        </span>
                      </div>

                      <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                        {step.description}
                      </p>

                      {step.courtActionCode && (
                        <div className="text-[10px] font-mono text-gray-400 pt-1">
                          شناسه ثنایی اقدام: {step.courtActionCode}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Official Judicial Documents Vault */}
            {searchedCase.documents && searchedCase.documents.length > 0 && (
              <div className="space-y-3 pt-2">
                <h3 className="text-sm font-bold text-[#0B132B] dark:text-white flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-500" />
                  <span>اسناد و لوایح ابلاغ‌شده این پرونده (امضای دیجیتال وکیل):</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {searchedCase.documents.map((doc, dIdx) => (
                    <div
                      key={dIdx}
                      className="p-3.5 rounded-2xl bg-gray-50 dark:bg-[#070D1E] border border-gray-200 dark:border-gray-800 flex items-center justify-between gap-3 hover:border-[#D4AF37]/50 transition-all"
                    >
                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-500 text-[10px] font-mono font-bold">
                            {doc.type}
                          </span>
                          <span className="text-xs font-bold text-gray-800 dark:text-gray-200 truncate block">
                            {doc.title}
                          </span>
                        </div>
                        <div className="text-[10px] text-gray-400 font-mono">
                          {doc.date} • {doc.fileSize}
                        </div>
                      </div>

                      <button
                        onClick={() => setActiveDocPreview(doc)}
                        className="p-2 rounded-xl bg-[#D4AF37]/10 hover:bg-[#D4AF37] text-[#D4AF37] hover:text-[#060B18] transition-colors cursor-pointer shrink-0"
                        title="مشاهده سند"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-gray-200 dark:border-gray-800 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleSendSmsAlert}
                  className="px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:text-[#D4AF37] text-xs font-bold flex items-center gap-2 border border-gray-200 dark:border-gray-700 transition-colors cursor-pointer"
                >
                  <Bell className="w-3.5 h-3.5 text-amber-500" />
                  <span>{simulatedSmsSent ? 'پیامک وضعیت ارسال شد' : 'فعال‌سازی اطلاع‌رسانی پیامکی ثنا'}</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={onBookConsultation}
                  className="btn-gold px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 shadow-md hover:scale-105 transition-all cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>درخواست جلسه فوری با وکیل پیرامون این پرونده</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Document Preview Modal */}
        {activeDocPreview && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white dark:bg-[#0B132B] rounded-3xl p-6 max-w-lg w-full border-2 border-[#D4AF37]/40 shadow-2xl space-y-4 text-right">
              <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-3">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#D4AF37]" />
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white">
                    {activeDocPreview.title}
                  </h4>
                </div>
                <button
                  onClick={() => setActiveDocPreview(null)}
                  className="p-1 rounded-lg text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <div className="p-4 rounded-xl bg-gray-50 dark:bg-[#070D1E] border border-gray-200 dark:border-gray-800 space-y-2 text-xs text-gray-600 dark:text-gray-300">
                <p><strong>تاریخ ثبت در سیستم:</strong> {activeDocPreview.date}</p>
                <p><strong>حجم فایل:</strong> {activeDocPreview.fileSize}</p>
                <p className="font-mono text-[11px]"><strong>شناسه امضای امن:</strong> {activeDocPreview.securityHash}</p>
                <p className="text-emerald-500 font-bold">✓ دارای امضای الکترونیک معتبر کانون وکلای دادگستری مرکز</p>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  onClick={() => setActiveDocPreview(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  بستن پنجره
                </button>
                <button
                  onClick={() => {
                    alert(`فایل ${activeDocPreview.title} با موفقیت دانلود شد.`);
                    setActiveDocPreview(null);
                  }}
                  className="btn-gold px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  دانلود نسخه رسمی PDF
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
