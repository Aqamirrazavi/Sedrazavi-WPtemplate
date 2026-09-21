import React, { useState } from 'react';
import {
  ShieldAlert,
  Eye,
  EyeOff,
  Lock,
  Search,
  FileCode,
  Globe,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ExternalLink,
  Filter,
  Ban,
  Layers,
  Sparkles,
  SlidersHorizontal,
  Code2,
  Download,
  Database,
  Terminal,
  Server
} from 'lucide-react';

interface AdminPageItem {
  id: string;
  slug: string;
  title: string;
  category: 'templates' | 'system' | 'security' | 'tools';
  description: string;
  capability: string;
  isHiddenInPublic: boolean;
  isNoindex: boolean;
  isExcludedFromSearch: boolean;
  status: 'protected' | 'active';
}

export const AdminPagesProtectionSuite: React.FC<{
  onBackToHome?: () => void;
  onOpenDashboard?: () => void;
}> = ({ onBackToHome, onOpenDashboard }) => {
  // Global Mode State: 'public' vs 'admin'
  const [uiMode, setUiMode] = useState<'public' | 'admin'>('admin');

  // Search simulator
  const [searchQuery, setSearchQuery] = useState('');
  const [testUrlInput, setTestUrlInput] = useState('/architecture/');
  const [simulatedRedirectResult, setSimulatedRedirectResult] = useState<string | null>(null);

  // 12 Exact Admin Pages from Part 18 specification
  const [adminPages, setAdminPages] = useState<AdminPageItem[]>([
    {
      id: '1',
      slug: '/templates/',
      title: 'قالب‌های المنتور (Templates)',
      category: 'templates',
      description: 'مدیریت و پیکربندی ساختار قالب‌های Theme Builder المنتور',
      capability: 'manage_options',
      isHiddenInPublic: true,
      isNoindex: true,
      isExcludedFromSearch: true,
      status: 'protected',
    },
    {
      id: '2',
      slug: '/architecture/',
      title: 'معماری پروژه (System Architecture)',
      category: 'system',
      description: 'مستندات فنی، پایگاه داده، گراف داده‌ها و ساختار کلان نرم‌افزار',
      capability: 'manage_options',
      isHiddenInPublic: true,
      isNoindex: true,
      isExcludedFromSearch: true,
      status: 'protected',
    },
    {
      id: '3',
      slug: '/security/',
      title: 'امنیت پیشرفته (Security & Encryption)',
      category: 'security',
      description: 'تنظیمات ضد هک، کنترل هش‌ها، انقضای رمز و لاگ‌های امنیتی',
      capability: 'manage_options',
      isHiddenInPublic: true,
      isNoindex: true,
      isExcludedFromSearch: true,
      status: 'protected',
    },
    {
      id: '4',
      slug: '/shortcodes/',
      title: 'شورت‌کدها (Shortcodes Hub)',
      category: 'tools',
      description: 'هاب اختصاصی ۱۵ کد کوتاه داینامیک و امن پوسته وکالت',
      capability: 'manage_options',
      isHiddenInPublic: true,
      isNoindex: true,
      isExcludedFromSearch: true,
      status: 'protected',
    },
    {
      id: '5',
      slug: '/download-zip/',
      title: 'دانلود پکیج ZIP قالب و افزونه',
      category: 'tools',
      description: 'بیلد و فشرده‌سازی پکیج استاندارد نصبی در وردپرس',
      capability: 'manage_options',
      isHiddenInPublic: true,
      isNoindex: true,
      isExcludedFromSearch: true,
      status: 'protected',
    },
    {
      id: '6',
      slug: '/docs/',
      title: 'مستندات فنی توسعه‌دهندگان',
      category: 'system',
      description: 'راهنمای توابع هسته، هوک‌ها و فیلترهای استاندارد پوسته',
      capability: 'manage_options',
      isHiddenInPublic: true,
      isNoindex: true,
      isExcludedFromSearch: true,
      status: 'protected',
    },
    {
      id: '7',
      slug: '/system-status/',
      title: 'وضعیت سلامت سیستم و هاستینگ',
      category: 'system',
      description: 'مشخصات سرور، نسخه PHP، محدودیت حافظه و ماژول‌های فعال',
      capability: 'manage_options',
      isHiddenInPublic: true,
      isNoindex: true,
      isExcludedFromSearch: true,
      status: 'protected',
    },
    {
      id: '8',
      slug: '/backup/',
      title: 'پشتیبان‌گیری و بازیابی داده‌ها',
      category: 'tools',
      description: 'مدیریت بک‌آپ‌های دیتابیس و فایل‌های پرونده‌های موکلین',
      capability: 'manage_options',
      isHiddenInPublic: true,
      isNoindex: true,
      isExcludedFromSearch: true,
      status: 'protected',
    },
    {
      id: '9',
      slug: '/logs/',
      title: 'لاگ‌ها و رویدادهای سیستمی',
      category: 'security',
      description: 'ردگیری خطاهای PHP، لاگ پیامک‌ها و نشست‌های ورود',
      capability: 'manage_options',
      isHiddenInPublic: true,
      isNoindex: true,
      isExcludedFromSearch: true,
      status: 'protected',
    },
    {
      id: '10',
      slug: '/analytics/',
      title: 'آمار فنی و ترافیک سرور',
      category: 'system',
      description: 'تحلیل بار سرور، زمان پاسخگویی API و حجم پایگاه داده',
      capability: 'manage_options',
      isHiddenInPublic: true,
      isNoindex: true,
      isExcludedFromSearch: true,
      status: 'protected',
    },
    {
      id: '11',
      slug: '/advanced-settings/',
      title: 'تنظیمات پیشرفته و دیباگ هسته',
      category: 'system',
      description: 'پیکربندی هوک‌های عمیق، کشینگ ابری و حالت توسعه',
      capability: 'manage_options',
      isHiddenInPublic: true,
      isNoindex: true,
      isExcludedFromSearch: true,
      status: 'protected',
    },
    {
      id: '12',
      slug: '/debug/',
      title: 'ابزارهای اشکال‌زدایی (Debug Tools)',
      category: 'tools',
      description: 'بررسی کوئری‌های دیتابیس و شبیه‌سازی وب‌هوک‌ها',
      capability: 'manage_options',
      isHiddenInPublic: true,
      isNoindex: true,
      isExcludedFromSearch: true,
      status: 'protected',
    },
  ]);

  // Test Direct URL Access & Redirect
  const handleTestUrlAccess = () => {
    const trimmed = testUrlInput.trim().toLowerCase();
    const matched = adminPages.find(p => p.slug.toLowerCase().includes(trimmed) || trimmed.includes(p.slug.toLowerCase()));

    if (!matched) {
      setSimulatedRedirectResult(`آدرس "${testUrlInput}" یک برگه عمومی است و برای همه کاربران آزادانه رندر می‌شود.`);
      return;
    }

    if (uiMode === 'admin') {
      setSimulatedRedirectResult(`✅ احراز هویت موفق: شما با نقش ادمین (manage_options) لاگین هستید. برگه "${matched.title}" بدون مانع نمایش داده می‌شود.`);
    } else {
      setSimulatedRedirectResult(`🚫 دسترسی مسدود شد: به عنوان کاربر عمومی (Public Mode)، این صفحه از منوها و دسترسی مستقیم فیلتر است. کاربر فوراً با کد HTTP 302 به صفحه لاگین (/login/?redirect_to=${encodeURIComponent(matched.slug)}) یا صفحه ۴۰۴ ریدایرکت می‌گردد.`);
    }
  };

  // Search Results Simulation
  const simulatedPublicSearchResults = [
    { title: 'مشاوره حقوقی تخصصی دعاوی ملکی', type: 'خدمت حقوقی', url: '/services/real-estate/' },
    { title: 'نحوه مطالبه مهریه با نرخ روز تورم', type: 'مقاله آموزشی', url: '/articles/mehrieh-inflation/' },
    { title: 'سامانه استعلام وضعیت پرونده‌های مطروحه', type: 'ابزار موکل', url: '/case-tracking/' },
  ];

  const simulatedAdminSearchResults = [
    ...simulatedPublicSearchResults,
    { title: 'معماری پروژه و گراف پایگاه داده', type: 'برگه فنی ادمین', url: '/architecture/' },
    { title: 'تنظیمات امنیتی، رمزنگاری و لاگ‌ها', type: 'برگه فنی ادمین', url: '/security/' },
  ];

  return (
    <div className="min-h-screen bg-[#070B19] text-gray-100 py-10 px-4 sm:px-6 lg:px-8 font-sans" dir="rtl">
      {/* Mode Status Banner if in Admin Mode */}
      {uiMode === 'admin' && (
        <div className="max-w-6xl mx-auto mb-6 p-3 rounded-xl bg-[#8B0000]/30 border border-[#8B0000] text-white flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
            <span className="font-bold">⚠️ حالت ادمین (Admin Mode) فعال است:</span>
            <span className="text-gray-200">صفحات فنی و مدیریتی در مگامنو و نوار ابزار قابل مشاهده هستند.</span>
          </div>

          <button
            onClick={() => setUiMode('public')}
            className="px-3 py-1 rounded-lg bg-white text-[#8B0000] font-bold text-xs hover:bg-gray-100 transition-colors"
          >
            تغییر به حالت عمومی (Public Mode)
          </button>
        </div>
      )}

      {/* Header Container */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-[#0B132B] via-[#121E42] to-[#0B132B] border border-[#D4AF37]/30 shadow-xl shadow-black/40">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] text-xs font-bold mb-2 border border-[#D4AF37]/20">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>فاز ۱۸: مخفی‌سازی صفحات ادمین و سوئیچر حالت UI (Mode-Based UI)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-serif text-white flex items-center gap-3">
              <Lock className="w-8 h-8 text-[#D4AF37]" />
              حفاظت از صفحات فنی ادمین و فیلترینگ جامع مگامنو
            </h1>
            <p className="text-gray-300 text-sm mt-1 max-w-2xl">
              پنهان‌سازی ۱۲ صفحه اختصاصی ادمین از دید موکلین، اعمال متاتگ‌های Noindex جهت صیانت از سئو، فیلتر نتایج جستجوی سایت و ممانعت از دسترسی مستقیم با ریدایرکت امن.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* UI Mode Toggle Button */}
            <div className="flex items-center p-1 rounded-xl bg-[#0B132B] border border-white/20">
              <button
                onClick={() => setUiMode('public')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  uiMode === 'public'
                    ? 'bg-emerald-600 text-white shadow'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                حالت عمومی (Public)
              </button>
              <button
                onClick={() => setUiMode('admin')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  uiMode === 'admin'
                    ? 'bg-[#8B0000] text-white shadow'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                حالت ادمین (Admin)
              </button>
            </div>

            {onBackToHome && (
              <button
                onClick={onBackToHome}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs border border-white/10 transition-colors"
              >
                صفحه اصلی
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Grid: 12 Protected Admin Pages */}
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="bg-[#0B132B] border border-white/10 rounded-2xl p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <FileCode className="w-5 h-5 text-[#D4AF37]" />
                فهرست ۱۲ صفحه ادمین حفاظت‌شده (Admin-Only Pages Registry)
              </h2>
              <p className="text-xs text-gray-400 mt-0.5">
                این صفحات فقط با سطح دسترسی <code className="text-[#D4AF37]">manage_options</code> و در حالت ادمین لود شده و از دید موتورهای جستجو و عموم مخفی هستند.
              </p>
            </div>

            <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-bold">
              فیلتر هوشمند مگامنو فعال
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {adminPages.map(page => (
              <div
                key={page.id}
                className="p-4 rounded-xl bg-[#121E42]/60 border border-white/10 hover:border-[#D4AF37]/30 transition-all space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[#D4AF37]">{page.slug}</span>
                  <span className="px-2 py-0.5 rounded bg-rose-500/15 text-rose-400 border border-rose-500/25 text-[10px] font-bold">
                    مخفی در عموم
                  </span>
                </div>

                <div className="font-bold text-sm text-white">{page.title}</div>
                <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">{page.description}</p>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-gray-400">
                  <span>مجوز: <code className="text-gray-300 font-mono">{page.capability}</code></span>
                  <span className="text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Noindex
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Protection Mechanics: Search, URL Redirect & SEO */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Section A: Search Filtering Simulator */}
          <div className="bg-[#0B132B] border border-white/10 rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-white/10">
              <Search className="w-5 h-5 text-[#D4AF37]" />
              <h3 className="text-sm font-bold text-white">شبیه‌ساز فیلتر جستجوی سایت (Search Filtering)</h3>
            </div>

            <p className="text-xs text-gray-300 leading-relaxed">
              اگر کاربری در فرانت‌اند کلماتی مانند «امنیت»، «معماری» یا «شورت‌کد» را جستجو نماید، قلاب <code className="text-[#D4AF37]">pre_get_posts</code> برگه‌های ادمین را حذف نموده و فقط مقالات و خدمات قانونی نمایش داده می‌شوند:
            </p>

            <div className="p-4 rounded-xl bg-[#121E42] border border-white/10 space-y-3 text-xs">
              <div className="flex items-center justify-between text-gray-400">
                <span>وضعیت فعلی شما:</span>
                <span className={`font-bold ${uiMode === 'admin' ? 'text-rose-400' : 'text-emerald-400'}`}>
                  {uiMode === 'admin' ? 'ادمین سیستم (مشاهده همه نتایج)' : 'کاربر عادی (فیلترینگ کامل صفحات فنی)'}
                </span>
              </div>

              <div className="space-y-2">
                <span className="text-[11px] text-gray-400 block">نتایج جستجوی نمونه برای «امنیت و پرونده‌ها»:</span>
                {(uiMode === 'admin' ? simulatedAdminSearchResults : simulatedPublicSearchResults).map((item, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-[#0B132B] border border-white/5 flex items-center justify-between">
                    <div>
                      <span className="text-white font-medium block">{item.title}</span>
                      <span className="text-[10px] text-gray-400">{item.url}</span>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      item.type.includes('ادمین') ? 'bg-rose-500/20 text-rose-400' : 'bg-blue-500/20 text-blue-400'
                    }`}>
                      {item.type}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Section B: Direct URL Access & Redirect */}
          <div className="bg-[#0B132B] border border-white/10 rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-white/10">
              <Globe className="w-5 h-5 text-[#D4AF37]" />
              <h3 className="text-sm font-bold text-white">تست دسترسی مستقیم به URL (URL Protection & Redirect)</h3>
            </div>

            <p className="text-xs text-gray-300 leading-relaxed">
              اگر کاربری آدرس صفحه فنی ادمین را مستقیماً در نوار آدرس مرورگر وارد کند، هوک <code className="text-[#D4AF37]">template_redirect</code> مجوز کاربر را بررسی کرده و در صورت فقدان دسترسی فوراً اقدام به ریدایرکت امن می‌نماید:
            </p>

            <div className="space-y-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={testUrlInput}
                  onChange={e => setTestUrlInput(e.target.value)}
                  className="flex-1 bg-[#121E42] border border-white/20 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono"
                  placeholder="/architecture/"
                />
                <button
                  onClick={handleTestUrlAccess}
                  className="px-4 py-2.5 rounded-xl bg-[#D4AF37] text-[#0B132B] font-bold text-xs hover:scale-105 transition-all"
                >
                  تست دسترسی
                </button>
              </div>

              {simulatedRedirectResult && (
                <div className="p-3.5 rounded-xl bg-black/40 border border-white/15 text-xs text-gray-200 leading-relaxed">
                  {simulatedRedirectResult}
                </div>
              )}
            </div>

            {/* SEO Safeguards Checklist */}
            <div className="p-4 rounded-xl bg-[#121E42]/60 border border-white/10 space-y-2 text-xs">
              <span className="font-bold text-[#D4AF37] block">سپرهای امنیتی SEO و حریم خصوصی:</span>
              <ul className="space-y-1.5 text-gray-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>متاتگ <code className="text-gray-200 font-mono">noindex, nofollow, noarchive</code> در هدر تمام ۱۲ برگه.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>دستورات <code className="text-gray-200 font-mono">Disallow: /slug/</code> در فایل robots.txt.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>حذف کامل صفحات از نقشه‌های سایت (XML Sitemaps) و فیدهای RSS.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
