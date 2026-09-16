import React, { useState } from 'react';
import {
  CreditCard,
  Receipt,
  Wallet,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  ArrowDownLeft,
  Printer,
  Download,
  ShieldCheck,
  Building2,
  QrCode,
  Lock,
  ExternalLink,
  ChevronRight,
  Check,
  AlertCircle,
  Copy,
} from 'lucide-react';
import { ATTORNEY_INFO } from '../../data/mockData';

export const LegalPaymentInvoice: React.FC = () => {
  const [selectedService, setSelectedService] = useState<'consultation' | 'retainer_stage' | 'draft_petition' | 'arbitration'>('consultation');
  const [payerName, setPayerName] = useState('مهندس رضا شمس‌آبادی');
  const [payerPhone, setPayerPhone] = useState('09123456789');
  const [caseNumber, setCaseNumber] = useState('SR-1403-9941');
  const [selectedGateway, setSelectedGateway] = useState<'shaparak_mellat' | 'zarinpal' | 'saman'>('zarinpal');
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success'>('idle');

  // Wallet State
  const [walletBalance, setWalletBalance] = useState(35000000); // 35 million Tomans

  const servicesMap = {
    consultation: {
      title: 'رزرو نوبت مشاوره تخصصی حقوقی (حضوری / آنلاین ۶۰ دقیقه)',
      amount: 2500000, // 250,000 Tomans
      tax: 225000,
      total: 2725000,
      code: 'SRV-CNS-01',
    },
    retainer_stage: {
      title: 'قسط اول بیعانه حق‌الوکاله پرونده ملکی ثبتی',
      amount: 150000000,
      tax: 13500000,
      total: 163500000,
      code: 'SRV-RET-02',
    },
    draft_petition: {
      title: 'تنظیم تخصصی دادخواست دیوان عدالت اداری و لایحه تجدیدنظر',
      amount: 12000000,
      tax: 1080000,
      total: 13080000,
      code: 'SRV-DFT-03',
    },
    arbitration: {
      title: 'هزینه داوری حقوقی و صدور رای داور مرضی‌الطرفین',
      amount: 45000000,
      tax: 4050000,
      total: 49050000,
      code: 'SRV-ARB-04',
    },
  };

  const currentItem = servicesMap[selectedService];

  const handleSimulatePayment = () => {
    setPaymentStatus('processing');
    setTimeout(() => {
      setPaymentStatus('success');
      setWalletBalance((prev) => prev + currentItem.total);
    }, 1500);
  };

  const formatPrice = (val: number) => {
    return new Intl.NumberFormat('fa-IR').format(val) + ' تومان';
  };

  const [referenceId] = useState(`TXN-${Math.floor(100000000 + Math.random() * 900000000)}`);

  return (
    <div className="bg-white dark:bg-[#0B132B] rounded-3xl p-6 sm:p-8 border border-gray-200 dark:border-gray-800 shadow-xl space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-[#D4AF37] text-white flex items-center justify-center shadow-lg shadow-amber-500/20">
            <CreditCard className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-bold font-serif text-[#0B132B] dark:text-white">
                درگاه پرداخت آنلاین، صورت‌حساب رسمی و کیف پول امانی
              </h2>
              <span className="px-2.5 py-0.5 rounded-full bg-[#D4AF37]/15 text-[#AA820A] dark:text-[#F3E5AB] text-xs font-bold border border-[#D4AF37]/30">
                WooCommerce Legal Ready
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              صدور فاکتور الکترونیک ممهور به شناسه مالیاتی، واریز مستقیم حق‌الوکاله و تسویه‌حساب ایمن پرونده‌ها
            </p>
          </div>
        </div>

        {/* Client Escrow Wallet Box */}
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#0B132B] dark:bg-gray-900 border border-[#D4AF37]/40 text-white">
          <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37]">
            <Wallet className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-gray-400 block font-medium">موجودی حساب امانی موکل</span>
            <span className="text-sm font-bold font-mono text-[#D4AF37]">
              {formatPrice(walletBalance)}
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid: Checkout on Left, Official Tax Invoice on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Payment Form (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          <div className="p-5 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-4">
            <h3 className="text-xs font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2 border-b border-gray-200 dark:border-gray-700 pb-2">
              <Receipt className="w-4 h-4 text-[#D4AF37]" />
              انتخاب ردیف خدمات یا قسط حق‌الوکاله
            </h3>

            <div className="space-y-2">
              <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400">
                عنوان خدمت حقوقی
              </label>
              <select
                value={selectedService}
                onChange={(e: any) => setSelectedService(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-bold focus:outline-none focus:border-[#D4AF37]"
              >
                <option value="consultation">رزرو مشاوره تخصصی (۲۵۰,۰۰۰ تومان)</option>
                <option value="retainer_stage">قسط اول بیعانه حق‌الوکاله (۱۵,۰۰۰,۰۰۰ تومان)</option>
                <option value="draft_petition">تنظیم لایحه دفاعیه / دادخواست (۱,۲۰۰,۰۰۰ تومان)</option>
                <option value="arbitration">داوری مرضی‌الطرفین تجاری (۴,۵۰۰,۰۰۰ تومان)</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                  نام و نام خانوادگی موکل
                </label>
                <input
                  type="text"
                  value={payerName}
                  onChange={(e) => setPayerName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                  شماره پرونده مرتبط
                </label>
                <input
                  type="text"
                  value={caseNumber}
                  onChange={(e) => setCaseNumber(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-mono text-center focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>

            {/* Gateway Selection */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">
                انتخاب درگاه بانکی متصل به شاپرک
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedGateway('zarinpal')}
                  className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 transition-all ${
                    selectedGateway === 'zarinpal'
                      ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-[#0B132B] dark:text-white'
                      : 'border-gray-200 dark:border-gray-700 hover:border-[#D4AF37]/50'
                  }`}
                >
                  <span className="text-amber-500 font-bold">زرین‌پال</span>
                  <span className="text-[10px] text-gray-400">پرداخت سریع</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedGateway('shaparak_mellat')}
                  className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 transition-all ${
                    selectedGateway === 'shaparak_mellat'
                      ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-[#0B132B] dark:text-white'
                      : 'border-gray-200 dark:border-gray-700 hover:border-[#D4AF37]/50'
                  }`}
                >
                  <span className="text-red-500 font-bold">به‌پرداخت ملت</span>
                  <span className="text-[10px] text-gray-400">شبکه شتاب</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedGateway('saman')}
                  className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 transition-all ${
                    selectedGateway === 'saman'
                      ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-[#0B132B] dark:text-white'
                      : 'border-gray-200 dark:border-gray-700 hover:border-[#D4AF37]/50'
                  }`}
                >
                  <span className="text-blue-500 font-bold">سپ سامان</span>
                  <span className="text-[10px] text-gray-400">شاپرک مستقیم</span>
                </button>
              </div>
            </div>

            {/* Pay Button */}
            <button
              onClick={handleSimulatePayment}
              disabled={paymentStatus === 'processing'}
              className="w-full btn-gold py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-[#D4AF37]/20 cursor-pointer"
            >
              {paymentStatus === 'processing' ? (
                <>
                  <Clock className="w-4 h-4 animate-spin" />
                  <span>اتصال امن به سامانه شاپرک و درگاه پرداخت...</span>
                </>
              ) : paymentStatus === 'success' ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>پرداخت با موفقیت انجام و رسید صادر شد</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>پرداخت آنلاین مبلغ {formatPrice(currentItem.total)}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right: Official Tax Invoice Preview (7 cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-[#070D1E] rounded-3xl p-6 sm:p-8 border-2 border-gray-200 dark:border-gray-700 shadow-xl space-y-6">
          {/* Invoice Header */}
          <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-700">
            <div>
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-[#D4AF37]" />
                <span className="font-bold text-base font-serif text-[#0B132B] dark:text-white">
                  دفتر وکالت {ATTORNEY_INFO.name}
                </span>
              </div>
              <p className="text-[11px] text-gray-500 mt-0.5">
                صورت‌حساب رسمی الکترونیکی خدمات حقوقی و وکالت
              </p>
            </div>

            <div className="text-left font-mono text-xs">
              <span className="text-[10px] text-gray-400 block">شماره فاکتور:</span>
              <span className="font-bold text-[#D4AF37]">{referenceId}</span>
              <span className="text-[10px] text-gray-400 block mt-1">تاریخ صدور: ۱۴۰۳/۰۶/۲۵</span>
            </div>
          </div>

          {/* Parties Table */}
          <div className="grid grid-cols-2 gap-4 p-3 rounded-2xl bg-gray-50 dark:bg-gray-800/50 text-xs">
            <div>
              <span className="text-gray-400 block text-[10px]">فروشنده / وکیل:</span>
              <span className="font-bold text-gray-800 dark:text-gray-200">{ATTORNEY_INFO.name}</span>
              <span className="text-[10px] text-gray-500 block">پروانه وکالت: {ATTORNEY_INFO.licenseNumber}</span>
              <span className="text-[10px] text-gray-500 block">کد پستی: ۱۹۱۷۶۵۴۳۲۱</span>
            </div>
            <div>
              <span className="text-gray-400 block text-[10px]">خریدار / موکل:</span>
              <span className="font-bold text-gray-800 dark:text-gray-200">{payerName}</span>
              <span className="text-[10px] text-gray-500 block">همراه: {payerPhone}</span>
              <span className="text-[10px] text-gray-500 block">پرونده: {caseNumber}</span>
            </div>
          </div>

          {/* Line Items Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700 text-gray-400 text-[11px]">
                  <th className="py-2">ردیف</th>
                  <th className="py-2">شرح خدمت حقوقی</th>
                  <th className="py-2 text-left">مبلغ پایه</th>
                  <th className="py-2 text-left">عوارض و مالیات (۹٪)</th>
                  <th className="py-2 text-left">مبلغ کل</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                <tr>
                  <td className="py-3 font-mono">۱</td>
                  <td className="py-3">
                    <span className="font-bold text-gray-800 dark:text-gray-200 block">
                      {currentItem.title}
                    </span>
                    <span className="text-[10px] text-gray-400 font-mono">کد رهگیری: {currentItem.code}</span>
                  </td>
                  <td className="py-3 text-left font-mono">{formatPrice(currentItem.amount)}</td>
                  <td className="py-3 text-left font-mono text-amber-600 dark:text-amber-400">{formatPrice(currentItem.tax)}</td>
                  <td className="py-3 text-left font-mono font-bold text-[#D4AF37]">{formatPrice(currentItem.total)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Invoice Summary & Tax Barcode */}
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 rounded-xl bg-gray-100 dark:bg-gray-800 p-1 flex items-center justify-center border border-gray-300 dark:border-gray-600">
                <QrCode className="w-12 h-12 text-[#0B132B] dark:text-white" />
              </div>
              <div className="text-[10px] text-gray-500 space-y-0.5">
                <span className="block font-bold text-gray-700 dark:text-gray-300">شناسه یکتای مالیاتی قوه قضاییه</span>
                <span className="font-mono block">TAX-1403-IR-9884210</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold block">
                  ✓ ثبت در سامانه مودیان مالیاتی
                </span>
              </div>
            </div>

            <div className="text-left space-y-1">
              <span className="text-xs text-gray-400 block">مبلغ نهایی قابل پرداخت:</span>
              <span className="text-xl font-bold font-serif text-[#D4AF37]">
                {formatPrice(currentItem.total)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
