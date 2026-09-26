import React from 'react';
import {
  Calendar,
  Clock,
  Scale,
  Bell,
  ChevronLeft,
  Briefcase,
  FileText,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  PhoneCall,
  ArrowUpRight,
  ShieldCheck,
  CreditCard,
  MessageSquare
} from 'lucide-react';

export interface ClientQuickAccessCase {
  id: string;
  caseNumber: string;
  courtBranch: string;
  judgeName?: string;
  subject: string;
  type: string;
  progressPercentage: number;
  stage: string;
  lastUpdate: string;
  nextSessionDate: string;
  lawyerNotes?: string;
  documents?: { title: string; size: string; date: string; type: string }[];
  financials?: {
    totalFee: string;
    paidAmount: string;
    remainingAmount: string;
    nextDue: string;
  };
}

interface ClientPortalQuickAccessWidgetProps {
  cases: ClientQuickAccessCase[];
  activeCaseId: string;
  onSelectCase: (caseId: string) => void;
  onSwitchTab?: (tab: 'case' | 'timeline' | 'documents' | 'financial' | 'messages' | 'profile') => void;
  onOpenBooking?: () => void;
}

export const ClientPortalQuickAccessWidget: React.FC<ClientPortalQuickAccessWidgetProps> = ({
  cases,
  activeCaseId,
  onSelectCase,
  onSwitchTab,
  onOpenBooking,
}) => {
  // Aggregate recent updates across all cases
  const recentUpdates = cases.map((c) => ({
    caseId: c.id,
    caseNumber: c.caseNumber,
    subject: c.subject,
    type: c.type,
    updateText: c.lastUpdate,
    stage: c.stage,
  }));

  // Aggregate upcoming hearings across all cases
  const upcomingHearings = cases
    .filter((c) => c.nextSessionDate && !c.nextSessionDate.includes('مختومه'))
    .map((c) => ({
      caseId: c.id,
      caseNumber: c.caseNumber,
      subject: c.subject,
      courtBranch: c.courtBranch,
      sessionDate: c.nextSessionDate,
      judge: c.judgeName,
    }));

  return (
    <div className="rounded-3xl p-6 sm:p-7 bg-white dark:bg-[#0B132B] border border-[#D4AF37]/30 shadow-lg space-y-6 text-right font-persian relative overflow-hidden">
      {/* Golden Ambient Blur */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Widget Header */}
      <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-100 dark:border-gray-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-[#D4AF37] text-[#0B132B] shadow-md shadow-[#D4AF37]/20">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-bold font-serif text-[#0B132B] dark:text-white">
                پیشخوان دسترسی سریع موکل (Quick Access Hub)
              </h3>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-[11px] font-bold border border-emerald-500/30">
                بروزرسانی زنده
              </span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              خلاصه فوری آخرین رویدادهای قضایی، لوایح و مواعد دادرسی پیش‌رو در یک نگاه
            </p>
          </div>
        </div>

        {/* Quick Actions Header Pills */}
        <div className="flex items-center gap-2 shrink-0">
          {onOpenBooking && (
            <button
              type="button"
              onClick={onOpenBooking}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#AA820A] text-[#0B132B] font-bold text-xs hover:brightness-110 shadow-sm transition-all flex items-center gap-1.5"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>هماهنگی جلسه با وکیل</span>
            </button>
          )}

          {onSwitchTab && (
            <button
              type="button"
              onClick={() => onSwitchTab('messages')}
              className="px-3 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:text-[#D4AF37] text-xs font-bold transition-all border border-gray-200 dark:border-gray-700 flex items-center gap-1.5"
            >
              <MessageSquare className="w-3.5 h-3.5 text-blue-500" />
              <span>ارسال پیام</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Two-Column Summary Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">
        
        {/* Card 1: Recent Case Updates (7 Cols) */}
        <div className="lg:col-span-7 rounded-2xl p-5 bg-gray-50/80 dark:bg-[#070D1E]/90 border border-gray-200/80 dark:border-gray-800 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs sm:text-sm font-bold text-[#0B132B] dark:text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#D4AF37]" />
              <span>آخرین به‌روزرسانی‌ها و اقدامات پرونده‌ها:</span>
            </h4>
            <span className="text-[11px] text-gray-400 font-mono">
              {recentUpdates.length} گزارش فعال
            </span>
          </div>

          <div className="space-y-3">
            {recentUpdates.map((item) => {
              const isActive = item.caseId === activeCaseId;
              return (
                <div
                  key={item.caseId}
                  onClick={() => onSelectCase(item.caseId)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer group ${
                    isActive
                      ? 'bg-white dark:bg-[#0B132B] border-[#D4AF37] shadow-md ring-1 ring-[#D4AF37]/30'
                      : 'bg-white/70 dark:bg-[#0B132B]/60 border-gray-200 dark:border-gray-800 hover:border-[#D4AF37]/50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-2 py-0.5 rounded-md bg-[#D4AF37]/15 text-[#AA820A] dark:text-[#F3E5AB] text-[10px] font-bold">
                          {item.type}
                        </span>
                        <span className="text-xs font-bold text-[#0B132B] dark:text-white group-hover:text-[#D4AF37] transition-colors">
                          {item.subject}
                        </span>
                      </div>

                      <p className="text-xs text-emerald-700 dark:text-emerald-400 font-medium flex items-center gap-1.5 pt-0.5">
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                        <span>{item.updateText}</span>
                      </p>

                      <div className="text-[11px] text-gray-500 dark:text-gray-400">
                        مرحله جاری: <strong className="text-gray-700 dark:text-gray-300">{item.stage}</strong>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-1.5 shrink-0">
                      <span className="font-mono text-[10px] text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">
                        {item.caseNumber}
                      </span>
                      <span className="text-[11px] font-bold text-[#D4AF37] flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
                        <span>مشاهده پرونده</span>
                        <ChevronLeft className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Card 2: Upcoming Hearing Dates (5 Cols) */}
        <div className="lg:col-span-5 rounded-2xl p-5 bg-gradient-to-br from-[#0B132B] to-[#16203B] text-white border border-[#D4AF37]/40 shadow-md space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h4 className="text-xs sm:text-sm font-bold text-[#F3E5AB] flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#D4AF37]" />
                <span>مواعد و جلسات رسیدگی دادگاه:</span>
              </h4>
              <span className="px-2 py-0.5 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] text-[10px] font-bold">
                تقویم رسمی
              </span>
            </div>

            <div className="space-y-3">
              {upcomingHearings.map((session, idx) => (
                <div
                  key={idx}
                  onClick={() => onSelectCase(session.caseId)}
                  className="p-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-[#D4AF37]/50 transition-all cursor-pointer group space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white group-hover:text-[#D4AF37] transition-colors truncate max-w-[200px]">
                      {session.subject}
                    </span>
                    <span className="font-mono text-[10px] text-[#D4AF37] bg-white/10 px-2 py-0.5 rounded">
                      {session.caseNumber}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center gap-2.5">
                    <Clock className="w-4 h-4 text-[#D4AF37] shrink-0" />
                    <div className="text-xs font-bold text-white font-mono">
                      {session.sessionDate}
                    </div>
                  </div>

                  <div className="text-[11px] text-gray-300 leading-tight">
                    مرجع رسیدگی: {session.courtBranch}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Notice Footer */}
          <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-gray-300">
            <span className="flex items-center gap-1 text-[#D4AF37]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>هماهنگی لوایح پیش از موعد</span>
            </span>

            {onSwitchTab && (
              <button
                type="button"
                onClick={() => onSwitchTab('documents')}
                className="text-white hover:text-[#D4AF37] font-bold flex items-center gap-1 transition-colors"
              >
                <span>مشاهده اسناد و مدارک</span>
                <ChevronLeft className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
