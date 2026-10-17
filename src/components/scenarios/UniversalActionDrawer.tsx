import React, { useState } from 'react';
import {
  X, CheckCircle2, Search, ArrowRight, ShieldCheck,
  Phone, Clock, FileText, Send, Zap, Headphones,
  Video, Play, Pause, ExternalLink, Calculator
} from 'lucide-react';
import { ActionDrawerMode } from '../../types/scenarios';
import { useAdminNotifications } from '../../context/NotificationContext';

interface UniversalActionDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  mode: ActionDrawerMode;
  onModeChange?: (mode: ActionDrawerMode) => void;
}

export const UniversalActionDrawer: React.FC<UniversalActionDrawerProps> = ({
  isOpen,
  onClose,
  mode,
  onModeChange,
}) => {
  const { notifyNewSubmission } = useAdminNotifications();
  const [activeTab, setActiveTab] = useState<'track' | 'booking' | 'calc'>('track');
  const [caseCode, setCaseCode] = useState('');
  const [phone, setPhone] = useState('');
  const [claimAmount, setClaimAmount] = useState('500000000');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [trackResult, setTrackResult] = useState<any>(null);

  // Booking Tab State
  const [bookingTopic, setBookingTopic] = useState('داوری بازرگانی بین‌المللی');
  const [bookingName, setBookingName] = useState('');
  const [bookingPhone, setBookingPhone] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  if (!isOpen && mode !== 'in-page') return null;

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setTrackResult({
        found: true,
        code: caseCode || 'SR-1403/982',
        title: 'داوری ارزی بازرگانی تجهیزات نیروگاهی',
        stage: 'تبادل لوایح داوری و تعیین کارشناس رسمی',
        nextSession: 'دوشنبه ۲۸ مهر ۱۴۰۳ - ساعت ۱۰:۳۰',
        progress: 85,
        court: 'شعبه ویژه داوری مرکز اتاق بازرگانی ایران',
      });

      // Alert admin of online case inquiry
      notifyNewSubmission({
        clientName: phone || 'موکل پیگیری‌کننده',
        phone: phone || 'استعلام با کد پرونده',
        subject: `استعلام آنلاین پرونده (${caseCode || 'SR-1403/982'})`,
        service: 'پیگیری آنلاین پرونده',
        source: 'case_tracker',
        priority: 'normal'
      });
    }, 700);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingName || !bookingPhone) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setBookingSuccess(true);

      // Alert admin instantly with audio chime
      notifyNewSubmission({
        clientName: bookingName,
        phone: bookingPhone,
        subject: `درخواست نوبت مشاوره از کشوی اکشن (${bookingTopic})`,
        service: bookingTopic,
        source: 'consultation_form',
        priority: 'high'
      });
    }, 600);
  };

  const calculatedFee = Math.round(Number(claimAmount || 0) * 0.05);

  const content = (
    <div className="flex flex-col h-full bg-[#0B0F19] text-white">
      {/* Drawer Header */}
      <div className="p-5 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">پورتال تعاملی اقدام و استعلام سریع</h3>
            <p className="text-[11px] text-slate-400">دسترسی بدون نیاز به ثبت‌نام اجباری</p>
          </div>
        </div>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Mode Selector Strip */}
      <div className="px-5 pt-3 pb-1 flex items-center justify-between text-xs bg-slate-900/60 border-b border-slate-800/80">
        <span className="text-slate-400 text-[11px]">حالت نمایش کشو:</span>
        <div className="flex items-center gap-1 font-mono text-[10px]">
          {(['slide-over', 'docked-media', 'in-page'] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => onModeChange?.(m)}
              className={`px-2 py-0.5 rounded transition-colors ${
                mode === m ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* Segmented Action Tabs */}
      <div className="p-3 border-b border-slate-800 bg-[#090D15]">
        <div className="grid grid-cols-3 gap-1 bg-slate-900 p-1 rounded-xl text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab('track')}
            className={`py-2 rounded-lg transition-all ${
              activeTab === 'track' ? 'bg-cyan-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            استعلام پرونده
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('booking')}
            className={`py-2 rounded-lg transition-all ${
              activeTab === 'booking' ? 'bg-cyan-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            نوبت‌دهی فوری
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('calc')}
            className={`py-2 rounded-lg transition-all ${
              activeTab === 'calc' ? 'bg-cyan-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            محاسبه هزینه
          </button>
        </div>
      </div>

      {/* Drawer Body */}
      <div className="flex-1 overflow-y-auto p-5 space-y-5">
        {activeTab === 'track' && (
          <form onSubmit={handleTrackSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">
                شماره پرونده یا کدرهگیری *
              </label>
              <input
                type="text"
                required
                value={caseCode}
                onChange={(e) => setCaseCode(e.target.value)}
                placeholder="مثال: SR-1403/982 یا ۹۸۴۲"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">
                شماره همراه موکل (جهت تایید پیامکی)
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="۰۹۱۲xxxxxxx"
                dir="ltr"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-500"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>در حال استعلام از دیتابیس...</span>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  <span>استعلام آنی وضعیت پرونده</span>
                </>
              )}
            </button>

            {/* Results Simulation */}
            {trackResult && (
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-cyan-500/40 space-y-3 mt-4 text-xs">
                <div className="flex items-center justify-between text-cyan-400 font-mono text-[11px]">
                  <span>{trackResult.code}</span>
                  <span className="text-emerald-400 font-sans font-bold">● پرونده فعال</span>
                </div>
                <h4 className="text-sm font-bold text-white">{trackResult.title}</h4>
                <div className="space-y-1 text-slate-300 text-[11px]">
                  <div>مرحله فعلی: <span className="text-cyan-300">{trackResult.stage}</span></div>
                  <div>جلسه بعدی: <span className="font-mono text-white">{trackResult.nextSession}</span></div>
                  <div>مرجع رسیدگی: <span className="text-slate-400">{trackResult.court}</span></div>
                </div>
                <div className="space-y-1 pt-1">
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>پیشرفت مراحل دادرسی</span>
                    <span className="font-mono text-cyan-400">{trackResult.progress}٪</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-cyan-400 h-full rounded-full" style={{ width: `${trackResult.progress}%` }} />
                  </div>
                </div>
              </div>
            )}
          </form>
        )}

        {activeTab === 'booking' && (
          bookingSuccess ? (
            <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3 animate-in fade-in">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-white">درخواست نوبت با موفقیت ثبت شد</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                درخواست شما برای موضوع «{bookingTopic}» به وکیل اطلاع داده شد. به زودی با شماره {bookingPhone} تماس برقرار خواهد شد.
              </p>
              <button
                type="button"
                onClick={() => {
                  setBookingSuccess(false);
                  setBookingName('');
                  setBookingPhone('');
                }}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 font-bold transition-colors cursor-pointer"
              >
                ثبت درخواست دیگر
              </button>
            </div>
          ) : (
            <form onSubmit={handleBookingSubmit} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="text-slate-300 font-semibold">موضوع مشاوره تخصصی</label>
                <select
                  value={bookingTopic}
                  onChange={(e) => setBookingTopic(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-500"
                >
                  <option>داوری بازرگانی بین‌المللی</option>
                  <option>دعاوی مالیاتی و دیوان عدالت</option>
                  <option>جرایم اقتصادی و بانکی</option>
                  <option>قراردادهای تجاری و فناوری</option>
                  <option>دعاوی ملکی و سرقفلی</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-slate-300 font-semibold">نام و نام‌خانوادگی *</label>
                <input
                  type="text"
                  required
                  value={bookingName}
                  onChange={(e) => setBookingName(e.target.value)}
                  placeholder="نام متقاضی"
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-500"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-slate-300 font-semibold">شماره تماس مستقیم *</label>
                <input
                  type="tel"
                  required
                  value={bookingPhone}
                  onChange={(e) => setBookingPhone(e.target.value)}
                  placeholder="0912xxxxxxx"
                  dir="ltr"
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-500"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? 'در حال ثبت...' : 'ثبت اولیه وقت مشاوره حضوری/آنلاین'}</span>
              </button>
            </form>
          )
        )}

        {activeTab === 'calc' && (
          <div className="space-y-4 text-xs">
            <div className="space-y-1.5">
              <label className="text-slate-300 font-semibold">بهای خواسته / ارزش ریالی دعوی (تومان)</label>
              <input
                type="number"
                value={claimAmount}
                onChange={(e) => setClaimAmount(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono text-sm"
              />
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2 text-[11px]">
              <div className="flex justify-between text-slate-400">
                <span>هزینه دادرسی بدوی (۳.۵٪):</span>
                <span className="font-mono text-white">{(Number(claimAmount) * 0.035).toLocaleString('fa-IR')} تومان</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>حق‌الوکاله پایه بر مبنای تعرفه مصوب:</span>
                <span className="font-mono text-cyan-400">{calculatedFee.toLocaleString('fa-IR')} تومان</span>
              </div>
              <div className="flex justify-between text-slate-400 pt-2 border-t border-slate-800">
                <span className="text-white font-bold">برآورد کل فرآیند:</span>
                <span className="font-mono text-emerald-400 font-bold">{(calculatedFee + Number(claimAmount) * 0.035).toLocaleString('fa-IR')} تومان</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="p-4 border-t border-slate-800 bg-[#090D15] text-[11px] text-slate-400 flex items-center justify-between">
        <span className="flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>امنیت داده با رمزنگاری TLS 1.3</span>
        </span>
        <span>تلفن دفتر: ۰۲۱-۸۸۹۹۰۰۱۱</span>
      </div>
    </div>
  );

  if (mode === 'in-page') {
    return <div className="rounded-3xl overflow-hidden border border-slate-800 shadow-2xl h-full">{content}</div>;
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Container */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md shadow-2xl transform transition-transform duration-300">
          {content}
        </div>
      </div>
    </div>
  );
};
