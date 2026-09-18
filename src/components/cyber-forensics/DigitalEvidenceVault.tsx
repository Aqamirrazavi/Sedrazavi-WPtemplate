import React, { useState } from 'react';
import {
  FileCode2,
  CheckCircle2,
  AlertTriangle,
  Copy,
  Check,
  ShieldCheck,
  Hash,
  Clock,
  UserCheck,
  Scale,
  RefreshCw,
  Eye,
  FileText
} from 'lucide-react';
import { DIGITAL_EVIDENCE_MOCK_DATA } from '../../data/mockData';
import { DigitalEvidenceItem } from '../../types/theme';

export const DigitalEvidenceVault: React.FC = () => {
  const [evidenceList, setEvidenceList] = useState<DigitalEvidenceItem[]>(DIGITAL_EVIDENCE_MOCK_DATA);
  const [selectedItem, setSelectedItem] = useState<DigitalEvidenceItem>(DIGITAL_EVIDENCE_MOCK_DATA[0]);
  const [isCopied, setIsCopied] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<string | null>(null);

  // New Evidence Form
  const [newTitle, setNewTitle] = useState('');
  const [newType, setNewType] = useState<DigitalEvidenceItem['evidenceType']>('چت و اسکرین‌شات پیام‌رسان‌ها');
  const [newRawText, setNewRawText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCopyHash = (hash: string) => {
    navigator.clipboard.writeText(hash);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleVerifyIntegrity = (item: DigitalEvidenceItem) => {
    setIsVerifying(true);
    setVerificationResult(null);
    setTimeout(() => {
      setIsVerifying(false);
      setVerificationResult(`تطبیق ۱۰۰٪ موفقیت‌آمیز: هش داده استخراج‌شده با برچسب زنجیره امانت (${item.sha256Checksum.substring(0, 16)}...) همخوانی کامل دارد و هیچ نشانه‌ای از دستکاری یا تزریق بایت جعلی یافت نشد.`);
    }, 1200);
  };

  const handleRegisterEvidence = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newRawText.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      // Generate a mock SHA-256 hash
      const dummyHash = Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
      const newItem: DigitalEvidenceItem = {
        id: `ev-${Date.now().toString().slice(-4)}`,
        title: newTitle,
        evidenceType: newType,
        custodyStatus: 'پلمب دیجیتال و هش‌گذاری',
        sha256Checksum: dummyHash,
        extractionTimestamp: 'هم‌اکنون - لحظه‌ای',
        collectorName: 'دفتر وکالت و داوری دکتر سیده مریم رضوی (پورتال امن)',
        cyberPoliceFataRegistered: true,
        legalAdmissibilityScore: 94,
        statutoryBasis: 'ماده ۶۵۵ قانون آیین دادرسی کیفری و قانون جرایم رایانه‌ای',
        chainOfCustodyNotes: `داده‌پیام با پلمب زمانی معتبر و رمزنگاری کلید خصوصی ثبت گردید. خلاصه متن: ${newRawText.substring(0, 50)}...`
      };

      setEvidenceList([newItem, ...evidenceList]);
      setSelectedItem(newItem);
      setNewTitle('');
      setNewRawText('');
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="space-y-6" dir="rtl">
      {/* Header Info */}
      <div className="bg-white dark:bg-[#0B132B] p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#AA820A] dark:text-[#D4AF37] font-semibold mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span>استاندارد ISO/IEC 27037 و مواد ۵۰ تا ۵۴ قانون جرایم رایانه‌ای</span>
            </div>
            <h2 className="text-xl font-bold font-serif text-[#0B132B] dark:text-white">
              گاوصندوق ادله الکترونیکی و زنجیره نگهداری قانونی (Chain of Custody)
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              ثبت، هش‌گذاری بلادرنگ (SHA-256)، امضای زمانی و سنجش قابلیت پذیرش قضایی داده‌پیام‌ها در دادسرا و دادگاه
            </p>
          </div>

          <div className="flex items-center gap-2 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-2 rounded-xl border border-emerald-200 dark:border-emerald-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300">
              اعتبار ادله الکترونیکی برابر با اسناد کتبی (ماده ۱۲ ق.ت.ا)
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (Evidence List) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white dark:bg-[#0B132B] p-4 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm space-y-3">
            <h3 className="text-sm font-bold font-serif text-[#0B132B] dark:text-white flex items-center justify-between">
              <span>ادله الکترونیکی پلمب‌شده پرونده‌ها</span>
              <span className="text-xs text-gray-400 font-sans font-normal">{evidenceList.length} سند دیجیتال</span>
            </h3>

            <div className="space-y-2.5 max-h-[460px] overflow-y-auto pr-1">
              {evidenceList.map((item) => {
                const isSelected = selectedItem.id === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      setSelectedItem(item);
                      setVerificationResult(null);
                    }}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer text-right space-y-2 ${
                      isSelected
                        ? 'border-[#D4AF37] bg-[#D4AF37]/10 dark:bg-[#D4AF37]/15 shadow-sm'
                        : 'border-gray-100 dark:border-gray-800 bg-gray-50/70 dark:bg-gray-800/40 hover:border-gray-300 dark:hover:border-gray-700'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-xs font-bold text-[#0B132B] dark:text-white leading-snug">
                        {item.title}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 shrink-0">
                        {item.custodyStatus}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-gray-500 dark:text-gray-400 pt-1 border-t border-gray-200/50 dark:border-gray-700/50">
                      <span className="flex items-center gap-1 font-mono text-[10px]">
                        <Hash className="w-3 h-3 text-[#D4AF37]" />
                        {item.sha256Checksum.substring(0, 12)}...
                      </span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">
                        قبول قضایی: {item.legalAdmissibilityScore}٪
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Register Box */}
          <form onSubmit={handleRegisterEvidence} className="bg-white dark:bg-[#0B132B] p-4 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm space-y-3">
            <h4 className="text-xs font-bold text-[#0B132B] dark:text-white flex items-center gap-1.5 font-serif">
              <FileCode2 className="w-4 h-4 text-[#D4AF37]" />
              ثبت و هش‌گذاری فوری مدرک دیجیتال جدید
            </h4>

            <div>
              <label className="block text-[11px] text-gray-600 dark:text-gray-400 mb-1">عنوان دلیل یا سرنخ:</label>
              <input
                type="text"
                placeholder="مثال: پرینت تراکنش صرافی نوبیتکس و لاگ سرور"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-[#0B132B] dark:text-white outline-none focus:ring-1 focus:ring-[#D4AF37]"
                required
              />
            </div>

            <div>
              <label className="block text-[11px] text-gray-600 dark:text-gray-400 mb-1">نوع داده‌پیام:</label>
              <select
                value={newType}
                onChange={(e) => setNewType(e.target.value as any)}
                className="w-full text-xs p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-[#0B132B] dark:text-white outline-none"
              >
                <option value="چت و اسکرین‌شات پیام‌رسان‌ها">چت و اسکرین‌شات پیام‌رسان‌ها</option>
                <option value="لاگ سرور و آدرس IP">لاگ سرور و آدرس IP</option>
                <option value="تراکنش بلاک‌چین (TXID)">تراکنش بلاک‌چین (TXID)</option>
                <option value="ایمیل و هدر پروتکل SMTP">ایمیل و هدر پروتکل SMTP</option>
                <option value="صوت ضبط‌شده و فراداده EXIF">صوت ضبط‌شده و فراداده EXIF</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] text-gray-600 dark:text-gray-400 mb-1">متن خام یا هش داده جهت تثبیت:</label>
              <textarea
                rows={2}
                placeholder="محتوای متنی پیامک، اطلاعات هدر یا هش اصلی..."
                value={newRawText}
                onChange={(e) => setNewRawText(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-[#0B132B] dark:text-white outline-none focus:ring-1 focus:ring-[#D4AF37]"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B38B22] text-[#060B18] font-bold text-xs hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  در حال استخراج هش SHA-256 و پلمب...
                </>
              ) : (
                <>
                  <ShieldCheck className="w-3.5 h-3.5" />
                  تثبیت و ثبت در زنجیره نگهداری
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Column (Detailed Forensic Inspector) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white dark:bg-[#0B132B] p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm space-y-5">
            {/* Title & Type */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-gray-100 dark:border-gray-800">
              <div>
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-md bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                  {selectedItem.evidenceType}
                </span>
                <h3 className="text-base font-bold font-serif text-[#0B132B] dark:text-white mt-2">
                  {selectedItem.title}
                </h3>
              </div>

              <div className="text-left">
                <span className="text-[10px] text-gray-400 block">شاخص پذیرش در دادگاه</span>
                <span className="text-2xl font-bold font-serif text-emerald-600 dark:text-emerald-400">
                  {selectedItem.legalAdmissibilityScore}٪
                </span>
              </div>
            </div>

            {/* Cryptographic Hash Bar */}
            <div className="p-3.5 rounded-xl bg-gray-900 text-gray-200 font-mono text-xs space-y-1.5 border border-gray-800">
              <div className="flex items-center justify-between text-gray-400 text-[10px]">
                <span className="flex items-center gap-1">
                  <Hash className="w-3 h-3 text-[#D4AF37]" />
                  SHA-256 Checksum (اثرانگشت رمزنگاری غیرقابل جعل):
                </span>
                <button
                  onClick={() => handleCopyHash(selectedItem.sha256Checksum)}
                  className="hover:text-white text-[#D4AF37] flex items-center gap-1 transition-colors cursor-pointer"
                  title="کپی اثرانگشت دیجیتال"
                >
                  {isCopied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{isCopied ? 'کپی شد' : 'کپی هش'}</span>
                </button>
              </div>
              <p className="text-[11px] break-all text-amber-300/90 tracking-wider">
                {selectedItem.sha256Checksum}
              </p>
            </div>

            {/* Metadata Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/40 space-y-1">
                <span className="text-gray-400 text-[10px] flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#D4AF37]" />
                  زمان دقیق استخراج و پلمب:
                </span>
                <span className="font-bold text-[#0B132B] dark:text-white font-mono">
                  {selectedItem.extractionTimestamp}
                </span>
              </div>

              <div className="p-3 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/40 space-y-1">
                <span className="text-gray-400 text-[10px] flex items-center gap-1">
                  <UserCheck className="w-3 h-3 text-[#D4AF37]" />
                  مقام یا کارشناس استخراج‌کننده:
                </span>
                <span className="font-bold text-[#0B132B] dark:text-white">
                  {selectedItem.collectorName}
                </span>
              </div>
            </div>

            {/* Statutory Basis & Legal Weight */}
            <div className="p-4 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/60 space-y-2">
              <span className="text-xs font-bold text-amber-900 dark:text-amber-300 flex items-center gap-1.5">
                <Scale className="w-4 h-4 text-[#D4AF37]" />
                مبنای قانونی و ادله اثبات دعوا در محاکم:
              </span>
              <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed font-sans">
                {selectedItem.statutoryBasis}
              </p>
            </div>

            {/* Chain of Custody Forensic Log */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-[#D4AF37]" />
                یادداشت‌های زنجیره نگهداری و رعایت تشریفات جرم‌یابی:
              </span>
              <div className="p-3.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/40 text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                {selectedItem.chainOfCustodyNotes}
              </div>
            </div>

            {/* Verification Button & Result */}
            <div className="pt-2 border-t border-gray-100 dark:border-gray-800 space-y-3">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleVerifyIntegrity(selectedItem)}
                  disabled={isVerifying}
                  className="px-4 py-2.5 rounded-xl bg-[#0B132B] dark:bg-white text-white dark:text-[#0B132B] text-xs font-bold hover:bg-[#D4AF37] dark:hover:bg-[#D4AF37] dark:hover:text-[#060B18] transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isVerifying ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      در حال اعتبارسنجی بیتی در کانتینر ایزوله...
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-3.5 h-3.5" />
                      استعلام برخط یکپارچگی و اصالت هش
                    </>
                  )}
                </button>
              </div>

              {verificationResult && (
                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-300 leading-relaxed animate-in fade-in flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{verificationResult}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
