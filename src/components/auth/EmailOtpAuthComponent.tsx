import React, { useState, useEffect, useRef } from 'react';
import {
  Mail,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  CheckCircle2,
  Lock,
  Sparkles,
  Inbox,
  Clock,
  AlertCircle,
  KeyRound,
  User,
  Scale,
  Briefcase,
  Copy,
  Check,
} from 'lucide-react';
import { ATTORNEY_INFO } from '../../data/mockData';

export interface EmailOtpAuthComponentProps {
  onLoginSuccess: (identifier: string, name?: string, role?: 'client' | 'lawyer' | 'admin') => void;
  onCancel?: () => void;
  title?: string;
  subtitle?: string;
  isModal?: boolean;
}

export const EmailOtpAuthComponent: React.FC<EmailOtpAuthComponentProps> = ({
  onLoginSuccess,
  onCancel,
  title = 'ورود سریع و امن با رمز یکبار مصرف (Email OTP)',
  subtitle = 'برای ورود به سامانه، ایمیل خود را وارد نمایید تا کد ۶ رقمی موقت برای شما ارسال شود.',
  isModal = false,
}) => {
  const [step, setStep] = useState<'email' | 'otp' | 'success'>('email');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [otpCode, setOtpCode] = useState(['', '', '', '', '', '']);
  const [generatedOtp, setGeneratedOtp] = useState('849201');
  const [timer, setTimer] = useState(120);
  const [isSending, setIsSending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [otpError, setOtpError] = useState('');
  const [copiedCode, setCopiedCode] = useState(false);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Fast test presets
  const DEMO_PRESETS = [
    { email: 'lawyer@sedrazavi.ir', label: 'وکیل دادگستری', role: 'lawyer' as const, name: ATTORNEY_INFO.name },
    { email: 'admin@sedrazavi.ir', label: 'مدیر فنی سایت', role: 'admin' as const, name: 'مدیریت ارشد سیستم' },
    { email: 'client@kimiapars.ir', label: 'موکل حقوقی', role: 'client' as const, name: 'شرکت کیمیا پارس' },
  ];

  // 120s timer countdown
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (step === 'otp' && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  // Focus first input on entering OTP step
  useEffect(() => {
    if (step === 'otp') {
      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 150);
    }
  }, [step]);

  const isValidEmail = (str: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str.trim());
  };

  const handleSendCode = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setEmailError('');

    if (!email.trim() || !isValidEmail(email)) {
      setEmailError('لطفاً یک آدرس ایمیل معتبر (مانند user@example.com) وارد فرمایید.');
      return;
    }

    setIsSending(true);

    setTimeout(() => {
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedOtp(code);
      setTimer(120);
      setOtpCode(['', '', '', '', '', '']);
      setIsSending(false);
      setStep('otp');
    }, 600);
  };

  const handleOtpInput = (index: number, val: string) => {
    const clean = val.replace(/[^0-9]/g, '');
    if (!clean && val) return;

    const newCode = [...otpCode];
    newCode[index] = clean.slice(-1);
    setOtpCode(newCode);
    setOtpError('');

    if (clean && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    const fullCode = newCode.join('');
    if (fullCode.length === 6) {
      verifyCode(fullCode);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpCode[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/[^0-9]/g, '').slice(0, 6);
    if (!pasted) return;

    const newCode = [...otpCode];
    for (let i = 0; i < 6; i++) {
      newCode[i] = pasted[i] || '';
    }
    setOtpCode(newCode);

    if (pasted.length === 6) {
      verifyCode(pasted);
    } else {
      inputRefs.current[pasted.length]?.focus();
    }
  };

  const verifyCode = (codeToCheck: string) => {
    setIsVerifying(true);
    setOtpError('');

    setTimeout(() => {
      setIsVerifying(false);
      // Valid if matches generated code or default demo 849201 or any 6 digit test
      if (codeToCheck === generatedOtp || codeToCheck === '849201' || codeToCheck.length === 6) {
        setStep('success');

        let determinedRole: 'lawyer' | 'admin' | 'client' = 'client';
        let determinedName = 'کاربر گرامی';

        const low = email.toLowerCase();
        if (low.includes('lawyer') || low.includes('sedrazavi')) {
          determinedRole = 'lawyer';
          determinedName = ATTORNEY_INFO.name;
        } else if (low.includes('admin')) {
          determinedRole = 'admin';
          determinedName = 'مدیریت ارشد سیستم';
        } else if (low.includes('kimia') || low.includes('client')) {
          determinedRole = 'client';
          determinedName = 'شرکت کیمیا پارس (موکل)';
        }

        setTimeout(() => {
          onLoginSuccess(email, determinedName, determinedRole);
        }, 900);
      } else {
        setOtpError('کد یکبار مصرف وارد شده صحیح نمی‌باشد. لطفاً کد ۶ رقمی ایمیل شده را بررسی نمایید.');
      }
    }, 600);
  };

  const handleAutoFillAndLogin = () => {
    const digits = generatedOtp.split('');
    setOtpCode(digits);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
    verifyCode(generatedOtp);
  };

  const formatTimer = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`text-right ${isModal ? '' : 'p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-xl max-w-lg mx-auto'}`}>
      
      {/* Header Info */}
      <div className="space-y-1.5 mb-6 text-center">
        <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-[#D4AF37]/30 text-[#D4AF37] flex items-center justify-center mx-auto mb-2 shadow-sm">
          <KeyRound className="w-6 h-6" />
        </div>
        <h3 className="text-base sm:text-lg font-bold font-serif text-[#0B132B] dark:text-white">
          {title}
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 max-w-sm mx-auto leading-relaxed">
          {subtitle}
        </p>
      </div>

      {/* STEP 1: EMAIL INPUT */}
      {step === 'email' && (
        <form onSubmit={handleSendCode} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300">
              آدرس پست الکترونیک (ایمیل شما):
            </label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError('');
                }}
                placeholder="name@example.com"
                dir="ltr"
                required
                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-gray-50 dark:bg-gray-800/80 border border-gray-300 dark:border-gray-700 text-sm focus:outline-none focus:border-[#D4AF37] dark:text-white transition-all font-mono"
              />
              <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" />
            </div>
            {emailError && (
              <p className="text-xs text-red-600 dark:text-red-400 flex items-center gap-1 mt-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{emailError}</span>
              </p>
            )}
          </div>

          {/* Quick Demo Accounts Helper */}
          <div className="pt-1 space-y-1.5">
            <div className="text-[11px] text-gray-400 font-medium">حساب‌های تستی آماده جهت بررسی فوری:</div>
            <div className="grid grid-cols-3 gap-2">
              {DEMO_PRESETS.map((preset) => (
                <button
                  key={preset.email}
                  type="button"
                  onClick={() => {
                    setEmail(preset.email);
                    setEmailError('');
                  }}
                  className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-[#D4AF37]/15 dark:hover:bg-[#D4AF37]/20 border border-gray-200 dark:border-gray-700 text-center transition-all text-xs"
                >
                  <div className="font-bold text-gray-800 dark:text-gray-200 text-[11px] truncate">{preset.label}</div>
                  <div className="text-[10px] text-gray-400 font-mono truncate">{preset.email.split('@')[0]}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSending}
            className="w-full btn-gold py-3.5 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-[#D4AF37]/20 hover:scale-[1.01] transition-all disabled:opacity-50 cursor-pointer"
          >
            {isSending ? (
              <>
                <RotateCcw className="w-4 h-4 animate-spin text-[#0B132B]" />
                <span>در حال ارسال رمز یکبار مصرف به ایمیل...</span>
              </>
            ) : (
              <>
                <Mail className="w-4 h-4 text-[#0B132B]" />
                <span>ارسال رمز یکبار مصرف به ایمیل</span>
                <ArrowLeft className="w-4 h-4 text-[#0B132B]" />
              </>
            )}
          </button>

          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="w-full text-center text-xs text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 py-2"
            >
              انصراف و بازگشت
            </button>
          )}
        </form>
      )}

      {/* STEP 2: VERIFICATION OTP CODE */}
      {step === 'otp' && (
        <div className="space-y-5">
          <div className="text-center space-y-1">
            <h4 className="text-sm font-bold text-gray-900 dark:text-white">
              کد ۶ رقمی ارسال‌شده به ایمیل را وارد فرمایید
            </h4>
            <div className="text-xs text-gray-500 font-mono" dir="ltr">
              کد به <span className="font-bold text-gray-800 dark:text-gray-200">{email}</span> ارسال شد
            </div>
          </div>

          {/* 6-Digit Boxes */}
          <div className="space-y-2">
            <div className="flex items-center justify-center gap-2 sm:gap-3" dir="ltr" onPaste={handlePaste}>
              {otpCode.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpInput(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className={`w-11 sm:w-13 h-13 sm:h-15 text-center text-xl sm:text-2xl font-bold font-mono rounded-2xl border-2 transition-all focus:outline-none ${
                    digit
                      ? 'border-[#D4AF37] bg-white dark:bg-[#0B132B] text-[#0B132B] dark:text-[#D4AF37] shadow-md ring-2 ring-[#D4AF37]/20'
                      : 'border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60 text-gray-900 dark:text-white focus:border-[#D4AF37]'
                  }`}
                />
              ))}
            </div>

            {otpError && (
              <p className="text-xs text-red-600 dark:text-red-400 text-center flex items-center justify-center gap-1 pt-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{otpError}</span>
              </p>
            )}
          </div>

          {/* Timer & Change Email */}
          <div className="flex items-center justify-between text-xs text-gray-500 pt-1">
            <button
              type="button"
              onClick={() => setStep('email')}
              className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-300 flex items-center gap-1 transition-colors"
            >
              <ArrowRight className="w-3.5 h-3.5" />
              <span>تغییر ایمیل</span>
            </button>

            {timer > 0 ? (
              <div className="flex items-center gap-1 font-mono text-gray-500">
                <Clock className="w-3.5 h-3.5 text-gray-400" />
                <span>اعتبار کد: {formatTimer(timer)}</span>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => handleSendCode()}
                className="text-[#AA820A] dark:text-[#D4AF37] font-bold flex items-center gap-1 hover:underline"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>ارسال مجدد کد</span>
              </button>
            )}
          </div>

          {/* Interactive Live Email Simulator */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent border border-[#D4AF37]/40 shadow-sm space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#AA820A] dark:text-[#F3E5AB]">
                <Inbox className="w-4 h-4 text-[#D4AF37]" />
                <span>شبیه‌ساز صندوق ورودی ایمیل شما (تست دمو):</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-600/15 text-emerald-700 dark:text-emerald-400 font-bold">
                تحویل داده شد
              </span>
            </div>

            <div className="p-3 rounded-xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="text-[11px] text-gray-500">فرستنده: auth@sedrazavi.ir</div>
                <div className="text-xl font-bold font-mono tracking-widest text-[#0B132B] dark:text-[#D4AF37]" dir="ltr">
                  {generatedOtp}
                </div>
              </div>

              <button
                type="button"
                onClick={handleAutoFillAndLogin}
                className="px-3 py-1.5 rounded-xl bg-[#0B132B] text-[#D4AF37] hover:bg-[#1C2541] border border-[#D4AF37]/50 text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>درج خودکار و ورود</span>
              </button>
            </div>
          </div>

          {/* Manual Verify Button */}
          <button
            type="button"
            onClick={() => verifyCode(otpCode.join(''))}
            disabled={isVerifying || otpCode.join('').length < 6}
            className="w-full btn-gold py-3.5 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-[#D4AF37]/20 transition-all disabled:opacity-50 cursor-pointer"
          >
            {isVerifying ? (
              <>
                <RotateCcw className="w-4 h-4 animate-spin text-[#0B132B]" />
                <span>در حال تایید کد...</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4 text-[#0B132B]" />
                <span>تأیید و ورود به پنل</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* STEP 3: SUCCESS */}
      {step === 'success' && (
        <div className="py-6 text-center space-y-3">
          <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-md">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <h4 className="text-base font-bold text-gray-900 dark:text-white">
            ورود موفقیت‌آمیز بود!
          </h4>
          <p className="text-xs text-gray-500">
            در حال بارگذاری میزکار اختصاصی شما...
          </p>
        </div>
      )}

    </div>
  );
};
