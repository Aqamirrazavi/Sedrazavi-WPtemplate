import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Calendar,
  Send,
  CheckCircle2,
  ChevronLeft,
  Sparkles,
  ShieldCheck,
  MessageSquare,
} from 'lucide-react';
import { ATTORNEY_INFO } from '../data/mockData';
import { AttorneySocialAccounts } from './AttorneySocialAccounts';

interface ContactPageViewProps {
  onBackToHome: () => void;
}

export const ContactPageView: React.FC<ContactPageViewProps> = ({
  onBackToHome,
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    service: 'دعاوی ملکی و ثبتی',
    consultationType: 'حضوری در دفتر تهران (ونک)',
    date: 'روزهای زوج (شنبه، دوشنبه، چهارشنبه)',
    notes: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        fullName: '',
        phone: '',
        service: 'دعاوی ملکی و ثبتی',
        consultationType: 'حضوری در دفتر تهران (ونک)',
        date: 'روزهای زوج (شنبه، دوشنبه، چهارشنبه)',
        notes: '',
      });
    }, 5000);
  };

  return (
    <div className="py-12 sm:py-16 bg-[#F4F6F9] dark:bg-[#070D1E] min-h-screen text-[#0B132B] dark:text-gray-100 font-persian">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl space-y-12">
        {/* Breadcrumb */}
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-4">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            <button
              onClick={onBackToHome}
              className="hover:text-[#D4AF37] transition-colors"
            >
              صفحه اصلی
            </button>
            <ChevronLeft className="w-4 h-4" />
            <span className="text-[#0B132B] dark:text-[#F3E5AB] font-bold">
              تماس با دفتر وکالت و رزرو نوبت مشاوره
            </span>
          </div>

          <button
            onClick={onBackToHome}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-[#D4AF37] hover:text-[#0B132B] transition-all"
          >
            بازگشت به صفحه اصلی &rarr;
          </button>
        </div>

        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/15 text-[#D4AF37] dark:text-[#F3E5AB] text-xs font-bold border border-[#D4AF37]/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>پذیرش حضوری و برخط</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-serif font-black text-[#0B132B] dark:text-white">
            ارتباط مستقیم با دفتر وکالت دکتر سیده مریم رضوی
          </h1>

          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
            امکان رزرو نوبت مشاوره حضوری در دفتر ونک، مشاوره تصویری امن برای هموطنان خارج از کشور و پذیرش پرونده‌های کلان حقوقی
          </p>
        </div>

        {/* Contact Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-md text-right space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/15 text-[#D4AF37] flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-[#0B132B] dark:text-white">
              نشانی دفتر مرکزی
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              {ATTORNEY_INFO.officeAddress}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-md text-right space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/15 text-[#D4AF37] flex items-center justify-center">
              <Phone className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-[#0B132B] dark:text-white">
              خطوط تماس و هماهنگی
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              تلفن دفتر: ۰۲۱-۸۸۸۸۸۸۸۸
              <br />
              همراه منشی: ۰۹۱۲۳۴۵۶۷۸۹
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-md text-right space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/15 text-[#D4AF37] flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-[#0B132B] dark:text-white">
              ساعات پذیرش مراجعین
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              شنبه تا چهارشنبه: ۱۴:۰۰ الی ۲۰:۰۰
              <br />
              (با هماهنگی و تعیین وقت قبلی)
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-md text-right space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/15 text-[#D4AF37] flex items-center justify-center">
              <Mail className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-[#0B132B] dark:text-white">
              مکاتبات الکترونیک
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              info@sedrazavi-law.com
              <br />
              پاسخگویی سریع در ساعات اداری
            </p>
          </div>
        </div>

        {/* 2-Column: Form + Map info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Booking Form */}
          <div className="lg:col-span-7 rounded-3xl p-8 bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-xl text-right space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-bold font-serif text-[#0B132B] dark:text-white">
                فرم درخواست رزرو نوبت مشاوره حقوقی
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                پس از ثبت فرم، همکاران دفتر جهت هماهنگی ساعت دقیق با شما تماس خواهند گرفت.
              </p>
            </div>

            {isSubmitted ? (
              <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                <h3 className="text-base font-bold text-emerald-600 dark:text-emerald-400">
                  درخواست شما با موفقیت در سامانه ثبت شد!
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  کد رهگیری نوبت: SR-REQ-{Math.floor(1000 + Math.random() * 9000)} - منشی دفتر در اسرع وقت تماس خواهد گرفت.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                      نام و نام خانوادگی موکل:
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                      placeholder="مثال: سهراب رحیمی"
                      className="w-full px-4 py-2.5 rounded-xl text-xs bg-gray-50 dark:bg-[#070D1E] border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                      شماره تماس همراه:
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                      className="w-full px-4 py-2.5 rounded-xl text-xs bg-gray-50 dark:bg-[#070D1E] border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                      موضوع پرونده / خدمت:
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) =>
                        setFormData({ ...formData, service: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl text-xs bg-gray-50 dark:bg-[#070D1E] border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-white focus:outline-none focus:border-[#D4AF37]"
                    >
                      <option value="دعاوی ملکی و ثبتی">دعاوی ملکی و ثبتی</option>
                      <option value="دعاوی تجاری و قراردادها">دعاوی تجاری و قراردادها</option>
                      <option value="دعاوی کیفری و اقتصادی">دعاوی کیفری و اقتصادی</option>
                      <option value="حقوق خانواده و طلاق توافقی">حقوق خانواده و طلاق توافقی</option>
                      <option value="داوری بین‌المللی">داوری بین‌المللی</option>
                      <option value="تنظیم دادخواست و شکواییه">تنظیم دادخواست و شکواییه</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                      شیوه برگزاری مشاوره:
                    </label>
                    <select
                      value={formData.consultationType}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          consultationType: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2.5 rounded-xl text-xs bg-gray-50 dark:bg-[#070D1E] border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-white focus:outline-none focus:border-[#D4AF37]"
                    >
                      <option value="حضوری در دفتر تهران (ونک)">حضوری در دفتر تهران (ونک)</option>
                      <option value="مشاوره تلفنی مستقیم با وکیل">مشاوره تلفنی مستقیم با وکیل</option>
                      <option value="مشاوره ویدیویی امن (گوگل‌میت/واتساپ)">مشاوره ویدیویی امن (گوگل‌میت/واتساپ)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                    شرح مختصر خواسته حقوقی:
                  </label>
                  <textarea
                    rows={4}
                    value={formData.notes}
                    onChange={(e) =>
                      setFormData({ ...formData, notes: e.target.value })
                    }
                    placeholder="خلاصه‌ای از روند پرونده، اسناد موجود یا سوال اصلی خود را بنویسید..."
                    className="w-full px-4 py-2.5 rounded-xl text-xs bg-gray-50 dark:bg-[#070D1E] border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full btn-gold py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg hover:scale-[1.02] transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>ثبت نهایی و دریافت کد رهگیری وقت</span>
                </button>
              </form>
            )}
          </div>

          {/* Map and Office Guide */}
          <div className="lg:col-span-5 rounded-3xl p-8 bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-xl text-right space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="text-base font-bold font-serif text-[#0B132B] dark:text-white">
                دسترسی به دفتر وکالت ونک
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                دفتر در ضلع شمال شرقی میدان ونک واقع شده و به بزرگراه‌های شهید حقانی، مدرس و کردستان دسترسی مستقیم دارد. پارکینگ عمومی در فاصله ۲۰۰ متری دفتر مستقر می‌باشد.
              </p>

              {/* Map Illustration Box */}
              <div className="relative rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 h-52 flex items-center justify-center">
                <div className="absolute inset-0 opacity-25 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:16px_16px]"></div>
                <div className="relative text-center space-y-2 p-4">
                  <div className="w-10 h-10 rounded-full bg-[#D4AF37] text-[#0B132B] flex items-center justify-center mx-auto shadow-lg animate-bounce">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold text-[#0B132B] dark:text-white block">
                    میدان ونک، پلاک ۲۸، طبقه ۴
                  </span>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block text-[11px] text-[#D4AF37] hover:underline font-semibold"
                  >
                    مسیریابی با نشان و بلد &larr;
                  </a>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-[#070D1E] border border-gray-200 dark:border-gray-800 space-y-2">
              <span className="text-xs font-bold text-[#D4AF37] flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                توصیه پیش از حضور در جلسه:
              </span>
              <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed">
                لطفاً اصل یا تصویر کلیه قراردادها، دادخواست‌های پیشین و اسناد هویتی مرتبط را به همراه داشته باشید تا بررسی ماهوی با دقت کامل انجام پذیرد.
              </p>
            </div>
          </div>
        </div>

        {/* Dedicated Attorney Social Channels Section */}
        <div className="pt-8 border-t border-gray-200 dark:border-gray-800">
          <AttorneySocialAccounts
            layout="grid"
            title="پل‌های ارتباطی و شبکه‌های اجتماعی رسمی دفتر وکالت"
            subtitle="شما می‌توانید علاوه بر تماس تلفنی، از طریق پیام‌رسان‌ها و شبکه‌های اجتماعی رسمی با کارگروه حقوقی در ارتباط باشید"
          />
        </div>
      </div>
    </div>
  );
};
