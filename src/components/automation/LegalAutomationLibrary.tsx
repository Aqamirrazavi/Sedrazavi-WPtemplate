import React, { useState, useMemo } from 'react';
import {
  Kanban,
  FileText,
  Smile,
  Calendar,
  Calculator,
  Gift,
  Mail,
  CheckCircle2,
  Clock,
  AlertCircle,
  Download,
  Printer,
  Copy,
  Plus,
  Trash2,
  Edit3,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Award,
  Users,
  Search,
  Sparkles,
  Shield,
  Layers,
  ArrowRight,
  Send,
  Bookmark,
  RefreshCw,
} from 'lucide-react';
import { ATTORNEY_INFO } from '../../data/mockData';

export type AutomationTabKey =
  | 'workflow'
  | 'documents'
  | 'surveys'
  | 'calendars'
  | 'calculators'
  | 'referrals'
  | 'newsletter';

interface ContentItem {
  id: string;
  title: string;
  category: string;
  author: string;
  status: 'idea' | 'draft' | 'review' | 'approved' | 'scheduled' | 'published';
  date: string;
  priority: 'عادی' | 'مهم' | 'فوری';
  views?: number;
}

const INITIAL_WORKFLOW_ITEMS: ContentItem[] = [
  {
    id: 'wf-1',
    title: 'بررسی فقهی و حقوقی رمزارزها در دعاوی استرداد مال',
    category: 'حقوق سایبری',
    author: 'دکتر سیده مریم رضوی',
    status: 'published',
    date: '۱۴۰۳/۰۶/۲۸',
    priority: 'فوری',
    views: 1420,
  },
  {
    id: 'wf-2',
    title: 'دستورالعمل جامع ابطال سند رسمی با اثبات جعل اثرانگشت',
    category: 'دعاوی ملکی',
    author: 'سید امیر حسین رضوی فردویی',
    status: 'scheduled',
    date: '۱۴۰۳/۰۷/۰۵',
    priority: 'مهم',
  },
  {
    id: 'wf-3',
    title: 'تطبیق شروط ضمن عقد نکاح با موازین دیوان عالی کشور',
    category: 'حقوق خانواده',
    author: 'دکتر سیده مریم رضوی',
    status: 'approved',
    date: '۱۴۰۳/۰۷/۰۲',
    priority: 'عادی',
  },
  {
    id: 'wf-4',
    title: 'شکوائیه کلاهبرداری رایانه‌ای از طریق درگاه‌های فیشینگ',
    category: 'کیفری',
    author: 'وکیل کارآموز',
    status: 'review',
    date: '۱۴۰۳/۰۷/۰۱',
    priority: 'فوری',
  },
  {
    id: 'wf-5',
    title: 'نکات کلیدی قرارداد مشارکت در ساخت و پیش‌فروش آپارتمان',
    category: 'قراردادها',
    author: 'دکتر رضوی',
    status: 'draft',
    date: '۱۴۰۳/۰۶/۳۰',
    priority: 'مهم',
  },
  {
    id: 'wf-6',
    title: 'راهنمای استناد به نظریه داوری در دعاوی پیمانکاری',
    category: 'داوری تجاری',
    author: 'سید امیر حسین رضوی فردویی',
    status: 'idea',
    date: '۱۴۰۳/۰۶/۲۹',
    priority: 'عادی',
  },
];

interface DocTemplate {
  id: string;
  category: 'قراردادها' | 'دادخواست‌ها' | 'شکوائیه‌ها' | 'لوایح' | 'اظهارنامه‌ها' | 'وکالت‌نامه‌ها' | 'تعهدنامه‌ها';
  title: string;
  description: string;
  variables: string[];
  content: string;
}

const DOC_TEMPLATES: DocTemplate[] = [
  {
    id: 'tmpl-1',
    category: 'قراردادها',
    title: 'قرارداد مشارکت در ساخت و احداث بنا',
    description: 'قالب رسمی و حقوقی مشارکت مدنی بین مالک زمین و سازنده با ضمانت اجرای تخلفات و تضمین سند',
    variables: ['نام_مالک', 'نام_سازنده', 'پلاک_ثبتی', 'مساحت_عرصه', 'سهم_الشرکه_مالک', 'تاریخ_تحویل'],
    content: `بسمه تعالی
قرارداد مشارکت در ساخت و احداث بنا

ماده ۱: طرفین قرارداد
طرف اول (مالک): {نام_مالک} به شماره ملی و نشانی مشخص.
طرف دوم (سازنده): {نام_سازنده} به شماره ملی و پروانه معتبر ساخت.

ماده ۲: موضوع قرارداد
احداث بنا و مشارکت در تجدید بنای پلاک ثبتی {پلاک_ثبتی} به مساحت عرصه {مساحت_عرصه} مترمربع منطبق بر دستور نقشه شهرداری.

ماده ۳: نسبت سهم‌الشرکه
سهم طرف اول معادل {سهم_الشرکه_مالک} درصد و سهم طرف دوم مابقی عرصه و اعیان احداثی خواهد بود.

ماده ۴: موعد تحویل و خسارت تاخیر
موعد قطعی تحویل پروژه تاریخ {تاریخ_تحویل} تعیین گردید. در صورت تاخیر روزانه مبلغ توافقی خسارت عدم انجام تعهد محاسبه خواهد شد.`,
  },
  {
    id: 'tmpl-2',
    category: 'دادخواست‌ها',
    title: 'دادخواست الزام به تنظیم سند رسمی انتقال ملک',
    description: 'نمونه دادخواست حقوقی بدوی با تقاضای دستور موقت منع نقل و انتقال و محکومیت خوانده به خسارت',
    variables: ['نام_خواهان', 'نام_خوانده', 'پلاک_ثبتی', 'شماره_مبایعه_نامه', 'نام_دفترخانه', 'مبلغ_باقیمانده'],
    content: `ریاست محترم دادگاه عمومی حقوقی
خواهان: {نام_خواهان}
خوانده: {نام_خوانده}
خواسته: الزام به حضور در دفتر اسناد رسمی شماره {نام_دفترخانه} و تنظیم سند رسمی انتقال شش‌دانگ پلاک ثبتی {پلاک_ثبتی} به انضمام کلیه خسارات دادرسی و دستور موقت.

شرح دادخواست:
احتراماً به استحضار می‌رساند اینجانب خواهان به موجب مبایعه‌نامه شماره {شماره_مبایعه_نامه} شش‌دانگ ملک موصوف را خریداری نموده و بخش اعظم ثمن تادیه گردیده است. خوانده محترم علیرغم ابلاغ اظهارنامه و حلول موعد تعهد از حضور در دفترخانه استنکاف ورزیده‌اند. لذا مستنداً به مواد ۱۰، ۲۱۹ و ۲۲۰ قانون مدنی صدور حکم به محکومیت خوانده مورد استدعاست.`,
  },
  {
    id: 'tmpl-3',
    category: 'لوایح',
    title: 'لایحه دفاعیه در قبال ادعای غبن فاحش در معامله',
    description: 'لایحه تخصصی مستند به اسقاط کافه خیارات و عرف بازار املاک در رد ادعای فسخ',
    variables: ['نام_موکل', 'شماره_قرارداد', 'تاریخ_معامله', 'دادنامه_مربوطه'],
    content: `ریاست و مستشاران محترم دادگاه تجدیدنظر استان
موضوع: لایحه دفاعیه در پرونده کلاسه {دادنامه_مربوطه}
موکل: {نام_موکل}

با سلام و تحیات وافره،
در خصوص ادعای تجدیدنظرخواه مبنی بر غبن افحش در بیع مورخ {تاریخ_معامله} مستند به مبایعه‌نامه {شماره_قرارداد}، به استحضار عالی می‌رساند:
۱. در بند ۷ قرارداد صراحتاً «اسقاط کافه خیارات ولو خیار غبن فاحش و افحش» درج و به امضای طرفین رسیده است.
۲. ادعای نوسان نامتعارف قیمت با فاصله زمانی چند ماهه پس از وقوع عقد بر اساس ماده ۴۱۶ قانون مدنی مسموع نبوده و مقتضای ذات عقد لازم می‌باشد. صدور حکم بر تایید دادنامه بدوی مورد تقاضاست.`,
  },
  {
    id: 'tmpl-4',
    category: 'اظهارنامه‌ها',
    title: 'اظهارنامه رسمی مطالبه وجه سفته و خسارت تاخیر تادیه',
    description: 'اظهارنامه ارسالی از طریق دفاتر خدمات الکترونیک قضایی پیش از طرح دعوا برای آغاز مبدا خسارت',
    variables: ['نام_مخاطب', 'شماره_سفته', 'مبلغ_سفته', 'تاریخ_سررسید'],
    content: `مخاطب محترم: {نام_مخاطب}
موضوع: اخطار قانونی تادیه وجه سفته به شماره {شماره_سفته}

احتراماً وفق ماده ۱۵۶ قانون آیین دادرسی مدنی به شما اخطار می‌گردد:
جناب‌عالی متعهد به پرداخت وجه سفته شماره {شماره_سفته} به مبلغ {مبلغ_سفته} ریال در تاریخ سررسید {تاریخ_سررسید} بوده‌اید. از آنجا که تاکنون اقدامی جهت تصفیه دیون معمول نداشته‌اید، بدینوسیله مهلت ۴۸ ساعته جهت پرداخت تعیین می‌گردد. در غیر اینصورت پرونده جهت مطالبه اصل و خسارت تاخیر تادیه ماده ۵۲۲ ق.آ.د.م از طریق مراجع قضایی پیگیری خواهد شد.`,
  },
];

export const LegalAutomationLibrary: React.FC<{
  onBackToHome?: () => void;
  onOpenBooking?: () => void;
}> = ({ onBackToHome, onOpenBooking }) => {
  const [activeTab, setActiveTab] = useState<AutomationTabKey>('workflow');

  // Kanban State
  const [workflowItems, setWorkflowItems] = useState<ContentItem[]>(INITIAL_WORKFLOW_ITEMS);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('دعاوی ملکی');
  const [selectedWorkflowItem, setSelectedWorkflowItem] = useState<ContentItem | null>(null);

  // Document Library State
  const [selectedDocId, setSelectedDocId] = useState<string>(DOC_TEMPLATES[0].id);
  const [docFilterCategory, setDocFilterCategory] = useState<string>('همه');
  const [docFormValues, setDocFormValues] = useState<Record<string, string>>({
    نام_مالک: 'حاج محمدتقی رضوی',
    نام_سازنده: 'مهندس حسام سجادی',
    پلاک_ثبتی: '۱۲۸/۴۵۶۷ بخش ۱۱ تهران',
    مساحت_عرصه: '۴۲۰',
    سهم_الشرکه_مالک: '۵۵',
    تاریخ_تحویل: '۱۴۰۴/۱۱/۳۰',
    نام_خواهان: 'دکتر مریم شمس',
    نام_خوانده: 'شرکت سرمایه‌گذاری سپهر',
    شماره_مبایعه_نامه: '۹۹۲۱۴-الف',
    نام_دفترخانه: '۱۱۴ تهران',
    شماره_سفته: '۸۸۴۱۲۰',
    مبلغ_سفته: '۵۰۰,۰۰۰,۰۰۰ تومان',
    تاریخ_سررسید: '۱۴۰۳/۰۶/۱۵',
  });
  const [isCopiedDoc, setIsCopiedDoc] = useState(false);

  // NPS & Survey State
  const [surveyType, setSurveyType] = useState<'nps' | 'csat'>('nps');
  const [npsScore, setNpsScore] = useState<number>(9);
  const [csatScore, setCsatScore] = useState<number>(5);
  const [feedbackText, setFeedbackText] = useState('');
  const [surveySubmitted, setSurveySubmitted] = useState(false);

  // Referral System State
  const [referralCode] = useState('SEDRAZAVI-VIP-789');
  const [copiedRef, setCopiedRef] = useState(false);

  // Legal Calculators State
  const [calcType, setCalcType] = useState<'delay_damages' | 'court_fees' | 'lawyer_tax'>('delay_damages');
  const [delayDebt, setDelayDebt] = useState<number>(100000000);
  const [delayYearStart, setDelayYearStart] = useState<number>(1398);
  const [delayYearEnd, setDelayYearEnd] = useState<number>(1403);
  const [claimFeeAmount, setClaimFeeAmount] = useState<number>(500000000);
  const [litigationStage, setLitigationStage] = useState<'badvi' | 'tajdid' | 'farjam'>('badvi');
  const [lawyerFeeAgreed, setLawyerFeeAgreed] = useState<number>(60000000);

  const CBI_INDICES: Record<number, number> = {
    1395: 104.2,
    1396: 114.2,
    1397: 154.5,
    1398: 218.4,
    1399: 310.2,
    1400: 442.8,
    1401: 651.9,
    1402: 985.4,
    1403: 1390.0,
  };

  const delayDamagesResult = useMemo(() => {
    const startIdx = CBI_INDICES[delayYearStart] || 218.4;
    const endIdx = CBI_INDICES[delayYearEnd] || 1390.0;
    const updatedDebt = Math.round(delayDebt * (endIdx / startIdx));
    const damageAmount = Math.max(0, updatedDebt - delayDebt);
    return {
      updatedDebt,
      damageAmount,
      multiplier: (endIdx / startIdx).toFixed(2),
    };
  }, [delayDebt, delayYearStart, delayYearEnd]);

  const courtFeeResult = useMemo(() => {
    let fee = 0;
    if (litigationStage === 'badvi') {
      const firstTier = Math.min(claimFeeAmount, 20000000);
      const remaining = Math.max(0, claimFeeAmount - 20000000);
      fee = (firstTier * 0.025) + (remaining * 0.035);
    } else if (litigationStage === 'tajdid') {
      fee = claimFeeAmount * 0.045;
    } else {
      fee = claimFeeAmount * 0.055;
    }
    return Math.round(fee);
  }, [claimFeeAmount, litigationStage]);

  const lawyerTaxResult = useMemo(() => {
    const taxStamp = Math.round(lawyerFeeAgreed * 0.05); // 5% Article 103
    const barCoop = Math.round(lawyerFeeAgreed * 0.01); // 1%
    const barSupport = Math.round(lawyerFeeAgreed * 0.01); // 1%
    return {
      taxStamp,
      barCoop,
      barSupport,
      totalDeductions: taxStamp + barCoop + barSupport,
    };
  }, [lawyerFeeAgreed]);

  // Quick action to advance workflow card
  const handleMoveCard = (id: string, newStatus: ContentItem['status']) => {
    setWorkflowItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );
  };

  const handleAddWorkflowItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    const newItem: ContentItem = {
      id: `wf-${Date.now()}`,
      title: newTitle,
      category: newCategory,
      author: 'دکتر سیده مریم رضوی',
      status: 'idea',
      date: '۱۴۰۳/۰۷/۰۱',
      priority: 'عادی',
    };
    setWorkflowItems([newItem, ...workflowItems]);
    setNewTitle('');
  };

  // Replace document variables
  const activeTemplate = DOC_TEMPLATES.find((t) => t.id === selectedDocId) || DOC_TEMPLATES[0];
  const renderedDocContent = useMemo(() => {
    let text = activeTemplate.content;
    Object.entries(docFormValues).forEach(([key, val]) => {
      text = text.split(`{${key}}`).join(String(val || `[${key}]`));
    });
    return text;
  }, [activeTemplate, docFormValues]);

  const handleCopyDoc = () => {
    navigator.clipboard?.writeText(renderedDocContent);
    setIsCopiedDoc(true);
    setTimeout(() => setIsCopiedDoc(false), 2000);
  };

  const handleCopyRef = () => {
    navigator.clipboard?.writeText(`https://sedrazavi.com/?ref=${referralCode}`);
    setCopiedRef(true);
    setTimeout(() => setCopiedRef(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#F4F6F9] dark:bg-[#070D1E] py-8 sm:py-12 text-[#0B132B] dark:text-gray-100 font-sans">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl space-y-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#0B132B] via-[#1C2541] to-[#0B132B] text-white shadow-xl border border-[#D4AF37]/30">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40 text-xs font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                اتوماسیون اداری و مخزن اسناد حقوقی (Part 14)
              </span>
              <span className="text-xs text-gray-400">ورژن تخصصی ۲.۶</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black font-serif text-white">
              میز اتوماسیون گردش‌کار، کتابخانه لوایح و سیستم‌های هوشمند وکالت
            </h1>
            <p className="text-xs sm:text-sm text-gray-300 max-w-2xl leading-relaxed">
              مدیریت کانبان مقالات، کتابخانه قراردادهای استاندارد با متغیرهای پویا، سنجش رضایت موکلین (NPS)، همگام‌سازی تقویم‌های رسمی و بازاریابی ارجاعی.
            </p>
          </div>

          {onBackToHome && (
            <button
              onClick={onBackToHome}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all border border-white/20 shrink-0 self-start md:self-auto"
            >
              بازگشت به پیشخوان اصلی
            </button>
          )}
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-gray-200 dark:border-gray-800">
          <button
            onClick={() => setActiveTab('workflow')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all shrink-0 ${
              activeTab === 'workflow'
                ? 'bg-[#D4AF37] text-[#0B132B] shadow-md'
                : 'bg-white dark:bg-[#0B132B] text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-800 hover:text-[#D4AF37]'
            }`}
          >
            <Kanban className="w-4 h-4" />
            <span>گردش‌کار و کانبان محتوا</span>
          </button>

          <button
            onClick={() => setActiveTab('documents')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all shrink-0 ${
              activeTab === 'documents'
                ? 'bg-[#D4AF37] text-[#0B132B] shadow-md'
                : 'bg-white dark:bg-[#0B132B] text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-800 hover:text-[#D4AF37]'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>کتابخانه اسناد و لوایح آماده</span>
          </button>

          <button
            onClick={() => setActiveTab('surveys')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all shrink-0 ${
              activeTab === 'surveys'
                ? 'bg-[#D4AF37] text-[#0B132B] shadow-md'
                : 'bg-white dark:bg-[#0B132B] text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-800 hover:text-[#D4AF37]'
            }`}
          >
            <Smile className="w-4 h-4" />
            <span>شاخص رضایت و NPS موکلان</span>
          </button>

          <button
            onClick={() => setActiveTab('calendars')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all shrink-0 ${
              activeTab === 'calendars'
                ? 'bg-[#D4AF37] text-[#0B132B] shadow-md'
                : 'bg-white dark:bg-[#0B132B] text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-800 hover:text-[#D4AF37]'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>همگام‌سازی تقویم (Google / Apple)</span>
          </button>

          <button
            onClick={() => setActiveTab('calculators')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all shrink-0 ${
              activeTab === 'calculators'
                ? 'bg-[#D4AF37] text-[#0B132B] shadow-md'
                : 'bg-white dark:bg-[#0B132B] text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-800 hover:text-[#D4AF37]'
            }`}
          >
            <Calculator className="w-4 h-4" />
            <span>ماشین‌حساب‌های هوشمند حقوقی</span>
          </button>

          <button
            onClick={() => setActiveTab('referrals')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all shrink-0 ${
              activeTab === 'referrals'
                ? 'bg-[#D4AF37] text-[#0B132B] shadow-md'
                : 'bg-white dark:bg-[#0B132B] text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-800 hover:text-[#D4AF37]'
            }`}
          >
            <Gift className="w-4 h-4" />
            <span>باشگاه مشتریان و رفرال</span>
          </button>

          <button
            onClick={() => setActiveTab('newsletter')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all shrink-0 ${
              activeTab === 'newsletter'
                ? 'bg-[#D4AF37] text-[#0B132B] shadow-md'
                : 'bg-white dark:bg-[#0B132B] text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-800 hover:text-[#D4AF37]'
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>اتوماسیون ایمیل و پیگیری‌ها</span>
          </button>
        </div>

        {/* TAB 1: KANBAN WORKFLOW */}
        {activeTab === 'workflow' && (
          <div className="space-y-6">
            {/* Quick Add Form */}
            <form
              onSubmit={handleAddWorkflowItem}
              className="p-4 rounded-2xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-sm flex flex-wrap items-center gap-3"
            >
              <div className="flex-1 min-w-[240px]">
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="ایده یا عنوان مقاله جدید را بنویسید..."
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 text-xs focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="px-3 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 text-xs text-gray-600 dark:text-gray-300"
              >
                <option value="دعاوی ملکی">دعاوی ملکی</option>
                <option value="قراردادها">قراردادها</option>
                <option value="حقوق کیفری">حقوق کیفری</option>
                <option value="داوری تجاری">داوری تجاری</option>
                <option value="حقوق خانواده">حقوق خانواده</option>
              </select>
              <button
                type="submit"
                className="px-4 py-2.5 rounded-xl bg-[#D4AF37] text-[#0B132B] text-xs font-bold hover:bg-[#c29f2e] transition-colors flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>ثبت در بورد ایده</span>
              </button>
            </form>

            {/* Kanban Columns */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 overflow-x-auto pb-4">
              {[
                { key: 'idea', title: 'ایده‌ها', color: 'border-gray-300 dark:border-gray-700' },
                { key: 'draft', title: 'در حال نگارش', color: 'border-blue-400' },
                { key: 'review', title: 'صف بازبینی', color: 'border-amber-400' },
                { key: 'approved', title: 'تایید نهایی', color: 'border-emerald-400' },
                { key: 'scheduled', title: 'زمان‌بندی‌شده', color: 'border-purple-400' },
                { key: 'published', title: 'منتشرشده', color: 'border-[#D4AF37]' },
              ].map((col) => {
                const itemsInCol = workflowItems.filter((item) => item.status === col.key);
                return (
                  <div
                    key={col.key}
                    className={`rounded-2xl p-3 bg-white dark:bg-[#0B132B] border-t-4 ${col.color} border-x border-b border-gray-200 dark:border-gray-800 shadow-sm flex flex-col min-h-[420px]`}
                  >
                    <div className="flex items-center justify-between pb-3 mb-2 border-b border-gray-100 dark:border-gray-800">
                      <span className="font-bold text-xs text-[#0B132B] dark:text-white font-serif">
                        {col.title}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-[10px] font-bold text-gray-500">
                        {itemsInCol.length}
                      </span>
                    </div>

                    <div className="space-y-3 flex-1 overflow-y-auto max-h-[500px] scrollbar-thin">
                      {itemsInCol.map((item) => (
                        <div
                          key={item.id}
                          className="p-3 rounded-xl bg-gray-50 dark:bg-[#111c38] border border-gray-200/80 dark:border-gray-800 text-xs space-y-2 hover:border-[#D4AF37] transition-all shadow-xs"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold text-[#AA820A] dark:text-[#D4AF37]">
                              {item.category}
                            </span>
                            <span
                              className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                                item.priority === 'فوری'
                                  ? 'bg-rose-500/15 text-rose-600'
                                  : item.priority === 'مهم'
                                  ? 'bg-amber-500/15 text-amber-600'
                                  : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                              }`}
                            >
                              {item.priority}
                            </span>
                          </div>

                          <h4 className="font-semibold text-gray-800 dark:text-gray-100 leading-snug line-clamp-2">
                            {item.title}
                          </h4>

                          <div className="text-[10px] text-gray-400 flex items-center justify-between pt-1">
                            <span>{item.date}</span>
                            {item.views && <span>{item.views} بازدید</span>}
                          </div>

                          {/* Move action buttons */}
                          <div className="pt-2 border-t border-gray-200/50 dark:border-gray-700/50 flex items-center justify-between gap-1">
                            {col.key !== 'idea' && (
                              <button
                                onClick={() => {
                                  const statuses: ContentItem['status'][] = [
                                    'idea',
                                    'draft',
                                    'review',
                                    'approved',
                                    'scheduled',
                                    'published',
                                  ];
                                  const currIdx = statuses.indexOf(item.status);
                                  if (currIdx > 0) handleMoveCard(item.id, statuses[currIdx - 1]);
                                }}
                                className="px-1.5 py-0.5 rounded text-[9px] text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700"
                                title="مرحله قبل"
                              >
                                ← قبلی
                              </button>
                            )}

                            {col.key !== 'published' && (
                              <button
                                onClick={() => {
                                  const statuses: ContentItem['status'][] = [
                                    'idea',
                                    'draft',
                                    'review',
                                    'approved',
                                    'scheduled',
                                    'published',
                                  ];
                                  const currIdx = statuses.indexOf(item.status);
                                  if (currIdx < statuses.length - 1)
                                    handleMoveCard(item.id, statuses[currIdx + 1]);
                                }}
                                className="px-1.5 py-0.5 rounded text-[9px] bg-[#D4AF37]/20 text-[#AA820A] dark:text-[#D4AF37] font-bold hover:bg-[#D4AF37] hover:text-[#0B132B] transition-colors mr-auto"
                                title="مرحله بعد"
                              >
                                بعدی →
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: LEGAL DOCUMENT LIBRARY */}
        {activeTab === 'documents' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left/Sidebar: Templates List */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-4 rounded-2xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 flex items-center gap-2">
                <Search className="w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="جستجو در قراردادها و لوایح..."
                  className="w-full bg-transparent text-xs focus:outline-none"
                />
              </div>

              <div className="space-y-3">
                {DOC_TEMPLATES.map((tmpl) => (
                  <div
                    key={tmpl.id}
                    onClick={() => setSelectedDocId(tmpl.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                      selectedDocId === tmpl.id
                        ? 'bg-amber-500/10 dark:bg-[#D4AF37]/10 border-[#D4AF37] shadow-md ring-1 ring-[#D4AF37]'
                        : 'bg-white dark:bg-[#0B132B] border-gray-200 dark:border-gray-800 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded-full bg-[#D4AF37]/20 text-[#AA820A] dark:text-[#D4AF37] text-[10px] font-bold">
                        {tmpl.category}
                      </span>
                      <span className="text-[10px] text-gray-400">
                        {tmpl.variables.length} فیلد متغیر
                      </span>
                    </div>
                    <h3 className="font-bold text-sm text-[#0B132B] dark:text-white font-serif">
                      {tmpl.title}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                      {tmpl.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Live Dynamic Variables & Preview */}
            <div className="lg:col-span-7 space-y-6">
              {/* Variable Inputs */}
              <div className="p-6 rounded-3xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
                  <h4 className="font-bold text-sm text-[#0B132B] dark:text-white flex items-center gap-2">
                    <Edit3 className="w-4 h-4 text-[#D4AF37]" />
                    <span>تکمیل فیلدهای متغیر قالب</span>
                  </h4>
                  <span className="text-xs text-gray-400">جایگزینی خودکار در متن لایحه</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeTemplate.variables.map((varName) => (
                    <div key={varName} className="space-y-1">
                      <label className="text-[11px] font-bold text-gray-600 dark:text-gray-400">
                        {varName.replace(/_/g, ' ')}:
                      </label>
                      <input
                        type="text"
                        value={docFormValues[varName] || ''}
                        onChange={(e) =>
                          setDocFormValues({ ...docFormValues, [varName]: e.target.value })
                        }
                        placeholder={`مقدار ${varName.replace(/_/g, ' ')}`}
                        className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 text-xs focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Rendered Output with Copy / Print */}
              <div className="p-6 rounded-3xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
                  <h4 className="font-bold text-sm text-[#0B132B] dark:text-white">
                    پیش‌نمایش سند آماده چاپ و امضا
                  </h4>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCopyDoc}
                      className="px-3 py-1.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 text-xs font-bold hover:bg-gray-200 flex items-center gap-1.5 transition-colors"
                    >
                      {isCopiedDoc ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                          <span>کپی شد!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>کپی متن</span>
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => window.print()}
                      className="px-3 py-1.5 rounded-xl bg-[#D4AF37] text-[#0B132B] text-xs font-bold hover:bg-[#c29f2e] flex items-center gap-1.5 transition-colors"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>چاپ رسمی (A4)</span>
                    </button>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200/70 dark:border-gray-800 font-serif text-xs sm:text-sm leading-relaxed whitespace-pre-line text-gray-800 dark:text-gray-200 select-all min-h-[220px]">
                  {renderedDocContent}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: NPS & SURVEYS */}
        {activeTab === 'surveys' && (
          <div className="max-w-4xl mx-auto space-y-8">
            {/* NPS Metrics Header */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-6 rounded-3xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-sm text-center space-y-1">
                <div className="text-3xl font-black text-emerald-500 font-serif">+۷۶</div>
                <div className="text-xs font-bold text-[#0B132B] dark:text-white">
                  شاخص خالص ترویج (NPS)
                </div>
                <div className="text-[11px] text-gray-400">سطح ممتاز کشوری (توصیه توسط ۸۲٪ موکلین)</div>
              </div>

              <div className="p-6 rounded-3xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-sm text-center space-y-1">
                <div className="text-3xl font-black text-[#D4AF37] font-serif">۴.۹ / ۵</div>
                <div className="text-xs font-bold text-[#0B132B] dark:text-white">
                  میانگین رضایت‌مندی (CSAT)
                </div>
                <div className="text-[11px] text-gray-400">بر اساس ۴۲۰ نظرسنجی تاییدشده</div>
              </div>

              <div className="p-6 rounded-3xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-sm text-center space-y-1">
                <div className="text-3xl font-black text-blue-500 font-serif">۹۸.۴٪</div>
                <div className="text-xs font-bold text-[#0B132B] dark:text-white">
                  پاسخگویی به انتقادات
                </div>
                <div className="text-[11px] text-gray-400">تماس وکیل سرپرست ظرف کمتر از ۳ ساعت</div>
              </div>
            </div>

            {/* Interactive Survey Simulation */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-xl space-y-6">
              <div className="space-y-1">
                <h3 className="text-lg font-bold font-serif text-[#0B132B] dark:text-white">
                  ثبت بازخورد و ارزیابی کیفیت وکالت
                </h3>
                <p className="text-xs text-gray-500">
                  دیدگاه شما مستقیماً توسط دکتر سیده مریم رضوی بررسی می‌شود.
                </p>
              </div>

              {/* NPS Score Selector (0 to 10) */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
                  چقدر احتمال دارد دفتر وکالت ما را به همکاران یا آشنایان خود پیشنهاد دهید؟ (۰ تا ۱۰)
                </label>
                <div className="grid grid-cols-11 gap-1 sm:gap-2">
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setNpsScore(num)}
                      className={`h-11 rounded-xl text-xs font-bold transition-all ${
                        npsScore === num
                          ? 'bg-[#D4AF37] text-[#0B132B] shadow-md scale-105'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
                <div className="flex justify-between text-[10px] text-gray-400 pt-1">
                  <span>اصلاً پیشنهاد نمی‌کنم (ناراضی)</span>
                  <span>قطعاً پیشنهاد می‌کنم (بسیار راضی)</span>
                </div>
              </div>

              {/* CSAT Star Rating */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
                  میزان رضایت شما از تسلط حقوقی، رازداری و پیگیری مواعد دادگاه:
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setCsatScore(star)}
                      className={`text-2xl transition-transform hover:scale-125 ${
                        star <= csatScore ? 'text-[#D4AF37]' : 'text-gray-300 dark:text-gray-700'
                      }`}
                    >
                      ★
                    </button>
                  ))}
                  <span className="text-xs font-bold text-[#AA820A] dark:text-[#D4AF37] mr-2">
                    {csatScore === 5
                      ? 'بسیار عالی و حرفه‌ای'
                      : csatScore === 4
                      ? 'خوب'
                      : csatScore === 3
                      ? 'متوسط'
                      : 'نیازمند بهبود'}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
                  توضیحات و نظرات ارزشمند شما:
                </label>
                <textarea
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  rows={3}
                  placeholder="پیشنهادها یا نکات پرونده خود را بنویسید..."
                  className="w-full p-3 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 text-xs focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <button
                type="button"
                onClick={() => {
                  setSurveySubmitted(true);
                  setTimeout(() => setSurveySubmitted(false), 3000);
                }}
                className="w-full py-3 rounded-xl bg-[#D4AF37] text-[#0B132B] font-bold text-xs shadow-md hover:bg-[#c29f2e] transition-all flex items-center justify-center gap-2"
              >
                {surveySubmitted ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-800" />
                    <span>بازخورد شما با موفقیت در سامانه ممیزی ثبت شد. سپاسگزاریم!</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>ارسال نهایی نظرسنجی و ارزیابی عملکرد وکیل</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* TAB 4: CALENDARS SYNC */}
        {activeTab === 'calendars' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-sm space-y-6">
              <div className="space-y-1">
                <h3 className="text-lg font-bold font-serif text-[#0B132B] dark:text-white">
                  یکپارچگی و همگام‌سازی اوقات دادرسی و نوبت‌های مشاوره
                </h3>
                <p className="text-xs text-gray-500">
                  اتصال خودکار به تقویم‌های شخصی جهت دریافت آلارم جلسات دادگاه و مهلت‌های اعتراض به رای
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                {/* Google Calendar */}
                <div className="p-5 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/40 space-y-3 text-center">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center mx-auto text-xl font-bold">
                    📅
                  </div>
                  <h4 className="font-bold text-xs text-[#0B132B] dark:text-white">Google Calendar</h4>
                  <p className="text-[11px] text-gray-500">همگام‌سازی ابری با اکانت جیمیل</p>
                  <button
                    onClick={() => alert('اتصال با OAuth2 Google Calendar با موفقیت شبیه‌سازی شد.')}
                    className="w-full py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-colors"
                  >
                    اتصال به گوگل
                  </button>
                </div>

                {/* Apple Calendar */}
                <div className="p-5 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/40 space-y-3 text-center">
                  <div className="w-12 h-12 rounded-xl bg-gray-500/10 text-gray-700 dark:text-gray-300 flex items-center justify-center mx-auto text-xl font-bold">
                    🍏
                  </div>
                  <h4 className="font-bold text-xs text-[#0B132B] dark:text-white">Apple Calendar / iCal</h4>
                  <p className="text-[11px] text-gray-500">اشتراک فایل تقویم webcal استاندارد</p>
                  <button
                    onClick={() => alert('لینک وب‌کل تقویم کپی گردید: webcal://sedrazavi.com/ical/feed')}
                    className="w-full py-2 rounded-xl bg-gray-800 text-white text-xs font-bold hover:bg-gray-900 transition-colors"
                  >
                    دریافت لینک iCal
                  </button>
                </div>

                {/* Outlook */}
                <div className="p-5 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/40 space-y-3 text-center">
                  <div className="w-12 h-12 rounded-xl bg-sky-500/10 text-sky-500 flex items-center justify-center mx-auto text-xl font-bold">
                    📫
                  </div>
                  <h4 className="font-bold text-xs text-[#0B132B] dark:text-white">Microsoft Outlook</h4>
                  <p className="text-[11px] text-gray-500">همگام با اتوماسیون اداری شرکت‌ها</p>
                  <button
                    onClick={() => alert('همگام‌سازی با پورتال مایکروسافت ۳۶۵ تایید شد.')}
                    className="w-full py-2 rounded-xl bg-sky-600 text-white text-xs font-bold hover:bg-sky-700 transition-colors"
                  >
                    اتصال به Outlook
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4.5: LEGAL CALCULATORS */}
        {activeTab === 'calculators' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-xl space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-gray-100 dark:border-gray-800">
                <div className="space-y-1">
                  <h3 className="text-lg font-bold font-serif text-[#0B132B] dark:text-white">
                    ماشین‌حساب‌های رسمی و هوشمند دادرسی و وکالت
                  </h3>
                  <p className="text-xs text-gray-500">
                    محاسبه آنلاین خسارت تاخیر تادیه (ماده ۵۲۲)، هزینه دادرسی دعاوی مالی و تمبر مالیاتی وکلا
                  </p>
                </div>

                <div className="flex items-center gap-1.5 bg-gray-100 dark:bg-gray-800/80 p-1 rounded-xl shrink-0">
                  <button
                    onClick={() => setCalcType('delay_damages')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      calcType === 'delay_damages'
                        ? 'bg-[#D4AF37] text-[#0B132B]'
                        : 'text-gray-600 dark:text-gray-300'
                    }`}
                  >
                    تاخیر تادیه
                  </button>
                  <button
                    onClick={() => setCalcType('court_fees')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      calcType === 'court_fees'
                        ? 'bg-[#D4AF37] text-[#0B132B]'
                        : 'text-gray-600 dark:text-gray-300'
                    }`}
                  >
                    هزینه دادرسی
                  </button>
                  <button
                    onClick={() => setCalcType('lawyer_tax')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      calcType === 'lawyer_tax'
                        ? 'bg-[#D4AF37] text-[#0B132B]'
                        : 'text-gray-600 dark:text-gray-300'
                    }`}
                  >
                    تمبر مالیاتی وکالت
                  </button>
                </div>
              </div>

              {/* 1. DELAY DAMAGES CALCULATOR */}
              {calcType === 'delay_damages' && (
                <div className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
                        مبلغ اصل دین (تومان):
                      </label>
                      <input
                        type="number"
                        value={delayDebt}
                        onChange={(e) => setDelayDebt(Number(e.target.value) || 0)}
                        className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 text-xs font-mono"
                      />
                      <span className="text-[11px] text-gray-400">
                        {(delayDebt / 1000000).toLocaleString('fa-IR')} میلیون تومان
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
                        سال سررسید دین:
                      </label>
                      <select
                        value={delayYearStart}
                        onChange={(e) => setDelayYearStart(Number(e.target.value))}
                        className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 text-xs"
                      >
                        {[1395, 1396, 1397, 1398, 1399, 1400, 1401, 1402].map((y) => (
                          <option key={y} value={y}>سال {y}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
                        سال وصول / مطالبه:
                      </label>
                      <select
                        value={delayYearEnd}
                        onChange={(e) => setDelayYearEnd(Number(e.target.value))}
                        className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 text-xs"
                      >
                        {[1399, 1400, 1401, 1402, 1403].map((y) => (
                          <option key={y} value={y}>سال {y}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-500/10 via-[#D4AF37]/15 to-amber-500/10 border border-[#D4AF37]/40 text-center space-y-2">
                    <div className="text-xs text-gray-500">جمع کل قابل مطالبه (اصل + خسارت تاخیر تادیه):</div>
                    <div className="text-3xl font-black text-[#AA820A] dark:text-[#D4AF37] font-serif">
                      {delayDamagesResult.updatedDebt.toLocaleString('fa-IR')} تومان
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-300 flex items-center justify-center gap-4 pt-1">
                      <span>خسارت کاهش ارزش پول: <strong>{delayDamagesResult.damageAmount.toLocaleString('fa-IR')} تومان</strong></span>
                      <span>ضریب تورمی: <strong>{delayDamagesResult.multiplier} برابر</strong></span>
                    </div>
                    <p className="text-[11px] text-gray-500 max-w-xl mx-auto pt-2 border-t border-[#D4AF37]/20">
                      مستند به ماده ۵۲۲ قانون آیین دادرسی دادگاه‌های عمومی و انقلاب در امور مدنی و استعلام از اداره آمار بانک مرکزی.
                    </p>
                  </div>
                </div>
              )}

              {/* 2. COURT FEES CALCULATOR */}
              {calcType === 'court_fees' && (
                <div className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
                        بهای خواسته / ارزش ریالی دعوا (تومان):
                      </label>
                      <input
                        type="number"
                        value={claimFeeAmount}
                        onChange={(e) => setClaimFeeAmount(Number(e.target.value) || 0)}
                        className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 text-xs font-mono"
                      />
                      <span className="text-[11px] text-gray-400">
                        {(claimFeeAmount / 1000000).toLocaleString('fa-IR')} میلیون تومان
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-700 dark:text-gray-300">مرحله دادرسی:</label>
                      <select
                        value={litigationStage}
                        onChange={(e: any) => setLitigationStage(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 text-xs"
                      >
                        <option value="badvi">مرحله بدوی نخستین (تا ۲۰ میلیون ۲.۵٪، مازاد ۳.۵٪)</option>
                        <option value="tajdid">مرحله واخواهی و تجدیدنظر استان (۴.۵٪)</option>
                        <option value="farjam">فرجام‌خواهی و اعاده دادرسی دیوان عالی (۵.۵٪)</option>
                      </select>
                    </div>
                  </div>

                  <div className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800 text-center space-y-2">
                    <div className="text-xs text-gray-500">هزینه دادرسی قابل پرداخت به خزانه قوه قضائیه:</div>
                    <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400 font-serif">
                      {courtFeeResult.toLocaleString('fa-IR')} تومان
                    </div>
                    <p className="text-[11px] text-gray-400 max-w-xl mx-auto pt-1">
                      بر اساس جدول تعرفه مصوب در قانون بودجه کل کشور و قانون وصول برخی از درآمدهای دولت.
                    </p>
                  </div>
                </div>
              )}

              {/* 3. LAWYER TAX & STAMP CALCULATOR */}
              {calcType === 'lawyer_tax' && (
                <div className="space-y-5">
                  <div className="max-w-md mx-auto space-y-1.5">
                    <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
                      مبلغ کل حق‌الوکاله توافقی در قرارداد الکترونیک (تومان):
                    </label>
                    <input
                      type="number"
                      value={lawyerFeeAgreed}
                      onChange={(e) => setLawyerFeeAgreed(Number(e.target.value) || 0)}
                      className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 text-xs font-mono"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-700 text-center">
                      <div className="text-xs text-gray-500">تمبر مالیاتی علی‌الحساب (۵٪)</div>
                      <div className="text-lg font-black text-[#0B132B] dark:text-white mt-1">
                        {lawyerTaxResult.taxStamp.toLocaleString('fa-IR')} تومان
                      </div>
                      <div className="text-[10px] text-gray-400 mt-0.5">ماده ۱۰۳ قانون مالیات مستقیم</div>
                    </div>

                    <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-700 text-center">
                      <div className="text-xs text-gray-500">سهم صندوق تعاون کانون (۱٪)</div>
                      <div className="text-lg font-black text-[#0B132B] dark:text-white mt-1">
                        {lawyerTaxResult.barCoop.toLocaleString('fa-IR')} تومان
                      </div>
                      <div className="text-[10px] text-gray-400 mt-0.5">سهم کانون وکلای دادگستری</div>
                    </div>

                    <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-700 text-center">
                      <div className="text-xs text-gray-500">سهم صندوق حمایت وکلا (۱٪)</div>
                      <div className="text-lg font-black text-[#0B132B] dark:text-white mt-1">
                        {lawyerTaxResult.barSupport.toLocaleString('fa-IR')} تومان
                      </div>
                      <div className="text-[10px] text-gray-400 mt-0.5">صندوق بازنشستگی وکالت</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 5: REFERRALS */}
        {activeTab === 'referrals' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-xl space-y-6">
              <div className="space-y-1">
                <h3 className="text-lg font-bold font-serif text-[#0B132B] dark:text-white">
                  باشگاه معرفین و تخفیف ۱۰٪ خدمات وکالت
                </h3>
                <p className="text-xs text-gray-500">
                  با معرفی اشخاص حقیقی یا حقوقی نیازمند وکیل، ۱۰٪ از مبلغ مشاوره به عنوان اعتبار کیف‌پول به شما تعلق می‌گیرد.
                </p>
              </div>

              {/* Referral Link Card */}
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-[#D4AF37]/30 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="space-y-1 text-right">
                  <span className="text-[11px] font-bold text-[#AA820A] dark:text-[#D4AF37]">
                    لینک اختصاصی شما:
                  </span>
                  <div className="font-mono text-xs font-bold text-[#0B132B] dark:text-white">
                    https://sedrazavi.com/?ref={referralCode}
                  </div>
                </div>
                <button
                  onClick={handleCopyRef}
                  className="px-4 py-2 rounded-xl bg-[#D4AF37] text-[#0B132B] text-xs font-bold hover:bg-[#c29f2e] transition-colors flex items-center gap-1.5 shrink-0"
                >
                  {copiedRef ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedRef ? 'لینک کپی شد' : 'کپی لینک معرف'}</span>
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-700 text-center">
                  <div className="text-xl font-black text-[#0B132B] dark:text-white">۱۴ نفر</div>
                  <div className="text-xs text-gray-500 mt-1">تعداد کل معرفی‌ها</div>
                </div>
                <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-700 text-center">
                  <div className="text-xl font-black text-emerald-500">۹ پرونده</div>
                  <div className="text-xs text-gray-500 mt-1">عقد قرارداد موفق</div>
                </div>
                <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-700 text-center">
                  <div className="text-xl font-black text-[#D4AF37]">۳,۵۰۰,۰۰۰ تومان</div>
                  <div className="text-xs text-gray-500 mt-1">اعتبار فعال کیف‌پول</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: NEWSLETTER AUTOMATION */}
        {activeTab === 'newsletter' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-xl space-y-6">
              <div className="space-y-1">
                <h3 className="text-lg font-bold font-serif text-[#0B132B] dark:text-white">
                  اتوماسیون ایمیلی و گردش‌کار اطلاع‌رسانی موکلین
                </h3>
                <p className="text-xs text-gray-500">
                  ارسال خودکار ایمیل‌های آموزشی، یادآوری جلسات دادگاه و پیگیری‌های حقوقی
                </p>
              </div>

              <div className="space-y-3">
                {[
                  {
                    title: '۱. توالی خوش‌آمدگویی (Welcome Sequence)',
                    desc: 'ارسال معرفی وکیل، راهنمای جلسات دادرسی و کاتالوگ خدمات بلافاصله پس از ثبت‌نام',
                    status: 'فعال',
                    count: '۱,۴۲۰ ارسال',
                  },
                  {
                    title: '۲. یادآوری نوبت مشاوره ۲۴ ساعت قبل',
                    desc: 'ارسال لوکیشن دفتر ونک، چک‌لیست مدارک الزامی و کد ورود به پارکینگ',
                    status: 'فعال',
                    count: '۸۹۰ ارسال',
                  },
                  {
                    title: '۳. نجات رزروهای ناتمام (Abandoned Consultation Rescue)',
                    desc: 'ارسال کد تخفیف ویژه و پیشنهاد ساعت‌های خالی به کاربرانی که فرم را نیمه‌کاره رها کردند',
                    status: 'فعال',
                    count: '۳۱۰ ارسال',
                  },
                  {
                    title: '۴. خبرنامه ماهانه تحلیل آرای وحدت رویه دیوان عالی',
                    desc: 'ارسال مقالات تخصصی اول هر ماه خورشیدی برای مدیران عامل و وکلا',
                    status: 'فعال',
                    count: '۴,۲۰۰ عضو',
                  },
                ].map((seq, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-800 flex items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <h4 className="font-bold text-xs text-[#0B132B] dark:text-white">{seq.title}</h4>
                      <p className="text-[11px] text-gray-500">{seq.desc}</p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-xs font-bold text-[#AA820A] dark:text-[#D4AF37]">
                        {seq.count}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 text-[10px] font-bold">
                        {seq.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
