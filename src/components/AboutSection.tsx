import React from 'react';
import { useDesignTokens } from '../context/DesignTokensContext';
import { ATTORNEY_INFO } from '../data/mockData';
import { LawyerSiteProfile } from '../utils/lawyerCustomizationStorage';
import { ShieldCheck, Award, GraduationCap, CheckCircle2, Quote, Sparkles } from 'lucide-react';

interface AboutSectionProps {
  profile?: LawyerSiteProfile;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ profile }) => {
  const { tokens } = useDesignTokens();
  const lawyerName = profile?.lawyerName || tokens['lawyer.name']?.value || ATTORNEY_INFO.name;
  const lawyerTitle = profile?.lawyerTitle || tokens['lawyer.title']?.value || ATTORNEY_INFO.title;
  const licenseNumber = profile?.licenseNumber || tokens['lawyer.license']?.value || ATTORNEY_INFO.licenseNumber;
  const portraitImage = profile?.portraitImage || ATTORNEY_INFO.portraitImage;
  const bio = profile?.bio || `سرکار خانم دکتر سیده مریم رضوی پس از فراغت از تحصیل در مقطع دکترای حقوق بین‌الملل و خصوصی از دانشگاه تهران و گذراندن دوره‌های تخصصی داوری بین‌المللی، دفتر وکالت خود را با نام مؤسسه حقوقی SedRazavi بنا نهاد. ایشان تاکنون وکالت بیش از ۱۲۸۰ پرونده سنگین حقوقی، ملکی، تجاری و داوری را با بالاترین درصد موفقیت بر عهده داشته است.`;
  const quote = profile?.quote || `«وکالت در پیشگاه قانون، نه صرفاً یک پیشه، بلکه عهدنامه‌ای مقدس برای احقاق حق مظلوم، پایبندی به شرافت حرفه‌ای و برقراری توازن عدالت است.»`;

  return (
    <section id="about" className="py-20 bg-white dark:bg-[#0B132B] relative overflow-hidden">
      {/* Background golden glow */}
      <div className="absolute -top-24 right-0 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column (Image & Credentials Badges) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-[#D4AF37]/30 to-[#0B132B]/20 blur-xl transform rotate-2" />

              <div className="relative rounded-2xl overflow-hidden border-2 border-[#D4AF37]/40 shadow-2xl bg-white dark:bg-gray-800">
                <img
                  src={portraitImage}
                  alt={lawyerName}
                  className="w-full h-[520px] object-cover object-top"
                />

                {/* Floating Certificate Pill */}
                <div className="absolute bottom-6 right-6 left-6 p-4 rounded-xl bg-white/95 dark:bg-[#0B132B]/95 backdrop-blur-md border border-[#D4AF37]/30 shadow-xl space-y-2">
                  <div className="flex items-center gap-2 text-[#AA820A] dark:text-[#F3E5AB] font-bold text-xs">
                    <GraduationCap className="w-4 h-4 text-[#D4AF37]" />
                    <span>رتبه برتر آزمون وکالت کانون وکلای مرکز</span>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    عضو رسمی کانون وکلای دادگستری مرکز و مدرس دوره‌های تخصصی تنظیم قرارداد
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (Bio, Values & Quote) */}
          <div className="lg:col-span-7 space-y-6 text-right">
            
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/15 text-[#AA820A] dark:text-[#F3E5AB] text-xs font-bold border border-[#D4AF37]/30">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              درباره {lawyerName}
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold font-serif text-[#0B132B] dark:text-white leading-tight">
              دو دهه پاسداری متعهدانه از حقوق و منافع مشروع موکلین
            </h2>

            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
              {bio}
            </p>

            {/* Core Values / Principles */}
            <div className="space-y-3 pt-2">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                منشور اخلاق حرفه‌ای و تعهدات بنیادین:
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
                  <CheckCircle2 className="w-4 h-4 text-[#2A9D8F] flex-shrink-0 mt-0.5" />
                  <span>بررسی واقع‌بینانه شانس پیروزی دعوا بدون امید واهی</span>
                </div>

                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
                  <CheckCircle2 className="w-4 h-4 text-[#2A9D8F] flex-shrink-0 mt-0.5" />
                  <span>شفافیت کامل در قرارداد مالی و نحوه وصول حق‌الوکاله</span>
                </div>

                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
                  <CheckCircle2 className="w-4 h-4 text-[#2A9D8F] flex-shrink-0 mt-0.5" />
                  <span>گزارش‌دهی مستمر و دسترسی آنلاین موکل به لوایح پرونده</span>
                </div>

                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
                  <CheckCircle2 className="w-4 h-4 text-[#2A9D8F] flex-shrink-0 mt-0.5" />
                  <span>حفظ کامل اسرار شغلی، اسناد تجاری و حریم خانوادگی</span>
                </div>
              </div>
            </div>

            {/* Prominent Lawyer Quote Box */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-[#D4AF37]/10 via-[#D4AF37]/5 to-transparent border-r-4 border-[#D4AF37] relative">
              <Quote className="w-8 h-8 text-[#D4AF37]/30 absolute top-3 left-4" />
              <p className="text-sm sm:text-base font-serif italic text-gray-800 dark:text-gray-200 leading-relaxed">
                {quote}
              </p>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-xs font-bold text-[#AA820A] dark:text-[#F3E5AB]">
                  — {lawyerName}، {lawyerTitle}
                </span>
                <span className="text-xs text-gray-400">شماره پروانه {licenseNumber}</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
