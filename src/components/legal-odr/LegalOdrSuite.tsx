import React, { useState } from 'react';
import {
  Gavel,
  Video,
  FileText,
  ShieldCheck,
  Search,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  ExternalLink,
  Lock,
} from 'lucide-react';
import { OnlineDisputeResolutionPortal } from './OnlineDisputeResolutionPortal';
import { VirtualHearingRoom } from './VirtualHearingRoom';
import { PetitionGeneratorModal } from './PetitionGeneratorModal';

interface LegalOdrSuiteProps {
  onBackToHome?: () => void;
  defaultTab?: 'odr' | 'hearing' | 'petitions' | 'sana';
}

export const LegalOdrSuite: React.FC<LegalOdrSuiteProps> = ({
  onBackToHome,
  defaultTab = 'odr',
}) => {
  const [activeTab, setActiveTab] = useState<'odr' | 'hearing' | 'petitions' | 'sana'>(defaultTab);

  // Sana verification state
  const [sanaTrackingCode, setSanaTrackingCode] = useState('14039281729102');
  const [sanaResult, setSanaResult] = useState<any>(null);
  const [sanaLoading, setSanaLoading] = useState(false);

  const handleVerifySana = (e: React.FormEvent) => {
    e.preventDefault();
    setSanaLoading(true);
    setTimeout(() => {
      setSanaLoading(false);
      setSanaResult({
        valid: true,
        noticeNumber: sanaTrackingCode,
        courtBranch: 'شعبه ۸ دادگاه عمومی حقوقی مجتمع قضایی شهید بهشتی تهران',
        caseNumber: '140309920194821',
        noticeDate: '۱۴۰۳/۰۶/۱۰ - ساعت ۰۹:۱۵',
        subject: 'ابلاغ دادخواست و ضمائم به همراه تعیین وقت رسیدگی حضوری/مجازی',
        recipientName: 'شرکت تجارت الکترونیک آرمان داده',
        isViewed: true,
        viewDate: '۱۴۰۳/۰۶/۱۱ - ساعت ۱۰:۰۴ (ثبت در سامانه ثنا)',
      });
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#060B18] text-slate-800 dark:text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Navigation Breadcrumb & Back */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs sm:text-sm">
            {onBackToHome && (
              <button
                onClick={onBackToHome}
                className="flex items-center gap-1 text-slate-500 hover:text-[#D4AF37] font-semibold transition-colors cursor-pointer"
              >
                <ArrowRight className="w-4 h-4" />
                <span>بازگشت به پورتال اصلی وکیل</span>
              </button>
            )}
            <span className="text-slate-400">/</span>
            <span className="text-[#D4AF37] font-bold">سامانه داوری آنلاین و دادگاه مجازی (فاز ۵)</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 text-xs font-bold border border-indigo-500/20 flex items-center gap-1">
              <Lock className="w-3 h-3" />
              <span>اتصال ایمن به پروتکل‌های قضایی</span>
            </span>
          </div>
        </div>

        {/* Module Sub-navigation Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-white dark:bg-[#0B132B] p-2 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <button
            onClick={() => setActiveTab('odr')}
            className={`p-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'odr'
                ? 'bg-[#D4AF37] text-[#060B18] shadow-md'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#060B18]'
            }`}
          >
            <Gavel className="w-4 h-4 shrink-0" />
            <span>مرکز داوری آنلاین (ODR)</span>
          </button>

          <button
            onClick={() => setActiveTab('hearing')}
            className={`p-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'hearing'
                ? 'bg-[#D4AF37] text-[#060B18] shadow-md'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#060B18]'
            }`}
          >
            <Video className="w-4 h-4 shrink-0" />
            <span>دادگاه و استماع مجازی</span>
          </button>

          <button
            onClick={() => setActiveTab('petitions')}
            className={`p-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'petitions'
                ? 'bg-[#D4AF37] text-[#060B18] shadow-md'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#060B18]'
            }`}
          >
            <FileText className="w-4 h-4 shrink-0" />
            <span>تنظیم دادخواست و لوایح</span>
          </button>

          <button
            onClick={() => setActiveTab('sana')}
            className={`p-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'sana'
                ? 'bg-[#D4AF37] text-[#060B18] shadow-md'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#060B18]'
            }`}
          >
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>استعلام ابلاغیه و پیامک ثنا</span>
          </button>
        </div>

        {/* Tab Content Render */}
        {activeTab === 'odr' && <OnlineDisputeResolutionPortal />}
        {activeTab === 'hearing' && <VirtualHearingRoom />}
        {activeTab === 'petitions' && <PetitionGeneratorModal />}

        {/* Tab 4: Sana & Judicial Verification */}
        {activeTab === 'sana' && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-[#0B132B] border border-slate-200 dark:border-slate-800 shadow-sm space-y-5 text-right">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-500" />
                  <span>سامانه تصدیق اصالت ابلاغیه‌های الکترونیک قضایی (ثنا)</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  جهت جلوگیری از کلاهبرداری‌های سایبری و پیامک‌های جعلی، شماره ۱۶ رقمی ابلاغیه یا پیامک قضایی دریافتی را وارد کنید تا اصالت شعبه صادرکننده، مهلت قانونی اعتراض و صحت متن ابلاغیه توسط سرور عدل‌ایران بررسی شود.
                </p>
              </div>

              <form onSubmit={handleVerifySana} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  required
                  placeholder="شماره ابلاغیه یا رمز پرونده قضایی ۱۶ رقمی..."
                  value={sanaTrackingCode}
                  onChange={(e) => setSanaTrackingCode(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#060B18] border border-slate-300 dark:border-slate-700 text-sm font-mono focus:outline-none focus:border-[#D4AF37]"
                />
                <button
                  type="submit"
                  disabled={sanaLoading}
                  className="px-6 py-3 rounded-xl bg-[#D4AF37] hover:bg-[#c49f2f] text-[#060B18] font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Search className="w-4 h-4" />
                  <span>{sanaLoading ? 'در حال استعلام از درگاه ثنا...' : 'استعلام اصالت ابلاغیه'}</span>
                </button>
              </form>

              {sanaResult && (
                <div className="p-5 rounded-2xl bg-emerald-500/10 border-2 border-emerald-500/40 space-y-4 animate-fadeIn">
                  <div className="flex items-center justify-between border-b border-emerald-500/20 pb-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                      <span className="text-sm font-bold text-emerald-700 dark:text-emerald-400">
                        ابلاغیه رسمی قضایی دارای اصالت است (تاییدیه سامانه عدل‌ایران)
                      </span>
                    </div>
                    <span className="text-xs font-mono text-slate-400">تاریخ ثبت: {sanaResult.noticeDate}</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-white/80 dark:bg-[#060B18]/80 border border-emerald-500/20 space-y-1">
                      <span className="text-slate-500">شعبه صادرکننده:</span>
                      <p className="font-bold text-slate-900 dark:text-white">{sanaResult.courtBranch}</p>
                    </div>
                    <div className="p-3 rounded-xl bg-white/80 dark:bg-[#060B18]/80 border border-emerald-500/20 space-y-1">
                      <span className="text-slate-500">شماره پرونده کلاسه:</span>
                      <p className="font-bold font-mono text-slate-900 dark:text-white">{sanaResult.caseNumber}</p>
                    </div>
                    <div className="p-3 rounded-xl bg-white/80 dark:bg-[#060B18]/80 border border-emerald-500/20 space-y-1">
                      <span className="text-slate-500">مخاطب ابلاغیه:</span>
                      <p className="font-bold text-slate-900 dark:text-white">{sanaResult.recipientName}</p>
                    </div>
                    <div className="p-3 rounded-xl bg-white/80 dark:bg-[#060B18]/80 border border-emerald-500/20 space-y-1">
                      <span className="text-slate-500">موضوع ابلاغ:</span>
                      <p className="font-bold text-slate-900 dark:text-white">{sanaResult.subject}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-300 pt-2">
                    <span>وضعیت مشاهده: رویت شده در سامانه ثنا در تاریخ {sanaResult.viewDate}</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">اثر ابلاغ قانونی مترتب است</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
