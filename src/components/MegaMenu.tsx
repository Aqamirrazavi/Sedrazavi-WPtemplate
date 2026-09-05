import React from 'react';
import { SERVICES_DATA, PRACTICE_AREAS_DATA, VIDEOS_DATA } from '../data/mockData';
import {
  Scale,
  Building2,
  Briefcase,
  ShieldAlert,
  Users,
  Globe2,
  FileCode2,
  FileSignature,
  Video,
  BookOpen,
  Calendar,
  ChevronLeft,
  Search,
  Award,
  Sparkles,
  ArrowRight,
  PhoneCall,
  CheckCircle2,
} from 'lucide-react';

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectService?: (serviceSlug: string) => void;
  onOpenArticleArchive?: () => void;
  onOpenVideoArchive?: () => void;
  onOpenBooking?: () => void;
  onSelectVideo?: (videoId: string) => void;
}

export const MegaMenu: React.FC<MegaMenuProps> = ({
  isOpen,
  onClose,
  onSelectService,
  onOpenArticleArchive,
  onOpenVideoArchive,
  onOpenBooking,
  onSelectVideo,
}) => {
  if (!isOpen) return null;

  return (
    <div
      id="desktop-mega-menu"
      onMouseLeave={onClose}
      className="hidden lg:block absolute top-full right-0 left-0 w-full bg-white dark:bg-[#0B132B] shadow-2xl border-b border-[#D4AF37]/30 z-50 transition-all duration-300 animate-in fade-in slide-in-from-top-2 text-right"
    >
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-12 gap-8">
          
          {/* Column 1: Core Practice Areas & Services (4 Cols) */}
          <div className="col-span-4 border-l border-gray-100 dark:border-gray-800/80 pl-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100 dark:border-gray-800">
              <h3 className="text-sm font-bold font-serif text-[#0B132B] dark:text-white flex items-center gap-2">
                <Scale className="w-4 h-4 text-[#D4AF37]" />
                <span>خدمات و حوزه‌های تخصصی وکالت</span>
              </h3>
              <span className="text-[11px] text-[#D4AF37] font-semibold">۶ دپارتمان اصلی</span>
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              {SERVICES_DATA.map((service) => (
                <a
                  key={service.id}
                  href={`#services`}
                  onClick={(e) => {
                    e.preventDefault();
                    if (onSelectService) {
                      onSelectService(service.slug);
                    } else {
                      const el = document.getElementById('services');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }
                    onClose();
                  }}
                  className="group flex items-start gap-3 p-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/60 border border-transparent hover:border-gray-200 dark:hover:border-gray-700/60 transition-all"
                >
                  <span className="text-xl p-1.5 rounded-lg bg-[#D4AF37]/10 dark:bg-[#D4AF37]/20 group-hover:scale-110 transition-transform">
                    {service.iconEmoji}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-[#0B132B] dark:text-white group-hover:text-[#D4AF37] transition-colors">
                        {service.title}
                      </span>
                      {service.isFeatured && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#D4AF37]/15 text-[#AA820A] dark:text-[#F3E5AB] font-semibold">
                          ویژه
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400 line-clamp-1 mt-0.5">
                      {service.summary}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Specific Case Types & Contracts (4 Cols) */}
          <div className="col-span-4 border-l border-gray-100 dark:border-gray-800/80 pl-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100 dark:border-gray-800">
              <h3 className="text-sm font-bold font-serif text-[#0B132B] dark:text-white flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-[#2A9D8F]" />
                <span>موضوعات دعاوی و قراردادها</span>
              </h3>
              <span className="text-[11px] text-gray-400">آمار پرونده‌های موفق</span>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {PRACTICE_AREAS_DATA.map((area) => (
                <div
                  key={area.id}
                  onClick={() => {
                    const el = document.getElementById('services');
                    el?.scrollIntoView({ behavior: 'smooth' });
                    onClose();
                  }}
                  className="p-2.5 rounded-xl bg-gray-50/70 dark:bg-gray-800/40 hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-100 dark:border-gray-800/60 cursor-pointer transition-all hover:-translate-y-0.5"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-[11px] text-[#0B132B] dark:text-white">
                      {area.title}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-gray-500 dark:text-gray-400">
                    <span>{area.caseCount}+ پرونده</span>
                    {area.badge && (
                      <span className="text-[#D4AF37] font-semibold">
                        {area.badge}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Links for Media & Archives */}
            <div className="pt-2 flex items-center gap-2">
              <button
                onClick={() => {
                  onOpenArticleArchive?.();
                  onClose();
                }}
                className="flex-1 py-2 px-3 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-[#D4AF37]/15 hover:text-[#D4AF37] text-xs font-semibold text-gray-700 dark:text-gray-300 transition-colors flex items-center justify-center gap-1.5"
              >
                <BookOpen className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>آرشیو مقالات تخصصی</span>
              </button>
              <button
                onClick={() => {
                  onOpenVideoArchive?.();
                  onClose();
                }}
                className="flex-1 py-2 px-3 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-[#2A9D8F]/15 hover:text-[#2A9D8F] text-xs font-semibold text-gray-700 dark:text-gray-300 transition-colors flex items-center justify-center gap-1.5"
              >
                <Video className="w-3.5 h-3.5 text-[#2A9D8F]" />
                <span>کارگاه‌ها و وبینارها</span>
              </button>
            </div>
          </div>

          {/* Column 3: Featured Video / Case Consultation Promo (4 Cols) */}
          <div className="col-span-4 space-y-4">
            
            {/* Featured Webinar Banner */}
            <div className="relative rounded-2xl overflow-hidden border border-[#D4AF37]/30 bg-gradient-to-br from-[#0B132B] to-[#1C2541] p-5 text-white shadow-lg">
              <div className="flex items-center gap-2 mb-2.5">
                <span className="px-2 py-0.5 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] text-[10px] font-bold flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  وبینار ویژه وکیل
                </span>
                <span className="text-[10px] text-gray-400">۲۴ دقیقه آموزش رایگان</span>
              </div>

              <h4 className="text-xs font-bold leading-relaxed mb-2 text-gray-100">
                {VIDEOS_DATA[0]?.title || 'راهنمای گام‌به‌گام پیگیری چک صیادی در دادگاه'}
              </h4>

              <p className="text-[11px] text-gray-300 line-clamp-2 mb-4 leading-normal">
                {VIDEOS_DATA[0]?.summary}
              </p>

              <div className="flex items-center justify-between pt-2 border-t border-white/10">
                <button
                  onClick={() => {
                    if (VIDEOS_DATA[0] && onSelectVideo) {
                      onSelectVideo(VIDEOS_DATA[0].id);
                    } else {
                      onOpenVideoArchive?.();
                    }
                    onClose();
                  }}
                  className="text-xs font-bold text-[#D4AF37] hover:text-white flex items-center gap-1 transition-colors"
                >
                  <Video className="w-3.5 h-3.5" />
                  <span>مشاهده وبینار</span>
                </button>

                <button
                  onClick={() => {
                    onOpenBooking?.();
                    onClose();
                  }}
                  className="btn-gold text-xs px-3.5 py-1.5 rounded-xl font-bold flex items-center gap-1"
                >
                  <Calendar className="w-3 h-3" />
                  <span>رزرو مشاوره فوری</span>
                </button>
              </div>
            </div>

            {/* Quick Contact & Emergency Notice */}
            <div className="p-4 rounded-2xl bg-amber-500/10 dark:bg-amber-500/15 border border-amber-500/30 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                  <PhoneCall className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-[11px] font-bold text-gray-900 dark:text-white">
                    نیاز به ارزیابی فوری پرونده دارید؟
                  </span>
                  <span className="block text-[10px] text-gray-500 dark:text-gray-400">
                    تماس مستقیم با دفتر: ۰۲۱-۸۸۹۹۰۰۱۱
                  </span>
                </div>
              </div>
              <a
                href="tel:02188990011"
                className="text-xs font-bold text-amber-700 dark:text-amber-400 hover:underline"
              >
                تماس فوری
              </a>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
