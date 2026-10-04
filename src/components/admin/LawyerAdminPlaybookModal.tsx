import React, { useState } from 'react';
import {
  X,
  BookOpen,
  Briefcase,
  Users,
  ShieldAlert,
  CheckSquare,
  HelpCircle,
  FileText,
  Calendar,
  Lock,
  Server,
  Mail,
  Smartphone,
  Scale,
  Printer,
  ChevronLeft,
  ArrowRight,
  Sparkles,
  ExternalLink,
  Code,
  Layers,
  CheckCircle2,
  AlertTriangle,
  FolderLock,
  Headphones,
  Settings,
  Clock,
} from 'lucide-react';

interface LawyerAdminPlaybookModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToTab?: (tabKey: string) => void;
  onOpenAccountCreator?: () => void;
}

export const LawyerAdminPlaybookModal: React.FC<LawyerAdminPlaybookModalProps> = ({
  isOpen,
  onClose,
  onNavigateToTab,
  onOpenAccountCreator,
}) => {
  const [activeTab, setActiveTab] = useState<'cases' | 'webmaster' | 'clients' | 'checklist' | 'faq'>('cases');
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({
    'daily-1': true,
    'daily-2': false,
    'daily-3': true,
    'weekly-1': false,
  });

  if (!isOpen) return null;

  const toggleCheck = (id: string) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handlePrintPlaybook = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 text-right">
      <div className="relative w-full max-w-5xl bg-white dark:bg-[#0B132B] rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header Bar */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-[#0B132B] via-[#1C2541] to-[#0B132B] text-white flex items-center justify-between border-b border-[#D4AF37]/30">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-bold font-serif text-white">
                  کتابچه راهنما و دستورالعمل جامع مدیریت (SOP Playbook)
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-[#D4AF37] text-[#0B132B] text-[10px] font-bold">
                  ویژه وکیل و ادمین سایت
                </span>
              </div>
              <p className="text-xs text-gray-300 mt-0.5">
                مجموعه پروتکل‌های عملیاتی برای رتق و فتق کارهای وکلا، هماهنگی امور موکلین و راهنمای فنی طراح سایت.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrintPlaybook}
              className="p-2 text-gray-300 hover:text-white rounded-xl hover:bg-white/10 transition-colors hidden sm:flex items-center gap-1.5 text-xs"
              title="چاپ دستورالعمل"
            >
              <Printer className="w-4 h-4 text-[#D4AF37]" />
              <span>چاپ راهنما</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white rounded-xl hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation Ribbon */}
        <div className="px-6 py-2.5 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('cases')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'cases'
                ? 'bg-[#0B132B] dark:bg-[#D4AF37] text-[#D4AF37] dark:text-[#0B132B] shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>۱. پذیرش موکل و مدیریت پرونده‌ها</span>
          </button>

          <button
            onClick={() => setActiveTab('webmaster')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'webmaster'
                ? 'bg-[#0B132B] dark:bg-[#D4AF37] text-[#D4AF37] dark:text-[#0B132B] shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>۲. راهنمای طراح سایت و ادمین فنی</span>
          </button>

          <button
            onClick={() => setActiveTab('clients')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'clients'
                ? 'bg-[#0B132B] dark:bg-[#D4AF37] text-[#D4AF37] dark:text-[#0B132B] shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>۳. پرتال موکلین و اتوماسیون ارتباطات</span>
          </button>

          <button
            onClick={() => setActiveTab('checklist')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'checklist'
                ? 'bg-[#0B132B] dark:bg-[#D4AF37] text-[#D4AF37] dark:text-[#0B132B] shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <CheckSquare className="w-4 h-4" />
            <span>۴. چک‌لیست تعاملی روزانه و هفتگی دفتر</span>
          </button>

          <button
            onClick={() => setActiveTab('faq')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'faq'
                ? 'bg-[#0B132B] dark:bg-[#D4AF37] text-[#D4AF37] dark:text-[#0B132B] shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>۵. سناریوهای اضطراری و عیب‌یابی</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
          
          {/* TAB 1: CASE MANAGEMENT SOP */}
          {activeTab === 'cases' && (
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 flex items-start gap-3">
                <Scale className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="font-bold text-amber-900 dark:text-amber-300">
                    گردش کار استاندارد پذیرش موکل و تشکیل پرونده (Case Intake Workflow)
                  </h4>
                  <p className="text-xs text-amber-800 dark:text-amber-400 leading-relaxed">
                    این دستورالعمل تضمین می‌کند که از لحظه ثبت تماس یا لید موکل تا صدور رأی قطعی، هیچ‌یک از مهلت‌های قانونی و تعهدات اداری جا نماند.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-gray-900 dark:text-white">
                    <span className="w-6 h-6 rounded-lg bg-[#0B132B] text-[#D4AF37] flex items-center justify-center text-xs">۱</span>
                    <span>مرحله اول: ارزیابی اولیه و جلسه مشاوره</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-gray-600 dark:text-gray-400 list-disc list-inside leading-relaxed">
                    <li>ثبت مشخصات و شرح ادعای موکل در بخش <strong>«رزروها و نوبت‌ها»</strong>.</li>
                    <li>بررسی دقیق عدم تعارض منافع با سایر موکلین دفتر پیش از انعقاد قرارداد.</li>
                    <li>محاسبه هزینه تمبر مالیاتی و هزینه‌های دادرسی در بخش <strong>«محاسبه‌گر هزینه‌ها»</strong>.</li>
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-gray-900 dark:text-white">
                    <span className="w-6 h-6 rounded-lg bg-[#0B132B] text-[#D4AF37] flex items-center justify-center text-xs">۲</span>
                    <span>مرحله دوم: ثبت پرونده و تخصیص کد شناسه</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-gray-600 dark:text-gray-400 list-disc list-inside leading-relaxed">
                    <li>کلیک روی دکمه <strong>«ثبت پرونده جدید»</strong> و صدور شماره پرونده استاندارد (مانند ۱۴۰۳-۰۸۹).</li>
                    <li>بارگذاری رونوشت اسناد مالکیتی، قراردادها یا شکواییه در بایگانی امن.</li>
                    <li>تعیین وضعیت اولیه پرونده (در حال بررسی / در جریان).</li>
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-gray-900 dark:text-white">
                    <span className="w-6 h-6 rounded-lg bg-[#0B132B] text-[#D4AF37] flex items-center justify-center text-xs">۳</span>
                    <span>مرحله سوم: رتق و فتق جلسات دادگاه و لوایح</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-gray-600 dark:text-gray-400 list-disc list-inside leading-relaxed">
                    <li>ثبت تاریخ دقیق جلسه رسیدگی دادگاه در فیلد <strong>«جلسه بعدی دادگاه»</strong>.</li>
                    <li>سیستم به‌صورت هوشمند ۳ روز قبل از موعد، پیامک یادآوری جلسه را به وکیل و موکل ارسال می‌کند.</li>
                    <li>ثبت یادداشت و خلاصه لایحه تقدیمی پس از پایان جلسه دادگاه.</li>
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-gray-900 dark:text-white">
                    <span className="w-6 h-6 rounded-lg bg-[#0B132B] text-[#D4AF37] flex items-center justify-center text-xs">۴</span>
                    <span>مرحله چهارم: صدور رأی و اختتام پرونده</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-gray-600 dark:text-gray-400 list-disc list-inside leading-relaxed">
                    <li>تغییر وضعیت به <strong>«به رأی نهایی رسیده»</strong> یا <strong>«بسته شده»</strong>.</li>
                    <li>تسویه‌حساب کامل حق‌الوکاله در بخش <strong>«صورتحساب‌ها و درگاه‌های پرداخت»</strong>.</li>
                    <li>تحویل اصل اسناد به موکل و اخذ رسید کتبی یا تأییدیه الکترونیک در پرتال.</li>
                  </ul>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-between gap-4">
                <div>
                  <div className="font-bold text-gray-900 dark:text-white text-xs">نیاز به ساخت اکانت فوری برای موکل دارید؟</div>
                  <div className="text-[11px] text-gray-500 mt-0.5">برای موکلینی که پیامک دریافت نمی‌کنند می‌توانید بدون معطلی رمز دستی تولید و در ایتا/بله ارسال کنید.</div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    if (onOpenAccountCreator) onOpenAccountCreator();
                  }}
                  className="btn-gold px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap"
                >
                  ساخت اکانت بدون پیامک
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: WEBMASTER & SITE ADMIN GUIDE */}
          {activeTab === 'webmaster' && (
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 flex items-start gap-3">
                <Code className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="font-bold text-blue-900 dark:text-blue-300">
                    راهنمای گام‌به‌گام طراح سایت، پشتیبان فنی و وب‌مستر وردپرس
                  </h4>
                  <p className="text-xs text-blue-800 dark:text-blue-400 leading-relaxed">
                    نحوه پیاده‌سازی، مدیریت ویجت‌های المنتور، شخصی‌سازی هویت بصری بدون کدنویسی و اتصال وب‌سایت به درگاه‌های پرداخت.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/40 space-y-2">
                  <h5 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <Layers className="w-4 h-4 text-[#D4AF37]" />
                    <span>۱. مدیریت ویجت‌های اختصاصی المنتور (Universal Addon Suite)</span>
                  </h5>
                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                    تمامی ۱۳ ویجت مدرن المنتور به عنوان یک افزونه کاملاً مستقل در مسیر <code>wp-content/plugins/elementor-addon-suite/</code> مستقر شده‌اند.
                    از منوی <strong>پیشخوان وردپرس ➔ Universal Suite</strong> می‌توانید ویجت‌های بلااستفاده را خاموش کنید تا لود سایت سبک‌تر شود و نام دسته‌بندی را با برند اختصاصی وکیل تغییر دهید.
                  </p>
                </div>

                <div className="p-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/40 space-y-2">
                  <h5 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                    <span>۲. شخصی‌سازی نام، تلفن، پروانه و تصاویر وکیل بدون دست زدن به کد</span>
                  </h5>
                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                    به تب <strong>«۱۶. هویت کامل وکیل (Customizer)»</strong> بروید. هر مقداری که در فیلدهای نام، شماره پروانه، آدرس، تلفن ثابت، عکس پرسنلی، بیوگرافی و شبکه‌های اجتماعی وارد کنید، بلافاصله در کل فرانت‌اند سایت، هدر، فوتر و کارت‌های چاپی جایگزین می‌شود.
                  </p>
                </div>

                <div className="p-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/40 space-y-2">
                  <h5 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <Mail className="w-4 h-4 text-emerald-500" />
                    <span>۳. تنظیم سیستم ورود با ایمیل و رمز یکبار مصرف (Email OTP)</span>
                  </h5>
                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                    سیستم اتوماسیون ورود با ایمیل بر پایه پروتکل ایمن OTP کار می‌کند. در وردپرس می‌توانید از افزونه‌های SMTP معتبر مانند WP Mail SMTP استفاده کنید تا کدهای ورود بدون رفتن به پوشه اسپم، مستقیماً به اینباکس موکلین و وکلا ارسال گردند.
                  </p>
                </div>

                <div className="p-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/40 space-y-2">
                  <h5 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <Server className="w-4 h-4 text-indigo-500" />
                    <span>۴. استخراج کدهای آماده و شورت‌کدهای React برای وردپرس</span>
                  </h5>
                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                    از نوار بالای همین داشبورد، دکمه‌های <strong>«استخراج HTML/CSS»</strong> و <strong>«مولد PHP شورت‌کدهای React»</strong> برای شما تعبیه شده‌اند تا هر بخش دلخواه از داشبورد را در هر برگه وردپرس با شورت‌کد اختصاصی لود نمایید.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CLIENT PORTAL & COMMUNICATION PROTOCOLS */}
          {activeTab === 'clients' && (
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 flex items-start gap-3">
                <Users className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="font-bold text-emerald-900 dark:text-emerald-300">
                    پروتکل ارتباطی با موکلان و استانداردهای پاسخگویی پرتال
                  </h4>
                  <p className="text-xs text-emerald-800 dark:text-emerald-400 leading-relaxed">
                    حفظ کرامت موکل، پاسخگویی شفاف و کاهش مراجعات حضوری غیرضروری از طریق میزکار دیجیتال.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 space-y-2 text-center">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                    <Mail className="w-5 h-5" />
                  </div>
                  <h5 className="font-bold text-gray-900 dark:text-white text-xs">ورود با رمز یکبار مصرف ایمیل</h5>
                  <p className="text-[11px] text-gray-500 leading-relaxed">
                    موکل نیازی به حفظ رمز ندارد؛ با وارد کردن ایمیل، کد امنیتی ۶ رقمی موقت برایش ارسال و فوراً لاگین می‌شود.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 space-y-2 text-center">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto">
                    <FolderLock className="w-5 h-5" />
                  </div>
                  <h5 className="font-bold text-gray-900 dark:text-white text-xs">شفافیت اسناد و لوایح</h5>
                  <p className="text-[11px] text-gray-500 leading-relaxed">
                    موکل می‌تواند تصویر آخرین دادنامه‌ها، اخطاریه‌های ثنا و دادخواست‌ها را به صورت ۲۴ ساعته مشاهده کند.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 space-y-2 text-center">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto">
                    <Headphones className="w-5 h-5" />
                  </div>
                  <h5 className="font-bold text-gray-900 dark:text-white text-xs">تیکتینگ و پیام خصوصی</h5>
                  <p className="text-[11px] text-gray-500 leading-relaxed">
                    پاسخ به سوالات موکل در بستر محرمانه وب‌سایت انجام شده و از تماس‌های مکرر در ساعات غیرکاری جلوگیری می‌گردد.
                  </p>
                </div>
              </div>

              <div className="border border-gray-200 dark:border-gray-700 rounded-2xl p-5 space-y-3 bg-white dark:bg-gray-800/30">
                <h5 className="font-bold text-gray-900 dark:text-white flex items-center gap-2 text-xs">
                  <ShieldAlert className="w-4 h-4 text-red-500" />
                  <span>خط قرمزهای محرمانگی اسناد و داده‌های هویتی:</span>
                </h5>
                <ul className="space-y-1.5 text-xs text-gray-600 dark:text-gray-400 list-disc list-inside leading-relaxed">
                  <li>هیچ‌گاه نام یا اطلاعات هویتی موکل در بخش عمومی نظرات یا وبلاگ بدون رضایت کتبی درج نشود.</li>
                  <li>در صورت خاتمه قرارداد، وضعیت دسترسی موکل به اسناد داخلی بایگانی مدیریت شود.</li>
                  <li>تمام پرداخت‌های مالی باید مستقیماً با شناسه فاکتور رسمی ثبت شوند تا از هرگونه مغایرت جلوگیری شود.</li>
                </ul>
              </div>
            </div>
          )}

          {/* TAB 4: INTERACTIVE OPERATIONS CHECKLIST */}
          {activeTab === 'checklist' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-2 border-b border-gray-200 dark:border-gray-700">
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">
                    چک‌لیست تعاملی وظایف اداری و حقوقی دفتر وکالت
                  </h4>
                  <p className="text-xs text-gray-500">
                    وظایف روزانه و هفتگی را تیک بزنید تا وضعیت انضباط اداری دفتر ارتقا یابد.
                  </p>
                </div>
                <span className="text-xs font-bold text-[#AA820A] dark:text-[#D4AF37]">
                  {Object.values(checkedItems).filter(Boolean).length} وظیفه انجام‌شده
                </span>
              </div>

              {/* Daily Tasks */}
              <div className="space-y-2.5">
                <div className="text-xs font-bold text-gray-800 dark:text-gray-200 flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-[#D4AF37]" />
                  <span>چک‌لیست کارهای روزانه (Daily SOP):</span>
                </div>

                {[
                  { id: 'daily-1', text: 'بررسی پیام‌ها و اخطاریه‌های جدید در سامانه ابلاغ الکترونیک قضایی (ثنا)' },
                  { id: 'daily-2', text: 'هماهنگی نوبت‌های رزرو شده امروز در تب «۳. رزروها و تقویم نوبت‌ها»' },
                  { id: 'daily-3', text: 'بررسی پرونده‌های دارای موعد دادگاه تا ۴۸ ساعت آینده و آماده‌سازی ضمائم لایحه' },
                  { id: 'daily-4', text: 'بررسی و تایید دیدگاه‌های جدید کاربران در تب «۱۵. نظارت بر دیدگاه‌ها»' },
                  { id: 'daily-5', text: 'بررسی وصولی‌های درگاه پرداخت و تطبیق با صورتحساب‌های صادره' },
                ].map((item) => (
                  <label
                    key={item.id}
                    className={`flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
                      checkedItems[item.id]
                        ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/50 text-emerald-900 dark:text-emerald-300'
                        : 'bg-gray-50 dark:bg-gray-800/40 border-gray-200 dark:border-gray-700/80 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={!!checkedItems[item.id]}
                      onChange={() => toggleCheck(item.id)}
                      className="w-4 h-4 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500 cursor-pointer"
                    />
                    <span className={`text-xs ${checkedItems[item.id] ? 'line-through opacity-75' : ''}`}>
                      {item.text}
                    </span>
                  </label>
                ))}
              </div>

              {/* Weekly Tasks */}
              <div className="space-y-2.5 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="text-xs font-bold text-gray-800 dark:text-gray-200 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-blue-500" />
                  <span>چک‌لیست کارهای هفتگی و نگهداری سایت (Weekly SOP):</span>
                </div>

                {[
                  { id: 'weekly-1', text: 'پشتیبان‌گیری کامل از پایگاه داده و تنظیمات در تب «۱۳. پشتیبان‌گیری»' },
                  { id: 'weekly-2', text: 'بررسی وضعیت سلامت سرور و منابع PHP در تب «۱۲. وضعیت سیستم»' },
                  { id: 'weekly-3', text: 'انتشار حداقل ۲ مقاله یا ویدئوی آموزشی تازه جهت ارتقای سئو در تب «۲. محتوا»' },
                  { id: 'weekly-4', text: 'بررسی حساب‌های موکلین و ارسال یادآوری تسویه‌حساب‌های معوق' },
                  { id: 'weekly-5', text: 'دانلود گزارش جامع پرونده‌ها در قالب فایل اکسل/CSV برای بایگانی هفتگی' },
                ].map((item) => (
                  <label
                    key={item.id}
                    className={`flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
                      checkedItems[item.id]
                        ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/50 text-emerald-900 dark:text-emerald-300'
                        : 'bg-gray-50 dark:bg-gray-800/40 border-gray-200 dark:border-gray-700/80 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={!!checkedItems[item.id]}
                      onChange={() => toggleCheck(item.id)}
                      className="w-4 h-4 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500 cursor-pointer"
                    />
                    <span className={`text-xs ${checkedItems[item.id] ? 'line-through opacity-75' : ''}`}>
                      {item.text}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: TROUBLESHOOTING & EMERGENCY SCENARIOS */}
          {activeTab === 'faq' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 flex items-start gap-3">
                <HelpCircle className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="font-bold text-purple-900 dark:text-purple-300">
                    پاسخ به سوالات پرتکرار و حل خطاهای احتمالی سایت
                  </h4>
                  <p className="text-xs text-purple-800 dark:text-purple-400 leading-relaxed">
                    راهکارهای سریع برای سناریوهای بحرانی و رفع ایرادات متداول ادمین و موکلین.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/40 space-y-1.5">
                  <div className="font-bold text-gray-900 dark:text-white text-xs flex items-center gap-1.5">
                    <span className="text-amber-500">❓</span>
                    <span>اگر موکل کد تأیید ورود با ایمیل (OTP) را دریافت نکرد چه کنیم؟</span>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                    ۱. از موکل بخواهید پوشه Spam یا Promotions ایمیل خود را بررسی کند.
                    <br />
                    ۲. در صورتی که همچنان ایمیل به دستش نرسید، از تب <strong>«ساخت اکانت بدون پیامک»</strong> در بالای داشبورد، شماره موبایلش را وارد کرده و یک پسورد تصادفی برایش صادر کنید و آن را در پیام‌رسان به او تحویل دهید تا با تب «ورود با رمز عبور ثابت» لاگین کند.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/40 space-y-1.5">
                  <div className="font-bold text-gray-900 dark:text-white text-xs flex items-center gap-1.5">
                    <span className="text-amber-500">❓</span>
                    <span>چگونه فایل‌های پشتیبان را در مواقع بروز مشکل سرور بازیابی کنیم؟</span>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                    به تب <strong>«۱۳. پشتیبان‌گیری»</strong> بروید. لیست کلیه بکاپ‌های ذخیره‌شده همراه با حجم و تاریخ در دسترس است. با کلیک روی دکمه «بازیابی (Restore)» کل اطلاعات در کسری از ثانیه احیا می‌گردد.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/40 space-y-1.5">
                  <div className="font-bold text-gray-900 dark:text-white text-xs flex items-center gap-1.5">
                    <span className="text-amber-500">❓</span>
                    <span>اگر وکیل بخواهد پرونده‌ها را برای مشاور مالیاتی یا حسابرس صادر کند چه باید کرد؟</span>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                    دکمه <strong>«دانلود داده‌ها (CSV)»</strong> در بالای داشبورد قرار دارد. با یک کلیک، فایلی استاندارد با فرمت UTF-8 BOM دانلود می‌شود که حاوی لیست تمام پرونده‌ها، تخصص‌ها و تراکنش‌های موکلین با چینش منظم اکسل است.
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between">
          <div className="text-xs text-gray-500">
            دفتر تخصصی وکالت و داوری SedRazavi · نسخه راهنمای عملیاتی ۴.۲
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#0B132B] hover:bg-[#1C2541] text-[#D4AF37] border border-[#D4AF37]/50 rounded-xl text-xs font-bold transition-all shadow-sm"
          >
            متوجه شدم و بستن راهنما
          </button>
        </div>

      </div>
    </div>
  );
};
