import React, { useState } from 'react';
import {
  Code2,
  Zap,
  Shield,
  Smartphone,
  Video,
  Headphones,
  CheckCircle2,
  ChevronRight,
  ChevronDown,
  ArrowLeft,
  Sparkles,
  Layers,
  Search,
  ShoppingCart,
  Compass,
  Laptop,
  Check,
  Star,
  Clock,
  ExternalLink,
  MessageSquare,
  Send,
  HelpCircle,
  FileCode2,
  Sliders,
  Award,
  Globe,
  Filter,
} from 'lucide-react';

interface WordPressDesignerLandingProps {
  onOpenBookingModal?: () => void;
  onOpenQuickEdit?: () => void;
  onOpenGitHubSync?: () => void;
}

export const WordPressDesignerLanding: React.FC<WordPressDesignerLandingProps> = ({
  onOpenBookingModal,
  onOpenQuickEdit,
  onOpenGitHubSync,
}) => {
  // Active states
  const [portfolioFilter, setPortfolioFilter] = useState<'all' | 'corporate' | 'store' | 'landing'>('all');
  const [currency, setCurrency] = useState<'toman' | 'usd'>('toman');
  const [testimonialLang, setTestimonialLang] = useState<'fa' | 'en'>('fa');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');

  // Multi-step brief state
  const [briefStep, setBriefStep] = useState<number>(1);
  const [briefData, setBriefData] = useState({
    projectType: 'corporate',
    features: ['gutenberg', 'seo', 'blog'],
    budget: 'mid',
    timeline: 'normal',
    name: '',
    phone: '',
    brand: '',
    description: '',
  });
  const [briefSubmitted, setBriefSubmitted] = useState<boolean>(false);

  // Portfolio items
  const portfolioItems = [
    {
      id: 'p1',
      title: 'سامانه شرکتی هلدینگ توسعه فناوری آراز',
      category: 'corporate',
      catLabel: 'شرکتی',
      tech: ['گوتنبرگ', 'Tailwind', 'Schema.org'],
      challenge: 'کاهش لود از ۵ ثانیه به زیر ۱ ثانیه و حذف ۸ افزونه سنگین المنتوری',
      solution: 'طراحی سیستم طراحی اختصاصی با الگوهای بومی بلوک گوتنبرگ',
      metric: 'سرعت لود ۰.۸s | رتبه ۹۹ لایت‌هاوس',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=700&q=80',
    },
    {
      id: 'p2',
      title: 'فروشگاه تخصصی گجت‌های هوشمند تک‌نوا',
      category: 'store',
      catLabel: 'فروشگاهی',
      tech: ['ووکامرس', 'WoodMart Compatibility', 'ایجکس'],
      challenge: 'افت نرخ تبدیل در تسویه‌حساب و کندی جستجوی محصولات',
      solution: 'مینی‌کارت کشویی، جستجوی زنده ایجکس و تسویه حساب یک‌مرحله‌ای',
      metric: '+۱۴۰٪ افزایش فروش | -۶۰٪ نرخ پرش',
      image: 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=700&q=80',
    },
    {
      id: 'p3',
      title: 'لندینگ‌پیج رویداد ملی فین‌تک ایران',
      category: 'landing',
      catLabel: 'لندینگ‌پیج',
      tech: ['Gutenberg Single-Page', 'React Islands', 'اتوماسیون'],
      challenge: 'جذب بیش از ۵,۰۰۰ ثبت‌نام در ۴۸ ساعت با بالاترین پایداری سرور',
      solution: 'معماری استاتیک فوق سبک بدون بارگذاری دیتابیس در هر بازدید',
      metric: '۵,۲۰۰ ثبت‌نام موفق | ۱۰۰٪ آپتایم',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=700&q=80',
    },
    {
      id: 'p4',
      title: 'پرتال جامع کلینیک تخصصی دندان‌پزشکی دکتر رادمنش',
      category: 'corporate',
      catLabel: 'شرکتی / خدماتی',
      tech: ['گوتنبرگ', 'نوبت‌دهی آنلاین', 'پیامک OTP'],
      challenge: 'سیستم رزرو وقت آنلاین سازگار با گوشی موبایل و کارت ضمانت درمان',
      solution: 'طراحی بلوک‌های اختصاصی معاینه و فرم نوبت‌دهی ایجکس',
      metric: '+۲۲۰٪ رزرو آنلاین بدون تماس تلفنی',
      image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=700&q=80',
    },
    {
      id: 'p5',
      title: 'فروشگاه آنلاین مد و پوشاک ارگانیک لوتوس',
      category: 'store',
      catLabel: 'فروشگاهی',
      tech: ['ووکامرس', 'فیلتر متغیرها', 'درگاه شاپرک'],
      challenge: 'فیلتر سریع سایز و رنگ و سازگاری کامل با سبد خرید موبایل',
      solution: 'بهینه‌سازی لوپ‌های وودمارت و لایت‌باکس تصاویر محصول',
      metric: 'لود زیر ۱.۲s در اینترنت همراه',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=700&q=80',
    },
    {
      id: 'p6',
      title: 'لندینگ کمپین بلک‌فرایدی آکادمی مهارت‌های دیجیتال',
      category: 'landing',
      catLabel: 'لندینگ‌پیج',
      tech: ['گوتنبرگ', 'شمارش معکوس', 'پرداخت سریع'],
      challenge: 'تبدیل ترافیک تبلیغات اینستاگرام به پرداخت موفق دوره‌ها',
      solution: 'فرم پاپ‌آپ چندمرحله‌ای با ثبت شماره موبایل و کد تخفیف آنی',
      metric: 'نرخ تبدیل ۵.۲٪ کمپین',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=700&q=80',
    },
  ];

  const filteredPortfolio = portfolioFilter === 'all'
    ? portfolioItems
    : portfolioItems.filter(p => p.category === portfolioFilter);

  // FAQ Items
  const faqItems = [
    {
      q: 'چرا گوتنبرگ (Gutenberg-First) و نه المنتور؟',
      a: 'گوتنبرگ هسته رسمی و استاندارد وردپرس است. بدون نیاز به ده‌ها فایل CSS و JS سنگین اضافی، سرعت بارگذاری زیر ۱ ثانیه، امنیت فوق‌العاده بالا و سازگاری ابدی با آپدیت‌های وردپرس را تضمین می‌کند. البته در صورت نیاز به صفحات فرود خاص، سازگاری کامل با المنتور نیز لحاظ می‌شود.',
    },
    {
      q: 'زمان تحویل یک وب‌سایت چقدر است؟',
      a: 'لندینگ‌پیج‌های تک‌صفحه معمولاً بین ۵ تا ۷ روز کاری و وب‌سایت‌های شرکتی یا فروشگاهی بین ۱۰ تا ۱۸ روز کاری پس از تایید نهایی بریف و محتوا تحویل داده می‌شوند.',
    },
    {
      q: 'آیا هزینه‌ها شامل هاست و دامنه است؟',
      a: 'مشاوره انتخاب بهترین هاست پرسرعت ابری (مانند هاست‌های NVMe مخصوص وردپرس) و ثبت دامنه به صورت رایگان انجام می‌شود؛ هزینه خرید سرور و دامنه به دلیل مالکیت صددرصدی کارفرما، توسط خود شما پرداخت می‌گردد.',
    },
    {
      q: 'آیا سورس‌کد و مالکیت سایت تحویل داده می‌شود؟',
      a: 'بله، ۱۰۰٪ مالکیت سورس‌کد، قالب و دیتابیس بدون هیچ‌گونه قفل یا وابستگی به توسعه‌دهنده به شما منتقل می‌گردد. همچنین همراه پروژه، ویدیوی آموزشی کامل پنل کارفرما تحویل داده می‌شود.',
    },
    {
      q: 'پشتیبانی پس از تحویل شامل چه مواردی است؟',
      a: 'کلیه پلن‌ها شامل ۳ تا ۶ ماه پشتیبانی فنی رایگان برای رفع هرگونه خطا، به‌روزرسانی‌های امنیتی هسته و پاسخ به سوالات شما است.',
    },
    {
      q: 'آیا من به عنوان مالک سایت بدون دانش فنی می‌توانم محتوا را ویرایش کنم؟',
      a: 'دقیقاً! ما یک «پیشخوان ساده کارفرما» و «نوار ویرایشگر سریع دیداری» اختصاصی برای شما فراهم کرده‌ایم که تغییر متون، شماره‌ها، تصاویر و فایل‌های دانلودی به سادگی ارسال پیام در تلگرام است.',
    },
    {
      q: 'نحوه پرداخت و مراحل تسویه حساب چگونه است؟',
      a: 'پرداخت در ۳ مرحله انجام می‌شود: ۳۰٪ پیش‌پرداخت، ۴۰٪ پس از تایید طرح اولیه و دمو، و ۳۰٪ پس از تست نهایی، آموزش و تحویل کامل سورس‌کد.',
    },
    {
      q: 'سئوی وب‌سایت چگونه تضمین می‌شود؟',
      a: 'کلیه سایت‌ها از روز اول با معماری Semantic HTML5، سرعت سبز در Core Web Vitals، نشانی‌های بهینه‌شده، نقشه سایت خودکار و کدهای ساختاریافته Schema.org کدنویسی می‌شوند.',
    },
  ];

  // Pricing packages
  const pricingData = [
    {
      id: 'starter',
      name: 'پایه (Starter)',
      badge: 'لندینگ‌پیج سریع',
      priceToman: '۹,۵۰۰,۰۰۰',
      priceUsd: '۲۵۰',
      description: 'ایده‌آل برای معرفی خدمات تک‌صفحه، پزشکان، مشاوران و کمپین‌های تبلیغاتی',
      delivery: '۷ روز کاری',
      features: [
        'لندینگ‌پیج تک‌صفحه با معماری گوتنبرگ',
        'سرعت بارگذاری تضمینی زیر ۲ ثانیه',
        'طراحی Mobile-First و ۱۰۰٪ واکنش‌گرا',
        'فرم تماس و ثبت لید متصل به پیامک',
        'سئوی فنی و اتصال به سرچ کنسول',
        '۳ ماه پشتیبانی فنی رایگان',
      ],
      notIncluded: ['فروشگاه آنلاین', 'وبلاگ چنددسته‌ای'],
    },
    {
      id: 'business',
      name: 'حرفه‌ای (Business)',
      badge: 'پیشنهاد ویژه و پرطرفدار',
      isPopular: true,
      priceToman: '۱۸,۵۰۰,۰۰۰',
      priceUsd: '۴۸۰',
      description: 'مناسب برای شرکت‌ها، استارتاپ‌ها، دفاتر وکالت، مهندسی و برندهای معتبر',
      delivery: '۱۲ روز کاری',
      features: [
        'سایت شرکتی چندصفحه (تا ۷ صفحه اختصاصی)',
        'بخش کامل وبلاگ، مقالات و آموزش‌ها',
        'پنل اختصاصی و ساده کارفرما برای ویرایش آسان',
        'تایم‌لاین پروژه‌ها، گواهی‌ها و اعضای تیم',
        'پرفورمنس ۹۵+ در Core Web Vitals',
        'نشان‌های اعتماد و کدهای ساختاریافته Schema',
        '۶ ماه پشتیبانی فنی و امنیتی فعال',
        'آموزش ویدیویی مدیریت سایت',
      ],
      notIncluded: ['درگاه پرداخت ووکامرس'],
    },
    {
      id: 'store',
      name: 'فروشگاهی (WooCommerce)',
      badge: 'فروشگاه آنلاین کامل',
      priceToman: '۲۸,۰۰۰,۰۰۰',
      priceUsd: '۷۵۰',
      description: 'فروشگاه کامل ووکامرس با اتصال به درگاه بانکی شاپرک، انبارداری و ترب',
      delivery: '۱۸ روز کاری',
      features: [
        'فروشگاه آنلاین ووکامرس با سازگاری وودمارت',
        'مینی‌کارت کشویی و تسویه سریع تک‌مرحله‌ای',
        'فیلترهای ایجکس پیشرفته ویژگی‌ها (سایز، رنگ)',
        'اتصال به درگاه‌های بانکی مستقیم و واسط',
        'پنل پیامک برای اطلاع‌رسانی وضعیت سفارش به خریدار',
        'سیستم کد تخفیف و پیشنهاد شگفت‌انگیز',
        '۶ ماه پشتیبانی VIP و مانیتورینگ آپتایم',
        'آموزش جامع مدیریت محصولات و انبار',
      ],
      notIncluded: [],
    },
  ];

  return (
    <div className="bg-[#0B0F19] text-[#F3F4F6] min-h-screen font-sans selection:bg-[#6366F1] selection:text-white" dir="rtl">
      {/* SECTION 1: HERO SECTION */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#6366F1]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 left-10 w-80 h-80 bg-[#10B981]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-10">
            {/* Top pill badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1F2937]/90 border border-[#374151] text-xs sm:text-sm text-[#A5B4FC] mb-6 shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-[#10B981] animate-pulse" />
              <span>معماری نوین وب — Gutenberg-First WordPress Engine</span>
            </div>

            {/* Main Headline H1 */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight mb-6">
              طراحی سایت وردپرس با <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#818CF8] via-[#6366F1] to-[#C084FC]">گوتنبرگ</span>؛{' '}
              <br className="hidden sm:inline" />
              سریع، سبک و حرفه‌ای
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-xl text-[#9CA3AF] leading-relaxed mb-8 max-w-3xl mx-auto font-normal">
              بدون قالب‌های آماده سنگین و افزونه‌های اضافه؛ با تمرکز مستقیم بر{' '}
              <strong className="text-white font-semibold">سرعت بارگذاری زیر ۲ ثانیه</strong>،{' '}
              <strong className="text-white font-semibold">سئوی فنی روز اول</strong> و بالاترین نرخ تبدیل برای کارفرمایان ایرانی و بین‌المللی.
            </p>

            {/* Dual CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
              <button
                type="button"
                onClick={() => {
                  const formEl = document.getElementById('brief-form-section');
                  if (formEl) formEl.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#6366F1] to-[#4F46E5] text-white font-bold text-base shadow-lg shadow-[#6366F1]/30 hover:shadow-[#6366F1]/50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>مشاوره رایگان ۲۰ دقیقه‌ای</span>
                <ChevronRight className="w-5 h-5 rotate-180" />
              </button>

              <button
                type="button"
                onClick={() => {
                  const portEl = document.getElementById('portfolio-section');
                  if (portEl) portEl.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#1E293B]/80 hover:bg-[#1E293B] border border-[#334155] text-[#E2E8F0] font-semibold text-base transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>مشاهده نمونه‌کارها</span>
                <Laptop className="w-5 h-5 text-[#818CF8]" />
              </button>
            </div>

            {/* Trust Micro-Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-[#9CA3AF]">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#10B981]" /> تحویل ۷ تا ۱۲ روزه
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#10B981]" /> ۶ ماه پشتیبانی فنی رایگان
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#10B981]" /> ۱۰۰٪ سازگار با موبایل و تبلت
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#10B981]" /> تحویل کامل سورس‌کد به کارفرما
              </span>
            </div>
          </div>

          {/* Interactive Mockup Container */}
          <div className="max-w-5xl mx-auto mt-12 bg-[#111827] rounded-2xl border border-[#374151] p-3 sm:p-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#1F2937] pb-3 mb-4 px-2">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#EF4444]" />
                <span className="w-3 h-3 rounded-full bg-[#F59E0B]" />
                <span className="w-3 h-3 rounded-full bg-[#10B981]" />
                <span className="text-xs text-[#6B7280] font-mono mr-2 hidden sm:inline">preview.gutenberg-first.dev</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setPreviewDevice('desktop')}
                  className={`px-3 py-1 rounded text-xs font-medium cursor-pointer transition ${
                    previewDevice === 'desktop' ? 'bg-[#374151] text-white' : 'text-[#9CA3AF] hover:text-white'
                  }`}
                >
                  دسکتاپ
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewDevice('mobile')}
                  className={`px-3 py-1 rounded text-xs font-medium cursor-pointer transition ${
                    previewDevice === 'mobile' ? 'bg-[#374151] text-white' : 'text-[#9CA3AF] hover:text-white'
                  }`}
                >
                  موبایل
                </button>
              </div>
            </div>

            {/* Mockup screen content */}
            <div className={`transition-all mx-auto bg-[#0F172A] rounded-xl overflow-hidden border border-[#1E293B] ${
              previewDevice === 'mobile' ? 'max-w-xs p-4' : 'w-full p-6 sm:p-8'
            }`}>
              <div className="flex items-center justify-between border-b border-[#334155]/60 pb-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#6366F1] flex items-center justify-center font-bold text-white text-base">
                    G
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">Gutenberg Core Engine</div>
                    <div className="text-xs text-[#10B981] font-mono">Performance: 99 / 100</div>
                  </div>
                </div>
                <div className="text-xs bg-[#1E293B] px-3 py-1.5 rounded-full text-[#A5B4FC] border border-[#334155]">
                  Load Time: 0.72s
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                <div className="p-4 rounded-lg bg-[#1E293B]/70 border border-[#334155]/40 text-center">
                  <div className="text-xs text-[#9CA3AF] mb-1">حجم کل صفحه</div>
                  <div className="text-lg font-bold text-white font-mono">۳۸۰ KB</div>
                  <div className="text-[11px] text-[#10B981] mt-1">بدون فایل‌های سنگین</div>
                </div>
                <div className="p-4 rounded-lg bg-[#1E293B]/70 border border-[#334155]/40 text-center">
                  <div className="text-xs text-[#9CA3AF] mb-1">تعداد درخواست‌های HTTP</div>
                  <div className="text-lg font-bold text-white font-mono">۱۲ درخواست</div>
                  <div className="text-[11px] text-[#10B981] mt-1">مینیمال و فشرده</div>
                </div>
                <div className="p-4 rounded-lg bg-[#1E293B]/70 border border-[#334155]/40 text-center">
                  <div className="text-xs text-[#9CA3AF] mb-1">امتیاز سئو تکنیکال</div>
                  <div className="text-lg font-bold text-white font-mono">۱۰۰ از ۱۰۰</div>
                  <div className="text-[11px] text-[#10B981] mt-1">Schema.org استاندارد</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: SOCIAL PROOF TICKER */}
      <section className="border-y border-[#1F2937] bg-[#111827]/60 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center divide-y sm:divide-y-0 sm:divide-x sm:divide-x-reverse divide-[#1F2937]">
            <div className="pt-3 sm:pt-0">
              <div className="text-3xl sm:text-4xl font-black text-white font-mono mb-1">+۸۰</div>
              <div className="text-sm text-[#9CA3AF]">پروژه طراحی وب موفق تحویل‌شده</div>
            </div>
            <div className="pt-3 sm:pt-0">
              <div className="text-3xl sm:text-4xl font-black text-[#F59E0B] font-mono mb-1 flex items-center justify-center gap-1">
                <span>۴.۹</span>
                <Star className="w-6 h-6 fill-[#F59E0B]" />
              </div>
              <div className="text-sm text-[#9CA3AF]">امتیاز رضایت مشتریان و کارفرمایان</div>
            </div>
            <div className="pt-3 sm:pt-0">
              <div className="text-3xl sm:text-4xl font-black text-[#10B981] font-mono mb-1">۹۵٪</div>
              <div className="text-sm text-[#9CA3AF]">نرخ رضایت و بازگشت برای پروژه‌های بعدی</div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: VALUE PROPOSITION (چرا من؟) */}
      <section className="py-20 bg-[#0B0F19]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-[#818CF8] uppercase tracking-wider bg-[#818CF8]/10 px-3 py-1 rounded-full border border-[#818CF8]/20">
              ارزش‌های کلیدی و مزیت رقابتی
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-4 mb-4">
              چرا طراحی اختصاصی با گوتنبرگ به نفع کسب‌وکار شماست؟
            </h2>
            <p className="text-[#9CA3AF] text-sm sm:text-base leading-relaxed">
              تفاوت یک وب‌سایت کند با صدها افزونه کرک‌شده، و یک سیستم استاندارد مهندسی‌شده با هسته وردپرس در همین ۶ اصل نهفته است.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#131B2E] border border-[#1E293B] hover:border-[#6366F1]/50 transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#6366F1]/20 flex items-center justify-center text-[#818CF8] mb-5">
                <Code2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">طراحی اختصاصی با گوتنبرگ</h3>
              <p className="text-[#9CA3AF] text-sm leading-relaxed">
                بدون قالب‌های سنگین آماده خارجی که بعد از چند ماه به مشکل می‌خورند؛ الگوهای بومی و سفارشی برای هویت بصری برند شما.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#131B2E] border border-[#1E293B] hover:border-[#10B981]/50 transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#10B981]/20 flex items-center justify-center text-[#10B981] mb-5">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">سرعت بارگذاری زیر ۲ ثانیه</h3>
              <p className="text-[#9CA3AF] text-sm leading-relaxed">
                پرفورمنس ۹۵+ در جی‌تی‌متریکس و گوگل لایت‌هاوس برای تجربه خرید عالی مخاطب و نرخ پرش نزدیک به صفر.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#131B2E] border border-[#1E293B] hover:border-[#F59E0B]/50 transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#F59E0B]/20 flex items-center justify-center text-[#F59E0B] mb-5">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">سئوی فنی از روز اول</h3>
              <p className="text-[#9CA3AF] text-sm leading-relaxed">
                کدهای ساختاریافته Schema.org، نشانی‌های بهینه، سایت‌مپ استاندارد و بارگذاری اصولی برای ایندکس سریع در گوگل.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#131B2E] border border-[#1E293B] hover:border-[#38BDF8]/50 transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#38BDF8]/20 flex items-center justify-center text-[#38BDF8] mb-5">
                <Smartphone className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">سازگار با موبایل و RTL</h3>
              <p className="text-[#9CA3AF] text-sm leading-relaxed">
                طراحی Mobile-First با فونت‌های استاندارد فارسی، منوهای شست‌محور و واکنش‌گرایی بی‌نقص در انواع سایزها.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#131B2E] border border-[#1E293B] hover:border-[#EC4899]/50 transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#EC4899]/20 flex items-center justify-center text-[#EC4899] mb-5">
                <Video className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">تحویل سورس + آموزش ویدیویی</h3>
              <p className="text-[#9CA3AF] text-sm leading-relaxed">
                مالکیت ۱۰۰٪ کامل وب‌سایت متعلق به شماست؛ همراه با ویدیوهای ضبط‌شده اختصاصی برای تغییر متون، قیمت‌ها و فایل‌ها.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#131B2E] border border-[#1E293B] hover:border-[#A855F7]/50 transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#A855F7]/20 flex items-center justify-center text-[#A855F7] mb-5">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">پشتیبانی متعهدانه پس از تحویل</h3>
              <p className="text-[#9CA3AF] text-sm leading-relaxed">
                ۶ ماه پشتیبانی فنی و امنیتی، رفع باگ‌های احتمالی و پاسخ به سوالات کارفرما بدون هزینه‌های پنهان.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: SERVICES GRID */}
      <section className="py-20 bg-[#0F172A] border-t border-[#1E293B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-[#10B981] uppercase tracking-wider bg-[#10B981]/10 px-3 py-1 rounded-full border border-[#10B981]/20">
              خدمات تخصصی
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-4 mb-4">
              خدمات طراحی، توسعه و بهینه‌سازی وب
            </h2>
            <p className="text-[#9CA3AF] text-sm sm:text-base leading-relaxed">
              ارائه راه‌کارهای یکپارچه متناسب با ابعاد کسب‌وکار شما
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'طراحی سایت شرکتی با گوتنبرگ',
                desc: 'سریع، سبک و حرفه‌ای برای معرفی تخصص‌ها، تیم، نمونه‌کارها و رزرو جلسه مشاوره بدون کندی.',
                icon: Layers,
                features: ['طراحی اختصاصی UI/UX', 'تایم‌لاین و دستاوردها', 'چندزبانه اختیاری'],
              },
              {
                title: 'طراحی فروشگاه ووکامرس',
                desc: 'فروشگاه کامل اینترنتی با اتصال به شاپرک، اینماد، ترب، صدور فاکتور و فیلتر متغیر محصولات.',
                icon: ShoppingCart,
                features: ['مینی‌کارت کشویی', 'تسویه حساب تک‌مرحله‌ای', 'پنل پیامک خریدار'],
              },
              {
                title: 'لندینگ‌پیج فروش و کمپین',
                desc: 'صفحات فرود پربازده متمرکز بر فروش محصولات خاص یا رویدادها با نرخ تبدیل بالا.',
                icon: Zap,
                features: ['روانشناسی فروش و کپی‌رایتینگ', 'تست A/B', 'اتصال به وب‌هوک و CRM'],
              },
              {
                title: 'بهینه‌سازی سرعت و Core Web Vitals',
                desc: 'نجات سایت‌های کند وردپرسی و رساندن نمره لایت‌هاوس به بالای ۹۰ بدون به هم ریختن المان‌ها.',
                icon: Compass,
                features: ['بهینه‌سازی دیتابیس', 'کش پیشرفته سرور', 'فشرده‌سازی خودکار تصاویر'],
              },
              {
                title: 'رفع مشکلات و بازطراحی سایت قدیمی',
                desc: 'ارتقای ظاهر قدیمی سایت‌های چند ساله به ساختار مدرن ۲۰۲۶ و انتقال ایمن اطلاعات قبلی.',
                icon: Sliders,
                features: ['حفظ ۱۰۰٪ رتبه‌های سئو قبلی', 'مدرن‌سازی پنل مدیریت', 'رفع باگ‌های امنیتی'],
              },
              {
                title: 'مشاوره و آموزش وردپرس',
                desc: 'جلسات مشاوره فنی معماری وب، انتخاب زیرساخت هاستینگ و آموزش تیم محتوای کارفرما.',
                icon: Headphones,
                features: ['تحلیل نقشه راه محصول', 'کوچینگ مدیریت سایت', 'مستندسازی اختصاصی'],
              },
            ].map((srv, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-[#1E293B]/60 border border-[#334155] hover:border-[#6366F1] transition-all flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#6366F1]/20 flex items-center justify-center text-[#818CF8] mb-5">
                    <srv.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{srv.title}</h3>
                  <p className="text-[#9CA3AF] text-sm leading-relaxed mb-6">{srv.desc}</p>
                </div>
                <div>
                  <div className="border-t border-[#334155]/60 pt-4 space-y-2">
                    {srv.features.map((f, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-[#CBD5E1]">
                        <Check className="w-3.5 h-3.5 text-[#10B981]" /> {f}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: PORTFOLIO & CASE STUDIES */}
      <section id="portfolio-section" className="py-20 bg-[#0B0F19]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold text-[#818CF8] uppercase tracking-wider bg-[#818CF8]/10 px-3 py-1 rounded-full border border-[#818CF8]/20">
              نمونه‌کارها و Case Study
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-4 mb-4">
              پروژه‌های واقعی؛ چالش، راه‌حل و نتایج عددی
            </h2>
            <p className="text-[#9CA3AF] text-sm sm:text-base leading-relaxed">
              نمونه‌هایی از پروژه‌های تحویل‌شده با بررسی چالش‌های تجاری کارفرما و نتایج ملموس در سرعت و فروش
            </p>

            {/* Filter Tabs */}
            <div className="inline-flex items-center gap-2 p-1.5 rounded-xl bg-[#1E293B] border border-[#334155] mt-8">
              {[
                { id: 'all', label: 'همه پروژه‌ها' },
                { id: 'corporate', label: 'شرکتی' },
                { id: 'store', label: 'فروشگاهی' },
                { id: 'landing', label: 'لندینگ‌پیج' },
              ].map(tab => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setPortfolioFilter(tab.id as any)}
                  className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition cursor-pointer ${
                    portfolioFilter === tab.id
                      ? 'bg-[#6366F1] text-white shadow'
                      : 'text-[#9CA3AF] hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPortfolio.map(item => (
              <div key={item.id} className="rounded-2xl bg-[#131B2E] border border-[#1E293B] overflow-hidden hover:border-[#6366F1]/60 transition-all flex flex-col justify-between group">
                <div>
                  <div className="relative h-48 overflow-hidden bg-[#1E293B]">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                      loading="lazy"
                    />
                    <span className="absolute top-3 right-3 px-3 py-1 rounded-md text-xs font-bold bg-[#0F172A]/90 text-[#818CF8] border border-[#334155]">
                      {item.catLabel}
                    </span>
                  </div>

                  <div className="p-6">
                    <h3 className="text-base sm:text-lg font-bold text-white mb-3 group-hover:text-[#818CF8] transition-colors">
                      {item.title}
                    </h3>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {item.tech.map((t, i) => (
                        <span key={i} className="text-[11px] px-2 py-0.5 rounded bg-[#1E293B] text-[#9CA3AF] border border-[#334155]/60">
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="space-y-2 text-xs text-[#9CA3AF] mb-4">
                      <div>
                        <strong className="text-[#E2E8F0]">چالش:</strong> {item.challenge}
                      </div>
                      <div>
                        <strong className="text-[#E2E8F0]">راه‌حل:</strong> {item.solution}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <div className="p-3 rounded-xl bg-[#1E293B]/70 border border-[#334155]/50 flex items-center justify-between">
                    <span className="text-xs text-[#10B981] font-bold font-mono">
                      {item.metric}
                    </span>
                    <span className="text-xs text-[#818CF8] flex items-center gap-1 group-hover:underline cursor-pointer">
                      مشاهده جزییات <ArrowLeft className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: PROCESS TIMELINE (فرآیند ۶ مرحله‌ای کار) */}
      <section className="py-20 bg-[#0F172A] border-t border-[#1E293B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-[#F59E0B] uppercase tracking-wider bg-[#F59E0B]/10 px-3 py-1 rounded-full border border-[#F59E0B]/20">
              فرآیند شفاف و گام‌به‌گام
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-4 mb-4">
              از اولین تماس تا تحویل پروژه چگونه پیش می‌رویم؟
            </h2>
            <p className="text-[#9CA3AF] text-sm sm:text-base leading-relaxed">
              ۶ گام شفاف بدون سورپرایزهای ناخوشایند در زمان، هزینه و کیفیت
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { step: '۰۱', title: 'جلسه کشف نیاز (Discovery)', desc: 'جلسه آنلاین ۳۰ دقیقه‌ای رایگان برای تحلیل دقیق اهداف تجاری و مخاطبان شما.' },
              { step: '۰۲', title: 'ارائه بریف و پیشنهاد قیمت', desc: 'تدوین نقشه سایت، معماری صفحات و پیش‌فاکتور شفاف بدون هزینه‌های پنهان طی ۴۸ ساعت.' },
              { step: '۰۳', title: 'طراحی رابط کاربری (UI/UX)', desc: 'طراحی وایرفریم‌ها و پروتوتایپ فیگما تا جلب رضایت کامل شما از ساختار بصری.' },
              { step: '۰۴', title: 'پیاده‌سازی با گوتنبرگ', desc: 'کدنویسی تمیز، استاندارد و سبک با بلوک‌های اختصاصی و رعایت استانداردهای روز.' },
              { step: '۰۵', title: 'تست سرعت، سئو و QA', desc: 'بررسی لود در دیوایس‌های مختلف، بهینه‌سازی کدهای اسکیما و کسب تاییدیه کیفیت.' },
              { step: '۰۶', title: 'تحویل، آموزش و پشتیبانی', desc: 'تحویل سورس‌کد، انتقال مالکیت، ارسال ویدیوهای آموزشی و شروع پشتیبانی فعال ۶ ماهه.' },
            ].map((st, i) => (
              <div key={i} className="p-6 rounded-2xl bg-[#1E293B]/70 border border-[#334155] relative overflow-hidden group hover:border-[#F59E0B]/60 transition-all">
                <span className="text-4xl font-black text-[#334155]/60 absolute top-4 left-4 font-mono group-hover:text-[#F59E0B]/30 transition-colors">
                  {st.step}
                </span>
                <div className="relative z-10">
                  <div className="w-9 h-9 rounded-lg bg-[#F59E0B]/15 text-[#F59E0B] flex items-center justify-center font-bold text-sm mb-4">
                    گام {i + 1}
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white mb-2">{st.title}</h3>
                  <p className="text-[#9CA3AF] text-sm leading-relaxed">{st.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: PRICING PACKAGES */}
      <section className="py-20 bg-[#0B0F19]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold text-[#818CF8] uppercase tracking-wider bg-[#818CF8]/10 px-3 py-1 rounded-full border border-[#818CF8]/20">
              تعرفه‌های شفاف و مقایسه
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-4 mb-4">
              پکیج‌های شفاف و مشخص بر اساس نیاز شما
            </h2>
            <p className="text-[#9CA3AF] text-sm sm:text-base leading-relaxed">
              امکان پرداخت مرحله‌ای در ۳ قسط برای کارفرمایان داخلی، و رمزارز / پی‌پال برای کارفرمایان بین‌المللی
            </p>

            {/* Currency toggle */}
            <div className="inline-flex items-center gap-2 p-1 rounded-xl bg-[#1E293B] border border-[#334155] mt-6">
              <button
                type="button"
                onClick={() => setCurrency('toman')}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  currency === 'toman' ? 'bg-[#6366F1] text-white' : 'text-[#9CA3AF]'
                }`}
              >
                تومان (ایران)
              </button>
              <button
                type="button"
                onClick={() => setCurrency('usd')}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  currency === 'usd' ? 'bg-[#6366F1] text-white' : 'text-[#9CA3AF]'
                }`}
              >
                دلار (USD / کریپتو)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {pricingData.map(pkg => (
              <div
                key={pkg.id}
                className={`rounded-2xl p-8 flex flex-col justify-between transition-all relative ${
                  pkg.isPopular
                    ? 'bg-[#1E293B] border-2 border-[#6366F1] shadow-2xl shadow-[#6366F1]/20 scale-[1.02]'
                    : 'bg-[#131B2E] border border-[#1E293B] hover:border-[#334155]'
                }`}
              >
                {pkg.isPopular && (
                  <span className="absolute -top-3.5 right-6 px-3 py-1 rounded-full text-xs font-bold bg-[#6366F1] text-white shadow">
                    {pkg.badge}
                  </span>
                )}

                <div>
                  <div className="text-lg font-bold text-white mb-2">{pkg.name}</div>
                  <p className="text-[#9CA3AF] text-xs leading-relaxed mb-6">{pkg.description}</p>

                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-3xl font-black text-white font-mono">
                      {currency === 'toman' ? pkg.priceToman : `$${pkg.priceUsd}`}
                    </span>
                    <span className="text-xs text-[#9CA3AF]">
                      {currency === 'toman' ? 'تومان' : 'USD'}
                    </span>
                  </div>
                  <div className="text-xs text-[#10B981] mb-6 flex items-center gap-1 font-medium">
                    <Clock className="w-3.5 h-3.5" /> زمان تحویل: {pkg.delivery}
                  </div>

                  <div className="border-t border-[#334155] pt-6 space-y-3 mb-8">
                    {pkg.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-[#E2E8F0]">
                        <Check className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <button
                    type="button"
                    onClick={() => {
                      const formEl = document.getElementById('brief-form-section');
                      if (formEl) formEl.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all cursor-pointer ${
                      pkg.isPopular
                        ? 'bg-[#6366F1] text-white shadow-lg shadow-[#6366F1]/30 hover:bg-[#4F46E5]'
                        : 'bg-[#1E293B] text-white border border-[#334155] hover:bg-[#334155]'
                    }`}
                  >
                    ثبت سفارش و دریافت بریف
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8: TESTIMONIALS (نظرات مشتریان با تب دو زبانه) */}
      <section className="py-20 bg-[#0F172A] border-t border-[#1E293B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold text-[#10B981] uppercase tracking-wider bg-[#10B981]/10 px-3 py-1 rounded-full border border-[#10B981]/20">
              صدای کارفرمایان
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-4 mb-4">
              نظرات مشتریان ایرانی و بین‌المللی
            </h2>

            {/* Language toggle */}
            <div className="inline-flex items-center gap-2 p-1 rounded-xl bg-[#1E293B] border border-[#334155] mt-4">
              <button
                type="button"
                onClick={() => setTestimonialLang('fa')}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  testimonialLang === 'fa' ? 'bg-[#6366F1] text-white' : 'text-[#9CA3AF]'
                }`}
              >
                🇮🇷 کارفرمایان ایرانی
              </button>
              <button
                type="button"
                onClick={() => setTestimonialLang('en')}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  testimonialLang === 'en' ? 'bg-[#6366F1] text-white' : 'text-[#9CA3AF]'
                }`}
              >
                🌍 International Clients
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonialLang === 'fa' ? (
              <>
                <div className="p-6 rounded-2xl bg-[#1E293B]/70 border border-[#334155]">
                  <div className="flex items-center gap-1 text-[#F59E0B] mb-3">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-[#F59E0B]" />)}
                  </div>
                  <p className="text-sm text-[#CBD5E1] leading-relaxed mb-6">
                    «سایت قبلی ما با المنتور بود و لودش حدود ۶ ثانیه طول می‌کشید. بعد از بازطراحی با گوتنبرگ سرعت لود به زیر ۱ ثانیه رسید و ورودی گوگل ما طی ۳ ماه بیش از ۲ برابر شد.»
                  </p>
                  <div className="flex items-center gap-3 border-t border-[#334155]/60 pt-4">
                    <div className="w-10 h-10 rounded-full bg-[#6366F1]/30 flex items-center justify-center font-bold text-white text-sm">
                      م.ع
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">مهندس علی مرادی</div>
                      <div className="text-xs text-[#9CA3AF]">مدیرعامل هلدینگ تک‌نوا</div>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-[#1E293B]/70 border border-[#334155]">
                  <div className="flex items-center gap-1 text-[#F59E0B] mb-3">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-[#F59E0B]" />)}
                  </div>
                  <p className="text-sm text-[#CBD5E1] leading-relaxed mb-6">
                    «پشتیبانی دقیق و آموزش‌های ویدیویی پنل کارفرما فوق‌العاده بود. حتی منشی دفتر ما که کار با وردپرس بلد نبود به راحتی مقالات و تصاویر را بارگذاری می‌کند.»
                  </p>
                  <div className="flex items-center gap-3 border-t border-[#334155]/60 pt-4">
                    <div className="w-10 h-10 rounded-full bg-[#10B981]/30 flex items-center justify-center font-bold text-white text-sm">
                      د.ر
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">دکتر سیده مریم رضوی</div>
                      <div className="text-xs text-[#9CA3AF]">وکیل پایه یک دادگستری</div>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-[#1E293B]/70 border border-[#334155]">
                  <div className="flex items-center gap-1 text-[#F59E0B] mb-3">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-[#F59E0B]" />)}
                  </div>
                  <p className="text-sm text-[#CBD5E1] leading-relaxed mb-6">
                    «لندینگ کمپین بلک‌فرایدی که زدیم بدون یک ثانیه قطعی بیش از ۳,۵۰۰ لید ثبت کرد. شفافیت در قیمت و تحویل به موقع پروژه بزرگترین ویژگی همکاری بود.»
                  </p>
                  <div className="flex items-center gap-3 border-t border-[#334155]/60 pt-4">
                    <div className="w-10 h-10 rounded-full bg-[#F59E0B]/30 flex items-center justify-center font-bold text-white text-sm">
                      س.ح
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">سهراب حسینی</div>
                      <div className="text-xs text-[#9CA3AF]">مدیر مارکتینگ آکادمی مهارت</div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="p-6 rounded-2xl bg-[#1E293B]/70 border border-[#334155] text-left" dir="ltr">
                  <div className="flex items-center gap-1 text-[#F59E0B] mb-3">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-[#F59E0B]" />)}
                  </div>
                  <p className="text-sm text-[#CBD5E1] leading-relaxed mb-6 font-sans">
                    "Outstanding Gutenberg implementation! Sub-second load time, zero plugin bloat, and super clean code handoff. Highly recommended."
                  </p>
                  <div className="flex items-center gap-3 border-t border-[#334155]/60 pt-4">
                    <div className="w-10 h-10 rounded-full bg-[#6366F1]/30 flex items-center justify-center font-bold text-white text-sm">
                      JL
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">James Laurent</div>
                      <div className="text-xs text-[#9CA3AF]">Founder, SwissFin Agency</div>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-[#1E293B]/70 border border-[#334155] text-left" dir="ltr">
                  <div className="flex items-center gap-1 text-[#F59E0B] mb-3">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-[#F59E0B]" />)}
                  </div>
                  <p className="text-sm text-[#CBD5E1] leading-relaxed mb-6 font-sans">
                    "Delivered our multi-step SaaS onboarding landing page in 6 days. Our conversion rate jumped from 2.1% to 4.4% within two weeks."
                  </p>
                  <div className="flex items-center gap-3 border-t border-[#334155]/60 pt-4">
                    <div className="w-10 h-10 rounded-full bg-[#10B981]/30 flex items-center justify-center font-bold text-white text-sm">
                      EK
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">Elena Keller</div>
                      <div className="text-xs text-[#9CA3AF]">Product Lead, Nordik Cloud</div>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-[#1E293B]/70 border border-[#334155] text-left" dir="ltr">
                  <div className="flex items-center gap-1 text-[#F59E0B] mb-3">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-[#F59E0B]" />)}
                  </div>
                  <p className="text-sm text-[#CBD5E1] leading-relaxed mb-6 font-sans">
                    "Clear communication, transparent milestone payments via Wise, and top-tier Core Web Vitals optimization. Will definitely work again."
                  </p>
                  <div className="flex items-center gap-3 border-t border-[#334155]/60 pt-4">
                    <div className="w-10 h-10 rounded-full bg-[#F59E0B]/30 flex items-center justify-center font-bold text-white text-sm">
                      TA
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">Tariq Al-Mansoor</div>
                      <div className="text-xs text-[#9CA3AF]">COO, Gulf Retail Ventures</div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* SECTION 9: ABOUT ME */}
      <section className="py-20 bg-[#0B0F19]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-12 rounded-3xl bg-[#131B2E] border border-[#1E293B] grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-1 text-center">
              <div className="w-36 h-36 mx-auto rounded-2xl bg-gradient-to-tr from-[#6366F1] to-[#10B981] p-1 mb-4 shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
                  alt="طراح و معمار وب"
                  className="w-full h-full object-cover rounded-xl"
                  loading="lazy"
                />
              </div>
              <div className="text-lg font-bold text-white">سید امیر حسین رضوی فردویی</div>
              <div className="text-xs text-[#818CF8] font-medium mt-1">معمار ارشد فرانت‌اند و وردپرس</div>
            </div>

            <div className="md:col-span-2">
              <h2 className="text-xl sm:text-2xl font-black text-white mb-4">
                توسعه وب بر پایه استانداردهای مدرن و بدون کدنویسی شلخته
              </h2>
              <p className="text-sm text-[#9CA3AF] leading-relaxed mb-4">
                بیش از ۸ سال است که به صورت تخصصی در حوزه اکوسیستم وردپرس و فرانت‌اند مدرن فعالیت می‌کنم. باور من این است که وب‌سایت باید به عنوان یک دارایی سودآور و سبک برای کسب‌وکار کار کند، نه یک هزینه سنگین که دائماً خراب شود.
              </p>
              <p className="text-sm text-[#9CA3AF] leading-relaxed mb-6">
                تمرکز من بر معماری بدون افزونه‌های غیرضروری، بهینه‌سازی تجربه کاربری (UX) و توانمندسازی کارفرماست تا بتواند بدون وابستگی به هیچ شخصی سایتش را مدیریت کند.
              </p>

              {/* Tech Stack badges */}
              <div className="flex flex-wrap gap-2">
                {['WordPress Gutenberg Core', 'WooCommerce Architecture', 'Core Web Vitals 95+', 'Tailwind CSS', 'Schema.org SEO', 'REST API Integration'].map((tech, idx) => (
                  <span key={idx} className="text-xs px-3 py-1 rounded-full bg-[#1E293B] text-[#CBD5E1] border border-[#334155]">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 10: BLOG & TUTORIALS */}
      <section className="py-20 bg-[#0F172A] border-t border-[#1E293B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-[#818CF8] uppercase tracking-wider bg-[#818CF8]/10 px-3 py-1 rounded-full border border-[#818CF8]/20">
              آموزش و یادداشت‌های تخصصی
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-4 mb-4">
              آخرین مطالب بلاگ درباره پرفورمنس و وردپرس
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'چرا کوچ از قالب‌های آماده به گوتنبرگ سرعت سایت را ۳ برابر می‌کند؟',
                cat: 'پرفورمنس',
                read: '۵ دقیقه مطالعه',
                date: '۱۴۰۳/۰۹/۱۰',
              },
              {
                title: 'چک‌لیست سئوی تکنیکال برای فروشگاه‌های ووکامرسی در سال ۲۰۲۶',
                cat: 'سئو تکنیکال',
                read: '۷ دقیقه مطالعه',
                date: '۱۴۰۳/۰۹/۰۲',
              },
              {
                title: 'راهنمای کارفرمایان: چطور بدون دانش فنی سایت خود را به روز نگه داریم؟',
                cat: 'آموزش کارفرما',
                read: '۴ دقیقه مطالعه',
                date: '۱۴۰۳/۰۸/۲۲',
              },
            ].map((art, i) => (
              <div key={i} className="p-6 rounded-2xl bg-[#1E293B]/60 border border-[#334155] hover:border-[#6366F1] transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-[#9CA3AF] mb-3">
                    <span className="text-[#818CF8] font-bold">{art.cat}</span>
                    <span>{art.read}</span>
                  </div>
                  <h3 className="text-base font-bold text-white mb-4 hover:text-[#818CF8] cursor-pointer">
                    {art.title}
                  </h3>
                </div>
                <div className="border-t border-[#334155]/60 pt-4 flex items-center justify-between text-xs text-[#6B7280]">
                  <span>{art.date}</span>
                  <span className="text-[#818CF8] flex items-center gap-1 cursor-pointer">
                    مطالعه مقاله ←
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 11: FAQ ACCORDION */}
      <section className="py-20 bg-[#0B0F19]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-[#F59E0B] uppercase tracking-wider bg-[#F59E0B]/10 px-3 py-1 rounded-full border border-[#F59E0B]/20">
              سوالات پرتکرار
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-4 mb-4">
              پاسخ به سوالات متداول کارفرمایان
            </h2>
          </div>

          <div className="space-y-4">
            {faqItems.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-xl bg-[#131B2E] border border-[#1E293B] overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-5 text-right flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="text-sm sm:text-base font-bold text-white">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-[#818CF8] shrink-0 transition-transform ${
                    openFaq === idx ? 'rotate-180' : ''
                  }`} />
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-5 text-sm text-[#9CA3AF] leading-relaxed border-t border-[#1E293B]/60 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 12: 5-STEP BRIEF FORM */}
      <section id="brief-form-section" className="py-20 bg-[#0F172A] border-t border-[#1E293B]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-[#10B981] uppercase tracking-wider bg-[#10B981]/10 px-3 py-1 rounded-full border border-[#10B981]/20">
              ثبت آنلاین بریف پروژه
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-4 mb-4">
              ثبت بریف ۵ مرحله‌ای و برآورد هوشمند هزینه
            </h2>
            <p className="text-[#9CA3AF] text-sm">
              طی ۲ دقیقه نیازهای پروژه خود را مشخص کنید تا در کمتر از ۴۸ ساعت پیش‌فاکتور دقیق دریافت کنید.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-[#1E293B] border border-[#334155] shadow-2xl">
            {/* Step Indicators */}
            <div className="flex items-center justify-between mb-8 border-b border-[#334155] pb-4">
              {[1, 2, 3, 4, 5].map(st => (
                <div key={st} className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                    briefStep === st
                      ? 'bg-[#6366F1] text-white ring-4 ring-[#6366F1]/20'
                      : briefStep > st
                      ? 'bg-[#10B981] text-white'
                      : 'bg-[#334155] text-[#9CA3AF]'
                  }`}>
                    {briefStep > st ? '✓' : st}
                  </div>
                  <span className="text-xs text-[#9CA3AF] hidden sm:inline">
                    {st === 1 ? 'نوع' : st === 2 ? 'امکانات' : st === 3 ? 'بودجه' : st === 4 ? 'اطلاعات' : 'تایید'}
                  </span>
                </div>
              ))}
            </div>

            {briefSubmitted ? (
              <div className="text-center py-10">
                <div className="w-16 h-16 rounded-full bg-[#10B981]/20 text-[#10B981] flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">بریف شما با موفقیت ثبت شد!</h3>
                <p className="text-sm text-[#9CA3AF] max-w-md mx-auto mb-6">
                  اطلاعات پروژه شما در کارتابل ما قرار گرفت. طی ۲۴ الی ۴۸ ساعت آینده با شما تماس گرفته و پیش‌فاکتور ارسال خواهد شد.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setBriefSubmitted(false);
                    setBriefStep(1);
                  }}
                  className="px-6 py-2.5 rounded-xl bg-[#334155] text-white text-xs font-bold hover:bg-[#475569]"
                >
                  ثبت بریف جدید
                </button>
              </div>
            ) : (
              <div>
                {/* STEP 1: Project Type */}
                {briefStep === 1 && (
                  <div>
                    <h4 className="text-base font-bold text-white mb-4">گام ۱: نوع وب‌سایت مورد نظر شما چیست؟</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                      {[
                        { id: 'corporate', label: 'سایت شرکتی / خدماتی', desc: 'معرفی خدمات، تیم و نمونه‌کارها' },
                        { id: 'store', label: 'فروشگاه اینترنتی (ووکامرس)', desc: 'فروش محصولات فیزیکی یا دانلودی' },
                        { id: 'landing', label: 'لندینگ‌پیج تک‌صفحه', desc: 'کمپین تبلیغاتی یا معرفی یک محصول' },
                        { id: 'redesign', label: 'بازطراحی سایت قدیمی', desc: 'ارتقای سرعت، ظاهر و سئو' },
                      ].map(item => (
                        <div
                          key={item.id}
                          onClick={() => setBriefData({ ...briefData, projectType: item.id })}
                          className={`p-4 rounded-xl border cursor-pointer transition ${
                            briefData.projectType === item.id
                              ? 'bg-[#6366F1]/10 border-[#6366F1] text-white'
                              : 'bg-[#111827] border-[#374151] text-[#CBD5E1] hover:border-[#4B5563]'
                          }`}
                        >
                          <div className="font-bold text-sm mb-1">{item.label}</div>
                          <div className="text-xs text-[#9CA3AF]">{item.desc}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* STEP 2: Features */}
                {briefStep === 2 && (
                  <div>
                    <h4 className="text-base font-bold text-white mb-4">گام ۲: چه امکاناتی نیاز دارید؟</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                      {[
                        { id: 'gutenberg', label: 'معماری سبک گوتنبرگ (سرعت بالا)' },
                        { id: 'blog', label: 'وبلاگ و سیستم مقالات' },
                        { id: 'multilang', label: 'پشتیبانی از دو یا چند زبان' },
                        { id: 'payment', label: 'اتصال به درگاه بانکی شاپرک' },
                        { id: 'booking', label: 'رزرو آنلاین وقت / مشاوره' },
                        { id: 'portal', label: 'پنل ساده کارفرما برای ویرایش' },
                      ].map(item => {
                        const isSelected = briefData.features.includes(item.id);
                        return (
                          <div
                            key={item.id}
                            onClick={() => {
                              const newF = isSelected
                                ? briefData.features.filter(f => f !== item.id)
                                : [...briefData.features, item.id];
                              setBriefData({ ...briefData, features: newF });
                            }}
                            className={`p-3.5 rounded-xl border cursor-pointer flex items-center justify-between text-xs sm:text-sm ${
                              isSelected
                                ? 'bg-[#10B981]/15 border-[#10B981] text-white font-medium'
                                : 'bg-[#111827] border-[#374151] text-[#9CA3AF]'
                            }`}
                          >
                            <span>{item.label}</span>
                            <div className={`w-4 h-4 rounded flex items-center justify-center text-xs ${
                              isSelected ? 'bg-[#10B981] text-white' : 'border border-[#4B5563]'
                            }`}>
                              {isSelected && '✓'}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* STEP 3: Budget & Timeline */}
                {briefStep === 3 && (
                  <div>
                    <h4 className="text-base font-bold text-white mb-4">گام ۳: بودجه تقریبی و زمان‌بندی</h4>
                    <div className="space-y-4 mb-6">
                      <div>
                        <label className="block text-xs text-[#9CA3AF] mb-2 font-medium">بازه بودجه مد نظر شما:</label>
                        <select
                          value={briefData.budget}
                          onChange={e => setBriefData({ ...briefData, budget: e.target.value })}
                          className="w-full bg-[#111827] border border-[#374151] rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#6366F1]"
                        >
                          <option value="starter">تا ۱۰ میلیون تومان (پایه / لندینگ)</option>
                          <option value="mid">۱۰ الی ۲۰ میلیون تومان (شرکتی استاندارد)</option>
                          <option value="pro">۲۰ الی ۳۵ میلیون تومان (فروشگاه کامل)</option>
                          <option value="enterprise">بالای ۳۵ میلیون تومان (سفارشی و چندزبانه)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs text-[#9CA3AF] mb-2 font-medium">زمان‌بندی تحویل:</label>
                        <select
                          value={briefData.timeline}
                          onChange={e => setBriefData({ ...briefData, timeline: e.target.value })}
                          className="w-full bg-[#111827] border border-[#374151] rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#6366F1]"
                        >
                          <option value="urgent">فوری (تحویل تا ۷ روز کاری)</option>
                          <option value="normal">عادی (تحویل ۱۰ الی ۲۰ روز)</option>
                          <option value="flexible">انعطاف‌پذیر (کیفیت اولویت اول است)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 4: Contact Info */}
                {briefStep === 4 && (
                  <div>
                    <h4 className="text-base font-bold text-white mb-4">گام ۴: اطلاعات تماس شما</h4>
                    <div className="space-y-4 mb-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs text-[#9CA3AF] mb-1">نام و نام خانوادگی:</label>
                          <input
                            type="text"
                            value={briefData.name}
                            onChange={e => setBriefData({ ...briefData, name: e.target.value })}
                            placeholder="مثال: علی احمدی"
                            className="w-full bg-[#111827] border border-[#374151] rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#6366F1]"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-[#9CA3AF] mb-1">شماره همراه (برای واتساپ/تماس):</label>
                          <input
                            type="tel"
                            value={briefData.phone}
                            onChange={e => setBriefData({ ...briefData, phone: e.target.value })}
                            placeholder="۰۹۱۲..."
                            className="w-full bg-[#111827] border border-[#374151] rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#6366F1]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs text-[#9CA3AF] mb-1">نام شرکت، برند یا حوزه فعالیت:</label>
                        <input
                          type="text"
                          value={briefData.brand}
                          onChange={e => setBriefData({ ...briefData, brand: e.target.value })}
                          placeholder="مثال: شرکت بازرگانی افق"
                          className="w-full bg-[#111827] border border-[#374151] rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#6366F1]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs text-[#9CA3AF] mb-1">توضیحات تکمیلی یا نمونه سایتی که می‌پسندید:</label>
                        <textarea
                          rows={3}
                          value={briefData.description}
                          onChange={e => setBriefData({ ...briefData, description: e.target.value })}
                          placeholder="هر نکته‌ای که به فهم بهتر نیاز پروژه کمک می‌کند..."
                          className="w-full bg-[#111827] border border-[#374151] rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#6366F1]"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 5: Confirm & Submit */}
                {briefStep === 5 && (
                  <div>
                    <h4 className="text-base font-bold text-white mb-4">گام ۵: مرور و تایید اطلاعات بریف</h4>
                    <div className="bg-[#111827] rounded-xl p-5 border border-[#374151] text-xs sm:text-sm space-y-3 mb-6">
                      <div className="flex justify-between border-b border-[#1F2937] pb-2">
                        <span className="text-[#9CA3AF]">نوع پروژه:</span>
                        <span className="text-white font-bold">{briefData.projectType}</span>
                      </div>
                      <div className="flex justify-between border-b border-[#1F2937] pb-2">
                        <span className="text-[#9CA3AF]">تعداد امکانات انتخابی:</span>
                        <span className="text-[#10B981] font-bold">{briefData.features.length} مورد</span>
                      </div>
                      <div className="flex justify-between border-b border-[#1F2937] pb-2">
                        <span className="text-[#9CA3AF]">کارفرما:</span>
                        <span className="text-white font-bold">{briefData.name || 'ثبت نشده'} ({briefData.phone || 'بدون شماره'})</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#9CA3AF]">برند:</span>
                        <span className="text-white font-bold">{briefData.brand || 'عمومی'}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between pt-4 border-t border-[#334155]">
                  {briefStep > 1 ? (
                    <button
                      type="button"
                      onClick={() => setBriefStep(briefStep - 1)}
                      className="px-5 py-2.5 rounded-xl bg-[#334155] text-white text-xs font-bold hover:bg-[#475569] cursor-pointer"
                    >
                      ← مرحله قبل
                    </button>
                  ) : <div />}

                  {briefStep < 5 ? (
                    <button
                      type="button"
                      onClick={() => setBriefStep(briefStep + 1)}
                      className="px-6 py-2.5 rounded-xl bg-[#6366F1] text-white text-xs font-bold hover:bg-[#4F46E5] cursor-pointer flex items-center gap-1"
                    >
                      مرحله بعد →
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setBriefSubmitted(true)}
                      className="px-8 py-3 rounded-xl bg-[#10B981] text-white text-sm font-bold hover:bg-[#059669] cursor-pointer shadow-lg shadow-[#10B981]/30"
                    >
                      ثبت نهایی و دریافت پیش‌فاکتور ✓
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SECTION 13: COMPREHENSIVE FOOTER */}
      <footer className="bg-[#080B11] border-t border-[#1E293B] py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-[#6366F1] flex items-center justify-center font-black text-white">
                  G
                </div>
                <span className="text-lg font-black text-white">استودیو طراحی وب و وردپرس رضوی</span>
              </div>
              <p className="text-xs sm:text-sm text-[#9CA3AF] leading-relaxed max-w-md mb-6">
                طراحی سایت‌های استاندارد، سریع و بدون باگ با گوتنبرگ و فرانت‌اند مدرن. ارائه‌دهنده راه‌کارهای فروشگاهی و شرکتی با پشتیبانی پایدار در تهران و سراسر کشور.
              </p>
              <div className="flex items-center gap-3 text-xs text-[#CBD5E1]">
                <span>📞 مشاوره: ۰۲۱-۸۸۹۹۰۰۱۱</span>
                <span>•</span>
                <span>📱 همراه: ۰۹۱۲-۳۴۵۶۷۸۹</span>
              </div>
            </div>

            <div>
              <div className="text-sm font-bold text-white mb-4">لینک‌های سریع</div>
              <ul className="space-y-2 text-xs text-[#9CA3AF]">
                <li><a href="#portfolio-section" className="hover:text-white transition">نمونه‌کارها و Case Studies</a></li>
                <li><a href="#brief-form-section" className="hover:text-white transition">ثبت آنلاین بریف پروژه</a></li>
                <li><span onClick={onOpenGitHubSync} className="hover:text-[#818CF8] cursor-pointer">مخزن گیت‌هاب و همگام‌سازی</span></li>
                <li><span onClick={onOpenQuickEdit} className="hover:text-[#10B981] cursor-pointer">پیشخوان آسان کارفرما (بدون کد)</span></li>
              </ul>
            </div>

            <div>
              <div className="text-sm font-bold text-white mb-4">نشان‌های اعتماد و سئو</div>
              <div className="p-4 rounded-xl bg-[#111827] border border-[#1E293B] text-xs text-[#9CA3AF] space-y-2">
                <div className="text-[#10B981] font-bold">✓ گارانتی بازگشت وجه در صورت عدم رضایت از طرح</div>
                <div className="text-[#818CF8]">✓ کدنویسی استاندارد W3C و Schema.org</div>
                <div>✓ تحویل کامل سورس‌کد به کارفرما</div>
              </div>
            </div>
          </div>

          <div className="border-t border-[#1E293B] pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#6B7280] gap-4">
            <div>
              © تمامی حقوق مادی و معنوی برای استودیو طراحی وب و وردپرس رضوی محفوظ است.
            </div>
            <div className="flex items-center gap-4">
              <span className="text-[#10B981]">Gutenberg-First Engine v2.5.0</span>
              <span>•</span>
              <span className="text-[#6366F1]">Clean Core Architecture</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
