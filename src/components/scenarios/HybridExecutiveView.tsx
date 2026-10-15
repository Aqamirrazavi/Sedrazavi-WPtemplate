import React, { useState } from 'react';
import {
  CheckCircle2, Clock, ShieldCheck, AlertCircle, Sparkles,
  ArrowRight, FileCheck, Layers, ChevronLeft, Plus,
  Search, Check, Eye, HelpCircle
} from 'lucide-react';
import { MOCK_RADAR_METRICS } from '../../data/scenarioData';

interface HybridExecutiveViewProps {
  onOpenActionDrawer?: (mode?: 'slide-over' | 'docked-media' | 'in-page') => void;
}

export const HybridExecutiveView: React.FC<HybridExecutiveViewProps> = ({ onOpenActionDrawer }) => {
  const [activeQueueFilter, setActiveQueueFilter] = useState<'mine' | 'team'>('mine');
  const [approvedItems, setApprovedItems] = useState<string[]>([]);

  const handleApprove = (id: string) => {
    if (!approvedItems.includes(id)) {
      setApprovedItems([...approvedItems, id]);
    }
  };

  return (
    <div className="w-full bg-[#F8FAFC] text-slate-800 rounded-3xl p-5 sm:p-8 border border-slate-200 shadow-xl space-y-6">
      {/* Top Floating Pill Navigation (Mirroring Image 3 Mandate Pill Bar) */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200/80 pb-4">
        {/* Brand & Pill Nav */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 font-bold text-slate-900 font-serif text-lg pl-3 border-l border-slate-200">
            <div className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs">
              M
            </div>
            <span>مندیت · دیوان حقوقی</span>
          </div>

          <div className="flex items-center gap-1 bg-slate-900 text-white p-1 rounded-full text-xs font-medium">
            <button type="button" className="px-3 py-1 rounded-full bg-white text-slate-900 font-bold shadow-sm">
              داشبورد اصلی
            </button>
            <button type="button" className="px-3 py-1 rounded-full text-slate-300 hover:text-white transition-colors">
              صندوق پرونده‌ها (۹)
            </button>
            <button type="button" className="px-3 py-1 rounded-full text-slate-300 hover:text-white transition-colors">
              موکلین
            </button>
            <button type="button" className="px-3 py-1 rounded-full text-slate-300 hover:text-white transition-colors">
              ارزیابی ریسک
            </button>
            <button type="button" className="px-3 py-1 rounded-full text-slate-300 hover:text-white transition-colors">
              پایش دادرسی (۶)
            </button>
          </div>
        </div>

        {/* Right Action & Search */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onOpenActionDrawer?.('slide-over')}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs shadow transition-all flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>ثبت پرونده جدید</span>
          </button>
        </div>
      </div>

      {/* Greeting Row */}
      <div className="flex flex-wrap items-baseline justify-between gap-2 pt-1">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif text-slate-900">
            صبح‌بخیر، مدیر ارشد دادرسی
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            دفتر مرکزی دادگستری · سه‌شنبه ۲۴ مهر · ۳ موتور هوشمند پایش در حال اجرا
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>۶۴ پایش خودکار شبانه انجام شد</span>
        </div>
      </div>

      {/* Main Split: Left Obsidian Focal Radar Card vs Right "Waiting for you" Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (lg:col-span-7): Obsidian Dark Focal Radar Card (Directly mirroring Image 3 Left) */}
        <div className="lg:col-span-7 bg-[#0A0E17] text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl relative overflow-hidden flex flex-col justify-between">
          <div className="space-y-4 relative z-10">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-400" />
                <span className="font-semibold text-indigo-300">گزارش لحظه‌ای پایشگر ریسک</span>
              </span>
              <span className="font-mono">ساعت ۰۷:۳۰ صبح</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold font-serif leading-snug">
              دو پرونده سطح یک نیازمند مداخله مستقیم شما در دادرسی هستند
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed max-w-lg">
              پایش خودکار لوایح نشان می‌دهد مهلت اعتراض به رای تجدیدنظر شعبه ۱۴ کمتر از ۷۲ ساعت است.
            </p>
          </div>

          {/* Central Concentric Radar Graphic Simulation */}
          <div className="my-8 flex items-center justify-center relative py-6">
            <div className="relative flex items-center justify-center">
              {/* Concentric Circles */}
              <div className="w-56 h-56 rounded-full border border-slate-800 flex items-center justify-center">
                <div className="w-44 h-44 rounded-full border border-slate-800/80 flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full border border-dashed border-indigo-500/40 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-indigo-500/10 border border-indigo-500/60 flex flex-col items-center justify-center text-center">
                      <span className="text-xs font-bold text-white font-mono">۴۱۲</span>
                      <span className="text-[8px] text-slate-400">پرونده</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Glowing Indicator Pins */}
              <div className="absolute top-8 left-16 px-2 py-0.5 rounded-full bg-rose-500/20 border border-rose-500 text-rose-300 text-[10px] font-mono shadow-lg">
                فوری ۸۱
              </div>
              <div className="absolute bottom-10 right-14 px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-500 text-amber-300 text-[10px] font-mono shadow-lg">
                تجدیدنظر ۶۴
              </div>
            </div>
          </div>

          {/* Bottom KPI Big Metric */}
          <div className="relative z-10 pt-4 border-t border-slate-800 flex items-baseline justify-between">
            <div className="flex items-baseline gap-3">
              <span className="text-4xl sm:text-5xl font-extrabold font-mono text-white">۴۱</span>
              <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md font-mono">
                کاهش ۳ موردی ریسک
              </span>
            </div>
            <span className="text-xs text-slate-400 font-mono">شاخص کل خطر: ۴۱ از ۱۰۰ (متوسط)</span>
          </div>
        </div>

        {/* Right Column (lg:col-span-5): "Waiting for you" Approval Queue */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">در انتظار تایید شما</h3>
                <p className="text-xs text-slate-500">۴ مورد از ۹ تاییدیه مربوط به شماست</p>
              </div>

              {/* Segmented Filter */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs">
                <button
                  type="button"
                  onClick={() => setActiveQueueFilter('mine')}
                  className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                    activeQueueFilter === 'mine' ? 'bg-white text-slate-900 shadow-sm font-bold' : 'text-slate-600'
                  }`}
                >
                  من (۴)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveQueueFilter('team')}
                  className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                    activeQueueFilter === 'team' ? 'bg-white text-slate-900 shadow-sm font-bold' : 'text-slate-600'
                  }`}
                >
                  تیم (۹)
                </button>
              </div>
            </div>

            {/* Main Action Task Card */}
            <div className="mt-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded">موعد امروز · AP-3121</span>
                <span>۲ ساعت قبل</span>
              </div>
              <h4 className="text-sm font-bold text-slate-900 leading-snug">
                تاییدیه تسویه پرونده داوری ارزی بازرگانی پتروشیمی
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                لایحه تنظیمی توسط واحد بین‌الملل بررسی شده و با مفاد قرارداد اینکوترمز ۲۰۲۰ مطابقت کامل دارد.
              </p>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => handleApprove('t-1')}
                  className="flex-1 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                >
                  {approvedItems.includes('t-1') ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>تایید شد</span>
                    </>
                  ) : (
                    <span>تایید نهایی لایحه</span>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => onOpenActionDrawer?.('slide-over')}
                  className="px-4 py-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-semibold text-xs transition-colors"
                >
                  بازبینی پرونده
                </button>
              </div>
            </div>

            {/* Secondary Queue Items */}
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-200 text-xs">
                <div>
                  <div className="font-semibold text-slate-900">تمدید قرارداد وکالت سالانه شرکت دانش‌بنیان</div>
                  <span className="text-slate-500 text-[11px]">امروز · پرونده ۳۴۱۸</span>
                </div>
                <span className="text-amber-600 bg-amber-50 px-2 py-0.5 rounded font-mono font-bold">متوسط</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-200 text-xs">
                <div>
                  <div className="font-semibold text-slate-900">تنظیم شکواییه کلاهبرداری رایانه‌ای ارز دیجیتال</div>
                  <span className="text-slate-500 text-[11px]">۲ روز مانده · پرونده ۳۱۱۵</span>
                </div>
                <span className="text-rose-600 bg-rose-50 px-2 py-0.5 rounded font-mono font-bold">بحرانی</span>
              </div>
            </div>
          </div>

          {/* Bottom Speed Metric Strip (Mirroring Image 3 Bottom Right) */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <div>
              <span className="text-slate-500 block text-[11px]">میانگین زمان تصمیم‌گیری</span>
              <span className="font-bold text-slate-900 font-mono text-sm">۳ ساعت و ۴۰ دقیقه</span>
            </div>
            <div className="text-left">
              <span className="text-slate-500 block text-[11px]">نرخ موافقت با پیشنهادات</span>
              <span className="font-bold text-emerald-600 font-mono text-sm">۹۳٪</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom 3-Card Metrics Row (Mirroring Image 3 Bottom Row) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
        {/* Card 1: Overnight Work Bar Chart Simulation */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-900">پایش پرونده‌های شبانه</span>
            <span className="text-slate-500 text-[11px]">۲۲:۰۰ تا ۰۷:۳۰</span>
          </div>
          <div className="flex items-end gap-2 h-20 pt-4">
            {[45, 60, 30, 85, 40, 70, 95, 50].map((h, i) => (
              <div key={i} className="flex-1 bg-slate-100 rounded-t-md relative flex items-end h-full">
                <div
                  className="w-full bg-indigo-600 rounded-t-md transition-all"
                  style={{ height: `${h}%` }}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between text-[10px] text-slate-400 font-mono">
            <span>۵۱ مختومه</span>
            <span>۹ نیازمند شما</span>
            <span>۴ ارجاعی</span>
          </div>
        </div>

        {/* Card 2: Evidence Health Multi-Tier Progress */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-900">سلامت مدارک و اسناد</span>
            <span className="text-slate-500 text-[11px]">۳۱۸ از ۴۱۲ پرونده</span>
          </div>
          <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden flex">
            <div className="w-[75%] bg-emerald-500 h-full" title="معتبر" />
            <div className="w-[15%] bg-amber-400 h-full" title="نزدیک به انقضا" />
            <div className="w-[10%] bg-rose-500 h-full" title="نیازمند تمدید" />
          </div>
          <div className="space-y-1 text-xs text-slate-600 pt-1">
            <div className="flex justify-between text-[11px]">
              <span>گواهی صلاحیت داوری تجاری</span>
              <span className="font-mono text-amber-600 font-bold">۱۳ روز مانده</span>
            </div>
            <div className="flex justify-between text-[11px]">
              <span>وکالت‌نامه رسمی محضری</span>
              <span className="font-mono text-emerald-600 font-bold">معتبر ۲۲ روز</span>
            </div>
          </div>
        </div>

        {/* Card 3: Instant Lead Tracking Quick Launcher */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-sm flex flex-col justify-between">
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold text-indigo-400 tracking-wider">
              استعلام فوری مراجعین
            </span>
            <h4 className="text-sm font-bold text-white">
              رهگیری پرونده با کد رهگیری بدون نیاز به ورود
            </h4>
            <p className="text-xs text-slate-300">
              دسترسی سریع موکلین به صورت لحظه‌ای و شفاف
            </p>
          </div>
          <button
            type="button"
            onClick={() => onOpenActionDrawer?.('slide-over')}
            className="mt-4 w-full py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shadow"
          >
            <span>باز کردن پنجره استعلام سریع</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
