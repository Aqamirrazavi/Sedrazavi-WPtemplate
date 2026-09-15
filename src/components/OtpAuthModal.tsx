import React, { useState, useEffect } from 'react';
import {
  X,
  Phone,
  ShieldCheck,
  ArrowLeft,
  KeyRound,
  RotateCcw,
  CheckCircle2,
  Lock,
  User,
  MessageSquare,
  Sparkles,
  HelpCircle,
  Eye,
  EyeOff,
  Check
} from 'lucide-react';
import { ATTORNEY_INFO } from '../data/mockData';
import {
  findClientByCredentials,
  normalizeIranPhone,
  getStoredClientAccounts
} from '../utils/clientAccountsStorage';

interface OtpAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (phoneNumber: string, userName?: string) => void;
  onOpenQuickCallback: () => void;
}

export const OtpAuthModal: React.FC<OtpAuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  onOpenQuickCallback,
}) => {
  // Tab: 'password' (Lawyer assigned password) vs 'otp' (SMS verification code)
  const [authMethod, setAuthMethod] = useState<'password' | 'otp'>('password');
  
  // Password Mode State
  const [loginPhone, setLoginPhone] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [isSubmittingPass, setIsSubmittingPass] = useState(false);

  // OTP Mode State
  const [step, setStep] = useState<'phone' | 'otp' | 'success'>('phone');
  const [otpPhone, setOtpPhone] = useState('');
  const [userName, setUserName] = useState('');
  const [otpCode, setOtpCode] = useState(['', '', '', '', '']);
  const [timer, setTimer] = useState(60);
  const [isSending, setIsSending] = useState(false);
  const [otpErrorMsg, setOtpErrorMsg] = useState('');
  const [generatedDemoCode, setGeneratedDemoCode] = useState('۵۴۸۲۱');

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (authMethod === 'otp' && step === 'otp' && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [authMethod, step, timer]);

  if (!isOpen) return null;

  // --- جریان اول: ورود با رمز عبور دریافتی از خانم وکیل (بدون SMS) ---
  const handlePasswordLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');

    const normalized = normalizeIranPhone(loginPhone);
    if (!normalized || normalized.length !== 11 || !normalized.startsWith('09')) {
      setPasswordError('لطفاً شماره سیم‌کارت معتبر وارد فرمایید (پشتیبانی از با صفر مانند ۰۹۱۲... یا بدون صفر مانند ۹۱۲...).');
      return;
    }

    if (!loginPassword.trim()) {
      setPasswordError('لطفاً رمز عبور اختصاصی دریافت شده از وکیل را وارد فرمایید.');
      return;
    }

    setIsSubmittingPass(true);

    setTimeout(() => {
      setIsSubmittingPass(false);
      const matchedClient = findClientByCredentials(normalized, loginPassword);

      if (matchedClient) {
        onLoginSuccess(matchedClient.phone, matchedClient.name || 'موکل گرامی');
        onClose();
      } else {
        // Check if phone exists with different password
        const allAccounts = getStoredClientAccounts();
        const foundPhone = allAccounts.find(
          (a) => a.phone === normalized || a.phone.slice(1) === normalized.replace(/^0/, '')
        );

        if (foundPhone) {
          setPasswordError('رمز عبور وارد شده برای این شماره صحیح نمی‌باشد. لطفاً پیام دریافتی از وکیل را بررسی فرمایید.');
        } else {
          setPasswordError('اکانتی با این شماره سیم‌کارت یافت نشد. اگر وکیل هنوز برای شما اکانت نساخته، در پیام‌رسان‌ها با ایشان در تماس باشید یا از گزینه ورود پیامکی استفاده فرمایید.');
        }
      }
    }, 600);
  };

  const handleQuickFillAccount = (phoneVal: string, passVal: string) => {
    setLoginPhone(phoneVal);
    setLoginPassword(passVal);
    setPasswordError('');
  };

  // --- جریان دوم: ورود با کد تایید پیامکی (OTP) ---
  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setOtpErrorMsg('');

    const cleanPhone = normalizeIranPhone(otpPhone);
    if (!cleanPhone || cleanPhone.length !== 11 || !cleanPhone.startsWith('09')) {
      setOtpErrorMsg('لطفاً یک شماره موبایل معتبر (مانند ۰۹۱۲۳۴۵۶۷۸۹ یا ۹۱۲۳۴۵۶۷۸۹) وارد فرمایید.');
      return;
    }

    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      const randomOtp = Math.floor(10000 + Math.random() * 90000).toString();
      setGeneratedDemoCode(randomOtp);
      setTimer(60);
      setStep('otp');
    }, 700);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setOtpErrorMsg('');
    const fullCode = otpCode.join('');

    if (fullCode.length < 5) {
      setOtpErrorMsg('لطفاً کد ۵ رقمی پیامک شده را کامل وارد نمایید.');
      return;
    }

    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setStep('success');
      setTimeout(() => {
        onLoginSuccess(normalizeIranPhone(otpPhone), userName || 'موکل گرامی');
        onClose();
      }, 1000);
    }, 600);
  };

  const handleOtpInput = (index: number, val: string) => {
    if (val.length > 1) {
      val = val.slice(-1);
    }
    const newOtp = [...otpCode];
    newOtp[index] = val;
    setOtpCode(newOtp);

    if (val && index < 4) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) (nextInput as HTMLInputElement).focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpCode[index] && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      if (prevInput) (prevInput as HTMLInputElement).focus();
    }
  };

  const handleQuickFillDemo = () => {
    const digits = generatedDemoCode.split('');
    setOtpCode(digits);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md bg-white dark:bg-[#0B132B] rounded-3xl shadow-2xl border border-[#D4AF37]/30 overflow-hidden text-right font-persian">
        
        {/* Header decoration */}
        <div className="bg-gradient-to-r from-[#0B132B] via-[#1C2541] to-[#0B132B] p-5 sm:p-6 text-white relative border-b border-[#D4AF37]/20">
          <button
            onClick={onClose}
            className="absolute top-5 left-5 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors"
            aria-label="بستن پنجره"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#AA820A] flex items-center justify-center text-white shadow-md shadow-[#D4AF37]/30 shrink-0">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold font-serif text-white">
                پرتال ورود موکلین و مراجعین
              </h3>
              <p className="text-xs text-[#F3E5AB]">
                دفتر وکالت و داوری دکتر سیده مریم رضوی
              </p>
            </div>
          </div>

          {/* Tab Switcher: Password from Lawyer vs SMS OTP */}
          <div className="mt-4 p-1 rounded-xl bg-white/10 backdrop-blur-sm flex items-center gap-1 border border-white/10">
            <button
              type="button"
              onClick={() => {
                setAuthMethod('password');
                setPasswordError('');
              }}
              className={`flex-1 py-2 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                authMethod === 'password'
                  ? 'bg-[#D4AF37] text-[#0B132B] shadow-md'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              <Lock className="w-3.5 h-3.5" />
              <span>ورود با رمز وکیل (بدون SMS)</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setAuthMethod('otp');
                setOtpErrorMsg('');
              }}
              className={`flex-1 py-2 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                authMethod === 'otp'
                  ? 'bg-[#D4AF37] text-[#0B132B] shadow-md'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              <Phone className="w-3.5 h-3.5" />
              <span>ورود پیامکی (OTP)</span>
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-7 space-y-5 max-h-[80vh] overflow-y-auto">

          {/* ═════════ حالت ۱: ورود با رمز عبور اختصاصی وکیل (بدون SMS) ═════════ */}
          {authMethod === 'password' && (
            <form onSubmit={handlePasswordLogin} className="space-y-4">
              
              <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/40 text-amber-800 dark:text-amber-300 text-xs leading-relaxed">
                ℹ️ <strong>راهنما:</strong> اگر در پیام‌رسان‌ها (ایتا، بله، واتس‌اپ) با خانم وکیل گفتگو کرده‌اید و ایشان برای شما اکانت ساخته، شماره سیم‌کارت و رمز دریافتی را وارد کنید.
              </div>

              {/* Phone (Username) */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300">
                  شماره سیم‌کارت شما (نام کاربری - با صفر یا بدون صفر):
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    required
                    value={loginPhone}
                    onChange={(e) => setLoginPhone(e.target.value)}
                    placeholder="مثال: ۰۹۱۲۳۴۵۶۷۸۹ یا ۹۱۲۳۴۵۶۷۸۹"
                    dir="ltr"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white font-mono text-sm focus:outline-none focus:border-[#D4AF37]"
                  />
                  <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
                </div>
                <span className="text-[10px] text-gray-400">
                  می‌توانید هم با صفر (۰۹۱۲...) و هم بدون صفر (۹۱۲...) تایپ کنید.
                </span>
              </div>

              {/* Password */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300">
                  رمز عبور اختصاصی (دریافت شده از وکیل):
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="مانند: SR-1403 یا SR-8842"
                    dir="ltr"
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white font-mono text-sm focus:outline-none focus:border-[#D4AF37]"
                  />
                  <Lock className="w-4 h-4 text-gray-400 absolute right-3 top-3.5" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3 top-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                    title={showPassword ? 'مخفی کردن' : 'نمایش'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Demo Account Fill Buttons for instant review */}
              <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 space-y-1.5">
                <span className="text-[11px] font-bold text-gray-500 dark:text-gray-400 block">
                  اکانت‌های تستی فعال جهت ورود فوری با ۱ کلیک:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleQuickFillAccount('09123456789', 'SR-1403')}
                    className="px-2.5 py-1 rounded-lg bg-white dark:bg-gray-700 text-[#0B132B] dark:text-gray-200 border border-gray-200 dark:border-gray-600 text-[10px] font-bold hover:border-[#D4AF37]"
                  >
                    موکل ۱ (۰۹۱۲۳۴۵۶۷۸۹ / SR-1403)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickFillAccount('9129876543', 'SR-8842')}
                    className="px-2.5 py-1 rounded-lg bg-white dark:bg-gray-700 text-[#0B132B] dark:text-gray-200 border border-gray-200 dark:border-gray-600 text-[10px] font-bold hover:border-[#D4AF37]"
                  >
                    موکل ۲ بدون صفر (۹۱۲۹۸۷۶۵۴۳ / SR-8842)
                  </button>
                </div>
              </div>

              {passwordError && (
                <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-xs">
                  {passwordError}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmittingPass}
                className="btn-gold w-full py-3 text-xs sm:text-sm font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-[#D4AF37]/20"
              >
                {isSubmittingPass ? (
                  <span>در حال بررسی مشخصات...</span>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>ورود به پرتال موکل</span>
                  </>
                )}
              </button>

              {/* Shortcut to request callback */}
              <div className="pt-3 border-t border-gray-100 dark:border-gray-800 text-center space-y-2">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  هنوز اکانت یا رمز دریافت نکرده‌اید؟
                </p>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenQuickCallback();
                  }}
                  className="w-full py-2.5 px-4 rounded-xl border border-dashed border-[#D4AF37] text-[#0B132B] dark:text-[#F3E5AB] bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 transition-all text-xs font-bold flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4 text-[#D4AF37]" />
                  <span>درخواست تماس فوری وکیل بدون نیاز به اکانت</span>
                </button>
              </div>

            </form>
          )}

          {/* ═════════ حالت ۲: ورود پیامکی (OTP با پلاگین Digits) ═════════ */}
          {authMethod === 'otp' && (
            <>
              {step === 'phone' && (
                <form onSubmit={handleSendOtp} className="space-y-4">
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300">
                      شماره تلفن همراه (ارسال کد یکبار مصرف):
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        required
                        value={otpPhone}
                        onChange={(e) => setOtpPhone(e.target.value)}
                        placeholder="۰۹۱۲۳۴۵۶۷۸۹ یا ۹۱۲۳۴۵۶۷۸۹"
                        dir="ltr"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white font-mono text-sm focus:outline-none focus:border-[#D4AF37]"
                      />
                      <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
                    </div>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400">
                      کد تایید یک‌بار مصرف ۵ رقمی به صورت پیامک ارسال خواهد شد.
                    </p>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300">
                      نام و نام خانوادگی (اختیاری):
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder="مثال: علیرضا محمدی"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                      />
                      <User className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
                    </div>
                  </div>

                  {otpErrorMsg && (
                    <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-xs">
                      {otpErrorMsg}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSending}
                    className="btn-gold w-full py-3 text-xs sm:text-sm font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-[#D4AF37]/20"
                  >
                    {isSending ? (
                      <span>در حال ارسال پیامک...</span>
                    ) : (
                      <>
                        <span>دریافت کد تایید پیامکی</span>
                        <ArrowLeft className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <div className="pt-3 border-t border-gray-100 dark:border-gray-800 text-center space-y-2">
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      پیامک دریافت نمی‌کنید؟
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onOpenQuickCallback();
                      }}
                      className="w-full py-2.5 px-4 rounded-xl border border-dashed border-[#D4AF37] text-[#0B132B] dark:text-[#F3E5AB] bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 transition-all text-xs font-bold flex items-center justify-center gap-2"
                    >
                      <MessageSquare className="w-4 h-4 text-[#D4AF37]" />
                      <span>درخواست تماس فوری وکیل بدون ثبت‌نام</span>
                    </button>
                  </div>
                </form>
              )}

              {step === 'otp' && (
                <form onSubmit={handleVerifyOtp} className="space-y-4">
                  <div className="text-center space-y-1">
                    <p className="text-xs text-gray-600 dark:text-gray-300">
                      کد تایید به شماره <strong className="font-mono text-[#0B132B] dark:text-white" dir="ltr">{otpPhone}</strong> پیامک شد.
                    </p>
                    <button
                      type="button"
                      onClick={() => setStep('phone')}
                      className="text-[11px] text-[#D4AF37] hover:underline"
                    >
                      ویرایش شماره تماس
                    </button>
                  </div>

                  <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 text-amber-800 dark:text-amber-300 text-xs flex items-center justify-between">
                    <span>کد پیامکی دمو: <strong>{generatedDemoCode}</strong></span>
                    <button
                      type="button"
                      onClick={handleQuickFillDemo}
                      className="px-2 py-1 bg-[#D4AF37] text-[#0B132B] rounded font-bold text-[10px]"
                    >
                      درج خودکار
                    </button>
                  </div>

                  <div className="flex justify-center gap-2" dir="ltr">
                    {[0, 1, 2, 3, 4].map((idx) => (
                      <input
                        key={idx}
                        id={`otp-input-${idx}`}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={otpCode[idx]}
                        onChange={(e) => handleOtpInput(idx, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(idx, e)}
                        className="w-11 h-12 text-center text-lg font-bold font-mono rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-[#0B132B] dark:text-white focus:outline-none focus:border-[#D4AF37]"
                      />
                    ))}
                  </div>

                  {otpErrorMsg && (
                    <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-xs">
                      {otpErrorMsg}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSending}
                    className="btn-gold w-full py-3 text-xs sm:text-sm font-bold rounded-xl flex items-center justify-center gap-2"
                  >
                    <Check className="w-4 h-4" />
                    <span>تایید کد و ورود به پرتال</span>
                  </button>

                  <div className="text-center text-xs text-gray-500">
                    {timer > 0 ? (
                      <span>امکان ارسال مجدد تا {timer} ثانیه دیگر</span>
                    ) : (
                      <button
                        type="button"
                        onClick={handleSendOtp}
                        className="text-[#D4AF37] font-bold hover:underline flex items-center justify-center gap-1 mx-auto"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>ارسال مجدد کد پیامکی</span>
                      </button>
                    )}
                  </div>
                </form>
              )}

              {step === 'success' && (
                <div className="text-center py-6 space-y-3">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-600 flex items-center justify-center mx-auto animate-bounce">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-base font-bold text-[#0B132B] dark:text-white">
                    ورود با موفقیت انجام شد
                  </h4>
                  <p className="text-xs text-gray-500">
                    در حال انتقال به کارتابل پرونده حقوقی شما...
                  </p>
                </div>
              )}
            </>
          )}

        </div>
      </div>
    </div>
  );
};
