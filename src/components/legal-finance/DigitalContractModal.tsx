import React, { useState, useRef, useEffect } from 'react';
import {
  FileText,
  PenTool,
  CheckCircle2,
  Download,
  Printer,
  Copy,
  Scale,
  Shield,
  QrCode,
  Calendar,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  User,
  Phone,
  CreditCard,
  Lock,
} from 'lucide-react';
import { ATTORNEY_INFO } from '../../data/mockData';

interface DigitalContractModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  defaultClientName?: string;
  defaultClientPhone?: string;
}

export const DigitalContractModal: React.FC<DigitalContractModalProps> = ({
  defaultClientName = '',
  defaultClientPhone = '',
}) => {
  // Form fields
  const [clientName, setClientName] = useState(defaultClientName || 'مهندس رضا شمس‌آبادی');
  const [nationalId, setNationalId] = useState('۰۰۷۱۲۳۴۵۶۷');
  const [sanaCode, setSanaCode] = useState('SANA-1403-99812');
  const [clientPhone, setClientPhone] = useState(defaultClientPhone || '09123456789');
  const [subjectMatter, setSubjectMatter] = useState('وکالت در خصوص دفاع از دعوای خلع ید و مطالبه اجرت‌المثل ایام تصرف پلاک ثبتی ۱۲۳۴/۵۶');
  const [retainerAmount, setRetainerAmount] = useState('۴۵۰,۰۰۰,۰۰۰ ریال');
  const [downPayment, setDownPayment] = useState('۱۵۰,۰۰۰,۰۰۰ ریال');
  const [paymentSchedule, setPaymentSchedule] = useState('سه مرحله: بیعانه در زمان امضا، قسط دوم پس از تشکیل نخستین جلسه دادرسی، قسط نهایی پس از صدور دادنامه بدوی');

  // Powers
  const [allowAppeal, setAllowAppeal] = useState(true);
  const [allowArbitration, setAllowArbitration] = useState(true);
  const [allowCompromise, setAllowCompromise] = useState(false);
  const [allowExpertAssertion, setAllowExpertAssertion] = useState(true);

  // Signature canvas
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);
  const [signatureDataUrl, setSignatureDataUrl] = useState<string | null>(null);
  const [isContractSigned, setIsContractSigned] = useState(false);
  const [contractTrackingId] = useState(`AGR-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.strokeStyle = '#0B132B';
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
    setHasSignature(true);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    if (canvasRef.current && hasSignature) {
      setSignatureDataUrl(canvasRef.current.toDataURL());
    }
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSignature(false);
    setSignatureDataUrl(null);
    setIsContractSigned(false);
  };

  const handleSignContract = () => {
    if (!hasSignature) {
      alert('لطفاً پیش از ثبت نهایی، محل امضای موکل را در کادر امضا نمایید.');
      return;
    }
    setIsContractSigned(true);
  };

  return (
    <div className="bg-white dark:bg-[#0B132B] rounded-3xl p-6 sm:p-8 border border-gray-200 dark:border-gray-800 shadow-xl space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 text-white flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-bold font-serif text-[#0B132B] dark:text-white">
                سامانه قرارداد الکترونیک وکالت و امضای دیجیتال
              </h2>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-xs font-bold border border-emerald-500/30">
                قانون تجارت الکترونیک ماده ۶
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              تنظیم قرارداد رسمی حق‌الوکاله منطبق با سامانه ثبت قراردادهای قوه قضاییه با امضای دیجیتال قلمی موکل
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="px-3.5 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 text-xs font-bold flex items-center gap-1.5 transition-all"
          >
            <Printer className="w-4 h-4" />
            <span>چاپ سند رسمی</span>
          </button>
        </div>
      </div>

      {/* Contract Preview & Editor Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Editor Settings (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-4">
            <h3 className="text-xs font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2 border-b border-gray-200 dark:border-gray-700 pb-2">
              <User className="w-4 h-4 text-[#D4AF37]" />
              مشخصات موکل و احراز هویت ثنا
            </h3>

            <div>
              <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                نام و نام خانوادگی موکل
              </label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                  کد ملی موکل
                </label>
                <input
                  type="text"
                  value={nationalId}
                  onChange={(e) => setNationalId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-mono text-center focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                  کد ثبت ثنا
                </label>
                <input
                  type="text"
                  value={sanaCode}
                  onChange={(e) => setSanaCode(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-mono text-center focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                موضوع و محدوده وکالت
              </label>
              <textarea
                rows={2}
                value={subjectMatter}
                onChange={(e) => setSubjectMatter(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs leading-relaxed focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                  کل حق‌الوکاله
                </label>
                <input
                  type="text"
                  value={retainerAmount}
                  onChange={(e) => setRetainerAmount(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs text-center font-bold focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                  پیش‌پرداخت (بیعانه)
                </label>
                <input
                  type="text"
                  value={downPayment}
                  onChange={(e) => setDownPayment(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs text-center font-bold focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                حدود اختیارات ماده ۳۵ قانون آیین دادرسی مدنی
              </label>
              <div className="space-y-1.5 text-xs text-gray-700 dark:text-gray-300">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={allowAppeal}
                    onChange={(e) => setAllowAppeal(e.target.checked)}
                    className="rounded text-[#D4AF37]"
                  />
                  <span>وکالت راجع به اعتراض به رای، تجدیدنظر، فرجام و اعاده دادرسی</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={allowArbitration}
                    onChange={(e) => setAllowArbitration(e.target.checked)}
                    className="rounded text-[#D4AF37]"
                  />
                  <span>وکالت در ارجاع دعوا به داوری و تعیین داور</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={allowCompromise}
                    onChange={(e) => setAllowCompromise(e.target.checked)}
                    className="rounded text-[#D4AF37]"
                  />
                  <span>وکالت در صلح و سازش و اعلام رضایت قطعی</span>
                </label>
              </div>
            </div>
          </div>

          {/* e-Signature Pad */}
          <div className="p-4 rounded-2xl bg-[#D4AF37]/5 border border-[#D4AF37]/30 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#0B132B] dark:text-white flex items-center gap-1.5">
                <PenTool className="w-4 h-4 text-[#D4AF37]" />
                پد الکترونیک امضای دیجیتال موکل
              </span>
              <button
                type="button"
                onClick={clearSignature}
                className="text-[11px] text-red-500 hover:underline flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                پاکسازی
              </button>
            </div>

            <div className="bg-white rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 overflow-hidden relative touch-none">
              <canvas
                ref={canvasRef}
                width={360}
                height={120}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
                className="w-full h-[120px] cursor-crosshair bg-white"
              />
              {!hasSignature && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-xs text-gray-400">
                  انگشت یا قلم خود را اینجا برای امضا حرکت دهید
                </div>
              )}
            </div>

            <button
              onClick={handleSignContract}
              disabled={!hasSignature || isContractSigned}
              className={`w-full py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                isContractSigned
                  ? 'bg-emerald-600 text-white'
                  : hasSignature
                  ? 'btn-gold shadow-lg'
                  : 'bg-gray-200 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
              }`}
            >
              {isContractSigned ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>قرارداد با موفقیت به امضای الکترونیک رسید</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>تایید و امضای رسمی سند قرارداد</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Contract Sheet Preview (7 cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-[#070D1E] rounded-3xl p-6 sm:p-8 border-2 border-gray-300 dark:border-gray-700 shadow-2xl space-y-6 text-[#0B132B] dark:text-gray-100 font-serif leading-relaxed text-xs sm:text-sm">
          {/* Header of Contract Paper */}
          <div className="text-center pb-4 border-b-2 border-[#D4AF37] space-y-1">
            <div className="flex items-center justify-center gap-2 text-[#D4AF37]">
              <Scale className="w-5 h-5" />
              <span className="font-bold text-base">دفتر وکالت و مشاوره حقوقی {ATTORNEY_INFO.name}</span>
            </div>
            <h4 className="text-base sm:text-lg font-bold">
              قرارداد الکترونیک حق‌الوکاله و قبول وکالت
            </h4>
            <div className="flex justify-center items-center gap-4 text-[11px] text-gray-500 font-mono pt-1">
              <span>شماره قرارداد: {contractTrackingId}</span>
              <span>تاریخ تنظیم: ۱۴۰۳/۰۶/۲۵</span>
              <span>محل انعقاد: سامانه پورتال الکترونیک</span>
            </div>
          </div>

          {/* Article 1: Parties */}
          <div className="space-y-1">
            <span className="font-bold text-[#AA820A] dark:text-[#D4AF37] block">
              ماده ۱ - طرفین قرارداد:
            </span>
            <p className="text-justify text-gray-700 dark:text-gray-300">
              این قرارداد فیمابین <strong>{ATTORNEY_INFO.name}</strong> (وکیل پایه یک دادگستری و مشاور حقوقی، پروانه شماره {ATTORNEY_INFO.licenseNumber}) به عنوان وکیل از یک طرف، و <strong>{clientName}</strong> به شماره ملی {nationalId} و کد ثنا {sanaCode} به عنوان موکل منعقد گردید.
            </p>
          </div>

          {/* Article 2: Subject */}
          <div className="space-y-1">
            <span className="font-bold text-[#AA820A] dark:text-[#D4AF37] block">
              ماده ۲ - موضوع وکالت:
            </span>
            <p className="text-justify text-gray-700 dark:text-gray-300">
              {subjectMatter} و کلیه اقدامات قانونی لازم در مراجع قضایی، شبه‌قضایی، اجرای احکام مدنی و شوراهای حل اختلاف.
            </p>
          </div>

          {/* Article 3: Retainer & Payment */}
          <div className="space-y-1">
            <span className="font-bold text-[#AA820A] dark:text-[#D4AF37] block">
              ماده ۳ - حق‌الوکاله و ترتیب پرداخت:
            </span>
            <p className="text-justify text-gray-700 dark:text-gray-300">
              کل حق‌الوکاله توافق‌شده مبلغ <strong>{retainerAmount}</strong> تعیین گردید که مبلغ <strong>{downPayment}</strong> آن به عنوان پیش‌پرداخت تسلیم گردید و الباقی بر اساس تقویم توافقی زیر وصول خواهد شد:
              <br />
              {paymentSchedule}
            </p>
          </div>

          {/* Article 4: Authority */}
          <div className="space-y-1">
            <span className="font-bold text-[#AA820A] dark:text-[#D4AF37] block">
              ماده ۴ - اختیارات وکیل:
            </span>
            <p className="text-justify text-gray-700 dark:text-gray-300">
              وکیل دارای اختیارات مندرج در مواد ۳۵ و ۳۶ قانون آیین دادرسی مدنی شامل تجدیدنظرخواهی ({allowAppeal ? 'دارد' : 'ندارد'})، ارجاع به داوری ({allowArbitration ? 'دارد' : 'ندارد'}) و مصالحه و سازش ({allowCompromise ? 'دارد' : 'ندارد'}) می‌باشد.
            </p>
          </div>

          {/* Signatures & Seal Area */}
          <div className="pt-6 border-t border-gray-200 dark:border-gray-800 grid grid-cols-2 gap-6 items-end">
            {/* Attorney Signature & Official Seal */}
            <div className="text-center space-y-2">
              <span className="text-xs font-bold block text-gray-600 dark:text-gray-300">
                امضا و مهر رسمی وکیل دادگستری
              </span>
              <div className="h-20 flex flex-col items-center justify-center p-2 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700">
                <div className="w-10 h-10 rounded-full border-2 border-[#D4AF37] text-[#D4AF37] flex items-center justify-center font-bold text-[10px]">
                  مهر رسمی
                </div>
                <span className="text-[10px] text-gray-400 font-mono mt-1">تایید امضای دیجیتال ثنا</span>
              </div>
            </div>

            {/* Client Signature */}
            <div className="text-center space-y-2">
              <span className="text-xs font-bold block text-gray-600 dark:text-gray-300">
                امضای الکترونیک موکل ({clientName})
              </span>
              <div className="h-20 flex items-center justify-center p-2 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700">
                {signatureDataUrl ? (
                  <img src={signatureDataUrl} alt="امضای موکل" className="max-h-16 object-contain" />
                ) : (
                  <span className="text-[11px] text-gray-400 italic">در انتظار ثبت امضا...</span>
                )}
              </div>
            </div>
          </div>

          {/* Official Verification Bar */}
          <div className="pt-3 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between text-[10px] text-gray-500 font-mono">
            <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold">
              <Shield className="w-3.5 h-3.5" />
              سند رمزنگاری‌شده با هش SHA-256 و دارای اعتبار در محاکم دادگستری
            </span>
            <span className="flex items-center gap-1">
              <QrCode className="w-3.5 h-3.5 text-[#D4AF37]" />
              {contractTrackingId}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
