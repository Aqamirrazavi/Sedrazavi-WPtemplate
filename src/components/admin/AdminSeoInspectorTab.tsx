import React, { useState } from 'react';
import { LawyerSiteProfile } from '../../utils/lawyerCustomizationStorage';
import {
  getDynamicPageTitle,
  getDynamicMetaDescription,
  generateDynamicJsonLd,
  runSeoHealthAudit,
  generateWordPressSeoCompatibilityCode
} from '../../utils/dynamicSeoGenerator';
import {
  Search,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Copy,
  Check,
  Globe,
  ExternalLink,
  Code2,
  Monitor,
  Smartphone,
  ShieldCheck,
  Layers,
  MapPin,
  RefreshCw,
  Eye,
  Activity,
  Award
} from 'lucide-react';

interface AdminSeoInspectorTabProps {
  profile?: LawyerSiteProfile;
  onUpdateProfile?: (updated: LawyerSiteProfile) => void;
}

export const AdminSeoInspectorTab: React.FC<AdminSeoInspectorTabProps> = ({
  profile,
  onUpdateProfile,
}) => {
  const [devicePreview, setDevicePreview] = useState<'desktop' | 'mobile'>('desktop');
  const [activeSubView, setActiveSubView] = useState<'serp' | 'schema' | 'health' | 'wordpress_code'>('serp');
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedSchema, setCopiedSchema] = useState(false);

  const dynamicTitle = getDynamicPageTitle(profile);
  const dynamicDesc = getDynamicMetaDescription(profile);
  const jsonLd = generateDynamicJsonLd(profile, 'https://sedrazavi.law');
  const auditReport = runSeoHealthAudit(profile);
  const phpCode = generateWordPressSeoCompatibilityCode(profile);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(phpCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  const handleCopySchema = () => {
    navigator.clipboard.writeText(JSON.stringify(jsonLd, null, 2));
    setCopiedSchema(true);
    setTimeout(() => setCopiedSchema(false), 2500);
  };

  return (
    <div className="space-y-6 font-persian">
      {/* Top Banner */}
      <div className="p-5 rounded-3xl bg-gradient-to-r from-emerald-500/10 via-[#D4AF37]/15 to-transparent border border-[#D4AF37]/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="p-2.5 rounded-2xl bg-[#D4AF37] text-[#0B132B]">
            <Search className="w-5 h-5" />
          </span>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-[#0B132B] dark:text-white flex items-center gap-2">
              <span>مرکز کنترل سئو و داده‌های ساختاریافته (SEO & Schema Engine)</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold">
                نمره سئو: {auditReport.score}٪
              </span>
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
              تنظیمات متاتگ‌های پویا، ریچ‌اسنیپت‌های Schema.org منطبق با سناریوی فعال، سازگار با رنک‌مث و یوست سئو.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <a
            href="https://search.google.com/test/rich-results"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-xl bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 text-xs font-bold border border-gray-200 dark:border-gray-700 hover:border-[#D4AF37] flex items-center gap-1.5 shadow-sm"
          >
            <ExternalLink className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>تست ریچ‌اسنیپت گوگل</span>
          </a>
        </div>
      </div>

      {/* Navigation Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none border-b border-gray-200 dark:border-gray-800">
        <button
          onClick={() => setActiveSubView('serp')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeSubView === 'serp'
              ? 'bg-[#0B132B] dark:bg-[#D4AF37] text-white dark:text-[#0B132B] shadow-sm'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          <Globe className="w-3.5 h-3.5" />
          <span>۱. پیش‌نمایش سرچ گوگل (SERP Snippet)</span>
        </button>

        <button
          onClick={() => setActiveSubView('schema')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeSubView === 'schema'
              ? 'bg-[#0B132B] dark:bg-[#D4AF37] text-white dark:text-[#0B132B] shadow-sm'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          <Code2 className="w-3.5 h-3.5" />
          <span>۲. کدهای ساختاریافته Schema.org JSON-LD</span>
        </button>

        <button
          onClick={() => setActiveSubView('health')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeSubView === 'health'
              ? 'bg-[#0B132B] dark:bg-[#D4AF37] text-white dark:text-[#0B132B] shadow-sm'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          <Activity className="w-3.5 h-3.5" />
          <span>۳. چک‌لیست ممیزی سلامت سئو</span>
        </button>

        <button
          onClick={() => setActiveSubView('wordpress_code')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeSubView === 'wordpress_code'
              ? 'bg-[#0B132B] dark:bg-[#D4AF37] text-white dark:text-[#0B132B] shadow-sm'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>۴. سازگاری رنک‌مث و یوست سئو</span>
        </button>
      </div>

      {/* SUBVIEW 1: Google SERP Snippet Preview */}
      {activeSubView === 'serp' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
              نحوه نمایش زنده سایت در نتایج موتور جستجوی گوگل (Google SERP):
            </span>
            <div className="flex items-center gap-1 p-1 bg-gray-100 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
              <button
                type="button"
                onClick={() => setDevicePreview('desktop')}
                className={`p-1.5 rounded-lg text-xs font-bold ${
                  devicePreview === 'desktop' ? 'bg-[#D4AF37] text-[#0B132B]' : 'text-gray-500'
                }`}
                title="نمایش دسکتاپ"
              >
                <Monitor className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setDevicePreview('mobile')}
                className={`p-1.5 rounded-lg text-xs font-bold ${
                  devicePreview === 'mobile' ? 'bg-[#D4AF37] text-[#0B132B]' : 'text-gray-500'
                }`}
                title="نمایش موبایل"
              >
                <Smartphone className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Google SERP Card Preview */}
          <div className={`p-5 rounded-2xl bg-white dark:bg-[#1a233a] border border-gray-200 dark:border-gray-700 shadow-sm transition-all text-right ${
            devicePreview === 'mobile' ? 'max-w-md mx-auto ring-2 ring-gray-300 dark:ring-gray-700' : 'w-full'
          }`}>
            {/* Google URL Line */}
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-1.5">
              <span className="w-5 h-5 rounded-full bg-[#D4AF37] text-[#0B132B] flex items-center justify-center font-bold text-[10px]">
                SR
              </span>
              <div className="flex items-center gap-1 text-[11px] font-mono dir-ltr text-left">
                <span>sedrazavi.law</span>
                <span className="text-gray-400">›</span>
                <span className="text-gray-400">law-office</span>
              </div>
            </div>

            {/* Google Title */}
            <div className="text-base sm:text-lg font-medium text-[#1a0dab] dark:text-[#8ab4f8] hover:underline cursor-pointer leading-snug">
              {dynamicTitle}
            </div>

            {/* Google Snippet Description */}
            <p className="text-xs sm:text-sm text-[#4d5156] dark:text-[#bdc1c6] mt-1.5 leading-relaxed">
              {dynamicDesc}
            </p>

            {/* Google Rich Snippet Sitelinks / Breadcrumb */}
            <div className="pt-3 mt-3 border-t border-gray-100 dark:border-gray-800 grid grid-cols-2 gap-2 text-[11px]">
              <div className="text-[#1a0dab] dark:text-[#8ab4f8] hover:underline cursor-pointer">
                رزرو نوبت مشاوره حقوقی »
              </div>
              <div className="text-[#1a0dab] dark:text-[#8ab4f8] hover:underline cursor-pointer">
                استعلام و پیگیری پرونده »
              </div>
              <div className="text-[#1a0dab] dark:text-[#8ab4f8] hover:underline cursor-pointer">
                دعاوی ملکی و ثبتی »
              </div>
              <div className="text-[#1a0dab] dark:text-[#8ab4f8] hover:underline cursor-pointer">
                داوری تجاری و قراردادها »
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUBVIEW 2: Schema.org JSON-LD */}
      {activeSubView === 'schema' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
              داده‌های ساختاریافته چندگانه (LegalService + Attorneys + FAQPage + Breadcrumbs):
            </span>
            <button
              onClick={handleCopySchema}
              className="px-3 py-1.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-xs font-bold text-gray-700 dark:text-gray-200 hover:text-[#D4AF37] flex items-center gap-1.5 border border-gray-200 dark:border-gray-700"
            >
              {copiedSchema ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-emerald-500">کپی شد!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>کپی JSON-LD</span>
                </>
              )}
            </button>
          </div>

          <pre className="p-4 rounded-2xl bg-gray-900 text-gray-200 font-mono text-[11px] overflow-x-auto leading-relaxed border border-gray-800 dir-ltr text-left max-h-96">
            <code>{JSON.stringify(jsonLd, null, 2)}</code>
          </pre>
        </div>
      )}

      {/* SUBVIEW 3: Health Checklist */}
      {activeSubView === 'health' && (
        <div className="space-y-3">
          {auditReport.checks.map((chk) => (
            <div
              key={chk.id}
              className="p-4 rounded-2xl bg-white dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 flex items-start gap-3"
            >
              {chk.status === 'pass' && <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />}
              {chk.status === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />}
              {chk.status === 'fail' && <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />}

              <div className="space-y-1">
                <div className="text-xs font-bold text-gray-800 dark:text-white">
                  {chk.title}
                </div>
                <div className="text-[11px] text-gray-500 dark:text-gray-400">
                  {chk.description}
                </div>
                {chk.recommendation && (
                  <div className="text-[10px] text-amber-700 dark:text-amber-300 font-bold">
                    پیشنهاد اصلاح: {chk.recommendation}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SUBVIEW 4: WordPress Code */}
      {activeSubView === 'wordpress_code' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
              کد هماهنگ‌سازی با افزونه‌های Rank Math SEO و Yoast SEO (بدون تداخل متاتگ‌ها):
            </span>
            <button
              onClick={handleCopyCode}
              className="px-3 py-1.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-xs font-bold text-gray-700 dark:text-gray-200 hover:text-[#D4AF37] flex items-center gap-1.5 border border-gray-200 dark:border-gray-700"
            >
              {copiedCode ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-emerald-500">کپی شد!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>کپی کد PHP</span>
                </>
              )}
            </button>
          </div>

          <pre className="p-4 rounded-2xl bg-gray-900 text-gray-200 font-mono text-[11px] overflow-x-auto leading-relaxed border border-gray-800 dir-ltr text-left max-h-96">
            <code>{phpCode}</code>
          </pre>
        </div>
      )}
    </div>
  );
};
