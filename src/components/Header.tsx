import React, { useState, useEffect, useRef } from 'react';
import {
  Scale,
  Moon,
  Sun,
  Phone,
  Calendar,
  Code,
  Layout,
  Shield,
  HelpCircle,
  Sparkles,
  Menu,
  X,
  ChevronDown,
  Building2,
  Briefcase,
  Gavel,
  Users,
  Globe2,
  FileCheck2,
  ArrowLeft,
  CheckCircle2,
  Clock,
  Search,
  BookOpen,
  Video,
  FolderKanban,
  FileText,
} from 'lucide-react';
import { ATTORNEY_INFO } from '../data/mockData';
import { MegaMenu } from './MegaMenu';

export type ThemeViewMode = 'preview' | 'dashboard' | 'elementor' | 'shortcodes' | 'architecture' | 'code' | 'archive' | 'single';

interface HeaderProps {
  activeView: ThemeViewMode;
  setActiveView: (view: ThemeViewMode) => void;
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
  onOpenHelp: () => void;
  onOpenTour: () => void;
  onOpenSurvey: () => void;
  onOpenArticleArchive?: () => void;
  onOpenVideoArchive?: () => void;
  onSelectService?: (serviceSlug: string) => void;
  onOpenBooking?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeView,
  setActiveView,
  isDarkMode,
  setIsDarkMode,
  onOpenHelp,
  onOpenTour,
  onOpenSurvey,
  onOpenArticleArchive,
  onOpenVideoArchive,
  onSelectService,
  onOpenBooking,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setMegaMenuOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setMegaMenuOpen(false);
    }, 200);
  };

  return (
    <>
      {/* Top Notification / Bar */}
      <div className="bg-[#0B132B] text-gray-300 text-xs py-2 px-4 border-b border-[#D4AF37]/20">
        <div className="container mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-[#D4AF37] font-semibold">
              <Shield className="w-3.5 h-3.5" />
              {ATTORNEY_INFO.licenseNumber}
            </span>
            <span className="hidden sm:inline-block text-gray-500">|</span>
            <span className="hidden sm:inline-block text-gray-300">
              <Clock className="w-3 h-3 inline-block ml-1 text-gray-400" />
              {ATTORNEY_INFO.workingHours}
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <button
              onClick={onOpenSurvey}
              className="hover:text-[#D4AF37] transition-colors flex items-center gap-1 text-gray-300"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              نظرسنجی خدمات
            </button>
            <span className="text-gray-600">|</span>
            <button
              onClick={onOpenTour}
              className="hover:text-[#D4AF37] transition-colors flex items-center gap-1 text-gray-300"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              راهنمای تعاملی
            </button>
            <span className="text-gray-600">|</span>
            <button
              onClick={onOpenHelp}
              className="hover:text-[#D4AF37] transition-colors flex items-center gap-1 text-gray-300"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              آکادمی و مستندات
            </button>
            <span className="text-gray-600">|</span>
            <a href={`tel:${ATTORNEY_INFO.phone}`} className="text-gray-200 hover:text-[#D4AF37] font-mono flex items-center gap-1">
              <Phone className="w-3 h-3 text-[#D4AF37]" />
              {ATTORNEY_INFO.phone}
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Glass Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 dark:bg-[#0B132B]/95 backdrop-blur-md shadow-lg shadow-black/5 py-2.5 border-b border-[#D4AF37]/20'
            : 'bg-white/90 dark:bg-[#0B132B]/90 backdrop-blur-sm py-3.5 border-b border-gray-100 dark:border-gray-800'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Logo & Identity */}
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveView('preview')}>
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#D4AF37] via-[#C4981C] to-[#AA820A] flex items-center justify-center text-white shadow-md shadow-[#D4AF37]/30 transition-transform hover:scale-105">
                <Scale className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold font-serif text-[#0B132B] dark:text-white leading-tight">
                    SedRazavi
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#D4AF37]/15 text-[#AA820A] dark:text-[#F3E5AB] font-bold border border-[#D4AF37]/30">
                    پوسته رسمی وردپرس
                  </span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                  دفتر وکالت و مشاوره حقوقی تخصصی
                </p>
              </div>
            </div>

            {/* Desktop Navigation & Mega Menu Trigger */}
            <nav className="hidden xl:flex items-center gap-1 font-medium text-xs text-[#0B132B] dark:text-gray-200">
              <a
                href="#hero"
                onClick={() => setActiveView('preview')}
                className="px-3 py-2 rounded-lg hover:text-[#D4AF37] hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              >
                صفحه اصلی
              </a>

              {/* Mega Menu Dropdown Hover Area */}
              <div
                className="relative"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  onClick={() => {
                    setMegaMenuOpen(!megaMenuOpen);
                  }}
                  className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
                    megaMenuOpen
                      ? 'text-[#D4AF37] bg-[#D4AF37]/10'
                      : 'hover:text-[#D4AF37] hover:bg-gray-50 dark:hover:bg-gray-800/50'
                  }`}
                >
                  <span>خدمات تخصصی</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${megaMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Standalone Mega Menu Component */}
                <MegaMenu
                  isOpen={megaMenuOpen}
                  onClose={() => setMegaMenuOpen(false)}
                  onSelectService={(slug) => {
                    onSelectService?.(slug);
                    setMegaMenuOpen(false);
                  }}
                  onOpenArticleArchive={() => {
                    onOpenArticleArchive?.();
                    setMegaMenuOpen(false);
                  }}
                  onOpenVideoArchive={() => {
                    onOpenVideoArchive?.();
                    setMegaMenuOpen(false);
                  }}
                  onOpenBooking={() => {
                    onOpenBooking?.();
                    setMegaMenuOpen(false);
                  }}
                />
              </div>

              <button
                onClick={() => setActiveView('archive')}
                className={`px-3 py-2 rounded-lg transition-colors ${
                  activeView === 'archive'
                    ? 'text-[#D4AF37] font-bold bg-[#D4AF37]/10'
                    : 'hover:text-[#D4AF37] hover:bg-gray-50 dark:hover:bg-gray-800/50'
                }`}
              >
                آرشیو مقالات و ویدیوها
              </button>

              <a
                href="#about"
                onClick={() => setActiveView('preview')}
                className="px-3 py-2 rounded-lg hover:text-[#D4AF37] hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              >
                درباره وکیل
              </a>

              <a
                href="#cases"
                onClick={() => setActiveView('preview')}
                className="px-3 py-2 rounded-lg hover:text-[#D4AF37] hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              >
                پیگیری پرونده
              </a>

              <a
                href="#faq"
                onClick={() => setActiveView('preview')}
                className="px-3 py-2 rounded-lg hover:text-[#D4AF37] hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              >
                سوالات متداول
              </a>
            </nav>

            {/* View Switchers Tabs (Interactive Theme Controls) */}
            <div className="hidden lg:flex items-center p-1 rounded-xl bg-gray-100 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setActiveView('preview')}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeView === 'preview'
                    ? 'bg-white dark:bg-[#0B132B] text-[#0B132B] dark:text-white shadow-sm border border-[#D4AF37]/40'
                    : 'text-gray-600 dark:text-gray-300 hover:text-[#D4AF37]'
                }`}
                title="پیش‌نمایش فرانت‌اند سایت"
              >
                <Layout className="w-3.5 h-3.5 text-[#D4AF37]" />
                پیش‌نمایش
              </button>

              <button
                onClick={() => setActiveView('archive')}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeView === 'archive'
                    ? 'bg-white dark:bg-[#0B132B] text-[#0B132B] dark:text-white shadow-sm border border-[#D4AF37]/40'
                    : 'text-gray-600 dark:text-gray-300 hover:text-[#D4AF37]'
                }`}
                title="قالب‌های آرشیو (archive.php)"
              >
                <FolderKanban className="w-3.5 h-3.5 text-amber-500" />
                آرشیو
              </button>

              <button
                onClick={() => setActiveView('single')}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeView === 'single'
                    ? 'bg-white dark:bg-[#0B132B] text-[#0B132B] dark:text-white shadow-sm border border-[#D4AF37]/40'
                    : 'text-gray-600 dark:text-gray-300 hover:text-[#D4AF37]'
                }`}
                title="قالب نمایش تک‌مطلب و ویدیو (single.php)"
              >
                <FileText className="w-3.5 h-3.5 text-indigo-500" />
                تک‌مطلب
              </button>

              <button
                onClick={() => setActiveView('dashboard')}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeView === 'dashboard'
                    ? 'bg-white dark:bg-[#0B132B] text-[#0B132B] dark:text-white shadow-sm border border-[#D4AF37]/40'
                    : 'text-gray-600 dark:text-gray-300 hover:text-[#D4AF37]'
                }`}
                title="داشبورد پیشخوان وکیل و نظرات"
              >
                <Scale className="w-3.5 h-3.5 text-[#2A9D8F]" />
                داشبورد
              </button>

              <button
                onClick={() => setActiveView('elementor')}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeView === 'elementor'
                    ? 'bg-white dark:bg-[#0B132B] text-[#0B132B] dark:text-white shadow-sm border border-[#D4AF37]/40'
                    : 'text-gray-600 dark:text-gray-300 hover:text-[#D4AF37]'
                }`}
                title="ویجت‌ها و بلاک‌های المنتور"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                المنتور
              </button>

              <button
                onClick={() => setActiveView('shortcodes')}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeView === 'shortcodes'
                    ? 'bg-white dark:bg-[#0B132B] text-[#0B132B] dark:text-white shadow-sm border border-[#D4AF37]/40'
                    : 'text-gray-600 dark:text-gray-300 hover:text-[#D4AF37]'
                }`}
                title="شورت‌کدهای وردپرس"
              >
                <Code className="w-3.5 h-3.5 text-[#D4AF37]" />
                شورت‌کدها
              </button>

              <button
                onClick={() => setActiveView('architecture')}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeView === 'architecture'
                    ? 'bg-white dark:bg-[#0B132B] text-[#0B132B] dark:text-white shadow-sm border border-[#D4AF37]/40'
                    : 'text-gray-600 dark:text-gray-300 hover:text-[#D4AF37]'
                }`}
                title="معماری، امنیت و پلاگین‌ها"
              >
                <Shield className="w-3.5 h-3.5 text-blue-500" />
                معماری
              </button>

              <button
                onClick={() => setActiveView('code')}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeView === 'code'
                    ? 'bg-white dark:bg-[#0B132B] text-[#0B132B] dark:text-white shadow-sm border border-[#D4AF37]/40'
                    : 'text-gray-600 dark:text-gray-300 hover:text-[#D4AF37]'
                }`}
                title="مشاهده و دانلود بسته کامل پوسته"
              >
                <Code className="w-3.5 h-3.5 text-[#8B0000]" />
                ZIP پوسته
              </button>
            </div>

            {/* Right Action Icons */}
            <div className="flex items-center gap-2.5">
              {/* Dark Mode Switcher */}
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                aria-label="تغییر حالت شب و روز"
                className="p-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800 text-gray-700 dark:text-yellow-400 hover:border-[#D4AF37] transition-all"
              >
                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>

              {/* Quick CTA Button */}
              <a
                href="#booking"
                onClick={() => {
                  if (activeView !== 'preview') setActiveView('preview');
                }}
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#AA820A] text-white font-semibold text-xs shadow-md shadow-[#D4AF37]/25 hover:shadow-lg hover:shadow-[#D4AF37]/40 hover:-translate-y-0.5 transition-all"
              >
                <Calendar className="w-3.5 h-3.5" />
                رزرو نوبت مشاوره
              </a>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="xl:hidden p-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0B132B] px-4 py-4 space-y-4 max-h-[80vh] overflow-y-auto">
            {/* View Switchers on Mobile */}
            <div className="grid grid-cols-4 gap-2 pb-3 border-b border-gray-100 dark:border-gray-800">
              <button
                onClick={() => {
                  setActiveView('preview');
                  setMobileMenuOpen(false);
                }}
                className={`p-2 rounded-lg text-[11px] font-bold flex flex-col items-center gap-1 ${
                  activeView === 'preview' ? 'bg-[#D4AF37] text-[#0B132B]' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200'
                }`}
              >
                <Layout className="w-3.5 h-3.5" />
                صفحه اصلی
              </button>

              <button
                onClick={() => {
                  setActiveView('archive');
                  setMobileMenuOpen(false);
                }}
                className={`p-2 rounded-lg text-[11px] font-bold flex flex-col items-center gap-1 ${
                  activeView === 'archive' ? 'bg-[#D4AF37] text-[#0B132B]' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200'
                }`}
              >
                <FolderKanban className="w-3.5 h-3.5" />
                آرشیو
              </button>

              <button
                onClick={() => {
                  setActiveView('single');
                  setMobileMenuOpen(false);
                }}
                className={`p-2 rounded-lg text-[11px] font-bold flex flex-col items-center gap-1 ${
                  activeView === 'single' ? 'bg-[#D4AF37] text-[#0B132B]' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                تک‌مطلب
              </button>

              <button
                onClick={() => {
                  setActiveView('dashboard');
                  setMobileMenuOpen(false);
                }}
                className={`p-2 rounded-lg text-[11px] font-bold flex flex-col items-center gap-1 ${
                  activeView === 'dashboard' ? 'bg-[#2A9D8F] text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200'
                }`}
              >
                <Scale className="w-3.5 h-3.5" />
                داشبورد
              </button>

              <button
                onClick={() => {
                  setActiveView('elementor');
                  setMobileMenuOpen(false);
                }}
                className={`p-2 rounded-lg text-[11px] font-bold flex flex-col items-center gap-1 ${
                  activeView === 'elementor' ? 'bg-[#D4AF37] text-[#0B132B]' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                المنتور
              </button>

              <button
                onClick={() => {
                  setActiveView('shortcodes');
                  setMobileMenuOpen(false);
                }}
                className={`p-2 rounded-lg text-[11px] font-bold flex flex-col items-center gap-1 ${
                  activeView === 'shortcodes' ? 'bg-[#D4AF37] text-[#0B132B]' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200'
                }`}
              >
                <Code className="w-3.5 h-3.5" />
                شورت‌کدها
              </button>

              <button
                onClick={() => {
                  setActiveView('architecture');
                  setMobileMenuOpen(false);
                }}
                className={`p-2 rounded-lg text-[11px] font-bold flex flex-col items-center gap-1 ${
                  activeView === 'architecture' ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200'
                }`}
              >
                <Shield className="w-3.5 h-3.5" />
                معماری
              </button>

              <button
                onClick={() => {
                  setActiveView('code');
                  setMobileMenuOpen(false);
                }}
                className={`p-2 rounded-lg text-[11px] font-bold flex flex-col items-center gap-1 ${
                  activeView === 'code' ? 'bg-[#8B0000] text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200'
                }`}
              >
                <Code className="w-3.5 h-3.5" />
                ZIP پوسته
              </button>
            </div>

            {/* Mobile Navigation Links */}
            <div className="space-y-1 text-xs text-gray-700 dark:text-gray-200">
              <a
                href="#hero"
                onClick={() => {
                  setActiveView('preview');
                  setMobileMenuOpen(false);
                }}
                className="block py-2.5 px-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                🏠 صفحه اصلی
              </a>

              {/* Accordion for Legal Services in Mobile */}
              <div>
                <button
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                  className="w-full flex items-center justify-between py-2.5 px-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 font-semibold text-[#D4AF37]"
                >
                  <span className="flex items-center gap-2">
                    <Scale className="w-4 h-4" />
                    خدمات تخصصی حقوقی
                  </span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`} />
                </button>

                {mobileServicesOpen && (
                  <div className="pr-4 pl-2 py-2 space-y-2 border-r-2 border-[#D4AF37]/40 mr-3 my-1 bg-gray-50/50 dark:bg-gray-900/40 rounded-lg">
                    <a
                      href="#services"
                      onClick={() => {
                        setActiveView('preview');
                        setMobileMenuOpen(false);
                      }}
                      className="block text-xs py-1 text-gray-600 dark:text-gray-300 hover:text-[#D4AF37]"
                    >
                      • دعاوی ملکی، ثبتی و اراضی
                    </a>
                    <a
                      href="#services"
                      onClick={() => {
                        setActiveView('preview');
                        setMobileMenuOpen(false);
                      }}
                      className="block text-xs py-1 text-gray-600 dark:text-gray-300 hover:text-[#D4AF37]"
                    >
                      • دعاوی تجاری، شرکت‌ها و چک
                    </a>
                    <a
                      href="#services"
                      onClick={() => {
                        setActiveView('preview');
                        setMobileMenuOpen(false);
                      }}
                      className="block text-xs py-1 text-gray-600 dark:text-gray-300 hover:text-[#D4AF37]"
                    >
                      • دعاوی کیفری و اقتصادی
                    </a>
                    <a
                      href="#services"
                      onClick={() => {
                        setActiveView('preview');
                        setMobileMenuOpen(false);
                      }}
                      className="block text-xs py-1 text-gray-600 dark:text-gray-300 hover:text-[#D4AF37]"
                    >
                      • انحصار وراثت و خانواده
                    </a>
                    <a
                      href="#services"
                      onClick={() => {
                        setActiveView('preview');
                        setMobileMenuOpen(false);
                      }}
                      className="block text-xs py-1 text-gray-600 dark:text-gray-300 hover:text-[#D4AF37]"
                    >
                      • داوری بین‌المللی و قراردادها
                    </a>
                  </div>
                )}
              </div>

              <a
                href="#about"
                onClick={() => {
                  setActiveView('preview');
                  setMobileMenuOpen(false);
                }}
                className="block py-2.5 px-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                ⚖️ درباره وکیل و سوابق
              </a>

              <a
                href="#cases"
                onClick={() => {
                  setActiveView('preview');
                  setMobileMenuOpen(false);
                }}
                className="block py-2.5 px-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                🔍 سامانه پیگیری پرونده
              </a>

              <a
                href="#articles"
                onClick={() => {
                  setActiveView('preview');
                  setMobileMenuOpen(false);
                }}
                className="block py-2.5 px-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                📚 مقالات و دانستنی‌های قانونی
              </a>

              <a
                href="#booking"
                onClick={() => {
                  setActiveView('preview');
                  setMobileMenuOpen(false);
                }}
                className="block py-2.5 px-3 rounded-lg bg-[#D4AF37]/15 text-[#AA820A] dark:text-[#F3E5AB] font-bold border border-[#D4AF37]/30"
              >
                📅 رزرو آنلاین نوبت مشاوره
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

