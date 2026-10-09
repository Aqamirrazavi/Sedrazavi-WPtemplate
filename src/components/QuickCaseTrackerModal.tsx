import React, { useState } from 'react';
import { CASES_INITIAL_DATA } from '../data/mockData';
import { CaseItem } from '../types/theme';
import {
  Scale,
  Search,
  CheckCircle2,
  Clock,
  AlertTriangle,
  FileText,
  Calendar,
  X,
  Phone,
  ShieldCheck,
  User,
  ArrowRight,
  ExternalLink,
  ChevronLeft
} from 'lucide-react';

interface QuickCaseTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenConsultation?: () => void;
}

export const QuickCaseTrackerModal: React.FC<QuickCaseTrackerModalProps> = ({
  isOpen,
  onClose,
  onOpenConsultation,
}) => {
  const [caseCodeInput, setCaseCodeInput] = useState('');
  const [clientPhoneInput, setClientPhoneInput] = useState('');
  const [searchedCase, setSearchedCase] = useState<{
    caseNumber: string;
    caseType: string;
    status: string;
    courtBranch?: string;
    nextCourtSession?: string;
    updatedAt?: string;
  } | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    setSearchError(null);
    setSearchedCase(null);

    const trimmedCode = caseCodeInput.trim();
    const trimmedPhone = clientPhoneInput.trim().replace(/[^\d]/g, '');

    if (!trimmedCode) {
      setSearchError('لطفاً شماره پرونده یا کدرهگیری را وارد نمایید.');
      return;
    }

    if (!trimmedPhone) {
      setSearchError('لطفاً شماره تماس ثبت‌شده موکل را جهت استعلام وارد نمایید.');
      return;
    }

    // Lookup in cases data strictly requiring phone match
    const found = CASES_INITIAL_DATA.find((c) => {
      const codeMatches = c.caseNumber.includes(trimmedCode) || c.id.toLowerCase() === trimmedCode.toLowerCase();
      const phoneDigits = c.clientPhone.replace(/[^\d]/g, '');
      const phoneMatches = phoneDigits && trimmedPhone && (phoneDigits.endsWith(trimmedPhone.slice(-4)) || trimmedPhone.endsWith(phoneDigits.slice(-4)));
      return codeMatches && phoneMatches;
    });

    if (found) {
      // Return strictly low-sensitivity fields
      setSearchedCase({
        caseNumber: found.caseNumber,
        caseType: found.caseType,
        status: found.status,
        courtBranch: 'شعبه دادگاه عمومی حقوقی',
        nextCourtSession: found.nextCourtSession,
        updatedAt: found.registrationDate,
      });
    } else {
      // Truthful response: Unknown case -> found: false (No fake demonstration fallback)
      setSearchError('پرونده‌ای با این شماره کلاسه و شماره تماس در سامانه یافت نشد.');
      setSearchedCase(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in font-persian">
      <div className="bg-white dark:bg-[#0B132B] rounded-3xl max-w-xl w-full border border-gray-200 dark:border-gray-800 shadow-2xl overflow-hidden animate-scale-up">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-amber-500/10 via-[#D4AF37]/15 to-transparent border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="p-2.5 rounded-2xl bg-[#D4AF37] text-[#0B132B]">
              <Scale className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-base font-bold text-[#0B132B] dark:text-white">
                سامانه استعلام و پیگیری لحظه‌ای پرونده‌های قضایی
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                دفتر وکالت و داوری دکتر سیده مریم رضوی و همکاران
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-gray-400 hover:text-gray-600 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Inquiry Form */}
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                  شماره پرونده یا کدرهگیری سامانه:
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="مثال: ۱۴۰۳-۸۹۲۱ یا 101"
                    value={caseCodeInput}
                    onChange={(e) => setCaseCodeInput(e.target.value)}
                    className="w-full p-2.5 pl-9 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs text-gray-800 dark:text-gray-200 focus:outline-none focus:border-[#D4AF37]"
                  />
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                  شماره همراه ثبت‌شده موکل (جهت تایید هویت):
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    required
                    placeholder="مثال: ۰۹۱۲۳۴۵۶۷۸۹"
                    value={clientPhoneInput}
                    onChange={(e) => setClientPhoneInput(e.target.value)}
                    className="w-full p-2.5 pl-9 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs text-gray-800 dark:text-gray-200 focus:outline-none focus:border-[#D4AF37]"
                  />
                  <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-[11px] text-gray-500 dark:text-gray-400">
                🔒 تطبیق محرمانه شماره پرونده با شماره تماس موکل
              </span>
              <button
                type="submit"
                className="py-2.5 px-6 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B8960F] text-[#0B132B] font-bold text-xs hover:brightness-105 shadow-md flex items-center gap-2"
              >
                <Search className="w-4 h-4" />
                <span>استعلام وضعیت پرونده</span>
              </button>
            </div>
          </form>

          {/* Search Result Box (Strictly Low-Sensitivity Fields) */}
          {hasSearched && searchedCase && (
            <div className="p-5 rounded-2xl bg-amber-500/5 dark:bg-[#D4AF37]/10 border border-[#D4AF37]/30 space-y-4 animate-fade-in text-xs">
              <div className="flex items-center justify-between pb-3 border-b border-[#D4AF37]/20">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span className="font-bold text-gray-800 dark:text-white">
                    پرونده کلاسه: <span className="font-mono text-[#D4AF37]">{searchedCase.caseNumber}</span>
                  </span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-blue-500/15 text-blue-600 dark:text-blue-400 font-bold text-[11px]">
                  وضعیت: {searchedCase.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-gray-600 dark:text-gray-300">
                <div>
                  <span className="text-gray-400">موضوع پرونده:</span>{' '}
                  <span className="font-bold text-gray-800 dark:text-white">{searchedCase.caseType}</span>
                </div>
                <div>
                  <span className="text-gray-400">مرجع رسیدگی:</span>{' '}
                  <span className="font-bold text-gray-800 dark:text-white">{searchedCase.courtBranch}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-gray-400">جلسه یا اقدام قضایی آتی:</span>{' '}
                  <span className="font-bold text-amber-700 dark:text-[#F3E5AB]">
                    {searchedCase.nextCourtSession || 'در نوبت تعیین وقت'}
                  </span>
                </div>
                {searchedCase.updatedAt && (
                  <div className="col-span-2">
                    <span className="text-gray-400">آخرین تاریخ به‌روزرسانی:</span>{' '}
                    <span className="font-mono">{searchedCase.updatedAt}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {searchError && (
            <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-700 dark:text-red-400 text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{searchError}</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 dark:bg-gray-800/80 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between text-xs">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            بستن پنجره
          </button>

          {onOpenConsultation && (
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenConsultation();
              }}
              className="px-4 py-2 rounded-xl bg-[#D4AF37]/20 text-[#AA820A] dark:text-[#F3E5AB] hover:bg-[#D4AF37]/30 font-bold flex items-center gap-1.5 transition-colors"
            >
              <span>درخواست مشاوره فوری با وکیل</span>
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
