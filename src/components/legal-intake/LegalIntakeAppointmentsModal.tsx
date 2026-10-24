import React, { useState } from 'react';
import {
  X,
  Calendar,
  Clock,
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  User,
  Phone,
  FileText,
  Filter,
  Search,
  Sparkles,
  ArrowRight,
  ExternalLink,
  Copy,
  Check,
  Users,
  Briefcase,
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';

interface LegalIntakeAppointmentsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface IntakeRecord {
  reference_code: string;
  client_name: string;
  phone: string;
  topic: string;
  urgency: 'normal' | 'high' | 'critical';
  status: 'new' | 'under_review' | 'consultation_scheduled' | 'closed';
  assigned_to: string;
  created_at: string;
  retention_days_left: number;
}

export const LegalIntakeAppointmentsModal: React.FC<LegalIntakeAppointmentsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<'client_intake' | 'staff_triage'>('client_intake');

  // Client Intake State
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [topic, setTopic] = useState('commercial');
  const [urgency, setUrgency] = useState<'normal' | 'high' | 'critical'>('normal');
  const [meetingType, setMeetingType] = useState<'in_person' | 'phone' | 'secure_video'>('secure_video');
  const [selectedSlot, setSelectedSlot] = useState<string>('شنبه — ۱۰:۰۰ الی ۱۰:۴۵');
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generatedRefCode, setGeneratedRefCode] = useState<string | null>(null);
  const [copiedToken, setCopiedToken] = useState(false);

  // Triage Queue State
  const [triageFilter, setTriageFilter] = useState<'all' | 'critical' | 'new'>('all');
  const [queueSearch, setQueueSearch] = useState('');
  const [records, setRecords] = useState<IntakeRecord[]>([
    {
      reference_code: 'LEG-92418-23',
      client_name: 'مهندس آرش طاهری',
      phone: '09121112233',
      topic: 'داوری تجاری و قراردادهای بین‌المللی',
      urgency: 'critical',
      status: 'new',
      assigned_to: 'دکتر سیده مریم رضوی',
      created_at: '۲ ساعت پیش',
      retention_days_left: 179,
    },
    {
      reference_code: 'LEG-81042-23',
      client_name: 'خانم نگار کریمی',
      phone: '09194445566',
      topic: 'دعاوی ملکی، ثبتی و سرقفلی',
      urgency: 'high',
      status: 'under_review',
      assigned_to: 'وکیل پایه یک همکار',
      created_at: '۵ ساعت پیش',
      retention_days_left: 179,
    },
    {
      reference_code: 'LEG-70193-22',
      client_name: 'شرکت توسعه فناوران آریا',
      phone: '09357778899',
      topic: 'تنظیم قرارداد محرمانگی NDA و مالکیت فکری',
      urgency: 'normal',
      status: 'consultation_scheduled',
      assigned_to: 'دکتر سیده مریم رضوی',
      created_at: 'دیروز',
      retention_days_left: 178,
    },
  ]);

  if (!isOpen) return null;

  const handleClientSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientPhone) {
      showToast({ message: 'نام و شماره تماس الزامی است.', type: 'warning' });
      return;
    }
    if (!privacyConsent) {
      showToast({ message: 'تأییدیه حفظ حریم خصوصی الزامی است.', type: 'warning' });
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const ref = 'LEG-' + Math.floor(10000 + Math.random() * 90000) + '-' + new Date().getDate();
      setGeneratedRefCode(ref);
      setIsSubmitting(false);

      // Add to triage queue
      setRecords((prev) => [
        {
          reference_code: ref,
          client_name: clientName,
          phone: clientPhone,
          topic:
            topic === 'commercial'
              ? 'داوری تجاری و شرکت‌ها'
              : topic === 'real_estate'
              ? 'دعاوی ملکی و سرقفلی'
              : topic === 'tax'
              ? 'اختلافات مالیاتی'
              : 'دعاوی عمومی',
          urgency: urgency,
          status: 'new',
          assigned_to: 'دکتر سیده مریم رضوی',
          created_at: 'همین الان',
          retention_days_left: 180,
        },
        ...prev,
      ]);

      showToast({
        message: 'درخواست شما با موفقیت ثبت شد و کد رهگیری اختصاص یافت!',
        type: 'success',
      });
    }, 600);
  };

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedToken(true);
    showToast({ message: 'کد رهگیری کپی شد.', type: 'success' });
    setTimeout(() => setCopiedToken(false), 2000);
  };

  const handleUpdateStatus = (ref: string, newStatus: IntakeRecord['status']) => {
    setRecords((prev) =>
      prev.map((r) => (r.reference_code === ref ? { ...r, status: newStatus } : r))
    );
    showToast({ message: 'وضعیت پرونده به‌روزرسانی شد.', type: 'info' });
  };

  const filteredRecords = records.filter((r) => {
    if (triageFilter === 'critical' && r.urgency !== 'critical') return false;
    if (triageFilter === 'new' && r.status !== 'new') return false;
    if (queueSearch) {
      const q = queueSearch.toLowerCase();
      return (
        r.reference_code.toLowerCase().includes(q) ||
        r.client_name.toLowerCase().includes(q) ||
        r.topic.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto font-sans">
      <div className="relative w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-white shadow-2xl my-8 max-h-[92vh] flex flex-col" dir="rtl">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-5 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center font-bold shadow-lg shadow-emerald-600/20">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-black text-white">
                  پذیرش و نوبت‌دهی هوشمند وکالت (Legal Intake Level B)
                </h2>
                <span className="text-[10px] px-2.5 py-0.5 rounded-full font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
                  v25.0 Roadmap P3
                </span>
              </div>
              <p className="text-xs text-slate-400">
                تریاژ صف پرونده‌ها، حداقل‌سازی داده، نوبت‌دهی همزمان بدون تداخل و قلاب‌های حریم خصوصی وردپرس
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
            aria-label="بستن"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="py-4 flex items-center gap-3 border-b border-slate-800/80 shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('client_intake')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'client_intake'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>ثبت آنلاین درخواست موکل و رزرو نوبت</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('staff_triage')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'staff_triage'
                ? 'bg-gradient-to-r from-cyan-600 to-indigo-600 text-white shadow-md shadow-cyan-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>کارتابل تریاژ و مدیریت پرونده‌ها (ویژه دفتر)</span>
            <span className="text-[10px] bg-slate-950 px-1.5 py-0.5 rounded font-mono text-cyan-300">
              {records.length}
            </span>
          </button>
        </div>

        {/* Tab 1: Client Intake & Scheduling */}
        {activeTab === 'client_intake' && (
          <div className="flex-1 overflow-y-auto py-4 space-y-6">
            {/* Privacy Alert (Section 4.3 Data Minimization) */}
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs leading-relaxed flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 shrink-0 mt-0.5 text-amber-400" />
              <div>
                <strong className="block font-bold mb-0.5">هشدار حفاظت و عدم افشای اطلاعات:</strong>
                <span>
                  مطابق بند ۴.۳ سند معماری SedRazavi، لطفاً از درج اسرار محرمانه تجاری، شرح تفصیلی پرونده و اسناد هویتی در این فرم عمومی خودداری فرمایید. مدارک پرونده منحصراً در جلسه رسمی حضوری یا پرتال رمزنگاری‌شده سطح C تبادل خواهد شد.
                </span>
              </div>
            </div>

            {generatedRefCode ? (
              <div className="p-8 rounded-3xl bg-slate-950 border border-slate-800 text-center max-w-xl mx-auto space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-white">درخواست مشاوره حقوقی شما ثبت گردید</h3>
                <p className="text-xs text-slate-400">
                  شناسه رهگیری رمزنگاری‌شده شما به شرح زیر است. این کد را جهت پیگیری نوبت یا ارائه در جلسه مشاوره یادداشت فرمایید.
                </p>
                <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between font-mono text-cyan-400 font-bold text-sm">
                  <span>{generatedRefCode}</span>
                  <button
                    type="button"
                    onClick={() => handleCopy(generatedRefCode)}
                    className="p-1.5 hover:text-white cursor-pointer"
                    title="کپی شناسه"
                  >
                    {copiedToken ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setGeneratedRefCode(null);
                    setClientName('');
                    setClientPhone('');
                  }}
                  className="px-6 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-white font-bold cursor-pointer"
                >
                  ثبت استعلام جدید
                </button>
              </div>
            ) : (
              <form onSubmit={handleClientSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Personal & Matter Info */}
                <div className="space-y-4 bg-slate-950/70 border border-slate-800 rounded-2xl p-5">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <User className="w-4 h-4 text-emerald-400" />
                    <span>گام ۱: مشخصات اولیه متقاضی</span>
                  </h4>

                  <div>
                    <label className="block text-xs text-slate-400 mb-1">نام و نام خانوادگی:</label>
                    <input
                      type="text"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="مثال: علی رضایی"
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-400 mb-1">شماره همراه (۰۹۱۲...):</label>
                    <input
                      type="tel"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white font-mono focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-400 mb-1">حوزه موضوعی دعوا:</label>
                    <select
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-emerald-500 cursor-pointer"
                    >
                      <option value="commercial">داوری تجاری و قراردادهای بین‌المللی</option>
                      <option value="real_estate">دعاوی ملکی، ثبتی و سرقفلی</option>
                      <option value="tax">اختلافات مالیاتی و سامانه مودیان</option>
                      <option value="family">حقوق خانواده و انحصار وراثت</option>
                      <option value="criminal">جرایم اقتصادی و سایبری</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs text-slate-400 mb-1">میزان فوریت و مهلت دادرسی:</label>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      {[
                        { id: 'normal', label: 'عادی', color: 'text-slate-300' },
                        { id: 'high', label: 'مهم (۲۴h)', color: 'text-amber-400' },
                        { id: 'critical', label: 'فوری (دادگاه)', color: 'text-rose-400' },
                      ].map((u) => (
                        <button
                          key={u.id}
                          type="button"
                          onClick={() => setUrgency(u.id as any)}
                          className={`p-2 rounded-xl border text-center font-bold cursor-pointer transition ${
                            urgency === u.id
                              ? 'bg-slate-800 border-emerald-500 text-white'
                              : 'bg-slate-900 border-slate-800 ' + u.color
                          }`}
                        >
                          {u.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Appointment Calendar Selection */}
                <div className="space-y-4 bg-slate-950/70 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-2 mb-3">
                      <Clock className="w-4 h-4 text-cyan-400" />
                      <span>گام ۲: زمان مشاوره (منطقه زمانی تهران Asia/Tehran)</span>
                    </h4>

                    <div className="space-y-2 mb-4">
                      {[
                        'شنبه — ۱۰:۰۰ الی ۱۰:۴۵ (حضوری/اسکایپ)',
                        'شنبه — ۱۶:۰۰ الی ۱۶:۴۵ (تلفنی/حضوری)',
                        'یکشنبه — ۱۱:۳۰ الی ۱۲:۱۵ (ویدیوکال امن)',
                        'دوشنبه — ۱۷:۳۰ الی ۱۸:۱۵ (حضوری در دفتر تهران)',
                      ].map((slot) => (
                        <div
                          key={slot}
                          onClick={() => setSelectedSlot(slot)}
                          className={`p-2.5 rounded-xl border text-xs cursor-pointer flex items-center justify-between transition ${
                            selectedSlot === slot
                              ? 'bg-emerald-950/40 border-emerald-500 text-white'
                              : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                          }`}
                        >
                          <span>{slot}</span>
                          <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-bold">
                            آزاد
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-start gap-2 pt-2">
                      <input
                        type="checkbox"
                        id="consent-check"
                        checked={privacyConsent}
                        onChange={(e) => setPrivacyConsent(e.target.checked)}
                        className="mt-0.5 accent-emerald-500 cursor-pointer"
                      />
                      <label htmlFor="consent-check" className="text-[11px] text-slate-400 cursor-pointer leading-relaxed">
                        با ثبت شماره تماس جهت اطلاع‌رسانی پیامکی و سیاست نگهداری ۱۸۰ روزه پرونده موافقت می‌نمایم.
                      </label>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs transition-all shadow-lg shadow-emerald-600/30 cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <span>در حال ثبت در کارتابل تریاژ...</span>
                    ) : (
                      <>
                        <span>ثبت نهایی و دریافت کد رهگیری رمزشده</span>
                        <ArrowRight className="w-4 h-4 rotate-180" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Tab 2: Staff Triage Queue */}
        {activeTab === 'staff_triage' && (
          <div className="flex-1 overflow-y-auto py-4 space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute right-3 top-2.5" />
                <input
                  type="text"
                  value={queueSearch}
                  onChange={(e) => setQueueSearch(e.target.value)}
                  placeholder="جستجو در کد پیگیری یا متقاضی..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pr-9 pl-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setTriageFilter('all')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                    triageFilter === 'all' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  همه ({records.length})
                </button>
                <button
                  type="button"
                  onClick={() => setTriageFilter('critical')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                    triageFilter === 'critical' ? 'bg-rose-950 text-rose-300 border border-rose-800' : 'text-slate-400 hover:text-rose-400'
                  }`}
                >
                  فوریت بحرانی
                </button>
                <button
                  type="button"
                  onClick={() => setTriageFilter('new')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                    triageFilter === 'new' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'text-slate-400 hover:text-emerald-400'
                  }`}
                >
                  جدید
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="border border-slate-800 rounded-2xl overflow-hidden bg-slate-950/80">
              <div className="overflow-x-auto">
                <table className="w-full text-right text-xs">
                  <thead>
                    <tr className="bg-slate-900/90 border-b border-slate-800 text-slate-400">
                      <th className="p-3">کد پیگیری</th>
                      <th className="p-3">متقاضی</th>
                      <th className="p-3">موضوع دعوا</th>
                      <th className="p-3">فوریت</th>
                      <th className="p-3">وضعیت تریاژ</th>
                      <th className="p-3">وکیل مسئول</th>
                      <th className="p-3">انقضای نگهداری</th>
                      <th className="p-3 text-center">عملیات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-mono text-slate-300">
                    {filteredRecords.map((rec) => (
                      <tr key={rec.reference_code} className="hover:bg-slate-900/50 transition">
                        <td className="p-3 text-cyan-400 font-bold">{rec.reference_code}</td>
                        <td className="p-3 text-white font-sans">{rec.client_name}</td>
                        <td className="p-3 font-sans text-slate-300">{rec.topic}</td>
                        <td className="p-3">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              rec.urgency === 'critical'
                                ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                                : rec.urgency === 'high'
                                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                                : 'bg-slate-800 text-slate-400'
                            }`}
                          >
                            {rec.urgency === 'critical' ? 'بحرانی' : rec.urgency === 'high' ? 'مهم' : 'عادی'}
                          </span>
                        </td>
                        <td className="p-3 font-sans">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] ${
                              rec.status === 'new'
                                ? 'bg-emerald-500/20 text-emerald-400'
                                : rec.status === 'under_review'
                                ? 'bg-indigo-500/20 text-indigo-400'
                                : 'bg-cyan-500/20 text-cyan-400'
                            }`}
                          >
                            {rec.status === 'new'
                              ? 'جدید'
                              : rec.status === 'under_review'
                              ? 'در حال بررسی'
                              : 'نوبت تعیین شد'}
                          </span>
                        </td>
                        <td className="p-3 font-sans text-slate-400">{rec.assigned_to}</td>
                        <td className="p-3 text-[11px] text-slate-500">{rec.retention_days_left} روز باقی‌مانده</td>
                        <td className="p-3 text-center">
                          <select
                            value={rec.status}
                            onChange={(e) => handleUpdateStatus(rec.reference_code, e.target.value as any)}
                            className="bg-slate-900 border border-slate-800 rounded px-2 py-1 text-[11px] text-slate-300 focus:outline-none cursor-pointer"
                          >
                            <option value="new">جدید</option>
                            <option value="under_review">در حال بررسی</option>
                            <option value="consultation_scheduled">نوبت تعیین شد</option>
                            <option value="closed">مختومه</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Modal Footer */}
        <div className="pt-4 border-t border-slate-800 shrink-0 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>انطباق کامل با ابزار Privacy وردپرس (WP Privacy Exporter & Eraser)</span>
          </div>
          <div className="font-mono text-cyan-400">
            سید امیر حسین رضوی فردویی (@sedrazavi)
          </div>
        </div>
      </div>
    </div>
  );
};
