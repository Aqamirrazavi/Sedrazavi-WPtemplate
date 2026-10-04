import React from 'react';
import {
  Printer,
  X,
  Scale,
  Award,
  GraduationCap,
  Phone,
  Mail,
  MapPin,
  Globe,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  FileText,
} from 'lucide-react';
import { LawyerSiteProfile } from '../utils/lawyerCustomizationStorage';
import { ATTORNEY_INFO } from '../data/mockData';

interface LawyerPrintBioCardProps {
  isOpen: boolean;
  onClose: () => void;
  profile?: LawyerSiteProfile;
}

export const LawyerPrintBioCard: React.FC<LawyerPrintBioCardProps> = ({
  isOpen,
  onClose,
  profile,
}) => {
  if (!isOpen) return null;

  const lawyerName = profile?.lawyerName || ATTORNEY_INFO.name;
  const lawyerTitle = profile?.lawyerTitle || ATTORNEY_INFO.title;
  const licenseNumber = profile?.licenseNumber || ATTORNEY_INFO.licenseNumber;
  const portraitImage = profile?.portraitImage || ATTORNEY_INFO.portraitImage;
  const officeAddress = profile?.officeAddress || ATTORNEY_INFO.officeAddress;
  const officePhone = profile?.officePhone || ATTORNEY_INFO.phone;
  const officeMobile = profile?.officeMobile || ATTORNEY_INFO.mobile;
  const websiteUrl = profile?.websiteUrl || 'https://sedrazavi.ir';
  const email = 'info@sedrazavi.ir';

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      {/* Print-specific style rules */}
      <style>{`
        @media print {
          body * {
            visibility: hidden !important;
          }
          #uas-printable-lawyer-card,
          #uas-printable-lawyer-card * {
            visibility: visible !important;
          }
          #uas-printable-lawyer-card {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            min-height: 100% !important;
            padding: 32px !important;
            margin: 0 !important;
            background: #ffffff !important;
            color: #0f172a !important;
            box-shadow: none !important;
            border: 1px solid #cbd5e1 !important;
            z-index: 999999 !important;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden my-8 text-right">
        
        {/* Top Action Toolbar (Hidden in Print) */}
        <div className="no-print p-4 bg-gray-50 dark:bg-gray-800/80 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-gray-700 dark:text-gray-300">
            <Printer className="w-4 h-4 text-[#D4AF37]" />
            <span>پیش‌نمایش کارت بیوگرافی رسمی وکیل جهت ارائه به موکلین و مراجع</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="px-4 py-2 bg-[#0B132B] hover:bg-[#1C2541] text-[#D4AF37] border border-[#D4AF37]/50 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>ارسال به چاپگر / ذخیره PDF</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-white rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Profile Card Area */}
        <div className="p-6 sm:p-10 max-h-[80vh] overflow-y-auto bg-white">
          <div
            id="uas-printable-lawyer-card"
            className="border-2 border-[#D4AF37]/60 rounded-2xl p-8 bg-white text-[#0F172A] space-y-6 relative"
          >
            {/* Watermark Emblem */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
              <Scale className="w-96 h-96 text-[#0F172A]" />
            </div>

            {/* Official Header */}
            <div className="flex items-center justify-between border-b-2 border-[#D4AF37]/40 pb-5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#0B132B] text-[#D4AF37] flex items-center justify-center font-bold">
                  <Scale className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-base font-bold font-serif text-[#0B132B]">
                    کانون وکلای دادگستری مرکز
                  </h2>
                  <p className="text-xs text-gray-500">
                    دفتر تخصصی وکالت، داوری تجاری و مشاوره حقوقی
                  </p>
                </div>
              </div>

              <div className="text-left font-mono text-xs text-gray-600 space-y-1">
                <div>کد شناسه وکیل: <span className="font-bold text-[#0B132B]">{licenseNumber}</span></div>
                <div>تاریخ صدور پروانه: ۱۳۸۷/۰۴/۱۵</div>
                <div>وضعیت پروانه: <span className="text-emerald-700 font-bold">معتبر و دارای تمدید رسمی</span></div>
              </div>
            </div>

            {/* Lawyer Identity Section */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
              <div className="sm:col-span-3 flex justify-center">
                <div className="w-36 h-44 rounded-xl overflow-hidden border-2 border-[#D4AF37] shadow-md">
                  <img
                    src={portraitImage}
                    alt={lawyerName}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>

              <div className="sm:col-span-9 space-y-2">
                <div className="inline-block px-3 py-1 rounded-md bg-amber-50 border border-amber-200 text-xs font-bold text-amber-800">
                  وکیل پایه یک دادگستری و داور بین‌المللی
                </div>
                <h1 className="text-2xl font-bold font-serif text-[#0B132B]">
                  {lawyerName}
                </h1>
                <p className="text-xs text-gray-600 font-medium">
                  {lawyerTitle} · عضو رسمی کانون وکلای دادگستری مرکز
                </p>
                <p className="text-xs text-gray-700 leading-relaxed pt-1">
                  دانش‌آموخته مقطع دکترای حقوق خصوصی از دانشگاه تهران با بیش از ۱۶ سال سابقه تخصصی در وکالت دعاوی کلان ملکی، قراردادهای تجاری، فرجام‌خواهی در دیوان عالی کشور و داوری اختلافات بین‌المللی بازرگانی.
                </p>
              </div>
            </div>

            {/* Key Practice Areas Grid */}
            <div className="space-y-3 pt-3 border-t border-gray-200">
              <div className="text-xs font-bold text-[#0B132B] flex items-center gap-2">
                <Award className="w-4 h-4 text-[#D4AF37]" />
                <span>دپارتمان‌ها و حوزه‌های وکالت تخصصی:</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs text-gray-800">
                <div className="p-2.5 rounded-lg border border-gray-200 bg-gray-50 flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>دعاوی ملکی، ثبتی و سرقفلی</span>
                </div>
                <div className="p-2.5 rounded-lg border border-gray-200 bg-gray-50 flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>قراردادهای تجاری و داوری</span>
                </div>
                <div className="p-2.5 rounded-lg border border-gray-200 bg-gray-50 flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>فرجام‌خواهی در دیوان عالی</span>
                </div>
                <div className="p-2.5 rounded-lg border border-gray-200 bg-gray-50 flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>جرایم اقتصادی، بانکی و مالیاتی</span>
                </div>
                <div className="p-2.5 rounded-lg border border-gray-200 bg-gray-50 flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>حقوق شرکت‌ها و استارتاپ‌ها</span>
                </div>
                <div className="p-2.5 rounded-lg border border-gray-200 bg-gray-50 flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>داوری و حل اختلاف فرامرزی</span>
                </div>
              </div>
            </div>

            {/* Performance Indicators */}
            <div className="grid grid-cols-3 gap-3 pt-2 text-center">
              <div className="p-3 rounded-xl border border-gray-200 bg-gray-50/80">
                <div className="text-xl font-bold font-mono text-[#0B132B]">+۱۲۸۰</div>
                <div className="text-[11px] text-gray-500">پرونده‌های مختومه</div>
              </div>
              <div className="p-3 rounded-xl border border-gray-200 bg-gray-50/80">
                <div className="text-xl font-bold font-mono text-emerald-700">۹۶.۴٪</div>
                <div className="text-[11px] text-gray-500">نرخ موفقیت و پیروزی</div>
              </div>
              <div className="p-3 rounded-xl border border-gray-200 bg-gray-50/80">
                <div className="text-xl font-bold font-mono text-[#0B132B]">۱۶ سال</div>
                <div className="text-[11px] text-gray-500">تجربه مستمر حرفه‌ای</div>
              </div>
            </div>

            {/* Contact Details & Official Signature */}
            <div className="border-t-2 border-gray-200 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-600">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-gray-500" />
                  <span>نشانی دفتر: {officeAddress}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1 font-mono">
                    <Phone className="w-3 h-3 text-gray-500" /> {officePhone}
                  </span>
                  <span className="flex items-center gap-1 font-mono">
                    <Globe className="w-3 h-3 text-gray-500" /> {websiteUrl}
                  </span>
                </div>
              </div>

              {/* Signature Box */}
              <div className="border border-dashed border-gray-300 rounded-xl p-3 text-center min-w-[160px]">
                <div className="text-[10px] text-gray-400">محل امضاء و مهر دفتر وکالت</div>
                <div className="h-10 flex items-center justify-center font-serif text-[#0B132B] font-bold text-xs">
                  {lawyerName}
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
