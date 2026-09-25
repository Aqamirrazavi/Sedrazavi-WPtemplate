import React, { useState } from 'react';
import { SERVICES_DATA, PRACTICE_AREAS_DATA } from '../data/mockData';
import {
  Scale,
  Building2,
  Briefcase,
  ShieldAlert,
  Users,
  Globe2,
  FileCode2,
  FileSignature,
  Video,
  BookOpen,
  Calendar,
  ChevronLeft,
  Search,
  Award,
  Sparkles,
  ArrowRight,
  PhoneCall,
  CheckCircle2,
  LayoutGrid,
  Home,
  UserCheck,
  SearchCheck,
  MapPin,
  FileText,
  FileCheck,
  Instagram,
  AlertOctagon,
  KeyRound,
  Calculator,
  Compass,
  Gavel,
  ShieldCheck,
  Binary,
  Layers,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';
import { ThemeViewMode } from './Header';

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectService?: (serviceSlug: string) => void;
  onOpenArticleArchive?: () => void;
  onOpenVideoArchive?: () => void;
  onOpenBooking?: () => void;
  onSelectVideo?: (videoId: string) => void;
  onNavigateView?: (view: ThemeViewMode) => void;
}

export const MegaMenu: React.FC<MegaMenuProps> = ({
  isOpen,
  onClose,
  onSelectService,
  onOpenArticleArchive,
  onOpenVideoArchive,
  onOpenBooking,
  onSelectVideo,
  onNavigateView,
}) => {
  // Active Category State (Digikala-Style sidebar navigation)
  const [activeCategoryId, setActiveCategoryId] = useState<string>('services');

  if (!isOpen) return null;

  // Categories list (Right Sidebar in RTL)
  const CATEGORIES = [
    {
      id: 'services',
      title: 'خدمات و حوزه‌های وکالت',
      subtitle: '۶ دپارتمان تخصصی حقوقی',
      icon: Scale,
      badge: 'اصلی',
      color: 'text-[#D4AF37]',
      bgHover: 'hover:bg-[#D4AF37]/10',
    },
    {
      id: 'frontend-pages',
      title: 'برگه‌ها و صفحات فرانت‌اند',
      subtitle: 'کلیه قالب‌ها و صفحات سایت',
      icon: LayoutGrid,
      badge: '۱۲ برگه',
      color: 'text-blue-500',
      bgHover: 'hover:bg-blue-500/10',
    },
    {
      id: 'corporate',
      title: 'شرکت‌ها، استارتاپ‌ها و قراردادها',
      subtitle: 'ثبت، ادغام، سهام و سرمایه‌گذاری',
      icon: Briefcase,
      badge: 'تخصصی',
      color: 'text-emerald-500',
      bgHover: 'hover:bg-emerald-500/10',
    },
    {
      id: 'real-estate',
      title: 'دعاوی ملکی، ثبتی و سرقفلی',
      subtitle: 'الزام به تنظیم سند، مشارکت و اراضی',
      icon: Building2,
      badge: 'ویژه',
      color: 'text-amber-500',
      bgHover: 'hover:bg-amber-500/10',
    },
    {
      id: 'arbitration',
      title: 'داوری، اینکوترمز و بین‌الملل',
      subtitle: 'داوری تجاری، صادرات و واردات',
      icon: Globe2,
      badge: 'بین‌الملل',
      color: 'text-indigo-500',
      bgHover: 'hover:bg-indigo-500/10',
    },
    {
      id: 'criminal-cyber',
      title: 'کیفری، اقتصادی و سایبری',
      subtitle: 'دادگاه کیفری یک، ادله دیجیتال و رمز ارز',
      icon: ShieldAlert,
      badge: 'فوری',
      color: 'text-rose-500',
      bgHover: 'hover:bg-rose-500/10',
    },
    {
      id: 'family-admin',
      title: 'خانواده، ارث و دیوان اداری',
      subtitle: 'مهریه، انحصار وراثت، شهرداری و ماده ۱۰۰',
      icon: Users,
      badge: 'حمایتی',
      color: 'text-purple-500',
      bgHover: 'hover:bg-purple-500/10',
    },
    {
      id: 'calculators',
      title: 'محاسبات حقوقی و ابزارها',
      subtitle: 'دیه، مهریه به نرخ روز، تمبر مالیاتی',
      icon: Calculator,
      badge: 'هوشمند',
      color: 'text-teal-500',
      bgHover: 'hover:bg-teal-500/10',
    },
  ];

  // Frontend pages list with rich icons and descriptions
  const FRONTEND_PAGES: Array<{
    view: ThemeViewMode;
    title: string;
    description: string;
    icon: any;
    badge: string;
    isPrimary?: boolean;
  }> = [
    {
      view: 'preview',
      title: 'صفحه اصلی (Home Landing)',
      description: 'هیرو اختصاصی، معرفی وکیل، اسلایدر، خدمات و رزرو وقت',
      icon: Home,
      badge: 'اصلی',
      isPrimary: true,
    },
    {
      view: 'about-page',
      title: 'درباره وکیل (About Lawyer)',
      description: 'سوابق قضایی، تحصیلات تکمیلی، مدارک و افتخارات علمی',
      icon: UserCheck,
      badge: 'رزومه',
    },
    {
      view: 'services-page',
      title: 'دپارتمان‌های وکالت (Services)',
      description: 'فهرست جامع ۶ دپارتمان تخصصی همراه تعرفه‌ها و شرایط',
      icon: Scale,
      badge: 'خدمات',
    },
    {
      view: 'tracking-page',
      title: 'پیگیری پرونده (Case Tracking)',
      description: 'استعلام آنلاین وضعیت پرونده، لوایح و آرای صادره',
      icon: SearchCheck,
      badge: 'استعلام',
      isPrimary: true,
    },
    {
      view: 'contact-page',
      title: 'تماس و نشانی (Contact Us)',
      description: 'موقعیت مکانی، تلفن‌های مستقیم، ساعات کاری و نقشه',
      icon: MapPin,
      badge: 'نشانی',
    },
    {
      view: 'archive',
      title: 'آرشیو مقالات و بلاگ (Archive)',
      description: 'مخزن مقالات تخصصی، اخبار حقوقی، دسته‌بندی‌ها و جستجو',
      icon: BookOpen,
      badge: 'وبلاگ',
    },
    {
      view: 'single',
      title: 'تک‌مطلب و دادنامه (Single Post)',
      description: 'نمای کامل مقاله حقوقی همراه نقد دادنامه‌ها و کامنت‌ها',
      icon: FileText,
      badge: 'مطلب',
    },
    {
      view: 'single-service',
      title: 'تک‌خدمت تخصصی (Single Service)',
      description: 'صفحه اختصاصی هر خدمت حقوقی با مراحل اقدام و سوالات',
      icon: FileCheck,
      badge: 'خدمت',
    },
    {
      view: 'instagram-gallery',
      title: 'گالری و رسانه‌ها (Media & Instagram)',
      description: 'ویدیوها، پادکست‌های حقوقی و نکات کلیدی پرونده‌ها',
      icon: Instagram,
      badge: 'ویدیو',
    },
    {
      view: 'not-found',
      title: 'برگه ۴۰۴ اختصاصی (404 Page)',
      description: 'صفحه هدایت خطای ۴۰۴ با جستجوی ایجکس و دسترسی سریع',
      icon: AlertOctagon,
      badge: 'ارور ۴۰۴',
    },
    {
      view: 'dashboard',
      title: 'پرتال موکلین و ورود (Client Portal)',
      description: 'میز کار اختصاصی پرونده‌ها، اسناد و جلسات دادگاه',
      icon: KeyRound,
      badge: 'کارتابل',
      isPrimary: true,
    },
  ];

  const handlePageClick = (view: ThemeViewMode) => {
    if (onNavigateView) {
      onNavigateView(view);
    }
    onClose();
  };

  return (
    <div
      id="desktop-mega-menu"
      onMouseLeave={onClose}
      className="hidden lg:block absolute top-full right-0 left-0 w-full bg-white dark:bg-[#0B132B] shadow-2xl border-b border-[#D4AF37]/30 z-50 transition-all duration-300 animate-in fade-in slide-in-from-top-2 text-right"
    >
      <div className="container mx-auto px-4 sm:px-6 py-6">
        
        {/* Digikala-Style Layout: Right Sidebar + Left Dynamic Content */}
        <div className="grid grid-cols-12 gap-0 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden bg-white dark:bg-[#080E21] shadow-lg">
          
          {/* Right Sidebar: Categories (3 Cols) */}
          <div className="col-span-3 bg-gray-50/80 dark:bg-[#0A1226] border-l border-gray-100 dark:border-gray-800 p-2 space-y-1">
            <div className="px-3 py-2 text-[11px] font-bold text-gray-400 dark:text-gray-500 border-b border-gray-200/60 dark:border-gray-800 mb-2 flex items-center justify-between">
              <span>دسته‌بندی‌های سامانه</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#D4AF37]/10 text-[#D4AF37] font-semibold">
                طرح دیجی‌کالا
              </span>
            </div>

            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategoryId === cat.id;

              return (
                <button
                  key={cat.id}
                  onMouseEnter={() => setActiveCategoryId(cat.id)}
                  onClick={() => setActiveCategoryId(cat.id)}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl text-right transition-all group cursor-pointer ${
                    isActive
                      ? 'bg-white dark:bg-[#0F1C3F] text-[#0B132B] dark:text-white shadow-sm border-r-4 border-r-[#D4AF37] font-bold'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/60 hover:text-[#0B132B] dark:hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110 ${
                        isActive
                          ? 'bg-[#D4AF37]/20 text-[#D4AF37]'
                          : 'bg-gray-200/60 dark:bg-gray-800 text-gray-500 dark:text-gray-400'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 text-right">
                      <div className="text-xs truncate font-bold">
                        {cat.title}
                      </div>
                      <div className="text-[10px] text-gray-400 dark:text-gray-500 truncate">
                        {cat.subtitle}
                      </div>
                    </div>
                  </div>

                  <ChevronLeft
                    className={`w-4 h-4 text-gray-400 transition-transform ${
                      isActive ? 'text-[#D4AF37] -translate-x-1' : 'opacity-40 group-hover:opacity-100'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Left Dynamic Content Area (9 Cols) */}
          <div className="col-span-9 p-6 bg-white dark:bg-[#080E21] min-h-[460px] flex flex-col justify-between">
            
            {/* 1. Category: Front-End Pages (برگه‌ها و صفحات فرانت‌اند) */}
            {activeCategoryId === 'frontend-pages' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
                  <div className="flex items-center gap-2">
                    <LayoutGrid className="w-5 h-5 text-[#D4AF37]" />
                    <h3 className="text-sm font-bold text-[#0B132B] dark:text-white">
                      برگه‌ها و صفحات فرانت‌اند سایت (قالب‌های رسمی حقوقی)
                    </h3>
                  </div>
                  <span className="text-xs text-gray-400">
                    روی هر برگه کلیک کنید تا بلافاصله به آن منتقل شوید
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {FRONTEND_PAGES.map((page) => {
                    const PageIcon = page.icon;
                    return (
                      <button
                        key={page.view}
                        onClick={() => handlePageClick(page.view)}
                        className={`group text-right p-3 rounded-xl border transition-all flex items-start gap-3 cursor-pointer ${
                          page.isPrimary
                            ? 'bg-amber-500/5 hover:bg-amber-500/10 border-amber-500/30 hover:border-[#D4AF37]'
                            : 'bg-gray-50/60 dark:bg-gray-900/60 hover:bg-white dark:hover:bg-gray-800 border-gray-200/80 dark:border-gray-800 hover:border-[#D4AF37]/50 hover:shadow-sm'
                        }`}
                      >
                        <div className="p-2 rounded-lg bg-[#D4AF37]/15 text-[#D4AF37] group-hover:scale-110 group-hover:bg-[#D4AF37] group-hover:text-[#0B132B] transition-all">
                          <PageIcon className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1">
                            <span className="text-xs font-bold text-[#0B132B] dark:text-white group-hover:text-[#D4AF37] transition-colors truncate">
                              {page.title}
                            </span>
                            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 font-semibold shrink-0">
                              {page.badge}
                            </span>
                          </div>
                          <p className="text-[11px] text-gray-500 dark:text-gray-400 line-clamp-2 mt-1 leading-relaxed">
                            {page.description}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 2. Category: Core Services (خدمات و حوزه‌های وکالت) */}
            {activeCategoryId === 'services' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
                  <div className="flex items-center gap-2">
                    <Scale className="w-5 h-5 text-[#D4AF37]" />
                    <h3 className="text-sm font-bold text-[#0B132B] dark:text-white">
                      دپارتمان‌های ۶ گانه وکالت تخصصی دکتر سیده مریم رضوی
                    </h3>
                  </div>
                  <button
                    onClick={() => {
                      if (onNavigateView) onNavigateView('services-page');
                      onClose();
                    }}
                    className="text-xs font-bold text-[#D4AF37] hover:underline flex items-center gap-1"
                  >
                    <span>مشاهده صفحه تمام خدمات</span>
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {SERVICES_DATA.map((service) => (
                    <div
                      key={service.id}
                      onClick={() => {
                        onSelectService?.(service.slug);
                        onClose();
                      }}
                      className="group p-3.5 rounded-xl border border-gray-100 dark:border-gray-800 hover:border-[#D4AF37]/50 bg-gray-50/50 dark:bg-gray-900/50 hover:bg-white dark:hover:bg-gray-800 transition-all cursor-pointer flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-2xl p-1.5 rounded-lg bg-[#D4AF37]/10 group-hover:scale-110 transition-transform">
                            {service.iconEmoji}
                          </span>
                          {service.isFeatured && (
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#D4AF37]/20 text-[#AA820A] dark:text-[#F3E5AB] font-bold">
                              ویژه
                            </span>
                          )}
                        </div>
                        <h4 className="text-xs font-bold text-[#0B132B] dark:text-white group-hover:text-[#D4AF37] transition-colors">
                          {service.title}
                        </h4>
                        <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1 line-clamp-2 leading-relaxed">
                          {service.summary}
                        </p>
                      </div>

                      <div className="mt-3 pt-2 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-[11px] font-bold text-[#D4AF37]">
                        <span>بررسی جزئیات و نوبت</span>
                        <ChevronLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. Category: Corporate (شرکت‌ها و قراردادها) */}
            {activeCategoryId === 'corporate' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-emerald-500" />
                    <h3 className="text-sm font-bold text-[#0B132B] dark:text-white">
                      امور حقوقی شرکت‌ها، استارتاپ‌ها، ادغام و سهام
                    </h3>
                  </div>
                  <span className="text-xs text-emerald-500 font-bold">مشاوره تخصصی بازرگانی</span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 space-y-3">
                    <h4 className="text-xs font-bold text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      خدمات اصلی حقوق شرکت‌ها
                    </h4>
                    <ul className="text-xs text-gray-600 dark:text-gray-300 space-y-2">
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        تنظیم قراردادهای سهامداری (SHA) و اساسنامه‌های اختصاصی
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        طراحی و اعطای سهام تشویقی (ESOP) برای تیم‌های فنی
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        انحلال، ورشکستگی، تصفیه و بطلان تصمیمات مجمع
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        حسابرسی حقوقی پیش از جذب سرمایه (Legal Due Diligence)
                      </li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] font-bold">
                        پکیج شرکتی ویژه
                      </span>
                      <h4 className="text-xs font-bold text-[#0B132B] dark:text-white mt-2">
                        مشاور حقوقی مقیم و همراه سالانه هلدینگ‌ها
                      </h4>
                      <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
                        نظارت مستمر بر قراردادهای تجاری، مکاتبات بین‌المللی و دعاوی اداره کار و تامین اجتماعی.
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        onOpenBooking?.();
                        onClose();
                      }}
                      className="mt-3 w-full py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>رزرو جلسه تخصصی شرکتی</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* 4. Category: Real Estate (ملکی و سرقفلی) */}
            {activeCategoryId === 'real-estate' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-amber-500" />
                    <h3 className="text-sm font-bold text-[#0B132B] dark:text-white">
                      دعاوی تخصصی املاک، سرقفلی، اراضی و مشارکت در ساخت
                    </h3>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50">
                    <div className="font-bold text-xs text-[#0B132B] dark:text-white mb-1">الزام به تنظیم سند رسمی</div>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed">
                      فک رهن، اخذ پایان‌کار، تفکیک سند، تقسیم ترکه و دستور فروش املاک مشاع.
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50">
                    <div className="font-bold text-xs text-[#0B132B] dark:text-white mb-1">سرقفلی و حق کسب و پیشه</div>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed">
                      تعدیل اجاره‌بها، تخلیه به جهت تغییر شغل، تعدی و تفریط و انتقال به غیر.
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50">
                    <div className="font-bold text-xs text-[#0B132B] dark:text-white mb-1">مشارکت در ساخت و ساز</div>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed">
                      داوری اختلافات سازنده و مالک، تاخیر در تحویل، ضمانت‌های اجرایی و پیش‌فروش.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* 5. Category: Arbitration & International (داوری و بین‌الملل) */}
            {activeCategoryId === 'arbitration' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
                  <div className="flex items-center gap-2">
                    <Globe2 className="w-5 h-5 text-indigo-500" />
                    <h3 className="text-sm font-bold text-[#0B132B] dark:text-white">
                      داوری تجاری بین‌المللی، اینکوترمز ۲۰۲۰ و قراردادهای خارجی
                    </h3>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-indigo-500/5 border border-indigo-500/20 space-y-2">
                    <h4 className="text-xs font-bold text-indigo-700 dark:text-indigo-300">
                      قواعد داوری آنسیترال و اتاق بازرگانی بین‌المللی (ICC)
                    </h4>
                    <p className="text-[11px] text-gray-600 dark:text-gray-400 leading-relaxed">
                      قبول داوری سازمانی، ابطال رای داور، اجرای آرای داوری خارجی طبق کنوانسیون نیویورک ۱۹۵۸ در مراجع قضایی ایران.
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-indigo-500/5 border border-indigo-500/20 space-y-2">
                    <h4 className="text-xs font-bold text-indigo-700 dark:text-indigo-300">
                      اینکوترمز ۲۰۲۰ و حمل و نقل بین‌المللی
                    </h4>
                    <p className="text-[11px] text-gray-600 dark:text-gray-400 leading-relaxed">
                      تنظیم قراردادهای خرید FOB، CIF، CFR، بارنامه‌های دریایی، بیمه خسارت مشترک و اعتبارات اسنادی (LC).
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* 6. Category: Criminal & Cyber (کیفری و سایبری) */}
            {activeCategoryId === 'criminal-cyber' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
                  <div className="flex items-center gap-2">
                    <ShieldAlert className="w-5 h-5 text-rose-500" />
                    <h3 className="text-sm font-bold text-[#0B132B] dark:text-white">
                      دفاع تخصصی در دادگاه‌های کیفری یک، جرایم اقتصادی و سایبری
                    </h3>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-xl border border-rose-500/20 bg-rose-500/5">
                    <div className="font-bold text-xs text-rose-700 dark:text-rose-300 mb-1">جرایم کلان اقتصادی</div>
                    <p className="text-[11px] text-gray-600 dark:text-gray-400 leading-relaxed">
                      اختلاس، ارتشاء، اخلال در نظام اقتصادی، پولشویی و قاچاق کالا و ارز در شعب ویژه.
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl border border-rose-500/20 bg-rose-500/5">
                    <div className="font-bold text-xs text-rose-700 dark:text-rose-300 mb-1">سرقت سایبری و بلاک‌چین</div>
                    <p className="text-[11px] text-gray-600 dark:text-gray-400 leading-relaxed">
                      هک ولت، سرقت کریپتوکارنسی، ادله دیجیتال، دسترسی غیرمجاز و کلاهبرداری اینترنتی.
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl border border-rose-500/20 bg-rose-500/5">
                    <div className="font-bold text-xs text-rose-700 dark:text-rose-300 mb-1">دادسرا و دادگاه تجدیدنظر</div>
                    <p className="text-[11px] text-gray-600 dark:text-gray-400 leading-relaxed">
                      تنظیم لوایح اعتراضی، قرارهای تامین کیفری، وثیقه و درخواست اعمال ماده ۴۷۷.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* 7. Category: Family & Admin Court (خانواده و دیوان اداری) */}
            {activeCategoryId === 'family-admin' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-purple-500" />
                    <h3 className="text-sm font-bold text-[#0B132B] dark:text-white">
                      دعاوی خانواده، مهریه، انحصار وراثت و دیوان عدالت اداری
                    </h3>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-purple-500/5 border border-purple-500/20 space-y-2">
                    <h4 className="text-xs font-bold text-purple-700 dark:text-purple-300">حقوق خانواده و ماترک</h4>
                    <p className="text-[11px] text-gray-600 dark:text-gray-400 leading-relaxed">
                      مهریه از طریق اجرای ثبت، طلاق توافقی سریع، حضانت، نفی ولد، تحریر و تقسیم ترکه و وصیت‌نامه رسمی.
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-purple-500/5 border border-purple-500/20 space-y-2">
                    <h4 className="text-xs font-bold text-purple-700 dark:text-purple-300">دیوان عدالت اداری</h4>
                    <p className="text-[11px] text-gray-600 dark:text-gray-400 leading-relaxed">
                      اعتراض به آرای کمیسیون ماده ۱۰۰ شهرداری، گزینش، تخلفات اداری، تامین اجتماعی و ابطال بخشنامه‌های دولتی.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* 8. Category: Calculators (ابزارهای محاسباتی) */}
            {activeCategoryId === 'calculators' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
                  <div className="flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-teal-500" />
                    <h3 className="text-sm font-bold text-[#0B132B] dark:text-white">
                      ماشین‌حساب‌های قضایی آنلاین و هوشمند
                    </h3>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-xl border border-teal-500/20 bg-teal-500/5">
                    <div className="font-bold text-xs text-teal-800 dark:text-teal-300 mb-1">محاسبه دیه اعضا ۱۴۰۳</div>
                    <p className="text-[11px] text-gray-600 dark:text-gray-400 leading-relaxed">
                      محاسبه دقیق دیه ماه حرام، نقص عضو، ارش و جراحات مطابق نرخ مصوب قوه قضائیه.
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl border border-teal-500/20 bg-teal-500/5">
                    <div className="font-bold text-xs text-teal-800 dark:text-teal-300 mb-1">مهریه به نرخ روز بانک مرکزی</div>
                    <p className="text-[11px] text-gray-600 dark:text-gray-400 leading-relaxed">
                      فرمول تورم شاخص بهای کالاها برای تبدیل وجه رایج به ارزش روز وصول.
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl border border-teal-500/20 bg-teal-500/5">
                    <div className="font-bold text-xs text-teal-800 dark:text-teal-300 mb-1">هزینه دادرسی و تمبر وکالت</div>
                    <p className="text-[11px] text-gray-600 dark:text-gray-400 leading-relaxed">
                      تعیین هزینه ثبت دادخواست در دادگاه بدوی، تجدیدنظر و فرجام‌خواهی.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Bar inside Mega Menu: Quick Assistance & Booking CTA */}
            <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-[#D4AF37] flex items-center justify-center">
                  <PhoneCall className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-[#0B132B] dark:text-white">
                    نیاز به راهنمایی در انتخاب خدمت حقوقی دارید؟
                  </span>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400">
                    پشتیبانی پذیرش دفتر وکالت: ۰۲۱-۸۸۸۸۸۸۸۸ | شنبه تا چهارشنبه ۹ الی ۱۹
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    if (onNavigateView) onNavigateView('tracking-page');
                    onClose();
                  }}
                  className="px-3.5 py-2 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-[#D4AF37] text-gray-700 dark:text-gray-300 text-xs font-bold transition-colors"
                >
                  استعلام پرونده
                </button>

                <button
                  onClick={() => {
                    onOpenBooking?.();
                    onClose();
                  }}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#AA820A] text-[#0B132B] font-bold text-xs shadow-md shadow-[#D4AF37]/20 hover:shadow-lg transition-all"
                >
                  رزرو وقت مشاوره فوری
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
