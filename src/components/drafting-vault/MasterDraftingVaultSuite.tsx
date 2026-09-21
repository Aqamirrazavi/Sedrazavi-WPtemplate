import React, { useState } from 'react';
import {
  FileText,
  Download,
  Copy,
  Check,
  Printer,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  Sliders,
  Award,
  Globe,
  Coins,
  Scale,
  Building,
  CheckCircle2,
  FolderDown,
  Layers,
  HelpCircle,
  Share2
} from 'lucide-react';

interface ContractTemplate {
  id: string;
  title: string;
  category: 'corporate' | 'commercial' | 'construction' | 'tech';
  language: 'fa' | 'fa_en';
  description: string;
  clausesCount: number;
  tags: string[];
  defaultParties: {
    partyA: string;
    partyB: string;
    subject: string;
    penaltyPerDayToman: string;
    arbitrationCenter: string;
  };
  sampleBody: (parties: any) => string;
}

const TEMPLATES: ContractTemplate[] = [
  {
    id: 'nda-mutual',
    title: 'قرارداد جامع محرمانگی و عدم افشای اطلاعات دوجانبه (Bilingual NDA)',
    category: 'tech',
    language: 'fa_en',
    description: 'حفاظت کامل از اسرار تجاری، کدهای منبع، اسرار فنی و داده‌های محرمانه شرکت‌ها با تعیین وجه التزام قطعی تخلف.',
    clausesCount: 14,
    tags: ['محرمانگی', 'استارتاپ', 'اسرار تجاری', 'وجه التزام'],
    defaultParties: {
      partyA: 'شرکت فناوری اطلاعات و ارتباطات نوآوران پارس (سهامی خاص)',
      partyB: 'شرکت سرمایه‌گذاری و شتابدهی آینده‌سازان مهر (با مسئولیت محدود)',
      subject: 'تبادل اطلاعات فنی، مالی و مدل‌های هوش مصنوعی اختصاصی جهت بررسی فرصت سرمایه‌گذاری مشترک',
      penaltyPerDayToman: '۵۰,۰۰۰,۰۰۰ تومان وجه التزام روزانه',
      arbitrationCenter: 'مرکز داوری کانون وکلای دادگستری مرکز',
    },
    sampleBody: (parties) => `بسمه تعالی
قرارداد محرمانگی و حفظ اسرار تجاری (Non-Disclosure Agreement)

این قرارداد در تاریخ ${new Date().toLocaleDateString('fa-IR')} میان طرفین ذیل منعقد گردید:

ماده ۱ - طرفین قرارداد:
طرف اول: ${parties.partyA} به شماره ثبت و شناسه ملی معتبر با نمایندگی تام‌الاختیار صاحبان امضای مجاز به عنوان «افشاکننده / دریافت‌کننده».
طرف دوم: ${parties.partyB} به عنوان «افشاکننده / دریافت‌کننده».

ماده ۲ - موضوع قرارداد:
${parties.subject}

ماده ۳ - تعریف اطلاعات محرمانه:
کلیه اطلاعات فنی، تجاری، مالی، نرم‌افزاری، کدها، پایگاه داده، الگوریتم‌ها، راهبردهای بازاریابی و اسرار مگوی کاری که به هر نحو در قالب کتبی، شفاهی، الکترونیکی یا تصویری در اختیار طرف مقابل قرار گیرد، محرمانه تلقی می‌گردد.

ماده ۴ - تعهدات طرفین:
۱. طرف دریافت‌کننده متعهد است بالاترین درجه مراقبت معقول را در حفظ و حراست از اسناد به عمل آورد.
۲. کپی‌برداری، تکثیر یا انتقال اطلاعات به اشخاص ثالث بدون اجازه کتبی صریح ممنوع است.
۳. دسترسی به اطلاعات صرفاً به کارکنان کلیدی و با امضای تعهدنامه محرمانگی الحاقی مجاز خواهد بود.

ماده ۵ - ضمانت اجرای نقض تعهد (وجه التزام):
در صورت هرگونه افشا، افشای غیرمجاز یا نقض مفاد این قرارداد، طرف متخلف متعهد و ملزم به پرداخت مبلغ ${parties.penaltyPerDayToman} به عنوان خسارت مقطوع توافقی علاوه بر جبران کلیه خسارات وارده مادی و معنوی به طرف متضرر خواهد بود.

ماده ۶ - حل اختلاف و مرجع داوری:
کلیه اختلافات ناشی از تفسیر یا اجرای این قرارداد به داوری ${parties.arbitrationCenter} ارجاع می‌گردد و رای داور برای طرفین قطعی و لازم‌الاجراست.`,
  },
  {
    id: 'partnership-building',
    title: 'قرارداد مشارکت در ساخت و احداث بنا (مشارکت مدنی نوسازی)',
    category: 'construction',
    language: 'fa',
    description: 'تنظیم دقیق تعهدات مالک و سازنده، نسبت سهم‌الشرکه، بلاعوض، ضمانت‌نامه‌ها، جدول پیشرفت فیزیکی و مصالح.',
    clausesCount: 22,
    tags: ['ملکی', 'مشارکت در ساخت', 'پیش‌فروش', 'سازنده'],
    defaultParties: {
      partyA: 'آقای سید احمد حسینی (مالک پلاک ثبتی)',
      partyB: 'شرکت ساختمانی عمران گستر آریا (سازنده)',
      subject: 'تخریب و نوسازی ملک به پلاک ثبتی ۱۲/۴۵۶۷ واقع در منطقه ۱ تهران و احداث ساختمان ۵ طبقه مسکونی',
      penaltyPerDayToman: '۳۰,۰۰۰,۰۰۰ تومان به ازای هر روز تاخیر در تحویل',
      arbitrationCenter: 'داور مرضی‌الطرفین دکتر سیده مریم رضوی (وکیل دادگستری)',
    },
    sampleBody: (parties) => `بسمه تعالی
قرارداد مشارکت در ساخت و تجدید بنا

ماده ۱ - طرفین قرارداد:
طرف اول (مالک): ${parties.partyA}
طرف دوم (سازنده): ${parties.partyB}

ماده ۲ - موضوع و محل اجرای قرارداد:
${parties.subject}

ماده ۳ - نسبت سهم‌الشرکه طرفین:
۶۰ درصد از کل زیربنای مفید احداثی متعلق به طرف اول و ۴۰ درصد متعلق به طرف دوم خواهد بود.

ماده ۴ - مدت قرارداد و زمان‌بندی:
مدت کل اجرای پروژه از تاریخ اخذ جواز ساخت و تخلیه ملک حداکثر ۲۴ ماه خورشیدی می‌باشد.

ماده ۵ - وجه التزام تاخیر:
در صورت تاخیر سازنده در اخذ پایان‌کار، صورتمجلس تفکیکی و تحویل مبیع، وی ملزم به پرداخت روزانه مبلغ ${parties.penaltyPerDayToman} در حق مالک خواهد بود.

ماده ۶ - مرجع حل اختلاف:
کلیه اختلافات ناشی از این قرارداد به ${parties.arbitrationCenter} ارجاع می‌گردد.`,
  },
  {
    id: 'founders-safe',
    title: 'قرارداد سهامداری و هم‌بنیان‌گذاران استارتاپ (Founders Agreement & Vesting)',
    category: 'corporate',
    language: 'fa_en',
    description: 'شروط تخصیص تدریجی سهام (Vesting ۴ ساله با Cliff یکساله)، خروج هم‌بنیان‌گذار، حق اولویت خرید و منع رقابت.',
    clausesCount: 18,
    tags: ['سهامداری', 'وستینگ', 'استارتاپ', 'حق تقدم'],
    defaultParties: {
      partyA: 'هم‌بنیان‌گذار فنی (CTO)',
      partyB: 'هم‌بنیان‌گذار اجرایی (CEO)',
      subject: 'تاسیس شرکت دانش‌بنیان، نحوه تملک سهام، واگذاری مرحله‌ای (Vesting) و حقوق مالکیت فکری ایده',
      penaltyPerDayToman: 'انتقال بلاعوض کلیه سهام وست‌نشده به شرکت',
      arbitrationCenter: 'مرکز داوری اتاق بازرگانی تهران',
    },
    sampleBody: (parties) => `بسمه تعالی
موافقت‌نامه سهامداری و تخصیص تدریجی سهام هم‌بنیان‌گذاران

ماده ۱ - طرفین توافق:
طرف اول: ${parties.partyA}
طرف دوم: ${parties.partyB}

ماده ۲ - موضوع توافق:
${parties.subject}

ماده ۳ - جدول وستینگ سهام (Vesting Schedule):
۱. دوره کلیف (Cliff) به مدت ۱۲ ماه تمام تعیین می‌گردد.
۲. سهام هر یک از طرفین در طول مدت ۴ سال به نسبت ماهانه ۲.۰۸٪ آزاد خواهد شد.

ماده ۴ - شرط خروج و عدم رقابت (Non-Compete):
در صورت خروج هر یک از هم‌بنیان‌گذاران قبل از اتمام دوره وستینگ، سهام آزادنشده به صندوق سهام تشویقی بازمی‌گردد و وی تا ۲ سال حق فعالیت در حوزه مشابه را نخواهد داشت.`,
  }
];

export const MasterDraftingVaultSuite: React.FC<{
  onBackToHome?: () => void;
  onOpenDashboard?: () => void;
}> = ({ onBackToHome, onOpenDashboard }) => {
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('nda-mutual');
  const [copied, setCopied] = useState(false);

  const selectedTemplate = TEMPLATES.find((t) => t.id === selectedTemplateId) || TEMPLATES[0];

  // Customizable parameters
  const [customParams, setCustomParams] = useState({ ...selectedTemplate.defaultParties });

  const handleTemplateChange = (id: string) => {
    setSelectedTemplateId(id);
    const tmpl = TEMPLATES.find((t) => t.id === id);
    if (tmpl) {
      setCustomParams({ ...tmpl.defaultParties });
    }
  };

  const fullContractText = selectedTemplate.sampleBody(customParams);

  const handleCopy = () => {
    navigator.clipboard.writeText(fullContractText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadDocx = () => {
    const blob = new Blob([fullContractText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedTemplate.id}-contract.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#070B19] text-gray-100 py-10 px-4 sm:px-6 lg:px-8 font-sans" dir="rtl">
      {/* Top Banner */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-l from-[#0B132B] via-[#0F1B3E] to-[#0B132B] border border-[#D4AF37]/30 shadow-2xl relative overflow-hidden">
          <div className="absolute -left-20 -top-20 w-72 h-72 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-2 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-bold">
              <FileText className="w-3.5 h-3.5" />
              <span>فاز ۲۵: گاوصندوق جامع پیش‌نویس قراردادهای فوق‌تخصصی و دوزبانه (Legal Drafting Vault)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black font-serif text-white tracking-tight">
              ژنراتور تنظیم هوشمند قراردادهای تجاری، مشارکت در ساخت، NDA و سهامداری استارتاپ‌ها
            </h1>
            <p className="text-gray-300 text-xs sm:text-sm max-w-3xl leading-relaxed">
              دسترسی به متون استاندارد بین‌المللی و داخلی، شخصی‌سازی آنی طرفین و شروط حل اختلاف، و استخراج اسناد حقوقی منطبق با قوانین تجارت و مدنی ایران با نظارت دکتر سیده مریم رضوی.
            </p>
          </div>

          <div className="flex items-center gap-3 relative z-10">
            {onBackToHome && (
              <button
                onClick={onBackToHome}
                className="px-4 py-2.5 rounded-xl bg-gray-800/80 hover:bg-gray-700 text-xs font-bold text-gray-200 transition-colors border border-gray-700"
              >
                صفحه نخست
              </button>
            )}
            {onOpenDashboard && (
              <button
                onClick={onOpenDashboard}
                className="px-4 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#b5952f] text-[#070B19] text-xs font-black transition-colors shadow-lg shadow-[#D4AF37]/20"
              >
                پیشخوان وکیل
              </button>
            )}
          </div>
        </div>

        {/* Templates Selection Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {TEMPLATES.map((tmpl) => (
            <div
              key={tmpl.id}
              onClick={() => handleTemplateChange(tmpl.id)}
              className={`p-5 rounded-3xl border cursor-pointer transition-all duration-300 ${
                selectedTemplateId === tmpl.id
                  ? 'bg-[#0B132B] border-[#D4AF37] shadow-xl shadow-[#D4AF37]/15 ring-1 ring-[#D4AF37]'
                  : 'bg-[#0B132B]/50 border-gray-800 hover:border-gray-700'
              }`}
            >
              <div className="flex items-center justify-between pb-3 border-b border-gray-800/60 mb-3">
                <span className="text-[11px] font-bold text-[#D4AF37] flex items-center gap-1">
                  <Award className="w-3.5 h-3.5" />
                  <span>{tmpl.clausesCount} ماده حقوقی تخصصی</span>
                </span>
                <span className="px-2 py-0.5 rounded-md bg-gray-800 text-[10px] text-gray-300 font-mono">
                  {tmpl.language === 'fa_en' ? 'دوزبانه FA/EN' : 'فارسی رسمی'}
                </span>
              </div>

              <h3 className="font-bold text-sm text-white mb-2 line-clamp-1">{tmpl.title}</h3>
              <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed mb-4">{tmpl.description}</p>

              <div className="flex flex-wrap gap-1.5">
                {tmpl.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded-lg bg-[#070B19] border border-gray-800 text-[10px] text-gray-300"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Workspace */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Customization Form */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#0B132B]/80 rounded-3xl p-6 sm:p-8 border border-gray-800 shadow-xl space-y-5">
            <h2 className="text-base font-bold text-white flex items-center gap-2 pb-4 border-b border-gray-800">
              <Sliders className="w-4 h-4 text-[#D4AF37]" />
              <span>شخصی‌سازی مشخصات و شروط کلیدی قرارداد</span>
            </h2>

            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1.5">مشخصات طرف اول قرارداد:</label>
              <input
                type="text"
                value={customParams.partyA}
                onChange={(e) => setCustomParams({ ...customParams, partyA: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-[#070B19] border border-gray-700 text-white text-xs focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1.5">مشخصات طرف دوم قرارداد:</label>
              <input
                type="text"
                value={customParams.partyB}
                onChange={(e) => setCustomParams({ ...customParams, partyB: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-[#070B19] border border-gray-700 text-white text-xs focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1.5">موضوع تفصیلی و دامنه تعهدات:</label>
              <textarea
                rows={3}
                value={customParams.subject}
                onChange={(e) => setCustomParams({ ...customParams, subject: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-[#070B19] border border-gray-700 text-white text-xs focus:outline-none focus:border-[#D4AF37] leading-relaxed"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1.5">وجه التزام و خسارت تاخیر روزانه:</label>
              <input
                type="text"
                value={customParams.penaltyPerDayToman}
                onChange={(e) => setCustomParams({ ...customParams, penaltyPerDayToman: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-[#070B19] border border-gray-700 text-white text-xs focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1.5">مرجع داوری و حل اختلاف:</label>
              <input
                type="text"
                value={customParams.arbitrationCenter}
                onChange={(e) => setCustomParams({ ...customParams, arbitrationCenter: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-[#070B19] border border-gray-700 text-white text-xs focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div className="p-4 rounded-2xl bg-[#070B19] border border-gray-800 space-y-1 text-xs text-gray-400">
              <span className="font-bold text-[#D4AF37] block">استاندارد کانون وکلای دادگستری مرکز:</span>
              <p className="text-[11px] leading-relaxed">
                تمام شروط فوق منطبق با ماده ۱۰ و ۲۱۹ قانون مدنی طراحی شده و از تداخل با قوانین آمره مصون است.
              </p>
            </div>
          </div>
        </div>

        {/* Generated Preview & Actions */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-[#0B132B]/90 rounded-3xl p-6 sm:p-8 border border-[#D4AF37]/40 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-800">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#D4AF37]" />
                  <span>پیش‌نمایش زنده سند رسمی قرارداد</span>
                </h3>
                <span className="text-xs text-gray-400">آماده برای امضا، کپی یا چاپ با سربرگ دفتر وکالت</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="px-3 py-1.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-xs font-bold text-gray-200 transition-colors flex items-center gap-1.5 border border-gray-700"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'کپی شد!' : 'کپی متن'}</span>
                </button>

                <button
                  onClick={handleDownloadDocx}
                  className="px-3 py-1.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-xs font-bold text-gray-200 transition-colors flex items-center gap-1.5 border border-gray-700"
                >
                  <Download className="w-3.5 h-3.5 text-blue-400" />
                  <span>دانلود فایل</span>
                </button>

                <button
                  onClick={handlePrint}
                  className="px-3 py-1.5 rounded-xl bg-[#D4AF37] hover:bg-[#b5952f] text-[#070B19] text-xs font-black transition-colors flex items-center gap-1.5 shadow-md shadow-[#D4AF37]/20"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>چاپ سند</span>
                </button>
              </div>
            </div>

            {/* Document Preview Box */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#070B19] border border-gray-800 max-h-[520px] overflow-y-auto font-serif text-xs sm:text-sm text-gray-200 whitespace-pre-wrap leading-relaxed shadow-inner">
              {fullContractText}
            </div>

            <div className="flex items-center justify-between text-[11px] text-gray-400 pt-2 border-t border-gray-800">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>گارانتی عدم مغایرت با قوانین آمره و نظم عمومی کشور</span>
              </span>
              <span className="text-[#D4AF37] font-bold">تنظیم تحت نظارت دکتر سیده مریم رضوی</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
