import React, { useState } from 'react';
import {
  Calculator,
  FileText,
  CreditCard,
  Bot,
  Scale,
  Sparkles,
  ShieldCheck,
  Building2,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import { CourtFeeCalculator } from './CourtFeeCalculator';
import { DigitalContractModal } from './DigitalContractModal';
import { LegalPaymentInvoice } from './LegalPaymentInvoice';
import { LegalAiAdvisor } from './LegalAiAdvisor';

interface LegalFinancialSuiteProps {
  onOpenBooking?: () => void;
  onOpenCaseTracker?: () => void;
}

export const LegalFinancialSuite: React.FC<LegalFinancialSuiteProps> = ({
  onOpenBooking,
  onOpenCaseTracker,
}) => {
  const [activeTab, setActiveTab] = useState<'calculator' | 'contract' | 'checkout' | 'ai_screener'>('calculator');

  return (
    <div className="py-10 bg-[#F4F6F9] dark:bg-[#070D1E] min-h-screen text-right" dir="rtl">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Hero Banner of Legal Financial Suite */}
        <div className="bg-gradient-to-r from-[#0B132B] via-[#162238] to-[#0B132B] rounded-3xl p-8 sm:p-10 border border-[#D4AF37]/30 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-bold">
              <Scale className="w-3.5 h-3.5" />
              <span>فاز ۴: سامانه جامع امور مالی، قراردادها و هوش مصنوعی حقوقی</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-bold font-serif leading-tight">
              میز تخصصی محاسبات قضایی، قرارداد الکترونیک و پرداخت‌های وکالت
            </h1>

            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed max-w-2xl">
              مجموعه‌ای کامل از ابزارهای آنلاین بر پایه استانداردهای کانون وکلای دادگستری و قوه قضاییه، شامل محاسبه‌گر تمبر مالیاتی و هزینه دادرسی، انعقاد قرارداد آنلاین با امضای دیجیتال قلمی، صدور صورتحساب مالیاتی و هوش مصنوعی غربالگری دعاوی.
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-2 rounded-2xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-md">
          <button
            onClick={() => setActiveTab('calculator')}
            className={`py-3.5 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
              activeTab === 'calculator'
                ? 'bg-gradient-to-r from-[#D4AF37] to-[#AA820A] text-white shadow-md'
                : 'text-gray-600 dark:text-gray-300 hover:text-[#D4AF37]'
            }`}
          >
            <Calculator className="w-4 h-4" />
            <span>۱. محاسبه‌گر دادرسی و تعرفه</span>
          </button>

          <button
            onClick={() => setActiveTab('contract')}
            className={`py-3.5 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
              activeTab === 'contract'
                ? 'bg-gradient-to-r from-[#D4AF37] to-[#AA820A] text-white shadow-md'
                : 'text-gray-600 dark:text-gray-300 hover:text-[#D4AF37]'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>۲. قرارداد و امضای دیجیتال</span>
          </button>

          <button
            onClick={() => setActiveTab('checkout')}
            className={`py-3.5 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
              activeTab === 'checkout'
                ? 'bg-gradient-to-r from-[#D4AF37] to-[#AA820A] text-white shadow-md'
                : 'text-gray-600 dark:text-gray-300 hover:text-[#D4AF37]'
            }`}
          >
            <CreditCard className="w-4 h-4" />
            <span>۳. پرداخت آنلاین و فاکتور</span>
          </button>

          <button
            onClick={() => setActiveTab('ai_screener')}
            className={`py-3.5 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
              activeTab === 'ai_screener'
                ? 'bg-gradient-to-r from-[#D4AF37] to-[#AA820A] text-white shadow-md'
                : 'text-gray-600 dark:text-gray-300 hover:text-[#D4AF37]'
            }`}
          >
            <Bot className="w-4 h-4" />
            <span>۴. دستیار هوشمند حقوقی</span>
          </button>
        </div>

        {/* Tab Content Display */}
        <div>
          {activeTab === 'calculator' && <CourtFeeCalculator />}
          {activeTab === 'contract' && <DigitalContractModal />}
          {activeTab === 'checkout' && <LegalPaymentInvoice />}
          {activeTab === 'ai_screener' && <LegalAiAdvisor onOpenBooking={onOpenBooking} />}
        </div>
      </div>
    </div>
  );
};
