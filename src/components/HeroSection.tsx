import React from 'react';
import { ATTORNEY_INFO } from '../data/mockData';
import { Calendar, Search, ShieldCheck, Award, CheckCircle2, ArrowLeft } from 'lucide-react';

interface HeroSectionProps {
  onOpenBooking: () => void;
  onOpenCaseTracker: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenBooking, onOpenCaseTracker }) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:py-20">
      {/* Background ambient decorative shapes */}
      <div className="absolute top-10 right-10 w-80 h-80 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#0B132B]/5 dark:bg-[#1C2541]/40 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column (Content & CTAs) */}
          <div className="lg:col-span-7 space-y-6 text-right">
            
            {/* Experience Pill */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#0B132B] dark:text-[#F3E5AB] text-xs sm:text-sm font-semibold shadow-sm">
              <Award className="w-4 h-4 text-[#D4AF37]" />
              <span>{ATTORNEY_INFO.degree} • بیش از ۲۰ سال سابقه وکالت</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-serif text-[#0B132B] dark:text-white leading-[1.25]">
              عدالت با دقت،{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#AA820A] to-[#D4AF37]">
                حرفه‌ای‌گری با تعهد
              </span>
            </h1>

            {/* Sub-headline / Slogan */}
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed">
              {ATTORNEY_INFO.subSlogan}
            </p>

            {/* Micro value props */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                <span>تنظیم تخصصی لوایح و دفاع مستدل در محاکم</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                <span>حفظ اسرار تجاری و ۱۰۰٪ محرمانگی اسناد</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                <span>امکان تقسیط حق‌الوکاله متناسب با مراحل دادرسی</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                <span>سامانه هوشمند گزارش لحظه‌ای وضعیت پرونده</span>
              </div>
            </div>

            {/* Primary CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={onOpenBooking}
                className="btn-gold px-7 py-3.5 text-sm md:text-base flex items-center gap-2.5 rounded-xl"
              >
                <Calendar className="w-5 h-5" />
                <span>درخواست مشاوره فوری با دکتر رضوی (SedRazavi)</span>
              </button>

              <button
                onClick={onOpenCaseTracker}
                className="btn-outline-navy dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-800 px-6 py-3 text-sm md:text-base flex items-center gap-2.5 rounded-xl"
              >
                <Search className="w-5 h-5 text-[#D4AF37]" />
                <span>پیگیری آنلاین وضعیت پرونده</span>
              </button>
            </div>

            {/* Trust Footer Bar */}
            <div className="pt-6 border-t border-gray-200 dark:border-gray-800 flex flex-wrap items-center gap-6 text-xs text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#2A9D8F]" />
                <span>پروانه رسمی کانون وکلای دادگستری مرکز</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>دفتر مرکزی فعال و پاسخگویی حضوری</span>
              </div>
            </div>

          </div>

          {/* Right Column (Lawyer Portrait & Golden Card) */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md">
              
              {/* Golden Ambient Glow Border Frame */}
              <div className="absolute -inset-3 rounded-3xl bg-gradient-to-tr from-[#D4AF37]/50 via-[#AA820A]/20 to-[#0B132B]/10 blur-xl transform -rotate-2" />

              {/* Main Card */}
              <div className="relative rounded-2xl overflow-hidden border-2 border-[#D4AF37]/40 shadow-2xl bg-white dark:bg-gray-800">
                <img
                  src={ATTORNEY_INFO.portraitImage}
                  alt={ATTORNEY_INFO.name}
                  className="w-full h-[460px] object-cover object-top hover:scale-105 transition-transform duration-700"
                />

                {/* Bottom Overlay Info Card */}
                <div className="absolute bottom-4 right-4 left-4 p-4 rounded-xl bg-[#0B132B]/90 backdrop-blur-md border border-[#D4AF37]/30 text-white shadow-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-base font-bold font-serif text-[#D4AF37]">
                        {ATTORNEY_INFO.name}
                      </h4>
                      <p className="text-xs text-gray-300 mt-0.5">
                        {ATTORNEY_INFO.title}
                      </p>
                    </div>
                    <div className="w-10 h-10 rounded-lg bg-[#D4AF37] text-[#0B132B] flex items-center justify-center font-bold text-sm">
                      ۲۰+
                    </div>
                  </div>
                </div>

                {/* Floating Top Badge */}
                <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-[#D4AF37]/30 text-xs font-bold text-[#0B132B] dark:text-[#F3E5AB] flex items-center gap-1.5 shadow-md">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  نوبت‌های این هفته در دسترس
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
