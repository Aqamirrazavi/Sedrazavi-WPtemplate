import React from 'react';
import { ServiceItem } from '../types/theme';
import { X, CheckCircle, Clock, DollarSign, FileText, ArrowLeft, Calendar } from 'lucide-react';

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onBook: (serviceTitle: string) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  onBook,
}) => {
  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white dark:bg-[#0B132B] rounded-2xl shadow-2xl border border-[#D4AF37]/40 overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Header with image */}
        <div className="relative h-48 bg-gray-900 overflow-hidden">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          
          <button
            onClick={onClose}
            className="absolute top-4 left-4 p-2 rounded-full bg-black/60 text-white hover:bg-black hover:text-red-400 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 right-6 left-6 text-white space-y-1">
            <span className="inline-block px-3 py-1 rounded-full bg-[#D4AF37] text-[#0B132B] font-bold text-xs">
              خدمت تخصصی حقوقی
            </span>
            <h3 className="text-xl sm:text-2xl font-bold font-serif text-white">
              {service.title}
            </h3>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-right">
          
          {/* Summary / Description */}
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              شرح تفصیلی خدمت و حدود مسئولیت
            </h4>
            <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
              {service.fullDescription}
            </p>
          </div>

          {/* Quick Metrics Bar (Fee & Duration) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-[#D4AF37]/15 text-[#AA820A] dark:text-[#F3E5AB]">
                <DollarSign className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-xs text-gray-400">حق‌الوکاله و هزینه پایه:</span>
                <span className="text-sm font-bold text-gray-900 dark:text-white">{service.estimatedFee}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-[#2A9D8F]/15 text-[#2A9D8F]">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-xs text-gray-400">مدت زمان تقریبی رسیدگی:</span>
                <span className="text-sm font-bold text-gray-900 dark:text-white">{service.duration}</span>
              </div>
            </div>
          </div>

          {/* Required Documents Checklist */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#D4AF37]" />
              مدارک و اسناد مورد نیاز جهت تشکیل پرونده:
            </h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300 pr-2">
              {service.requiredDocs.map((doc, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-[#2A9D8F] flex-shrink-0 mt-0.5" />
                  <span>{doc}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:px-6 bg-gray-50 dark:bg-[#070D1E] border-t border-gray-200 dark:border-gray-800 flex items-center justify-between gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-xs font-semibold hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            بستن پنجره
          </button>

          <button
            onClick={() => {
              onClose();
              onBook(service.title);
            }}
            className="btn-gold px-6 py-2.5 text-xs sm:text-sm font-semibold flex items-center gap-2 rounded-xl"
          >
            <Calendar className="w-4 h-4" />
            رزرو وقت مشاوره برای این خدمت
          </button>
        </div>

      </div>
    </div>
  );
};
