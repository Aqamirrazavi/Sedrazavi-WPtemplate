import React, { useState } from 'react';
import {
  BookOpen,
  Search,
  CheckCircle2,
  AlertTriangle,
  Scale,
  Users,
  Calendar,
  Settings,
  FileText,
  Printer,
  ChevronDown,
  ChevronUp,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  FolderLock,
  Headphones,
  Clock,
  ArrowRight,
  HelpCircle,
} from 'lucide-react';

interface AdminHelpAndDocsSystemProps {
  onNavigateSection?: (sectionId: string) => void;
}

interface GuideItem {
  id: string;
  category: 'cases' | 'clients' | 'bookings' | 'technical' | 'emergency';
  title: string;
  badge: string;
  summary: string;
  steps: { title: string; desc: string }[];
  importantTip?: string;
}

const GUIDES_DATA: GuideItem[] = [
  {
    id: 'guide-cases-1',
    category: 'cases',
    title: 'دستورالعمل تشکیل و هدایت پرونده‌های قضایی (از پذیرش تا اجرای احکام)',
    badge: 'گردش کار حقوقی',
    summary: 'پروتکل استاندارد پذیرش موکل، استعلام تعارض منافع، ثبت لایحه و مدیریت جلسات محاکم.',
    steps: [
      {
        title: 'گام اول: ارزیابی تعارض منافع و ثبت پیش‌پرونده',
        desc: 'پیش از امضای وکالت‌نامه، بررسی نمایید که طرف دعوا در لیست پرونده‌های جاری یا موکلین سابق دفتر نباشد. سپس در تب «پرونده‌ها»، دکمه «ثبت پرونده جدید» را بزنید.',
      },
      {
        title: 'گام دوم: تنظیم قرارداد مالی وکالت و تعیین اقساط',
        desc: 'حق‌الوکاله را با توافق موکل تعیین نموده و در بخش «مالی و صورتحساب‌ها»، فاکتورهای رسمی مرحله‌ای (پیش‌پرداخت، پس از تجدیدنظر، پس از صدور رأی قطعی) صادر فرمایید.',
      },
      {
        title: 'گام سوم: ثبت تاریخ جلسه دادرسی و پیامک خودکار',
        desc: 'به محض دریافت ابلاغیه دادگاه از سامانه ثنا، تاریخ جلسه رسیدگی را در فیلد «جلسه بعدی دادگاه» ثبت کنید. سیستم ۳ روز مانده به موعد، پیامک یادآوری را به وکیل و موکل ارسال می‌کند.',
      },
      {
        title: 'گام چهارم: بایگانی الکترونیک لوایح و دادنامه‌ها',
        desc: 'متن لایحه تقدیمی را در یادداشت‌های پرونده ثبت کرده و اسناد جدید را به پرونده پیوست نمایید تا موکل در پرتال شخصی خود بتواند روند دادرسی را شفاف ببیند.',
      },
      {
        title: 'گام پنجم: مختومه کردن و تسویه‌حساب',
        desc: 'پس از صدور دادنامه قطعی یا اجرای حکم، وضعیت پرونده را به «به رأی نهایی رسیده» تغییر دهید و رسید تحویل اصل مدارک را از موکل دریافت فرمایید.',
      },
    ],
    importantTip: 'طبق آیین دادرسی مدنی، مهلت تجدیدنظرخواهی برای اشخاص مقیم ایران ۲۰ روز و خارج از کشور ۲ ماه از تاریخ ابلاغ واقعی است. حتماً موعد را در تقویم دادرسی ثبت کنید.',
  },
  {
    id: 'guide-clients-1',
    category: 'clients',
    title: 'راهنمای مدیریت موکلین و ساخت دسترسی امن به پرتال',
    badge: 'امور موکلین',
    summary: 'چگونگی تعریف موکل جدید، ارائه دسترسی با رمز یکبار مصرف ایمیل یا تولید پسورد بدون پیامک.',
    steps: [
      {
        title: 'گام اول: ثبت مشخصات هویتی و شماره تماس موکل',
        desc: 'در تب «لیست موکلین»، مشخصات موکل (نام کامل، شماره موبایل، ایمیل و کد ملی) را ثبت فرمایید.',
      },
      {
        title: 'گام دوم: ورود موکل با رمز یکبار مصرف ایمیلی (Email OTP)',
        desc: 'موکلین می‌توانند بدون نیاز به حفظ رمز عبور، تنها با وارد کردن آدرس ایمیل خود در صفحه لاگین، کد ۶ رقمی یکبار مصرف را دریافت و فوراً وارد پرتال شوند.',
      },
      {
        title: 'گام سوم: ساخت اکانت دستی بدون نیاز به پیامک',
        desc: 'در صورتی که موکل پیامک‌های تبلیغاتی را مسدود کرده باشد، از نوار بالای داشبورد روی «ساخت اکانت بدون SMS» کلیک کنید تا رمز عبور تصادفی تولید شود و آن را در پیام‌رسان به موکل تحویل دهید.',
      },
      {
        title: 'گام چهارم: نظارت بر تیکت‌ها و درخواست‌های ارسالی موکل',
        desc: 'پیام‌ها و سوالات موکلین در بخش پرتال را ظرف حداکثر ۲۴ ساعت کاری بررسی و پاسخ دهید تا از تماس‌های تلفنی مکرر جلوگیری شود.',
      },
    ],
    importantTip: 'حفظ اسرار و اسناد موکلین بر اساس ماده ۳۰ نظام‌نامه کانون وکلا الزامی است؛ هرگز اطلاعات موکل را در بخش‌های عمومی وب‌سایت فاش نکنید.',
  },
  {
    id: 'guide-bookings-1',
    category: 'bookings',
    title: 'دستورالعمل رتق و فتق نوبت‌ها، مشاوره‌ها و تقویم دفتر وکالت',
    badge: 'تقویم و رزروها',
    summary: 'نحوه تایید جلسات حضوری، مشاوره آنلاین تصویری و هماهنگی زمان‌های آزاد وکیل.',
    steps: [
      {
        title: 'گام اول: پایش روزانه لیدها و نوبت‌های ثبت‌شده',
        desc: 'هر روز صبح در تب «رزروها و تقویم»، نوبت‌های جدید را بررسی نمایید. نوع مشاوره (حضوری، آنلاین، تلفنی) و خلاصه موضوع دعوا را مطالعه فرمایید.',
      },
      {
        title: 'گام دوم: تایید نوبت و ارسال لینک جلسه یا لوکیشن دفتر',
        desc: 'با کلیک روی دکمه «تایید نوبت»، وضعیت به تایید شده تغییر یافته و جزئیات نشانی دفتر یا لینک اتاق جلسه مجازی برای موکل پیامک می‌شود.',
      },
      {
        title: 'گام سوم: تغییر ساعت در صورت تداخل با دادگاه',
        desc: 'در صورتی که دادگاه غیرمترقبه‌ای برای وکیل تعیین شد، با موکل تماس گرفته و از گزینه «ویرایش نوبت» ساعت جدید را تعیین فرمایید.',
      },
    ],
    importantTip: 'پیشنهاد می‌شود بین هر دو جلسه مشاوره حداقل ۱۵ دقیقه فاصله در نظر بگیرید تا یادداشت‌های جلسه قبل تکمیل و مستندسازی شود.',
  },
  {
    id: 'guide-tech-1',
    category: 'technical',
    title: 'راهنمای وب‌مستر: شخصی‌سازی هویت، ویجت‌های المنتور و سئو',
    badge: 'تنظیمات فنی سایت',
    summary: 'آموزش تغییر اطلاعات وکیل در سراسر سایت، مدیریت ۱۳ ویجت المنتور و بکاپ‌گیری منظم.',
    steps: [
      {
        title: 'گام اول: تغییر مشخصات وکیل بدون کدنویسی (Customizer)',
        desc: 'در تب «تنظیمات سایت و هویت وکیل»، نام، شماره پروانه، آدرس، تلفن ثابت، موبایل و عکس پرسنلی را وارد کنید تا به‌صورت زنده در تمام صفحات جایگزین شود.',
      },
      {
        title: 'گام دوم: بهینه‌سازی سرعت و مدیریت ویجت‌های المنتور',
        desc: 'در پیشخوان وردپرس وارد منوی Universal Suite شوید. هر ویجتی که در سایت استفاده نکرده‌اید را غیرفعال کنید تا حجم لود CSS و JS تا ۴۰٪ کاهش یابد.',
      },
      {
        title: 'گام سوم: تهیه پشتیبان منظم از اطلاعات و پرونده‌ها',
        desc: 'به‌صورت هفتگی از دکمه «دانلود داده‌ها (CSV)» و تب پشتیبان‌گیری، خروجی کامل دیتابیس را ذخیره کنید تا در مواقع اضطراری بتوانید اطلاعات را احیا نمایید.',
      },
    ],
    importantTip: 'قالب از استانداردهای جدید وردپرس و تایپ‌اسکریپت استفاده می‌کند؛ هرگز فایل‌های هسته dist را بدون ابزار بیلد تغییر ندهید.',
  },
  {
    id: 'guide-emergency-1',
    category: 'emergency',
    title: 'پروتکل‌های اضطراری و راهکارهای رفع خطای سامانه',
    badge: 'حل بحران و دیباگ',
    summary: 'اقدامات فوری در زمان انقضای مهلت‌های قضایی، عدم وصول پرداخت‌ها و خطاهای اتصال.',
    steps: [
      {
        title: 'سناریو ۱: فوریت تجدیدنظرخواهی در ساعات پایانی مهلت ۲۰ روزه',
        desc: 'سریعاً به بخش «مولد هوشمند دادخواست و لایحه» بروید، قالب لایحه تجدیدنظر را انتخاب کرده، اطلاعات رای را تکمیل و پیش‌نویس نهایی را پرینت نمایید.',
      },
      {
        title: 'سناریو ۲: عدم دریافت کد ایمیل یکبار مصرف توسط کاربر',
        desc: 'پوشه Spam/Junk کاربر را چک کنید. در غیر این صورت، از تب ورود موکلین، با شماره موبایل و رمزی که به او اختصاص داده‌اید لاگین انجام دهید.',
      },
      {
        title: 'سناریو ۳: قطع شدن درگاه بانکی یا قطعی سامانه پرداخت',
        desc: 'از تب «صورتحساب‌ها»، شماره شبای رسمی حساب وکالت را برای موکل ارسال کرده و پس از دریافت فیش واریزی، فاکتور را به وضعیت «پرداخت دستی» تغییر دهید.',
      },
    ],
  },
];

export const AdminHelpAndDocsSystem: React.FC<AdminHelpAndDocsSystemProps> = ({
  onNavigateSection,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedGuideId, setExpandedGuideId] = useState<string>(GUIDES_DATA[0].id);

  const filteredGuides = GUIDES_DATA.filter((guide) => {
    const matchesCat = selectedCategory === 'all' || guide.category === selectedCategory;
    const matchesSearch =
      searchTerm.trim() === '' ||
      guide.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guide.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guide.steps.some((s) => s.desc.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6 text-right">
      
      {/* Header & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200 dark:border-gray-800">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#AA820A] dark:text-[#D4AF37] font-bold">
            <BookOpen className="w-4 h-4 text-[#D4AF37]" />
            <span>سامانه راهنمای گام‌به‌گام و مستندات اداری (Help & Docs)</span>
            <span aria-hidden="true" className="text-gray-300 dark:text-gray-600">·</span>
            <span className="text-gray-500 dark:text-gray-400 font-normal">دستورالعمل رتق و فتق کارهای دفتر</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-serif text-[#0B132B] dark:text-white mt-1">
            راهنمای عملیاتی و راهبری امور پرونده‌ها، موکلین و ادمین سایت
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            کلیه فرآیندهای اداری، حقوقی و فنی سامانه به صورت شفاف و مرحله‌به‌مرحله جهت هدایت آسان امور.
          </p>
        </div>

        {/* Search input */}
        <div className="relative w-full sm:w-72">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="جستجو در دستورالعمل‌ها..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-xs focus:outline-none focus:border-[#D4AF37] dark:text-white"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-1.5 p-1 bg-gray-100 dark:bg-gray-800/80 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-x-auto no-scrollbar">
        {[
          { id: 'all', label: 'همه دستورالعمل‌ها' },
          { id: 'cases', label: '۱. مدیریت پرونده‌ها' },
          { id: 'clients', label: '۲. امور موکلین' },
          { id: 'bookings', label: '۳. نوبت‌ها و تقویم' },
          { id: 'technical', label: '۴. تنظیمات فنی سایت' },
          { id: 'emergency', label: '۵. پروتکل‌های اضطراری' },
        ].map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              selectedCategory === cat.id
                ? 'bg-white dark:bg-[#0B132B] text-[#0B132B] dark:text-[#D4AF37] shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Guides Accordion List */}
      <div className="space-y-4">
        {filteredGuides.map((guide) => {
          const isExpanded = expandedGuideId === guide.id;

          return (
            <div
              key={guide.id}
              className={`rounded-2xl border transition-all overflow-hidden ${
                isExpanded
                  ? 'bg-white dark:bg-[#0B132B] border-[#D4AF37]/60 shadow-md ring-1 ring-[#D4AF37]/20'
                  : 'bg-gray-50 dark:bg-gray-800/40 border-gray-200 dark:border-gray-800 hover:border-gray-300'
              }`}
            >
              {/* Accordion Toggle Header */}
              <button
                type="button"
                onClick={() => setExpandedGuideId(isExpanded ? '' : guide.id)}
                className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-right transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-amber-500/15 text-[#AA820A] dark:text-[#D4AF37] text-[10px] font-bold">
                      {guide.badge}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white">
                      {guide.title}
                    </h3>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                    {guide.summary}
                  </p>
                </div>

                <div className="w-8 h-8 rounded-xl bg-gray-100 dark:bg-gray-700/60 flex items-center justify-center text-gray-500 flex-shrink-0">
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </button>

              {/* Accordion Content Body */}
              {isExpanded && (
                <div className="p-4 sm:p-6 border-t border-gray-100 dark:border-gray-800 space-y-4 bg-white dark:bg-[#0B132B]">
                  
                  {/* Steps List */}
                  <div className="space-y-3">
                    <div className="text-xs font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>مراحل اجرایی گام‌به‌گام:</span>
                    </div>

                    <div className="grid grid-cols-1 gap-2.5">
                      {guide.steps.map((st, idx) => (
                        <div
                          key={idx}
                          className="p-3.5 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 flex items-start gap-3"
                        >
                          <div className="w-6 h-6 rounded-lg bg-[#0B132B] dark:bg-[#D4AF37] text-[#D4AF37] dark:text-[#0B132B] flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                            {idx + 1}
                          </div>
                          <div className="space-y-1">
                            <h4 className="font-bold text-xs sm:text-sm text-gray-900 dark:text-white">
                              {st.title}
                            </h4>
                            <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                              {st.desc}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Important Alert Box */}
                  {guide.importantTip && (
                    <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 flex items-start gap-2.5 text-xs text-amber-900 dark:text-amber-300">
                      <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                      <div className="leading-relaxed">
                        <strong className="font-bold">نکته حائز اهمیت قانونی:</strong> {guide.importantTip}
                      </div>
                    </div>
                  )}

                  {/* Action Link */}
                  {onNavigateSection && (
                    <div className="pt-2 flex justify-end">
                      <button
                        type="button"
                        onClick={() => onNavigateSection(guide.category)}
                        className="px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-[#D4AF37]/20 text-gray-800 dark:text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <span>انتقال به بخش مربوطه در پنل</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}

                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
};
