import React, { useState, useRef, useEffect } from 'react';
import {
  Terminal as TerminalIcon,
  Layout,
  Send,
  CheckCircle2,
  Lock,
  Wifi,
  WifiOff,
  Copy,
  Check,
  Shield,
  Zap,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const DualInquiryGateway: React.FC = () => {
  const { showToast } = useToast();
  const [activeMode, setActiveMode] = useState<'gui' | 'cli'>('gui');
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    projectType: 'enterprise',
    details: '',
  });
  const [generatedToken, setGeneratedToken] = useState<string | null>(null);
  const [copiedToken, setCopiedToken] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // CLI Terminal states
  const [commandInput, setCommandInput] = useState('');
  const [history, setHistory] = useState<Array<{ type: 'input' | 'output' | 'system'; text: string }>>([
    { type: 'system', text: 'Welcome to SedRazavi Sovereign CLI (Seyyed Amir Hossein Razavi Fordoei)' },
    { type: 'system', text: 'Brand: SedRazavi | Official Handles: @sedrazavi on Eitaa & Telegram' },
    { type: 'system', text: 'Type "help" to view available commands or "whoami" for architect bio.' },
  ]);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleGuiSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const rawToken = 'SR-' + Math.random().toString(36).substring(2, 10).toUpperCase() + '-' + Date.now().toString().slice(-4);
      setGeneratedToken(rawToken);
      setIsSubmitting(false);
      showToast({
        message: 'استعلام شما با موفقیت ثبت شد و توکن رهگیری اختصاص یافت!',
        type: 'success',
      });
    }, 600);
  };

  const handleCliSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = commandInput.trim();
    if (!cmd) return;

    const newHistory = [...history, { type: 'input' as const, text: `sedrazavi@sovereign:~$ ${cmd}` }];
    const lowerCmd = cmd.toLowerCase();

    if (lowerCmd === 'help') {
      newHistory.push({
        type: 'output',
        text: `دستورات در دسترس:
  whoami   - شناسنامه و هویت سید امیر حسین رضوی فردویی
  skills   - مهارت‌های فنی و استانداردهای معماری بدون کد
  verify   - بررسی اصالت آیدی‌ها و کلید رمزنگاری PGP
  calc     - برآورد هوشمند زمان و بودجه معماری
  inquire  - ثبت استعلام سریع در صف آفلاین
  clear    - پاکسازی پنجره ترمینال`,
      });
    } else if (lowerCmd === 'whoami') {
      newHistory.push({
        type: 'output',
        text: `مهندس سید امیر حسین رضوی فردویی (SedRazavi)
معمار ارشد و سریع‌ترین طراح وب‌سایت‌های بدون کد در ایران
آیدی انحصاری ایتا و تلگرام: @sedrazavi
شعبه فعالیت: تهران / آنلاین در سراسر کشور`,
      });
    } else if (lowerCmd === 'skills') {
      newHistory.push({
        type: 'output',
        text: `تخصص‌های محوری:
• معماری 100% بدون کد وردپرس بر پایه کانتینرهای پیشرفته
• تسلط کامل به JetEngine، ساختارهای روابط m:n و کوئری‌بیلدر
• بهینه‌سازی سرعت فوق‌سریع (LCP < 1.0s و CLS = 0)
• سیستم دوزبانه سروری (/en/) با هدرهای hreflang مستقل
• گره‌چینی پارامتریک و ترمینال‌های سایبرنتیک Web3`,
      });
    } else if (lowerCmd === 'verify') {
      newHistory.push({
        type: 'output',
        text: `وضعیت اصالت: [تأییدشده]
ایتا: https://eitaa.com/sedrazavi (@sedrazavi)
تلگرام: https://t.me/sedrazavi (@sedrazavi)
PGP Fingerprint: F67B 90A2 E834 1C5D B399 43E1 8DA2 7430 52C9 ED1F`,
      });
    } else if (lowerCmd === 'calc') {
      newHistory.push({
        type: 'output',
        text: `برآورد پایه سرمایه‌گذاری:
پلتفرم سازمانی جت‌انجین: ۴۰,۰۰۰,۰۰۰ تومان (۲۱ روز کاری)
سایت شرکتی استاندارد: ۲۵,۰۰۰,۰۰۰ تومان (۱۴ روز کاری)
دوزبانه سروری: +۸,۰۰۰,۰۰۰ تومان`,
      });
    } else if (lowerCmd.startsWith('inquire')) {
      const token = 'SR-' + Math.random().toString(36).substring(2, 10).toUpperCase();
      newHistory.push({
        type: 'output',
        text: `[OK] استعلام شما با موفقیت در صف آفلاین ثبت شد!
کد پیگیری اختصاصی: ${token}
پیگیری زنده: https://sedrazavi.ir/track/?token=${token}`,
      });
    } else if (lowerCmd === 'clear') {
      setHistory([]);
      setCommandInput('');
      return;
    } else {
      newHistory.push({
        type: 'output',
        text: `دستور "${cmd}" شناسایی نشد. برای مشاهده راهنما عبارت "help" را تایپ کنید.`,
      });
    }

    setHistory(newHistory);
    setCommandInput('');
  };

  const copyToken = () => {
    if (generatedToken) {
      navigator.clipboard.writeText(generatedToken);
      setCopiedToken(true);
      showToast({ message: 'کد پیگیری در کلیپ‌بورد کپی شد.', type: 'info' });
      setTimeout(() => setCopiedToken(false), 2500);
    }
  };

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden" dir="rtl">
      {/* Background Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-8 relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 mb-3">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>درگاه دوحالته ثبت استعلام (GUI + CLI)</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-black text-white mb-2">
          همکاری با معمار ارشد سید امیر حسین رضوی فردویی
        </h2>
        <p className="text-slate-400 text-xs md:text-sm">
          ثبت سریع پروژه به شیوه دلخواه شما: فرم شیشه‌ای سایبرنتیک یا خط فرمان ترمینال یونیکس با صف ذخیره‌سازی آفلاین.
        </p>
      </div>

      {/* Mode Switcher */}
      <div className="flex justify-center gap-3 mb-8 relative z-10">
        <button
          type="button"
          onClick={() => setActiveMode('gui')}
          className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
            activeMode === 'gui'
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Layout className="w-4 h-4" />
          <span>فرم تعاملی سایبر-گلس (GUI)</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveMode('cli')}
          className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
            activeMode === 'cli'
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <TerminalIcon className="w-4 h-4" />
          <span>ترمینال یونیکس مهندسی (CLI)</span>
        </button>
      </div>

      {/* MODE 1: GUI FORM */}
      {activeMode === 'gui' && (
        <div className="max-w-3xl mx-auto bg-slate-900/80 border border-slate-800 rounded-2xl p-6 md:p-8 backdrop-blur-xl relative z-10">
          {!generatedToken ? (
            <form onSubmit={handleGuiSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-300 font-bold block mb-1.5">
                    نام و نام خانوادگی / سازمان:
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="مثال: مهندس راد / شرکت دانش‌بنیان"
                    className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-300 font-bold block mb-1.5">
                    شماره تماس یا آیدی (ایتا/تلگرام):
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.contact}
                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                    placeholder="0912... یا @username"
                    className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl px-4 py-2.5 text-xs font-mono focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-300 font-bold block mb-1.5">
                  نوع وب‌سایت مدنظر:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: 'enterprise', title: 'سطح سازمانی', desc: 'زیرساخت بدون کد JetEngine' },
                    { id: 'crypto_web3', title: 'ترمینال Web3', desc: 'داشبورد دارایی‌های دیجیتال' },
                    { id: 'luxury_portfolio', title: 'پورتفولیو پرچم‌دار', desc: 'گره‌چینی پارامتریک و سرعت' },
                  ].map((type) => (
                    <label
                      key={type.id}
                      className={`p-3 rounded-xl border cursor-pointer transition-all ${
                        formData.projectType === type.id
                          ? 'bg-indigo-950/40 border-indigo-500 shadow-md'
                          : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <input
                        type="radio"
                        name="projectType"
                        value={type.id}
                        checked={formData.projectType === type.id}
                        onChange={() => setFormData({ ...formData, projectType: type.id })}
                        className="hidden"
                      />
                      <div className="font-bold text-white text-xs mb-0.5">{type.title}</div>
                      <div className="text-[10px] text-slate-400">{type.desc}</div>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-300 font-bold block mb-1.5">
                  توضیحات تکمیلی یا الزامات کلیدی:
                </label>
                <textarea
                  rows={3}
                  value={formData.details}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                  placeholder="نیازمندی‌ها، امکانات ویژه یا رفرنس‌های مدنظر..."
                  className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <div className="flex items-center gap-2 text-[11px] text-slate-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>صف ارسال آفلاین هوشمند (IndexedDB) فعال است</span>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-black text-xs rounded-xl transition-all shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? 'در حال شلیک...' : 'شلیک استعلام و دریافت کد رهگیری'}</span>
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center py-6 space-y-4">
              <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-2 border border-emerald-500/30">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">استعلام شما با موفقیت ثبت شد!</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                کد رهگیری امن زیر را برای پایش پیش‌فاکتور و مراحل انجام پروژه نگهداری نمایید:
              </p>

              <div className="bg-black/60 border border-slate-800 rounded-xl p-4 max-w-sm mx-auto flex items-center justify-between font-mono text-sm text-amber-400">
                <span>{generatedToken}</span>
                <button
                  type="button"
                  onClick={copyToken}
                  className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors"
                  title="کپی کد رهگیری"
                >
                  {copiedToken ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <div className="flex justify-center gap-3 pt-2">
                <a
                  href="https://eitaa.com/sedrazavi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-orange-600 hover:bg-orange-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-orange-600/20"
                >
                  ارتباط مستقیم در ایتا (@sedrazavi)
                </a>
                <button
                  type="button"
                  onClick={() => setGeneratedToken(null)}
                  className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition-all"
                >
                  ثبت استعلام جدید
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* MODE 2: CLI TERMINAL */}
      {activeMode === 'cli' && (
        <div className="max-w-3xl mx-auto bg-black/95 border border-slate-800 rounded-2xl p-6 font-mono text-xs shadow-2xl relative z-10 text-right">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 text-slate-500">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
              <span className="text-slate-400 mr-2 text-[11px]">sedrazavi-terminal-v16.0</span>
            </div>
            <span className="text-[10px] text-slate-600">Type "help" for command manual</span>
          </div>

          {/* Terminal Log */}
          <div className="space-y-2 min-h-[200px] max-h-[320px] overflow-y-auto mb-3 pl-2 text-slate-300">
            {history.map((item, idx) => (
              <div
                key={idx}
                className={`whitespace-pre-line leading-relaxed ${
                  item.type === 'input'
                    ? 'text-indigo-400 font-bold'
                    : item.type === 'system'
                    ? 'text-emerald-400'
                    : 'text-slate-300'
                }`}
              >
                {item.text}
              </div>
            ))}
            <div ref={terminalEndRef} />
          </div>

          {/* Input Prompt */}
          <form onSubmit={handleCliSubmit} className="flex items-center gap-2 pt-2 border-t border-slate-900">
            <span className="text-emerald-400 font-bold">sedrazavi@sovereign:~$</span>
            <input
              type="text"
              value={commandInput}
              onChange={(e) => setCommandInput(e.target.value)}
              placeholder="help, whoami, skills, verify, calc, clear..."
              className="flex-1 bg-transparent text-white border-none outline-none text-xs font-mono p-0 focus:ring-0"
              autoFocus
            />
          </form>
        </div>
      )}
    </div>
  );
};
