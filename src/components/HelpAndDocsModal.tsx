import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  HelpCircle,
  Video,
  FileText,
  Download,
  Phone,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Play,
  Pause,
  RotateCcw,
  FastForward,
  Volume2,
  VolumeX,
  Maximize2,
  Settings,
  Check,
  Layers,
  BookOpen,
  Award,
  ArrowRight,
  Monitor,
} from 'lucide-react';
import { ATTORNEY_INFO } from '../data/mockData';

interface HelpAndDocsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartTour?: (tourIndex: number) => void;
}

interface StepGuide {
  id: number;
  title: string;
  category: string;
  summary: string;
  steps: string[];
}

const STEP_BY_STEP_GUIDES: StepGuide[] = [
  {
    id: 1,
    title: 'نصب و راه‌اندازی قالب دادمان در وردپرس ۶.۷',
    category: 'نصب و زیرساخت',
    summary: 'نصب سریع بسته قالب از طریق پیشخوان وردپرس یا FTP در کمتر از ۲ دقیقه',
    steps: [
      'فایل زیپ dadman-theme.zip را از تب سورس‌کدها دانلود نمایید.',
      'وارد پیشخوان وردپرس شوید و به مسیر نمایش ← پوسته‌ها ← افزودن پوسته بروید.',
      'دکمه بارگذاری پوسته را زده و فایل زیپ را انتخاب و فعال فرمایید.',
      'افزونه‌های پیشنهادی (ACF Pro، المنتور و درگاه بانکی) را به صورت خودکار با ۱ کلیک نصب کنید.',
    ],
  },
  {
    id: 2,
    title: 'تنظیمات اولیه (اطلاعات تماس، پروانه وکالت و رنگ‌ها)',
    category: 'سفارشی‌سازی',
    summary: 'پیکربندی هویت وکیل، لوگو، شماره پروانه کانون و پالت رنگی اختصاصی',
    steps: [
      'به مسیر پیشخوان ← دادمان ← تنظیمات عمومی بروید.',
      'شماره پروانه وکالت، شماره‌های تماس همراه/ثابت و آدرس پستی دفتر را درج نمایید.',
      'لوگوی وکیل و فاوآیکون را آپلود کرده و رنگ طلایی یا سرمه‌ای سازمانی را سفارشی‌سازی کنید.',
      'تنظیمات را ذخیره نمایید تا در هدر شیشه‌ای و فوتر به صورت خودکار همگام شوند.',
    ],
  },
  {
    id: 3,
    title: 'ایجاد و مدیریت خدمات حقوقی (Custom Post Type)',
    category: 'مدیریت محتوا',
    summary: 'تعریف حوزه‌های وکالت (کیفری، تجاری، ملکی، خانواده) با برآورد هزینه و مدارک',
    steps: [
      'از منوی دادمان ← خدمات حقوقی ← افزودن خدمت جدید را انتخاب کنید.',
      'عنوان خدمت، خلاصه پرونده و آیکون ایموجی را وارد کنید.',
      'در متاباکس‌های اختصاصی، تعرفه حق‌الوکاله پایه و مدت زمان تقریبی دادرسی را مشخص نمایید.',
      'چک‌لیست مدارک لازم (مانند سند مالکیت، مبایعه‌نامه) را اضافه و منتشر کنید.',
    ],
  },
  {
    id: 4,
    title: 'ایجاد و انتشار مقالات و تحلیل‌های حقوقی',
    category: 'مدیریت محتوا',
    summary: 'نگارش تحلیل آراء وحدت رویه و نکات قضایی با سئوی ساختاریافته',
    steps: [
      'به بخش نوشته‌ها ← افزودن نوشته بروید.',
      'عنوان حقوقی، دسته‌بندی موضوعی و مدت زمان مطالعه را تعیین کنید.',
      'متن مقاله را به همراه تصویر شاخص بهینه‌سازی‌شده درج فرمایید.',
      'قالب به صورت خودکار اسکیماهای Article و FAQPage را برای گوگل درج می‌کند.',
    ],
  },
  {
    id: 5,
    title: 'ایجاد و مدیریت پرونده‌های موکلان و رهگیری آنلاین',
    category: 'داشبورد وکلا',
    summary: 'ثبت شماره پرونده، ابلاغیه‌های ثنا، نوبت دادگاه و ارسال پیامک خودکار',
    steps: [
      'از منوی داشبورد وکیل ← افزودن پرونده جدید را کلیک کنید.',
      'شماره پرونده، نام و شماره موبایل موکل و حوزه دادرسی را ثبت فرمایید.',
      'تاریخ جلسه آینده دادگاه و وضعیت رسیدگی (در جریان / مختومه) را انتخاب کنید.',
      'موکل می‌تواند با شماره تماس خود در صفحه اصلی، وضعیت لحظه‌ای را مشاهده کند.',
    ],
  },
  {
    id: 6,
    title: 'ثبت و تایید نظرات و تجربیات موکلان',
    category: 'اعتبار و برندینگ',
    summary: 'مدیریت بازخوردهای دریافتی موکلان با امتیاز ۵ ستاره و نشان احراز هویت',
    steps: [
      'از منوی دادمان ← نظرات موکلان دیدگاه‌های ارسالی از ویجت نظرسنجی را بررسی کنید.',
      'پس از اطمینان از صحت اطلاعات، دکمه «تایید و نمایش در سایت» را بزنید.',
      'نظرات به صورت خودکار در اسلایدر صفحه نخست و برگه خدمات مرتبط لود می‌شوند.',
    ],
  },
  {
    id: 7,
    title: 'تنظیم منوها، مگامنوی حوزه‌های وکالت و فوتر',
    category: 'ناوبری و ساختار',
    summary: 'پیکربندی فهرست اصلی، فهرست آبشاری حوزه‌های وکالت و ۴ ستون فوتر',
    steps: [
      'به مسیر پیشخوان ← نمایش ← فهرست‌ها بروید.',
      'فهرست اصلی را انتخاب و لینک‌های خدمات، درباره، مقالات و رزرو را بچینید.',
      'برای فعال‌سازی مگامنو، کلاس css با نام mega-menu را به منوی خدمات بیفزایید.',
      'ابزارک‌های فوتر را در بخش نمایش ← ابزارک‌ها در ۴ ستون تفکیک کنید.',
    ],
  },
  {
    id: 8,
    title: 'شخصی‌سازی لندینگ پیج و نوار استوری‌های حقوقی',
    category: 'طراحی فرانت‌اند',
    summary: 'ویرایش اسلایدهای استوری‌بار، پیام‌های هیرو و شمارنده‌های افتخارات',
    steps: [
      'از منوی دادمان ← استوری‌های حقوقی، دسته‌های استوری را تعریف کنید.',
      'تصاویر اسلایدها و تیترهای مشاوره‌ای را وارد و لینک مستقیم مشاوره ثبت نمایید.',
      'اعداد شمارنده‌های پرونده‌های موفق (۱۲۸۰+) و رضایت موکل را به دلخواه تنظیم کنید.',
    ],
  },
  {
    id: 9,
    title: 'پیکربندی سیستم رزرو نوبت آنلاین و درگاه پرداخت',
    category: 'تعاملی و مالی',
    summary: 'تعریف ساعات مشاوره حضوری/تلفنی، اتصال درگاه بانکی و پیامک ثنا',
    steps: [
      'در بخش دادمان ← نوبت‌دهی، روزهای مجاز هفته و بازه‌های ۴۵ دقیقه‌ای را تعیین کنید.',
      'مبلغ پیش‌پرداخت بیعانه مشاوره را وارد کنید.',
      'مرچنت کد درگاه زرین‌پال یا به‌پرداخت ملت را در تنظیمات وارد فرمایید.',
      'پس از پرداخت، پیامک تایید با لوکیشن دفتر برای موکل ارسال می‌شود.',
    ],
  },
  {
    id: 10,
    title: 'بهینه‌سازی Local SEO، سرعت و استانداردهای GDPR',
    category: 'سئو و امنیت',
    summary: 'ثبت آدرس در نقشه گوگل، فعال‌سازی WebP و بنر رضایت کوکی موکلان',
    steps: [
      'در تب معماری سیستم، تبدیل خودکار تصاویر به WebP و AVIF را فعال بفرمایید.',
      'کد اسکریپت Google Maps API یا آی‌فریم نشان/بلد را در بخش نقشه ذخیره کنید.',
      'بنر کوکی GDPR را از تب امنیت فعال کرده تا الزامات حقوقی حفاظت داده رعایت شود.',
    ],
  },
];

const VIDEO_TUTORIALS = [
  {
    id: 'v1',
    title: 'ویدیوی ۱: معرفی جامع امکانات و ویژگی‌های اختصاصی قالب دادمان',
    duration: '۰۳:۴۵ دقیقه',
    thumbnail: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=800',
    chapters: ['۰۰:۰۰ معرفی پالت رنگی و تایپوگرافی', '۰۱:۱۵ استوری‌بار حقوقی', '۰۲:۳۰ رهگیری آنلاین پرونده‌ها'],
  },
  {
    id: 'v2',
    title: 'ویدیوی ۲: آموزش گام‌به‌گام راه‌اندازی و سفارشی‌سازی رنگ‌ها و لوگو',
    duration: '۰۴:۲۰ دقیقه',
    thumbnail: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800',
    chapters: ['۰۰:۰۰ ایمپورت فایل JSON', '۰۲:۰۰ تنظیمات هدر شیشه‌ای', '۰۳:۱۰ اتصال سامانه پیامکی'],
  },
  {
    id: 'v3',
    title: 'ویدیوی ۳: مدیریت خدمات وکالت، مقالات حقوقی و ساختار سئو',
    duration: '۰۵:۱۰ دقیقه',
    thumbnail: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=800',
    chapters: ['۰۰:۰۰ افزودن CPT خدمت', '۰۱:۵۰ بارگذاری چک‌لیست مدارک', '۰۳:۳۰ ساختار اسکیما'],
  },
  {
    id: 'v4',
    title: 'ویدیوی ۴: کار با داشبورد وکیل، ثبت ابلاغیه‌ها و نظرسنجی موکلان',
    duration: '۰۳:۵۵ دقیقه',
    thumbnail: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800',
    chapters: ['۰۰:۰۰ ایجاد پرونده موکل', '۰۱:۴۰ ثبت نوبت دادگاه', '۰۲:۴۵ خروجی نمودار نظرسنجی'],
  },
  {
    id: 'v5',
    title: 'ویدیوی ۵: طراحی صفحات با ۲۵ بلاک المنتور پرو و ۱۵ شورت‌کد',
    duration: '۰۶:۱۵ دقیقه',
    thumbnail: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800',
    chapters: ['۰۰:۰۰ کار با بلاک‌های المنتور', '۰۲:۳۰ تنظیم پارامترهای شورت‌کد', '۰۴:۴۰ صادرات تمپلیت'],
  },
];

export const HelpAndDocsModal: React.FC<HelpAndDocsModalProps> = ({
  isOpen,
  onClose,
  onStartTour,
}) => {
  const [activeTab, setActiveTab] = useState<'guides' | 'videos' | 'tours' | 'docs'>('guides');
  const [openGuideId, setOpenGuideId] = useState<number | null>(1);
  const [selectedVideo, setSelectedVideo] = useState(VIDEO_TUTORIALS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(270); // 04:30 in seconds
  const [volume, setVolume] = useState(0.85);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [downloadToast, setDownloadToast] = useState(false);
  const progressBarRef = useRef<HTMLDivElement>(null);

  // Parse duration when selecting video
  useEffect(() => {
    setIsPlaying(false);
    setCurrentTime(0);
    // Parse duration e.g. "۰۴:۳۰ دقیقه" or "۰۵:۱۲ دقیقه"
    const digits = selectedVideo.duration.replace(/[^\d:]/g, '');
    const parts = digits.split(':');
    if (parts.length === 2) {
      const mins = parseInt(parts[0], 10) || 4;
      const secs = parseInt(parts[1], 10) || 30;
      setTotalDuration(mins * 60 + secs);
    } else {
      setTotalDuration(270);
    }
  }, [selectedVideo]);

  // Video playback timer
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= totalDuration) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000 / playbackSpeed);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, totalDuration, playbackSpeed]);

  if (!isOpen) return null;

  const toggleGuide = (id: number) => {
    setOpenGuideId(openGuideId === id ? null : id);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressBarRef.current) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const percentage = Math.max(0, Math.min(1, clickX / width));
    setCurrentTime(Math.floor(percentage * totalDuration));
  };

  const handleChapterClick = (chapterStr: string) => {
    const timeMatch = chapterStr.match(/(\d{2}):(\d{2})/);
    if (timeMatch) {
      const mins = parseInt(timeMatch[1], 10);
      const secs = parseInt(timeMatch[2], 10);
      setCurrentTime(mins * 60 + secs);
      setIsPlaying(true);
    }
  };

  const handleDownloadPdfDocs = () => {
    setDownloadToast(true);
    setTimeout(() => setDownloadToast(false), 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in" dir="rtl">
      <div className="bg-white dark:bg-[#0B132B] w-full max-w-4xl rounded-3xl shadow-2xl border border-[#D4AF37]/40 max-h-[90vh] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="p-6 bg-gradient-to-l from-[#0B132B] to-[#1C2541] text-white flex items-center justify-between border-b border-[#D4AF37]/20 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#D4AF37]/20 text-[#D4AF37] flex items-center justify-center border border-[#D4AF37]/30 shadow-md">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold font-serif text-white">
                  آکادمی و مرکز آموزش جامع قالب دادمان (Section 22)
                </h3>
                <span className="text-[10px] px-2 py-0.5 rounded bg-[#D4AF37]/20 text-[#D4AF37] font-bold font-mono">
                  نسخه ۶.۷
                </span>
              </div>
              <p className="text-xs text-gray-400">
                ۱۰ راهنمای گام‌به‌گام، ۵ ویدیوی آموزشی ۱۰۸۰p، تورهای تعاملی و مستندات PDF
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-[#070D1E] border-b border-gray-200 dark:border-gray-800 shrink-0 overflow-x-auto">
          {[
            { id: 'guides', label: '۱۰ راهنمای گام‌به‌گام', icon: FileText },
            { id: 'videos', label: '۵ ویدیوی آموزشی', icon: Video },
            { id: 'tours', label: '۳ تور تعاملی', icon: Sparkles },
            { id: 'docs', label: 'دانلود مستندات و پشتیبانی', icon: Download },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                  isActive
                    ? 'bg-[#D4AF37] text-[#0B132B] shadow-md'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Download Toast Notification */}
        {downloadToast && (
          <div className="mx-6 mt-3 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-500/40 text-emerald-800 dark:text-emerald-200 text-xs flex items-center justify-between animate-in fade-in">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>فایل مستندات جامع قالب دادمان (شامل ۲۶ بخش معماری، سئو و کدهای اختصاصی) با فرمت PDF دریافت شد.</span>
            </div>
            <button
              type="button"
              onClick={() => setDownloadToast(false)}
              className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-800 text-xs font-bold"
            >
              بستن
            </button>
          </div>
        )}

        {/* Body Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm">
          
          {/* Tab 1: 10 Step-by-Step Guides */}
          {activeTab === 'guides' && (
            <div className="space-y-3 animate-in fade-in">
              <div className="flex items-center justify-between pb-2">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  برای مشاهده جزئیات هر بخش، روی عنوان راهنما کلیک فرمایید:
                </p>
                <span className="text-xs font-bold text-[#AA820A] dark:text-[#D4AF37]">
                  ۱۰ راهنما آماده است
                </span>
              </div>

              {STEP_BY_STEP_GUIDES.map((guide) => {
                const isOpen = openGuideId === guide.id;
                return (
                  <div
                    key={guide.id}
                    className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/60 overflow-hidden transition-all shadow-sm"
                  >
                    <button
                      onClick={() => toggleGuide(guide.id)}
                      className="w-full p-4 flex items-center justify-between text-right hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-lg bg-[#D4AF37]/15 text-[#AA820A] dark:text-[#D4AF37] flex items-center justify-center font-mono font-bold text-xs shrink-0">
                          {guide.id}
                        </span>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-xs sm:text-sm font-bold text-[#0B132B] dark:text-white font-serif">
                              {guide.title}
                            </h4>
                            <span className="text-[9px] px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 font-bold">
                              {guide.category}
                            </span>
                          </div>
                          <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">
                            {guide.summary}
                          </p>
                        </div>
                      </div>

                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-[#D4AF37]" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      )}
                    </button>

                    {isOpen && (
                      <div className="p-4 pt-0 border-t border-gray-100 dark:border-gray-700/60 bg-gray-50/50 dark:bg-gray-900/40 space-y-2">
                        <p className="text-xs font-bold text-gray-700 dark:text-gray-300 pt-3">
                          مراحل اجرایی:
                        </p>
                        <ol className="space-y-2 text-xs text-gray-600 dark:text-gray-300 mr-2">
                          {guide.steps.map((st, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                              <span>{st}</span>
                            </li>
                          ))}
                        </ol>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Tab 2: 5 Video Tutorials */}
          {activeTab === 'videos' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in">
              
              {/* Active Video Player */}
              <div className="lg:col-span-7 space-y-3">
                <div className="relative aspect-video rounded-2xl overflow-hidden bg-black border border-[#D4AF37]/40 shadow-2xl group select-none">
                  {/* Video Screen / Thumbnail */}
                  <img
                    src={selectedVideo.thumbnail}
                    alt={selectedVideo.title}
                    className={`w-full h-full object-cover transition-all duration-700 ${
                      isPlaying ? 'opacity-90 scale-105' : 'opacity-70 group-hover:opacity-80 scale-100'
                    }`}
                  />

                  {/* Playing Ambient Glow Overlay */}
                  {isPlaying && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30 pointer-events-none" />
                  )}

                  {/* Center Play/Pause Trigger */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button
                      type="button"
                      onClick={() => setIsPlaying(!isPlaying)}
                      className={`w-16 h-16 rounded-full bg-[#D4AF37] hover:bg-[#C4981C] text-[#0B132B] flex items-center justify-center shadow-2xl transition-all hover:scale-110 cursor-pointer ${
                        isPlaying ? 'opacity-0 group-hover:opacity-100 scale-90' : 'opacity-100 scale-100'
                      }`}
                      title={isPlaying ? 'توقف' : 'پخش'}
                    >
                      {isPlaying ? (
                        <Pause className="w-8 h-8 fill-[#0B132B]" />
                      ) : (
                        <Play className="w-8 h-8 fill-[#0B132B] mr-1" />
                      )}
                    </button>
                  </div>

                  {/* Subtitle Bar */}
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md border border-white/10 text-[11px] text-white flex items-center gap-1.5 font-sans">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>زیرنویس فارسی رسمی: {selectedVideo.title}</span>
                  </div>

                  {/* Bottom Controls Bar */}
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/95 via-black/80 to-transparent p-3 pt-6 space-y-2 transition-opacity duration-300">
                    {/* Interactive Scrub Bar */}
                    <div
                      ref={progressBarRef}
                      onClick={handleSeek}
                      className="relative w-full h-2 bg-white/20 hover:h-3 rounded-full cursor-pointer transition-all overflow-hidden"
                      title="کلیک برای پرش به زمان دلخواه"
                    >
                      <div
                        className="h-full bg-gradient-to-r from-[#AA820A] to-[#D4AF37] rounded-full transition-all duration-150"
                        style={{ width: `${(currentTime / Math.max(1, totalDuration)) * 100}%` }}
                      />
                    </div>

                    {/* Controls Row */}
                    <div className="flex items-center justify-between text-white text-xs pt-1 flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        {/* Play/Pause Button */}
                        <button
                          type="button"
                          onClick={() => setIsPlaying(!isPlaying)}
                          className="p-1.5 hover:text-[#D4AF37] transition-colors"
                        >
                          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
                        </button>

                        {/* Rewind 10s */}
                        <button
                          type="button"
                          onClick={() => setCurrentTime((t) => Math.max(0, t - 10))}
                          className="p-1.5 hover:text-[#D4AF37] transition-colors"
                          title="۱۰ ثانیه قبل"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                        </button>

                        {/* Fast Forward 10s */}
                        <button
                          type="button"
                          onClick={() => setCurrentTime((t) => Math.min(totalDuration, t + 10))}
                          className="p-1.5 hover:text-[#D4AF37] transition-colors"
                          title="۱۰ ثانیه بعد"
                        >
                          <FastForward className="w-3.5 h-3.5" />
                        </button>

                        {/* Volume Control */}
                        <div className="flex items-center gap-1.5 mr-2">
                          <button
                            type="button"
                            onClick={() => setIsMuted(!isMuted)}
                            className="p-1 hover:text-[#D4AF37] transition-colors"
                          >
                            {isMuted || volume === 0 ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
                          </button>
                          <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.05"
                            value={isMuted ? 0 : volume}
                            onChange={(e) => {
                              setVolume(parseFloat(e.target.value));
                              setIsMuted(false);
                            }}
                            className="w-14 h-1 accent-[#D4AF37] bg-white/30 rounded-lg cursor-pointer"
                          />
                        </div>

                        {/* Time Display */}
                        <span className="font-mono text-[11px] text-gray-300 mr-2">
                          {formatTime(currentTime)} / {formatTime(totalDuration)}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Speed Selector */}
                        <div className="relative">
                          <button
                            type="button"
                            onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                            className="px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-[11px] font-mono font-bold text-gray-200 transition-colors flex items-center gap-1"
                          >
                            <span>{playbackSpeed}x</span>
                            <Settings className="w-3 h-3 text-[#D4AF37]" />
                          </button>
                          {showSpeedMenu && (
                            <div className="absolute bottom-full left-0 mb-1.5 bg-[#0B132B] border border-gray-700 rounded-xl shadow-xl p-1 z-50 flex flex-col gap-0.5 min-w-[70px]">
                              {[0.75, 1, 1.25, 1.5, 2].map((s) => (
                                <button
                                  key={s}
                                  type="button"
                                  onClick={() => {
                                    setPlaybackSpeed(s);
                                    setShowSpeedMenu(false);
                                  }}
                                  className={`px-2 py-1 text-right text-[10px] rounded font-mono flex items-center justify-between ${
                                    playbackSpeed === s ? 'bg-[#D4AF37] text-[#0B132B] font-bold' : 'text-gray-300 hover:bg-white/10'
                                  }`}
                                >
                                  <span>{s}x</span>
                                  {playbackSpeed === s && <Check className="w-2.5 h-2.5" />}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Quality Badge */}
                        <span className="px-2 py-0.5 rounded bg-amber-500/20 text-[#D4AF37] text-[10px] font-mono font-bold border border-[#D4AF37]/30">
                          1080p FHD
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Video Info and Interactive Chapters */}
                <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-[#0B132B] dark:text-white font-serif">
                      {selectedVideo.title}
                    </h4>
                    <span className="text-xs font-mono font-bold text-[#D4AF37]">
                      {selectedVideo.duration}
                    </span>
                  </div>

                  <div className="pt-2 border-t border-gray-200 dark:border-gray-700 space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] font-bold text-gray-500">
                      <span>فصل‌های آموزشی (کلیک برای پرش به ثانیه مشخص):</span>
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400">تایم‌لاین هوشمند</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {selectedVideo.chapters.map((ch, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => handleChapterClick(ch)}
                          className="text-[10px] px-2.5 py-1 rounded-lg bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:border-[#D4AF37] hover:text-[#D4AF37] text-gray-700 dark:text-gray-200 transition-all font-sans cursor-pointer flex items-center gap-1 shadow-sm"
                        >
                          <Play className="w-2.5 h-2.5 fill-current" />
                          <span>{ch}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Video List */}
              <div className="lg:col-span-5 space-y-2.5">
                <h4 className="text-xs font-bold text-gray-700 dark:text-gray-300">
                  لیست ویدیوهای آموزشی قالب:
                </h4>
                {VIDEO_TUTORIALS.map((vid) => (
                  <div
                    key={vid.id}
                    onClick={() => setSelectedVideo(vid)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center gap-3 ${
                      selectedVideo.id === vid.id
                        ? 'border-[#D4AF37] bg-[#D4AF37]/10 shadow'
                        : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    <img src={vid.thumbnail} alt={vid.title} className="w-16 h-12 object-cover rounded-lg shrink-0" />
                    <div className="space-y-0.5 flex-1">
                      <h5 className="text-xs font-bold text-[#0B132B] dark:text-white font-serif line-clamp-1">
                        {vid.title}
                      </h5>
                      <span className="text-[10px] text-[#AA820A] dark:text-[#D4AF37] font-mono font-bold">
                        {vid.duration}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* Tab 3: Interactive Guided Tours */}
          {activeTab === 'tours' && (
            <div className="space-y-4 animate-in fade-in">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                تورهای تعاملی (Shepherd.js) شما را به صورت زنده و با هایلایت کردن المان‌ها در سایت و پنل راهنمایی می‌کنند:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                <div className="p-5 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 space-y-3 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/20 text-[#D4AF37] flex items-center justify-center">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-[#0B132B] dark:text-white font-serif">
                    تور اول: تنظیمات اولیه و هویت بصری
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                    تنظیم لوگو، شماره پروانه وکالت، اطلاعات تماس و ساعات کاری دفتر.
                  </p>
                  <button
                    onClick={() => {
                      onClose();
                      if (onStartTour) onStartTour(1);
                    }}
                    className="w-full btn-gold py-2 rounded-xl text-xs font-bold"
                  >
                    شروع تور تعاملی ۱
                  </button>
                </div>

                <div className="p-5 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 space-y-3 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-500 flex items-center justify-center">
                    <Layers className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-[#0B132B] dark:text-white font-serif">
                    تور دوم: مدیریت محتوا و پرونده‌ها
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                    ایجاد خدمات حقوقی، مقالات قضایی و ثبت ابلاغیه‌های دادگاه.
                  </p>
                  <button
                    onClick={() => {
                      onClose();
                      if (onStartTour) onStartTour(2);
                    }}
                    className="w-full bg-[#0B132B] dark:bg-gray-700 hover:bg-[#1C2541] text-white py-2 rounded-xl text-xs font-bold"
                  >
                    شروع تور تعاملی ۲
                  </button>
                </div>

                <div className="p-5 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 space-y-3 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-500 flex items-center justify-center">
                    <Monitor className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-[#0B132B] dark:text-white font-serif">
                    تور سوم: سفارشی‌سازی ظاهر و المنتور
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                    چیدمان بلاک‌های لندینگ، استوری‌بار و فرم‌های رزرواسیون.
                  </p>
                  <button
                    onClick={() => {
                      onClose();
                      if (onStartTour) onStartTour(3);
                    }}
                    className="w-full bg-[#0B132B] dark:bg-gray-700 hover:bg-[#1C2541] text-white py-2 rounded-xl text-xs font-bold"
                  >
                    شروع تور تعاملی ۳
                  </button>
                </div>

              </div>
            </div>
          )}

          {/* Tab 4: PDF Documentation & Direct Support */}
          {activeTab === 'docs' && (
            <div className="space-y-6 animate-in fade-in">
              <div className="p-6 rounded-2xl bg-gradient-to-l from-[#0B132B] to-[#1C2541] text-white border border-[#D4AF37]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1">
                  <h4 className="text-base font-bold font-serif text-[#F3E5AB]">
                    کتابچه راهنمای جامع فارسی قالب دادمان (PDF رسمی)
                  </h4>
                  <p className="text-xs text-gray-300">
                    شامل بیش از ۱۲۰ صفحه مستندات، ساختار دیتابیس، امنیت GDPR، کدهای کوتاه و تنظیمات المنتور
                  </p>
                </div>
                <button
                  onClick={handleDownloadPdfDocs}
                  className="btn-gold px-6 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shrink-0"
                >
                  <Download className="w-4 h-4" />
                  دانلود فایل PDF راهنما
                </button>
              </div>

              {/* Direct Support Contacts */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60 space-y-1 text-xs">
                  <span className="font-bold text-[#0B132B] dark:text-white">پشتیبانی فنی و سفارشی‌سازی کدهای قالب:</span>
                  <p className="text-gray-500 dark:text-gray-400">تلفن مستقیم: {ATTORNEY_INFO.phone}</p>
                  <p className="text-gray-500 dark:text-gray-400">ایمیل: support@dadman-law.ir</p>
                </div>

                <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60 space-y-1 text-xs">
                  <span className="font-bold text-[#0B132B] dark:text-white">ساعات پاسخگویی تیم پشتیبانی دادمان:</span>
                  <p className="text-gray-500 dark:text-gray-400">{ATTORNEY_INFO.workingHours}</p>
                  <p className="text-emerald-600 dark:text-emerald-400 font-bold">پاسخگویی تیکت‌ها: کمتر از ۲ ساعت</p>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 dark:bg-gray-800/80 border-t border-gray-200 dark:border-gray-700 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="btn-gold px-6 py-2 rounded-xl text-xs font-bold"
          >
            بستن راهنما
          </button>
        </div>

      </div>
    </div>
  );
};
