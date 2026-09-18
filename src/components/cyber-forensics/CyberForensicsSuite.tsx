import React, { useState } from 'react';
import {
  ShieldAlert,
  FileCode2,
  AlertOctagon,
  Cpu,
  ArrowRight,
  Sparkles,
  PhoneCall,
  CheckCircle2,
  Lock,
  Binary
} from 'lucide-react';
import { DigitalEvidenceVault } from './DigitalEvidenceVault';
import { CybercrimeDefenseAdvisor } from './CybercrimeDefenseAdvisor';
import { SmartContractAuditLegal } from './SmartContractAuditLegal';

interface CyberForensicsSuiteProps {
  onBackToHome?: () => void;
  onOpenBooking?: () => void;
}

export const CyberForensicsSuite: React.FC<CyberForensicsSuiteProps> = ({
  onBackToHome,
  onOpenBooking
}) => {
  const [activeTab, setActiveTab] = useState<'evidence' | 'defense' | 'smart_contract'>('evidence');

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-[#060B18] text-[#0B132B] dark:text-gray-100 py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-200" dir="rtl">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Navigation & Header Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white dark:bg-[#0B132B] p-5 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
          <div className="flex items-center gap-3">
            {onBackToHome && (
              <button
                onClick={onBackToHome}
                className="p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 hover:bg-[#D4AF37] hover:text-[#060B18] transition-all cursor-pointer"
                title="بازگشت به صفحه اصلی"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300">
                  فاز ۱۰: جرایم سایبری و فارنزیک دیجیتال
                </span>
                <span className="text-xs text-gray-400">سامانه جامع استنادپذیری ادله الکترونیکی</span>
              </div>
              <h1 className="text-lg sm:text-xl font-bold font-serif text-[#0B132B] dark:text-white mt-1 flex items-center gap-2">
                <Binary className="w-5 h-5 text-[#D4AF37]" />
                کلینیک حقوقی جرم‌یابی دیجیتال، دادسرای فتا و امنیت قراردادهای هوشمند
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {onOpenBooking && (
              <button
                onClick={onOpenBooking}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#AA820A] text-[#060B18] font-bold text-xs shadow-md hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <PhoneCall className="w-4 h-4" />
                <span>مشاوره اضطراری پرونده سایبری</span>
              </button>
            )}
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-sm">
          <button
            onClick={() => setActiveTab('evidence')}
            className={`flex-1 min-w-[200px] py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'evidence'
                ? 'bg-gradient-to-r from-[#D4AF37] to-[#AA820A] text-[#060B18] shadow-md font-extrabold'
                : 'text-gray-600 dark:text-gray-400 hover:text-[#0B132B] dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800/60'
            }`}
          >
            <FileCode2 className="w-4 h-4" />
            <span>گاوصندوق ادله دیجیتال و زنجیره نگهداری (E-Evidence)</span>
          </button>

          <button
            onClick={() => setActiveTab('defense')}
            className={`flex-1 min-w-[200px] py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'defense'
                ? 'bg-gradient-to-r from-[#D4AF37] to-[#AA820A] text-[#060B18] shadow-md font-extrabold'
                : 'text-gray-600 dark:text-gray-400 hover:text-[#0B132B] dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800/60'
            }`}
          >
            <AlertOctagon className="w-4 h-4" />
            <span>مشاور مجازات‌ها، فیشینگ و خسارت تأخیر تأدیه فتا</span>
          </button>

          <button
            onClick={() => setActiveTab('smart_contract')}
            className={`flex-1 min-w-[200px] py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'smart_contract'
                ? 'bg-gradient-to-r from-[#D4AF37] to-[#AA820A] text-[#060B18] shadow-md font-extrabold'
                : 'text-gray-600 dark:text-gray-400 hover:text-[#0B132B] dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800/60'
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span>ممیزی قرارداد هوشمند و مسئولیت مدنی وب۳</span>
          </button>
        </div>

        {/* Tab Content Rendering */}
        <div className="transition-all duration-200">
          {activeTab === 'evidence' && <DigitalEvidenceVault />}
          {activeTab === 'defense' && <CybercrimeDefenseAdvisor onOpenBooking={onOpenBooking} />}
          {activeTab === 'smart_contract' && <SmartContractAuditLegal />}
        </div>
      </div>
    </div>
  );
};
