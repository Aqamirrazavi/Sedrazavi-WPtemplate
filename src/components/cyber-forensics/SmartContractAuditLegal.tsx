import React, { useState } from 'react';
import {
  Cpu,
  Coins,
  ShieldCheck,
  AlertTriangle,
  Code2,
  CheckCircle2,
  ExternalLink,
  Lock,
  FileCode,
  Layers,
  Sparkles
} from 'lucide-react';
import { SMART_CONTRACT_AUDIT_RULES } from '../../data/mockData';
import { SmartContractAuditRule } from '../../types/theme';

export const SmartContractAuditLegal: React.FC = () => {
  const [selectedAudit, setSelectedAudit] = useState<SmartContractAuditRule>(SMART_CONTRACT_AUDIT_RULES[0]);
  const [analyzingCode, setAnalyzingCode] = useState(false);
  const [customSoliditySnippet, setCustomSoliditySnippet] = useState(`// نمونه قرارداد هوشمند توکن / خزانه‌داری
contract Vault {
    mapping(address => uint) public balances;

    function withdraw() public {
        uint bal = balances[msg.sender];
        require(bal > 0);
        (bool sent, ) = msg.sender.call{value: bal}("");
        require(sent, "Failed to send Ether");
        balances[msg.sender] = 0; // ریسک بازورودی (Reentrancy Bug)!
    }
}`);
  const [auditReport, setAuditReport] = useState<string | null>(null);

  const handleRunSecurityAudit = () => {
    setAnalyzingCode(true);
    setAuditReport(null);
    setTimeout(() => {
      setAnalyzingCode(false);
      setAuditReport('هشدار بحرانی (Critical Vulnerability): آسیب‌پذیری Reentrancy در خط call{value: bal} شناسایی شد. پیش از صفر کردن موجودی، فراخوانی خارجی صورت گرفته است. مسئولیت مدنی و جبران خسارت بر عهده تیم توسعه‌دهنده به دلیل اهمال در رعایت استاندارد Checks-Effects-Interactions می‌باشد.');
    }, 1200);
  };

  return (
    <div className="space-y-6" dir="rtl">
      {/* Header Info */}
      <div className="bg-white dark:bg-[#0B132B] p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-indigo-600 dark:text-indigo-400 font-semibold mb-1">
              <Cpu className="w-4 h-4" />
              <span>فناوری دفترکل توزیع‌شده (DLT)، وب۳ و قراردادهای خوداجرا</span>
            </div>
            <h2 className="text-xl font-bold font-serif text-[#0B132B] dark:text-white">
              ممیزی امنیتی قراردادهای هوشمند و مسئولیت مدنی پلتفرم‌های کریپتو
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              تحلیل آسیب‌پذیری‌های فنی سالیدیتی (Solidity)، انتساب مسئولیت حقوقی توسعه‌دهنده و ردیابی حقوقی دارایی‌های سرقت‌شده
            </p>
          </div>

          <div className="flex items-center gap-2 bg-indigo-50 dark:bg-indigo-950/40 px-3 py-2 rounded-xl border border-indigo-200 dark:border-indigo-800">
            <Coins className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span className="text-xs font-bold text-indigo-800 dark:text-indigo-300">
              مستند به ماده ۹ قانون مبارزه با پولشویی
            </span>
          </div>
        </div>
      </div>

      {/* Audit Cases Selector & Deep Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 4 Cols: Audited Protocols */}
        <div className="lg:col-span-4 space-y-3">
          <span className="text-xs font-bold text-gray-400 block px-1">پرونده‌های ممیزی قرارداد هوشمند:</span>
          {SMART_CONTRACT_AUDIT_RULES.map((audit) => {
            const isSelected = selectedAudit.id === audit.id;
            return (
              <div
                key={audit.id}
                onClick={() => setSelectedAudit(audit)}
                className={`p-4 rounded-xl border transition-all cursor-pointer text-right space-y-2 ${
                  isSelected
                    ? 'border-[#D4AF37] bg-[#D4AF37]/10 dark:bg-[#D4AF37]/15 shadow-sm'
                    : 'border-gray-100 dark:border-gray-800 bg-white dark:bg-[#0B132B] hover:border-gray-300 dark:hover:border-gray-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#0B132B] dark:text-white">
                    {audit.protocolName}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                    {audit.network}
                  </span>
                </div>

                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-gray-500 dark:text-gray-400 font-mono">
                    {audit.vulnerabilityType}
                  </span>
                  <span className="text-rose-600 dark:text-rose-400 font-bold text-[10px]">
                    {audit.financialRiskLevel}
                  </span>
                </div>
              </div>
            );
          })}

          <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/60 text-xs space-y-2">
            <span className="font-bold text-amber-900 dark:text-amber-300 flex items-center gap-1.5">
              <Lock className="w-4 h-4 text-[#D4AF37]" />
              قاعده حقوقی «کد قانون نیست (Code is Not Law)»:
            </span>
            <p className="text-[11px] text-gray-600 dark:text-gray-300 leading-relaxed">
              برخلاف تصور اولیه در فضای وب۳، وجود باگ فنی در قرارداد هوشمند مجوزی برای برداشت غیرمجاز وجوه نبوده و عمل هکر در محاکم بین‌المللی و داخلی مصداق داراشدن بلاجهت (Unjust Enrichment) و سرقت رایانه‌ای تلقی می‌گردد.
            </p>
          </div>
        </div>

        {/* Right 8 Cols: Technical & Legal Breakdown */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white dark:bg-[#0B132B] p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-gray-100 dark:border-gray-800">
              <div>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                  شبکه: {selectedAudit.network}
                </span>
                <h3 className="text-base font-bold font-serif text-[#0B132B] dark:text-white mt-1.5">
                  {selectedAudit.protocolName}
                </h3>
              </div>

              <div className="text-left">
                <span className="text-[10px] text-gray-400 block">مرجع مسئولیت مدنی و جبران</span>
                <span className="text-xs font-bold text-[#D4AF37]">
                  {selectedAudit.legalLiabilityHolder}
                </span>
              </div>
            </div>

            {/* Risk & Mitigation */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/40 space-y-1">
                <span className="text-gray-400 text-[10px]">نوع باگ امنیتی کدهای سالیدیتی:</span>
                <p className="font-bold text-rose-600 dark:text-rose-400 font-mono">
                  {selectedAudit.vulnerabilityType}
                </p>
              </div>

              <div className="p-3 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/40 space-y-1">
                <span className="text-gray-400 text-[10px]">سطح ریسک نقدینگی دارایی‌ها:</span>
                <p className="font-bold text-amber-600 dark:text-amber-400">
                  {selectedAudit.financialRiskLevel}
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-800 space-y-2">
              <span className="text-xs font-bold text-[#0B132B] dark:text-white flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                راهکار فنی و پیوست امنیتی قرارداد:
              </span>
              <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed font-sans">
                {selectedAudit.mitigationAction}
              </p>
            </div>

            {/* Solidity Code Auditor Playground */}
            <div className="space-y-2.5 pt-2 border-t border-gray-100 dark:border-gray-800">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#0B132B] dark:text-white flex items-center gap-1.5">
                  <Code2 className="w-4 h-4 text-[#D4AF37]" />
                  شبیه‌ساز ممیزی کدهای سالیدیتی و استخراج مسئولیت قراردادی:
                </span>
                <button
                  onClick={handleRunSecurityAudit}
                  disabled={analyzingCode}
                  className="px-3 py-1.5 rounded-lg bg-[#D4AF37] hover:bg-[#AA820A] text-[#060B18] text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{analyzingCode ? 'در حال تحلیل سورس‌کد...' : 'اجرای اسکن امنیتی سالیدیتی'}</span>
                </button>
              </div>

              <textarea
                rows={6}
                value={customSoliditySnippet}
                onChange={(e) => setCustomSoliditySnippet(e.target.value)}
                className="w-full p-3 rounded-xl bg-gray-950 text-emerald-400 font-mono text-xs border border-gray-800 text-left outline-none leading-relaxed"
                dir="ltr"
              />

              {auditReport && (
                <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-300 dark:border-rose-800 text-xs text-rose-800 dark:text-rose-300 leading-relaxed animate-in fade-in flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <span>{auditReport}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
