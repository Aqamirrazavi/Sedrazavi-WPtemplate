import React, { useState } from 'react';
import {
  Search, SlidersHorizontal, ChevronRight, CheckCircle2,
  Clock, ArrowRight, Zap, Filter, FileText, ChevronDown,
  Layers, ExternalLink, Bookmark, Check, Shield
} from 'lucide-react';
import { MOCK_DENSE_ROWS } from '../../data/scenarioData';
import { DenseDataRow } from '../../types/scenarios';

interface DenseMatrixWorkspaceProps {
  onOpenActionDrawer?: (mode?: 'slide-over' | 'docked-media' | 'in-page') => void;
}

export const DenseMatrixWorkspace: React.FC<DenseMatrixWorkspaceProps> = ({ onOpenActionDrawer }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedRow, setSelectedRow] = useState<DenseDataRow | null>(MOCK_DENSE_ROWS[0]);
  const [actionSlipItems, setActionSlipItems] = useState<DenseDataRow[]>([MOCK_DENSE_ROWS[0]]);
  const [activeFilterTab, setActiveFilterTab] = useState<'all' | 'high' | 'in-review'>('all');

  const categories = [
    { id: 'all', name: 'تمامی پرونده‌ها و دعاوی', count: 1357 },
    { id: 'arbitration', name: 'داوری بین‌المللی و تجاری', count: 284 },
    { id: 'tax', name: 'دعاوی مالیاتی و مودیان', count: 136 },
    { id: 'ip', name: 'مالکیت فکری و صنعتی', count: 92 },
    { id: 'supreme', name: 'تجدیدنظر دیوان عالی کشور', count: 68 },
    { id: 'realestate', name: 'اراضی و املاک و مستغلات', count: 412 },
  ];

  const filteredRows = MOCK_DENSE_ROWS.filter((row) => {
    if (activeFilterTab === 'high' && row.priority !== 'high') return false;
    if (activeFilterTab === 'in-review' && row.status !== 'in-review') return false;
    if (searchQuery.trim() === '') return true;
    return (
      row.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.clientOrEntity.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleToggleSlipItem = (row: DenseDataRow) => {
    if (actionSlipItems.some((item) => item.id === row.id)) {
      setActionSlipItems(actionSlipItems.filter((item) => item.id !== row.id));
    } else {
      setActionSlipItems([...actionSlipItems, row]);
    }
  };

  return (
    <div className="w-full bg-[#0A0E17] text-slate-100 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden">
      {/* Top Bar with Live Scoreboard Kicker (Mirroring Image 4 & Image 6) */}
      <div className="bg-[#0F1626] px-5 py-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3">
          <span className="font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20 font-mono">
            زنده: شعبه یک دیوان عالی کشور
          </span>
          <span className="text-slate-300 font-mono">
            جلسه رسیدگی: ۱۰:۱۵ قبل‌ازظهر · پرونده SR-1403/982
          </span>
        </div>

        <div className="flex items-center gap-3 text-slate-400">
          <span>کاربر فعال: مدیریت ارشد حقوقی</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span className="font-mono text-emerald-400 font-bold">۲۴,۹۸۲,۷۵۰ تومان</span>
        </div>
      </div>

      {/* 3-Column Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x lg:divide-x-reverse divide-slate-800">
        {/* Left Column (lg:col-span-3): Search & Category Tree Directory */}
        <div className="lg:col-span-3 p-4 space-y-4 bg-[#090D15]">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 absolute right-3 top-3 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="جستجو در کد، موکل یا عنوان..."
              className="w-full pl-3 pr-9 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>

          {/* Quick Date/Time Horizon Filter */}
          <div className="space-y-1.5">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">افق زمانی رسیدگی</span>
            <div className="grid grid-cols-5 gap-1 bg-slate-900 p-1 rounded-lg text-[10px] text-center font-mono">
              <button type="button" className="py-1 rounded bg-slate-800 text-white font-bold">همه</button>
              <button type="button" className="py-1 rounded text-slate-400 hover:text-white">۳ روز</button>
              <button type="button" className="py-1 rounded text-slate-400 hover:text-white">۱ روز</button>
              <button type="button" className="py-1 rounded text-slate-400 hover:text-white">۳ ساعت</button>
              <button type="button" className="py-1 rounded text-slate-400 hover:text-white">۱ ساعت</button>
            </div>
          </div>

          {/* Directory Category List with Tabular Counts */}
          <div className="space-y-1 pt-2">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-2">دسته‌بندی‌ها</span>
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-semibold'
                    : 'text-slate-300 hover:bg-slate-900/60'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className={`w-1.5 h-1.5 rounded-full ${selectedCategory === cat.id ? 'bg-cyan-400' : 'bg-slate-600'}`} />
                  <span>{cat.name}</span>
                </div>
                <span className="font-mono text-[11px] text-slate-500">{cat.count}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Center Column (lg:col-span-6): Featured Case Banner & Dense Data Table */}
        <div className="lg:col-span-6 p-4 space-y-4 bg-[#0A0E17]">
          {/* Top Promotional / Marquee Case Banner (Inspired by Image 5 Yellow Banner) */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-slate-950 flex items-center justify-between shadow-lg relative overflow-hidden">
            <div className="space-y-1 relative z-10 max-w-sm">
              <span className="text-[10px] font-extrabold uppercase tracking-wider bg-slate-950 text-amber-300 px-2 py-0.5 rounded-full">
                ویژه وکلا و موکلین منتخب
              </span>
              <h3 className="text-base font-extrabold">
                استعلام و تخمین هزینه دادرسی با تعرفه مصوب ۱۴۰۳
              </h3>
              <p className="text-xs text-slate-800 leading-snug">
                محاسبه فوری حق‌الوکاله، هزینه ثبت دادخواست و تمبر مالیاتی به صورت آنلاین
              </p>
            </div>
            <button
              type="button"
              onClick={() => onOpenActionDrawer?.('slide-over')}
              className="px-4 py-2 rounded-xl bg-slate-950 text-white font-bold text-xs shadow-md hover:bg-slate-900 transition-colors shrink-0 relative z-10"
            >
              محاسبه آنلاین
            </button>
          </div>

          {/* Table Header Filter Tabs */}
          <div className="flex items-center justify-between text-xs pt-1">
            <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
              <button
                type="button"
                onClick={() => setActiveFilterTab('all')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${activeFilterTab === 'all' ? 'bg-slate-800 text-white font-bold' : 'text-slate-400 hover:text-white'}`}
              >
                همه موارد ({MOCK_DENSE_ROWS.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveFilterTab('high')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${activeFilterTab === 'high' ? 'bg-rose-500/20 text-rose-300 font-bold' : 'text-slate-400 hover:text-white'}`}
              >
                اولیت بالا
              </button>
              <button
                type="button"
                onClick={() => setActiveFilterTab('in-review')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${activeFilterTab === 'in-review' ? 'bg-amber-500/20 text-amber-300 font-bold' : 'text-slate-400 hover:text-white'}`}
              >
                در حال بررسی
              </button>
            </div>
            <span className="text-[11px] text-slate-500 font-mono">نمایش ۵ پرونده اخیر</span>
          </div>

          {/* High-Density Data Matrix Table (Mirroring Image 2 & 6) */}
          <div className="border border-slate-800/90 rounded-2xl overflow-hidden bg-slate-900/40">
            <table className="w-full text-right text-xs">
              <thead className="bg-[#0E1524] text-slate-400 font-medium text-[11px] border-b border-slate-800">
                <tr>
                  <th className="py-2.5 px-3">کد / عنوان پرونده</th>
                  <th className="py-2.5 px-3">موکل</th>
                  <th className="py-2.5 px-3">پیشرفت</th>
                  <th className="py-2.5 px-3 text-center">عملیات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-sans">
                {filteredRows.map((row) => {
                  const isSelected = actionSlipItems.some((item) => item.id === row.id);
                  return (
                    <tr
                      key={row.id}
                      onClick={() => setSelectedRow(row)}
                      className={`hover:bg-slate-800/40 transition-colors cursor-pointer ${
                        selectedRow?.id === row.id ? 'bg-slate-800/60 border-r-2 border-r-cyan-400' : ''
                      }`}
                    >
                      <td className="py-3 px-3">
                        <div className="font-mono text-cyan-400 font-bold text-[11px]">{row.code}</div>
                        <div className="text-white font-semibold line-clamp-1">{row.title}</div>
                      </td>
                      <td className="py-3 px-3 text-slate-300">
                        <div>{row.clientOrEntity}</div>
                        <span className="text-[10px] text-slate-500 font-mono">{row.date}</span>
                      </td>
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-slate-800 h-1.5 rounded-full overflow-hidden">
                            <div
                              className="bg-emerald-400 h-full rounded-full"
                              style={{ width: `${row.progress}%` }}
                            />
                          </div>
                          <span className="font-mono text-[11px] text-slate-400">{row.progress}٪</span>
                        </div>
                      </td>
                      <td className="py-3 px-3 text-center">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleSlipItem(row);
                          }}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                            isSelected
                              ? 'bg-emerald-500 text-slate-950 font-bold'
                              : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                          }`}
                        >
                          {isSelected ? 'انتخاب شد' : 'افزودن'}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column (lg:col-span-3): Action Slip & Instant Decision Panel */}
        <div className="lg:col-span-3 p-4 bg-[#090D15] space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-cyan-400" />
                <span>برگه اقدام و استعلام</span>
              </span>
              <span className="text-[10px] bg-cyan-500/10 text-cyan-400 px-2 py-0.5 rounded font-mono font-bold">
                {actionSlipItems.length} مورد
              </span>
            </div>

            {/* Selected Items List */}
            <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
              {actionSlipItems.length === 0 ? (
                <div className="text-center py-8 text-slate-500 text-xs">
                  هیچ موردی انتخاب نشده است. از جدول وسط پرونده‌ای اضافه کنید.
                </div>
              ) : (
                actionSlipItems.map((item) => (
                  <div key={item.id} className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-1">
                    <div className="flex items-center justify-between font-mono text-cyan-400 text-[11px]">
                      <span>{item.code}</span>
                      <button
                        type="button"
                        onClick={() => handleToggleSlipItem(item)}
                        className="text-slate-500 hover:text-rose-400 text-xs"
                      >
                        ×
                      </button>
                    </div>
                    <div className="text-white font-medium line-clamp-1">{item.title}</div>
                    <div className="text-slate-400 text-[10px]">{item.clientOrEntity}</div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Action Total & Submit */}
          <div className="pt-3 border-t border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">مجموع برآورد مالی</span>
              <span className="font-mono font-bold text-white">۱۴,۵۰۰,۰۰۰ تومان</span>
            </div>
            <button
              type="button"
              onClick={() => onOpenActionDrawer?.('slide-over')}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Zap className="w-4 h-4 fill-current" />
              <span>ثبت درخواست رسیدگی و لایحه</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
