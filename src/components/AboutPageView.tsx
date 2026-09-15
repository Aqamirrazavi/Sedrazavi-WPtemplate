import React from 'react';
import {
  Scale,
  Award,
  BookOpen,
  CheckCircle2,
  Calendar,
  Phone,
  GraduationCap,
  ShieldCheck,
  FileCheck,
  Building2,
  ChevronLeft,
  Quote,
} from 'lucide-react';
import { ATTORNEY_INFO } from '../data/mockData';

interface AboutPageViewProps {
  onBookConsultation: () => void;
  onBackToHome: () => void;
}

export const AboutPageView: React.FC<AboutPageViewProps> = ({
  onBookConsultation,
  onBackToHome,
}) => {
  return (
    <div className="py-12 sm:py-16 bg-[#F4F6F9] dark:bg-[#070D1E] min-h-screen text-[#0B132B] dark:text-gray-100 font-persian">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl space-y-16">
        {/* Top Breadcrumb & Back button */}
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-4">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            <button
              onClick={onBackToHome}
              className="hover:text-[#D4AF37] transition-colors"
            >
              صفحه اصلی
            </button>
            <ChevronLeft className="w-4 h-4" />
            <span className="text-[#0B132B] dark:text-[#F3E5AB] font-bold">
              درباره وکیل دکتر سیده مریم رضوی
            </span>
          </div>

          <button
            onClick={onBackToHome}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-[#D4AF37] hover:text-[#0B132B] transition-all"
          >
            بازگشت به صفحه اصلی &rarr;
          </button>
        </div>

        {/* Hero Bio & Portrait Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-[#D4AF37]/30 to-blue-600/20 blur-xl"></div>
              <div className="relative rounded-2xl overflow-hidden border-2 border-[#D4AF37]/50 shadow-2xl bg-gray-900">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800"
                  alt="دکتر سیده مریم رضوی"
                  className="w-full h-[520px] object-cover object-top"
                />
                <div className="absolute bottom-4 right-4 left-4 p-4 rounded-xl bg-[#0B132B]/95 backdrop-blur-md border border-[#D4AF37]/40 shadow-xl space-y-1 text-right">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-[#D4AF37]">
                      شماره پروانه وکالت: ۲۴۷۸۱
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                      کانون وکلای مرکز
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-white">
                    دکتر سیده مریم رضوی (SedRazavi)
                  </h3>
                  <p className="text-[11px] text-gray-300">
                    وکیل پایه یک دادگستری و داور رسمی دعاوی تجاری بین‌المللی
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6 text-right">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/15 text-[#D4AF37] dark:text-[#F3E5AB] text-xs font-bold border border-[#D4AF37]/30">
              <Award className="w-3.5 h-3.5" />
              <span>بیوگرافی رسمی و سوابق علمی</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-serif font-black text-[#0B132B] dark:text-white leading-tight">
              دو دهه دفاع تخصصی، تسلط آکادمیک و تعهد بی‌قیدوشرط به عدالت
            </h1>

            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
              سرکار خانم دکتر سیده مریم رضوی پس از اخذ رتبه برتر در آزمون ورودی کانون وکلای دادگستری مرکز و اتمام مقطع دکترای حقوق خصوصی و بین‌الملل از دانشگاه تهران، فعالیت تخصصی خود را به عنوان وکیل مدافع در سخت‌ترین پرونده‌های دعاوی ملکی، بازرگانی، شرکت‌ها و داوری‌های کلان آغاز نمود.
            </p>

            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
              تمرکز بنیادین ایشان بر تنظیم قراردادهای جامع پیشگیرانه، دفاع مستدل متکی بر آخرین آرای وحدت رویه دیوان عالی کشور، و به کارگیری استراتژی‌های حقوقی نوین در مراجع قضایی، سازمان ثبت اسناد و املاک، و دیوان عدالت اداری است.
            </p>

            {/* Academic Degrees */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-sm flex items-start gap-3">
                <GraduationCap className="w-6 h-6 text-[#D4AF37] shrink-0 mt-1" />
                <div>
                  <h4 className="text-xs font-bold text-[#0B132B] dark:text-white">
                    دکترای تخصصی حقوق خصوصی (Ph.D)
                  </h4>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">
                    دانشگاه تهران - با درجه عالی و پایان‌نامه داوری بین‌المللی
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-sm flex items-start gap-3">
                <ShieldCheck className="w-6 h-6 text-[#2A9D8F] shrink-0 mt-1" />
                <div>
                  <h4 className="text-xs font-bold text-[#0B132B] dark:text-white">
                    پروانه وکالت پایه یک دادگستری
                  </h4>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">
                    عضو کانون وکلای دادگستری مرکز (شهر تهران)
                  </p>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={onBookConsultation}
                className="btn-gold px-6 py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg hover:scale-105 transition-all"
              >
                <Calendar className="w-4 h-4" />
                درخواست وقت مشاوره حضوری یا تلفنی
              </button>

              <a
                href="tel:02188888888"
                className="px-6 py-3 rounded-xl bg-white dark:bg-[#0B132B] text-[#0B132B] dark:text-white border border-gray-300 dark:border-gray-700 font-bold text-xs sm:text-sm hover:border-[#D4AF37] transition-colors flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#D4AF37]" />
                تماس مستقیم: ۰۲۱-۸۸۸۸۸۸۸۸
              </a>
            </div>
          </div>
        </div>

        {/* Ethical Charter & Judicial Oath */}
        <div className="rounded-3xl p-8 sm:p-12 bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-xl space-y-8 text-right">
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#D4AF37]">
              اصول حرفه‌ای و پایبندی به قانون
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0B132B] dark:text-white">
              منشور اخلاق حرفه‌ای مؤسسه حقوقی دکتر رضوی
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              تعهدات مکتوب و تزلزل‌ناپذیر ما در قبال تک‌تک موکلین گرامی
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-gray-50 dark:bg-[#070D1E] border border-gray-200 dark:border-gray-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 text-[#D4AF37] flex items-center justify-center font-black">
                ۱
              </div>
              <h3 className="font-bold text-sm text-[#0B132B] dark:text-white">
                صداقت در ارزیابی شانس پرونده
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                هرگز امید واهی به موکل داده نمی‌شود؛ پیش از انعقاد وکالتنامه، ادله قانونی و رویه قضایی با صراحت کامل تحلیل می‌گردد.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-gray-50 dark:bg-[#070D1E] border border-gray-200 dark:border-gray-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 text-[#D4AF37] flex items-center justify-center font-black">
                ۲
              </div>
              <h3 className="font-bold text-sm text-[#0B132B] dark:text-white">
                رازدارى تام و محرمانگی اسناد
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                تمامی مکالمات، اسرار تجاری شرکت‌ها و اوراق پرونده بر طبق قانون و سوگند وکالت، برای همیشه به عنوان امانت قطعی محفوظ می‌ماند.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-gray-50 dark:bg-[#070D1E] border border-gray-200 dark:border-gray-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 text-[#D4AF37] flex items-center justify-center font-black">
                ۳
              </div>
              <h3 className="font-bold text-sm text-[#0B132B] dark:text-white">
                شفافیت مطلق در قرارداد مالی
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                حق‌الوکاله مطابق تعرفه و مراحل رسیدگی دادرسی تفکیک شده و شرایط پرداخت تقسیطی در متن قرارداد شفاف ثبت می‌گردد.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-gray-50 dark:bg-[#070D1E] border border-gray-200 dark:border-gray-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 text-[#D4AF37] flex items-center justify-center font-black">
                ۴
              </div>
              <h3 className="font-bold text-sm text-[#0B132B] dark:text-white">
                پاسخگویی و گزارش‌دهی مستمر
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                موکل از طریق سامانه آنلاین و پیامک‌های اطلاع‌رسانی از کلیه لوایح تقدیمی، اوقات رسیدگی و ابلاغیه‌های دادگاه مطلع می‌شود.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#070D1E] border border-[#D4AF37]/30 flex items-center gap-4 text-right">
            <Quote className="w-10 h-10 text-[#D4AF37] shrink-0" />
            <p className="text-xs sm:text-sm text-gray-200 italic leading-relaxed">
              «سوگند یاد می‌کنم که همیشه قوانین و نظامات را محترم شمرده، جز عدالت و احقاق حق منظوری نداشته باشم و بر خلاف شرافت قضاوت و وکالت اقدام ننمایم.»
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
