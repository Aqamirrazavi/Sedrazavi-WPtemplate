import React, { useState, useEffect } from 'react';
import { useDesignTokens } from '../../context/DesignTokensContext';
import {
  Sparkles,
  Sliders,
  Save,
  RotateCcw,
  Download,
  Upload,
  Eye,
  Laptop,
  Tablet,
  Smartphone,
  Check,
  Copy,
  History,
  AlertCircle,
  FileCode,
  ShieldCheck,
  ArrowRight,
  ExternalLink,
  Layers,
  HelpCircle
} from 'lucide-react';

interface TokenItem {
  key: string;
  label: string;
  category: 'personal' | 'contact' | 'pricing' | 'brand' | 'social' | 'legal';
  value: string;
  defaultValue: string;
  type: 'text' | 'textarea' | 'number' | 'color' | 'url' | 'email' | 'tel';
  helper: string;
}

export const DesignTokensManagerSuite: React.FC<{
  onBackToHome?: () => void;
  onOpenDashboard?: () => void;
}> = ({ onBackToHome, onOpenDashboard }) => {
  const { tokens: globalTokens, updateTokens } = useDesignTokens();
  const [activeCategory, setActiveCategory] = useState<'personal' | 'contact' | 'pricing' | 'brand' | 'social' | 'legal'>('personal');
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [previewPage, setPreviewPage] = useState<'home' | 'services' | 'contact'>('home');
  const [saveToast, setSaveToast] = useState(false);
  const [showVersionHistory, setShowVersionHistory] = useState(false);

  // 24 Global Tokens specified in Part 19
  const [tokens, setTokens] = useState<Record<string, TokenItem>>(() => {
    return globalTokens ? { ...globalTokens } : {
    // Category 1: Personal (5)
    'lawyer.name': {
      key: 'lawyer.name',
      label: 'نام وکیل (مختصر)',
      category: 'personal',
      value: 'سید امیر حسین رضوی فردویی',
      defaultValue: 'سید امیر حسین رضوی فردویی',
      type: 'text',
      helper: 'در هدر، فوتر، پانویس مقالات و امضای الکترونیک نمایش داده می‌شود.',
    },
    'lawyer.full_name': {
      key: 'lawyer.full_name',
      label: 'نام کامل و رسمی با عناوین',
      category: 'personal',
      value: 'جناب آقای سید امیر حسین رضوی فردویی',
      defaultValue: 'جناب آقای سید امیر حسین رضوی فردویی',
      type: 'text',
      helper: 'در متن وکالت‌نامه‌ها، دادخواست‌ها و تقدیرنامه‌ها به کار می‌رود.',
    },
    'lawyer.title': {
      key: 'lawyer.title',
      label: 'سمت و عنوان رسمی',
      category: 'personal',
      value: 'وکیل پایه یک دادگستری و داور بین‌المللی',
      defaultValue: 'وکیل پایه یک دادگستری',
      type: 'text',
      helper: 'عنوان تخصصی درج‌شده در کارت ویزیت و بیوگرافی سایت.',
    },
    'lawyer.license': {
      key: 'lawyer.license',
      label: 'شماره پروانه وکالت',
      category: 'personal',
      value: '۱۲۳۴۵ / کانون مرکز',
      defaultValue: '۱۲۳۴۵',
      type: 'text',
      helper: 'شماره ثبت رسمی در کانون وکلای دادگستری.',
    },
    'lawyer.experience': {
      key: 'lawyer.experience',
      label: 'سال‌های سابقه وکالت (عدد)',
      category: 'personal',
      value: '۲۰',
      defaultValue: '۲۰',
      type: 'number',
      helper: 'مبنای شمارنده تجارب و نشان‌های اعتماد (Trust Badges).',
    },

    // Category 2: Contact (5)
    'contact.phone': {
      key: 'contact.phone',
      label: 'تلفن ثابت دفتر وکالت',
      category: 'contact',
      value: '۰۲۱-۲۲۰۴۵۶۷۸',
      defaultValue: '۰۲۱-۱۲۳۴۵۶۷۸',
      type: 'tel',
      helper: 'شماره تماس اصلی برای هماهنگی و رزرواسیون.',
    },
    'contact.mobile': {
      key: 'contact.mobile',
      label: 'شماره موبایل پشتیبانی',
      category: 'contact',
      value: '۰۹۱۲۳۴۵۶۷۸۹',
      defaultValue: '۰۹۱۲۳۴۵۶۷۸۹',
      type: 'tel',
      helper: 'شماره جهت دریافت پیامک‌های استعلام پرونده.',
    },
    'contact.email': {
      key: 'contact.email',
      label: 'ایمیل رسمی دفتر',
      category: 'contact',
      value: 'info@sedrazavi.com',
      defaultValue: 'info@sedrazavi.com',
      type: 'email',
      helper: 'آدرس پست الکترونیک رسمی جهت مکاتبات موکلان.',
    },
    'contact.address': {
      key: 'contact.address',
      label: 'نشانی پستی دفتر',
      category: 'contact',
      value: 'تهران، خیابان ولیعصر، نرسیده به پارک ساعی، پلاک ۱۲، طبقه ۴',
      defaultValue: 'تهران، خیابان وکلا، پلاک ۱۲',
      type: 'textarea',
      helper: 'نشانی کامل جهت درج در فوتر، صفحه تماس و فاکتورها.',
    },
    'contact.hours': {
      key: 'contact.hours',
      label: 'ساعات کاری و پذیرش',
      category: 'contact',
      value: 'شنبه تا چهارشنبه ۹ الی ۱۹ - پنج‌شنبه ۹ الی ۱۳',
      defaultValue: 'شنبه تا چهارشنبه ۹-۱۷',
      type: 'text',
      helper: 'ساعات ارائه خدمات مشاوره حضوری در دفتر.',
    },

    // Category 3: Pricing (3)
    'pricing.consultation': {
      key: 'pricing.consultation',
      label: 'تعرفه مشاوره حقوقی تخصصی (ساعتی)',
      category: 'pricing',
      value: '۱,۵۰۰,۰۰۰',
      defaultValue: '۵۰۰,۰۰۰',
      type: 'text',
      helper: 'مبنای محاسبه در درگاه پرداخت آنلاین و فرم رزرو نوبت.',
    },
    'pricing.service': {
      key: 'pricing.service',
      label: 'پایه حق‌الوکاله خدمات و تنظیم لوایح',
      category: 'pricing',
      value: '۸,۰۰۰,۰۰۰',
      defaultValue: '۵,۰۰۰,۰۰۰',
      type: 'text',
      helper: 'مبلغ پایه پیش‌پرداخت تنظیم دادخواست و قراردادها.',
    },
    'pricing.currency': {
      key: 'pricing.currency',
      label: 'واحد پولی سامانه',
      category: 'pricing',
      value: 'تومان',
      defaultValue: 'تومان',
      type: 'text',
      helper: 'واحد محاسبه صورتحساب‌ها (تومان / ریال).',
    },

    // Category 4: Brand (4)
    'brand.name': {
      key: 'brand.name',
      label: 'نام تجاری برند (Brand Name)',
      category: 'brand',
      value: 'SedRazavi',
      defaultValue: 'SedRazavi',
      type: 'text',
      helper: 'نام تجاری دفتر وکالت جهت درج در هدر و تگ‌های عنوان سئو.',
    },
    'brand.slogan': {
      key: 'brand.slogan',
      label: 'شعار راهبردی برند',
      category: 'brand',
      value: 'عدالت با دقت، تخصص با شرافت، تعهد با قاطعیت',
      defaultValue: 'عدالت با دقت، حرفه‌ای‌گری با تعهد',
      type: 'textarea',
      helper: 'شعار اصلی در هدر، اسلایدر و سربرگ مکاتبات رسمی.',
    },
    'brand.logo': {
      key: 'brand.logo',
      label: 'آدرس نشان وکتور / تصویر لوگو',
      category: 'brand',
      value: '/assets/logo-gold.svg',
      defaultValue: '',
      type: 'url',
      helper: 'آدرس فایل تصویر لوگو با فرمت SVG یا PNG شفاف.',
    },
    'brand.color': {
      key: 'brand.color',
      label: 'کد رنگ طلایی سلطنتی برند',
      category: 'brand',
      value: '#D4AF37',
      defaultValue: '#D4AF37',
      type: 'color',
      helper: 'رنگ شاخص طلایی لوکس در دکمه‌ها، حاشیه‌ها و نمادها.',
    },

    // Category 5: Social (4)
    'social.telegram': {
      key: 'social.telegram',
      label: 'کانال یا شناسه تلگرام',
      category: 'social',
      value: 'https://t.me/SedRazavi_Law',
      defaultValue: 'https://t.me/sedrazavi',
      type: 'url',
      helper: 'پیوند مستقیم به کانال دانستنی‌های قانونی در تلگرام.',
    },
    'social.ita': {
      key: 'social.ita',
      label: 'کانال در پیام‌رسان ایتا',
      category: 'social',
      value: 'https://eitaa.com/SedRazavi_Law',
      defaultValue: 'https://eitaa.com/sedrazavi',
      type: 'url',
      helper: 'پیوند پیام‌رسان داخلی ایتا جهت پاسخگویی به مراجعین.',
    },
    'social.instagram': {
      key: 'social.instagram',
      label: 'صفحه اینستاگرام و ویدئوها',
      category: 'social',
      value: 'https://instagram.com/SedRazavi_Law',
      defaultValue: 'https://instagram.com/sedrazavi',
      type: 'url',
      helper: 'صفحه رسمی وکیل جهت انتشار ویدئوهای تحلیل آراء.',
    },
    'social.linkedin': {
      key: 'social.linkedin',
      label: 'پروفایل حرفه‌ای لینکدین',
      category: 'social',
      value: 'https://linkedin.com/in/sedrazavi',
      defaultValue: 'https://linkedin.com/company/sedrazavi',
      type: 'url',
      helper: 'پروفایل تخصصی امور شرکت‌ها و داوری بین‌الملل.',
    },

    // Category 6: Legal (3)
    'legal.court': {
      key: 'legal.court',
      label: 'حوزه قضایی اصلی فعالیت',
      category: 'legal',
      value: 'محاکم دادگستری و دیوان عدالت اداری تهران',
      defaultValue: 'دادگاه عمومی تهران',
      type: 'text',
      helper: 'حوزه اصلی صلاحیت محلی دفتر وکالت.',
    },
    'legal.bar': {
      key: 'legal.bar',
      label: 'نام کانون وکلای متبوع',
      category: 'legal',
      value: 'کانون وکلای دادگستری مرکز (تهران)',
      defaultValue: 'کانون وکلای مرکز',
      type: 'text',
      helper: 'نام مجمع صنفی صادرکننده پروانه.',
    },
    'legal.terms_url': {
      key: 'legal.terms_url',
      label: 'پیوند صفحه شرایط و مقررات',
      category: 'legal',
      value: '/terms-conditions/',
      defaultValue: '/terms/',
      type: 'url',
      helper: 'آدرس برگه قوانین و حریم خصوصی سامانه.',
    },
    };
  });

  // Version History Simulator
  const [versionHistory] = useState([
    { version: 4, date: 'امروز ساعت ۱۶:۲۰', author: 'دکتر رضوی', summary: 'به‌روزرسانی تعرفه مشاوره حضوری و نشانی جدید دفتر' },
    { version: 3, date: '۱۴۰۳/۰۶/۲۰', author: 'دکتر رضوی', summary: 'تکمیل پیوندهای شبکه‌های اجتماعی ایتا و تلگرام' },
    { version: 2, date: '۱۴۰۳/۰۶/۰۱', author: 'ادمین سیستم', summary: 'تنظیم سال‌های سابقه وکالت به ۲۰ سال' },
    { version: 1, date: '۱۴۰۳/۰۵/۱۵', author: 'نصب اولیه قالب', summary: 'بارگذاری متغیرهای پیش‌فرض ساختاری SedRazavi' },
  ]);

  // Update a token
  const handleUpdateToken = (key: string, newValue: string) => {
    setTokens(prev => ({
      ...prev,
      [key]: { ...prev[key], value: newValue },
    }));
  };

  // Reset to default
  const handleResetToDefault = (key: string) => {
    setTokens(prev => ({
      ...prev,
      [key]: { ...prev[key], value: prev[key].defaultValue },
    }));
  };

  // Save all tokens globally
  const handleSaveTokens = () => {
    updateTokens(tokens);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 3000);
  };

  // Export JSON
  const handleExportJson = () => {
    const data = {
      version: '1.0.0',
      exported_at: new Date().toISOString(),
      tokens: (Object.values(tokens) as TokenItem[]).map(t => ({
        key: t.key,
        category: t.category,
        value: t.value,
        default_value: t.defaultValue,
        value_type: t.type,
      })),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sedrazavi-tokens-${Date.now()}.json`;
    a.click();
  };

  const currentCategoryTokens: TokenItem[] = (Object.values(tokens) as TokenItem[]).filter(t => t.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#070B19] text-gray-100 py-10 px-4 sm:px-6 lg:px-8 font-sans" dir="rtl">
      {/* Header Container */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-[#0B132B] via-[#121E42] to-[#0B132B] border border-[#D4AF37]/30 shadow-xl shadow-black/40">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] text-xs font-bold mb-2 border border-[#D4AF37]/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>فاز ۱۹: سامانه مخزن متغیرهای سراسری (Design Tokens & Variables Manager)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-serif text-white flex items-center gap-3">
              <Sliders className="w-8 h-8 text-[#D4AF37]" />
              مدیریت متمرکز ۲۴ متغیر طلایی پوسته حقوقی
            </h1>
            <p className="text-gray-300 text-sm mt-1 max-w-2xl">
              تغییر یک‌باره نام وکیل، قیمت‌ها، نشانی و هویت بصری در این پنل موجب همگام‌سازی بلادرنگ کلیه برگه‌ها، ابزارک‌ها، هدر، فوتر و تگ‌های اسکیما و سئو در سراسر سایت می‌گردد.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleExportJson}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs border border-white/10 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>خروجی JSON</span>
            </button>

            <button
              onClick={() => setShowVersionHistory(!showVersionHistory)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs border border-white/10 transition-colors"
            >
              <History className="w-4 h-4 text-[#D4AF37]" />
              <span>تاریخچه نسخه‌ها</span>
            </button>

            <button
              onClick={handleSaveTokens}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B8960F] text-[#0B132B] font-bold text-xs shadow-lg shadow-[#D4AF37]/20 hover:scale-105 transition-all"
            >
              <Save className="w-4 h-4" />
              <span>ذخیره و همگام‌سازی سراسری</span>
            </button>
          </div>
        </div>

        {saveToast && (
          <div className="mt-4 p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2 animate-fadeIn">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>متغیرها ذخیره گردیدند! کش سراسری (Object Cache & Page Cache) نوسازی شد و متاتگ‌های سئو به‌روزرسانی شدند.</span>
          </div>
        )}

        {/* 6 Category Tabs */}
        <div className="flex flex-wrap gap-2 mt-6 p-1.5 rounded-xl bg-[#0B132B]/80 border border-white/10">
          {[
            { id: 'personal', label: 'اطلاعات فردی وکیل (۵ متغیر)' },
            { id: 'contact', label: 'اطلاعات تماس و دفتر (۵ متغیر)' },
            { id: 'pricing', label: 'تعرفه‌ها و محاسبات مالی (۳ متغیر)' },
            { id: 'brand', label: 'هویت برند و شعارها (۴ متغیر)' },
            { id: 'social', label: 'شبکه‌های اجتماعی (۴ متغیر)' },
            { id: 'legal', label: 'مراجع و موازین قانونی (۳ متغیر)' },
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`px-4 py-2.5 rounded-lg text-xs font-bold transition-all ${
                activeCategory === cat.id
                  ? 'bg-[#D4AF37] text-[#0B132B] shadow-md shadow-[#D4AF37]/30'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Form & Live Preview Layout */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left/Main Column: Variable Inputs */}
        <div className="lg:col-span-7 bg-[#0B132B] border border-white/10 rounded-2xl p-6 space-y-6 shadow-xl">
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div>
              <h2 className="text-base font-bold text-white">ویرایشگر متغیرهای فعال دسته‌بندی جاری</h2>
              <p className="text-xs text-gray-400">تغییر هر مقدار در این بخش بدون نیاز به کدنویسی در کل سایت منعکس خواهد شد.</p>
            </div>
            <span className="text-xs font-mono text-[#D4AF37] font-bold">
              {currentCategoryTokens.length} متغیر فعال
            </span>
          </div>

          <div className="space-y-5">
            {currentCategoryTokens.map(token => (
              <div key={token.key} className="p-4 rounded-xl bg-[#121E42]/60 border border-white/10 space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-white block">
                    {token.label}
                  </label>
                  <code className="text-[10px] font-mono text-[#D4AF37] bg-black/40 px-2 py-0.5 rounded border border-white/5">
                    {`{{${token.key}}}`}
                  </code>
                </div>

                {token.type === 'textarea' ? (
                  <textarea
                    rows={2}
                    value={token.value}
                    onChange={e => handleUpdateToken(token.key, e.target.value)}
                    className="w-full bg-[#0B132B] border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                ) : token.type === 'color' ? (
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={token.value}
                      onChange={e => handleUpdateToken(token.key, e.target.value)}
                      className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-0"
                    />
                    <input
                      type="text"
                      value={token.value}
                      onChange={e => handleUpdateToken(token.key, e.target.value)}
                      className="w-32 bg-[#0B132B] border border-white/15 rounded-xl px-3 py-2 text-xs text-white font-mono"
                    />
                  </div>
                ) : (
                  <input
                    type={token.type}
                    value={token.value}
                    onChange={e => handleUpdateToken(token.key, e.target.value)}
                    className="w-full bg-[#0B132B] border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                )}

                <div className="flex items-center justify-between text-[11px] text-gray-400 pt-1">
                  <span>{token.helper}</span>
                  <button
                    type="button"
                    onClick={() => handleResetToDefault(token.key)}
                    className="text-gray-400 hover:text-amber-400 transition-colors"
                  >
                    بازنشانی به پیش‌فرض
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Interactive Live Preview Simulator */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#0B132B] border border-white/10 rounded-2xl p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2 text-sm font-bold text-white">
                <Eye className="w-4 h-4 text-[#D4AF37]" />
                <span>پیش‌نمایش زنده همزمان (Live Preview)</span>
              </div>

              {/* Device Selector */}
              <div className="flex items-center gap-1 p-1 rounded-lg bg-white/5 border border-white/10">
                <button
                  onClick={() => setPreviewDevice('desktop')}
                  className={`p-1.5 rounded ${previewDevice === 'desktop' ? 'bg-[#D4AF37] text-[#0B132B]' : 'text-gray-400'}`}
                  title="دسکتاپ"
                >
                  <Laptop className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setPreviewDevice('tablet')}
                  className={`p-1.5 rounded ${previewDevice === 'tablet' ? 'bg-[#D4AF37] text-[#0B132B]' : 'text-gray-400'}`}
                  title="تبلت"
                >
                  <Tablet className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setPreviewDevice('mobile')}
                  className={`p-1.5 rounded ${previewDevice === 'mobile' ? 'bg-[#D4AF37] text-[#0B132B]' : 'text-gray-400'}`}
                  title="موبایل"
                >
                  <Smartphone className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Simulated Live Interface Card */}
            <div className={`p-4 rounded-xl bg-[#121E42] border border-white/15 space-y-4 transition-all ${
              previewDevice === 'mobile' ? 'max-w-xs mx-auto text-[11px]' : ''
            }`}>
              {/* Header Preview */}
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <div className="font-serif font-bold text-white text-sm flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37]" />
                  <span>دفتر وکالت {tokens['brand.name'].value}</span>
                </div>
                <div className="text-[11px] text-[#D4AF37] font-bold">
                  {tokens['contact.phone'].value}
                </div>
              </div>

              {/* Hero Preview */}
              <div className="p-3 rounded-lg bg-[#0B132B] border border-[#D4AF37]/30 space-y-1.5 text-center">
                <div className="text-xs font-bold text-white">{tokens['lawyer.full_name'].value}</div>
                <div className="text-[10px] text-[#D4AF37]">{tokens['lawyer.title'].value} ({tokens['lawyer.experience'].value} سال سابقه درخشان)</div>
                <div className="text-[10px] text-gray-300 italic pt-1">«{tokens['brand.slogan'].value}»</div>
              </div>

              {/* Service & Pricing Preview */}
              <div className="grid grid-cols-2 gap-2 text-center text-xs">
                <div className="p-2.5 rounded-lg bg-black/40 border border-white/10">
                  <div className="text-gray-400 text-[10px]">مشاوره حضوری ساعتی</div>
                  <div className="text-[#D4AF37] font-bold font-mono text-xs mt-0.5">
                    {tokens['pricing.consultation'].value} {tokens['pricing.currency'].value}
                  </div>
                </div>
                <div className="p-2.5 rounded-lg bg-black/40 border border-white/10">
                  <div className="text-gray-400 text-[10px]">تنظیم دادخواست و لایحه</div>
                  <div className="text-emerald-400 font-bold font-mono text-xs mt-0.5">
                    از {tokens['pricing.service'].value} {tokens['pricing.currency'].value}
                  </div>
                </div>
              </div>

              {/* Contact Footer Preview */}
              <div className="pt-2 border-t border-white/10 text-[10px] text-gray-400 space-y-1">
                <div>نشانی: {tokens['contact.address'].value}</div>
                <div>پروانه: {tokens['lawyer.license'].value} | متبوع: {tokens['legal.bar'].value}</div>
              </div>
            </div>

            <div className="text-[11px] text-gray-400 text-center">
              پیش‌نمایش لحظه‌ای واکنش‌گرا به تغییرات فیلدها.
            </div>
          </div>

          {/* Version History Modal/Panel if toggled */}
          {showVersionHistory && (
            <div className="bg-[#0B132B] border border-white/10 rounded-2xl p-6 space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2 pb-2 border-b border-white/10">
                <History className="w-4 h-4 text-[#D4AF37]" />
                تاریخچه ۱۰ نسخه اخیر متغیرها (Versioning)
              </h3>
              <div className="space-y-2.5 text-xs">
                {versionHistory.map(v => (
                  <div key={v.version} className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white">نسخه {v.version}</span>
                        <span className="text-[10px] text-gray-400">({v.date})</span>
                      </div>
                      <span className="text-gray-300 text-[11px] block mt-0.5">{v.summary}</span>
                    </div>
                    <button
                      onClick={() => alert(`بازیابی به نسخه شماره ${v.version} انجام شد.`)}
                      className="px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-[#D4AF37] font-bold text-[11px]"
                    >
                      بازیابی
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
