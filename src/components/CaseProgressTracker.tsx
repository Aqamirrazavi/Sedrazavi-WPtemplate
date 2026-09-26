import React, { useState } from 'react';
import {
  Check,
  Clock,
  AlertCircle,
  FileCheck2,
  Scale,
  Calendar,
  ChevronLeft,
  ChevronDown,
  Sparkles,
  ShieldCheck,
  Building,
  Info
} from 'lucide-react';

export interface CaseProgressStep {
  title: string;
  stageName: string;
  date: string;
  description: string;
  completed: boolean;
  current?: boolean;
  courtActionCode?: string;
}

interface CaseProgressTrackerProps {
  steps: CaseProgressStep[];
  caseNumber: string;
  statusCode?: 'ACTIVE' | 'HEARING_PENDING' | 'DECIDED' | 'ENFORCEMENT';
  currentStatusText?: string;
  nextHearingDate?: string;
  hearingDaysRemaining?: number;
}

export const CaseProgressTracker: React.FC<CaseProgressTrackerProps> = ({
  steps,
  caseNumber,
  statusCode,
  currentStatusText,
  nextHearingDate,
  hearingDaysRemaining,
}) => {
  const [selectedStepIndex, setSelectedStepIndex] = useState<number | null>(() => {
    const currentIdx = steps.findIndex((s) => s.current);
    if (currentIdx !== -1) return currentIdx;
    const lastCompleted = steps.map((s) => s.completed).lastIndexOf(true);
    return lastCompleted !== -1 ? lastCompleted : 0;
  });

  const completedCount = steps.filter((s) => s.completed).length;
  const totalCount = steps.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const currentStep = steps.find((s) => s.current) || steps[completedCount < totalCount ? completedCount : totalCount - 1];

  return (
    <div className="rounded-3xl p-6 sm:p-7 bg-gradient-to-b from-white via-white to-gray-50/50 dark:from-[#0B132B] dark:via-[#0E1736] dark:to-[#0B132B] border border-[#D4AF37]/40 shadow-xl space-y-6 text-right font-persian relative overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-0 right-1/4 w-80 h-32 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header with Title & Overall Metrics */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-100 dark:border-gray-800/80 pb-5">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/15 text-[#AA820A] dark:text-[#F3E5AB] text-xs font-bold border border-[#D4AF37]/30">
            <Scale className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>رهگیری تصویری مراحل دادرسی قضایی (Case Progress Tracker)</span>
          </div>
          <h3 className="text-base sm:text-lg font-black font-serif text-[#0B132B] dark:text-white flex items-center gap-2">
            <span>مسیر دادرسی پرونده کلاسه:</span>
            <span className="font-mono text-[#D4AF37] font-bold dir-ltr">{caseNumber}</span>
          </h3>
        </div>

        {/* Progress Gauge Pill */}
        <div className="flex items-center gap-3">
          <div className="text-left">
            <div className="text-[11px] text-gray-500 dark:text-gray-400">پیشرفت کل پرونده</div>
            <div className="text-lg font-black font-mono text-[#D4AF37]">{progressPercent}٪</div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-[#0B132B] dark:bg-[#070D1E] border border-[#D4AF37]/40 flex items-center justify-center p-1.5 shadow-inner">
            <div className="w-full h-full rounded-xl bg-gradient-to-tr from-[#D4AF37] to-[#F3E5AB] flex items-center justify-center text-[#0B132B] font-black text-xs">
              {completedCount}/{totalCount}
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar Track */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-300">
          <span className="font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            فاز کنونی: <strong className="text-[#0B132B] dark:text-white">{currentStep?.stageName || currentStatusText || 'دادرسی ماهوی'}</strong>
          </span>
          <span className="text-[11px] text-gray-400 font-mono">
            {completedCount} فاز تکمیل‌شده از {totalCount} فاز کل
          </span>
        </div>
        <div className="w-full h-2.5 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden p-0.5 border border-gray-300/40 dark:border-gray-700/50">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 via-[#D4AF37] to-[#F3E5AB] rounded-full transition-all duration-700 shadow-sm"
            style={{ width: `${Math.max(8, progressPercent)}%` }}
          />
        </div>
      </div>

      {/* Multi-Step Horizontal / Responsive Stepper */}
      <div className="pt-2">
        {/* Desktop & Tablet View: Connected Nodes */}
        <div className="hidden md:block">
          <div className="relative">
            {/* Connecting Baseline */}
            <div className="absolute top-5 right-6 left-6 h-1 bg-gray-200 dark:bg-gray-800 -translate-y-1/2 z-0" />
            
            {/* Active connecting line for completed portion */}
            <div
              className="absolute top-5 right-6 h-1 bg-gradient-to-l from-emerald-500 to-[#D4AF37] -translate-y-1/2 z-0 transition-all duration-500"
              style={{
                width: `${totalCount > 1 ? ((completedCount - 1) / (totalCount - 1)) * 90 : 0}%`,
              }}
            />

            {/* Stepper Nodes Grid */}
            <div className="relative z-10 grid" style={{ gridTemplateColumns: `repeat(${totalCount}, minmax(0, 1fr))` }}>
              {steps.map((step, idx) => {
                const isSelected = selectedStepIndex === idx;
                const isCompleted = step.completed;
                const isCurrent = step.current;

                return (
                  <div
                    key={idx}
                    onClick={() => setSelectedStepIndex(idx)}
                    className="flex flex-col items-center text-center cursor-pointer group px-1"
                  >
                    {/* Node Circle */}
                    <div
                      className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-xs transition-all duration-300 relative ${
                        isCompleted
                          ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/30 group-hover:scale-110'
                          : isCurrent
                          ? 'bg-[#D4AF37] text-[#0B132B] ring-4 ring-[#D4AF37]/30 shadow-lg shadow-[#D4AF37]/40 scale-110 animate-bounce-subtle'
                          : 'bg-white dark:bg-gray-800 text-gray-400 border-2 border-gray-300 dark:border-gray-700 group-hover:border-[#D4AF37]'
                      } ${isSelected ? 'ring-2 ring-white dark:ring-gray-300' : ''}`}
                    >
                      {isCompleted ? (
                        <Check className="w-5 h-5 stroke-[3]" />
                      ) : (
                        <span className="font-mono">{idx + 1}</span>
                      )}

                      {/* Small Current Badge Pulse */}
                      {isCurrent && (
                        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-amber-400 border-2 border-white dark:border-[#0B132B] animate-ping" />
                      )}
                    </div>

                    {/* Step Labels */}
                    <div className="mt-3 space-y-0.5">
                      <div
                        className={`text-xs font-bold line-clamp-1 transition-colors ${
                          isCurrent
                            ? 'text-[#AA820A] dark:text-[#F3E5AB]'
                            : isCompleted
                            ? 'text-gray-800 dark:text-gray-200'
                            : 'text-gray-400'
                        }`}
                      >
                        {step.stageName || `مرحله ${idx + 1}`}
                      </div>
                      <div className="text-[10px] text-gray-400 font-mono">
                        {step.date}
                      </div>
                      {isCurrent && (
                        <span className="inline-block px-2 py-0.5 rounded-full bg-[#D4AF37]/20 text-[#AA820A] dark:text-[#F3E5AB] text-[9px] font-bold">
                          فاز جاری
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile View: Horizontal Scrollable Chips with Indicators */}
        <div className="md:hidden overflow-x-auto pb-2 scrollbar-thin">
          <div className="flex items-center gap-2 min-w-max">
            {steps.map((step, idx) => {
              const isSelected = selectedStepIndex === idx;
              const isCompleted = step.completed;
              const isCurrent = step.current;

              return (
                <button
                  key={idx}
                  onClick={() => setSelectedStepIndex(idx)}
                  className={`p-2.5 rounded-2xl border text-right transition-all flex items-center gap-2.5 ${
                    isSelected
                      ? 'bg-[#D4AF37]/15 border-[#D4AF37] ring-1 ring-[#D4AF37]'
                      : 'bg-white dark:bg-[#070D1E] border-gray-200 dark:border-gray-800'
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 ${
                      isCompleted
                        ? 'bg-emerald-500 text-white'
                        : isCurrent
                        ? 'bg-[#D4AF37] text-[#0B132B]'
                        : 'bg-gray-200 dark:bg-gray-800 text-gray-500'
                    }`}
                  >
                    {isCompleted ? <Check className="w-4 h-4 stroke-[3]" /> : idx + 1}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-800 dark:text-gray-200">
                      {step.stageName}
                    </div>
                    <div className="text-[10px] text-gray-400 font-mono">{step.date}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Selected Step Detailed Inspection Card */}
      {selectedStepIndex !== null && steps[selectedStepIndex] && (
        <div className="p-4 sm:p-5 rounded-2xl bg-amber-500/5 dark:bg-[#D4AF37]/10 border border-[#D4AF37]/30 space-y-3 transition-all">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#D4AF37]/20 pb-2.5">
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 rounded-xl bg-[#D4AF37] text-[#0B132B]">
                <FileCheck2 className="w-4 h-4" />
              </span>
              <div>
                <span className="text-[10px] text-gray-400 block">شرح تفصیلی فاز {selectedStepIndex + 1}:</span>
                <h4 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white">
                  {steps[selectedStepIndex].title}
                </h4>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span
                className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                  steps[selectedStepIndex].completed
                    ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                    : steps[selectedStepIndex].current
                    ? 'bg-[#D4AF37]/30 text-[#AA820A] dark:text-[#F3E5AB]'
                    : 'bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                }`}
              >
                {steps[selectedStepIndex].completed
                  ? 'انجام و ثبت در سابقه قضایی'
                  : steps[selectedStepIndex].current
                  ? 'در حال انجام (اقدام کنونی شعبه)'
                  : 'در نوبت مراحل آتی'}
              </span>
              <span className="font-mono text-xs text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 px-2 py-0.5 rounded-lg border border-gray-200 dark:border-gray-700">
                {steps[selectedStepIndex].date}
              </span>
            </div>
          </div>

          <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
            {steps[selectedStepIndex].description}
          </p>

          {steps[selectedStepIndex].courtActionCode && (
            <div className="flex items-center gap-2 text-[11px] text-gray-500 dark:text-gray-400 pt-1 border-t border-[#D4AF37]/10">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>کد پیگیری در درگاه ملی ثنا:</span>
              <span className="font-mono font-bold text-gray-700 dark:text-gray-200">
                {steps[selectedStepIndex].courtActionCode}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
