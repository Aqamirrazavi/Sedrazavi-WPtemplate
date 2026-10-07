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
  ExternalLink,
  Copy,
  Check,
  Inbox,
  Clock,
  AlertCircle,
  Scale,
  User,
  Shield,
  Eye,
} from 'lucide-react';
import { ATTORNEY_INFO } from '../data/mockData';

interface EmailOtpMagicLoginProps {
  onLoginSuccess: (email: string, userName: string, role: 'lawyer' | 'admin' | 'client') => void;
  onSwitchToPasswordLogin?: () => void;
  onClose?: () => void;
}

export const EmailOtpMagicLogin: React.FC<EmailOtpMagicLoginProps> = ({
  onLoginSuccess,
  onSwitchToPasswordLogin,
  onClose,
}) => {
  const [step, setStep] = useState<'email' | 'otp' | 'success'>('email');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [otpDigits, setOtpDigits] = useState<string[]>(['', '', '', '', '', '']);
  const [generatedOtp, setGeneratedOtp] = useState<string>('');
  const [rawOtpCode, setRawOtpCode] = useState<string>('');
  const [timer, setTimer] = useState<number>(120); // 2 minutes countdown
  const [isSending, setIsSending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [otpError, setOtpError] = useState('');
  const [showInboxSimulator, setShowInboxSimulator] = useState(true);
  const [copiedCode, setCopiedCode] = useState(false);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Email Presets for 1-click test in demo
  const DEMO_PRESETS = [
    { email: 'lawyer@sedrazavi.ir', label: 'وکیل دادگستری', role: 'lawyer' as const },
    { email: 'admin@sedrazavi.ir', label: 'مدیر فنی سایت', role: 'admin' as const },
    { email: 'client@kimiapars.ir', label: 'موکل شرکتی', role: 'client' as const },
  ];

  // Timer countdown
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (step === 'otp' && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  // Focus first input on step change
  useEffect(() => {
    if (step === 'otp') {
      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 150);
    }
  }, [step]);

  const isValidEmail = (emailStr: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailStr.trim());
  };

  const generate6DigitCode = () => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setRawOtpCode(code);
    // Persian formatted representation
    const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    const pCode = code.split('').map((d) => persianDigits[parseInt(d, 10)]).join('');
    setGeneratedOtp(pCode);
    return code;
  };

  const handleSendEmailOtp = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setEmailError('');

    if (!email.trim() || !isValidEmail(email)) {
      setEmailError('لطفاً یک آدرس ایمیل معتبر (مانند user@example.com) وارد فرمایید.');
      return;
    }

    setIsSending(true);

    setTimeout(() => {
      generate6DigitCode();
      setTimer(120);
      setOtpDigits(['', '', '', '', '', '']);
      setIsSending(false);
      setStep('otp');
      setShowInboxSimulator(true);
    }, 600);
  };

  const handleOtpChange = (index: number, value: string) => {
    // Only accept numeric
    const cleanVal = value.replace(/[^0-9]/g, '');
    if (!cleanVal && value) return;

    const newDigits = [...otpDigits];
    newDigits[index] = cleanVal.slice(-1);
    setOtpDigits(newDigits);
    setOtpError('');

    // Auto-advance
    if (cleanVal && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // If all 6 filled, trigger verification
    const fullCode = newDigits.join('');
    if (fullCode.length === 6) {
      triggerVerification(fullCode);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/[^0-9]/g, '').slice(0, 6);
    if (!pastedData) return;

    const newDigits = [...otpDigits];
    for (let i = 0; i < 6; i++) {
      newDigits[i] = pastedData[i] || '';
    }
    setOtpDigits(newDigits);

    if (pastedData.length === 6) {
      triggerVerification(pastedData);
    } else {
      inputRefs.current[pastedData.length]?.focus();
    }
  };

  const triggerVerification = (codeToVerify: string) => {
    setIsVerifying(true);
    setOtpError('');

    setTimeout(() => {
      setIsVerifying(false);
      // Verify against dynamically generated code
      if (rawOtpCode && codeToVerify === rawOtpCode) {
        setStep('success');

        // Determine role and name based on email
        let determinedRole: 'lawyer' | 'admin' | 'client' = 'client';
        let determinedName = 'کاربر گرامی';

        const lowerEmail = email.toLowerCase();
        if (lowerEmail.includes('lawyer') || lowerEmail.includes('sedrazavi')) {
          determinedRole = 'lawyer';
          determinedName = ATTORNEY_INFO.name;
        } else if (lowerEmail.includes('admin')) {
          determinedRole = 'admin';
          determinedName = 'مدیریت کل سیستم';
        } else if (lowerEmail.includes('kimia') || lowerEmail.includes('client')) {
          determinedRole = 'client';
          determinedName = 'شرکت کیمیا پارس (موکل)';
        }

        setTimeout(() => {
          onLoginSuccess(email, determinedName, determinedRole);
          if (onClose) onClose();
        }, 1000);
      } else {
        setOtpError('کد یکبار مصرف وارد شده نامعتبر یا منقضی است. لطفاً کد ۶ رقمی ایمیل شده را بررسی نمایید.');
      }
    }, 600);
  };

  const handleAutoFillAndLogin = () => {
    const digits = rawOtpCode.split('');
    setOtpDigits(digits);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
    triggerVerification(rawOtpCode);
  };

  const formatTimer = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6 text-right">
      
      {/* STEP 1: ENTER EMAIL */}
      {step === 'email' && (
        <form onSubmit={handleSendEmailOtp} className="space-y-5">
          <div className="space-y-1">
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300">
              آدرس پست الکترونیک (ایمیل):
            </label>
            <p className="text-[11px] text-gray-500 dark:text-gray-400">
              یک رمز عبور یکبار مصرف ۶ رقمی فوری به این ایمیل ارسال خواهد شد.
            </p>
          </div>

          {/* Email Input Field */}
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
            <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{emailError}</span>
            </div>
          )}

          {/* Demo 1-Click Fast Fill */}
          <div className="space-y-1.5 pt-1">
            <div className="text-[11px] text-gray-400 font-medium">حساب‌های آزمایشی سریع (یک‌کلیک):</div>
            <div className="grid grid-cols-3 gap-2">
              {DEMO_PRESETS.map((p) => (
                <button
                  key={p.email}
                  type="button"
                  onClick={() => {
                    setEmail(p.email);
                    setEmailError('');
                  }}
                  className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-[#D4AF37]/15 dark:hover:bg-[#D4AF37]/20 border border-gray-200 dark:border-gray-700 text-center transition-all text-xs"
                >
                  <div className="font-bold text-gray-800 dark:text-gray-200 text-[11px] truncate">{p.label}</div>
                  <div className="text-[10px] text-gray-500 font-mono truncate">{p.email.split('@')[0]}</div>
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
        </form>
      )}

      {/* STEP 2: ENTER OTP CODE */}
      {step === 'otp' && (
        <div className="space-y-6">
          <div className="text-center space-y-1">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-[#D4AF37] border border-[#D4AF37]/30 mb-2">
              <Mail className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-gray-900 dark:text-white">
              کد ۶ رقمی تأیید را وارد فرمایید
            </h4>
            <div className="flex items-center justify-center gap-1.5 text-xs text-gray-500 font-mono" dir="ltr">
              <span>کد به</span>
              <span className="font-bold text-gray-800 dark:text-gray-200">{email}</span>
              <span>ارسال شد</span>
            </div>
          </div>

          {/* 6-Digit OTP Box Grid */}
          <div className="space-y-3">
            <div className="flex items-center justify-center gap-2 sm:gap-3" dir="ltr" onPaste={handlePaste}>
              {otpDigits.map((digit, idx) => (
                <input
                  key={idx}
                  ref={(el) => (inputRefs.current[idx] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(idx, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(idx, e)}
                  className={`w-11 sm:w-13 h-13 sm:h-15 text-center text-xl sm:text-2xl font-bold font-mono rounded-2xl border-2 transition-all focus:outline-none ${
                    digit
                      ? 'border-[#D4AF37] bg-white dark:bg-[#0B132B] text-[#0B132B] dark:text-[#D4AF37] shadow-md ring-2 ring-[#D4AF37]/20'
                      : 'border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60 text-gray-900 dark:text-white focus:border-[#D4AF37]'
                  }`}
                />
              ))}
            </div>

            {otpError && (
              <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs flex items-center justify-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{otpError}</span>
              </div>
            )}
          </div>

          {/* Timer and Resend Actions */}
          <div className="flex items-center justify-between text-xs text-gray-500 pt-1">
            <button
              type="button"
              onClick={() => setStep('email')}
              className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-300 flex items-center gap-1 transition-colors"
            >
              <ArrowRight className="w-3.5 h-3.5" />
              <span>تغییر آدرس ایمیل</span>
            </button>

            {timer > 0 ? (
              <div className="flex items-center gap-1 font-mono text-gray-500">
                <Clock className="w-3.5 h-3.5 text-gray-400" />
                <span>زمان باقی‌مانده: {formatTimer(timer)}</span>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => handleSendEmailOtp()}
                className="text-[#AA820A] dark:text-[#D4AF37] font-bold flex items-center gap-1 hover:underline"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>ارسال مجدد کد یکبار مصرف</span>
              </button>
            )}
          </div>

          {/* LIVE SIMULATED INBOX PREVIEW (Super Clean UI/UX) */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-500/10 via-[#0B132B]/5 to-transparent dark:from-[#D4AF37]/10 dark:via-gray-800/40 border border-[#D4AF37]/40 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-[#AA820A] dark:text-[#F3E5AB]">
                <Inbox className="w-4 h-4 text-[#D4AF37]" />
                <span>شبیه‌ساز صندوق ورودی ایمیل شما (Live Demo Inbox)</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-600/15 text-emerald-700 dark:text-emerald-400 font-bold">
                ارسال موفقیت‌آمیز
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-700 space-y-2">
              <div className="flex items-center justify-between text-[11px] text-gray-500 border-b border-gray-100 dark:border-gray-800 pb-2">
                <span>فرستنده: auth@sedrazavi.ir</span>
                <span className="font-mono">همین الان</span>
              </div>
              <div className="text-xs font-bold text-[#0B132B] dark:text-white">
                🔐 کد یکبار مصرف ورود به سامانه وکالت SedRazavi
              </div>
              <p className="text-[11px] text-gray-600 dark:text-gray-400 leading-relaxed">
                سلام و احترام، کد ورود موقت و امن شما جهت ورود به پرتال به شرح زیر است:
              </p>
              
              <div className="flex items-center justify-between pt-1">
                <div className="text-2xl font-extrabold font-mono tracking-widest text-[#0B132B] dark:text-[#D4AF37] bg-gray-50 dark:bg-gray-800/80 px-4 py-1.5 rounded-xl border border-gray-200 dark:border-gray-700" dir="ltr">
                  {rawOtpCode}
                </div>
                
                <button
                  type="button"
                  onClick={handleAutoFillAndLogin}
                  className="px-3.5 py-2 rounded-xl bg-[#0B132B] text-[#D4AF37] hover:bg-[#1C2541] border border-[#D4AF37]/50 text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>درج خودکار و ورود فوری</span>
                </button>
              </div>
            </div>
          </div>

          {/* Manual Verify Button */}
          <button
            type="button"
            onClick={() => triggerVerification(otpDigits.join(''))}
            disabled={isVerifying || otpDigits.join('').length < 6}
            className="w-full btn-gold py-3.5 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-[#D4AF37]/20 transition-all disabled:opacity-50 cursor-pointer"
          >
            {isVerifying ? (
              <>
                <RotateCcw className="w-4 h-4 animate-spin text-[#0B132B]" />
                <span>در حال اعتبارسنجی کد...</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4 text-[#0B132B]" />
                <span>تأیید و ورود به سامانه</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* STEP 3: SUCCESS STATE */}
      {step === 'success' && (
        <div className="py-8 text-center space-y-3 animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h4 className="text-lg font-bold text-gray-900 dark:text-white">
            ورود موفقیت‌آمیز بود!
          </h4>
          <p className="text-xs text-gray-500">
            در حال انتقال شما به میزکار و پرتال مربوطه... لطفاً شکیبا باشید.
          </p>
        </div>
      )}

    </div>
  );
};
