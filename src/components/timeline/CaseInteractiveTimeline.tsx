import React, { useState } from 'react';
import {
  Calendar,
  CheckCircle2,
  Clock,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  FileText,
  Scale,
  ShieldCheck,
  User,
  ArrowRight,
  Sparkles,
  Download,
  Info,
  MapPin,
  ExternalLink,
  Filter,
  Check,
  Award,
} from 'lucide-react';

export type MilestoneStatus = 'completed' | 'in_progress' | 'upcoming';

export interface CaseMilestoneItem {
  id: string;
  stepNumber: number;
  title: string;
  stageBadge: string;
  date: string;
  courtOrVenue: string;
  status: MilestoneStatus;
  summary: string;
  lawyerActions: string;
  clientRequirement?: {
    isActionNeeded: boolean;
    instruction: string;
  };
  legalReference?: string;
  relatedDocumentName?: string;
  confidenceScore?: number;
}

const CASE_TIMELINES_MAP: Record<string, CaseMilestoneItem[]> = {
  'c-01': [
    {
      id: 'm-1',
      stepNumber: 1,
      title: 'ثبت رسمی دادخواست بدوی در سامانه عدل‌ایران',
      stageBadge: 'طرح دعوا',
      date: '۱۴۰۳/۰۳/۱۵',
      courtOrVenue: 'دفتر خدمات الکترونیک قضایی تهران - کد ۹۸۲',
      status: 'completed',
      summary: 'طرح دعوای الزام به تنظیم سند رسمی انتقال ملک، فک رهن بانکی، و مطالبه وجه‌التزام روزانه ۵ میلیون ریال.',
      lawyerActions: 'تنظیم دادخواست استاندارد، الصاق تمبر مالیاتی و کدرهگیری مبایعه‌نامه و استعلام ثبتی پلاک ۶۷۸/۴۵.',
      legalReference: 'ماده ۲۱۹، ۲۲۰ و ۲۲۱ قانون مدنی',
      relatedDocumentName: 'دادخواست بدوی ثبت‌شده در سامانه ثنا',
      confidenceScore: 98,
    },
    {
      id: 'm-2',
      stepNumber: 2,
      title: 'تعیین شعبه ۱۲ و ابلاغ وقت رسیدگی اول به طرفین',
      stageBadge: 'تعیین وقت',
      date: '۱۴۰۳/۰۴/۰۲',
      courtOrVenue: 'شعبه ۱۲ دادگاه عمومی حقوقی شهید بهشتی تهران',
      status: 'completed',
      summary: 'ارجاع پرونده به شعبه ۱۲ حقوقی و ابلاغ اخطاریه قانونی به خوانده دعوا جهت حضور در جلسه اول.',
      lawyerActions: 'اخذ تاییدیه ابلاغ واقعی به خوانده و پاسخ مستدل به ایراد عدم صلاحیت محلی مطروحه از سوی وکیل خوانده.',
      legalReference: 'ماده ۱۱ قانون آیین دادرسی مدنی (صلاحیت محل وقوع مال غیرمنقول)',
      relatedDocumentName: 'اخطاریه دادگاه و گواهی ابلاغ ثنا',
      confidenceScore: 95,
    },
    {
      id: 'm-3',
      stepNumber: 3,
      title: 'جلسه اول دادرسی و صدور قرار ارجاع امر به کارشناس',
      stageBadge: 'جلسه دادرسی',
      date: '۱۴۰۳/۰۴/۲۸',
      courtOrVenue: 'شعبه ۱۲ دادگاه عمومی حقوقی با حضور ریاست شعبه',
      status: 'completed',
      summary: 'استماع اظهارات وکلای طرفین، احراز اصالت مبایعه‌نامه و صدور قرار کارشناسی ارزش‌گذاری و متراژ ملک.',
      lawyerActions: 'حضور وکیل در جلسه محاکمه و رد ادعای فسخ قرارداد به دلیل عدم رعایت شروط فسخ توسط فروشنده.',
      legalReference: 'ماده ۲۵۷ قانون آیین دادرسی مدنی',
      relatedDocumentName: 'صورتجلسه دادرسی شعبه ۱۲',
      confidenceScore: 92,
    },
    {
      id: 'm-4',
      stepNumber: 4,
      title: 'تودیع دستمزد کارشناس و انتخاب هیئت کارشناسی',
      stageBadge: 'کارشناسی',
      date: '۱۴۰۳/۰۵/۲۰',
      courtOrVenue: 'کانون کارشناسان رسمی دادگستری استان تهران',
      status: 'completed',
      summary: 'واریز دستمزد کارشناس رسمی امور ثبتی و تعیین وقت معاینه میدانی از پلاک ثبتی ملک در منطقه ونک.',
      lawyerActions: 'پیگیری پرونده در کانون کارشناسان و هماهنگی جهت بازدید کارشناس از محل آپارتمان.',
      clientRequirement: {
        isActionNeeded: false,
        instruction: 'هزینه کارشناسی توسط موکل واریز و فیش آن به شعبه تسلیم گردید (تکمیل شد).',
      },
      relatedDocumentName: 'قبض واریز دستمزد کارشناس رسمی',
      confidenceScore: 96,
    },
    {
      id: 'm-5',
      stepNumber: 5,
      title: 'وصول نظریه کارشناسی رسمی و تایید سلامت سند',
      stageBadge: 'وصول گزارش',
      date: '۱۴۰۳/۰۶/۱۰',
      courtOrVenue: 'شعبه ۱۲ دادگاه حقوقی مجتمع شهید بهشتی',
      status: 'completed',
      summary: 'ارائه گزارش کارشناسی مبنی بر صحت اوصاف مبیع، عدم معارض در ملک، و تایید قابلیت تنظیم سند رسمی.',
      lawyerActions: 'اخذ نسخه کامل گزارش کارشناسی ۱۲ صفحه‌ای و بررسی فنی مندرجات متراژ و مشاعات.',
      legalReference: 'ماده ۲۶۰ قانون آیین دادرسی مدنی',
      relatedDocumentName: 'نظریه کارشناس رسمی امور ثبتی و ارزیابی',
      confidenceScore: 94,
    },
    {
      id: 'm-6',
      stepNumber: 6,
      title: 'تسلیم لایحه اعتراضیه تکمیلی و تقاضای صدور رأی قطعی',
      stageBadge: 'تبادل لوایح',
      date: '۱۴۰۳/۰۶/۲۵',
      courtOrVenue: 'شعبه ۱۲ دادگاه عمومی حقوقی تهران',
      status: 'in_progress',
      summary: 'ثبت لایحه تکمیلی دکتر سیده مریم رضوی در رد اعتراضات بلاوجه وکیل خوانده و تقاضای تعیین جلسه پایانی.',
      lawyerActions: 'تنظیم لایحه حقوقی با استناد به آرای وحدت رویه دیوان عالی کشور پیرامون وجه‌التزام قراردادی.',
      clientRequirement: {
        isActionNeeded: false,
        instruction: 'کلیه اقدامات توسط وکیل در حال پیگیری است و نیازی به حضور یا اقدام از سوی موکل نیست.',
      },
      legalReference: 'رای وحدت رویه شماره ۸۰۵ هیئت عمومی دیوان عالی کشور',
      relatedDocumentName: 'لایحه تکمیلی دفاعیه وکیل دکتر رضوی',
      confidenceScore: 93,
    },
    {
      id: 'm-7',
      stepNumber: 7,
      title: 'جلسه دوم دادگاه و بررسی نهایی خسارات تاخیر تادیه',
      stageBadge: 'جلسه پیش‌رو',
      date: 'سه‌شنبه ۱۵ مهر ۱۴۰۳ - ساعت ۰۹:۳۰',
      courtOrVenue: 'شعبه ۱۲ مجتمع قضایی شهید بهشتی - سالن جلسات ۲',
      status: 'upcoming',
      summary: 'رسیدگی نهایی به تقاضای خسارت تاخیر تادیه و الزام به فک رهن بانکی از پلاک ثبتی ملک ونک.',
      lawyerActions: 'حضور دکتر سیده مریم رضوی به همراه وکیل همکار در دادگاه جهت دفاع از حقوق موکل.',
      clientRequirement: {
        isActionNeeded: false,
        instruction: 'حضور موکل اختیاری است؛ وکیل پرونده با وکالت‌نامه رسمی در جلسه حضور خواهد یافت.',
      },
      legalReference: 'ماده ۵۱۵ قانون آیین دادرسی مدنی',
      confidenceScore: 90,
    },
    {
      id: 'm-8',
      stepNumber: 8,
      title: 'انشای دادنامه بدوی و ابلاغ الکترونیک در سامانه ثنا',
      stageBadge: 'صدور دادنامه',
      date: 'پیش‌بینی: آبان ۱۴۰۳',
      courtOrVenue: 'شعبه ۱۲ دادگاه عمومی حقوقی',
      status: 'upcoming',
      summary: 'صدور حکم بر محکومیت خوانده به حضور در دفترخانه و انتقال قطعی سند به همراه پرداخت خسارت.',
      lawyerActions: 'رصد لحظه‌ای سامانه ثنا جهت دریافت متن دادنامه و اطلاع فوری به موکل.',
      legalReference: 'ماده ۲۹۵ و ۲۹۷ قانون آیین دادرسی مدنی',
      confidenceScore: 91,
    },
    {
      id: 'm-9',
      stepNumber: 9,
      title: 'انقضای مهلت ۲۰ روزه تجدیدنظرخواهی یا قطعیت دادنامه',
      stageBadge: 'قطعیت حکم',
      date: 'پیش‌بینی: آذر ۱۴۰۳',
      courtOrVenue: 'دادگاه تجدیدنظر استان تهران یا شعبه ۱۲',
      status: 'upcoming',
      summary: 'قطعیت رأی در صورت عدم تجدیدنظرخواهی خوانده یا ارسال لایحه دفاعیه تجدیدنظر در صورت اعتراض.',
      lawyerActions: 'محاسبه دقیق مواعد قانونی تجدیدنظر و آمادگی جهت پاسخ فوری به تجدیدنظرخواهی احتمالی.',
      legalReference: 'ماده ۳۳۶ و ۳۶۴ قانون آیین دادرسی مدنی',
      confidenceScore: 89,
    },
    {
      id: 'm-10',
      stepNumber: 10,
      title: 'صدور اجراییه و انتقال سند در دفترخانه توسط نماینده دادگاه',
      stageBadge: 'اجرای احکام',
      date: 'پیش‌بینی: دی ۱۴۰۳',
      courtOrVenue: 'واحد اجرای احکام مدنی مجتمع شهید بهشتی و دفترخانه شماره ۱۸',
      status: 'upcoming',
      summary: 'ارسال پرونده به واحد اجرای احکام؛ در صورت استنکاف فروشنده، دادورز دادگاه در دفترخانه حاضر و سند را به نام موکل امضا خواهد کرد.',
      lawyerActions: 'اخذ اجراییه، تشکیل پرونده اجرایی، تقاضای معرفی نماینده قضایی به دفترخانه اسناد رسمی.',
      legalReference: 'ماده ۱۴۵ قانون اجرای احکام مدنی',
      confidenceScore: 97,
    },
  ],
  'c-02': [
    {
      id: 'm-201',
      stepNumber: 1,
      title: 'ارسال اخطار رسمی آغاز فرایند داوری تجاری',
      stageBadge: 'شروع داوری',
      date: '۱۴۰۳/۰۲/۱۰',
      courtOrVenue: 'دبیرخانه مرکز داوری اتاق بازرگانی ایران (ACIC)',
      status: 'completed',
      summary: 'ابلاغ رسمی نقض تعهدات قراردادی پیمانکار در پروژه صادرات تجهیزات نیروگاهی و فعال‌سازی شرط داوری.',
      lawyerActions: 'تنظیم تقاضانامه داوری بر مبنای قواعد داوری سازمانی اتاق بازرگانی و استناد به قرارداد بین‌المللی.',
      legalReference: 'ماده ۴۵۴ به بعد قانون آیین دادرسی مدنی و قانون داوری تجاری بین‌المللی',
      relatedDocumentName: 'قرارداد اصلی پیمانکاری و شرط ارجاع به داوری',
      confidenceScore: 95,
    },
    {
      id: 'm-202',
      stepNumber: 2,
      title: 'تشکیل دیوان داوری و تعیین سرداور پرونده',
      stageBadge: 'انتخاب داوران',
      date: '۱۴۰۳/۰۳/۱۸',
      courtOrVenue: 'مرکز داوری اتاق بازرگانی، صنایع، معادن و کشاورزی ایران',
      status: 'completed',
      summary: 'انتخاب داوران اختصاصی طرفین و توافق بر انتخاب سرداور (دکتر سیده مریم رضوی).',
      lawyerActions: 'اخذ استقلال و بی‌طرفی داور و تشکیل دبیرخانه اختصاصی داوری.',
      confidenceScore: 98,
    },
    {
      id: 'm-203',
      stepNumber: 3,
      title: 'تصویب قرارنامه داوری (Terms of Reference) و جدول زمانی',
      stageBadge: 'قرارنامه داوری',
      date: '۱۴۰۳/۰۴/۱۲',
      courtOrVenue: 'مرکز داوری اتاق بازرگانی',
      status: 'completed',
      summary: 'تعیین محدوده موضوع اختلاف، زبان داوری، نحوه تبادل اسناد اعتبارات اسنادی (LC) و مهلت‌های تبادل لایحه.',
      lawyerActions: 'تنظیم نسخه نهایی قرارنامه داوری منطبق با استانداردهای فیدیک و امضای طرفین.',
      confidenceScore: 94,
    },
    {
      id: 'm-204',
      stepNumber: 4,
      title: 'تبادل لوایح دفاعیه و بررسی اسناد فنی نیروگاهی',
      stageBadge: 'تبادل لوایح',
      date: '۱۴۰۳/۰۵/۳۰',
      courtOrVenue: 'دبیرخانه دیوان داوری',
      status: 'completed',
      summary: 'بررسی اسناد بانکی، اعتبارات اسنادی و صورت‌جلسات تحویل موقت تجهیزات توربین نیروگاه.',
      lawyerActions: 'تحلیل حقوقی مکاتبات سوئیفت و اسناد حمل کالا با قوانین اینکوترمز ۲۰۲۰.',
      confidenceScore: 91,
    },
    {
      id: 'm-205',
      stepNumber: 5,
      title: 'جلسه استماع شفاهی کارشناسان فنی و ادله طرفین',
      stageBadge: 'جلسه استماع',
      date: 'یکشنبه ۲۷ مهر ۱۴۰۳ - ساعت ۱۱:۰۰',
      courtOrVenue: 'سالن کنفرانس مرکز داوری اتاق بازرگانی تهران',
      status: 'in_progress',
      summary: 'برگزاری جلسه حضوری و مجازی با حضور کارشناسان فنی برق و مکانیک و بررسی ادعای فورس‌ماژور.',
      lawyerActions: 'آماده‌سازی لایحه نهایی استماع و سوالات فنی از کارشناسان شرکت خارجی.',
      clientRequirement: {
        isActionNeeded: true,
        instruction: 'نماینده فنی شرکت موکل جهت ادای توضیحات فنی پیرامون تست‌های حرارتی در جلسه حاضر باشد.',
      },
      legalReference: 'ماده ۲۲ قانون داوری تجاری بین‌المللی',
      confidenceScore: 92,
    },
    {
      id: 'm-206',
      stepNumber: 6,
      title: 'صدور و امضای رأی نهایی داوری بین‌المللی',
      stageBadge: 'انشای رأی',
      date: 'پیش‌بینی: آبان ۱۴۰۳',
      courtOrVenue: 'مرکز داوری اتاق بازرگانی',
      status: 'upcoming',
      summary: 'انشای رأی قاطع دعوا و تعیین تکلیف خسارت دیرکرد و ضبط ضمانت‌نامه بانکی.',
      lawyerActions: 'تنظیم پیش‌نویس رأی داوری با رعایت تمامی جوانب اعتبار و جلوگیری از ابطال در محاکم.',
      legalReference: 'ماده ۳۰ قانون داوری تجاری بین‌المللی و کنوانسیون نیویورک ۱۹۵۸',
      confidenceScore: 96,
    },
    {
      id: 'm-207',
      stepNumber: 7,
      title: 'تقاضای اجرای رأی داوری در دادگاه‌های عمومی تهران',
      stageBadge: 'اجرای رأی',
      date: 'پیش‌بینی: آذر ۱۴۰۳',
      courtOrVenue: 'مجتمع قضایی شهید بهشتی تهران',
      status: 'upcoming',
      summary: 'تقاضای ابلاغ و صدور اجراییه از دادگاه صالح جهت وصول مطالبات ارزی و ریالی.',
      lawyerActions: 'اقدام فوری جهت توقیف اموال و استعلام حساب‌های بانکی محکوم‌علیه.',
      legalReference: 'ماده ۴۸۸ قانون آیین دادرسی مدنی',
      confidenceScore: 94,
    },
  ],
};

interface CaseInteractiveTimelineProps {
  caseId: string;
  caseNumber: string;
  caseSubject: string;
  onOpenBooking?: () => void;
}

export const CaseInteractiveTimeline: React.FC<CaseInteractiveTimelineProps> = ({
  caseId,
  caseNumber,
  caseSubject,
  onOpenBooking,
}) => {
  const [filter, setFilter] = useState<'all' | 'completed' | 'in_progress' | 'upcoming'>('all');
  const [expandedMilestoneId, setExpandedMilestoneId] = useState<string | null>(null);
  const [showSimulatedAdvanceModal, setShowSimulatedAdvanceModal] = useState(false);

  // Retrieve timeline data for this case, or fallback to c-01
  const milestones = CASE_TIMELINES_MAP[caseId] || CASE_TIMELINES_MAP['c-01'];

  const completedCount = milestones.filter((m) => m.status === 'completed').length;
  const inProgressCount = milestones.filter((m) => m.status === 'in_progress').length;
  const upcomingCount = milestones.filter((m) => m.status === 'upcoming').length;
  const progressPercent = Math.round((completedCount / milestones.length) * 100);

  const filteredMilestones = milestones.filter((m) => {
    if (filter === 'completed') return m.status === 'completed';
    if (filter === 'in_progress') return m.status === 'in_progress';
    if (filter === 'upcoming') return m.status === 'upcoming';
    return true;
  });

  const currentMilestone = milestones.find((m) => m.status === 'in_progress') || milestones[0];
  const nextUpcoming = milestones.find((m) => m.status === 'upcoming');

  const toggleExpand = (id: string) => {
    setExpandedMilestoneId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="space-y-6 text-right font-persian" dir="rtl">
      
      {/* Header Banner & Executive Roadmap Summary */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-[#0B132B] via-[#1C2541] to-[#0B132B] text-white border border-[#D4AF37]/40 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-[#D4AF37] text-[#0B132B] text-xs font-black flex items-center gap-1.5 shadow-sm">
                <Sparkles className="w-3.5 h-3.5" />
                <span>نقشه راه و جدول زمانی دادرسی (Case Milestones Roadmap)</span>
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-gray-300 text-xs font-mono">
                {caseNumber}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold font-serif text-white leading-tight">
              {caseSubject}
            </h3>

            <p className="text-xs text-gray-300 max-w-2xl leading-relaxed">
              این تایم‌لاین هوشمند، تاریخچه دقیق اقدامات قضایی سپری‌شده، مرحله در حال جریان و مواعد آتی پرونده شما را نمایش می‌دهد.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-center min-w-[100px]">
              <span className="block text-[11px] text-gray-300">پیشرفت کل</span>
              <span className="font-mono text-2xl font-black text-[#D4AF37]">
                {progressPercent}٪
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-center min-w-[110px]">
              <span className="block text-[11px] text-gray-300">مراحل انجام‌شده</span>
              <span className="font-mono text-lg font-black text-emerald-400">
                {completedCount} از {milestones.length}
              </span>
            </div>
          </div>
        </div>

        {/* Progress Step Bar */}
        <div className="mt-6 pt-5 border-t border-white/10 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-gray-300">
            <span className="flex items-center gap-1.5 text-[#F3E5AB]">
              <Clock className="w-4 h-4 text-[#D4AF37] animate-pulse" />
              <span>مرحله فعال کنونی: {currentMilestone.title}</span>
            </span>
            {nextUpcoming && (
              <span className="hidden sm:inline text-gray-400">
                گام بعدی: {nextUpcoming.title} ({nextUpcoming.date})
              </span>
            )}
          </div>

          <div className="h-2.5 rounded-full bg-white/15 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#D4AF37] via-[#FCE38A] to-emerald-400 rounded-full transition-all duration-700"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Interactive Controls & Filters */}
      <div className="p-4 rounded-2xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        
        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          <button
            onClick={() => setFilter('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
              filter === 'all'
                ? 'bg-[#0B132B] dark:bg-[#D4AF37] text-white dark:text-[#0B132B] shadow-sm'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200'
            }`}
          >
            همه مراحل ({milestones.length})
          </button>

          <button
            onClick={() => setFilter('completed')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 ${
              filter === 'completed'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-500/20'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>مراحل طی‌شده ({completedCount})</span>
          </button>

          <button
            onClick={() => setFilter('in_progress')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 ${
              filter === 'in_progress'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'bg-amber-500/10 text-amber-700 dark:text-amber-300 hover:bg-amber-500/20'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>مرحله در حال اقدام ({inProgressCount})</span>
          </button>

          <button
            onClick={() => setFilter('upcoming')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 ${
              filter === 'upcoming'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-500/20'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>مراحل و مواعد آتی ({upcomingCount})</span>
          </button>
        </div>

        {/* Action button */}
        <div className="flex items-center gap-2">
          {onOpenBooking && (
            <button
              onClick={onOpenBooking}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#AA820A] text-[#0B132B] font-bold text-xs shadow-sm hover:brightness-110 transition-all flex items-center gap-1.5 shrink-0"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>هماهنگی جلسه با وکیل</span>
            </button>
          )}

          <button
            onClick={() => setShowSimulatedAdvanceModal(true)}
            className="px-3.5 py-2 rounded-xl bg-blue-600/10 hover:bg-blue-600/20 text-blue-700 dark:text-blue-300 border border-blue-500/30 text-xs font-bold transition-all flex items-center gap-1.5 shrink-0"
            title="مشاهده شبیه‌سازی پیش‌بینی دادنامه و گام بعد"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>پیش‌بینی گام بعد</span>
          </button>
        </div>
      </div>

      {/* Main Dynamic Timeline Stream */}
      <div className="relative border-r-2 border-dashed border-[#D4AF37]/40 pr-4 sm:pr-8 mr-3 sm:mr-6 space-y-6">
        
        {filteredMilestones.map((milestone, idx) => {
          const isExpanded = expandedMilestoneId === milestone.id;
          const isDone = milestone.status === 'completed';
          const isInProgress = milestone.status === 'in_progress';
          const isUpcoming = milestone.status === 'upcoming';

          return (
            <div
              key={milestone.id}
              className="relative transition-all duration-300"
            >
              {/* Timeline Node Icon Anchor */}
              <div
                className={`absolute -right-[26px] sm:-right-[42px] top-4 w-7 h-7 sm:w-9 sm:h-9 rounded-2xl flex items-center justify-center font-bold text-xs shadow-md transition-transform ${
                  isDone
                    ? 'bg-emerald-500 text-white'
                    : isInProgress
                    ? 'bg-amber-500 text-white animate-bounce shadow-amber-500/40'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-300 border border-gray-300 dark:border-gray-600'
                }`}
              >
                {isDone ? (
                  <Check className="w-4 h-4 sm:w-5 sm:h-5 stroke-[3]" />
                ) : isInProgress ? (
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
                ) : (
                  <span className="font-mono text-xs">{milestone.stepNumber}</span>
                )}
              </div>

              {/* Milestone Card */}
              <div
                className={`rounded-3xl border transition-all duration-200 overflow-hidden cursor-pointer ${
                  isInProgress
                    ? 'bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-white dark:to-[#0B132B] border-amber-500/60 shadow-lg ring-1 ring-amber-500/30'
                    : isDone
                    ? 'bg-white dark:bg-[#0B132B] border-gray-200 dark:border-gray-800 hover:border-[#D4AF37]/50 shadow-sm'
                    : 'bg-gray-50/70 dark:bg-gray-900/40 border-gray-200 dark:border-gray-800/80 opacity-90'
                }`}
                onClick={() => toggleExpand(milestone.id)}
              >
                {/* Milestone Summary Header */}
                <div className="p-5 sm:p-6 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                          isDone
                            ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300'
                            : isInProgress
                            ? 'bg-amber-500/20 text-amber-800 dark:text-amber-300'
                            : 'bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                        }`}
                      >
                        گام {milestone.stepNumber}: {milestone.stageBadge}
                      </span>

                      {isInProgress && (
                        <span className="px-2 py-0.5 rounded-full bg-amber-500 text-white text-[10px] font-bold animate-pulse">
                          مرحله جاری
                        </span>
                      )}

                      {milestone.confidenceScore && (
                        <span className="px-2 py-0.5 rounded-full bg-[#D4AF37]/15 text-[#AA820A] dark:text-[#F3E5AB] text-[10px] font-mono font-bold">
                          شانس موفقیت: {milestone.confidenceScore}٪
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                      <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span className="font-bold text-gray-700 dark:text-gray-300">{milestone.date}</span>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-base sm:text-lg font-bold font-serif text-[#0B132B] dark:text-white leading-snug">
                      {milestone.title}
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-300 mt-1 leading-relaxed">
                      {milestone.summary}
                    </p>
                  </div>

                  {/* Quick Venue pill */}
                  <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 dark:text-gray-400 pt-1">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>{milestone.courtOrVenue}</span>
                    </span>
                    {milestone.legalReference && (
                      <span className="flex items-center gap-1 font-mono text-[11px] text-[#D4AF37]">
                        <Scale className="w-3 h-3" />
                        <span>{milestone.legalReference}</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Expanded Details Drawer inside the Card */}
                {isExpanded && (
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-3 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/20 space-y-4">
                    
                    {/* Lawyer Actions */}
                    <div className="p-4 rounded-2xl bg-amber-500/10 dark:bg-amber-500/15 border-r-4 border-r-[#D4AF37] space-y-1.5">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-[#AA820A] dark:text-[#F3E5AB]">
                        <ShieldCheck className="w-4 h-4" />
                        <span>اقدام و پیگیری حقوقی دفتر وکالت:</span>
                      </div>
                      <p className="text-xs text-gray-700 dark:text-gray-200 leading-relaxed text-justify">
                        {milestone.lawyerActions}
                      </p>
                    </div>

                    {/* Client requirement (if any) */}
                    {milestone.clientRequirement && (
                      <div className="p-4 rounded-2xl bg-blue-500/10 dark:bg-blue-500/15 border-r-4 border-r-blue-500 space-y-1.5">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-blue-700 dark:text-blue-300">
                          <User className="w-4 h-4" />
                          <span>وضعیت وظایف و حضور موکل:</span>
                        </div>
                        <p className="text-xs text-gray-700 dark:text-gray-200 leading-relaxed">
                          {milestone.clientRequirement.instruction}
                        </p>
                      </div>
                    )}

                    {/* Related Document Attachment */}
                    {milestone.relatedDocumentName && (
                      <div className="p-3.5 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-between gap-3 text-xs">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-[#D4AF37]" />
                          <span className="font-bold text-gray-800 dark:text-gray-200">
                            سند یا لایحه مربوط به این گام: {milestone.relatedDocumentName}
                          </span>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            alert(`سند «${milestone.relatedDocumentName}» با موفقیت دانلود شد.`);
                          }}
                          className="px-3 py-1 rounded-xl bg-gray-100 hover:bg-[#D4AF37] text-gray-700 hover:text-[#0B132B] dark:bg-gray-700 dark:text-gray-200 font-bold text-xs flex items-center gap-1 transition-colors"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>دریافت سند</span>
                        </button>
                      </div>
                    )}

                    <div className="flex items-center justify-between text-[11px] text-gray-400 pt-1">
                      <span>شناسه ثبتی مرحله: {milestone.id}</span>
                      <span className="text-[#D4AF37] font-bold">برای بستن روی کارت کلیک کنید</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Simulated Advance Milestone Modal */}
      {showSimulatedAdvanceModal && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" dir="rtl">
          <div className="w-full max-w-lg bg-white dark:bg-[#0B132B] rounded-3xl border border-gray-200 dark:border-gray-800 shadow-2xl p-6 space-y-5 text-right">
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#D4AF37]" />
                <h3 className="text-base font-bold text-gray-900 dark:text-white">
                  پیش‌بینی و سناریوی گام‌های آینده پرونده
                </h3>
              </div>
              <button
                onClick={() => setShowSimulatedAdvanceModal(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs text-gray-600 dark:text-gray-300">
              <p className="leading-relaxed">
                بر اساس مدل آماری و رویه قضایی شعبات مجتمع قضایی شهید بهشتی تهران، احتمال موفقیت در اخذ دادنامه قطعی در این پرونده به شرح زیر پیش‌بینی می‌شود:
              </p>

              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-2">
                <div className="flex items-center justify-between font-bold text-emerald-700 dark:text-emerald-300">
                  <span>احتمال صدور حکم به نفع موکل:</span>
                  <span className="font-mono text-base">۹۲٪</span>
                </div>
                <div className="h-2 rounded-full bg-emerald-200 dark:bg-emerald-950 overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full w-[92%]" />
                </div>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 pt-1">
                  مستندات مبایعه‌نامه کدرهگیری‌دار و نظریه کارشناسی رسمی قاطع ادعای خوانده است.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-1">
                <span className="font-bold text-[#AA820A] dark:text-[#F3E5AB] block">
                  موعد دادرسی حساس پیش‌رو:
                </span>
                <p className="text-xs">
                  سه‌شنبه ۱۵ مهر ساعت ۰۹:۳۰ جلسه رسیدگی به ادعای خسارات روزانه است. لایحه مربوطه آماده و دفاع کامل انجام خواهد شد.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setShowSimulatedAdvanceModal(false)}
                className="px-5 py-2 rounded-xl bg-[#D4AF37] hover:bg-[#C4981C] text-[#0B132B] font-bold text-xs transition-colors"
              >
                متوجه شدم
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
