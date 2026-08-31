import React, { useState } from 'react';
import { Sparkles, X, ChevronRight, ChevronLeft, Check, Compass, Layers, Scale, Code, Calendar, Search } from 'lucide-react';

interface OnboardingTourProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateView: (view: 'preview' | 'dashboard' | 'elementor' | 'code') => void;
}

export const OnboardingTour: React.FC<OnboardingTourProps> = ({
  isOpen,
  onClose,
  onNavigateView,
}) => {
  const [currentStep, setCurrentStep] = useState(0);

  if (!isOpen) return null;

  const steps = [
    {
      title: 'خوش‌آمدید به قالب حقوقی دادمان',
      description: 'این پوسته بر پایه بیش از ۲۰ سال تجربه طراحی قالب‌های پرمیوم وردپرس، با هویت بصری لوکس طلایی و سرمه‌ای، رعایت استانداردهای دادرسی و روان‌شناسی اعتماد موکلین توسعه یافته است.',
      icon: Sparkles,
      actionText: 'شروع معرفی امکانات',
      targetView: 'preview' as const,
    },
    {
      title: '۱. نوار استوری‌های آموزشی اینستاگرامی',
      description: 'در بالای صفحه، نوار استوری‌های تعاملی برای انتشار نکات حقوقی سریع، موفقیت در پرونده‌ها و آگاهی‌بخشی به موکلین تعبیه شده که به افزایش چشمگیر تعامل کاربران کمک می‌کند.',
      icon: Compass,
      actionText: 'مشاهده در صفحه اصلی',
      targetView: 'preview' as const,
    },
    {
      title: '۲. ویترین ۶ خدمت تخصصی با فیلتر هوشمند',
      description: 'بخش خدمات شامل دعاوی تجاری، کیفری، خانواده، ملکی، داوری و کار همراه با پنجره‌های جزئیات مدارک، تعرفه شفاف و دکمه اتصال مستقیم به رزرو نوبت است.',
      icon: Layers,
      actionText: 'بررسی بخش خدمات',
      targetView: 'preview' as const,
    },
    {
      title: '۳. سامانه استعلام آنلاین وضعیت پرونده',
      description: 'موکلین می‌توانند با وارد کردن شماره پرونده یا شماره همراه خود، بدون نیاز به تماس تلفنی، از آخرین وضعیت رسیدگی و تاریخ جلسات دادگاه مطلع شوند.',
      icon: Search,
      actionText: 'تست سامانه پیگیری',
      targetView: 'preview' as const,
    },
    {
      title: '۴. میز کار و CRM اختصاصی وکیل',
      description: 'داشبورد اختصاصی در پیشخوان وردپرس با ۴ کارت آماری وضعیت دادرسی، نمودار تحلیلی، یادآورهای اضطراری دادگاه و ثبت پرونده‌های جدید.',
      icon: Scale,
      actionText: 'ورود به میز کار وکیل',
      targetView: 'dashboard' as const,
    },
    {
      title: '۵. ویترین ۲۵ بلاک المنتور پرو',
      description: 'مجموعه ۲۵ بلاک اختصاصی سازگار با المنتور برای ویرایش بصری تمام بخش‌های هیرو، فرم‌ها، تایم‌لاین دادگاه‌ها، جداول قیمت و فوتر سایت.',
      icon: Sparkles,
      actionText: 'بررسی بلاک‌های المنتور',
      targetView: 'elementor' as const,
    },
    {
      title: '۶. مخزن سورس‌کدهای PHP و دانلود مستقیم ZIP',
      description: 'تمام فایل‌های استاندارد وردپرس (style.css, functions.php, header.php, CPTs, REST APIs) به صورت کامل در تب سورس‌کدها قرار دارند و با یک کلیک به صورت ZIP دانلود می‌شوند.',
      icon: Code,
      actionText: 'مشاهده سورس‌کدها و دانلود',
      targetView: 'code' as const,
    },
  ];

  const step = steps[currentStep];
  const Icon = step.icon;

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white dark:bg-[#0B132B] rounded-3xl shadow-2xl border-2 border-[#D4AF37] p-6 sm:p-8 space-y-6 text-right overflow-hidden">
        
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#D4AF37] via-[#AA820A] to-[#D4AF37]" />

        {/* Header with step counter */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/15 text-[#AA820A] dark:text-[#F3E5AB] flex items-center justify-center">
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-gray-400">
                راهنمای جامع قالب دادمان ({currentStep + 1} از {steps.length})
              </span>
              <h3 className="text-lg font-bold font-serif text-[#0B132B] dark:text-white">
                {step.title}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-gray-400 hover:text-red-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Body */}
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
          {step.description}
        </p>

        {/* Quick jump to view button */}
        <div className="p-3.5 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-between">
          <span className="text-xs font-bold text-[#0B132B] dark:text-[#F3E5AB]">
            مشاهده سریع این بخش در قالب:
          </span>
          <button
            onClick={() => {
              onNavigateView(step.targetView);
              onClose();
            }}
            className="px-3 py-1.5 rounded-xl bg-[#0B132B] text-white hover:bg-[#D4AF37] hover:text-[#0B132B] text-xs font-bold transition-all"
          >
            {step.actionText} ‹
          </button>
        </div>

        {/* Progress Dots */}
        <div className="flex items-center justify-center gap-1.5">
          {steps.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentStep(idx)}
              className={`h-2 rounded-full transition-all ${
                idx === currentStep ? 'w-8 bg-[#D4AF37]' : 'w-2 bg-gray-300 dark:bg-gray-700'
              }`}
            />
          ))}
        </div>

        {/* Footer Navigation Buttons */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-800">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1 ${
              currentStep === 0
                ? 'opacity-30 cursor-not-allowed text-gray-400'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            <ChevronRight className="w-4 h-4" />
            <span>قبلی</span>
          </button>

          <button
            onClick={nextStep}
            className="btn-gold px-6 py-2.5 text-xs font-bold rounded-xl flex items-center gap-1"
          >
            <span>{currentStep === steps.length - 1 ? 'پایان تور و شروع کار' : 'مرحله بعدی'}</span>
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
