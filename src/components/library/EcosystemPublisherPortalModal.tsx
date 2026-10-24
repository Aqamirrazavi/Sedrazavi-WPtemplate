import React, { useState } from 'react';
import {
  Globe2,
  Shield,
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Play,
  RotateCcw,
  Key,
  Layers,
  FileCode,
  Package,
  Sparkles,
  ExternalLink,
  X,
  Lock,
  Search,
  Check,
  Clock,
  Radio,
  FileCheck
} from 'lucide-react';

interface EcosystemPublisherPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface PublisherTier {
  id: string;
  name: string;
  handle: string;
  trust_level: 'first_party_signed' | 'reviewed_partner' | 'community_unreviewed' | 'blocked_revoked';
  trust_label: string;
  verified_key: string;
  packages_count: number;
  status: 'active' | 'under_review' | 'revoked';
}

interface RevocationRecord {
  package_id: string;
  revoked_at: string;
  reason: string;
  severity: 'CRITICAL' | 'HIGH';
  action_taken: string;
}

export const EcosystemPublisherPortalModal: React.FC<EcosystemPublisherPortalModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'publishers' | 'pipeline_simulator' | 'revocation_feed' | 'entitlements'>('publishers');

  // Pipeline Simulator state
  const [packageName, setPackageName] = useState('sedrazavi.partner.legal-ai-companion');
  const [packageVersion, setPackageVersion] = useState('1.2.0');
  const [simulateMaliciousSecret, setSimulateMaliciousSecret] = useState(false);
  const [isRunningReview, setIsRunningReview] = useState(false);
  const [reviewResult, setReviewResult] = useState<{
    status: 'approved' | 'rejected' | null;
    message: string;
    checks: Array<{ name: string; status: 'pass' | 'fail'; detail: string }>;
    immutableHash?: string;
  } | null>(null);

  // Publishers data
  const publishers: PublisherTier[] = [
    {
      id: 'pub_sedrazavi_official',
      name: 'مهندس سید امیر حسین رضوی فردویی (SedRazavi)',
      handle: '@sedrazavi',
      trust_level: 'first_party_signed',
      trust_label: 'ناشر رسمی دارای امضای دیجیتال معتبر',
      verified_key: 'F67B 90A2 E834 1C5D B399 43E1 8DA2 7430 52C9 ED1F',
      packages_count: 6,
      status: 'active',
    },
    {
      id: 'pub_iran_legal_institute',
      name: 'موسسه حقوقی دانش و عدالت آریا (همکار بازبینی‌شده)',
      handle: '@danesh_edalat',
      trust_level: 'reviewed_partner',
      trust_label: 'ناشر همکار دارای گواهی بازبینی امنیتی',
      verified_key: '9A82 BC34 41EF 1029 3847 5620 1948 5720 1938 4756',
      packages_count: 3,
      status: 'active',
    },
    {
      id: 'pub_community_developer_99',
      name: 'توسعه‌دهنده مستقل کامیونیتی وردپرس',
      handle: '@wp_comm_builder',
      trust_level: 'community_unreviewed',
      trust_label: 'بسته کامیونیتی (فاقد ممیزی امنیتی مستقل)',
      verified_key: 'UNVERIFIED_COMMUNITY_KEY',
      packages_count: 1,
      status: 'under_review',
    },
    {
      id: 'pub_malicious_adversary',
      name: 'گروه نامعتبر ناقض حریم خصوصی',
      handle: '@untrusted_actor',
      trust_level: 'blocked_revoked',
      trust_label: 'ناشر مسدود و ابطال‌شده (Revoked Key)',
      verified_key: 'REVOKED_EXPIRED_2026',
      packages_count: 0,
      status: 'revoked',
    },
  ];

  // Revocation list (CRL)
  const revocations: RevocationRecord[] = [
    {
      package_id: 'sedrazavi.legacy.compromised-v1',
      revoked_at: '۱۴۰۴/۱۰/۲۰ ساعت ۱۴:۲۰',
      reason: 'نشت کلید آزمایشی توسعه در مخزن عمومی و ابطال اجباری',
      severity: 'CRITICAL',
      action_taken: 'مسدودسازی دائمی در تمامی سایت‌های متصل و ممانعت از نصب',
    },
    {
      package_id: 'sedrazavi.thirdparty.incompatible-addon',
      revoked_at: '۱۴۰۴/۱۱/۱۲ ساعت ۰۹:۱۵',
      reason: 'تداخل با نگارش هسته وردپرس ۶.۵ و ایجاد خطای حافظه در ادیتور',
      severity: 'HIGH',
      action_taken: 'توقف به‌روزرسانی خودکار و پیشنهاد جایگزینی با نگارش رسمی',
    },
  ];

  // Run 10-step validation review simulation
  const handleRunReview = () => {
    setIsRunningReview(true);
    setReviewResult(null);

    setTimeout(() => {
      setIsRunningReview(false);
      const mockHash = '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08';

      if (simulateMaliciousSecret) {
        setReviewResult({
          status: 'rejected',
          message: 'خطای مسدودکننده در مرحله ۴: کلید محرمانه (API Secret) در فایل‌های پکیج کشف شد!',
          checks: [
            { name: '۱. ارزیابی انطباق ساختار Manifest با Schema v1.0', status: 'pass', detail: 'کلیه فیلدهای الزامی معتبرند.' },
            { name: '۲. اعتبارسنجی لایسنس و اصالت کد', status: 'pass', detail: 'سازگار با GPL-3.0.' },
            { name: '۳. اسکن زنجیره وابستگی‌ها', status: 'pass', detail: 'زنجیره وابستگی سالم و بدون حلقه.' },
            { name: '۴. پویشگر افشای کلیدهای محرمانه (Secret Scanner)', status: 'fail', detail: 'افشای کلید احراز هویت در سورس‌کد!' },
            { name: '۵. بازرسی سد نفوذ Zip-Slip و Path Traversal', status: 'pass', detail: 'مسیرها ایمن هستند.' },
          ],
        });
      } else {
        setReviewResult({
          status: 'approved',
          message: 'بسته با موفقیت از هر ۱۰ گیت تضمین کیفیت عبور کرده و تایید انتشار دریافت کرد.',
          immutableHash: mockHash,
          checks: [
            { name: '۱. ارزیابی انطباق ساختار Manifest با Schema v1.0', status: 'pass', detail: 'کلیه فیلدهای الزامی منطبق هستند.' },
            { name: '۲. اعتبارسنجی لایسنس و اصالت کد (License & Attribution)', status: 'pass', detail: 'سازگار با GPL-3.0-or-later.' },
            { name: '۳. اسکن زنجیره وابستگی‌ها (Dependency & Conflict Guard)', status: 'pass', detail: 'عدم وجود وابستگی چرخه‌ای.' },
            { name: '۴. پویشگر افشای کلیدهای محرمانه (Secret Leakage Scanner)', status: 'pass', detail: 'بسته کاملاً پاک و فاقد کلید محرمانه است.' },
            { name: '۵. بازرسی سد نفوذ Zip-Slip و ساختار آرشیو', status: 'pass', detail: 'عدم وجود مسیرهای خطرناک ../ یا پیوند نمادین.' },
            { name: '۶. نصب آزمایشی در محیط ایزوله (Sandbox Clean Install)', status: 'pass', detail: 'نصب تمیز در وردپرس ۶.۵ و PHP 8.2 تایید شد.' },
            { name: '۷. ارزیابی انطباق راست‌چین (RTL) و دسترس‌پذیری WCAG 2.2', status: 'pass', detail: 'رندر دوجهته و کنتراست رنگ استاندارد است.' },
            { name: '۸. محاسبه هش SHA-256 و امضای دیجیتال تغییرناپذیر', status: 'pass', detail: `هش تولیدی: ${mockHash.substring(0, 24)}...` },
            { name: '۹. آزمون بازگشت اتمیک به نقطه امن (Compensating Rollback)', status: 'pass', detail: 'قابلیت بازگشت داده‌ها تایید شد.' },
            { name: '۱۰. اتصال به فید آنلاین لغو و ابطال (CRL Binding)', status: 'pass', detail: 'بسته به کانال استعلام وضعیت کلیدها متصل شد.' },
          ],
        });
      }
    }, 900);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[130] flex items-center justify-center bg-black/85 backdrop-blur-md p-3 md:p-6 overflow-y-auto"
      dir="rtl"
    >
      <div className="relative w-full max-w-5xl bg-[#090d21]/95 border border-violet-500/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-violet-500/20 bg-gradient-to-r from-violet-950/70 via-[#0b132b] to-slate-900/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-violet-500/20 border border-violet-500/40 flex items-center justify-center text-violet-400">
              <Globe2 className="w-5 h-5 text-violet-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black text-white">درگاه ناشران، بررسی شرکا و اکوسیستم مقیاس‌پذیر</h2>
                <span className="px-2 py-0.5 text-[11px] font-bold rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/30">
                  فاز ۶ مستر پلن (P6 Ecosystem & Scale)
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-2">
                <span>تضمین امنیت زنجیره تأمین، ارزیابی ۱۰ مرحله‌ای بسته‌ها و ممیزی امضاهای دیجیتال</span>
                <span className="text-violet-400">•</span>
                <span className="font-mono text-slate-300">@sedrazavi</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            title="بستن"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 px-6 py-2.5 bg-black/40 border-b border-violet-500/20 overflow-x-auto text-xs font-bold">
          <button
            onClick={() => setActiveTab('publishers')}
            className={`px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
              activeTab === 'publishers'
                ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>سطوح اعتماد و ناشران تاییدشده (Trust Tiers)</span>
          </button>

          <button
            onClick={() => setActiveTab('pipeline_simulator')}
            className={`px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
              activeTab === 'pipeline_simulator'
                ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>خط لوله ۱۰ مرحله‌ای بررسی بسته‌ها (Review Pipeline)</span>
          </button>

          <button
            onClick={() => setActiveTab('revocation_feed')}
            className={`px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
              activeTab === 'revocation_feed'
                ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30'
                : 'text-slate-400 hover:text-rose-300 hover:bg-rose-500/10'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
            <span>فید ابطال بسته‌ها و کلیدها (CRL Feed)</span>
          </button>

          <button
            onClick={() => setActiveTab('entitlements')}
            className={`px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
              activeTab === 'entitlements'
                ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>حق استفاده و عدم قفل به سرویس (Zero Vendor Lock-in)</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6">
          {/* TAB 1: PUBLISHERS & TRUST TIERS */}
          {activeTab === 'publishers' && (
            <div className="space-y-5">
              <div className="p-4 rounded-xl bg-violet-950/20 border border-violet-500/30 text-xs text-slate-300 leading-relaxed">
                <strong className="text-violet-300 ml-1">بند ۶.۷ مستر پلن معماری v25.0:</strong>
                سطح اعتماد نباید صرفاً یک برچسب بصری باشد؛ سیاست نصب و دسترسی‌های ماژول‌ها دقیقاً به سطح اعتبار کلید دیجیتال ناشر متصل است.
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {publishers.map((pub) => (
                  <div
                    key={pub.id}
                    className={`p-4 rounded-xl border transition-all ${
                      pub.trust_level === 'first_party_signed'
                        ? 'bg-violet-950/30 border-violet-500/50 shadow-md shadow-violet-950/40'
                        : pub.trust_level === 'reviewed_partner'
                        ? 'bg-sky-950/20 border-sky-500/40'
                        : pub.trust_level === 'blocked_revoked'
                        ? 'bg-rose-950/25 border-rose-500/50'
                        : 'bg-black/30 border-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-xs text-slate-400">{pub.handle}</span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                          pub.trust_level === 'first_party_signed'
                            ? 'bg-violet-500/20 text-violet-300 border-violet-500/30'
                            : pub.trust_level === 'reviewed_partner'
                            ? 'bg-sky-500/20 text-sky-300 border-sky-500/30'
                            : pub.trust_level === 'blocked_revoked'
                            ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                            : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                        }`}
                      >
                        {pub.trust_label}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-white mb-2">{pub.name}</h4>

                    <div className="space-y-1.5 text-xs text-slate-400 border-t border-slate-800/80 pt-2.5 mt-2">
                      <div className="flex items-center justify-between">
                        <span>تعداد بسته‌های رسمی منتشرشده:</span>
                        <span className="font-mono text-white font-bold">{pub.packages_count}</span>
                      </div>
                      <div className="text-[11px] font-mono text-slate-400 truncate">
                        کلید: <span className="text-slate-300">{pub.verified_key}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: 10-STEP PIPELINE SIMULATOR */}
          {activeTab === 'pipeline_simulator' && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-black/40 border border-slate-800 space-y-3">
                <div className="text-xs font-bold text-slate-200">
                  شبیه‌ساز خط لوله ۱۰ مرحله‌ای بررسی و تایید بسته (Section 6.8):
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">شناسه بسته (Package ID):</label>
                    <input
                      type="text"
                      value={packageName}
                      onChange={(e) => setPackageName(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs font-mono text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">نگارش معنادار (SemVer):</label>
                    <input
                      type="text"
                      value={packageVersion}
                      onChange={(e) => setPackageVersion(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs font-mono text-white"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
                    <input
                      type="checkbox"
                      checked={simulateMaliciousSecret}
                      onChange={(e) => setSimulateMaliciousSecret(e.target.checked)}
                      className="rounded accent-rose-500"
                    />
                    <span className="text-rose-300">
                      تست منفی: شبیه‌سازی وجود کلید محرمانه لو رفته در بسته (Simulate Secret Leak)
                    </span>
                  </label>

                  <button
                    onClick={handleRunReview}
                    disabled={isRunningReview}
                    className="px-5 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white font-black text-xs flex items-center gap-1.5 transition-all shadow-md shadow-violet-600/30"
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>{isRunningReview ? 'در حال اجرای ممیزی ۱۰ مرحله‌ای...' : 'اجرای خط لوله ممیزی'}</span>
                  </button>
                </div>
              </div>

              {/* Review Output */}
              {reviewResult && (
                <div className="space-y-3">
                  <div
                    className={`p-4 rounded-xl border flex items-center justify-between ${
                      reviewResult.status === 'approved'
                        ? 'bg-emerald-950/30 border-emerald-500/50 text-emerald-200'
                        : 'bg-rose-950/40 border-rose-500/60 text-rose-200'
                    }`}
                  >
                    <div className="flex items-center gap-2 text-xs font-bold">
                      {reviewResult.status === 'approved' ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      ) : (
                        <XCircle className="w-5 h-5 text-rose-400" />
                      )}
                      <span>{reviewResult.message}</span>
                    </div>

                    {reviewResult.immutableHash && (
                      <span className="font-mono text-[10px] bg-black/40 px-2.5 py-1 rounded border border-emerald-500/30">
                        SHA-256: {reviewResult.immutableHash.substring(0, 16)}...
                      </span>
                    )}
                  </div>

                  <div className="space-y-2">
                    {reviewResult.checks.map((chk, idx) => (
                      <div
                        key={idx}
                        className={`p-3 rounded-lg border text-xs flex items-center justify-between ${
                          chk.status === 'pass'
                            ? 'bg-black/30 border-slate-800 text-slate-300'
                            : 'bg-rose-950/20 border-rose-500/40 text-rose-300'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {chk.status === 'pass' ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          ) : (
                            <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                          )}
                          <span className="font-bold text-white">{chk.name}</span>
                        </div>
                        <span className="text-[11px] text-slate-400">{chk.detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: REVOCATION FEED (CRL) */}
          {activeTab === 'revocation_feed' && (
            <div className="space-y-5">
              <div className="p-4 rounded-xl bg-rose-950/25 border border-rose-500/30 space-y-1.5 text-xs text-rose-200">
                <div className="flex items-center gap-2 font-bold text-rose-300">
                  <ShieldAlert className="w-4 h-4" />
                  <span>فید لحظه‌ای ابطال کلیدها و بسته‌های آسیب‌پذیر (Threat Mitigation R25-13)</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  طبق سناریوی R25-13 سند معماری، انتشار بسته با هش پایدار به تنهایی مانع سوءاستفاده‌های احتمالی پس از انتشار نیست. این فید به صورت برخط کلیه نسخه‌های مسدودشده را به اطلاع سایت‌ها رسانده و از نصب یا به‌روزرسانی آنها جلوگیری می‌نماید.
                </p>
              </div>

              <div className="space-y-3">
                {revocations.map((rec, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-black/40 border border-slate-800 space-y-2 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-rose-400">{rec.package_id}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                        {rec.severity} REVOKED
                      </span>
                    </div>

                    <p className="text-slate-300">{rec.reason}</p>

                    <div className="flex items-center justify-between text-slate-400 text-[11px] border-t border-slate-800/80 pt-2">
                      <span>اقدام اتخاذشده: {rec.action_taken}</span>
                      <span className="font-mono text-slate-500">{rec.revoked_at}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: ENTITLEMENTS & SOVEREIGN ACCESS */}
          {activeTab === 'entitlements' && (
            <div className="space-y-5">
              <div className="p-5 rounded-2xl bg-gradient-to-r from-violet-950/40 via-black to-slate-900 border border-violet-500/30 space-y-3">
                <div className="flex items-center gap-2 text-violet-300 font-bold text-sm">
                  <ShieldCheck className="w-5 h-5 text-violet-400" />
                  <span>تضمین حاکمیتی عدم قفل‌شدگی به سرویس (Zero Vendor Lock-in Guarantee)</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  بر اساس بند ۰.۲ و فصل ۱۲ مستر پلن v25.0، عملکرد ران‌تایم وردپرس و محتوای منتشرشده سایت مشتری هرگز نباید به فعال بودن اشتراک ابری یا دسترسی به سرورهای SedRazavi وابسته باشد. انقضای لایسنس تنها دسترسی به دانلود نسخه‌های جدید کاتالوگ را متوقف می‌کند و سایت و محتوای مشتری همواره ۱۰۰٪ فعال باقی می‌ماند.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
                  <div className="p-3 rounded-xl bg-black/40 border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">مهلت تداوم آفلاین:</span>
                    <span className="text-emerald-400 font-mono font-bold">۹۰ روز کامل (Offline Grace)</span>
                  </div>

                  <div className="p-3 rounded-xl bg-black/40 border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">قابلیت خروجی کامل سورس:</span>
                    <span className="text-white font-mono font-bold">۱۰۰٪ مجاز (Full Source Export)</span>
                  </div>

                  <div className="p-3 rounded-xl bg-black/40 border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">مالکیت داده و دیتابیس:</span>
                    <span className="text-amber-400 font-mono font-bold">انحصاری در هاست مشتری</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-violet-500/20 bg-black/50 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Globe2 className="w-3.5 h-3.5 text-violet-400" />
            <span>اکوسیستم ناشران SedRazavi OS — دارای گواهی تطبیق با بندهای ۶.۷ و ۶.۸ مستر پلن v25.0</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold transition-all"
          >
            بستن
          </button>
        </div>
      </div>
    </div>
  );
};
