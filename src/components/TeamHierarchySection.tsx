import React, { useState } from 'react';
import { LawyerSiteProfile } from '../utils/lawyerCustomizationStorage';
import {
  Users,
  Award,
  ShieldCheck,
  Briefcase,
  GraduationCap,
  Calendar,
  CheckCircle2,
  ChevronLeft,
  Sparkles,
  Phone,
  Mail,
  Scale,
  Building2,
  GitBranch,
  Layers,
  ArrowRight
} from 'lucide-react';

interface TeamHierarchySectionProps {
  profile?: LawyerSiteProfile;
  onOpenBooking?: (lawyerName?: string) => void;
}

export const TeamHierarchySection: React.FC<TeamHierarchySectionProps> = ({
  profile,
  onOpenBooking,
}) => {
  const scenario = profile?.firmScenario?.currentScenario || 'senior_associates';
  const [selectedDept, setSelectedDept] = useState<string>('همه');

  // If scenario is purely solo, this section is omitted to keep pure personal branding
  if (scenario === 'solo') {
    return null;
  }

  const teamMembers = [
    {
      id: 'principal',
      name: 'دکتر سیده مریم رضوی',
      role: scenario === 'senior_associates' ? 'وکیل بنیان‌گذار و سرپرست عالی کانون' : scenario === 'enterprise' ? 'رئیس هیئت‌مدیره و سرپرست دپارتمان داوری' : 'شریک ارشد و همکار پایه یک',
      license: '۱۸۴۵۲ / ک.و.م',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800',
      education: 'دکترای حقوق بین‌الملل و خصوصی از دانشگاه تهران',
      experience: '۲۰ سال سابقه وکالت',
      department: 'داوری بین‌الملل و قراردادها',
      badge: 'وکیل سرپرست',
      badgeColor: 'bg-[#D4AF37] text-[#0B132B]',
      feeLevel: 'مشاوره عالی راهبردی',
      phone: '۰۲۱-۸۸۹۹۰۰۱۱',
      specialties: ['داوری تجاری', 'قراردادهای بین‌المللی', 'دعاوی ملکی سنگین']
    },
    {
      id: 'partner-kazemi',
      name: 'دکتر علیرضا کاظمی',
      role: scenario === 'senior_associates' ? 'وکیل پایه یک دادگستری و همکار ارشد' : scenario === 'enterprise' ? 'مدیر دپارتمان حقوق شرکت‌ها و بورس' : 'شریک پایه یک دادگستری',
      license: '۲۱۴۸۵ / ک.و.م',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800',
      education: 'دکترای حقوق تجارت بین‌الملل از دانشگاه شهید بهشتی',
      experience: '۱۲ سال سابقه وکالت',
      department: 'تجاری و شرکت‌ها',
      badge: scenario === 'partners' ? 'شریک مستقل' : 'همکار ارشد',
      badgeColor: 'bg-blue-600 text-white',
      feeLevel: 'مشاوره تخصصی بازرگانی',
      phone: '۰۲۱-۸۸۹۹۰۰۱۲',
      specialties: ['حقوق شرکت‌ها', 'داوری داخلی', 'دعاوی ورشکستگی']
    },
    {
      id: 'partner-afshar',
      name: 'سرکار خانم نسترن افشار',
      role: scenario === 'senior_associates' ? 'وکیل پایه یک و مسئول پیگیری امور محاکم' : scenario === 'enterprise' ? 'مدیر دپارتمان دعاوی ملکی و ثبتی' : 'شریک پایه یک دادگستری',
      license: '۲۸۹۳۰ / ک.و.م',
      image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=800',
      education: 'کارشناسی ارشد حقوق خصوصی و پژوهشگر ثبتی',
      experience: '۹ سال سابقه وکالت',
      department: 'دعاوی ملکی و اراضی',
      badge: scenario === 'partners' ? 'شریک مستقل' : 'همکار تخصصی',
      badgeColor: 'bg-purple-600 text-white',
      feeLevel: 'مشاوره ملکی و ثبتی',
      phone: '۰۲۱-۸۸۹۹۰۰۱۳',
      specialties: ['الزام به تنظیم سند', 'سرقفلی', 'کمیسیون ماده ۱۰۰']
    },
    {
      id: 'trainee-sohrabi',
      name: 'جناب آقای مهدی سهرابی',
      role: scenario === 'senior_associates' ? 'کارآموز وکالت (تحت نظارت دکتر سیده مریم رضوی)' : scenario === 'enterprise' ? 'پژوهشگر ارشد و کارآموز دپارتمان کیفری' : 'وکیل کارآموز همکار',
      license: '۳۱۲۵۵ / کارآموزی کانون مرکز',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800',
      education: 'کارشناسی ارشد حقوق جزا و جرم‌شناسی دانشگاه علامه',
      experience: '۲ سال کارآموزی فعال',
      department: 'دعاوی کیفری و اقتصادی',
      badge: 'کارآموز وکالت',
      badgeColor: 'bg-emerald-600 text-white',
      feeLevel: 'تعرفه حمایتی و اقتصادی',
      phone: '۰۲۱-۸۸۹۹۰۰۱۴',
      specialties: ['لوایح کیفری', 'جرایم سایبری', 'چک‌های صیادی']
    }
  ];

  const departments = ['همه', 'داوری بین‌الملل و قراردادها', 'تجاری و شرکت‌ها', 'دعاوی ملکی و اراضی', 'دعاوی کیفری و اقتصادی'];

  const filteredMembers = teamMembers.filter((m) => {
    if (selectedDept === 'همه') return true;
    return m.department === selectedDept;
  });

  return (
    <section id="lawyers-team" className="py-20 bg-gray-50 dark:bg-[#070D1E] relative overflow-hidden font-persian border-t border-gray-200/70 dark:border-gray-800">
      {/* Golden Ambient Blur */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/15 text-[#AA820A] dark:text-[#F3E5AB] text-xs font-bold border border-[#D4AF37]/30 shadow-sm">
            <Users className="w-3.5 h-3.5 text-[#D4AF37]" />
            {scenario === 'partners' && 'ساختار همکاران و شرکای مستقل دادگستری'}
            {scenario === 'senior_associates' && 'کادر وکالت تخصصی و سرپرستی کارآموزان کانون'}
            {scenario === 'enterprise' && 'دپارتمان‌های تخصصی و ساختار سازمانی موسسه'}
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-serif text-[#0B132B] dark:text-white">
            {scenario === 'partners' && 'شورای شرکا و وکلای هم‌تراز دفتر حقوقی SedRazavi'}
            {scenario === 'senior_associates' && 'هدایت عالیه وکیل سرپرست با همراهی وکلای همکار و کارآموزان'}
            {scenario === 'enterprise' && 'کنسرسیوم وکلای پایه یک دادگستری، داوران و مشاوران عالی'}
          </h2>

          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            {scenario === 'partners' && 'هر یک از وکلای مجموعه با استقلال کامل حرفه‌ای، دارنده پروانه پایه یک کانون وکلای مرکز بوده و پاسخگوی موکلین در حوزه‌های تخصصی خود هستند.'}
            {scenario === 'senior_associates' && 'پرونده‌های موکلین زیر نظر مستقیم وکیل سرپرست هدایت شده و پیش‌نویس لوایح پس از تایید سرپرست، توسط وکلای همکار و کارآموزان اجرا می‌گردد.'}
            {scenario === 'enterprise' && 'شبکه فراگیر خدمات حقوقی با دپارتمان‌های ۵ گانه جهت ارائه خدمات به بنگاه‌های اقتصادی، شرکت‌های دولتی و اشخاص حقیقی.'}
          </p>
        </div>

        {/* Enterprise Department Filter (Only for enterprise scenario) */}
        {scenario === 'enterprise' && (
          <div className="flex items-center justify-center gap-2 flex-wrap pt-2">
            {departments.map((d) => (
              <button
                key={d}
                onClick={() => setSelectedDept(d)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedDept === d
                    ? 'bg-[#0B132B] dark:bg-[#D4AF37] text-white dark:text-[#0B132B] shadow-md'
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-[#D4AF37]'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        )}

        {/* Senior & Associates Hierarchy Highlight (Scenario 3) */}
        {scenario === 'senior_associates' && (
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-[#D4AF37]/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-3">
              <span className="p-2 rounded-xl bg-[#D4AF37] text-[#0B132B] font-bold">
                <ShieldCheck className="w-5 h-5" />
              </span>
              <div>
                <span className="font-bold text-[#AA820A] dark:text-[#F3E5AB]">
                  آیین‌نامه نظارت وکیل سرپرست:
                </span>
                <span className="text-gray-700 dark:text-gray-300 mr-1.5">
                  کلیه دادخواست‌ها، شکواییه‌ها و لوایح تنظیمی کارآموزان پیش از تقدیم به دادگاه، ممهور به مهر تایید دیجیتال سرپرست می‌گردد.
                </span>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-bold shrink-0">
              تعرفه اقتصادی کارآموز فعال
            </span>
          </div>
        )}

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredMembers.map((lawyer) => (
            <div
              key={lawyer.id}
              className="group bg-white dark:bg-[#0B132B] rounded-3xl overflow-hidden border border-gray-200 dark:border-gray-800 hover:border-[#D4AF37] dark:hover:border-[#D4AF37] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Photo & Badges */}
                <div className="relative aspect-[4/5] overflow-hidden bg-gray-100 dark:bg-gray-800">
                  <img
                    src={lawyer.image}
                    alt={lawyer.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Top Badge */}
                  <span className={`absolute top-3 right-3 px-3 py-1 rounded-full text-[10px] font-black shadow-md ${lawyer.badgeColor}`}>
                    {lawyer.badge}
                  </span>

                  {/* Bottom Text on Photo */}
                  <div className="absolute bottom-3 right-3 left-3 text-white space-y-1">
                    <h3 className="text-base font-bold font-serif">{lawyer.name}</h3>
                    <p className="text-[11px] text-gray-200 opacity-90">{lawyer.role}</p>
                  </div>
                </div>

                {/* Details Body */}
                <div className="p-5 space-y-3 text-xs">
                  <div className="flex items-center justify-between text-gray-500 dark:text-gray-400 pb-2 border-b border-gray-100 dark:border-gray-800">
                    <span>شماره پروانه:</span>
                    <span className="font-mono font-bold text-gray-700 dark:text-gray-200">{lawyer.license}</span>
                  </div>

                  <div className="space-y-1">
                    <div className="text-[11px] text-gray-500 dark:text-gray-400 font-bold">تخصص‌های کلیدی:</div>
                    <div className="flex flex-wrap gap-1">
                      {lawyer.specialties.map((s, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-[10px]">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-amber-500/5 dark:bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-between">
                    <span className="text-[10px] text-gray-500 dark:text-gray-400">سطح تعرفه:</span>
                    <span className="text-[11px] font-bold text-[#AA820A] dark:text-[#F3E5AB]">{lawyer.feeLevel}</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-5 pt-0">
                <button
                  type="button"
                  onClick={() => onOpenBooking && onOpenBooking(lawyer.name)}
                  className="w-full py-2.5 px-4 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-[#D4AF37] hover:text-[#0B132B] dark:hover:bg-[#D4AF37] dark:hover:text-[#0B132B] text-gray-700 dark:text-gray-200 text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>رزرو نوبت با {lawyer.name.split(' ')[1] || lawyer.name}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
