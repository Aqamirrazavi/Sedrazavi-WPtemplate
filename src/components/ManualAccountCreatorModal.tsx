import React, { useState } from 'react';
import {
  X,
  UserPlus,
  KeyRound,
  Phone,
  User,
  Copy,
  Check,
  Send,
  Sparkles,
  ShieldCheck,
  FileText,
  MessageSquare,
  HelpCircle,
  ExternalLink,
  Lock,
  RefreshCw,
} from 'lucide-react';
import {
  generateRandomPassword,
  addClientAccount,
  ClientAccount,
  normalizeIranPhone,
} from '../utils/clientAccountsStorage';

interface ManualAccountCreatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccountCreated?: (account: ClientAccount) => void;
  lawyerPhone?: string;
  lawyerName?: string;
}

export const ManualAccountCreatorModal: React.FC<ManualAccountCreatorModalProps> = ({
  isOpen,
  onClose,
  onAccountCreated,
  lawyerPhone = '09123456789',
  lawyerName = 'دکتر سیده مریم رضوی',
}) => {
  const [clientPhone, setClientPhone] = useState('');
  const [clientName, setClientName] = useState('');
  const [password, setPassword] = useState(() => generateRandomPassword());
  const [selectedMessenger, setSelectedMessenger] = useState<'eitaa' | 'bale' | 'whatsapp' | 'telegram'>('eitaa');
  const [legalTopic, setLegalTopic] = useState('دعاوی ملکی و اسناد مالکیت');
  const [notes, setNotes] = useState('');
  const [createdAccount, setCreatedAccount] = useState<ClientAccount | null>(null);
  const [copiedText, setCopiedText] = useState(false);
  const [copiedPass, setCopiedPass] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleRegeneratePassword = () => {
    setPassword(generateRandomPassword());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const normalizedPhone = normalizeIranPhone(clientPhone);
    if (!normalizedPhone || normalizedPhone.length !== 11) {
      setErrorMsg('شماره موبایل وارد شده باید ۱۱ رقمی و معتبر باشد (مثال: ۰۹۱۲۳۴۵۶۷۸۹ یا ۹۱۲۳۴۵۶۷۸۹).');
      return;
    }

    if (!clientName.trim()) {
      setErrorMsg('لطفاً نام یا عنوان موکل را وارد کنید.');
      return;
    }

    try {
      const newAcc = addClientAccount({
        phone: normalizedPhone,
        rawInputPhone: clientPhone,
        password: password.trim(),
        name: clientName.trim(),
        preferredMessenger: selectedMessenger,
        legalTopic,
        notes: notes || 'ساخته شده به صورت دستی توسط وکیل جهت ارتباط امن در پیام‌رسان',
        status: 'active',
      });

      setCreatedAccount(newAcc);
      if (onAccountCreated) {
        onAccountCreated(newAcc);
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'خطا در ایجاد حساب کاربری.');
    }
  };

  const getMessengerShareText = () => {
    if (!createdAccount) return '';
    return `سلام جناب/سرکار ${createdAccount.name} محترم
حساب کاربری امن و اختصاصی شما در پورتال وکالت ${lawyerName} ایجاد گردید.

🌐 آدرس ورود به سامانه:
${window.location.origin}

👤 نام کاربری (شماره همراه شما):
${createdAccount.phone}

🔑 رمز عبور اختصاصی:
${createdAccount.password}

از طریق این پنل می‌توانید به طور مستقیم لوایح دفاعیه، مستندات پرونده و روند نوبت‌های دادرسی خود را مشاهده و مکاتبه نمایید.`;
  };

  const handleCopyCredentials = () => {
    const text = getMessengerShareText();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedText(true);
      setTimeout(() => setCopiedText(false), 2500);
    }
  };

  const handleCopyOnlyPassword = () => {
    if (navigator.clipboard && createdAccount) {
      navigator.clipboard.writeText(createdAccount.password);
      setCopiedPass(true);
      setTimeout(() => setCopiedPass(false), 2000);
    }
  };

  const handleResetForm = () => {
    setClientPhone('');
    setClientName('');
    setPassword(generateRandomPassword());
    setNotes('');
    setCreatedAccount(null);
    setErrorMsg('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden text-right flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-5 border-b border-gray-100 dark:border-gray-800 bg-gradient-to-r from-[#D4AF37]/10 via-transparent to-transparent flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center text-[#AA820A] dark:text-[#F3E5AB]">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold font-serif text-[#0B132B] dark:text-white">
                ساخت اکانت موکل بدون نیاز به پیامک (SMS)
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                تولید رمز رندم توسط وکیل و تحویل آن به موکل در پیام‌رسان‌ها
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {createdAccount ? (
            /* Success State with Quick Messenger Sharing */
            <div className="space-y-5 animate-in fade-in zoom-in-95 duration-200">
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-500 text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-emerald-900 dark:text-emerald-200">
                    حساب کاربری موکل با موفقیت ایجاد گردید!
                  </h3>
                  <p className="text-xs text-emerald-700 dark:text-emerald-400 mt-1 leading-relaxed">
                    موکل اکنون می‌تواند با شماره تماس خود (با صفر یا بدون صفر) و رمز عبور زیر وارد پورتال سایت شود.
                  </p>
                </div>
              </div>

              {/* Account Credentials Box */}
              <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800 space-y-3">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>مشخصات احراز هویت موکل</span>
                  <span className="font-mono text-[11px] text-gray-400">کد پرونده: {createdAccount.caseNumber || 'CL-1403'}</span>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="p-3 rounded-xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-700">
                    <span className="text-[11px] text-gray-400 block mb-1">نام یا عنوان:</span>
                    <span className="text-xs font-bold text-gray-800 dark:text-gray-100">{createdAccount.name}</span>
                  </div>

                  <div className="p-3 rounded-xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-700">
                    <span className="text-[11px] text-gray-400 block mb-1">نام کاربری (موبایل):</span>
                    <span className="text-xs font-bold font-mono text-gray-800 dark:text-gray-100" dir="ltr">{createdAccount.phone}</span>
                  </div>
                </div>

                {/* Password display */}
                <div className="p-3.5 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-[#AA820A] dark:text-[#F3E5AB] font-bold block mb-0.5">
                      رمز عبور اختصاصی تولیدشده:
                    </span>
                    <span className="text-base font-black font-mono tracking-wider text-[#0B132B] dark:text-white" dir="ltr">
                      {createdAccount.password}
                    </span>
                  </div>
                  <button
                    onClick={handleCopyOnlyPassword}
                    className="px-3 py-1.5 rounded-lg bg-white dark:bg-[#0B132B] text-xs font-bold text-[#AA820A] dark:text-[#F3E5AB] border border-[#D4AF37]/30 hover:bg-[#D4AF37]/20 transition-colors flex items-center gap-1.5"
                  >
                    {copiedPass ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedPass ? 'کپی شد' : 'کپی رمز'}</span>
                  </button>
                </div>
              </div>

              {/* Ready Messenger Message Box */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                    <Send className="w-3.5 h-3.5 text-[#D4AF37]" />
                    متن آماده برای ارسال در پیام‌رسان موکل:
                  </span>
                  <button
                    onClick={handleCopyCredentials}
                    className="text-xs text-[#AA820A] dark:text-[#F3E5AB] hover:underline flex items-center gap-1 font-bold"
                  >
                    {copiedText ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedText ? 'متن پیام کپی شد!' : 'کپی کل پیام آماده'}</span>
                  </button>
                </div>

                <div className="p-3.5 rounded-xl bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-xs text-gray-600 dark:text-gray-300 leading-relaxed font-sans whitespace-pre-line max-h-36 overflow-y-auto">
                  {getMessengerShareText()}
                </div>
              </div>

              {/* Direct Messenger Quick Action Links */}
              <div className="pt-2">
                <span className="text-[11px] text-gray-500 dark:text-gray-400 block mb-2 font-bold">
                  ارسال مستقیم به پیام‌رسان موکل:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  <a
                    href={`https://wa.me/98${createdAccount.phone.replace(/^0/, '')}?text=${encodeURIComponent(getMessengerShareText())}`}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center justify-center gap-1.5 font-bold transition-all text-center"
                  >
                    واتس‌اپ
                  </a>
                  <a
                    href={`https://t.me/share/url?url=${encodeURIComponent(window.location.origin)}&text=${encodeURIComponent(getMessengerShareText())}`}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-xl bg-sky-500/10 hover:bg-sky-500/20 text-sky-600 dark:text-sky-400 border border-sky-500/20 flex items-center justify-center gap-1.5 font-bold transition-all text-center"
                  >
                    تلگرام
                  </a>
                  <a
                    href={`https://eitaa.com`}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/20 flex items-center justify-center gap-1.5 font-bold transition-all text-center"
                  >
                    ایتا
                  </a>
                  <a
                    href={`https://ble.ir`}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-xl bg-teal-500/10 hover:bg-teal-500/20 text-teal-600 dark:text-teal-400 border border-teal-500/20 flex items-center justify-center gap-1.5 font-bold transition-all text-center"
                  >
                    بله
                  </a>
                </div>
              </div>

              {/* Footer action buttons */}
              <div className="flex items-center gap-3 pt-3 border-t border-gray-200 dark:border-gray-800">
                <button
                  type="button"
                  onClick={handleResetForm}
                  className="flex-1 py-2.5 px-4 rounded-xl border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-xs font-bold text-gray-700 dark:text-gray-300 transition-colors"
                >
                  ثبت اکانت موکل دیگر
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 btn-gold py-2.5 px-4 rounded-xl text-xs font-bold text-[#0B132B]"
                >
                  تأیید و بستن پنجره
                </button>
              </div>

            </div>
          ) : (
            /* Creation Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* How it works info banner */}
              <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-2.5 text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
                <HelpCircle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>گردش کار بدون SMS:</strong> موکل از طریق لینک‌های سایت با پیام‌رسان شما ارتباط می‌گیرد. شما شماره او را دریافت کرده و در این فرم ثبت می‌کنید. سیستم یک پسورد تصادفی مطمئن تولید می‌کند که می‌توانید آن را در همان پیام‌رسان برای موکل بفرستید تا وارد پنل شود.
                </span>
              </div>

              {errorMsg && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs font-bold">
                  {errorMsg}
                </div>
              )}

              {/* Client Phone Number */}
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                  شماره موبایل موکل (شناسه ورود) *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-gray-400 absolute right-3 top-3.5 pointer-events-none" />
                  <input
                    type="tel"
                    required
                    dir="ltr"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder="۰۹۱۲۳۴۵۶۷۸۹ یا ۹۱۲۳۴۵۶۷۸۹"
                    className="w-full pr-9 pl-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 text-xs text-gray-800 dark:text-gray-100 font-mono focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>
                <span className="text-[10px] text-gray-400 mt-1 block">
                  موکل موقع ورود می‌تواند چه با صفر و چه بدون صفر شماره‌اش را وارد کند.
                </span>
              </div>

              {/* Client Name */}
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                  نام و نام خانوادگی موکل یا شرکت *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-gray-400 absolute right-3 top-3.5 pointer-events-none" />
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="مثال: آقای مهندس حسینی / شرکت پارس آذر"
                    className="w-full pr-9 pl-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 text-xs text-gray-800 dark:text-gray-100 focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>
              </div>

              {/* Password Generator */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
                    رمز عبور تولیدشده اختصاصی *
                  </label>
                  <button
                    type="button"
                    onClick={handleRegeneratePassword}
                    className="text-[11px] text-[#AA820A] dark:text-[#F3E5AB] hover:underline flex items-center gap-1 font-bold"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>تولید مجدد پسورد تصادفی</span>
                  </button>
                </div>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-[#D4AF37] absolute right-3 top-3.5 pointer-events-none" />
                  <input
                    type="text"
                    required
                    dir="ltr"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pr-9 pl-4 py-2.5 rounded-xl border border-[#D4AF37]/50 bg-[#D4AF37]/5 text-sm font-mono font-bold text-gray-800 dark:text-gray-100 focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>
              </div>

              {/* Preferred Messenger */}
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                  پیام‌رسان جهت ارسال پسورد به موکل
                </label>
                <div className="grid grid-cols-4 gap-2 text-xs">
                  {[
                    { id: 'eitaa', label: 'ایتا' },
                    { id: 'bale', label: 'بله' },
                    { id: 'whatsapp', label: 'واتس‌اپ' },
                    { id: 'telegram', label: 'تلگرام' },
                  ].map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setSelectedMessenger(m.id as any)}
                      className={`py-2 px-2 rounded-xl text-xs font-bold border transition-all ${
                        selectedMessenger === m.id
                          ? 'bg-[#D4AF37] text-[#0B132B] border-[#D4AF37]'
                          : 'bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700'
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Legal Topic */}
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                  موضوع دعوا یا مشاوره
                </label>
                <input
                  type="text"
                  value={legalTopic}
                  onChange={(e) => setLegalTopic(e.target.value)}
                  placeholder="مثال: الزام به تنظیم سند، داوری قرارداد، مطالبات مالی"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 text-xs text-gray-800 dark:text-gray-100 focus:border-[#D4AF37] focus:outline-none"
                />
              </div>

              {/* Optional Notes */}
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                  یادداشت وکیل (محرمانه در پنل)
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="مثلا: پیام در ایتا داده شد، مدارک اسکن‌شده در انتظار بررسی."
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 text-xs text-gray-800 dark:text-gray-100 focus:border-[#D4AF37] focus:outline-none resize-none"
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center gap-3 pt-3 border-t border-gray-200 dark:border-gray-800">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-2.5 px-4 rounded-xl border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-xs font-bold text-gray-700 dark:text-gray-300 transition-colors"
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  className="flex-1 btn-gold py-2.5 px-4 rounded-xl text-xs font-bold text-[#0B132B] flex items-center justify-center gap-2"
                >
                  <KeyRound className="w-4 h-4" />
                  <span>تولید اکانت و دریافت رمز</span>
                </button>
              </div>

            </form>
          )}

        </div>
      </div>
    </div>
  );
};
