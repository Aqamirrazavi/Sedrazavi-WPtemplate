import React, { useState, useMemo } from 'react';
import {
  Landmark,
  Building,
  Scale,
  FileText,
  AlertTriangle,
  ShieldCheck,
  Calculator,
  Search,
  CheckCircle2,
  Clock,
  Printer,
  Copy,
  Sparkles,
  Info,
  ChevronLeft,
  Calendar,
  Gavel,
  Briefcase,
  Layers,
} from 'lucide-react';
import { ATTORNEY_INFO } from '../../data/mockData';

export type AdminJusticeTab =
  | 'general_board_petition'
  | 'quasi_judicial_defense'
  | 'employment_disputes'
  | 'deadlines_calculator';

export const AdministrativeJusticeSuite: React.FC<{
  onBackToHome?: () => void;
  onOpenBooking?: () => void;
}> = ({ onBackToHome, onOpenBooking }) => {
  const [activeTab, setActiveTab] = useState<AdminJusticeTab>('general_board_petition');

  // ==========================================
  // TAB 1: GENERAL BOARD ANNULMENT STATE
  // ==========================================
  const [authorityType, setAuthorityType] = useState<'هیأت وزیران' | 'شورای اسلامی شهر' | 'سازمان امور مالیاتی' | 'وزارت صمت / گمرک'>('شورای اسلامی شهر');
  const [regulationTitle, setRegulationTitle] = useState('مصوبه اخذ عوارض تمدید پروانه ساختمان و حق تشرف به معابر جدیدالاحداث');
  const [violationGround, setViolationGround] = useState<'مغایرت با قانون' | 'خروج از حدود اختیارات مرجع وضع' | 'مغایرت با موازین شرع'>('خروج از حدود اختیارات مرجع وضع');
  const [claimantName, setClaimantName] = useState('شرکت توسعه و مهندسی آذرخش پارس');
  const [copiedGeneralBoard, setCopiedGeneralBoard] = useState(false);

  const generalBoardPetitionText = useMemo(() => {
    return `ریاست و مستشاران ارجمند هیأت عمومی دیوان عدالت اداری
موضوع: دادخواست ابطال ${regulationTitle} مصوب ${authorityType}
مستندات قانونی: اصول ۱۷۰ و ۱۷۳ قانون اساسی جمهوری اسلامی ایران، مواد ۱۲ و ۸۰ الی ۹۷ قانون تشکیلات و آیین دادرسی دیوان عدالت اداری

شاکی: ${claimantName}
طرف شکایت: ${authorityType}
جهت ابطال: ${violationGround}

شرح دادخواست و ادله حقوقی:
با سلام و تحیات احترامی، به استحضار عالی‌مقامان قضایی دیوان عدالت اداری می‌رساند؛
مرجع طرف شکایت اخیراً اقدام به تصویب و ابلاغ مقرره موسوم به «${regulationTitle}» نموده است که بنا به جهات شرعی و قانونی ذیل شایسته ابطال است:

۱. فقدان صلاحیت قانونی و خروج از اختیارات (Ultra Vires):
مطابق اصل ۷۳ قانون اساسی، قانونگذاری و برقراری هرگونه الزام مالی، عوارض یا تحمیل تکلیف بر شهروندان در انحصار قوه مقننه است. مرجع تصویب‌کننده بدون اتکا به اذن صریح قانونگذار اقدام به وضع این قاعده آمره نموده است.

۲. مخالفت با آرای وحدت رویه پیشین هیأت عمومی:
هیأت عمومی دیوان عدالت اداری سابقاً طی دادنامه‌های مکرر از جمله دادنامه شماره ۳۳۳ و ۱۲۵۳، اخذ هرگونه وجوه خارج از مصادیق تبصره‌های ماده ۱۰۰ و قانون نوسازی و عمران شهری را باطل و غیرقانونی اعلام فرموده است.

۳. تقاضای اعمال ماده ۱۳ قانون دیوان عدالت اداری:
از آنجا که اجرای این مصوبه موجب تضییع شدید حقوق مالی مکتسبه شهروندان و فعالان اقتصادی گردیده است، استدعای ابطال مصوبه مذکور از تاریخ تصویب (عطف‌به‌ماسبق شدن اثر ابطال) را به منظور اعاده وضعیت به حال اول استدعا دارد.

با تقدیم احترام،
وکیل شاکی: دکتر سیده مریم رضوی (وکیل پایه یک دادگستری و متخصص دعاوی دیوان عدالت اداری)`;
  }, [authorityType, regulationTitle, violationGround, claimantName]);

  // ==========================================
  // TAB 2: QUASI-JUDICIAL COMMISSIONS STATE
  // ==========================================
  const [commissionType, setCommissionType] = useState<'ماده ۱۰۰ شهرداری' | 'ماده ۷۷ شهرداری' | 'هیات حل اختلاف مالیاتی' | 'ماده ۹۹ حریم'>('ماده ۱۰۰ شهرداری');
  const [issueType, setIssueType] = useState('حکم تخریب به علت کسری پارکینگ');
  const [propertyArea, setPropertyArea] = useState('۳ واحد پارکینگ تأمین‌نشده در منطقه ۱ تهران');
  const [defenseBasis, setDefenseBasis] = useState('امکان تأمین پارکینگ در شعاع صدمتری و عدم مغایرت با اصول سه‌گانه شهرسازی');

  // ==========================================
  // TAB 3: EMPLOYMENT DISPUTES STATE
  // ==========================================
  const [employeeType, setEmployeeType] = useState<'رسمی / پیمانی دولتی' | 'مشمول قانون کار و تامین اجتماعی' | 'ایثارگران و شرکتی'>('ایثارگران و شرکتی');
  const [disputeSubject, setDisputeSubject] = useState('تبدیل وضعیت استخدامی از شرکتی به رسمی قطعی وفق بند د تبصره ۲۰');

  // ==========================================
  // TAB 4: DEADLINES CALCULATOR STATE
  // ==========================================
  const [notificationDate, setNotificationDate] = useState('1403/05/10');
  const [residenceStatus, setResidenceStatus] = useState<'مقیم ایران' | 'مقیم خارج از کشور'>('مقیم ایران');
  const [caseType, setCaseType] = useState<'اعتراض به رای کمیسیون‌ها' | 'تجدیدنظرخواهی از رای بدوی دیوان' | 'درخواست اعاده دادرسی'>('اعتراض به رای کمیسیون‌ها');

  const deadlineResult = useMemo(() => {
    let days = 90; // 3 months for domestic
    if (residenceStatus === 'مقیم خارج از کشور') {
      days = 180;
    }
    if (caseType === 'تجدیدنظرخواهی از رای بدوی دیوان') {
      days = residenceStatus === 'مقیم ایران' ? 20 : 60;
    } else if (caseType === 'درخواست اعاده دادرسی') {
      days = residenceStatus === 'مقیم ایران' ? 20 : 60;
    }

    return {
      allowedDays: days,
      statutoryArticle:
        caseType === 'اعتراض به رای کمیسیون‌ها'
          ? 'ماده ۱۶ قانون دیوان عدالت اداری (مهلت تقدیم دادخواست ۳ ماه از تاریخ ابلاغ رای قطعی مرجع شبه‌قضایی است)'
          : 'ماده ۶۵ قانون دیوان عدالت اداری (مهلت تجدیدنظرخواهی ۲۰ روز برای مقیمین داخل کشور)',
      injunctionNote: 'امکان تقاضای همزمان دستور موقت (توقف اجرای رای) وفق ماده ۳۴ قانون دیوان به منظور جلوگیری از خسارت غیرقابل جبران وجود دارد.',
    };
  }, [residenceStatus, caseType]);

  const handleCopyGeneralBoard = () => {
    navigator.clipboard?.writeText(generalBoardPetitionText);
    setCopiedGeneralBoard(true);
    setTimeout(() => setCopiedGeneralBoard(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#F4F6F9] dark:bg-[#070D1E] py-8 sm:py-12 text-[#0B132B] dark:text-gray-100 font-sans">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl space-y-8">
        {/* Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#0B132B] via-[#152347] to-[#0B132B] text-white shadow-xl border border-[#D4AF37]/30">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40 text-xs font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                دیوان عدالت اداری و حقوق عمومی (Phase 15)
              </span>
              <span className="text-xs text-gray-400">نظارت قضایی بر اعمال حاکمیت و مصوبات دولتی</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black font-serif text-white">
              میز تخصصی دعاوی دیوان عدالت اداری، کمیسیون‌های شهرداری و حقوق استخدامی
            </h1>
            <p className="text-xs sm:text-sm text-gray-300 max-w-2xl leading-relaxed">
              تنظیم دادخواست‌های تخصصی ابطال مصوبات در هیأت عمومی دیوان عدالت اداری، نقض آرای کمیسیون‌های ماده ۱۰۰ و ۷۷ شهرداری، حل اختلافات مالیاتی و تامین اجتماعی و دعاوی استخدامی کارکنان دولت.
            </p>
          </div>

          {onBackToHome && (
            <button
              onClick={onBackToHome}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all border border-white/20 shrink-0 self-start md:self-auto"
            >
              بازگشت به پیشخوان اصلی
            </button>
          )}
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-gray-200 dark:border-gray-800">
          <button
            onClick={() => setActiveTab('general_board_petition')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all shrink-0 ${
              activeTab === 'general_board_petition'
                ? 'bg-[#D4AF37] text-[#0B132B] shadow-md'
                : 'bg-white dark:bg-[#0B132B] text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-800 hover:text-[#D4AF37]'
            }`}
          >
            <Gavel className="w-4 h-4" />
            <span>ابطال مصوبات در هیأت عمومی دیوان</span>
          </button>

          <button
            onClick={() => setActiveTab('quasi_judicial_defense')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all shrink-0 ${
              activeTab === 'quasi_judicial_defense'
                ? 'bg-[#D4AF37] text-[#0B132B] shadow-md'
                : 'bg-white dark:bg-[#0B132B] text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-800 hover:text-[#D4AF37]'
            }`}
          >
            <Building className="w-4 h-4" />
            <span>کمیسیون ماده ۱۰۰، ۷۷ و شهرداری</span>
          </button>

          <button
            onClick={() => setActiveTab('employment_disputes')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all shrink-0 ${
              activeTab === 'employment_disputes'
                ? 'bg-[#D4AF37] text-[#0B132B] shadow-md'
                : 'bg-white dark:bg-[#0B132B] text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-800 hover:text-[#D4AF37]'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>دعاوی استخدامی و تامین اجتماعی</span>
          </button>

          <button
            onClick={() => setActiveTab('deadlines_calculator')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all shrink-0 ${
              activeTab === 'deadlines_calculator'
                ? 'bg-[#D4AF37] text-[#0B132B] shadow-md'
                : 'bg-white dark:bg-[#0B132B] text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-800 hover:text-[#D4AF37]'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>محاسبه‌گر مواعد قانونی دیوان</span>
          </button>
        </div>

        {/* TAB 1: GENERAL BOARD */}
        {activeTab === 'general_board_petition' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 space-y-4">
              <div className="p-6 rounded-3xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-sm space-y-4">
                <h4 className="font-bold text-sm text-[#0B132B] dark:text-white">مشخصات مصوبه مورد اعتراض</h4>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-gray-600 dark:text-gray-400">مرجع وضع مقرره:</label>
                  <select
                    value={authorityType}
                    onChange={(e: any) => setAuthorityType(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 text-xs"
                  >
                    <option value="شورای اسلامی شهر">شورای اسلامی شهر (عوارض و مصوبات محلی)</option>
                    <option value="هیأت وزیران">هیأت وزیران (آیین‌نامه‌ها و تصویب‌نامه‌ها)</option>
                    <option value="سازمان امور مالیاتی">سازمان امور مالیاتی (بخشنامه‌ها و دستورالعمل‌ها)</option>
                    <option value="وزارت صمت / گمرک">وزارت صمت و گمرک ایران</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-gray-600 dark:text-gray-400">عنوان دقیق مقرره یا بند مورد اعتراض:</label>
                  <input
                    type="text"
                    value={regulationTitle}
                    onChange={(e) => setRegulationTitle(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-gray-600 dark:text-gray-400">جهت بطلان در هیأت عمومی:</label>
                  <select
                    value={violationGround}
                    onChange={(e: any) => setViolationGround(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 text-xs"
                  >
                    <option value="خروج از حدود اختیارات مرجع وضع">خروج از حدود اختیارات مرجع تصویب‌کننده (عدم صلاحیت)</option>
                    <option value="مغایرت با قانون">مغایرت آشکار با قوانین بالادستی و اصول قانون اساسی</option>
                    <option value="مغایرت با موازین شرع">مغایرت با موازین شرع مقدس اسلام (ارجاع به فقهای شورای نگهبان)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-gray-600 dark:text-gray-400">نام شاکی / شخص حقیقی یا حقوقی متضرر:</label>
                  <input
                    type="text"
                    value={claimantName}
                    onChange={(e) => setClaimantName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 text-xs"
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <div className="p-6 rounded-3xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
                  <h4 className="font-bold text-sm text-[#0B132B] dark:text-white">
                    متن دادخواست تخصصی هیأت عمومی دیوان عدالت اداری
                  </h4>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCopyGeneralBoard}
                      className="px-3 py-1.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 text-xs font-bold hover:bg-gray-200 flex items-center gap-1.5 transition-colors"
                    >
                      {copiedGeneralBoard ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedGeneralBoard ? 'کپی شد' : 'کپی متن'}</span>
                    </button>
                    <button
                      onClick={() => window.print()}
                      className="px-3 py-1.5 rounded-xl bg-[#D4AF37] text-[#0B132B] text-xs font-bold hover:bg-[#c29f2e] flex items-center gap-1.5 transition-colors"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>چاپ رسمی (A4)</span>
                    </button>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200/70 dark:border-gray-800 font-serif text-xs leading-relaxed whitespace-pre-line text-gray-800 dark:text-gray-200 select-all min-h-[320px]">
                  {generalBoardPetitionText}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: QUASI-JUDICIAL DEFENSE */}
        {activeTab === 'quasi_judicial_defense' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-xl space-y-6">
              <div className="space-y-1">
                <h3 className="text-lg font-bold font-serif text-[#0B132B] dark:text-white">
                  استراتژی‌های ابطال و نقض آرای کمیسیون‌های شبه‌قضایی در شعب بدوی و تجدیدنظر دیوان
                </h3>
                <p className="text-xs text-gray-500">
                  رسیدگی شکلی به رعایت موازین قانونی و اصول دادرسی منصفانه در مراجع شبه‌قضایی
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    title: 'کمیسیون ماده ۱۰۰ شهرداری (قلع بنا و جریمه)',
                    points: [
                      'اثبات احداث بنا قبل از تصویب طرح جامع شهر و شمول قاعده تسلیط',
                      'نقض حکم تخریب در صورت امکان اخذ جریمه و عدم مخالفت با اصول سه‌گانه',
                      'الزام شهرداری به ارجاع امر به کارشناس رسمی دادگستری جهت تعیین استحکام بنا',
                    ],
                  },
                  {
                    title: 'کمیسیون ماده ۷۷ شهرداری (عوارض و بهای خدمات)',
                    points: [
                      'ابطال عوارض من‌درآوردی نظیر عوارض کسر پارکینگ، عوارض حق تشرف و تابلو',
                      'اعتراض به محاسبه غیرقانونی بر مبنای ارزش معاملاتی روز به جای سال احداث',
                      'درخواست صدور دستور موقت توقف عملیات اجرایی ثبت',
                    ],
                  },
                  {
                    title: 'هیات‌های حل اختلاف مالیاتی (ماده ۲۱۶ ق.م.م)',
                    points: [
                      'اعتراض به برگ تشخیص صادره به دلیل عدم ابلاغ واقعی طبق مواد ۲۰۳ و ۲۰۸',
                      'اثبات مرور زمان مالیاتی وفق ماده ۱۵۷ قانون مالیات‌های مستقیم',
                      'نقض رسیدگی علی‌الرأس و لزوم رسیدگی به اسناد و دفاتر قانونی مؤدی',
                    ],
                  },
                  {
                    title: 'کمیسیون ماده ۹۹ قانون شهرداری (اراضی خارج از حریم)',
                    points: [
                      'دفاع در خصوص املاک و ویلاهای واقع در خارج از محدوده مصوب شهر',
                      'اثبات احداث قبل از لازم‌الاجرا شدن حریم مصوب استانداری',
                      'ابطال احکام قلع و قمع اراضی کشاورزی در صورت تغییر کاربری غیرعمدی',
                    ],
                  },
                ].map((item, i) => (
                  <div key={i} className="p-5 rounded-2xl bg-gray-50 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-800 space-y-3">
                    <h4 className="font-bold text-xs text-[#AA820A] dark:text-[#D4AF37] flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      {item.title}
                    </h4>
                    <ul className="space-y-1.5 text-xs text-gray-600 dark:text-gray-300 list-disc list-inside leading-relaxed">
                      {item.points.map((pt, pIdx) => (
                        <li key={pIdx}>{pt}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: EMPLOYMENT DISPUTES */}
        {activeTab === 'employment_disputes' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-xl space-y-6">
              <div className="space-y-1">
                <h3 className="text-lg font-bold font-serif text-[#0B132B] dark:text-white">
                  دعاوی اداری، استخدامی و حقوق بازنشستگی کارکنان دولت و تامین اجتماعی
                </h3>
                <p className="text-xs text-gray-500">
                  صلاحیت اختصاصی شعب استخدامی دیوان عدالت اداری وفق ماده ۱۰ قانون تشکیلات
                </p>
              </div>

              <div className="space-y-3">
                {[
                  {
                    subject: 'تبدیل وضعیت استخدامی ایثارگران (بند د تبصره ۲۰)',
                    details: 'الزام دستگاه‌های اجرایی، بانک‌ها و شرکت‌های دولتی به استخدام قطعی نیروهای شرکتی، قراردادی و حجمی مشمول ماده ۲۱ قانون جامع ایثارگران.',
                    badge: 'بیش از ۲۰۰ رای موافق دیوان',
                  },
                  {
                    subject: 'مشاغل سخت و زیان‌آور و بازنشستگی پیش از موعد تامین اجتماعی',
                    details: 'اعتراض به آرای کمیته‌های بدوی و تجدیدنظر استانی و احیای سنوات ارفاقی ۲۰ سال سابقه بازنشستگی بدون کسر سنوات.',
                    badge: 'احیای حقوق بازنشستگان',
                  },
                  {
                    subject: 'اعتراض به آرای هیأت‌های رسیدگی به تخلفات اداری کارمندان',
                    details: 'نقض احکام انفصال موقت یا دائم از خدمت دولتی به دلیل نقض قواعد دادرسی عادلانه، عدم تفهیم اتهام و مرور زمان اداری.',
                    badge: 'دفاع و اعاده به خدمت',
                  },
                  {
                    subject: 'مطالبه پاداش پایان خدمت، مرخصی‌های ذخیره‌شده و تفاوت تطبیق',
                    details: 'الزام سازمان‌های دولتی به محاسبه و پرداخت مزایای ریالی بازنشستگی طبق آخرین حکم کارگزینی قبل از بازنشستگی.',
                    badge: 'محاسبه مطالبات ریالی',
                  },
                ].map((row, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="font-bold text-xs text-[#0B132B] dark:text-white">{row.subject}</div>
                      <p className="text-[11px] text-gray-500 max-w-xl leading-relaxed">{row.details}</p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[11px] font-bold shrink-0 self-start sm:self-auto">
                      {row.badge}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: DEADLINES CALCULATOR */}
        {activeTab === 'deadlines_calculator' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-xl space-y-6">
              <div className="space-y-1">
                <h3 className="text-lg font-bold font-serif text-[#0B132B] dark:text-white">
                  محاسبه‌گر مواعد قانونی دادخواست و تجدیدنظرخواهی در دیوان عدالت اداری
                </h3>
                <p className="text-xs text-gray-500">
                  مهلت‌های قاطع دعوا وفق قانون تشکیلات و آیین دادرسی دیوان عدالت اداری
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700 dark:text-gray-300">نوع اقدام حقوقی:</label>
                  <select
                    value={caseType}
                    onChange={(e: any) => setCaseType(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 text-xs"
                  >
                    <option value="اعتراض به رای کمیسیون‌ها">اعتراض به آرای قطعی مراجع شبه‌قضایی (ماده ۱۶)</option>
                    <option value="تجدیدنظرخواهی از رای بدوی دیوان">تجدیدنظرخواهی از آرای شعب بدوی دیوان (ماده ۶۵)</option>
                    <option value="درخواست اعاده دادرسی">درخواست اعاده دادرسی (ماده ۹۸)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700 dark:text-gray-300">محل اقامت موکل:</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setResidenceStatus('مقیم ایران')}
                      className={`py-2 rounded-xl text-xs font-bold transition-all ${
                        residenceStatus === 'مقیم ایران'
                          ? 'bg-[#D4AF37] text-[#0B132B]'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'
                      }`}
                    >
                      مقیم داخل کشور
                    </button>
                    <button
                      type="button"
                      onClick={() => setResidenceStatus('مقیم خارج از کشور')}
                      className={`py-2 rounded-xl text-xs font-bold transition-all ${
                        residenceStatus === 'مقیم خارج از کشور'
                          ? 'bg-[#D4AF37] text-[#0B132B]'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'
                      }`}
                    >
                      مقیم خارج از کشور
                    </button>
                  </div>
                </div>
              </div>

              {/* Deadline Output Card */}
              <div className="p-6 rounded-2xl bg-amber-500/10 border border-[#D4AF37]/30 text-center space-y-3">
                <div className="text-xs text-gray-500 dark:text-gray-400">مهلت قانونی جهت ثبت دادخواست در دفاتر خدمات الکترونیک قضایی:</div>
                <div className="text-3xl sm:text-4xl font-black text-[#AA820A] dark:text-[#D4AF37] font-serif">
                  {deadlineResult.allowedDays} روز
                </div>
                <div className="text-xs text-gray-700 dark:text-gray-300 max-w-xl mx-auto leading-relaxed">
                  {deadlineResult.statutoryArticle}
                </div>
                <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold max-w-xl mx-auto pt-2 border-t border-[#D4AF37]/20">
                  {deadlineResult.injunctionNote}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
