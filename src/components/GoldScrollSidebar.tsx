import React, { useState, useEffect } from 'react';
import {
  ArrowUp,
  Phone,
  Calendar,
  Sparkles,
  Shield,
  FileSearch,
  Scale,
  Award,
  BookOpen,
  HelpCircle,
  MessageSquareQuote,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface SectionItem {
  id: string;
  label: string;
  icon: React.ElementType;
}

const SECTIONS: SectionItem[] = [
  { id: 'hero', label: 'سرآغاز و معرفی', icon: Scale },
  { id: 'stories', label: 'استوری‌های آموزشی', icon: Sparkles },
  { id: 'stats', label: 'آمار و اعتبار', icon: Award },
  { id: 'services', label: 'حوزه‌های تخصصی', icon: Shield },
  { id: 'about', label: 'درباره وکیل', icon: Scale },
  { id: 'testimonials', label: 'روایت موکلین', icon: MessageSquareQuote },
  { id: 'articles', label: 'یادداشت‌های حقوقی', icon: BookOpen },
  { id: 'faq', label: 'پرسش‌های متداول', icon: HelpCircle },
  { id: 'tracking', label: 'پیگیری آنلاین پرونده', icon: FileSearch },
  { id: 'booking', label: 'رزرو نوبت مشاوره', icon: Calendar },
];

interface GoldScrollSidebarProps {
  onNavigateSection?: (sectionId: string) => void;
  onOpenBooking?: () => void;
  onOpenCaseTracker?: () => void;
  isMainPage?: boolean;
}

export const GoldScrollSidebar: React.FC<GoldScrollSidebarProps> = ({
  onNavigateSection,
  onOpenBooking,
  onOpenCaseTracker,
  isMainPage = true,
}) => {
  const [scrollPercent, setScrollPercent] = useState<number>(0);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [showTooltip, setShowTooltip] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = scrollHeight > 0 ? Math.min(100, Math.max(0, Math.round((scrollTop / scrollHeight) * 100))) : 0;
      setScrollPercent(progress);

      if (isMainPage) {
        // Detect current active section based on viewport scroll position
        const offsets = SECTIONS.map((sec) => {
          const el = document.getElementById(sec.id);
          if (!el) return { id: sec.id, top: -99999 };
          const rect = el.getBoundingClientRect();
          return { id: sec.id, top: rect.top };
        });

        // Find the section closest to top or slightly above middle
        const active = offsets
          .filter((item) => item.top <= window.innerHeight * 0.45)
          .sort((a, b) => b.top - a.top)[0];

        if (active) {
          setActiveSection(active.id);
        } else if (offsets[0]) {
          setActiveSection(offsets[0].id);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMainPage]);

  const scrollToSection = (sectionId: string) => {
    if (onNavigateSection) {
      onNavigateSection(sectionId);
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* 1. Slim Radiant Yellow/Gold Top Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-[3.5px] z-50 bg-black/10 pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-[#D4AF37] via-[#FCE38A] to-[#AA820A] shadow-[0_0_12px_rgba(212,175,55,0.8)] transition-all duration-150 ease-out"
          style={{ width: `${scrollPercent}%` }}
        />
      </div>

      {/* 2. Floating Gold Scroll Navigation Sidebar (Desktop & Tablet) */}
      <aside
        aria-label="سایدبار ناوبری و اسکرول طلایی"
        className={`fixed left-3 sm:left-4 top-1/2 -translate-y-1/2 z-40 transition-all duration-300 ${
          isCollapsed ? '-translate-x-12 sm:-translate-x-14' : 'translate-x-0'
        }`}
      >
        <div className="relative group/sidebar">
          {/* Main Container with Golden Borders and Ambient Glow */}
          <div className="relative rounded-2xl bg-[#060B18]/90 dark:bg-[#060B18]/95 backdrop-blur-xl border-2 border-[#D4AF37]/50 shadow-[0_10px_35px_-5px_rgba(0,0,0,0.6),0_0_20px_rgba(212,175,55,0.25)] p-2 sm:p-2.5 flex flex-col items-center gap-2 text-white">
            
            {/* Header: Percentage Badge */}
            <div
              className="flex flex-col items-center justify-center p-1 rounded-xl bg-[#0B132B] border border-[#D4AF37]/40 w-10 sm:w-11 cursor-pointer transition-all hover:border-[#D4AF37]"
              onClick={scrollToTop}
              title="درصد اسکرول صفحه - کلیک برای بازگشت به بالا"
            >
              <span className="text-[10px] font-black font-mono text-[#D4AF37]">
                {scrollPercent}٪
              </span>
              <div className="w-6 h-1 bg-gray-800 rounded-full overflow-hidden mt-0.5">
                <div
                  className="h-full bg-[#D4AF37] transition-all duration-150"
                  style={{ width: `${scrollPercent}%` }}
                />
              </div>
            </div>

            {/* Vertical Glowing Gold Track */}
            <div className="relative w-1.5 h-36 sm:h-44 bg-gray-800/80 rounded-full overflow-hidden my-1">
              <div
                className="w-full bg-gradient-to-b from-[#FCE38A] via-[#D4AF37] to-[#AA820A] shadow-[0_0_8px_#D4AF37] rounded-full transition-all duration-150"
                style={{ height: `${scrollPercent}%` }}
              />
            </div>

            {/* Interactive Section Dots (Only on Main Page) */}
            {isMainPage && (
              <div className="flex flex-col items-center gap-1.5 py-1">
                {SECTIONS.map((sec) => {
                  const isActive = activeSection === sec.id;
                  const Icon = sec.icon;

                  return (
                    <div
                      key={sec.id}
                      className="relative flex items-center justify-center"
                      onMouseEnter={() => setShowTooltip(sec.id)}
                      onMouseLeave={() => setShowTooltip(null)}
                    >
                      <button
                        onClick={() => scrollToSection(sec.id)}
                        className={`group relative p-1.5 rounded-lg transition-all duration-200 cursor-pointer ${
                          isActive
                            ? 'bg-[#D4AF37] text-[#060B18] shadow-[0_0_12px_rgba(212,175,55,0.7)] scale-110 ring-2 ring-[#FCE38A]'
                            : 'text-gray-400 hover:text-[#D4AF37] hover:bg-white/5'
                        }`}
                        aria-label={sec.label}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        {isActive && (
                          <span className="absolute -inset-1 rounded-lg border border-[#D4AF37] animate-ping opacity-30 pointer-events-none" />
                        )}
                      </button>

                      {/* Tooltip on Hover (Points Right towards page content in RTL) */}
                      {showTooltip === sec.id && (
                        <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-lg bg-[#0B132B] border border-[#D4AF37]/50 text-[#F3E5AB] text-xs font-bold whitespace-nowrap shadow-xl z-50 pointer-events-none flex items-center gap-1.5 animate-fadeIn">
                          <span>{sec.label}</span>
                          <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Quick Action Buttons */}
            <div className="pt-1 border-t border-gray-800 flex flex-col items-center gap-1.5">
              {/* Quick Booking */}
              <button
                onClick={() => (onOpenBooking ? onOpenBooking() : scrollToSection('booking'))}
                className="p-1.5 rounded-lg bg-[#D4AF37]/20 hover:bg-[#D4AF37] text-[#D4AF37] hover:text-[#060B18] transition-all cursor-pointer group"
                title="رزرو نوبت مشاوره"
              >
                <Calendar className="w-3.5 h-3.5" />
              </button>

              {/* Quick Case Tracking */}
              <button
                onClick={() => (onOpenCaseTracker ? onOpenCaseTracker() : scrollToSection('tracking'))}
                className="p-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500 text-emerald-400 hover:text-white transition-all cursor-pointer"
                title="پیگیری آنلاین پرونده"
              >
                <FileSearch className="w-3.5 h-3.5" />
              </button>

              {/* Emergency Call */}
              <a
                href="tel:02188888888"
                className="p-1.5 rounded-lg bg-[#0B132B] hover:bg-[#D4AF37] text-gray-300 hover:text-[#060B18] border border-gray-700 transition-all"
                title="تماس فوری با دفتر ونک"
              >
                <Phone className="w-3.5 h-3.5" />
              </a>

              {/* Scroll To Top Button with Circular Progress */}
              <button
                onClick={scrollToTop}
                className={`p-1.5 rounded-lg bg-gradient-to-tr from-[#D4AF37] to-[#FCE38A] text-[#060B18] font-bold shadow-md hover:scale-110 active:scale-95 transition-all cursor-pointer ${
                  scrollPercent < 8 ? 'opacity-40 pointer-events-none' : 'opacity-100'
                }`}
                title="بازگشت به ابتدای صفحه"
              >
                <ArrowUp className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>
            </div>
          </div>

          {/* Sidebar Collapse / Expand Toggle Tab */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="absolute -left-3 top-1/2 -translate-y-1/2 w-5 h-10 rounded-r-lg bg-[#060B18] border border-l-0 border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#060B18] flex items-center justify-center transition-all shadow-md cursor-pointer"
            title={isCollapsed ? 'نمایش سایدبار اسکرول' : 'بستن سایدبار اسکرول'}
          >
            {isCollapsed ? (
              <ChevronRight className="w-3.5 h-3.5" />
            ) : (
              <ChevronLeft className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </aside>
    </>
  );
};
