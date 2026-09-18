import React, { useState } from 'react';
import {
  ShieldAlert,
  Search,
  CheckCircle,
  AlertTriangle,
  FileCheck2,
  Globe2,
  Copy,
  Check,
  Scale,
  Sparkles,
  Info,
  Layers,
  ChevronDown
} from 'lucide-react';
import { NICE_CLASSIFICATION_DATA, MOCK_IP_ASSETS_DATA } from '../../data/mockData';
import { NiceClassificationClass, IPAssetEvaluation } from '../../types/theme';

export const TrademarkNiceClassifier: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'goods' | 'services'>('all');
  const [selectedClasses, setSelectedClasses] = useState<number[]>([9, 42]);
  const [brandName, setBrandName] = useState('آکادمی هوش حقوقی دادمان');
  const [territory, setTerritory] = useState<'iran' | 'madrid' | 'gcc'>('iran');
  const [copiedCode, setCopiedCode] = useState(false);

  // فیلتر کردن طبقات نیس
  const filteredClasses = NICE_CLASSIFICATION_DATA.filter((item) => {
    const matchesSearch =
      item.titleFa.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.titleEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.popularKeywords.some((kw) => kw.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory =
      selectedCategory === 'all' || item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const toggleClassSelection = (classNum: number) => {
    setSelectedClasses((prev) =>
      prev.includes(classNum) ? prev.filter((c) => c !== classNum) : [...prev, classNum]
    );
  };

  // محاسبه هزینه تقریبی بر اساس تعداد طبقات انتخابی و قلمرو
  const calculateEstimatedFee = () => {
    const classCount = Math.max(1, selectedClasses.length);
    if (territory === 'iran') {
      // ثبت در ایران: تقاضانامه اولیه + حق‌الثبت هر طبقه اضافی + روزنامه رسمی
      const baseFeeTomans = 4500000;
      const additionalClassFee = (classCount - 1) * 1200000;
      const officialGazetteFee = 1800000;
      return (baseFeeTomans + additionalClassFee + officialGazetteFee).toLocaleString('fa-IR') + ' تومان';
    } else if (territory === 'madrid') {
      // سیستم مادرید WIPO (بر حسب فرانک سوئیس CHF)
      const baseChf = 653;
      const perClassChf = (classCount - 1) * 100;
      return `${(baseChf + perClassChf).toLocaleString('fa-IR')} فرانک سوئیس (CHF)`;
    } else {
      // ثبت در حوزه کشورهای شورای همکاری خلیج فارس
      return 'تقریباً ۳,۵۰۰ الی ۵,۰۰۰ دلار آمریکا (شامل انتشار در جریده رسمی هر کشور)';
    }
  };

  const generateFormalObjectionNotice = () => {
    return `بسمه تعالی
ریاست محترم اداره ثبت علائم تجاری و مالکیت صنعتی
موضوع: اعتراض رسمی به ثبت علامت تجاری مشابه موضوع ماده ۳۲ و ۳۷ قانون ثبت اختراعات، طرح‌های صنعتی و علائم تجاری مصوب ۱۳۸۶

با سلام و احترام؛
اینجانب / این شرکت، به عنوان مالک قانونی علامت تجاری دارای سابقه ثبت و تصدیق معتبر در طبقات [${selectedClasses.join('، ')}] طبقه‌بندی بین‌المللی کالا و خدمات (نیس)، بدین‌وسیله نسبت به انتشار آگهی تقاضای ثبت علامت مشابه تحت عنوان «${brandName || 'علامت مورد اعتراض'}» در روزنامه رسمی کشور اعتراض قانونی خود را اعلام می‌دارد.

دلایل توجیهی و مستندات قانونی:
۱. انطباق و هم‌پوشانی کامل طبقات درخواستی متقاضی جدید با طبقات مورد استفاده و انحصاری موکل.
۲. شباهت دیداری، آوایی، املایی و مفهومی که بی‌تردید موجب فریب و گمراهی عموم مصرف‌کنندگان در مبدأ کالا و خدمات می‌گردد (بند الف و هـ ماده ۳۲ قانون).
۳. سوءنیت متقاضی در بهره‌برداری غیرمنصفانه از شهرت تجاری تثبیت‌شده و سرمایه‌گذاری مادی و معنوی موکل.

علی‌هذا، مستنداً به ماده ۳۷ قانون مذکور و آیین‌نامه اجرایی مربوطه، ابطال اظهارنامه متقاضی جدید و رد تقاضای ثبت علامت مشابه از آن مقام محترم استدعا می‌شود.

با تجدید احترام؛
دفتر وکالت و داوری تخصصی دکتر سیده مریم رضوی`;
  };

  const handleCopyNotice = () => {
    navigator.clipboard.writeText(generateFormalObjectionNotice());
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300" dir="rtl">
      {/* هدر بخش طبقات نیس */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#0B132B] border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-bold text-[#D4AF37] px-3 py-1 rounded-full bg-[#D4AF37]/10 inline-flex items-center gap-1.5 border border-[#D4AF37]/20">
              <Sparkles className="w-3.5 h-3.5" /> طبقه‌بندی استاندارد بین‌المللی کالا و خدمات (Nice Agreement)
            </span>
            <h2 className="text-xl sm:text-2xl font-black font-serif text-slate-900 dark:text-white">
              سامانه هوشمند تشخیص طبقات علائم تجاری و ممیزی تعارض برند
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-3xl">
              انتخاب دقیق طبقات ۱ الی ۳۴ (کالاها) و ۳۵ الی ۴۵ (خدمات) ضامن تثبیت حمایت کیفری و حقوقی در برابر سوءاستفاده‌کنندگان و علامت‌های گمراه‌کننده تجاری است.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-300 text-xs text-right">
              <span className="font-bold block">توصیه دکتر سیده مریم رضوی:</span>
              «همواره طبقه ۴۲ (نرم‌افزار) و طبقه ۳۵ (تبلیغات/فروشگاه اینترنتی) را برای کسب‌وکارهای آنلاین همزمان ثبت نمایید.»
            </div>
          </div>
        </div>

        {/* فیلترها و سرچ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-4 border-t border-slate-100 dark:border-slate-800/80">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="جستجو در طبقات، کلمات کلیدی یا خدمات..."
              className="w-full pr-10 pl-4 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          <div className="flex rounded-xl bg-slate-100 dark:bg-slate-900/80 p-1 border border-slate-200 dark:border-slate-800">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                selectedCategory === 'all'
                  ? 'bg-white dark:bg-[#0B132B] text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800'
              }`}
            >
              همه طبقات
            </button>
            <button
              onClick={() => setSelectedCategory('goods')}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                selectedCategory === 'goods'
                  ? 'bg-white dark:bg-[#0B132B] text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800'
              }`}
            >
              کالاها (۱ تا ۳۴)
            </button>
            <button
              onClick={() => setSelectedCategory('services')}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                selectedCategory === 'services'
                  ? 'bg-white dark:bg-[#0B132B] text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800'
              }`}
            >
              خدمات (۳۵ تا ۴۵)
            </button>
          </div>

          <div className="flex items-center justify-between px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs">
            <span className="text-slate-500">طبقات علامت انتخابی:</span>
            <span className="font-bold text-[#D4AF37] font-mono">
              {selectedClasses.length > 0 ? selectedClasses.sort((a,b)=>a-b).join(' ، ') : 'هیچ'}
            </span>
          </div>
        </div>
      </div>

      {/* لیست کارت‌های طبقات نیس */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredClasses.map((item) => {
          const isSelected = selectedClasses.includes(item.classNumber);
          return (
            <div
              key={item.classNumber}
              onClick={() => toggleClassSelection(item.classNumber)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer relative overflow-hidden group ${
                isSelected
                  ? 'bg-[#D4AF37]/5 dark:bg-[#D4AF37]/10 border-[#D4AF37] shadow-lg shadow-[#D4AF37]/5'
                  : 'bg-white dark:bg-[#0B132B] border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <span
                  className={`w-9 h-9 rounded-xl font-black font-mono flex items-center justify-center text-sm border ${
                    isSelected
                      ? 'bg-[#D4AF37] text-slate-900 border-[#D4AF37]'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {item.classNumber}
                </span>

                <div className="flex items-center gap-1.5">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      item.riskFactor === 'پرتقاضا و پرتعارض'
                        ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20'
                        : item.riskFactor === 'نیازمند مجوز خاص'
                        ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                        : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                    }`}
                  >
                    {item.riskFactor}
                  </span>
                  {isSelected && <CheckCircle className="w-4 h-4 text-[#D4AF37]" />}
                </div>
              </div>

              <h3 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1 mb-1 font-serif">
                {item.titleFa}
              </h3>
              <p className="text-[11px] font-mono text-slate-400 dark:text-slate-500 mb-2">
                {item.titleEn}
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2 mb-3">
                {item.description}
              </p>

              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100 dark:border-slate-800/80">
                {item.popularKeywords.map((kw, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                  >
                    #{kw}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* ماژول محاسبه هزینه ثبت و صدور لایحه اعتراض به علامت مشابه */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* پنل سمت راست: شبیه‌ساز هزینه و قلمرو */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#0B132B] border border-slate-200 dark:border-slate-800 shadow-xl space-y-5">
          <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-base font-serif border-b border-slate-100 dark:border-slate-800 pb-3">
            <Globe2 className="w-5 h-5 text-[#D4AF37]" />
            محاسبه هزینه اداری ثبت علامت بر حسب قلمرو
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              نام علامت تجاری مورد نظر:
            </label>
            <input
              type="text"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              قلمرو جغرافیایی حمایت قانونی:
            </label>
            <div className="space-y-1.5">
              {[
                { id: 'iran', label: 'ایران (اداره کل مالکیت صنعتی - سازمان ثبت)', desc: 'حمایت ۱۰ ساله ملی قابل تمدید نامحدود' },
                { id: 'madrid', label: 'بین‌المللی (سازمان جهانی مالکیت فکری WIPO)', desc: 'حمایت در بیش از ۱۳۰ کشور با سیستم مادرید' },
                { id: 'gcc', label: 'حوزه منطقه‌ای کشورهای حاشیه خلیج فارس (GCC)', desc: 'ثبت مستقیم در امارات، قطر، عمان و عربستان' },
              ].map((t) => (
                <div
                  key={t.id}
                  onClick={() => setTerritory(t.id as any)}
                  className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                    territory === t.id
                      ? 'bg-[#D4AF37]/10 border-[#D4AF37] text-slate-900 dark:text-white'
                      : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/40'
                  }`}
                >
                  <div className="font-bold">{t.label}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{t.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-500">تعداد طبقات نیس برگزیده:</span>
              <span className="font-bold text-slate-900 dark:text-white font-mono">{selectedClasses.length} طبقه</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-500">برآورد کل هزینه رسمی و حق‌الثبت:</span>
              <span className="font-black text-[#D4AF37]">{calculateEstimatedFee()}</span>
            </div>
          </div>
        </div>

        {/* پنل سمت چپ: متن پیش‌نویس اعتراض به ثبت علامت تجاری مشابه */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-white dark:bg-[#0B132B] border border-slate-200 dark:border-slate-800 shadow-xl space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Scale className="w-5 h-5 text-[#D4AF37]" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white font-serif">
                  لایحه قانونی اعتراض به تقاضای ثبت علامت مشابه (ماده ۳۷ قانون مالکیت صنعتی)
                </h3>
              </div>
              <button
                onClick={handleCopyNotice}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#D4AF37] text-slate-900 text-xs font-bold hover:bg-[#b89529] transition-all shadow"
              >
                {copiedCode ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copiedCode ? 'متن لایحه کپی شد' : 'کپی لایحه اعتراض رسمی'}
              </button>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              هرگاه شخص یا شرکتی در بازه ۳۰ روزه انتشار آگهی روزنامه رسمی متوجه شباهت گمراه‌کننده علامت تجاری دیگری با برند خود شود، باید فوراً این دادخواست اعتراض را تسلیم کمیسیون ماده ۱۷۰ آیین‌نامه اجرایی نماید.
            </p>

            <pre className="p-4 rounded-2xl bg-slate-900 text-slate-100 text-xs font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap max-h-72 border border-slate-800">
              {generateFormalObjectionNotice()}
            </pre>
          </div>

          <div className="p-3.5 rounded-2xl bg-amber-500/5 border border-amber-500/20 text-xs text-amber-700 dark:text-amber-300 flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-amber-500" />
            <div>
              <span className="font-bold">هشدار موعد ۳۰ روزه:</span> اعتراض پس از انقضای مهلت ۳۰ روز از انتشار روزنامه رسمی مسموع نبوده و خواهان صرفاً باید دعوای پرهزینه «ابطال تصدیق‌نامه ثبتی» را در دادگاه‌های حقوقی تهران اقامه نماید.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
