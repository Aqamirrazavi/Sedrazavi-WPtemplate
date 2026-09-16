import React, { useState } from 'react';
import {
  Sparkles,
  Bot,
  Send,
  Scale,
  ShieldAlert,
  FileCheck,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ArrowLeft,
  BookOpen,
  Calendar,
  MessageSquare,
  Copy,
  ChevronLeft,
} from 'lucide-react';
import { ATTORNEY_INFO } from '../../data/mockData';

interface LegalAiAdvisorProps {
  onOpenBooking?: () => void;
}

export const LegalAiAdvisor: React.FC<LegalAiAdvisorProps> = ({ onOpenBooking }) => {
  const [userQuery, setUserQuery] = useState(
    'یک قطعه زمین در شمال خریداری کرده‌ام اما پس از گذشت یک سال، شخص دیگری با سند اصلاحات ارضی ادعای مالکیت کرده و اجازه ساخت نمی‌دهد. آیا باید دعوای تصرف عدوانی مطرح کنم یا الزام به تحویل مبیع؟'
  );
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>({
    category: 'دعاوی ملکی و اراضی (تداخل اسناد و مالکیت)',
    competentCourt: 'دادگاه عمومی حقوقی محل وقوع ملک (حوزه قضایی نوشهر/مازندران)',
    bestAction: 'طرح دعوای خلع ید، اثبات مالکیت و بطلان سند معارض بر مبنای رای وحدت رویه شماره ۴۳',
    requiredDocs: [
      'اصل مبایعه‌نامه معتبر با کد رهگیری و امضای شهود',
      'استعلام آخرین وضعیت ثبتی از اداره ثبت اسناد و املاک منطقه',
      'نقشه هوایی UTM و کروکی مصدق ملک',
      'شهادت‌نامه محلی تصرفات و استشهادیه',
    ],
    riskLevel: 'متوسط به بالا (نیاز به ارجاع امر به کارشناس رسمی دادگستری رشته امور ثبتی)',
    estimatedDuration: '۶ الی ۹ ماه کاری تا دادنامه قطعی تجدیدنظر',
    recommendedNextStep: 'رزرو وقت مشاوره حضوری فوری جهت بررسی اصالت اسناد و تقدم تاریخی تاریخ تنظیم مبایعه‌نامه‌ها',
  });

  const handleAnalyze = () => {
    if (!userQuery.trim()) return;
    setIsAnalyzing(true);
    setTimeout(() => {
      // Dynamic mock analysis based on keywords
      const q = userQuery.toLowerCase();
      if (q.includes('چک') || q.includes('سفته') || q.includes('طلب')) {
        setAnalysisResult({
          category: 'دعاوی اسناد تجاری و مطالبات پولی',
          competentCourt: 'شعبه دادگاه عمومی حقوقی یا دایره اجرای ثبت اسناد رسمی',
          bestAction: 'صدور اجرائیه مستقیم طبق ماده ۲۳ قانون جدید چک یا توقیف اموال از طریق تامین خواسته فوری',
          requiredDocs: [
            'اصل برگه چک و گواهی‌نامه عدم پرداخت بانک متبوع با کد رهگیری',
            'فرم درخواست صدور اجرائیه طبق قانون اصلاحی صدور چک',
            'مشخصات حساب‌های بانکی و پلاک‌های ثبتی بدهکار جهت توقیف سیستمی',
          ],
          riskLevel: 'پایین (مزیت قانونی اجرای مستقیم بدون نیاز به دادرسی ماهوی)',
          estimatedDuration: '۲۰ الی ۴۵ روز جهت توقیف اموال',
          recommendedNextStep: 'ثبت درخواست تامین خواسته بدون تودیع خسارت احتمالی',
        });
      } else if (q.includes('طلاق') || q.includes('مهریه') || q.includes('حضانت')) {
        setAnalysisResult({
          category: 'دعاوی خانواده و احوال شخصیه',
          competentCourt: 'دادگاه اختصاصی خانواده و واحدهای داوری و مشاوره بهزیستی',
          bestAction: 'مطالبه مهریه از طریق اداره ثبت اسناد، سپس طرح دادخواست حضانت و تمکین در صورت لزوم',
          requiredDocs: [
            'اصل سند رسمی ازدواج (عقدنامه)',
            'شناسنامه و کارت ملی زوجین',
            'گواهی عدم انصراف از مشاوره اجباری بهزیستی',
          ],
          riskLevel: 'متوسط',
          estimatedDuration: '۲ الی ۴ ماه کاری',
          recommendedNextStep: 'ممنوع‌الخروج نمودن زوج از طریق اجرای ثبت قبل از انتقال اموال',
        });
      } else {
        setAnalysisResult({
          category: 'دعاوی عمومی و کیفری تخصصی',
          competentCourt: 'دادسرای عمومی و انقلاب و شعبات حقوقی دادگستری',
          bestAction: 'تنظیم شکواییه با عنوان متناسب و تقاضای کارشناسی رسمی دادگستری',
          requiredDocs: [
            'مدارک شناسایی و احراز هویت ثنا',
            'کلیه مدارک مثبته، پیامک‌ها و رسیدهای واریز بانکی',
            'شهادت شهود و استشهادیه کتبی',
          ],
          riskLevel: 'متوسط',
          estimatedDuration: '۴ الی ۸ ماه',
          recommendedNextStep: 'تنظیم وقت جلسه با وکیل پیش از اظهارات در کلانتری و دادسرا',
        });
      }
      setIsAnalyzing(false);
    }, 1200);
  };

  const sampleQuestions = [
    'ملک اجاره‌ای تخلیه نمی‌شود، چطور دستور تخلیه فوری بگیرم؟',
    'چک صیادی برگشت خورده و صادرکننده متواری است؛ سریع‌ترین راه وصول چیست؟',
    'در خرید آپارتمان پیش‌فروش، سازنده تاخیر دارد؛ مطالبه خسارت وجه التزام چگونه است؟',
  ];

  return (
    <div className="bg-white dark:bg-[#0B132B] rounded-3xl p-6 sm:p-8 border border-gray-200 dark:border-gray-800 shadow-xl space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-700 text-white flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-bold font-serif text-[#0B132B] dark:text-white">
                دستیار هوشمند حقوقی و غربالگری ادله دعاوی
              </h2>
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 text-xs font-bold border border-indigo-500/30">
                AI Legal Screener
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              تحلیل اولیه وضعیت حقوقی، تعیین صلاحیت دادگاه صالح و پیش‌بینی مدارک لازم قبل از جلسه حضوری با وکیل
            </p>
          </div>
        </div>
      </div>

      {/* Query Box & Quick Samples */}
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">
            شرح خلاصه مشکل حقوقی یا سوال خود را بنویسید:
          </label>
          <div className="relative">
            <textarea
              rows={3}
              value={userQuery}
              onChange={(e) => setUserQuery(e.target.value)}
              placeholder="مثال: من خریدار یک باب مغازه هستم و فروشنده سند را منتقل نمی‌کند..."
              className="w-full px-4 py-3 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-xs sm:text-sm focus:outline-none focus:border-[#D4AF37] leading-relaxed"
            />
            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="absolute left-3 bottom-3 btn-gold px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md cursor-pointer"
            >
              {isAnalyzing ? (
                <>
                  <Sparkles className="w-3.5 h-3.5 animate-spin" />
                  <span>در حال پردازش هوش مصنوعی...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>تحلیل هوشمند حقوقی</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Quick Samples */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-[11px] text-gray-400">نمونه سوالات متداول:</span>
          {sampleQuestions.map((q, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setUserQuery(q);
              }}
              className="px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 text-[11px] text-gray-600 dark:text-gray-300 hover:text-[#D4AF37] transition-colors text-right"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Analysis Output Dashboard */}
      {analysisResult && (
        <div className="p-6 rounded-3xl bg-gradient-to-br from-[#0B132B] to-[#162238] border border-[#D4AF37]/30 text-white shadow-2xl space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div className="flex items-center gap-2 text-[#D4AF37]">
              <Sparkles className="w-5 h-5" />
              <span className="font-bold text-sm">نتایج تحلیل هوشمند وضعیت پرونده</span>
            </div>
            <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold">
              تطبیق با قوانین موضوعه ایران
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
              <span className="text-[11px] text-[#D4AF37] font-bold block">دسته‌بندی و ماهیت حقوقی دعوا:</span>
              <p className="text-xs sm:text-sm font-bold text-gray-200">{analysisResult.category}</p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
              <span className="text-[11px] text-[#D4AF37] font-bold block">مرجع صالح رسیدگی قضایی:</span>
              <p className="text-xs sm:text-sm font-bold text-gray-200">{analysisResult.competentCourt}</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <span className="text-[11px] text-[#D4AF37] font-bold block">بهترین اقدام و خواسته قانونی پیشنهادی:</span>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-serif">
              {analysisResult.bestAction}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <span className="text-xs font-bold text-gray-200 flex items-center gap-1.5">
                <FileCheck className="w-4 h-4 text-emerald-400" />
                چک‌لیست مدارک و ادله اثبات دعوا:
              </span>
              <ul className="space-y-1.5 text-xs text-gray-300">
                {analysisResult.requiredDocs.map((doc: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3 p-4 rounded-2xl bg-white/5 border border-white/10 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-400">میزان ریسک و پیچیدگی:</span>
                <span className="text-amber-300 font-bold">{analysisResult.riskLevel}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">مدت زمان تقریبی رسیدگی:</span>
                <span className="text-sky-300 font-bold">{analysisResult.estimatedDuration}</span>
              </div>
              <div className="pt-2 border-t border-white/10">
                <span className="text-gray-400 block mb-1">اقدام فوری پیشنهادی وکیل:</span>
                <span className="text-emerald-400 font-bold leading-relaxed block">
                  {analysisResult.recommendedNextStep}
                </span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-[11px] text-gray-400">
              * این ارزیابی مقدماتی توسط هوش مصنوعی انجام شده و جایگزین نظر رسمی وکیل در جلسه مشاوره نیست.
            </span>

            {onOpenBooking && (
              <button
                onClick={onOpenBooking}
                className="btn-gold px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg"
              >
                <Calendar className="w-4 h-4" />
                <span>رزرو نوبت مشاوره با وکیل بر اساس این تحلیل</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
