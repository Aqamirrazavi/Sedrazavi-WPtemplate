import React, { useState } from 'react';
import {
  FileSearch,
  AlertTriangle,
  CheckCircle2,
  Copy,
  Check,
  Sparkles,
  ShieldCheck,
  Scale,
  RefreshCw,
  Printer,
  ChevronDown,
  ChevronUp,
  FileText,
  HelpCircle,
  Lightbulb,
  ArrowLeft,
  BookOpen,
} from 'lucide-react';
import { CONTRACT_AUDIT_SAMPLES } from '../../data/mockData';
import { ContractAuditSample, ContractClauseAudit, ContractRiskLevel } from '../../types/theme';

export const ContractAuditAnalyzer: React.FC = () => {
  const [selectedSample, setSelectedSample] = useState<ContractAuditSample>(CONTRACT_AUDIT_SAMPLES[0]);
  const [customText, setCustomText] = useState<string>(selectedSample.sampleRawText);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [copiedRevisionId, setCopiedRevisionId] = useState<string | null>(null);
  const [expandedClauseId, setExpandedClauseId] = useState<string | null>(selectedSample.clauses[0]?.clauseId || null);
  const [filterRisk, setFilterRisk] = useState<'all' | ContractRiskLevel>('all');

  const handleSelectSample = (sample: ContractAuditSample) => {
    setSelectedSample(sample);
    setCustomText(sample.sampleRawText);
    setExpandedClauseId(sample.clauses[0]?.clauseId || null);
  };

  const handleRunAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
    }, 600);
  };

  const handleCopyRevision = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedRevisionId(id);
    setTimeout(() => setCopiedRevisionId(null), 2000);
  };

  const filteredClauses = selectedSample.clauses.filter((c) => {
    if (filterRisk === 'all') return true;
    return c.riskLevel === filterRisk;
  });

  const getRiskBadge = (level: ContractRiskLevel) => {
    switch (level) {
      case 'critical':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30">
            <AlertTriangle className="w-3.5 h-3.5" /> ریسک بحرانی (ابطال‌زا)
          </span>
        );
      case 'high':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/30">
            <AlertTriangle className="w-3.5 h-3.5" /> پرخطر (خسارت‌بار)
          </span>
        );
      case 'medium':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/30">
            <Lightbulb className="w-3.5 h-3.5" /> هشدار تعدیل
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
            <CheckCircle2 className="w-3.5 h-3.5" /> استاندارد
          </span>
        );
    }
  };

  const getScoreColor = (score: number) => {
    if (score < 50) return 'text-rose-500 border-rose-500/40 bg-rose-50 dark:bg-rose-950/20';
    if (score < 75) return 'text-amber-500 border-amber-500/40 bg-amber-50 dark:bg-amber-950/20';
    return 'text-emerald-500 border-emerald-500/40 bg-emerald-50 dark:bg-emerald-950/20';
  };

  return (
    <div className="space-y-8 text-slate-800 dark:text-slate-100">
      {/* هدر بخش و انتخاب قرارداد */}
      <div className="bg-white dark:bg-[#0B132B] rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800/80 pb-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-amber-500/10 text-amber-500 dark:text-[#D4AF37]">
                <FileSearch className="w-5 h-5" />
              </span>
              <h3 className="text-lg sm:text-xl font-black font-serif text-slate-900 dark:text-white">
                سامانه هوشمند ممیزی و ارزیابی ریسک قراردادها
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              غربالگری عبارات مخاطره‌آمیز نظیر اسقاط کافه خیارات، فورس‌ماژور نامتعارف، وجه التزام یکطرفه و ارائه نگارش جایگزین وکلای پایه یک.
            </p>
          </div>

          {/* نمره سلامت قرارداد */}
          <div className={`flex items-center gap-3 px-4 py-2.5 rounded-2xl border ${getScoreColor(selectedSample.overallSafetyScore)}`}>
            <ShieldCheck className="w-6 h-6 shrink-0" />
            <div className="text-right">
              <span className="block text-[11px] font-semibold opacity-80">شاخص سلامت حقوقی:</span>
              <span className="text-lg font-black font-mono">{selectedSample.overallSafetyScore} از ۱۰۰</span>
            </div>
          </div>
        </div>

        {/* انتخاب قراردادهای نمونه یا درج متن */}
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
            انتخاب تیپ قرارداد جهت تحلیل یا بارگذاری متن دلخواه:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {CONTRACT_AUDIT_SAMPLES.map((sample) => {
              const isSelected = selectedSample.id === sample.id;
              return (
                <button
                  key={sample.id}
                  onClick={() => handleSelectSample(sample)}
                  className={`p-3.5 rounded-2xl text-right border transition-all ${
                    isSelected
                      ? 'bg-amber-500/10 border-[#D4AF37] text-slate-900 dark:text-white shadow-sm ring-1 ring-[#D4AF37]/50'
                      : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/60 text-slate-600 dark:text-slate-300 hover:border-[#D4AF37]/50'
                  }`}
                >
                  <span className="block text-xs font-bold truncate">{sample.title}</span>
                  <span className="block text-[11px] text-slate-400 mt-1 truncate">{sample.category}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* جعبه متن قرارداد با قابلیت ویرایش و تحلیل مجدد */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-indigo-400" />
              متن خام قرارداد جهت آنالیز شروط:
            </span>
            <button
              onClick={handleRunAnalysis}
              disabled={isAnalyzing}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-md transition-all active:scale-95 disabled:opacity-50"
            >
              <Sparkles className={`w-4 h-4 ${isAnalyzing ? 'animate-spin' : ''}`} />
              {isAnalyzing ? 'در حال پایش بندها...' : 'اجرای ممیزی هوشمند'}
            </button>
          </div>
          <textarea
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
            rows={4}
            dir="rtl"
            className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-[#070D1E] border border-slate-200 dark:border-slate-800 text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 resize-y font-mono"
            placeholder="متن قرارداد یا بندهای مورد نظر را در اینجا تایپ یا الصاق نمایید..."
          />
        </div>
      </div>

      {/* نتایج ممیزی و شروط شناسایی‌شده */}
      <div className="bg-white dark:bg-[#0B132B] rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800/80 pb-4">
          <div>
            <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Scale className="w-5 h-5 text-[#D4AF37]" />
              بندهای غربالگری‌شده و توصیه‌های بازنویسی قضایی ({filteredClauses.length} مورد)
            </h4>
            <span className="text-xs text-slate-400">
              کلیک روی هر بند جزئیات خطرات، مستندات قانونی و نگارش اصلاحی را نمایش می‌دهد.
            </span>
          </div>

          {/* فیلتر سطح ریسک */}
          <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl text-xs">
            {(['all', 'critical', 'high', 'medium'] as const).map((r) => (
              <button
                key={r}
                onClick={() => setFilterRisk(r)}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  filterRisk === r
                    ? 'bg-white dark:bg-[#0B132B] text-slate-900 dark:text-white shadow-sm font-bold'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                {r === 'all' && 'همه'}
                {r === 'critical' && 'بحرانی'}
                {r === 'high' && 'پرخطر'}
                {r === 'medium' && 'هشدار'}
              </button>
            ))}
          </div>
        </div>

        {/* لیست بندهای ممیزی‌شده */}
        <div className="space-y-4">
          {filteredClauses.map((clause) => {
            const isExpanded = expandedClauseId === clause.clauseId;
            return (
              <div
                key={clause.clauseId}
                className="rounded-2xl border border-slate-200 dark:border-slate-700/80 bg-slate-50/50 dark:bg-[#070D1E]/60 overflow-hidden transition-all shadow-sm"
              >
                {/* هدر بند */}
                <div
                  onClick={() => setExpandedClauseId(isExpanded ? null : clause.clauseId)}
                  className="p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-100/60 dark:hover:bg-slate-800/40 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="shrink-0">{getRiskBadge(clause.riskLevel)}</span>
                    <span className="text-sm font-bold text-slate-900 dark:text-white">
                      {clause.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400 hidden sm:inline-block">
                      {clause.relevantLegalArticle}
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-slate-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400" />
                    )}
                  </div>
                </div>

                {/* بدنه و جزئیات بند ممیزی‌شده */}
                {isExpanded && (
                  <div className="p-5 sm:p-6 border-t border-slate-200 dark:border-slate-800 space-y-5 text-xs sm:text-sm">
                    {/* متن اصلی شرط با حاشیه اخطار */}
                    <div className="p-4 rounded-xl bg-rose-500/5 border border-rose-500/20 space-y-1.5">
                      <span className="block text-[11px] font-bold text-rose-600 dark:text-rose-400">
                        متن فعلی و پرخطر در قرارداد:
                      </span>
                      <p className="font-mono text-slate-700 dark:text-slate-300 leading-relaxed">
                        « {clause.originalText} »
                      </p>
                    </div>

                    {/* تحلیل خطر و ابطال‌پذیری */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 space-y-1">
                        <span className="block text-[11px] font-bold text-amber-700 dark:text-amber-400 flex items-center gap-1.5">
                          <AlertTriangle className="w-3.5 h-3.5" /> ایراد ساختاری و نقص حقوقی:
                        </span>
                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                          {clause.issueDescription}
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-indigo-500/5 border border-indigo-500/20 space-y-1">
                        <span className="block text-[11px] font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
                          <BookOpen className="w-3.5 h-3.5" /> مستندات و خطر دادرسی:
                        </span>
                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                          {clause.legalDanger}
                        </p>
                        <span className="block text-[10px] font-mono text-indigo-500 pt-1 font-bold">
                          استناد: {clause.relevantLegalArticle}
                        </span>
                      </div>
                    </div>

                    {/* نگارش پیشنهادی و استاندارد وکیل */}
                    <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/30 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                          <ShieldCheck className="w-4 h-4" /> نگارش اصلاحی و ایمن پیشنهادی دفتر وکالت:
                        </span>
                        <button
                          onClick={() => handleCopyRevision(clause.clauseId, clause.recommendedRevision)}
                          className="inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-all"
                        >
                          {copiedRevisionId === clause.clauseId ? (
                            <>
                              <Check className="w-3.5 h-3.5" /> کپی شد
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" /> کپی بند اصلاحی
                            </>
                          )}
                        </button>
                      </div>
                      <p className="font-mono text-slate-800 dark:text-slate-100 leading-relaxed bg-white dark:bg-[#0B132B] p-3 rounded-lg border border-emerald-500/20">
                        {clause.recommendedRevision}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* دکمه چاپ یا ذخیره کارنامه ممیزی */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <span>
            💡 توصیه وکیل: ممیزی حقوقی پیش از امضا، مانع از خسارت‌های چندصد میلیونی و سال‌ها سرگردانی در دادگاه‌هاست.
          </span>
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors shrink-0 font-semibold"
          >
            <Printer className="w-4 h-4" /> چاپ کارنامه سلامت قرارداد
          </button>
        </div>
      </div>
    </div>
  );
};
