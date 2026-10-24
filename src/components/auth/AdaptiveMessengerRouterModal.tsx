import React, { useState, useEffect } from 'react';
import {
  MessageSquare,
  Shield,
  ShieldAlert,
  ShieldCheck,
  QrCode,
  Smartphone,
  Monitor,
  Copy,
  Check,
  ExternalLink,
  X,
  Lock,
  Key,
  Flame,
  AlertTriangle,
  UserCheck,
  CheckCircle2,
} from 'lucide-react';

interface AdaptiveMessengerRouterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdaptiveMessengerRouterModal: React.FC<AdaptiveMessengerRouterModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'messengers' | 'verification_check' | 'pgp_certificate'>('messengers');
  const [copiedEitaa, setCopiedEitaa] = useState(false);
  const [copiedTelegram, setCopiedTelegram] = useState(false);
  const [copiedPgp, setCopiedPgp] = useState(false);

  // Device detection
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  // Verification Input
  const [queryInput, setQueryInput] = useState('@sedrazavi');
  const [verificationResult, setVerificationResult] = useState<{
    tested: boolean;
    isOfficial: boolean;
    name: string;
    details: string;
  } | null>(null);

  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase();
    const isMobile = /mobile|iphone|ipod|android|blackberry|opera mini|iemobile|wpdesktop/.test(ua);
    setIsMobileDevice(isMobile);
  }, []);

  const handleCopy = (text: string, type: 'eitaa' | 'telegram' | 'pgp') => {
    navigator.clipboard.writeText(text);
    if (type === 'eitaa') {
      setCopiedEitaa(true);
      setTimeout(() => setCopiedEitaa(false), 2000);
    } else if (type === 'telegram') {
      setCopiedTelegram(true);
      setTimeout(() => setCopiedTelegram(false), 2000);
    } else if (type === 'pgp') {
      setCopiedPgp(true);
      setTimeout(() => setCopiedPgp(false), 2000);
    }
  };

  const handleLaunchMessenger = (protocolUri: string, webFallback: string) => {
    if (isMobileDevice) {
      // Try to open deep link protocol
      window.location.href = protocolUri;
      // Fallback timer if protocol handler is not registered
      setTimeout(() => {
        window.open(webFallback, '_blank');
      }, 1200);
    } else {
      window.open(webFallback, '_blank');
    }
  };

  const handleVerifyIdentity = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = queryInput.trim().toLowerCase().replace('@', '');
    if (clean === 'sedrazavi' || clean === '09123456789' || clean === 'sar42ei@gmail.com') {
      setVerificationResult({
        tested: true,
        isOfficial: true,
        name: 'سید امیر حسین رضوی فردویی (SedRazavi)',
        details: 'حساب رسمی و احراز هویت شده معمار ارشد سامانه. کلیه مکاتبات و قراردادها از این طریق مورد تأیید ۱۰۰٪ است.',
      });
    } else {
      setVerificationResult({
        tested: true,
        isOfficial: false,
        name: 'حساب نامعتبر یا ثبت‌نشده',
        details: 'هشدار امنیتی: این شناسه جزو اکانت‌های تاییدشده رسمی SedRazavi نیست. مراقب سوءاستفاده‌های افراد سودجو و حساب‌های جعلی باشید.',
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[130] flex items-center justify-center bg-black/85 backdrop-blur-md p-3 md:p-6 overflow-y-auto"
      dir="rtl"
    >
      <div className="relative w-full max-w-4xl bg-[#090e24]/95 border border-sky-500/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-sky-500/20 bg-gradient-to-r from-sky-950/70 via-[#0b132b] to-slate-900/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/20 border border-sky-500/40 flex items-center justify-center text-sky-400">
              <MessageSquare className="w-5 h-5 text-sky-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black text-white">هدایت‌گر تطبیقی پیام‌رسان‌ها و اصالت‌سنجی</h2>
                <span className="px-2 py-0.5 text-[11px] font-bold rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30">
                  Adaptive Intent Router
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-2">
                <span>پیوند مستقیم به حساب رسمی مهندس سید امیر حسین رضوی فردویی</span>
                <span className="text-sky-400">•</span>
                <span className="font-mono text-emerald-400">@sedrazavi</span>
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
        <div className="flex items-center gap-1 px-6 py-2.5 bg-black/40 border-b border-sky-500/20 overflow-x-auto text-xs font-bold">
          <button
            onClick={() => setActiveTab('messengers')}
            className={`px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
              activeTab === 'messengers'
                ? 'bg-sky-600 text-white shadow-lg shadow-sky-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>پیام‌رسان‌های رسمی (ایتا و تلگرام)</span>
          </button>

          <button
            onClick={() => setActiveTab('verification_check')}
            className={`px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
              activeTab === 'verification_check'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                : 'text-slate-400 hover:text-emerald-300 hover:bg-emerald-500/10'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>استعلام اصالت هویت و ضدجعل (/verify/)</span>
          </button>

          <button
            onClick={() => setActiveTab('pgp_certificate')}
            className={`px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
              activeTab === 'pgp_certificate'
                ? 'bg-sky-600 text-white shadow-lg shadow-sky-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            <Key className="w-3.5 h-3.5" />
            <span>کلید عمومی و امضای دیجیتال PGP</span>
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6">
          {/* TAB 1: MESSENGERS */}
          {activeTab === 'messengers' && (
            <div className="space-y-6">
              {/* Device Hint Banner */}
              <div className="p-3.5 rounded-xl bg-black/40 border border-sky-500/30 text-xs text-slate-300 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {isMobileDevice ? (
                    <Smartphone className="w-4 h-4 text-sky-400" />
                  ) : (
                    <Monitor className="w-4 h-4 text-sky-400" />
                  )}
                  <span>
                    دستگاه شما:{' '}
                    <strong className="text-white">
                      {isMobileDevice ? 'گوشی موبایل (Mobile App Intent)' : 'رایانه رومیزی / لپ‌تاپ (Desktop Web / QR Code)'}
                    </strong>
                  </span>
                </div>
                <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/30">
                  {isMobileDevice ? 'پروتکل اپلیکیشن فعال است' : 'کد QR آماده اسکن است'}
                </span>
              </div>

              {/* Messenger Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Eitaa Card */}
                <div className="p-5 rounded-2xl bg-gradient-to-b from-orange-950/25 to-black/40 border border-orange-500/40 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-orange-500/20 text-orange-400 border border-orange-500/40 flex items-center justify-center font-black text-xl">
                        E
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-base">پیام‌رسان رسمی ایتا (Eitaa)</h3>
                        <div className="text-xs text-emerald-400 font-bold flex items-center gap-1 mt-0.5">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>پاسخگویی سریع پروژه‌های داخلی</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    مناسب برای گفت‌وگوی آنی، استعلام هزینه و مشاوره تخصصی معماری سایت در شبکه ملی بدون نیاز به فیلترشکن.
                  </p>

                  <div className="p-3 rounded-xl bg-black/50 border border-slate-800 flex items-center justify-between font-mono text-xs">
                    <span className="text-slate-200">@sedrazavi</span>
                    <button
                      onClick={() => handleCopy('@sedrazavi', 'eitaa')}
                      className="text-orange-400 hover:text-white flex items-center gap-1 text-[11px] transition-colors"
                    >
                      {copiedEitaa ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedEitaa ? 'کپی شد' : 'کپی آیدی'}</span>
                    </button>
                  </div>

                  {/* QR Code / Deep Link Actions */}
                  <div className="space-y-2 pt-1">
                    <button
                      onClick={() => handleLaunchMessenger('eitaa://sedrazavi', 'https://eitaa.com/sedrazavi')}
                      className="w-full py-2.5 px-4 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-black text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-orange-600/30"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>{isMobileDevice ? 'اجرای مستقیم در اپلیکیشن ایتا' : 'باز کردن چت ایتا در مرورگر'}</span>
                    </button>
                  </div>
                </div>

                {/* Telegram Card */}
                <div className="p-5 rounded-2xl bg-gradient-to-b from-sky-950/25 to-black/40 border border-sky-500/40 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-sky-500/20 text-sky-400 border border-sky-500/40 flex items-center justify-center font-black text-xl">
                        T
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-base">پیام‌رسان رسمی تلگرام (Telegram)</h3>
                        <div className="text-xs text-emerald-400 font-bold flex items-center gap-1 mt-0.5">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>کانال بین‌المللی ارسال فایل و قراردادها</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    ایده‌آل جهت انتقال اسناد پروژه‌های بزرگ، فایل‌های فیگما، و ارتباطات فنی بین‌المللی با کیفیت اصلی.
                  </p>

                  <div className="p-3 rounded-xl bg-black/50 border border-slate-800 flex items-center justify-between font-mono text-xs">
                    <span className="text-slate-200">@sedrazavi</span>
                    <button
                      onClick={() => handleCopy('@sedrazavi', 'telegram')}
                      className="text-sky-400 hover:text-white flex items-center gap-1 text-[11px] transition-colors"
                    >
                      {copiedTelegram ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedTelegram ? 'کپی شد' : 'کپی آیدی'}</span>
                    </button>
                  </div>

                  {/* QR Code / Deep Link Actions */}
                  <div className="space-y-2 pt-1">
                    <button
                      onClick={() => handleLaunchMessenger('tg://resolve?domain=sedrazavi', 'https://t.me/sedrazavi')}
                      className="w-full py-2.5 px-4 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-black text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-sky-600/30"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>{isMobileDevice ? 'اجرای مستقیم در اپلیکیشن تلگرام' : 'باز کردن چت تلگرام در مرورگر'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: VERIFICATION CHECK */}
          {activeTab === 'verification_check' && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                  <ShieldCheck className="w-4 h-4" />
                  <span>سامانه رسمی مبارزه با جعل هویت و استعلام اصالت نماینده قانونی</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  جهت جلوگیری از کلاهبرداری افراد سودجو که با سوءاستفاده از نام معمار ارشد سامانه اقدام به جذب پروژه می‌کنند، هرگونه اکانت، آیدی یا شماره تماسی که به شما پیام داده است را در کادر زیر وارد کنید تا اصالت آن فوراً تایید شود.
                </p>
              </div>

              {/* Inquiry Input Box */}
              <form onSubmit={handleVerifyIdentity} className="p-5 rounded-2xl bg-black/40 border border-slate-800 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    شناسه تلگرام، ایتا یا شماره تماس را وارد کنید:
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={queryInput}
                      onChange={(e) => setQueryInput(e.target.value)}
                      placeholder="مثال: @sedrazavi یا 09123456789"
                      className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white font-mono focus:border-emerald-500 outline-none"
                    />
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs transition-all shadow-md shadow-emerald-600/20"
                    >
                      استعلام اصالت
                    </button>
                  </div>
                </div>

                {/* Verification Result */}
                {verificationResult && (
                  <div
                    className={`p-4 rounded-xl border mt-3 transition-all ${
                      verificationResult.isOfficial
                        ? 'bg-emerald-950/40 border-emerald-500/60 text-emerald-200'
                        : 'bg-rose-950/40 border-rose-500/60 text-rose-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2 font-bold text-xs">
                        {verificationResult.isOfficial ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <AlertTriangle className="w-4 h-4 text-rose-400" />
                        )}
                        <span>{verificationResult.name}</span>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/40 border border-current">
                        {verificationResult.isOfficial ? 'OFFICIAL VERIFIED' : 'UNVERIFIED / SUSPICIOUS'}
                      </span>
                    </div>
                    <p className="text-xs leading-relaxed mt-1">{verificationResult.details}</p>
                  </div>
                )}
              </form>

              {/* Official Credentials Summary */}
              <div className="p-4 rounded-xl bg-black/30 border border-slate-800 text-xs space-y-2 text-slate-300">
                <div className="font-bold text-white">تنها مجاری ارتباطی رسمی تاییدشده:</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 font-mono text-[11px]">
                  <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
                    <span>ایتا: https://eitaa.com/sedrazavi</span>
                    <span className="text-emerald-400">@sedrazavi</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
                    <span>تلگرام: https://t.me/sedrazavi</span>
                    <span className="text-emerald-400">@sedrazavi</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: PGP CERTIFICATE */}
          {activeTab === 'pgp_certificate' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-black/30 p-3.5 rounded-xl border border-slate-800">
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <Key className="w-4 h-4 text-amber-400" />
                  <span>کلید عمومی رمزنگاری PGP و اثر انگشت دیجیتال معمار سامانه:</span>
                </div>
                <button
                  onClick={() =>
                    handleCopy(
                      'F67B 90A2 E834 1C5D B399 43E1 8DA2 7430 52C9 ED1F',
                      'pgp'
                    )
                  }
                  className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-200 flex items-center gap-1 border border-slate-700"
                >
                  {copiedPgp ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedPgp ? 'کپی شد' : 'کپی اثر انگشت'}</span>
                </button>
              </div>

              <div className="p-4 rounded-xl bg-black/60 border border-slate-800 font-mono text-xs text-amber-300 space-y-2 leading-relaxed">
                <div>
                  <span className="text-slate-500 block text-[10px]">اثر انگشت کلید (Key Fingerprint):</span>
                  <span className="text-sm font-bold text-amber-400">
                    F67B 90A2 E834 1C5D B399 43E1 8DA2 7430 52C9 ED1F
                  </span>
                </div>
                <div className="pt-2 text-slate-400 text-[11px] border-t border-slate-800">
                  هویت صاحب کلید: Seyyed Amir Hossein Razavi Fordoei &lt;sar42ei@gmail.com&gt;
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-sky-500/20 bg-black/50 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Shield className="w-3.5 h-3.5 text-sky-400" />
            <span>سامانه ضدجعل و هدایت تطبیقی SedRazavi OS — هویت تاییدشده در مرکز فناوری رسانه‌های دیجیتال</span>
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
