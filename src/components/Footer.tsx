import React, { useState } from 'react';
import { Scale, Phone, Mail, MapPin, Send, CheckCircle2, Shield, Heart } from 'lucide-react';
import { ATTORNEY_INFO } from '../data/mockData';

export const Footer: React.FC = () => {
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
                دفتر وکالت و داوری SedRazavi
              </span>
            </div>
            
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
              دفتر وکالت و داوری حقوقی دکتر سیده مریم رضوی (SedRazavi)؛ پاسدار حقوق فردی و شرکتی با بیش از دو دهه تجربه درخشان در محاکم قضایی و مراجع داوری بین‌المللی.
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
                <span>{ATTORNEY_INFO.officeAddress}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                <span dir="ltr" className="font-mono text-white font-bold">{ATTORNEY_INFO.phone}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                <span className="text-gray-300">{ATTORNEY_INFO.email}</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div>
            <h4 className="text-base font-bold text-white mb-4 pb-2 border-b border-[#D4AF37]/30 inline-block font-serif">
              عضویت در خبرنامه حقوقی
            </h4>
            <p className="text-xs text-gray-400 mb-3">
              جدیدترین قوانین و نکات حقوقی را هر هفته در ایمیل خود دریافت کنید.
            </p>

            {newsletterSubscribed ? (
              <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>ایمیل شما با موفقیت ثبت گردید.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletter} className="space-y-2">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="آدرس ایمیل شما..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-gray-700 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]"
                />
                <button
                  type="submit"
                  className="btn-gold w-full py-2.5 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>عضویت در خبرنامه</span>
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <p>
            &copy; {new Date().getFullYear()} دفتر وکالت و داوری بین‌المللی SedRazavi. تمامی حقوق محفوظ است.
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
