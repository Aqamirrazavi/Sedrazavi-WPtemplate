import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  SlidersHorizontal,
  X,
  Mic,
  Clock,
  TrendingUp,
  FileText,
  Briefcase,
  Users,
  Award,
  HelpCircle,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  Sparkles,
  MessageCircle,
  Calendar,
  CheckCircle2,
  Filter
} from 'lucide-react';

interface SearchResultItem {
  id: string;
  title: string;
  excerpt: string;
  category: 'articles' | 'services' | 'lawyers' | 'cases' | 'faqs';
  specialty: 'ملکی' | 'کیفری' | 'خانواده' | 'تجاری' | 'دیوان';
  date: string;
  readTime?: string;
  url: string;
}

export const AdvancedAjaxSearchSuite: React.FC<{
  onBackToHome?: () => void;
  onOpenDashboard?: () => void;
}> = ({ onBackToHome, onOpenDashboard }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedTerm, setDebouncedTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'relevance' | 'date' | 'views'>('relevance');
  const [isListening, setIsListening] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Trending Queries & History
  const [trendingQueries] = useState([
    'الزام به تنظیم سند رسمی ملک',
    'چک صیادی و مسدودی حساب',
    'طلاق توافقی در دوران عقد',
    'داوری در قراردادهای تجاری',
    'حق‌الوکاله دعاوی ملکی',
  ]);

  const [searchHistory, setSearchHistory] = useState([
    'توقیف اموال برای مهریه',
    'خیارات در معامله فضولی',
  ]);

  // Comprehensive Mock Database of Legal Content
  const allContent: SearchResultItem[] = [
    {
      id: '1',
      title: 'راهنمای جامع دعوای الزام به تنظیم سند رسمی املاک مسکونی و تجاری',
      excerpt: 'بررسی ارکان دعوی، استعلامات ثبتی از اداره ثبت اسناد، جریمه تاخیر تادیه و نحوه مواجهه با املاک دارای رهن بانکی.',
      category: 'articles',
      specialty: 'ملکی',
      date: '۲ روز پیش',
      readTime: '۸ دقیقه مطالعه',
      url: '/articles/official-deed-enforcement/',
    },
    {
      id: '2',
      title: 'وکالت در دعاوی خلع ید، تصرف عدوانی و ممانعت از حق',
      excerpt: 'خدمات تخصصی در حوزه تصرفات غیرقانونی، دعاوی تصرف کیفری و حقوقی و صدور دستور موقت فوری رفع تصرف.',
      category: 'services',
      specialty: 'ملکی',
      date: '۱ هفته پیش',
      url: '/services/real-estate-possession/',
    },
    {
      id: '3',
      title: 'دکتر علیرضا افشار - متخصص دعاوی ملکی و اراضی ملی',
      excerpt: 'وکیل پایه یک دادگستری با ۱۵ سال سابقه وکالت در کمیسیون‌های ماده ۱۰۰ و ۵۶ منابع طبیعی.',
      category: 'lawyers',
      specialty: 'ملکی',
      date: 'فعال',
      url: '/lawyers/alireza-afshar/',
    },
    {
      id: '4',
      title: 'پیروزی در پرونده ابطال سند معارض ۶۰ هکتاری در منطقه لواسانات',
      excerpt: 'دفاع موفق در شعبه ۱۲ دادگاه تجدیدنظر استان تهران و اثبات جعل مادی و معنوی در مبایعه‌نامه معارض.',
      category: 'cases',
      specialty: 'ملکی',
      date: '۱ ماه پیش',
      url: '/cases/lavasan-land-dispute/',
    },
    {
      id: '5',
      title: 'اگر فروشنده سند را به نام نزند، چه مراحلی باید طی شود؟',
      excerpt: 'نخستین گام اخذ گواهی عدم حضور از دفترخانه اسناد رسمی در روز و ساعت مقرر در مبایعه‌نامه است.',
      category: 'faqs',
      specialty: 'ملکی',
      date: '۳ روز پیش',
      url: '/faq/seller-no-attendance-certificate/',
    },
    {
      id: '6',
      title: 'قوانین جدید وصول چک صیادی و نحوه صدور اجراییه مستقیم از دادگاه',
      excerpt: 'بر اساس ماده ۲۳ قانون جدید صدور چک، نیازی به تقدیم دادخواست ماهوی و دادرسی طولانی نیست و اجراییه مستقیماً صادر می‌شود.',
      category: 'articles',
      specialty: 'تجاری',
      date: '۵ روز پیش',
      readTime: '۶ دقیقه مطالعه',
      url: '/articles/sayad-check-enforcement/',
    },
    {
      id: '7',
      title: 'وکالت تخصصی داوری و دعاوی قراردادهای مشارکت در ساخت و سرمایه‌گذاری',
      excerpt: 'تنظیم شروط داوری منجز، حل اختلافات سازندگان و مالکان و وصول خسارات تاخیر در تحویل واحدهای پیش‌فروش.',
      category: 'services',
      specialty: 'تجاری',
      date: '۲ هفته پیش',
      url: '/services/commercial-arbitration/',
    },
    {
      id: '8',
      title: 'مراحل ثبت طلاق توافقی و مشاوره بهزیستی در سال ۱۴۰۳',
      excerpt: 'ثبت‌نام در سامانه تصمیم، جلسات مشاوره اجباری غربالگری، تنظیم توافق‌نامه جامع مهریه، نفقه و حضانت فرزندان.',
      category: 'articles',
      specialty: 'خانواده',
      date: '۱۰ روز پیش',
      readTime: '۱۰ دقیقه مطالعه',
      url: '/articles/consensual-divorce-protocol/',
    },
  ];

  // Debounce handling (300ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Keyboard shortcut Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Filter & Search Engine
  const filteredResults = allContent.filter(item => {
    // Search query matching
    if (debouncedTerm.trim()) {
      const q = debouncedTerm.toLowerCase();
      const matchesTitle = item.title.toLowerCase().includes(q);
      const matchesExcerpt = item.excerpt.toLowerCase().includes(q);
      const matchesSpecialty = item.specialty.toLowerCase().includes(q);
      if (!matchesTitle && !matchesExcerpt && !matchesSpecialty) return false;
    }

    // Category filter
    if (selectedCategory !== 'all' && item.category !== selectedCategory) {
      return false;
    }

    // Specialty filter
    if (selectedSpecialty !== 'all' && item.specialty !== selectedSpecialty) {
      return false;
    }

    return true;
  });

  // Simulated Voice Search
  const toggleVoiceSearch = () => {
    if (isListening) {
      setIsListening(false);
    } else {
      setIsListening(true);
      setTimeout(() => {
        setSearchTerm('الزام به تنظیم سند');
        setIsListening(false);
      }, 2000);
    }
  };

  // Helper for category badge
  const getCategoryBadge = (cat: string) => {
    switch (cat) {
      case 'articles':
        return { label: 'مقاله حقوقی', color: 'text-blue-400 bg-blue-500/10 border-blue-500/20', icon: FileText };
      case 'services':
        return { label: 'خدمت وکالت', color: 'text-[#D4AF37] bg-[#D4AF37]/10 border-[#D4AF37]/20', icon: Briefcase };
      case 'lawyers':
        return { label: 'وکیل متخصص', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20', icon: Users };
      case 'cases':
        return { label: 'نمونه رأی موفق', color: 'text-purple-400 bg-purple-500/10 border-purple-500/20', icon: Award };
      case 'faqs':
        return { label: 'پرسش و پاسخ', color: 'text-amber-400 bg-amber-500/10 border-amber-500/20', icon: HelpCircle };
      default:
        return { label: 'عمومی', color: 'text-gray-400 bg-gray-500/10 border-gray-500/20', icon: FileText };
    }
  };

  return (
    <div className="min-h-screen bg-[#070B19] text-gray-100 py-10 px-4 sm:px-6 lg:px-8 font-sans" dir="rtl">
      {/* Header Container */}
      <div className="max-w-5xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-[#0B132B] via-[#121E42] to-[#0B132B] border border-[#D4AF37]/30 shadow-xl shadow-black/40">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] text-xs font-bold mb-2 border border-[#D4AF37]/20">
              <Search className="w-3.5 h-3.5" />
              <span>فاز ۲۰: سامانه پیشرفته جستجو و فیلتر آژاکس (AJAX Instant Search)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-serif text-white flex items-center gap-3">
              <Sparkles className="w-8 h-8 text-[#D4AF37]" />
              کاوشگر هوشمند لوایح، مقالات، خدمات و وکلای دادگستری
            </h1>
            <p className="text-gray-300 text-sm mt-1 max-w-2xl">
              جستجوی آنی آژاکس با کلید میانبر <kbd className="px-2 py-0.5 rounded bg-black/50 text-[#D4AF37] border border-white/10 font-mono text-xs">Ctrl + K</kbd>، فیلترهای چندلایه تخصصی، جستجوی صوتی و تفکیک ۵ دسته‌بندی محتوایی.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {onBackToHome && (
              <button
                onClick={onBackToHome}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs border border-white/10 transition-colors"
              >
                صفحه اصلی
              </button>
            )}
            {onOpenDashboard && (
              <button
                onClick={onOpenDashboard}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B8960F] text-[#0B132B] font-bold text-xs shadow-md shadow-[#D4AF37]/20 hover:scale-105 transition-all"
              >
                میز کار وکیل
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Search Bar Box */}
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="relative bg-[#0B132B] border-2 border-[#D4AF37]/40 rounded-2xl p-2 sm:p-3 shadow-2xl focus-within:border-[#D4AF37] transition-all">
          <div className="flex items-center gap-3">
            <Search className="w-6 h-6 text-[#D4AF37] mr-2 flex-shrink-0" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="جستجو در مواد قانون، موضوع دعوی (ملکی، چک، طلاق)، اسامی وکلا و مقالات..."
              className="w-full bg-transparent text-white text-sm sm:text-base placeholder-gray-400 focus:outline-none py-2"
            />

            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                title="پاک کردن"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            {/* Voice Search Button */}
            <button
              onClick={toggleVoiceSearch}
              className={`p-2 rounded-xl border transition-all ${
                isListening
                  ? 'bg-rose-600 text-white border-rose-500 animate-pulse'
                  : 'bg-white/5 text-gray-300 border-white/10 hover:bg-white/10 hover:text-[#D4AF37]'
              }`}
              title="جستجوی صوتی حقوقی"
            >
              <Mic className="w-4 h-4" />
            </button>
          </div>

          {isListening && (
            <div className="text-center py-2 text-xs font-bold text-rose-400 animate-pulse border-t border-white/10 mt-2">
              🎙️ در حال شنیدن صدای شما... (مثلاً بگویید: «الزام به تنظیم سند»)
            </div>
          )}
        </div>

        {/* Trending Searches & History Tags */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-gray-400 flex items-center gap-1.5 font-medium">
            <TrendingUp className="w-3.5 h-3.5 text-[#D4AF37]" />
            بیشترین جستجوهای حقوقی امروز:
          </span>
          {trendingQueries.map((query, idx) => (
            <button
              key={idx}
              onClick={() => setSearchTerm(query)}
              className="px-3 py-1 rounded-lg bg-[#0B132B] hover:bg-[#121E42] text-gray-300 hover:text-[#D4AF37] border border-white/10 transition-colors"
            >
              {query}
            </button>
          ))}
        </div>

        {/* Faceted Filters Toolbar */}
        <div className="bg-[#0B132B] border border-white/10 rounded-2xl p-4 sm:p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
            <div className="flex items-center gap-2 text-xs font-bold text-white">
              <SlidersHorizontal className="w-4 h-4 text-[#D4AF37]" />
              <span>فیلترهای تخصصی و دسته‌بندی‌ها</span>
            </div>

            <span className="text-xs text-[#D4AF37] font-semibold">
              {filteredResults.length} مورد یافت شد
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            {/* Category Filter */}
            <div>
              <label className="text-gray-400 block mb-1.5 font-medium">نوع محتوا:</label>
              <select
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value)}
                className="w-full bg-[#121E42] border border-white/15 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#D4AF37]"
              >
                <option value="all">همه دسته‌ها (مقاله، خدمات، وکلا، آراء، سوالات)</option>
                <option value="articles">مقالات و پژوهش‌های حقوقی</option>
                <option value="services">خدمات و حوزه‌های وکالت</option>
                <option value="lawyers">وکلای دادگستری و مشاوران</option>
                <option value="cases">نمونه آراء و پرونده‌های موفق</option>
                <option value="faqs">پرسش و پاسخ‌های متداول موکلان</option>
              </select>
            </div>

            {/* Specialty Filter */}
            <div>
              <label className="text-gray-400 block mb-1.5 font-medium">حوزه تخصصی حقوقی:</label>
              <select
                value={selectedSpecialty}
                onChange={e => setSelectedSpecialty(e.target.value)}
                className="w-full bg-[#121E42] border border-white/15 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#D4AF37]"
              >
                <option value="all">همه تخصص‌ها</option>
                <option value="ملکی">املاک، اراضی و سرقفلی</option>
                <option value="تجاری">اسناد تجاری، چک و شرکت‌ها</option>
                <option value="خانواده">خانواده، مهریه و طلاق</option>
                <option value="کیفری">دعاوی کیفری و جرایم اقتصادی</option>
                <option value="دیوان">دیوان عدالت اداری و امور مالیاتی</option>
              </select>
            </div>

            {/* Sort Filter */}
            <div>
              <label className="text-gray-400 block mb-1.5 font-medium">ترتیب نمایش نتایج:</label>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as any)}
                className="w-full bg-[#121E42] border border-white/15 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#D4AF37]"
              >
                <option value="relevance">بیشترین ارتباط موضوعی</option>
                <option value="date">جدیدترین انتشارات</option>
                <option value="views">پرطرفدارترین و بیشترین بازدید</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results List */}
        <div className="space-y-4">
          {filteredResults.length > 0 ? (
            filteredResults.map(item => {
              const badge = getCategoryBadge(item.category);
              const BadgeIcon = badge.icon;

              return (
                <div
                  key={item.id}
                  className="p-5 rounded-2xl bg-[#0B132B] border border-white/10 hover:border-[#D4AF37]/50 transition-all shadow-lg hover:shadow-black/60 group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2">
                    <div className="flex items-center gap-2">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold border ${badge.color}`}>
                        <BadgeIcon className="w-3.5 h-3.5" />
                        <span>{badge.label}</span>
                      </span>
                      <span className="px-2 py-0.5 rounded bg-white/5 text-gray-400 text-[10px] border border-white/5">
                        حوزه: {item.specialty}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-[11px] text-gray-400">
                      {item.readTime && <span>{item.readTime}</span>}
                      <span>•</span>
                      <span>{item.date}</span>
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-[#D4AF37] transition-colors mt-2 mb-1.5">
                    {item.title}
                  </h3>

                  <p className="text-xs text-gray-300 leading-relaxed">
                    {item.excerpt}
                  </p>

                  <div className="pt-3 mt-3 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[11px] text-[#D4AF37] font-semibold flex items-center gap-1 group-hover:translate-x-[-4px] transition-transform">
                      مشاهده متن کامل و اخذ مشاوره
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>

                    <button
                      onClick={() => alert(`ثبت درخواست نوبت فوری درباره: ${item.title}`)}
                      className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-[#D4AF37] hover:text-[#0B132B] text-gray-300 text-xs font-bold transition-colors"
                    >
                      رزرو نوبت مرتبط
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            /* Zero-Results Fallback */
            <div className="p-8 rounded-2xl bg-[#0B132B] border border-white/10 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto">
                <HelpCircle className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white">موردی متناسب با عبارت مورد نظر یافت نشد</h3>
              <p className="text-xs text-gray-400 max-w-md mx-auto leading-relaxed">
                می‌توانید کلمات کلیدی عام‌تری را جستجو کنید، یا مستقیماً از طریق پیام‌رسان یا تماس با دفتر حقوقی سوال خود را از وکیل بپرسید:
              </p>
              <div className="flex flex-wrap justify-center gap-3 pt-2">
                <button
                  onClick={() => alert('هدایت به پشتیبانی واتساپ دفتر وکالت')}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>طرح سوال در واتساپ</span>
                </button>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                    setSelectedSpecialty('all');
                  }}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors"
                >
                  پاک کردن همه فیلترها
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
