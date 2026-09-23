import React, { useState } from 'react';
import { useDesignTokens } from '../../context/DesignTokensContext';
import {
  CreditCard,
  Layers,
  ArrowRightLeft,
  CheckCircle2,
  AlertTriangle,
  FileText,
  ShieldCheck,
  ShieldAlert,
  BarChart3,
  TrendingUp,
  Download,
  Send,
  RefreshCw,
  Eye,
  Sliders,
  Sparkles,
  Key,
  Lock,
  Globe,
  DollarSign,
  Receipt,
  FileSpreadsheet,
  AlertCircle,
  HelpCircle,
  Check,
  Copy,
  Clock,
  QrCode,
  Building2,
  Calendar
} from 'lucide-react';

interface GatewayConfig {
  id: string;
  name: string;
  type: 'iranian' | 'international';
  logo: string;
  status: 'active' | 'inactive';
  isSandbox: boolean;
  merchantId: string;
  terminalId?: string;
  feePercent: number;
  protocol: 'REST' | 'SOAP';
  successRate: number;
}

interface InvoiceRecord {
  id: string;
  invoiceNumber: string;
  clientName: string;
  clientPhone: string;
  serviceTitle: string;
  amount: number;
  tax: number;
  discount: number;
  total: number;
  status: 'paid' | 'pending' | 'disputed' | 'cancelled';
  gatewayUsed: string;
  date: string;
  einvoiceTaxId?: string;
  einvoiceStatus: 'confirmed' | 'pending_queue' | 'not_submitted';
  fraudScore: number;
}

export const PaymentAdapterSystemSuite: React.FC<{
  onBackToHome?: () => void;
  onOpenDashboard?: () => void;
}> = ({ onBackToHome, onOpenDashboard }) => {
  const { tokens } = useDesignTokens();
  const [notificationToast, setNotificationToast] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotificationToast(msg);
    setTimeout(() => setNotificationToast(null), 4000);
  };

  const [activeTab, setActiveTab] = useState<
    'adapter_architecture' | 'gateways' | 'invoice_generator' | 'einvoice_moadian' | 'fraud_dispute' | 'compliance_reports'
  >('adapter_architecture');

  // Selected Adapter Mode
  const [activeAdapter, setActiveAdapter] = useState<'auto' | 'native' | 'woocommerce'>('auto');
  const [wooCommerceDetected] = useState(true);

  // Gateways List (5 Iranian + 2 International)
  const [gateways, setGateways] = useState<GatewayConfig[]>([
    {
      id: 'zarinpal',
      name: 'زرین‌پال (ZarinPal v4 REST)',
      type: 'iranian',
      logo: '🟡',
      status: 'active',
      isSandbox: false,
      merchantId: 'zarin_live_98a76bc1209e84',
      feePercent: 1.0,
      protocol: 'REST',
      successRate: 98.4
    },
    {
      id: 'mellat',
      name: 'به‌پرداخت ملت (BPM Behpardakht)',
      type: 'iranian',
      logo: '🔴',
      status: 'active',
      isSandbox: false,
      merchantId: 'term_mellat_54890',
      terminalId: '4390112',
      feePercent: 0.0,
      protocol: 'SOAP',
      successRate: 99.2
    },
    {
      id: 'saman',
      name: 'پرداخت الکترونیک سامان (SEP)',
      type: 'iranian',
      logo: '🔵',
      status: 'active',
      isSandbox: true,
      merchantId: 'sep_merchant_10029',
      feePercent: 0.0,
      protocol: 'REST',
      successRate: 97.9
    },
    {
      id: 'parsian',
      name: 'تجارت الکترونیک پارسیان (PEC)',
      type: 'iranian',
      logo: '🟣',
      status: 'inactive',
      isSandbox: false,
      merchantId: 'pec_acc_884102',
      feePercent: 0.0,
      protocol: 'REST',
      successRate: 96.5
    },
    {
      id: 'idpay',
      name: 'آی‌دی‌پی (IDPay API v1.1)',
      type: 'iranian',
      logo: '🟢',
      status: 'active',
      isSandbox: false,
      merchantId: 'idp_key_77bc901a8',
      feePercent: 1.5,
      protocol: 'REST',
      successRate: 98.0
    },
    {
      id: 'paypal',
      name: 'PayPal Checkout (بین‌المللی)',
      type: 'international',
      logo: '🌍',
      status: 'active',
      isSandbox: true,
      merchantId: 'client_id_paypal_sedrazavi_live',
      feePercent: 3.5,
      protocol: 'REST',
      successRate: 95.8
    },
    {
      id: 'stripe',
      name: 'Stripe Payments (بین‌المللی)',
      type: 'international',
      logo: '💳',
      status: 'inactive',
      isSandbox: true,
      merchantId: 'pk_live_stripe_sedrazavi_9901',
      feePercent: 2.9,
      protocol: 'REST',
      successRate: 99.1
    }
  ]);

  // Selected Gateway for Testing
  const [selectedGatewayForTest, setSelectedGatewayForTest] = useState('zarinpal');
  const [testAmount, setTestAmount] = useState('۵,۰۰۰,۰۰۰');
  const [testResult, setTestResult] = useState<string | null>(null);
  const [isSimulatingPayment, setIsSimulatingPayment] = useState(false);

  // Invoices List
  const [invoices, setInvoices] = useState<InvoiceRecord[]>([
    {
      id: 'inv-1',
      invoiceNumber: 'INV-1403-0842',
      clientName: 'شرکت پترو فرآیند آسیا',
      clientPhone: '09121112233',
      serviceTitle: 'تنظیم لایحه دفاعیه دیوان عدالت و ابطال مصوبه',
      amount: 45000000,
      tax: 4050000,
      discount: 0,
      total: 49050000,
      status: 'paid',
      gatewayUsed: 'به‌پرداخت ملت',
      date: '۱۴۰۳/۰۶/۲۰',
      einvoiceTaxId: 'A0041901B93021948271',
      einvoiceStatus: 'confirmed',
      fraudScore: 8
    },
    {
      id: 'inv-2',
      invoiceNumber: 'INV-1403-0843',
      clientName: 'مهندس بهزاد رادمنش',
      clientPhone: '09123334455',
      serviceTitle: 'مشاوره پرونده چک صیادی و توقیف پلاک ثبتی',
      amount: 15000000,
      tax: 1350000,
      discount: 1000000,
      total: 15350000,
      status: 'paid',
      gatewayUsed: 'زرین‌پال',
      date: '۱۴۰۳/۰۶/۲۱',
      einvoiceTaxId: 'A0041901B93021948332',
      einvoiceStatus: 'confirmed',
      fraudScore: 12
    },
    {
      id: 'inv-3',
      invoiceNumber: 'INV-1403-0844',
      clientName: 'صنایع غذایی زرین‌دشت',
      clientPhone: '09127778899',
      serviceTitle: 'داوری تجاری و حل اختلاف قرارداد EPC صنعتی',
      amount: 80000000,
      tax: 7200000,
      discount: 0,
      total: 87200000,
      status: 'pending',
      gatewayUsed: 'درگاه سامان',
      date: '۱۴۰۳/۰۶/۲۱',
      einvoiceStatus: 'pending_queue',
      fraudScore: 24
    },
    {
      id: 'inv-4',
      invoiceNumber: 'INV-1403-0845',
      clientName: 'کاربر ناشناس (IP مشکوک)',
      clientPhone: '09019990011',
      serviceTitle: 'استعلام فوری ثبتی و ارزیابی اسناد',
      amount: 35000000,
      tax: 3150000,
      discount: 0,
      total: 38150000,
      status: 'disputed',
      gatewayUsed: 'آی‌دی‌پی',
      date: '۱۴۰۳/۰۶/۲۱',
      einvoiceStatus: 'not_submitted',
      fraudScore: 78
    }
  ]);

  // Invoice Creator Form State
  const [newInvoiceForm, setNewInvoiceForm] = useState({
    clientName: '',
    clientPhone: '',
    clientNationalId: '',
    serviceTitle: 'مشاوره تخصصی و تدوین قرارداد دوزبانه',
    amount: '12000000',
    discount: '0',
    includeTax: true
  });
  const [createdInvoicePreview, setCreatedInvoicePreview] = useState<InvoiceRecord | null>(null);

  // Digital Signature / Moadian State
  const [taxMemoryId, setTaxMemoryId] = useState('A00419');
  const [digitalSignKey, setDigitalSignKey] = useState('RSA-SHA256-PUBKEY-989201F8274A');
  const [moadianSending, setMoadianSending] = useState(false);
  const [moadianStatusMessage, setMoadianStatusMessage] = useState<string | null>(null);

  // Fraud Filter Thresholds
  const [fraudThresholds, setFraudThresholds] = useState({
    maxHourlyAmount: 100000000,
    blockVpnIps: true,
    require2FaForHighValue: true,
    riskThresholdAlert: 50
  });

  // KPI Metrics Calculation
  const totalRevenue = invoices.filter((i) => i.status === 'paid').reduce((acc, curr) => acc + curr.total, 0);
  const monthlyRevenue = 151600000;
  const totalInvoicesCount = invoices.length;
  const successPaymentRate = 97.4;
  const totalTaxCalculated = invoices.reduce((acc, curr) => acc + curr.tax, 0);
  const disputedCount = invoices.filter((i) => i.status === 'disputed').length;

  const handleSimulatePayment = () => {
    setIsSimulatingPayment(true);
    setTestResult(null);

    setTimeout(() => {
      setIsSimulatingPayment(false);
      const gw = gateways.find((g) => g.id === selectedGatewayForTest);
      setTestResult(
        `تراکنش موفقیت‌آمیز بود! توکن پرداخت با شناسه مرجع RefID: ${Math.floor(
          100000000 + Math.random() * 900000000
        )} از طریق درگاه ${gw?.name} دریافت و صورتحساب معتبر شد.`
      );
    }, 1200);
  };

  const handleCreateInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseFloat(newInvoiceForm.amount) || 0;
    const disc = parseFloat(newInvoiceForm.discount) || 0;
    const tax = newInvoiceForm.includeTax ? Math.round(amt * 0.09) : 0;
    const total = amt + tax - disc;

    const newInv: InvoiceRecord = {
      id: `inv-${Date.now()}`,
      invoiceNumber: `INV-1403-${Math.floor(1000 + Math.random() * 9000)}`,
      clientName: newInvoiceForm.clientName || 'موکل محترم',
      clientPhone: newInvoiceForm.clientPhone || '۰۹۱۲۰۰۰۰۰۰۰',
      serviceTitle: newInvoiceForm.serviceTitle,
      amount: amt,
      tax,
      discount: disc,
      total,
      status: 'pending',
      gatewayUsed: 'زرین‌پال',
      date: '۱۴۰۳/۰۶/۲۱',
      einvoiceStatus: 'pending_queue',
      fraudScore: 10
    };

    setInvoices([newInv, ...invoices]);
    setCreatedInvoicePreview(newInv);
  };

  const handleSendToMoadian = (invoiceId: string) => {
    setMoadianSending(true);
    setMoadianStatusMessage(null);

    setTimeout(() => {
      setMoadianSending(false);
      const generatedTaxId = `A00419${Math.floor(10000000000000 + Math.random() * 90000000000000)}`;
      setInvoices((prev) =>
        prev.map((inv) =>
          inv.id === invoiceId
            ? { ...inv, einvoiceStatus: 'confirmed', einvoiceTaxId: generatedTaxId }
            : inv
        )
      );
      setMoadianStatusMessage(`صورتحساب با شناسه یکتای مالیاتی ${generatedTaxId} در سامانه جامع مودیان با موفقیت ثبت قطعی گردید.`);
    }, 1500);
  };

  return (
    <div className="py-8 bg-[#F4F6F9] dark:bg-[#070D1E] min-h-screen text-right" dir="rtl">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-gray-200 dark:border-gray-800">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#D4AF37] to-[#AA820A] text-[#0B132B] flex items-center justify-center shadow-lg shadow-[#D4AF37]/20 font-bold">
                <CreditCard className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-bold font-serif text-[#0B132B] dark:text-white">
                    سامانه جامع پرداخت آداپتور و فاکتور الکترونیک (فاز ۲۱)
                  </h1>
                  <span className="px-3 py-1 rounded-full bg-[#D4AF37]/15 text-[#AA820A] dark:text-[#F3E5AB] text-xs font-bold">
                    Payment Adapter v2.4
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
                  پشتیبانی دوگانه همزمان از سیستم پرداخت نیتیو مستقل و ووکامرس، ۵ درگاه بانکی شتاب، صدور صورتحساب سامانه مودیان و تقلب‌یابی
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {onOpenDashboard && (
              <button
                onClick={onOpenDashboard}
                className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 text-xs font-bold hover:bg-gray-50 transition-colors"
              >
                پیشخوان وکیل
              </button>
            )}
            {onBackToHome && (
              <button
                onClick={onBackToHome}
                className="px-4 py-2.5 rounded-xl bg-[#0B132B] dark:bg-[#D4AF37] text-white dark:text-[#0B132B] text-xs font-bold shadow-md hover:bg-[#1C2541] transition-colors"
              >
                بازگشت به سایت
              </button>
            )}
          </div>
        </div>

        {/* Dynamic Notification Toast */}
        {notificationToast && (
          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-500/40 text-emerald-800 dark:text-emerald-200 text-xs flex items-center justify-between shadow-lg animate-in fade-in">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
              <span className="font-bold">{notificationToast}</span>
            </div>
            <button
              onClick={() => setNotificationToast(null)}
              className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-800 text-xs font-bold"
            >
              بستن
            </button>
          </div>
        )}

        {/* 6 Core Financial KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
          <div className="p-4 rounded-2xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-sm">
            <span className="text-[11px] font-bold text-gray-400 block mb-1">درآمد کل وصول‌شده</span>
            <span className="text-lg font-bold text-[#D4AF37] block font-mono">
              {(totalRevenue / 10).toLocaleString()} <span className="text-xs text-gray-400">تومان</span>
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-sm">
            <span className="text-[11px] font-bold text-gray-400 block mb-1">درآمد ماه جاری</span>
            <span className="text-lg font-bold text-emerald-500 block font-mono">
              {(monthlyRevenue / 10).toLocaleString()} <span className="text-xs text-gray-400">تومان</span>
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-sm">
            <span className="text-[11px] font-bold text-gray-400 block mb-1">تعداد فاکتورها</span>
            <span className="text-lg font-bold text-gray-900 dark:text-white block font-mono">
              {totalInvoicesCount} <span className="text-xs text-gray-400">فقره</span>
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-sm">
            <span className="text-[11px] font-bold text-gray-400 block mb-1">نرخ موفقیت پرداخت</span>
            <span className="text-lg font-bold text-blue-500 block font-mono">
              ٪{successPaymentRate}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-sm">
            <span className="text-[11px] font-bold text-gray-400 block mb-1">مالیات بر ارزش افزوده</span>
            <span className="text-lg font-bold text-indigo-500 block font-mono">
              {(totalTaxCalculated / 10).toLocaleString()} <span className="text-xs text-gray-400">تومان</span>
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-sm">
            <span className="text-[11px] font-bold text-gray-400 block mb-1">اختلافات و استرداد</span>
            <span className="text-lg font-bold text-rose-500 block font-mono">
              {disputedCount} <span className="text-xs text-gray-400">پرونده</span>
            </span>
          </div>
        </div>

        {/* Tab Navigation (6 Sub-sections of Part 21) */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800">
          <button
            onClick={() => setActiveTab('adapter_architecture')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'adapter_architecture'
                ? 'bg-[#0B132B] dark:bg-[#D4AF37] text-white dark:text-[#0B132B] shadow'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>معماری Adapter (ووکامرس یا نیتیو)</span>
          </button>

          <button
            onClick={() => setActiveTab('gateways')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'gateways'
                ? 'bg-[#0B132B] dark:bg-[#D4AF37] text-white dark:text-[#0B132B] shadow'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            <CreditCard className="w-4 h-4" />
            <span>درگاه‌های پرداخت (۵ ایرانی + ۲ جهانی)</span>
          </button>

          <button
            onClick={() => setActiveTab('invoice_generator')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'invoice_generator'
                ? 'bg-[#0B132B] dark:bg-[#D4AF37] text-white dark:text-[#0B132B] shadow'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            <Receipt className="w-4 h-4" />
            <span>صدور پیش‌فاکتور و صورتحساب رسمی</span>
          </button>

          <button
            onClick={() => setActiveTab('einvoice_moadian')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'einvoice_moadian'
                ? 'bg-[#0B132B] dark:bg-[#D4AF37] text-white dark:text-[#0B132B] shadow'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>انطباق سامانه مودیان (e-Invoice)</span>
          </button>

          <button
            onClick={() => setActiveTab('fraud_dispute')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'fraud_dispute'
                ? 'bg-[#0B132B] dark:bg-[#D4AF37] text-white dark:text-[#0B132B] shadow'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            <ShieldAlert className="w-4 h-4" />
            <span>کشف تقلب و داوری اختلافات (Dispute)</span>
          </button>

          <button
            onClick={() => setActiveTab('compliance_reports')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'compliance_reports'
                ? 'bg-[#0B132B] dark:bg-[#D4AF37] text-white dark:text-[#0B132B] shadow'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>گزارشات انطباق، مالیات و شاپرک</span>
          </button>
        </div>

        {/* TAB 1: Payment Adapter Architecture */}
        {activeTab === 'adapter_architecture' && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-[#0B132B] rounded-3xl p-6 sm:p-7 border border-gray-200 dark:border-gray-800 shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-800">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white font-serif">
                    تنظیمات حالت آداپتور پرداخت (Payment Adapter Mode)
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    الگوی آداپتور به سیستم اجازه می‌دهد بدون وابستگی اجباری به افزونه ووکامرس، هم در حالت مستقل با جداول سبک و هم در اتصال به ووکامرس فعالیت نماید.
                  </p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>ووکامرس روی هاست شناسایی شد</span>
                </div>
              </div>

              {/* Mode Selectors */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div
                  onClick={() => setActiveAdapter('auto')}
                  className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                    activeAdapter === 'auto'
                      ? 'border-[#D4AF37] bg-[#D4AF37]/5 dark:bg-[#D4AF37]/10'
                      : 'border-gray-200 dark:border-gray-800 hover:border-gray-400'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-bold text-gray-900 dark:text-white">تشخیص خودکار (Auto Detection)</span>
                    <span className="px-2 py-0.5 rounded-full bg-[#D4AF37] text-white text-[10px] font-bold">پیشنهادی</span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                    سیستم به‌صورت خودکار وجود WooCommerce را بررسی می‌کند؛ در صورت نصب از آداپتور ووکامرس و در غیر این صورت بلافاصله از سیستم نیتیو اختصاصی استفاده می‌کند.
                  </p>
                </div>

                <div
                  onClick={() => setActiveAdapter('native')}
                  className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                    activeAdapter === 'native'
                      ? 'border-[#D4AF37] bg-[#D4AF37]/5 dark:bg-[#D4AF37]/10'
                      : 'border-gray-200 dark:border-gray-800 hover:border-gray-400'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-bold text-gray-900 dark:text-white">آداپتور نیتیو مستقل (Native Adapter)</span>
                    <span className="px-2 py-0.5 rounded-full bg-blue-500 text-white text-[10px] font-bold">سبک و پرسرعت</span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                    بدون نیاز به نصب ووکامرس؛ پردازش پرداخت‌ها، ذخیره تراکنش‌ها و صدور فاکتور از طریق ۴ جدول اختصاصی سبک وردپرس با کوئری‌های بهینه انجام می‌شود.
                  </p>
                </div>

                <div
                  onClick={() => setActiveAdapter('woocommerce')}
                  className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                    activeAdapter === 'woocommerce'
                      ? 'border-[#D4AF37] bg-[#D4AF37]/5 dark:bg-[#D4AF37]/10'
                      : 'border-gray-200 dark:border-gray-800 hover:border-gray-400'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-bold text-gray-900 dark:text-white">آداپتور ووکامرس (WooCommerce Adapter)</span>
                    <span className="px-2 py-0.5 rounded-full bg-purple-500 text-white text-[10px] font-bold">سفارش و کوپن</span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                    استفاده از ساختار سفارشات WC_Order، محصولات نامرئی مخفی وکالت، کوپن‌های تخفیف و گیت‌وی‌های نصب‌شده ووکامرس با همگام‌سازی دوطرفه.
                  </p>
                </div>
              </div>

              {/* Interface 10 Methods Overview */}
              <div className="p-5 rounded-2xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800 space-y-3">
                <h4 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                  <span>۱۰ متد استاندارد قرارداد اینترفیس (SedRazavi_Payment_Interface):</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 text-[11px] font-mono">
                  <div className="p-2 rounded-lg bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800">
                    <span className="text-emerald-500 font-bold block">1. create_payment()</span>
                    <span className="text-gray-400 text-[10px]">ایجاد تراکنش پرداخت</span>
                  </div>
                  <div className="p-2 rounded-lg bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800">
                    <span className="text-emerald-500 font-bold block">2. verify_payment()</span>
                    <span className="text-gray-400 text-[10px]">تایید بازگشت از درگاه</span>
                  </div>
                  <div className="p-2 rounded-lg bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800">
                    <span className="text-emerald-500 font-bold block">3. refund_payment()</span>
                    <span className="text-gray-400 text-[10px]">استرداد وجه کامل/جزئی</span>
                  </div>
                  <div className="p-2 rounded-lg bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800">
                    <span className="text-emerald-500 font-bold block">4. get_transaction()</span>
                    <span className="text-gray-400 text-[10px]">اطلاعات جزئی تراکنش</span>
                  </div>
                  <div className="p-2 rounded-lg bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800">
                    <span className="text-emerald-500 font-bold block">5. get_gateways()</span>
                    <span className="text-gray-400 text-[10px]">فهرست درگاه‌های فعال</span>
                  </div>
                  <div className="p-2 rounded-lg bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800">
                    <span className="text-blue-500 font-bold block">6. create_invoice()</span>
                    <span className="text-gray-400 text-[10px]">تولید فاکتور رسمی</span>
                  </div>
                  <div className="p-2 rounded-lg bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800">
                    <span className="text-blue-500 font-bold block">7. get_invoice()</span>
                    <span className="text-gray-400 text-[10px]">دریافت صورتحساب</span>
                  </div>
                  <div className="p-2 rounded-lg bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800">
                    <span className="text-blue-500 font-bold block">8. update_invoice()</span>
                    <span className="text-gray-400 text-[10px]">ویرایش اقلام فاکتور</span>
                  </div>
                  <div className="p-2 rounded-lg bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800">
                    <span className="text-blue-500 font-bold block">9. delete_invoice()</span>
                    <span className="text-gray-400 text-[10px]">ابطال و حذف صورتحساب</span>
                  </div>
                  <div className="p-2 rounded-lg bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800">
                    <span className="text-purple-500 font-bold block">10. get_reports()</span>
                    <span className="text-gray-400 text-[10px]">استخراج گزارش مالی</span>
                  </div>
                </div>
              </div>

              {/* Migration Toolkit */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30">
                <div className="flex items-center gap-3">
                  <ArrowRightLeft className="w-5 h-5 text-amber-500" />
                  <div>
                    <h5 className="text-xs font-bold text-gray-900 dark:text-white">
                      ابزار مهاجرت یکپارچه (Data Migration Toolkit)
                    </h5>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400">
                      امکان تبدیل خودکار کلیه سفارشات و مشتریان قبلی ووکامرس به فاکتورهای نیتیو SedRazavi و بالعکس با پشتیبان‌گیری خودکار.
                    </p>
                  </div>
                </div>
                <button className="btn-gold text-xs px-4 py-2 rounded-xl font-bold whitespace-nowrap">
                  همگام‌سازی و انتقال داده‌ها
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Gateways Integration */}
        {activeTab === 'gateways' && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-[#0B132B] rounded-3xl p-6 sm:p-7 border border-gray-200 dark:border-gray-800 shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-800">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white font-serif">
                    پیکربندی درگاه‌های پرداخت شتاب و بین‌المللی
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    تنظیم مرچنت‌کدها، سوئیچ بین حالت تستی (Sandbox) و محیط زنده شاپرک
                  </p>
                </div>
                <span className="text-xs px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 font-bold">
                  ۷ درگاه تعریف‌شده
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {gateways.map((gw) => (
                  <div
                    key={gw.id}
                    className={`p-5 rounded-2xl border transition-all ${
                      gw.status === 'active'
                        ? 'bg-white dark:bg-[#0B132B] border-gray-200 dark:border-gray-800 shadow-sm'
                        : 'bg-gray-50/60 dark:bg-gray-900/40 border-dashed border-gray-300 dark:border-gray-800 opacity-80'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{gw.logo}</span>
                        <h4 className="text-sm font-bold text-gray-900 dark:text-white">{gw.name}</h4>
                      </div>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                          gw.status === 'active'
                            ? 'bg-emerald-500/10 text-emerald-500'
                            : 'bg-gray-200 dark:bg-gray-800 text-gray-500'
                        }`}
                      >
                        {gw.status === 'active' ? 'فعال' : 'غیرفعال'}
                      </span>
                    </div>

                    <div className="space-y-2 text-xs text-gray-500 dark:text-gray-400 mb-4 font-mono">
                      <div className="flex items-center justify-between">
                        <span>شناسه پذیرنده / API:</span>
                        <span className="font-bold text-gray-800 dark:text-gray-200 truncate max-w-[140px]">
                          {gw.merchantId}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>پروتکل اتصال:</span>
                        <span className="font-bold text-indigo-500">{gw.protocol}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>نرخ پایداری شاپرک:</span>
                        <span className="font-bold text-emerald-500">٪{gw.successRate}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>محیط عملکرد:</span>
                        <span className={gw.isSandbox ? 'text-amber-500 font-bold' : 'text-gray-400 font-bold'}>
                          {gw.isSandbox ? 'Sandbox (تستی)' : 'شاپرک زنده (Live)'}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-3 border-t border-gray-100 dark:border-gray-800/80">
                      <button
                        onClick={() => {
                          setGateways((prev) =>
                            prev.map((g) =>
                              g.id === gw.id
                                ? { ...g, status: g.status === 'active' ? 'inactive' : 'active' }
                                : g
                            )
                          );
                        }}
                        className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                          gw.status === 'active'
                            ? 'bg-rose-500/10 text-rose-500 hover:bg-rose-500/20'
                            : 'bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20'
                        }`}
                      >
                        {gw.status === 'active' ? 'غیرفعال‌سازی' : 'فعال‌سازی درگاه'}
                      </button>
                      <button
                        onClick={() => {
                          setGateways((prev) =>
                            prev.map((g) =>
                              g.id === gw.id ? { ...g, isSandbox: !g.isSandbox } : g
                            )
                          );
                        }}
                        className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-xs font-bold text-gray-600 dark:text-gray-300"
                        title="تغییر محیط تستی"
                      >
                        {gw.isSandbox ? 'زنده کن' : 'سندباکس'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Live Sandbox Simulator */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-[#0B132B] to-[#1C2541] text-white space-y-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#D4AF37]" />
                  <h4 className="text-sm font-bold font-serif text-[#D4AF37]">
                    تست زنده اتصال به درگاه و شبیه‌ساز تراکنش شاپرک
                  </h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs text-gray-300 block mb-1">انتخاب درگاه تست:</label>
                    <select
                      value={selectedGatewayForTest}
                      onChange={(e) => setSelectedGatewayForTest(e.target.value)}
                      className="w-full py-2 px-3 rounded-xl bg-white/10 border border-white/20 text-xs text-white"
                    >
                      {gateways
                        .filter((g) => g.status === 'active')
                        .map((g) => (
                          <option key={g.id} value={g.id} className="text-gray-900">
                            {g.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs text-gray-300 block mb-1">مبلغ آزمایشی (تومان):</label>
                    <input
                      type="text"
                      value={testAmount}
                      onChange={(e) => setTestAmount(e.target.value)}
                      className="w-full py-2 px-3 rounded-xl bg-white/10 border border-white/20 text-xs text-white font-mono"
                    />
                  </div>

                  <div className="flex items-end">
                    <button
                      onClick={handleSimulatePayment}
                      disabled={isSimulatingPayment}
                      className="w-full py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#AA820A] text-[#0B132B] font-bold text-xs transition-colors flex items-center justify-center gap-2"
                    >
                      {isSimulatingPayment ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          <span>در حال ارسال توکن به شاپرک...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>شروع پرداخت آزمایشی</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {testResult && (
                  <div className="p-3.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs leading-relaxed flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                    <span>{testResult}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Invoices Generator & List */}
        {activeTab === 'invoice_generator' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Form to create invoice (5 Cols) */}
            <div className="lg:col-span-5 bg-white dark:bg-[#0B132B] rounded-3xl p-6 sm:p-7 border border-gray-200 dark:border-gray-800 shadow-sm space-y-4">
              <div className="pb-3 border-b border-gray-100 dark:border-gray-800">
                <h3 className="text-base font-bold text-gray-900 dark:text-white font-serif">
                  صدور پیش‌فاکتور / صورتحساب رسمی حق‌الوکاله
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  تولید شماره یکتا طبق استاندارد {`{PREFIX}-{YEAR}-{SEQ}`} و محاسبه مالیات ارزش افزوده ماده ۱۰۳
                </p>
              </div>

              <form onSubmit={handleCreateInvoice} className="space-y-3.5 text-xs">
                <div>
                  <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">نام موکل یا شرکت:</label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: شرکت بازرگانی بین‌المللی افق"
                    value={newInvoiceForm.clientName}
                    onChange={(e) => setNewInvoiceForm({ ...newInvoiceForm, clientName: e.target.value })}
                    className="w-full py-2.5 px-3.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">شماره همراه موکل:</label>
                    <input
                      type="tel"
                      required
                      placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                      value={newInvoiceForm.clientPhone}
                      onChange={(e) => setNewInvoiceForm({ ...newInvoiceForm, clientPhone: e.target.value })}
                      className="w-full py-2.5 px-3.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">کد ملی / شناسه ملی:</label>
                    <input
                      type="text"
                      placeholder="۱۰ رقمی یا ۱۱ رقمی"
                      value={newInvoiceForm.clientNationalId}
                      onChange={(e) => setNewInvoiceForm({ ...newInvoiceForm, clientNationalId: e.target.value })}
                      className="w-full py-2.5 px-3.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">شرح خدمات حقوقی:</label>
                  <input
                    type="text"
                    required
                    value={newInvoiceForm.serviceTitle}
                    onChange={(e) => setNewInvoiceForm({ ...newInvoiceForm, serviceTitle: e.target.value })}
                    className="w-full py-2.5 px-3.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">مبلغ پایه (ریال):</label>
                    <input
                      type="number"
                      required
                      value={newInvoiceForm.amount}
                      onChange={(e) => setNewInvoiceForm({ ...newInvoiceForm, amount: e.target.value })}
                      className="w-full py-2.5 px-3.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">تخفیف (ریال):</label>
                    <input
                      type="number"
                      value={newInvoiceForm.discount}
                      onChange={(e) => setNewInvoiceForm({ ...newInvoiceForm, discount: e.target.value })}
                      className="w-full py-2.5 px-3.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white font-mono"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="includeTaxCheck"
                    checked={newInvoiceForm.includeTax}
                    onChange={(e) => setNewInvoiceForm({ ...newInvoiceForm, includeTax: e.target.checked })}
                    className="rounded text-[#D4AF37] focus:ring-[#D4AF37]"
                  />
                  <label htmlFor="includeTaxCheck" className="text-gray-700 dark:text-gray-300 font-semibold cursor-pointer">
                    محاسبه ۹٪ مالیات بر ارزش افزوده قانونی
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl btn-gold font-bold text-xs shadow-md mt-2 flex items-center justify-center gap-2"
                >
                  <Receipt className="w-4 h-4" />
                  <span>تولید و ثبت فاکتور رسمی</span>
                </button>
              </form>
            </div>

            {/* Invoices List & PDF Preview (7 Cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="bg-white dark:bg-[#0B132B] rounded-3xl p-6 sm:p-7 border border-gray-200 dark:border-gray-800 shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
                  <h3 className="text-base font-bold text-gray-900 dark:text-white font-serif">
                    صورتحساب‌های صادرشده اخیر
                  </h3>
                  <span className="text-xs text-gray-400">نمایش {invoices.length} رکورد</span>
                </div>

                <div className="space-y-3">
                  {invoices.map((inv) => (
                    <div
                      key={inv.id}
                      className="p-4 rounded-2xl bg-gray-50/70 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-gray-900 dark:text-white font-serif">
                            {inv.clientName}
                          </span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full font-mono bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
                            {inv.invoiceNumber}
                          </span>
                          <span
                            className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                              inv.status === 'paid'
                                ? 'bg-emerald-500/10 text-emerald-500'
                                : inv.status === 'disputed'
                                ? 'bg-rose-500/10 text-rose-500'
                                : 'bg-amber-500/10 text-amber-500'
                            }`}
                          >
                            {inv.status === 'paid'
                              ? 'پرداخت‌شده'
                              : inv.status === 'disputed'
                              ? 'اختلاف باز'
                              : 'در انتظار پرداخت'}
                          </span>
                        </div>
                        <p className="text-[11px] text-gray-500 dark:text-gray-400 line-clamp-1">
                          {inv.serviceTitle}
                        </p>
                        <div className="flex items-center gap-3 text-[10px] text-gray-400 font-mono">
                          <span>تاریخ: {inv.date}</span>
                          <span>درگاه: {inv.gatewayUsed}</span>
                          {inv.einvoiceTaxId && (
                            <span className="text-indigo-400 font-bold">
                              مالیاتی: {inv.einvoiceTaxId.substring(0, 8)}...
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 border-t sm:border-t-0 pt-2 sm:pt-0">
                        <span className="text-sm font-bold text-[#D4AF37] font-mono">
                          {(inv.total / 10).toLocaleString()} تومان
                        </span>
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => setCreatedInvoicePreview(inv)}
                            className="px-2.5 py-1 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-[10px] font-bold hover:bg-gray-300 flex items-center gap-1"
                          >
                            <Eye className="w-3 h-3" />
                            <span>پیش‌نمایش PDF</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal/Preview of Single PDF Invoice */}
              {createdInvoicePreview && (
                <div className="p-6 rounded-3xl bg-white dark:bg-[#0B132B] border-2 border-[#D4AF37]/50 shadow-xl space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-gray-200 dark:border-gray-800">
                    <div className="flex items-center gap-2">
                      <Receipt className="w-5 h-5 text-[#D4AF37]" />
                      <h4 className="text-sm font-bold text-gray-900 dark:text-white font-serif">
                        پیش‌نمایش رسمی صورتحساب حقوقی (PDF Template)
                      </h4>
                    </div>
                    <button
                      onClick={() => setCreatedInvoicePreview(null)}
                      className="text-xs text-gray-400 hover:text-gray-200"
                    >
                      بستن
                    </button>
                  </div>

                  <div className="p-5 rounded-2xl bg-gray-50 dark:bg-gray-900/80 border border-gray-200 dark:border-gray-800 space-y-4 text-xs">
                    <div className="flex items-center justify-between pb-3 border-b border-gray-200 dark:border-gray-700">
                      <div>
                        <h5 className="font-bold text-sm text-gray-900 dark:text-white font-serif">
                          {tokens['brand.name']?.value || `دفتر وکالت و مشاوره حقوقی ${tokens['lawyer.name']?.value || 'دکتر سیده مریم رضوی'}`}
                        </h5>
                        <p className="text-[11px] text-gray-500">
                          {tokens['lawyer.license']?.value || 'شماره پروانه وکالت: ۱۸۴۵ کانون وکلای مرکز'}
                        </p>
                      </div>
                      <div className="text-left font-mono text-[11px]">
                        <span className="block font-bold text-gray-900 dark:text-white">
                          {createdInvoicePreview.invoiceNumber}
                        </span>
                        <span className="text-gray-400">تاریخ: {createdInvoicePreview.date}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[11px]">
                      <div>
                        <span className="text-gray-400">طرف حساب / موکل: </span>
                        <span className="font-bold text-gray-800 dark:text-gray-200">
                          {createdInvoicePreview.clientName}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-400">تماس: </span>
                        <span className="font-mono text-gray-800 dark:text-gray-200">
                          {createdInvoicePreview.clientPhone}
                        </span>
                      </div>
                    </div>

                    <table className="w-full text-right text-[11px] border-collapse">
                      <thead>
                        <tr className="bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                          <th className="p-2 rounded-r-lg">شرح خدمت</th>
                          <th className="p-2">مبلغ پایه (ریال)</th>
                          <th className="p-2">مالیات ۹٪</th>
                          <th className="p-2 rounded-l-lg">مبلغ کل قابل پرداخت</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-gray-200 dark:border-gray-800">
                          <td className="p-2 font-semibold">{createdInvoicePreview.serviceTitle}</td>
                          <td className="p-2 font-mono">{createdInvoicePreview.amount.toLocaleString()}</td>
                          <td className="p-2 font-mono text-indigo-500">{createdInvoicePreview.tax.toLocaleString()}</td>
                          <td className="p-2 font-mono font-bold text-[#D4AF37]">
                            {createdInvoicePreview.total.toLocaleString()} ریال
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <div className="flex items-center justify-between pt-2">
                      <span className="text-[10px] text-gray-400">
                        ممهور به امضای الکترونیک امن {tokens['lawyer.name']?.value || 'دفتر وکالت دکتر سیده مریم رضوی'}
                      </span>
                      <button
                        onClick={() => showNotification('فایل PDF صورتحساب رسمی با امضای الکترونیک با موفقیت آماده و دانلود گردید.')}
                        className="px-3 py-1.5 rounded-lg btn-gold text-xs font-bold flex items-center gap-1.5"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>دانلود چاپی PDF</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 4: e-Invoice & Samaneh Moadian */}
        {activeTab === 'einvoice_moadian' && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-[#0B132B] rounded-3xl p-6 sm:p-7 border border-gray-200 dark:border-gray-800 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-gray-100 dark:border-gray-800">
                <div>
                  <div className="flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-[#D4AF37]" />
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white font-serif">
                      سامانه مودیان و پایانه‌های فروشگاهی (قانون مصوب ۱۳۹۸)
                    </h3>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    صدور صورتحساب‌های نوع اول و دوم الکترونیک، امضای دیجیتال نامتقارن RSA، اخذ شناسه یکتا و ارسال خودکار به کارپوشه سازمان امور مالیاتی
                  </p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-500 text-xs font-bold font-mono">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>کلید اختصاصی معتبر است</span>
                </div>
              </div>

              {/* Settings and Signature keys */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800 space-y-3">
                  <label className="text-xs font-bold text-gray-800 dark:text-gray-200 block">
                    شناسه یکتای حافظه مالیاتی (Tax Memory ID):
                  </label>
                  <input
                    type="text"
                    value={taxMemoryId}
                    onChange={(e) => setTaxMemoryId(e.target.value)}
                    className="w-full py-2 px-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#0B132B] text-xs font-mono"
                  />
                  <p className="text-[10px] text-gray-400">
                    شناسه ۶ کاراکتری منحصربه‌فرد ثبت‌شده در درگاه ملی خدمات مالیاتی (my.tax.gov.ir).
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800 space-y-3">
                  <label className="text-xs font-bold text-gray-800 dark:text-gray-200 block">
                    کلید عمومی گواهی امضای دیجیتال (CSR / Public Key):
                  </label>
                  <input
                    type="text"
                    value={digitalSignKey}
                    onChange={(e) => setDigitalSignKey(e.target.value)}
                    className="w-full py-2 px-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#0B132B] text-xs font-mono"
                  />
                  <p className="text-[10px] text-gray-400">
                    مبتنی بر استاندارد X.509 جهت امضای پکت‌های جیسون سامانه مودیان.
                  </p>
                </div>
              </div>

              {moadianStatusMessage && (
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                  <span>{moadianStatusMessage}</span>
                </div>
              )}

              {/* Invoices waiting for Moadian dispatch */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-gray-900 dark:text-white flex items-center justify-between">
                  <span>صف ارسال به کارپوشه امور مالیاتی (Moadian Queue)</span>
                  <span className="text-xs text-gray-400">پایش بلادرنگ خطاها و توکن‌های تایید</span>
                </h4>

                <div className="overflow-x-auto">
                  <table className="w-full text-right text-xs border-collapse">
                    <thead>
                      <tr className="bg-gray-100 dark:bg-gray-800/80 text-gray-600 dark:text-gray-300">
                        <th className="p-3 rounded-r-xl">شماره فاکتور</th>
                        <th className="p-3">مشتری</th>
                        <th className="p-3">مبلغ کل (تومان)</th>
                        <th className="p-3">شناسه ۲۲ رقمی مالیاتی</th>
                        <th className="p-3">وضعیت کارپوشه</th>
                        <th className="p-3 rounded-l-xl">عملیات</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                      {invoices.map((inv) => (
                        <tr key={inv.id} className="hover:bg-gray-50/60 dark:hover:bg-gray-900/40">
                          <td className="p-3 font-mono font-bold">{inv.invoiceNumber}</td>
                          <td className="p-3 font-semibold">{inv.clientName}</td>
                          <td className="p-3 font-mono font-bold text-[#D4AF37]">
                            {(inv.total / 10).toLocaleString()}
                          </td>
                          <td className="p-3 font-mono text-[11px]">
                            {inv.einvoiceTaxId ? (
                              <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                                {inv.einvoiceTaxId}
                              </span>
                            ) : (
                              <span className="text-gray-400">ثبت‌نشده</span>
                            )}
                          </td>
                          <td className="p-3">
                            <span
                              className={`text-[10px] px-2.5 py-1 rounded-full font-bold ${
                                inv.einvoiceStatus === 'confirmed'
                                  ? 'bg-emerald-500/10 text-emerald-500'
                                  : inv.einvoiceStatus === 'pending_queue'
                                  ? 'bg-amber-500/10 text-amber-500'
                                  : 'bg-gray-200 dark:bg-gray-800 text-gray-500'
                              }`}
                            >
                              {inv.einvoiceStatus === 'confirmed'
                                ? 'تایید قطعی کارپوشه'
                                : inv.einvoiceStatus === 'pending_queue'
                                ? 'در صف ارسال خودکار'
                                : 'منتظر تایید اولیه'}
                            </span>
                          </td>
                          <td className="p-3">
                            {inv.einvoiceStatus !== 'confirmed' && (
                              <button
                                onClick={() => handleSendToMoadian(inv.id)}
                                disabled={moadianSending}
                                className="px-3 py-1 rounded-lg btn-gold text-[11px] font-bold flex items-center gap-1"
                              >
                                {moadianSending ? (
                                  <RefreshCw className="w-3 h-3 animate-spin" />
                                ) : (
                                  <Send className="w-3 h-3" />
                                )}
                                <span>ارسال فوری</span>
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: Fraud Detection & Disputes */}
        {activeTab === 'fraud_dispute' && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-[#0B132B] rounded-3xl p-6 sm:p-7 border border-gray-200 dark:border-gray-800 shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-800">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white font-serif flex items-center gap-2">
                    <ShieldAlert className="w-5 h-5 text-rose-500" />
                    <span>سیستم کشف تقلب مالی و حل اختلاف (Fraud & Dispute Resolution)</span>
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    محاسبه ریسک‌اسکور هوشمند، شناسایی IPهای ناشناس و مدیریت مستندات استرداد وجه
                  </p>
                </div>
              </div>

              {/* Fraud thresholds */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800">
                  <span className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">
                    سقف تراکنش مشکوک:
                  </span>
                  <span className="text-sm font-mono font-bold text-gray-900 dark:text-white">
                    {(fraudThresholds.maxHourlyAmount / 10).toLocaleString()} تومان
                  </span>
                  <span className="text-[10px] text-gray-400 block mt-1">+۳۰ امتیاز ریسک در مبالغ فراتر</span>
                </div>

                <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800">
                  <span className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">
                    فیلتر IP غیرمجاز و پروکسی:
                  </span>
                  <span className="text-sm font-bold text-emerald-500">فعال (مسدودسازی خودکار)</span>
                  <span className="text-[10px] text-gray-400 block mt-1">+۲۵ امتیاز در ورود از VPN</span>
                </div>

                <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800">
                  <span className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">
                    الزام احراز هویت دومرحله‌ای:
                  </span>
                  <span className="text-sm font-bold text-blue-500">مبالغ بالای ۲۰ میلیون</span>
                  <span className="text-[10px] text-gray-400 block mt-1">ارسال پیامک تایید فوری</span>
                </div>

                <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800">
                  <span className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">
                    آستانه هشدار بحرانی به ادمین:
                  </span>
                  <span className="text-sm font-bold text-rose-500 font-mono">ریسک &gt; ۵۰ از ۱۰۰</span>
                  <span className="text-[10px] text-gray-400 block mt-1">توقیف موقت تا بررسی وکیل</span>
                </div>
              </div>

              {/* High Risk Cases */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-gray-900 dark:text-white">
                  پرونده‌های با امتیاز ریسک بالا و اختلافات ثبت‌شده
                </h4>

                <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-full bg-rose-500 text-white font-bold text-[10px]">
                        ریسک ۷۸٪ - بحرانی
                      </span>
                      <span className="font-bold text-gray-900 dark:text-white">
                        فاکتور INV-1403-0845 (۳,۸۱۵,۰۰۰ تومان)
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">
                      تلاش مکرر با ۳ کارت بانکی متفاوت از آدرس IP هلند ظرف ۵ دقیقه! واریز وجه معلق گردید.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => showNotification('پرونده توسط وکیل بررسی و تراکنش رفع مسدودی گردید.')}
                      className="px-3 py-1.5 rounded-xl bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-xs font-bold"
                    >
                      تایید دستی وکیل
                    </button>
                    <button
                      onClick={() => showNotification('تراکنش با استناد به ماده ۱۲ قانون جرایم رایانه‌ای عودت و مسدود گردید.')}
                      className="px-3 py-1.5 rounded-xl bg-rose-600 text-white text-xs font-bold"
                    >
                      استرداد و مسدودسازی
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: Compliance & Legal Reports */}
        {activeTab === 'compliance_reports' && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-[#0B132B] rounded-3xl p-6 sm:p-7 border border-gray-200 dark:border-gray-800 shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-800">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white font-serif">
                    گزارش‌های انطباق قانونی، شاپرک و ماده ۱۰۳ ق.م.م
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    تفکیک ۵٪ علی‌الحساب مالیات وکلایی، ۴٪ سهم صندوق حمایت و ۱٪ صندوق تعاون به تفکیک تراکنش‌ها
                  </p>
                </div>
                <button
                  onClick={() => showNotification('گزارش جامع انطباق مالی شاپرک و ماده ۱۰۳ ق.م.م در قالب فایل Excel استخراج گردید.')}
                  className="px-4 py-2 rounded-xl btn-gold text-xs font-bold flex items-center gap-1.5"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  <span>خروجی اکسل (Excel)</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 space-y-2">
                  <span className="text-xs font-bold text-indigo-700 dark:text-indigo-300 block">
                    ماده ۱۰۳ ق.م.م (۵٪ مالیات علی‌الحساب وکالت):
                  </span>
                  <span className="text-lg font-bold font-mono text-gray-900 dark:text-white block">
                    {(totalRevenue * 0.05 / 10).toLocaleString()} تومان
                  </span>
                  <p className="text-[10px] text-gray-500">
                    کسر اتوماتیک در سامانه جهت تمبر مالیاتی الکترونیک وکالت‌نامه.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 space-y-2">
                  <span className="text-xs font-bold text-cyan-700 dark:text-cyan-300 block">
                    صندوق حمایت وکلا (۴٪ سهم قانونی):
                  </span>
                  <span className="text-lg font-bold font-mono text-gray-900 dark:text-white block">
                    {(totalRevenue * 0.04 / 10).toLocaleString()} تومان
                  </span>
                  <p className="text-[10px] text-gray-500">
                    محاسبه ذخیره بازنشستگی و ازکارافتادگی وکلای دادگستری.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-2">
                  <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 block">
                    صندوق تعاون کانون وکلا (۱٪ سهم تعاون):
                  </span>
                  <span className="text-lg font-bold font-mono text-gray-900 dark:text-white block">
                    {(totalRevenue * 0.01 / 10).toLocaleString()} تومان
                  </span>
                  <p className="text-[10px] text-gray-500">
                    انطباق با آیین‌نامه اجرایی لایحه قانونی استقلال کانون وکلا.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
