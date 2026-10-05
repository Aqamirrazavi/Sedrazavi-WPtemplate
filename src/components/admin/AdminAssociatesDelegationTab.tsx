import React, { useState } from 'react';
import {
  Users,
  Shield,
  Briefcase,
  UserCheck,
  CheckCircle2,
  AlertTriangle,
  Calendar,
  Clock,
  Send,
  FileText,
  Building2,
  Lock,
  ArrowRight,
  UserPlus,
  RefreshCw,
  Award,
  Phone,
  Mail,
  Scale,
} from 'lucide-react';
import { CaseItem } from '../../types/theme';

interface AssociateLawyer {
  id: string;
  name: string;
  title: string;
  licenseNumber: string;
  specialty: string;
  phone: string;
  email: string;
  activeCasesCount: number;
  status: 'active' | 'in_court' | 'on_leave';
  isDeputy: boolean;
}

const INITIAL_ASSOCIATES: AssociateLawyer[] = [
  {
    id: 'assoc-1',
    name: 'سید امیر حسین رضوی فردویی',
    title: 'وکیل پایه یک دادگستری و قائم‌مقام دفتر',
    licenseNumber: '۲۹۵۱۴ / ک.و.م',
    specialty: 'دعاوی ملکی، ثبتی و سرقفلی',
    phone: '۰۹۱۲-۹۸۷۶۵۴۳',
    email: 'amirhossein.razavi@law-firm.ir',
    activeCasesCount: 14,
    status: 'active',
    isDeputy: true,
  },
  {
    id: 'assoc-2',
    name: 'دکتر محمدرضا میرصادقی',
    title: 'مشاور ارشد حقوق تجارت و داوری',
    licenseNumber: '۱۴۲۳۰ / ک.و.م',
    specialty: 'قراردادهای تجاری و داوری بین‌المللی',
    phone: '۰۹۱۲-۵۵۵۴۴۳۳',
    email: 'mirsadeghi@law-firm.ir',
    activeCasesCount: 8,
    status: 'in_court',
    isDeputy: false,
  },
  {
    id: 'assoc-3',
    name: 'سرکار خانم وکیل ناصری',
    title: 'وکیل پایه یک و کارشناس دیوان عدالت اداری',
    licenseNumber: '۳۱۴۸۰ / ک.و.م',
    specialty: 'کمیسیون‌های شهرداری و دیوان عدالت اداری',
    phone: '۰۹۱۲-۷۷۷۸۸۹۹',
    email: 'naseri@law-firm.ir',
    activeCasesCount: 11,
    status: 'active',
    isDeputy: false,
  },
];

interface AdminAssociatesDelegationTabProps {
  cases: CaseItem[];
  onReassignCase?: (caseId: string, associateId: string) => void;
  leadAttorneyStatus?: 'in_office' | 'in_court' | 'on_leave';
}

export const AdminAssociatesDelegationTab: React.FC<AdminAssociatesDelegationTabProps> = ({
  cases,
  onReassignCase,
  leadAttorneyStatus: initialStatus = 'in_court',
}) => {
  const [associates, setAssociates] = useState<AssociateLawyer[]>(INITIAL_ASSOCIATES);
  const [leadStatus, setLeadStatus] = useState<'in_office' | 'in_court' | 'on_leave'>(initialStatus);
  const [selectedCaseId, setSelectedCaseId] = useState<string>(cases[0]?.id || '');
  const [selectedAssociateId, setSelectedAssociateId] = useState<string>(associates[0]?.id || '');
  const [delegationNotes, setDelegationNotes] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleAssign = (e: React.FormEvent) => {
    e.preventDefault();
    const targetCase = cases.find((c) => c.id === selectedCaseId);
    const targetAssociate = associates.find((a) => a.id === selectedAssociateId);

    if (targetCase && targetAssociate) {
      if (onReassignCase) {
        onReassignCase(selectedCaseId, selectedAssociateId);
      }
      setSuccessMessage(
        `پرونده «${targetCase.caseNumber} - ${targetCase.clientName}» با موفقیت جهت پیگیری فوری به ${targetAssociate.name} تفویض شد.`
      );
      setDelegationNotes('');
      setTimeout(() => setSuccessMessage(null), 5000);
    }
  };

  return (
    <div className="space-y-6 text-right" dir="rtl">
      {/* Top Banner: Emergency Delegation Status */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-[#0B132B] via-[#16213E] to-[#0B132B] border border-[#D4AF37]/50 text-white shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-[#D4AF37] text-[#0B132B] text-xs font-black flex items-center gap-1.5 shadow-md">
                <Shield className="w-3.5 h-3.5" />
                <span>دسترسی عالی مدیر سایت (Admin Acting as Lead Attorney)</span>
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                پروتکل تفویض اختیارات وکالت
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-serif text-white pt-1">
              پیشخوان مدیریت جانشین وکیل، شرکا و تقسیم پرونده‌ها
            </h2>
            <p className="text-xs text-gray-300 leading-relaxed max-w-2xl">
              این بخش به ادمین و جانشین وکیل اجازه می‌دهد تا در صورت حضور وکیل سرپرست در دادگاه یا غیاب ایشان، فوراً کارهای مراجعین، لوایح و جلسات رسیدگی را به وکلای همکار بسپارد.
            </p>
          </div>

          {/* Lead Attorney Presence Selector */}
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-2 shrink-0">
            <span className="text-[11px] text-gray-300 block font-bold">
              وضعیت فعلی وکیل سرپرست (دکتر سیده مریم رضوی):
            </span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setLeadStatus('in_office')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  leadStatus === 'in_office'
                    ? 'bg-emerald-500 text-white shadow-md'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse"></span>
                <span>حاضر در دفتر</span>
              </button>

              <button
                type="button"
                onClick={() => setLeadStatus('in_court')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  leadStatus === 'in_court'
                    ? 'bg-amber-500 text-[#0B132B] font-black shadow-md'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                <span>در جلسه دادگاه (تفویض فعال)</span>
              </button>

              <button
                type="button"
                onClick={() => setLeadStatus('on_leave')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  leadStatus === 'on_leave'
                    ? 'bg-rose-500 text-white shadow-md'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-rose-300"></span>
                <span>مرخصی / مأموریت</span>
              </button>
            </div>
          </div>
        </div>

        {/* Notice of Active Delegation */}
        {leadStatus !== 'in_office' && (
          <div className="p-3.5 rounded-xl bg-amber-500/15 border border-amber-500/40 text-amber-200 text-xs flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-[#D4AF37] shrink-0" />
            <span>
              <strong>پروتکل جانشینی فعال است:</strong> اختیارات رسیدگی به مراجعین حضوری، تایید نهایی لوایح ثبتی و پاسخگویی آنلاین مستقیماً در اختیار ادمین سایت و وکیل قائم‌مقام قرار دارد.
            </span>
          </div>
        )}
      </div>

      {/* Success Notification */}
      {successMessage && (
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-2 shadow-sm">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Associates Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {associates.map((assoc) => (
          <div
            key={assoc.id}
            className="p-5 rounded-3xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-sm hover:border-[#D4AF37]/50 transition-all space-y-3"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#0B132B] to-[#1C2541] text-[#D4AF37] flex items-center justify-center font-bold text-sm border border-[#D4AF37]/30 shadow-inner">
                  {assoc.name[0]}
                </div>
                <div>
                  <h4 className="font-bold text-xs text-gray-900 dark:text-white">
                    {assoc.name}
                  </h4>
                  <span className="text-[11px] text-gray-500 dark:text-gray-400 block">
                    {assoc.title}
                  </span>
                </div>
              </div>

              {assoc.isDeputy && (
                <span className="px-2 py-0.5 rounded-full bg-[#D4AF37]/15 text-[#AA820A] dark:text-[#F3E5AB] text-[10px] font-bold border border-[#D4AF37]/30">
                  قائم‌مقام
                </span>
              )}
            </div>

            <div className="space-y-1 text-[11px] text-gray-600 dark:text-gray-300 pt-1 border-t border-gray-100 dark:border-gray-800">
              <div className="flex justify-between">
                <span className="text-gray-400">شماره پروانه:</span>
                <span className="font-mono font-bold">{assoc.licenseNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">حوزه تمرکز:</span>
                <span className="font-bold text-[#D4AF37]">{assoc.specialty}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">پرونده‌های فعال:</span>
                <span className="font-mono font-bold text-gray-900 dark:text-white">{assoc.activeCasesCount} پرونده</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">وضعیت کنونی:</span>
                <span
                  className={`font-bold ${
                    assoc.status === 'active'
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : 'text-amber-600 dark:text-amber-400'
                  }`}
                >
                  {assoc.status === 'active' ? 'آماده پذیرش پرونده' : 'در محکمه'}
                </span>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-2">
              <a
                href={`tel:${assoc.phone}`}
                className="flex-1 py-1.5 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-[#D4AF37]/10 hover:text-[#D4AF37] text-gray-600 dark:text-gray-300 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>تماس فوری</span>
              </a>
              <button
                type="button"
                onClick={() => setSelectedAssociateId(assoc.id)}
                className="flex-1 py-1.5 rounded-xl bg-[#0B132B] dark:bg-gray-700 hover:bg-[#D4AF37] text-white hover:text-[#0B132B] text-xs font-bold transition-colors cursor-pointer"
              >
                انتخاب جهت تفویض
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Case Reassignment Action Form */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-sm space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-[#D4AF37]" />
            <h3 className="text-base font-bold text-gray-900 dark:text-white">
              فرم ارجاع و تفویض پرونده قضایی به وکیل همکار (توسط ادمین سیستم)
            </h3>
          </div>
          <span className="text-xs text-gray-400">
            تعداد کل پرونده‌های کارتابل: {cases.length} پرونده
          </span>
        </div>

        <form onSubmit={handleAssign} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300">
              انتخاب پرونده قضایی موکل:
            </label>
            <select
              value={selectedCaseId}
              onChange={(e) => setSelectedCaseId(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs text-gray-900 dark:text-white"
            >
              {cases.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.caseNumber} - {c.clientName} ({c.caseType})
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300">
              وکیل متصدی و همکار مقصد:
            </label>
            <select
              value={selectedAssociateId}
              onChange={(e) => setSelectedAssociateId(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs text-gray-900 dark:text-white"
            >
              {associates.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name} ({a.specialty})
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5 sm:col-span-2 lg:col-span-1">
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300">
              دستور اداری و یادداشت تفویض به وکیل همکار:
            </label>
            <input
              type="text"
              placeholder="مثال: لایحه تجدیدنظرخواهی فوری آماده و تقدیم شود."
              value={delegationNotes}
              onChange={(e) => setDelegationNotes(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs text-gray-900 dark:text-white"
            />
          </div>

          <div className="sm:col-span-2 lg:col-span-3 pt-2 flex items-center justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#AA820A] text-[#0B132B] font-bold text-xs shadow-md hover:brightness-110 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>ثبت ارجاع رسمی و ارسال ابلاغیه سیستمی</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
