import React, { useState } from 'react';
import {
  Code2,
  Server,
  ShieldCheck,
  Cpu,
  FileCode,
  Copy,
  Check,
  Sparkles,
  Layers,
  Lock,
  Database,
  RefreshCw,
  ExternalLink
} from 'lucide-react';
import { SOFTWARE_LICENSING_MODELS } from '../../data/mockData';
import { SoftwareLicenseModel } from '../../types/theme';

export const SoftwareLicensingEscrow: React.FC = () => {
  const [selectedModelId, setSelectedModelId] = useState<string>('saas-cloud');
  const [copiedContract, setCopiedContract] = useState(false);
  const [includeAIClause, setIncludeAIClause] = useState(true);
  const [includeDataPrivacyClause, setIncludeDataPrivacyClause] = useState(true);

  const selectedModel =
    SOFTWARE_LICENSING_MODELS.find((m) => m.id === selectedModelId) ||
    SOFTWARE_LICENSING_MODELS[0];

  const generateFullSoftwareContract = () => {
    return `قرارداد جامع بهره‌برداری و لایسنس نرم‌افزار (${selectedModel.nameEn})
تنظیم‌شده تحت نظارت سرکار خانم دکتر سیده مریم رضوی - دکتری حقوق بین‌الملل و داوری

طرفین قرارداد:
طرف اول (توسعه‌دهنده / ارائه‌دهنده لایسنس): شرکت ارائه‌دهنده فناوری
طرف دوم (کارفرما / مشترک / بهره‌بردار): شخص حقیقی یا حقوقی استفاده‌کننده از سرویس

ماده ۱: موضوع قرارداد و حیطه مجوز (Scope of License)
ارائه حق استفاده غیرانحصاری، غیرقابل انتقال و محدود به بهره‌برداری از نرم‌افزار موضوع سیستم «${selectedModel.nameFa}» در چارچوب مستندات فنی و پکیج انتخابی.

ماده ۲: ضمانت سطح خدمات (Service Level Agreement - SLA)
${selectedModel.slaUptimeGuarantee}

ماده ۳: حاکمیت داده‌ها و امنیت سایبری (Data Sovereignty & Security)
${selectedModel.dataSovereignty}

ماده ۴: ضمانت عدم نقض حقوق مالکیت فکری (IP Warranty & Indemnification)
${selectedModel.ipWarrantyAndIndemnification}

ماده ۵: حق ممیزی و بازرسی (Audit Rights)
${selectedModel.auditRights}

ماده ۶: فرآیند خاتمه و استراتژی خروج امن (Termination & Exit Strategy)
${selectedModel.terminationExitStrategy}
${
  includeAIClause
    ? `\nماده ۷: شرط ویژه پردازش هوش مصنوعی و مدل‌های زبانی (AI Ethics & Data Training Clause)
ارائه‌دهنده لایسنس صراحتاً متعهد می‌گردد که هیچ‌یک از داده‌های ورودی (Prompts) یا فایل‌های محرمانه بارگذاری‌شده توسط کارفرما را جهت آموزش، بهینه‌سازی (Fine-Tuning) یا استنتاج مدل‌های هوش مصنوعی عمومی بدون رضایت کتبی و قبلی مورد استفاده قرار ندهد.`
    : ''
}${
      includeDataPrivacyClause
        ? `\nماده ۸: تطبیق با الزامات حفاظت از داده‌های شخصی و GDPR
طرفین متعهد به رعایت کامل استانداردهای حفاظت از داده‌ها، پروتکل‌های رمزنگاری End-to-End و گزارش‌دهی هرگونه نشت احتمالی ظرف ۷۲ ساعت به کارفرما می‌باشند.`
        : ''
    }

ماده ۹: حل‌وفصل اختلافات و داوری
کلیه اختلافات ناشی از این قرارداد به مرکز داوری تخصصی حقوق فناوری با سرداوری سرکار خانم دکتر سیده مریم رضوی ارجاع و رأی صادره قطعی و لازم‌الاجرا خواهد بود.`;
  };

  const handleCopyContract = () => {
    navigator.clipboard.writeText(generateFullSoftwareContract());
    setCopiedContract(true);
    setTimeout(() => setCopiedContract(false), 2500);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300" dir="rtl">
      {/* هدر بخش لایسنس نرم‌افزار و امانت‌گذاری سورس‌کد */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#0B132B] border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-bold text-[#D4AF37] px-3 py-1 rounded-full bg-[#D4AF37]/10 inline-flex items-center gap-1.5 border border-[#D4AF37]/20">
              <Sparkles className="w-3.5 h-3.5" /> استانداردهای حقوقی فناوری اطلاعات و قراردادهای کلود و آن‌پرمایز
            </span>
            <h2 className="text-xl sm:text-2xl font-black font-serif text-slate-900 dark:text-white">
              سامانه مهندسی قراردادهای لایسنس نرم‌افزار، SaaS و امانت‌گذاری سورس‌کد (Software Escrow)
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-3xl">
              تضمین تداوم کسب‌وکار مشتری در کنار حفظ ارزش سرمایه‌گذاری مالکیت فکری توسعه‌دهندگان، تدوین شاخص‌های SLA و شرط مصونیت از دعوای نقض حق اختراع.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs">
            <span className="font-bold block">مکانیسم ایمن Software Escrow:</span>
            «امانت‌گذاری امن سورس‌کد نزد واسط حقوقی معتمد (Escrow Agent) برای آزادسازی تنها در شرایط انحلال تامین‌کننده.»
          </div>
        </div>

        {/* دکمه‌های گزینش مدل مجوزدهی */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          {SOFTWARE_LICENSING_MODELS.map((model) => (
            <button
              key={model.id}
              onClick={() => setSelectedModelId(model.id)}
              className={`p-4 rounded-2xl border text-right transition-all flex flex-col justify-between gap-2 ${
                selectedModelId === model.id
                  ? 'bg-[#D4AF37]/10 border-[#D4AF37] shadow-md'
                  : 'bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <div className="space-y-1">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 inline-block font-mono">
                  {model.category}
                </span>
                <div className="text-xs font-bold text-slate-900 dark:text-white font-serif">
                  {model.nameFa}
                </div>
              </div>
              <span className="text-[11px] font-mono text-slate-400 line-clamp-1">
                {model.nameEn}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* نمایش تحلیل مفاد ۵ گانه مدل انتخابی */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-[#0B132B] border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white">
            <Server className="w-4 h-4 text-[#D4AF37]" />
            شاخص پایداری و SLA:
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            {selectedModel.slaUptimeGuarantee}
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#0B132B] border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white">
            <Database className="w-4 h-4 text-emerald-500" />
            حاکمیت و ذخیره‌سازی داده‌ها:
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            {selectedModel.dataSovereignty}
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#0B132B] border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white">
            <ShieldCheck className="w-4 h-4 text-indigo-500" />
            تضمین اصالت و مصونیت از ادعا (IP Warranty):
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            {selectedModel.ipWarrantyAndIndemnification}
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#0B132B] border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white">
            <Cpu className="w-4 h-4 text-amber-500" />
            حق بازرسی نرم‌افزاری (Audit Rights):
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            {selectedModel.auditRights}
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#0B132B] border border-slate-200 dark:border-slate-800 shadow-sm space-y-2 md:col-span-2">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white">
            <RefreshCw className="w-4 h-4 text-rose-500" />
            استراتژی خروج، استرداد دیتا و خاتمه قرارداد (Exit Strategy):
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            {selectedModel.terminationExitStrategy}
          </p>
        </div>
      </div>

      {/* تولیدکننده قرارداد کامل نرم‌افزاری با آپشن‌های تکمیلی */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#0B132B] border border-slate-200 dark:border-slate-800 shadow-xl space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-base font-serif">
              <FileCode className="w-5 h-5 text-[#D4AF37]" />
              پیش‌نویس قرارداد آماده امضای لایسنس نرم‌افزار
            </div>
            <p className="text-xs text-slate-500">
              شامل شروط تکمیلی هوش مصنوعی اخلاقی و الزامات حفظ حریم خصوصی
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <label className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={includeAIClause}
                onChange={(e) => setIncludeAIClause(e.target.checked)}
                className="rounded accent-[#D4AF37]"
              />
              بند منع آموزش مدل‌های هوش مصنوعی با داده‌های کاربر
            </label>

            <label className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={includeDataPrivacyClause}
                onChange={(e) => setIncludeDataPrivacyClause(e.target.checked)}
                className="rounded accent-[#D4AF37]"
              />
              بند انطباق با حریم خصوصی GDPR
            </label>

            <button
              onClick={handleCopyContract}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#D4AF37] text-slate-900 text-xs font-bold hover:bg-[#b89529] transition-all shadow"
            >
              {copiedContract ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copiedContract ? 'قرارداد کپی شد' : 'کپی متن کامل قرارداد'}
            </button>
          </div>
        </div>

        <pre className="p-5 rounded-2xl bg-slate-900 text-slate-100 text-xs font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap max-h-96 border border-slate-800">
          {generateFullSoftwareContract()}
        </pre>
      </div>
    </div>
  );
};
