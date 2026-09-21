import React, { useState } from 'react';
import {
  CreditCard,
  FileCheck,
  DollarSign,
  TrendingUp,
  Receipt,
  Download,
  Printer,
  CheckCircle2,
  AlertCircle,
  Clock,
  Plus,
  Search,
  Filter,
  Eye,
  ShieldCheck,
  Send,
  ExternalLink,
  QrCode,
  Building,
  RefreshCw,
} from 'lucide-react';

interface InvoiceRecord {
  id: string;
  invoiceNumber: string;
  taxUniqueId: string; // سامانه مودیان
  clientName: string;
  clientPhone: string;
  serviceTitle: string;
  baseAmount: number;
  vatAmount: number; // 10%
  totalAmount: number;
  issueDate: string;
  dueDate: string;
  status: 'پرداخت شده' | 'در انتظار پرداخت' | 'منقضی شده';
  gateway: 'زرین‌پال' | 'بانک ملت (به‌پرداخت)' | 'بانک سامان (سپ)' | 'کارت‌به‌کارت';
  trackingRef?: string;
}

const INITIAL_INVOICES: InvoiceRecord[] = [
  {
    id: 'inv-1',
    invoiceNumber: 'INV-1403-128',
    taxUniqueId: 'A8B2C4-99887711-2024-IR',
    clientName: 'شرکت مهندسی پرشیا سازه',
    clientPhone: '09121002030',
    serviceTitle: 'تنظیم قرارداد مشارکت در ساخت مجتمع تجاری نگین و داوری حقوقی',
    baseAmount: 45000000,
    vatAmount: 4500000,
    totalAmount: 49500000,
    issueDate: '۱۴۰۳/۰۶/۲۰',
    dueDate: '۱۴۰۳/۰۶/۲۸',
    status: 'پرداخت شده',
    gateway: 'بانک ملت (به‌پرداخت)',
    trackingRef: 'MEL-992817264',
  },
  {
    id: 'inv-2',
    invoiceNumber: 'INV-1403-129',
    taxUniqueId: 'A8B2C4-99887712-2024-IR',
    clientName: 'آقای کامران رستمی',
    clientPhone: '09123004050',
    serviceTitle: 'حق‌الوکاله مرحله نخست دفاع در شعبه ۱۰ دادگاه تجدیدنظر استان تهران',
    baseAmount: 30000000,
    vatAmount: 3000000,
    totalAmount: 33000000,
    issueDate: '۱۴۰۳/۰۶/۲۲',
    dueDate: '۱۴۰۳/۰۶/۲۹',
    status: 'در انتظار پرداخت',
    gateway: 'زرین‌پال',
  },
  {
    id: 'inv-3',
    invoiceNumber: 'INV-1403-130',
    taxUniqueId: 'A8B2C4-99887713-2024-IR',
    clientName: 'سرکار خانم نسرین جلالی',
    clientPhone: '09355556677',
    serviceTitle: 'مشاوره تخصصی آنلاین و بررسی مستندات پرونده ارث و انحصار وراثت',
    baseAmount: 2500000,
    vatAmount: 250000,
    totalAmount: 2750000,
    issueDate: '۱۴۰۳/۰۶/۲۴',
    dueDate: '۱۴۰۳/۰۶/۲۵',
    status: 'پرداخت شده',
    gateway: 'زرین‌پال',
    trackingRef: 'ZAR-4491028',
  },
  {
    id: 'inv-4',
    invoiceNumber: 'INV-1403-131',
    taxUniqueId: 'A8B2C4-99887714-2024-IR',
    clientName: 'آقای فرهاد صبوری',
    clientPhone: '09198889900',
    serviceTitle: 'تنظیم اظهارنامه قضایی و لایحه اعتراضیه دیوان عدالت اداری',
    baseAmount: 8000000,
    vatAmount: 800000,
    totalAmount: 8800000,
    issueDate: '۱۴۰۳/۰۶/۱۵',
    dueDate: '۱۴۰۳/۰۶/۱۸',
    status: 'منقضی شده',
    gateway: 'بانک سامان (سپ)',
  },
];

export const AdminInvoicesTab: React.FC = () => {
  const [invoices, setInvoices] = useState<InvoiceRecord[]>(INITIAL_INVOICES);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('همه');
  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceRecord | null>(null);

  // Gateway Settings
  const [activeGateway, setActiveGateway] = useState<'zarinpal' | 'mellat' | 'saman'>('zarinpal');
  const [zarinpalMerchant, setZarinpalMerchant] = useState('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx');
  const [mellatTerminal, setMellatTerminal] = useState('7819203');
  const [isSandbox, setIsSandbox] = useState(false);
  const [testingGateway, setTestingGateway] = useState(false);
  const [testResult, setTestResult] = useState<string | null>(null);

  // Stats
  const totalBilled = invoices.reduce((sum, inv) => sum + inv.totalAmount, 0);
  const totalPaid = invoices
    .filter((inv) => inv.status === 'پرداخت شده')
    .reduce((sum, inv) => sum + inv.totalAmount, 0);
  const totalPending = invoices
    .filter((inv) => inv.status === 'در انتظار پرداخت')
    .reduce((sum, inv) => sum + inv.totalAmount, 0);

  const handleTestGateway = () => {
    setTestingGateway(true);
    setTestResult(null);
    setTimeout(() => {
      setTestingGateway(false);
      setTestResult('اتصال به درگاه با موفقیت برقرار شد. وب‌سرویس آماده تراکنش است (کد وضعیت: ۱۰۰).');
    }, 1500);
  };

  const filteredInvoices = invoices.filter((inv) => {
    const matchSearch =
      inv.invoiceNumber.includes(searchTerm) ||
      inv.clientName.includes(searchTerm) ||
      inv.serviceTitle.includes(searchTerm) ||
      inv.taxUniqueId.includes(searchTerm);
    const matchStatus = statusFilter === 'همه' || inv.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6">
      {/* 1. Header KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-500 dark:text-gray-400 font-bold block">مجموع صورتحساب‌های صادره</span>
            <span className="text-xl font-black text-[#0B132B] dark:text-white font-mono mt-1 block">
              {totalBilled.toLocaleString('fa-IR')} <span className="text-xs font-normal">تومان</span>
            </span>
          </div>
          <div className="w-11 h-11 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
            <Receipt className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-500 dark:text-gray-400 font-bold block">مبالغ وصول‌شده به حساب</span>
            <span className="text-xl font-black text-emerald-600 dark:text-emerald-400 font-mono mt-1 block">
              {totalPaid.toLocaleString('fa-IR')} <span className="text-xs font-normal">تومان</span>
            </span>
          </div>
          <div className="w-11 h-11 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-500 dark:text-gray-400 font-bold block">فاکتورهای در انتظار وصول</span>
            <span className="text-xl font-black text-amber-500 font-mono mt-1 block">
              {totalPending.toLocaleString('fa-IR')} <span className="text-xs font-normal">تومان</span>
            </span>
          </div>
          <div className="w-11 h-11 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-500 dark:text-gray-400 font-bold block">شناسه یکتای مالیاتی مودیان</span>
            <span className="text-xs font-mono font-bold text-[#D4AF37] block mt-1">
              ثبت برخط و معتبر
            </span>
          </div>
          <div className="w-11 h-11 rounded-xl bg-[#D4AF37]/10 text-[#D4AF37] flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* 2. Invoices Management Table */}
      <div className="bg-white dark:bg-[#0B132B] rounded-2xl p-5 border border-gray-200 dark:border-gray-800 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pb-3 border-b border-gray-100 dark:border-gray-800">
          <div>
            <h3 className="text-sm font-bold text-gray-900 dark:text-white font-serif">
              دفتر صورتحساب‌ها و فاکتورهای الکترونیک (SPEC Part 5.7 & 6.6)
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              محاسبه مالیات بر ارزش افزوده، صدور رسید چاپی و اتصال به سامانه مودیان
            </p>
          </div>

          <button
            onClick={() => alert('فرم صدور فاکتور جدید باز شد.')}
            className="btn-gold px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>صدور صورتحساب جدید</span>
          </button>
        </div>

        {/* Filter Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="جستجو در شماره فاکتور، نام موکل، شرح خدمت یا کد مالیاتی..."
              className="w-full pr-9 pl-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs text-gray-800 dark:text-gray-200 focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs text-gray-800 dark:text-gray-200 focus:outline-none focus:border-[#D4AF37]"
            >
              <option value="همه">همه وضعیت‌های پرداخت</option>
              <option value="پرداخت شده">پرداخت شده</option>
              <option value="در انتظار پرداخت">در انتظار پرداخت</option>
              <option value="منقضی شده">منقضی شده</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800">
          <table className="w-full text-right text-xs">
            <thead className="bg-gray-50 dark:bg-gray-800/80 text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="py-3 px-4 font-bold">شماره و موکل</th>
                <th className="py-3 px-4 font-bold">شرح خدمت وکالت</th>
                <th className="py-3 px-4 font-bold">مبلغ نهایی (با ارزش افزوده)</th>
                <th className="py-3 px-4 font-bold">وضعیت و درگاه</th>
                <th className="py-3 px-4 font-bold">تاریخ صدور / انقضا</th>
                <th className="py-3 px-4 font-bold text-center">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {filteredInvoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-gray-900 dark:text-gray-100">{inv.clientName}</div>
                    <div className="text-[11px] text-amber-600 dark:text-amber-400 font-mono mt-0.5">
                      {inv.invoiceNumber}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 max-w-xs">
                    <div className="text-[11px] text-gray-800 dark:text-gray-200 line-clamp-1">
                      {inv.serviceTitle}
                    </div>
                    <div className="text-[10px] text-gray-400 font-mono mt-0.5">
                      شناسه مودیان: {inv.taxUniqueId}
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-mono text-gray-900 dark:text-gray-100 font-bold">
                      {inv.totalAmount.toLocaleString('fa-IR')} <span className="text-[10px] font-normal">تومان</span>
                    </div>
                    <div className="text-[10px] text-gray-400">
                      ارزش افزوده: {inv.vatAmount.toLocaleString('fa-IR')}
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="mb-1">
                      {inv.status === 'پرداخت شده' && (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-[11px]">
                          پرداخت شده
                        </span>
                      )}
                      {inv.status === 'در انتظار پرداخت' && (
                        <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold text-[11px]">
                          در انتظار پرداخت
                        </span>
                      )}
                      {inv.status === 'منقضی شده' && (
                        <span className="px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 font-bold text-[11px]">
                          منقضی شده
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-gray-400">{inv.gateway}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-mono text-[11px] text-gray-800 dark:text-gray-200">{inv.issueDate}</div>
                    <div className="text-[10px] text-gray-400 font-mono">تا {inv.dueDate}</div>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <button
                        onClick={() => setSelectedInvoice(inv)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-blue-500 hover:bg-blue-500/10"
                        title="مشاهده و چاپ پیش‌فاکتور رسمی"
                      >
                        <Printer className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => alert(`لینک اختصاصی پرداخت موکل: https://sedrazavi-law.ir/pay/${inv.invoiceNumber}`)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-[#D4AF37] hover:bg-amber-500/10"
                        title="کپی لینک مستقیم پرداخت"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. Online Payment Gateway Integration Settings (Part 5.7) */}
      <div className="bg-white dark:bg-[#0B132B] rounded-2xl p-5 border border-gray-200 dark:border-gray-800 shadow-sm space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-gray-100 dark:border-gray-800">
          <CreditCard className="w-5 h-5 text-[#D4AF37]" />
          <div>
            <h4 className="text-xs font-bold text-gray-900 dark:text-white">
              پیکربندی درگاه‌های پرداخت آنلاین بانکی (Bank Payment Gateways)
            </h4>
            <p className="text-[11px] text-gray-500 dark:text-gray-400">
              اتصال مستقیم شاپرک، به‌پرداخت ملت، سامان و زرین‌پال با رعایت استانداردهای مالیاتی
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveGateway('zarinpal')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeGateway === 'zarinpal'
                ? 'bg-amber-500 text-white shadow-sm'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'
            }`}
          >
            درگاه زرین‌پال (ZarinPal)
          </button>
          <button
            onClick={() => setActiveGateway('mellat')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeGateway === 'mellat'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'
            }`}
          >
            به‌پرداخت ملت (شاپرک)
          </button>
          <button
            onClick={() => setActiveGateway('saman')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeGateway === 'saman'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'
            }`}
          >
            سامان کیش (سپ)
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
              {activeGateway === 'zarinpal' && 'کد مرچنت زرین‌پال (Merchant ID):'}
              {activeGateway === 'mellat' && 'شماره ترمینال به‌پرداخت ملت (Terminal ID):'}
              {activeGateway === 'saman' && 'کد پذیرنده سپ (Merchant Code):'}
            </label>
            <input
              type="text"
              value={activeGateway === 'zarinpal' ? zarinpalMerchant : mellatTerminal}
              onChange={(e) =>
                activeGateway === 'zarinpal'
                  ? setZarinpalMerchant(e.target.value)
                  : setMellatTerminal(e.target.value)
              }
              className="w-full px-3.5 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs text-gray-900 dark:text-white font-mono focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          <div className="flex items-center gap-4 pt-6">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-gray-700 dark:text-gray-300">
              <input
                type="checkbox"
                checked={isSandbox}
                onChange={(e) => setIsSandbox(e.target.checked)}
                className="w-4 h-4 accent-[#D4AF37] rounded"
              />
              <span>حالت تست و آزمایشی (Sandbox)</span>
            </label>

            <button
              onClick={handleTestGateway}
              disabled={testingGateway}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-[#D4AF37]/20 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all flex items-center gap-1.5"
            >
              {testingGateway ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>در حال تست وب‌سرویس...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>تست اتصال به درگاه</span>
                </>
              )}
            </button>
          </div>
        </div>

        {testResult && (
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{testResult}</span>
          </div>
        )}
      </div>

      {/* 4. Invoice Print Preview Modal */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white text-gray-900 rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-gray-300 space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-lg bg-[#D4AF37] text-[#0B132B] flex items-center justify-center font-bold">
                  ⚖️
                </div>
                <div>
                  <h3 className="font-bold text-sm">دفتر وکالت و مشاوره حقوقی دکتر سیده مریم رضوی</h3>
                  <span className="text-[10px] text-gray-500">فاکتور رسمی الکترونیک سامانه مودیان</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedInvoice(null)}
                className="text-gray-400 hover:text-gray-600 p-1.5"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs bg-gray-50 p-3 rounded-xl">
              <div>
                <span className="text-gray-500 block">شماره صورتحساب:</span>
                <span className="font-mono font-bold text-gray-900">{selectedInvoice.invoiceNumber}</span>
              </div>
              <div>
                <span className="text-gray-500 block">تاریخ صدور:</span>
                <span className="font-mono font-bold text-gray-900">{selectedInvoice.issueDate}</span>
              </div>
              <div>
                <span className="text-gray-500 block">نام موکل / طرف قرارداد:</span>
                <span className="font-bold text-gray-900">{selectedInvoice.clientName}</span>
              </div>
              <div>
                <span className="text-gray-500 block">شناسه یکتای مودیان:</span>
                <span className="font-mono text-[10px] text-gray-700">{selectedInvoice.taxUniqueId}</span>
              </div>
            </div>

            <div className="border border-gray-200 rounded-xl p-3 text-xs space-y-2">
              <div className="flex justify-between border-b pb-2">
                <span className="font-bold">شرح خدمت:</span>
                <span>{selectedInvoice.serviceTitle}</span>
              </div>
              <div className="flex justify-between">
                <span>مبلغ پایه:</span>
                <span className="font-mono">{selectedInvoice.baseAmount.toLocaleString('fa-IR')} تومان</span>
              </div>
              <div className="flex justify-between">
                <span>مالیات بر ارزش افزوده (۱۰٪):</span>
                <span className="font-mono">{selectedInvoice.vatAmount.toLocaleString('fa-IR')} تومان</span>
              </div>
              <div className="flex justify-between font-bold text-sm pt-2 border-t text-amber-700">
                <span>مبلغ کل قابل پرداخت:</span>
                <span className="font-mono">{selectedInvoice.totalAmount.toLocaleString('fa-IR')} تومان</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-2 text-[11px] text-gray-500">
                <QrCode className="w-8 h-8 text-gray-700" />
                <span>بارکد اصالت پرداخت و رهگیری دارایی</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-[#0B132B] text-white flex items-center gap-1.5"
                >
                  <Printer className="w-4 h-4 text-[#D4AF37]" />
                  <span>چاپ فاکتور</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
