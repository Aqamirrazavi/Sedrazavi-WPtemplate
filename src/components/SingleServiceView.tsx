import React, { useState } from 'react';
import {
  ChevronLeft,
  Clock,
  Coins,
  FileText,
  CheckCircle2,
  Calendar,
  PhoneCall,
  Download,
  HelpCircle,
  ChevronDown,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Share2,
  Printer
} from 'lucide-react';
import { ServiceItem } from '../types/theme';
import { SERVICES_DATA } from '../data/mockData';
import { useDesignTokens } from '../context/DesignTokensContext';

interface SingleServiceViewProps {
  serviceId?: string;
  serviceSlug?: string;
  onBackToServices: () => void;
  onSelectService: (serviceId: string) => void;
  onBookConsultation: (serviceTitle: string) => void;
  onContactLawyer: () => void;
}

export const SingleServiceView: React.FC<SingleServiceViewProps> = ({
  serviceId,
  serviceSlug,
  onBackToServices,
  onSelectService,
  onBookConsultation,
  onContactLawyer,
}) => {
  const { tokens } = useDesignTokens();
  const lawyerName = tokens['lawyer.name']?.value || 'دکتر سیده مریم رضوی';
  const lawyerPhone = tokens['contact.phone']?.value || '۰۲۱-۸۸۹۹۰۰۱۱';
  const brandName = tokens['brand.name']?.value || 'SedRazavi';

  // Find the target service
  const currentServiceIndex = SERVICES_DATA.findIndex(
    (s) => s.id === serviceId || s.slug === serviceSlug
  );
  const service: ServiceItem =
    currentServiceIndex !== -1 ? SERVICES_DATA[currentServiceIndex] : SERVICES_DATA[0];

  // Previous and next service navigation
  const prevService =
    currentServiceIndex > 0 ? SERVICES_DATA[currentServiceIndex - 1] : null;
  const nextService =
    currentServiceIndex < SERVICES_DATA.length - 1 ? SERVICES_DATA[currentServiceIndex + 1] : null;

  // Related services (3 items excluding current)
  const relatedServices = SERVICES_DATA.filter((s) => s.id !== service.id).slice(0, 3);

  // FAQ open state
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [copiedNotification, setCopiedNotification] = useState(false);

  // 4 standard legal process steps (Part 4.5)
  const standardProcessSteps = [
    {
      step: '۱',
      title: 'مشاوره اولیه و ارزیابی ادله',
      desc: 'بررسی دقیق اسناد، احراز صلاحیت قضایی، محاسبه مواعد قانونی و ارائه نقشه راه حقوقی واقع‌بینانه.',
      icon: '🔎',
    },
    {
      step: '۲',
      title: 'تکمیل مدارک و استعلامات ثبتی',
      desc: 'اخذ استعلامات رسمی از ادارات ثبت اسناد، سامانه‌های بانکی، شهرداری و پزشکی قانونی در صورت لزوم.',
      icon: '📂',
    },
    {
      step: '۳',
      title: 'تنظیم دادخواست، شکواییه و لوایح',
      desc: 'تدوین متون تخصصی منطبق با آخرین آرای وحدت رویه دیوان عالی کشور و نظریات مشورتی اداره حقوقی قوه قضاییه.',
      icon: '⚖️',
    },
    {
      step: '۴',
      title: 'حضور در جلسات دادرسی تا اجرای حکم',
      desc: 'دفاع تمام‌عیار در دادگاه‌های بدوی، تجدیدنظر و دیوان عالی و نظارت مستمر بر اجرای کامل و وصول محکوم‌به.',
      icon: '🏆',
    },
  ];

  // Service specific FAQs
  const serviceFaqs = [
    {
      question: `هزینه‌های حق‌الوکاله و نحوه پرداخت در حوزه ${service.title} چگونه است؟`,
      answer: `حق‌الوکاله با توافق طرفین و در قالب قرارداد رسمی وکالت الکترونیک کانون وکلا منعقد می‌گردد. امکان پرداخت مرحله‌ای و اقساطی متناسب با پیشرفت مراحل دادرسی (بدوی، تجدیدنظر و اجرا) فراهم است.`,
    },
    {
      question: `چه مدارکی برای شروع رسیدگی به این خدمت الزامی است؟`,
      answer: `مدارک هویتی متقاضی (شناسنامه و کارت ملی)، اسناد مثبت ادعا اعم از قراردادها، چک‌ها، پیامک‌ها یا استشهادیه محلی به همراه ثبت‌نام و تایید در سامانه ثنای قوه قضاییه مورد نیاز است.`,
    },
    {
      question: `رسیدگی به این پرونده به صورت میانگین چقدر زمان می‌برد؟`,
      answer: service.duration
        ? `مدت زمان تخمینی برای این حوزه ${service.duration} می‌باشد که به شعب ارجاعی و نوبت‌های دادرسی دادگاه بستگی دارد.`
        : `با توجه به تراکم شعب قضایی، عموماً بین ۳ الی ۹ ماه زمان می‌برد که پیگیری مستمر وکیل روند را تا حد ممکن تسریع خواهد نمود.`,
    },
    {
      question: `آیا برای استفاده از خدمات این حوزه، حضور موکل در دادگاه الزامی است؟`,
      answer: `خیر؛ پس از انعقاد وکالت‌نامه رسمی الکترونیک از طریق سامانه ثنا، وکیل دادگستری تمام مراحل دفاع و دادرسی را بدون نیاز به حضور موکل انجام می‌دهد، مگر در مواردی که قاضی حضور طرفین را صریحاً الزامی دانسته باشد.`,
    },
    {
      question: `آیا امکان پیگیری آنلاین وضعیت پیشرفت این خدمت وجود دارد؟`,
      answer: `بله؛ موکلین محترم می‌توانند از طریق پرتال موکلین و سامانه پیگیری پرونده وب‌سایت دادمان، لحظه به لحظه آخرین وضعیت جلسات، لوایح و ابلاغیه‌ها را مشاهده نمایند.`,
    },
  ];

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedNotification(true);
      setTimeout(() => setCopiedNotification(false), 3000);
    }
  };

  return (
    <div className="py-10 sm:py-16 bg-[#F4F6F9] dark:bg-[#070D1E] min-h-screen text-[#0B132B] dark:text-gray-100 font-persian">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl space-y-12">
        {/* ========================================================= */}
        {/* بخش ۱: هدر خدمت، تصویر شاخص و ناوبری مسیر (Breadcrumb) */}
        {/* ========================================================= */}
        <section className="space-y-6">
          {/* Breadcrumb & Actions */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 dark:border-gray-800 pb-4">
            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              <button
                onClick={onBackToServices}
                className="hover:text-[#D4AF37] transition-colors"
              >
                صفحه اصلی
              </button>
              <ChevronLeft className="w-3.5 h-3.5" />
              <button
                onClick={onBackToServices}
                className="hover:text-[#D4AF37] transition-colors"
              >
                خدمات تخصصی
              </button>
              <ChevronLeft className="w-3.5 h-3.5" />
              <span className="text-[#D4AF37] font-bold line-clamp-1">
                {service.title}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                className="p-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:text-[#D4AF37] text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm"
                title="اشتراک‌گذاری لینک خدمت"
              >
                <Share2 className="w-4 h-4" />
                <span className="hidden sm:inline">اشتراک</span>
              </button>

              <button
                onClick={() => window.print()}
                className="p-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:text-[#D4AF37] text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm"
                title="چاپ شناسنامه خدمت"
              >
                <Printer className="w-4 h-4" />
                <span className="hidden sm:inline">چاپ</span>
              </button>

              <button
                onClick={onBackToServices}
                className="px-3.5 py-1.5 rounded-xl bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-[#D4AF37] hover:text-[#0B132B] text-xs font-bold transition-all"
              >
                &larr; بازگشت به فهرست خدمات
              </button>
            </div>
          </div>

          {copiedNotification && (
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold text-center animate-fadeIn">
              لینک اختصاصی این خدمت حقوقی با موفقیت در کلیپ‌بورد کپی شد.
            </div>
          )}

          {/* Hero Banner for Service */}
          <div className="relative rounded-3xl overflow-hidden border border-[#D4AF37]/30 shadow-2xl bg-gradient-to-r from-[#0B132B] via-[#152238] to-[#0B132B]">
            <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay">
              <img
                src={service.image || 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=1200'}
                alt={service.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="relative p-6 sm:p-10 lg:p-12 text-white flex flex-col md:flex-row md:items-center justify-between gap-8 z-10">
              <div className="space-y-4 max-w-2xl text-right">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-bold">
                  <span className="text-base">{service.iconEmoji || '⚖️'}</span>
                  <span>دپارتمان تخصصی حقوق و دادرسی {brandName}</span>
                </div>

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-serif text-white leading-tight">
                  {service.title}
                </h1>

                <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                  {service.summary}
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-gray-400">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                    <span>تحت نظارت و مسئولیت سرپرست دفتر: {lawyerName}</span>
                  </span>
                  <span>•</span>
                  <span>کد خدمت: {service.slug || service.id}</span>
                </div>
              </div>

              {/* Quick Consultation Action Box */}
              <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 text-center space-y-4 shrink-0 max-w-sm w-full">
                <div className="text-xs text-[#D4AF37] font-bold">مشاوره تخصصی مستقیم</div>
                <div className="text-xl font-bold font-serif text-white">درخواست رسیدگی سریع</div>
                <p className="text-xs text-gray-300">
                  رزرو وقت حضوری یا آنلاین با وکیل پایه‌یک جهت ارزیابی اسناد
                </p>
                <button
                  onClick={() => onBookConsultation(service.title)}
                  className="w-full py-3 rounded-xl btn-gold text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-[#D4AF37]/30 transition-all hover:scale-105"
                >
                  <Calendar className="w-4 h-4" />
                  <span>رزرو نوبت مشاوره این خدمت</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* بخش ۲: باکس متادیتای سه‌ستونه (مدت زمان، هزینه، مدارک) */}
        {/* ========================================================= */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-6 rounded-2xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-md flex items-start gap-4 text-right">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-[#D4AF37] shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <span className="text-xs text-gray-500 dark:text-gray-400 block font-medium">مدت زمان تخمینی رسیدگی:</span>
              <h4 className="text-sm font-bold text-gray-900 dark:text-white">
                {service.duration || '۵ الی ۱۰ روز کاری تنظیم قرارداد / متغیر در دادگاه'}
              </h4>
              <p className="text-[11px] text-gray-400">بسته به نوبت شعب و تشریفات قانونی</p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-md flex items-start gap-4 text-right">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-500 shrink-0">
              <Coins className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <span className="text-xs text-gray-500 dark:text-gray-400 block font-medium">برآورد اولیه حق‌الوکاله:</span>
              <h4 className="text-sm font-bold text-gray-900 dark:text-white">
                {service.estimatedFee || 'منطبق بر تعرفه قانونی کانون وکلا'}
              </h4>
              <p className="text-[11px] text-gray-400">امکان تقسیط مرحله‌ای متناسب با پیشرفت پرونده</p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-md flex items-start gap-4 text-right">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-500 shrink-0">
              <FileText className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <span className="text-xs text-gray-500 dark:text-gray-400 block font-medium">مدارک و اسناد پایه مورد نیاز:</span>
              <h4 className="text-sm font-bold text-gray-900 dark:text-white">
                {service.requiredDocs?.length || 4} مدرک قانونی الزامی
              </h4>
              <p className="text-[11px] text-gray-400">امکان بارگذاری آنلاین در سامانه موکلین</p>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* بخش ۳: محتوای کامل و تشریحی خدمت حقوقی */}
        {/* ========================================================= */}
        <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-lg space-y-6 text-right">
          <div className="flex items-center gap-3 border-b border-gray-100 dark:border-gray-800 pb-4">
            <div className="w-2.5 h-6 bg-[#D4AF37] rounded-full"></div>
            <h2 className="text-xl font-bold font-serif text-gray-900 dark:text-white">
              شرح تفصیلی و ابعاد حقوقی خدمت: {service.title}
            </h2>
          </div>

          <div className="prose dark:prose-invert max-w-none text-sm text-gray-700 dark:text-gray-300 leading-loose space-y-4">
            <p>
              {service.fullDescription ||
                `دپارتمان تخصصی حقوقی ${brandName} با مدیریت ${lawyerName}، خدمات جامع و همه‌جانبه‌ای را در حوزه ${service.title} با تکیه بر اصول اخلاق حرفه‌ای وکالت، اشراف بر دکترین حقوقی و آرا و رویه قضایی محاکم دادگستری ارائه می‌نماید.`}
            </p>
            <p>
              پرونده‌های این حوزه به دلیل پیچیدگی‌های ساختاری نیازمند بررسی موشکافانه اسناد، رعایت دقیق مواعد اعتراض (تجدیدنظر، فرجام‌خواهی و اعاده دادرسی) و تدارک دفاعیات مستدل قبل از تشکیل جلسات دادگاه می‌باشند. وکالت این پرونده‌ها از مرحله ثبت شکواییه یا دادخواست در دفاتر خدمات الکترونیک قضایی آغاز شده و تا مرحله اجرای احکام و تسویه نهایی زیر نظر وکیل سرپرست پیگیری می‌شود.
            </p>
          </div>
        </section>

        {/* ========================================================= */}
        {/* بخش ۴: باکس فرآیند ۴ مرحله‌ای ارائه خدمت حقوقی */}
        {/* ========================================================= */}
        <section className="space-y-6 text-right">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-6 bg-[#D4AF37] rounded-full"></div>
            <div>
              <h2 className="text-xl font-bold font-serif text-gray-900 dark:text-white">
                فرآیند و مراحل استاندارد رسیدگی به پرونده
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                شفافیت کامل در کلیه مراحل رسیدگی و اطلاع‌رسانی مستمر به موکل
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {standardProcessSteps.map((step, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-md space-y-3 relative group hover:border-[#D4AF37] transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="w-9 h-9 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] font-mono font-bold flex items-center justify-center text-sm shadow">
                    {step.step}
                  </span>
                  <span className="text-2xl">{step.icon}</span>
                </div>
                <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                  {step.title}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================= */}
        {/* بخش ۵: باکس مدارک مورد نیاز با دکمه دانلود چک‌لیست PDF */}
        {/* ========================================================= */}
        <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-lg space-y-6 text-right">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 dark:border-gray-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-6 bg-[#D4AF37] rounded-full"></div>
              <div>
                <h2 className="text-xl font-bold font-serif text-gray-900 dark:text-white">
                  مدارک و اسناد قانونی الزامی برای این خدمت
                </h2>
                <p className="text-xs text-gray-500">
                  پیش از حضور در جلسه مشاوره، تصویر یا نسخه برابر اصل مدارک زیر را آماده فرمایید
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                alert(`چک‌لیست مدارک قانونی برای ${service.title} در فرمت PDF آماده‌سازی و دانلود شد.`);
              }}
              className="px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-[#D4AF37] hover:text-[#0B132B] text-gray-700 dark:text-gray-300 text-xs font-bold flex items-center gap-2 transition-all self-start sm:self-auto shadow-sm"
            >
              <Download className="w-4 h-4" />
              <span>دانلود چک‌لیست رسمی PDF</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {(service.requiredDocs && service.requiredDocs.length > 0
              ? service.requiredDocs
              : [
                  'اصل و تصویر کارت ملی و شناسنامه متقاضی',
                  'ثبت‌نام و احراز هویت ثنا در سامane.adliran.ir',
                  'قراردادها، رسیدهای بانکی و اسناد مثبت ادعا',
                  'تصویر دادخواست یا شکواییه بدوی (در صورت وجود)',
                ]
            ).map((doc, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800 flex items-center gap-3"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="text-xs font-semibold text-gray-800 dark:text-gray-200">
                  {doc}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================= */}
        {/* بخش ۶: سوالات متداول اختصاصی این خدمت حقوقی (Accordion) */}
        {/* ========================================================= */}
        <section className="space-y-4 text-right">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-6 bg-[#D4AF37] rounded-full"></div>
            <div>
              <h2 className="text-xl font-bold font-serif text-gray-900 dark:text-white">
                سوالات متداول موکلین در حوزه {service.title}
              </h2>
              <p className="text-xs text-gray-500">
                پاسخ‌های تخصصی به رایج‌ترین پرسش‌های حقوقی و قضایی
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {serviceFaqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                  className="w-full p-4 sm:p-5 text-right flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-gray-900 dark:text-gray-100 hover:text-[#D4AF37] transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-[#D4AF37] shrink-0" />
                    <span>{faq.question}</span>
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform text-[#D4AF37] ${
                      openFaqIndex === idx ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {openFaqIndex === idx && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed border-t border-gray-100 dark:border-gray-800 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================= */}
        {/* بخش ۷: باکس دعوت به اقدام (CTA) رزرو مشاوره برای این خدمت */}
        {/* ========================================================= */}
        <section className="p-8 sm:p-10 rounded-3xl bg-gradient-to-l from-[#0B132B] via-[#1C2541] to-[#0B132B] border-2 border-[#D4AF37]/50 shadow-2xl text-center text-white space-y-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] text-xs font-bold">
            <span>حقوق شما شایسته دفاعی مقتدرانه و تخصصی است</span>
          </div>

          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold font-serif text-white max-w-2xl mx-auto">
            آیا در پرونده {service.title} نیاز به هم‌فکری و ارزیابی اوراق دارید؟
          </h2>

          <p className="text-xs sm:text-sm text-gray-300 max-w-xl mx-auto leading-relaxed">
            وقت حضوری یا مشاوره برخط با {lawyerName} را همین حالا ثبت فرمایید تا راهکارهای قانونی بدون فوت وقت بررسی شوند.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => onBookConsultation(service.title)}
              className="btn-gold px-6 py-3 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-lg shadow-[#D4AF37]/30 transition-all hover:scale-105"
            >
              <Calendar className="w-4 h-4" />
              <span>رزرو فوری نوبت مشاوره</span>
            </button>

            <a
              href={`tel:${lawyerPhone}`}
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-bold flex items-center gap-2 border border-white/20 transition-all"
            >
              <PhoneCall className="w-4 h-4 text-[#D4AF37]" />
              <span>تماس مستقیم تلفنی ({lawyerPhone})</span>
            </a>
          </div>
        </section>

        {/* ========================================================= */}
        {/* بخش ۸: خدمات حقوقی مرتبط (Related Services - 3 کارت) */}
        {/* ========================================================= */}
        <section className="space-y-4 text-right">
          <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-3">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-6 bg-[#D4AF37] rounded-full"></div>
              <h2 className="text-lg font-bold font-serif text-gray-900 dark:text-white">
                خدمات تخصصی حقوقی مرتبط
              </h2>
            </div>
            <button
              onClick={onBackToServices}
              className="text-xs font-bold text-[#D4AF37] hover:underline"
            >
              مشاهده کلیه خدمات &larr;
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {relatedServices.map((rel) => (
              <div
                key={rel.id}
                className="p-5 rounded-2xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-md space-y-3 flex flex-col justify-between hover:border-[#D4AF37] transition-all group"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{rel.iconEmoji || '⚖️'}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 font-mono">
                      {rel.estimatedFee || 'تعرفه مصوب'}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-[#D4AF37] transition-colors">
                    {rel.title}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
                    {rel.summary}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => onSelectService(rel.id)}
                  className="w-full py-2 rounded-xl bg-gray-50 dark:bg-gray-800 text-xs font-bold text-gray-700 dark:text-gray-300 hover:bg-[#D4AF37] hover:text-[#0B132B] transition-all text-center flex items-center justify-center gap-1.5"
                >
                  <span>مشاهده جزئیات خدمت</span>
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================= */}
        {/* بخش ۹: ناوبری خدمت قبلی و بعدی (Next / Prev Navigation) */}
        {/* ========================================================= */}
        <section className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-200 dark:border-gray-800 pt-6">
          {prevService ? (
            <button
              onClick={() => onSelectService(prevService.id)}
              className="w-full sm:w-auto p-4 rounded-2xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 hover:border-[#D4AF37] flex items-center gap-3 text-right shadow-sm group transition-all"
            >
              <div className="w-9 h-9 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-300 group-hover:text-[#D4AF37]">
                <ArrowRight className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] text-gray-400 block font-semibold">خدمت قبلی:</span>
                <span className="text-xs font-bold text-gray-900 dark:text-white group-hover:text-[#D4AF37] transition-colors line-clamp-1">
                  {prevService.title}
                </span>
              </div>
            </button>
          ) : (
            <div className="hidden sm:block" />
          )}

          {nextService ? (
            <button
              onClick={() => onSelectService(nextService.id)}
              className="w-full sm:w-auto p-4 rounded-2xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 hover:border-[#D4AF37] flex items-center gap-3 text-left shadow-sm group transition-all"
            >
              <div className="text-right">
                <span className="text-[10px] text-gray-400 block font-semibold">خدمت بعدی:</span>
                <span className="text-xs font-bold text-gray-900 dark:text-white group-hover:text-[#D4AF37] transition-colors line-clamp-1">
                  {nextService.title}
                </span>
              </div>
              <div className="w-9 h-9 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-300 group-hover:text-[#D4AF37]">
                <ArrowLeft className="w-4 h-4" />
              </div>
            </button>
          ) : (
            <div className="hidden sm:block" />
          )}
        </section>
      </div>
    </div>
  );
};
