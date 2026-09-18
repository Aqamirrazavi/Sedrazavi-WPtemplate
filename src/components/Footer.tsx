import React, { useState } from 'react';
import { Scale, Phone, Mail, MapPin, Send, CheckCircle2, Shield, Heart } from 'lucide-react';
import { ATTORNEY_INFO } from '../data/mockData';
import { LawyerSiteProfile } from '../utils/lawyerCustomizationStorage';
import { AttorneySocialAccounts } from './AttorneySocialAccounts';

interface FooterProps {
  profile?: LawyerSiteProfile;
  onOpenFinance?: () => void;
  onOpenPhase5?: () => void;
  onOpenPhase6?: () => void;
  onOpenPhase7?: () => void;
  onOpenPhase8?: () => void;
  onOpenPhase9?: () => void;
  onOpenPhase10?: () => void;
  onOpenPhase11?: () => void;
  onOpenPhase12?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ profile, onOpenFinance, onOpenPhase5, onOpenPhase6, onOpenPhase7, onOpenPhase8, onOpenPhase9, onOpenPhase10, onOpenPhase11, onOpenPhase12 }) => {
  const brandName = profile?.siteTitle || 'SedRazavi';
  const lawyerName = profile?.lawyerName || ATTORNEY_INFO.name;
  const address = profile?.officeAddress || ATTORNEY_INFO.officeAddress;
  const phone = profile?.phone || ATTORNEY_INFO.phone;
  const email = profile?.email || ATTORNEY_INFO.email;
  const whatsapp = profile?.whatsapp || 'https://wa.me/989123456789';
  const telegram = profile?.telegram || 'https://t.me/SedRazavi_Law';
  const eitaa = profile?.eitaa || 'https://eitaa.com/SedRazavi_Law';
  const bale = profile?.bale || 'https://ble.ir/SedRazavi_Law';

  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSubscribed(true);
      setTimeout(() => {
        setNewsletterSubscribed(false);
        setNewsletterEmail('');
      }, 3000);
    }
  };

  return (
    <footer className="bg-[#0B132B] text-white pt-16 pb-8 border-t border-[#D4AF37]/20 relative overflow-hidden">
      {/* Golden ambient background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-gray-800">
          
          {/* Col 1: About Firm & Badges */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#AA820A] flex items-center justify-center text-white shadow-md shadow-[#D4AF37]/20">
                <Scale className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold font-serif text-[#D4AF37]">
                دفتر وکالت و داوری {brandName}
              </span>
            </div>
            
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
              دفتر وکالت و داوری حقوقی {lawyerName} ({brandName})؛ پاسدار حقوق فردی و شرکتی با بیش از دو دهه تجربه درخشان در محاکم قضایی و مراجع داوری بین‌المللی.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-[#D4AF37]">
              <Shield className="w-3.5 h-3.5" />
              <span>پروانه رسمی کانون وکلای مرکز</span>
            </div>
          </div>

          {/* Col 2: Fast Access */}
          <div>
            <h4 className="text-base font-bold text-white mb-4 pb-2 border-b border-[#D4AF37]/30 inline-block font-serif">
              دسترسی سریع به خدمات
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-gray-400">
              <li>
                <a href="#services" className="hover:text-[#D4AF37] transition-colors flex items-center gap-2">
                  <span className="text-[#D4AF37]">‹</span> دعاوی تجاری و شرکت‌ها
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#D4AF37] transition-colors flex items-center gap-2">
                  <span className="text-[#D4AF37]">‹</span> دعاوی ملکی، ثبتی و سرقفلی
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#D4AF37] transition-colors flex items-center gap-2">
                  <span className="text-[#D4AF37]">‹</span> حقوق خانواده و انحصار وراثت
                </a>
              </li>
              <li>
                <a href="#cases" className="hover:text-[#D4AF37] transition-colors flex items-center gap-2">
                  <span className="text-[#D4AF37]">‹</span> سامانه پیگیری پرونده موکلین
                </a>
              </li>
              <li>
                <a href="#booking" className="hover:text-[#D4AF37] transition-colors flex items-center gap-2">
                  <span className="text-[#D4AF37]">‹</span> رزرو وقت مشاوره حضوری
                </a>
              </li>
              {onOpenFinance && (
                <li>
                  <button
                    onClick={onOpenFinance}
                    className="hover:text-[#D4AF37] transition-colors flex items-center gap-2 text-right"
                  >
                    <span className="text-[#D4AF37]">‹</span> میز محاسبات قضایی، قرارداد و پرداخت (فاز ۴)
                  </button>
                </li>
              )}
              {onOpenPhase5 && (
                <li>
                  <button
                    onClick={onOpenPhase5}
                    className="hover:text-[#D4AF37] transition-colors flex items-center gap-2 text-right text-indigo-300 font-semibold"
                  >
                    <span className="text-[#D4AF37]">⚖️</span> مرکز داوری آنلاین، دادگاه مجازی و لوایح (فاز ۵)
                  </button>
                </li>
              )}
              {onOpenPhase6 && (
                <li>
                  <button
                    onClick={onOpenPhase6}
                    className="hover:text-[#D4AF37] transition-colors flex items-center gap-2 text-right text-amber-300 font-bold"
                  >
                    <span className="text-[#D4AF37]">⚡</span> هوش حقوقی، ممیزی قرارداد و تنقیح آراء (فاز ۶)
                  </button>
                </li>
              )}
              {onOpenPhase7 && (
                <li>
                  <button
                    onClick={onOpenPhase7}
                    className="hover:text-[#D4AF37] transition-colors flex items-center gap-2 text-right text-[#D4AF37] font-bold"
                  >
                    <span className="text-[#D4AF37]">🛡️</span> استراتژی دادرسی، مواعد قانونی و گاوصندوق اسناد (فاز ۷)
                  </button>
                </li>
              )}
              {onOpenPhase8 && (
                <li>
                  <button
                    onClick={onOpenPhase8}
                    className="hover:text-[#D4AF37] transition-colors flex items-center gap-2 text-right text-blue-400 font-bold"
                  >
                    <span className="text-[#D4AF37]">🌐</span> امور شرکت‌ها، اینکوترمز ۲۰۲۰ و داوری بازرگانی بین‌الملل (فاز ۸)
                  </button>
                </li>
              )}
              {onOpenPhase9 && (
                <li>
                  <button
                    onClick={onOpenPhase9}
                    className="hover:text-[#D4AF37] transition-colors flex items-center gap-2 text-right text-[#D4AF37] font-bold"
                  >
                    <span className="text-[#D4AF37]">💡</span> مالکیت فکری، استارتاپ‌ها، طبقات نیس و لایسنس نرم‌افزار (فاز ۹)
                  </button>
                </li>
              )}
              {onOpenPhase10 && (
                <li>
                  <button
                    onClick={onOpenPhase10}
                    className="hover:text-rose-400 transition-colors flex items-center gap-2 text-right text-rose-400 font-bold"
                  >
                    <span className="text-rose-400">🔒</span> جرایم سایبری، ادله دیجیتال و امنیت قراردادهای هوشمند (فاز ۱۰)
                  </button>
                </li>
              )}
              {onOpenPhase11 && (
                <li>
                  <button
                    onClick={onOpenPhase11}
                    className="hover:text-amber-400 transition-colors flex items-center gap-2 text-right text-amber-400 font-bold"
                  >
                    <span className="text-amber-400">🛡️</span> سامانه مبارزه با پولشویی (AML)، انطباق بانکی و تحریم‌ها (فاز ۱۱)
                  </button>
                </li>
              )}
              {onOpenPhase12 && (
                <li>
                  <button
                    onClick={onOpenPhase12}
                    className="hover:text-[#D4AF37] transition-colors flex items-center gap-2 text-right text-[#D4AF37] font-bold"
                  >
                    <span className="text-[#D4AF37]">🏢</span> دعاوی ملکی، سرقفلی و مشارکت در ساخت (فاز ۱۲)
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Col 3: Contact Info */}
          <div>
            <h4 className="text-base font-bold text-white mb-4 pb-2 border-b border-[#D4AF37]/30 inline-block font-serif">
              اطلاعات تماس دفتر
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm text-gray-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-1" />
                <span>{address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                <span dir="ltr" className="font-mono text-white font-bold">{phone}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                <span className="text-gray-300">{email}</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Quick Callback Without Registration (Priority #1) */}
          <div>
            <h4 className="text-base font-bold text-white mb-2 pb-2 border-b border-[#D4AF37]/30 inline-block font-serif">
              درخواست تماس وکیل (بدون ثبت‌نام)
            </h4>
            <p className="text-xs text-gray-400 mb-3 leading-relaxed">
              شماره همراه خود را وارد کنید تا کارشناسان دفتر در اسرع وقت جهت مشاوره با شما تماس بگیرند:
            </p>

            {newsletterSubscribed ? (
              <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>شماره شما با موفقیت ثبت شد؛ به زودی با شما تماس می‌گیریم.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletter} className="space-y-2">
                <input
                  type="tel"
                  required
                  dir="ltr"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="شماره تماس همراه: ۰۹۱۲۳۴۵۶۷۸۹"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-gray-700 text-xs text-white placeholder-gray-400 font-mono focus:outline-none focus:border-[#D4AF37]"
                />
                <button
                  type="submit"
                  className="btn-gold w-full py-2.5 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-md shadow-[#D4AF37]/20"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>ثبت شماره و درخواست تماس وکیل</span>
                </button>
              </form>
            )}

            {/* Quick messengers shortcut */}
            <div className="mt-4 pt-3 border-t border-gray-800">
              <span className="block text-[11px] text-[#F3E5AB] mb-2 font-bold">
                پیام‌رسان‌های پاسخگویی سریع:
              </span>
              <div className="flex flex-wrap gap-2 text-[11px]">
                <a
                  href={whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="px-2 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/20 font-bold"
                >
                  واتس‌اپ
                </a>
                <a
                  href={telegram}
                  target="_blank"
                  rel="noreferrer"
                  className="px-2 py-1 rounded-lg bg-sky-500/10 text-sky-400 hover:bg-sky-500/20 border border-sky-500/20 font-bold"
                >
                  تلگرام
                </a>
                <a
                  href={eitaa}
                  target="_blank"
                  rel="noreferrer"
                  className="px-2 py-1 rounded-lg bg-amber-500/10 text-amber-300 hover:bg-amber-500/20 border border-amber-500/20 font-bold"
                >
                  ایتا
                </a>
                <a
                  href={bale}
                  target="_blank"
                  rel="noreferrer"
                  className="px-2 py-1 rounded-lg bg-teal-500/10 text-teal-300 hover:bg-teal-500/20 border border-teal-500/20 font-bold"
                >
                  بله
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Official Attorney Social Media Channels */}
        <div className="py-10 border-b border-gray-800">
          <AttorneySocialAccounts
            layout="grid"
            title={`پل‌های ارتباطی و شبکه‌های اجتماعی رسمی ${lawyerName}`}
            subtitle="جهت مشاهده آموزش‌های ویدیویی حقوقی، استوری‌های روز و ارسال مدارک پرونده"
          />
        </div>

        {/* Designer Credits - Mandated in SPEC Part 1 Section 7 & ROADMAP */}
        <div className="pt-8 pb-4 border-t border-gray-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-3">
          <div className="flex items-center gap-2">
            <span>طراحی و توسعه توسط</span>
            <span className="text-[#D4AF37] font-bold">سید امیر حسین رضوی فردویی</span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <a
              href="https://t.me/sedrazavi"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-gray-300 hover:text-[#D4AF37] transition-colors"
            >
              <span className="w-2 h-2 rounded-full bg-sky-500 inline-block"></span>
              <span>تلگرام: @sedrazavi</span>
            </a>
            <span className="text-gray-700">|</span>
            <a
              href="https://eitaa.com/sedrazavi"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-gray-300 hover:text-[#D4AF37] transition-colors"
            >
              <span className="w-2 h-2 rounded-full bg-amber-500 inline-block"></span>
              <span>ایتا: @sedrazavi</span>
            </a>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <p>
            &copy; {new Date().getFullYear()} دفتر وکالت و داوری بین‌المللی {brandName}. تمامی حقوق محفوظ است.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-[#D4AF37] transition-colors">سیاست حریم خصوصی</a>
            <a href="#" className="hover:text-[#D4AF37] transition-colors">قوانین و مقررات</a>
            <a href="#" className="hover:text-[#D4AF37] transition-colors">منشور اخلاق حرفه‌ای</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
