import React, { useState, useEffect, useRef } from 'react';
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
  Compass,
  Home,
  Gavel,
  PenTool,
  Camera,
  X,
  Calculator,
  Briefcase,
  Binary,
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
  onOpenFinance?: () => void;
  onOpenPhase5?: () => void;
  onOpenPhase6?: () => void;
  onOpenPhase7?: () => void;
  onOpenPhase8?: () => void;
  onOpenPhase9?: () => void;
  onOpenPhase10?: () => void;
  isMainPage?: boolean;
}

export const GoldScrollSidebar: React.FC<GoldScrollSidebarProps> = ({
  onNavigateSection,
  onOpenBooking,
  onOpenCaseTracker,
  onOpenFinance,
  onOpenPhase5,
  onOpenPhase6,
  onOpenPhase7,
  onOpenPhase8,
  onOpenPhase9,
  onOpenPhase10,
  isMainPage = true,
}) => {
  const [scrollPercent, setScrollPercent] = useState<number>(0);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [showTooltip, setShowTooltip] = useState<string | null>(null);
  const [isFloatingMenuOpen, setIsFloatingMenuOpen] = useState<boolean>(false);
  const floatingMenuRef = useRef<HTMLDivElement>(null);

  // Close floating menu on click outside or Escape
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (floatingMenuRef.current && !floatingMenuRef.current.contains(e.target as Node)) {
        setIsFloatingMenuOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsFloatingMenuOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

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
          isCollapsed
            ? '-translate-x-[250%] opacity-0 pointer-events-none scale-95'
            : 'translate-x-0 opacity-100 scale-100'
        }`}
      >
        <div className="relative group/sidebar">
          {/* Main Container with Golden Borders and Ambient Glow */}
          <div className="relative rounded-2xl bg-[#060B18]/90 dark:bg-[#060B18]/95 backdrop-blur-xl border-2 border-[#D4AF37]/50 shadow-[0_10px_35px_-5px_rgba(0,0,0,0.6),0_0_20px_rgba(212,175,55,0.25)] p-2 sm:p-2.5 flex flex-col items-center gap-2 text-white">
            
            {/* Top Close Button (Directly Closes Sidebar 100%) */}
            <button
              onClick={() => setIsCollapsed(true)}
              className="w-full py-1 rounded-lg bg-gray-800/60 hover:bg-rose-500/20 text-gray-400 hover:text-rose-300 text-[10px] flex items-center justify-center gap-1 transition-all cursor-pointer"
              title="بستن و محو کامل سایدبار"
            >
              <X className="w-3 h-3" />
              <span className="text-[9px] font-semibold">بستن</span>
            </button>

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

              {/* Quick Legal Finance & Contracts (Phase 4) */}
              {onOpenFinance && (
                <button
                  onClick={onOpenFinance}
                  className="p-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500 text-amber-400 hover:text-[#060B18] transition-all cursor-pointer"
                  title="محاسبه‌گر دادرسی، قرارداد و پرداخت (فاز ۴)"
                >
                  <Calculator className="w-3.5 h-3.5" />
                </button>
              )}

              {/* Quick ODR, Virtual Court & Petitions (Phase 5) */}
              {onOpenPhase5 && (
                <button
                  onClick={onOpenPhase5}
                  className="p-1.5 rounded-lg bg-indigo-500/20 hover:bg-indigo-500 text-indigo-400 hover:text-white transition-all cursor-pointer"
                  title="سامانه داوری آنلاین، دادگاه مجازی و لوایح قضایی (فاز ۵)"
                >
                  <Gavel className="w-3.5 h-3.5" />
                </button>
              )}

              {/* Quick Legal AI Intelligence & Precedents (Phase 6) */}
              {onOpenPhase6 && (
                <button
                  onClick={onOpenPhase6}
                  className="p-1.5 rounded-lg bg-amber-500/20 hover:bg-[#D4AF37] text-amber-300 hover:text-[#060B18] transition-all cursor-pointer"
                  title="سامانه هوش حقوقی، ممیزی قراردادها و تنقیح آراء (فاز ۶)"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                </button>
              )}

              {/* Quick Corporate Governance & International Trade (Phase 8) */}
              {onOpenPhase8 && (
                <button
                  onClick={onOpenPhase8}
                  className="p-1.5 rounded-lg bg-blue-500/20 hover:bg-blue-500 text-blue-400 hover:text-white transition-all cursor-pointer"
                  title="امور شرکت‌ها، اینکوترمز ۲۰۲۰ و داوری بین‌المللی (فاز ۸)"
                >
                  <Briefcase className="w-3.5 h-3.5" />
                </button>
              )}

              {/* Quick Intellectual Property, Startups & Software Licensing (Phase 9) */}
              {onOpenPhase9 && (
                <button
                  onClick={onOpenPhase9}
                  className="p-1.5 rounded-lg bg-[#D4AF37]/25 hover:bg-[#D4AF37] text-[#D4AF37] hover:text-[#060B18] transition-all cursor-pointer ring-1 ring-[#D4AF37]/50"
                  title="مالکیت فکری، استارتاپ‌ها، طبقات نیس و لایسنس نرم‌افزار (فاز ۹)"
                >
                  <Shield className="w-3.5 h-3.5" />
                </button>
              )}

              {/* Quick Cybercrime, Digital Evidence & Blockchain Security (Phase 10) */}
              {onOpenPhase10 && (
                <button
                  onClick={onOpenPhase10}
                  className="p-1.5 rounded-lg bg-rose-500/25 hover:bg-rose-500 text-rose-400 hover:text-white transition-all cursor-pointer ring-1 ring-rose-500/50"
                  title="جرایم سایبری، ادله الکترونیکی و امنیت قراردادهای هوشمند (فاز ۱۰)"
                >
                  <Binary className="w-3.5 h-3.5" />
                </button>
              )}

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

          {/* Inner Edge Tab to Collapse Sidebar Completely */}
          <button
            onClick={() => setIsCollapsed(true)}
            className="absolute -right-3.5 top-1/2 -translate-y-1/2 w-4 h-10 rounded-l-lg bg-[#060B18] border border-r-0 border-[#D4AF37]/50 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#060B18] flex items-center justify-center transition-all shadow-md cursor-pointer"
            title="بستن و محو کامل سایدبار"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
        </div>
      </aside>

      {/* 2.5 Docked Gold Tab to Reopen Sidebar When Collapsed (100% visible on left edge) */}
      {isCollapsed && (
        <button
          onClick={() => setIsCollapsed(false)}
          className="fixed left-0 top-1/2 -translate-y-1/2 z-40 px-2 py-3.5 bg-[#060B18]/95 backdrop-blur-md border-2 border-l-0 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#060B18] rounded-r-xl shadow-[0_4px_25px_rgba(212,175,55,0.5)] flex flex-col items-center gap-1.5 transition-all duration-300 group cursor-pointer hover:px-2.5 animate-fadeIn"
          title="نمایش کامل سایدبار اسکرول طلایی"
        >
          <ChevronRight className="w-4 h-4 stroke-[3] group-hover:scale-125 transition-transform" />
          <span className="text-[10px] font-black font-mono text-[#FCE38A]">
            {scrollPercent}٪
          </span>
          <span className="text-[9px] font-bold text-gray-300 group-hover:text-white writing-mode-vertical rotate-180 select-none tracking-widest pt-1">
            سایدبار
          </span>
        </button>
      )}

      {/* 3. Floating 50x50px Circular Gold Quick Launcher (SPEC Part 3 Section 5) */}
      <div
        ref={floatingMenuRef}
        className="fixed bottom-6 right-6 z-40 flex flex-col items-end select-none"
      >
        {/* Expanded 7-Icon Menu Popup */}
        {isFloatingMenuOpen && (
          <div className="mb-3 flex flex-col items-stretch gap-1.5 p-2 rounded-2xl bg-[#060B18]/95 dark:bg-[#060B18]/95 backdrop-blur-xl border-2 border-[#D4AF37]/60 shadow-[0_15px_35px_rgba(0,0,0,0.6),0_0_25px_rgba(212,175,55,0.3)] animate-fadeIn text-white min-w-[180px]">
            {/* 1. صفحه اصلی */}
            <button
              onClick={() => {
                scrollToTop();
                setIsFloatingMenuOpen(false);
              }}
              className="p-2 rounded-xl text-gray-300 hover:text-[#060B18] hover:bg-[#D4AF37] transition-all flex items-center gap-2.5 w-full text-xs font-bold text-right"
              title="صفحه اصلی"
            >
              <Home className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>صفحه اصلی</span>
            </button>

            {/* 2. خدمات حقوقی */}
            <button
              onClick={() => {
                scrollToSection('services');
                setIsFloatingMenuOpen(false);
              }}
              className="p-2 rounded-xl text-gray-300 hover:text-[#060B18] hover:bg-[#D4AF37] transition-all flex items-center gap-2.5 w-full text-xs font-bold text-right"
              title="خدمات حقوقی"
            >
              <Gavel className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>خدمات حقوقی</span>
            </button>

            {/* 3. مقالات و وبلاگ */}
            <button
              onClick={() => {
                scrollToSection('articles');
                setIsFloatingMenuOpen(false);
              }}
              className="p-2 rounded-xl text-gray-300 hover:text-[#060B18] hover:bg-[#D4AF37] transition-all flex items-center gap-2.5 w-full text-xs font-bold text-right"
              title="یادداشت‌ها و مقالات"
            >
              <PenTool className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>مقالات و وبلاگ</span>
            </button>

            {/* 4. رسانه و گالری */}
            <button
              onClick={() => {
                scrollToSection('stories');
                setIsFloatingMenuOpen(false);
              }}
              className="p-2 rounded-xl text-gray-300 hover:text-[#060B18] hover:bg-[#D4AF37] transition-all flex items-center gap-2.5 w-full text-xs font-bold text-right"
              title="ویدئوها و استوری‌ها"
            >
              <Camera className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>رسانه و ویدئوها</span>
            </button>

            {/* 5. درباره وکیل */}
            <button
              onClick={() => {
                scrollToSection('about');
                setIsFloatingMenuOpen(false);
              }}
              className="p-2 rounded-xl text-gray-300 hover:text-[#060B18] hover:bg-[#D4AF37] transition-all flex items-center gap-2.5 w-full text-xs font-bold text-right"
              title="درباره وکیل"
            >
              <Scale className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>درباره وکیل</span>
            </button>

            {/* 6. تماس و رزرو */}
            <button
              onClick={() => {
                if (onOpenBooking) onOpenBooking();
                else scrollToSection('booking');
                setIsFloatingMenuOpen(false);
              }}
              className="p-2 rounded-xl text-gray-300 hover:text-[#060B18] hover:bg-[#D4AF37] transition-all flex items-center gap-2.5 w-full text-xs font-bold text-right"
              title="رزرو نوبت مشاوره"
            >
              <Calendar className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>رزرو نوبت مشاوره</span>
            </button>

            {/* 6.5. میز مالی و قراردادها (فاز ۴) */}
            {onOpenFinance && (
              <button
                onClick={() => {
                  onOpenFinance();
                  setIsFloatingMenuOpen(false);
                }}
                className="p-2 rounded-xl text-emerald-400 hover:text-[#060B18] hover:bg-[#D4AF37] transition-all flex items-center gap-2.5 w-full text-xs font-bold text-right"
                title="میز مالی و قراردادها"
              >
                <Calculator className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>محاسبه‌گر و قراردادها</span>
              </button>
            )}

            {/* 6.6. سامانه داوری آنلاین و لوایح قضایی (فاز ۵) */}
            {onOpenPhase5 && (
              <button
                onClick={() => {
                  onOpenPhase5();
                  setIsFloatingMenuOpen(false);
                }}
                className="p-2 rounded-xl text-indigo-400 hover:text-[#060B18] hover:bg-[#D4AF37] transition-all flex items-center gap-2.5 w-full text-xs font-bold text-right"
                title="سامانه داوری آنلاین و دادگاه مجازی"
              >
                <Gavel className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>داوری، دادگاه مجازی و لوایح</span>
              </button>
            )}

            {/* 6.7. سامانه هوش حقوقی و ممیزی قراردادها (فاز ۶) */}
            {onOpenPhase6 && (
              <button
                onClick={() => {
                  onOpenPhase6();
                  setIsFloatingMenuOpen(false);
                }}
                className="p-2 rounded-xl text-amber-300 hover:text-[#060B18] hover:bg-[#D4AF37] transition-all flex items-center gap-2.5 w-full text-xs font-bold text-right"
                title="سامانه هوش حقوقی و ممیزی قراردادها"
              >
                <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
                <span>هوش حقوقی و ممیزی قراردادها</span>
              </button>
            )}

            {/* 6.8. سامانه استراتژی دادرسی، مواعد و گاوصندوق امن (فاز ۷) */}
            {onOpenPhase7 && (
              <button
                onClick={() => {
                  onOpenPhase7();
                  setIsFloatingMenuOpen(false);
                }}
                className="p-2 rounded-xl text-[#D4AF37] hover:text-[#060B18] hover:bg-[#D4AF37] transition-all flex items-center gap-2.5 w-full text-xs font-bold text-right"
                title="استراتژی دادرسی، مواعد و گاوصندوق امن"
              >
                <Compass className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>استراتژی دادرسی و گاوصندوق اسناد</span>
              </button>
            )}

            {/* 6.9. سامانه امور شرکت‌ها، بازرگانی بین‌الملل و داوری (فاز ۸) */}
            {onOpenPhase8 && (
              <button
                onClick={() => {
                  onOpenPhase8();
                  setIsFloatingMenuOpen(false);
                }}
                className="p-2 rounded-xl text-blue-400 hover:text-[#060B18] hover:bg-[#D4AF37] transition-all flex items-center gap-2.5 w-full text-xs font-bold text-right"
                title="امور شرکت‌ها، اینکوترمز ۲۰۲۰ و داوری بین‌المللی"
              >
                <Briefcase className="w-4 h-4 text-blue-400 shrink-0" />
                <span>امور شرکت‌ها، اینکوترمز و داوری</span>
              </button>
            )}

            {/* 7. بازگشت به بالا */}
            <button
              onClick={() => {
                scrollToTop();
                setIsFloatingMenuOpen(false);
              }}
              className="p-2 rounded-xl bg-[#D4AF37]/20 hover:bg-[#D4AF37] text-[#D4AF37] hover:text-[#060B18] transition-all flex items-center gap-2.5 w-full text-xs font-bold text-right border-t border-gray-800 pt-2"
              title="بازگشت به ابتدای صفحه"
            >
              <ArrowUp className="w-4 h-4 shrink-0" />
              <span>بازگشت به بالا</span>
            </button>
          </div>
        )}

        {/* 50x50px Circular Gold Trigger Button */}
        <button
          onClick={() => setIsFloatingMenuOpen(!isFloatingMenuOpen)}
          className={`w-[50px] h-[50px] rounded-full bg-gradient-to-tr from-[#D4AF37] via-[#FCE38A] to-[#AA820A] text-[#0B132B] font-bold shadow-[0_4px_20px_rgba(212,175,55,0.45)] hover:shadow-[0_6px_25px_rgba(212,175,55,0.6)] flex items-center justify-center transition-all duration-300 transform active:scale-95 cursor-pointer border-2 border-white/40 ${
            isFloatingMenuOpen ? 'rotate-90 scale-105' : 'hover:scale-110'
          }`}
          title={isFloatingMenuOpen ? 'بستن منوی دسترسی سریع' : 'منوی دسترسی سریع و ناوبری'}
          aria-label="منوی دسترسی سریع"
        >
          {isFloatingMenuOpen ? (
            <X className="w-6 h-6 stroke-[2.5]" />
          ) : (
            <Compass className="w-6 h-6 stroke-[2.2] animate-pulse" />
          )}
        </button>
      </div>
    </>
  );
};
