import React, { useState } from 'react';
import {
  Compass,
  Search,
  Home,
  Briefcase,
  BookOpen,
  PhoneCall,
  ArrowRight,
  ShieldAlert,
  Calendar
} from 'lucide-react';
import { useDesignTokens } from '../context/DesignTokensContext';

interface NotFoundPageViewProps {
  onBackToHome: () => void;
  onNavigateView: (view: any) => void;
  onBookConsultation: () => void;
}

export const NotFoundPageView: React.FC<NotFoundPageViewProps> = ({
  onBackToHome,
  onNavigateView,
  onBookConsultation,
}) => {
  const { tokens } = useDesignTokens();
  const lawyerName = tokens['lawyer.name']?.value || 'دکتر سیده مریم رضوی';
  const lawyerPhone = tokens['contact.phone']?.value || '۰۲۱-۸۸۹۹۰۰۱۱';
  const brandName = tokens['brand.name']?.value || 'SedRazavi';

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onNavigateView('archive');
    }
  };

  return (
    <div className="py-16 sm:py-24 bg-[#F4F6F9] dark:bg-[#070D1E] min-h-screen text-[#0B132B] dark:text-gray-100 font-persian flex items-center justify-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl text-center space-y-10">
        {/* بخش ۱: پیام اصلی و کد خطا با آیکون قطب‌نما */}
        <div className="space-y-4">
          <div className="w-24 h-24 sm:w-28 sm:h-28 mx-auto rounded-3xl bg-amber-500/10 border-2 border-[#D4AF37]/50 text-[#D4AF37] flex items-center justify-center shadow-2xl animate-pulse">
            <Compass className="w-14 h-14" />
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs font-bold">
            <ShieldAlert className="w-4 h-4" />
            <span>خطای ۴۰۴ - نشانی مورد نظر در سرور یافت نشد</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black font-serif text-[#0B132B] dark:text-white tracking-tight">
            مسیر قانونی گم شده است!
          </h1>

          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-lg mx-auto leading-relaxed">
            متأسفانه صفحه‌ای که به دنبال آن هستید ممکن است حذف شده، تغییر نام یافته یا آدرس آن به اشتباه وارد شده باشد.
          </p>
        </div>

        {/* بخش ۲: نوار جستجوی سریع در سایت */}
        <div className="max-w-md mx-auto">
          <form onSubmit={handleSearchSubmit} className="relative shadow-lg rounded-2xl">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="جستجو در مقالات، خدمات و قوانین..."
              className="w-full py-3.5 pr-4 pl-12 rounded-2xl bg-white dark:bg-[#0B132B] border-2 border-gray-200 dark:border-gray-800 focus:border-[#D4AF37] text-xs sm:text-sm text-gray-900 dark:text-white outline-none transition-all"
            />
            <button
              type="submit"
              className="absolute left-2 top-2 bottom-2 px-3 rounded-xl btn-gold text-xs font-bold flex items-center gap-1"
            >
              <Search className="w-4 h-4" />
              <span>جستجو</span>
            </button>
          </form>
        </div>

        {/* بخش ۳: چهار کارت لینک‌های مفید */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            مسیرهای پیشنهادی و پربازدید سامانه {brandName}
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <button
              onClick={onBackToHome}
              className="p-4 rounded-2xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 hover:border-[#D4AF37] shadow-sm hover:shadow-md transition-all text-center space-y-2 group"
            >
              <div className="w-10 h-10 mx-auto rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-700 dark:text-gray-300 group-hover:text-[#D4AF37]">
                <Home className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-gray-800 dark:text-gray-200 block">
                صفحه اصلی
              </span>
            </button>

            <button
              onClick={() => onNavigateView('services')}
              className="p-4 rounded-2xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 hover:border-[#D4AF37] shadow-sm hover:shadow-md transition-all text-center space-y-2 group"
            >
              <div className="w-10 h-10 mx-auto rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-700 dark:text-gray-300 group-hover:text-[#D4AF37]">
                <Briefcase className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-gray-800 dark:text-gray-200 block">
                خدمات تخصصی
              </span>
            </button>

            <button
              onClick={() => onNavigateView('archive')}
              className="p-4 rounded-2xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 hover:border-[#D4AF37] shadow-sm hover:shadow-md transition-all text-center space-y-2 group"
            >
              <div className="w-10 h-10 mx-auto rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-700 dark:text-gray-300 group-hover:text-[#D4AF37]">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-gray-800 dark:text-gray-200 block">
                وبلاگ و مقالات
              </span>
            </button>

            <button
              onClick={() => onNavigateView('contact')}
              className="p-4 rounded-2xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 hover:border-[#D4AF37] shadow-sm hover:shadow-md transition-all text-center space-y-2 group"
            >
              <div className="w-10 h-10 mx-auto rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-700 dark:text-gray-300 group-hover:text-[#D4AF37]">
                <PhoneCall className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-gray-800 dark:text-gray-200 block">
                ارتباط با ما
              </span>
            </button>
          </div>
        </div>

        {/* بخش ۴: دعوت به اقدام پایانی (CTA) */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-[#0B132B] to-[#1C2541] border border-[#D4AF37]/30 text-white flex flex-col sm:flex-row items-center justify-between gap-4 text-right shadow-xl">
          <div>
            <h4 className="font-bold text-sm text-white font-serif">
              نیاز به راهنمایی حقوقی فوری یا تعیین وقت دارید؟
            </h4>
            <p className="text-xs text-gray-300 mt-1">
              دفتر وکالت {lawyerName} آماده پاسخگویی به ابهامات شماست.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={onBookConsultation}
              className="px-4 py-2.5 rounded-xl btn-gold text-xs font-bold flex items-center gap-1.5 shadow"
            >
              <Calendar className="w-4 h-4" />
              <span>رزرو مشاوره</span>
            </button>

            <a
              href={`tel:${lawyerPhone}`}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white border border-white/20 transition-all"
            >
              تماس تلفنی
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
