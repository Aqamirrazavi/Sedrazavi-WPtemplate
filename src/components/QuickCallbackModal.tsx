import React, { useState } from 'react';
import {
  X,
  Phone,
  Send,
  CheckCircle2,
  Clock,
  Sparkles,
  MessageCircle,
  ExternalLink,
  Shield,
  FileQuestion,
  UserCheck
} from 'lucide-react';
import { ATTORNEY_INFO } from '../data/mockData';
import { normalizeIranPhone } from '../utils/clientAccountsStorage';
import { isValidIranMobile } from '../utils/persianNumberHelper';

interface QuickCallbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenOtpLogin?: () => void;
}

export const QuickCallbackModal: React.FC<QuickCallbackModalProps> = ({
  isOpen,
  onClose,
  onOpenOtpLogin,
}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [clientName, setClientName] = useState('');
  const [legalTopic, setLegalTopic] = useState('مشاوره تلفنی فوری');
  const [briefNote, setBriefNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedCode, setSubmittedCode] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPhoneError('');
    
    const normalized = normalizeIranPhone(phoneNumber);
    if (!normalized || !isValidIranMobile(normalized)) {
      setPhoneError('لطفاً شماره موبایل معتبر ۱۱ رقمی ایران (مثال: ۰۹۱۲۳۴۵۶۷۸۹) وارد فرمایید.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const refId = 'CB-' + Math.floor(100000 + Math.random() * 900000);
      setSubmittedCode(refId);
    }, 700);
  };

  const resetForm = () => {
    setSubmittedCode(null);
    setPhoneNumber('');
    setPhoneError('');
    setClientName('');
    setBriefNote('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white dark:bg-[#0B132B] rounded-3xl shadow-2xl border border-[#D4AF37]/30 overflow-hidden text-right">
        
        {/* Top Gradient Header */}
        <div className="bg-gradient-to-r from-[#0B132B] via-[#1C2541] to-[#0B132B] p-6 text-white relative border-b border-[#D4AF37]/20">
          <button
            onClick={resetForm}
            className="absolute top-4 left-4 w-11 h-11 flex items-center justify-center rounded-2xl bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors cursor-pointer"
            aria-label="بستن پنجره"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#AA820A] flex items-center justify-center text-white shadow-md shadow-[#D4AF37]/30">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <div className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold mb-1 border border-emerald-500/30">
                بدون نیاز به ثبت نام و بدون رمز عبور
              </div>
              <h3 className="text-base font-bold font-serif text-white">
                درخواست تماس فوری وکیل (خانم دکتر رضوی)
              </h3>
            </div>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[85vh] overflow-y-auto">

          {submittedCode ? (
            <div className="py-6 text-center space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-500 border border-emerald-500/40 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h4 className="text-lg font-bold text-[#0B132B] dark:text-white">
                  درخواست تماس شما با موفقیت ثبت شد
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed max-w-md mx-auto">
                  شماره پیگیری شما: <strong className="font-mono text-base text-[#D4AF37] px-2 py-0.5 bg-[#D4AF37]/10 rounded-lg">{submittedCode}</strong>
                  <br />
                  کارشناسان دفتر وکالت حداکثر ظرف <strong>۳۰ دقیقه آینده</strong> با شماره شما تماس خواهند گرفت.
                </p>
              </div>

              {/* Direct messaging shortcuts */}
              <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 text-right space-y-3">
                <p className="text-xs font-bold text-gray-800 dark:text-gray-200 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                  نیاز به ارتباط اضطراری در پیام‌رسان‌ها دارید؟
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <a
                    href="https://wa.me/989123456789"
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center justify-center gap-1.5 font-bold hover:bg-emerald-500/20"
                  >
                    <span>واتس‌اپ دفتر</span>
                  </a>
                  <a
                    href="https://t.me/SedRazavi_Law"
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20 flex items-center justify-center gap-1.5 font-bold hover:bg-sky-500/20"
                  >
                    <span>تلگرام مستقیم</span>
                  </a>
                  <a
                    href="https://eitaa.com/SedRazavi_Law"
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-xl bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20 flex items-center justify-center gap-1.5 font-bold hover:bg-amber-500/20"
                  >
                    <span>پیام‌رسان ایتا</span>
                  </a>
                  <a
                    href="https://ble.ir/SedRazavi_Law"
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-xl bg-teal-500/10 text-teal-700 dark:text-teal-300 border border-teal-500/20 flex items-center justify-center gap-1.5 font-bold hover:bg-teal-500/20"
                  >
                    <span>پیام‌رسان بله</span>
                  </a>
                </div>
              </div>

              <button
                type="button"
                onClick={resetForm}
                className="btn-gold px-8 py-2.5 rounded-xl text-xs font-bold"
              >
                متوجه شدم، بازگشت به سایت
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="p-3.5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40 text-amber-900 dark:text-amber-200 text-xs leading-relaxed">
                ⚖️ <strong>بدون هیچ‌گونه الزام به ثبت‌نام یا ارائه رمز:</strong> شماره همراه خود را بگذارید؛ وکیل یا مشاور حقوقی در اولین فرصت جهت هماهنگی با شما تماس خواهند گرفت.
              </div>

              {/* Phone field */}
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                  شماره تماس همراه شما (الزامی):
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    required
                    value={phoneNumber}
                    onChange={(e) => {
                      setPhoneNumber(e.target.value);
                      if (phoneError) setPhoneError('');
                    }}
                    placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                    dir="ltr"
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl border bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white font-mono text-sm focus:outline-none ${
                      phoneError
                        ? 'border-rose-500 focus:border-rose-500 ring-1 ring-rose-500'
                        : 'border-gray-300 dark:border-gray-700 focus:border-[#D4AF37]'
                    }`}
                  />
                  <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
                </div>
                {phoneError && (
                  <p className="mt-1.5 text-xs text-rose-500 dark:text-rose-400 font-bold flex items-center gap-1 animate-fadeIn">
                    <span>⚠️</span>
                    <span>{phoneError}</span>
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                    نام شریف شما (اختیاری):
                  </label>
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="مثال: آقای موسوی"
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                    موضوع حقوقی:
                  </label>
                  <select
                    value={legalTopic}
                    onChange={(e) => setLegalTopic(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value="مشاوره تلفنی فوری">مشاوره تلفنی فوری</option>
                    <option value="دعاوی ملکی و سرقفلی">دعاوی ملکی و سرقفلی</option>
                    <option value="دعاوی تجاری و شرکت‌ها">دعاوی تجاری و قراردادها</option>
                    <option value="دعاوی خانواده و انحصار وراثت">خانواده و ارث</option>
                    <option value="دعاوی کیفری و اقتصادی">کیفری و اقتصادی</option>
                    <option value="سایر موارد">سایر موضوعات حقوقی</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                  شرح مختصر مشکل یا پرونده (اختیاری):
                </label>
                <textarea
                  rows={2}
                  value={briefNote}
                  onChange={(e) => setBriefNote(e.target.value)}
                  placeholder="مثال: در مورد فسخ قرارداد خرید ملک نیاز به بررسی فوری دارم..."
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-gold w-full py-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-[#D4AF37]/20"
              >
                {isSubmitting ? (
                  <span>در حال ثبت اطلاعات...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>ارسال شماره و درخواست تماس تلفنی وکیل</span>
                  </>
                )}
              </button>

              {/* یا ارتباط مستقیم با پیام‌رسان‌ها */}
              <div className="pt-3 border-t border-gray-100 dark:border-gray-800 space-y-2">
                <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                  یا مستقیماً با وکیل در پیام‌رسان‌ها گفتگو نمایید:
                </p>
                <div className="grid grid-cols-4 gap-2">
                  <a
                    href="https://wa.me/989123456789"
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 text-[11px] font-bold flex flex-col items-center gap-1 hover:bg-emerald-500/20"
                  >
                    <span>واتس‌اپ</span>
                  </a>
                  <a
                    href="https://t.me/SedRazavi_Law"
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-xl bg-sky-500/10 text-sky-600 text-[11px] font-bold flex flex-col items-center gap-1 hover:bg-sky-500/20"
                  >
                    <span>تلگرام</span>
                  </a>
                  <a
                    href="https://eitaa.com/SedRazavi_Law"
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-xl bg-amber-500/10 text-amber-700 text-[11px] font-bold flex flex-col items-center gap-1 hover:bg-amber-500/20"
                  >
                    <span>ایتا</span>
                  </a>
                  <a
                    href={`tel:${ATTORNEY_INFO.phone}`}
                    className="p-2 rounded-xl bg-indigo-500/10 text-indigo-700 text-[11px] font-bold flex flex-col items-center gap-1 hover:bg-indigo-500/20"
                  >
                    <span>تماس مستقیم</span>
                  </a>
                </div>
              </div>

              {/* اگر مایل به پنل موکلین با پیامک هستند */}
              {onOpenOtpLogin && (
                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenOtpLogin();
                    }}
                    className="text-xs text-gray-500 hover:text-[#D4AF37] transition-colors"
                  >
                    موکل پرونده‌دار هستید؟ <span className="text-[#D4AF37] font-bold underline">ورود با پیامک یک‌بار مصرف به پرتال اسناد</span>
                  </button>
                </div>
              )}

            </form>
          )}

        </div>
      </div>
    </div>
  );
};
