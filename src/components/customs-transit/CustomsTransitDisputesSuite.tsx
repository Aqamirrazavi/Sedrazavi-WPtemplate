import React, { useState } from 'react';
import {
  Ship,
  Calculator,
  Scale,
  FileCheck2,
  AlertTriangle,
  Clock,
  Coins,
  ShieldCheck,
  Building2,
  Printer,
  ChevronRight,
  ArrowRight,
  Sparkles,
  Search,
  CheckCircle2,
  XCircle,
  FileText,
  BadgeAlert,
  Boxes,
  Truck
} from 'lucide-react';

interface CustomsCalcInput {
  cifValueEuro: number; // ارزش CIF کالا به یورو
  exchangeRateTomans: number; // نرخ ارز محاسبه حقوق ورودی (نرخ ETS بانک مرکزی)
  hsCode: string; // کد تعرفه گمرکی ۸ رقمی
  customsDutyPercent: number; // حقوق گمرکی پایه (۴٪ ثابت)
  commercialBenefitPercent: number; // سود بازرگانی کتاب مقررات صادرات و واردات
  vatPercent: number; // مالیات بر ارزش افزوده (۱۰٪)
  discrepancyType: 'none' | 'undervaluation' | 'overvaluation' | 'tariff_conflict';
  underValuationPercent: number; // درصد کم‌اظهاری
}

export const CustomsTransitDisputesSuite: React.FC<{
  onBackToHome?: () => void;
  onOpenDashboard?: () => void;
}> = ({ onBackToHome, onOpenDashboard }) => {
  const [activeTab, setActiveTab] = useState<'calculator' | 'commission_144' | 'smuggling_defense' | 'documents_audit' | 'demurrage_abandoned'>('calculator');

  // Calculator Parameters
  const [calc, setCalc] = useState<CustomsCalcInput>({
    cifValueEuro: 85000,
    exchangeRateTomans: 42000, // نرخ ETS
    hsCode: '8471.30.20',
    customsDutyPercent: 4,
    commercialBenefitPercent: 11,
    vatPercent: 10,
    discrepancyType: 'tariff_conflict',
    underValuationPercent: 20,
  });

  // Commission 144 Case Form
  const [importerName, setImporterName] = useState('شرکت بین‌المللی تجهیزات الکترونیک کیمیا پارت');
  const [customsOffice, setCustomsOffice] = useState('گمرک شهید رجایی بندرعباس');
  const [declarationNumber, setDeclarationNumber] = useState('۱۰۲۴-۹۸۷۲-۱۴۰۲');
  const [disputedTopic, setDisputedTopic] = useState<'hs_code_dispute' | 'tsc_valuation' | 'abandoned_goods' | 'fine_108'>('hs_code_dispute');

  // Value in Tomans (ارزش ریالی CIF)
  const cifValueTomans = calc.cifValueEuro * calc.exchangeRateTomans;

  // Import Tariff & Duties
  const totalTariffRate = (calc.customsDutyPercent + calc.commercialBenefitPercent) / 100;
  const customsTariffAmountTomans = cifValueTomans * totalTariffRate;

  // Red Crescent 1% of total tariff
  const redCrescentAmount = customsTariffAmountTomans * 0.01;

  // VAT (10% of CIF + Tariff)
  const taxableVatBase = cifValueTomans + customsTariffAmountTomans;
  const vatAmountTomans = taxableVatBase * (calc.vatPercent / 100);

  // Fine for undervaluation/tariff difference (ماده ۱۰۸ قانون امور گمرکی: بین ۱۰٪ تا ۱۰۰٪ مابه‌التفاوت)
  let penaltyTomans = 0;
  if (calc.discrepancyType === 'undervaluation' || calc.discrepancyType === 'tariff_conflict') {
    const discrepancyBase = customsTariffAmountTomans * (calc.underValuationPercent / 100);
    penaltyTomans = discrepancyBase * 0.5; // میانگین ۵۰٪ جریمه ماده ۱۰۸
  }

  const totalCustomsClearanceCost = customsTariffAmountTomans + redCrescentAmount + vatAmountTomans + penaltyTomans;

  return (
    <div className="min-h-screen bg-[#060B18] text-slate-100 py-10 px-4 sm:px-6 lg:px-8 relative font-sans" dir="rtl">
      {/* Background Ambience */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-cyan-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-8 relative z-10">
        
        {/* Navigation Breadcrumb */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-[#0B132B]/80 border border-[#D4AF37]/20 p-4 rounded-2xl backdrop-blur-md">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-[#D4AF37]/20 text-slate-300 hover:text-[#D4AF37] text-xs transition-colors"
            >
              <ArrowRight className="w-4 h-4" />
              <span>بازگشت به صفحه اصلی</span>
            </button>
            <span className="text-slate-600">/</span>
            <span className="text-xs font-bold text-[#D4AF37] flex items-center gap-1.5">
              <Ship className="w-4 h-4 text-[#D4AF37]" />
              سامانه دعاوی گمرکی، اختلافات تعرفه و قاچاق کالا و ارز (فاز ۲۹)
            </span>
          </div>

          <div className="flex items-center gap-2">
            {onOpenDashboard && (
              <button
                onClick={onOpenDashboard}
                className="px-3 py-1.5 rounded-xl bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-bold transition-all"
              >
                پنل مدیریت دفتر
              </button>
            )}
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs transition-colors"
            >
              <Printer className="w-3.5 h-3.5 text-[#D4AF37]" />
              چاپ صورتحساب برآورد گمرکی
            </button>
          </div>
        </div>

        {/* Hero Header Banner */}
        <div className="relative bg-gradient-to-r from-[#0B132B] via-[#0E203B] to-[#0B132B] border border-[#D4AF37]/30 rounded-3xl p-6 sm:p-10 shadow-2xl overflow-hidden">
          <div className="absolute -left-10 -bottom-10 w-64 h-64 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>دپارتمان تخصصی حقوق گمرکی، ترانزیت کالا و کمیسیون‌های مواد ۱۴۴ و ۱۴۶ گمرک ایران</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-serif">
              دعاوی گمرکی، اختلافات تعرفه و ارزش، قاچاق کالا و دموراژ کانتینری
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              محاسبه حقوق ورودی، دفاع تخصصی در کمیسیون بدوی رسیدگی به اختلافات گمرکی (ماده ۱۴۴) و تجدیدنظر (ماده ۱۴۶)، ابطال جریمه بیش‌بود ارزش و کم‌اظهاری ماده ۱۰۸، حل پرونده‌های ظن به قاچاق در تعزیرات حکومتی و آزادسازی محموله‌های متروکه در اموال تملیکی.
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-2">
          {[
            { id: 'calculator', label: 'محاسبه‌گر حقوق ورودی، ارزش TSC و جریمه ماده ۱۰۸', icon: Calculator },
            { id: 'commission_144', label: 'دادخواست کمیسیون رسیدگی به اختلافات گمرکی', icon: Scale },
            { id: 'smuggling_defense', label: 'دفاع در پرونده‌های قاچاق کالا و ارز (تعزیرات)', icon: BadgeAlert },
            { id: 'documents_audit', label: 'ممیزی اسناد ترخیص (CMR، بارنامه B/L و سامانه EPL)', icon: FileCheck2 },
            { id: 'demurrage_abandoned', label: 'محاسبه دموراژ کانتینر و ترخیص کالای متروکه', icon: Boxes },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-[#D4AF37] text-[#0B132B] shadow-lg shadow-[#D4AF37]/20 font-black'
                    : 'bg-[#0B132B] text-slate-300 hover:text-white hover:bg-slate-800/80 border border-slate-800'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#0B132B]' : 'text-[#D4AF37]'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Customs Duty & Penalty Calculator */}
        {activeTab === 'calculator' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 bg-[#0B132B]/80 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2 text-white font-bold">
                  <Calculator className="w-5 h-5 text-[#D4AF37]" />
                  <span>پارامترهای محموله وارداتی و ارزش CIF</span>
                </div>
                <span className="text-[11px] text-[#D4AF37] bg-[#D4AF37]/10 px-2.5 py-1 rounded-lg border border-[#D4AF37]/20">
                  قانون امور گمرکی مصوب ۱۳۹۰
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">ارزش CIF محموله (یورو):</label>
                  <input
                    type="number"
                    min={1000}
                    step={1000}
                    value={calc.cifValueEuro}
                    onChange={(e) => setCalc({ ...calc, cifValueEuro: Math.max(1000, parseInt(e.target.value) || 0) })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#060B18] border border-slate-700 text-white text-xs focus:border-[#D4AF37] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">نرخ تسعیر ارز سامانه ETS (تومان):</label>
                  <input
                    type="number"
                    min={28500}
                    step={500}
                    value={calc.exchangeRateTomans}
                    onChange={(e) => setCalc({ ...calc, exchangeRateTomans: Math.max(28500, parseInt(e.target.value) || 0) })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#060B18] border border-slate-700 text-white text-xs focus:border-[#D4AF37] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">کد تعرفه HS Code هشت‌رقمی:</label>
                  <input
                    type="text"
                    value={calc.hsCode}
                    onChange={(e) => setCalc({ ...calc, hsCode: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#060B18] border border-slate-700 text-white text-xs focus:border-[#D4AF37] outline-none font-mono text-center"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">سود بازرگانی (درصد):</label>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={calc.commercialBenefitPercent}
                    onChange={(e) => setCalc({ ...calc, commercialBenefitPercent: Math.max(0, parseInt(e.target.value) || 0) })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#060B18] border border-slate-700 text-white text-xs focus:border-[#D4AF37] outline-none font-mono text-center"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">مالیات بر ارزش افزوده (%):</label>
                  <input
                    type="number"
                    min={0}
                    max={15}
                    value={calc.vatPercent}
                    onChange={(e) => setCalc({ ...calc, vatPercent: Math.max(0, parseInt(e.target.value) || 0) })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#060B18] border border-slate-700 text-white text-xs focus:border-[#D4AF37] outline-none font-mono text-center"
                  />
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">نوع اختلاف پرونده با ارزیاب گمرک:</label>
                  <select
                    value={calc.discrepancyType}
                    onChange={(e) => setCalc({ ...calc, discrepancyType: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#060B18] border border-slate-700 text-white text-xs focus:border-[#D4AF37] outline-none"
                  >
                    <option value="none">بدون اختلاف (ترخیص عادی با رعایت اظهارنامه)</option>
                    <option value="tariff_conflict">اختلاف در ردیف تعرفه کالا (ادعای تعرفه با سود بازرگانی بالاتر)</option>
                    <option value="undervaluation">کم‌اظهاری ارزش کالا در مقایسه با سوابق TSC گمرک ایران</option>
                    <option value="overvaluation">بیش‌بود ارزش (سوءاستفاده از ارز تخصیصی بانک مرکزی)</option>
                  </select>
                </div>

                {calc.discrepancyType !== 'none' && (
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-rose-400">درصد مابه‌التفاوت تشخیصی ارزیاب گمرک:</span>
                      <span className="text-rose-400 font-bold">{calc.underValuationPercent}٪</span>
                    </div>
                    <input
                      type="range"
                      min={5}
                      max={100}
                      value={calc.underValuationPercent}
                      onChange={(e) => setCalc({ ...calc, underValuationPercent: Number(e.target.value) })}
                      className="w-full accent-rose-500 cursor-pointer"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Calculations Breakdown */}
            <div className="lg:col-span-5 bg-gradient-to-b from-[#0B132B] to-[#101D42] border border-[#D4AF37]/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
              <div className="flex items-center justify-between pb-4 border-b border-[#D4AF37]/20">
                <span className="text-xs font-bold text-[#D4AF37] flex items-center gap-1.5">
                  <Coins className="w-4 h-4" />
                  برآورد هزینه‌های ترخیص و جرایم
                </span>
                <span className="text-[10px] text-slate-400">ارزیابی بر مبنای ریال</span>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between py-1.5 border-b border-slate-800">
                  <span className="text-slate-400">ارزش کل ریالی CIF محموله:</span>
                  <span className="font-mono text-slate-200">{(cifValueTomans / 1000000).toLocaleString('fa-IR')} م.ت</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800">
                  <span className="text-slate-400">حقوق ورودی پایه + سود بازرگانی ({calc.customsDutyPercent + calc.commercialBenefitPercent}٪):</span>
                  <span className="font-mono text-slate-200 font-bold">{(customsTariffAmountTomans / 1000000).toLocaleString('fa-IR')} م.ت</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800">
                  <span className="text-slate-400">عوارض هلال احمر (۱٪ حقوق ورودی):</span>
                  <span className="font-mono text-slate-200">{(redCrescentAmount / 1000000).toLocaleString('fa-IR')} م.ت</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800">
                  <span className="text-slate-400">مالیات بر ارزش افزوده (۱۰٪):</span>
                  <span className="font-mono text-emerald-400">{(vatAmountTomans / 1000000).toLocaleString('fa-IR')} م.ت</span>
                </div>
                {penaltyTomans > 0 && (
                  <div className="flex justify-between py-1.5 border-b border-slate-800">
                    <span className="text-rose-400">جریمه ماده ۱۰۸ قانون امور گمرکی:</span>
                    <span className="font-mono text-rose-400 font-bold">{(penaltyTomans / 1000000).toLocaleString('fa-IR')} م.ت</span>
                  </div>
                )}
              </div>

              <div className="p-4 rounded-2xl bg-[#060B18]/90 border border-[#D4AF37]/30 space-y-1">
                <div className="text-[11px] text-slate-400">مجموع حقوق ورودی، عوارض و جرایم گمرکی:</div>
                <div className="text-2xl font-black text-white font-mono flex items-center justify-between">
                  <span>{(totalCustomsClearanceCost / 1000000).toLocaleString('fa-IR')}</span>
                  <span className="text-xs font-normal text-[#D4AF37]">میلیون تومان</span>
                </div>
              </div>

              <button
                onClick={() => setActiveTab('commission_144')}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B38F26] text-[#0B132B] font-bold text-xs flex items-center justify-center gap-2 hover:brightness-110 shadow-lg shadow-[#D4AF37]/10 transition-all"
              >
                <span>تنظیم لایحه اعتراض به کمیسیون ماده ۱۴۴ گمرک</span>
                <ChevronRight className="w-4 h-4 rotate-180" />
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Customs Dispute Commission Article 144 */}
        {activeTab === 'commission_144' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4 bg-[#0B132B]/80 border border-slate-800 rounded-3xl p-6 space-y-4">
              <div className="text-xs font-bold text-white flex items-center gap-2 pb-2 border-b border-slate-800">
                <Scale className="w-4 h-4 text-[#D4AF37]" />
                <span>اطلاعات پرونده و گمرک اجرایی</span>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">نام شرکت صاحب کالا (واردکننده):</label>
                  <input
                    type="text"
                    value={importerName}
                    onChange={(e) => setImporterName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#060B18] border border-slate-700 text-white text-xs outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">گمرک محل اظهار کالا:</label>
                  <input
                    type="text"
                    value={customsOffice}
                    onChange={(e) => setCustomsOffice(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#060B18] border border-slate-700 text-white text-xs outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">شماره کوتاژ / اظهارنامه:</label>
                  <input
                    type="text"
                    value={declarationNumber}
                    onChange={(e) => setDeclarationNumber(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#060B18] border border-slate-700 text-white text-xs outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>
            </div>

            {/* Generated Pleading */}
            <div className="lg:col-span-8 bg-[#0B132B]/90 border border-[#D4AF37]/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-2 text-[#D4AF37] font-bold text-xs">
                    <FileText className="w-4 h-4" />
                    <span>دادخواست به کمیسیون رسیدگی به اختلافات گمرکی (ماده ۱۴۴ ق.ا.گ)</span>
                  </div>
                  <button
                    onClick={() => window.print()}
                    className="px-3 py-1.5 rounded-xl bg-[#D4AF37]/15 hover:bg-[#D4AF37]/25 text-[#D4AF37] text-xs border border-[#D4AF37]/30 font-bold"
                  >
                    چاپ رسمی با سربرگ دفتر
                  </button>
                </div>

                <div className="bg-[#060B18] border border-slate-800 rounded-2xl p-6 text-xs text-slate-200 leading-loose font-serif space-y-4 shadow-inner max-h-[500px] overflow-y-auto">
                  <div className="text-center font-bold text-sm text-[#D4AF37] pb-2 border-b border-slate-800">
                    ریاست و اعضای محترم کمیسیون رسیدگی به اختلافات گمرکی (مستقر در گمرک ایران - تهران)
                  </div>

                  <div className="space-y-1.5 text-slate-300">
                    <p><strong>اظهارنامه شماره:</strong> {declarationNumber} تنظیمی در {customsOffice}</p>
                    <p><strong>صاحب کالا:</strong> {importerName} با وکالت دکتر سیده مریم رضوی.</p>
                    <p><strong>موضوع:</strong> اعتراض به نظر سرویس ارزیابی و دفتر تعیین تعرفه گمرک و تقاضای نقض جریمه ماده ۱۰۸.</p>
                  </div>

                  <div className="space-y-3 pt-2 text-justify">
                    <p className="indent-4">
                      با سلام و احترام؛ پیرو ارجاع پرونده کوتاژ یادشده به آن کمیسیون محترم، مراتب دفاعیه موکل در اعتراض به تغییر کد تعرفه کالای وارداتی از ردیف ۸۴۷۱ به ردیف دیگر به استحضار می‌رسد:
                    </p>

                    <ol className="list-decimal list-inside space-y-2 pr-2">
                      <li>
                        <strong>تطبیق کارشناسی با یادداشت‌های توضیحی سیستم هماهنگ‌شده (HS):</strong> کالای موصوف بر اساس کاتالوگ سازنده و گواهی بازرسی مبدأ SGS، مشخصاً جهت پردازش داده در شبکه‌های سازمانی طراحی شده و ویژگی‌های اساسی فصل ۸۴ را داراست. استناد ارزیاب محترم به فصل ۸۵ فاقد توجیه فنی و ترمینولوژی بازرگانی است.
                      </li>
                      <li>
                        <strong>تطابق ارزش معاملاتی با سامانه ارزش TSC:</strong> اسناد پروفرما، گواهی ثبت سفارش وزارت صمت و حواله ارزی صادره از بانک عامل، انطباق کامل قیمت خرید با ارزش معاملاتی بازار بین‌المللی را اثبات نموده و ادعای کم‌اظهاری کاملاً مخدوش است.
                      </li>
                      <li>
                        <strong>غیرقانونی بودن جریمه ماده ۱۰۸:</strong> با توجه به اینکه اظهار مؤدی بر اساس اسناد اصیل حمل صورت گرفته و هیچ‌گونه تفاوت در اوصاف ظاهری و مارک کالا وجود نداشته، تحمیل جریمه مغایر با تبصره‌های ماده ۱۰۸ قانون امور گمرکی است.
                      </li>
                    </ol>

                    <p className="pt-2">
                      لذا صدور رای مبنی بر تأیید کد تعرفه و ارزش ابرازی مؤدی و ترخیص بدون جریمه کالا استدعا می‌گردد.
                    </p>
                  </div>

                  <div className="flex justify-between pt-4 border-t border-slate-800 text-[11px] text-slate-400">
                    <span>پیوست‌ها: پروانه سبز، بارنامه بین‌المللی، کاتالوگ فنی</span>
                    <span>وکیل دادگستری - دکتر سیده مریم رضوی</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Smuggling Defense in Tazirat */}
        {activeTab === 'smuggling_defense' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'قاچاق سازمان‌یافته و حرفه‌ای کالا و ارز',
                forum: 'شعب دادسرا و دادگاه انقلاب اسلامی',
                punishment: 'ضبط کالا + حبس از ۲ تا ۵ سال + جزای نقدی سنگین',
                details: 'رسیدگی به قاچاق کالاهای مجاز مشروط و ممنوع در صورتی که ارزش کالا بیش از ۱۰ میلیون تومان باشد و قاچاقچیان سازمان‌یافته باشند.',
                tactic: 'تفکیک متهمان از کادر اداری و حمل‌ونقل و اثبات عدم اطلاع از ماهیت قاچاق کانتینر.',
              },
              {
                title: 'پرونده‌های قاچاق خرد و اداری در تعزیرات',
                forum: 'شعب ویژه قاچاق کالا و ارز سازمان تعزیرات حکومتی',
                punishment: 'ضبط کالا به نفع دولت + جزای نقدی ۱ تا ۳ برابر ارزش',
                details: 'عدم تطابق کالای مکشوفه در انبارها با سامانه جامع انبارها و سامانه شناسه کالا (کد رهگیری).',
                tactic: 'ارائه قبض انبار رسمی، فاکتورهای سامانه مودیان و اثبات تاریخ ورود کالا قبل از ضوابط جدید.',
              },
              {
                title: 'تخلفات ارزی و عدم ایفای تعهدات ارزی',
                forum: 'دادسرای تهران و کارگروه بازگشت ارز حاصل از صادرات',
                punishment: 'تعلیق کارت بازرگانی + جزای نقدی + محدودیت‌های مالی',
                details: 'عدم ورود کالا ظرف مهلت قانونی پس از دریافت ارز نیمایی یا عدم برگشت ارز صادراتی به سامانه سنا.',
                tactic: 'اثبات فورس‌ماژور ناشی از تحریم‌های بانکی بین‌المللی، مسدودی سوئیفت و ارائه اسناد مسدودی حساب.',
              },
            ].map((card, i) => (
              <div key={i} className="bg-[#0B132B]/80 border border-slate-800 rounded-3xl p-6 space-y-3 hover:border-rose-500/40 transition-all">
                <div className="flex justify-between items-start">
                  <h4 className="font-bold text-white text-sm">{card.title}</h4>
                  <span className="text-[10px] text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                    {card.forum}
                  </span>
                </div>
                <div className="text-xs text-rose-300 font-semibold">{card.punishment}</div>
                <p className="text-xs text-slate-300 leading-relaxed">{card.details}</p>
                <div className="p-3 rounded-xl bg-[#060B18] border border-slate-800 text-[11px] text-slate-400">
                  <strong className="text-emerald-400 block mb-0.5">استراتژی دفاعی وکیل:</strong>
                  {card.tactic}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 4: International Shipping Documents Audit */}
        {activeTab === 'documents_audit' && (
          <div className="bg-[#0B132B]/80 border border-slate-800 rounded-3xl p-6 sm:p-10 space-y-6">
            <div className="max-w-2xl space-y-2">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <FileCheck2 className="w-5 h-5 text-[#D4AF37]" />
                <span>ممیزی تخصصی اسناد لجستیک و زنجیره تأمین گمرکی</span>
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                انطباق دقیق اسناد حمل قبل از ثبت در سامانه پنجره واحد تجارت فرامرزی (EPL) جهت پیشگیری از ضبط محموله و تحمیل جرایم سنگین گمرکی.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
              {[
                { name: 'بارنامه دریایی (Bill of Lading)', desc: 'کنترل اصالت پشت‌نویسی، شرایط Freight Prepaid و تفکیک Master و House B/L' },
                { name: 'راهنامه جاده‌ای CMR', desc: 'بررسی امضای فرستنده، انطباق با کنوانسیون CMR و مشخصات گمرک ورودی مرزی' },
                { name: 'گواهی مبدأ (Certificate of Origin)', desc: 'تاییدیه اتاق بازرگانی کشور مبدأ و تطابق با قواعد مبدأ موافقت‌نامه‌های ترجیحی' },
                { name: 'مانیفست الکترونیکی سامانه EPL', desc: 'ارسال مانیفست توسط شرکت کشتیرانی و تطبیق پلمپ کانتینر با اظهار گمرکی' },
              ].map((doc, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-[#060B18] border border-slate-800 space-y-2">
                  <div className="text-xs font-bold text-white">{doc.name}</div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{doc.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 5: Demurrage & Abandoned Cargo */}
        {activeTab === 'demurrage_abandoned' && (
          <div className="bg-[#0B132B]/80 border border-slate-800 rounded-3xl p-6 sm:p-10 space-y-6">
            <div className="max-w-2xl space-y-2">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Boxes className="w-5 h-5 text-amber-400" />
                <span>مدیریت کالای متروکه (ماده ۲۴) و سازمان اموال تملیکی</span>
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                طبق ماده ۲۴ قانون امور گمرکی، مهلت توقف کالا در اماکن گمرکی از تاریخ تحویل سه ماه است. در صورت عدم ترخیص، کالا متروکه اعلام و به سازمان جمع‌آوری و فروش اموال تملیکی ارسال می‌شود.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="p-5 rounded-2xl bg-[#060B18] border border-slate-800 space-y-3">
                <div className="text-xs font-bold text-amber-400 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>اخذ مهلت تمدید توقف کالا (تا ۲ ماه مازاد)</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  وکیل گمرکی می‌تواند با اثبات عدم صدور مجوزهای قانونی (استاندارد، بهداشت یا ارز بانک مرکزی) دستور تعلیق ارسال کالا به اموال تملیکی را از مدیرکل گمرک مربوطه اخذ نماید.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#060B18] border border-slate-800 space-y-3">
                <div className="text-xs font-bold text-emerald-400 flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  <span>اعاده اظهار و استرداد کالای متروکه‌شده</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  تا زمانی که کالای متروکه توسط سازمان اموال تملیکی به فروش نرسیده باشد، صاحب کالا با پرداخت هزینه‌های انبارداری و عوارض حق اولویت استرداد کالا را خواهد داشت.
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
